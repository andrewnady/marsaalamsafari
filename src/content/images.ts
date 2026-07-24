import type { Image } from './types';

/**
 * Helper to build well-formed Image objects. Uses Unsplash source URLs as
 * seed imagery; in production these are swapped for locally-optimized assets
 * in /public/images with descriptive filenames. Alt text is always required.
 */
export function img(
  photoId: string,
  alt: string,
  opts: { width?: number; height?: number; title?: string; caption?: string; priority?: boolean } = {},
): Image {
  const width = opts.width ?? 1600;
  const height = opts.height ?? 1067;
  return {
    src: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=70`,
    alt,
    title: opts.title ?? alt,
    caption: opts.caption,
    width,
    height,
    priority: opts.priority,
  };
}
