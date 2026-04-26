/**
 * Pure AST transformer for Obsidian-style callouts.
 *
 * Converts blockquotes whose first paragraph begins with `[!type]±` markers
 * into styled <aside class="callout callout-{type}"> elements with an icon-
 * prefixed title row.
 *
 * Runs FIRST in the remark plugin pipeline so it sees the literal `[!type]`
 * text before any other plugin (wiki-link, math, GFM autolink) consumes the
 * brackets. Downstream plugins still get a normal mdast tree because we only
 * touch the wrapping blockquote's data hints and slice the title's inline
 * children — body content is left intact.
 *
 * Output structure (via `data.hName` / `data.hProperties` hints):
 *
 *   <aside class="callout callout-{type}" data-callout="{rawType}">
 *     <p class="callout-title">
 *       <span class="iconify i-lucide:..." aria-hidden="true"></span>
 *       {title inline content — may contain math, wiki-links, etc.}
 *     </p>
 *     {body content as-is}
 *   </aside>
 *
 * No I/O, no @nuxt/kit dependency — fully unit-testable.
 */
import type { Root, Blockquote, Paragraph, PhrasingContent, Text, Html } from 'mdast'

// Canonical type set + Obsidian aliases. Unknown types fall through to default.
const ICONS: Record<string, string> = {
  info: 'i-lucide:info',
  warning: 'i-lucide:triangle-alert',
  tip: 'i-lucide:lightbulb',
  example: 'i-lucide:flask-conical',
  abstract: 'i-lucide:clipboard-list',
  note: 'i-lucide:pencil',
  question: 'i-lucide:circle-help',
  success: 'i-lucide:circle-check',
  failure: 'i-lucide:circle-x',
  danger: 'i-lucide:zap',
  bug: 'i-lucide:bug',
  quote: 'i-lucide:quote',
  // Aliases.
  summary: 'i-lucide:clipboard-list',
  hint: 'i-lucide:lightbulb',
  important: 'i-lucide:triangle-alert',
  todo: 'i-lucide:check-square',
  cite: 'i-lucide:quote',
}

const ALIAS_TO_CANONICAL: Record<string, string> = {
  summary: 'abstract',
  hint: 'tip',
  important: 'warning',
  todo: 'note',
  cite: 'quote',
}

const DEFAULT_ICON = 'i-lucide:info'
const DEFAULT_TYPE = 'default'

const TITLES_CS: Record<string, string> = {
  info: 'Poznámka',
  warning: 'Pozor',
  tip: 'Tip',
  example: 'Příklad',
  abstract: 'Shrnutí',
  note: 'Poznámka',
  question: 'Otázka',
  success: 'Hotovo',
  failure: 'Neúspěch',
  danger: 'Pozor',
  bug: 'Chyba',
  quote: 'Citace',
}

export interface CalloutOptions {
  /** Override default Czech titles per type. */
  defaultTitles?: Partial<Record<string, string>>
  /** Override icon class per type. */
  icons?: Partial<Record<string, string>>
}

// Match `[!type]` at the start of a text node, with optional `+`/`-` fold
// marker and optional whitespace. NO end anchor — title text and body may
// follow on the same and subsequent lines.
//
// Used for the "raw" AST shape (e.g. tests that go straight through
// remark-parse). At runtime in @nuxt/content, remark-mdc has already
// consumed `[!type]` into a textComponent node before our plugin sees the
// AST — handled by detectMdcMarker below.
const MARKER_RE = /^\[!([a-zA-Z][a-zA-Z0-9-]*)\]([+-])?[ \t]*/

// Match `!type` at the start of a textComponent's inner text value (the
// shape remark-mdc produces from `[!type]` inline component syntax).
const MDC_INNER_RE = /^!([a-zA-Z][a-zA-Z0-9-]*)$/

function resolveType(
  rawType: string,
  opts: CalloutOptions,
): { canonicalType: string; icon: string } {
  const lower = rawType.toLowerCase()
  const canonicalType = ALIAS_TO_CANONICAL[lower] ?? (ICONS[lower] ? lower : DEFAULT_TYPE)
  const icon =
    opts.icons?.[lower] ??
    ICONS[lower] ??
    opts.icons?.[canonicalType] ??
    ICONS[canonicalType] ??
    DEFAULT_ICON
  return { canonicalType, icon }
}

