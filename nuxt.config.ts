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
      routes: ['/', '/courses'],
    },
  },

  alias: {
    '~~': fileURLToPath(new URL('./', import.meta.url)),
  },

  app: {
    head: {
      htmlAttrs: { lang: 'cs' },
      title: 'fpwiki',
      meta: [
        {
          name: 'description',
          content: 'Studentská znalostní báze pro Fakultu podnikatelskou VUT v Brně.',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
