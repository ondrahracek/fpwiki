<template>
  <figure
    class="graph-mount not-prose"
    :data-engine="parsed?.spec?.engine ?? 'function-plot'"
    :aria-describedby="descId"
  >
    <figcaption v-if="parsed?.spec?.title" class="graph-title">
      {{ parsed.spec.title }}
    </figcaption>

    <p v-if="parsed?.spec?.alt" :id="descId" class="sr-only">
      {{ parsed.spec.alt }}
    </p>

    <ClientOnly>
      <ul
        v-if="parsed && parsed.spec.curves.length > 1"
        class="graph-legend"
        aria-label="Legenda křivek"
      >
        <li v-for="c in parsed.spec.curves" :key="c.fn" class="graph-legend-item">
          <span class="graph-legend-swatch" :data-color="c.color" aria-hidden="true" />
          <span class="graph-legend-label">{{ c.label }}</span>
        </li>
        <li v-for="m in parsed.spec.markers" :key="`m-${m.x}`" class="graph-legend-item">
          <span class="graph-legend-swatch graph-legend-marker" aria-hidden="true" />
          <span class="graph-legend-label">{{ m.label || m.x }}</span>
        </li>
      </ul>
    </ClientOnly>

    <div v-if="parseError" class="graph-error" role="alert">
      <p>Chyba v bloku graph: {{ parseError }}</p>
    </div>

    <ClientOnly>
      <template #fallback>
        <div class="graph-placeholder" aria-hidden="true">
          <span>Načítání grafu…</span>
        </div>
      </template>
      <template #default>
        <div v-if="!parseError" class="graph-body">
          <div ref="canvasEl" class="graph-canvas" :aria-label="parsed?.spec?.alt" />

          <div
            v-if="parsed && parsed.spec.params.length"
            class="graph-controls"
            role="group"
            aria-label="Parametry grafu"
          >
            <label
              v-for="p in parsed.spec.params"
              :key="p.name"
              class="graph-control"
              :for="`${uid}-${p.name}`"
            >
              <span class="graph-control-row">
                <span class="graph-control-name">{{ p.label }}</span>
                <span class="graph-control-value" aria-hidden="true">
                  {{ formatValue(paramValues[p.name], p.step) }}
                </span>
              </span>
              <USlider
                :id="`${uid}-${p.name}`"
                v-model="paramValues[p.name]"
                :min="p.min"
                :max="p.max"
                :step="p.step"
                size="md"
                color="primary"
                :aria-label="`${p.label}, ${formatValue(paramValues[p.name], p.step)}`"
              />
            </label>
          </div>

          <div v-if="renderError" class="graph-error" role="alert">
            <p>Chyba při vykreslení: {{ renderError }}</p>
          </div>
        </div>
      </template>
    </ClientOnly>
  </figure>
</template>

