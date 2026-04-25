<template>
  <div>
    <ReadingProgress />
    <WikiPage v-if="page" :page="page" />
    <UContainer v-else class="py-24 text-center">
      <p class="text-sm font-medium text-(--ui-text-muted)">404</p>
      <h1 class="mt-2 text-2xl font-semibold">Stránka nenalezena</h1>
      <p class="mt-2 text-(--ui-text-toned)">
        Zápisek <code class="font-mono">{{ slug }}</code> zde neexistuje.
      </p>
      <UButton class="mt-6" to="/" color="primary" variant="subtle"> Zpět na úvod </UButton>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { WikiCollectionName } from '#shared/types/wiki'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

// Search across all 4 page-collections in parallel; first hit wins. Slug
// uniqueness is globally enforced by scripts/validate-content.ts so this
// cannot ambiguously match.
const { data: page } = await useAsyncData(`wiki-${slug.value}`, async () => {
  const collections: WikiCollectionName[] = ['courses', 'topics', 'summaries', 'outputs']
  for (const name of collections) {
    const found = await queryCollection(name).where('stem', 'LIKE', `%/${slug.value}`).first()
    if (found) return found
    const direct = await queryCollection(name).where('stem', '=', slug.value).first()
    if (direct) return direct
  }
  return null
})

if (!page.value) {
  // Soft 404 — render not-found block instead of throwing, so prerender still emits.
  setResponseStatus(404)
}

useSeoMeta({
  title: () => (page.value ? `${page.value.title} — fpwiki` : 'Nenalezeno — fpwiki'),
})
</script>
