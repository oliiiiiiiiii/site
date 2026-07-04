import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// File-based collections keep posts and notes statically generated and MDX-ready.
const subjects = defineCollection({
  loader: glob({ base: './src/content/subjects', pattern: '**/*.{json,yaml,yml,md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    status: z.enum(['active', 'growing', 'archived']).default('growing'),
    order: z.number().int().default(0),
    featured: z.boolean().default(false),
    sections: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
    })).default([]),
  }),
});

const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subject: z.string(),
    section: z.string().optional(),
    module: z.string().optional(),
    order: z.number().int().default(0),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { subjects, lessons, posts };
