/**
 * Drift-prevention ratchet. Asserts that navigation has not regressed back
 * into per-route sidebar swapping.
 *
 * If this test fails, the unified `app/components/AppPrimaryNav.vue` has
 * either been split apart or the layout has reintroduced a route-keyed
 * sidebar switch.
 *
 * Background: prior to this consolidation, three sidebar components
 * (CoursesSidebar, TagsSidebar, WikiSidebar) were swapped inside
 * `app/layouts/sidebar.vue` based on `route.path`, and the home/about pages
 * had no sidebar or mobile menu at all. The fix unified them and dropped the
 * second layout. This ratchet locks that in.
 */
import { describe, it, expect } from 'vitest'
import { stat, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const cwd = process.cwd()

describe('Navigation is consolidated into a single component', () => {
  it('legacy per-route sidebars are deleted', async () => {
    const forbidden = [
      'app/components/CoursesSidebar.vue',
      'app/components/TagsSidebar.vue',
      'app/components/WikiSidebar.vue',
      'app/layouts/sidebar.vue',
    ]
    const present: string[] = []
    for (const rel of forbidden) {
      try {
        await stat(join(cwd, rel))
        present.push(rel)
      } catch {
        // expected — file is gone
      }
    }
    expect(present).toEqual([])
  })

  it('the default layout mounts AppPrimaryNav and does not switch by route', async () => {
    const layout = await readFile(join(cwd, 'app/layouts/default.vue'), 'utf8')
    expect(layout).toMatch(/AppPrimaryNav/)
    expect(layout).not.toMatch(/sidebarComponent/)
  })

  it('AppHeader mounts the mobile-menu trigger unconditionally', async () => {
    const header = await readFile(join(cwd, 'app/components/AppHeader.vue'), 'utf8')
    expect(header).not.toMatch(/showMenuTrigger/)
  })
})
