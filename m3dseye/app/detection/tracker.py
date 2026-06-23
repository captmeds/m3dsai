"""Lightweight multi-object tracker (centroid + IoU association).

Purpose: give each passing vehicle a STABLE ``track_id`` across frames so we can
(a) avoid logging the same vehicle many times, and (b) accumulate multiple plate
reads per vehicle and keep only the best.

This is a dependency-free tracker (no deep-SORT / no torch). It is adequate for
single-lane / well-separated traffic typical of a fixed ANPR camera. For dense,
crossing traffic, swap in a stronger tracker behind the same interface.
"""
from __future__ import annotations

from dataclasses import dataclass, field

from app.config import settings
from app.detection.types import BoundingBox, DetectedObject


@dataclass
class Track:
    track_id: int
    label: str
    box: BoundingBox
    confidence: float
    missing: int = 0           # consecutive frames not matched
    age: int = 0               # total frames seen
    counted: bool = False      # has this track been persisted as a detection?
    best_plate_text: str | None = None
    best_plate_conf: float = 0.0
    extra: dict = field(default_factory=dict)

    @property
    def centroid(self) -> tuple[float, float]:
        return self.box.centroid


class CentroidTracker:
    """Associates detections to tracks by centroid distance + IoU."""

    def __init__(
        self,
        max_distance: int | None = None,
        max_missing: int | None = None,
    ) -> None:
        self.max_distance = max_distance or settings.tracker_max_distance
        self.max_missing = max_missing or settings.tracker_max_missing
        self._next_id = 1
        self.tracks: dict[int, Track] = {}

    def _distance(self, a: tuple[float, float], b: tuple[float, float]) -> float:
        return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** 0.5

    def update(self, detections: list[DetectedObject]) -> list[Track]:
        """Advance the tracker by one frame.

        Returns the list of currently *active* (matched this frame) tracks.
        """
        # Age all existing tracks; assume missing until matched.
        for t in self.tracks.values():
            t.missing += 1
            t.age += 1

        unmatched_track_ids = set(self.tracks.keys())
        active: list[Track] = []

        for det in detections:
            best_id = None
            best_metric = float("inf")
            for tid in unmatched_track_ids:
                track = self.tracks[tid]
                dist = self._distance(det.box.centroid, track.centroid)
                iou = det.box.iou(track.box)
                # Match if close enough OR overlapping; prefer smallest distance.
                if (dist <= self.max_distance or iou > 0.2) and dist < best_metric:
                    best_metric = dist
                    best_id = tid

            if best_id is not None:
                track = self.tracks[best_id]
                track.box = det.box
                track.confidence = det.confidence
                track.label = det.label
                track.missing = 0
                unmatched_track_ids.discard(best_id)
                active.append(track)
            else:
                # New track.
                track = Track(
                    track_id=self._next_id,
                    label=det.label,
                    box=det.box,
                    confidence=det.confidence,
                )
                self.tracks[self._next_id] = track
                self._next_id += 1
                active.append(track)

        # Evict stale tracks.
        for tid in list(self.tracks.keys()):
            if self.tracks[tid].missing > self.max_missing:
                del self.tracks[tid]

        return active
