<template>
  <ul class="space-y-1">
    <li v-for="c in rows" :key="c.slug">
      <NuxtLink
        :to="wikiUrl.page(c.slug)"
        :class="[
          'flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)',
          c.isCurrent ? 'bg-(--ui-bg-elevated) font-medium' : '',
        ]"
      >
        <span class="flex items-center gap-2 truncate">
          <span class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: c.dot }" />
          <span class="truncate">{{ c.shortTitle }}</span>
        </span>
        <span class="text-xs text-(--ui-text-muted)">{{ c.count }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'

// Course rows of AppPrimaryNav's "Předměty" section. Split out so the flat
// list (one semester) and each collapsible semester group share one template.
defineProps<{
  rows: {
    slug: string
    shortTitle: string
    count: number
    isCurrent: boolean
    dot: string
  }[]
}>()
</script>
