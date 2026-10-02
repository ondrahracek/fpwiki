/**
 * Display labels for content types and collections. Single source of truth —
 * promoted from inlined maps in WikiPage.vue, AppSearch.vue, tag/[slug].vue.
 */
import { isDegree, type Degree, type Semester, type StudyPlacement } from '#shared/study-plan'
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

/**
 * Course-hero label of a degree: the type of study, not the academic title
 * ("Navazující magisterské · 12 zápisků").
 */
export const DEGREE_LABELS: Record<Degree, string> = {
  bachelor: 'Bakalářské',
  master: 'Navazující magisterské',
}

/** Hero label for a course's `degree` frontmatter; undefined when absent or unknown. */
export function degreeLabel(degree: unknown): string | undefined {
  return isDegree(degree) ? DEGREE_LABELS[degree] : undefined
}

/**
 * Degree prefix of a semester label, shown only when several degrees are
 * listed: the title FP VUT awards. Economics master's graduates become Ing.,
 * not Mgr. (zákon o vysokých školách § 46).
 */
export const DEGREE_ABBREVIATIONS: Record<Degree, string> = {
  bachelor: 'Bc.',
  master: 'Ing.',
}

export const SEMESTER_LABELS: Record<Semester, string> = {
  winter: 'zimní semestr',
  summer: 'letní semestr',
}

/**
 * "1. ročník · letní semestr", or "Ing. 1. ročník · letní semestr" with
 * `withDegree` (when a listing spans several degrees).
 */
export function studyPlacementLabel(placement: StudyPlacement, withDegree = false): string {
  const label = `${placement.studyYear}. ročník · ${SEMESTER_LABELS[placement.semester]}`
  return withDegree ? `${DEGREE_ABBREVIATIONS[placement.degree]} ${label}` : label
}
