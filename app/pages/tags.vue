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
usePageSeo({
  title: 'Štítky',
  description: 'Štítky napříč všemi zápisky — projděte si témata.',
  path: '/tags',
})

const { data: tagCounts } = await useTagCounts()

const tagOptions = computed(() => tagCounts.value ?? [])
</script>
