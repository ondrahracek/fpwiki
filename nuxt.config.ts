// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',
  devtools: { enabled: true },

  modules: [
    // wiki-slug-index MUST run first: it mutates the @nuxt/content remark
    // plugin options (files + urlResolver for @flowershow/remark-wiki-link)
    // before @nuxt/content snapshots them during its own setup.
    '~~/modules/wiki-slug-index',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
  ],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false, // run via `pnpm typecheck` (vue-tsc) — keep dev fast
  },

  eslint: {
    config: {
      stylistic: false, // Prettier owns formatting
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },

  // Pin font weights/styles. @nuxt/fonts auto-detection only requests styles
  // it sees in CSS, so the italic Source Serif 4 used by blockquotes won't be
  // emitted unless we force it with `global: true`.
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700], styles: ['normal'] },
      {
        name: 'Source Serif 4',
        provider: 'google',
        weights: [400, 500, 600],
        styles: ['normal'],
      },
      {
        name: 'Source Serif 4',
        provider: 'google',
        weights: [400],
        styles: ['italic'],
        global: true,
      },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500], styles: ['normal'] },
    ],
  },

  content: {
    build: {
      markdown: {
        // @nuxt/content v3 plugin shape is `{ instance?, options? }` — passing
        // flat options at this level is silently ignored (see node_modules
        // /@nuxt/content/.../module.mjs `importPlugins`).
        remarkPlugins: {
          '@flowershow/remark-wiki-link': {
            // `files` and `urlResolver` are INJECTED into `options` at build
            // time by modules/wiki-slug-index/index.ts. The resolver routes
            // through shared/wiki-routes.ts (single URL contract). Plugin
            // handles both [[link]] and ![[image]].
            options: {
              format: 'shortestPossible',
              className: 'wikilink',
              newClassName: 'wikilink-broken',
            },
          },
          'remark-math': { options: {} },
        },
        rehypePlugins: {
          'rehype-katex': { options: { output: 'mathml' } },
        },
      },
    },
  },

  routeRules: {
    '/**': { prerender: true },
  },

  nitro: {
    preset: process.env.NITRO_PRESET, // auto-detected by Firebase App Hosting
    prerender: {
      crawlLinks: true,
      failOnError: false,
      // /sitemap.xml is a server route; explicit listing forces prerender
      // even though crawlLinks won't reach it from any <NuxtLink>. The other
      // entries are belt-and-braces against nav regressions — AppPrimaryNav
      // links to all of them on every page, so crawlLinks would reach them
      // anyway, but pinning here protects against accidental nav changes.
      routes: ['/', '/courses', '/tags', '/recent', '/about/jak-vznika-obsah', '/sitemap.xml'],
    },
  },

  runtimeConfig: {
    public: {
      // Absolute origin of the deployed site (no trailing slash). Used to
      // absolutize og:image, og:url, canonical, and sitemap entries. Set via
      // NUXT_PUBLIC_SITE_URL in apphosting.yaml. Empty string = relative URLs
      // (acceptable for local dev; production must set this).
      siteUrl: '',
    },
  },

  alias: {
    '~~': fileURLToPath(new URL('./', import.meta.url)),
  },

  app: {
    head: {
      htmlAttrs: { lang: 'cs' },
      title: 'fpwiki',
      link: [{ rel: 'icon', type: 'image/png', href: '/icons/icon-withbg-256.png' }],
      meta: [
        {
          name: 'description',
          content: 'Neoficiální studijní wiki se zápisky k vybraným předmětům na FP VUT v Brně.',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
