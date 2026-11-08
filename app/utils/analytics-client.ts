import {
  ANALYTICS_COMPONENTS,
  ANALYTICS_LAYOUTS,
  ANALYTICS_PLACEMENTS,
  analyticsTarget,
  sanitizePageTitle,
  sanitizeReferrer,
  type AnalyticsComponentId,
  type AnalyticsLayout,
  type AnalyticsPageContext,
  type AnalyticsPlacement,
} from '#shared/analytics'
import type { Ref } from 'vue'

export const ANALYTICS_CONSENT_COOKIE = 'fp-analytics-consent'
export const ANALYTICS_CONSENT_MAX_AGE = 60 * 60 * 24 * 180
export type AnalyticsConsent = 'v1:accepted' | 'v1:denied'

export interface AnalyticsCookieRef {
  value: AnalyticsConsent | undefined
}

export interface AnalyticsClient {
  readonly consent: AnalyticsCookieRef
  readonly preferencesOpen: Ref<boolean>
  grant(): void
  deny(): void
  withdraw(): void
  setPageContext(context: AnalyticsPageContext | null): void
  pageFinished(): void
  destroy(): void
}

interface GtagWindow extends Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

const COMPONENT_IDS = new Set<string>(Object.values(ANALYTICS_COMPONENTS))
const PLACEMENTS = new Set<string>(Object.values(ANALYTICS_PLACEMENTS))
const LAYOUTS = new Set<string>(Object.values(ANALYTICS_LAYOUTS))

export function isAnalyticsConsent(value: unknown): value is AnalyticsConsent {
  return value === 'v1:accepted' || value === 'v1:denied'
}

function gaCookieNames(gaId: string): string[] {
  return ['_ga', `_ga_${gaId.replace(/^G-/i, '').replace(/-/g, '_')}`]
}

