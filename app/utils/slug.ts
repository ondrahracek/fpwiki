/**
 * Slug helpers. Use these instead of inlining string manipulation —
 * the wiki's slug semantics live here.
 *
 * For URL construction, see shared/wiki-routes.ts (`slugFromPath`, `wikiUrl`,
 * `pathFor`). Do not reach for these utils when you really want a URL.
 */

/**
 * NFD-strip diacritics. Used by:
 *   - Czech-aware search tokenization (so `pribytek` matches `přebytek`)
 *
 * SINGLE SOURCE OF TRUTH for diacritic handling. Do not reimplement.
 */
export function stripDiacritics(input: string): string {
  return input.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

/** Convert any string to kebab-case ASCII slug. */
export function toSlug(input: string): string {
  return stripDiacritics(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
