import { describe, it, expect } from 'vitest'
import { stripDiacritics, toSlug } from '../../app/utils/slug'

describe('stripDiacritics', () => {
  it('removes Czech diacritics', () => {
    expect(stripDiacritics('přebytek')).toBe('prebytek')
    expect(stripDiacritics('Žluťoučký')).toBe('Zlutoucky')
    expect(stripDiacritics('Lagrangeova')).toBe('Lagrangeova')
  })

  it('leaves ASCII strings alone', () => {
    expect(stripDiacritics('hello world')).toBe('hello world')
  })

  it('handles empty input', () => {
    expect(stripDiacritics('')).toBe('')
  })
})

describe('toSlug', () => {
  it('produces ASCII kebab-case from Czech titles', () => {
    expect(toSlug('Přebytek spotřebitele')).toBe('prebytek-spotrebitele')
    expect(toSlug('IS-LM analýza')).toBe('is-lm-analyza')
  })

  it('trims edge dashes and collapses runs', () => {
    expect(toSlug('  -- foo -- bar -- ')).toBe('foo-bar')
  })
})
