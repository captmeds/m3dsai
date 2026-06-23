"""Tests for the centroid tracker (stable IDs + dedup behaviour)."""
from __future__ import annotations

from app.detection.tracker import CentroidTracker
from app.detection.types import BoundingBox, DetectedObject


def _obj(x, y, label="car"):
    return DetectedObject(label, 0.9, BoundingBox(x, y, x + 40, y + 30))


def test_same_vehicle_keeps_one_id():
    tracker = CentroidTracker(max_distance=60, max_missing=5)
    t1 = tracker.update([_obj(100, 100)])
    t2 = tracker.update([_obj(110, 102)])  # small move -> same track
    assert t1[0].track_id == t2[0].track_id


def test_distant_detection_gets_new_id():
    tracker = CentroidTracker(max_distance=40, max_missing=5)
    a = tracker.update([_obj(100, 100)])
    b = tracker.update([_obj(400, 400)])  # far away -> new track
    assert a[0].track_id != b[0].track_id


def test_stale_track_is_evicted():
    tracker = CentroidTracker(max_distance=40, max_missing=2)
    tracker.update([_obj(100, 100)])
    for _ in range(4):
        tracker.update([])  # nothing seen
    assert len(tracker.tracks) == 0
