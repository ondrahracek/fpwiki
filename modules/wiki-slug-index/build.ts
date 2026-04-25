/**
 * Pure slug-index builder. Has NO dependency on @nuxt/kit so it can be
 * imported by tests, scripts, and the runtime module alike. SRP.
 */
import { readdir, readFile } from 'node:fs/promises'
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

export async function buildWikiSlugIndex(rootDir: string): Promise<WikiSlugIndex> {
  const contentDir = join(rootDir, 'content')
  const entries: WikiSlugIndexEntry[] = []
  const files: string[] = []

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

  return { files, slugs, entries }
}

export { COLLECTIONS, COLLECTION_TO_TYPE }