<script setup lang="ts">
/**
 * Renders an interactive 2D graph from a build-time-validated GraphSpec.
 *
 * Wired into the @nuxt/content pipeline: modules/remark-graphs transforms
 * ```graph fences into <graph-mount spec="<json>"> elements; ContentRenderer
 * resolves <graph-mount> via pascalCase auto-import and mounts this component.
 *
 * SSR-safe: function-plot touches `document` synchronously, so the canvas is
 * mounted only inside <ClientOnly>. The fallback is a fixed-aspect placeholder
 * that prevents CLS during hydration (CLAUDE.md "SSR-safe state rules").
 *
 * Lazy import: function-plot ships ~50 kB gz of D3 code. We import it inside
 * onMounted so graph-free pages pay no bundle cost.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, useId, watch } from 'vue'
import { useColorMode } from '#imports'
import { graphSpecSchema, type GraphSpec, type CurveColor } from '~~/modules/remark-graphs/schema'

const props = defineProps<{ spec: string }>()

const uid = useId()
const descId = `${uid}-desc`

interface Parsed {
  spec: GraphSpec
}

const parseResult = computed<{ parsed: Parsed | null; error: string | null }>(() => {
  try {
    const raw = JSON.parse(props.spec) as unknown
    const result = graphSpecSchema.safeParse(raw)
    if (!result.success) {
      return { parsed: null, error: result.error.issues.map((i) => i.message).join('; ') }
    }
    return { parsed: { spec: result.data }, error: null }
  } catch (e) {
    return { parsed: null, error: e instanceof Error ? e.message : String(e) }
  }
})

const parsed = computed(() => parseResult.value.parsed)
const parseError = computed(() => parseResult.value.error)

// Per-parameter reactive state. Initialized from spec defaults, updated by
// USlider v-model. Sliders bind via `v-model="paramValues[name]"`.
const paramValues = reactive<Record<string, number>>({})
watch(
  parsed,
  (p) => {
    if (!p) return
    for (const param of p.spec.params) {
      if (paramValues[param.name] === undefined) {
        paramValues[param.name] = param.default
      }
    }
  },
  { immediate: true },
)

const canvasEl = ref<HTMLDivElement | null>(null)
const renderError = ref<string | null>(null)

let plotInstance: { destroy?: () => void } | null = null
let resizeObserver: ResizeObserver | null = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let functionPlotImpl: any = null

const colorMode = useColorMode()

/**
 * Resolve a project color token to a concrete CSS color string by reading
 * the computed CSS variable from <html>. Light mode uses the 600 shade for
 * good contrast on the warm-paper background; dark mode shifts to the 400
 * shade so curves remain readable against the deep neutral.
 *
 * Re-resolved on every render so dark-mode flips and theme-token edits stay
 * in sync.
 */
const COLOR_TOKEN_VARS_LIGHT: Record<CurveColor, string> = {
  'fp-purple': '--color-fp-purple-600',
  'fp-red': '--color-fp-red-600',
  'paper-700': '--color-paper-700',
  'paper-500': '--color-paper-500',
  ink: '--color-ink',
}
const COLOR_TOKEN_VARS_DARK: Record<CurveColor, string> = {
  'fp-purple': '--color-fp-purple-300',
  'fp-red': '--color-fp-red-300',
  'paper-700': '--color-paper-300',
  'paper-500': '--color-paper-400',
  ink: '--color-ink',
}

function tokenVar(token: CurveColor, isDark: boolean): string {
  return (isDark ? COLOR_TOKEN_VARS_DARK : COLOR_TOKEN_VARS_LIGHT)[token]
}

function resolveColor(token: CurveColor, root: Element, isDark: boolean): string {
  const cssVar = tokenVar(token, isDark)
  const value = getComputedStyle(root).getPropertyValue(cssVar).trim()
  // Fallback to a sane default if the variable isn't defined for some reason.
  return value || '#6b2c91'
}

/**
 * Substitute parameter names in an expression with their numeric values.
 * Word-boundary matching ensures `param a` doesn't corrupt `tan(x)`.
 */
