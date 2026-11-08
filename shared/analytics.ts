/**
 * Stable analytics vocabulary. Component identity describes what a link does;
 * placement and layout describe where that component is currently rendered.
 */
export const ANALYTICS_COMPONENTS = {
  siteBrand: 'site_brand',
  primaryNav: 'primary_nav',
  heroActions: 'hero_actions',
  breadcrumbs: 'breadcrumbs',
  subjectList: 'subject_list',
  subjectLabels: 'subject_labels',
  tags: 'tags',
  courseTopics: 'course_topics',
  articleLinks: 'article_links',
  courseCards: 'course_cards',
  recentUpdates: 'recent_updates',
  tableOfContents: 'table_of_contents',
  backlinks: 'backlinks',
  relatedTopics: 'related_topics',
  searchResults: 'search_results',
  footerLinks: 'footer_links',
  projectLinks: 'project_links',
  studyPlanNavigation: 'study_plan_navigation',
} as const

export type AnalyticsComponentId = (typeof ANALYTICS_COMPONENTS)[keyof typeof ANALYTICS_COMPONENTS]

export const ANALYTICS_PLACEMENTS = {
  siteHeader: 'site_header',
  leftSidebar: 'left_sidebar',
  rightSidebar: 'right_sidebar',
  pageHeader: 'page_header',
  article: 'article',
  footer: 'footer',
  search: 'search',
} as const

export type AnalyticsPlacement = (typeof ANALYTICS_PLACEMENTS)[keyof typeof ANALYTICS_PLACEMENTS]

export const ANALYTICS_LAYOUTS = {
  inline: 'inline',
  desktopSidebar: 'desktop_sidebar',
  mobileDrawer: 'mobile_drawer',
} as const

export type AnalyticsLayout = (typeof ANALYTICS_LAYOUTS)[keyof typeof ANALYTICS_LAYOUTS]

export type AnalyticsPageType =
  | 'home'
  | 'courses'
  | 'tags'
  | 'tag'
  | 'recent'
  | 'about'
  | 'course'
  | 'topic'
  | 'summary'
  | 'output'
  | 'not_found'

export interface AnalyticsPageContext {
  pagePath: string
  pageType: AnalyticsPageType
  courseGroup: string
  pageTitle: string
}

export interface AnalyticsLinkTarget {
  linkId: string
  targetKind: 'page' | 'section' | 'external'
  targetPath?: string
  targetSection?: string
  targetDomain?: 'github.com'
}

const PUBLIC_PATHS = new Set([
  '/',
  '/courses',
  '/tags',
  '/recent',
  '/about/jak-vznika-obsah',
  '/about/soukromi',
])
const PAGE_PATH_PATTERN = /^\/wiki\/[a-z0-9-]{1,100}$/
const TAG_PATH_PATTERN = /^\/tag\/[a-zA-Z0-9._~%-]{1,180}$/
const COURSE_SLUG_PATTERN = /^[a-z0-9-]{1,50}$/
const SECTION_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}_-]{0,99}$/u
const KNOWN_ACQUISITION_ORIGINS = new Set([
  'https://www.google.com',
  'https://www.google.cz',
  'https://www.bing.com',
  'https://search.seznam.cz',
  'https://www.seznam.cz',
  'https://www.facebook.com',
  'https://m.facebook.com',
  'https://l.facebook.com',
  'https://lm.facebook.com',
])

function stableHash(value: string): string {
  let hash = 2166136261
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

function boundedLinkId(prefix: string, value: string): string {
  const readable = `${prefix}:${value}`
  return readable.length <= 100 ? readable : `${prefix}:hash_${stableHash(value)}`
}

export function sanitizePublicPath(value: string): string | null {
  let path: string
  try {
    path = new URL(value, 'https://fpwiki.cz').pathname
  } catch {
    return null
  }
  if (PUBLIC_PATHS.has(path) || PAGE_PATH_PATTERN.test(path) || TAG_PATH_PATTERN.test(path)) {
    return path
  }
  return null
}

/** Dynamic wiki and tag paths are trackable only after their content query succeeds. */
export function isTrackableAnalyticsPath(value: string, verifiedDynamic = false): boolean {
  const path = sanitizePublicPath(value)
  if (!path) return false
  if (PUBLIC_PATHS.has(path)) return true
  return verifiedDynamic && (PAGE_PATH_PATTERN.test(path) || TAG_PATH_PATTERN.test(path))
}

export function courseGroupFor(courses: readonly string[]): string {
  const valid = [...new Set(courses.filter((course) => COURSE_SLUG_PATTERN.test(course)))]
  if (valid.length === 0) return 'unassigned'
  if (valid.length > 1) return 'shared'
  return valid[0] ?? 'unassigned'
}

export function pageTypeForPath(path: string): AnalyticsPageType {
  if (path === '/') return 'home'
  if (path === '/courses') return 'courses'
  if (path === '/tags') return 'tags'
  if (path.startsWith('/tag/')) return 'tag'
  if (path === '/recent') return 'recent'
  if (path.startsWith('/about/')) return 'about'
  if (path.startsWith('/wiki/')) return 'topic'
  return 'not_found'
}

const EXTERNAL_LINKS = new Map<string, string>([
  ['https://github.com/ondrahracek/fpwiki', 'github_repository'],
  ['https://github.com/ondrahracek/fpwiki/issues/new', 'github_new_issue'],
])

export function analyticsTarget(
  href: string,
  siteOrigin: string,
  sourcePath: string,
): AnalyticsLinkTarget | null {
  let url: URL
  try {
    url = new URL(href, siteOrigin)
  } catch {
    return null
  }

  if (url.origin === siteOrigin) {
    const targetPath = sanitizePublicPath(url.pathname)
    if (!targetPath) return null
    const rawSection = url.hash.slice(1)
    let section = ''
    try {
      section = decodeURIComponent(rawSection)
    } catch {
      return null
    }
    if (section) {
      if (!SECTION_PATTERN.test(section)) {
        return targetPath === sourcePath
          ? null
          : { linkId: boundedLinkId('page', targetPath), targetKind: 'page', targetPath }
      }
      return {
        linkId: boundedLinkId('section', `${targetPath}#${section}`),
        targetKind: 'section',
        targetPath,
        targetSection: section,
      }
    }
    return { linkId: boundedLinkId('page', targetPath), targetKind: 'page', targetPath }
  }

  const normalized = `${url.origin}${url.pathname.replace(/\/$/, '')}`
  const externalId = EXTERNAL_LINKS.get(normalized)
  if (!externalId || url.hostname !== 'github.com') return null
  return {
    linkId: `external:${externalId}`,
    targetKind: 'external',
    targetDomain: 'github.com',
  }
}

export function sanitizePageTitle(value: string): string {
  return [...value]
    .map((character) => {
      const code = character.charCodeAt(0)
      return code < 32 || code === 127 ? ' ' : character
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150)
}

export function sanitizeReferrer(value: string, siteOrigin: string): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    if (url.origin === siteOrigin) {
      const path = sanitizePublicPath(url.pathname)
      return path && isTrackableAnalyticsPath(path) ? `${siteOrigin}${path}` : siteOrigin
    }
    return KNOWN_ACQUISITION_ORIGINS.has(url.origin) ? url.origin : undefined
  } catch {
    return undefined
  }
}
