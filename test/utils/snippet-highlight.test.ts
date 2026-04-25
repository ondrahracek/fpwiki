import { describe, it, expect } from 'vitest'
import { parseHighlight } from '../../app/utils/snippet-highlight'

describe('parseHighlight', () => {
  it('returns a single non-highlighted segment when no markers exist', () => {
    expect(parseHighlight('plain text')).toEqual([{ text: 'plain text', highlight: false }])
  })

  it('parses a single marker into three segments', () => {
    expect(parseHighlight('Cenová <<elasticita>> poptávky')).toEqual([
      { text: 'Cenová ', highlight: false },
      { text: 'elasticita', highlight: true },
      { text: ' poptávky', highlight: false },
    ])
  })

  it('parses multiple markers in order', () => {
    expect(parseHighlight('<<a>> mid <<b>> end')).toEqual([
      { text: 'a', highlight: true },
      { text: ' mid ', highlight: false },
      { text: 'b', highlight: true },
      { text: ' end', highlight: false },
    ])
  })

  it('handles a marker at the very start and end of the string', () => {
    expect(parseHighlight('<<x>>')).toEqual([{ text: 'x', highlight: true }])
  })

  it('returns empty array on empty string', () => {
    expect(parseHighlight('')).toEqual([])
  })

  it('treats unmatched > as plain text (no false positives)', () => {
    expect(parseHighlight('a >> b')).toEqual([{ text: 'a >> b', highlight: false }])
  })
})