function substitute(expr: string, paramSpec: GraphSpec['params']): string {
  let out = expr
  for (const p of paramSpec) {
    const value = paramValues[p.name]
    if (typeof value !== 'number' || !Number.isFinite(value)) continue
    out = out.replaceAll(new RegExp(`\\b${escapeRegex(p.name)}\\b`, 'g'), `(${value})`)
  }
  return out
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function evalConstant(expr: string, paramSpec: GraphSpec['params']): number | null {
  // Markers' x position can depend on parameters (e.g. "a / (2*b)"). We only
  // need a numeric constant — function-plot doesn't accept expressions for
  // marker x. Substitute params, then evaluate arithmetic safely with Function
  // restricted to a Math-only globalThis. Risk-bounded because the schema
  // already validated `expr` is short ASCII printable.
  const substituted = substitute(expr, paramSpec)
  try {
    // Build a sandboxed evaluator with only Math primitives bound. Names from
    // the schema reserved-set (sin/cos/log/...) plus pi/e need to be in scope.

    const fn = new Function(
      'Math',
      `"use strict"; const {sin,cos,tan,asin,acos,atan,atan2,sinh,cosh,tanh,log,log2,log10,exp,sqrt,cbrt,abs,floor,ceil,round,sign,min,max,pow}=Math; const pi=Math.PI; const e=Math.E; const ln=Math.log; const PI=pi; const E=e; return (${substituted});`,
    )
    const v = fn(Math) as number
    return Number.isFinite(v) ? v : null
  } catch {
    return null
  }
}

function formatValue(v: number | undefined, step: number): string {
  if (typeof v !== 'number' || !Number.isFinite(v)) return '—'
  // Match precision to step. step=1 → 0 decimals; step=0.1 → 1 decimal; etc.
  const dec = step >= 1 ? 0 : Math.max(0, Math.min(4, Math.ceil(-Math.log10(step))))
  return v.toFixed(dec)
}

function buildPlotData(spec: GraphSpec, root: Element, isDark: boolean) {
  const data: Array<Record<string, unknown>> = []
  for (const c of spec.curves) {
    data.push({
      fn: substitute(c.fn, spec.params),
      color: resolveColor(c.color, root, isDark),
      title: c.label,
      graphType: 'polyline',
      nSamples: 400,
    })
  }
  for (const m of spec.markers) {
    const xVal = evalConstant(m.x, spec.params)
    if (xVal === null) continue
    const [yLo, yHi] = spec.yAxis.domain
    data.push({
      points: [
        [xVal, yLo],
        [xVal, yHi],
      ],
      fnType: 'points',
      graphType: 'polyline',
      color: resolveColor('paper-500', root, isDark),
      title: m.label ?? '',
      attr: { 'stroke-dasharray': '4 4' },
    })
  }
  return data
}

async function ensureLib(): Promise<void> {
  if (functionPlotImpl) return
  const mod = await import('function-plot')
  functionPlotImpl = (mod as { default: unknown }).default ?? mod
}

function destroyPlot() {
  // function-plot doesn't expose a destroy API; clearing the target's HTML is
  // its documented teardown idiom (the library re-creates the SVG on each
  // render but accumulates if not cleared).
  if (canvasEl.value) {
    canvasEl.value.innerHTML = ''
  }
  plotInstance = null
}

async function render() {
  if (!canvasEl.value || !parsed.value) return
  renderError.value = null
  try {
    await ensureLib()
    destroyPlot()
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
    const targetEl = canvasEl.value
    const width = targetEl.clientWidth || 480
    // Aspect ratio matches the CSS placeholder so layout stays stable.
    const height = Math.round(width * 0.625)
    plotInstance = functionPlotImpl({
      target: targetEl,
      width,
      height,
      xAxis: {
        domain: parsed.value.spec.xAxis.domain,
        label: parsed.value.spec.xAxis.label,
      },
      yAxis: {
        domain: parsed.value.spec.yAxis.domain,
        label: parsed.value.spec.yAxis.label,
      },
      grid: true,
      data: buildPlotData(parsed.value.spec, root, isDark),
    })
  } catch (e) {
    renderError.value = e instanceof Error ? e.message : String(e)
    destroyPlot()
  }
}

/**
 * The canvas <div> lives inside <ClientOnly>'s default slot, so on first
 * paint its DOM node (and therefore the template ref) is not available
 * synchronously during the parent's onMounted() — ClientOnly only renders
 * after a mount tick. Watching the ref and running the first render when the
 * element becomes available handles both first-paint hydration and
 * subsequent navigations where the ref may already be populated by mount.
 */
async function onCanvasReady() {
  if (parseError.value) return
  await nextTick()
  if (!canvasEl.value) return
  await render()

  if (typeof ResizeObserver !== 'undefined') {
    let lastWidth = canvasEl.value.clientWidth
    resizeObserver = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0
      if (Math.abs(w - lastWidth) > 4) {
        lastWidth = w
        void render()
      }
    })
    resizeObserver.observe(canvasEl.value)
  }
}

watch(canvasEl, (el) => {
  if (el && !plotInstance) void onCanvasReady()
})

onMounted(() => {
  if (canvasEl.value && !plotInstance) void onCanvasReady()
})

// Re-render on parameter slider changes.
watch(paramValues, () => void render(), { deep: true })

