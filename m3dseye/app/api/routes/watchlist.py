"""Watchlist management routes.

Plates are stored normalised. Adding/removing entries is restricted to
admin/operator roles and fully audited (these are sensitive law-enforcement
records). Viewing is available to any authenticated user.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.audit import record_audit
from app.core.security import get_current_user, require_roles
from app.database.db import get_db
from app.database.models import User, UserRole, WatchlistEntry
from app.ocr.ocr_engine import normalise_plate
from app.schemas.schemas import Message, WatchlistCreate, WatchlistOut

router = APIRouter(prefix="/api/watchlist", tags=["watchlist"])


@router.get("", response_model=list[WatchlistOut])
def list_watchlist(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[WatchlistEntry]:
    return db.query(WatchlistEntry).order_by(WatchlistEntry.created_at.desc()).all()


@router.post(
    "", response_model=WatchlistOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.OPERATOR))],
)
def add_watchlist(
    payload: WatchlistCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> WatchlistEntry:
    plate = normalise_plate(payload.plate_text)
    if not plate:
        raise HTTPException(status_code=400, detail="Invalid plate text")
    if db.query(WatchlistEntry).filter(WatchlistEntry.plate_text == plate).first():
        raise HTTPException(status_code=409, detail="Plate already on watchlist")

    entry = WatchlistEntry(
        plate_text=plate,
        reason=payload.reason,
        severity=payload.severity,
        reference=payload.reference,
        notes=payload.notes,
        added_by=user.email,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    record_audit(
        db, user_email=user.email, action="WATCHLIST_ADD", resource="watchlist",
        detail=f"plate={plate} reason={payload.reason}", request=request,
    )
    return entry


@router.delete(
    "/{entry_id}", response_model=Message,
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def delete_watchlist(
    entry_id: int,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Message:
    entry = db.get(WatchlistEntry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Watchlist entry not found")
    plate = entry.plate_text
    db.delete(entry)
    db.commit()
    record_audit(
        db, user_email=user.email, action="WATCHLIST_DELETE", resource="watchlist",
        detail=f"plate={plate}", request=request,
    )
    return Message(detail="Watchlist entry removed")
