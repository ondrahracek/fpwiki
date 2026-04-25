// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CoursePill from '../../app/components/CoursePill.vue'
import TagPill from '../../app/components/TagPill.vue'

function inlineStyle(html: string): string {
  return html.match(/style="([^"]*)"/)?.[1] ?? ''
}

describe('CoursePill', () => {
  it('renders the slug uppercased', async () => {
    const wrapper = await mountSuspended(CoursePill, { props: { slug: 'imek' } })
    expect(wrapper.text()).toContain('IMEK')
  })

  it('links to /wiki/<slug>', async () => {
    const wrapper = await mountSuspended(CoursePill, { props: { slug: 'imek' } })
    expect(wrapper.find('a').attributes('href')).toBe('/wiki/imek')
  })

  it('renders nothing for an empty slug', async () => {
    const wrapper = await mountSuspended(CoursePill, { props: { slug: '' } })
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('produces the same color for the same slug regardless of casing', async () => {
    const lower = await mountSuspended(CoursePill, { props: { slug: 'imek' } })
    const upper = await mountSuspended(CoursePill, { props: { slug: 'IMEK' } })
    expect(inlineStyle(lower.html())).toBe(inlineStyle(upper.html()))
  })

  it('shares its color with TagPill of the same identifier', async () => {
    const pill = await mountSuspended(CoursePill, { props: { slug: 'imek' } })
    const tag = await mountSuspended(TagPill, { props: { tag: 'imek' } })
    // Both consume identityVars('imek'), so the inline --id-* vars must match.
    expect(inlineStyle(pill.html())).toBe(inlineStyle(tag.html()))
  })
})
