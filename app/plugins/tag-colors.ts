/**
 * Deterministic oklch color map for tag pills. SINGLE SOURCE OF TRUTH for tag
 * presentation — components import via $tagColor (provided by this plugin).
 *
 * Hue map mirrors the prototype's TAG_HUE table; unknown tags fall back to a
 * stable hash-derived hue so new tags get a consistent color without code edits.
 */
import { stripDiacritics } from '~/utils/slug'

export interface TagColor {
  bg: string
  fg: string
  dot: string
}

const HUES: Record<string, number> = {
  finance: 220,
  management: 280,
  marketing: 350,
  ekonomie: 170,
  kvantitativni: 240,
  it: 130,
  pravo: 40,
  strategie: 305,
  matematika: 200,
  bezpecnost: 0,
  optimalizace: 50,
  predikce: 100,
  fuzzy: 295,
  'neuronove-site': 260,
  chaos: 25,
}

function hueFor(tag: string): number {
  const key = stripDiacritics(tag).toLowerCase()
  if (key in HUES) return HUES[key]!
  // FNV-1a-ish hash → hue 0..359
  let h = 2166136261
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h) % 360
}

export function tagColor(tag: string): TagColor {
  const h = hueFor(tag)
  return {
    bg: `oklch(0.94 0.04 ${h})`,
    fg: `oklch(0.40 0.13 ${h})`,
    dot: `oklch(0.6 0.16 ${h})`,
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: { tagColor },
  }
})
