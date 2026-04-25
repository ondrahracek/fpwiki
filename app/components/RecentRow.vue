<template>
  <NuxtLink :to="path" class="block rounded p-2 hover:bg-(--ui-bg-elevated)">
    <div class="flex items-start gap-3">
      <CoursePill v-if="firstCourse" :slug="firstCourse" class="mt-0.5 shrink-0" />
      <div class="min-w-0 flex-1">
        <div class="truncate text-sm font-medium">{{ title }}</div>
        <div class="text-xs text-(--ui-text-muted)">
          {{ relativeTime(updated) }}
        </div>
      </div>
    </div>
  </NuxtLink>
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
