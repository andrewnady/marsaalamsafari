import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { tours, getToursByCategory, getTour } from '@/content/tours';
import { landingPages } from '@/content/landing-pages';
import { getActiveCategories } from '@/content/categories';
import { destinations } from '@/content/destinations';
import { blogPosts } from '@/content/blog-posts';
import { getActiveBlogCategories } from '@/content/blog-categories';
import { siteLastModified, toursLastModified, blogCategoryLastModified } from '@/lib/seo/lastmod';
import type { Tour } from '@/content/types';

/**
 * Primary sitemap (/sitemap.xml): every indexable URL with a real lastmod.
 * Images are listed separately in /sitemap-images.xml, because Next.js does
 * not XML-escape <image:loc> URLs (raw "&" in image query strings breaks XML).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteLastModified();
  const pick = (slugs: string[]) => slugs.map(getTour).filter((t): t is Tour => Boolean(t));

  const page = (path: string, lastModified: Date, changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly', priority: number) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page('/', site, 'daily', 1),
    page('/tours', toursLastModified(tours), 'daily', 0.9),
    page('/destinations', site, 'weekly', 0.7),
    page('/blog', site, 'daily', 0.8),
    page('/reviews', site, 'weekly', 0.6),
    page('/about', site, 'monthly', 0.5),
    page('/contact', site, 'monthly', 0.6),
    page('/faq', site, 'monthly', 0.5),
    page('/booking-terms', site, 'yearly', 0.2),
    page('/cancellation-policy', site, 'yearly', 0.2),
    page('/privacy', site, 'yearly', 0.2),
    ...tours.map((t) => page(`/${t.slug}`, new Date(t.updatedAt), 'weekly', 0.9)),
    ...landingPages.map((p) => page(`/${p.slug}`, toursLastModified(pick(p.tourSlugs)), 'weekly', 0.8)),
    ...getActiveCategories().map((c) =>
      page(`/category/${c.slug}`, toursLastModified(getToursByCategory(c.slug)), 'weekly', 0.7),
    ),
    ...destinations.map((d) => page(`/destinations/${d.slug}`, toursLastModified(pick(d.relatedTours)), 'monthly', 0.7)),
    ...blogPosts.map((p) => page(`/blog/${p.slug}`, new Date(p.updatedAt), 'monthly', 0.7)),
    ...getActiveBlogCategories().map((c) =>
      page(`/blog/category/${c.slug}`, blogCategoryLastModified(c.slug), 'weekly', 0.5),
    ),
  ];
}
