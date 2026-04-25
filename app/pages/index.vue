<template>
  <UContainer class="py-10">
    <DisclaimerBanner class="mb-8" />

    <section class="py-12 text-center sm:text-left">
      <h1 class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Znalostní báze
        <span class="block text-(--ui-color-secondary-500)">pro Fakultu podnikatelskou.</span>
      </h1>
      <p class="mt-4 max-w-2xl text-(--ui-text-toned)">
        Souhrn přednášek, vypracované okruhy, taháky a pojmy z magisterského studia — propojené jako
        v Obsidianu. Připraveno pomocí AI, ručně ověřeno, čteš zdarma.
      </p>
      <div class="mt-6 flex flex-wrap gap-2">
        <UButton to="/courses" color="primary" trailing-icon="i-lucide-arrow-right">
          Procházet předměty
        </UButton>
      </div>
    </section>

    <section v-if="overview?.body" class="prose prose-paper dark:prose-invert max-w-none py-6">
      <ContentRenderer :value="overview" />
    </section>

    <section class="grid gap-8 py-10 md:grid-cols-3">
      <div>
        <h3 class="mb-3 text-sm font-semibold tracking-wider text-(--ui-text-muted) uppercase">
          Předměty
        </h3>
        <ul class="space-y-2">
          <li v-for="c in courseList" :key="c.slug">
            <NuxtLink
              :to="wikiUrl.page(c.slug)"
              class="flex items-center gap-3 rounded p-2 hover:bg-(--ui-bg-elevated)"
            >
              <CoursePill :slug="c.slug" :accent="c.firstTag" />
              <span class="truncate text-sm">{{ c.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold tracking-wider text-(--ui-text-muted) uppercase">
          Nedávno upraveno
        </h3>
        <ul class="space-y-2">
          <li v-for="r in recent" :key="r.path">
            <NuxtLink :to="r.path" class="block rounded p-2 hover:bg-(--ui-bg-elevated)">
              <div class="text-sm font-medium">{{ r.title }}</div>
              <div class="text-xs text-(--ui-text-muted)">{{ r.updated }}</div>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold tracking-wider text-(--ui-text-muted) uppercase">
          Štítky
        </h3>
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

useSeoMeta({
  title: 'fpwiki — studentská znalostní báze FP VUT',
  ogTitle: 'fpwiki',
})

const { data: overview } = await useAsyncData('home-overview', () =>
  queryCollection('overview').first(),
)

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
