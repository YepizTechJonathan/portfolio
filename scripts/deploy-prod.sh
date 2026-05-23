#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
ENV_ARGS=()
[ -f .env.prod ] && ENV_ARGS=(--env-file .env.prod)
if [ -n "${GHCR_USERNAME:-}" ] && [ -n "${GHCR_TOKEN:-}" ]; then
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
fi
docker compose "${ENV_ARGS[@]}" -f docker-compose.prod.yml pull || true
docker compose "${ENV_ARGS[@]}" -f docker-compose.prod.yml up --build -d
docker compose "${ENV_ARGS[@]}" -f docker-compose.prod.yml ps
