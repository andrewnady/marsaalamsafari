import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/config/site';

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Path only, e.g. "/tours/quad-bike-marsa-alam". */
  path: string;
  images?: { url: string; alt: string; width?: number; height?: number }[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noindex?: boolean;
}

const DEFAULT_OG = {
  // Branded default share image. Swap for a locally-hosted /og/default.jpg in
  // production once the asset is generated.
  url: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1200&h=630&q=70',
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  width: 1200,
  height: 630,
};

/**
 * Single source of truth for page metadata. Produces title, description,
 * canonical, robots, Open Graph and Twitter card data in one call, plus
 * hreflang alternates for the four supported locales.
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
  const ogImages =
    images?.map((i) => ({
      url: i.url,
      alt: i.alt,
      width: i.width ?? 1200,
      height: i.height ?? 630,
    })) ?? [DEFAULT_OG];

  return {
    title,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    alternates: {
      canonical,
      languages: {
        'en': canonical,
        'de': absoluteUrl(`/de${path === '/' ? '' : path}`),
        'fr': absoluteUrl(`/fr${path === '/' ? '' : path}`),
        'it': absoluteUrl(`/it${path === '/' ? '' : path}`),
        'x-default': canonical,
      },
    },
    robots: noindex
      ? { index: false, follow: false }
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
      title,
      description,
      url: canonical,
      locale: 'en_US',
      images: ogImages,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map((i) => i.url),
    },
  };
}

/** Compose a page title with the brand suffix, avoiding duplication. */
export function pageTitle(title: string): string {
  return title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
}
