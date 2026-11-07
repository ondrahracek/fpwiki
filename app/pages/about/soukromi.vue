<template>
  <UContainer class="max-w-3xl py-10">
    <article
      class="prose max-w-none"
      :data-analytics-component="ANALYTICS_COMPONENTS.articleLinks"
      :data-analytics-placement="ANALYTICS_PLACEMENTS.article"
      :data-analytics-layout="ANALYTICS_LAYOUTS.inline"
    >
      <h1>Soukromí a měření návštěvnosti</h1>
      <p>
        fpwiki používá Google Analytics jen s tvým souhlasem. Měření mi pomáhá zjistit, které
        stránky, předměty a odkazy lidé používají. Správcem fpwiki jsem já, Ondra.
      </p>

      <h2>Co se měří</h2>
      <p>
        Po souhlasu se zaznamená návštěva veřejné stránky a použití označených odkazů. Událost
        obsahuje typ stránky, skupinu předmětu, část rozhraní a veřejný cíl odkazu. Neodesílám text
        hledání, obsah kódu, e-mailové adresy ani soukromé zdroje.
      </p>

      <h2>Kdo data zpracovává</h2>
      <p>
        Poskytovatelem měření je Google Analytics. Služba ukládá identifikátory do cookies. V tomto
        nastavení se data událostí uchovávají 2 měsíce a data uživatelů 14 měsíců.
      </p>

      <h2>Jak změnit volbu</h2>
      <p>
        Tlačítko znovu otevře nabídku měření. Udělený souhlas zůstane uložený. Předchozí odmítnutí
        se smaže, takže se nabídka zobrazí i po obnovení stránky.
      </p>
      <ClientOnly>
        <UButton color="neutral" variant="outline" @click="openPreferences">
          Nastavit měření
        </UButton>
        <template #fallback>
          <div class="min-h-9" aria-hidden="true" />
        </template>
      </ClientOnly>

      <h2>Kontakt</h2>
      <p>
        Dotaz můžeš poslat přes
        <a href="https://github.com/ondrahracek/fpwiki/issues/new">veřejný formulář na GitHubu</a>.
        Do formuláře nepiš citlivé údaje.
      </p>
    </article>
  </UContainer>
</template>

<script setup lang="ts">
import { ANALYTICS_COMPONENTS, ANALYTICS_LAYOUTS, ANALYTICS_PLACEMENTS } from '#shared/analytics'

definePageMeta({ noAside: true })

useAnalyticsPage(() => ({
  pageType: 'about',
  title: 'Soukromí a měření návštěvnosti',
}))

usePageSeo({
  title: 'Soukromí a měření návštěvnosti',
  description: 'Jak fpwiki používá Google Analytics a jak lze změnit souhlas s měřením.',
  path: '/about/soukromi',
})

const { $analytics: analytics } = useNuxtApp()

const openPreferences = () => {
  if (!analytics) return
  if (analytics.consent.value === 'v1:denied') analytics.consent.value = undefined
  analytics.preferencesOpen.value = true
}
</script>
