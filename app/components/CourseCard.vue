<template>
  <NuxtLink
    :to="wikiUrl.page(slug)"
    class="block rounded-lg border border-l-4 border-(--ui-border) bg-(--ui-bg-elevated) p-5 transition-colors hover:border-(--ui-color-primary-300)"
    :style="{ borderLeftColor: hueVars['--course-hue-dot'], ...hueVars }"
  >
    <div class="mb-2 flex items-start justify-between gap-2">
      <CoursePill :slug="slug" :accent="firstTag" big />
      <span v-if="zapiskuLabel" class="shrink-0 text-xs text-(--ui-text-muted)">
        {{ zapiskuLabel }}
      </span>
    </div>
    <h2 class="text-base font-semibold">{{ title }}</h2>
    <p v-if="description" class="mt-1 line-clamp-2 text-xs text-(--ui-text-muted)">
      {{ description }}
    </p>
    <!-- TODO(course-meta): show garant + courseName once schema fields populated -->
    <div v-if="tags.length" class="mt-3 flex flex-wrap gap-1.5">
      <TagPill v-for="t in tags" :key="t" :tag="t" />
    </div>
    <div v-if="updatedShort" class="mt-3 text-xs text-(--ui-text-muted)">
      upraveno {{ updatedShort }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'
import { courseHueVars } from '~/utils/course-hue'

const props = defineProps<{
  slug: string
  title: string
  firstTag: string
  tags: string[]
  updatedShort?: string
}>()

const hueVars = computed(() => courseHueVars(props.firstTag))

const stats = useCourseStats(() => props.slug)
const { descriptionFor } = useWikiSlugIndex()

const description = computed(() => descriptionFor(props.slug))

function pluralizeShort(n: number): string {
  if (n === 0) return ''
  if (n === 1) return '1 zápisek'
  if (n >= 2 && n <= 4) return `${n} zápisky`
  return `${n} zápisků`
}

const zapiskuLabel = computed(() => pluralizeShort(stats.value.zapisku))
</script>
