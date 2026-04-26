<template>
  <div class="xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10">
    <article class="min-w-0">
      <ReadingProgress />
      <Breadcrumb v-if="page" :collection="found?.collection" :title="page.title" :slug="slug" />
      <WikiPage v-if="page" :page="page" class="mt-2" />
      <UContainer v-else class="py-24 text-center">
        <p class="text-sm font-medium text-(--ui-text-muted)">404</p>
        <h1 class="mt-2 text-2xl font-semibold">Stránka se nenašla</h1>
        <p class="mt-2 text-(--ui-text-toned)">
          Materiál „<code class="font-mono">{{ slug }}</code
          >“ tu zatím není.
        </p>
        <UButton class="mt-6" to="/" color="primary" variant="subtle"> Zpět na úvod </UButton>
      </UContainer>
    </article>
    <aside v-if="page" class="hidden xl:block">
      <div class="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pb-10">
        <WikiRightRail :slug="slug" :page="page" :toc-links="tocLinks" />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { WIKI_PAGE_COLLECTIONS } from '#shared/types/wiki'
import { wikiUrl } from '#shared/wiki-routes'
import { toISODate } from '~/utils/frontmatter'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

// Search across all 4 page-collections in parallel; first hit wins. Slug
// uniqueness is globally enforced by scripts/validate-content.ts so this
// cannot ambiguously match.
//
// Dev-only `getCachedData: () => undefined` opts out of payload memoization —
// otherwise a transient null result (e.g. during a stale .nuxt rebuild) gets
// trapped under the route's key and every soft-nav back to this slug renders
// 404 until hard refresh. Production prerender is immune (per-route payloads).
const { data: found } = await useAsyncData(
  `wiki-${slug.value}`,
  async () => {
    for (const name of WIKI_PAGE_COLLECTIONS) {
      const direct = await queryCollection(name).where('stem', 'LIKE', `%/${slug.value}`).first()
      if (direct) return { page: direct, collection: name }
      const bare = await queryCollection(name).where('stem', '=', slug.value).first()
      if (bare) return { page: bare, collection: name }
    }
    return null
  },
  import.meta.dev ? { getCachedData: () => undefined } : undefined,
)

const page = computed(() => found.value?.page ?? null)
const tocLinks = computed(() => {
  // body.toc is added by @nuxtjs/mdc (see PageCollectionItemBase.body in
  // @nuxt/content's types). Empty when the body has no headings.
  const body = page.value?.body as
    | { toc?: { links?: import('@nuxt/content').TocLink[] } }
    | undefined
  return body?.toc?.links ?? []
})

if (!page.value) {
  // Soft 404 — render not-found block instead of throwing, so prerender still emits.
  setResponseStatus(404)
  // Don't let crawlers index the not-found body under this slug.
  useSeoMeta({ robots: 'noindex, follow' })
}

usePageSeo({
  title: () => page.value?.title ?? 'Nenalezeno',
  description: () => (page.value as { description?: string } | null)?.description,
  path: () => wikiUrl.page(slug.value),
  type: 'article',
  publishedTime: () => toISODate(page.value?.created) ?? undefined,
  modifiedTime: () => toISODate(page.value?.updated) ?? undefined,
})
</script>
