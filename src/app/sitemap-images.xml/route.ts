import { absoluteUrl } from '@/config/site';
import { tours } from '@/content/tours';
import { destinations } from '@/content/destinations';
import { blogPosts } from '@/content/blog-posts';
import { urlsetXml, xmlResponse, type UrlEntry } from '@/lib/seo/sitemap-xml';

export const dynamic = 'force-static';

/** Dedicated image sitemap — groups every content image under its page URL. */
export function GET() {
  const entries: UrlEntry[] = [
    ...tours.map((t) => ({
      loc: absoluteUrl(`/${t.slug}`),
      images: [t.heroImage, ...t.gallery].map((i) => ({
        loc: i.src,
        title: i.title ?? i.alt,
        caption: i.caption ?? i.alt,
      })),
    })),
    ...destinations.map((d) => ({
      loc: absoluteUrl(`/destinations/${d.slug}`),
      images: [{ loc: d.image.src, title: d.image.title ?? d.image.alt, caption: d.image.alt }],
    })),
    ...blogPosts.map((p) => ({
      loc: absoluteUrl(`/blog/${p.slug}`),
      images: [{ loc: p.heroImage.src, title: p.heroImage.title ?? p.heroImage.alt, caption: p.heroImage.alt }],
    })),
  ];
  return xmlResponse(urlsetXml(entries));
}
