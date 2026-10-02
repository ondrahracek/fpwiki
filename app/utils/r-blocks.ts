export interface RBlock {
  el: HTMLElement
  code: string
  ran: boolean
}

const blocks = new Set<RBlock>()

export function registerRBlock(el: HTMLElement, code: string): RBlock {
  const block = { el, code, ran: false }
  blocks.add(block)
  return block
}

export function unregisterRBlock(block: RBlock) {
  blocks.delete(block)
}

export function markRBlockRun(block: RBlock, code: string) {
  block.code = code
  block.ran = true
}

/** Earlier blocks on the page not yet run in this tab's R session, in page order; marks them as run. */
export function claimEarlierRBlocks(block: RBlock): RBlock[] {
  const earlier = [...blocks]
    .filter(
      (b) =>
        !b.ran &&
        b.el.isConnected &&
        b.el.compareDocumentPosition(block.el) & Node.DOCUMENT_POSITION_FOLLOWING,
    )
    .sort((a, b) =>
      a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    )
  for (const b of earlier) b.ran = true
  return earlier
}
