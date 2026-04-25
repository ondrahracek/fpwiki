<template>
  <NuxtLink
    :to="wikiUrl.tag(tag)"
    class="tag-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-opacity hover:opacity-80"
    :style="cssVars"
  >
    <span>#{{ tag }}</span>
    <span v-if="count !== undefined" class="text-[10px] opacity-70">{{ count }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { TagColor } from '~/plugins/tag-colors'
import { wikiUrl } from '#shared/wiki-routes'

const props = defineProps<{
  tag: string
  count?: number
}>()

const { $tagColor } = useNuxtApp()

// Expose both the light-mode (bg) and dark-mode (fg-derived) tints as CSS
// custom properties; the .tag-pill stylesheet picks the right one per theme.
const cssVars = computed(() => {
  const c = $tagColor(props.tag) as TagColor
  return {
    '--tag-bg': c.bg,
    '--tag-fg': c.fg,
    '--tag-dot': c.dot,
  } as Record<string, string>
})
</script>

<style>
.tag-pill {
  background: var(--tag-bg);
  color: var(--tag-fg);
}
.dark .tag-pill {
  /* Keep the same hue but invert lightness — dim background, bright text. */
  background: color-mix(in oklab, var(--tag-fg) 22%, transparent);
  color: var(--tag-dot);
}
</style>
