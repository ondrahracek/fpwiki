<template>
  <div class="flex flex-wrap items-center gap-2">
    <UButton
      v-if="startTarget"
      :to="startTarget"
      color="primary"
      trailing-icon="i-lucide-arrow-right"
    >
      Začít od začátku
    </UButton>
    <ClientOnly>
      <UButton
        :icon="isFavorited ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark'"
        :variant="isFavorited ? 'soft' : 'outline'"
        color="neutral"
        :aria-pressed="isFavorited"
        @click="toggleFavorite"
      >
        {{ isFavorited ? 'Sleduji' : 'Sledovat' }}
      </UButton>
      <template #fallback>
        <UButton icon="i-lucide-bookmark" variant="outline" color="neutral" disabled>
          Sledovat
        </UButton>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { wikiUrl } from '#shared/wiki-routes'

const props = defineProps<{
  /** Slug of the course (or page in general) — used as the favorites key. */
  slug: string
  /** When true, the page is a course and "Začít od začátku" should appear. */
  isCourse?: boolean
  /** Whether <slug>-detail-predmetu exists (drives the Začít button). */
  hasDetailPredmetu?: boolean
}>()

const favorites = useFavorites()
const isFavorited = computed(() => favorites.has(props.slug))
const toggleFavorite = () => favorites.toggle(props.slug)

// "Začít od začátku" links to <slug>-detail-predmetu when it exists.
const startTarget = computed(() => {
  if (!props.isCourse || !props.hasDetailPredmetu) return null
  return wikiUrl.page(`${props.slug}-detail-predmetu`)
})
</script>
