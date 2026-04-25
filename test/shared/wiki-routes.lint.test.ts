/**
 * Drift-prevention ratchet. Asserts no source file outside the central
 * URL helper hand-constructs `/wiki/...`, `/tag/...`, or `/wiki-assets/...`
 * template literals.
 *
 * If this test fails, route the offending site through `shared/wiki-routes.ts`
 * helpers (wikiUrl.page / wikiUrl.tag / wikiUrl.asset / pathFor).
 */
import { describe, it, expect } from 'vitest'
import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const ALLOWED_FILES = new Set([
  // The single source of truth itself
  'shared/wiki-routes.ts',
  // Tests that validate the helper or ratchet
  'test/shared/wiki-routes.test.ts',
  'test/shared/wiki-routes.lint.test.ts',
])

const FORBIDDEN_PATTERNS = [
  /`\/wiki\/\$\{/, // `/wiki/${...}`
  /`\/tag\/\$\{/, // `/tag/${...}`
  /`\/wiki-assets\//, // `/wiki-assets/...
]

const ROOTS = ['app', 'modules', 'shared', 'test', 'scripts']
const EXTENSIONS = new Set(['.ts', '.vue', '.mjs'])

async function walk(dir: string, root: string, out: string[] = []): Promise<string[]> {
  let entries: import('node:fs').Dirent[]
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.nuxt' || entry.name === '.output')
      continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, root, out)
    else if (entry.isFile()) {
      const dotIdx = entry.name.lastIndexOf('.')
      const ext = dotIdx >= 0 ? entry.name.slice(dotIdx) : ''
      if (EXTENSIONS.has(ext)) out.push(full)
    }
  }
  return out
}

describe('URL construction is centralized', () => {
  it('no /wiki/, /tag/, or /wiki-assets/ template literals outside shared/wiki-routes.ts', async () => {
    const cwd = process.cwd()
    const files: string[] = []
    for (const root of ROOTS) {
      await walk(join(cwd, root), root, files)
    }

    const offenders: { file: string; pattern: string }[] = []
    for (const f of files) {
      const normalized = relative(cwd, f).replace(/\\/g, '/')
      if (ALLOWED_FILES.has(normalized)) continue
      const src = await readFile(f, 'utf8')
      for (const pat of FORBIDDEN_PATTERNS) {
        if (pat.test(src)) offenders.push({ file: normalized, pattern: pat.source })
      }
    }

    expect(offenders).toEqual([])
  })
})
