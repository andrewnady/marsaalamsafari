'use client';

import { useState } from 'react';
import type { FAQ } from '@/content/types';
import { Icon } from './Icons';
import { cn } from '@/lib/utils';

/**
 * Accessible FAQ accordion. Visual only — pair with `faqSchema` for the
 * FAQPage JSON-LD so answers are eligible for rich results.
 */
export function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-charcoal/[0.08] overflow-hidden rounded-2xl border border-charcoal/[0.08] bg-white">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-semibold text-charcoal">{faq.question}</span>
                <Icon.ChevronDown
                  width={20}
                  height={20}
                  className={cn('shrink-0 text-ocean transition-transform', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <div
              className={cn(
                'grid transition-all duration-200',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-charcoal-muted">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
