<template>
  <NuxtLink
    :to="wikiUrl.tag(tag)"
    class="tag-pill inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[12px] font-medium tracking-[0.02em] transition-opacity hover:opacity-80"
    :style="cssVars"
  >
    <span class="[overflow-wrap:anywhere]">#{{ tag }}</span>
    <span v-if="count !== undefined" class="text-[10px] opacity-70">{{ count }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'
import { identityVars } from '~/plugins/tag-colors'

const props = defineProps<{
  tag: string
  count?: number
}>()

const cssVars = computed(() => identityVars(props.tag))
</script>

<style>
.tag-pill {
  background: var(--id-bg);
  color: var(--id-fg);
}
.dark .tag-pill {
  /* Same hue, inverted lightness — dim background, bright text. */
  background: color-mix(in oklab, var(--id-fg) 22%, transparent);
  color: var(--id-dot);
}
</style>
