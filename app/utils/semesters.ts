/**
 * Semester grouping for course listings (sidebar, /courses, home). Pure — no
 * Nuxt imports — so it is unit-testable and shared by every listing.
 *
 * Input items carry a `placement` already validated by
 * `#shared/study-plan::parseStudyPlacement`; null (missing or out-of-range
 * frontmatter) lands in a trailing "Ostatní" group instead of being dropped.
 */
import { compareStudyPlacements, type StudyPlacement } from '#shared/study-plan'
import { studyPlacementLabel } from '~/utils/labels'

export interface Placed {
  placement: StudyPlacement | null
}

export interface SemesterGroup<T> {
  /** Stable id, e.g. `master-1-summer`. Safe as an HTML id / URL fragment. */
  key: string
  /** Czech label; see labels.ts `studyPlacementLabel`. */
  label: string
  courses: T[]
}

export const OTHER_SEMESTER_KEY = 'ostatni'
export const OTHER_SEMESTER_LABEL = 'Ostatní'

function semesterKey({ degree, studyYear, semester }: StudyPlacement): string {
  return `${degree}-${studyYear}-${semester}`
}

/**
 * Groups in study-plan order (degree, year, winter before summer), then
 * "Ostatní". Labels name the degree only when courses span several degrees.
 * Input order is kept inside each group, so pass courses sorted by title.
 */
export function groupCoursesBySemester<T extends Placed>(
  courses: readonly T[],
): SemesterGroup<T>[] {
  const groups = new Map<string, { placement: StudyPlacement; courses: T[] }>()
  const other: T[] = []
  for (const c of courses) {
    if (!c.placement) {
      other.push(c)
      continue
    }
    const key = semesterKey(c.placement)
    const group = groups.get(key) ?? { placement: c.placement, courses: [] }
    group.courses.push(c)
    groups.set(key, group)
  }
  const placed = [...groups.values()].sort((a, b) =>
    compareStudyPlacements(a.placement, b.placement),
  )
  const withDegree = new Set(placed.map((g) => g.placement.degree)).size > 1
  const sorted: SemesterGroup<T>[] = placed.map((g) => ({
    key: semesterKey(g.placement),
    label: studyPlacementLabel(g.placement, withDegree),
    courses: g.courses,
  }))
  if (other.length) {
    sorted.push({ key: OTHER_SEMESTER_KEY, label: OTHER_SEMESTER_LABEL, courses: other })
  }
  return sorted
}

/**
 * The most advanced semester present — the last real group in plan order,
 * skipping "Ostatní". Undefined when no course is placed.
 */
export function latestSemesterGroup<T>(
  groups: readonly SemesterGroup<T>[],
): SemesterGroup<T> | undefined {
  return groups.findLast((g) => g.key !== OTHER_SEMESTER_KEY)
}

/**
 * The group the home page narrows to: the latest semester, but only when
 * there are several groups and every course is placed. Any unplaced course
 * would otherwise vanish from home, so then the full list shows (undefined).
 */
export function homeSemesterGroup<T>(
  groups: readonly SemesterGroup<T>[],
): SemesterGroup<T> | undefined {
  if (groups.length <= 1 || groups.some((g) => g.key === OTHER_SEMESTER_KEY)) return undefined
  return latestSemesterGroup(groups)
}
