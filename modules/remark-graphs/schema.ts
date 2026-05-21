/**
 * Single source of truth for the `graph` fenced-code-block contract.
 *
 * Imported by:
 *   - modules/remark-graphs/build.ts (build-time transform + error reporting)
 *   - app/components/GraphMount.vue (runtime defensive parse)
 *   - scripts/validate-content.ts (CI gate)
 *
 * Authors write YAML; we parse → JSON → validate. Never relax this schema in
 * one consumer without updating the others.
 */
import { z } from 'zod'

/**
 * Names function-plot's expression parser already binds. Authors cannot use
 * these as parameter names (substitution would silently corrupt the math).
 */
export const RESERVED_PARAM_NAMES = new Set([
  'x',
  'y',
  'e',
  'pi',
  'PI',
  'E',
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'atan2',
  'sinh',
  'cosh',
  'tanh',
  'log',
  'log2',
  'log10',
  'ln',
  'exp',
  'sqrt',
  'cbrt',
  'abs',
  'floor',
  'ceil',
  'round',
  'sign',
  'min',
  'max',
  'pow',
  'mod',
])

/**
 * Curated palette. Maps to CSS custom properties resolved at component-mount
 * time. Adding a value here must also update the resolver table in
 * app/components/GraphMount.vue.
 */
export const CURVE_COLORS = ['fp-purple', 'fp-red', 'paper-700', 'paper-500', 'ink'] as const
export type CurveColor = (typeof CURVE_COLORS)[number]

const finiteNumber = z.number().refine(Number.isFinite, { message: 'must be finite' })

const paramName = z
  .string()
  .min(1)
  .max(16)
  .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, 'must match [a-zA-Z][a-zA-Z0-9]*')
  .refine((n) => !RESERVED_PARAM_NAMES.has(n), {
    message: 'parameter name is reserved by function-plot (x, sin, log, …)',
  })

const expression = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[\x20-\x7E]+$/u, 'must be ASCII printable (no Unicode operators)')

const axis = z.object({
  label: z.string().min(1).max(40),
  domain: z
    .tuple([finiteNumber, finiteNumber])
    .refine(([lo, hi]) => lo < hi, { message: 'domain[0] must be < domain[1]' }),
})

const param = z
  .object({
    name: paramName,
    label: z.string().min(1).max(60),
    min: finiteNumber,
    max: finiteNumber,
    step: finiteNumber.refine((n) => n > 0, { message: 'step must be > 0' }),
    default: finiteNumber,
  })
  .refine((p) => p.min < p.max, { message: 'min must be < max', path: ['min'] })
  .refine((p) => p.default >= p.min && p.default <= p.max, {
    message: 'default must lie within [min, max]',
    path: ['default'],
  })

const curve = z.object({
  fn: expression,
  label: z.string().min(1).max(80),
  color: z.enum(CURVE_COLORS),
})

const marker = z.object({
  x: expression,
  label: z.string().min(1).max(60).optional(),
})

export const graphSpecSchema = z
  .object({
    title: z.string().min(1).max(200),
    /**
     * Czech-language description for screen readers and as fallback text when
     * JS is unavailable. Mandatory: every interactive graph must be readable
     * in plain text.
     */
    alt: z.string().min(10).max(400),
    engine: z.literal('function-plot').default('function-plot'),
    xAxis: axis,
    yAxis: axis,
    params: z.array(param).max(6).default([]),
    curves: z.array(curve).min(1).max(6),
    markers: z.array(marker).max(6).default([]),
  })
  .strict()
  .superRefine((spec, ctx) => {
    const seen = new Set<string>()
    for (const p of spec.params) {
      if (seen.has(p.name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['params'],
          message: `duplicate parameter name "${p.name}"`,
        })
      }
      seen.add(p.name)
    }
  })

export type GraphSpec = z.infer<typeof graphSpecSchema>
