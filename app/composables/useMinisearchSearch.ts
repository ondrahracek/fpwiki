import MiniSearch from 'minisearch'
import type { WikiSearchSection } from '#shared/types/wiki'
import { stripDiacritics } from '~/utils/slug'

/**
 * MiniSearch wrapper.
 *
 * TODO(search-engine): One of two implementations under evaluation. See
 * useSearchEngine.ts for context and removal procedure.
 *
 * Czech handling: MiniSearch exposes `processTerm` for both indexing and
 * querying — applied symmetrically below so accented and unaccented forms
 * collapse to the same term.
 */
export interface MinisearchHit {
  section: WikiSearchSection
  score: number
}

const processTerm = (term: string): string | null => {
  const cleaned = stripDiacritics(term).toLowerCase().trim()
  return cleaned.length > 0 ? cleaned : null
}

export function useMinisearchSearch(sections: Ref<WikiSearchSection[]>) {
  const ms = computed(() => {
    const ms = new MiniSearch<WikiSearchSection>({
      idField: 'id',
      fields: ['title', 'content'],
      storeFields: ['id', 'title', 'titles', 'content', 'level', 'collection'],
      searchOptions: {
        prefix: true,
        fuzzy: 0.2,
        boost: { title: 2 },
        processTerm,
      },
      processTerm,
    })
    ms.addAll(sections.value)
    return ms
  })

  const search = (query: string, limit = 30): MinisearchHit[] => {
    const q = query.trim()
    if (!q) return []
    return ms.value
      .search(q)
      .slice(0, limit)
      .map((r) => ({
        section: {
          id: String(r.id),
          title: r.title,
          titles: r.titles ?? [],
          content: r.content ?? '',
          level: r.level ?? 1,
          collection: r.collection,
        },
        score: r.score,
      }))
  }

  return { search }
}
