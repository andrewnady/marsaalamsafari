import type { BlogCategory } from './types';
import { blogPosts } from './blog-posts';

export const blogCategories: BlogCategory[] = [
  { slug: 'travel-guides', name: 'Travel Guides', description: 'In-depth Marsa Alam travel guides from local experts: when to go, how to get there and how to plan the perfect Red Sea holiday in Egypt.' },
  { slug: 'things-to-do', name: 'Things To Do', description: 'The best things to do in Marsa Alam, chosen by local guides: desert safaris, dolphin and turtle snorkeling, diving, boat trips and Luxor day trips.' },
  { slug: 'desert-safari', name: 'Desert Safari', description: 'Marsa Alam desert safari tips and stories: quad biking, camel rides, Bedouin culture, stargazing and how to choose the right Eastern Desert tour.' },
  { slug: 'snorkeling', name: 'Snorkeling', description: 'Where and how to snorkel in Marsa Alam: the best reefs, dolphins at Sataya, turtles at Abu Dabbab, plus safety and gear tips from local guides.' },
  { slug: 'diving', name: 'Diving', description: 'Diving in Marsa Alam: the best dive sites from house reefs to Elphinstone, seasonal conditions, marine life and advice for beginners and pros.' },
  { slug: 'egypt-travel-tips', name: 'Egypt Travel Tips', description: 'Practical Egypt travel tips for Red Sea visitors: visas, money, safety, etiquette, tipping and what to expect on a holiday in Marsa Alam.' },
  { slug: 'transportation', name: 'Transportation', description: 'Getting to and around Marsa Alam: flights to Marsa Alam and Hurghada airports, transfer times, taxis and free hotel pickups for tours.' },
  { slug: 'packing-guides', name: 'Packing Guides', description: 'What to pack for Marsa Alam: clothing for the desert and the sea, reef-safe sunscreen, snorkeling gear and essentials for day trips.' },
  { slug: 'family-travel', name: 'Family Travel', description: 'Marsa Alam with kids: family-friendly tours, calm beaches for young snorkelers, safety advice and tips for a relaxed Red Sea family holiday.' },
  { slug: 'adventure', name: 'Adventure', description: 'Adventure in Marsa Alam: off-road desert safaris, quad biking, diving Elphinstone and off-the-beaten-path experiences on Egypt’s Red Sea coast.' },
];

export const blogCategoryBySlug = new Map(blogCategories.map((c) => [c.slug, c]));

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategoryBySlug.get(slug as BlogCategory['slug']);
}

/** Blog categories with at least one post (same thin-content rule as tours). */
export function getActiveBlogCategories(): BlogCategory[] {
  return blogCategories.filter((c) => blogPosts.some((p) => p.category === c.slug));
}
