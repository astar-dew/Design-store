// 연락처 — 여기 한 곳에만 둔다. 푸터·견적 CTA·README 가 전부 이 파일을 참조한다.
// (돈이 pricing.mjs 에만 있는 것과 같은 원칙. 메일이 바뀌면 이 파일만 고친다.)

export const CONTACT = {
  name: '박진우',
  handle: 'astar-dew',
  repo: 'https://github.com/astar-dew/Design-store',

  // ⚠️ 공개 저장소다. 여기에 전체 주소를 적어두면 HTML 소스에 그대로 박혀 크롤러에 수집된다.
  //    그래서 user / domain 을 나눠 두고 **브라우저에서 합친다**(빌드에서 합치면 소스에 남는다).
  //    아래 두 줄만 채우면 푸터의 메일 링크와 견적 탭의 문의 버튼이 켜진다.
  mail: { user: '', domain: '' },   // 예: { user: 'hello', domain: 'example.com' }
}

export const hasMail = () => Boolean(CONTACT.mail.user && CONTACT.mail.domain)

/**
 * 공통 푸터. index 와 스킨 페이지가 같은 것을 쓴다.
 * 스킨 페이지에도 반드시 넣는다 — 딥링크로 받은 클라이언트는 index 를 안 볼 수 있다.
 * @param {string} base 상위 경로 접두사 ('' | '../')
 */
export const footer = (base = '') => `<footer class="site-foot">
  <div>
    <b>A-Dew, design-store</b>
    <span>${CONTACT.name}</span>
  </div>
  <nav>
    <a href="${CONTACT.repo}" target="_blank" rel="noopener">GitHub ↗</a>
    ${hasMail()
    ? `<a class="mailto" data-u="${CONTACT.mail.user}" data-d="${CONTACT.mail.domain}"
         data-subject="[design-store] 문의">이메일 ↗</a>`
    : ''}
    <a href="${base}index.html#quote">견적 계산 →</a>
  </nav>
</footer>`

export const FOOTER_CSS = `
.site-foot{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;
  margin-top:44px;padding-top:20px;border-top:1px solid var(--line);font-size:12.5px;color:var(--dim)}
.site-foot b{font-weight:560;color:var(--fg);margin-right:8px}
.site-foot nav{display:flex;gap:18px}
.site-foot a{color:var(--dim);text-decoration:none}
.site-foot a:hover{color:var(--accent)}
.site-foot a:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}`

/** 조각난 주소를 브라우저에서 합친다. 소스에는 'user' 와 'domain' 이 따로 있을 뿐이다. */
export const MAIL_JS = `
const mailAddr = el => el.dataset.u + String.fromCharCode(64) + el.dataset.d
document.querySelectorAll('.mailto').forEach(a => {
  const addr = mailAddr(a)
  a.href = 'mailto:' + addr + (a.dataset.subject ? '?subject=' + encodeURIComponent(a.dataset.subject) : '')
  a.title = addr
})`
