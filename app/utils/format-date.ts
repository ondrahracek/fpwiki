/**
 * Czech short-date formatting. "20. 4." style — matches the design mocks.
 * Built on Intl, no `date-fns` dependency.
 */

const SHORT_DATE = new Intl.DateTimeFormat('cs-CZ', {
  day: 'numeric',
  month: 'numeric',
})

const LONG_DATE = new Intl.DateTimeFormat('cs-CZ', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function asDate(input: string | Date | undefined | null): Date | null {
  if (!input) return null
  const d = input instanceof Date ? input : new Date(String(input))
  return isNaN(d.getTime()) ? null : d
}

export function shortDate(input: string | Date | undefined | null): string {
  const d = asDate(input)
  return d ? SHORT_DATE.format(d) : ''
}

export function longDate(input: string | Date | undefined | null): string {
  const d = asDate(input)
  return d ? LONG_DATE.format(d) : ''
}

/**
 * Coarse relative time in Czech: "před 2 hodinami", "včera", "před 3 dny",
 * fallback to short date. Suitable for "Poslední úpravy" rows.
 */
export function relativeTime(input: string | Date | undefined | null): string {
  const d = asDate(input)
  if (!d) return ''
  const diffMs = Date.now() - d.getTime()
  const diffMin = Math.round(diffMs / 60_000)
  if (diffMin < 1) return 'před chvílí'
  if (diffMin < 60) return `před ${diffMin} min`
  const diffH = Math.round(diffMin / 60)
  if (diffH < 24) return diffH === 1 ? 'před hodinou' : `před ${diffH} h`
  const diffD = Math.round(diffH / 24)
  if (diffD === 1) return 'včera'
  if (diffD < 7) return `před ${diffD} dny`
  return shortDate(d)
}
