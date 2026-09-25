# 모션 · 인터랙션 설계

2026-09-25 · 대상: `index.html`(초기화면), `skins/<id>.html`(스킨 페이지)

## 목적

이 사이트는 두 사람이 본다.

1. **잠재 고객** — 첫인상으로 "잘 만든다"를 봐야 한다. 쇼케이스.
2. **나·협업자** — 스킨·패턴을 고르고 비교한다. 작업 도구.

그래서 모션은 장식이 아니라 **스킨의 일부**로 다룬다. 스킨마다 색·타이포가 다르듯 움직임도 다르고,
외주 지시서에 "모션: 정밀 / 시그니처: 카운트업"처럼 그대로 적을 수 있어야 한다.
동시에 **깔끔함을 유지하는 스킨**이 분명히 있어야 하고, 고객이 그걸 골라낼 수 있어야 한다.

## 성공 기준

- 14개 스킨 모두 성격 1개 + 시그니처 1개를 가진다. 빠진 게 있으면 빌드가 실패한다.
- 스킨 페이지를 열면 그 스킨다운 등장 → 시그니처가 한 번 재생되고, 화면 전환·호버에 성격이 드러난다.
- 초기화면에서 "깔끔한 모션만" 필터로 절제형 스킨만 볼 수 있다.
- `prefers-reduced-motion` 에서 등장·반복 효과가 전부 꺼지고 최종 상태가 바로 보인다. 레이아웃은 깨지지 않는다.
- 라이브러리 추가 없음. 대비 검사(`check-contrast.mjs`)는 영향 없음.

## 모션 성격 5종

성격 하나가 지속시간·가속·등장 방식을 정한다. CSS 변수로 표현한다.

| 성격 | 강도 배지 | `--m-dur` | `--m-ease` | 등장(`--m-enter`) | 느낌 |
|---|---|---|---|---|---|
| **절제** `restrained` | 절제 | 140ms | `cubic-bezier(.2,0,0,1)` | 페이드만 | 움직였는지 모를 정도 |
| **정밀** `precise` | 보통 | 120ms | `linear` / `steps()` | 클립 와이프 | 기계적, 딱딱 끊김 |
| **발광** `glow` | 보통 | 320ms | `ease-out` | 어둠에서 켜짐 (opacity + brightness) | 조용히 빛남 |
| **무게감** `weighty` | 보통 | 420ms | `cubic-bezier(.16,1,.3,1)` | 12px 아래에서 감속하며 올라옴 | 묵직, 느린 착지 |
| **탄성** `soft` | 활발 | 360ms | `cubic-bezier(.34,1.56,.64,1)` | scale .97 → 1 + 페이드 | 말랑, 살짝 튕김 |

## 스킨별 매핑

| 스킨 | 성격 | 시그니처 | 대상 (레이아웃에 실재하는 클래스) |
|---|---|---|---|
| cobalt-gray | 절제 | 액센트 밑줄이 슥 그어짐 | `.fv-link`, `.fv-nav.is-on` |
| stark-mono | 절제 | 헤드라인이 가림막 뒤에서 드러남 + 호버 흑백 반전 | `.mono-h`, `.fv-btn` |
| ink-cream | 절제 | 커버가 흐림→선명 + 스크롤 읽기 진도 (2026-09-25 리프레시로 괘선 긋기에서 교체) | `.lay-hero`, `.lay-read` |
| civic-blue | 절제 (**등장 모션 0**) | 굵은 포커스 링 강조 — 안 움직이는 게 콘셉트 | `:focus-visible` 전체 |
| black-yellow | 정밀 | 호버 시 노랑 블록이 옆에서 밀려와 채움 | `.fv-btn` |
| blueprint | 정밀 | 도면 선이 그려짐 + 커서 좌표 표시 | `.lay-cad` (svg stroke-dashoffset) |
| neon-engineering | 정밀 | 수치 0→값 카운트업 + 차트 선 그려짐 | `.fv-kpi`, `.fv-line` |
| oled-void | 발광 | 호버 시 은은한 글로우 | `.fv-card`, `.lay-prog` |
| navy-signal | 발광 | 오렌지 시그널 점 하나만 펄스 | 첫 `.fv-cnt` |
| deep-forest | 무게감 | 골드 라인에 광택이 한 번 스침 | `.lay-total` |
| sand-clay | 무게감 | 도장 찍힘 (2026-09-25 앤틱 리프레시로 눌림에서 교체) | `.lay-new`, `.lay-off`, `.lay-cart` |
| mint-paper | 탄성 | 카드가 살짝 떠오름 | `.fv-card` |
| indigo-class | 탄성 | 진도 바가 차오르고 완료 체크가 그려짐 | `.lms-prog`, `.fv-bar`, `.lms-dot` |
| rose-lounge | 탄성 | 추천·좋아요 버튼 팝 | `.rl-up` |

rose-lounge 는 처음에 "아바타 묶음 펼침"으로 잡았지만 해당 레이아웃에 아바타 묶음이 없어 추천 버튼 팝으로 바꿨다.

