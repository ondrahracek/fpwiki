/**
 * Frontmatter normalization helpers.
 *
 * SINGLE SOURCE OF TRUTH for `course | courses` polymorphism and for hiding
 * the unrenderable `sources:` field. Do NOT inline this logic anywhere.
 */

interface MaybeCourseFrontmatter {
  course?: string | string[]
  courses?: string | string[]
}

/** Normalize `course` (string) and `courses` (array) into a single string[]. */
export function resolveCourses(fm: MaybeCourseFrontmatter | null | undefined): string[] {
  if (!fm) return []
  const raw = fm.courses ?? fm.course ?? []
  if (Array.isArray(raw)) return raw.filter(Boolean)
  return raw ? [raw] : []
}

/** Strip non-renderable `sources` field before passing frontmatter to templates. */
export function stripSources<T extends { sources?: unknown }>(fm: T): Omit<T, 'sources'> {
  const { sources: _drop, ...rest } = fm
  return rest
}

/** Coerce YAML date | string | undefined → ISO string | undefined. */
export function toISODate(input: unknown): string | undefined {
  if (!input) return undefined
  if (input instanceof Date) return input.toISOString().slice(0, 10)
  if (typeof input === 'string') return input.slice(0, 10)
  return undefined
}
