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
      const [coursesCount, topicsCount, summariesCount, outputsCount] = await Promise.all([
        queryCollection('courses').count(),
        queryCollection('topics').count(),
        queryCollection('summaries').count(),
        queryCollection('outputs').count(),
      ])
      return {
        courses: coursesCount,
        topics: topicsCount,
        summaries: summariesCount,
        outputs: outputsCount,
        zapisku: topicsCount + summariesCount + outputsCount,
      }
    },
    {
      default: () => ({ courses: 0, topics: 0, summaries: 0, outputs: 0, zapisku: 0 }),
    },
  )

  return computed(() => ({
    ...data.value,
    crossLinks: totalCrossLinks.value,
  }))
}
