<template>
  <div
    class="relative rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) px-4 py-3.5 transition-[transform,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-(--color-paper-100) motion-reduce:transform-none"
    :class="{ 'course-card-featured': featured }"
  >
    <NuxtLink
      :to="wikiUrl.page(slug)"
      :aria-label="title"
      class="absolute inset-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--ui-color-primary-500)"
    />
    <div class="mb-2 flex items-start justify-between gap-2">
      <CoursePill class="relative" :slug="slug" big />
      <span v-if="zapiskuLabel" class="shrink-0 font-mono text-[10.5px] text-(--ui-text-muted)">
        {{ zapiskuLabel }}
      </span>
    </div>
    <h2 class="text-[14.5px] leading-[1.3] font-semibold tracking-[-0.01em]">{{ title }}</h2>
    <p v-if="description" class="mt-1 line-clamp-2 text-xs text-(--ui-text-muted)">
      {{ description }}
    </p>
    <!-- TODO(course-meta): show garant + courseName once schema fields populated -->
    <div v-if="tags.length" class="relative mt-3 flex flex-wrap gap-1.5">
      <TagPill v-for="t in tags" :key="t" :tag="t" />
    </div>
    <div v-if="updatedShort" class="mt-3 font-mono text-[10.5px] text-(--ui-text-muted)">
      upraveno {{ updatedShort }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'

const props = defineProps<{
  slug: string
  title: string
  tags: string[]
  updatedShort?: string
  featured?: boolean
}>()

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
