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
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201000000000',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@marsaalamsafari.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+201000000000',
  },

  address: {
    street: 'Marina Promenade, Port Ghalib',
    locality: 'Marsa Alam',
    region: 'Red Sea Governorate',
    postalCode: '84721',
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

  social: {
    facebook: 'https://www.facebook.com/marsaalamsafari',
    instagram: 'https://www.instagram.com/marsaalamsafari',
    tripadvisor: 'https://www.tripadvisor.com/marsaalamsafari',
    youtube: 'https://www.youtube.com/@marsaalamsafari',
  },

  // Sibling brand — used for cross-linking authority (rel="me").
  siblingSite: 'https://hurghadasafari.travel',

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
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
