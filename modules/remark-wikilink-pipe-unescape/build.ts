/**
 * Strips backslash-escaped pipes inside [[wiki-links]] and ![[embeds]].
 *
 * GFM tables use `|` as the cell delimiter, so Obsidian conventions require
 * authors to write `[[slug\|alias]]` inside a cell — the backslash escapes
 * the pipe for the table parser, and Obsidian's wiki-link renderer treats
 * `\|` as equivalent to `|` (the alias divider).
 *
 * `@flowershow/remark-wiki-link@3.4.0`'s tokenizer does NOT honor the escape:
 * it consumes the `\` as a literal target character, leaving the link target
 * as `slug\` and producing a broken `wikilink-broken` link. The same syntax
 * also appears outside tables (in prose / lists) and breaks identically,
 * since the tokenizer's behavior is context-free.
 *
 * Fix: rewrite the source so that any `\|` INSIDE a `[[…]]` or `![[…]]`
 * becomes a plain `|` before remark sees it. The same line is also a no-op
 * for any author who already wrote `[[slug|alias]]` (no backslash).
 *
 * Fenced code blocks are skipped so literal `[[slug\|alias]]` examples
 * inside ``` … ``` survive verbatim, and so do inline code spans (`…`).
 *
 * Pure logic; no I/O; no @nuxt/kit dependency — fully unit-testable.
 */
export function unescapeWikilinkPipes(source: string): string {
  return rewriteWikilinks(source, (m) => m.replace(/\\\|/g, '|'))
}

/**
 * Alias divider configured on `@flowershow/remark-wiki-link`. A private-use
 * character never occurs in content, and unlike `|` it does not split a GFM
 * table cell, so `[[slug\|alias]]` inside a table renders as one link.
 */
export const WIKILINK_ALIAS_DIVIDER = '\uE000'

/** Rewrites `|` and `\|` inside [[…]] / ![[…]] to WIKILINK_ALIAS_DIVIDER. */
export function markWikilinkAliasDividers(source: string): string {
  return rewriteWikilinks(source, (m) => m.replace(/\\?\|/g, WIKILINK_ALIAS_DIVIDER))
}

function rewriteWikilinks(source: string, rewrite: (link: string) => string): string {
  const lines = source.split('\n')
  const out: string[] = []
  let inFence = false
  for (const line of lines) {
    if (/^(`{3,}|~{3,})/.test(line)) inFence = !inFence
    // Inline code spans are matched first and returned unchanged.
    out.push(
      inFence
        ? line
        : line.replace(/(`+)[^`]*?\1|!?\[\[[^\]\n]+\]\]/g, (m) =>
            m.startsWith('`') ? m : rewrite(m),
          ),
    )
  }
  return out.join('\n')
}
