import { absoluteUrl } from '@/config/site';
import { sitemapIndexXml, xmlResponse } from '@/lib/seo/sitemap-xml';

export const dynamic = 'force-static';

/** Sitemap index pointing at the themed child sitemaps. */
export function GET() {
  const now = new Date().toISOString();
  const xml = sitemapIndexXml([
    { loc: absoluteUrl('/sitemap.xml'), lastmod: now },
    { loc: absoluteUrl('/sitemap-tours.xml'), lastmod: now },
    { loc: absoluteUrl('/sitemap-blog.xml'), lastmod: now },
    { loc: absoluteUrl('/sitemap-images.xml'), lastmod: now },
  ]);
  return xmlResponse(xml);
}
