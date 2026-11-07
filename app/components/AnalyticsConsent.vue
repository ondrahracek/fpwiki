<template>
  <aside
    v-if="showNotice"
    aria-label="Měření návštěvnosti"
    class="fixed right-3 bottom-3 left-3 z-30 mx-auto max-w-sm rounded-xl border border-(--ui-border) bg-(--ui-bg) p-3 sm:right-5 sm:bottom-5 sm:left-auto sm:p-4"
  >
    <h2 class="text-sm font-semibold text-(--ui-text-highlighted)">Pomůžeš mi vylepšit fpwiki?</h2>
    <p class="mt-2 text-sm leading-5 text-(--ui-text-toned)">
      Google Analytics mi ukáže, které zápisky a odkazy studenti používají.
      <NuxtLink
        to="/about/soukromi"
        class="font-medium text-(--ui-link) underline underline-offset-3"
      >
        Jak měření funguje
      </NuxtLink>
    </p>
    <div class="mt-3 grid grid-cols-2 gap-2">
      <UButton color="neutral" variant="outline" block class="min-h-11" @click="$analytics.deny()">
        Odmítnout
      </UButton>
      <UButton color="neutral" variant="outline" block class="min-h-11" @click="$analytics.grant()">
        Povolit měření
      </UButton>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { $analytics } = useNuxtApp()
const showNotice = computed(
  () => $analytics.preferencesOpen.value || $analytics.consent.value === undefined,
)
</script>
