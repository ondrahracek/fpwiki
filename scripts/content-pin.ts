/**
 * Which content pin a build reads. Each branch has its own pin file, so a
 * merge cannot move production's pin (CLAUDE.md Pitfall #20).
 */

export const CHANNELS = ['master', 'test'] as const

export type Channel = (typeof CHANNELS)[number]

export const DEFAULT_CHANNEL: Channel = 'master'

export interface ChannelResolution {
  channel: Channel
  source: string
}

export function isChannel(value: unknown): value is Channel {
  return (CHANNELS as readonly unknown[]).includes(value)
}

export function pinFile(channel: Channel): string {
  return `content-ref/${channel}.txt`
}

/** An unknown FPWIKI_CONTENT_CHANNEL throws, so a typo can't pick the wrong content. */
export function resolveChannel(input: {
  envChannel?: string
  gitBranch?: string | null
  /** Channels whose pin file exists; only consulted for the default. */
  available?: readonly Channel[]
}): ChannelResolution {
  const { envChannel, gitBranch, available } = input
  if (envChannel) {
    if (!isChannel(envChannel)) {
      throw new Error(
        `FPWIKI_CONTENT_CHANNEL=${envChannel} is not a channel. Expected one of: ${CHANNELS.join(', ')}.`,
      )
    }
    return { channel: envChannel, source: 'env FPWIKI_CONTENT_CHANNEL' }
  }
  if (isChannel(gitBranch)) return { channel: gitBranch, source: `git branch ${gitBranch}` }
  if (available?.length === 1 && available[0] !== DEFAULT_CHANNEL) {
    return { channel: available[0], source: `default (only ${pinFile(available[0])} exists)` }
  }
  return { channel: DEFAULT_CHANNEL, source: 'default' }
}
