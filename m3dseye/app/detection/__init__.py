"""Detection subsystem: vehicle detection, plate detection and tracking.

Designed for graceful degradation: if YOLO / torch / model weights are not
available (or FORCE_MOCK_DETECTION=true), a deterministic MOCK detector is used
so the full pipeline, DB, API and dashboard can be exercised without GPUs.
"""
from app.detection.types import BoundingBox, DetectedObject  # noqa: F401
