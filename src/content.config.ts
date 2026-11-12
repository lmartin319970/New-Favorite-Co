import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const base = { title: z.string(), description: z.string(), date: z.coerce.date(), image: z.string().optional(), imageAlt: z.string().optional(), featured: z.boolean().default(false), tags: z.array(z.string()).default([]) };
const recipes = defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/recipes'}),schema:z.object({...base,category:z.string(),difficulty:z.enum(['Easy','Intermediate','Advanced']),prepMinutes:z.number().int().nonnegative(),cookMinutes:z.number().int().nonnegative(),servings:z.number().int().positive(),ingredients:z.array(z.object({name:z.string(),amount:z.string()})),instructions:z.array(z.string()),discovery:z.string().optional()})});
const discover = defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/discover'}),schema:z.object(base)});
const journal = defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/journal'}),schema:z.object(base)});
export const collections={recipes,discover,journal};
