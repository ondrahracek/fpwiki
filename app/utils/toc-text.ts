import type { TocLink } from '@nuxt/content'

type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

// KaTeX's MathML output carries the TeX source in <annotation>, which the
// generated toc text concatenates after the rendered math ("Diagram cc").
function visibleText(node: MinimarkNode): string {
  if (typeof node === 'string') return node
  const [tag, , ...children] = node
  if (tag === 'annotation') return ''
  return children.map(visibleText).join('')
}

function collectHeadings(nodes: MinimarkNode[], into: Map<string, string>) {
  for (const node of nodes) {
    if (typeof node === 'string') continue
    const [tag, props, ...children] = node
    if (/^h[1-6]$/.test(tag) && typeof props?.id === 'string') {
      into.set(props.id, children.map(visibleText).join('').trim())
    } else {
      collectHeadings(children, into)
    }
  }
}

export function cleanTocLinks(links: TocLink[], body: unknown[]): TocLink[] {
  const texts = new Map<string, string>()
  collectHeadings(body as MinimarkNode[], texts)
  const clean = (list: TocLink[]): TocLink[] =>
    list.map((link) => ({
      ...link,
      text: texts.get(link.id) || link.text,
      ...(link.children ? { children: clean(link.children) } : {}),
    }))
  return clean(links)
}
