<template>
  <UContainer class="py-10">
    <header class="mb-8">
      <h1 class="text-3xl font-semibold tracking-tight">Předměty</h1>
      <p class="mt-2 text-(--ui-text-toned)">
        Předměty, ke kterým jsou na fpwiki dostupné zápisky a zpracované materiály.
      </p>
    </header>

    <ul class="grid gap-4 sm:grid-cols-2">
      <li v-for="c in items" :key="c.slug">
        <NuxtLink
          :to="wikiUrl.page(c.slug)"
          class="block rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-5 transition-colors hover:border-(--ui-color-primary-300)"
        >
          <div class="mb-2 flex items-center justify-between">
            <CoursePill :slug="c.slug" :accent="c.firstTag" big />
            <span v-if="c.updated" class="text-xs text-(--ui-text-muted)">
              {{ c.updated }}
            </span>
          </div>
          <h2 class="text-base font-semibold">{{ c.title }}</h2>
          <!-- TODO(course-meta): show garant + courseName once schema fields populated -->
          <div v-if="c.tags.length" class="mt-3 flex flex-wrap gap-1.5">
            <TagPill v-for="t in c.tags" :key="t" :tag="t" />
          </div>
        </NuxtLink>
      </li>
    </ul>
  </UContainer>
</template>

<script setup lang="ts">
import { resolveCourses, toISODate } from '~/utils/frontmatter'
import { slugFromPath, wikiUrl } from '#shared/wiki-routes'

useSeoMeta({ title: 'Předměty — fpwiki' })

const { data: courses } = await useAsyncData('courses-list', () =>
  queryCollection('courses').order('title', 'ASC').all(),
)

const items = computed(
  () =>
    courses.value?.map((c) => ({
      slug: resolveCourses(c)[0] ?? slugFromPath(c.path),
      title: c.title,
      firstTag: c.tags?.[0] ?? 'ekonomie',
      tags: c.tags ?? [],
      updated: toISODate(c.updated),
    })) ?? [],
)
</script>
