import Image from 'next/image';
import { Icon } from '@/components/ui/Icons';

const reasons = [
  {
    icon: Icon.Pin,
    title: 'Genuine local expertise',
    text: 'Our guides were born on this coast. They know which reef the dolphins favour today and which dune catches the best sunset — knowledge no booking platform can match.',
  },
  {
    icon: Icon.Shield,
    title: 'Safety without compromise',
    text: 'Licensed operators, insured vehicles, small groups, first-aid-trained guides and rigorous equipment checks. Your safety is never the corner we cut.',
  },
  {
    icon: Icon.Star,
    title: 'Premium, personal service',
    text: 'From your first WhatsApp message to hotel drop-off, you deal with real people who care. No call centres, no scripts — just attentive, honest service.',
  },
  {
    icon: Icon.Check,
    title: 'Transparent, fair pricing',
    text: 'Clear prices, no hidden fees and a best-price guarantee. Free cancellation on most tours means you can book with total confidence.',
  },
];

export function WhyChooseUs() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
        <Image
          src="https://images.unsplash.com/photo-1682687220208-22d7a2543e88?auto=format&fit=crop&w=1200&q=70"
          alt="Local Marsa Alam guide leading snorkelers over a healthy Red Sea coral reef"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="eyebrow">Why travellers choose us</p>
        <h2 className="mt-2 text-3xl sm:text-4xl">The local team behind your best day in Egypt</h2>
        <p className="mt-4 text-lg text-charcoal-muted">
          We’re a family-run Marsa Alam operator with a simple promise: the care and knowledge of a
          local, delivered to the standard of the world’s best travel brands.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean/10 text-ocean">
                <r.icon width={20} height={20} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-charcoal">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
