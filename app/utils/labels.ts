/**
 * Display labels for content types and collections. Single source of truth —
 * promoted from inlined maps in WikiPage.vue, AppSearch.vue, tag/[slug].vue.
 */
import type { WikiCollectionName, WikiPageType } from '#shared/types/wiki'

export const TYPE_LABELS: Record<WikiPageType, string> = {
  course: 'Předmět',
  topic: 'Téma',
  summary: 'Shrnutí',
  output: 'Výstup',
  overview: 'Přehled',
}

export const TYPE_FALLBACK_LABEL = 'Materiál'

/**
 * Plural-collection → singular Czech label. `overview` is the home singleton
 * and never renders as a badge, hence omitted.
 */
export const COLLECTION_LABELS: Partial<Record<WikiCollectionName, string>> = {
  courses: 'Předmět',
  topics: 'Téma',
  summaries: 'Shrnutí',
  outputs: 'Výstup',
}

/**
 * Plural label of a collection — used in breadcrumbs ("fpwiki / Předměty / …").
 */
export const COLLECTION_PLURAL: Partial<Record<WikiCollectionName, string>> = {
  courses: 'Předměty',
  topics: 'Témata',
  summaries: 'Shrnutí',
  outputs: 'Výstupy',
}

export function typeLabel(type: WikiPageType | undefined): string {
  return type ? (TYPE_LABELS[type] ?? TYPE_FALLBACK_LABEL) : TYPE_FALLBACK_LABEL
}

export function collectionLabel(collection: WikiCollectionName | undefined): string {
  return collection ? (COLLECTION_LABELS[collection] ?? collection) : ''
}

export function collectionPluralLabel(collection: WikiCollectionName | undefined): string {
  return collection ? (COLLECTION_PLURAL[collection] ?? collection) : ''
}
