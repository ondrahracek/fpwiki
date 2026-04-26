<template>
  <nav class="space-y-7 text-sm" aria-label="Hlavní navigace">
    <section>
      <h2 class="section-label mb-2">Navigace</h2>
      <ul class="space-y-1">
        <li v-for="link in primaryLinks" :key="link.key">
          <NuxtLink
            :to="link.to"
            :class="[
              'flex items-center gap-2 rounded px-2 py-1.5 hover:bg-(--ui-bg-elevated)',
              activeKey === link.key
                ? 'bg-(--ui-bg-elevated) font-medium text-(--ui-text-highlighted)'
                : 'text-(--ui-text-toned)',
            ]"
          >
            <UIcon :name="link.icon" class="size-3.5 text-(--ui-text-muted)" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="section-label mb-2">Předměty</h2>
      <ul class="space-y-1">
        <li v-for="c in courseRows" :key="c.slug">
          <NuxtLink
            :to="wikiUrl.page(c.slug)"
            :class="[
              'flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)',
              c.isCurrent ? 'bg-(--ui-bg-elevated) font-medium' : '',
            ]"
          >
            <span class="flex items-center gap-2 truncate">
              <span class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: c.dot }" />
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

    <section>
      <h2 class="section-label mb-2">Štítky</h2>
      <ul class="space-y-1">
        <li v-for="t in tagRows" :key="t.tag">
          <NuxtLink
            :to="wikiUrl.tag(t.tag)"
            :class="[
              'flex items-center justify-between rounded px-2 py-1 hover:bg-(--ui-bg-elevated)',
              activeTag === t.tag ? 'bg-(--ui-bg-elevated) font-medium' : '',
            ]"
          >
            <span class="flex items-center gap-2 truncate">
              <span class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: t.dot }" />
              <span class="truncate">#{{ t.tag }}</span>
            </span>
            <span class="text-xs text-(--ui-text-muted)">{{ t.count }}</span>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink
        to="/tags"
        class="mt-2 block text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted)"
      >
        Všechny štítky →
      </NuxtLink>
    </section>

    <section>
      <h2 class="section-label mb-2">O bázi</h2>
      <ul class="space-y-1">
        <li>
          <NuxtLink
            to="/about/jak-vznika-obsah"
            :class="[
              'flex items-center gap-2 rounded px-2 py-1 hover:bg-(--ui-bg-elevated)',
              activeKey === 'about' ? 'bg-(--ui-bg-elevated) font-medium' : '',
            ]"
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
const { $identityColor } = useNuxtApp()

const primaryLinks = [
  { key: 'home', to: '/', label: 'Domů', icon: 'i-lucide-home' },
  { key: 'courses', to: '/courses', label: 'Předměty', icon: 'i-lucide-book' },
  { key: 'tags', to: '/tags', label: 'Štítky', icon: 'i-lucide-tag' },
  { key: 'recent', to: '/recent', label: 'Nedávné', icon: 'i-lucide-clock' },
] as const

type ActiveKey = (typeof primaryLinks)[number]['key'] | 'wiki' | 'about' | null

// Map every route to a single activeKey so highlighting is unambiguous.
// /tags and /tag/:slug both light up the "Štítky" primary link; /wiki/:slug
// has no primary highlight (the active course in the Předměty section below
// carries the indicator instead).
const activeKey = computed<ActiveKey>(() => {
  const p = route.path
  if (p === '/') return 'home'
  if (p === '/courses') return 'courses'
  if (p === '/tags' || p.startsWith('/tag/')) return 'tags'
  if (p === '/recent') return 'recent'
  if (p.startsWith('/wiki/')) return 'wiki'
  if (p.startsWith('/about/')) return 'about'
  return null
})

const activeCourseSlug = computed(() =>
  route.path.startsWith('/wiki/') ? String(route.params.slug ?? '') : '',
)

const activeTag = computed(() =>
  route.path.startsWith('/tag/') ? decodeURIComponent(String(route.params.slug ?? '')) : '',
)

const { data: courses } = await useCoursesWithStats()
const { data: tagCounts } = await useTagCounts()

const courseRows = computed(() =>
  (courses.value ?? []).map((c) => ({
    slug: c.slug,
    // "Matematická ekonomie (ImeK)" → "Matematická ekonomie" — drop trailing code.
    shortTitle: (c.title ?? c.slug).replace(/\s*\([A-Za-z]+\)\s*$/, ''),
    count: c.count,
    isCurrent: c.slug === activeCourseSlug.value,
    dot: $identityColor(c.slug).dot,
  })),
)

const tagRows = computed(() =>
  (tagCounts.value ?? []).slice(0, 12).map((t) => ({ ...t, dot: $identityColor(t.tag).dot })),
)
</script>
