<template>
  <div class="flex min-h-screen flex-col bg-(--ui-bg)">
    <AppHeader />
    <main class="flex-1">
      <slot v-if="noAside" />
      <UContainer v-else class="py-6 lg:py-10" :class="containerWidthClass">
        <div class="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
          <aside class="hidden lg:block">
            <div class="sticky top-20">
              <AppPrimaryNav />
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
          <AppPrimaryNav />
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileOpen = useMobileNavOpen()

// Pages opt out of the desktop aside via `definePageMeta({ noAside: true })`.
// The mobile slideover stays mounted regardless so the hamburger always works.
// Used today by `/` (centred hero) and `/about/*` (centred article); each of
// those pages owns its own <UContainer>, so the layout collapses to a bare
// <slot/> in that mode.
const noAside = computed(() => Boolean(route.meta.noAside))

// Close the slideover on route change so the user lands cleanly on the new page.
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)

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
