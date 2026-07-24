import type { BlogCategory } from './types';

export const blogCategories: BlogCategory[] = [
  { slug: 'travel-guides', name: 'Travel Guides', description: 'In-depth guides to Marsa Alam and Egypt’s Red Sea coast.' },
  { slug: 'things-to-do', name: 'Things To Do', description: 'The best activities, tours and experiences in Marsa Alam.' },
  { slug: 'desert-safari', name: 'Desert Safari', description: 'Tips and stories from the Eastern Desert.' },
  { slug: 'snorkeling', name: 'Snorkeling', description: 'Where and how to snorkel Marsa Alam’s reefs.' },
  { slug: 'diving', name: 'Diving', description: 'Dive sites, conditions and marine life around Marsa Alam.' },
  { slug: 'egypt-travel-tips', name: 'Egypt Travel Tips', description: 'Practical advice for travelling in Egypt.' },
  { slug: 'transportation', name: 'Transportation', description: 'Getting to and around Marsa Alam.' },
  { slug: 'packing-guides', name: 'Packing Guides', description: 'What to pack for a Red Sea holiday.' },
  { slug: 'family-travel', name: 'Family Travel', description: 'Marsa Alam with kids — trips, tips and safety.' },
  { slug: 'adventure', name: 'Adventure', description: 'Adrenaline and off-the-beaten-path experiences.' },
];

export const blogCategoryBySlug = new Map(blogCategories.map((c) => [c.slug, c]));

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategoryBySlug.get(slug as BlogCategory['slug']);
}
