"""Authentication & authorisation.

Implements:
  * password hashing (bcrypt via passlib)
  * JWT access-token creation / decoding
  * FastAPI dependencies for "current user" and role-based access control

Privacy/compliance: ONLY authenticated, active, authorised users may reach any
data endpoint. Roles gate sensitive actions (watchlist edits, exports, user mgmt).
"""
from __future__ import annotations

import datetime as dt
from typing import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.config import settings
from app.database.db import get_db
from app.database.models import User, UserRole
from app.logging_config import get_logger

logger = get_logger(__name__)

# bcrypt password hashing context.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 bearer scheme — tokens are obtained from POST /api/auth/login.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login", auto_error=False)


# ── Passwords ────────────────────────────────────────────────────────────────
def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return pwd_context.verify(plain, hashed)
    except Exception:  # malformed hash, etc.
        return False


# ── JWT tokens ───────────────────────────────────────────────────────────────
def create_access_token(*, subject: str, role: str) -> str:
    """Create a signed JWT for the given user email (subject) and role."""
    expire = dt.datetime.now(dt.timezone.utc) + dt.timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])


# ── Authentication ───────────────────────────────────────────────────────────
def authenticate_user(db: Session, email: str, password: str) -> User | None:
    """Return the user if credentials are valid and the account is active."""
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.is_active:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


# ── FastAPI dependencies ─────────────────────────────────────────────────────
_credentials_exc = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(
    token: str | None = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Resolve and validate the bearer token into an active User."""
    if not token:
        raise _credentials_exc
    try:
        payload = decode_token(token)
        email: str | None = payload.get("sub")
        if email is None:
            raise _credentials_exc
    except JWTError:
        raise _credentials_exc

    user = db.query(User).filter(User.email == email).first()
    if user is None or not user.is_active:
        raise _credentials_exc
    return user


def require_roles(*allowed: UserRole) -> Callable[..., User]:
    """Dependency factory enforcing that the current user has one of ``allowed`` roles.

    Usage::

        @router.post(..., dependencies=[Depends(require_roles(UserRole.ADMIN))])
    """

    def _checker(user: User = Depends(get_current_user)) -> User:
        if user.role not in allowed:
            logger.warning(
                "Access denied: %s (role=%s) attempted action requiring %s",
                user.email, user.role.value, [r.value for r in allowed],
            )
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions for this action",
            )
        return user

    return _checker
