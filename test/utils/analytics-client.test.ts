import { ref } from 'vue'
import {
  createAnalyticsClient,
  isAnalyticsConsent,
  type AnalyticsConsent,
  type AnalyticsCookieRef,
} from '../../app/utils/analytics-client'
import { isTrackableAnalyticsPath, type AnalyticsPageContext } from '../../shared/analytics'

const page = (overrides: Partial<AnalyticsPageContext> = {}): AnalyticsPageContext => ({
  pagePath: '/',
  pageType: 'home',
  courseGroup: 'unassigned',
  pageTitle: 'fpwiki',
  ...overrides,
})

function eventPayloads(name?: string): Array<Record<string, string>> {
  const entries = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []) as unknown[][]
  return entries
    .filter((entry) => entry[0] === 'event' && (!name || entry[1] === name))
    .map((entry) => entry[2] as Record<string, string>)
}

function commandPayload(name: string): Record<string, unknown> | undefined {
  const entries = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []) as unknown[][]
  return entries.find((entry) => entry[0] === name)?.[2] as Record<string, unknown> | undefined
}

function commandPayloads(name: string): Array<Record<string, unknown>> {
  const entries = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []) as unknown[][]
  return entries
    .filter((entry) => entry[0] === name)
    .map((entry) => entry[2] as Record<string, unknown>)
}

const clients: ReturnType<typeof createAnalyticsClient>[] = []

function setup(
  initial: AnalyticsConsent | 'unknown' = 'v1:accepted',
  options: { start?: boolean; referrer?: string } = {},
) {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  document.cookie = '_ga=; Max-Age=0; Path=/'
  document.cookie = '_ga_TEST=; Max-Age=0; Path=/'
  Object.defineProperty(document, 'referrer', {
    configurable: true,
    value: options.referrer ?? '',
  })
  const consent: AnalyticsCookieRef = { value: initial === 'unknown' ? undefined : initial }
  const reload = vi.fn()
  const scripts: HTMLScriptElement[] = []
  const client = createAnalyticsClient({
    gaId: 'G-TEST',
    siteOrigin: 'https://fpwiki.cz',
    consent,
    preferencesOpen: ref(false),
    document,
    window,
    reload,
    loadScript: (script) => scripts.push(script),
  })
  clients.push(client)
  client.setPageContext(page())
  if (options.start ?? initial === 'v1:accepted') client.pageFinished()
  return { client, consent, reload, scripts }
}

function addLink(options: {
  href: string
  component?: string
  placement?: string
  layout?: string
  child?: boolean
}): HTMLAnchorElement {
  const placement = document.createElement('div')
  placement.dataset.analyticsPlacement = options.placement ?? 'site_header'
  placement.dataset.analyticsLayout = options.layout ?? 'inline'
  const component = document.createElement('div')
  component.dataset.analyticsComponent = options.component ?? 'primary_nav'
  const anchor = document.createElement('a')
  anchor.href = options.href
  if (options.child) anchor.append(document.createElement('span'))
  component.append(anchor)
  placement.append(component)
  document.body.append(placement)
  return anchor
}

