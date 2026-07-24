import Image from 'next/image';
import type { LandingPage } from '@/content/landing-pages';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { TourCard } from '@/components/tours/TourCard';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { getTour } from '@/content/tours';

export function LandingPageView({ page }: { page: LandingPage }) {
  const tours = page.tourSlugs.map(getTour).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-charcoal">
        <Image
          src={page.heroImage.src}
          alt={page.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/50 to-charcoal/30" />
        <div className="container-page relative py-20 text-white lg:py-28">
          <div className="mb-5 [&_*]:text-white/70">
            <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: page.title, path: `/${page.slug}` }]} />
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl">{page.title}</h1>
          <div className="mt-5 max-w-2xl space-y-3 text-lg text-white/80">
            {page.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Tours */}
      <Section>
        <SectionHeading eyebrow="Top picks" title="Recommended tours" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t, i) => (
            <TourCard key={t.slug} tour={t} priority={i < 3} />
          ))}
        </div>
      </Section>

      {/* Editorial sections */}
      {page.sections.length > 0 && (
        <Section tone="beige">
          <div className="mx-auto max-w-prose space-y-10">
            {page.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-2xl font-semibold sm:text-3xl">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-lg leading-relaxed text-charcoal-soft">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <FaqAccordion faqs={page.faqs} />
        </div>
      </Section>

      <Section tone="beige">
        <CtaBanner />
      </Section>
    </>
  );
}
