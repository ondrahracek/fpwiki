<template>
  <ul v-if="related.length" class="space-y-0.5">
    <li v-for="r in related" :key="r.slug">
      <NuxtLink
        :to="r.path"
        class="block rounded px-2 py-1 text-xs text-(--ui-text-muted) hover:bg-(--ui-bg-elevated) hover:text-(--ui-text)"
      >
        <span aria-hidden="true">→</span> {{ r.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { WikiCollectionName } from '#shared/types/wiki'
import { deriveRelated } from '~/utils/related'

const props = defineProps<{
  slug: string
  page: {
    stem?: string
    title?: string
    course?: string | string[]
    courses?: string | string[]
    tags?: string[]
  }
}>()
const emit = defineEmits<{ count: [n: number] }>()

// Auto-derive: same course + ≥2 shared tags. Course pages are excluded as
// candidates so a course never recommends itself or other courses (which it
// already lists in its Témata block).
//
// Dev-only cache opt-out mirrors pages/wiki/[slug].vue (Pitfall #11).
const { data: related } = await useAsyncData(
  () => `related-${props.slug}`,
  async () => {
    const collections: WikiCollectionName[] = ['topics', 'summaries', 'outputs']
    const lists = await Promise.all(collections.map((name) => queryCollection(name).all()))
    const candidates = collections.flatMap((name, i) =>
      (lists[i] ?? []).map((p) => ({ ...p, collection: name })),
    )
    return deriveRelated(props.page, candidates)
  },
  {
    default: () => [],
    watch: [() => props.slug],
    ...(import.meta.dev ? { getCachedData: () => undefined } : {}),
  },
)

watchEffect(() => emit('count', related.value.length))
</script>
