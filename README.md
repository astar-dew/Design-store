# design-store

디자인 레퍼런스 저장소 · [astar-dew](https://github.com/astar-dew/Design-store)

> 연락처는 `patterns/contact.mjs` 한 곳에만 있다. 푸터·견적 문의 버튼·이 문서가 전부 그걸 참조한다.
> 공개 저장소라 메일 주소는 `user`/`domain` 으로 나눠 두고 **브라우저에서 합친다** —
> HTML 소스에는 붙은 형태가 남지 않는다. 두 칸을 채우면 문의 버튼이 켜진다.

**목적 2가지**
1. 내가 직접 작업할 때 참고할 디자인을 축별로 정리해두기
2. 외주를 줄 때, 원하는 디자인 형태를 **말이 통하는 언어로** 전달하기

## 빠른 시작

```bash
scripts/build.sh && open index.html      # 초기화면
scripts/add-ref.sh <slug> <이미지...>     # 레퍼런스 1건 등록
```

## 초기화면 = 4개 탭

`index.html` 하나가 입구다. 왼쪽부터 순서대로 고르면 된다.
**디자인 스킬**과 **수주 가이드**는 방문자가 볼 내용이 아니라서 숨겨 두었다 (`scripts/build-index.mjs` 의 `SHOW_SKILL` · `SHOW_INTAKE`).
수주 가이드는 [`docs/07-intake-guide.md`](docs/07-intake-guide.md) 로 빌드 때마다 생성된다.

| 탭 | 무엇 | 다루는 것 | 데이터 |
|---|---|---|---|
| **디자인** | 스타일 스킨 14종 | 무드 (색·타이포·질감·질) | `patterns/skins.mjs` |
| **패턴** | 기본 레이아웃 변형 34종 | 형태 (레이아웃·화면·컴포넌트) | `patterns/patterns.mjs` |
| **레퍼런스** | 실제로 보고 저장한 화면 | 형태 + 무드 둘 다 | `references/<slug>/` |
| **견적** | 화면·스킨·옵션으로 금액 계산 | 돈 | `patterns/pricing.mjs` |

**디자인 탭**의 카드 필터는 **분야**(쇼핑몰·대시보드·교육…)로 건다.
라이트/다크는 디자이너의 축이지 클라이언트의 축이 아니다 — 클라이언트는 "쇼핑몰 하려고요"라고 말한다.
필터의 분야↔스킨 매핑은 **수주 가이드(`domains.mjs`)의 추천 스킨을 그대로 쓴다** —
가이드와 필터가 어긋나면 안 되기 때문이고, 어느 분야에도 없는 스킨이 생기면 빌드가 실패한다.
톤은 카드의 배지(라이트/다크)와 상단 스위치가 담당한다.

**디자인 탭**의 카드는 각 스킨이 **가장 잘 맞는 분야의 화면 조각**을 보여준다
(커머스·금융·모니터링·미디어·예약… — `patterns/scenes.mjs`).
전부 같은 화면이면 "색상만 바꾼 것"으로 읽히기 때문이다.
카드를 누르면 **스킨 전용 페이지**(`skins/<id>.html`)로 이동한다.
그 페이지는 그 스킨 분야의 **실제 레이아웃**을 보여준다 — 쇼핑몰은 제품 그리드,
매거진은 본문+목차, 모니터링은 로그+메트릭처럼. 전부 대시보드로 보여주면
"색만 다른 대시보드 10장"이 되기 때문이다 (`patterns/layouts.mjs`).

목업의 **사이드바·상단 메뉴는 실제로 눌린다** — 누르면 그 분야의 다른 화면으로 전환된다
(14개 레이아웃 합계 **71종**). 대시보드 → 주문 목록 → 고객 → 리포트 → 설정처럼
분야마다 4~6종. 눌러도 안 바뀌는 메뉴는 데모에서 가장 먼저 들키는 부분이라,
**내비가 가리키는 뷰가 없거나 내비에서 못 여는 뷰가 있으면 빌드가 실패한다.**
하단에는 호버·눌림·포커스·비활성이 실제로 동작하는 **컴포넌트 상태 데모**가 붙어 있어
클라이언트가 직접 만져볼 수 있다.

**화면과 모드는 URL 에 실린다.** 외주에서 "이 스킨 봐주세요"보다
"이 스킨의 주문 목록을 다크로 봐주세요"가 훨씬 잘 통하기 때문이다.

```
skins/cobalt-gray.html            기본 화면 · 스킨 고유 모드
skins/cobalt-gray.html#orders     주문 목록
skins/cobalt-gray.html#orders/dark  주문 목록 · 다크
skins/deep-forest.html#/light     기본 화면 · 라이트
```

뒤로가기로 직전 화면으로 돌아온다. 디자인 탭에서 라이트/다크를 눌러 둔 상태로 카드를 열면
그 모드가 그대로 따라간다.

> 좁은 화면(≤720px)에서 목업은 **가로 스크롤**된다. 폭에 맞춰 줄이면
> 본문이 5px가 되어 아무것도 안 읽히기 때문이다 — 목업은 축소 대상이 아니라 도면에 가깝다.

| 스킨 | 분야 레이아웃 |
|---|---|
| `cobalt-gray` | SaaS 대시보드 |
| `sand-clay` | 쇼핑몰 · 커머스 |
| `ink-cream` | 콘텐츠 · 에디토리얼 |
| `oled-void` | 미디어 · 음악 |
| `neon-engineering` | 모니터링 · 인프라 |
| `black-yellow` | 물류 · 배송 |
| `blueprint` | CAD · 설계 |
| `deep-forest` | 금융 · 자산관리 |
| `navy-signal` | 운영 · 작업관리 |
| `mint-paper` | 헬스케어 · 예약 |
| `indigo-class` | 교육 · 클래스 |
| `rose-lounge` | 커뮤니티 · 소셜 |
| `civic-blue` | 공공 · 기관 |
| `stark-mono` | 브랜드 · 랜딩 |

각 레이아웃의 화면 목록은 `patterns/layouts.mjs` 의 `views` 에 있다.
목록·설정·개체 격자처럼 반복되는 형태는 아키타입(`listScreen` / `setScreen` / `people`)으로 두고,
분야 고유 화면(플레이어 검색·도면·예약 캘린더)만 따로 그린다.

탭끼리는 태그로 연결된다.

| 어디에 | 무엇이 붙나 |
|---|---|
| 디자인 탭 카드 | `style` 태그가 같은 레퍼런스 **건수 배지** |
| 스킨 전용 페이지 | **내 레퍼런스** 섹션 — 썸네일 + 왜 저장했는지 + `가져오지 말 것` |
| 패턴 탭 카드 | 태그가 겹치는 건수 → 누르면 **레퍼런스 탭이 그것만 남기고 필터**된다 |
| 레퍼런스 탭 | 스킨별 필터 칩 + 카드 클릭 시 상세(왜 / 가져올 것 / 가져오지 말 것 / 태그) |
| 레퍼런스 탭 상단 | 어휘 밖 태그·필수 필드 누락 **경고 배너** (빌드 로그에만 있으면 아무도 안 본다) |

> 각 탭은 단독 페이지로도 있다: `patterns.html`, `gallery.html`.
> 초기화면은 훑어보기용, 단독 페이지는 필터를 걸고 파고들 때 쓴다.

## 문서

| 문서 | 내용 |
|---|---|
| [01-design-taxonomy.md](docs/01-design-taxonomy.md) | 디자인 형태 분류 — 스타일/레이아웃/화면/컴포넌트/표현 5개 축 |
| [02-reference-sources.md](docs/02-reference-sources.md) | 수집처 목록 + 핀터레스트류 사용 시 주의점 |
| [03-outsourcing-brief.md](docs/03-outsourcing-brief.md) | 외주 브리프 템플릿 + 검수 체크리스트 |
| [04-reference-management.md](docs/04-reference-management.md) | 레퍼런스 1건을 어떤 형태로 관리하는지 |
| [05-showcase-request.md](docs/05-showcase-request.md) | 팔리는 화면을 요청하는 법 — 쇼케이스/프로덕션 구분 |
| [06-pricing.md](docs/06-pricing.md) | 가격 산정 구조 · 다크모드 추가금액 범위 |
| [vocab.yml](docs/vocab.yml) | 태그 닫힌 어휘 — 값은 여기 있는 것만 사용 |

## 폴더 구조

```
docs/                       # 위 문서들
patterns/skins.mjs          # 스타일 스킨 데이터 (디자인 탭) — 라이트/다크 쌍
patterns/scenes.mjs         # 카드 프리뷰 씬 — 스킨별 분야 화면 조각
patterns/domains.mjs        # 분야 가이드 — 질문·레이아웃·스킨·화면 매핑 (수주 가이드 탭)
patterns/layouts.mjs        # 도메인별 풀 레이아웃 10종 (스킨 전용 페이지 본체)
patterns/skillbook.mjs      # 디자인 품질 기준 + 납품 검수 체크리스트 (디자인 스킬 탭)
patterns/motion.mjs         # 모션 성격 5종 · 시그니처 14종 · 스킨 매핑 (스킨 페이지와 카드가 쓴다)
patterns/pricing.mjs        # 화면 단가·스킨 계수·옵션 비율 (견적 탭)
patterns/patterns.mjs       # 기본 패턴 카탈로그 데이터 (패턴 탭)
references/
  _inbox/                   # 급할 때 이미지만 던져두는 곳
  <slug>/                   # 예: linear-issue-list/
    meta.md                 # 태깅 + Why / Highlights / Don't take
    01-*.webp
briefs/<project>/           # 외주 브리프 + 생성된 패킷
scripts/
```

## 스크립트

| 명령 | 하는 일 |
|---|---|
| `scripts/add-ref.sh <slug> [이미지...]` | 폴더 생성 + WebP 변환(최대폭 1440px, q75) + `meta.md` 템플릿 |
| `scripts/add-ref.sh <slug> --inbox` | `_inbox` 안의 이미지를 전부 이 레퍼런스로 등록 |
| `scripts/check-contrast.mjs` | 스킨 토큰 대비 검사 — **미달이면 빌드가 멈춘다** |
| `scripts/build.sh` | 대비 검사 → 아래를 전부 다시 빌드 → `node --test` (실패하면 배포도 멈춘다) |
| `scripts/check-pages.sh` | 로컬 Chrome 으로 열어 모션 JS 가 끝까지 도는지 · 모션 줄이기에서 멀쩡한지 확인 |
| `scripts/build-index.mjs` | → `index.html` (초기화면, 5개 탭) |
| `scripts/build-patterns.mjs` | → `patterns.html` (기본 패턴 카탈로그 단독) |
| `scripts/build-skins.mjs` | → `skins/<id>.html` (스킨 전용 페이지 — 화면 전환 + 상태 데모) |
| `scripts/build-gallery.mjs` | → `gallery.html` (축별 정밀 필터 — 탭은 훑어보기, 갤러리는 파고들기) |
| `scripts/build-intake-doc.mjs` | → `docs/07-intake-guide.md` (수주 가이드 — `domains.mjs` 에서 생성, 손으로 고치지 말 것) |
| `scripts/build-packet.mjs --out briefs/<이름> --slugs a,b` | → 자체완결 `packet.html` (외주 전달용) |

의존성 없음 (node 18+, `cwebp`만 필요 — `brew install webp`).

## 쓰는 법

- **모을 때**: `add-ref.sh` 로 등록하고 `product` / `source` / `page` / `style` / `## Why` 5개만 채운다.
  왜 저장했는지 한 줄이 없으면 나중에 못 쓴다. 바쁘면 `_inbox`에 던져두고 주 1회 정리.
- **작업할 때**: 디자인 탭에서 스킨을 고르고 → 패턴 탭에서 형태를 고르고 → 레퍼런스 탭에서 실제 사례를 본다.
- **품질을 볼 때**: 디자인 스킬 탭은 영향도 순으로 정렬돼 있다. 위에서부터 지키고 시간이 모자라면 아래를 버린다.
  1~2번(접근성·터치)이 깨지면 예쁜 화면도 못 쓰는 화면이 된다.
- **외주 줄 때**: `03` 템플릿에 스킨 ID(`cobalt-gray`)와 패턴 ID(`shell-rail`, `auth-split`)를 적고,
  `build-packet.mjs`로 뽑은 패킷 링크를 함께 준다.
  각 레퍼런스의 **`Don't take`** 가 그대로 "가져오지 말 것"이 된다.
- **결과물 받을 때**: 디자인 스킬 탭 맨 아래 **납품 검수 체크리스트** 21줄을 그대로 훑는다.
  체크 상태는 브라우저에 저장되므로 검수 회차를 나눠서 봐도 된다.
