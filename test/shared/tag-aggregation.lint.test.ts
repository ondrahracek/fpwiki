/**
 * Drift-prevention ratchet. Asserts that the cross-collection fan-out and
 * tag-frequency map are NOT re-implemented anywhere outside the canonical
 * helpers.
 *
 * If this test fails, route the offending site through:
 *   - `app/composables/useTagCounts.ts` — site-wide tag counts.
 *   - `app/composables/useTagPages.ts`  — pages that carry a given tag.
 *   - `shared/types/wiki.ts::WIKI_PAGE_COLLECTIONS` — the fan-out array.
 *
 * Background: a hand-rolled tag-counting block on the home page only iterated
 * the `courses` collection and silently produced count=1 for everything.
 * Three other components had the correct version. This ratchet locks in the
 * single source so the same drift cannot recur.
 */
import { describe, it, expect } from 'vitest'
import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const ALLOWED_FILES = new Set([
  // Single sources of truth
  'app/composables/useTagCounts.ts',
  'app/composables/useTagPages.ts',
  'shared/types/wiki.ts',
  // This test
  'test/shared/tag-aggregation.lint.test.ts',
])

const FORBIDDEN_PATTERNS = [
  // Inline duplicate of the 4-collection fan-out array. WIKI_PAGE_COLLECTIONS
  // is the single source — never re-type the literal.
  /\[\s*['"]courses['"]\s*,\s*['"]topics['"]\s*,\s*['"]summaries['"]\s*,\s*['"]outputs['"]\s*\]/,
  // Inline tag-frequency Map. Tight enough not to flag legitimate per-page
  // tag iteration (those don't reference a `counts` Map).
  /for\s*\(\s*const\s+\w+\s+of\s+\w+\.tags\s*\?\?\s*\[\]\s*\)\s*counts/,
]

const ROOTS = ['app', 'modules', 'shared', 'test', 'scripts']
const EXTENSIONS = new Set(['.ts', '.vue', '.mjs'])

async function walk(dir: string, out: string[] = []): Promise<string[]> {
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
    if (entry.isDirectory()) await walk(full, out)
    else if (entry.isFile()) {
      const dotIdx = entry.name.lastIndexOf('.')
      const ext = dotIdx >= 0 ? entry.name.slice(dotIdx) : ''
      if (EXTENSIONS.has(ext)) out.push(full)
    }
  }
  return out
}

describe('Tag aggregation is centralized', () => {
  it('no inline 4-collection fan-out or tag-frequency Map outside the canonical helpers', async () => {
    const cwd = process.cwd()
    const files: string[] = []
    for (const root of ROOTS) {
      await walk(join(cwd, root), files)
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
