import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Frontmatter `course` may be a string or string[] depending on author
// preference. Web app normalizes via app/utils/frontmatter.ts::resolveCourses.
const courseField = z.union([z.string(), z.array(z.string())])

const baseFrontmatter = z.object({
  title: z.string(),
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
