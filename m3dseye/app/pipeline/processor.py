"""The video processing engine.

One :class:`CameraWorker` thread per active camera. Each worker:

    read frame -> (skip?) -> detect vehicles -> track -> for new/uncounted
    tracks, locate + OCR the plate -> keep best read per track -> when the track
    is confidently identified (and not a duplicate), persist a Detection,
    snapshot + plate crop, and run watchlist matching.

The latest ANNOTATED frame is cached per camera so the API can serve an MJPEG
live preview. Everything degrades gracefully to mock detection/OCR.
"""
from __future__ import annotations

import threading
import time
from typing import Optional

import cv2
import numpy as np

from app.config import settings
from app.database.db import session_scope
from app.database.models import Camera, Detection
from app.detection.plate_detector import get_plate_detector
from app.detection.tracker import CentroidTracker, Track
from app.detection.types import BoundingBox
from app.detection.vehicle_detector import get_vehicle_detector
from app.logging_config import get_logger
from app.ocr.ocr_engine import get_ocr_engine
from app.pipeline.privacy import get_privacy_filter
from app.pipeline.video_source import VideoSource, VideoSourceError
from app.services.detections import create_detection, recently_logged, save_image
from app.services.watchlist import evaluate_detection

logger = get_logger(__name__)

# Colours (BGR) for the annotated preview.
_GREEN = (0, 200, 0)
_RED = (0, 0, 255)
_YELLOW = (0, 215, 255)


