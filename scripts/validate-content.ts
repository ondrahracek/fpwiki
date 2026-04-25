#!/usr/bin/env tsx
/**
 * Content validator. Run via `pnpm content:validate`.
 *
 * Checks:
 *   1. Slug uniqueness across all 4 page collections (HARD FAIL).
 *   2. Wikilink resolution: every [[slug]] resolves (warns by default; fails
 *      if --strict-wikilinks is passed).
 *   3. Image embeds: every ![[file]] resolves to a file in public/wiki-assets/
 *      (HARD FAIL unless --allow-missing-assets is passed).
 *   4. Frontmatter sanity: title required, dates parseable (warn).
 *
 * Source of truth for the slug index is the `modules/wiki-slug-index` build,
 * but for CI we re-derive here so this script has no dependency on `.nuxt/`.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const CONTENT = join(ROOT, 'content')
const ASSETS = join(ROOT, 'public', 'wiki-assets')

const args = new Set(process.argv.slice(2))
const STRICT_WIKILINKS = args.has('--strict-wikilinks')
const ALLOW_MISSING_ASSETS = args.has('--allow-missing-assets')

async function walk(dir: string): Promise<string[]> {
  const out: string[] = []
  if (!existsSync(dir)) return out
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(path)))
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(path)
  }
  return out
}

interface Page {
  abs: string
  rel: string
  slug: string
  body: string
  frontmatter: { title?: string; type?: string; created?: string; updated?: string }
}

function splitFrontmatter(raw: string): { fm: Page['frontmatter']; body: string } {
  if (!raw.startsWith('---')) return { fm: {}, body: raw }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { fm: {}, body: raw }
  const block = raw.slice(3, end)
  const body = raw.slice(end + 4)
  const fm: Page['frontmatter'] = {}
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.+)$/)
    if (!m) continue
    const [, key, valueRaw] = m
    if (!key) continue
    const value = valueRaw!.trim().replace(/^["']|["']$/g, '')
    if (key === 'title') fm.title = value
    else if (key === 'type') fm.type = value
    else if (key === 'created') fm.created = value
    else if (key === 'updated') fm.updated = value
  }
  return { fm, body }
}

const errors: string[] = []
const warnings: string[] = []

function err(msg: string) {
  errors.push(msg)
}
function warn(msg: string) {
  warnings.push(msg)
}

async function main() {
  if (!existsSync(CONTENT)) {
    err(`content/ does not exist at ${CONTENT}`)
    return
  }

  const files = await walk(CONTENT)
  const pages: Page[] = []
  const slugMap = new Map<string, Page>()

  // 1. Load + slug uniqueness
  for (const abs of files) {
    const rel = relative(CONTENT, abs).replace(/\\/g, '/')
    const slug = abs.split(/[\\/]/).pop()!.replace(/\.md$/i, '')
    const raw = await readFile(abs, 'utf8')
    const { fm, body } = splitFrontmatter(raw)
    const page = { abs, rel, slug, body, frontmatter: fm }

    if (slugMap.has(slug)) {
      err(`Duplicate slug "${slug}" in ${rel} and ${slugMap.get(slug)!.rel}`)
    } else {
      slugMap.set(slug, page)
    }
    pages.push(page)

    if (!fm.title) warn(`Missing title in ${rel}`)
  }

  // 2 + 3. Wikilinks + image embeds
  // [[slug]] OR [[slug|alias]] OR [[slug#heading]] etc.
  // ![[file.ext]] OR ![[file.ext|caption]]
  const linkRE = /(!?)\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]/g

  for (const page of pages) {
    let m: RegExpExecArray | null
    linkRE.lastIndex = 0
    while ((m = linkRE.exec(page.body)) !== null) {
      const isEmbed = m[1] === '!'
      const target = m[2]!.trim()
      if (isEmbed) {
        const assetPath = join(ASSETS, target)
        if (!existsSync(assetPath)) {
          const msg = `Missing asset: ![[${target}]] in ${page.rel} (looked at ${relative(ROOT, assetPath)})`
          if (ALLOW_MISSING_ASSETS) warn(msg)
          else err(msg)
        }
      } else {
        if (!slugMap.has(target)) {
          const msg = `Broken wikilink: [[${target}]] in ${page.rel}`
          if (STRICT_WIKILINKS) err(msg)
          else warn(msg)
        }
      }
    }
  }

  // 4. Date sanity (warn-level)
  for (const page of pages) {
    for (const field of ['created', 'updated'] as const) {
      const v = page.frontmatter[field]
      if (v && !/^\d{4}-\d{2}-\d{2}/.test(v)) {
        warn(`Frontmatter ${field} not ISO in ${page.rel}: ${v}`)
      }
    }
  }

  // Report
  console.log(
    `\nValidated ${pages.length} pages, ${
      (await stat(ASSETS).catch(() => null)) ? '+ assets' : '(no assets dir)'
    }\n`,
  )

  if (warnings.length) {
    console.warn(`Warnings (${warnings.length}):`)
    for (const w of warnings) console.warn('  ⚠ ' + w)
  }

  if (errors.length) {
    console.error(`\nErrors (${errors.length}):`)
    for (const e of errors) console.error('  ✗ ' + e)
    process.exit(1)
  }

  console.log(`\nOK (${warnings.length} warnings, 0 errors)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
