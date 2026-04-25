<template>
  <article class="max-w-3xl">
    <!-- Card-style header for course pages. Topics/summaries/outputs use a
         lighter inline header below — the design's "card hero" pattern is
         specifically for course-overview surfaces. -->
    <header v-if="isCourse" class="course-hero mb-8 rounded-xl border p-6 sm:p-8" :style="hueVars">
      <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <CoursePill :slug="primaryCourse ?? ''" big />
        <span class="text-(--ui-text-muted)">
          Magistr · {{ zapiskuLabel }}<span v-if="firstTag"> · #{{ firstTag }}</span>
        </span>
      </div>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ page.title }}</h1>
      <p class="mt-2 text-sm text-(--ui-text-toned)">
        <span v-if="updatedDisplay">Aktualizováno {{ updatedDisplay }} · </span>
        AI-generováno z přednášek a literatury · ručně ověřeno
      </p>
      <div class="mt-5">
        <WikiActionBar
          :slug="primaryCourse ?? ''"
          is-course
          :has-detail-predmetu="stats.hasDetailPredmetu"
        />
      </div>
    </header>

    <header v-else class="mb-6 border-b border-(--ui-border) pb-5">
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

    <!-- Témata section (course pages only): curated topic list with 1-line
         descriptions sourced from _index.md, links to each topic. -->
    <section v-if="isCourse && courseTopics.length" class="mb-10">
      <div class="mb-3 flex items-baseline gap-2">
        <h2 class="text-lg font-semibold">Témata</h2>
        <span class="text-xs text-(--ui-text-muted)">{{ courseTopics.length }} položek</span>
      </div>
      <ul class="space-y-2">
        <li v-for="t in courseTopics" :key="t.slug">
          <TopicListItem
            :path="t.path"
            :title="t.title"
            :description="t.description"
            icon="i-lucide-file-text"
          />
        </li>
      </ul>
    </section>

    <div class="prose prose-paper dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>

<script setup lang="ts">
/**
 * Type-switch render component. New page-types are added HERE, not by adding
 * new routes. Course pages get a richer card-style hero (with action bar);
 * topics/summaries/outputs get the inline header.
 */
import type { WikiPageType } from '#shared/types/wiki'
import { pathFor } from '#shared/wiki-routes'
import { resolveCourses, toISODate } from '~/utils/frontmatter'
import { typeLabel } from '~/utils/labels'
import { courseHueVars } from '~/utils/course-hue'

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

const isCourse = computed(() => props.page.type === 'course')
const primaryCourse = computed(() => courses.value[0])
const firstTag = computed(() => props.page.tags?.[0])

const stats = useCourseStats(() => primaryCourse.value ?? '')

function pluralize(n: number): string {
  if (n === 1) return '1 zápisek'
  if (n >= 2 && n <= 4) return `${n} zápisky`
  return `${n} zápisků`
}

const zapiskuLabel = computed(() => pluralize(stats.value.zapisku))

const hueVars = computed(() => courseHueVars(firstTag.value))

// Topics for this course — curated list shown above the prose body. Sourced
// from the topics collection where (course || courses) includes the current
// course slug. 1-line descriptions come from the slug-index (which parses
// _index.md upstream).
const { descriptionFor } = useWikiSlugIndex()

const { data: courseTopicsData } = useAsyncData(
  () => `course-topics-${primaryCourse.value ?? ''}`,
  async () => {
    const slug = primaryCourse.value
    if (!slug || !isCourse.value) return []
    const topics = await queryCollection('topics').all()
    return topics.filter((t) => resolveCourses(t).includes(slug))
  },
  {
    default: () => [],
    watch: [() => primaryCourse.value, () => isCourse.value],
  },
)

const courseTopics = computed(() => {
  const list = courseTopicsData.value ?? []
  return list.map((t) => {
    const slug = (t.stem ?? '').split('/').pop() ?? ''
    return {
      slug,
      title: t.title,
      description: descriptionFor(slug),
      path: pathFor({ path: t.path ?? undefined, collection: 'topics' }),
    }
  })
})
</script>

<style>
.course-hero {
  background: var(--course-hue-bg);
  border-color: color-mix(in oklab, var(--course-hue-dot) 30%, transparent);
}
.dark .course-hero {
  /* Same hue but flipped for dark theme — translucent tint over base bg
     instead of the light pastel, keeping the title legible. */
  background: color-mix(in oklab, var(--course-hue-dot) 18%, transparent);
  border-color: color-mix(in oklab, var(--course-hue-dot) 50%, transparent);
}
</style>
