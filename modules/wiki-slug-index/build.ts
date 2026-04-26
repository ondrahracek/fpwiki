/**
 * Pure slug-index builder. Has NO dependency on @nuxt/kit so it can be
 * imported by tests, scripts, and the runtime module alike. SRP.
 *
 * Beyond the slug → path map (the original purpose), this module also:
 *   - Parses `content/_index.md` (the descriptions catalog published by the
 *     upstream content corpus) for one-line descriptions per slug.
 *   - Walks every page body and counts inbound [[wikilinks]] per slug.
 * Both are additive — existing consumers (remark-wiki-link urlResolver, the
 * useWikiSlugIndex composable, search) read the same shape they always did.
 */
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'

import type {
  WikiBacklinkRef,
  WikiBacklinksMap,
  WikiCollectionName,
  WikiPageType,
  WikiSlugIndex,
  WikiSlugIndexEntry,
} from '../../shared/types/wiki'
import { wikiUrl } from '../../shared/wiki-routes'

const BACKLINKS_PER_TARGET_CAP = 8
const SNIPPET_RADIUS = 90

const COLLECTION_TO_TYPE: Record<WikiCollectionName, WikiPageType> = {
  overview: 'overview',
  courses: 'course',
  topics: 'topic',
  summaries: 'summary',
  outputs: 'output',
}

const COLLECTIONS: { dir: WikiCollectionName; subpath: string }[] = [
  { dir: 'overview', subpath: '' },
  { dir: 'courses', subpath: 'courses' },
  { dir: 'topics', subpath: 'topics' },
  { dir: 'summaries', subpath: 'summaries' },
  { dir: 'outputs', subpath: 'outputs' },
]

interface FrontmatterFields {
  title?: string
  type?: string
}

function parseFrontmatter(raw: string): FrontmatterFields {
  if (!raw.startsWith('---')) return {}
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return {}
  const block = raw.slice(3, end)
  const out: FrontmatterFields = {}
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.+)$/)
    if (!m) continue
    const [, key, valueRaw] = m
    if (!key) continue
    const value = valueRaw!.trim().replace(/^["']|["']$/g, '')
    if (key === 'title') out.title = value
    else if (key === 'type') out.type = value
  }
  return out
}

function bodyOf(raw: string): string {
  if (!raw.startsWith('---')) return raw
  const end = raw.indexOf('\n---', 3)
  return end === -1 ? raw : raw.slice(end + 4)
}

async function walkMarkdown(dir: string): Promise<string[]> {
  const out: string[] = []
  let entries: import('node:fs').Dirent[]
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walkMarkdown(path)))
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(path)
  }
  return out
}

/**
 * Extract one-line descriptions from `_index.md`'s bullet lines:
 *   - [[slug|Title]] — description text
 *   - [[slug]] — description text
 * Returns a map slug → description. Trailing ". N zdrojů" markers stripped
 * (those are computed elsewhere; rendering them again would be redundant).
 */
export function parseIndexDescriptions(rawIndexMd: string): Record<string, string> {
  const out: Record<string, string> = {}
  const body = bodyOf(rawIndexMd)
  const re = /^- \[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]\s+—\s+(.+?)\s*$/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(body)) !== null) {
    const slug = m[1]!
    // Strip trailing ". N zdrojů" or ". N zdrojů (...)" — counts are computed
    // independently and would be redundant in card descriptions.
    const desc = m[2]!.replace(/\.?\s*\d+\s*zdrojů?(?:\s*\([^)]*\))?\.?\s*$/u, '').trim()
    if (!out[slug]) out[slug] = desc
  }
  return out
}

/**
 * Single regex for non-embed wikilinks. Reused by both inbound-link counting
 * and rich backlink extraction so the two cannot drift. The validator script
 * keeps its own copy because it operates on a different surface (raw fs walk,
 * error reporting).
 */
const WIKILINK_RE = /(?<!!)\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]/g

interface WikilinkHit {
  source: string
  target: string
  body: string
  matchStart: number
  matchEnd: number
}

