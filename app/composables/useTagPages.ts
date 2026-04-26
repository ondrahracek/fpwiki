import { WIKI_PAGE_COLLECTIONS, type WikiCollectionName } from '#shared/types/wiki'
import { pathFor } from '#shared/wiki-routes'

export interface WikiTagPage {
  path: string
  title: string
  collection: WikiCollectionName
}

/**
 * Pages tagged with `slug`, fanned out across all page collections. Single
 * source of truth for /tag/:slug listing. Consumers should never re-implement
 * this fan-out — extend or call this composable instead.
 */
export function useTagPages(slug: MaybeRefOrGetter<string>) {
  const slugRef = toRef(slug)
  return useAsyncData<WikiTagPage[]>(
    () => `tag-pages-${slugRef.value}`,
    async () => {
      const lists = await Promise.all(
        WIKI_PAGE_COLLECTIONS.map(async (name) => {
          const found = await queryCollection(name).all()
          return found
            .filter((p) => (p.tags ?? []).includes(slugRef.value))
            .map((p) => ({
              path: pathFor({ path: p.path ?? undefined, collection: name }),
              title: p.title,
              collection: name,
            }))
        }),
      )
      return lists.flat()
    },
    {
      watch: [slugRef],
      default: () => [],
      // Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
      ...(import.meta.dev ? { getCachedData: () => undefined } : {}),
    },
  )
}
