# Marsa Alam Safari — Premium SEO-First Travel Website

A production-ready, enterprise-grade travel website for **Marsa Alam Safari Tours** (Red Sea, Egypt), built to become the #1 organic result for Marsa Alam safari and excursion queries.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS**, fully statically generated, and SEO-engineered from the ground up.

- 🌐 Production domain: `marsaalamsafari.com`
- 🏷️ Brand: Horizon Sun mark · Deep Ocean Blue / Golden Sand / Turquoise / Sunset Orange · Jost + Manrope

---

## Table of contents

1. [Quick start](#quick-start)
2. [Tech stack & why](#tech-stack--why)
3. [Project structure](#project-structure)
4. [Content model (CMS-ready)](#content-model-cms-ready)
5. [SEO architecture](#seo-architecture)
6. [Performance](#performance)
7. [Accessibility](#accessibility)
8. [Security](#security)
9. [Booking & contact flow](#booking--contact-flow)
10. [Adding content](#adding-content)
11. [Testing](#testing)
12. [Deployment](#deployment)
13. [Internationalisation roadmap](#internationalisation-roadmap)

---

## Quick start

```bash
cp .env.example .env.local     # fill in WhatsApp number, email, analytics
npm install
npm run dev                    # http://localhost:3000
```

Common scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (fully static) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next.js / ESLint |
| `npm test` | Vitest content + SEO integrity suite |
| `npm run format` | Prettier |

---

## Tech stack & why

- **Next.js App Router** — file-based routing, Server Components, static generation (SSG) and ISR-ready. Every content page is prerendered to static HTML for maximum speed and crawlability.
- **TypeScript (strict, `noUncheckedIndexedAccess`)** — a typed content model that scales to hundreds of tours without silent breakage.
- **Tailwind CSS** — design tokens lifted directly from the brand deck; zero runtime CSS-in-JS.
- **next/font** — Jost + Manrope self-hosted at build, no layout shift, no third-party font requests.
- **next/image** — automatic AVIF/WebP, responsive `srcset`, lazy loading, priority hints for LCP.
- **next/og** — favicon, apple-icon and social share images generated at build (no binary assets to maintain).

---

## Project structure

```
src/
├── app/                        # Routes (App Router)
│   ├── layout.tsx              # Root layout, fonts, global JSON-LD (Org + WebSite)
│   ├── page.tsx                # Homepage
│   ├── [slug]/                 # Tour detail + SEO landing pages (clean root URLs)
│   ├── tours/                  # Tour listing
│   ├── category/[slug]/        # Tour categories
│   ├── destinations/[slug]/    # Destination guides
│   ├── blog/                   # Blog index, posts, category archives
│   ├── reviews / about / contact / faq / search
│   ├── (legal)                 # privacy, booking-terms, cancellation-policy
│   ├── api/                    # contact + newsletter (rate-limited, validated)
│   ├── sitemap.ts              # /sitemap.xml (primary)
│   ├── sitemap-index.xml/      # sitemap index + themed child sitemaps
│   ├── robots.ts               # /robots.txt
│   ├── manifest.ts             # PWA manifest
│   ├── icon.tsx / apple-icon.tsx / opengraph-image.tsx
│   └── not-found.tsx
├── components/                 # Reusable UI (brand, layout, tours, blog, seo, booking…)
├── config/                     # site.ts (single source of truth), navigation.ts
├── content/                    # Typed content model + data (CMS-ready)
│   ├── types.ts                # Tour, BlogPost, Destination, Review, …
│   ├── tours.ts  categories.ts  destinations.ts
│   ├── blog-posts.ts  blog-categories.ts  authors.ts
│   ├── landing-pages.ts  reviews.ts  images.ts
│   └── content.test.ts         # Content-integrity tests
└── lib/
    ├── seo/                    # metadata.ts, jsonld.ts, sitemap-xml.ts
    ├── rate-limit.ts  validation.ts  utils.ts
```

---

## Content model (CMS-ready)

All content is authored as typed TypeScript objects in `src/content`, validated by the test suite. The types (`src/content/types.ts`) are deliberately framework-agnostic, so the data modules can later be swapped for a headless CMS (Sanity, Contentful, Payload) query returning the **same shape** — no UI changes required.

Key entities: `Tour`, `TourCategory`, `Destination`, `BlogPost`, `BlogCategory`, `Author`, `Review`, `LandingPage`.

---

## SEO architecture

SEO is treated as a **core feature**, wired into every route.

**Metadata** — `lib/seo/metadata.ts` `buildMetadata()` produces title, meta description, canonical, robots directives, Open Graph and Twitter cards, plus `hreflang` alternates for `en/de/fr/it` in one call.

**Structured data (JSON-LD)** — `lib/seo/jsonld.ts` builds a connected entity graph:

| Schema | Where |
| --- | --- |
| `TravelAgency` / `Organization` / `LocalBusiness` | global + contact/about |
| `WebSite` + `SearchAction` | global |
| `WebPage` / `BreadcrumbList` | every page |
| `Product` + `Offer` + `AggregateRating` + `Review` | tour pages |
| `TouristTrip` + `ItemList` (itinerary) | tour pages |
| `FAQPage` | tours, landing pages, blog, FAQ |
| `BlogPosting` | blog posts |
| `TouristDestination` / `Place` | destinations |
| `ItemList` | listing pages |

**Clean URLs** — tours and landing pages live at the root (`/marsa-alam-desert-safari`, `/best-marsa-alam-safari`) via a single precedence-aware `[slug]` route.

**Sitemaps** — `/sitemap.xml` (primary), plus a `/sitemap-index.xml` referencing themed `/sitemap-tours.xml`, `/sitemap-blog.xml` and a dedicated `/sitemap-images.xml` (image SEO with titles + captions).

**Robots** — generated `/robots.txt` disallowing `/api`, `/search`; points at both sitemaps.

**Internal linking** — every tour cross-links related tours, destinations, categories and blog posts; blog posts link the tours they mention; landing pages aggregate high-intent clusters.

**Images** — descriptive `alt`, `title` and optional captions everywhere; AVIF/WebP via `next/image`.

**FAQ SEO** — every tour ships 10+ FAQs (enforced by tests) surfaced as `FAQPage` schema.

---

## Performance

Targets: Lighthouse ~100, LCP < 2s, CLS < 0.05, excellent INP.

- 100% static prerendering (`○ Static` / `● SSG`) — no server render on content pages.
- Hero/LCP images use `priority`; everything else lazy-loads.
- Self-hosted fonts with `display: swap` and fixed metrics → no CLS.
- First-load JS ~102 kB shared; interactivity is isolated to small client islands (header menu, booking widget, accordions, forms).
- Analytics load `afterInteractive` and only when configured.
- Long-cache headers on static assets; `Cache-Control` on XML sitemaps.

---

## Accessibility

Targets WCAG 2.2 AA: semantic landmarks, skip link, visible `:focus-visible` rings, `aria-expanded` on all disclosures, labelled form controls, `prefers-reduced-motion` support, dark-text-on-light contrast, and descriptive alt text.

---

## Security

- Strict security headers in `next.config.mjs`: CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
- API routes are **rate-limited** (`lib/rate-limit.ts`) and **validated** (`lib/validation.ts`).
- Contact form uses a honeypot field for spam; server re-validates independently.
- No secrets in the client bundle; email delivery is server-only behind `RESEND_API_KEY`.

> For multi-region deployments, swap the in-memory rate limiter for Upstash/Redis and add a CAPTCHA (e.g. Turnstile) — hook points are marked in the code.

---

## Booking & contact flow

The booking widget (`components/booking/BookingWidget.tsx`) calculates price live from guests, children and a private-tour option, then submits via **WhatsApp** (primary) or a prefilled **email inquiry** — no payment PII is handled client-side. The contact form posts to `/api/contact`, which validates, rate-limits, **persists the lead to Postgres**, and forwards an email notification via Resend (stubbed when unconfigured so dev/build never breaks).

## Database (Neon Postgres)

Contact/booking inquiries and newsletter subscribers are persisted to **Neon serverless Postgres** via `lib/db.ts` (HTTP query driver — ideal for serverless, no pool to manage). Set `DATABASE_URL` (pooled connection string from the Neon dashboard) in your env; when it's absent the endpoints fall back to logging so local dev and CI builds never require a DB.

- Tables (`inquiries`, `subscribers`) are created idempotently on first write via `ensureSchema()` — `CREATE TABLE IF NOT EXISTS`, so it never destroys data.
- For a larger schema, migrate to `drizzle-kit` / `node-pg-migrate`; the query shapes in `lib/db.ts` map directly.
- **Security:** `DATABASE_URL` is a secret — keep it in env vars only (Vercel + `.env.local`), never in the repo. Rotate the password in Neon if it is ever exposed.

---

## Adding content

**A tour** — append a `Tour` object to `src/content/tours.ts`. It automatically gets a page at `/<slug>`, appears in listings/sitemaps/search, and generates full schema. Run `npm test` to validate references and SEO field lengths.

**A blog post** — append a `BlogPost` to `src/content/blog-posts.ts` using the structured `body` blocks (heading/paragraph/list/quote/image/callout). Headings need unique `id`s (enforced by tests) for the auto table of contents.

**A landing page** — append a `LandingPage` to `src/content/landing-pages.ts` to target a new keyword cluster.

---

## Testing

`npm test` runs Vitest:

- **Content integrity** (`content.test.ts`) — unique/clean slugs, resolvable related-tour & author references, ≥10 FAQs per tour, rating/price sanity, alt-text presence, SEO title/description length windows, landing-page/tour slug-collision checks.
- **SEO builders** (`jsonld.test.ts`) — schema types, breadcrumb ordering, Offer/AggregateRating presence, SearchAction, article dates.

**Recommended additions for CI:** Playwright E2E on the booking flow, and Lighthouse CI budgets on `/`, a tour page and a blog post.

---

## Deployment

Optimised for **Vercel** (edge-ready) but runs on any Node host.

```bash
npm run build && npm start
```

Set environment variables from `.env.example` in your host. `vercel.json` adds long-cache headers for generated images. After deploy: submit `/sitemap-index.xml` in Google Search Console and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

---

## Internationalisation roadmap

The architecture is hreflang-ready for **English, German, French, Italian**. `buildMetadata` already emits locale alternates and `config/site.ts` defines the locale set. To ship: add a `[locale]` segment (or `next-intl`), translate the content modules, and wire the language switcher in the header.

---

Built as a scalable foundation — designed to grow to hundreds of tours and blog posts while staying fast, accessible and dominant in search.
