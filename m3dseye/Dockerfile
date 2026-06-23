# ─────────────────────────────────────────────────────────────────────────────
# m3dsEYE — AI Traffic Radar :: container image
#
# This image installs the BASE requirements only (API + OpenCV + DB), which keeps
# it small and lets the app run in MOCK detection mode out of the box.
# To enable live AI inference, either:
#   * build with:  --build-arg INSTALL_ML=true   (adds torch/ultralytics/easyocr)
#   * or `pip install -r requirements-ml.txt` inside a derived image.
# ─────────────────────────────────────────────────────────────────────────────
FROM python:3.11-slim

ARG INSTALL_ML=false
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

# System libs OpenCV needs even in headless mode.
RUN apt-get update && apt-get install -y --no-install-recommends \
        libglib2.0-0 libgl1 ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt requirements-ml.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN if [ "$INSTALL_ML" = "true" ]; then pip install -r requirements-ml.txt; fi

COPY . .

# Non-root user for safety.
RUN useradd -m appuser && chown -R appuser /app
USER appuser

EXPOSE 8000

# Initialise DB + generate the test video on first boot, then serve.
CMD ["sh", "-c", "python -m scripts.init_db && python -m scripts.generate_test_video && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
