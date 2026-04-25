/**
 * sitemap.xml — prerendered alongside every other route. Lists all pages
 * the crawler should know about: static routes (home, courses, recent,
 * tags, about), every wiki page across the four collections, and every
 * tag page.
 *
 * Absolute URL construction routes through wikiUrl.absolute() so the
 * single-source-of-truth helper stays authoritative (CLAUDE.md
 * "single-helper rule for shared logic").
 *
 * Listed in nuxt.config.ts nitro.prerender.routes — crawlLinks won't
 * reach a server route, so we have to name it explicitly. Output ends
 * up at .output/public/sitemap.xml and is served by the App Hosting CDN
 * as a static file.
 */
import { queryCollection } from '@nuxt/content/server'
import { pathFor, wikiUrl } from '#shared/wiki-routes'
import type { WikiCollectionName } from '#shared/types/wiki'

const STATIC_ROUTES = ['/', '/courses', '/recent', '/tags', '/about/jak-vznika-obsah']
const PAGE_COLLECTIONS: WikiCollectionName[] = ['courses', 'topics', 'summaries', 'outputs']

const escapeXml = (s: string): string =>
  s.replace(
    /[<>&'"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!,
  )

const toIsoDate = (v: unknown): string | undefined => {
  if (!v) return undefined
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  if (typeof v === 'string') return v.slice(0, 10)
  return undefined
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const origin = config.public.siteUrl as string
  if (!origin) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_PUBLIC_SITE_URL is not configured',
    })
  }

  const collectionResults = await Promise.all(
    PAGE_COLLECTIONS.map(async (name) => {
      // queryCollection (server) returns a builder; .all() resolves rows.
      const rows = await queryCollection(event, name).all()
      return rows as Array<{
        path?: string
        tags?: string[]
        updated?: string | Date
      }>
    }),
  )

  const tagSet = new Set<string>()
  const pageEntries: Array<{ loc: string; lastmod?: string }> = []
  for (let i = 0; i < collectionResults.length; i++) {
    const rows = collectionResults[i]!
    const collection = PAGE_COLLECTIONS[i]!
    for (const p of rows) {
      // Content paths (e.g. /courses/imek) → app routes (/wiki/imek).
      // pathFor handles the overview-collapses-to-root case too.
      const appPath = pathFor({ path: p.path ?? undefined, collection })
      pageEntries.push({
        loc: wikiUrl.absolute(origin, appPath),
        lastmod: toIsoDate(p.updated),
      })
      for (const t of p.tags ?? []) tagSet.add(t)
    }
  }

  const urls: Array<{ loc: string; lastmod?: string }> = [
    ...STATIC_ROUTES.map((r) => ({ loc: wikiUrl.absolute(origin, r) })),
    ...pageEntries,
    ...Array.from(tagSet)
      .sort()
      .map((t) => ({ loc: wikiUrl.absolute(origin, wikiUrl.tag(t)) })),
  ]

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        ({ loc, lastmod }) =>
          `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
      )
      .join('\n') +
    `\n</urlset>\n`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return body
})
