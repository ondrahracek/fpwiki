import {
  courseGroupFor,
  isTrackableAnalyticsPath,
  sanitizePublicPath,
  type AnalyticsPageContext,
  type AnalyticsPageType,
} from '#shared/analytics'

export function useAnalyticsPage(
  input: () => {
    pageType: AnalyticsPageType
    courses?: readonly string[]
    title: string
    verifiedDynamic?: boolean
  },
): void {
  const route = useRoute()
  const state = useState<AnalyticsPageContext | null>('analytics-page-context', () => null)
  watchEffect(() => {
    const value = input()
    const pagePath = sanitizePublicPath(route.path)
    if (!pagePath || !isTrackableAnalyticsPath(pagePath, value.verifiedDynamic)) {
      state.value = null
      return
    }
    state.value = {
      pagePath,
      pageType: value.pageType,
      courseGroup: courseGroupFor(value.courses ?? []),
      pageTitle: value.title,
    }
  })
}