class CameraWorker(threading.Thread):
    """Background processing loop for a single camera."""

    def __init__(self, camera: Camera) -> None:
        super().__init__(daemon=True, name=f"cam-{camera.id}")
        self.camera_id = camera.id
        self.camera_name = camera.name
        # Detach a plain snapshot of camera config (avoid sharing ORM across threads).
        self._camera_obj = camera
        self._stop_event = threading.Event()
        self._lock = threading.Lock()
        self._latest_jpeg: Optional[bytes] = None

        self.tracker = CentroidTracker()
        self.vehicle_detector = get_vehicle_detector()
        self.plate_detector = get_plate_detector()
        self.ocr = get_ocr_engine()
        self.privacy = get_privacy_filter()

        # Status counters (exposed via API).
        self.frames_processed = 0
        self.detections_logged = 0
        self.running = False
        self.message = ""

    # ── lifecycle ──────────────────────────────────────────────────────────────
    def stop(self) -> None:
        self._stop_event.set()

    @property
    def mode(self) -> str:
        return self.vehicle_detector.mode  # "live" | "mock"

    def get_latest_jpeg(self) -> Optional[bytes]:
        with self._lock:
            return self._latest_jpeg

    def _publish_frame(self, frame: np.ndarray) -> None:
        ok, buf = cv2.imencode(".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
        if ok:
            with self._lock:
                self._latest_jpeg = buf.tobytes()

    # ── main loop ──────────────────────────────────────────────────────────────
    def run(self) -> None:
        self.running = True
        logger.info("Worker starting for camera #%s (%s)", self.camera_id, self.camera_name)
        try:
            source = VideoSource(self._camera_obj)
            source.open()
        except VideoSourceError as exc:
            self.message = str(exc)
            self.running = False
            logger.error("Camera #%s failed to open: %s", self.camera_id, exc)
            return

        frame_idx = 0
        try:
            while not self._stop_event.is_set():
                frame = source.read()
                if frame is None:
                    if source.is_file:
                        self.message = "End of video file reached."
                        logger.info("Camera #%s: end of file.", self.camera_id)
                        break
                    # Transient read error on a live stream — back off and retry.
                    time.sleep(0.5)
                    continue

                frame_idx += 1
                # Frame skipping for performance (still display every frame).
                do_process = (frame_idx % max(1, settings.frame_skip)) == 0
                annotated = frame
                if do_process:
                    annotated = self._process_frame(frame)
                    self.frames_processed += 1

                self._publish_frame(annotated)

                # Pace file playback to roughly real time; live sources self-pace.
                if source.is_file:
                    time.sleep(1.0 / max(1.0, source.fps))
        except Exception:
            logger.exception("Camera #%s worker crashed", self.camera_id)
            self.message = "Worker error (see logs)."
        finally:
            source.release()
            self.running = False
            logger.info("Worker stopped for camera #%s", self.camera_id)

    # ── per-frame processing ───────────────────────────────────────────────────
    def _process_frame(self, frame: np.ndarray) -> np.ndarray:
        annotated = frame.copy()
        vehicles = self.vehicle_detector.detect(frame)
        tracks = self.tracker.update(vehicles)

        for track in tracks:
            self._handle_track(frame, annotated, track)

        # Header overlay (mode + camera name).
        cv2.putText(
            annotated, f"{self.camera_name} [{self.mode.upper()}]",
            (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, _YELLOW, 2,
        )
        return annotated

    def _handle_track(self, frame: np.ndarray, annotated: np.ndarray, track: Track) -> None:
        box = track.box.clip(frame.shape[1], frame.shape[0])

        # Try to read a plate for tracks that don't yet have a confident read.
        if track.best_plate_conf < 0.9:
            self._read_plate_for_track(frame, track, box)

        # Draw vehicle box + label.
        colour = _GREEN if track.best_plate_text else _YELLOW
        cv2.rectangle(annotated, (box.x1, box.y1), (box.x2, box.y2), colour, 2)
        label = f"#{track.track_id} {track.label}"
        if track.best_plate_text:
            label += f" [{track.best_plate_text} {track.best_plate_conf:.2f}]"
        cv2.putText(
            annotated, label, (box.x1, max(15, box.y1 - 8)),
            cv2.FONT_HERSHEY_SIMPLEX, 0.6, colour, 2,
        )

        # Persist once the track has a usable plate and hasn't been counted yet.
        if (
            not track.counted
            and track.best_plate_text
            and track.best_plate_conf >= settings.ocr_min_confidence
        ):
            self._persist_track(frame, track, box)

    def _read_plate_for_track(self, frame: np.ndarray, track: Track, box: BoundingBox) -> None:
        vehicle_crop = frame[box.y1:box.y2, box.x1:box.x2]
        if vehicle_crop.size == 0:
            return
        plate_obj = self.plate_detector.detect(vehicle_crop)
        if plate_obj is None:
            return
        pb = plate_obj.box.clip(vehicle_crop.shape[1], vehicle_crop.shape[0])
        plate_crop = vehicle_crop[pb.y1:pb.y2, pb.x1:pb.x2]
        if plate_crop.size == 0:
            return
        result = self.ocr.read(plate_crop)
        if result.text and result.confidence > track.best_plate_conf:
            track.best_plate_text = result.text
            track.best_plate_conf = result.confidence
            # Remember absolute plate box (frame coords) for snapshot cropping.
            track.extra["plate_abs"] = BoundingBox(
                box.x1 + pb.x1, box.y1 + pb.y1, box.x1 + pb.x2, box.y1 + pb.y2
            )

    def _persist_track(self, frame: np.ndarray, track: Track, box: BoundingBox) -> None:
        """Write the detection to the DB (with de-dup + watchlist evaluation)."""
        try:
            with session_scope() as db:
                # Second-layer de-duplication across separate tracks of same plate.
                if recently_logged(db, self.camera_id, track.best_plate_text):
                    track.counted = True  # treat as already handled
                    return

                # Build snapshot (privacy-filtered) + plate crop.
                plate_abs: Optional[BoundingBox] = track.extra.get("plate_abs")
                snapshot = self.privacy.apply(frame, plate_box=plate_abs)
                snapshot_path = save_image(snapshot, prefix=f"veh{self.camera_id}")

                plate_image_path = None
                if plate_abs is not None:
                    pcrop = frame[plate_abs.y1:plate_abs.y2, plate_abs.x1:plate_abs.x2]
                    plate_image_path = save_image(pcrop, prefix=f"plate{self.camera_id}")

                detection: Detection = create_detection(
                    db,
                    camera_id=self.camera_id,
                    track_id=track.track_id,
                    vehicle_type=track.label,
                    vehicle_confidence=track.confidence,
                    plate_text=track.best_plate_text,
                    plate_confidence=track.best_plate_conf,
                    snapshot_path=snapshot_path,
                    plate_image_path=plate_image_path,
                )
                db.flush()
                # Watchlist check -> may create an Alert (committed by session_scope).
                evaluate_detection(db, detection)

            track.counted = True
            self.detections_logged += 1
            logger.info(
                "Logged detection: cam=%s track=%s type=%s plate=%s conf=%.2f",
                self.camera_id, track.track_id, track.label,
                track.best_plate_text, track.best_plate_conf,
            )
        except Exception:
            logger.exception("Failed to persist detection for track %s", track.track_id)


class ProcessingEngine:
    """Manages camera workers. One instance is shared across the app."""

    def __init__(self) -> None:
        self._workers: dict[int, CameraWorker] = {}
        self._lock = threading.Lock()

    def start(self, camera: Camera) -> CameraWorker:
        with self._lock:
            existing = self._workers.get(camera.id)
            if existing and existing.is_alive():
                return existing
            worker = CameraWorker(camera)
            worker.start()
            self._workers[camera.id] = worker
            return worker

    def stop(self, camera_id: int) -> bool:
        with self._lock:
            worker = self._workers.pop(camera_id, None)
        if worker:
            worker.stop()
            worker.join(timeout=5)
            return True
        return False

    def stop_all(self) -> None:
        for cid in list(self._workers.keys()):
            self.stop(cid)

    def get(self, camera_id: int) -> Optional[CameraWorker]:
        return self._workers.get(camera_id)

    def is_running(self, camera_id: int) -> bool:
        w = self._workers.get(camera_id)
        return bool(w and w.is_alive() and w.running)


# Shared singleton engine.
engine = ProcessingEngine()
