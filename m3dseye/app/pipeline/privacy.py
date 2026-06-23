"""Privacy-by-design image filters.

Two protections are provided for stored imagery (snapshots that may be retained):

  * blur_faces        — detect & Gaussian-blur human faces (NO recognition, just
                        obfuscation) so bystanders/pedestrians are not identifiable.
  * blur_non_plate    — blur the ENTIRE frame except the plate region(s), i.e.
                        keep only the legally-relevant data.

Face detection uses OpenCV's bundled Haar cascade — it is a DETECTOR only and
performs no identification. This directly supports the project's "no public
facial recognition" requirement.
"""
from __future__ import annotations

from typing import Optional

import cv2
import numpy as np

from app.config import settings
from app.detection.types import BoundingBox
from app.logging_config import get_logger

logger = get_logger(__name__)


class PrivacyFilter:
    def __init__(self) -> None:
        self._face_cascade = None
        if settings.blur_faces:
            self._face_cascade = self._load_cascade()

    def _load_cascade(self):
        try:
            path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
            cascade = cv2.CascadeClassifier(path)
            if cascade.empty():
                logger.warning("Face cascade failed to load; face blur disabled.")
                return None
            logger.info("Privacy face-blur enabled (Haar detector, no recognition).")
            return cascade
        except Exception as exc:
            logger.warning("Could not init face cascade (%s); face blur disabled.", exc)
            return None

    @staticmethod
    def _blur_region(image: np.ndarray, box: BoundingBox) -> None:
        """In-place strong Gaussian blur of a region."""
        b = box.clip(image.shape[1], image.shape[0])
        roi = image[b.y1:b.y2, b.x1:b.x2]
        if roi.size == 0:
            return
        k = max(15, (min(roi.shape[:2]) // 2) | 1)  # odd kernel proportional to size
        image[b.y1:b.y2, b.x1:b.x2] = cv2.GaussianBlur(roi, (k, k), 0)

    def blur_faces(self, image: np.ndarray) -> int:
        """Blur all detected faces in-place. Returns the number blurred."""
        if self._face_cascade is None:
            return 0
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = self._face_cascade.detectMultiScale(gray, 1.1, 5, minSize=(24, 24))
        for (x, y, w, h) in faces:
            self._blur_region(image, BoundingBox(x, y, x + w, y + h))
        return len(faces)

    def blur_except(self, image: np.ndarray, keep: BoundingBox) -> None:
        """Blur the whole image EXCEPT the ``keep`` region (in-place)."""
        keep = keep.clip(image.shape[1], image.shape[0])
        blurred = cv2.GaussianBlur(image, (51, 51), 0)
        keep_roi = image[keep.y1:keep.y2, keep.x1:keep.x2].copy()
        image[:] = blurred
        if keep_roi.size:
            image[keep.y1:keep.y2, keep.x1:keep.x2] = keep_roi

    def apply(
        self,
        image: np.ndarray,
        plate_box: Optional[BoundingBox] = None,
    ) -> np.ndarray:
        """Apply the configured privacy protections to a COPY and return it."""
        out = image.copy()
        if settings.blur_non_plate and plate_box is not None:
            self.blur_except(out, plate_box)
        elif settings.blur_faces:
            self.blur_faces(out)
        return out


_privacy: Optional[PrivacyFilter] = None


def get_privacy_filter() -> PrivacyFilter:
    global _privacy
    if _privacy is None:
        _privacy = PrivacyFilter()
    return _privacy
