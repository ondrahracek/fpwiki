<template>
  <UContainer class="max-w-3xl py-10">
    <article>
      <h1 class="mb-4 text-3xl font-semibold tracking-tight">Jak vzniká obsah</h1>
      <p class="text-lg text-(--ui-text-toned)">
        fpwiki je sbírka mých studijních zápisků k vybraným magisterským předmětům na FP VUT v Brně.
        Obsah vzniká s pomocí AI z dostupných oficiálních i neoficiálních podkladů a je ručně
        ověřen.
      </p>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Zdroje</h2>
      <p class="text-(--ui-text)">
        Materiály se připravují z přednášek, sylabů, učebnic a dalších studijních podkladů, které
        sleduji během studia. Každá stránka odkazuje na své zdroje (kniha, blok, PDF přednášky)
        prostřednictvím frontmatter pole
        <code class="rounded bg-(--ui-bg-elevated) px-1 py-0.5 font-mono text-sm">sources:</code>.
        Tyto zdroje jsou součástí soukromého repozitáře, web app je nezveřejňuje.
      </p>

      <h2 class="mt-10 mb-3 text-xl font-semibold">AI ve workflow</h2>
      <ol class="list-decimal space-y-2 pl-6 text-(--ui-text)">
        <li>Přidám zdroj do soukromého repozitáře.</li>
        <li>
          AI asistent přečte zdroj, vyextrahuje pojmy, vyhotoví shrnutí a navrhne propojení s už
          existujícími tématy.
        </li>
        <li>
          Návrh ručně projdu, opravím chyby, doplním kontext a teprve potom obsah označím za hotový.
        </li>
        <li>
          Mechanický lint (slug uniqueness, frontmatter, wikilinky, obrázky) musí být před každým
          publikováním zelený.
        </li>
      </ol>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Co fpwiki není</h2>
      <ul class="list-disc space-y-2 pl-6 text-(--ui-text)">
        <li>Není to oficiální materiál fakulty.</li>
        <li>Není to kompletní katalog — pokrývá jen předměty, které jsem zpracoval.</li>
        <li>
          Není zaručeno, že každá věta je doslova správně. Ber obsah jako pomůcku, ne jako jediný
          zdroj pravdy.
        </li>
      </ul>

      <h2 class="mt-10 mb-3 text-xl font-semibold">Pohyb obsahu</h2>
      <p class="text-(--ui-text)">
        Obsah žije v soukromém repozitáři
        <code class="rounded bg-(--ui-bg-elevated) px-1 py-0.5 font-mono text-sm">
          fp-vut-obsidian
        </code>
        . Každý push do větve
        <code class="rounded bg-(--ui-bg-elevated) px-1 py-0.5 font-mono text-sm">master</code>
        automaticky synchronizuje markdown a obrázky do veřejného repozitáře
        <code class="rounded bg-(--ui-bg-elevated) px-1 py-0.5 font-mono text-sm">fpwiki</code>
        , který se pak deployuje. Zdrojové PDF, sken a další citlivé soubory nikdy neopouštějí
        soukromý repozitář.
      </p>

      <p class="mt-6 text-(--ui-text)">
        Kód web aplikace je veřejný:
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
useSeoMeta({ title: 'Jak vzniká obsah — fpwiki' })
</script>
