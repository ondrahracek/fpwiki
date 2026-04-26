import { describe, it, expect } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import type { Root, Blockquote, Paragraph, Text, InlineMath, Html } from 'mdast'
import { transformCallouts } from '../../modules/remark-callouts/build'

/**
 * Parse markdown -> mdast tree. Math-aware (remark-math) so we can verify
 * that inline math nodes survive the callout transform unchanged.
 */
function parse(md: string): Root {
  return unified().use(remarkParse).use(remarkMath).parse(md) as Root
}

function firstBlockquote(tree: Root): Blockquote {
  const bq = tree.children.find((c) => c.type === 'blockquote')
  if (!bq) throw new Error('no blockquote in tree')
  return bq as Blockquote
}

describe('transformCallouts — basic cases', () => {
  it('transforms a simple [!info] Title with body', () => {
    const tree = parse('> [!info] Title\n> body text\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    expect(bq.data?.hName).toBe('aside')
    const props = bq.data?.hProperties as Record<string, unknown>
    expect(props.className).toEqual(['callout', 'callout-info'])
    expect(props['data-callout']).toBe('info')

    const titlePara = bq.children[0] as Paragraph
    expect(titlePara.type).toBe('paragraph')
    expect((titlePara.data?.hProperties as Record<string, unknown>).className).toEqual([
      'callout-title',
    ])
    // Title children: [iconHtml, text "Title"]
    expect(titlePara.children[0]?.type).toBe('html')
    expect((titlePara.children[0] as Html).value).toContain('iconify i-lucide:info')
    expect(titlePara.children[1]?.type).toBe('text')
    expect((titlePara.children[1] as Text).value).toBe('Title')
  })

  it('uses default Czech title when none is provided', () => {
    const tree = parse('> [!info]\n> body\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const titlePara = bq.children[0] as Paragraph
    // Children: [iconHtml, text "Poznámka"]
    expect((titlePara.children[1] as Text).value).toBe('Poznámka')
  })

  it('preserves inline math in title', () => {
    const tree = parse('> [!tip] Postup: jak spočítat $E$ v bodě\n> body\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const titlePara = bq.children[0] as Paragraph
    // Skip the html icon at index 0; subsequent children should include
    // text "Postup: jak spočítat ", inlineMath E, text " v bodě".
    const inlineMath = titlePara.children.find((c) => c.type === 'inlineMath') as
      | InlineMath
      | undefined
    expect(inlineMath).toBeDefined()
    expect(inlineMath!.value).toBe('E')
  })

  it('preserves emphasis/strong in title', () => {
    const tree = parse('> [!warning] **Pozor** — _důležité_\n> body\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const titlePara = bq.children[0] as Paragraph
    expect(titlePara.children.some((c) => c.type === 'strong')).toBe(true)
    expect(titlePara.children.some((c) => c.type === 'emphasis')).toBe(true)
  })
})

describe('transformCallouts — types, aliases, and unknown', () => {
  it.each([
    ['info', 'callout-info'],
    ['warning', 'callout-warning'],
    ['tip', 'callout-tip'],
    ['example', 'callout-example'],
    ['abstract', 'callout-abstract'],
    ['note', 'callout-note'],
  ])('emits the right class for [!%s]', (type, expectedClass) => {
    const tree = parse(`> [!${type}] Title\n> body\n`)
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const props = bq.data?.hProperties as Record<string, unknown>
    expect((props.className as string[])[1]).toBe(expectedClass)
  })

  it.each([
    ['summary', 'callout-abstract'],
    ['hint', 'callout-tip'],
    ['important', 'callout-warning'],
    ['todo', 'callout-note'],
    ['cite', 'callout-quote'],
  ])('canonicalizes alias [!%s] to %s', (alias, canonicalClass) => {
    const tree = parse(`> [!${alias}] Title\n> body\n`)
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const props = bq.data?.hProperties as Record<string, unknown>
    expect((props.className as string[])[1]).toBe(canonicalClass)
    // data-callout retains the raw form for CSS authors who want it.
    expect(props['data-callout']).toBe(alias)
  })

  it('unknown type falls back to callout-default with default icon', () => {
    const tree = parse('> [!quokka] Hello\n> body\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const props = bq.data?.hProperties as Record<string, unknown>
    expect((props.className as string[])[1]).toBe('callout-default')
    const titlePara = bq.children[0] as Paragraph
    expect((titlePara.children[0] as Html).value).toContain('iconify i-lucide:info')
    expect((titlePara.children[1] as Text).value).toBe('Hello')
  })

  it('case-insensitive type matching', () => {
    const tree = parse('> [!INFO] Title\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const props = bq.data?.hProperties as Record<string, unknown>
    expect((props.className as string[])[1]).toBe('callout-info')
  })
})

describe('transformCallouts — body content preservation', () => {
  it('preserves multi-paragraph body', () => {
    const tree = parse('> [!info] Title\n>\n> First.\n>\n> Second.\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    // children: [titlePara, para "First.", para "Second."]
    expect(bq.children).toHaveLength(3)
    expect((bq.children[1] as Paragraph).children[0]?.type).toBe('text')
    expect(((bq.children[1] as Paragraph).children[0] as Text).value).toBe('First.')
  })

  it('preserves a list inside callout body', () => {
    const tree = parse('> [!tip] Title\n>\n> - one\n> - two\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    expect(bq.children.find((c) => c.type === 'list')).toBeDefined()
  })

  it('keeps wiki-link target text in body (we do not parse [[...]], remark-wiki-link will)', () => {
    // remark-wiki-link is not in the test pipeline, so [[anfis]] stays as text.
    // Our plugin must not corrupt that text.
    const tree = parse('> [!info] Title\n> See [[anfis]] for details.\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    // Body paragraph (after title) should contain the literal "[[anfis]]" text.
    const bodyPara = bq.children[1] as Paragraph
    const concatenated = bodyPara.children
      .filter((c) => c.type === 'text')
      .map((c) => (c as Text).value)
      .join('')
    expect(concatenated).toContain('[[anfis]]')
  })
})

describe('transformCallouts — fold markers', () => {
  it('emits data-callout-fold=open for `+`', () => {
    const tree = parse('> [!info]+ Title\n> body\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const props = bq.data?.hProperties as Record<string, unknown>
    expect(props['data-callout-fold']).toBe('open')
  })

  it('emits data-callout-fold=closed for `-`', () => {
    const tree = parse('> [!info]- Title\n> body\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const props = bq.data?.hProperties as Record<string, unknown>
    expect(props['data-callout-fold']).toBe('closed')
  })

  it('omits fold attribute when no marker', () => {
    const tree = parse('> [!info] Title\n> body\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const props = bq.data?.hProperties as Record<string, unknown>
    expect(props['data-callout-fold']).toBeUndefined()
  })
})

describe('transformCallouts — non-callout safety', () => {
  it('leaves a regular blockquote alone', () => {
    const tree = parse('> Just a quote.\n> Another line.\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    expect(bq.data?.hName).toBeUndefined()
    expect(bq.data?.hProperties).toBeUndefined()
  })

  it('leaves a blockquote whose first node is not text alone', () => {
    const tree = parse('> **bold** start\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    expect(bq.data?.hName).toBeUndefined()
  })

  it('is idempotent — running twice yields the same result as running once', () => {
    const tree = parse('> [!info] Title\n> body\n')
    transformCallouts(tree)
    const before = JSON.stringify(tree)
    transformCallouts(tree)
    const after = JSON.stringify(tree)
    expect(after).toBe(before)
  })

  it('handles nested blockquote callouts', () => {
    const tree = parse('> [!info] Outer\n>\n> > [!warning] Inner\n> > inner body\n')
    transformCallouts(tree)
    const outer = firstBlockquote(tree)
    expect((outer.data?.hProperties as Record<string, unknown>).className).toEqual([
      'callout',
      'callout-info',
    ])
    // The inner blockquote should be inside the outer's children.
    const inner = outer.children.find((c) => c.type === 'blockquote') as Blockquote | undefined
    expect(inner).toBeDefined()
    expect((inner!.data?.hProperties as Record<string, unknown>).className).toEqual([
      'callout',
      'callout-warning',
    ])
  })
})

describe('transformCallouts — Czech UTF-8', () => {
  it('preserves Czech diacritics in the title', () => {
    const tree = parse('> [!example] Příklad 6.5 — MRCS pro Cobb-Douglase\n> tělo\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const titlePara = bq.children[0] as Paragraph
    const titleText = titlePara.children
      .filter((c) => c.type === 'text')
      .map((c) => (c as Text).value)
      .join('')
    expect(titleText).toContain('Příklad 6.5 — MRCS pro Cobb-Douglase')
  })

  it('preserves Czech diacritics in default title fallback', () => {
    const tree = parse('> [!warning]\n> tělo\n')
    transformCallouts(tree)
    const bq = firstBlockquote(tree)
    const titlePara = bq.children[0] as Paragraph
    const titleText = (titlePara.children[1] as Text).value
    expect(titleText).toBe('Pozor')
  })
})

describe('transformCallouts — options', () => {
  it('respects custom defaultTitles override', () => {
    const tree = parse('> [!info]\n> body\n')
    transformCallouts(tree, { defaultTitles: { info: 'INFO!' } })
    const bq = firstBlockquote(tree)
    const titlePara = bq.children[0] as Paragraph
    expect((titlePara.children[1] as Text).value).toBe('INFO!')
  })

  it('respects custom icons override', () => {
    const tree = parse('> [!info] Title\n> body\n')
    transformCallouts(tree, { icons: { info: 'i-custom:foo' } })
    const bq = firstBlockquote(tree)
    const titlePara = bq.children[0] as Paragraph
    expect((titlePara.children[0] as Html).value).toContain('iconify i-custom:foo')
  })
})
