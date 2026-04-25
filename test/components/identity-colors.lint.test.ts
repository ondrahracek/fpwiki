/**
 * Drift-prevention ratchet for the identifier-color unification.
 *
 * If this test fails, you have re-introduced one of the legacy APIs:
 *   - `:accent=` on <CoursePill>     → drop the binding; color now derives from `slug`
 *   - `$tagColor`                     → use `$identityColor`
 *   - `tagColor(...)` import          → use `identityColor` from app/plugins/tag-colors
 *   - `--course-hue-*` CSS variable   → use `--id-*`
 *   - `--tag-bg`/`--tag-fg`/`--tag-dot` → use `--id-bg`/`--id-fg`/`--id-dot`
 *   - `courseHueVars` / `course-hue`  → deleted; use `identityVars` instead
 *
 * Mirrors test/shared/wiki-routes.lint.test.ts.
 */
import { describe, it, expect } from 'vitest'
import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const ALLOWED_FILES = new Set([
  // The single source of truth itself
  'app/plugins/tag-colors.ts',
  // The ratchet is allowed to mention the forbidden tokens in comments/strings
  'test/components/identity-colors.lint.test.ts',
])

const FORBIDDEN_PATTERNS: Array<{ pattern: RegExp; hint: string }> = [
  { pattern: /\$tagColor\b/, hint: '$tagColor → $identityColor' },
  { pattern: /\bcourseHueVars\b/, hint: 'courseHueVars → identityVars' },
  { pattern: /--course-hue-/, hint: '--course-hue-* → --id-*' },
  { pattern: /--tag-(bg|fg|dot)\b/, hint: '--tag-* → --id-*' },
  { pattern: /\butils\/course-hue\b/, hint: 'utils/course-hue is deleted; use plugins/tag-colors' },
  { pattern: /:accent=/, hint: '<CoursePill> :accent has been removed; color derives from slug' },
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

describe('identity-color usage is unified', () => {
  it('no legacy color APIs remain in source', async () => {
    const cwd = process.cwd()
    const files: string[] = []
    for (const root of ROOTS) {
      await walk(join(cwd, root), files)
    }

    const offenders: { file: string; hint: string }[] = []
    for (const f of files) {
      const normalized = relative(cwd, f).replace(/\\/g, '/')
      if (ALLOWED_FILES.has(normalized)) continue
      const src = await readFile(f, 'utf8')
      for (const { pattern, hint } of FORBIDDEN_PATTERNS) {
        if (pattern.test(src)) offenders.push({ file: normalized, hint })
      }
    }

    expect(offenders).toEqual([])
  })
})
