import type { WikiCollectionName } from '#shared/types/wiki'
import { resolveCourses } from '~/utils/frontmatter'

interface CourseStats {
  /** Total non-overview pages associated with this course (topics + summaries + outputs). */
  zapisku: number
  /** Per-collection breakdown for finer surfaces. */
  topics: number
  summaries: number
  outputs: number
}

/**
 * Reactive course-level aggregates. Single source of truth for "how many
 * zápisků are there for this course?", reused by:
 *   - /courses card "zápisků" count
 *   - /wiki/:slug meta line "Magistr · N zápisků · #firstTag"
 *   - WikiSidebar course list
 *   - HomeStatsBar
 *
 * Reads from @nuxt/content collections via useAsyncData with a stable per-
 * course key, so prerender-time payloads carry the result.
 */
export function useCourseStats(courseSlug: MaybeRefOrGetter<string>) {
  const slugRef = computed(() => toValue(courseSlug))

  const { data } = useAsyncData<CourseStats>(
    () => `course-stats-${slugRef.value}`,
    async () => {
      const slug = slugRef.value
      if (!slug) {
        return { zapisku: 0, topics: 0, summaries: 0, outputs: 0 }
      }

      const collections: WikiCollectionName[] = ['topics', 'summaries', 'outputs']
      const counts: Record<WikiCollectionName, number> = {
        overview: 0,
        courses: 0,
        topics: 0,
        summaries: 0,
        outputs: 0,
      }

      await Promise.all(
        collections.map(async (name) => {
          const all = await queryCollection(name).all()
          for (const p of all) {
            const courses = resolveCourses(p)
            if (courses.includes(slug)) {
              counts[name]++
            }
          }
        }),
      )

      return {
        zapisku: counts.topics + counts.summaries + counts.outputs,
        topics: counts.topics,
        summaries: counts.summaries,
        outputs: counts.outputs,
      }
    },
    {
      default: () => ({
        zapisku: 0,
        topics: 0,
        summaries: 0,
        outputs: 0,
      }),
      watch: [slugRef],
      // Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
      ...(import.meta.dev ? { getCachedData: () => undefined } : {}),
    },
  )

  return data
}
