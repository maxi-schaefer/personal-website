#!/bin/bash

# Config
PROJECT_DIR="/home/srvadmin/portfolio"
BRANCH="main"

cd "$PROJECT_DIR" || exit 1

echo "[INFO] Checking for git updates..."
git fetch origin "$BRANCH"

LOCAL_HASH=$(git rev-parse "$BRANCH")
REMOTE_HASH=$(git rev-parse "origin/$BRANCH")

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
  echo "[INFO] Changes detected. Updating..."

  echo "[INFO] Stopping container if running..."
  docker compose down >/dev/null 2>&1 || true

  echo "[INFO] Pulling latest code..."
  git reset --hard "origin/$BRANCH"

  echo "[INFO] Building & starting Docker image..."
  docker compose up -d --build

  echo "[INFO] Deployment complete."
else
  echo "[INFO] No changes detected. Nothing to do."
fi