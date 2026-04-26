/**
 * Expands single-line $$…$$ expressions to multi-line block math.
 *
 * micromark-extension-math math-flow.js rejects `$` in the info string,
 * so `$$content$$` on one line fails as block math: the meta() parser
 * processes the info string character-by-character and returns nok() when
 * it hits the `$` in the closing `$$` delimiter. The expression then falls
 * through to math-text (inline, displayMode: false), causing \tag{} to throw
 * `ParseError: \tag works only in display equations`.
 *
 * Fix: expand any single-line `$$content$$` to a three-line fence:
 *   $$          ← opening fence on its own line
 *   content     ← content (no $ in the info string)
 *   $$          ← closing fence on its own line
 *
 * Lines inside fenced code blocks (``` / ~~~) are skipped to avoid
 * rewriting math examples in code blocks.
 *
 * No I/O, no @nuxt/kit dependency — fully unit-testable.
 */
export function expandSingleLineMath(source: string): string {
  const lines = source.split('\n')
  const out: string[] = []
  let inFence = false

  for (const line of lines) {
    if (/^(`{3,}|~{3,})/.test(line)) inFence = !inFence

    if (!inFence) {
      // Match: optional leading whitespace, $$, at least one non-empty char
      // (the content), $$, optional trailing whitespace. Content may contain
      // any character including $ — only the surrounding $$ matter as fences.
      const m = line.match(/^(\s*)\$\$(.+)\$\$\s*$/)
      if (m) {
        out.push(`${m[1]}$$`, `${m[1]}${m[2]}`, `${m[1]}$$`)
        continue
      }
    }

    out.push(line)
  }

  return out.join('\n')
}
