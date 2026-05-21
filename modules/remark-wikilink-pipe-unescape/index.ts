import { defineNuxtModule, useLogger } from '@nuxt/kit'
import type { FileBeforeParseHook } from '@nuxt/content'
import { unescapeWikilinkPipes } from './build'

/**
 * Nuxt module that rewrites `\|` to `|` inside [[wiki-links]] and ![[embeds]]
 * before remark parses the file.
 *
 * Why: GFM tables require authors to write `[[slug\|alias]]` in a cell so the
 * `|` doesn't split the cell. `@flowershow/remark-wiki-link@3.4.0` then
 * consumes the `\` as a literal target character and produces a broken link
 * (target `slug\`). 91 such links in the published corpus render with the
 * grey-dotted `wikilink-broken` class on fpwiki.cz before this fix.
 *
 * Pattern: this mirrors `modules/math-display-fix/` — both modules patch
 * source text in a `content:file:beforeParse` hook to compensate for an
 * upstream remark/micromark plugin that doesn't handle a syntax we care about.
 *
 * Module ordering: must run BEFORE `@nuxt/content` (which fires the
 * content:file:beforeParse hook). Position in nuxt.config.ts: after
 * math-display-fix, before @nuxt/ui. See CLAUDE.md pitfall #21.
 */
export default defineNuxtModule({
  meta: {
    name: 'remark-wikilink-pipe-unescape',
    configKey: 'wikilinkPipeUnescape',
  },
  setup(_options, nuxt) {
    const logger = useLogger('wikilink-pipe-unescape')

    // @ts-expect-error — `content:file:beforeParse` is registered on
    // NuxtHooks via @nuxt/content's `declare module '@nuxt/schema'`
    // augmentation, but it doesn't reliably merge into vue-tsc's program
    // under our tsconfig. See CLAUDE.md pitfall #17. Runtime is unaffected.
    nuxt.hook('content:file:beforeParse', (ctx: FileBeforeParseHook) => {
      if (!ctx.file.id?.endsWith('.md')) return
      ctx.file.body = unescapeWikilinkPipes(ctx.file.body as string)
    })

    logger.info('wikilink-pipe-unescape: registered \\| → | rewriter')
  },
})
