/**
 * Types shared between client (Nuxt app) and server (Nitro). Per Nuxt 4
 * convention these live under `shared/` and are auto-imported in both contexts.
 */

export type WikiPageType = 'course' | 'topic' | 'summary' | 'output' | 'overview'

export type WikiCollectionName = 'overview' | 'courses' | 'topics' | 'summaries' | 'outputs'

/**
 * All page collections that can carry tags and appear in cross-collection
 * listings. Single source of truth for the fan-out array — never re-type
 * `['courses', 'topics', 'summaries', 'outputs']` inline. Adding a new page
 * collection? Update this and `WikiCollectionName` together.
 */
export const WIKI_PAGE_COLLECTIONS = [
  'courses',
  'topics',
  'summaries',
  'outputs',
] as const satisfies readonly WikiCollectionName[]

export interface WikiSlugIndexEntry {
  slug: string
  path: string
  title: string
  type: WikiPageType
  collection: WikiCollectionName
}

export interface WikiSlugIndex {
  /** Source file paths, relative to `content/`. Used by remark-wiki-link `files` option. */
  files: string[]
  /** Map of slug -> URL path on the web app. */
  slugs: Record<string, string>
  /** Full entries for richer lookups (search, breadcrumbs). */
  entries: WikiSlugIndexEntry[]
  /**
   * One-line descriptions per slug, parsed from `content/_index.md` (the
   * descriptions catalog published by the upstream content corpus).
   * Format: `- [[slug|Title]] — desc`. Pages not present in `_index.md` (or
   * when the file is absent) get no entry.
   */
  descriptions: Record<string, string>
  /**
   * Inbound `[[wikilink]]` count per slug. `![[…]]` image embeds excluded.
   * Self-edges excluded. Used by stats counter and "Nejvíce propojené" surfaces.
   */
  inboundLinks: Record<string, number>
  /** Total `[[wikilink]]` edges across the corpus (sum of inboundLinks). */
  totalLinkCount: number
}

export interface WikiBacklinkRef {
  /** Slug of the page that links to the target. */
  slug: string
  /** Pre-computed wiki URL of the source page (built via wikiUrl.page). */
  path: string
  /** Source page title (frontmatter `title`, falls back to slug). */
  title: string
  /**
   * NFC-normalized plaintext snippet (~120 chars) around the matched wikilink,
   * with the matched term wrapped in `<<…>>` markers. Renderer turns the
   * markers into <mark>; never inject as HTML.
   */
  snippet: string
}

export interface WikiBacklinksMap {
  /**
   * Target slug → backlinks. Capped per target and ordered deterministically
   * (by source slug) so prerendered output is stable across builds.
   */
  byTarget: Record<string, WikiBacklinkRef[]>
}

export interface WikiSearchSection {
  id: string
  title: string
  titles: string[]
  content: string
  level: number
  /** Origin collection — added by useAllSearchSections so consumers know where to link. */
  collection: WikiCollectionName
}

/**
 * Which search engine the runtime should use. Runtime selection lives in
 * `app/composables/useSearchEngine.ts`. Both engines remain implemented
 * during the evaluation period — see TODO(search-engine) markers.
 */
export type SearchEngineKind = 'fuse' | 'minisearch'
