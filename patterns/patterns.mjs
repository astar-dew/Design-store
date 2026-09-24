// 기본 컴포넌트·레이아웃 카탈로그 데이터
//
// 와이어프레임은 "형태"만 보여준다. 색·타이포·질감은 축 1/5(스타일)의 영역이고
// 여기는 축 2/3/4(레이아웃·화면·컴포넌트)만 다룬다.
// scripts/build-patterns.mjs 가 이 파일을 읽어 patterns.html 을 만든다.

/* ---------- 와이어프레임 헬퍼 ---------- */
const L = (w = '100%', h = 5) => `<i class="ln" style="width:${w};height:${h}px"></i>`
const LS = (w = '100%', h = 7) => `<i class="ln strong" style="width:${w};height:${h}px"></i>`
const box = (cls, style, kids = '') => `<div class="${cls}" style="${style}">${kids}</div>`
const R = (style, kids = '') => box('r', style, kids)
const C = (style, kids = '') => box('c', style, kids)

const nav = (n, active = 0, w = '68%') =>
  Array.from({ length: n }, (_, i) => `<div class="ni${i === active ? ' on' : ''}"><i class="sq"></i>${L(w)}</div>`).join('')

const rail = (n, active = 0) =>
  Array.from({ length: n }, (_, i) => `<i class="sq lg${i === active ? ' on' : ''}"></i>`).join('')

const rows = (n, widths = ['30%', '22%', '18%', '14%']) =>
  Array.from({ length: n }, () =>
    `<div class="tr">${widths.map(w => L(w)).join('')}</div>`).join('')

const field = (label = true) =>
  `<div class="c" style="gap:3px">${label ? L('26%', 4) : ''}<div class="fld"></div></div>`

const cards = n => Array.from({ length: n }, () => `<div class="cd"></div>`).join('')

const topbar = (extra = '') =>
  R('height:22px;align-items:center;gap:6px;padding:0 8px;border-bottom:1px solid var(--wline);flex:none',
    `<i class="sq"></i>${L('54px', 5)}<div style="flex:1"></div>${extra}<i class="sq"></i>`)

const chart = (h = 52) =>
  box('sur chart', `height:${h}px;padding:6px;gap:2px;align-items:flex-end`,
    [30, 55, 40, 70, 48, 82, 62, 38, 74, 50].map(v => `<i class="bar" style="height:${v}%"></i>`).join(''))

const kpi = n => R('gap:6px', Array.from({ length: n }, () =>
  box('sur', 'flex:1;padding:6px;gap:4px;display:flex;flex-direction:column', L('50%', 4) + LS('60%', 9))).join(''))

