import type { SearchEngineKind } from '#shared/types/wiki'

/**
 * TODO(search-engine): Decide between Fuse and MiniSearch on real Czech corpus
 * (see CLAUDE.md "Search" + REFINED_PLAN §4.3 / §8.1). Both engines are
 * implemented — flip the switch via either:
 *   1. URL query: ?engine=fuse | ?engine=minisearch  (per-session A/B)
 *   2. localStorage: localStorage.setItem('fp-search-engine', 'minisearch')
 *   3. Default below
 *
 * Once a winner is chosen:
 *   - delete the loser composable (useFuseSearch.ts OR useMinisearchSearch.ts)
 *   - delete this file
 *   - inline the chosen call into <AppSearch>
 */
const DEFAULT_ENGINE: SearchEngineKind = 'fuse'

export function useSearchEngine(): Ref<SearchEngineKind> {
  const engine = useState<SearchEngineKind>('fp-search-engine', () => DEFAULT_ENGINE)

  if (import.meta.client) {
    const params = new URLSearchParams(window.location.search)
    const fromQuery = params.get('engine') as SearchEngineKind | null
    if (fromQuery === 'fuse' || fromQuery === 'minisearch') {
      engine.value = fromQuery
      try {
        localStorage.setItem('fp-search-engine', fromQuery)
      } catch {
        // ignore quota / privacy-mode failures
      }
    } else {
      try {
        const stored = localStorage.getItem('fp-search-engine') as SearchEngineKind | null
        if (stored === 'fuse' || stored === 'minisearch') engine.value = stored
      } catch {
        // ignore
      }
    }
  }

  return engine
}