function* iterWikilinks(
  bodies: { slug: string; body: string }[],
  knownSlugs: Set<string>,
): Generator<WikilinkHit> {
  for (const { slug: source, body } of bodies) {
    const re = new RegExp(WIKILINK_RE.source, 'g')
    let m: RegExpExecArray | null
    while ((m = re.exec(body)) !== null) {
      const target = m[1]!.trim()
      if (target === source) continue
      if (!knownSlugs.has(target)) continue
      yield { source, target, body, matchStart: m.index, matchEnd: m.index + m[0].length }
    }
  }
}

/**
 * Build a snippet around a wikilink match: ±SNIPPET_RADIUS chars, with the
 * matched [[…]] wrapped in `<<…>>` markers and any other [[…]] syntax in the
 * window stripped (alias text kept). NFC-normalized so a Czech grapheme is
 * never split mid-character. The renderer turns `<<…>>` into <mark> via plain
 * text interpolation — never v-html.
 */
function buildSnippet(
  body: string,
  matchStart: number,
  matchEnd: number,
  displayed: string,
): string {
  const sliceStart = Math.max(0, matchStart - SNIPPET_RADIUS)
  const sliceEnd = Math.min(body.length, matchEnd + SNIPPET_RADIUS)
  const before = body.slice(sliceStart, matchStart)
  const after = body.slice(matchEnd, sliceEnd)

  // Strip remaining [[…]] / ![[…]] in the surrounding window, keeping alias
  // text where present (`[[slug|alias]]` → `alias`, `[[slug]]` → `slug`).
  const stripWikilinks = (s: string): string =>
    s.replace(
      /!?\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g,
      (_, slug: string, alias?: string) => (alias ?? slug).trim(),
    )

  const left = stripWikilinks(before)
  const right = stripWikilinks(after)
  const middle = `<<${displayed}>>`
  const ellipsisLeft = sliceStart > 0 ? '… ' : ''
  const ellipsisRight = sliceEnd < body.length ? ' …' : ''

  const raw = `${ellipsisLeft}${left}${middle}${right}${ellipsisRight}`
  return raw.replace(/\s+/g, ' ').trim().normalize('NFC')
}

/**
 * Count inbound [[wikilinks]] per slug across all body texts. `![[…]]` image
 * embeds and self-edges are excluded. Counts EVERY occurrence (a single source
 * page that links to the same target three times contributes 3) so totals
 * stay comparable across reindexes.
 */
export function countInboundLinks(
  bodies: { slug: string; body: string }[],
  knownSlugs: Set<string>,
): { inboundLinks: Record<string, number>; totalLinkCount: number } {
  const inboundLinks: Record<string, number> = {}
  let totalLinkCount = 0
  for (const hit of iterWikilinks(bodies, knownSlugs)) {
    inboundLinks[hit.target] = (inboundLinks[hit.target] ?? 0) + 1
    totalLinkCount++
  }
  return { inboundLinks, totalLinkCount }
}

/**
 * Extract per-target backlinks for the right-rail UI. Multiple links from
 * the same source are deduped (first match wins for the snippet); results are
 * sorted by source slug ascending so prerendered output is deterministic;
 * capped at BACKLINKS_PER_TARGET_CAP per target.
 */
export function extractBacklinks(
  bodies: { slug: string; body: string }[],
  entries: WikiSlugIndexEntry[],
): WikiBacklinksMap {
  const titleBySlug = new Map<string, string>()
  const knownSlugs = new Set<string>()
  for (const e of entries) {
    knownSlugs.add(e.slug)
    titleBySlug.set(e.slug, e.title)
  }

  const acc = new Map<string, Map<string, WikiBacklinkRef>>()

  for (const hit of iterWikilinks(bodies, knownSlugs)) {
    let bucket = acc.get(hit.target)
    if (!bucket) {
      bucket = new Map<string, WikiBacklinkRef>()
      acc.set(hit.target, bucket)
    }
    if (bucket.has(hit.source)) continue
    bucket.set(hit.source, {
      slug: hit.source,
      path: wikiUrl.page(hit.source),
      title: titleBySlug.get(hit.source) ?? hit.source,
      snippet: buildSnippet(hit.body, hit.matchStart, hit.matchEnd, hit.target),
    })
  }

  const byTarget: Record<string, WikiBacklinkRef[]> = {}
  for (const [target, bucket] of acc) {
    byTarget[target] = [...bucket.values()]
      .sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0))
      .slice(0, BACKLINKS_PER_TARGET_CAP)
  }
  return { byTarget }
}

