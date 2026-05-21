import { describe, it, expect } from 'vitest'
import { unescapeWikilinkPipes } from '../../modules/remark-wikilink-pipe-unescape/build'

describe('unescapeWikilinkPipes', () => {
  it('rewrites \\| → | inside [[…]] (table-cell case)', () => {
    expect(unescapeWikilinkPipes('| x | [[isms\\|ISMS]] |')).toBe('| x | [[isms|ISMS]] |')
  })

  it('rewrites \\| → | in image embeds ![[…]]', () => {
    expect(unescapeWikilinkPipes('![[diag.png\\|alt]]')).toBe('![[diag.png|alt]]')
  })

  it('preserves unescaped pipes (no-op)', () => {
    expect(unescapeWikilinkPipes('[[isms|ISMS]] outside table')).toBe('[[isms|ISMS]] outside table')
  })

  it('preserves links without alias', () => {
    expect(unescapeWikilinkPipes('[[isms]] and [[bcm]]')).toBe('[[isms]] and [[bcm]]')
  })

  it('handles multiple links in the same cell', () => {
    expect(unescapeWikilinkPipes('| [[a\\|A]], [[b\\|B]] |')).toBe('| [[a|A]], [[b|B]] |')
  })

  it('does not touch fenced code blocks (backtick)', () => {
    const src = '```md\n[[slug\\|alias]]\n```'
    expect(unescapeWikilinkPipes(src)).toBe(src)
  })

  it('does not touch fenced code blocks (tilde)', () => {
    const src = '~~~\n[[slug\\|alias]]\n~~~'
    expect(unescapeWikilinkPipes(src)).toBe(src)
  })

  it('resumes rewriting after the closing code fence', () => {
    const src = '```\n[[skip\\|S]]\n```\n[[rewrite\\|R]]'
    expect(unescapeWikilinkPipes(src)).toBe('```\n[[skip\\|S]]\n```\n[[rewrite|R]]')
  })

  it('does not touch \\| outside [[…]]', () => {
    expect(unescapeWikilinkPipes('a \\| b')).toBe('a \\| b')
  })

  it('does not match across lines', () => {
    expect(unescapeWikilinkPipes('[[a\nb\\|c]]')).toBe('[[a\nb\\|c]]')
  })

  it('is idempotent — running twice produces the same result', () => {
    const once = unescapeWikilinkPipes('| x | [[isms\\|ISMS]] |')
    expect(unescapeWikilinkPipes(once)).toBe(once)
  })

  it('handles realistic imork-normy-prehled row', () => {
    const input =
      '| **ISO/IEC 27005:2022** | Řízení rizik | [[rizeni-rizik\\|Řízení rizik]], [[imork-risk-management]] |'
    const expected =
      '| **ISO/IEC 27005:2022** | Řízení rizik | [[rizeni-rizik|Řízení rizik]], [[imork-risk-management]] |'
    expect(unescapeWikilinkPipes(input)).toBe(expected)
  })

  it('leaves bare text without wikilinks untouched', () => {
    const md = '# Heading\n\nSome paragraph with no links at all.\n'
    expect(unescapeWikilinkPipes(md)).toBe(md)
  })
})
