<template>
  <div>
    <Breadcrumb collection="overview" title="Štítky" />
    <header class="mt-4 mb-6">
      <h1 class="text-[38px] leading-[1.1] font-semibold tracking-[-0.03em]">Štítky</h1>
      <p class="mt-2 text-sm text-(--ui-text-muted)">
        {{ tagOptions.length }} štítků seřazených dle počtu výskytů.
      </p>
    </header>

    <div v-if="tagOptions.length" class="flex flex-wrap gap-2">
      <TagPill v-for="t in tagOptions" :key="t.tag" :tag="t.tag" :count="t.count" />
    </div>
    <p v-else class="text-(--ui-text-muted)">Zatím tu nic není.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'sidebar' })
usePageSeo({
  title: 'Štítky',
  description: 'Štítky napříč všemi zápisky — projděte si témata.',
  path: '/tags',
})

// Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
const { data: tagCounts } = await useAsyncData(
  'tags-page',
  async () => {
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
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
  },
  import.meta.dev ? { getCachedData: () => undefined } : undefined,
)

const tagOptions = computed(() => tagCounts.value ?? [])
</script>
