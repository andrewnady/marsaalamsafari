import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Cancellation Policy',
  description: 'Our fair, transparent cancellation policy for Marsa Alam tours — free cancellation up to 24 hours before most tours.',
  path: '/cancellation-policy',
});

export default function CancellationPage() {
  return (
    <LegalLayout title="Cancellation Policy" updated="1 July 2026">
      <p>We want you to book with total confidence. Our cancellation terms are simple and fair.</p>
      <h2>Free cancellation</h2>
      <p>
        For most tours, you can cancel free of charge up to <strong>24 hours before</strong> the
        scheduled start time and receive a full refund of any amount paid.
      </p>
      <h2>Late cancellations</h2>
      <p>
        Cancellations made within 24 hours of the start time, or no-shows, are non-refundable, as we
        will have committed guides, vehicles and permits on your behalf.
      </p>
      <h2>Cancellations by us</h2>
      <p>
        If we must cancel a tour due to weather, sea conditions or any safety concern, you will be
        offered a free reschedule or a full refund — your choice.
      </p>
      <h2>Multi-day and special tours</h2>
      <p>
        A small number of special or multi-day trips may have different terms due to advance permits
        or third-party bookings. Any such terms are always confirmed to you clearly before you book.
      </p>
      <h2>How to cancel</h2>
      <p>
        Simply message us on WhatsApp or email as early as possible. We confirm every cancellation in
        writing.
      </p>
    </LegalLayout>
  );
}
