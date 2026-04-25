import { describe, it, expect } from 'vitest'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildWikiSlugIndex } from '../../modules/wiki-slug-index/build'

function setupContent(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'fpwiki-test-'))
  const contentDir = join(root, 'content')
  for (const [path, body] of Object.entries(files)) {
    const full = join(contentDir, path)
    mkdirSync(full.split(/[\\/]/).slice(0, -1).join('/'), { recursive: true })
    writeFileSync(full, body, 'utf8')
  }
  return root
}

describe('buildWikiSlugIndex', () => {
  it('walks all 4 collections + overview', async () => {
    const root = setupContent({
      'overview.md': '---\ntitle: "Přehled"\n---\n',
      'courses/imek.md': '---\ntitle: "ImeK"\ntype: course\n---\n',
      'topics/anfis.md': '---\ntitle: "ANFIS"\ntype: topic\n---\n',
      'summaries/imek-blok-01.md': '---\ntitle: "ImeK 1"\ntype: summary\n---\n',
      'outputs/imek-vzorce.md': '---\ntitle: "Vzorce"\ntype: output\n---\n',
    })

    const idx = await buildWikiSlugIndex(root)

    expect(idx.entries).toHaveLength(5)
    expect(idx.slugs.imek).toBe('/wiki/imek')
    expect(idx.slugs.anfis).toBe('/wiki/anfis')
    expect(idx.slugs.overview).toBe('/')
    expect(idx.entries.find((e) => e.slug === 'imek')?.collection).toBe('courses')
    expect(idx.entries.find((e) => e.slug === 'anfis')?.collection).toBe('topics')
  })

  it('uses frontmatter title when available', async () => {
    const root = setupContent({
      'topics/foo.md': '---\ntitle: "Pretty Title"\n---\n',
    })
    const idx = await buildWikiSlugIndex(root)
    expect(idx.entries[0]?.title).toBe('Pretty Title')
  })

  it('falls back to slug as title when frontmatter is missing', async () => {
    const root = setupContent({
      'topics/no-fm.md': 'just body\n',
    })
    const idx = await buildWikiSlugIndex(root)
    expect(idx.entries[0]?.title).toBe('no-fm')
  })

  it('only includes overview.md at content root, not in subfolders', async () => {
    const root = setupContent({
      'overview.md': '---\ntitle: "Real"\n---\n',
      'topics/overview.md': '---\ntitle: "Imposter"\n---\n',
    })
    const idx = await buildWikiSlugIndex(root)
    const overviews = idx.entries.filter((e) => e.collection === 'overview')
    expect(overviews).toHaveLength(1)
    expect(overviews[0]?.title).toBe('Real')
  })
})
