/**
 * Where a course sits in its study plan: degree, year of study (ročník) and
 * semester. Single source of truth for the allowed values — the courses
 * schema in content.config.ts and every listing derive from this module.
 *
 * The vault's tools/wiki_lint.py enforces the same rules on authoring (it is
 * the gate); keep STUDY_YEARS_BY_DEGREE there in step with DEGREES here.
 * Display labels are UI concerns and live in app/utils/labels.ts.
 */

/**
 * Degrees in the order a student takes them; that order is also the listing
 * order. `years` is the length of the programme (bakalářský 3, navazující
 * magisterský 2). Adding a degree is one entry here plus its label.
 */
export const DEGREES = {
  bachelor: { years: 3 },
  master: { years: 2 },
} as const satisfies Record<string, { years: number }>

export type Degree = keyof typeof DEGREES

export const DEGREE_IDS = Object.keys(DEGREES) as [Degree, ...Degree[]]

/** Semesters in academic-year order: the year starts in winter. */
export const SEMESTERS = ['winter', 'summer'] as const

export type Semester = (typeof SEMESTERS)[number]

/** Highest `studyYear` any degree allows; the schema's upper bound. */
export const MAX_STUDY_YEAR = Math.max(...DEGREE_IDS.map((d) => DEGREES[d].years))

export interface StudyPlacement {
  degree: Degree
  studyYear: number
  semester: Semester
}

/** Raw course frontmatter as stored; every field may be absent or malformed. */
export interface StudyPlacementFields {
  degree?: unknown
  studyYear?: unknown
  semester?: unknown
}

export function isDegree(value: unknown): value is Degree {
  return typeof value === 'string' && Object.hasOwn(DEGREES, value)
}

function isSemester(value: unknown): value is Semester {
  return (SEMESTERS as readonly unknown[]).includes(value)
}

/**
 * Validated placement, or null when a field is missing or out of range —
 * including a `studyYear` beyond the degree's length (e.g. a 3rd master's
 * year). Callers treat null as "not placed in the plan".
 */
export function parseStudyPlacement(fields: StudyPlacementFields): StudyPlacement | null {
  const { degree, studyYear, semester } = fields
  if (!isDegree(degree) || !isSemester(semester)) return null
  if (typeof studyYear !== 'number' || !Number.isInteger(studyYear)) return null
  if (studyYear < 1 || studyYear > DEGREES[degree].years) return null
  return { degree, studyYear, semester }
}

/**
 * Sort comparator in study-plan order: degree, then year, then semester.
 */
export function compareStudyPlacements(a: StudyPlacement, b: StudyPlacement): number {
  return (
    DEGREE_IDS.indexOf(a.degree) - DEGREE_IDS.indexOf(b.degree) ||
    a.studyYear - b.studyYear ||
    SEMESTERS.indexOf(a.semester) - SEMESTERS.indexOf(b.semester)
  )
}
