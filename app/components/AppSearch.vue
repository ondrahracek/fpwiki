<template>
  <UModal
    v-model:open="model"
    :ui="{ content: 'max-w-2xl', body: 'p-0' }"
    title="Hledat"
    :close="{ color: 'neutral', variant: 'ghost' }"
  >
    <template #body>
      <div class="flex items-center gap-2 border-b border-(--ui-border) px-4 py-3">
        <UIcon name="i-lucide-search" class="size-4 text-(--ui-text-dimmed)" />
        <input
          ref="inputEl"
          v-model="query"
          type="text"
          placeholder="Hledat zápisky a předměty…"
          class="flex-1 bg-transparent text-sm outline-none placeholder:text-(--ui-text-dimmed)"
          @keydown.escape="close"
        />
        <UBadge variant="outline" color="neutral" size="sm">{{ engine }}</UBadge>
      </div>

      <div class="max-h-[60vh] overflow-y-auto p-2">
        <ul v-if="hits.length" class="space-y-1">
          <li v-for="hit in hits" :key="hit.section.id">
            <NuxtLink
              :to="pathFor({ path: hit.section.id, collection: hit.section.collection })"
              class="flex flex-col gap-1 rounded-md px-3 py-2 hover:bg-(--ui-bg-elevated)"
              @click="close"
            >
              <div class="flex items-center gap-2">
                <UBadge size="sm" color="neutral" variant="soft">{{
                  hit.section.collection
                }}</UBadge>
                <span class="text-sm font-medium">{{ hit.section.title }}</span>
              </div>
              <p v-if="hit.section.content" class="line-clamp-2 text-xs text-(--ui-text-muted)">
                {{ hit.section.content }}
              </p>
            </NuxtLink>
          </li>
        </ul>
        <div v-else-if="query" class="px-4 py-12 text-center text-sm text-(--ui-text-muted)">
          Nic nenalezeno pro „{{ query }}"
        </div>
        <div v-else class="px-4 py-12 text-center text-sm text-(--ui-text-dimmed)">
          Začněte psát…
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
/**
 * TODO(search-engine): Renders results from EITHER Fuse OR MiniSearch based on
 * useSearchEngine() value. After evaluation period:
 *   - keep one engine path
 *   - delete the other composable + the switch
 */
import type { WikiSearchSection } from '#shared/types/wiki'
import { pathFor } from '#shared/wiki-routes'

const model = defineModel<boolean>('open', { default: false })

const { data: sections } = await useAllSearchSections()
const safeSections = computed<WikiSearchSection[]>(() => sections.value ?? [])

const engine = useSearchEngine()
const fuse = useFuseSearch(safeSections)
const mini = useMinisearchSearch(safeSections)

const query = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

const hits = computed(() => {
  if (!query.value) return []
  return engine.value === 'fuse' ? fuse.search(query.value) : mini.search(query.value)
})

watch(model, (open) => {
  if (open) {
    query.value = ''
    nextTick(() => inputEl.value?.focus())
  }
})

const close = () => {
  model.value = false
}
</script>
