<template>
  <UBreadcrumb :items="items" class="text-sm text-(--ui-text-muted)" />
</template>

<script setup lang="ts">
import type { WikiCollectionName } from '#shared/types/wiki'
import { wikiUrl } from '#shared/wiki-routes'
import { collectionPluralLabel } from '~/utils/labels'

const props = defineProps<{
  /** Page title for the last crumb. Falls back to slug. */
  title?: string
  /** Slug of the current page (for the last crumb). */
  slug?: string
  /** Collection of the current page — drives the middle crumb. */
  collection?: WikiCollectionName
  /** Optional: show a tag-style middle crumb instead (for /tag/:slug). */
  tagMode?: boolean
}>()

interface Crumb {
  label: string
  to?: string
}

const items = computed<Crumb[]>(() => {
  const out: Crumb[] = [{ label: 'fpwiki', to: wikiUrl.home() }]

  if (props.tagMode) {
    out.push({ label: 'Štítky', to: '/tags' })
    if (props.slug) out.push({ label: `#${props.slug}` })
    return out
  }

  if (props.collection === 'courses') {
    out.push({ label: 'Předměty', to: wikiUrl.courses() })
  } else if (props.collection && props.collection !== 'overview') {
    const label = collectionPluralLabel(props.collection)
    if (label) out.push({ label })
  }

  if (props.title || props.slug) {
    out.push({ label: props.title ?? props.slug ?? '' })
  }

  return out
})
</script>
