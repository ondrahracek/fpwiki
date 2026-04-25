<template>
  <section class="border-y border-dashed border-(--ui-border) py-6">
    <div class="flex flex-wrap gap-y-4">
      <div
        v-for="s in items"
        :key="s.label"
        class="border-dashed border-(--ui-border) px-6 not-first:border-l first:pl-0"
      >
        <div class="text-2xl font-semibold tracking-tight text-(--ui-text-highlighted)">
          {{ formatNumber(s.value) }}
        </div>
        <div class="mt-1 text-xs tracking-wider text-(--ui-text-muted) uppercase">
          {{ s.label }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = useTotalStats()

// Czech grouping with a non-breaking thin space (1 234) — matches the design.
const fmt = new Intl.NumberFormat('cs-CZ')
const formatNumber = (n: number) => fmt.format(n)

const items = computed(() => [
  { label: 'zápisků', value: stats.value.zapisku },
  { label: 'předmětů', value: stats.value.courses },
  { label: 'cross-linků', value: stats.value.crossLinks },
  { label: 'témat', value: stats.value.topics },
])
</script>