function defaultTitleFor(rawType: string, canonicalType: string, opts: CalloutOptions): string {
  return (
    opts.defaultTitles?.[rawType] ??
    opts.defaultTitles?.[canonicalType] ??
    TITLES_CS[rawType] ??
    TITLES_CS[canonicalType] ??
    canonicalType.charAt(0).toUpperCase() + canonicalType.slice(1)
  )
}

/**
 * Split a paragraph's inline children into "title" (everything before the
 * first hard line break or first `\n` inside a text node) and "body" (rest).
 *
 * mdast represents soft line breaks as literal `\n` characters inside text
 * nodes, and hard line breaks as `break` nodes — we handle both.
 *
 * Drops empty leading text nodes from the title so the marker-stripped
 * empty residue doesn't sneak in.
 */
function splitOnFirstNewline(children: PhrasingContent[]): {
  title: PhrasingContent[]
  body: PhrasingContent[]
} {
  const title: PhrasingContent[] = []
  const body: PhrasingContent[] = []
  let inBody = false
  for (const child of children) {
    if (inBody) {
      body.push(child)
      continue
    }
    if (child.type === 'break') {
      inBody = true
      continue
    }
    if (child.type === 'text') {
      const v = (child as Text).value
      const nl = v.indexOf('\n')
      if (nl === -1) {
        title.push(child)
        continue
      }
      const before = v.slice(0, nl)
      const after = v.slice(nl + 1)
      if (before.length > 0) title.push({ type: 'text', value: before })
      if (after.length > 0) body.push({ type: 'text', value: after })
      inBody = true
      continue
    }
    title.push(child)
  }

  // Drop leading empty text nodes from title (residue from marker stripping).
  let startIdx = 0
  while (
    startIdx < title.length &&
    title[startIdx]!.type === 'text' &&
    (title[startIdx] as Text).value === ''
  ) {
    startIdx++
  }
  return { title: title.slice(startIdx), body }
}

interface MarkerMatch {
  rawType: string
  fold: '+' | '-' | null
}

/**
 * Detect the marker in a paragraph's inline children. Handles two shapes:
 *
 *   A) Raw mdast (test harness): first child is a `text` node beginning
 *      with `[!type]±`. Strip the marker text in place.
 *
 *   B) Post-remark-mdc (production runtime): first child is a `textComponent`
 *      node with `name: 'span'` whose only inner text is `!type`. The fold
 *      marker (if any) lives at the start of the next sibling text node.
 *      Replace the textComponent with an empty text node and strip the fold
 *      marker (and optional leading space) from the sibling.
 *
 * Returns null if this paragraph isn't a callout marker.
 */
function detectAndConsumeMarker(para: Paragraph): MarkerMatch | null {
  const first = para.children[0]
  if (!first) return null

  // Shape A — raw text marker.
  if (first.type === 'text') {
    const textNode = first as Text
    const m = MARKER_RE.exec(textNode.value)
    if (!m) return null
    textNode.value = textNode.value.slice(m[0].length)
    const fold = (m[2] as '+' | '-' | undefined) ?? null
    return { rawType: m[1]!.toLowerCase(), fold }
  }

  // Shape B — remark-mdc textComponent.
  // textComponent is not in the standard mdast types but @nuxtjs/mdc emits it.
  if ((first as { type: string }).type === 'textComponent') {
    const tc = first as unknown as {
      type: string
      name?: string
      children?: { type: string; value?: string }[]
    }
    if (tc.name !== 'span') return null
    const inner = tc.children?.[0]
    if (!inner || inner.type !== 'text' || !inner.value) return null
    const tcMatch = MDC_INNER_RE.exec(inner.value)
    if (!tcMatch) return null
    const rawType = tcMatch[1]!.toLowerCase()

    // Look for an optional fold marker (`+`/`-`) on the next sibling's text.
    let fold: '+' | '-' | null = null
    const nextSibling = para.children[1]
    if (nextSibling && nextSibling.type === 'text') {
      const sib = nextSibling as Text
      const sm = /^([+-])?[ \t]*/.exec(sib.value)
      if (sm) {
        fold = (sm[1] as '+' | '-' | undefined) ?? null
        sib.value = sib.value.slice(sm[0].length)
      }
    }

    // Replace the textComponent with an empty text node (splitOnFirstNewline
    // filters empty text from the title head).
    para.children[0] = { type: 'text', value: '' } as PhrasingContent
    return { rawType, fold }
  }

  return null
}