describe('analytics client', () => {
  afterEach(() => {
    for (const client of clients.splice(0)) client.destroy()
    delete (window as unknown as { gtag?: unknown }).gtag
    delete (window as unknown as { dataLayer?: unknown }).dataLayer
  })

  it('validates versioned saved choices', () => {
    expect(isAnalyticsConsent('v1:accepted')).toBe(true)
    expect(isAnalyticsConsent('v1:denied')).toBe(true)
    expect(isAnalyticsConsent('accepted')).toBe(false)
  })

  it('does nothing before a choice and remembers an initial denial', () => {
    const { client, consent, scripts } = setup('unknown')
    client.pageFinished()
    expect(scripts).toHaveLength(0)
    expect(eventPayloads()).toEqual([])
    client.deny()
    expect(consent.value).toBe('v1:denied')
  })

  it('grants once and sends the current sanitized page exactly once', () => {
    const { client, scripts } = setup('unknown')
    client.setPageContext(
      page({ pagePath: '/courses', pageType: 'courses', pageTitle: 'Předměty\nfpwiki' }),
    )
    client.grant()
    client.pageFinished()
    expect(scripts).toHaveLength(1)
    expect(eventPayloads('page_view')).toEqual([
      expect.objectContaining({
        page_path: '/courses',
        page_location: 'https://fpwiki.cz/courses',
        page_title: 'Předměty fpwiki',
      }),
    ])
    expect(commandPayload('config')).toMatchObject({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_path: '/courses',
      page_location: 'https://fpwiki.cz/courses',
      page_title: 'Předměty fpwiki',
      page_referrer: expect.not.stringContaining('?'),
    })
  })

  it('keeps component and link identity stable when placement moves', () => {
    const { client } = setup()
    const desktop = addLink({
      href: '/courses',
      placement: 'left_sidebar',
      layout: 'desktop_sidebar',
    })
    const mobile = addLink({ href: '/courses', placement: 'left_sidebar', layout: 'mobile_drawer' })
    desktop.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    mobile.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    const events = eventPayloads('nav_click')
    expect(events.map((event) => event.component_id)).toEqual(['primary_nav', 'primary_nav'])
    expect(events.map((event) => event.link_id)).toEqual(['page:/courses', 'page:/courses'])
    expect(events.map((event) => event.nav_layout)).toEqual(['desktop_sidebar', 'mobile_drawer'])
    client.destroy()
  })

  it('captures a nested modified activation once without changing native behavior', () => {
    const { client } = setup()
    const anchor = addLink({ href: '/courses?private=query', child: true })
    const icon = anchor.firstElementChild!
    icon.textContent = 'private rendered label'
    const event = new MouseEvent('click', {
      bubbles: true,
      button: 0,
      metaKey: true,
      cancelable: true,
    })
    expect(icon.dispatchEvent(event)).toBe(true)
    expect(event.defaultPrevented).toBe(false)
    expect(eventPayloads('nav_click')).toEqual([
      expect.objectContaining({
        page_path: '/',
        link_id: 'page:/courses',
        target_path: '/courses',
      }),
    ])
    expect(JSON.stringify(eventPayloads('nav_click'))).not.toContain('private')
    client.destroy()
  })

  it('keeps different components and targets distinct', () => {
    const { client } = setup()
    const primary = addLink({ href: '/courses', component: 'primary_nav' })
    const subject = addLink({ href: '/wiki/imek', component: 'subject_list' })
    primary.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    subject.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    expect(
      eventPayloads('nav_click').map(({ component_id, link_id }) => ({ component_id, link_id })),
    ).toEqual([
      { component_id: 'primary_nav', link_id: 'page:/courses' },
      { component_id: 'subject_list', link_id: 'page:/wiki/imek' },
    ])
    client.destroy()
  })

  it('keeps the site brand distinct from a home navigation link', () => {
    const { client } = setup()
    const brand = addLink({ href: '/', component: 'site_brand' })
    const home = addLink({ href: '/', component: 'primary_nav' })
    brand.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    home.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    expect(
      eventPayloads('nav_click').map(({ component_id, link_id }) => ({ component_id, link_id })),
    ).toEqual([
      { component_id: 'site_brand', link_id: 'page:/' },
      { component_id: 'primary_nav', link_id: 'page:/' },
    ])
    client.destroy()
  })

  it('captures a middle-click activation once', () => {
    const { client } = setup()
    const anchor = addLink({ href: '/wiki/anfis' })
    anchor.dispatchEvent(new MouseEvent('auxclick', { bubbles: true, button: 1 }))
    expect(eventPayloads('nav_click')).toEqual([
      expect.objectContaining({ link_id: 'page:/wiki/anfis', target_path: '/wiki/anfis' }),
    ])
    client.destroy()
  })

  it('keeps cross-page clicks while limiting section detail to indexed search results', () => {
    const { client } = setup()
    const article = addLink({ href: '/wiki/anfis#metoda', component: 'article_links' })
    const search = addLink({
      href: '/wiki/anfis#metoda',
      component: 'search_results',
      placement: 'search',
    })
    search.dataset.analyticsApprovedSection = 'true'
    article.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    search.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    expect(eventPayloads('nav_click')).toEqual([
      expect.objectContaining({
        component_id: 'article_links',
        link_id: 'page:/wiki/anfis',
        target_kind: 'page',
        target_path: '/wiki/anfis',
      }),
      expect.objectContaining({
        component_id: 'search_results',
        target_path: '/wiki/anfis',
        target_section: 'metoda',
      }),
    ])
    client.destroy()
  })

  it('records a TOC section without creating a fake page view', () => {
    const { client } = setup()
    const heading = document.createElement('h2')
    heading.id = 'metoda'
    document.body.append(heading)
    const anchor = addLink({
      href: `${window.location.origin}/#metoda`,
      component: 'table_of_contents',
      placement: 'right_sidebar',
      layout: 'desktop_sidebar',
    })
    client.pageFinished()
    anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    expect(eventPayloads('page_view')).toHaveLength(1)
    expect(eventPayloads('nav_click')).toEqual([
      expect.objectContaining({ target_kind: 'section', target_section: 'metoda' }),
    ])
    client.destroy()
  })

  it('uses fresh course context after route changes', () => {
    const { client } = setup('v1:accepted', { start: false })
    client.setPageContext(page({ pagePath: '/wiki/imek', pageType: 'course', courseGroup: 'imek' }))
    client.pageFinished()
    client.setPageContext(page({ pagePath: '/tags', pageType: 'tags', courseGroup: 'unassigned' }))
    client.pageFinished()
    expect(
      eventPayloads('page_view').map(({ page_path, course_group }) => ({
        page_path,
        course_group,
      })),
    ).toEqual([
      { page_path: '/wiki/imek', course_group: 'imek' },
      { page_path: '/tags', course_group: 'unassigned' },
    ])
    const latestConfig = commandPayloads('config').at(-1)
    expect(latestConfig).toMatchObject({
      send_page_view: false,
      page_path: '/tags',
      page_location: 'https://fpwiki.cz/tags',
      page_title: 'fpwiki',
      page_referrer: '',
    })
    const link = addLink({ href: '/courses' })
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
    expect(eventPayloads('nav_click').at(-1)).toMatchObject({
      page_path: '/tags',
      page_location: 'https://fpwiki.cz/tags',
      page_title: 'fpwiki',
      page_referrer: '',
      page_type: 'tags',
      course_group: 'unassigned',
    })
    client.destroy()
  })

  it.each(['/tag/ana%40example.com', '/wiki/lowercase-private-slug'])(
    'does not initialize the SDK for unverified dynamic source %s',
    (candidatePath) => {
      const { client, scripts } = setup('v1:accepted', { start: false })
      client.setPageContext(
        isTrackableAnalyticsPath(candidatePath)
          ? page({ pagePath: candidatePath, pageType: 'not_found' })
          : null,
      )
      client.pageFinished()

      expect(scripts).toHaveLength(0)
      expect((window as unknown as { dataLayer?: unknown[] }).dataLayer).toBeUndefined()
    },
  )

  it('suppresses an unknown referral origin from config and events', () => {
    const { client } = setup('v1:accepted', {
      start: false,
      referrer: 'https://alice-secret.example/private?token=qa',
    })
    client.setPageContext(page({ pagePath: '/courses', pageType: 'courses' }))
    client.pageFinished()

    expect(commandPayload('config')).toMatchObject({ page_referrer: '' })
    expect(eventPayloads('page_view')).toEqual([
      expect.objectContaining({ page_path: '/courses', page_referrer: '' }),
    ])
  })

  it('stops after a blocker error', () => {
    const { client, scripts } = setup()
    scripts[0]?.dispatchEvent(new Event('error'))
    addLink({ href: '/courses' }).dispatchEvent(
      new MouseEvent('click', { bubbles: true, button: 0 }),
    )
    expect(eventPayloads()).toEqual([])
    client.destroy()
  })

  it('keeps the site usable with an invalid measurement ID', () => {
    const consent: AnalyticsCookieRef = { value: undefined }
    const scripts: HTMLScriptElement[] = []
    const client = createAnalyticsClient({
      gaId: 'not-a-ga-id',
      siteOrigin: 'https://fpwiki.cz',
      consent,
      preferencesOpen: ref(false),
      document,
      window,
      reload: vi.fn(),
      loadScript: (script) => scripts.push(script),
    })
    clients.push(client)
    client.setPageContext(page())
    client.grant()
    expect(consent.value).toBe('v1:accepted')
    expect(scripts).toHaveLength(0)
    expect(eventPayloads()).toEqual([])
  })

  it('withdraws when an accepted user declines from reopened preferences', () => {
    const { client, consent, reload } = setup()
    document.cookie = '_ga=value; Path=/'
    document.cookie = '_ga_TEST=value; Path=/'
    document.cookie = 'essential=keep; Path=/'
    client.deny()
    expect(consent.value).toBe('v1:denied')
    expect(document.cookie).not.toContain('_ga=')
    expect(document.cookie).not.toContain('_ga_TEST=')
    expect(document.cookie).toContain('essential=keep')
    expect(reload).toHaveBeenCalledOnce()
    client.destroy()
  })
})
