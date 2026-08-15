import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { isEmail } from '@/lib/validation';
import { saveSubscriber } from '@/lib/db';

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

  const email = data.email as string;

  try {
    // Idempotent: re-subscribing the same email is a no-op, not an error.
    await saveSubscriber(email, clientIp(req));
  } catch (err) {
    console.error('[newsletter] saveSubscriber failed:', err);
    // Non-fatal: don't block the user if the store is briefly unavailable.
  }
  console.info('[newsletter] subscribe:', email);

  return NextResponse.json({ ok: true });
}
