import { describe, it, expect } from 'vitest'
import { tagColor } from '../../app/plugins/tag-colors'

describe('tagColor', () => {
  it('returns deterministic colors for known tags', () => {
    const a = tagColor('finance')
    const b = tagColor('finance')
    expect(a).toEqual(b)
  })

  it('handles diacritics consistently', () => {
    // 'kvantitativní' is in the hue map under its de-diacritized key
    const accented = tagColor('kvantitativní')
    const ascii = tagColor('kvantitativni')
    expect(accented).toEqual(ascii)
  })

  it('returns oklch color values', () => {
    const c = tagColor('finance')
    expect(c.bg).toMatch(/^oklch\(/)
    expect(c.fg).toMatch(/^oklch\(/)
    expect(c.dot).toMatch(/^oklch\(/)
  })

  it('produces stable hash-derived colors for unknown tags', () => {
    const a = tagColor('some-novel-tag')
    const b = tagColor('some-novel-tag')
    expect(a).toEqual(b)
  })
})
