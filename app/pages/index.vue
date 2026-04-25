<template>
  <UContainer class="py-10 [--ui-container:1080px]">
    <DisclaimerBanner class="mb-8" />

    <section class="py-12 text-center sm:text-left">
      <h1
        class="text-4xl font-semibold tracking-tight sm:max-w-[900px] sm:text-[60px] sm:leading-[1.02] sm:tracking-[-0.04em]"
      >
        Zápisky k vybraným
        <span
          class="block text-(--color-fp-red-500) supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent"
          style="background-image: var(--gradient-fp)"
        >
          předmětům na FP VUT.
        </span>
      </h1>
      <p class="mt-4 max-w-[600px] font-serif text-[19px] leading-[1.55] text-(--ui-text-toned)">
        Moje zápisky, shrnutí, pojmy a okruhy k vybraným předmětům. Vznikají s pomocí AI z
        dostupných podkladů a jsou upravené tak, aby se v nich dalo rychle hledat a opakovat si
        látku.
      </p>
      <div class="mt-6 flex flex-wrap items-center gap-2">
        <UButton to="/courses" color="primary" trailing-icon="i-lucide-arrow-right">
          Procházet předměty
        </UButton>
        <UButton color="neutral" variant="outline" icon="i-lucide-search" @click="openSearch">
          Hledat
          <ClientOnly>
            <UKbd value="meta" class="ml-1" />
            <UKbd value="K" />
            <template #fallback>
              <span class="ml-1 font-mono text-[10px]">⌘ K</span>
            </template>
          </ClientOnly>
        </UButton>
      </div>
    </section>

    <HomeStatsBar />

    <section class="grid gap-8 py-10 md:grid-cols-3">
      <div>
        <div class="mb-3 flex items-center justify-between">
          <h3 class="section-label">Předměty</h3>
          <NuxtLink
            :to="wikiUrl.courses()"
            class="text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted)"
          >
            Vše →
          </NuxtLink>
        </div>
        <ul class="space-y-2">
          <li v-for="c in courseList" :key="c.slug">
            <div
              class="relative flex items-center gap-3 rounded p-2 transition-colors hover:bg-(--ui-bg-elevated)"
            >
              <NuxtLink
                :to="wikiUrl.page(c.slug)"
                :aria-label="c.title"
                class="absolute inset-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--ui-color-primary-500)"
              />
              <CoursePill class="relative" :slug="c.slug" :accent="c.firstTag" />
              <span class="truncate text-sm">{{ c.title }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <div class="mb-3 flex items-center justify-between">
          <h3 class="section-label">Poslední úpravy</h3>
          <NuxtLink
            to="/recent"
            class="text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted)"
          >
            Vše →
          </NuxtLink>
        </div>
        <ul class="space-y-1">
          <li v-for="r in recent" :key="r.path">
            <RecentRow :path="r.path" :title="r.title" :updated="r.updated" :page="r.raw" />
          </li>
        </ul>
      </div>

      <div>
        <div class="mb-3 flex items-center justify-between">
          <h3 class="section-label">Témata</h3>
          <NuxtLink
            to="/tags"
            class="text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted)"
          >
            Vše →
          </NuxtLink>
        </div>
        <div class="flex flex-wrap gap-2">
          <TagPill v-for="t in tagList" :key="t.tag" :tag="t.tag" :count="t.count" />
        </div>
      </div>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import { resolveCourses, toISODate } from '~/utils/frontmatter'
import { pathFor, slugFromPath, wikiUrl } from '#shared/wiki-routes'

usePageSeo({
  title: 'fpwiki — zápisky k vybraným předmětům FP VUT',
  description:
    'Moje zápisky, shrnutí, pojmy a okruhy k vybraným magisterským předmětům na FP VUT. Vyhledávání a propojené stránky.',
  path: '/',
  appendSiteName: false,
})

const searchOpen = useState('app-search-open', () => false)
const openSearch = () => {
  searchOpen.value = true
}

const { data: courses } = await useAsyncData('home-courses', () =>
  queryCollection('courses').order('title', 'ASC').all(),
)

const { data: recentPages } = await useAsyncData('home-recent', async () => {
  const all = await Promise.all([
    queryCollection('topics').order('updated', 'DESC').all(),
    queryCollection('summaries').order('updated', 'DESC').all(),
    queryCollection('outputs').order('updated', 'DESC').all(),
  ])
  return all
    .flat()
    .sort((a, b) => String(b.updated ?? '').localeCompare(String(a.updated ?? '')))
    .slice(0, 6)
})

const courseList = computed(
  () =>
    courses.value?.map((c) => ({
      slug: resolveCourses(c)[0] ?? slugFromPath(c.path),
      title: c.title,
      firstTag: c.tags?.[0] ?? 'ekonomie',
    })) ?? [],
)

const recent = computed(
  () =>
    recentPages.value?.map((p) => ({
      path: pathFor({ path: p.path ?? undefined }),
      title: p.title,
      updated: toISODate(p.updated) ?? '',
      raw: { course: p.course, courses: p.courses } as {
        course?: string | string[]
        courses?: string | string[]
      },
    })) ?? [],
)

const tagList = computed(() => {
  const counts = new Map<string, number>()
  for (const list of [courses.value ?? []]) {
    for (const page of list) {
      for (const t of page.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
})
</script>
