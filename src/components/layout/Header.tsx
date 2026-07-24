'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icons';
import { primaryNav } from '@/config/navigation';
import { whatsappLink } from '@/config/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'border-b border-charcoal/[0.07] bg-white/90 backdrop-blur-md' : 'bg-white',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label="Marsa Alam Safari home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((group) => (
            <div key={group.label} className="group relative">
              <Link
                href={group.href ?? '#'}
                className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:bg-beige-soft hover:text-ocean"
              >
                {group.label}
                {group.items && <Icon.ChevronDown width={14} height={14} className="opacity-50" />}
              </Link>
              {group.items && (
                <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-charcoal/[0.07] bg-white p-2 shadow-card-hover">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-beige-soft"
                      >
                        <span className="block text-sm font-semibold text-charcoal">{item.label}</span>
                        {item.description && (
                          <span className="block text-xs text-charcoal-muted">{item.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink('Hi! I’d like to ask about a Marsa Alam tour.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp hidden sm:inline-flex"
          >
            <Icon.Whatsapp width={18} height={18} />
            <span className="hidden md:inline">Book on WhatsApp</span>
            <span className="md:hidden">Book</span>
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-charcoal hover:bg-beige-soft lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Icon.X width={24} height={24} /> : <Icon.Menu width={24} height={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-charcoal/[0.07] bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-page space-y-1 py-4">
            {primaryNav.map((group) => (
              <div key={group.label}>
                {group.items ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-charcoal"
                      onClick={() => setOpenGroup((g) => (g === group.label ? null : group.label))}
                      aria-expanded={openGroup === group.label}
                    >
                      {group.label}
                      <Icon.ChevronDown
                        width={18}
                        height={18}
                        className={cn('transition-transform', openGroup === group.label && 'rotate-180')}
                      />
                    </button>
                    {openGroup === group.label && (
                      <div className="ml-3 space-y-0.5 border-l border-charcoal/10 pl-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-lg px-3 py-2.5 text-sm text-charcoal-soft hover:bg-beige-soft"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={group.href ?? '#'}
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-charcoal hover:bg-beige-soft"
                  >
                    {group.label}
                  </Link>
                )}
              </div>
            ))}
            <a
              href={whatsappLink('Hi! I’d like to ask about a Marsa Alam tour.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-3 w-full"
            >
              <Icon.Whatsapp width={18} height={18} /> Book on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
