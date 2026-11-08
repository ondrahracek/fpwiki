import {
  analyticsTarget,
  courseGroupFor,
  isTrackableAnalyticsPath,
  sanitizePageTitle,
  sanitizePublicPath,
  sanitizeReferrer,
} from '../../shared/analytics'
import { wikiUrl } from '../../shared/wiki-routes'

describe('analytics public-data boundaries', () => {
  it('removes queries and fragments while rejecting non-public routes', () => {
    expect(sanitizePublicPath('/wiki/anfis?query=secret#part')).toBe('/wiki/anfis')
    expect(sanitizePublicPath('/admin/private?token=secret')).toBeNull()
  })

  it('requires content verification before tracking dynamic source paths', () => {
    expect(isTrackableAnalyticsPath('/courses')).toBe(true)
    expect(isTrackableAnalyticsPath('/tag/ana%40example.com')).toBe(false)
    expect(isTrackableAnalyticsPath('/wiki/lowercase-private-slug')).toBe(false)
    expect(isTrackableAnalyticsPath('/tag/ekonomie', true)).toBe(true)
    expect(isTrackableAnalyticsPath('/wiki/elasticita', true)).toBe(true)
  })

  it('keeps shared and missing course attribution explicit', () => {
    expect(courseGroupFor(['imek'])).toBe('imek')
    expect(courseGroupFor(['imek', 'imork'])).toBe('shared')
    expect(courseGroupFor([])).toBe('unassigned')
    expect(courseGroupFor(['NOT VALID'])).toBe('unassigned')
  })

  it('does not conflate distinct targets and keeps stable IDs below GA limits', () => {
    const course = analyticsTarget('/courses?query=secret', 'https://fpwiki.cz', '/')
    const topic = analyticsTarget('/wiki/anfis', 'https://fpwiki.cz', '/')
    expect(course).toMatchObject({ linkId: 'page:/courses', targetPath: '/courses' })
    expect(topic).toMatchObject({ linkId: 'page:/wiki/anfis', targetPath: '/wiki/anfis' })
    expect(course?.linkId).not.toBe(topic?.linkId)
    expect(course?.linkId.length).toBeLessThanOrEqual(100)
    const longTag = analyticsTarget(wikiUrl.tag('a'.repeat(150)), 'https://fpwiki.cz', '/')
    expect(longTag?.linkId.length).toBeLessThanOrEqual(100)
  })

  it('allows approved same-page sections and fixed external actions only', () => {
    expect(analyticsTarget('#metoda', 'https://fpwiki.cz', '/')).toMatchObject({
      linkId: 'section:/#metoda',
      targetKind: 'section',
      targetSection: 'metoda',
    })
    expect(
      analyticsTarget('https://github.com/ondrahracek/fpwiki?secret=yes', 'https://fpwiki.cz', '/'),
    ).toMatchObject({ linkId: 'external:github_repository', targetDomain: 'github.com' })
    expect(
      analyticsTarget('https://example.com/private?q=secret', 'https://fpwiki.cz', '/'),
    ).toBeNull()
  })

  it('downgrades an unapproved Czech cross-page heading to its public page', () => {
    expect(
      analyticsTarget(
        '/wiki/poptavka-nabidka#Intuice: proč se křivky protínají?',
        'https://fpwiki.cz',
        '/wiki/elasticita',
      ),
    ).toEqual({
      linkId: 'page:/wiki/poptavka-nabidka',
      targetKind: 'page',
      targetPath: '/wiki/poptavka-nabidka',
    })
  })

  it('sanitizes titles and referrers without carrying queries', () => {
    expect(sanitizePageTitle('  A\n title\u0000  ')).toBe('A title')
    expect(sanitizeReferrer('https://fpwiki.cz/wiki/anfis?q=secret#x', 'https://fpwiki.cz')).toBe(
      'https://fpwiki.cz',
    )
    expect(sanitizeReferrer('https://search.example/results?q=secret', 'https://fpwiki.cz')).toBe(
      undefined,
    )
    expect(sanitizeReferrer('https://www.google.cz/search?q=secret', 'https://fpwiki.cz')).toBe(
      'https://www.google.cz',
    )
    expect(
      sanitizeReferrer('https://alice-secret.example/private?token=qa', 'https://fpwiki.cz'),
    ).toBeUndefined()
    expect(sanitizeReferrer('https://fpwiki.cz/tag/ana%40example.com', 'https://fpwiki.cz')).toBe(
      'https://fpwiki.cz',
    )
  })
})
