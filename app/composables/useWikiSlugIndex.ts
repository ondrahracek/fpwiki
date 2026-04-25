import type { WikiSlugIndex, WikiSlugIndexEntry } from '#shared/types/wiki'
import { wikiUrl } from '#shared/wiki-routes'

/**
 * Single accessor for the slug -> URL map and richer entries.
 *
 * Backed by `~~/server/wiki-slug-index.generated.json`, written by the
 * wiki-slug-index Nuxt module at build time and dev-server reload time.
 *
 * Consumers: search, breadcrumbs, diagnostics, stats counter, recent rows.
 * The remark plugin reads the SAME file directly in nuxt.config.ts (build-
 * time) — see modules/wiki-slug-index/index.ts.
 */
export function useWikiSlugIndex() {
  // useState gives SSR-stable shared state across components.
  const index = useState<WikiSlugIndex>('wiki-slug-index', () => ({
    files: [],
    slugs: {},
    entries: [],
    descriptions: {},
    inboundLinks: {},
    totalLinkCount: 0,
  }))

  const findBySlug = (slug: string): WikiSlugIndexEntry | undefined => {
    return index.value.entries.find((e) => e.slug === slug)
  }

  const pathForSlug = (slug: string): string => {
    return index.value.slugs[slug] ?? wikiUrl.page(slug)
  }

  const descriptionFor = (slug: string): string | undefined => {
    return index.value.descriptions[slug]
  }

  const inboundCountFor = (slug: string): number => {
    return index.value.inboundLinks[slug] ?? 0
  }

  const totalCrossLinks = computed(() => index.value.totalLinkCount)

  return { index, findBySlug, pathForSlug, descriptionFor, inboundCountFor, totalCrossLinks }
}
