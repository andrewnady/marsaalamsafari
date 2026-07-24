import type { MetadataRoute } from 'next';
import { siteConfig, absoluteUrl } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/search', '/_next/'],
      },
    ],
    sitemap: [absoluteUrl('/sitemap.xml'), absoluteUrl('/sitemap-index.xml')],
    host: siteConfig.url,
  };
}
