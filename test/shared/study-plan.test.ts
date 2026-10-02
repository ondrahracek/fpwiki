import { describe, it, expect } from 'vitest'
import {
  DEGREE_IDS,
  DEGREES,
  MAX_STUDY_YEAR,
  compareStudyPlacements,
  parseStudyPlacement,
  type StudyPlacement,
} from '../../shared/study-plan'

describe('parseStudyPlacement', () => {
  it('accepts a complete, in-range placement', () => {
    expect(parseStudyPlacement({ degree: 'master', studyYear: 1, semester: 'summer' })).toEqual({
      degree: 'master',
      studyYear: 1,
      semester: 'summer',
    })
  })

  it('allows each degree exactly its own number of years', () => {
    for (const degree of DEGREE_IDS) {
      const { years } = DEGREES[degree]
      expect(parseStudyPlacement({ degree, studyYear: years, semester: 'winter' })).not.toBeNull()
      expect(parseStudyPlacement({ degree, studyYear: years + 1, semester: 'winter' })).toBeNull()
    }
  })

  it('rejects a 3rd year for master but accepts it for bachelor', () => {
    expect(parseStudyPlacement({ degree: 'master', studyYear: 3, semester: 'summer' })).toBeNull()
    expect(
      parseStudyPlacement({ degree: 'bachelor', studyYear: 3, semester: 'summer' }),
    ).not.toBeNull()
  })

  it.each([
    ['missing degree', { studyYear: 1, semester: 'summer' }],
    ['unknown degree', { degree: 'phd', studyYear: 1, semester: 'summer' }],
    ['inherited key as degree', { degree: 'toString', studyYear: 1, semester: 'summer' }],
    ['missing year', { degree: 'master', semester: 'summer' }],
    ['year 0', { degree: 'master', studyYear: 0, semester: 'summer' }],
    ['fractional year', { degree: 'master', studyYear: 1.5, semester: 'summer' }],
    ['string year', { degree: 'master', studyYear: '1', semester: 'summer' }],
    ['missing semester', { degree: 'master', studyYear: 1 }],
    ['Czech semester', { degree: 'master', studyYear: 1, semester: 'letni' }],
  ])('returns null for %s', (_, fields) => {
    expect(parseStudyPlacement(fields)).toBeNull()
  })
})

describe('MAX_STUDY_YEAR', () => {
  it('is the longest programme', () => {
    expect(MAX_STUDY_YEAR).toBe(Math.max(...Object.values(DEGREES).map((d) => d.years)))
  })
})

describe('compareStudyPlacements', () => {
  const p = (degree: 'bachelor' | 'master', studyYear: number, semester: 'winter' | 'summer') =>
    ({ degree, studyYear, semester }) satisfies StudyPlacement

  it('orders by degree, then year, then winter before summer', () => {
    const shuffled = [
      p('master', 2, 'summer'),
      p('bachelor', 3, 'summer'),
      p('master', 1, 'summer'),
      p('master', 2, 'winter'),
      p('master', 1, 'winter'),
      p('bachelor', 1, 'winter'),
    ]
    expect([...shuffled].sort(compareStudyPlacements)).toEqual([
      p('bachelor', 1, 'winter'),
      p('bachelor', 3, 'summer'),
      p('master', 1, 'winter'),
      p('master', 1, 'summer'),
      p('master', 2, 'winter'),
      p('master', 2, 'summer'),
    ])
  })
})
