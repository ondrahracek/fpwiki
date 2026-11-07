import { mountSuspended } from '@nuxt/test-utils/runtime'
import WikiTocCard from '../../app/components/WikiTocCard.vue'

describe('WikiTocCard native section behavior', () => {
  it('carries its semantic identity when mounted in another analytics surface', async () => {
    const wrapper = await mountSuspended(WikiTocCard, {
      props: { links: [{ id: 'metoda', text: 'Metoda', depth: 2 }] },
      attrs: {
        'data-analytics-placement': 'article',
        'data-analytics-layout': 'inline',
      },
    })

    expect(wrapper.get('nav').attributes('data-analytics-component')).toBe('table_of_contents')
    expect(wrapper.get('nav').attributes('data-analytics-placement')).toBe('article')
    wrapper.unmount()
  })

  it('keeps the existing smooth scroll and replaces the current hash', async () => {
    const heading = document.createElement('h2')
    heading.id = 'metoda'
    const scrollIntoView = vi.fn()
    heading.scrollIntoView = scrollIntoView
    document.body.append(heading)

    const wrapper = await mountSuspended(WikiTocCard, {
      props: { links: [{ id: 'metoda', text: 'Metoda', depth: 2 }] },
    })
    await wrapper.get('a').trigger('click')

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    expect(window.location.hash).toBe('#metoda')
    wrapper.unmount()
    heading.remove()
    history.replaceState(null, '', window.location.pathname)
  })
})
