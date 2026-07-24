import { siteConfig } from '@/config/site';

const stats = [
  { value: `${siteConfig.trust.yearsExperience}+`, label: 'Years of experience' },
  { value: `${Math.round(siteConfig.trust.guestsServed / 1000)}k+`, label: 'Happy travellers' },
  { value: `${siteConfig.trust.tourCount}+`, label: 'Tours & excursions' },
  { value: siteConfig.trust.ratingValue.toFixed(1), label: 'Average rating' },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="font-display text-4xl font-bold text-ocean sm:text-5xl">{s.value}</p>
          <p className="mt-1 text-sm text-charcoal-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
