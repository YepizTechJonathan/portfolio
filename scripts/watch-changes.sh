#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
interval="${WATCH_INTERVAL:-2}"
echo "Watching changed files every ${interval}s. Ctrl+C to stop."
while true; do
  clear || true
  date
  echo
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git status --short
  else
    find . -maxdepth 3 -type f | sort | sed 's#^./##'
  fi
  sleep "$interval"
done
