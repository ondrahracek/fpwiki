// @vitest-environment nuxt
import { describe, it, expect, afterEach, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { ref } from 'vue'
import AppPrimaryNav from '../../app/components/AppPrimaryNav.vue'
import type { CourseWithStats } from '../../app/composables/useCoursesWithStats'

const { courses } = vi.hoisted(() => ({ courses: { value: [] as CourseWithStats[] } }))

mockNuxtImport('useCoursesWithStats', () => () => Promise.resolve({ data: ref(courses.value) }))
mockNuxtImport('useTagCounts', () => () => Promise.resolve({ data: ref([]) }))

const SUMMER: CourseWithStats = {
  slug: 'imek',
  title: 'Matematická ekonomie (ImeK)',
  count: 3,
  placement: { degree: 'master', studyYear: 1, semester: 'summer' },
}
// Synthetic second-year course: no ingested course is in another semester yet.
const WINTER: CourseWithStats = {
  slug: 'kurz-b',
  title: 'Testovací kurz (KurzB)',
  count: 1,
  placement: { degree: 'master', studyYear: 2, semester: 'winter' },
}

describe('AppPrimaryNav semester groups', () => {
  const mounted: { unmount: () => void }[] = []
  const mount = async () => {
    const wrapper = await mountSuspended(AppPrimaryNav)
    mounted.push(wrapper)
    return wrapper
  }

  // Unmount before resetting: the open state is app-global (that's the point).
  afterEach(() => {
    mounted.splice(0).forEach((w) => w.unmount())
    clearNuxtState('nav-semester-open')
  })

  it('renders one semester flat, without group headers', async () => {
    courses.value = [SUMMER]
    const wrapper = await mount()
    expect(wrapper.text()).not.toContain('ročník')
    expect(wrapper.find('a[href="/wiki/imek"]').exists()).toBe(true)
  })

  it('opens the most advanced semester and keeps collapsed course links in the DOM', async () => {
    courses.value = [SUMMER, WINTER]
    const wrapper = await mount()
    const html = wrapper.html()
    // Study-plan order: 1st-year summer above 2nd-year winter.
    expect(html.indexOf('1. ročník · letní semestr')).toBeLessThan(
      html.indexOf('2. ročník · zimní semestr'),
    )
    const older = wrapper.find('a[href="/wiki/imek"]')
    expect(older.exists()).toBe(true)
    expect(older.element.closest('[hidden]')).not.toBeNull()
    expect(wrapper.find('a[href="/wiki/kurz-b"]').element.closest('[hidden]')).toBeNull()
  })

  it('shares open state between the two mounted instances', async () => {
    courses.value = [SUMMER, WINTER]
    const desktop = await mount()
    const mobile = await mount()
    const trigger = desktop.findAll('button').find((b) => b.text().includes('1. ročník'))
    await trigger!.trigger('click')
    await nextTick()
    expect(mobile.find('a[href="/wiki/imek"]').element.closest('[hidden]')).toBeNull()
  })

  it('opens a collapsed semester when navigating to one of its courses', async () => {
    courses.value = [SUMMER, WINTER]
    await navigateTo('/')
    const wrapper = await mount()
    expect(wrapper.find('a[href="/wiki/imek"]').element.closest('[hidden]')).not.toBeNull()
    await navigateTo('/wiki/imek')
    // The collapsible un-hides a macrotask after its `open` prop flips.
    await flushPromises()
    expect(wrapper.find('a[href="/wiki/imek"]').element.closest('[hidden]')).toBeNull()
  })
})
