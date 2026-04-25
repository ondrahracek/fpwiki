<template>
  <nav v-if="flatLinks.length" aria-label="Na této stránce" class="text-xs">
    <ul class="space-y-0.5 border-l border-(--ui-border)">
      <li v-for="link in flatLinks" :key="link.id" :class="link.depth >= 3 ? 'ml-3' : ''">
        <a
          :href="`#${link.id}`"
          :class="[
            'block rounded-r px-2 py-1 hover:bg-(--ui-bg-elevated) hover:text-(--ui-text)',
            activeIds.includes(link.id)
              ? '-ml-px border-l-2 border-(--color-fp-purple-500) pl-[calc(0.5rem-1px)] font-medium text-(--ui-text)'
              : 'text-(--ui-text-muted)',
          ]"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const props = defineProps<{ links: TocLink[] }>()

interface FlatTocLink {
  id: string
  text: string
  depth: number
}

function flatten(links: TocLink[] | undefined): FlatTocLink[] {
  if (!links) return []
  const out: FlatTocLink[] = []
  for (const l of links) {
    out.push({ id: l.id, text: l.text, depth: l.depth })
    if (l.children?.length) out.push(...flatten(l.children))
  }
  return out
}

const flatLinks = computed(() => flatten(props.links))
const activeIds = ref<string[]>([])

// Active-section tracking via IntersectionObserver. The headings live inside
// <ContentRenderer> in a sibling subtree that finishes mounting AFTER this
// component, so observing once at our own mount catches none of them. We
// stand up the IntersectionObserver immediately and use a MutationObserver on
// <article> to attach to each heading as it shows up.
const visibleHeadings = new Map<string, number>() // id -> insertion order
let intersection: IntersectionObserver | null = null
let mutation: MutationObserver | null = null
const observedIds = new Set<string>()

function refreshActive() {
  if (!visibleHeadings.size) {
    activeIds.value = []
    return
  }
  let bestId: string | null = null
  let bestTop = Number.POSITIVE_INFINITY
  for (const id of visibleHeadings.keys()) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top
    if (top < bestTop) {
      bestTop = top
      bestId = id
    }
  }
  activeIds.value = bestId ? [bestId] : []
}

function ensureIntersection() {
  if (intersection) return
  intersection = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id
        if (!id) continue
        if (entry.isIntersecting) visibleHeadings.set(id, performance.now())
        else visibleHeadings.delete(id)
      }
      refreshActive()
    },
    // Activate when the heading enters the top quarter of the viewport — gives
    // a stable single highlight tied to the section the reader is on.
    { rootMargin: '-72px 0px -60% 0px', threshold: 0 },
  )
}

function syncObserved() {
  ensureIntersection()
  if (!intersection) return
  // Add any newly-resolvable headings. Don't re-observe already-tracked ones.
  for (const link of flatLinks.value) {
    if (observedIds.has(link.id)) continue
    const el = document.getElementById(link.id)
    if (!el) continue
    intersection.observe(el)
    observedIds.add(link.id)
  }
}

function teardown() {
  intersection?.disconnect()
  intersection = null
  mutation?.disconnect()
  mutation = null
  observedIds.clear()
  visibleHeadings.clear()
}

onMounted(() => {
  syncObserved()
  // Watch the document for added headings (MDC content mounts async).
  const root = document.querySelector('article') ?? document.body
  mutation = new MutationObserver(() => syncObserved())
  mutation.observe(root, { childList: true, subtree: true })
  window.addEventListener('scroll', refreshActive, { passive: true })
})

onBeforeUnmount(() => {
  teardown()
  window.removeEventListener('scroll', refreshActive)
})

// If the page navigates to another /wiki/:slug, the link list changes — start
// fresh.
watch(
  () => flatLinks.value.map((l) => l.id).join('|'),
  () => {
    if (!import.meta.client) return
    teardown()
    syncObserved()
    const root = document.querySelector('article') ?? document.body
    mutation = new MutationObserver(() => syncObserved())
    mutation.observe(root, { childList: true, subtree: true })
  },
)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}
</script>
