<template>
  <UApp :locale="csLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { cs } from '@nuxt/ui/locale'
import { wikiUrl } from '#shared/wiki-routes'

const csLocale = cs

// Site-wide head defaults. Per-page tags (title, description, og:url,
// og:title, og:description, og:type, canonical) are emitted by
// app/composables/usePageSeo.ts — do not duplicate them here.
const config = useRuntimeConfig()
const ogImageAbs = wikiUrl.absolute(config.public.siteUrl as string, wikiUrl.ogImage())

useSeoMeta({
  ogSiteName: 'fpwiki',
  ogLocale: 'cs_CZ',
  ogImage: ogImageAbs,
  ogImageSecureUrl: ogImageAbs,
  ogImageType: 'image/png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'fpwiki — zápisky k vybraným předmětům FP VUT',
  twitterCard: 'summary_large_image',
  twitterImage: ogImageAbs,
  twitterImageAlt: 'fpwiki — zápisky k vybraným předmětům FP VUT',
  robots: 'index, follow',
})
</script>
