// @vitest-environment nuxt
// related.ts uses #shared / ~ aliases (it's app code, not stand-alone), so
// this test runs in the Nuxt vitest env where those aliases resolve.
import { describe, it, expect } from 'vitest'
import { deriveRelated } from '../../app/utils/related'
import type { WikiCollectionName } from '../../shared/types/wiki'

const topics = (...items: Array<Parameters<typeof deriveRelated>[1][number]>) => items

function topic(opts: {
  stem: string
  title: string
  course: string | string[]
  tags: string[]
  collection?: WikiCollectionName
}) {
  return {
    stem: `topics/${opts.stem}`,
    path: `/topics/${opts.stem}`,
    title: opts.title,
    course: opts.course,
    tags: opts.tags,
    collection: opts.collection ?? ('topics' as WikiCollectionName),
  }
}

describe('deriveRelated', () => {
  it('returns related items sharing course + ≥2 tags', () => {
    const current = {
      stem: 'topics/elasticita',
      course: 'imek',
      tags: ['imek', 'elasticita', 'cenova-elasticita'],
    }
    const out = deriveRelated(
      current,
      topics(
        topic({
          stem: 'poptavka-nabidka',
          title: 'Poptávka',
          course: 'imek',
          tags: ['imek', 'elasticita', 'jiny'],
        }),
        topic({
          stem: 'mr-tr',
          title: 'MR/TR',
          course: 'imek',
          tags: ['imek', 'cenova-elasticita'],
        }),
      ),
    )
    expect(out.map((r) => r.slug)).toContain('poptavka-nabidka')
    expect(out.map((r) => r.slug)).toContain('mr-tr')
  })

  it('excludes self by stem', () => {
    const current = { stem: 'topics/elasticita', course: 'imek', tags: ['a', 'b', 'c'] }
    const out = deriveRelated(
      current,
      topics(topic({ stem: 'elasticita', title: 'Self', course: 'imek', tags: ['a', 'b'] })),
    )
    expect(out).toEqual([])
  })

  it('skips candidates without course overlap', () => {
    const current = { stem: 'topics/elasticita', course: 'imek', tags: ['a', 'b'] }
    const out = deriveRelated(
      current,
      topics(topic({ stem: 'fuzzy-logika', title: 'Fuzzy', course: 'ipmrk', tags: ['a', 'b'] })),
    )
    expect(out).toEqual([])
  })

  it('skips candidates with fewer than 2 shared tags', () => {
    const current = { stem: 'topics/elasticita', course: 'imek', tags: ['a', 'b', 'c'] }
    const out = deriveRelated(
      current,
      topics(topic({ stem: 'lone', title: 'Lone', course: 'imek', tags: ['a'] })),
    )
    expect(out).toEqual([])
  })

  it('sorts by shared-tag count desc then title asc; caps at 5', () => {
    const current = { stem: 'topics/x', course: 'imek', tags: ['a', 'b', 'c', 'd'] }
    const out = deriveRelated(
      current,
      topics(
        topic({ stem: 'p1', title: 'B', course: 'imek', tags: ['a', 'b'] }),
        topic({ stem: 'p2', title: 'A', course: 'imek', tags: ['a', 'b'] }),
        topic({ stem: 'p3', title: 'C', course: 'imek', tags: ['a', 'b', 'c'] }),
        topic({ stem: 'p4', title: 'D', course: 'imek', tags: ['a', 'b'] }),
        topic({ stem: 'p5', title: 'E', course: 'imek', tags: ['a', 'b'] }),
        topic({ stem: 'p6', title: 'F', course: 'imek', tags: ['a', 'b'] }),
      ),
    )
    expect(out).toHaveLength(5)
    expect(out[0]?.slug).toBe('p3') // most shared tags first
    expect(out[1]?.title).toBe('A') // then by Czech-collated title
  })

  it('returns empty when current has no course or no tags', () => {
    expect(
      deriveRelated({ stem: 'a', course: undefined, tags: ['a', 'b'] }, [
        topic({ stem: 'b', title: 'B', course: 'imek', tags: ['a', 'b'] }),
      ]),
    ).toEqual([])
    expect(
      deriveRelated({ stem: 'a', course: 'imek', tags: [] }, [
        topic({ stem: 'b', title: 'B', course: 'imek', tags: ['a', 'b'] }),
      ]),
    ).toEqual([])
  })
})
