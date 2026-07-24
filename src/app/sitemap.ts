import type { MetadataRoute } from 'next';
import { siteConfig, absoluteUrl } from '@/config/site';
import { tours } from '@/content/tours';
import { landingPages } from '@/content/landing-pages';
import { categories } from '@/content/categories';
import { destinations } from '@/content/destinations';
import { blogPosts } from '@/content/blog-posts';
import { blogCategories } from '@/content/blog-categories';

/**
 * Primary sitemap served at /sitemap.xml. Includes lastmod and sensible
 * changeFrequency/priority signals. Tour + blog images are attached for image
 * SEO (supported by Next's MetadataRoute.Sitemap `images` field).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: absoluteUrl('/tours'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: absoluteUrl('/destinations'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: absoluteUrl('/reviews'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/booking-terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/cancellation-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const tourPages: MetadataRoute.Sitemap = tours.map((t) => ({
    url: absoluteUrl(`/${t.slug}`),
    lastModified: new Date(t.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
    images: [t.heroImage.src, ...t.gallery.map((g) => g.src)],
  }));

  const landingPagesUrls: MetadataRoute.Sitemap = landingPages.map((p) => ({
    url: absoluteUrl(`/${p.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    images: [p.heroImage.src],
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absoluteUrl(`/category/${c.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const destinationPages: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: absoluteUrl(`/destinations/${d.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [d.image.src],
  }));

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [p.heroImage.src],
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map((c) => ({
    url: absoluteUrl(`/blog/category/${c.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...tourPages,
    ...landingPagesUrls,
    ...categoryPages,
    ...destinationPages,
    ...blogPostPages,
    ...blogCategoryPages,
  ];
}
