<template>
  <NuxtLayout>
    <UContainer class="py-24 text-center">
      <p class="text-sm font-medium text-(--ui-text-muted)">{{ error.statusCode }}</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight">{{ heading }}</h1>
      <p class="mt-3 text-(--ui-text-toned)">{{ subheading }}</p>
      <UButton class="mt-8" color="primary" variant="subtle" @click="handleClear">
        Zpět na úvod
      </UButton>
    </UContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const heading = computed(() => {
  if (props.error.statusCode === 404) return 'Stránka se nenašla'
  return 'Něco se pokazilo'
})

const subheading = computed(() => {
  if (props.error.statusCode === 404) return 'Hledaný materiál tu není nebo byl přesunut.'
  return props.error.message || 'Zkus stránku obnovit nebo se vrať na úvod.'
})

const handleClear = () => clearError({ redirect: '/' })
</script>
