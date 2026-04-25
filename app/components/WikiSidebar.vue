<template>
  <nav class="space-y-6 text-sm">
    <section v-if="activeCourse">
      <CoursePill :slug="activeCourse.slug" :accent="activeCourse.firstTag" big />
      <div class="mt-2 text-sm font-medium text-(--ui-text-highlighted)">
        {{ activeCourse.title }}
      </div>
      <div v-if="activeCourse.firstTag" class="mt-1 text-xs text-(--ui-text-muted)">
        #{{ activeCourse.firstTag }}
      </div>
    </section>

    <section>
      <h2 class="section-label mb-2">Předměty</h2>
      <ul class="space-y-1">
        <li v-for="c in courseOptions" :key="c.slug">
          <NuxtLink
            :to="wikiUrl.page(c.slug)"
            class="flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
            :class="{ 'bg-(--ui-bg-elevated) font-medium': c.isCurrent }"
          >
            <span class="flex items-center gap-2 truncate">
              <span class="size-2 rounded-full" :style="{ backgroundColor: c.dot }" />
              <span class="truncate">{{ c.shortTitle }}</span>
            </span>
            <span class="text-xs text-(--ui-text-muted)">{{ c.count }}</span>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink
        :to="wikiUrl.courses()"
        class="mt-2 block text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted)"
      >
        Všechny předměty →
      </NuxtLink>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'
import { resolveCourses } from '~/utils/frontmatter'

const route = useRoute()
const { $tagColor } = useNuxtApp()

// Single combined query so each course's zápisků count comes from one walk.
const { data: bundle } = await useAsyncData('sidebar-courses-with-stats', async () => {
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

const courseOptions = computed(() => {
  const list = bundle.value?.courses ?? []
  const counts = bundle.value?.counts ?? {}
  const currentSlug = String(route.params.slug ?? '')
  return list.map((c) => {
    const slug = resolveCourses(c)[0] ?? c.stem ?? ''
    const firstTag = c.tags?.[0] ?? 'ekonomie'
    // "Matematická ekonomie (ImeK)" → "Matematická ekonomie" — drop trailing code.
    const shortTitle = (c.title ?? slug).replace(/\s*\([A-Za-z]+\)\s*$/, '')
    return {
      slug,
      title: c.title ?? slug,
      shortTitle,
      firstTag,
      count: counts[slug] ?? 0,
      isCurrent: slug === currentSlug,
      dot: $tagColor(firstTag).dot,
    }
  })
})

const activeCourse = computed(() => courseOptions.value.find((c) => c.isCurrent))
</script>
