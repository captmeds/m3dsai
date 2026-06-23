#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Populate the standalone GitHub repo (captmeds/m3dseye) from THIS folder.
#
# Why this script exists: the cloud build environment is scoped to a single
# repository, so it cannot push to a brand-new repo. Run this from YOUR machine
# (which has your GitHub credentials) to publish the project to its own repo.
#
# Usage (from inside the m3dseye/ directory):
#     bash scripts/push_to_standalone_repo.sh
#
# It creates an isolated git history containing ONLY this folder and force-pushes
# it to the new repo's main branch. Safe: it operates in a temp clone, never your
# existing m3dsai checkout.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REMOTE="${1:-https://github.com/captmeds/m3dseye.git}"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TMP_DIR="$(mktemp -d)"

echo "▶ Source folder : $SRC_DIR"
echo "▶ Target repo   : $REMOTE"
echo "▶ Staging in    : $TMP_DIR"

# Copy the project (excluding local/venv/data artefacts) into a clean staging dir.
rsync -a --delete \
  --exclude '.venv' \
  --exclude '.git' \
  --exclude 'data/m3dseye.db' \
  --exclude 'data/storage/*' \
  --exclude 'data/videos/*' \
  --exclude 'logs' \
  --exclude '__pycache__' \
  --exclude '.pytest_cache' \
  "$SRC_DIR"/ "$TMP_DIR"/

cd "$TMP_DIR"
git init -q
git add .
git commit -q -m "Initial commit: m3dsEYE AI Traffic Radar prototype"
git branch -M main
git remote add origin "$REMOTE"

echo "▶ Pushing to $REMOTE (main)…"
git push -u origin main --force

echo "✔ Done. View it at: ${REMOTE%.git}"
echo "  (Staging dir left at $TMP_DIR — delete when happy.)"
