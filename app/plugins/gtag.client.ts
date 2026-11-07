import {
  isTrackableAnalyticsPath,
  pageTypeForPath,
  sanitizePublicPath,
  type AnalyticsPageContext,
} from '#shared/analytics'
import {
  ANALYTICS_CONSENT_COOKIE,
  ANALYTICS_CONSENT_MAX_AGE,
  createAnalyticsClient,
  isAnalyticsConsent,
  type AnalyticsConsent,
} from '~/utils/analytics-client'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const consent = useCookie<AnalyticsConsent | undefined>(ANALYTICS_CONSENT_COOKIE, {
    maxAge: ANALYTICS_CONSENT_MAX_AGE,
    sameSite: 'lax',
    secure: !import.meta.dev,
    path: '/',
  })
  if (!isAnalyticsConsent(consent.value)) consent.value = undefined

  const preferencesOpen = useState('analytics-preferences-open', () => false)
  const pageContext = useState<AnalyticsPageContext | null>('analytics-page-context', () => null)
  const gaId = String(config.public.gaId ?? '')
  const configuredOrigin = String(config.public.siteUrl ?? '')
  const client = createAnalyticsClient({
    gaId,
    siteOrigin: configuredOrigin || window.location.origin,
    consent,
    preferencesOpen,
    document,
    window,
    reload: () => window.location.reload(),
  })

  nuxtApp.hook('page:start', () => {
    // The destination may publish its context before this suspense hook runs.
    client.setPageContext(null)
  })
  nuxtApp.hook('page:finish', () => {
    const pagePath = sanitizePublicPath(route.path)
    if (!pagePath) return
    const explicitContext = pageContext.value?.pagePath === pagePath ? pageContext.value : null
    if (!explicitContext && !isTrackableAnalyticsPath(pagePath)) {
      client.setPageContext(null)
      return
    }
    client.setPageContext(
      explicitContext ?? {
        pagePath,
        pageType: pageTypeForPath(pagePath),
        courseGroup: 'unassigned',
        pageTitle: document.title,
      },
    )
    client.pageFinished()
  })

  return { provide: { analytics: client } }
})
