import { describe, it, expect } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root } from 'mdast'
import { transformGraphs, GRAPH_FENCE_LANG, specToProp } from '../../modules/remark-graphs/build'
import { graphSpecSchema, RESERVED_PARAM_NAMES } from '../../modules/remark-graphs/schema'

function parse(md: string): Root {
  return unified().use(remarkParse).parse(md) as Root
}

const VALID_BLOCK = `\`\`\`${GRAPH_FENCE_LANG}
title: Lineární poptávka
alt: Lineární poptávka P = 50 - 2Q s posuvníky pro intercept a sklon.
xAxis: { label: "Q", domain: [0, 30] }
yAxis: { label: "P", domain: [0, 60] }
params:
  - { name: a, label: "intercept a", min: 10, max: 80, default: 50, step: 1 }
  - { name: b, label: "slope b", min: 0.5, max: 5, default: 2, step: 0.1 }
curves:
  - { fn: "a - b*x", label: "P = a - bQ", color: "fp-purple" }
markers:
  - { x: "a / (2*b)", label: "Q*" }
\`\`\`
`

describe('graphSpecSchema', () => {
  it('accepts a well-formed spec', () => {
    const spec = {
      title: 'T',
      alt: 'Description ten chars at least.',
      xAxis: { label: 'x', domain: [0, 1] },
      yAxis: { label: 'y', domain: [0, 1] },
      params: [{ name: 'a', label: 'A', min: 0, max: 10, step: 1, default: 5 }],
      curves: [{ fn: 'a*x', label: 'L', color: 'fp-purple' }],
    }
    expect(graphSpecSchema.safeParse(spec).success).toBe(true)
  })

  it('rejects reserved parameter names', () => {
    for (const reserved of ['x', 'sin', 'log', 'pi']) {
      const spec = {
        title: 'T',
        alt: 'Description ten chars at least.',
        xAxis: { label: 'x', domain: [0, 1] },
        yAxis: { label: 'y', domain: [0, 1] },
        params: [{ name: reserved, label: 'L', min: 0, max: 1, step: 0.1, default: 0.5 }],
        curves: [{ fn: 'a*x', label: 'L', color: 'fp-purple' }],
      }
      expect(graphSpecSchema.safeParse(spec).success).toBe(false)
    }
    expect(RESERVED_PARAM_NAMES.has('sin')).toBe(true)
  })

  it('rejects default outside [min, max]', () => {
    const spec = {
      title: 'T',
      alt: 'Description ten chars at least.',
      xAxis: { label: 'x', domain: [0, 1] },
      yAxis: { label: 'y', domain: [0, 1] },
      params: [{ name: 'a', label: 'A', min: 0, max: 10, step: 1, default: 99 }],
      curves: [{ fn: 'a*x', label: 'L', color: 'fp-purple' }],
    }
    expect(graphSpecSchema.safeParse(spec).success).toBe(false)
  })

  it('rejects degenerate axis domain', () => {
    const spec = {
      title: 'T',
      alt: 'Description ten chars at least.',
      xAxis: { label: 'x', domain: [1, 1] },
      yAxis: { label: 'y', domain: [0, 1] },
      curves: [{ fn: 'x', label: 'L', color: 'fp-purple' }],
    }
    expect(graphSpecSchema.safeParse(spec).success).toBe(false)
  })

  it('rejects unknown color tokens', () => {
    const spec = {
      title: 'T',
      alt: 'Description ten chars at least.',
      xAxis: { label: 'x', domain: [0, 1] },
      yAxis: { label: 'y', domain: [0, 1] },
      curves: [{ fn: 'x', label: 'L', color: 'rebeccapurple' }],
    }
    expect(graphSpecSchema.safeParse(spec).success).toBe(false)
  })

  it('flags duplicate param names', () => {
    const spec = {
      title: 'T',
      alt: 'Description ten chars at least.',
      xAxis: { label: 'x', domain: [0, 1] },
      yAxis: { label: 'y', domain: [0, 1] },
      params: [
        { name: 'a', label: 'A', min: 0, max: 1, step: 0.1, default: 0.5 },
        { name: 'a', label: 'A2', min: 0, max: 1, step: 0.1, default: 0.5 },
      ],
      curves: [{ fn: 'a*x', label: 'L', color: 'fp-purple' }],
    }
    expect(graphSpecSchema.safeParse(spec).success).toBe(false)
  })
})

