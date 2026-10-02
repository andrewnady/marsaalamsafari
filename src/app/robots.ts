import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';

/**
 * Crawl everything except the JSON API. Never block /_next/: that is where the
 * site's CSS, JS and optimized images live, and Google needs them to render
 * pages and index images. Pages that must stay out of the index (/search,
 * /admin) use noindex instead — robots.txt blocking would hide that tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: absoluteUrl('/sitemap-index.xml'),
  };
}
