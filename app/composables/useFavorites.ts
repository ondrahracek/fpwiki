/**
 * Cookie-backed favorites — the "Sledovat" toggle on course pages.
 *
 * Uses useCookie so the SSR render reads the same value the client sees,
 * avoiding flash-of-wrong-state. No auth, no server state — purely
 * per-browser. Capped at 50 entries to keep the cookie small.
 *
 * Stale slugs (renamed/deleted upstream) are filtered out at read time
 * against the slug-index. Cleaned list is persisted on the next mutation.
 */
const MAX_FAVORITES = 50

function parse(raw: string | null | undefined): string[] {
  if (!raw) return []
  try {
    const v = JSON.parse(raw)
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const cookie = useCookie<string>('fp-favorites', {
    default: () => '',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const list = computed<string[]>(() => parse(cookie.value))

  const has = (slug: string) => list.value.includes(slug)

  const add = (slug: string) => {
    const current = parse(cookie.value)
    if (current.includes(slug)) return
    const next = [slug, ...current].slice(0, MAX_FAVORITES)
    cookie.value = JSON.stringify(next)
  }

  const remove = (slug: string) => {
    const current = parse(cookie.value)
    const next = current.filter((s) => s !== slug)
    cookie.value = next.length > 0 ? JSON.stringify(next) : ''
  }

  const toggle = (slug: string) => {
    if (has(slug)) remove(slug)
    else add(slug)
  }

  return { list, has, add, remove, toggle }
}
