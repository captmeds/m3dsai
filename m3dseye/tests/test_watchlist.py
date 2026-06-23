"""Tests for plate normalisation + watchlist matching logic."""
from __future__ import annotations

from app.database.models import Camera, CameraType, Detection, WatchlistEntry
from app.ocr.ocr_engine import normalise_plate
from app.services.watchlist import evaluate_detection, find_watchlist_match


def test_normalise_plate():
    assert normalise_plate("ab 12 cde") == "AB12CDE"
    assert normalise_plate("  xy-98:zzz ") == "XY98ZZZ"
    assert normalise_plate(None) == ""


def _make_detection(db, plate):
    cam = Camera(name="c", camera_type=CameraType.FILE, source="x")
    db.add(cam)
    db.flush()
    det = Detection(
        camera_id=cam.id, track_id=1, vehicle_type="car",
        vehicle_confidence=0.9, best_plate_text=plate, best_plate_confidence=0.9,
    )
    db.add(det)
    db.flush()
    return det


def test_exact_match_creates_alert(db_session):
    db_session.add(WatchlistEntry(plate_text="STOLEN1", reason="Stolen", severity="high"))
    db_session.flush()
    det = _make_detection(db_session, "STOLEN1")

    alert = evaluate_detection(db_session, det)
    assert alert is not None
    assert alert.plate_text == "STOLEN1"
    assert alert.severity == "high"


def test_no_match_returns_none(db_session):
    db_session.add(WatchlistEntry(plate_text="STOLEN1", reason="Stolen"))
    db_session.flush()
    det = _make_detection(db_session, "AB12CDE")
    assert evaluate_detection(db_session, det) is None


def test_inactive_entry_is_ignored(db_session):
    db_session.add(
        WatchlistEntry(plate_text="AB12CDE", reason="x", is_active=False)
    )
    db_session.flush()
    assert find_watchlist_match(db_session, "AB12CDE") is None


def test_fuzzy_match_handles_ocr_confusion(db_session):
    # Watchlist has the letter O; OCR read a zero.
    db_session.add(WatchlistEntry(plate_text="ABO12CD", reason="x"))
    db_session.flush()
    assert find_watchlist_match(db_session, "AB012CD", fuzzy=True) is not None
    assert find_watchlist_match(db_session, "AB012CD", fuzzy=False) is None


def test_duplicate_alert_not_created_twice(db_session):
    db_session.add(WatchlistEntry(plate_text="WANTED7", reason="x", severity="high"))
    db_session.flush()
    det = _make_detection(db_session, "WANTED7")
    a1 = evaluate_detection(db_session, det)
    db_session.flush()
    a2 = evaluate_detection(db_session, det)
    assert a1 is a2  # same alert returned, not a second row
