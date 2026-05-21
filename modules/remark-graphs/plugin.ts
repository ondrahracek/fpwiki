/**
 * unified plugin wrapper around the pure transformer in ./build.ts.
 *
 * Default export is what `@nuxt/content` instantiates via `{ instance }`.
 */
import type { Plugin } from 'unified'
import type { Root } from 'mdast'
import { transformGraphs } from './build'

const remarkGraphs: Plugin<[], Root> = () => (tree) => {
  transformGraphs(tree)
}

export default remarkGraphs
