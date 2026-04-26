<template>
  <div>
    <Breadcrumb collection="overview" title="Nedávné" />
    <header class="mt-4 mb-6">
      <h1 class="text-[38px] leading-[1.1] font-semibold tracking-[-0.03em]">Nedávné</h1>
      <p class="mt-2 text-sm text-(--ui-text-muted)">
        {{ pluralize(items.length, 'zápisek', 'zápisky', 'zápisků') }} seřazených od nejnovějšího.
      </p>
    </header>

    <ul v-if="items.length" class="space-y-1">
      <li v-for="r in items" :key="r.path">
        <RecentRow :path="r.path" :title="r.title" :updated="r.updated" :page="r.raw" />
      </li>
    </ul>
    <p v-else class="text-(--ui-text-muted)">Zatím tu nic není.</p>
  </div>
</template>

<script setup lang="ts">
import { pathFor } from '#shared/wiki-routes'
import { toISODate } from '~/utils/frontmatter'

usePageSeo({
  title: 'Nedávné',
  description: 'Nedávno upravené zápisky a témata na fpwiki.',
  path: '/recent',
})

// Dev-only cache opt-out — see app/pages/wiki/[slug].vue for rationale.
const { data: pages } = await useAsyncData(
  'recent-list',
  async () => {
    const all = await Promise.all([
      queryCollection('topics').order('updated', 'DESC').all(),
      queryCollection('summaries').order('updated', 'DESC').all(),
      queryCollection('outputs').order('updated', 'DESC').all(),
      queryCollection('courses').order('updated', 'DESC').all(),
    ])
    return all
      .flat()
      .sort((a, b) => String(b.updated ?? '').localeCompare(String(a.updated ?? '')))
      .slice(0, 50)
  },
  import.meta.dev ? { getCachedData: () => undefined } : undefined,
)

const items = computed(
  () =>
    pages.value?.map((p) => ({
      path: pathFor({ path: p.path ?? undefined }),
      title: p.title,
      updated: toISODate(p.updated) ?? '',
      raw: { course: p.course, courses: p.courses } as {
        course?: string | string[]
        courses?: string | string[]
      },
    })) ?? [],
)

function pluralize(n: number, one: string, few: string, many: string): string {
  if (n === 1) return `${n} ${one}`
  if (n >= 2 && n <= 4) return `${n} ${few}`
  return `${n} ${many}`
}
</script>
