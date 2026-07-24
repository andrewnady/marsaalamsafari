import { Icon } from '@/components/ui/Icons';

export function IncludedList({ included, excluded }: { included: string[]; excluded: string[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-charcoal">
          <Icon.Check width={20} height={20} className="text-ocean" /> What’s included
        </h3>
        <ul className="mt-4 space-y-2.5">
          {included.map((item) => (
            <li key={item} className="flex gap-2.5 text-charcoal-soft">
              <Icon.Check width={18} height={18} className="mt-0.5 shrink-0 text-ocean" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-charcoal">
          <Icon.X width={20} height={20} className="text-charcoal/40" /> Not included
        </h3>
        <ul className="mt-4 space-y-2.5">
          {excluded.map((item) => (
            <li key={item} className="flex gap-2.5 text-charcoal-muted">
              <Icon.X width={18} height={18} className="mt-0.5 shrink-0 text-charcoal/30" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
