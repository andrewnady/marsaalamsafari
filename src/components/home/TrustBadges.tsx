import { Icon } from '@/components/ui/Icons';

const badges = [
  { icon: Icon.Shield, title: 'Licensed & insured', text: 'Registered Egyptian tour operator' },
  { icon: Icon.Check, title: 'Free cancellation', text: 'Up to 24 hours before most tours' },
  { icon: Icon.Star, title: 'Best-price guarantee', text: 'Found it cheaper? We’ll match it' },
  { icon: Icon.Users, title: 'Local expert guides', text: 'Born-and-raised Red Sea team' },
  { icon: Icon.Phone, title: '24/7 support', text: 'Real people on WhatsApp' },
  { icon: Icon.Globe, title: 'Multilingual', text: 'EN · DE · IT · FR guides' },
];

/** Compact trust strip — sits directly under the hero to reduce booking anxiety. */
export function TrustBadges() {
  return (
    <div className="border-b border-charcoal/[0.07] bg-beige-soft">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-5 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {badges.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean">
              <b.icon width={18} height={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-charcoal">{b.title}</p>
              <p className="text-xs text-charcoal-muted">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