function expireCookie(document: Document, name: string, domain?: string): void {
  const domainPart = domain ? `; Domain=${domain}` : ''
  document.cookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax${domainPart}`
}

export function createAnalyticsClient(options: {
  gaId: string
  siteOrigin: string
  consent: AnalyticsCookieRef
  preferencesOpen: Ref<boolean>
  document: Document
  window: Window
  reload: () => void
  loadScript?: (script: HTMLScriptElement) => void
}): AnalyticsClient {
  const { gaId, consent, preferencesOpen, document, reload } = options
  const win = options.window as GtagWindow
  const runtimeOrigin = win.location.origin
  const publicOrigin = options.siteOrigin.replace(/\/$/, '') || runtimeOrigin
  let enabled = false
  let context: AnalyticsPageContext | null = null
  let lastPagePath: string | null = null
  let script: HTMLScriptElement | null = null

  const pageParameters = (pageContext: AnalyticsPageContext) => {
    const referrer = sanitizeReferrer(document.referrer, runtimeOrigin)
    return {
      page_path: pageContext.pagePath,
      page_location: `${publicOrigin}${pageContext.pagePath}`,
      page_title: sanitizePageTitle(pageContext.pageTitle),
      page_referrer: referrer ?? '',
    }
  }

  const dispatch = (eventName: 'page_view' | 'nav_click', parameters: Record<string, string>) => {
    if (!enabled || consent.value !== 'v1:accepted') return
    win.gtag?.('event', eventName, parameters)
  }

  const inject = (): boolean => {
    if (enabled || !context || !/^G-[A-Z0-9]+$/i.test(gaId)) return false
    enabled = true
    win.dataLayer = []
    win.gtag = function () {
      // Google recognizes Arguments objects as commands; plain arrays are ignored.
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer?.push(arguments)
    }
    win.gtag('js', new Date())
    win.gtag('config', gaId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_path: '/',
      cookie_flags: 'SameSite=Lax;Secure',
      ...pageParameters(context),
    })
    script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    script.dataset.fpwikiAnalytics = 'true'
    script.addEventListener('error', () => {
      enabled = false
      win.dataLayer = []
      delete win.gtag
      script?.remove()
      script = null
    })
    if (options.loadScript) options.loadScript(script)
    else document.head.append(script)
    return true
  }

  const pageFinished = () => {
    if (!context || context.pagePath === lastPagePath) return
    if (consent.value !== 'v1:accepted') return
    const justInjected = inject()
    if (!enabled) return
    lastPagePath = context.pagePath
    const parameters = pageParameters(context)
    if (!justInjected) {
      win.gtag?.('config', gaId, {
        send_page_view: false,
        ...parameters,
      })
    }
    dispatch('page_view', {
      ...parameters,
      page_type: context.pageType,
      course_group: context.courseGroup,
    })
  }

  const capture = (event: MouseEvent) => {
    if (event.type === 'click' && event.button !== 0) return
    if (event.type === 'auxclick' && event.button !== 1) return
    const target = event.target
    if (!(target instanceof Element)) return
    const anchor = target.closest<HTMLAnchorElement>('a[href]')
    if (!anchor) return
    const componentElement = anchor.closest<HTMLElement>('[data-analytics-component]')
    const placementElement = anchor.closest<HTMLElement>('[data-analytics-placement]')
    if (!componentElement || !placementElement || !context) return

    const componentId = componentElement.dataset.analyticsComponent
    const placement = placementElement.dataset.analyticsPlacement
    const layout =
      anchor.closest<HTMLElement>('[data-analytics-layout]')?.dataset.analyticsLayout ??
      ANALYTICS_LAYOUTS.inline
    if (!COMPONENT_IDS.has(componentId ?? '')) return
    if (!PLACEMENTS.has(placement ?? '')) return
    if (!LAYOUTS.has(layout)) return
    let linkTarget = analyticsTarget(anchor.href, runtimeOrigin, context.pagePath)
    if (!linkTarget) return
    if (linkTarget.targetSection) {
      const samePageSection =
        linkTarget.targetPath === context.pagePath &&
        document.getElementById(linkTarget.targetSection)
      const approvedSearchSection =
        componentId === ANALYTICS_COMPONENTS.searchResults &&
        anchor.dataset.analyticsApprovedSection === 'true'
      if (!samePageSection && !approvedSearchSection) {
        linkTarget = analyticsTarget(linkTarget.targetPath ?? '', runtimeOrigin, context.pagePath)
        if (!linkTarget) return
      }
    }

    const source = pageParameters(context)
    dispatch('nav_click', {
      ...source,
      page_type: context.pageType,
      course_group: context.courseGroup,
      component_id: componentId as AnalyticsComponentId,
      link_id: linkTarget.linkId,
      placement: placement as AnalyticsPlacement,
      nav_layout: layout as AnalyticsLayout,
      target_kind: linkTarget.targetKind,
      ...(linkTarget.targetPath ? { target_path: linkTarget.targetPath } : {}),
      ...(linkTarget.targetSection ? { target_section: linkTarget.targetSection } : {}),
      ...(linkTarget.targetDomain ? { target_domain: linkTarget.targetDomain } : {}),
    })
  }

  const stopAnalytics = () => {
    enabled = false
    for (const name of gaCookieNames(gaId)) {
      expireCookie(document, name)
      expireCookie(document, name, win.location.hostname)
      expireCookie(document, name, `.${win.location.hostname}`)
    }
    win.dataLayer = []
    delete win.gtag
    script?.remove()
    script = null
  }

  const withdraw = () => {
    consent.value = 'v1:denied'
    stopAnalytics()
    reload()
  }

  document.addEventListener('click', capture, true)
  document.addEventListener('auxclick', capture, true)

  return {
    consent,
    preferencesOpen,
    grant() {
      consent.value = 'v1:accepted'
      preferencesOpen.value = false
      pageFinished()
    },
    deny() {
      if (consent.value === 'v1:accepted') {
        withdraw()
        return
      }
      consent.value = 'v1:denied'
      preferencesOpen.value = false
    },
    withdraw,
    setPageContext(value) {
      context = value
    },
    pageFinished,
    destroy() {
      document.removeEventListener('click', capture, true)
      document.removeEventListener('auxclick', capture, true)
    },
  }
}
