import { describe, it, expect } from 'vitest'
import { useCzechSearch } from '../../app/composables/useCzechSearch'

describe('useCzechSearch', () => {
  const { processTerm, tokenize } = useCzechSearch()

  it('strips diacritics and lowercases', () => {
    expect(processTerm('Přebytek')).toBe('prebytek')
    expect(processTerm('LAGRANGE')).toBe('lagrange')
  })

  it('returns null for empty after trim', () => {
    expect(processTerm('   ')).toBeNull()
    expect(processTerm('')).toBeNull()
  })

  it('matches accented and unaccented forms via the same processed term', () => {
    expect(processTerm('přebytek')).toBe(processTerm('prebytek'))
    expect(processTerm('Spotřebitel')).toBe(processTerm('spotrebitel'))
  })

  it('tokenizes Czech sentences into searchable tokens', () => {
    const tokens = tokenize('Cobb-Douglasova produkční funkce, parciální derivace.')
    expect(tokens).toContain('cobb')
    expect(tokens).toContain('douglasova')
    expect(tokens).toContain('produkcni')
    expect(tokens).toContain('parcialni')
    expect(tokens).toContain('derivace')
  })
})
