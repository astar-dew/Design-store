# 레퍼런스 수집처

용도별로 갈래가 다르다. 한 곳만 파면 결과물이 그 사이트 톤으로 수렴한다.

## A. 실제 제품 UI (앱 내부 화면) — 가장 실무에 직결

| 사이트 | 특징 | 비고 |
|---|---|---|
| [Mobbin](https://mobbin.com) | iOS/Android/Web 실제 앱 화면을 **플로우 단위**로 아카이빙. 화면 타입·컴포넌트로 필터 | 유료. 이 카테고리 1순위. 2025년부터 마케팅 페이지 모음(Mobbin Sites)도 추가 |
| [Refero](https://refero.design) | 11만+ 웹앱 스크린, 태깅 정교 | Mobbin 대안, 웹 중심 |
| [Page Flows](https://pageflows.com) | 플로우를 **영상**으로 기록 (온보딩·결제 등) | 인터랙션·전환 참고에 강함 |
| [Screenlane](https://screenlane.com) | 모바일 UI 화면, 무료 | 가볍게 훑기용 |
| [UI Sources](https://uisources.com) | 인터랙션 단위 분해 | 모션 레퍼런스 |

## B. 랜딩 / 마케팅 페이지

| 사이트 | 특징 |
|---|---|
| [Land-book](https://land-book.com) | 랜딩 큐레이션의 고전. 카테고리·스타일 필터 |
| [SaaS Landing Page](https://saaslandingpage.com) | SaaS 랜딩 전용, 섹션 단위로 뜯어봄 |
| [SaaSFrame](https://saasframe.io) / [Saaspo](https://saaspo.com) | SaaS 랜딩 + 이메일 + 온보딩 |
| [Godly](https://godly.website) | 요즘 감성 웹사이트. AI툴·에이전시·포트폴리오 강세 |
| [Lapa Ninja](https://www.lapa.ninja) | 무료, 양 많음 |
| [Curated.design](https://curated.design) | 취향 좋은 큐레이션 |

## C. 어워드 / 하이엔드 (인터랙션·3D)

- [Awwwards](https://www.awwwards.com) — 화려한 인터랙션, 실무 이식성은 낮음
- [FWA](https://thefwa.com), [httpster](https://httpster.net), [SiteInspire](https://www.siteinspire.com)
- 용도: "이 정도 임팩트" 를 보여줄 때. **그대로 만들자고 하면 견적이 3배 됨.**

## D. 핀터레스트 / 드리블 계열 — 주의해서 사용

- [Pinterest](https://pinterest.com) — 무드보드·컬러·그래픽 소재 수집엔 최고
- [Dribbble](https://dribbble.com) / [Behance](https://behance.net) — 컨셉 샷

> ⚠️ **핀터레스트·드리블의 함정**
> 대부분 **실제 동작하지 않는 컨셉 이미지**다. 빈 상태·에러·긴 텍스트·많은 데이터가 없다.
> 이걸 그대로 외주에 주면 "화면은 예쁜데 실제 데이터 넣으면 다 깨지는" 결과가 나온다.
>
> **사용 규칙**: 핀터레스트는 **축 1(스타일)·축 5(색·타이포·소재)** 전달용으로만.
> **축 2~4(레이아웃·화면·컴포넌트)** 는 반드시 A그룹(실제 제품)에서 가져올 것.

## E. 디자인 시스템 원문 (규칙을 확인할 때)

- [Material Design 3](https://m3.material.io), [Apple HIG](https://developer.apple.com/design/human-interface-guidelines)
- [shadcn/ui](https://ui.shadcn.com), [Radix](https://www.radix-ui.com), [Base UI](https://base-ui.com)
- [Untitled UI](https://www.untitledui.com), [Vercel Geist](https://vercel.com/geist)
- 용도: 외주 결과물의 **접근성·상태·간격**을 검수할 때 근거로 씀.

---

## 수집 루틴 (주 1회, 20분)

1. A그룹에서 **내 프로젝트와 같은 화면 타입** 3개 캡처 (예: 이번 주는 "설정 화면")
2. B/C그룹에서 마음에 든 것 2개
3. 각각 `references/<slug>/` 에 스크린샷 + `meta.md` 저장 → `verdict`, `why` 한 줄 필수
4. 핀터레스트 보드는 **스타일 축별로 분리**해서 운영 (`neo-brutalism`, `editorial`, `dark-neon` …). 하나의 잡탕 보드는 쓸모없다.
