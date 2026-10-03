import { describe, it, expect } from 'vitest'
import { extractRPackages } from '../../app/utils/r-packages'

describe('extractRPackages', () => {
  it('finds bare and quoted library()/require() calls', () => {
    const code = ['library(qcc)', 'require("car")', "library('lmtest', quietly = TRUE)"].join('\n')
    expect(extractRPackages(code)).toEqual(['qcc', 'car', 'lmtest'])
  })

  it('handles nested calls, package = and requireNamespace()', () => {
    const code = [
      'suppressMessages(library(ggplot2))',
      'library(package = agricolae)',
      'if (requireNamespace("nls2", quietly = TRUE)) 1',
    ].join('\n')
    expect(extractRPackages(code)).toEqual(['ggplot2', 'agricolae', 'nls2'])
  })

  it('finds pkg::fn and pkg:::fn references', () => {
    expect(extractRPackages('car::Anova(m)\nx <- qcc:::helper(1)')).toEqual(['car', 'qcc'])
  })

  it('skips base packages', () => {
    const code = 'library(stats)\nlibrary(grid)\nx <- stats::sd(1:3)\nutils::head(x)'
    expect(extractRPackages(code)).toEqual([])
  })

  it('ignores comments but keeps # inside strings', () => {
    const code = ['# library(qcc)', 'x <- "#"; library(car) # require(ggplot2)'].join('\n')
    expect(extractRPackages(code)).toEqual(['car'])
  })

  it('skips character.only loads of a variable', () => {
    expect(extractRPackages('pkg <- "qcc"\nlibrary(pkg, character.only = TRUE)')).toEqual([])
    expect(extractRPackages('library(qcc, quietly = TRUE)')).toEqual(['qcc'])
  })

  it('deduplicates and ignores look-alike identifiers', () => {
    const code = 'library(qcc)\nlibrary(qcc)\nmylibrary(foo)\nx$library(bar)\nqcc::qcc(x)'
    expect(extractRPackages(code)).toEqual(['qcc'])
  })
})
