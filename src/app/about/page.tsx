import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StatsBar } from '@/components/home/StatsBar';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { authors } from '@/content/authors';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, localBusinessSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl, siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'About Marsa Alam Safari',
  description:
    'Meet the local, family-run team behind Marsa Alam Safari. Licensed guides, years of Red Sea experience and a genuine passion for showing you the real Egypt.',
  path: '/about',
});

export default function AboutPage() {
  const url = absoluteUrl('/about');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          localBusinessSchema(),
          webPageSchema({ path: '/about', title: 'About Marsa Alam Safari', description: metadata.description as string }),
        ]}
      />

      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
            A local team, a genuine love for the Red Sea
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-charcoal-muted">
            We’re a family-run tour operator based in Marsa Alam, sharing the desert and sea we grew
            up with. Since {siteConfig.foundingYear}, we’ve guided tens of thousands of travellers to
            their best day in Egypt — safely, warmly and without the tourist-trap gloss.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1200&q=70"
              alt="Marsa Alam Safari guides preparing camels for a sunset desert tour"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="prose-brand">
            <h2>Our story</h2>
            <p>
              Marsa Alam Safari began with a simple frustration: visitors were being sold cookie-cutter
              tours that missed everything that makes this coast special. So we built the company we’d
              want to book ourselves — small groups, honest advice, real Bedouin hospitality and reefs
              chosen for the day’s conditions, not the operator’s convenience.
            </p>
            <p>
              Today we run the full range of Marsa Alam experiences, from dolphin snorkeling at Sataya
              to desert safaris and day trips to Luxor. What hasn’t changed is the care behind them.
            </p>
            <h2>Our promise</h2>
            <p>
              Licensed and insured. Locally owned. Genuinely passionate. We treat every guest like a
              friend visiting our home — because, to us, that’s exactly what you are.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="beige">
        <StatsBar />
      </Section>

      <Section>
        <WhyChooseUs />
      </Section>

      <Section tone="beige">
        <SectionHeading eyebrow="The team" title="People who know this coast" align="center" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {authors.map((a) => (
            <div key={a.slug} className="card p-6 text-center">
              <Image src={a.avatar.src} alt={a.avatar.alt} width={88} height={88} className="mx-auto h-22 w-22 rounded-full object-cover" />
              <h3 className="mt-4 text-lg font-semibold">{a.name}</h3>
              <p className="text-xs uppercase tracking-wide text-ocean">{a.role}</p>
              <p className="mt-2 text-sm text-charcoal-muted">{a.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <CtaBanner />
      </Section>
    </>
  );
}
