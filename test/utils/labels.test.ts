import { describe, it, expect } from 'vitest'
import { DEGREE_IDS } from '../../shared/study-plan'
import { DEGREE_ABBREVIATIONS, degreeLabel, studyPlacementLabel } from '../../app/utils/labels'

describe('degreeLabel', () => {
  it('labels known degrees', () => {
    expect(degreeLabel('master')).toBe('Navazující magisterské')
    expect(degreeLabel('bachelor')).toBe('Bakalářské')
  })

  it('is undefined for a missing or unknown degree', () => {
    expect(degreeLabel(undefined)).toBeUndefined()
    expect(degreeLabel('phd')).toBeUndefined()
  })

  it('has a label and an abbreviation for every degree', () => {
    for (const degree of DEGREE_IDS) {
      expect(degreeLabel(degree)).toBeTruthy()
      expect(DEGREE_ABBREVIATIONS[degree]).toBeTruthy()
    }
  })
})

describe('studyPlacementLabel', () => {
  const placement = { degree: 'master', studyYear: 1, semester: 'summer' } as const

  it('names year and semester', () => {
    expect(studyPlacementLabel(placement)).toBe('1. ročník · letní semestr')
  })

  it('prefixes the degree on request', () => {
    expect(studyPlacementLabel(placement, true)).toBe('Ing. 1. ročník · letní semestr')
    expect(
      studyPlacementLabel({ ...placement, degree: 'bachelor', semester: 'winter' }, true),
    ).toBe('Bc. 1. ročník · zimní semestr')
  })
})
