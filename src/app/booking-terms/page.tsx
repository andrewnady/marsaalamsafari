import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Booking Terms & Conditions',
  description: 'Booking terms and conditions for Marsa Alam Safari tours and excursions.',
  path: '/booking-terms',
});

export default function BookingTermsPage() {
  return (
    <LegalLayout title="Booking Terms & Conditions" updated="1 July 2026">
      <p>
        These terms govern bookings made with {siteConfig.legalName} (“we”, “us”). By booking a tour
        you agree to them. They’re written to be clear and fair — if anything is unclear, just ask.
      </p>
      <h2>1. Bookings & confirmation</h2>
      <p>
        A booking is confirmed once we acknowledge it in writing (by WhatsApp or email) with your
        tour, date and pickup details. Please review the confirmation and tell us of any errors.
      </p>
      <h2>2. Pricing & payment</h2>
      <p>
        Prices are shown per person unless stated otherwise and may vary by season and group size.
        Most tours require no prepayment; payment is due on the day in cash (EUR, USD or EGP) or by
        an agreed method. We operate a best-price guarantee on comparable, verifiable local offers.
      </p>
      <h2>3. Pickup & punctuality</h2>
      <p>
        Hotel pickup is included as described on each tour. Please be ready 10 minutes early. We
        cannot delay group departures for late guests, and missed pickups due to guest lateness are
        treated as no-shows.
      </p>
      <h2>4. Health, safety & conduct</h2>
      <p>
        You must disclose any medical conditions, pregnancy or mobility needs relevant to your tour.
        You agree to follow guide instructions at all times. We may decline participation where
        safety would be compromised. Activities such as quad biking, diving and snorkeling carry
        inherent risks that you accept by participating.
      </p>
      <h2>5. Insurance</h2>
      <p>
        We carry operator liability insurance. We strongly recommend you hold personal travel
        insurance covering the activities you book, including diving where applicable.
      </p>
      <h2>6. Changes & cancellations</h2>
      <p>
        See our <Link href="/cancellation-policy">Cancellation Policy</Link>. We may alter itineraries for
        safety, weather or circumstances beyond our control, always aiming to preserve the experience.
      </p>
      <h2>7. Liability</h2>
      <p>
        To the extent permitted by law, our liability is limited to the value of the tour booked. We
        are not liable for losses arising from events beyond our reasonable control.
      </p>
      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of the Arab Republic of Egypt.</p>
      <h2>9. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>
    </LegalLayout>
  );
}
