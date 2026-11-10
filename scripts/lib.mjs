import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

export const REPO = new URL('..', import.meta.url).pathname
export const REFS = join(REPO, 'references')

/** frontmatter 파싱 — `key: value` / `key: [a, b]` 서브셋만 지원 (의존성 없음) */
export function parseMeta(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { fm: {}, body: raw }
  const fm = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/)
    if (!kv) continue
    const [, key, rawVal] = kv
    const val = rawVal.replace(/\s+#.*$/, '').trim()
    if (val.startsWith('[')) {
      fm[key] = val.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else {
      fm[key] = val.replace(/^["']|["']$/g, '')
    }
  }
  return { fm, body: m[2] }
}

/**
 * meta.md 본문에서 `## 제목` 섹션 추출.
 *
 * 정규식 종료 조건으로 `\Z` 를 쓰면 안 된다 — JS 정규식에 `\Z` 는 없고 문자 'Z' 로 해석돼서
 * **마지막 섹션이 통째로 안 잡힌다.** 하필 마지막이 `## Don't take` 라 외주 브리프의
 * 핵심 필드가 조용히 비어 있었다. 줄 단위로 자르는 쪽이 안전하다.
 */
export function section(body, title) {
  const lines = String(body || '').split(/\r?\n/)
  const esc = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const head = new RegExp(`^##\\s+${esc}\\s*$`, 'i')
  const i = lines.findIndex(l => head.test(l))
  if (i < 0) return ''
  let j = i + 1
  while (j < lines.length && !/^##\s/.test(lines[j])) j++
  return lines.slice(i + 1, j).join('\n').trim()
}

/** references/ 의 모든 레퍼런스 로드 */
export function loadRefs() {
  if (!existsSync(REFS)) return []
  return readdirSync(REFS)
    .filter(d => !d.startsWith('_') && !d.startsWith('.'))
    .filter(d => statSync(join(REFS, d)).isDirectory())
    .filter(d => existsSync(join(REFS, d, 'meta.md')))
    .map(slug => {
      const dir = join(REFS, slug)
      const { fm, body } = parseMeta(readFileSync(join(dir, 'meta.md'), 'utf8'))
      const images = readdirSync(dir).filter(f => /\.(webp|png|jpe?g|gif|avif)$/i.test(f)).sort()
      return {
        slug, dir, fm, images,
        why: section(body, 'Why'),
        highlights: section(body, 'Highlights'),
        dontTake: section(body, "Don't take"),
      }
    })
    .sort((a, b) => (b.fm.captured || '').localeCompare(a.fm.captured || '') || a.slug.localeCompare(b.slug))
}

/** docs/vocab.yml 의 닫힌 어휘 로드 */
export function loadVocab() {
  const p = join(REPO, 'docs', 'vocab.yml')
  if (!existsSync(p)) return {}
  const vocab = {}
  let key = null
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    if (/^\s*#/.test(line) || !line.trim()) continue
    const top = line.match(/^([A-Za-z_][\w-]*)\s*:\s*$/)
    if (top) { key = top[1]; vocab[key] = []; continue }
    const item = line.match(/^\s*-\s*([^#]+?)\s*(?:#.*)?$/)
    if (item && key) vocab[key].push(item[1].trim())
  }
  return vocab
}

/** 어휘 밖 태그 찾기 */
export function lint(refs, vocab) {
  const problems = []
  const REQUIRED = ['product', 'source', 'page', 'style']
  for (const r of refs) {
    for (const f of REQUIRED) if (!r.fm[f] || !r.fm[f].length) problems.push(`${r.slug}: 필수 필드 누락 → ${f}`)
    if (!r.why) problems.push(`${r.slug}: '## Why' 없음 (왜 저장했는지 한 줄 필수)`)
    for (const [field, allowed] of Object.entries(vocab)) {
      const v = r.fm[field]
      if (!v) continue
      for (const tag of [].concat(v)) {
        if (!allowed.includes(tag)) problems.push(`${r.slug}: 어휘 밖 태그 → ${field}: ${tag}`)
      }
    }
  }
  return problems
}

const TAB_ICON = 'data:image/svg+xml;base64,' +
  readFileSync(join(REPO, 'assets', 'favicon.svg')).toString('base64')

/**
 * 페이지 보안 메타 — 모든 HTML 은 쓰기 직전에 이걸 거친다.
 * GitHub Pages 는 응답 헤더를 못 건드리므로 CSP 를 <meta> 로 싣는다 (frame-ancestors 는 meta 로 안 됨).
 * 인라인 <script> 는 빌드마다 내용이 바뀌니 'unsafe-inline' 대신 그 자리에서 sha256 해시를 떠서 허용한다 —
 * 누가 페이지에 스크립트를 끼워 넣어도 해시가 안 맞아 실행되지 않는다.
 * 외부로 나가는 요청(fetch·폼 전송)은 쓸 일이 없으니 전부 막는다.
 * 탭 아이콘은 data URI 로 페이지에 박는다 — 파일로 열어도(file://), 패킷으로 따로 보내도 뜬다.
 * root 를 주면 바로가기용 아이콘·매니페스트도 싣는다 — 페이지에서 저장소 루트까지의 상대 경로 ('' · '../').
 */
export function secure(html, root) {
  const hashes = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
    .map(m => `'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`)
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')}`,
    // 목업이 style 속성을 많이 쓴다 — 스타일은 스크립트를 실행하지 못하므로 inline 허용
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://hangeul.pstatic.net",
    "font-src 'self' data: https://cdn.jsdelivr.net https://fonts.gstatic.com https://hangeul.pstatic.net",
    "img-src 'self' data:",
    "connect-src 'none'", "form-action 'none'", "object-src 'none'", "base-uri 'none'",
  ].join('; ')
  // AI 학습용 수집 거부 의사 표시 — 강제력은 없다. 실제 차단은 도메인 + Cloudflare 가 필요
  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="robots" content="noai, noimageai">
<link rel="icon" href="${TAB_ICON}" type="image/svg+xml">` + (root == null ? '' : `
<link rel="apple-touch-icon" href="${root}assets/apple-touch-icon.png">
<link rel="manifest" href="${root}manifest.webmanifest">`)
  if (!html.includes('<meta charset="utf-8">')) throw new Error('secure(): <meta charset> 가 없다')
  return html.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n${meta}`)
}

export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

/** 아주 얕은 마크다운 → HTML (불릿 + 인라인 코드 + 링크만) */
export function md(text) {
  if (!text) return ''
  const lines = text.split(/\r?\n/)
  let html = '', inList = false
  const inline = s => esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  for (const line of lines) {
    const li = line.match(/^\s*[-*]\s+(.*)$/)
    if (li) { if (!inList) { html += '<ul>'; inList = true } html += `<li>${inline(li[1])}</li>`; continue }
    if (inList) { html += '</ul>'; inList = false }
    if (line.trim()) html += `<p>${inline(line)}</p>`
  }
  if (inList) html += '</ul>'
  return html
}
