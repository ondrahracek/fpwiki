import { WIKI_PAGE_COLLECTIONS } from '#shared/types/wiki'

export interface WikiTagCount {
  tag: string
  count: number
}

/**
 * Site-wide tag counts across all page collections (courses, topics,
 * summaries, outputs). Single useAsyncData call shared across consumers
 * (home tag cloud, /tags, TagsSidebar, CoursesSidebar). Stable cache key
 * 'all-tag-counts' — multiple consumers dedup to one query.
 *
 * Returned list is sorted: count DESC, then tag ASC for stable prerender
 * output. Consumers that want a top-N slice should slice the returned array;
 * do NOT add a `limit` arg here (would fragment the cache key).
 *
 * TODO(tag-norm): tag identity is raw string today — `přebytek` and
 * `prebytek` would count as two tags. If/when normalization is introduced,
 * apply it here AND ensure /tag/<slug> URLs use the same normalized form.
 */
export function useTagCounts() {
  return useAsyncData<WikiTagCount[]>(
    'all-tag-counts',
    async () => {
      const lists = await Promise.all(
        WIKI_PAGE_COLLECTIONS.map((name) => queryCollection(name).all()),
      )
      const counts = new Map<string, number>()
      for (const list of lists) {
        for (const p of list) {
          for (const t of p.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1)
        }
      }
      return Array.from(counts.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    },
    {
      default: () => [],
      // Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
      ...(import.meta.dev ? { getCachedData: () => undefined } : {}),
    },
  )
}
