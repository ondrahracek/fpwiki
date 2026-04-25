<template>
  <NuxtLink
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
import type { TagColor } from '~/plugins/tag-colors'
import { wikiUrl } from '#shared/wiki-routes'

const props = withDefaults(
  defineProps<{
    /** Course slug (e.g. 'imek'). Renders uppercased. */
    slug: string
    /** First tag of the course, used to derive the pill color. */
    accent?: string
    big?: boolean
  }>(),
  { big: false, accent: 'ekonomie' },
)

const { $tagColor } = useNuxtApp()

const cssVars = computed(() => {
  const c = $tagColor(props.accent) as TagColor
  return {
    '--course-bg': c.bg,
    '--course-fg': c.fg,
    '--course-dot': c.dot,
  } as Record<string, string>
})
</script>

<style>
.course-pill {
  background: var(--course-bg);
  color: var(--course-fg);
}
.course-pill-big {
  background: var(--course-fg);
  color: white;
}
.dark .course-pill {
  background: color-mix(in oklab, var(--course-fg) 22%, transparent);
  color: var(--course-dot);
}
.dark .course-pill-big {
  background: var(--course-dot);
  color: white;
}
</style>
