<template>
  <nav class="space-y-6 text-sm">
    <section>
      <h2 class="section-label mb-2">Štítky</h2>
      <ul class="space-y-1">
        <li>
          <NuxtLink
            to="/tags"
            class="flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
            :class="{ 'bg-(--ui-bg-elevated) font-medium': !activeTag }"
          >
            <span>Všechny štítky</span>
            <span class="text-xs text-(--ui-text-muted)">{{ tagOptions.length }}</span>
          </NuxtLink>
        </li>
        <li v-for="t in tagOptions" :key="t.tag">
          <NuxtLink
            :to="wikiUrl.tag(t.tag)"
            class="flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
            :class="{ 'bg-(--ui-bg-elevated) font-medium': activeTag === t.tag }"
          >
            <span class="flex items-center gap-2 truncate">
              <span class="size-2 rounded-full" :style="{ backgroundColor: t.dot }" />
              <span>#{{ t.tag }}</span>
            </span>
            <span class="text-xs text-(--ui-text-muted)">{{ t.count }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'

const route = useRoute()
const { $identityColor } = useNuxtApp()

const activeTag = computed(() =>
  route.path.startsWith('/tag/') ? decodeURIComponent(String(route.params.slug ?? '')) : '',
)

const { data: tagCounts } = await useTagCounts()

const tagOptions = computed(() =>
  (tagCounts.value ?? []).map((t) => ({ ...t, dot: $identityColor(t.tag).dot })),
)
</script>
