#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
ENV_ARGS=()
[ -f .env.dev ] && ENV_ARGS=(--env-file .env.dev)
docker compose "${ENV_ARGS[@]}" -f docker-compose.dev.yml down
