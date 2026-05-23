#!/usr/bin/env bash
set -Eeuo pipefail
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"
: "${BACKEND_IMAGE_NAME:?BACKEND_IMAGE_NAME is required}"
: "${FRONTEND_IMAGE_NAME:?FRONTEND_IMAGE_NAME is required}"
: "${IMAGE_TAG:?IMAGE_TAG is required}"
: "${PANGOLIN_NETWORK:?PANGOLIN_NETWORK is required}"
cat > .env.prod <<EOF_ENV
BACKEND_IMAGE_NAME=${BACKEND_IMAGE_NAME}
FRONTEND_IMAGE_NAME=${FRONTEND_IMAGE_NAME}
IMAGE_TAG=${IMAGE_TAG}
PANGOLIN_NETWORK=${PANGOLIN_NETWORK}
EOF_ENV
docker network inspect "$PANGOLIN_NETWORK" >/dev/null
if [ -n "${GHCR_USERNAME:-}" ] && [ -n "${GHCR_TOKEN:-}" ]; then
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
fi
docker compose --env-file .env.prod -f docker-compose.prod.yml pull
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --remove-orphans
docker compose --env-file .env.prod -f docker-compose.prod.yml ps
echo "Production deployed. Route Pangolin to container portfolio-prod-web on internal port 80."
