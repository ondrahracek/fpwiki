import { resolveCourses } from '~/utils/frontmatter'

export interface CourseWithStats {
  slug: string
  title: string
  /** zápisků count: topics + summaries + outputs that name this course. */
  count: number
}

/**
 * Course list with per-course zápisků counts. Single useAsyncData call
 * shared across consumers (today: AppPrimaryNav). Cache key 'courses-with-stats'
 * — slug-uniqueness is enforced by scripts/validate-content.ts so the slug
 * field is globally unique.
 *
 * Returned list is sorted by title ASC (stable prerender output).
 *
 * Centralizing the fan-out here also satisfies the
 * test/shared/tag-aggregation.lint.test.ts intent: there's exactly one site
 * that walks topics+summaries+outputs to attribute counts to courses.
 */
export function useCoursesWithStats() {
  return useAsyncData<CourseWithStats[]>(
    'courses-with-stats',
    async () => {
      const [coursesList, topics, summaries, outputs] = await Promise.all([
        queryCollection('courses').order('title', 'ASC').all(),
        queryCollection('topics').all(),
        queryCollection('summaries').all(),
        queryCollection('outputs').all(),
      ])
      const counts = new Map<string, number>()
      for (const list of [topics, summaries, outputs]) {
        for (const p of list) {
          for (const slug of resolveCourses(p)) {
            counts.set(slug, (counts.get(slug) ?? 0) + 1)
          }
        }
      }
      return coursesList.map((c) => {
        const slug = resolveCourses(c)[0] ?? c.stem ?? ''
        return {
          slug,
          title: c.title ?? slug,
          count: counts.get(slug) ?? 0,
        }
      })
    },
    {
      default: () => [],
      // Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
      ...(import.meta.dev ? { getCachedData: () => undefined } : {}),
    },
  )
}
