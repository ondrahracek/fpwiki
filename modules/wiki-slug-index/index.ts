import {
  defineNuxtModule,
  addPlugin,
  addTemplate,
  updateTemplates,
  useLogger,
  createResolver,
} from '@nuxt/kit'
import { buildWikiSlugIndex, COLLECTIONS } from './build'
import type { WikiSlugIndex } from '../../shared/types/wiki'
import { pathFor, wikiUrl, slugFromPath } from '../../shared/wiki-routes'

/**
 * Nuxt module that scans `content/` for markdown files, builds the wiki slug
 * index, and:
 *
 *   1. Emits `#build/wiki-slug-index.json` (via addTemplate) so runtime
 *      plugins can hydrate `useWikiSlugIndex()`. addTemplate handles the
 *      buildDir timing correctly across `prepare`, `build`, and `dev`.
 *   2. Mutates `nuxt.options.content` to inject `files` + `urlResolver` into
 *      the @flowershow/remark-wiki-link options. This keeps the plugin's
 *      `format: 'shortestPossible'` matcher honest.
 *
 * SINGLE SOURCE OF TRUTH for "what slugs exist on this site." Search,
 * breadcrumbs, the wikilink remark plugin, and the validator script all read
 * from the same generated artifact.
 *
 * Pure logic (file walking, frontmatter parsing) is in ./build.ts so it has
 * no @nuxt/kit dependency and can be unit-tested.
 */
export default defineNuxtModule({
  meta: {
    name: 'wiki-slug-index',
    configKey: 'wikiSlugIndex',
  },
  async setup(_options, nuxt) {
    const logger = useLogger('wiki-slug-index')
    const { resolve } = createResolver(import.meta.url)

    // Cached so addTemplate's getContents (called multiple times during build)
    // doesn't re-walk the filesystem.
    let cached: WikiSlugIndex = { files: [], slugs: {}, entries: [] }

    const regenerate = async () => {
      cached = await buildWikiSlugIndex(nuxt.options.rootDir)

      // Detect duplicate slugs early. Hard error in build, warning in dev.
      const seen = new Map<string, string>()
      for (const e of cached.entries) {
        const prev = seen.get(e.slug)
        if (prev && prev !== e.path) {
          const msg = `Duplicate slug "${e.slug}" in collections (${prev} vs ${e.path}). All wiki slugs must be globally unique.`
          if (nuxt.options.dev) logger.warn(msg)
          else throw new Error(msg)
        }
        seen.set(e.slug, e.path)
      }

      logger.info(
        `wiki slug index: ${cached.entries.length} pages across ${COLLECTIONS.length} collections`,
      )
    }

    await regenerate()

    // Emit the build-time artifact. addTemplate handles buildDir resolution
    // across `prepare`, `build`, and `dev` phases.
    addTemplate({
      filename: 'wiki-slug-index.json',
      write: true,
      getContents: () => JSON.stringify(cached, null, 2),
    })

    // Inject into the remark-wiki-link plugin options. This must run at module
    // setup time, BEFORE @nuxt/content consumes its config — that's why this
    // module is FIRST in nuxt.config.ts modules array.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = (nuxt.options as any).content
    const remarkPlugins = content?.build?.markdown?.remarkPlugins ?? {}
    if (remarkPlugins['@flowershow/remark-wiki-link']) {
      // @nuxt/content v3 expects `{ instance?, options? }`. We mutate the
      // `options` sub-object only; everything else (declared instance, etc.)
      // is preserved.
      const entry = remarkPlugins['@flowershow/remark-wiki-link']
      const existingOptions = (typeof entry === 'object' && entry.options) || {}
      if (existingOptions.urlResolver || existingOptions.files) {
        logger.warn(
          'remark-wiki-link `files`/`urlResolver` declared in nuxt.config.ts will be overridden by wiki-slug-index module',
        )
      }
      remarkPlugins['@flowershow/remark-wiki-link'] = {
        ...(typeof entry === 'object' ? entry : {}),
        options: {
          ...existingOptions,
          files: cached.files,
          // v3 API: the plugin calls urlResolver({ filePath, isEmbed, heading }).
          // Route ALL URL construction through shared/wiki-routes for a single
          // contract; never reinvent the path format here.
          urlResolver: ({
            filePath,
            isEmbed,
            heading,
          }: {
            filePath: string
            isEmbed?: boolean
            heading?: string
          }) => {
            if (isEmbed) return wikiUrl.asset(filePath)
            const slug = slugFromPath(filePath)
            // Prefer the resolved entry (has the correct overview-vs-page flag)
            // and fall back to wikiUrl.page for brand-new files added in dev
            // before the next regenerate() pass.
            const base = cached.slugs[slug] ?? pathFor({ filePath })
            return heading ? `${base}#${heading}` : base
          },
        },
      }
    }

    // Re-generate when content files change in dev.
    nuxt.hook('builder:watch', async (_event, path) => {
      if (path.includes('content') && path.endsWith('.md')) {
        await regenerate()
        await updateTemplates({ filter: (t) => t.filename === 'wiki-slug-index.json' })
      }
    })

    addPlugin({ src: resolve('./runtime/plugin.client'), mode: 'client' })
    addPlugin({ src: resolve('./runtime/plugin.server'), mode: 'server' })
  },
})
