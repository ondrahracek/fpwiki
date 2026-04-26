import { WIKI_PAGE_COLLECTIONS } from '#shared/types/wiki'

/**
 * Site-wide totals: zápisků (sum of topics+summaries+outputs), předmětů
 * (courses count), témat (topics count), cross-linků (slug-index aggregate).
 *
 * Single useAsyncData call shared across consumers (HomeStatsBar today;
 * potentially /about or /tags later). Stable cache key.
 */
export function useTotalStats() {
  const { totalCrossLinks } = useWikiSlugIndex()

  const { data } = useAsyncData(
    'total-stats',
    async () => {
      const entries = await Promise.all(
        WIKI_PAGE_COLLECTIONS.map(
          async (name) => [name, await queryCollection(name).count()] as const,
        ),
      )
      const counts = Object.fromEntries(entries) as Record<
        (typeof WIKI_PAGE_COLLECTIONS)[number],
        number
      >
      return {
        courses: counts.courses,
        topics: counts.topics,
        summaries: counts.summaries,
        outputs: counts.outputs,
        zapisku: counts.topics + counts.summaries + counts.outputs,
      }
    },
    {
      default: () => ({ courses: 0, topics: 0, summaries: 0, outputs: 0, zapisku: 0 }),
      // Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
      ...(import.meta.dev ? { getCachedData: () => undefined } : {}),
    },
  )

  return computed(() => ({
    ...data.value,
    crossLinks: totalCrossLinks.value,
  }))
}
