/**
 * Types shared between client (Nuxt app) and server (Nitro). Per Nuxt 4
 * convention these live under `shared/` and are auto-imported in both contexts.
 */

export type WikiPageType = 'course' | 'topic' | 'summary' | 'output' | 'overview'

export type WikiCollectionName = 'overview' | 'courses' | 'topics' | 'summaries' | 'outputs'

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
