/**
 * SINGLE SOURCE OF TRUTH for identifier-derived colors. One pure deterministic
 * function maps any string identifier (course slug, tag, topic slug) to an
 * oklch hue, normalized for case and Czech diacritics:
 *
 *   identityColor('IMEK') === identityColor('imek') === identityColor('Ímek')
 *
 * Hue is FNV-1a over the normalized key, modulo 360. There is no curated
 * lookup table — the resolver is content-pipeline-agnostic by design (new
 * courses/tags/topics arrive via git push and must Just Work without code
 * edits). Hue collisions across unrelated keys are expected and acceptable;
 * color is decoration, the chip's text is the identifier.
 *
 * Components consume this via the `$identityColor` Nuxt plugin provide, or
 * import `identityVars` to get the three CSS custom properties as a style
 * object. Do not reimplement.
 */
import { stripDiacritics } from '~/utils/slug'

export interface IdentityColor {
  bg: string
  fg: string
  dot: string
}

function hueFor(key: string): number {
  const k = stripDiacritics(key).toLowerCase()
  let h = 2166136261
  for (let i = 0; i < k.length; i++) {
    h ^= k.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h) % 360
}

export function identityColor(key: string): IdentityColor {
  const h = hueFor(key)
  return {
    bg: `oklch(0.94 0.04 ${h})`,
    fg: `oklch(0.40 0.13 ${h})`,
    dot: `oklch(0.6 0.16 ${h})`,
  }
}

export function identityVars(key: string): Record<string, string> {
  const c = identityColor(key)
  return {
    '--id-bg': c.bg,
    '--id-fg': c.fg,
    '--id-dot': c.dot,
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: { identityColor },
  }
})
