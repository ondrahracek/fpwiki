import { describe, it, expect } from 'vitest'
import type { Degree, Semester } from '../../shared/study-plan'
import {
  groupCoursesBySemester,
  homeSemesterGroup,
  latestSemesterGroup,
  OTHER_SEMESTER_KEY,
  OTHER_SEMESTER_LABEL,
} from '../../app/utils/semesters'

// Synthetic slugs: grouping only reads `placement`.
const placed = (
  slug: string,
  studyYear: number,
  semester: Semester,
  degree: Degree = 'master',
) => ({
  slug,
  placement: { degree, studyYear, semester },
})
const unplaced = (slug: string) => ({ slug, placement: null })

const keys = (groups: { key: string }[]) => groups.map((g) => g.key)

describe('groupCoursesBySemester', () => {
  it('returns [] for no courses', () => {
    expect(groupCoursesBySemester([])).toEqual([])
  })

  it('groups courses of one semester together, keeping input order', () => {
    const groups = groupCoursesBySemester([placed('a', 1, 'summer'), placed('b', 1, 'summer')])
    expect(keys(groups)).toEqual(['master-1-summer'])
    expect(groups[0]?.courses.map((c) => c.slug)).toEqual(['a', 'b'])
  })

  it('orders groups by study plan: 1 zimní, 1 letní, 2 zimní, 2 letní', () => {
    const groups = groupCoursesBySemester([
      placed('d', 2, 'summer'),
      placed('b', 1, 'summer'),
      placed('c', 2, 'winter'),
      placed('a', 1, 'winter'),
    ])
    expect(keys(groups)).toEqual([
      'master-1-winter',
      'master-1-summer',
      'master-2-winter',
      'master-2-summer',
    ])
  })

  it('collects unplaced courses into a trailing "Ostatní" group', () => {
    const groups = groupCoursesBySemester([unplaced('x'), placed('a', 2, 'winter'), unplaced('y')])
    expect(keys(groups)).toEqual(['master-2-winter', OTHER_SEMESTER_KEY])
    expect(groups[1]?.label).toBe(OTHER_SEMESTER_LABEL)
    expect(groups[1]?.courses.map((c) => c.slug)).toEqual(['x', 'y'])
  })

  it('labels without the degree when only one degree is listed', () => {
    const groups = groupCoursesBySemester([placed('a', 2, 'winter'), placed('b', 1, 'summer')])
    expect(groups.map((g) => g.label)).toEqual([
      '1. ročník · letní semestr',
      '2. ročník · zimní semestr',
    ])
  })

  it('puts bachelor before master and names the degree when both are listed', () => {
    const groups = groupCoursesBySemester([
      placed('mgr', 1, 'winter'),
      placed('bc', 3, 'summer', 'bachelor'),
    ])
    expect(keys(groups)).toEqual(['bachelor-3-summer', 'master-1-winter'])
    expect(groups.map((g) => g.label)).toEqual([
      'Bc. 3. ročník · letní semestr',
      'Ing. 1. ročník · zimní semestr',
    ])
  })
})

describe('latestSemesterGroup', () => {
  it('returns the most advanced semester, skipping "Ostatní"', () => {
    const groups = groupCoursesBySemester([
      placed('a', 1, 'summer'),
      placed('b', 2, 'winter'),
      unplaced('x'),
    ])
    expect(latestSemesterGroup(groups)?.key).toBe('master-2-winter')
  })

  it('is undefined when nothing is placed', () => {
    expect(latestSemesterGroup(groupCoursesBySemester([unplaced('x')]))).toBeUndefined()
  })
})

describe('homeSemesterGroup', () => {
  it('narrows to the latest semester when every course is placed', () => {
    const groups = groupCoursesBySemester([placed('a', 1, 'summer'), placed('b', 2, 'winter')])
    expect(homeSemesterGroup(groups)?.key).toBe('master-2-winter')
  })

  it('keeps the full list (undefined) when any course is unplaced', () => {
    const groups = groupCoursesBySemester([
      placed('a', 1, 'summer'),
      placed('b', 2, 'winter'),
      unplaced('x'),
    ])
    expect(homeSemesterGroup(groups)).toBeUndefined()
  })

  it('keeps the full list (undefined) with a single semester', () => {
    const groups = groupCoursesBySemester([placed('a', 1, 'summer'), placed('b', 1, 'summer')])
    expect(homeSemesterGroup(groups)).toBeUndefined()
  })
})
