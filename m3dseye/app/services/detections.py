"""Detection persistence helpers.

Centralises how a tracked vehicle (and its plate reads / snapshots) is written to
the database, including the de-duplication rule that stops the same physical
vehicle being logged repeatedly.
"""
from __future__ import annotations

import datetime as dt
import uuid
from pathlib import Path
from typing import Optional

import cv2
import numpy as np
from sqlalchemy.orm import Session

from app.config import settings
from app.database.models import Detection, PlateRead
from app.logging_config import get_logger

logger = get_logger(__name__)


def _utcnow() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def save_image(image: np.ndarray, prefix: str) -> Optional[str]:
    """Persist an image under STORAGE_DIR and return its relative path.

    Storage is local-disk by default. Filenames are randomised (uuid) so they
    cannot be guessed/enumerated. Returns None on failure (never raises).
    """
    if image is None or image.size == 0:
        return None
    try:
        # Partition by date for manageable directories + easy retention purges.
        day = _utcnow().strftime("%Y-%m-%d")
        out_dir = settings.storage_path / day
        out_dir.mkdir(parents=True, exist_ok=True)
        fname = f"{prefix}_{uuid.uuid4().hex}.jpg"
        full = out_dir / fname
        cv2.imwrite(str(full), image)
        # Store a path relative to STORAGE_DIR so the DB is portable.
        return str(Path(day) / fname)
    except Exception:
        logger.exception("Failed to save image (prefix=%s)", prefix)
        return None


def recently_logged(
    db: Session, camera_id: int, plate_text: str, cooldown_s: int | None = None
) -> bool:
    """True if ``plate_text`` was already logged on this camera within the cooldown.

    This is the second layer of de-duplication (the tracker is the first): even if
    a vehicle stops and starts a new track, we won't spam duplicate detections.
    """
    if not plate_text:
        return False
    cooldown = cooldown_s if cooldown_s is not None else settings.dedup_cooldown_seconds
    cutoff = _utcnow() - dt.timedelta(seconds=cooldown)
    # NOTE: naive/aware datetime comparison — DB stores naive UTC; compare loosely.
    recent = (
        db.query(Detection)
        .filter(
            Detection.camera_id == camera_id,
            Detection.best_plate_text == plate_text,
            Detection.last_seen >= cutoff.replace(tzinfo=None),
        )
        .first()
    )
    return recent is not None


def create_detection(
    db: Session,
    *,
    camera_id: int,
    track_id: int,
    vehicle_type: str,
    vehicle_confidence: float,
    plate_text: Optional[str],
    plate_confidence: float,
    snapshot_path: Optional[str],
    plate_image_path: Optional[str],
) -> Detection:
    """Insert a new Detection row (+ initial PlateRead if a plate was read)."""
    now = _utcnow().replace(tzinfo=None)
    detection = Detection(
        camera_id=camera_id,
        track_id=track_id,
        vehicle_type=vehicle_type,
        vehicle_confidence=vehicle_confidence,
        best_plate_text=plate_text,
        best_plate_confidence=plate_confidence,
        snapshot_path=snapshot_path,
        plate_image_path=plate_image_path,
        first_seen=now,
        last_seen=now,
    )
    db.add(detection)
    db.flush()  # assign detection.id

    if plate_text:
        db.add(
            PlateRead(
                detection_id=detection.id,
                plate_text=plate_text,
                confidence=plate_confidence,
                plate_image_path=plate_image_path,
            )
        )
    return detection
