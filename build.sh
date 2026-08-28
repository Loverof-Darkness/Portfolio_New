#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$ROOT/dist"

rm -rf "$OUT"
mkdir -p "$OUT/vendor"

# Copy the static site while keeping the generated build directory out of itself.
find "$ROOT" -mindepth 1 -maxdepth 1 \
  ! -name dist \
  ! -name .git \
  ! -name .github \
  -exec cp -a {} "$OUT/" \;

# Cloudflare Pages does not run the GitHub Actions workflow that vendors these
# browser runtimes for GitHub Pages, so fetch them as part of the static build.
curl -fsSL https://raw.githubusercontent.com/Edwson/GalaxyJS/main/galaxy.min.js \
  -o "$OUT/vendor/galaxy.min.js"
curl -fsSL https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.min.js \
  -o "$OUT/vendor/three.module.min.js"

test -s "$OUT/vendor/galaxy.min.js"
test -s "$OUT/vendor/three.module.min.js"
test -s "$OUT/index.html"

echo "Cloudflare static build ready: $OUT"
