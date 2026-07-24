import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icons';
import { footerNav } from '@/config/navigation';
import { siteConfig, whatsappLink } from '@/config/site';
import { Newsletter } from './Newsletter';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo reversed showTagline />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Premium desert and sea adventures on Egypt’s Red Sea coast. Licensed local guides,
              free hotel pickup and a best-price guarantee on every Marsa Alam tour.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a href={whatsappLink()} className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Icon.Whatsapp width={16} height={16} /> WhatsApp us
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Icon.Mail width={16} height={16} /> {siteConfig.contact.email}
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="inline-flex items-center gap-2 hover:text-white">
                <Icon.Phone width={16} height={16} /> {siteConfig.contact.phone}
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white">{group.label}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items?.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/60 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <Newsletter />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved. Licensed Egyptian tour operator.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/booking-terms" className="hover:text-white">Terms</Link>
            <Link href="/cancellation-policy" className="hover:text-white">Cancellation</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
