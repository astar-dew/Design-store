#!/usr/bin/env bash
# 브라우저로 열어서 JS 가 끝까지 돌았는지 본다 — 빌드 뒤 로컬에서 실행 (Chrome 필요, CI 에선 안 돌린다).
# 스크립트 중간에 에러가 나면 뒤쪽이 붙이는 클래스가 DOM 에 없다. 그걸로 판정한다.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
fail=0

dump(){ "$CHROME" --headless=new --disable-gpu --virtual-time-budget=3000 "$@" 2>/dev/null; }
# check <파일> <정규식> <설명> [크롬 플래그...]
check(){
  local f=$1 pat=$2 what=$3; shift 3
  if dump "$@" --dump-dom "file://$PWD/$f" | grep -Eq -- "$pat"
  then echo "✓ $f — $what"; else echo "✗ $f — $what"; fail=1; fi
}

check index.html 'class="tabs has-ink"' '탭 잉크'
check index.html 'class="skins m-reveal"' '카드 스크롤 등장'
for f in skins/*.html; do check "$f" 'class="fv[^"]* m-play' '등장 재생'; done

# 모션 줄이기 — 카드가 투명하게 남으면 안 되고, 카운트업 대상은 최종 값이어야 한다
if dump --force-prefers-reduced-motion --dump-dom "file://$PWD/index.html" | grep -q 'class="skins m-reveal"'
then echo "✗ index.html — 모션 줄이기에서 m-reveal 이 켜짐"; fail=1
else echo "✓ index.html — 모션 줄이기에서 카드 등장 꺼짐"; fi
check skins/neon-engineering.html '<b>99\.98%</b>' '모션 줄이기 — KPI 최종 값' --force-prefers-reduced-motion

exit $fail
