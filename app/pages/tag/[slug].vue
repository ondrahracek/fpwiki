<template>
  <div>
    <Breadcrumb tag-mode :slug="slug" />
    <header class="mt-4 mb-6">
      <p class="text-sm text-(--ui-text-muted)">Štítek</p>
      <h1 class="mt-1 flex items-center gap-3 text-3xl font-semibold tracking-tight">
        <TagPill :tag="slug" :count="items.length" />
      </h1>
    </header>

    <ul v-if="items.length" class="space-y-2">
      <li v-for="p in items" :key="p.path">
        <NuxtLink
          :to="p.path"
          class="block rounded-md border border-(--ui-border) bg-(--ui-bg-elevated) p-4 hover:border-(--ui-color-primary-300)"
        >
          <div class="flex items-center justify-between gap-3">
            <span class="text-base font-medium">{{ p.title }}</span>
            <UBadge size="sm" color="neutral" variant="soft">
              {{ collectionLabel(p.collection) }}
            </UBadge>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="text-(--ui-text-muted)">Ke štítku #{{ slug }} tu zatím nic není.</p>
  </div>
</template>

<script setup lang="ts">
import type { WikiCollectionName } from '#shared/types/wiki'
import { pathFor } from '#shared/wiki-routes'
import { collectionLabel } from '~/utils/labels'

definePageMeta({ layout: 'sidebar' })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

// Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
const { data: pages } = await useAsyncData(
  `tag-${slug.value}`,
  async () => {
    const collections: WikiCollectionName[] = ['courses', 'topics', 'summaries', 'outputs']
    const all = await Promise.all(
      collections.map(async (name) => {
        const found = await queryCollection(name).all()
        return found
          .filter((p) => (p.tags ?? []).includes(slug.value))
          .map((p) => ({
            path: pathFor({ path: p.path ?? undefined, collection: name }),
            title: p.title,
            collection: name,
          }))
      }),
    )
    return all.flat()
  },
  import.meta.dev ? { getCachedData: () => undefined } : undefined,
)

const items = computed(() => pages.value ?? [])

useSeoMeta({ title: () => `#${slug.value} — fpwiki` })
</script>
