import { describe, it, expect } from 'vitest'
import { expandSingleLineMath } from '../../modules/math-display-fix/build'

describe('expandSingleLineMath', () => {
  it('expands single-line $$content$$ to three lines', () => {
    expect(expandSingleLineMath('$$E = mc^2$$')).toBe('$$\nE = mc^2\n$$')
  })

  it('preserves leading whitespace (list-item indentation)', () => {
    expect(expandSingleLineMath('  $$x + y = z$$')).toBe('  $$\n  x + y = z\n  $$')
  })

  it('expands $$...\\tag{n}...$$ — the primary broken case', () => {
    expect(expandSingleLineMath('$$E^A = -\\frac{P}{Q}. \\tag{4.2}$$')).toBe(
      '$$\nE^A = -\\frac{P}{Q}. \\tag{4.2}\n$$',
    )
  })

  it('leaves already-multi-line math untouched', () => {
    const ml = '$$\nE = mc^2\n$$'
    expect(expandSingleLineMath(ml)).toBe(ml)
  })

  it('leaves standalone $$ fence line untouched', () => {
    expect(expandSingleLineMath('$$')).toBe('$$')
  })

  it('is idempotent — running twice produces the same result', () => {
    const once = expandSingleLineMath('$$E = mc^2$$')
    expect(expandSingleLineMath(once)).toBe(once)
  })

  it('leaves inline $...$ expressions untouched', () => {
    const md = 'The value $E = mc^2$ is well-known.'
    expect(expandSingleLineMath(md)).toBe(md)
  })

  it('skips $$ inside a backtick-fenced code block', () => {
    const md = '```\n$$x = 1$$\n```'
    expect(expandSingleLineMath(md)).toBe(md)
  })

  it('skips $$ inside a tilde-fenced code block', () => {
    const md = '~~~\n$$x = 1$$\n~~~'
    expect(expandSingleLineMath(md)).toBe(md)
  })

  it('resumes expanding after the closing code fence', () => {
    const md = '```\n$$skip$$\n```\n$$expand$$'
    expect(expandSingleLineMath(md)).toBe('```\n$$skip$$\n```\n$$\nexpand\n$$')
  })

  it('handles multiple single-line equations in one document', () => {
    const md = '$$a$$\ntext\n$$b + c$$'
    expect(expandSingleLineMath(md)).toBe('$$\na\n$$\ntext\n$$\nb + c\n$$')
  })

  it('handles a realistic elasticita equation', () => {
    const input =
      '$$\\boxed{\\;E = E(P) = -\\frac{P}{Q}\\cdot \\frac{\\mathrm{d}Q}{\\mathrm{d}P}\\;} \\tag{4.5}$$'
    const out = expandSingleLineMath(input)
    expect(out.startsWith('$$\n')).toBe(true)
    expect(out.endsWith('\n$$')).toBe(true)
    expect(out.includes('\\tag{4.5}')).toBe(true)
  })
})
