import { absoluteUrl } from '@/config/site';
import { tours } from '@/content/tours';
import { landingPages } from '@/content/landing-pages';
import { categories } from '@/content/categories';
import { destinations } from '@/content/destinations';
import { urlsetXml, xmlResponse, type UrlEntry } from '@/lib/seo/sitemap-xml';

export const dynamic = 'force-static';

/** Tour sitemap: tour detail pages, landing pages, categories, destinations. */
export function GET() {
  const entries: UrlEntry[] = [
    ...tours.map((t) => ({
      loc: absoluteUrl(`/${t.slug}`),
      lastmod: new Date(t.updatedAt).toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
      images: [t.heroImage, ...t.gallery].map((i) => ({ loc: i.src, title: i.title, caption: i.caption ?? i.alt })),
    })),
    ...landingPages.map((p) => ({
      loc: absoluteUrl(`/${p.slug}`),
      changefreq: 'weekly',
      priority: 0.8,
      images: [{ loc: p.heroImage.src, title: p.heroImage.title, caption: p.heroImage.alt }],
    })),
    ...categories.map((c) => ({ loc: absoluteUrl(`/category/${c.slug}`), changefreq: 'weekly', priority: 0.7 })),
    ...destinations.map((d) => ({
      loc: absoluteUrl(`/destinations/${d.slug}`),
      changefreq: 'monthly',
      priority: 0.7,
      images: [{ loc: d.image.src, title: d.image.title, caption: d.image.alt }],
    })),
  ];
  return xmlResponse(urlsetXml(entries));
}
