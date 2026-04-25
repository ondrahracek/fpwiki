import { describe, it, expect } from 'vitest'
import { resolveCourses, stripSources, toISODate } from '../../app/utils/frontmatter'

describe('resolveCourses', () => {
  it('returns [] for missing fields', () => {
    expect(resolveCourses({})).toEqual([])
    expect(resolveCourses(null)).toEqual([])
    expect(resolveCourses(undefined)).toEqual([])
  })

  it('wraps a single string course', () => {
    expect(resolveCourses({ course: 'imek' })).toEqual(['imek'])
  })

  it('preserves an array courses field', () => {
    expect(resolveCourses({ courses: ['imek', 'imork'] })).toEqual(['imek', 'imork'])
  })

  it('prefers courses over course when both present', () => {
    expect(resolveCourses({ course: 'wrong', courses: ['imek'] })).toEqual(['imek'])
  })

  it('filters falsy entries', () => {
    expect(resolveCourses({ courses: ['imek', '', 'imork'] })).toEqual(['imek', 'imork'])
  })

  it('coerces array-with-single string', () => {
    expect(resolveCourses({ course: ['solo'] })).toEqual(['solo'])
  })
})

describe('stripSources', () => {
  it('removes sources without mutating the input', () => {
    const fm = { title: 'x', sources: ['a', 'b'], tags: ['y'] }
    const out = stripSources(fm)
    expect('sources' in out).toBe(false)
    expect(out).toEqual({ title: 'x', tags: ['y'] })
    expect(fm.sources).toEqual(['a', 'b'])
  })

  it('passes through when sources is missing', () => {
    expect(stripSources({ title: 'x' })).toEqual({ title: 'x' })
  })
})

describe('toISODate', () => {
  it('returns undefined for empty', () => {
    expect(toISODate(undefined)).toBeUndefined()
    expect(toISODate(null)).toBeUndefined()
    expect(toISODate('')).toBeUndefined()
  })

  it('truncates Date to YYYY-MM-DD', () => {
    expect(toISODate(new Date('2026-04-22T12:34:56Z'))).toBe('2026-04-22')
  })

  it('truncates string to YYYY-MM-DD', () => {
    expect(toISODate('2026-04-22T12:34:56Z')).toBe('2026-04-22')
    expect(toISODate('2026-04-22')).toBe('2026-04-22')
  })
})
