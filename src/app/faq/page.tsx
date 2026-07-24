import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';
import type { FAQ } from '@/content/types';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about booking Marsa Alam tours: pickup, safety, cancellation, payment, what to bring, families, weather and more.',
  path: '/faq',
});

const groups: { title: string; faqs: FAQ[] }[] = [
  {
    title: 'Booking & payment',
    faqs: [
      { question: 'How do I book a tour?', answer: 'The fastest way is WhatsApp — send us your tour, date, hotel and group size and we’ll confirm within minutes. You can also use the booking widget on any tour page or the contact form. No prepayment is required to reserve most tours.' },
      { question: 'Do I need to pay in advance?', answer: 'For most tours, no. You can reserve your spot and pay on the day (cash in EUR, USD or EGP is widely accepted). Some special trips may require a deposit, which we’ll always tell you upfront.' },
      { question: 'Can I cancel or change my booking?', answer: 'Yes. Most tours offer free cancellation up to 24 hours before the start time. Changes are usually easy to accommodate — just message us as early as you can.' },
      { question: 'Which currencies do you accept?', answer: 'We accept Euros, US Dollars and Egyptian Pounds in cash. Card and online payment options are available for some tours on request.' },
    ],
  },
  {
    title: 'On the day',
    faqs: [
      { question: 'Is hotel pickup included?', answer: 'Yes, round-trip air-conditioned hotel pickup from Marsa Alam and Port Ghalib is included on all tours. Pickups from farther resorts (like El Quseir) may carry a small surcharge, confirmed at booking.' },
      { question: 'What time will I be picked up?', answer: 'Pickup times depend on the tour and your hotel; we confirm the exact time by WhatsApp the evening before. Please be ready in your hotel lobby about 10 minutes early.' },
      { question: 'What should I bring?', answer: 'It varies by tour, but generally: reef-safe sunscreen, sunglasses, a hat, swimwear and a towel for sea trips; closed shoes and a light jacket for desert safaris; and your passport or ID for day trips to Luxor and Aswan.' },
      { question: 'What languages do your guides speak?', answer: 'Our guides speak English, German and Italian, with French available on many day trips. Let us know your preferred language when booking.' },
    ],
  },
  {
    title: 'Safety & suitability',
    faqs: [
      { question: 'Are your tours safe?', answer: 'Yes. We’re a licensed, insured operator with experienced local guides, well-maintained vehicles and boats, small groups and rigorous safety briefings. Our safety record spans tens of thousands of guests.' },
      { question: 'Are the tours suitable for children?', answer: 'Many are, with children’s rates available. Camel rides, Abu Dabbab snorkeling and the desert safari are especially family-friendly. Each tour page lists any minimum age.' },
      { question: 'I’m not a strong swimmer — can I still do the snorkeling trips?', answer: 'Yes. The best snorkeling sites here are calm and shallow, and life jackets and flotation aids are always available. Our guides stay close and can assist nervous swimmers.' },
      { question: 'What happens if the weather is bad?', answer: 'If a tour can’t run safely due to weather (rare on this coast), we’ll offer a free reschedule or a full refund.' },
    ],
  },
];

export default function FaqPage() {
  const url = absoluteUrl('/faq');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];
  const allFaqs = groups.flatMap((g) => g.faqs);

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          faqSchema(allFaqs),
          webPageSchema({ path: '/faq', title: 'Frequently Asked Questions', description: metadata.description as string }),
        ]}
      />
      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Frequently asked questions</h1>
          <p className="mt-3 max-w-2xl text-lg text-charcoal-muted">
            Everything you need to book with confidence. Can’t find your answer? Message us on
            WhatsApp — we’re happy to help.
          </p>
        </div>
      </div>
      <Section>
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((g) => (
            <div key={g.title}>
              <SectionHeading title={g.title} />
              <div className="mt-5">
                <FaqAccordion faqs={g.faqs} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="beige">
        <CtaBanner />
      </Section>
    </>
  );
}
