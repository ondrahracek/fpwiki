/**
 * Shared open-state for the mobile navigation slideover. Keyed via useState so
 * SSR and the two render sites (AppHeader's hamburger trigger, the layout's
 * <USlideover>) reach the same ref.
 *
 * The literal 'sidebar-mobile-open' is the persisted contract — do not rename
 * without updating both call sites.
 */
const MOBILE_NAV_KEY = 'sidebar-mobile-open'

export function useMobileNavOpen() {
  return useState<boolean>(MOBILE_NAV_KEY, () => false)
}
