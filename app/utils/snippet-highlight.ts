/**
 * Parse `<<…>>` markers in a backlink snippet into renderable segments.
 *
 * The build-time backlink extractor (modules/wiki-slug-index/build.ts) wraps
 * the matched wikilink with `<<term>>` markers so the right-rail renderer can
 * emit a `<mark>` without ever interpreting raw HTML. Components iterate the
 * returned segments and render each via Vue text interpolation — never v-html.
 */
export interface HighlightSegment {
  text: string
  highlight: boolean
}

export function parseHighlight(snippet: string): HighlightSegment[] {
  const out: HighlightSegment[] = []
  const re = /<<([^>]+)>>/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(snippet)) !== null) {
    if (m.index > last) out.push({ text: snippet.slice(last, m.index), highlight: false })
    out.push({ text: m[1] ?? '', highlight: true })
    last = re.lastIndex
  }
  if (last < snippet.length) out.push({ text: snippet.slice(last), highlight: false })
  return out
}
