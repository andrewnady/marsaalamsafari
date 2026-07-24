'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icons';

/** Newsletter signup. Posts to /api/newsletter (rate-limited + validated). */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'ok' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div className="max-w-md">
        <h2 className="text-lg font-semibold text-white">Red Sea travel tips, straight to your inbox</h2>
        <p className="mt-1 text-sm text-white/60">
          Seasonal deals, new tours and honest local advice. No spam, unsubscribe anytime.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-turquoise"
        />
        <button type="submit" disabled={status === 'loading'} className="btn-accent whitespace-nowrap">
          {status === 'loading' ? 'Sending…' : status === 'ok' ? 'Subscribed!' : 'Subscribe'}
          {status !== 'ok' && <Icon.Arrow width={16} height={16} />}
        </button>
      </form>
      {status === 'error' && (
        <p role="alert" className="text-sm text-sunset">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
