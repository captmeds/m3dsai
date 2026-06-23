"""Alert routes: list watchlist-match alerts and update their status."""
from __future__ import annotations

import datetime as dt
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session

from app.core.audit import record_audit
from app.core.security import get_current_user, require_roles
from app.database.db import get_db
from app.database.models import Alert, AlertStatus, User, UserRole
from app.schemas.schemas import AlertOut, AlertUpdate

router = APIRouter(prefix="/api/alerts", tags=["alerts"])


@router.get("", response_model=list[AlertOut])
def list_alerts(
    status_filter: Optional[AlertStatus] = Query(None, alias="status"),
    limit: int = Query(100, le=500),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[Alert]:
    query = db.query(Alert)
    if status_filter:
        query = query.filter(Alert.status == status_filter)
    return query.order_by(Alert.created_at.desc()).limit(limit).all()


@router.patch(
    "/{alert_id}", response_model=AlertOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.OPERATOR))],
)
def update_alert(
    alert_id: int,
    payload: AlertUpdate,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Alert:
    """Acknowledge or dismiss an alert."""
    alert = db.get(Alert, alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    alert.status = payload.status
    if payload.status == AlertStatus.ACKNOWLEDGED:
        alert.acknowledged_by = user.email
        alert.acknowledged_at = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None)
    db.commit()
    db.refresh(alert)
    record_audit(
        db, user_email=user.email, action="ALERT_UPDATE", resource="alerts",
        detail=f"id={alert_id} -> {payload.status.value}", request=request,
    )
    return alert
