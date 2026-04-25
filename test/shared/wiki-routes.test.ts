import { describe, it, expect } from 'vitest'
import { wikiUrl, slugFromPath, pathFor } from '../../shared/wiki-routes'

describe('wikiUrl', () => {
  it('home() → /', () => {
    expect(wikiUrl.home()).toBe('/')
  })

  it('courses() → /courses', () => {
    expect(wikiUrl.courses()).toBe('/courses')
  })

  it('page() builds /wiki/<slug>', () => {
    expect(wikiUrl.page('imek')).toBe('/wiki/imek')
    expect(wikiUrl.page('anfis')).toBe('/wiki/anfis')
  })

  it('page("overview") collapses to root', () => {
    expect(wikiUrl.page('overview')).toBe('/')
  })

  it('tag() URL-encodes special chars', () => {
    expect(wikiUrl.tag('ekonomie')).toBe('/tag/ekonomie')
    expect(wikiUrl.tag('a/b')).toBe('/tag/a%2Fb')
    expect(wikiUrl.tag('finance management')).toBe('/tag/finance%20management')
  })

  it('asset() prepends /wiki-assets/', () => {
    expect(wikiUrl.asset('foo.jpg')).toBe('/wiki-assets/foo.jpg')
    expect(wikiUrl.asset('subdir/bar.png')).toBe('/wiki-assets/subdir/bar.png')
  })

  it('ogImage() returns the canonical PNG path', () => {
    expect(wikiUrl.ogImage()).toBe('/images/og.png')
  })

  describe('absolute()', () => {
    it('returns path unchanged when origin is empty', () => {
      expect(wikiUrl.absolute('', '/wiki/imek')).toBe('/wiki/imek')
      expect(wikiUrl.absolute('', '/')).toBe('/')
    })

    it('joins origin and absolute path', () => {
      expect(wikiUrl.absolute('https://fpwiki.cz', '/wiki/imek')).toBe(
        'https://fpwiki.cz/wiki/imek',
      )
    })

    it('strips a trailing slash from origin', () => {
      expect(wikiUrl.absolute('https://fpwiki.cz/', '/wiki/imek')).toBe(
        'https://fpwiki.cz/wiki/imek',
      )
    })

    it('inserts a leading slash on path when missing', () => {
      expect(wikiUrl.absolute('https://fpwiki.cz', 'wiki/imek')).toBe('https://fpwiki.cz/wiki/imek')
    })

    it('handles root path', () => {
      expect(wikiUrl.absolute('https://fpwiki.cz', '/')).toBe('https://fpwiki.cz/')
    })
  })
})

describe('slugFromPath', () => {
  it('extracts last segment from a /-prefixed content path', () => {
    expect(slugFromPath('/courses/imek')).toBe('imek')
    expect(slugFromPath('/topics/anfis')).toBe('anfis')
  })

  it('strips .md / .mdx extension from a filesystem path', () => {
    expect(slugFromPath('courses/imek.md')).toBe('imek')
    expect(slugFromPath('topics/anfis.mdx')).toBe('anfis')
  })

  it('returns bare slug as-is', () => {
    expect(slugFromPath('imek')).toBe('imek')
  })

  it('handles trailing slash', () => {
    expect(slugFromPath('/courses/imek/')).toBe('imek')
  })

  it('drops fragment before extracting slug', () => {
    expect(slugFromPath('/topics/anfis#usage')).toBe('anfis')
    expect(slugFromPath('/topics/anfis#some-deep-heading')).toBe('anfis')
  })

  it('returns empty string for empty/null/undefined', () => {
    expect(slugFromPath('')).toBe('')
    expect(slugFromPath(null)).toBe('')
    expect(slugFromPath(undefined)).toBe('')
  })
})

describe('pathFor', () => {
  it('builds /wiki/<slug> from a @nuxt/content path', () => {
    expect(pathFor({ path: '/topics/anfis' })).toBe('/wiki/anfis')
    expect(pathFor({ path: '/courses/imek' })).toBe('/wiki/imek')
  })

  it('preserves heading anchor', () => {
    expect(pathFor({ path: '/topics/anfis', heading: 'usage' })).toBe('/wiki/anfis#usage')
  })

  it('parses heading from path-with-fragment', () => {
    expect(pathFor({ path: '/topics/anfis#deep' })).toBe('/wiki/anfis#deep')
  })

  it('explicit heading prop wins over fragment in path', () => {
    expect(pathFor({ path: '/topics/anfis#fragment', heading: 'override' })).toBe(
      '/wiki/anfis#override',
    )
  })

  it('overview collapses to root', () => {
    expect(pathFor({ collection: 'overview' })).toBe('/')
    expect(pathFor({ path: '/overview' })).toBe('/')
    expect(pathFor({ stem: 'overview' })).toBe('/')
  })

  it('falls back through path → filePath → stem', () => {
    expect(pathFor({ filePath: 'courses/imek.md' })).toBe('/wiki/imek')
    expect(pathFor({ stem: 'imek' })).toBe('/wiki/imek')
  })

  it('isEmbed routes to /wiki-assets/', () => {
    expect(pathFor({ filePath: 'derivace.jpeg', isEmbed: true })).toBe('/wiki-assets/derivace.jpeg')
  })

  it('isEmbed without filePath does not crash and falls back to wiki page', () => {
    expect(pathFor({ isEmbed: true, path: '/topics/anfis' })).toBe('/wiki/anfis')
  })

  it('empty input → /wiki/ (graceful)', () => {
    expect(pathFor({})).toBe('/wiki/')
  })
})
