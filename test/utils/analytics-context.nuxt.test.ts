import type { AnalyticsPageContext } from '#shared/analytics'

describe('analytics page lifecycle', () => {
  it('preserves a destination context published before page:start', async () => {
    const app = useNuxtApp()
    const context = app.runWithContext(() =>
      useState<AnalyticsPageContext | null>('analytics-page-context', () => null),
    )
    const destination: AnalyticsPageContext = {
      pagePath: '/tags',
      pageType: 'tags',
      courseGroup: 'unassigned',
      pageTitle: 'Štítky',
    }
    context.value = destination

    await app.callHook('page:start')

    expect(context.value).toEqual(destination)
    context.value = null
  })
})
