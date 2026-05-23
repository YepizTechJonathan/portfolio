#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
ENV_ARGS=()
[ -f .env.dev ] && ENV_ARGS=(--env-file .env.dev)
echo "== Docker compose =="
docker compose "${ENV_ARGS[@]}" -f docker-compose.dev.yml ps || true
echo
echo "== Git =="
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git status --short --branch
else
  echo "Not a Git repo yet."
fi
