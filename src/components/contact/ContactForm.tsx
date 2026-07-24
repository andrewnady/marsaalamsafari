'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icons';

type Status = 'idle' | 'loading' | 'ok' | 'error';

/**
 * Contact / inquiry form. Client-side validation plus a honeypot field for
 * spam; the server route (/api/contact) re-validates and rate-limits.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to send');
      }
      setStatus('ok');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-ocean/20 bg-ocean/[0.05] p-8 text-center">
        <Icon.Check width={40} height={40} className="mx-auto text-ocean" />
        <h2 className="mt-3 text-xl font-semibold">Thank you — message sent!</h2>
        <p className="mt-2 text-charcoal-muted">
          We’ve received your inquiry and will reply within a few hours. For anything urgent, message
          us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot: hidden from users, catches bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Country" name="country" autoComplete="country-name" />
        <Field label="Tour / topic" name="subject" placeholder="e.g. Desert safari" />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-charcoal">
          Message <span className="text-sunset">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us your dates, group size, hotel and what you’d love to do…"
          className="w-full rounded-xl border border-charcoal/12 px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-ocean"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-sunset">{error || 'Something went wrong. Please try again.'}</p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full text-base">
        {status === 'loading' ? 'Sending…' : 'Send inquiry'}
        <Icon.Arrow width={18} height={18} />
      </button>
      <p className="text-center text-xs text-charcoal-muted">
        By sending, you agree to our privacy policy. We never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `cf-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label} {required && <span className="text-sunset">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-charcoal/12 px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-ocean"
      />
    </div>
  );
}