interface WalkedCorpus {
  entries: WikiSlugIndexEntry[]
  files: string[]
  bodies: { slug: string; body: string }[]
  descriptions: Record<string, string>
}

/**
 * Walk content/ once and collect everything downstream consumers need.
 * Private — the public `buildWikiSlugIndex` and `buildWikiBacklinks` derive
 * their results from this so we never double-walk during a single regenerate.
 */
async function walkCorpus(rootDir: string): Promise<WalkedCorpus> {
  const contentDir = join(rootDir, 'content')
  const entries: WikiSlugIndexEntry[] = []
  const files: string[] = []
  const bodies: { slug: string; body: string }[] = []

  for (const col of COLLECTIONS) {
    const sourceDir = col.subpath ? join(contentDir, col.subpath) : contentDir
    const found = await walkMarkdown(sourceDir)

    for (const abs of found) {
      // For overview collection, only include `overview.md` at content root.
      if (col.dir === 'overview') {
        if (relative(contentDir, abs) !== 'overview.md') continue
      }
      // Skip files that belong to a deeper collection (e.g. `courses/x.md`
      // surfaced while walking the content root for the overview collection).
      if (col.dir === 'overview' && relative(contentDir, abs).includes('/')) continue

      const rel = relative(contentDir, abs).replace(/\\/g, '/')
      const slug = abs.split(/[\\/]/).pop()!.replace(/\.md$/i, '')

      const raw = await readFile(abs, 'utf8').catch(() => '')
      const fm = parseFrontmatter(raw)
      bodies.push({ slug, body: bodyOf(raw) })

      files.push(rel)
      entries.push({
        slug,
        path: wikiUrl.page(slug),
        title: fm.title ?? slug,
        type: (fm.type as WikiPageType | undefined) ?? COLLECTION_TO_TYPE[col.dir],
        collection: col.dir,
      })
    }
  }

  const indexPath = join(contentDir, '_index.md')
  let descriptions: Record<string, string> = {}
  if (existsSync(indexPath)) {
    const rawIndex = await readFile(indexPath, 'utf8').catch(() => '')
    descriptions = parseIndexDescriptions(rawIndex)
  }

  return { entries, files, bodies, descriptions }
}

function assembleSlugIndex(corpus: WalkedCorpus): WikiSlugIndex {
  const { entries, files, bodies, descriptions } = corpus
  const slugs: Record<string, string> = {}
  for (const e of entries) slugs[e.slug] = e.path
  const knownSlugs = new Set(entries.map((e) => e.slug))
  const { inboundLinks, totalLinkCount } = countInboundLinks(bodies, knownSlugs)
  return { files, slugs, entries, descriptions, inboundLinks, totalLinkCount }
}

export async function buildWikiSlugIndex(rootDir: string): Promise<WikiSlugIndex> {
  return assembleSlugIndex(await walkCorpus(rootDir))
}

export async function buildWikiBacklinks(rootDir: string): Promise<WikiBacklinksMap> {
  const corpus = await walkCorpus(rootDir)
  return extractBacklinks(corpus.bodies, corpus.entries)
}

/**
 * Build both artefacts from a single corpus walk. Used by the Nuxt module's
 * regenerate() so the slug index and the backlinks map come from one disk read.
 */
export async function buildWikiArtifacts(
  rootDir: string,
): Promise<{ index: WikiSlugIndex; backlinks: WikiBacklinksMap }> {
  const corpus = await walkCorpus(rootDir)
  return {
    index: assembleSlugIndex(corpus),
    backlinks: extractBacklinks(corpus.bodies, corpus.entries),
  }
}

export { COLLECTIONS, COLLECTION_TO_TYPE }
