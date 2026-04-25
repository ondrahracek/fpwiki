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
const { $tagColor } = useNuxtApp()

const activeTag = computed(() =>
  route.path.startsWith('/tag/') ? decodeURIComponent(String(route.params.slug ?? '')) : '',
)

const { data: tagCounts } = await useAsyncData('all-tag-counts', async () => {
  const all = await Promise.all([
    queryCollection('courses').all(),
    queryCollection('topics').all(),
    queryCollection('summaries').all(),
    queryCollection('outputs').all(),
  ])
  const counts = new Map<string, number>()
  for (const list of all) {
    for (const p of list) {
      for (const t of p.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
})

const tagOptions = computed(() =>
  (tagCounts.value ?? []).map((t) => ({ ...t, dot: $tagColor(t.tag).dot })),
)
</script>
