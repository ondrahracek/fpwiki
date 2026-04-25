<template>
  <UContainer class="max-w-3xl py-10">
    <article>
      <h1 class="mb-4 text-3xl font-semibold tracking-tight">Jak vzniká fpwiki</h1>

      <img
        src="/images/jak-vznika-fpwiki.webp"
        alt="Jak vzniká fpwiki"
        class="mb-6 w-full rounded-lg"
      />

      <p class="text-lg text-(--ui-text-toned)">
        fpwiki je moje neoficiální studijní wiki k vybraným předmětům na FP VUT v Brně. Není to
        komunitní projekt ani kompletní katalog všech předmětů. Najdeš tu hlavně materiály, které
        jsem si sám zpracoval při studiu.
      </p>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Odkud obsah vychází</h2>
      <p class="text-(--ui-text)">
        Zápisky vznikají z dostupných studijních podkladů — například z přednášek, sylabů, učebnic,
        PDF materiálů, vlastních poznámek a dalších zdrojů, které se k danému předmětu hodí. Některé
        podklady jsou oficiální, jiné neoficiální nebo doplňkové. Cílem není opisovat jeden zdroj,
        ale dát látku dohromady tak, aby se v ní dalo rychleji zorientovat.
      </p>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Jakou roli má AI</h2>
      <p class="text-(--ui-text)">
        K tvorbě a úpravě zápisků používám AI. Pomáhá mi hlavně se shrnutím delších materiálů,
        vytahováním důležitých pojmů, hledáním souvislostí a převodem poznámek do čitelnější podoby.
        AI ale není autoritou sama o sobě — výstupy procházím, upravuju a doplňuju podle toho, co
        dává smysl.
      </p>

      <p class="mt-4 text-(--ui-text)">
        I tak se může stát, že v textu zůstane chyba, nepřesnost nebo chybějící kontext. Ber proto
        fpwiki jako pomůcku ke studiu, ne jako jediný zdroj pravdy ke zkoušce.
      </p>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Co tu najdeš</h2>
      <ul class="list-disc space-y-2 pl-6 text-(--ui-text)">
        <li>zápisky k vybraným předmětům, které jsem zpracoval,</li>
        <li>shrnutí delších materiálů,</li>
        <li>vysvětlení pojmů a témat,</li>
        <li>propojení mezi souvisejícími stránkami,</li>
        <li>okruhy a poznámky užitečné při opakování látky.</li>
      </ul>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Co fpwiki není</h2>
      <ul class="list-disc space-y-2 pl-6 text-(--ui-text)">
        <li>není to oficiální web ani oficiální materiál FP VUT,</li>
        <li>není to úplný seznam všech předmětů,</li>
        <li>není to náhrada přednášek, skript nebo pokynů od vyučujících,</li>
        <li>není zaručené, že každý text je bezchybný nebo aktuální.</li>
      </ul>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Proč je obsah výběrový</h2>
      <p class="text-(--ui-text)">
        fpwiki roste postupně. Přidávám hlavně to, co právě zpracovávám nebo co mi přišlo užitečné
        mít na jednom místě. Pokud tu některý předmět, téma nebo zdroj chybí, neznamená to, že není
        důležitý — jen jsem ho zatím nezpracoval.
      </p>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Veřejná část projektu</h2>
      <p class="text-(--ui-text)">
        Veřejně dostupné jsou hotové stránky na webu a kód webové aplikace. Surové zdroje, pracovní
        poznámky, původní PDF soubory a další podklady nejsou součástí veřejného webu.
      </p>

      <p class="mt-6 text-(--ui-text)">
        Kód webové aplikace je veřejný:
        <a
          href="https://github.com/ondrahracek/fpwiki"
          target="_blank"
          rel="noopener"
          class="text-(--ui-color-primary-500) underline hover:text-(--ui-color-primary-600)"
        >
          github.com/ondrahracek/fpwiki
        </a>
        .
      </p>
    </article>
  </UContainer>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'Jak vzniká fpwiki',
  description:
    'Jak vznikají materiály na fpwiki, jakou roli má AI a proč obsah slouží hlavně jako neoficiální pomůcka ke studiu.',
  path: '/about/jak-vznika-obsah',
})
</script>
