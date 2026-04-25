/**
 * Pure slug-index builder. Has NO dependency on @nuxt/kit so it can be
 * imported by tests, scripts, and the runtime module alike. SRP.
 *
 * Beyond the slug → path map (the original purpose), this module also:
 *   - Parses `content/_index.md` (synced from fp-vut-obsidian/index.md) for
 *     one-line descriptions per slug.
 *   - Walks every page body and counts inbound [[wikilinks]] per slug.
 * Both are additive — existing consumers (remark-wiki-link urlResolver, the
 * useWikiSlugIndex composable, search) read the same shape they always did.
 */
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'

import type {
  WikiCollectionName,
  WikiPageType,
  WikiSlugIndex,
  WikiSlugIndexEntry,
} from '../../shared/types/wiki'
import { wikiUrl } from '../../shared/wiki-routes'

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
 * Count inbound [[wikilinks]] per slug across all body texts. `![[…]]` image
 * embeds and self-edges are excluded.
 */
export function countInboundLinks(
  bodies: { slug: string; body: string }[],
  knownSlugs: Set<string>,
): { inboundLinks: Record<string, number>; totalLinkCount: number } {
  const inboundLinks: Record<string, number> = {}
  let totalLinkCount = 0
  // Match [[…]] but not ![[…]]. Lookbehind keeps it tight.
  const linkRe = /(?<!!)\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]/g
  for (const { slug: source, body } of bodies) {
    let m: RegExpExecArray | null
    while ((m = linkRe.exec(body)) !== null) {
      const target = m[1]!.trim()
      if (target === source) continue
      if (!knownSlugs.has(target)) continue
      inboundLinks[target] = (inboundLinks[target] ?? 0) + 1
      totalLinkCount++
    }
  }
  return { inboundLinks, totalLinkCount }
}

export async function buildWikiSlugIndex(rootDir: string): Promise<WikiSlugIndex> {
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

  const slugs: Record<string, string> = {}
  for (const e of entries) slugs[e.slug] = e.path

  // Descriptions: parse _index.md if present at content root.
  const indexPath = join(contentDir, '_index.md')
  let descriptions: Record<string, string> = {}
  if (existsSync(indexPath)) {
    const rawIndex = await readFile(indexPath, 'utf8').catch(() => '')
    descriptions = parseIndexDescriptions(rawIndex)
  }

  // Inbound link counts: walk body texts.
  const knownSlugs = new Set(entries.map((e) => e.slug))
  const { inboundLinks, totalLinkCount } = countInboundLinks(bodies, knownSlugs)

  return { files, slugs, entries, descriptions, inboundLinks, totalLinkCount }
}

export { COLLECTIONS, COLLECTION_TO_TYPE }
