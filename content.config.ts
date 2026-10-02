import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { DEGREE_IDS, MAX_STUDY_YEAR, SEMESTERS } from './shared/study-plan'

// Frontmatter `course` may be a string or string[] depending on author
// preference. Web app normalizes via app/utils/frontmatter.ts::resolveCourses.
const courseField = z.union([z.string(), z.array(z.string())])

const baseFrontmatter = z.object({
  title: z.string(),
  // Optional 1-2 sentence summary used for <meta name="description">,
  // og:description, twitter:description. Aim for 120-160 chars for SERP fit;
  // hard-capped at 300. Pages without one fall back to the site default in
  // app/composables/usePageSeo.ts.
  description: z.string().max(300).optional(),
  course: courseField.optional(),
  courses: courseField.optional(),
  tags: z.array(z.string()).default([]),
  // `sources:` references raw/* paths the web app cannot reach. They are
  // accepted by the schema but stripped before reaching templates.
  sources: z.array(z.string()).default([]),
  // YAML may emit Date objects (unquoted dates) or strings. Accept both.
  created: z.union([z.string(), z.date()]).optional(),
  updated: z.union([z.string(), z.date()]).optional(),
})

export default defineContentConfig({
  collections: {
    overview: defineCollection({
      type: 'page',
      source: 'overview.md',
      schema: baseFrontmatter.extend({
        type: z.literal('overview').optional(),
      }),
    }),
    courses: defineCollection({
      type: 'page',
      source: 'courses/**/*.md',
      schema: baseFrontmatter.extend({
        type: z.literal('course').optional(),
        // TODO(course-meta): populated by author in a future content session.
        // Until then, listings fall back to `title` / collection-derived data.
        courseName: z.string().optional(),
        garant: z.string().optional(),
        featured: z.boolean().default(false),
        examInfo: z.string().optional(),
        // Position in the study plan (values from shared/study-plan.ts).
        // The per-degree year limit is checked by parseStudyPlacement, not
        // here. Optional so content predating the fields still builds; such
        // courses land in the trailing "Ostatní" group. z.number() without
        // .int(): @nuxt/content stores JSON-schema "integer" as TEXT and
        // returns strings, while "number" gets an INT column.
        degree: z.enum(DEGREE_IDS).optional(),
        studyYear: z.number().min(1).max(MAX_STUDY_YEAR).optional(),
        semester: z.enum(SEMESTERS).optional(),
      }),
    }),
    topics: defineCollection({
      type: 'page',
      source: 'topics/**/*.md',
      schema: baseFrontmatter.extend({
        type: z.literal('topic').optional(),
      }),
    }),
    summaries: defineCollection({
      type: 'page',
      source: 'summaries/**/*.md',
      schema: baseFrontmatter.extend({
        type: z.literal('summary').optional(),
      }),
    }),
    outputs: defineCollection({
      type: 'page',
      source: 'outputs/**/*.md',
      schema: baseFrontmatter.extend({
        type: z.literal('output').optional(),
      }),
    }),
  },
})
