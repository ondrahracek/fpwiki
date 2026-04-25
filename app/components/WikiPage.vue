<template>
  <article class="mx-auto max-w-3xl px-6 py-10">
    <header class="mb-8 border-b border-(--ui-border) pb-6">
      <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <UBadge color="neutral" variant="soft">{{ typeLabelText }}</UBadge>
        <CoursePill v-for="c in courses" :key="c" :slug="c" />
        <span v-if="updatedDisplay" class="text-(--ui-text-muted)">
          upraveno {{ updatedDisplay }}
        </span>
      </div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ page.title }}</h1>
      <div v-if="tags.length" class="mt-4 flex flex-wrap gap-2">
        <TagPill v-for="t in tags" :key="t" :tag="t" />
      </div>
    </header>

    <div class="prose prose-paper dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>

<script setup lang="ts">
/**
 * Type-switch render component. New page-types are added HERE, not by adding
 * new routes. Currently course/topic/summary/output/overview share this
 * baseline layout — swap behavior via `typeLabel` and (later) per-type slots.
 */
import type { WikiPageType } from '#shared/types/wiki'
import { resolveCourses, toISODate } from '~/utils/frontmatter'
import { typeLabel } from '~/utils/labels'

const props = defineProps<{
  page: {
    title: string
    type?: WikiPageType
    course?: string | string[]
    courses?: string | string[]
    tags?: string[]
    sources?: string[]
    updated?: string | Date
    created?: string | Date
    body?: unknown
  }
}>()

const typeLabelText = computed(() => typeLabel(props.page.type ?? 'topic'))
const courses = computed(() => resolveCourses(props.page))
const tags = computed(() => props.page.tags ?? [])
const updatedDisplay = computed(() => toISODate(props.page.updated))
</script>
