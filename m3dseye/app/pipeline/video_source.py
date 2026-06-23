"""Unified video input abstraction.

A single :class:`VideoSource` transparently handles the three required inputs:

    * webcam / phone camera  -> device index (e.g. "0")
    * RTSP / CCTV stream      -> "rtsp://user:pass@host:554/stream"
    * uploaded / sample file  -> path to an .mp4/.avi/... file

Switching input is therefore just a matter of changing the camera's type+source
in the database — no code changes required.
"""
from __future__ import annotations

from typing import Optional

import cv2
import numpy as np

from app.database.models import Camera, CameraType
from app.logging_config import get_logger

logger = get_logger(__name__)


class VideoSourceError(RuntimeError):
    """Raised when a video source cannot be opened or read."""


class VideoSource:
    """Thin, resilient wrapper around ``cv2.VideoCapture``."""

    def __init__(self, camera: Camera) -> None:
        self.camera = camera
        self.camera_type = camera.camera_type
        self.source = camera.source
        self._cap: Optional[cv2.VideoCapture] = None
        self.is_file = camera.camera_type == CameraType.FILE

    def open(self) -> None:
        """Open the capture device. Raises VideoSourceError on failure."""
        target: object = self.source
        if self.camera_type == CameraType.WEBCAM:
            # Webcam sources are integer device indices.
            try:
                target = int(self.source)
            except ValueError:
                target = self.source  # allow named devices on some platforms

        logger.info(
            "Opening %s source: %s", self.camera_type.value, self.source
        )
        cap = cv2.VideoCapture(target)

        # RTSP streams benefit from a small buffer to reduce latency.
        if self.camera_type == CameraType.RTSP:
            try:
                cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
            except Exception:
                pass

        if not cap.isOpened():
            raise VideoSourceError(
                f"Unable to open {self.camera_type.value} source '{self.source}'. "
                "Check the device index / RTSP URL / file path and permissions."
            )
        self._cap = cap

    def read(self) -> Optional[np.ndarray]:
        """Return the next BGR frame, or ``None`` when the stream ends."""
        if self._cap is None:
            raise VideoSourceError("read() called before open()")
        ok, frame = self._cap.read()
        if not ok:
            return None
        return frame

    @property
    def fps(self) -> float:
        if self._cap is None:
            return 0.0
        fps = self._cap.get(cv2.CAP_PROP_FPS)
        return float(fps) if fps and fps > 0 else 25.0

    def release(self) -> None:
        if self._cap is not None:
            self._cap.release()
            self._cap = None
            logger.info("Released video source: %s", self.source)

    def __enter__(self) -> "VideoSource":
        self.open()
        return self

    def __exit__(self, *exc) -> None:
        self.release()
