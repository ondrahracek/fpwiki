<template>
  <nav class="space-y-8 text-sm">
    <section>
      <h2 class="mb-2 text-xs font-semibold tracking-wider text-(--ui-text-muted) uppercase">
        Štítky
      </h2>
      <ul class="space-y-1">
        <li>
          <NuxtLink
            :to="wikiUrl.courses()"
            class="flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
            :class="{ 'bg-(--ui-bg-elevated) font-medium': !activeTag }"
          >
            <span>Všechny předměty</span>
            <span class="text-xs text-(--ui-text-muted)">{{ stats.courses }}</span>
          </NuxtLink>
        </li>
        <li v-for="t in tagOptions" :key="t.tag">
          <NuxtLink
            :to="wikiUrl.tag(t.tag)"
            class="flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
            :class="{ 'bg-(--ui-bg-elevated) font-medium': activeTag === t.tag }"
          >
            <span class="flex items-center gap-2 truncate">
              <span class="size-2 rounded-full" :style="{ backgroundColor: t.dot }" />
              <span>#{{ t.tag }}</span>
            </span>
            <span class="text-xs text-(--ui-text-muted)">{{ t.count }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="mb-2 text-xs font-semibold tracking-wider text-(--ui-text-muted) uppercase">
        Studium
      </h2>
      <div class="rounded px-2 py-1 font-medium text-(--ui-text-highlighted)">Magistr</div>
    </section>

    <section>
      <h2 class="mb-2 text-xs font-semibold tracking-wider text-(--ui-text-muted) uppercase">
        O bázi
      </h2>
      <ul class="space-y-1">
        <li>
          <NuxtLink
            to="/about/jak-vznika-obsah"
            class="flex items-center gap-2 rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
          >
            <UIcon name="i-lucide-book-open" class="size-3.5 text-(--ui-text-muted)" />
            <span>Jak vzniká obsah</span>
          </NuxtLink>
        </li>
        <li>
          <a
            href="https://github.com/ondrahracek/fpwiki"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
          >
            <UIcon name="i-simple-icons-github" class="size-3.5 text-(--ui-text-muted)" />
            <span>GitHub repo</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/ondrahracek/fpwiki/issues/new"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 rounded px-2 py-1 hover:bg-(--ui-bg-elevated)"
          >
            <UIcon name="i-lucide-flag" class="size-3.5 text-(--ui-text-muted)" />
            <span>Nahlásit nepřesnost</span>
          </a>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'

const route = useRoute()
const stats = useTotalStats()
const { $tagColor } = useNuxtApp()

const activeTag = computed(() => {
  if (route.path.startsWith('/tag/')) return decodeURIComponent(String(route.params.slug ?? ''))
  return ''
})

// Top tags by total page count across all collections.
const { data: tagCounts } = await useAsyncData('sidebar-tag-counts', async () => {
  const all = await Promise.all([
    queryCollection('courses').all(),
    queryCollection('topics').all(),
    queryCollection('summaries').all(),
    queryCollection('outputs').all(),
  ])
  const counts = new Map<string, number>()
  for (const list of all) {
    for (const p of list) {
      for (const t of p.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)
})

const tagOptions = computed(() =>
  (tagCounts.value ?? []).map((t) => ({
    ...t,
    dot: $tagColor(t.tag).dot,
  })),
)
</script>
