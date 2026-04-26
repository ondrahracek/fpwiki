/**
 * unified plugin wrapper around the pure transformer in ./build.ts.
 *
 * Default export is what `@nuxt/content` instantiates via `{ instance }`.
 */
import type { Plugin } from 'unified'
import type { Root } from 'mdast'
import { transformCallouts, type CalloutOptions } from './build'

const remarkCallouts: Plugin<[CalloutOptions?], Root> = (opts) => (tree) => {
  transformCallouts(tree, opts ?? {})
}

export default remarkCallouts
