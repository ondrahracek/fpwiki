import { mountSuspended } from '@nuxt/test-utils/runtime'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import AnalyticsConsent from '../../app/components/AnalyticsConsent.vue'
import AppFooter from '../../app/components/AppFooter.vue'
import PrivacyPage from '../../app/pages/about/soukromi.vue'

describe('analytics consent controls', () => {
  beforeEach(() => {
    document.cookie = 'fp-analytics-consent=; Max-Age=0; Path=/'
    document.head.querySelectorAll('[data-fpwiki-analytics]').forEach((element) => element.remove())
  })

  it('shows two equally styled, clear choices without injecting GA', async () => {
    const wrapper = await mountSuspended(AnalyticsConsent)
    const notice = wrapper.get('[aria-label="Měření návštěvnosti"]')
    const buttons = wrapper.findAll('button')
    expect(notice.get('h2').text()).toBe('Pomůžeš mi vylepšit fpwiki?')
    expect(notice.text()).toContain(
      'Google Analytics mi ukáže, které zápisky a odkazy studenti používají.',
    )
    expect(notice.get('p').get('a').text()).toBe('Jak měření funguje')
    expect(notice.classes()).toContain('max-w-sm')
    expect(notice.classes()).not.toContain('shadow-lg')
    expect(buttons.map((button) => button.text())).toEqual(['Odmítnout', 'Povolit měření'])
    expect(buttons[0]?.classes()).toEqual(buttons[1]?.classes())
    expect(buttons[0]?.classes()).toContain('min-h-11')
    expect(document.head.querySelector('[data-fpwiki-analytics]')).toBeNull()
  })

  it('keeps consent preferences on the privacy page, not in the footer', async () => {
    const footer = await mountSuspended(AppFooter)
    expect(footer.text()).toContain('Soukromí')
    expect(footer.text()).not.toContain('Nastavit měření')
    expect(footer.findAll('button')).toHaveLength(0)

    const privacyPage = await readFile(join(process.cwd(), 'app/pages/about/soukromi.vue'), 'utf8')
    expect(privacyPage).toContain('Nastavit měření')
    expect(privacyPage).toContain('@click="openPreferences"')
    expect(privacyPage).toContain('<ClientOnly>')
    expect(privacyPage).toContain('<div class="min-h-9" aria-hidden="true" />')
  })

  it.each(['v1:accepted', 'v1:denied'] as const)(
    'opens settings with the expected saved choice for %s',
    async (choice) => {
      const analytics = useNuxtApp().$analytics
      analytics.consent.value = choice

      const privacy = await mountSuspended(PrivacyPage, { route: '/about/soukromi' })
      const reset = privacy.findAll('button').find((button) => button.text() === 'Nastavit měření')
      expect(reset).toBeDefined()
      await reset!.trigger('click')
      expect(analytics.consent.value).toBe(choice === 'v1:accepted' ? choice : undefined)
      expect(analytics.preferencesOpen.value).toBe(true)

      analytics.consent.value = undefined
      analytics.preferencesOpen.value = false
    },
  )
})
