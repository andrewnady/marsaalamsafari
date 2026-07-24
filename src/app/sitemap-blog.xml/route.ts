import { absoluteUrl } from '@/config/site';
import { blogPosts } from '@/content/blog-posts';
import { blogCategories } from '@/content/blog-categories';
import { urlsetXml, xmlResponse, type UrlEntry } from '@/lib/seo/sitemap-xml';

export const dynamic = 'force-static';

/** Blog sitemap: posts + blog category archives. */
export function GET() {
  const entries: UrlEntry[] = [
    { loc: absoluteUrl('/blog'), changefreq: 'daily', priority: 0.8 },
    ...blogPosts.map((p) => ({
      loc: absoluteUrl(`/blog/${p.slug}`),
      lastmod: new Date(p.updatedAt).toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
      images: [{ loc: p.heroImage.src, title: p.heroImage.title, caption: p.heroImage.alt }],
    })),
    ...blogCategories.map((c) => ({
      loc: absoluteUrl(`/blog/category/${c.slug}`),
      changefreq: 'weekly',
      priority: 0.5,
    })),
  ];
  return xmlResponse(urlsetXml(entries));
}
