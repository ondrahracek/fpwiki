// Client-side: useState is hydrated from SSR payload, but if the server skipped
// (full SPA fallback), we fetch the JSON. Bundling it via dynamic import keeps
// the initial payload small.
import type { WikiSlugIndex } from '../../../shared/types/wiki'

export default defineNuxtPlugin(async () => {
  const state = useState<WikiSlugIndex>('wiki-slug-index')
  if (state.value && state.value.entries.length > 0) return
  const mod = await import('#build/wiki-slug-index.json')
  state.value = (mod.default ?? mod) as WikiSlugIndex
})
