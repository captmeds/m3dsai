"""Secure media serving.

Stored snapshots and plate crops are NOT exposed as static files. They are served
only through this authenticated endpoint, with path-traversal protection, so that
captured imagery cannot be accessed without a valid session.
"""
from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse

from app.config import settings
from app.core.security import get_current_user
from app.database.models import User

router = APIRouter(prefix="/api/media", tags=["media"])


@router.get("/{relative_path:path}")
def get_media(
    relative_path: str,
    _: User = Depends(get_current_user),
) -> FileResponse:
    """Serve a stored image by its DB-relative path (auth required)."""
    storage_root = settings.storage_path.resolve()
    target = (storage_root / relative_path).resolve()

    # Path-traversal guard: the resolved path MUST stay inside STORAGE_DIR.
    if not str(target).startswith(str(storage_root)):
        raise HTTPException(status_code=403, detail="Forbidden")
    if not target.exists() or not target.is_file():
        raise HTTPException(status_code=404, detail="Media not found")
    return FileResponse(str(target), media_type="image/jpeg")
