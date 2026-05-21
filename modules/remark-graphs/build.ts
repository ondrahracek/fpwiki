/**
 * Pure mdast transformer for ` ```graph ` fenced code blocks.
 *
 * Walks code nodes whose info-string is `graph`, parses YAML body into a
 * `GraphSpec`, validates against the shared Zod schema, and replaces the node
 * with a synthetic `graphMount` node. mdast-util-to-hast's default unknown
 * handler then runs `applyData()` (verified in mdast-util-to-hast@13
 * lib/state.js), which honors `data.hName`/`data.hProperties` to produce
 * `<graph-mount spec="…">`. ContentRenderer.vue resolves <graph-mount> via
 * pascalCase lookup against the auto-imported `GraphMount` component.
 *
 * Failures are author-visible: invalid YAML or schema violations replace the
 * node with a `graphError` node that renders as <aside class="graph-error">.
 *
 * No I/O, no @nuxt/kit. Unit-tested via test/modules/remark-graphs.test.ts.
 */
import type { Root, Code, Paragraph, Text } from 'mdast'
import { load as loadYaml, JSON_SCHEMA, YAMLException } from 'js-yaml'
import { graphSpecSchema, type GraphSpec } from './schema'

export const GRAPH_FENCE_LANG = 'graph'

interface GraphMountNode {
  type: 'graphMount'
  /** Empty — mdast-util-to-hast default handler still calls applyData(). */
  children: []
  data: {
    hName: 'graph-mount'
    hProperties: { spec: string }
  }
}

interface GraphErrorNode {
  type: 'graphError'
  children: [Paragraph, Code]
  data: {
    hName: 'aside'
    hProperties: { className: ['graph-error']; role: 'alert' }
  }
}

/**
 * Serialize the spec as JSON for the `spec` prop. The value travels as a
 * data-layer prop through hast → MDC AST → Vue (not as a literal HTML
 * attribute string), so JSON.stringify is sufficient. Component-side parse
 * uses JSON.parse(props.spec).
 */
export function specToProp(value: GraphSpec): string {
  return JSON.stringify(value)
}

function makeMountNode(spec: GraphSpec): GraphMountNode {
  return {
    type: 'graphMount',
    children: [],
    data: {
      hName: 'graph-mount',
      hProperties: { spec: specToProp(spec) },
    },
  }
}

function makeErrorNode(message: string, source: string): GraphErrorNode {
  return {
    type: 'graphError',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', value: `Chyba v bloku graph: ${message}` } satisfies Text],
      },
      {
        type: 'code',
        lang: 'yaml',
        value: source,
      },
    ],
    data: {
      hName: 'aside',
      hProperties: { className: ['graph-error'], role: 'alert' },
    },
  }
}

/**
 * Compact a Zod issue tree into a single human-readable line.
 */
function formatZodIssues(error: {
  issues: { path: (string | number)[]; message: string }[]
}): string {
  return error.issues
    .map((iss) => {
      const path = iss.path.length ? iss.path.join('.') : '<root>'
      return `${path}: ${iss.message}`
    })
    .join('; ')
}

/**
 * Transform every ` ```graph ` fence in the tree. Mutates in place.
 * Idempotent — already-transformed nodes have type 'graphMount'/'graphError'
 * so they're not re-visited as `code` nodes.
 */
export function transformGraphs(tree: Root): void {
  visit(tree as unknown as VisitableNode)
}

interface VisitableNode {
  type: string
  children?: unknown[]
}

function visit(node: VisitableNode | null | undefined): void {
  if (!node || typeof node !== 'object') return

  const children = node.children
  if (!Array.isArray(children)) return

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as VisitableNode | null
    if (!child || typeof child !== 'object') continue

    if (child.type === 'code' && (child as Code).lang === GRAPH_FENCE_LANG) {
      const codeNode = child as Code
      const replacement = parseAndValidate(codeNode.value ?? '')
      ;(children as unknown[])[i] = replacement as unknown
      continue
    }

    visit(child)
  }
}

function parseAndValidate(source: string): GraphMountNode | GraphErrorNode {
  let raw: unknown
  try {
    raw = loadYaml(source, { schema: JSON_SCHEMA })
  } catch (e) {
    const msg = e instanceof YAMLException ? e.message : String(e)
    return makeErrorNode(`YAML parse error: ${msg}`, source)
  }

  const result = graphSpecSchema.safeParse(raw)
  if (!result.success) {
    return makeErrorNode(`schema validation: ${formatZodIssues(result.error)}`, source)
  }
  return makeMountNode(result.data)
}
