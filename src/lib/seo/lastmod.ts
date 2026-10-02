import { tours } from '@/content/tours';
import { blogPosts } from '@/content/blog-posts';
import type { Tour } from '@/content/types';

/**
 * Honest sitemap <lastmod> dates derived from content `updatedAt` fields.
 * Stamping every URL with the build time teaches Google to ignore lastmod;
 * real dates let it recrawl what actually changed.
 */

function latest(dates: string[]): Date {
  const max = dates.reduce((a, b) => (a > b ? a : b), '1970-01-01');
  return new Date(max);
}

/** Most recent change anywhere in the catalogue or blog. */
export function siteLastModified(): Date {
  return latest([...tours.map((t) => t.updatedAt), ...blogPosts.map((p) => p.updatedAt)]);
}

/** Most recent change among a set of tours (category / destination / landing pages). */
export function toursLastModified(list: Tour[]): Date {
  return list.length ? latest(list.map((t) => t.updatedAt)) : siteLastModified();
}

/** Most recent post in a blog category. */
export function blogCategoryLastModified(category: string): Date {
  const posts = blogPosts.filter((p) => p.category === category);
  return posts.length ? latest(posts.map((p) => p.updatedAt)) : siteLastModified();
}