/**
 * Transform a single blockquote in place if it's a callout. Returns true on
 * transform, false on no-op.
 */
function transformOne(node: Blockquote, opts: CalloutOptions): boolean {
  // Idempotency guard: an already-transformed callout has hName='aside'.
  if (node.data?.hName === 'aside') return false

  const firstChild = node.children[0]
  if (!firstChild || firstChild.type !== 'paragraph') return false
  const para = firstChild

  const match = detectAndConsumeMarker(para)
  if (!match) return false
  const { rawType, fold } = match

  const { canonicalType, icon } = resolveType(rawType, opts)

  // Split paragraph children at the first newline-or-break.
  const { title: rawTitle, body: bodyInline } = splitOnFirstNewline(para.children)

  // Build the title with optional default fallback.
  let titleChildren: PhrasingContent[] = rawTitle
  if (titleChildren.length === 0) {
    titleChildren = [{ type: 'text', value: defaultTitleFor(rawType, canonicalType, opts) }]
  }

  const iconHtml: Html = {
    type: 'html',
    value: `<span class="iconify ${icon} callout-icon" aria-hidden="true"></span>`,
  }
  const titlePara: Paragraph = {
    type: 'paragraph',
    children: [iconHtml as unknown as PhrasingContent, ...titleChildren],
    data: {
      hName: 'p',
      hProperties: { className: ['callout-title'] },
    },
  }

  // Rebuild blockquote children:
  //   1. titlePara
  //   2. (optional) leading body paragraph from the inline content remaining
  //      on the title line's continuation
  //   3. all subsequent siblings of the original first paragraph (other body
  //      blocks: lists, code, nested blockquotes, etc.)
  const newChildren: Blockquote['children'] = [titlePara]
  if (bodyInline.length > 0) {
    newChildren.push({ type: 'paragraph', children: bodyInline })
  }
  for (let i = 1; i < node.children.length; i++) {
    newChildren.push(node.children[i]!)
  }
  node.children = newChildren

  // Annotate the wrapping blockquote. `data.hProperties` follows hast's
  // Properties type (string-or-array values); we cast through unknown when
  // assigning since mdast's Data shape is intentionally permissive.
  node.data = node.data ?? {}
  node.data.hName = 'aside'
  const hProps: Record<string, string | string[]> = {
    className: ['callout', `callout-${canonicalType}`],
    'data-callout': rawType,
  }
  if (fold) hProps['data-callout-fold'] = fold === '+' ? 'open' : 'closed'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node.data.hProperties = hProps as any

  return true
}

/**
 * Recursively walk a tree and transform every blockquote callout. Mutates
 * in place. Idempotent — re-running is a no-op.
 */
function visitBlockquotes(node: unknown, opts: CalloutOptions): void {
  if (!node || typeof node !== 'object') return
  const n = node as { type?: string; children?: unknown[] }
  if (n.type === 'blockquote') {
    transformOne(n as unknown as Blockquote, opts)
  }
  if (Array.isArray(n.children)) {
    for (const child of n.children) visitBlockquotes(child, opts)
  }
}

/**
 * Public entry: transform all callouts in a parsed mdast tree.
 * Pure, idempotent, no I/O.
 */
export function transformCallouts(tree: Root, opts: CalloutOptions = {}): void {
  visitBlockquotes(tree, opts)
}

/**
 * The complete set of unique iconify icon names this plugin can emit.
 * Consumed by index.ts at module setup time to pre-generate the icon CSS.
 * Drift-protected: any addition to ICONS must be reachable from here.
 */
export function uniqueIconNames(): string[] {
  return Array.from(new Set(Object.values(ICONS)))
}

// Exported for tests.
export const __internal = { ICONS, ALIAS_TO_CANONICAL, TITLES_CS, MARKER_RE, DEFAULT_TYPE }
