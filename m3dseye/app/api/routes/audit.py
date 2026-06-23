"""Audit-log viewing (admin only).

The audit trail is the compliance record. It is read-only via the API (there is
no endpoint to edit or delete individual entries) and only administrators may
view it. Viewing the audit log is itself audited.
"""
from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session

from app.core.audit import record_audit
from app.core.security import get_current_user, require_roles
from app.database.db import get_db
from app.database.models import AuditLog, User, UserRole
from app.schemas.schemas import AuditLogOut

router = APIRouter(prefix="/api/audit", tags=["audit"])


@router.get(
    "", response_model=list[AuditLogOut],
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def list_audit(
    request: Request,
    action: Optional[str] = Query(None),
    user_email: Optional[str] = Query(None),
    limit: int = Query(200, le=1000),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> list[AuditLog]:
    query = db.query(AuditLog)
    if action:
        query = query.filter(AuditLog.action == action)
    if user_email:
        query = query.filter(AuditLog.user_email.contains(user_email))
    results = (
        query.order_by(AuditLog.timestamp.desc()).offset(offset).limit(limit).all()
    )
    # Viewing the audit log is itself an audited action.
    record_audit(
        db, user_email=user.email, action="AUDIT_VIEW", resource="audit_logs",
        detail=f"action={action} user={user_email} -> {len(results)} rows",
        request=request,
    )
    return results
