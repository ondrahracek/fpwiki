import { describe, expect, it } from 'vitest'
import { CHANNELS, pinFile, resolveChannel } from '../../scripts/content-pin'

describe('resolveChannel', () => {
  it('uses FPWIKI_CONTENT_CHANNEL over the git branch', () => {
    expect(resolveChannel({ envChannel: 'master', gitBranch: 'test' })).toEqual({
      channel: 'master',
      source: 'env FPWIKI_CONTENT_CHANNEL',
    })
    expect(resolveChannel({ envChannel: 'test', gitBranch: 'master' }).channel).toBe('test')
  })

  it('rejects an unknown FPWIKI_CONTENT_CHANNEL instead of falling back', () => {
    expect(() => resolveChannel({ envChannel: 'Master', gitBranch: 'master' })).toThrow(
      /FPWIKI_CONTENT_CHANNEL=Master is not a channel/,
    )
  })

  it('treats an empty FPWIKI_CONTENT_CHANNEL as unset', () => {
    expect(resolveChannel({ envChannel: '', gitBranch: 'test' }).channel).toBe('test')
  })

  it('uses the checked-out branch when it is a channel', () => {
    expect(resolveChannel({ gitBranch: 'test' })).toEqual({
      channel: 'test',
      source: 'git branch test',
    })
    expect(resolveChannel({ gitBranch: 'master' }).channel).toBe('master')
  })

  it.each([['feat/semesters'], [null], [undefined]])(
    'defaults to master for branch %s',
    (gitBranch) => {
      expect(resolveChannel({ gitBranch })).toEqual({ channel: 'master', source: 'default' })
    },
  )
})

describe('pinFile', () => {
  it('gives every channel its own file', () => {
    const files = CHANNELS.map(pinFile)
    expect(files).toEqual(['content-ref/master.txt', 'content-ref/test.txt'])
  })
})
