<template>
  <div>
    <Breadcrumb tag-mode :slug="slug" />
    <header class="mt-4 mb-6">
      <p class="text-sm text-(--ui-text-muted)">Štítek</p>
      <h1
        class="mt-1 flex items-center gap-3 text-[38px] leading-[1.1] font-semibold tracking-[-0.03em]"
      >
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
import { wikiUrl } from '#shared/wiki-routes'
import { collectionLabel } from '~/utils/labels'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: pages } = await useTagPages(slug)

const items = computed(() => pages.value ?? [])

usePageSeo({
  title: () => `#${slug.value}`,
  description: () => `Všechny stránky se štítkem #${slug.value} na fpwiki.`,
  path: () => wikiUrl.tag(slug.value),
})
</script>
