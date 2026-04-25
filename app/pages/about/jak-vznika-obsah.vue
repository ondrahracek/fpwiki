<template>
  <UContainer class="max-w-3xl py-10">
    <article class="prose prose-paper dark:prose-invert max-w-none">
      <h1>Jak vzniká obsah</h1>
      <p class="lead">
        fpwiki je sbírka mých studijních zápisků k vybraným magisterským předmětům na FP VUT v Brně.
        Obsah vzniká s pomocí AI z dostupných oficiálních i neoficiálních podkladů a je ručně
        ověřen.
      </p>

      <h2>Zdroje</h2>
      <p>
        Materiály se připravují z přednášek, sylabů, učebnic a dalších studijních podkladů, které
        sleduji během studia. Každá stránka odkazuje na své zdroje (kniha, blok, PDF přednášky)
        prostřednictvím frontmatter pole <code>sources:</code>. Tyto zdroje jsou součástí soukromého
        repozitáře, web app je nezveřejňuje.
      </p>

      <h2>AI ve workflow</h2>
      <ol>
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

      <h2>Co fpwiki není</h2>
      <ul>
        <li>Není to oficiální materiál fakulty.</li>
        <li>Není to kompletní katalog — pokrývá jen předměty, které jsem zpracoval.</li>
        <li>
          Není zaručeno, že každá věta je doslova správně. Ber obsah jako pomůcku, ne jako jediný
          zdroj pravdy.
        </li>
      </ul>

      <h2>Pohyb obsahu</h2>
      <p>
        Obsah žije v soukromém repozitáři <code>fp-vut-obsidian</code>. Každý push do větve
        <code>master</code> automaticky synchronizuje markdown a obrázky do veřejného repozitáře
        <code>fpwiki</code>, který se pak deployuje. Zdrojové PDF, sken a další citlivé soubory
        nikdy neopouštějí soukromý repozitář.
      </p>

      <p>
        Kód web aplikace je veřejný:
        <a href="https://github.com/ondrahracek/fpwiki" target="_blank" rel="noopener">
          github.com/ondrahracek/fpwiki </a
        >.
      </p>
    </article>
  </UContainer>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Jak vzniká obsah — fpwiki' })
</script>
