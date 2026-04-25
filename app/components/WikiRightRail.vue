<template>
  <div class="space-y-5">
    <!-- 1. Reading progress -->
    <section>
      <WikiProgressChip />
    </section>

    <!-- 2. Na této stránce (TOC) — only when h2+ headings exist -->
    <section v-if="tocLinks.length">
      <h4 class="section-label mb-1.5 px-2">Na této stránce</h4>
      <WikiTocCard :links="tocLinks" />
    </section>

    <!-- 3. Odkazuje sem (backlinks). The card itself emits its count so the
         heading can show "(N)" without forcing the rail to load the artefact. -->
    <section v-show="backlinkCount > 0">
      <h4 class="section-label mb-1.5 flex items-baseline gap-1.5 px-2">
        <span>Odkazuje sem</span>
        <span class="tracking-normal text-(--ui-text-muted) normal-case">·</span>
        <span class="tracking-normal text-(--ui-text-muted) normal-case">{{ backlinkCount }}</span>
      </h4>
      <WikiBacklinksCard :slug="slug" @count="backlinkCount = $event" />
    </section>

    <!-- 4. Související — auto-derived; suppressed for course pages (their
         Témata block already covers this need) and when the derivation is
         empty. -->
    <section v-if="!isCourse" v-show="relatedCount > 0">
      <h4 class="section-label mb-1.5 px-2">Související</h4>
      <WikiRelatedCard :slug="slug" :page="page" @count="relatedCount = $event" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import type { WikiPageType } from '#shared/types/wiki'

const props = defineProps<{
  slug: string
  tocLinks: TocLink[]
  page: {
    stem?: string
    title?: string
    type?: WikiPageType
    course?: string | string[]
    courses?: string | string[]
    tags?: string[]
  }
}>()

const isCourse = computed(() => props.page.type === 'course')
const backlinkCount = ref(0)
const relatedCount = ref(0)
</script>
