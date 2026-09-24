# 레퍼런스 1건 관리 규약

## 결정 사항

| 항목 | 결정 | 이유 |
|---|---|---|
| 관리 단위 | **화면 1장** | 태깅 축과 1:1. 외주 브리프 범위표에 폴더명을 그대로 복붙 가능 |
| 이미지 | **WebP 변환 후 git 커밋** | 원본 사이트가 개편돼도 남음. 장당 120~200KB, 200건에 60~100MB로 LFS 불필요 |
| 브라우징 | **생성 HTML 갤러리** | 레퍼런스는 눈으로 골라야 함. 외주용은 자체완결 패킷으로 따로 뽑아 링크 공유 |

디테일(호버 처리, 포커스 링 같은 것)은 별도 레코드로 만들지 않는다.
개수가 폭발해서 관리를 포기하게 된다. **해당 화면 레코드의 `## Highlights`** 로 흡수한다.

---

## 폴더

```
references/
  _inbox/                     # 급할 때 이미지만 던져두는 곳
  linear-issue-list/
    meta.md
    01-desktop.webp
    02-hover.webp
  stripe-dashboard/
    meta.md
    01-desktop.webp
```

- 슬러그 = `<제품>-<화면>` (소문자, 하이픈). `linear-issue-list`, `notion-settings`
- 같은 제품의 다른 화면은 **다른 폴더**. `product:` 필드로 묶여서 검색된다.
- 이미지는 `NN-<설명>.webp` 로 번호 접두사. 갤러리에서 `01-` 이 대표 썸네일이 된다.

## meta.md

frontmatter는 기계가 읽고(검색·갤러리·린트), 본문은 사람이 읽는다.

```markdown
---
product: Linear
source: https://linear.app
captured: 2026-08-15
style: [neutral-saas]
layout: [app-shell, dense-table]
page: [list]
components: [data-table, command-k, drawer]
color: dark-neutral
density: high
motion: subtle
verdict: 좋음
---

## Why
행이 500개여도 스캔이 안 흐트러짐. 행 높이 36px, 구분선 없이 hover 배경만으로 처리.

## Highlights
- `02-hover.webp` — hover 시 배경 1단계만 밝아지고 텍스트는 안 움직임
- 포커스 링이 행 전체가 아니라 4px 인셋 → 키보드 탐색이 덜 시끄러움

## Don't take
보라색 액센트. 브랜드와 충돌.
```

### 필수 5개 / 선택 나머지

**필수**: `product`, `source`, `page`, `style`, `## Why`
나머지는 비워도 된다. **한 건에 30초 넘게 걸리면 안 한다** — 그 순간부터 시스템이 죽는다.

### `## Don't take` 이 진짜 이유

외주 브리프(`03`)의 *가져올 것 / 가져오지 말 것* 표를 새로 쓰지 않고 **여기서 복사**하기 위함이다.
핀터레스트·드리블 레퍼런스에는 거의 항상 `## Don't take: 레이아웃 일체` 가 들어간다.

## 태그 어휘는 닫혀 있다

값은 [`docs/vocab.yml`](vocab.yml)에 정의된 것만 쓴다.
`neutral-saas` / `saas-neutral` / `linear-style` 이 공존하기 시작하면 검색이 무너진다.
새 값이 필요하면 vocab.yml에 먼저 추가한다. 갤러리 빌드 시 어휘 밖 태그는 경고로 뜬다.

---

## 워크플로

### 발견 → 저장 (30초)

```bash
# 스크린샷을 _inbox 에 저장해두거나, 바로 등록
scripts/add-ref.sh linear-issue-list ~/Desktop/shot1.png ~/Desktop/shot2.png
```

폴더 생성 + WebP 변환(최대폭 1440px, q75) + `meta.md` 템플릿까지 만들어진다.
`source`, `page`, `style`, `Why` 만 채우고 끝.

바쁘면 `references/_inbox/` 에 이미지만 던져두고 주 1회 몰아서 등록한다.

### 훑어보기 (내가 작업할 때)

형태부터 고를 때는 **기본 패턴 카탈로그**를 먼저 본다. 32종의 기본 레이아웃 변형이
와이어프레임으로 들어 있고, 각 변형마다 태그가 겹치는 내 레퍼런스가 자동 연결된다.

```bash
node scripts/build-patterns.mjs && open patterns.html
```

모아둔 실제 사례를 볼 때는:

```bash
node scripts/build-gallery.mjs && open gallery.html
```

썸네일 그리드 + 태그 필터. 어휘 위반도 여기서 같이 잡힌다.
텍스트로 찾을 땐 `rg "page:.*settings" references/`.

### 외주에 전달할 때

```bash
scripts/build-packet.mjs --out briefs/inventory-app --slugs linear-issue-list,stripe-dashboard
# 또는
scripts/build-packet.mjs --out briefs/inventory-app --filter page=list,settings
```

이미지를 data URI로 박은 **자체완결 HTML 한 장**이 나온다.
`Why` / `Highlights` / `Don't take` 가 레퍼런스마다 붙어 있어서, 그대로 링크만 주면 된다.

> 갤러리 전체(`gallery.html`)는 용량이 커서 공유용이 아니다.
> 외주에는 **필요한 8~10건만 골라낸 패킷**을 보낸다 — 어차피 200건을 다 보낼 일은 없다.

## 커밋 규칙

- 원본 PNG는 커밋하지 않는다 (`.gitignore` 처리됨). WebP만.
- `gallery.html`, `briefs/*/packet.html` 은 생성물이라 커밋하지 않는다.
- 한 커밋에 레퍼런스 여러 건 묶어도 된다. `refs: 설정 화면 5건 추가` 정도로.

## 주의 — 두 가지 함정 (실제로 밟았음)

**1. `## Don't take` 는 meta.md 의 마지막 섹션이다.**
섹션 파서가 `\Z`(JS 정규식에 없는 문법)로 끝을 잡고 있어서 **마지막 섹션만 조용히 비어 있었다.**
하필 외주 브리프의 핵심 필드다. 지금은 줄 단위로 자른다 — `scripts/lib.mjs`의 `section()`.

**2. 1440px 이하 스크린샷은 등록이 안 됐다.**
macOS 기본 bash 3.2 는 `set -u` 에서 빈 배열의 `"${arr[@]}"` 를 에러로 낸다.
리사이즈가 필요 없는 이미지(= 대부분의 브라우저 창 캡처)가 전부 여기서 죽었다.
등록이 안 되니 레퍼런스가 안 쌓였다. `scripts/add-ref.sh` 에서 배열을 걷어냈다.
