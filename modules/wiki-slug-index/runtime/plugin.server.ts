// Loads the build-time slug index and seeds useState so SSR has it.
import index from '#build/wiki-slug-index.json'
import type { WikiSlugIndex } from '../../../shared/types/wiki'

export default defineNuxtPlugin(() => {
  const state = useState<WikiSlugIndex>('wiki-slug-index')
  state.value = index as WikiSlugIndex
})
