import { describe, it, expect } from 'vitest'
import { cleanTocLinks } from '../../app/utils/toc-text'

const katex = (tex: string, ...mrow: unknown[]) => [
  'span',
  { className: ['katex'] },
  [
    'math',
    {},
    [
      'semantics',
      {},
      ['mrow', {}, ...mrow],
      ['annotation', { encoding: 'application/x-tex' }, tex],
    ],
  ],
]

const body = [
  ['h2', { id: 'regulace' }, 'Regulace měřením'],
  ['h3', { id: 'diagram-c' }, 'Diagram ', katex('c', ['mi', {}, 'c'])],
  ['p', {}, 'text'],
  ['h3', { id: 'cp' }, katex('C_p', ['msub', {}, ['mi', {}, 'C'], ['mi', {}, 'p']]), ' — index'],
]

describe('cleanTocLinks', () => {
  it('drops the TeX annotation from headings with math, nested links included', () => {
    const links = [
      {
        id: 'regulace',
        depth: 2,
        text: 'Regulace měřením',
        children: [
          { id: 'diagram-c', depth: 3, text: 'Diagram cc' },
          { id: 'cp', depth: 3, text: 'CpC_p — index' },
        ],
      },
    ]
    const out = cleanTocLinks(links, body)
    expect(out[0]!.text).toBe('Regulace měřením')
    expect(out[0]!.children!.map((l) => l.text)).toEqual(['Diagram c', 'Cp — index'])
    expect(out[0]!.children![0]!.id).toBe('diagram-c')
  })

  it('keeps the original text when the heading is not in the body', () => {
    const links = [{ id: 'missing', depth: 2, text: 'Původní' }]
    expect(cleanTocLinks(links, body)[0]!.text).toBe('Původní')
  })
})
