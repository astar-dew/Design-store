#!/usr/bin/env bash
# 레퍼런스 1건 등록: 폴더 생성 + WebP 변환 + meta.md 템플릿
#
#   scripts/add-ref.sh <slug> [이미지...]
#   scripts/add-ref.sh linear-issue-list ~/Desktop/shot1.png ~/Desktop/shot2.png
#   scripts/add-ref.sh notion-settings                 # 이미지는 나중에
#   scripts/add-ref.sh figma-canvas --inbox            # _inbox 안의 이미지 전부 사용
set -euo pipefail

MAXW=1440
QUALITY=75

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REFS="$REPO/references"

if [ $# -lt 1 ]; then
  sed -n '2,8p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
  exit 1
fi

SLUG="$1"; shift
if ! [[ "$SLUG" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "✗ 슬러그는 소문자-하이픈만: <제품>-<화면>  (예: linear-issue-list)" >&2
  exit 1
fi

command -v cwebp >/dev/null || { echo "✗ cwebp 없음 → brew install webp" >&2; exit 1; }

DIR="$REFS/$SLUG"
mkdir -p "$DIR"

# --inbox 지정 시 _inbox 이미지를 소스로
SRCS=()
if [ "${1:-}" = "--inbox" ]; then
  shift
  while IFS= read -r f; do SRCS+=("$f"); done < <(find "$REFS/_inbox" -maxdepth 1 -type f \
    \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.heic' -o -iname '*.webp' \) | sort)
  [ ${#SRCS[@]} -eq 0 ] && echo "  (_inbox 비어 있음)"
fi
SRCS+=("$@")

# 기존 이미지 다음 번호부터
n=$(find "$DIR" -maxdepth 1 -name '[0-9][0-9]-*.webp' | wc -l | tr -d ' ')

for src in "${SRCS[@]:-}"; do
  [ -z "$src" ] && continue
  [ -f "$src" ] || { echo "✗ 파일 없음: $src" >&2; continue; }

  n=$((n + 1))
  base="$(basename "${src%.*}" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-')"
  [ -z "$base" ] && base="shot"
  out="$DIR/$(printf '%02d' "$n")-$base.webp"

  work="$src"
  tmp=""
  if [[ "$src" =~ \.[Hh][Ee][Ii][Cc]$ ]]; then       # cwebp 는 HEIC 못 읽음
    tmp="$(mktemp -t addref).png"
    sips -s format png "$src" --out "$tmp" >/dev/null
    work="$tmp"
  fi

  w=$(sips -g pixelWidth "$work" 2>/dev/null | awk '/pixelWidth/{print $2}')

  # macOS 기본 bash 3.2 는 set -u 에서 빈 배열의 "${arr[@]}" 를 에러로 낸다.
  # 1440px 이하 스크린샷(= 대부분)이 전부 여기서 죽었다. 배열을 쓰지 않는다.
  if [ -n "${w:-}" ] && [ "$w" -gt "$MAXW" ]; then
    cwebp -quiet -q "$QUALITY" -resize "$MAXW" 0 "$work" -o "$out"
    note="${MAXW}px"
  else
    cwebp -quiet -q "$QUALITY" "$work" -o "$out"
    note="그대로"
  fi
  [ -n "$tmp" ] && rm -f "$tmp"

  size=$(du -h "$out" | cut -f1 | tr -d ' ')
  echo "  ✓ $(basename "$out")  ${w:-?}px → $note  $size"
done

META="$DIR/meta.md"
if [ -f "$META" ]; then
  echo "  · meta.md 이미 있음 — 유지"
else
  cat > "$META" <<EOF
---
product:
source:
captured: $(date +%F)
style: []
layout: []
page: []
components: []
color:
density:
motion:
verdict:
---

## Why


## Highlights
-

## Don't take

EOF
  echo "  ✓ meta.md 생성"
fi

echo ""
echo "→ $DIR"
echo "  필수 5개만 채우면 끝: product / source / page / style / ## Why"
echo "  태그 값은 docs/vocab.yml 참고"
