"""Plate-text OCR with a pluggable backend.

Backends (selected via OCR_ENGINE):
    easyocr    — default, pure-pip, no system binary, decent accuracy.
    tesseract  — needs the `tesseract` system binary + pytesseract.
    mock       — returns a deterministic fake plate (offline demos / CI).

All backends return a normalised :class:`OCRResult` so callers don't care which
engine is active. Plate text is normalised to uppercase alphanumerics.
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Optional

import cv2
import numpy as np

from app.config import settings
from app.logging_config import get_logger

logger = get_logger(__name__)

_PLATE_CLEAN_RE = re.compile(r"[^A-Z0-9]")


def normalise_plate(text: str) -> str:
    """Uppercase and strip everything except A-Z / 0-9."""
    return _PLATE_CLEAN_RE.sub("", (text or "").upper())


@dataclass
class OCRResult:
    text: str           # normalised plate string ("" if nothing read)
    confidence: float   # 0..1
    raw_text: str = ""  # pre-normalisation text (for debugging)


class _BaseOCR:
    def read(self, plate_img: np.ndarray) -> OCRResult:  # pragma: no cover - interface
        raise NotImplementedError

    @property
    def name(self) -> str:
        return self.__class__.__name__


def _preprocess(plate_img: np.ndarray) -> np.ndarray:
    """Standard plate pre-processing: grayscale, upscale, contrast, denoise."""
    if plate_img.ndim == 3:
        gray = cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY)
    else:
        gray = plate_img
    # Upscale small crops — OCR engines like ~ >100px tall plates.
    h, w = gray.shape[:2]
    if h < 64 and h > 0:
        scale = 64.0 / h
        gray = cv2.resize(gray, (int(w * scale), 64), interpolation=cv2.INTER_CUBIC)
    gray = cv2.bilateralFilter(gray, 11, 17, 17)
    gray = cv2.equalizeHist(gray)
    return gray


# ── EasyOCR backend ──────────────────────────────────────────────────────────
class EasyOCREngine(_BaseOCR):
    def __init__(self) -> None:
        import easyocr  # lazy heavy import

        gpu = settings.device in ("cuda", "mps")
        self._reader = easyocr.Reader(settings.ocr_lang_list, gpu=gpu)
        logger.info("EasyOCR initialised (langs=%s, gpu=%s)", settings.ocr_lang_list, gpu)

    def read(self, plate_img: np.ndarray) -> OCRResult:
        img = _preprocess(plate_img)
        results = self._reader.readtext(img, detail=1, paragraph=False)
        if not results:
            return OCRResult("", 0.0)
        # Concatenate fragments by horizontal position; average confidence.
        results.sort(key=lambda r: r[0][0][0])  # sort by left-x
        raw = "".join(r[1] for r in results)
        conf = float(np.mean([r[2] for r in results]))
        return OCRResult(normalise_plate(raw), conf, raw)


# ── Tesseract backend ────────────────────────────────────────────────────────
class TesseractEngine(_BaseOCR):
    def __init__(self) -> None:
        import pytesseract  # lazy import

        self._pt = pytesseract
        # Probe the binary early so we fail fast with a clear message.
        self._pt.get_tesseract_version()
        logger.info("Tesseract OCR initialised")

    def read(self, plate_img: np.ndarray) -> OCRResult:
        img = _preprocess(plate_img)
        config = "--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        data = self._pt.image_to_data(
            img, config=config, output_type=self._pt.Output.DICT
        )
        texts, confs = [], []
        for txt, conf in zip(data["text"], data["conf"]):
            if txt.strip():
                texts.append(txt.strip())
                try:
                    confs.append(max(0.0, float(conf)) / 100.0)
                except ValueError:
                    pass
        raw = "".join(texts)
        confidence = float(np.mean(confs)) if confs else 0.0
        return OCRResult(normalise_plate(raw), confidence, raw)


# ── Mock backend ─────────────────────────────────────────────────────────────
class MockOCREngine(_BaseOCR):
    """Deterministic fake reader. Cycles through plausible plates, including some
    that match the seeded watchlist so alerts can be demonstrated offline."""

    _PLATES = [
        "AB12CDE", "XY98ZZZ", "STOLEN1", "LX19WHT",
        "GV67TRK", "MC44BIK", "WANTED7", "PQ21RST",
    ]

    def __init__(self) -> None:
        self._i = 0
        logger.info("Mock OCR engine initialised (offline demo mode)")

    def read(self, plate_img: np.ndarray) -> OCRResult:
        # Derive an index from image content so the same vehicle tends to read
        # the same plate (stabilises the per-track 'best read').
        seed = int(plate_img.sum()) if plate_img is not None and plate_img.size else self._i
        plate = self._PLATES[seed % len(self._PLATES)]
        self._i += 1
        return OCRResult(plate, 0.82, plate)


# ── Factory ──────────────────────────────────────────────────────────────────
_engine: Optional[_BaseOCR] = None


def get_ocr_engine() -> _BaseOCR:
    """Return the configured OCR engine, falling back to mock on any failure."""
    global _engine
    if _engine is not None:
        return _engine

    choice = settings.ocr_engine.lower()
    try:
        if choice == "easyocr":
            _engine = EasyOCREngine()
        elif choice == "tesseract":
            _engine = TesseractEngine()
        elif choice == "mock":
            _engine = MockOCREngine()
        else:
            logger.warning("Unknown OCR_ENGINE '%s' — using mock", choice)
            _engine = MockOCREngine()
    except Exception as exc:
        logger.warning(
            "OCR engine '%s' unavailable (%s) — falling back to mock OCR.", choice, exc
        )
        _engine = MockOCREngine()
    return _engine
