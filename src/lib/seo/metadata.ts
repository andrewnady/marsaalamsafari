import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/config/site';

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Path only, e.g. "/quad-bike-marsa-alam". */
  path: string;
  images?: { url: string; alt: string; width?: number; height?: number }[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noindex?: boolean;
}

/** Google truncates titles at roughly 60 characters in search results. */
const MAX_TITLE = 60;

const DEFAULT_OG = {
  url: absoluteUrl('/opengraph-image'),
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  width: 1200,
  height: 630,
};

/**
 * Final <title>: append the brand only when it isn't already present and the
 * result still fits in a search result; otherwise keep the page's own title.
 * Returned as `absolute` so the layout's "%s | brand" template never stacks a
 * second brand onto it.
 */
export function pageTitle(title: string): string {
  if (title.includes(siteConfig.name)) return title;
  const branded = `${title} | ${siteConfig.name}`;
  return branded.length <= MAX_TITLE ? branded : title;
}

/**
 * Single source of truth for page metadata: title, description, canonical,
 * robots, Open Graph and Twitter cards.
 *
 * hreflang is intentionally NOT emitted: alternates must point to real,
 * translated pages. Add `alternates.languages` here once /de, /fr, /it exist.
 */
export function buildMetadata({
  title,
  description,
  path,
  images,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  noindex,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = pageTitle(title);
  // Only declare dimensions we actually know — never claim a size we don't have.
  const ogImages = images?.map((i) => ({
    url: i.url,
    alt: i.alt,
    ...(i.width && i.height ? { width: i.width, height: i.height } : {}),
  })) ?? [DEFAULT_OG];

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: canonical,
      locale: 'en_US',
      images: ogImages,
      ...(type === 'article' && { publishedTime, modifiedTime, authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ogImages.map((i) => i.url),
    },
  };
}
