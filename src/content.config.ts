import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const railingProjects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/railing-projects' }),
  schema: z.object({
    title: z.string(),
    scene: z.enum(['front-door', 'staircase', 'deck-patio', 'cement']),
    description: z.string().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })),
    video: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { 'railing-projects': railingProjects };
