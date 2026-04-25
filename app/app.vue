<template>
  <UApp :locale="csLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { cs } from '@nuxt/ui/locale'

const csLocale = cs
</script>
