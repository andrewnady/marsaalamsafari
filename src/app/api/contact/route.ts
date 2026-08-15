import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { validateContact } from '@/lib/validation';
import { saveInquiry, isDbConfigured } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * Contact / booking inquiry endpoint. Validates + rate-limits, then hands off
 * to an email provider. The provider call is stubbed behind RESEND_API_KEY so
 * the build has no hard dependency; wire it up in deployment.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const result = validateContact(data);
  if (!result.ok) {
    // Honeypot hits look successful to the bot but do nothing.
    if (result.error === 'Spam detected') return NextResponse.json({ ok: true });
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  const { name, email, message, country, subject } = result.value;
  const userAgent = req.headers.get('user-agent') ?? undefined;

  // 1) Durable store first (best-effort — a DB hiccup must not lose the lead if
  //    email still works, and vice-versa).
  let persisted = false;
  try {
    const id = await saveInquiry({ name, email, message, country, subject, sourceIp: ip, userAgent });
    persisted = id !== null;
  } catch (err) {
    console.error('[contact] saveInquiry failed:', err);
  }

  // 2) Email notification (also best-effort; stubbed when unconfigured).
  let notified = false;
  try {
    await deliverInquiry({ name, email, message, country, subject });
    notified = true;
  } catch (err) {
    console.error('[contact] deliverInquiry failed:', err);
  }

  // Succeed if the lead landed anywhere durable OR neither channel is configured
  // (dev), in which case the request was logged.
  if (persisted || notified || (!isDbConfigured() && !process.env.RESEND_API_KEY)) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json(
    { error: 'Could not send your message. Please try WhatsApp.' },
    { status: 502 },
  );
}

async function deliverInquiry(payload: {
  name: string;
  email: string;
  message: string;
  country?: string;
  subject?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX_EMAIL;

  // No provider configured (e.g. local/dev): log and succeed so the UX works.
  if (!apiKey || !to) {
    console.info('[contact] inquiry received (no email provider configured):', {
      ...payload,
      message: payload.message.slice(0, 120),
    });
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Marsa Alam Safari <bookings@marsaalamsafari.com>',
      to,
      reply_to: payload.email,
      subject: `New inquiry: ${payload.subject ?? 'Marsa Alam tour'} — ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.country ? `Country: ${payload.country}` : null,
        payload.subject ? `Subject: ${payload.subject}` : null,
        '',
        payload.message,
      ]
        .filter(Boolean)
        .join('\n'),
    }),
  });

  if (!res.ok) throw new Error(`Email provider error: ${res.status}`);
}
