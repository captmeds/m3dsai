"""Database package: SQLAlchemy engine, session, and ORM models."""
from app.database.db import Base, engine, get_db, session_scope  # noqa: F401
from app.database import models  # noqa: F401  (ensure models are registered)
