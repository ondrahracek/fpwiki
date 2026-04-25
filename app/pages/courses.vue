<template>
  <UContainer class="py-10">
    <header class="mb-8">
      <h1 class="text-3xl font-semibold tracking-tight">Předměty</h1>
      <p class="mt-2 text-sm text-(--ui-text-muted)">
        {{ totalCoursesText }} <span aria-hidden="true">·</span> {{ totalZapiskuText }} celkem
      </p>
    </header>

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="c in items" :key="c.slug">
        <CourseCard
          :slug="c.slug"
          :title="c.title"
          :first-tag="c.firstTag"
          :tags="c.tags"
          :updated-short="c.updatedShort"
        />
      </li>
    </ul>
  </UContainer>
</template>

<script setup lang="ts">
import { resolveCourses } from '~/utils/frontmatter'
import { slugFromPath } from '#shared/wiki-routes'
import { shortDate } from '~/utils/format-date'

useSeoMeta({ title: 'Předměty — fpwiki' })

const { data: courses } = await useAsyncData('courses-list', () =>
  queryCollection('courses').order('title', 'ASC').all(),
)

const stats = useTotalStats()

function pluralize(n: number, one: string, few: string, many: string): string {
  if (n === 1) return `${n} ${one}`
  if (n >= 2 && n <= 4) return `${n} ${few}`
  return `${n} ${many}`
}

const totalCoursesText = computed(() =>
  pluralize(stats.value.courses, 'předmět', 'předměty', 'předmětů'),
)
const totalZapiskuText = computed(() =>
  pluralize(stats.value.zapisku, 'zápisek', 'zápisky', 'zápisků'),
)

const items = computed(
  () =>
    courses.value?.map((c) => {
      const firstTag = c.tags?.[0] ?? 'ekonomie'
      return {
        slug: resolveCourses(c)[0] ?? slugFromPath(c.path),
        title: c.title,
        firstTag,
        tags: c.tags ?? [],
        updatedShort: shortDate(c.updated),
      }
    }) ?? [],
)
</script>
