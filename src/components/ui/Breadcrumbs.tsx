import Link from 'next/link';
import { Icon } from './Icons';

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumb trail. Pair with `breadcrumbSchema` for the JSON-LD
 * equivalent — this component only renders the on-page navigation.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-charcoal-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="font-medium text-charcoal" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-ocean">
                    {item.name}
                  </Link>
                  <Icon.ChevronRight width={14} height={14} className="text-charcoal/30" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
