/**
 * Course hue derivation. Mirrors the color logic from tag-colors.ts and
 * exposes it as CSS variables so any component (course pill, course card
 * stripe, sidebar dots) can paint with the same accent.
 *
 * `firstTag` is the tag whose hue the course inherits. `<CoursePill>` was the
 * original consumer; this util is shared so card stripes / sidebar dots use
 * the same color.
 */
import { tagColor, type TagColor } from '~/plugins/tag-colors'

export function courseHueVars(firstTag: string | undefined): Record<string, string> {
  const c: TagColor = tagColor(firstTag ?? 'ekonomie')
  return {
    '--course-hue-bg': c.bg,
    '--course-hue-fg': c.fg,
    '--course-hue-dot': c.dot,
  }
}
