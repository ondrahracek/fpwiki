import { defineNuxtModule, useLogger } from '@nuxt/kit'
import remarkGraphsPlugin from './plugin'

/**
 * Nuxt module that registers the remark plugin which transforms ` ```graph `
 * fenced code blocks into <graph-mount spec="…"> elements at build time.
 *
 * Pure transformation logic lives in ./build.ts (no @nuxt/kit deps, fully
 * unit-testable). This file is just the Nuxt wiring.
 *
 * Module ordering (see nuxt.config.ts modules: []):
 *   - Must run AFTER `wiki-slug-index` (which mutates the wiki-link entry)
 *     and BEFORE `@nuxt/content` (which snapshots the markdown plugin map).
 *
 * Plugin ordering inside @nuxt/content's remark pipeline: this plugin
 * prepends to the remarkPlugins map so it runs before remark-mdc /
 * remark-wiki-link / remark-math touch the tree. Code-block contents are
 * not text-walked by those plugins, but the prepend keeps the project
 * convention consistent (see modules/remark-callouts/index.ts).
 */
export default defineNuxtModule({
  meta: {
    name: 'remark-graphs',
    configKey: 'remarkGraphs',
  },
  setup(_options, nuxt) {
    const logger = useLogger('remark-graphs')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = (nuxt.options as any).content
    if (!content) {
      logger.warn('nuxt.options.content is undefined — is @nuxt/content registered?')
      return
    }
    content.build = content.build ?? {}
    content.build.markdown = content.build.markdown ?? {}
    const existing = content.build.markdown.remarkPlugins ?? {}

    if (existing['remark-graphs']) {
      logger.warn('remark-graphs already registered; skipping duplicate wiring')
      return
    }

    // Insertion order = execution order. Prepend so we run first.
    const reordered: Record<string, unknown> = {
      'remark-graphs': {
        instance: remarkGraphsPlugin,
        options: {},
      },
    }
    for (const [k, v] of Object.entries(existing)) reordered[k] = v
    content.build.markdown.remarkPlugins = reordered
    logger.info('remark-graphs wired (transforms ```graph fences at build time)')
  },
})
