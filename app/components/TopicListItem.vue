<template>
  <NuxtLink
    :to="path"
    class="group flex items-center gap-3 rounded-md border border-(--ui-border) p-3 transition-colors hover:border-(--ui-color-primary-300) hover:bg-(--ui-bg-elevated)"
  >
    <UIcon
      :name="icon"
      class="size-5 shrink-0 rounded bg-(--ui-bg-muted) p-1 text-(--ui-text-muted)"
    />
    <div class="min-w-0 flex-1">
      <div class="truncate text-sm font-medium">{{ title }}</div>
      <div v-if="description" class="line-clamp-1 text-xs text-(--ui-text-muted)">
        {{ description }}
      </div>
    </div>
    <UIcon
      name="i-lucide-chevron-right"
      class="size-4 shrink-0 text-(--ui-text-muted) transition-transform group-hover:translate-x-0.5"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  path: string
  title: string
  description?: string
  icon?: string
}>()
</script>