describe('transformGraphs', () => {
  it('replaces a valid graph fence with a graphMount node', () => {
    const tree = parse(VALID_BLOCK)
    transformGraphs(tree)
    const node = tree.children[0] as {
      type: string
      data?: { hName?: string; hProperties?: Record<string, string> }
    }
    expect(node.type).toBe('graphMount')
    expect(node.data?.hName).toBe('graph-mount')
    expect(typeof node.data?.hProperties?.spec).toBe('string')
    const parsed = JSON.parse(node.data!.hProperties!.spec) as {
      title: string
      curves: { fn: string }[]
    }
    expect(parsed.title).toBe('Lineární poptávka')
    expect(parsed.curves[0]?.fn).toBe('a - b*x')
  })

  it('replaces an invalid fence with a graphError node (YAML error)', () => {
    const tree = parse('```graph\n  : not yaml\n  -- invalid: \n```\n')
    transformGraphs(tree)
    const node = tree.children[0] as {
      type: string
      data?: { hName?: string; hProperties?: Record<string, unknown> }
    }
    expect(node.type).toBe('graphError')
    expect(node.data?.hName).toBe('aside')
    expect((node.data?.hProperties as { className: string[] }).className).toEqual(['graph-error'])
  })

  it('replaces an invalid fence with a graphError node (schema error)', () => {
    const tree = parse('```graph\ntitle: foo\nalt: too short\n```\n')
    transformGraphs(tree)
    const node = tree.children[0] as { type: string }
    expect(node.type).toBe('graphError')
  })

  it('leaves non-graph code blocks alone', () => {
    const tree = parse('```ts\nconst x = 1\n```\n')
    transformGraphs(tree)
    const node = tree.children[0] as { type: string; lang?: string }
    expect(node.type).toBe('code')
    expect(node.lang).toBe('ts')
  })

  it('is idempotent (re-running does not re-transform)', () => {
    const tree = parse(VALID_BLOCK)
    transformGraphs(tree)
    const before = JSON.stringify(tree)
    transformGraphs(tree)
    expect(JSON.stringify(tree)).toBe(before)
  })

  it('transforms nested fences (inside a blockquote)', () => {
    const tree = parse(
      `> intro\n>\n> ${'```graph'}\n> title: T\n> alt: Description ten chars min.\n> xAxis: { label: x, domain: [0, 1] }\n> yAxis: { label: y, domain: [0, 1] }\n> curves:\n>   - { fn: x, label: L, color: fp-purple }\n> ${'```'}\n`,
    )
    transformGraphs(tree)
    // Walk into the blockquote — at minimum, no `code` lang='graph' should
    // remain anywhere in the tree.
    const seen: string[] = []
    function walk(n: { type: string; lang?: string; children?: unknown[] }) {
      seen.push(n.type)
      if (Array.isArray(n.children))
        for (const c of n.children) walk(c as Parameters<typeof walk>[0])
    }
    walk(tree as unknown as Parameters<typeof walk>[0])
    const stillCode = (tree as unknown as { children: unknown[] }).children.flatMap(function visit(
      n: unknown,
    ): unknown[] {
      const node = n as { type?: string; lang?: string; children?: unknown[] }
      const here = node.type === 'code' && node.lang === 'graph' ? [node] : []
      const more = (node.children ?? []).flatMap((c) => visit(c))
      return [...here, ...more]
    })
    expect(stillCode).toHaveLength(0)
  })
})

describe('specToProp', () => {
  it('round-trips through JSON.parse', () => {
    const spec = graphSpecSchema.parse({
      title: 'T',
      alt: 'Description ten chars at least.',
      xAxis: { label: 'x', domain: [0, 1] },
      yAxis: { label: 'y', domain: [0, 1] },
      curves: [{ fn: 'x', label: 'L', color: 'fp-purple' }],
    })
    const prop = specToProp(spec)
    const parsed = JSON.parse(prop) as typeof spec
    expect(parsed.title).toBe(spec.title)
    expect(parsed.curves[0]?.fn).toBe('x')
  })
})

// mdast-util-to-hast is an indirect dep of @nuxt/content; we don't import it
// directly here to avoid promoting a dev dep just for a smoke test. The hast
// conversion contract is verified at runtime in the actual app build (the
// dev-server preview is the integration test).
