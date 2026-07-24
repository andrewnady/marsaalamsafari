'use client';

import { useMemo, useState } from 'react';
import type { Tour } from '@/content/types';
import { Icon } from '@/components/ui/Icons';
import { StarRating } from '@/components/ui/StarRating';
import { formatPrice, cn } from '@/lib/utils';
import { whatsappLink, siteConfig } from '@/config/site';

/**
 * Interactive booking panel: date, guests, hotel pickup, extras and live
 * price calculation. Submits via WhatsApp (primary) or email inquiry so no
 * payment PII is ever handled client-side.
 */
export function BookingWidget({ tour }: { tour: Tour }) {
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState('');
  const [privateTour, setPrivateTour] = useState(false);
  const [requests, setRequests] = useState('');

  const childPrice = tour.price.childAmount ?? Math.round(tour.price.amount * 0.6);

  const total = useMemo(() => {
    let sum = adults * tour.price.amount + children * childPrice;
    if (privateTour) sum = Math.round(sum * 1.35);
    return sum;
  }, [adults, children, privateTour, tour.price.amount, childPrice]);

  const summary = useMemo(() => {
    const parts = [
      `Tour: ${tour.title}`,
      date ? `Date: ${date}` : 'Date: (flexible)',
      `Guests: ${adults} adult${adults === 1 ? '' : 's'}${children ? `, ${children} child${children === 1 ? '' : 'ren'}` : ''}`,
      hotel ? `Hotel: ${hotel}` : null,
      privateTour ? 'Private tour: yes' : null,
      requests ? `Notes: ${requests}` : null,
      `Estimated total: ${formatPrice(total, tour.price.currency)}`,
    ].filter(Boolean);
    return `Hi! I’d like to book:\n${parts.join('\n')}`;
  }, [tour.title, date, adults, children, hotel, privateTour, requests, total, tour.price.currency]);

  const emailHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `Booking inquiry: ${tour.title}`,
  )}&body=${encodeURIComponent(summary)}`;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="rounded-2xl border border-charcoal/[0.09] bg-white p-6 shadow-card">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-wide text-charcoal-muted">From</span>
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-charcoal">
              {formatPrice(tour.price.amount, tour.price.currency)}
            </span>
            <span className="text-sm text-charcoal-muted">/ {tour.price.unit.replace('per ', '')}</span>
          </p>
        </div>
        <StarRating value={tour.rating} count={tour.reviewCount} />
      </div>

      <div className="mt-5 space-y-4">
        <Field label="Date" htmlFor="bk-date">
          <input
            id="bk-date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Adults" htmlFor="bk-adults">
            <Stepper value={adults} min={1} max={30} onChange={setAdults} id="bk-adults" />
          </Field>
          <Field label={`Children${tour.minAge ? ` (${tour.minAge}+)` : ''}`} htmlFor="bk-children">
            <Stepper value={children} min={0} max={20} onChange={setChildren} id="bk-children" />
          </Field>
        </div>

        <Field label="Hotel / pickup location" htmlFor="bk-hotel">
          <input
            id="bk-hotel"
            type="text"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            placeholder="e.g. Steigenberger, Port Ghalib"
            className="input"
          />
        </Field>

        <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-charcoal/10 bg-beige-soft px-3.5 py-3">
          <input
            type="checkbox"
            checked={privateTour}
            onChange={(e) => setPrivateTour(e.target.checked)}
            className="h-4 w-4 accent-ocean"
          />
          <span className="text-sm">
            <span className="font-semibold text-charcoal">Make it private</span>
            <span className="block text-xs text-charcoal-muted">Exclusive for your group (+35%)</span>
          </span>
        </label>

        <Field label="Special requests (optional)" htmlFor="bk-requests">
          <textarea
            id="bk-requests"
            rows={2}
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="Dietary needs, occasions, accessibility…"
            className="input resize-none"
          />
        </Field>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-charcoal/[0.08] pt-4">
        <span className="text-sm text-charcoal-muted">Estimated total</span>
        <span className="font-display text-2xl font-bold text-charcoal">
          {formatPrice(total, tour.price.currency)}
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full text-base"
        >
          <Icon.Whatsapp width={18} height={18} /> Book on WhatsApp
        </a>
        <a href={emailHref} className="btn-outline w-full">
          <Icon.Mail width={18} height={18} /> Email inquiry
        </a>
      </div>

      <ul className="mt-5 space-y-2 text-xs text-charcoal-muted">
        <li className="flex items-center gap-2"><Icon.Check width={14} height={14} className="text-ocean" /> Free cancellation up to 24h before</li>
        <li className="flex items-center gap-2"><Icon.Check width={14} height={14} className="text-ocean" /> No prepayment required to reserve</li>
        <li className="flex items-center gap-2"><Icon.Check width={14} height={14} className="text-ocean" /> Instant confirmation by WhatsApp</li>
      </ul>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(34 34 34 / 0.12);
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          background: #fff;
        }
        .input:focus-visible { outline: none; box-shadow: 0 0 0 2px #005F99; }
      `}</style>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
  id,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-charcoal/12 px-2 py-1.5">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn('flex h-7 w-7 items-center justify-center rounded-lg text-lg text-charcoal hover:bg-beige-soft', value <= min && 'opacity-40')}
      >
        −
      </button>
      <span id={id} className="min-w-[1.5rem] text-center text-sm font-semibold">{value}</span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-lg text-charcoal hover:bg-beige-soft"
      >
        +
      </button>
    </div>
  );
}
