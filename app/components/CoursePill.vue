<template>
  <NuxtLink
    v-if="slug"
    :to="wikiUrl.page(slug)"
    class="course-pill inline-flex items-center rounded font-mono leading-none font-semibold transition-opacity hover:opacity-80"
    :class="[big ? 'px-2.5 py-1 text-xs' : 'px-1.5 py-1 text-[11px]', big ? 'course-pill-big' : '']"
    :style="cssVars"
    @click.stop
  >
    {{ slug.toUpperCase() }}
  </NuxtLink>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'
import { identityVars } from '~/plugins/tag-colors'

const props = withDefaults(
  defineProps<{
    /** Course slug (e.g. 'imek'). Renders uppercased. Determines pill color. */
    slug: string
    big?: boolean
  }>(),
  { big: false },
)

const cssVars = computed(() => identityVars(props.slug))
</script>

<style>
.course-pill {
  background: var(--id-bg);
  color: var(--id-fg);
}
.course-pill-big {
  background: var(--id-fg);
  color: white;
}
.dark .course-pill {
  background: color-mix(in oklab, var(--id-fg) 22%, transparent);
  color: var(--id-dot);
}
.dark .course-pill-big {
  background: var(--id-dot);
  color: white;
}
</style>
