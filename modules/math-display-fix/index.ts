import { defineNuxtModule, useLogger } from '@nuxt/kit'
import type { FileBeforeParseHook } from '@nuxt/content'
import { expandSingleLineMath } from './build'

/**
 * Nuxt module that fixes single-line `$$content$$` display math.
 *
 * micromark-extension-math's math-flow tokenizer rejects `$` in the fence
 * info-string, so any `$$...$$` on one line falls through to math-text
 * (inline, displayMode: false). \tag{} then throws a KaTeX ParseError and
 * renders as a red <span class="katex-error">. Other equations silently
 * render at inline size instead of display size.
 *
 * The fix is a pre-parse text transformation: expand single-line `$$...$$`
 * to a three-line fence before remark sees the file. Pure logic lives in
 * ./build.ts (no @nuxt/kit dependency, fully unit-testable).
 *
 * Module ordering: must run BEFORE `@nuxt/content` (which fires the
 * content:file:beforeParse hook). Position in nuxt.config.ts: after
 * remark-callouts, before @nuxt/ui.
 */
export default defineNuxtModule({
  meta: {
    name: 'math-display-fix',
    configKey: 'mathDisplayFix',
  },
  setup(_options, nuxt) {
    const logger = useLogger('math-display-fix')

    // @ts-expect-error — `content:file:beforeParse` is registered on
    // NuxtHooks via @nuxt/content's `declare module '@nuxt/schema'`
    // augmentation, but it doesn't reliably merge into vue-tsc's program
    // under our tsconfig. See CLAUDE.md pitfall #17. Runtime is unaffected.
    nuxt.hook('content:file:beforeParse', (ctx: FileBeforeParseHook) => {
      if (!ctx.file.id?.endsWith('.md')) return
      ctx.file.body = expandSingleLineMath(ctx.file.body as string)
    })

    logger.info('math-display-fix: registered single-line $$ expander')
  },
})
