/** Helpers to hand-build XML sitemaps for the sitemap-index architecture. */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  images?: { loc: string; caption?: string; title?: string }[];
}

export function urlsetXml(entries: UrlEntry[]): string {
  const body = entries
    .map((e) => {
      const images = (e.images ?? [])
        .map(
          (img) =>
            `    <image:image><image:loc>${escapeXml(img.loc)}</image:loc>` +
            (img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : '') +
            (img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : '') +
            `</image:image>`,
        )
        .join('\n');
      return (
        `  <url>\n` +
        `    <loc>${escapeXml(e.loc)}</loc>\n` +
        (e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : '') +
        (e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>\n` : '') +
        (e.priority !== undefined ? `    <priority>${e.priority.toFixed(1)}</priority>\n` : '') +
        (images ? `${images}\n` : '') +
        `  </url>`
      );
    })
    .join('\n');

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `${body}\n` +
    `</urlset>`
  );
}

export function sitemapIndexXml(sitemaps: { loc: string; lastmod?: string }[]): string {
  const body = sitemaps
    .map(
      (s) =>
        `  <sitemap>\n    <loc>${escapeXml(s.loc)}</loc>\n` +
        (s.lastmod ? `    <lastmod>${s.lastmod}</lastmod>\n` : '') +
        `  </sitemap>`,
    )
    .join('\n');
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</sitemapindex>`
  );
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