/* ---------- 카탈로그 ---------- */
export const GROUPS = [
  {
    id: 'app-shell',
    name: '앱 레이아웃 (셸)',
    note: '앱 전체의 골격. 여기서 정한 게 모든 화면을 지배하므로 가장 먼저 결정한다.',
    variants: [
      {
        id: 'shell-sidebar', name: '사이드바 + 콘텐츠', tags: ['app-shell'],
        when: '메뉴 5~15개인 대부분의 웹앱. 가장 무난한 기본값.',
        watch: '사이드바 폭은 220~260px. 메뉴 depth 3단 넘어가면 이 형태로는 붕괴한다.',
        wire: R('', [
          C('width:64px;border-right:1px solid var(--wline);padding:8px 6px;gap:4px;background:var(--wsur)',
            LS('70%', 7) + `<div style="height:4px"></div>` + nav(5, 1)),
          C('flex:1', topbar() + C('padding:10px;gap:8px;flex:1', LS('40%', 9) + kpi(3) + chart(46))),
        ].join('')),
      },
      {
        id: 'shell-rail', name: '아이콘 레일 (접힘)', tags: ['app-shell'],
        when: '콘텐츠 폭이 중요한 앱(에디터, 캔버스, 대시보드). 확장/접힘 토글과 세트.',
        watch: '아이콘만으로는 의미 전달이 안 된다. 툴팁 필수, 그리고 접힌 상태를 기본값으로 두지 말 것.',
        wire: R('', [
          C('width:26px;border-right:1px solid var(--wline);padding:8px 0;gap:6px;align-items:center;background:var(--wsur)',
            rail(6, 1)),
          C('flex:1', topbar() + C('padding:10px;gap:8px;flex:1', LS('34%', 9) + kpi(4) + chart(50))),
        ].join('')),
      },
      {
        id: 'shell-dual', name: '레일 + 보조 패널', tags: ['app-shell'],
        when: '영역이 크게 나뉘는 제품(Slack, Discord, Notion). 레일=최상위 전환, 패널=그 안의 목록.',
        watch: '두 단계로 나뉘니 "지금 어디에 있는지" 표시가 두 곳 다 필요하다.',
        wire: R('', [
          C('width:24px;border-right:1px solid var(--wline);padding:8px 0;gap:6px;align-items:center;background:var(--wsur2)', rail(5, 0)),
          C('width:58px;border-right:1px solid var(--wline);padding:8px 6px;gap:4px;background:var(--wsur)',
            LS('66%', 7) + `<div style="height:2px"></div>` + nav(6, 2, '74%')),
          C('flex:1', topbar() + C('padding:10px;gap:6px;flex:1', LS('44%', 9) + L('92%') + L('80%') + L('88%') + L('60%'))),
        ].join('')),
      },
      {
        id: 'shell-topbar', name: '탑바 전용 (사이드바 없음)', tags: ['app-shell'],
        when: '최상위 영역이 3~5개뿐인 제품. 마케팅 사이트와 톤을 맞추기 쉽다.',
        watch: '메뉴가 늘어나면 확장 여지가 없다. 나중에 사이드바로 옮기는 건 큰 공사.',
        wire: C('', [
          R('height:24px;align-items:center;gap:10px;padding:0 10px;border-bottom:1px solid var(--wline);background:var(--wsur);flex:none',
            `<i class="sq"></i>` + L('34px', 5) + L('28px', 5) + L('30px', 5) + `<div style="flex:1"></div><i class="sq"></i>`),
          C('padding:12px 16px;gap:8px;flex:1', LS('36%', 9) + kpi(3) + chart(48)),
        ].join('')),
      },
      {
        id: 'shell-3col', name: '3단 (목록 → 하위목록 → 상세)', tags: ['three-column'],
        when: '메일, 채팅, 이슈트래커처럼 "훑고 → 고르고 → 읽는" 흐름.',
        watch: '태블릿 폭(1024px 이하)에서 어느 컬럼을 접을지 규칙을 미리 정해야 한다.',
        wire: R('', [
          C('width:44px;border-right:1px solid var(--wline);padding:8px 5px;gap:3px;background:var(--wsur)', nav(5, 0, '70%')),
          C('width:74px;border-right:1px solid var(--wline);padding:8px 6px;gap:6px;background:var(--wsur2)',
            L('50%', 4) + Array.from({ length: 5 }, (_, i) =>
              `<div class="li${i === 1 ? ' on' : ''}">${LS('72%', 5)}${L('92%', 4)}</div>`).join('')),
          C('flex:1;padding:10px;gap:6px', LS('58%', 10) + L('30%', 4) + `<div style="height:4px"></div>` + L('96%') + L('90%') + L('94%') + L('62%')),
        ].join('')),
      },
      {
        id: 'shell-inspector', name: '사이드바 + 우측 인스펙터', tags: ['app-shell'],
        when: '선택한 대상의 속성을 계속 편집하는 도구(디자인 툴, CMS, 어드민).',
        watch: '양쪽 패널이 콘텐츠를 압박한다. 최소 1280px 확보하거나 인스펙터를 드로어로.',
        wire: R('', [
          C('width:52px;border-right:1px solid var(--wline);padding:8px 6px;gap:4px;background:var(--wsur)', nav(5, 2)),
          C('flex:1', topbar() + C('padding:10px;gap:6px;flex:1;align-items:center;justify-content:center',
            box('sur', 'width:74%;height:56px;border-style:dashed'))),
          C('width:56px;border-left:1px solid var(--wline);padding:8px 6px;gap:6px;background:var(--wsur)',
            L('54%', 4) + field(false) + field(false) + L('44%', 4) + field(false)),
        ].join('')),
      },
    ],
  },

  {
    id: 'sidebar',
    name: '사이드 메뉴',
    note: '셸을 정한 뒤 사이드바 내부 구조를 정한다. 메뉴 개수와 depth가 선택을 좌우한다.',
    variants: [
      {
        id: 'side-flat', name: '플랫 리스트', tags: ['sidebar'],
        when: '메뉴 7개 이하. 그룹 라벨 없이 아이콘+텍스트만.',
        watch: '10개를 넘기는 순간 스캔이 안 된다. 그때 그룹형으로 넘어가야 한다.',
        wire: R('', [
          C('width:88px;border-right:1px solid var(--wline);padding:10px 8px;gap:5px;background:var(--wsur)',
            LS('60%', 8) + `<div style="height:6px"></div>` + nav(6, 1, '72%')),
          C('flex:1;padding:12px;gap:8px', LS('40%', 9) + L('90%') + L('76%')),
        ].join('')),
      },
      {
        id: 'side-grouped', name: '섹션 그룹 + 라벨', tags: ['sidebar'],
        when: '메뉴 8~20개. 성격별로 3~5개 묶음(작업 / 분석 / 설정).',
        watch: '그룹 라벨은 클릭 대상이 아니게. 라벨이 눌리는 것처럼 보이면 오조작이 난다.',
        wire: R('', [
          C('width:88px;border-right:1px solid var(--wline);padding:10px 8px;gap:4px;background:var(--wsur)',
            LS('60%', 8) + `<div style="height:5px"></div>` +
            `<i class="lbl"></i>` + nav(3, 1, '70%') +
            `<div style="height:5px"></div><i class="lbl"></i>` + nav(3, -1, '64%')),
          C('flex:1;padding:12px;gap:8px', LS('40%', 9) + L('90%') + L('76%')),
        ].join('')),
      },
      {
        id: 'side-tree', name: '접히는 트리 (아코디언)', tags: ['sidebar', 'accordion'],
        when: '문서/프로젝트처럼 사용자가 만든 계층이 있을 때.',
        watch: '펼침 상태를 저장하지 않으면 매번 다시 펼쳐야 한다. depth는 3단에서 끊을 것.',
        wire: R('', [
          C('width:88px;border-right:1px solid var(--wline);padding:10px 8px;gap:4px;background:var(--wsur)',
            LS('60%', 8) + `<div style="height:5px"></div>` +
            `<div class="ni"><i class="tri"></i>${L('66%')}</div>` +
            `<div class="ni ind"><i class="sq sm"></i>${L('58%')}</div>` +
            `<div class="ni ind on"><i class="sq sm"></i>${L('62%')}</div>` +
            `<div class="ni ind"><i class="sq sm"></i>${L('50%')}</div>` +
            `<div class="ni"><i class="tri"></i>${L('58%')}</div>`),
          C('flex:1;padding:12px;gap:8px', LS('40%', 9) + L('90%') + L('76%')),
        ].join('')),
      },
      {
        id: 'side-icon', name: '아이콘 전용 + 툴팁', tags: ['sidebar', 'tooltip'],
        when: '메뉴 6개 이하이고 아이콘이 명확할 때. 또는 접힘 상태의 표현.',
        watch: '아이콘만으로 구분되는 건 실제로 5개 정도가 한계. 반드시 툴팁을 붙인다.',
        wire: R('', [
          C('width:26px;border-right:1px solid var(--wline);padding:10px 0;gap:7px;align-items:center;background:var(--wsur)', rail(5, 2)),
          R('flex:1;padding:12px;gap:8px;align-items:flex-start',
            box('tip', 'margin-top:32px', L('30px', 4)) + C('flex:1;gap:8px;padding-left:6px', LS('44%', 9) + L('90%') + L('72%'))),
        ].join('')),
      },
      {
        id: 'side-switcher', name: '상단 스위처 + 하단 유저', tags: ['sidebar', 'combobox'],
        when: '워크스페이스·팀·프로젝트를 전환하는 B2B SaaS의 사실상 표준.',
        watch: '전환 시 현재 화면을 유지할지 홈으로 보낼지 정해야 한다. 대부분 홈이 안전하다.',
        wire: R('', [
          C('width:88px;border-right:1px solid var(--wline);padding:8px;gap:4px;background:var(--wsur)',
            box('sw', '', `<i class="sq"></i>${L('54%')}<i class="cv"></i>`) +
            `<div style="height:4px"></div>` + nav(5, 1, '70%') +
            `<div style="flex:1"></div>` +
            box('sw', 'border-top:1px solid var(--wline);border-radius:0;padding-top:6px', `<i class="sq rd"></i>${L('58%')}`)),
          C('flex:1;padding:12px;gap:8px', LS('40%', 9) + L('90%') + L('76%')),
        ].join('')),
      },
      {
        id: 'side-drawer', name: '모바일 오버레이 드로어', tags: ['sidebar', 'drawer', 'sheet'],
        when: '위 어떤 형태든 모바일에서는 이걸로 바뀐다. 데스크톱 사이드바의 짝.',
        watch: '햄버거 위치, 바깥 탭으로 닫기, 스크롤 잠금 3개를 브리프에 명시할 것.',
        wire: R('position:relative', [
          C('width:76px;padding:10px 8px;gap:5px;background:var(--wsur);z-index:2;box-shadow:2px 0 12px rgba(0,0,0,.18)',
            LS('60%', 8) + `<div style="height:6px"></div>` + nav(5, 0, '72%')),
          C('flex:1;padding:12px;gap:8px;background:var(--wscrim)', LS('40%', 9) + L('80%') + L('66%')),
        ].join('')),
      },
    ],
  },

  {
    id: 'auth',
    name: '로그인 / 가입',
    note: '가장 먼저 만들고 가장 적게 고민하는 화면. 형태 선택보다 상태 처리(에러·로딩·잠김)가 실제 작업량이다.',
    variants: [
      {
        id: 'auth-center', name: '센터 카드', tags: ['auth', 'card'],
        when: '기본값. 도구형 제품에 가장 흔하고 구현이 가장 싸다.',
        watch: '카드 폭 360~420px. 세로 중앙 정렬은 에러 메시지가 뜰 때 흔들리니 상단 여백 고정이 낫다.',
        wire: C('align-items:center;justify-content:center;padding:14px', [
          box('sur', 'width:130px;padding:12px;gap:7px;display:flex;flex-direction:column;align-items:stretch',
            `<i class="sq lg" style="align-self:center"></i>` + LS('56%', 7, ) + field() + field() +
            `<div class="btn pri"></div>` + L('60%', 4)),
        ].join('')),
      },
      {
        id: 'auth-split', name: '스플릿 (폼 / 비주얼)', tags: ['auth', 'split'],
        when: '브랜드를 보여주고 싶을 때. 우측에 후기·통계·제품샷을 넣는다.',
        watch: '우측이 장식이면 모바일에서 통째로 사라진다 — 중요한 정보를 거기 두지 말 것.',
        wire: R('', [
          C('flex:1;padding:14px 12px;gap:7px;justify-content:center',
            `<i class="sq lg"></i>` + LS('62%', 8) + L('44%', 4) + `<div style="height:2px"></div>` + field() + field() + `<div class="btn pri"></div>`),
          C('flex:1;background:var(--wacc-soft);padding:12px;gap:6px;justify-content:center;border-left:1px solid var(--wline)',
            LS('70%', 8) + L('90%') + L('76%') + `<div style="height:4px"></div>` + R('gap:4px;align-items:center', `<i class="sq rd"></i>${L('40%', 4)}`)),
        ].join('')),
      },
      {
        id: 'auth-hero', name: '풀스크린 배경 + 카드', tags: ['auth'],
        when: '소비자용 제품, 브랜드 무드가 중요할 때. 글래스 스타일과 자주 붙는다.',
        watch: '배경 위 텍스트 대비(4.5:1)가 깨지기 쉽다. 카드 뒤에 불투명 레이어를 반드시 깔 것.',
        wire: C('align-items:center;justify-content:center;background:var(--wacc-soft);padding:14px',
          box('sur glass', 'width:126px;padding:12px;gap:7px;display:flex;flex-direction:column',
            `<i class="sq lg" style="align-self:center"></i>` + field() + field() + `<div class="btn pri"></div>`)),
      },
      {
        id: 'auth-minimal', name: '미니멀 (로고 + 필드)', tags: ['auth'],
        when: '개발자 도구, 내부 어드민. 카드 테두리조차 없앤 형태.',
        watch: '초저비용이지만 신뢰감이 약하다. 결제가 붙는 서비스에는 권하지 않음.',
        wire: C('align-items:center;justify-content:center;gap:8px;padding:16px',
          `<i class="sq lg"></i>` + LS('30%', 7) +
          box('', 'width:120px;display:flex;flex-direction:column;gap:6px', field(false) + field(false) + `<div class="btn pri"></div>`)),
      },
      {
        id: 'auth-social', name: '소셜 우선', tags: ['auth'],
        when: '가입 마찰을 줄이는 게 최우선일 때. 이메일은 구분선 아래로 내린다.',
        watch: 'Google/Apple 버튼은 각 사 브랜드 가이드 준수 의무가 있다. 임의 디자인 금지.',
        wire: C('align-items:center;justify-content:center;padding:14px',
          box('sur', 'width:130px;padding:12px;gap:6px;display:flex;flex-direction:column',
            LS('50%', 7, ) +
            `<div class="btn out"></div><div class="btn out"></div>` +
            box('divi', '', L('26%', 4)) +
            field(false) + `<div class="btn pri"></div>`)),
      },
      {
        id: 'auth-otp', name: '매직링크 / OTP 단계형', tags: ['auth', 'wizard'],
        when: '비밀번호를 아예 없앨 때. 1단계 이메일 → 2단계 코드 입력.',
        watch: '"메일함을 확인하세요" 화면과 재전송 쿨다운, 코드 만료가 전부 별도 화면이다. 범위에 넣을 것.',
        wire: R('gap:8px;padding:12px;align-items:center;justify-content:center', [
          box('sur', 'flex:1;padding:10px;gap:6px;display:flex;flex-direction:column', L('40%', 4) + field(false) + `<div class="btn pri"></div>`),
          `<i class="arrow"></i>`,
          box('sur', 'flex:1;padding:10px;gap:6px;display:flex;flex-direction:column', L('52%', 4) +
            R('gap:3px', Array.from({ length: 6 }, () => `<i class="otp"></i>`).join('')) + L('58%', 4)),
        ].join('')),
      },
    ],
  },

  {
    id: 'dashboard',
    name: '대시보드 홈',
    note: '"무엇부터 보여줄까"를 정하는 화면. 지표형 / 블록형 / 흐름형으로 갈린다.',
    variants: [
      {
        id: 'dash-kpi', name: 'KPI 행 + 차트', tags: ['dashboard', 'kpi-tile', 'chart'],
        when: '숫자를 매일 확인하는 운영 대시보드. 가장 안전한 기본값.',
        watch: 'KPI는 4개까지. 비교 기준(전주 대비 등)이 없으면 숫자는 의미가 없다.',
        wire: C('padding:10px;gap:7px', LS('34%', 9) + kpi(4) + chart(44) + R('gap:6px', box('sur', 'flex:1;height:26px') + box('sur', 'flex:1;height:26px'))),
      },
      {
        id: 'dash-bento', name: '벤토 그리드', tags: ['dashboard', 'bento'],
        when: '성격이 다른 정보를 한 화면에 늘어놓을 때. 크기로 우선순위를 표현한다.',
        watch: '모바일에서 1단으로 무너질 때의 순서를 반드시 지정. 안 하면 서사가 사라진다.',
        wire: C('padding:9px;gap:6px', [
          R('gap:6px;flex:1.4', box('sur', 'flex:2;padding:6px', LS('50%', 7)) + C('flex:1;gap:6px', box('sur', 'flex:1') + box('sur', 'flex:1'))),
          R('gap:6px;flex:1', box('sur', 'flex:1') + box('sur', 'flex:1.6;padding:6px', L('60%', 4)) + box('sur', 'flex:1')),
        ].join('')),
      },
      {
        id: 'dash-feed', name: '피드 + 사이드', tags: ['dashboard', 'feed'],
        when: '"무슨 일이 있었나"가 중심인 협업 도구. 활동로그 + 우측 요약.',
        watch: '무한스크롤이면 뒤로가기 후 위치 복원을 처리해야 한다.',
        wire: R('padding:10px;gap:8px', [
          C('flex:1.7;gap:6px', LS('40%', 8) + Array.from({ length: 4 }, () =>
            box('sur', 'padding:6px;gap:4px;display:flex;align-items:flex-start', `<i class="sq rd"></i><div class="c" style="flex:1;gap:3px">${L('84%', 4)}${L('56%', 4)}</div>`)).join('')),
          C('flex:1;gap:6px', box('sur', 'padding:6px;gap:4px;display:flex;flex-direction:column', L('54%', 4) + LS('70%', 9)) + box('sur', 'flex:1')),
        ].join('')),
      },
    ],
  },

  {
    id: 'list',
    name: '목록 / 테이블',
    note: '실무에서 가장 많이 쓰고 가장 자주 깨지는 화면. 필터를 어디에 두느냐가 핵심.',
    variants: [
      {
        id: 'list-filter', name: '좌측 필터 패널 + 테이블', tags: ['list', 'dense-table'],
        when: '필터 조건이 5개 이상이고 동시에 여러 개를 켜는 경우.',
        watch: '사이드바가 이미 있으면 패널이 3개가 된다. 그 경우 상단 툴바형으로.',
        wire: R('', [
          C('width:50px;border-right:1px solid var(--wline);padding:8px 6px;gap:6px;background:var(--wsur)',
            L('50%', 4) + `<i class="ck"></i><i class="ck"></i><i class="ck"></i>` + L('44%', 4) + `<i class="ck"></i><i class="ck"></i>`),
          C('flex:1;padding:9px;gap:5px', LS('30%', 8) + `<div class="tr hd">${['30%', '22%', '18%', '14%'].map(w => L(w)).join('')}</div>` + rows(6)),
        ].join('')),
      },
      {
        id: 'list-toolbar', name: '상단 툴바 + 테이블', tags: ['list', 'dense-table', 'combobox'],
        when: '기본값. 검색 + 필터칩 + 정렬 + 액션을 한 줄에.',
        watch: '벌크 선택 시 툴바가 액션 바로 바뀌는 전환을 설계해야 한다. 자주 빠뜨린다.',
        wire: C('padding:9px;gap:6px', [
          R('align-items:center;gap:5px', LS('26%', 8) + `<div style="flex:1"></div><div class="btn out sm"></div><div class="btn pri sm"></div>`),
          R('gap:4px;align-items:center', `<div class="fld" style="flex:1.4"></div><i class="chip2"></i><i class="chip2"></i><i class="chip2"></i>`),
          `<div class="tr hd">${['8px', '30%', '22%', '18%'].map(w => L(w)).join('')}</div>` + rows(6, ['8px', '30%', '22%', '18%']),
        ].join('')),
      },
      {
        id: 'list-cards', name: '카드 그리드', tags: ['list', 'card-grid'],
        when: '항목이 시각적일 때(이미지·썸네일). 텍스트 위주면 테이블이 낫다.',
        watch: '카드는 비교가 어렵다. 정렬·필터로 보완하거나 테이블 뷰 토글을 같이 준다.',
        wire: C('padding:9px;gap:6px', [
          R('align-items:center;gap:5px', LS('26%', 8) + `<div style="flex:1"></div><i class="chip2"></i><div class="btn pri sm"></div>`),
          box('grid3', '', cards(6)),
        ].join('')),
      },
      {
        id: 'list-drawer', name: '목록 + 드로어 상세', tags: ['list-detail', 'drawer'],
        when: '상세를 보되 목록 맥락을 잃고 싶지 않을 때. 페이지 이동보다 빠르게 느껴진다.',
        watch: 'URL이 바뀌어야 공유·새로고침이 된다. 드로어에도 라우팅을 붙일 것.',
        wire: R('position:relative', [
          C('flex:1;padding:9px;gap:5px', LS('30%', 8) + `<div class="tr hd">${['30%', '22%', '18%'].map(w => L(w)).join('')}</div>` + rows(6, ['30%', '22%', '18%'])),
          C('width:82px;border-left:1px solid var(--wline);background:var(--wsur);padding:9px 8px;gap:5px;box-shadow:-2px 0 12px rgba(0,0,0,.14)',
            R('align-items:center', LS('60%', 8) + `<div style="flex:1"></div><i class="x"></i>`) + L('44%', 4) + `<div style="height:3px"></div>` + L('92%') + L('80%') + L('88%')),
        ].join('')),
      },
    ],
  },

  {
    id: 'form',
    name: '폼 / 설정',
    note: '입력 화면. 필드 개수와 "한 번에 끝내야 하는가"가 형태를 결정한다.',
    variants: [
      {
        id: 'form-single', name: '단일 컬럼', tags: ['form'],
        when: '필드 10개 이하. 완료율이 가장 높은 형태 — 특별한 이유 없으면 이걸로.',
        watch: '폼 폭은 480~560px에서 끊는다. 화면 폭 전체로 늘이면 시선 이동이 커져 오류가 는다.',
        wire: C('align-items:center;justify-content:center;padding:10px', box('', 'width:104px;display:flex;flex-direction:column;gap:6px',
          LS('56%', 8) + field() + field() + field() + R('gap:4px;justify-content:flex-end', `<div class="btn out sm"></div><div class="btn pri sm"></div>`))),
      },
      {
        id: 'form-labelside', name: '라벨 좌측 2단', tags: ['form'],
        when: '필드가 많은 설정 화면. 세로 길이를 줄이고 스캔이 쉬워진다.',
        watch: '모바일에서는 무조건 단일 컬럼으로 떨어뜨린다. 라벨 폭 고정값을 정해줄 것.',
        wire: C('padding:11px;gap:7px', [LS('40%', 8)].concat(
          Array.from({ length: 4 }, () => R('gap:8px;align-items:center', `${L('22%', 4)}<div class="fld" style="flex:1"></div>`))
        ).join('') + R('gap:4px;justify-content:flex-end;padding-top:2px', `<div class="btn out sm"></div><div class="btn pri sm"></div>`)),
      },
      {
        id: 'form-wizard', name: '위저드 (단계형)', tags: ['onboarding', 'wizard'],
        when: '필드가 많고 분기가 있을 때. 온보딩·결제·신청 절차.',
        watch: '뒤로가기 시 입력값 보존, 중간 이탈 후 복귀, 단계별 저장 — 3개를 반드시 정의.',
        wire: C('padding:10px;gap:8px', [
          R('align-items:center;gap:4px;justify-content:center',
            `<i class="stp on"></i><i class="conn"></i><i class="stp on"></i><i class="conn"></i><i class="stp"></i><i class="conn"></i><i class="stp"></i>`),
          C('align-items:center;flex:1', box('', 'width:106px;display:flex;flex-direction:column;gap:6px', LS('50%', 8) + field() + field())),
          R('gap:4px;justify-content:space-between', `<div class="btn out sm"></div><div class="btn pri sm"></div>`),
        ].join('')),
      },
      {
        id: 'form-settings', name: '설정 (좌측 탭 + 섹션)', tags: ['settings', 'tabs'],
        when: '계정/팀/권한/결제처럼 영역이 나뉘는 설정. 각 섹션은 독립 저장.',
        watch: '섹션마다 저장 버튼을 둘지, 전체 하단에 하나만 둘지 통일할 것. 섞이면 데이터가 날아간다.',
        wire: R('', [
          C('width:56px;border-right:1px solid var(--wline);padding:9px 7px;gap:4px;background:var(--wsur)', nav(5, 1, '64%')),
          C('flex:1;padding:10px;gap:7px', LS('34%', 9) +
            box('sur', 'padding:7px;gap:5px;display:flex;flex-direction:column', L('40%', 4) + field(false) + R('justify-content:flex-end', `<div class="btn pri sm"></div>`)) +
            box('sur', 'padding:7px;gap:5px;display:flex;flex-direction:column', L('34%', 4) + R('align-items:center;gap:6px', `${L('56%', 4)}<div style="flex:1"></div><i class="tgl"></i>`))),
        ].join('')),
      },
    ],
  },

  {
    id: 'detail',
    name: '상세 페이지',
    note: '보는 것(이미지·본문)과 행동(구매·이동)을 한 화면에 두는 형태. 스크롤과 고정의 분배가 핵심.',
    variants: [
      {
        id: 'detail-buybox', name: '커머스 상세 (구매 박스 고정)', tags: ['detail', 'sticky-side'],
        when: '이미지·설명은 길게 스크롤하되, 가격·옵션·구매 버튼은 항상 보여야 할 때. 쇼핑몰 표준.',
        watch: '모바일에서는 구매 박스가 하단 고정 바로 바뀐다. 그 변환 규칙을 브리프에 명시할 것.',
        wire: R('', [
          C('flex:1.5;padding:10px;gap:6px',
            box('sur', 'height:56px;border-style:dashed') +
            R('gap:4px', box('sur', 'flex:1;height:13px') + box('sur', 'flex:1;height:13px') +
              box('sur', 'flex:1;height:13px') + box('sur', 'flex:1;height:13px')) +
            `<div style="height:2px"></div>` + LS('52%', 7) + L('92%') + L('86%') + L('64%')),
          C('width:76px;border-left:1px solid var(--wline);background:var(--wsur);padding:9px 8px;gap:5px',
            LS('72%', 6) + L('42%', 4) + LS('55%', 9) +
            R('gap:3px', `<i class="chip2"></i><i class="chip2"></i>`) +
            `<div class="btn pri"></div><div class="btn out"></div>` + L('58%', 4)),
        ].join('')),
      },
      {
        id: 'detail-article', name: '아티클 (목차 고정)', tags: ['detail', 'sticky-side'],
        when: '긴 본문 + 우측 목차·추천 고정. 문서, 블로그, 강의 커리큘럼.',
        watch: '본문 폭은 60~72자에서 끊는다. 목차는 현재 위치 하이라이트가 핵심 — 없으면 장식이다.',
        wire: R('padding:10px;gap:9px', [
          C('flex:1.7;gap:5px',
            L('30%', 4) + LS('74%', 9) + L('26%', 4) + `<div style="height:3px"></div>` +
            L('96%') + L('92%') + L('95%') + `<div style="height:2px"></div>` +
            box('sur', 'height:24px') + L('90%') + L('58%')),
          C('width:54px;gap:4px;padding-top:6px',
            L('46%', 4) + `<div style="height:2px"></div>` + L('86%', 4) +
            box('', 'background:var(--wsel);border-radius:3px;padding:3px 5px', L('76%', 4)) +
            L('82%', 4) + L('68%', 4)),
        ].join('')),
      },
    ],
  },

  {
    id: 'state',
    name: '상태 화면',
    note: '외주 범위에서 가장 자주 누락되고, 개발 단계에서 급조되어 품질을 깎아먹는 부분. 처음부터 넣는다.',
    variants: [
      {
        id: 'state-empty', name: '빈 상태', tags: ['empty'],
        when: '첫 진입 / 검색 결과 없음 / 필터 결과 없음 — 최소 3종은 서로 다르게.',
        watch: '"데이터가 없습니다"로 끝내지 말 것. 다음 행동 버튼이 반드시 있어야 한다.',
        wire: C('align-items:center;justify-content:center;gap:5px;padding:14px',
          `<i class="sq xl"></i><div style="height:2px"></div>` + LS('30%', 7) + L('42%', 4) + L('34%', 4) +
          `<div style="height:2px"></div><div class="btn pri" style="width:46px"></div>`),
      },
      {
        id: 'state-skeleton', name: '로딩 (스켈레톤)', tags: ['loading', 'skeleton'],
        when: '레이아웃을 알고 있는 화면. 스피너보다 체감 속도가 빠르다.',
        watch: '스켈레톤 모양이 실제 결과와 다르면 오히려 느리게 느껴진다. 형태를 맞출 것.',
        wire: C('padding:10px;gap:6px', LS('30%', 9) +
          R('gap:6px', box('sk', 'flex:1;height:22px') + box('sk', 'flex:1;height:22px') + box('sk', 'flex:1;height:22px')) +
          box('sk', 'height:38px') + box('sk', 'height:14px;width:70%')),
      },
      {
        id: 'state-error', name: '에러 / 권한 없음', tags: ['error'],
        when: '404, 500, 권한 없음, 오프라인 — 각각 문구와 행동이 다르다.',
        watch: '재시도 버튼과 "어디로 돌아갈지"를 준다. 에러 코드만 던지는 화면은 실패다.',
        wire: C('align-items:center;justify-content:center;gap:5px;padding:14px',
          `<i class="sq xl warn"></i><div style="height:2px"></div>` + LS('26%', 7) + L('46%', 4) + L('36%', 4) +
          `<div style="height:2px"></div>` +
          R('gap:5px', `<div class="btn out" style="width:38px"></div><div class="btn pri" style="width:38px"></div>`)),
      },
    ],
  },
]
