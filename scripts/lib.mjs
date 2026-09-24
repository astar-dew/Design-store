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
