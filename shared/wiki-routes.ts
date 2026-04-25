/**
 * SINGLE SOURCE OF TRUTH for every URL the web app constructs.
 *
 * Do NOT inline `/wiki/...`, `/tag/...`, or `/wiki-assets/...` template
 * literals anywhere else. A CI lint test (test/shared/wiki-routes.lint.test.ts)
 * grep-asserts that no source file outside this one constructs those URLs by
 * hand.
 *
 * Lives under shared/ so both build-time (Nuxt module, validators) and
 * runtime (client + server) can import via `#shared/wiki-routes`.
 */
import type { WikiCollectionName } from './types/wiki'

export const wikiUrl = {
  home: (): string => '/',
  courses: (): string => '/courses',
  page: (slug: string): string => (slug === 'overview' ? '/' : `/wiki/${slug}`),
  tag: (tag: string): string => `/tag/${encodeURIComponent(tag)}`,
  asset: (filename: string): string => `/wiki-assets/${filename}`,
}

/**
 * Extract the canonical slug from any of:
 *   - @nuxt/content `path`     ('/courses/imek', '/topics/anfis#heading')
 *   - filesystem path           ('courses/imek.md')
 *   - bare slug                 ('imek')
 *   - undefined / null / empty  ('')
 *
 * Strips a leading `#fragment` (used by search-section ids).
 */
export function slugFromPath(path: string | undefined | null): string {
  if (!path) return ''
  const noFragment = path.split('#')[0] ?? ''
  const last = noFragment.split('/').filter(Boolean).pop() ?? ''
  return last.replace(/\.(mdx?|md)$/i, '')
}

/**
 * Map a content-page object (as returned by @nuxt/content's queryCollection,
 * or as received by the wikilink remark plugin's urlResolver) to its
 * canonical web app URL.
 *
 * IMPORTANT: never derive a URL from `course`/`courses` frontmatter — that
 * field describes the course a page belongs to, not the page's own slug.
 */
export function pathFor(input: {
  collection?: WikiCollectionName
  path?: string
  filePath?: string
  stem?: string
  heading?: string
  isEmbed?: boolean
}): string {
  if (input.isEmbed && input.filePath) return wikiUrl.asset(input.filePath)

  const raw = input.path ?? input.filePath ?? input.stem ?? ''
  const [pathPart, fragmentFromPath] = raw.split('#')
  const slug = slugFromPath(pathPart)
  const heading = input.heading ?? fragmentFromPath ?? ''

  if (input.collection === 'overview' || slug === 'overview') return wikiUrl.home()

  const base = wikiUrl.page(slug)
  return heading ? `${base}#${heading}` : base
}
