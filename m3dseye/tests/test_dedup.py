"""Tests for the second-layer (DB cooldown) de-duplication of plate logging."""
from __future__ import annotations

from app.database.models import Camera, CameraType
from app.services.detections import create_detection, recently_logged


def _camera(db):
    cam = Camera(name="c", camera_type=CameraType.FILE, source="x")
    db.add(cam)
    db.flush()
    return cam


def test_recently_logged_detects_duplicate(db_session):
    cam = _camera(db_session)
    create_detection(
        db_session, camera_id=cam.id, track_id=1, vehicle_type="car",
        vehicle_confidence=0.9, plate_text="AB12CDE", plate_confidence=0.9,
        snapshot_path=None, plate_image_path=None,
    )
    db_session.flush()
    # Same plate, same camera, within cooldown -> treated as duplicate.
    assert recently_logged(db_session, cam.id, "AB12CDE", cooldown_s=30) is True
    # Different plate -> not a duplicate.
    assert recently_logged(db_session, cam.id, "XY98ZZZ", cooldown_s=30) is False


def test_cooldown_zero_allows_relogging(db_session):
    cam = _camera(db_session)
    create_detection(
        db_session, camera_id=cam.id, track_id=1, vehicle_type="car",
        vehicle_confidence=0.9, plate_text="AB12CDE", plate_confidence=0.9,
        snapshot_path=None, plate_image_path=None,
    )
    db_session.flush()
    # With a zero-second cooldown the previous read is already outside the window.
    assert recently_logged(db_session, cam.id, "AB12CDE", cooldown_s=0) is False
