<template>
  <div class="relative rounded p-2 transition-colors hover:bg-(--ui-bg-elevated)">
    <NuxtLink
      :to="path"
      :aria-label="title"
      class="absolute inset-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--ui-color-primary-500)"
    />
    <div class="flex items-start gap-3">
      <CoursePill v-if="firstCourse" :slug="firstCourse" class="relative mt-0.5 shrink-0" />
      <div class="min-w-0 flex-1">
        <div class="truncate text-sm font-medium">{{ title }}</div>
        <div class="text-xs text-(--ui-text-muted)">
          {{ relativeTime(updated) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resolveCourses } from '~/utils/frontmatter'
import { relativeTime } from '~/utils/format-date'

const props = defineProps<{
  /** URL to navigate to. */
  path: string
  /** Page title. */
  title: string
  /** ISO date or Date for the "updated" timestamp. */
  updated?: string | Date
  /** Page-like object with `course`/`courses` frontmatter, used to derive the pill. */
  page?: { course?: string | string[]; courses?: string | string[] }
}>()

const firstCourse = computed(() => (props.page ? resolveCourses(props.page)[0] : undefined))
</script>
