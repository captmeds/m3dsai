"""Vehicle detection.

Primary path: Ultralytics YOLO on the COCO classes that correspond to vehicles
(car, motorcycle, bus, truck). COCO has no dedicated "van" class, so vans are
typically reported as "car" or "truck"; we expose a normalised vehicle label.

Fallback path: a MOCK detector that emits a moving synthetic vehicle box. This
keeps the entire pipeline runnable with no ML stack installed — invaluable for
demos, CI, and dashboard development.
"""
from __future__ import annotations

import math
from typing import Optional

import numpy as np

from app.config import settings
from app.detection.types import BoundingBox, DetectedObject
from app.logging_config import get_logger

logger = get_logger(__name__)

# COCO class id -> normalised vehicle label.
COCO_VEHICLE_CLASSES: dict[int, str] = {
    2: "car",
    3: "motorbike",
    5: "bus",
    7: "truck",
}
# Labels the system reports (van is mapped from large car/truck heuristically).
SUPPORTED_VEHICLES = {"car", "motorbike", "truck", "bus", "van"}


class VehicleDetector:
    """Detect vehicles in a BGR frame. Falls back to mock mode automatically."""

    def __init__(self) -> None:
        self.mock = settings.force_mock_detection
        self._model = None
        self._frame_counter = 0

        if not self.mock:
            self._model = self._try_load_model()
            if self._model is None:
                logger.warning(
                    "Vehicle YOLO model unavailable — using MOCK vehicle detector."
                )
                self.mock = True

    # ── model loading ────────────────────────────────────────────────────────
    def _try_load_model(self):
        """Attempt to load YOLO weights. Returns None on any failure."""
        try:
            from ultralytics import YOLO  # heavy import, done lazily
        except Exception as exc:
            logger.info("ultralytics not installed (%s).", exc)
            return None

        try:
            model = YOLO(settings.vehicle_model_path)
            model.to(settings.device)
            logger.info(
                "Loaded vehicle model '%s' on %s",
                settings.vehicle_model_path, settings.device,
            )
            return model
        except Exception as exc:
            logger.warning("Could not load vehicle model: %s", exc)
            return None

    @property
    def mode(self) -> str:
        return "mock" if self.mock else "live"

    # ── inference ─────────────────────────────────────────────────────────────
    def detect(self, frame: np.ndarray) -> list[DetectedObject]:
        """Return the list of vehicles detected in ``frame`` (BGR ndarray)."""
        if self.mock:
            return self._detect_mock(frame)
        try:
            return self._detect_yolo(frame)
        except Exception:
            logger.exception("Vehicle detection failed; falling back to mock for this frame")
            return self._detect_mock(frame)

    def _detect_yolo(self, frame: np.ndarray) -> list[DetectedObject]:
        results = self._model.predict(
            frame, conf=settings.detection_confidence, verbose=False
        )
        objects: list[DetectedObject] = []
        for res in results:
            for box in res.boxes:
                cls_id = int(box.cls[0])
                if cls_id not in COCO_VEHICLE_CLASSES:
                    continue
                conf = float(box.conf[0])
                x1, y1, x2, y2 = (int(v) for v in box.xyxy[0])
                label = COCO_VEHICLE_CLASSES[cls_id]
                bbox = BoundingBox(x1, y1, x2, y2)
                # Crude van heuristic: a tall/boxy "car" wider than it is by a
                # van-like aspect ratio gets relabelled. (Optional refinement.)
                if label == "car" and bbox.height > 0:
                    ar = bbox.width / bbox.height
                    if 0.9 <= ar <= 1.4 and bbox.area > 0.12 * frame.shape[0] * frame.shape[1]:
                        label = "van"
                objects.append(DetectedObject(label=label, confidence=conf, box=bbox))
        return objects

    # ── mock detector ─────────────────────────────────────────────────────────
    def _detect_mock(self, frame: np.ndarray) -> list[DetectedObject]:
        """Emit a single synthetic vehicle that sweeps across the frame.

        Produces a believable, deterministic stream of "passing vehicles" so the
        tracker, OCR, watchlist and dashboard can all be demonstrated offline.
        """
        h, w = frame.shape[:2]
        self._frame_counter += 1

        # One "vehicle pass" every ~90 frames; box moves left->right.
        cycle = 90
        phase = self._frame_counter % cycle
        if phase > 60:  # gap with no vehicle — exercises track teardown
            return []

        progress = phase / 60.0
        box_w, box_h = int(w * 0.22), int(h * 0.30)
        cx = int(progress * (w + box_w)) - box_w // 2
        cy = int(h * 0.55 + math.sin(progress * math.pi) * h * 0.04)
        x1 = max(0, cx - box_w // 2)
        y1 = max(0, cy - box_h // 2)
        bbox = BoundingBox(x1, y1, x1 + box_w, y1 + box_h).clip(w, h)

        # Rotate through vehicle types across cycles for variety.
        types = ["car", "truck", "motorbike", "bus", "van"]
        label = types[(self._frame_counter // cycle) % len(types)]
        return [DetectedObject(label=label, confidence=0.88, box=bbox)]


# Module-level singleton (lazy).
_detector: Optional[VehicleDetector] = None


def get_vehicle_detector() -> VehicleDetector:
    global _detector
    if _detector is None:
        _detector = VehicleDetector()
    return _detector
