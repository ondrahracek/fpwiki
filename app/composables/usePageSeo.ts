/**
 * Single source of truth for per-page SEO metadata. Pages call this once
 * with their semantic inputs (title, description, path, type); the composable
 * emits title, description, ogTitle/ogDescription/ogUrl/ogType/ogImage,
 * twitterTitle/twitterDescription/twitterImage, and a <link rel="canonical">.
 *
 * Site-wide tags (og:site_name, og:locale, og:image dimensions, twitter:card,
 * robots) live in app.vue and are NOT re-emitted here.
 *
 * Why a composable rather than 7 inline useSeoMeta calls:
 *   - the " — fpwiki" title suffix lives in one place
 *   - the description fallback lives in one place
 *   - canonical URL construction routes through wikiUrl.absolute()
 *     (preserving the single-helper rule from CLAUDE.md)
 */
import { wikiUrl } from '#shared/wiki-routes'

const SITE_NAME = 'fpwiki'
const DEFAULT_DESCRIPTION =
  'Neoficiální studijní wiki se zápisky k vybraným předmětům na FP VUT v Brně.'

type MaybeRef<T> = T | (() => T)

interface PageSeoInput {
  /** Page title without the " — fpwiki" suffix unless `appendSiteName` is false. */
  title: MaybeRef<string>
  /** Plain-text description (Czech). Falls back to the site default when undefined. */
  description?: MaybeRef<string | undefined>
  /** Site-relative path (e.g. "/wiki/imek"). Composable absolutizes via runtimeConfig. */
  path: MaybeRef<string>
  /** "website" (default) or "article" for content pages. */
  type?: 'website' | 'article'
  /** ISO 8601 — only meaningful when type === 'article'. */
  publishedTime?: MaybeRef<string | undefined>
  modifiedTime?: MaybeRef<string | undefined>
  /** When false, do NOT append " — fpwiki" (use for self-naming home title). */
  appendSiteName?: boolean
}

const unrefMaybe = <T>(v: MaybeRef<T>): T => (typeof v === 'function' ? (v as () => T)() : v)

export function usePageSeo(input: PageSeoInput): void {
  const config = useRuntimeConfig()
  const origin = config.public.siteUrl as string

  const append = input.appendSiteName ?? true
  const fullTitle = computed(() => {
    const t = unrefMaybe(input.title)
    return append ? `${t} — ${SITE_NAME}` : t
  })
  const description = computed(() => unrefMaybe(input.description) || DEFAULT_DESCRIPTION)
  const canonical = computed(() => wikiUrl.absolute(origin, unrefMaybe(input.path)))
  const isArticle = input.type === 'article'

  useSeoMeta({
    title: () => fullTitle.value,
    description: () => description.value,
    ogTitle: () => fullTitle.value,
    ogDescription: () => description.value,
    ogUrl: () => canonical.value,
    ogType: input.type ?? 'website',
    twitterTitle: () => fullTitle.value,
    twitterDescription: () => description.value,
    ...(isArticle && {
      articlePublishedTime: () => unrefMaybe(input.publishedTime),
      articleModifiedTime: () => unrefMaybe(input.modifiedTime),
    }),
  })

  useHead({
    link: [{ rel: 'canonical', href: () => canonical.value }],
  })
}
