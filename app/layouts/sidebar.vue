<template>
  <div class="flex min-h-screen flex-col bg-(--ui-bg)">
    <AppHeader show-menu-trigger />
    <main class="flex-1">
      <UContainer class="py-6 lg:py-10" :class="containerWidthClass">
        <div class="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
          <aside class="hidden lg:block">
            <div class="sticky top-20">
              <component :is="sidebarComponent" />
            </div>
          </aside>
          <div class="min-w-0">
            <slot />
          </div>
        </div>
      </UContainer>
    </main>
    <AppFooter />

    <USlideover v-model:open="mobileOpen" side="left" :ui="{ content: 'max-w-xs' }">
      <template #content>
        <div class="h-full overflow-y-auto p-6">
          <component :is="sidebarComponent" />
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import CoursesSidebar from '~/components/CoursesSidebar.vue'
import WikiSidebar from '~/components/WikiSidebar.vue'
import TagsSidebar from '~/components/TagsSidebar.vue'

const route = useRoute()

const mobileOpen = useState('sidebar-mobile-open', () => false)

// Close the slideover on route change so the user lands cleanly on the new page.
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)

const sidebarComponent = computed(() => {
  const path = route.path
  if (path === '/courses') return CoursesSidebar
  if (path.startsWith('/wiki/')) return WikiSidebar
  if (path.startsWith('/tag/') || path === '/tags') return TagsSidebar
  if (path === '/recent') return CoursesSidebar
  return CoursesSidebar
})

// Per-page wrap width via the --ui-container CSS variable that UContainer reads.
//   `/courses`    → 1100px (already tighter for the index)
//   `/wiki/<slug>`→ 90rem (≈1440px) so the right rail can land at xl: while
//                   keeping the article column at a comfortable ~820px
//   others        → default 80rem
const containerWidthClass = computed(() => {
  if (route.path === '/courses') return '[--ui-container:1100px]'
  if (route.path.startsWith('/wiki/')) return '[--ui-container:90rem]'
  return ''
})
</script>
