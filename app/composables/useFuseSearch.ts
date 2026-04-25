import Fuse from 'fuse.js'
import type { WikiSearchSection } from '#shared/types/wiki'
import { stripDiacritics } from '~/utils/slug'

/**
 * Fuse.js search wrapper.
 *
 * TODO(search-engine): One of two implementations under evaluation. See
 * useSearchEngine.ts for context and removal procedure.
 *
 * Czech handling: Fuse 7 doesn't expose a query-side processTerm hook, so we
 * pre-strip diacritics from both indexed text (via getFn) and query string at
 * call time. That keeps `pribytek` matching `přebytek`.
 */
export interface SearchHit {
  section: WikiSearchSection
  score: number
}

export function useFuseSearch(sections: Ref<WikiSearchSection[]>) {
  const fuse = computed(
    () =>
      new Fuse(sections.value, {
        keys: ['title', 'titles', 'content'],
        threshold: 0.35,
        ignoreLocation: true,
        includeScore: true,
        getFn: (obj, path) => {
          const raw = Fuse.config.getFn(obj, path)
          if (Array.isArray(raw)) return raw.map((s) => stripDiacritics(String(s)).toLowerCase())
          return stripDiacritics(String(raw ?? '')).toLowerCase()
        },
      }),
  )

  const search = (query: string, limit = 30): SearchHit[] => {
    const q = stripDiacritics(query).toLowerCase().trim()
    if (!q) return []
    return fuse.value.search(q, { limit }).map((r) => ({ section: r.item, score: r.score ?? 1 }))
  }

  return { search }
}
