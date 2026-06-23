"""Data-retention enforcement (privacy requirement).

Deletes detections, plate reads, alerts and their stored images older than
``DATA_RETENTION_DAYS``. Audit logs are intentionally retained LONGER (kept here
for a multiple of the data window) because they are the compliance record of who
accessed what — purging them too eagerly would undermine accountability.

Run on a schedule (cron / Docker healthcheck / the /api/admin/retention endpoint).
"""
from __future__ import annotations

import datetime as dt
from pathlib import Path

from sqlalchemy import delete
from sqlalchemy.orm import Session

from app.config import settings
from app.database.models import Alert, AuditLog, Detection, PlateRead
from app.logging_config import get_logger

logger = get_logger(__name__)


def purge_old_data(db: Session, retention_days: int | None = None) -> dict[str, int]:
    """Delete data older than the retention window. Returns counts removed."""
    days = retention_days if retention_days is not None else settings.data_retention_days
    cutoff = (dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=days)).replace(tzinfo=None)
    logger.info("Running retention purge: removing data older than %s (%d days)", cutoff, days)

    # Collect image paths first so we can remove the files from disk too.
    stale = db.query(Detection).filter(Detection.first_seen < cutoff).all()
    removed_images = 0
    for det in stale:
        for rel in (det.snapshot_path, det.plate_image_path):
            if rel:
                fp = settings.storage_path / rel
                try:
                    if fp.exists():
                        fp.unlink()
                        removed_images += 1
                except OSError:
                    logger.warning("Could not delete image file %s", fp)

    stale_ids = [d.id for d in stale]
    counts = {"detections": 0, "plate_reads": 0, "alerts": 0, "audit_logs": 0,
              "images": removed_images}

    if stale_ids:
        counts["alerts"] = db.execute(
            delete(Alert).where(Alert.detection_id.in_(stale_ids))
        ).rowcount or 0
        counts["plate_reads"] = db.execute(
            delete(PlateRead).where(PlateRead.detection_id.in_(stale_ids))
        ).rowcount or 0
        counts["detections"] = db.execute(
            delete(Detection).where(Detection.id.in_(stale_ids))
        ).rowcount or 0

    # Audit logs kept ~3x longer (minimum 90 days) for accountability.
    audit_cutoff = (
        dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=max(days * 3, 90))
    ).replace(tzinfo=None)
    counts["audit_logs"] = db.execute(
        delete(AuditLog).where(AuditLog.timestamp < audit_cutoff)
    ).rowcount or 0

    db.commit()
    logger.info("Retention purge complete: %s", counts)
    return counts


def cleanup_empty_dirs() -> None:
    """Remove now-empty date directories under STORAGE_DIR."""
    root = settings.storage_path
    for child in sorted(root.glob("*")):
        if child.is_dir() and not any(child.iterdir()):
            try:
                child.rmdir()
            except OSError:
                pass
    Path(root).mkdir(parents=True, exist_ok=True)
