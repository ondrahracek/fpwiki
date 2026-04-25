/**
 * Auto-derive related pages from shared course + tag overlap. No frontmatter
 * field is required; if/when authors want curated overrides, plug them in at
 * the WikiRelatedCard level — this helper stays pure.
 *
 * Rules:
 *   - Candidate must share at least one course with the current page (via
 *     `resolveCourses`).
 *   - Candidate must share at least 2 tags with the current page.
 *   - Self-exclusion by stem.
 *   - Sort by (sharedTagCount desc, title asc).
 *   - Cap at MAX_RELATED.
 */
import type { WikiCollectionName } from '#shared/types/wiki'
import { pathFor } from '#shared/wiki-routes'
import { resolveCourses } from '~/utils/frontmatter'

const MAX_RELATED = 5
const MIN_SHARED_TAGS = 2

interface PageLike {
  stem?: string
  path?: string | null
  title?: string
  tags?: string[]
  course?: string | string[]
  courses?: string | string[]
}

interface CandidateLike extends PageLike {
  collection: WikiCollectionName
}

export interface RelatedItem {
  slug: string
  title: string
  path: string
  sharedTags: number
}

function intersect<T>(a: readonly T[], b: readonly T[]): T[] {
  const set = new Set(a)
  return b.filter((x) => set.has(x))
}

function stemOf(p: PageLike): string {
  return (p.stem ?? '').split('/').pop() ?? ''
}

export function deriveRelated(current: PageLike, candidates: CandidateLike[]): RelatedItem[] {
  const currentStem = stemOf(current)
  const currentCourses = resolveCourses(current)
  const currentTags = current.tags ?? []
  if (currentTags.length === 0 || currentCourses.length === 0) return []

  const scored: RelatedItem[] = []
  for (const cand of candidates) {
    const candStem = stemOf(cand)
    if (!candStem || candStem === currentStem) continue
    const candCourses = resolveCourses(cand)
    if (intersect(currentCourses, candCourses).length === 0) continue
    const sharedTags = intersect(currentTags, cand.tags ?? []).length
    if (sharedTags < MIN_SHARED_TAGS) continue
    scored.push({
      slug: candStem,
      title: cand.title ?? candStem,
      path: pathFor({ path: cand.path ?? undefined, stem: cand.stem, collection: cand.collection }),
      sharedTags,
    })
  }

  scored.sort((a, b) => b.sharedTags - a.sharedTags || a.title.localeCompare(b.title, 'cs'))
  return scored.slice(0, MAX_RELATED)
}
