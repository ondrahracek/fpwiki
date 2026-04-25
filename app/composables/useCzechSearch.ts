import { stripDiacritics } from '~/utils/slug'

/**
 * Czech-aware tokenization for search.
 *
 * Both the indexer and the query path MUST go through `processTerm` — letting
 * them drift means `pribytek` will fail to match `přebytek`. Tested in
 * test/utils/czech-search.test.ts.
 */
export function useCzechSearch() {
  const processTerm = (term: string): string | null => {
    const cleaned = stripDiacritics(term).toLowerCase().trim()
    return cleaned.length > 0 ? cleaned : null
  }

  /** Tokenize a multi-word string into search terms. */
  const tokenize = (text: string): string[] => {
    return stripDiacritics(text)
      .toLowerCase()
      .split(/[\s\p{P}]+/u)
      .filter((t) => t.length > 0)
  }

  return { processTerm, tokenize }
}
