import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Marsa Alam Safari collects, uses and protects your personal data. GDPR-friendly and transparent.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 July 2026">
      <p>
        {siteConfig.legalName} respects your privacy. This policy explains what personal data we
        collect, why, and your rights over it. We keep data collection to the minimum needed to serve
        you well.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Contact details you provide (name, email, phone) when you book or enquire.</li>
        <li>Booking details (tour, date, hotel, group size, special requests).</li>
        <li>Basic, privacy-friendly analytics (aggregated, anonymised where possible).</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and arrange your tour and pickup.</li>
        <li>To send booking confirmations and, if you opt in, occasional travel tips and offers.</li>
        <li>To improve our website and services.</li>
      </ul>
      <h2>Legal basis (GDPR)</h2>
      <p>
        We process your data to perform our contract with you (your booking), on the basis of your
        consent (marketing emails), and for our legitimate interests (improving our services).
      </p>
      <h2>Sharing</h2>
      <p>
        We do not sell your data. We share it only with the guides and partners needed to deliver
        your tour, and with service providers (e.g. email delivery) under confidentiality obligations.
      </p>
      <h2>Retention</h2>
      <p>We keep booking records only as long as needed for legal and operational purposes.</p>
      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data, and withdraw
        marketing consent at any time. Contact <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>
      <h2>Cookies</h2>
      <p>
        We use essential cookies to run the site and, where enabled, privacy-friendly analytics. You
        can control cookies through your browser settings.
      </p>
    </LegalLayout>
  );
}
