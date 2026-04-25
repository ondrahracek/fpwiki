<template>
  <header class="sticky top-0 z-20 border-b border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur">
    <div class="mx-auto flex max-w-screen-xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-7">
      <UButton
        v-if="showMenuTrigger"
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        class="lg:hidden"
        aria-label="Otevřít boční panel"
        @click="mobileSidebarOpen = true"
      />
      <NuxtLink to="/" class="flex items-center gap-2 text-base font-semibold tracking-tight">
        <img src="/icons/icon-cut-512.png" alt="" width="28" height="28" class="size-7" />
        <span class="text-(--ui-text-highlighted)">fpwiki</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 text-sm md:flex">
        <NuxtLink
          v-for="link in nav"
          :key="link.to"
          :to="link.to"
          class="rounded px-2.5 py-1.5 text-(--ui-text-muted) hover:text-(--ui-text-highlighted)"
          active-class="text-(--ui-text-highlighted) font-medium"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <UButton
        color="neutral"
        variant="outline"
        class="ml-auto hidden max-w-sm min-w-0 flex-1 justify-start sm:flex"
        :ui="{ base: 'gap-2' }"
        @click="searchOpen = true"
      >
        <UIcon name="i-lucide-search" class="size-4" />
        <span class="truncate text-(--ui-text-muted)">
          Hledat v zápiscích, pojmech a předmětech…
        </span>
        <span class="ms-auto flex items-center gap-1 text-xs text-(--ui-text-muted)">
          <ClientOnly>
            <UKbd value="meta" />
            <UKbd value="K" />
            <template #fallback>
              <span class="font-mono text-[10px]">⌘ K</span>
            </template>
          </ClientOnly>
        </span>
      </UButton>
      <UButton
        icon="i-lucide-search"
        color="neutral"
        variant="ghost"
        class="ml-auto sm:hidden"
        aria-label="Hledat"
        @click="searchOpen = true"
      />

      <ClientOnly>
        <UButton
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          color="neutral"
          variant="ghost"
          :aria-label="
            colorMode.value === 'dark' ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'
          "
          @click="toggleColorMode"
        />
        <template #fallback>
          <UButton icon="i-lucide-moon" color="neutral" variant="ghost" disabled />
        </template>
      </ClientOnly>
    </div>

    <ClientOnly>
      <LazyAppSearch v-model:open="searchOpen" />
    </ClientOnly>
  </header>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ showMenuTrigger?: boolean }>(), { showMenuTrigger: false })

const nav = [
  { to: '/', label: 'Domů' },
  { to: '/courses', label: 'Předměty' },
  { to: '/tags', label: 'Štítky' },
  { to: '/recent', label: 'Nedávné' },
]

const mobileSidebarOpen = useState('sidebar-mobile-open', () => false)

const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const searchOpen = useState('app-search-open', () => false)

defineShortcuts({
  meta_k: () => {
    searchOpen.value = true
  },
})
</script>
