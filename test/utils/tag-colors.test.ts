import { describe, it, expect } from 'vitest'
import { identityColor, identityVars } from '../../app/plugins/tag-colors'

describe('identityColor', () => {
  it('is deterministic for the same key', () => {
    expect(identityColor('finance')).toEqual(identityColor('finance'))
  })

  it('is case-insensitive', () => {
    expect(identityColor('IMEK')).toEqual(identityColor('imek'))
    expect(identityColor('ImeK')).toEqual(identityColor('imek'))
  })

  it('strips Czech diacritics', () => {
    expect(identityColor('kvantitativní')).toEqual(identityColor('kvantitativni'))
    expect(identityColor('Ímek')).toEqual(identityColor('imek'))
    expect(identityColor('příjem')).toEqual(identityColor('prijem'))
  })

  it('returns oklch color values', () => {
    const c = identityColor('finance')
    expect(c.bg).toMatch(/^oklch\(/)
    expect(c.fg).toMatch(/^oklch\(/)
    expect(c.dot).toMatch(/^oklch\(/)
  })

  it('produces stable colors for arbitrary keys (no curated table)', () => {
    expect(identityColor('some-novel-tag')).toEqual(identityColor('some-novel-tag'))
    expect(identityColor('whatever-future-topic')).toEqual(identityColor('whatever-future-topic'))
  })

  it('distinguishes unrelated keys (regression guard for the old default-accent footgun)', () => {
    expect(identityColor('imek')).not.toEqual(identityColor('ekonomie'))
    expect(identityColor('imork')).not.toEqual(identityColor('ipmrk'))
  })

  it('handles boundary inputs without throwing', () => {
    expect(() => identityColor('')).not.toThrow()
    expect(() => identityColor('a')).not.toThrow()
    expect(identityColor('a').bg).toMatch(/^oklch\(/)
  })
})

describe('identityVars', () => {
  it('returns the three --id-* CSS custom properties', () => {
    const v = identityVars('imek')
    expect(Object.keys(v).sort()).toEqual(['--id-bg', '--id-dot', '--id-fg'])
    expect(v['--id-bg']).toMatch(/^oklch\(/)
  })

  it('matches identityColor for the same key', () => {
    const c = identityColor('imek')
    const v = identityVars('imek')
    expect(v['--id-bg']).toBe(c.bg)
    expect(v['--id-fg']).toBe(c.fg)
    expect(v['--id-dot']).toBe(c.dot)
  })
})
