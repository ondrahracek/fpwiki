import { describe, it, expect } from 'vitest'
import { extractBacklinks } from '../../modules/wiki-slug-index/build'
import type { WikiSlugIndexEntry } from '../../shared/types/wiki'
import { wikiUrl } from '../../shared/wiki-routes'

function entry(slug: string, title = slug): WikiSlugIndexEntry {
  return { slug, path: wikiUrl.page(slug), title, type: 'topic', collection: 'topics' }
}

describe('extractBacklinks', () => {
  it('returns refs grouped by target with source slug + title + path', () => {
    const entries = [entry('anfis', 'ANFIS'), entry('fuzzy-logika', 'Fuzzy logika')]
    const bodies = [
      { slug: 'fuzzy-logika', body: 'Viz [[anfis]] pro detail.' },
      { slug: 'anfis', body: 'Viz [[fuzzy-logika]] pro úvod.' },
    ]
    const out = extractBacklinks(bodies, entries)

    expect(out.byTarget.anfis).toHaveLength(1)
    expect(out.byTarget.anfis?.[0]).toMatchObject({
      slug: 'fuzzy-logika',
      title: 'Fuzzy logika',
      path: wikiUrl.page('fuzzy-logika'),
    })
    expect(out.byTarget['fuzzy-logika']).toHaveLength(1)
  })

  it('wraps the matched term in <<…>> markers and surfaces context', () => {
    const entries = [entry('elasticita')]
    const bodies = [
      {
        slug: 'optimalizace-spotrebitele',
        body: 'Cenová [[elasticita]] poptávky popisuje citlivost množství.',
      },
    ]
    const ref = extractBacklinks(bodies, entries).byTarget.elasticita?.[0]
    expect(ref?.snippet).toContain('<<elasticita>>')
    expect(ref?.snippet).toContain('Cenová')
    expect(ref?.snippet).toContain('poptávky')
  })

  it('strips OTHER wikilinks from the snippet, keeping their alias text', () => {
    const entries = [entry('anfis'), entry('fuzzy-logika', 'Fuzzy')]
    const bodies = [
      {
        slug: 'datamining',
        body: 'Vědecký koktejl [[fuzzy-logika|fuzzy přístupů]] a [[anfis]] modelů.',
      },
    ]
    const out = extractBacklinks(bodies, entries)
    const anfisSnip = out.byTarget.anfis?.[0]?.snippet ?? ''
    expect(anfisSnip).toContain('fuzzy přístupů')
    expect(anfisSnip).not.toContain('[[')
    expect(anfisSnip).not.toContain(']]')
  })

  it('excludes self-edges and unknown targets', () => {
    const entries = [entry('anfis')]
    const bodies = [{ slug: 'anfis', body: 'Self [[anfis]] reference and [[unknown-slug]] too.' }]
    const out = extractBacklinks(bodies, entries)
    expect(out.byTarget).toEqual({})
  })

  it('dedupes multiple links from the same source (first match wins)', () => {
    const entries = [entry('anfis')]
    const bodies = [{ slug: 'src', body: 'První [[anfis]] a později [[anfis|jiný název]].' }]
    const out = extractBacklinks(bodies, entries)
    expect(out.byTarget.anfis).toHaveLength(1)
    expect(out.byTarget.anfis?.[0]?.snippet).toContain('První')
  })

  it('caps backlinks per target at 8 and orders by source slug', () => {
    const entries = [entry('anfis')]
    const bodies = Array.from({ length: 12 }, (_, i) => ({
      slug: `src-${String(i).padStart(2, '0')}`,
      body: `Body referencing [[anfis]].`,
    }))
    const refs = extractBacklinks(bodies, entries).byTarget.anfis ?? []
    expect(refs).toHaveLength(8)
    expect(refs.map((r) => r.slug)).toEqual([
      'src-00',
      'src-01',
      'src-02',
      'src-03',
      'src-04',
      'src-05',
      'src-06',
      'src-07',
    ])
  })

  it('ignores image embeds (![[…]])', () => {
    const entries = [entry('anfis')]
    const bodies = [{ slug: 'src', body: 'See ![[anfis-diagram.png]] only.' }]
    const out = extractBacklinks(bodies, entries)
    expect(out.byTarget).toEqual({})
  })

  it('produces NFC-normalized snippets', () => {
    const entries = [entry('elasticita')]
    // Decomposed "á" (a + combining acute) on either side of the match.
    const decomposed = 'Právě [[elasticita]] poptávky.'
    const ref = extractBacklinks([{ slug: 'src', body: decomposed }], entries).byTarget
      .elasticita?.[0]
    expect(ref?.snippet).toBe(ref?.snippet?.normalize('NFC'))
  })
})
