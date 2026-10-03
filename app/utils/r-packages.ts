// Packages that ship with R itself; webR has them without installing.
const BASE_PACKAGES = new Set([
  'base',
  'compiler',
  'datasets',
  'graphics',
  'grDevices',
  'grid',
  'methods',
  'parallel',
  'splines',
  'stats',
  'stats4',
  'tcltk',
  'tools',
  'utils',
])

const PKG = '[A-Za-z][A-Za-z0-9.]*'
const LOAD_RE = new RegExp(
  `(?<![A-Za-z0-9._$@])(?:library|require|requireNamespace)\\s*\\(\\s*(?:package\\s*=\\s*)?(['"]?)(${PKG})\\1\\s*([,)])`,
  'g',
)
const NAMESPACE_RE = new RegExp(`(?<![A-Za-z0-9._])(${PKG}):::?(?=[A-Za-z._])`, 'g')

function stripComment(line: string): string {
  let quote: string | null = null
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (quote) {
      if (ch === '\\') i++
      else if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === '#') {
      return line.slice(0, i)
    }
  }
  return line
}

/** Non-base packages an R snippet loads via library()/require()/requireNamespace() or pkg::fn. */
export function extractRPackages(code: string): string[] {
  const src = code.split('\n').map(stripComment).join('\n')
  const found = new Set<string>()
  for (const m of src.matchAll(LOAD_RE)) {
    const [, quote, name, next] = m
    if (!name) continue
    const start = m.index ?? 0
    const call = src.slice(start, src.indexOf(')', start + m[0].length - 1) + 1)
    if (!quote && next === ',' && /character\.only\s*=\s*T/.test(call)) continue
    found.add(name)
  }
  for (const m of src.matchAll(NAMESPACE_RE)) {
    if (m[1]) found.add(m[1])
  }
  return [...found].filter((p) => !BASE_PACKAGES.has(p))
}
