// @vitest-environment nuxt
import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DisclaimerBanner from '../../app/components/DisclaimerBanner.vue'

const COOKIE = 'fp-disclaimer-dismissed'

function clearCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

describe('DisclaimerBanner', () => {
  beforeEach(() => {
    clearCookie()
  })

  it('renders the disclaimer when no cookie is set', async () => {
    const wrapper = await mountSuspended(DisclaimerBanner)
    expect(wrapper.text()).toContain('Neoficiální studijní materiály')
  })

  it('hides the banner and writes the cookie when the close button is clicked', async () => {
    const wrapper = await mountSuspended(DisclaimerBanner)

    const closeButton = wrapper.find('button')
    expect(closeButton.exists()).toBe(true)

    await closeButton.trigger('click')

    expect(wrapper.text()).not.toContain('Neoficiální studijní materiály')
    // useCookie JSON-encodes values, so the raw cookie payload is %221%22 (URL-encoded "1").
    expect(document.cookie).toContain(`${COOKIE}=%221%22`)
  })
})
