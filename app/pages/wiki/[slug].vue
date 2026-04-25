<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import type { WikiCollectionName } from '#shared/types/wiki'

definePageMeta({ layout: 'sidebar' })

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
    const collections: WikiCollectionName[] = ['courses', 'topics', 'summaries', 'outputs']
    for (const name of collections) {
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

if (!page.value) {
  // Soft 404 — render not-found block instead of throwing, so prerender still emits.
  setResponseStatus(404)
}

useSeoMeta({
  title: () => (page.value ? `${page.value.title} — fpwiki` : 'Nenalezeno — fpwiki'),
})
</script>