// Re-render on dark/light mode flip so colors track the active theme.
watch(
  () => colorMode.value,
  () => void render(),
)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  destroyPlot()
})
</script>

<style scoped>
.graph-mount {
  margin: 1.5rem 0;
}

.graph-title {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ui-text);
  margin-bottom: 0.5rem;
}

.graph-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 0 0 0.5rem;
  padding: 0;
  list-style: none;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--ui-text-muted);
}

.graph-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
}

.graph-legend-swatch {
  flex: 0 0 auto;
  width: 14px;
  height: 3px;
  border-radius: 2px;
  background: var(--color-fp-purple-600);
}
.graph-legend-swatch[data-color='fp-purple'] {
  background: var(--color-fp-purple-600);
}
.graph-legend-swatch[data-color='fp-red'] {
  background: var(--color-fp-red-600);
}
.graph-legend-swatch[data-color='paper-700'] {
  background: var(--color-paper-700);
}
.graph-legend-swatch[data-color='paper-500'] {
  background: var(--color-paper-500);
}
.graph-legend-swatch[data-color='ink'] {
  background: var(--color-ink);
}

.graph-legend-swatch.graph-legend-marker {
  height: 0;
  border-top: 2px dashed var(--color-paper-500);
  border-radius: 0;
}

/* In dark mode, fp-purple/fp-red swatches lighten to match chart curves
   (which use the 300 shade in dark for contrast on the deep neutral). */
.dark .graph-legend-swatch[data-color='fp-purple'] {
  background: var(--color-fp-purple-300);
}
.dark .graph-legend-swatch[data-color='fp-red'] {
  background: var(--color-fp-red-300);
}
.dark .graph-legend-swatch[data-color='paper-700'] {
  background: var(--color-paper-300);
}
.dark .graph-legend-swatch[data-color='paper-500'] {
  background: var(--color-paper-400);
}
.dark .graph-legend-swatch.graph-legend-marker {
  border-top-color: var(--color-paper-400);
}

.graph-legend-label {
  min-width: 0;
  overflow-wrap: anywhere;
}

.graph-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border: 1px solid var(--ui-border);
  background: var(--ui-bg-elevated);
  border-radius: 0.75rem;
  padding: 1rem;
}

.graph-canvas {
  width: 100%;
  min-height: 280px;
  min-width: 0;
}

.graph-canvas :deep(svg) {
  max-width: 100%;
  height: auto;
}

/* function-plot defaults to black labels; flip with ink token. */
.graph-canvas :deep(.x.axis text),
.graph-canvas :deep(.y.axis text),
.graph-canvas :deep(.x.axis-label),
.graph-canvas :deep(.y.axis-label),
.graph-canvas :deep(.title) {
  fill: var(--ui-text);
  font-family: var(--font-sans);
  font-size: 11px;
}

.graph-canvas :deep(.x.axis path),
.graph-canvas :deep(.y.axis path),
.graph-canvas :deep(.x.axis line),
.graph-canvas :deep(.y.axis line),
.graph-canvas :deep(.tick line) {
  stroke: var(--ui-border);
}

.graph-canvas :deep(.grid line) {
  stroke: var(--ui-border);
  opacity: 0.4;
}

.graph-canvas :deep(.zero) {
  stroke: var(--ui-text-muted);
  opacity: 0.5;
}

.graph-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.875rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--ui-border);
}

@media (min-width: 640px) {
  .graph-controls {
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1.5rem;
  }
}

.graph-control {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
}

.graph-control-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
}

.graph-control-name {
  color: var(--ui-text-muted);
  font-weight: 500;
  min-width: 0;
  overflow-wrap: anywhere;
}

.graph-control-value {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--ui-text);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.graph-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 8 / 5;
  min-height: 280px;
  border: 1px dashed var(--ui-border);
  background: var(--ui-bg-elevated);
  border-radius: 0.75rem;
  color: var(--ui-text-muted);
  font-family: var(--font-sans);
  font-size: 0.875rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media print {
  .graph-controls {
    display: none;
  }
}
</style>
