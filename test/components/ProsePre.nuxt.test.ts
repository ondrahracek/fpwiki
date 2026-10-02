// @vitest-environment nuxt
import { describe, it, expect, vi } from 'vitest'
import { h } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import ProsePre from '../../app/components/content/ProsePre.vue'

const run = vi.fn(async () => ({
  output: [
    { type: 'stdout' as const, text: '[1] 1' },
    { type: 'error' as const, text: 'Error: boom' },
  ],
  images: [],
}))
mockNuxtImport('useWebR', () => () => ({ run }))

const highlighted = () => h('code', [h('span', { class: 'line' }, 'x <- 1')])

function mountPre(language: string | undefined, { untagged = false } = {}) {
  const meta = untagged ? undefined : ''
  return mountSuspended(ProsePre, {
    props: { language, meta, code: 'x <- 1', class: `language-${language ?? 'none'} shiki` },
    slots: { default: highlighted },
  })
}

describe('ProsePre', () => {
  it('renders r code statically with a run button and no runner', async () => {
    const wrapper = await mountPre('r')
    expect(wrapper.find('pre.shiki code span.line').text()).toBe('x <- 1')
    expect(wrapper.text()).toContain('Spustit v prohlížeči')
    expect(wrapper.find('textarea').exists()).toBe(false)
  })

  it('has no run button for other languages', async () => {
    for (const language of ['matlab', 'text', undefined]) {
      const wrapper = await mountPre(language)
      expect(wrapper.find('pre code').exists()).toBe(true)
      expect(wrapper.text()).not.toContain('Spustit')
    }
  })

  it('passes the highlighter classes through exactly once', async () => {
    for (const language of ['r', 'matlab']) {
      const tokens = (await mountPre(language)).find('pre').attributes('class')!.split(/\s+/)
      expect(tokens.filter((c) => c === `language-${language}`)).toHaveLength(1)
      expect(tokens.filter((c) => c === 'shiki')).toHaveLength(1)
    }
  })

  it('marks explicit text fences as console output, not untagged ones', async () => {
    expect((await mountPre('text')).find('pre').classes()).toContain('prose-pre-output')
    expect((await mountPre('text', { untagged: true })).find('pre').classes()).not.toContain(
      'prose-pre-output',
    )
    expect((await mountPre('r')).find('pre').classes()).not.toContain('prose-pre-output')
  })

  it('swaps to an editable runner on click and shows the output', async () => {
    const wrapper = await mountSuspended(ProsePre, {
      props: { language: 'r', meta: '', code: 'x <- 1\n' },
      slots: { default: highlighted },
    })
    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(run).toHaveBeenCalledWith('x <- 1', expect.any(Function))
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('x <- 1')
    expect(wrapper.find('.r-out-stdout').text()).toBe('[1] 1')
    expect(wrapper.find('.r-out-error').text()).toBe('Error: boom')
    expect(wrapper.find('[aria-live="polite"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Spustit znovu')
  })

  it('replaces the course output with the live run and restores it on reset', async () => {
    const host = document.body.appendChild(document.createElement('div'))
    const sibling = document.createElement('div')
    sibling.innerHTML = '<pre class="prose-pre-output">[1] 1</pre>'

    let finish!: () => void
    run.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = () =>
            resolve({ output: [{ type: 'stdout' as const, text: '[1] 2' }], images: [] })
        }),
    )
    const wrapper = await mountSuspended(ProsePre, {
      props: { language: 'r', meta: '', code: 'x <- 2' },
      slots: { default: highlighted },
      attachTo: host,
    })
    wrapper.find('.r-code').element.after(sibling)
    expect(sibling.hidden).toBe(false)

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(sibling.classList.contains('r-output-pending')).toBe(true)
    expect(sibling.hidden).toBe(false)
    expect(wrapper.find('.r-runner-output').exists()).toBe(false)

    finish()
    await flushPromises()
    expect(sibling.hidden).toBe(true)
    expect(wrapper.find('.r-out-stdout').text()).toBe('[1] 2')

    const reset = wrapper.findAll('button').find((b) => b.text().includes('Obnovit původní'))!
    await reset.trigger('click')
    await flushPromises()
    expect(sibling.hidden).toBe(false)
    expect(sibling.classList.contains('r-output-pending')).toBe(false)
    expect(wrapper.find('textarea').exists()).toBe(false)
    wrapper.unmount()
    host.remove()
  })

  it('first runs the earlier blocks of the page that have not run yet', async () => {
    const host = document.body.appendChild(document.createElement('div'))
    const mountAt = (code: string) =>
      mountSuspended(ProsePre, {
        props: { language: 'r', meta: '', code },
        slots: { default: highlighted },
        attachTo: host,
      })
    const first = await mountAt('a <- 1')
    const second = await mountAt('b <- a + 1')
    const third = await mountAt('print(b)')

    run.mockClear()
    await third.find('button').trigger('click')
    await flushPromises()
    expect(run.mock.calls.map((c) => c[0])).toEqual(['a <- 1', 'b <- a + 1', 'print(b)'])
    expect(first.find('textarea').exists()).toBe(false)

    run.mockClear()
    await second.find('button').trigger('click')
    await flushPromises()
    expect(run.mock.calls.map((c) => c[0])).toEqual(['b <- a + 1'])

    for (const w of [first, second, third]) w.unmount()
    host.remove()
  })
})
