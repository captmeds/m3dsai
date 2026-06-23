"""Shared lightweight data types for the detection subsystem."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class BoundingBox:
    """Axis-aligned bounding box in pixel coordinates (top-left origin)."""

    x1: int
    y1: int
    x2: int
    y2: int

    @property
    def width(self) -> int:
        return max(0, self.x2 - self.x1)

    @property
    def height(self) -> int:
        return max(0, self.y2 - self.y1)

    @property
    def area(self) -> int:
        return self.width * self.height

    @property
    def centroid(self) -> tuple[float, float]:
        return ((self.x1 + self.x2) / 2.0, (self.y1 + self.y2) / 2.0)

    def clip(self, w: int, h: int) -> "BoundingBox":
        """Clamp the box to image bounds (w x h)."""
        return BoundingBox(
            x1=max(0, min(self.x1, w - 1)),
            y1=max(0, min(self.y1, h - 1)),
            x2=max(0, min(self.x2, w)),
            y2=max(0, min(self.y2, h)),
        )

    def iou(self, other: "BoundingBox") -> float:
        """Intersection-over-union with another box (0..1)."""
        ix1, iy1 = max(self.x1, other.x1), max(self.y1, other.y1)
        ix2, iy2 = min(self.x2, other.x2), min(self.y2, other.y2)
        iw, ih = max(0, ix2 - ix1), max(0, iy2 - iy1)
        inter = iw * ih
        union = self.area + other.area - inter
        return inter / union if union > 0 else 0.0


@dataclass
class DetectedObject:
    """A single detected object (vehicle or plate)."""

    label: str          # e.g. "car", "truck", "license_plate"
    confidence: float
    box: BoundingBox
