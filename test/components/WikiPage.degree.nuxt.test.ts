// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { computed } from 'vue'
import WikiPage from '../../app/components/WikiPage.vue'

mockNuxtImport('useCourseStats', () => () => computed(() => ({ zapisku: 12 })))
mockNuxtImport('queryCollection', () => () => ({ all: () => Promise.resolve([]) }))

const coursePage = { title: 'Matematická ekonomie (ImeK)', type: 'course' as const, course: 'imek' }

describe('WikiPage course hero degree', () => {
  it('names the degree from frontmatter', async () => {
    const bachelor = await mountSuspended(WikiPage, {
      props: { page: { ...coursePage, degree: 'bachelor' } },
    })
    expect(bachelor.find('header').text()).toContain('Bakalářské · 12 zápisků')
    const master = await mountSuspended(WikiPage, {
      props: { page: { ...coursePage, degree: 'master' } },
    })
    expect(master.find('header').text()).toContain('Navazující magisterské · 12 zápisků')
  })

  it('leaves the degree out when the page has none', async () => {
    const wrapper = await mountSuspended(WikiPage, { props: { page: coursePage } })
    const hero = wrapper.find('header').text()
    expect(hero).toContain('12 zápisků')
    expect(hero).not.toMatch(/magistersk|Bakalářsk|· 12 zápisků/)
  })
})
