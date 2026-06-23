"""Watchlist matching logic.

Compares a (normalised) detected plate against the active watchlist and, on a
match, creates an :class:`Alert`. Matching is exact on the normalised plate plus
an optional fuzzy fallback (single OCR-style character confusions) which can be
toggled — fuzzy matching trades precision for recall and must be used carefully
in a law-enforcement context.
"""
from __future__ import annotations

from typing import Optional

from sqlalchemy.orm import Session

from app.database.models import Alert, Detection, WatchlistEntry
from app.logging_config import get_logger
from app.ocr.ocr_engine import normalise_plate

logger = get_logger(__name__)

# Common OCR confusions, used only by the optional fuzzy matcher.
_CONFUSIONS = {"0": "O", "O": "0", "1": "I", "I": "1", "8": "B", "B": "8", "5": "S", "S": "5"}


def _fuzzy_variants(plate: str) -> set[str]:
    """Generate single-substitution variants for common OCR confusions."""
    variants = {plate}
    for i, ch in enumerate(plate):
        if ch in _CONFUSIONS:
            variants.add(plate[:i] + _CONFUSIONS[ch] + plate[i + 1:])
    return variants


def find_watchlist_match(
    db: Session, plate_text: str, *, fuzzy: bool = False
) -> Optional[WatchlistEntry]:
    """Return the active watchlist entry matching ``plate_text``, or None."""
    plate = normalise_plate(plate_text)
    if not plate:
        return None

    entry = (
        db.query(WatchlistEntry)
        .filter(WatchlistEntry.plate_text == plate, WatchlistEntry.is_active.is_(True))
        .first()
    )
    if entry or not fuzzy:
        return entry

    # Optional fuzzy fallback.
    for variant in _fuzzy_variants(plate):
        entry = (
            db.query(WatchlistEntry)
            .filter(WatchlistEntry.plate_text == variant, WatchlistEntry.is_active.is_(True))
            .first()
        )
        if entry:
            logger.info("Fuzzy watchlist match: read=%s -> watchlist=%s", plate, variant)
            return entry
    return None


def evaluate_detection(
    db: Session, detection: Detection, *, fuzzy: bool = False
) -> Optional[Alert]:
    """Check a detection's best plate against the watchlist; raise an alert if hit.

    Returns the created :class:`Alert` (already added to the session) or None.
    Deduplicates: will not create a second NEW alert for the same detection.
    """
    if not detection.best_plate_text:
        return None

    entry = find_watchlist_match(db, detection.best_plate_text, fuzzy=fuzzy)
    if entry is None:
        return None

    existing = (
        db.query(Alert)
        .filter(Alert.detection_id == detection.id, Alert.watchlist_id == entry.id)
        .first()
    )
    if existing:
        return existing

    alert = Alert(
        detection_id=detection.id,
        watchlist_id=entry.id,
        plate_text=entry.plate_text,
        reason=entry.reason,
        severity=entry.severity,
    )
    db.add(alert)
    logger.warning(
        "⚠ WATCHLIST ALERT: plate=%s reason='%s' severity=%s (detection #%s)",
        entry.plate_text, entry.reason, entry.severity, detection.id,
    )
    return alert
