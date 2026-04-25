import { describe, it, expect } from 'vitest'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  buildWikiSlugIndex,
  parseIndexDescriptions,
  countInboundLinks,
} from '../../modules/wiki-slug-index/build'

function setupContent(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'fpwiki-test-'))
  const contentDir = join(root, 'content')
  for (const [path, body] of Object.entries(files)) {
    const full = join(contentDir, path)
    mkdirSync(full.split(/[\\/]/).slice(0, -1).join('/'), { recursive: true })
    writeFileSync(full, body, 'utf8')
  }
  return root
}

describe('buildWikiSlugIndex', () => {
  it('walks all 4 collections + overview', async () => {
    const root = setupContent({
      'overview.md': '---\ntitle: "Přehled"\n---\n',
      'courses/imek.md': '---\ntitle: "ImeK"\ntype: course\n---\n',
      'topics/anfis.md': '---\ntitle: "ANFIS"\ntype: topic\n---\n',
      'summaries/imek-blok-01.md': '---\ntitle: "ImeK 1"\ntype: summary\n---\n',
      'outputs/imek-vzorce.md': '---\ntitle: "Vzorce"\ntype: output\n---\n',
    })

    const idx = await buildWikiSlugIndex(root)

    expect(idx.entries).toHaveLength(5)
    expect(idx.slugs.imek).toBe('/wiki/imek')
    expect(idx.slugs.anfis).toBe('/wiki/anfis')
    expect(idx.slugs.overview).toBe('/')
    expect(idx.entries.find((e) => e.slug === 'imek')?.collection).toBe('courses')
    expect(idx.entries.find((e) => e.slug === 'anfis')?.collection).toBe('topics')
  })

  it('uses frontmatter title when available', async () => {
    const root = setupContent({
      'topics/foo.md': '---\ntitle: "Pretty Title"\n---\n',
    })
    const idx = await buildWikiSlugIndex(root)
    expect(idx.entries[0]?.title).toBe('Pretty Title')
  })

  it('falls back to slug as title when frontmatter is missing', async () => {
    const root = setupContent({
      'topics/no-fm.md': 'just body\n',
    })
    const idx = await buildWikiSlugIndex(root)
    expect(idx.entries[0]?.title).toBe('no-fm')
  })

  it('only includes overview.md at content root, not in subfolders', async () => {
    const root = setupContent({
      'overview.md': '---\ntitle: "Real"\n---\n',
      'topics/overview.md': '---\ntitle: "Imposter"\n---\n',
    })
    const idx = await buildWikiSlugIndex(root)
    const overviews = idx.entries.filter((e) => e.collection === 'overview')
    expect(overviews).toHaveLength(1)
    expect(overviews[0]?.title).toBe('Real')
  })

  it('returns empty descriptions and inbound maps when corpus is bare', async () => {
    const root = setupContent({
      'topics/foo.md': '---\ntitle: "Foo"\n---\nbody\n',
    })
    const idx = await buildWikiSlugIndex(root)
    expect(idx.descriptions).toEqual({})
    expect(idx.inboundLinks).toEqual({})
    expect(idx.totalLinkCount).toBe(0)
  })

  it('parses _index.md descriptions when present', async () => {
    const root = setupContent({
      'topics/anfis.md': '---\ntitle: "ANFIS"\n---\n',
      'topics/fuzzy-logika.md': '---\ntitle: "Fuzzy"\n---\n',
      '_index.md': `---
title: "Index"
---

## Témata
- [[anfis|ANFIS]] — hybridní neuro-fuzzy systém
- [[fuzzy-logika|Fuzzy logika]] — modelování s vágními pojmy
`,
    })
    const idx = await buildWikiSlugIndex(root)
    expect(idx.descriptions.anfis).toBe('hybridní neuro-fuzzy systém')
    expect(idx.descriptions['fuzzy-logika']).toBe('modelování s vágními pojmy')
  })

  it('counts inbound wikilinks excluding image embeds and self-edges', async () => {
    const root = setupContent({
      'topics/anfis.md': '---\ntitle: "A"\n---\nSee [[fuzzy-logika]]\n',
      'topics/fuzzy-logika.md':
        '---\ntitle: "F"\n---\nSelf [[fuzzy-logika]] and ![[image.png]] but [[anfis]] yes\n',
      'topics/standalone.md': '---\ntitle: "S"\n---\nLinks to [[anfis]] and [[anfis|ANFIS]]\n',
    })
    const idx = await buildWikiSlugIndex(root)
    expect(idx.inboundLinks.anfis).toBe(3)
    expect(idx.inboundLinks['fuzzy-logika']).toBe(1)
    expect(idx.totalLinkCount).toBe(4)
  })
})

describe('parseIndexDescriptions', () => {
  it('strips trailing "N zdrojů" markers', () => {
    const md = `## Kurzy
- [[imek|Matematická ekonomie (ImeK)]] — kalkul, derivace, integrály. 5 zdrojů.
- [[ipmrk|Pokročilé metody]] — fuzzy, NN, GA. 13 zdrojů.
`
    const out = parseIndexDescriptions(md)
    expect(out.imek).toBe('kalkul, derivace, integrály')
    expect(out.ipmrk).toBe('fuzzy, NN, GA')
  })

  it('strips trailing parenthetical "N zdrojů (…)" tails', () => {
    const md =
      '- [[imek|ImeK]] — IS-LM analýza. 5 zdrojů (3 PDF přednášky + sylabus + kniha kap. 2–7).'
    const out = parseIndexDescriptions(md)
    expect(out.imek).toBe('IS-LM analýza')
  })

  it('handles description with embedded em-dashes', () => {
    const md = `- [[anfis|ANFIS]] — hybridní systém — fuzzy + neurony — robustní`
    const out = parseIndexDescriptions(md)
    expect(out.anfis).toBe('hybridní systém — fuzzy + neurony — robustní')
  })

  it('handles bullets without display alias', () => {
    const md = `- [[backpropagation]] — algoritmus učení neuronových sítí`
    const out = parseIndexDescriptions(md)
    expect(out.backpropagation).toBe('algoritmus učení neuronových sítí')
  })

  it('ignores bullets that do not match the catalog format', () => {
    const md = `- random text
- [[no-dash|Title]] without separator
- text - [[slug|Title]] — desc
- [[good|Good]] — kept
`
    const out = parseIndexDescriptions(md)
    expect(out.good).toBe('kept')
    expect(Object.keys(out)).toEqual(['good'])
  })
})

describe('countInboundLinks', () => {
  it('handles fragment links', () => {
    const known = new Set(['anfis'])
    const result = countInboundLinks(
      [{ slug: 'topic', body: 'See [[anfis#vrstvy]] and [[anfis|ANFIS]]' }],
      known,
    )
    expect(result.inboundLinks.anfis).toBe(2)
    expect(result.totalLinkCount).toBe(2)
  })

  it('skips links to unknown slugs', () => {
    const known = new Set(['anfis'])
    const result = countInboundLinks(
      [{ slug: 'topic', body: '[[anfis]] [[unknown]] [[also-unknown]]' }],
      known,
    )
    expect(result.inboundLinks.anfis).toBe(1)
    expect(result.totalLinkCount).toBe(1)
  })
})
