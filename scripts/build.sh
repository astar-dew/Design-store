#!/usr/bin/env bash
# 전체 다시 빌드
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# 대비 검사를 먼저 통과해야 한다. 문서에만 적어두면 지켜지지 않는다 —
# 실제로 14종 중 9종이 기준 미달인 채로 배포되고 있었다.
node scripts/check-contrast.mjs

node scripts/build-index.mjs
node scripts/build-skins.mjs
node scripts/build-patterns.mjs
node scripts/build-gallery.mjs
node scripts/build-intake-doc.mjs

# 빌드 결과까지 확인한다 — CI(pages.yml)도 이 스크립트를 쓰므로 실패하면 배포되지 않는다.
node --test scripts/test/*.test.mjs