## 구조

### `patterns/motion.mjs` (신규)

`skins.mjs` 는 이미 크므로 붙이지 않는다. `SCENES` · `LAYOUT_FOR` 와 같은 방식의 별도 매핑.

```js
export const PERSONAS = {
  restrained: { name: '절제', level: '절제', dur: '140ms', ease: '...', enter: 'fade' },
  // precise · glow · weighty · soft
}
export const SIGNATURES = {
  'accent-underline': { name: '액센트 밑줄', targets: ['.fv-link', '.fv-nav'], css: `...`, js: null },
  'count-up':         { name: '카운트업',   targets: ['.fv-kpi', '.fv-line'], css: `...`, js: `...` },
  // 14개
}
export const MOTION_FOR = {
  'cobalt-gray': { persona: 'restrained', sig: 'accent-underline' },
  // 14개
}
export function motionCss(skinId) { /* 성격 변수 + 시그니처 CSS, .sk-<id> 로 스코프 */ }
export function motionJs(skinId)  { /* 시그니처 JS (없으면 '') */ }
```

- CSS 는 전부 `.sk-<id>` 로 스코프한다 — 초기화면에서 카드 14장이 한 페이지에 같이 있기 때문.
- 등장·시그니처는 `.m-play` 클래스가 붙을 때 재생된다. 떼었다 붙이면 다시 재생.

### 빌드 가드

`motion.mjs` 를 읽는 쪽(`build-skins.mjs`)에서 검사하고 어기면 `throw`:

1. `SKINS` 의 모든 id 가 `MOTION_FOR` 에 있다.
2. 각 시그니처의 `targets` 중 적어도 하나가 그 스킨의 `renderLayout(LAYOUT_FOR[id])` 출력에 있다.
   레이아웃을 고쳤을 때 효과가 조용히 사라지는 걸 막는다.

### 스킨 페이지 (`build-skins.mjs`)

- 로드 시 목업이 성격대로 등장 → 시그니처 1회 재생.
- 화면 전환(사이드바·탭 클릭) 시 새 뷰가 성격대로 들어온다. 기존 `render()` 에서 뷰에 `.m-play` 를 다시 붙인다.
- 호버·눌림 인터랙션은 항상 동작.
- **▶ 다시 보기** 버튼 — `stage-hint` 옆. 등장+시그니처를 다시 재생.
- 정보 영역 `<dl>` 에 `모션` 항목 추가: 성격 · 강도 · 시그니처 한 줄 설명.

### 초기화면 (`build-index.mjs`)

- 탭: 밑줄 인디케이터가 선택 탭으로 미끄러져 이동. 패널은 짧은 교차 페이드(160ms).
- 스킨 카드: 스크롤로 보일 때 순서대로 떠오름(`IntersectionObserver`, 카드당 40ms 지연, 최대 8장까지만 지연).
- 카드 호버 시 프리뷰 안에서 그 스킨 시그니처를 가볍게 미리보기. 프리뷰(`.pv`) 에 있는 요소만 대상으로 하며,
  대상이 없으면 성격의 등장 효과만 보여준다.
- 카드 메타에 **모션 강도 배지**(절제/보통/활발). 톤 배지와 같은 모양, 글자로 말한다.
- 필터 줄에 **"깔끔한 모션만"** 토글 칩. 분야 칩과 AND 로 결합하고, 표시 개수(`dz-count`)에 반영.

## 접근성 · 성능

- 움직임은 `transform` · `opacity` · `clip-path` · `stroke-dashoffset` · `filter` 만 쓴다. 레이아웃 속성은 애니메이션하지 않는다.
- `prefers-reduced-motion: reduce` 에서:
  - 등장 · 시그니처 · 펄스 · 카운트업 전부 끔. 카운트업은 최종 값을 바로 표시.
  - 호버 시 색 변화는 유지, 이동·확대는 끔.
  - 기존 전역 규칙(`transition-duration:.01ms`)과 함께 동작.
- 반복 애니메이션은 navy-signal 펄스 하나뿐. 화면에 안 보이면 멈춘다(`animation-play-state`).
- JS 는 카운트업 · 스크롤 등장 · 다시 보기에만. 각 수십 줄 이내.

## 검증

1. `scripts/build.sh` — 대비 검사 + 위 빌드 가드 통과.
2. 헤드리스 Chrome 으로 `index.html` + `skins/*.html` 14장을 열어 콘솔 에러 0건.
3. 헤드리스 Chrome 에 reduced-motion 을 켜고 스크린샷 — 카운트업 대상이 최종 값으로 보이는지.
4. 사람이 확인: 스킨 3종(civic-blue · neon-engineering · rose-lounge)을 열어 성격 차이가 드러나는지.

## 범위 밖

- 레퍼런스 탭 · 패턴 탭 · 견적 탭 · 갤러리 모션 (탭 전환 공통 효과만 적용)
- 외주 패킷(`build-packet.mjs`) 에 모션 반영
- 디자인 스킬 탭 (숨김 상태)
