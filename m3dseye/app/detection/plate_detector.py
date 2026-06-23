"""Licence-plate region detection (within a vehicle crop).

Three strategies, tried in order of availability:

1. Dedicated YOLO plate model  (PLATE_MODEL_PATH) — most accurate.
2. OpenCV heuristic            — edge/contour search for plate-like rectangles.
3. Mock                        — returns a fixed sub-region of the vehicle.

The detector returns a plate :class:`BoundingBox` in the coordinate space of the
*input image it was given* (usually a vehicle crop), or ``None``.
"""
from __future__ import annotations

from typing import Optional

import cv2
import numpy as np

from app.config import settings
from app.detection.types import BoundingBox, DetectedObject
from app.logging_config import get_logger

logger = get_logger(__name__)


class PlateDetector:
    def __init__(self) -> None:
        self.mock = settings.force_mock_detection
        self._model = None
        if not self.mock:
            self._model = self._try_load_model()  # may stay None -> heuristic

    def _try_load_model(self):
        try:
            from ultralytics import YOLO
        except Exception:
            return None
        try:
            import os

            if not os.path.exists(settings.plate_model_path):
                logger.info(
                    "No dedicated plate model at '%s' — using heuristic plate detection.",
                    settings.plate_model_path,
                )
                return None
            model = YOLO(settings.plate_model_path)
            model.to(settings.device)
            logger.info("Loaded plate model '%s'", settings.plate_model_path)
            return model
        except Exception as exc:
            logger.warning("Could not load plate model: %s", exc)
            return None

    @property
    def mode(self) -> str:
        if self.mock:
            return "mock"
        return "yolo" if self._model is not None else "heuristic"

    # ── public API ─────────────────────────────────────────────────────────────
    def detect(self, image: np.ndarray) -> Optional[DetectedObject]:
        """Return the single best plate detection in ``image`` or ``None``."""
        if image is None or image.size == 0:
            return None
        if self.mock:
            return self._detect_mock(image)
        if self._model is not None:
            try:
                return self._detect_yolo(image)
            except Exception:
                logger.exception("YOLO plate detection failed; trying heuristic")
        return self._detect_heuristic(image)

    # ── strategy: YOLO ──────────────────────────────────────────────────────────
    def _detect_yolo(self, image: np.ndarray) -> Optional[DetectedObject]:
        results = self._model.predict(
            image, conf=settings.plate_confidence, verbose=False
        )
        best: Optional[DetectedObject] = None
        for res in results:
            for box in res.boxes:
                conf = float(box.conf[0])
                x1, y1, x2, y2 = (int(v) for v in box.xyxy[0])
                cand = DetectedObject("license_plate", conf, BoundingBox(x1, y1, x2, y2))
                if best is None or cand.confidence > best.confidence:
                    best = cand
        return best

    # ── strategy: OpenCV heuristic ──────────────────────────────────────────────
    def _detect_heuristic(self, image: np.ndarray) -> Optional[DetectedObject]:
        """Find the most plate-like rectangle using edges + contour geometry.

        This is intentionally simple. It looks for bright, wide-aspect-ratio
        quadrilaterals in the lower-central portion of the vehicle crop where
        plates usually sit. Good enough for a prototype / well-framed footage.
        """
        h, w = image.shape[:2]
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        gray = cv2.bilateralFilter(gray, 11, 17, 17)
        edges = cv2.Canny(gray, 30, 200)
        contours, _ = cv2.findContours(
            edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE
        )
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:15]

        best_box: Optional[BoundingBox] = None
        best_score = 0.0
        for c in contours:
            x, y, cw, ch = cv2.boundingRect(c)
            if ch == 0:
                continue
            aspect = cw / ch
            area_frac = (cw * ch) / float(w * h)
            # Plates: wide rectangles, modest size, lower half of the crop.
            if 2.0 <= aspect <= 6.0 and 0.01 <= area_frac <= 0.25 and y > h * 0.25:
                # Prefer larger, lower, well-proportioned candidates.
                score = area_frac * (1.0 + (y / h))
                if score > best_score:
                    best_score = score
                    best_box = BoundingBox(x, y, x + cw, y + ch)

        if best_box is None:
            return None
        # Heuristic confidence — bounded, since geometry alone is weak evidence.
        conf = float(min(0.6, 0.3 + best_score))
        return DetectedObject("license_plate", conf, best_box)

    # ── strategy: mock ──────────────────────────────────────────────────────────
    def _detect_mock(self, image: np.ndarray) -> Optional[DetectedObject]:
        h, w = image.shape[:2]
        pw, ph = int(w * 0.5), int(h * 0.18)
        x1 = (w - pw) // 2
        y1 = int(h * 0.70)
        return DetectedObject(
            "license_plate", 0.8, BoundingBox(x1, y1, x1 + pw, y1 + ph).clip(w, h)
        )


_plate_detector: Optional[PlateDetector] = None


def get_plate_detector() -> PlateDetector:
    global _plate_detector
    if _plate_detector is None:
        _plate_detector = PlateDetector()
    return _plate_detector
