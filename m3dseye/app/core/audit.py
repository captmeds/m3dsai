"""Audit logging helper.

Privacy/compliance requirement: every search, view and export of vehicle/plate
data is recorded in an immutable ``audit_logs`` table together with the acting
user and source IP. This module centralises that write so routes stay clean.
"""
from __future__ import annotations

from fastapi import Request
from sqlalchemy.orm import Session

from app.database.models import AuditLog
from app.logging_config import get_logger

logger = get_logger(__name__)


def record_audit(
    db: Session,
    *,
    user_email: str,
    action: str,
    resource: str = "",
    detail: str = "",
    request: Request | None = None,
) -> None:
    """Write a single audit entry. Never raises — auditing must not break a request.

    Parameters
    ----------
    action   : short verb, e.g. "LOGIN", "SEARCH", "VIEW", "EXPORT", "WATCHLIST_ADD".
    resource : the data domain touched, e.g. "detections", "watchlist".
    detail   : free-form context (query params, target id, etc.).
    """
    ip = ""
    if request is not None and request.client is not None:
        ip = request.client.host

    try:
        entry = AuditLog(
            user_email=user_email or "anonymous",
            action=action,
            resource=resource,
            detail=detail[:2000],  # guard against oversized detail strings
            ip_address=ip,
        )
        db.add(entry)
        db.commit()
    except Exception:
        db.rollback()
        # Audit failures are logged but never propagate to the caller.
        logger.exception("Failed to write audit log (action=%s)", action)
