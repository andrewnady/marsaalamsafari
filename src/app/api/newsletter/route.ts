import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { isEmail } from '@/lib/validation';

export const runtime = 'nodejs';

/** Newsletter subscription endpoint — validated + rate-limited. */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`newsletter:${ip}`);
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

  if (!isEmail(data.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 422 });
  }

  // Persist to your ESP (Mailchimp/Brevo/Resend Audiences). Stubbed for build.
  console.info('[newsletter] subscribe:', data.email);

  return NextResponse.json({ ok: true });
}
