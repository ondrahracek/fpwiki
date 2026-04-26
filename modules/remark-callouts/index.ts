import { defineNuxtModule, useLogger, addTemplate, createResolver } from '@nuxt/kit'
import remarkCalloutsPlugin from './plugin'
import { uniqueIconNames } from './build'

/**
 * Nuxt module that registers a remark plugin to transform Obsidian-style
 * callouts (`> [!info] Title\n> body`) into styled `<aside class="callout
 * callout-{type}">` elements at build time, AND emits the iconify CSS rules
 * for the icons used by callouts.
 *
 * Pure transformation logic lives in ./build.ts (no @nuxt/kit deps, fully
 * unit-testable). This file is just the Nuxt wiring.
 *
 * Module ordering: must run AFTER `wiki-slug-index` (which mutates the
 * remark-wiki-link entry) and BEFORE `@nuxt/content` (which snapshots the
 * markdown plugin map). See nuxt.config.ts modules: [].
 *
 * Plugin ordering inside @nuxt/content: this plugin runs FIRST in the
 * remarkPlugins map so it sees the literal `[!type]` text (or its post-
 * remark-mdc shape `textComponent name='span'`) before later plugins consume
 * the structure. Achieved by rebuilding the remarkPlugins object with our
 * entry as the first key (insertion order = execution order).
 *
 * Icon CSS: callouts emit raw HTML icon spans like `<span class="iconify
 * i-lucide:info">`. @nuxt/icon's CSS-injection lifecycle only fires for
 * Vue `<UIcon>` instances (via `useHead` SSR prefetch), not for plain HTML.
 * To make our icons visible without coupling to Vue, this module reads the
 * SVG data for each icon at build time and writes a CSS file containing
 * the iconify rules; that CSS is added to nuxt.options.css so it ships in
 * the global bundle.
 */
export default defineNuxtModule({
  meta: {
    name: 'remark-callouts',
    configKey: 'remarkCallouts',
  },
  async setup(_options, nuxt) {
    const logger = useLogger('remark-callouts')
    const { resolve } = createResolver(import.meta.url)

    // ---------- 1) Register the remark plugin --------------------------------
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = (nuxt.options as any).content
    if (!content) {
      logger.warn('nuxt.options.content is undefined — is @nuxt/content registered?')
      return
    }
    content.build = content.build ?? {}
    content.build.markdown = content.build.markdown ?? {}
    const existing = content.build.markdown.remarkPlugins ?? {}

    if (existing['remark-callouts']) {
      logger.warn('remark-callouts already registered; skipping duplicate wiring')
    } else {
      // Insertion order = execution order in @nuxt/content's plugin loader.
      // We want to run BEFORE remark-mdc / remark-wiki-link / remark-math so
      // we see the original `[!type]` markers (or, post-remark-mdc, the
      // textComponent shape they produce). Rebuild the object with our
      // entry first, then spread the rest.
      const reordered: Record<string, unknown> = {
        'remark-callouts': {
          // `instance` is the resolved unified plugin function, not a path.
          // @nuxt/content's plugin loader does `processor.use(instance, opts)`.
          instance: remarkCalloutsPlugin,
          options: {},
        },
      }
      for (const [k, v] of Object.entries(existing)) reordered[k] = v
      content.build.markdown.remarkPlugins = reordered
      logger.info('remark-callouts wired (runs first in remark pipeline)')
    }

    // ---------- 2) Generate iconify CSS for callout icons --------------------
    // Read all icon SVGs at module setup time, generate the iconify-style
    // mask-image CSS rules, write them to a build template that the user
    // imports via nuxt.options.css. Keeps the icon set self-documenting:
    // adding a new type to build.ts ICONS is the only change required.
    const iconNames = uniqueIconNames()
    let cssBody = '/* Generated at build time by modules/remark-callouts. Do not edit. */\n'
    let generated = 0
    let failed = 0
    try {
      // Dynamic imports — these are runtime deps installed transitively via
      // @nuxt/icon (@iconify/utils) and explicitly via @iconify-json/lucide.
      const { getIconData } = await import('@iconify/utils')
      const { getIconCSS } = await import('@iconify/utils/lib/css/icon')
      // @iconify-json/lucide ships a single `icons.json` IconifyJSON file.
      const lucideJson = (await import('@iconify-json/lucide/icons.json')).default

      for (const fullName of iconNames) {
        // ICONS values use the iconify CSS-class form `i-{collection}:{name}`.
        // Strip the leading `i-` to get the collection prefix.
        const stripped = fullName.startsWith('i-') ? fullName.slice(2) : fullName
        const [prefix, name] = stripped.split(':')
        if (prefix !== 'lucide' || !name) {
          logger.warn(
            `remark-callouts: unsupported icon "${fullName}" (only lucide collection is wired), skipping`,
          )
          continue
        }
        const data = getIconData(lucideJson, name)
        if (!data) {
          logger.warn(`remark-callouts: missing icon ${fullName} in @iconify-json/lucide`)
          failed++
          continue
        }
        // Match the selector style @nuxt/icon uses: ":where(.i-lucide\\:info)"
        const selector = `:where(.i-${prefix}\\:${name})`
        const rule = getIconCSS(data, { iconSelector: selector, format: 'compressed' })
        cssBody += rule + '\n'
        generated++
      }
    } catch (e) {
      logger.error(
        'remark-callouts: failed to generate icon CSS. Are @iconify-json/lucide and @iconify/utils installed?',
        e,
      )
    }

    // Add the base `.iconify` rule that @nuxt/icon's runtime relies on (the
    // per-icon rules above only set `--svg`; the base rule binds it to mask).
    // This duplicates @nuxt/icon's runtime CSS for the case where our icons
    // are added to a page that has no <UIcon> mounting (no SSR injection).
    cssBody += `
.iconify {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
`

    // Wrap in @layer base to match @nuxt/icon's cssLayer convention so prose
    // styles can override icon styles when needed.
    const finalCss = `@layer base {\n${cssBody}\n}`

    const dst = addTemplate({
      filename: 'remark-callouts-icons.css',
      write: true,
      getContents: () => finalCss,
    })
    nuxt.options.css = nuxt.options.css ?? []
    if (!nuxt.options.css.includes(dst.dst)) {
      nuxt.options.css.push(dst.dst)
    }
    logger.info(
      `remark-callouts: generated CSS for ${generated} icon${generated === 1 ? '' : 's'}` +
        (failed ? ` (${failed} failed)` : '') +
        ` at ${dst.filename}`,
    )

    // Mark `resolve` as intentionally unused — it's kept for future use if
    // we ever need to addPlugin() for a runtime hook.
    void resolve
  },
})
