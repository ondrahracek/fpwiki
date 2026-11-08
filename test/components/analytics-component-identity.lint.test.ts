import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const cwd = process.cwd()

describe('movable analytics components', () => {
  it.each([
    ['WikiTocCard.vue', 'tableOfContents'],
    ['WikiBacklinksCard.vue', 'backlinks'],
    ['WikiRelatedCard.vue', 'relatedTopics'],
  ])('%s owns its semantic component identity', async (file, identity) => {
    const source = await readFile(join(cwd, 'app/components', file), 'utf8')
    const template = source.slice(source.indexOf('<template>'), source.indexOf('</template>'))

    expect(template).toContain(`ANALYTICS_COMPONENTS.${identity}`)
  })

  it('keeps the site brand distinct from the primary navigation container', async () => {
    const source = await readFile(join(cwd, 'app/components/AppHeader.vue'), 'utf8')

    expect(source).toContain(':data-analytics-component="ANALYTICS_COMPONENTS.siteBrand"')
  })
})
