import { WIKI_PAGE_COLLECTIONS, type WikiSearchSection } from '#shared/types/wiki'

/**
 * Fans out queryCollectionSearchSections() across all 4 page collections in
 * parallel and merges results, tagging each section with its origin collection.
 *
 * `queryCollectionSearchSections` is single-collection per call by design in
 * @nuxt/content v3 — this composable is the one place that fact is encoded.
 * Search consumers should never call queryCollectionSearchSections directly.
 */
export function useAllSearchSections() {
  return useLazyAsyncData<WikiSearchSection[]>(
    'all-search-sections',
    async () => {
      const results = await Promise.all(
        WIKI_PAGE_COLLECTIONS.map(async (name) => {
          const sections = await queryCollectionSearchSections(name)
          return sections.map((s) => ({ ...s, collection: name }) as WikiSearchSection)
        }),
      )

      return results.flat()
    },
    { server: false, default: () => [] },
  )
}
