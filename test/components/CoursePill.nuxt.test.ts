// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CoursePill from '../../app/components/CoursePill.vue'

describe('CoursePill', () => {
  it('renders the slug uppercased', async () => {
    const wrapper = await mountSuspended(CoursePill, {
      props: { slug: 'imek' },
    })
    expect(wrapper.text()).toContain('IMEK')
  })

  it('links to /wiki/<slug>', async () => {
    const wrapper = await mountSuspended(CoursePill, {
      props: { slug: 'imek' },
    })
    const a = wrapper.find('a')
    expect(a.attributes('href')).toBe('/wiki/imek')
  })

  it('applies styling without crashing for unknown accent', async () => {
    const wrapper = await mountSuspended(CoursePill, {
      props: { slug: 'foo', accent: 'totally-unknown-tag' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
