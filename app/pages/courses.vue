<template>
  <div>
    <Breadcrumb collection="courses" />
    <header class="mt-4 mb-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-[38px] leading-[1.1] font-semibold tracking-[-0.03em]">Předměty</h1>
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

    <ul
      v-if="view === 'grid'"
      class="grid [grid-template-columns:repeat(auto-fill,minmax(260px,360px))] gap-3"
    >
      <li v-for="c in items" :key="c.slug">
        <CourseCard
          :slug="c.slug"
          :title="c.title"
          :tags="c.tags"
          :updated-short="c.updatedShort"
          :featured="c.featured"
        />
      </li>
    </ul>

    <ul v-else class="divide-y divide-(--ui-border) rounded-lg border border-(--ui-border)">
      <li v-for="c in items" :key="c.slug">
        <div
          class="relative flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-(--ui-bg-elevated)"
          :style="{ borderLeftColor: c.dotColor }"
          style="border-left-width: 3px"
        >
          <NuxtLink
            :to="wikiUrl.page(c.slug)"
            :aria-label="c.title"
            class="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--ui-color-primary-500)"
          />
          <div class="flex min-w-0 items-center gap-3">
            <CoursePill class="relative" :slug="c.slug" />
            <span class="truncate font-medium">{{ c.title }}</span>
          </div>
          <div class="flex items-center gap-3 text-xs text-(--ui-text-muted)">
            <span>{{ c.zapiskuLabel }}</span>
            <span v-if="c.updatedShort">upraveno {{ c.updatedShort }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { resolveCourses } from '~/utils/frontmatter'
import { slugFromPath, wikiUrl } from '#shared/wiki-routes'
import { shortDate } from '~/utils/format-date'
import { identityColor } from '~/plugins/tag-colors'

usePageSeo({
  title: 'Předměty',
  description: 'Seznam magisterských předmětů na FP VUT s mými zápisky a propojenými tématy.',
  path: '/courses',
})

const view = useCookie<'grid' | 'list'>('fp-courses-view', {
  default: () => 'grid',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
})

// Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
const { data: bundle } = await useAsyncData(
  'courses-list',
  async () => {
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
  },
  import.meta.dev ? { getCachedData: () => undefined } : undefined,
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

const items = computed(() => {
  const list = bundle.value?.courses ?? []
  const counts = bundle.value?.counts ?? {}
  return list.map((c) => {
    const slug = resolveCourses(c)[0] ?? slugFromPath(c.path)
    const count = counts[slug] ?? 0
    return {
      slug,
      title: c.title,
      tags: c.tags ?? [],
      updatedShort: shortDate(c.updated),
      zapiskuLabel: pluralize(count, 'zápisek', 'zápisky', 'zápisků'),
      // Left border matches the pill on the row — both derived from the slug.
      dotColor: identityColor(slug).dot,
      featured: c.featured ?? false,
    }
  })
})
</script>
