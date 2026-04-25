<template>
  <div>
    <Breadcrumb collection="courses" />
    <header class="mt-4 mb-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-semibold tracking-tight">Předměty</h1>
          <p class="mt-2 text-sm text-(--ui-text-muted)">
            {{ totalCoursesText }} <span aria-hidden="true">·</span> {{ totalZapiskuText }} celkem
          </p>
        </div>
        <UButtonGroup size="sm" :ui="{ base: 'shrink-0' }">
          <UButton
            :variant="view === 'grid' ? 'solid' : 'outline'"
            color="neutral"
            icon="i-lucide-layout-grid"
            @click="view = 'grid'"
          >
            Mřížka
          </UButton>
          <UButton
            :variant="view === 'list' ? 'solid' : 'outline'"
            color="neutral"
            icon="i-lucide-list"
            @click="view = 'list'"
          >
            Seznam
          </UButton>
        </UButtonGroup>
      </div>
    </header>

    <ul v-if="view === 'grid'" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

    <ul v-else class="divide-y divide-(--ui-border) rounded-lg border border-(--ui-border)">
      <li v-for="c in items" :key="c.slug">
        <NuxtLink
          :to="wikiUrl.page(c.slug)"
          class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-(--ui-bg-elevated)"
          :style="{ borderLeftColor: c.dotColor }"
          style="border-left-width: 3px"
        >
          <div class="flex min-w-0 items-center gap-3">
            <CoursePill :slug="c.slug" :accent="c.firstTag" />
            <span class="truncate font-medium">{{ c.title }}</span>
          </div>
          <div class="flex items-center gap-3 text-xs text-(--ui-text-muted)">
            <span>{{ c.zapiskuLabel }}</span>
            <span v-if="c.updatedShort">upraveno {{ c.updatedShort }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { resolveCourses } from '~/utils/frontmatter'
import { slugFromPath, wikiUrl } from '#shared/wiki-routes'
import { shortDate } from '~/utils/format-date'
import { courseHueVars } from '~/utils/course-hue'

definePageMeta({ layout: 'sidebar' })

useSeoMeta({ title: 'Předměty — fpwiki' })

const view = useCookie<'grid' | 'list'>('fp-courses-view', {
  default: () => 'grid',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
})

const { data: bundle } = await useAsyncData('courses-list', async () => {
  const [coursesList, topics, summaries, outputs] = await Promise.all([
    queryCollection('courses').order('title', 'ASC').all(),
    queryCollection('topics').all(),
    queryCollection('summaries').all(),
    queryCollection('outputs').all(),
  ])
  const counts = new Map<string, number>()
  for (const list of [topics, summaries, outputs]) {
    for (const p of list) {
      for (const slug of resolveCourses(p)) {
        counts.set(slug, (counts.get(slug) ?? 0) + 1)
      }
    }
  }
  return { courses: coursesList, counts: Object.fromEntries(counts) }
})

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

const items = computed(() => {
  const list = bundle.value?.courses ?? []
  const counts = bundle.value?.counts ?? {}
  return list.map((c) => {
    const firstTag = c.tags?.[0] ?? 'ekonomie'
    const slug = resolveCourses(c)[0] ?? slugFromPath(c.path)
    const count = counts[slug] ?? 0
    return {
      slug,
      title: c.title,
      firstTag,
      tags: c.tags ?? [],
      updatedShort: shortDate(c.updated),
      zapiskuLabel: pluralize(count, 'zápisek', 'zápisky', 'zápisků'),
      dotColor: courseHueVars(firstTag)['--course-hue-dot'],
    }
  })
})
</script>
