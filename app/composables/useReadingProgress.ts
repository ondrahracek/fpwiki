/**
 * Single owner of the document reading-progress value (0–100). Both
 * `<ReadingProgress>` (the top hairline) and `<WikiProgressChip>` (the right
 * rail's labeled chip) read from the same useState, so we never double-attach
 * scroll/resize listeners.
 *
 * Refcount pattern: the first subscriber attaches the listener; the last
 * unmount detaches it. The state itself persists in useState across nav so
 * the next page resumes from the previous value until the first scroll event,
 * at which point onScroll() fires immediately on mount and corrects it.
 */
let attachedSubscribers = 0
let detach: (() => void) | null = null

export function useReadingProgress() {
  const progress = useState<number>('reading-progress', () => 0)

  if (!import.meta.client) return { progress }

  onMounted(() => {
    attachedSubscribers++
    if (attachedSubscribers > 1) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.value = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    detach = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  })

  onBeforeUnmount(() => {
    attachedSubscribers = Math.max(0, attachedSubscribers - 1)
    if (attachedSubscribers === 0 && detach) {
      detach()
      detach = null
    }
  })

  return { progress }
}
