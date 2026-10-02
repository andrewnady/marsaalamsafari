/**
 * Central site configuration. Single source of truth for brand, contact,
 * navigation, and organization-level data used across metadata and JSON-LD.
 */

export const siteConfig = {
  name: 'Marsa Alam Safari',
  legalName: 'Marsa Alam Safari Tours',
  shortName: 'MarsaAlamSafari',
  tagline: 'Premium desert & sea adventures on Egypt’s Red Sea coast',
  description:
    'Book premium Marsa Alam desert safaris, snorkeling trips, dolphin house tours and day excursions with licensed local guides. Free hotel pickup, best-price guarantee and instant WhatsApp booking.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://marsaalamsafari.com').replace(/\/$/, ''),
  locale: 'en',
  themeColor: '#005F99',
  foundingYear: 2011,
  currency: 'EUR',
  priceRange: '€€',

  contact: {
    // Official number, hardcoded (calls + WhatsApp) so no hosting env var can
    // override it. WhatsApp format: country code, no "+" or leading zero.
    whatsapp: '201559165152',
    // Hardcoded so the official address always shows, regardless of any
    // NEXT_PUBLIC_CONTACT_EMAIL value set in the hosting env.
    email: 'marsaalamexplorer@gmail.com',
    phone: '+201559165152',
  },

  // Only verified details. Add the real street + postcode here once confirmed —
  // Google penalises inaccurate business addresses in structured data.
  address: {
    locality: 'Marsa Alam',
    region: 'Red Sea Governorate',
    country: 'EG',
    countryName: 'Egypt',
  },

  geo: {
    latitude: 25.0676,
    longitude: 34.8899,
  },

  // Aggregate trust signals reused in schema + UI. Keep in sync with real data.
  trust: {
    ratingValue: 4.9,
    reviewCount: 2384,
    yearsExperience: new Date().getFullYear() - 2011,
    guestsServed: 48000,
    tourCount: 40,
  },

  // Real profile URLs only (used as schema.org sameAs). Empty = omitted.
  social: {
    facebook: '',
    instagram: '',
    tripadvisor: '',
    youtube: '',
  },

  // Sibling brand — used for cross-linking authority (rel="me").
  siblingSite: 'https://hurghadasafari.travel',

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
    // Microsoft Clarity project ID (public; safe to commit).
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || 'yqzm6we09l',
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Supported locales — architecture is hreflang-ready for future rollout. */
export const locales = ['en', 'de', 'fr', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
};

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function absoluteUrl(path = ''): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${clean === '/' ? '' : clean}`;
}
