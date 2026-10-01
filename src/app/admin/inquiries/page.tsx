import type { Metadata } from 'next';
import { listInquiries, listSubscribers, isDbConfigured } from '@/lib/db';
import { formatDate } from '@/lib/utils';

/**
 * UNAUTHENTICATED admin preview of form submissions. Reads live data from
 * Neon at request time.
 *
 * ⚠️  This page has NO access control and exposes customer PII. It is marked
 * noindex and blocked in robots.txt, but anyone with the URL can view it.
 * Before relying on it in production, gate it behind an ADMIN_TOKEN (see the
 * commented guard below) or move it behind middleware / Vercel password
 * protection.
 */

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Inquiries (admin preview)',
  robots: { index: false, follow: false },
};

function cell(value: string | null) {
  return value && value.trim() ? value : '—';
}

export default async function AdminInquiriesPage() {
  // --- Optional token guard (uncomment to require ?token=... matching ADMIN_TOKEN) ---
  // const { searchParams } = new URL(/* pass searchParams prop */ '');
  // if (process.env.ADMIN_TOKEN && searchParams.get('token') !== process.env.ADMIN_TOKEN) notFound();

  const configured = isDbConfigured();
  const [inquiries, subscribers] = configured
    ? await Promise.all([listInquiries(), listSubscribers()])
    : [[], []];

  return (
    <div className="container-page py-10">
      <div className="mb-6 rounded-xl border border-sunset/40 bg-sunset/10 p-4 text-sm text-charcoal">
        <strong>⚠️ Unauthenticated page.</strong> This lists customer contact details with no login.
        Anyone with this URL can see it. Add an <code>ADMIN_TOKEN</code> gate or password-protect it
        before leaving it live.
      </div>

      <h1 className="text-3xl font-bold">Form submissions</h1>
      <p className="mt-1 text-charcoal-muted">
        Live from Neon Postgres · {inquiries.length} inquiries · {subscribers.length} subscribers
      </p>

      {!configured && (
        <div className="mt-6 rounded-xl border border-charcoal/10 bg-beige-soft p-5 text-charcoal-muted">
          <code>DATABASE_URL</code> is not set in this environment, so there is nothing to show.
          Add it in Vercel → Settings → Environment Variables and redeploy.
        </div>
      )}

      {/* Inquiries */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">
          Contact inquiries <span className="text-charcoal-muted">({inquiries.length})</span>
        </h2>
        {inquiries.length === 0 ? (
          <p className="rounded-xl border border-charcoal/10 bg-white p-5 text-charcoal-muted">
            No inquiries yet. Submit the contact form on <code>/contact</code> to test.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-charcoal/10">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-beige-soft text-left">
                <tr>
                  {['Date', 'Name', 'Email', 'Country', 'Subject', 'Message'].map((h) => (
                    <th key={h} className="whitespace-nowrap px-4 py-2.5 font-semibold text-charcoal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiries.map((row) => (
                  <tr key={row.id} className="border-t border-charcoal/[0.06] align-top">
                    <td className="whitespace-nowrap px-4 py-2.5 text-charcoal-muted">{formatDate(row.created_at)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-charcoal">{cell(row.name)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <a href={`mailto:${row.email}`} className="text-ocean hover:underline">{row.email}</a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-charcoal-muted">{cell(row.country)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-charcoal-muted">{cell(row.subject)}</td>
                    <td className="max-w-md px-4 py-2.5 text-charcoal-soft">{row.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Subscribers */}
      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">
          Newsletter subscribers <span className="text-charcoal-muted">({subscribers.length})</span>
        </h2>
        {subscribers.length === 0 ? (
          <p className="rounded-xl border border-charcoal/10 bg-white p-5 text-charcoal-muted">
            No subscribers yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-charcoal/10">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-beige-soft text-left">
                <tr>
                  <th className="px-4 py-2.5 font-semibold text-charcoal">Date</th>
                  <th className="px-4 py-2.5 font-semibold text-charcoal">Email</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((row) => (
                  <tr key={row.id} className="border-t border-charcoal/[0.06]">
                    <td className="whitespace-nowrap px-4 py-2.5 text-charcoal-muted">{formatDate(row.created_at)}</td>
                    <td className="px-4 py-2.5">
                      <a href={`mailto:${row.email}`} className="text-ocean hover:underline">{row.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
