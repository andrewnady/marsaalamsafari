/** Tiny dependency-free validators for API payloads. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value);
}

export function isNonEmptyString(value: unknown, max = 2000): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  country?: string;
  subject?: string;
}

export function validateContact(data: Record<string, unknown>): { ok: true; value: ContactPayload } | { ok: false; error: string } {
  // Honeypot: if the hidden `company` field is filled, silently reject as spam.
  if (typeof data.company === 'string' && data.company.trim() !== '') {
    return { ok: false, error: 'Spam detected' };
  }
  if (!isNonEmptyString(data.name, 120)) return { ok: false, error: 'Please enter your name' };
  if (!isEmail(data.email)) return { ok: false, error: 'Please enter a valid email address' };
  if (!isNonEmptyString(data.message, 5000)) return { ok: false, error: 'Please enter a message' };

  return {
    ok: true,
    value: {
      name: (data.name as string).trim(),
      email: (data.email as string).trim(),
      message: (data.message as string).trim(),
      country: isNonEmptyString(data.country, 80) ? (data.country as string).trim() : undefined,
      subject: isNonEmptyString(data.subject, 200) ? (data.subject as string).trim() : undefined,
    },
  };
}
