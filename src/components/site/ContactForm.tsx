'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { SITE } from '@/lib/site';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const field =
  'glass w-full rounded-2xl px-4 py-3 text-[0.95rem] text-[var(--ink)] placeholder:text-[var(--faint)] focus-visible:outline-none';

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFailure(null);
    setState('sending');

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const payload = await res.json().catch(() => ({}));

      if (res.ok) {
        setState('sent');
        return;
      }
      if (payload.errors) setErrors(payload.errors);
      else setFailure(payload.error ?? 'Something went wrong. Please try again.');
      setState('idle');
    } catch {
      setFailure(`Could not reach the server. Please email ${SITE.email} directly.`);
      setState('idle');
    }
  }

  if (state === 'sent') {
    return (
      <div className="glass glass-panel p-8" role="status">
        <p className="label">Sent</p>
        <p className="display mt-3 text-[1.75rem]">Thanks — it&apos;s on its way.</p>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">
          I&apos;ll reply to the address you gave, usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass glass-panel p-6 sm:p-8">
      <p className="label">Send a message</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="label block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`${field} mt-2`}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-[0.85rem] text-[#c0392b]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${field} mt-2`}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-[0.85rem] text-[#c0392b]">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="label block">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${field} mt-2 resize-y`}
            placeholder="A line about the team and the problem is more useful than a job title."
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-[0.85rem] text-[#c0392b]">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {failure && (
        <p role="alert" className="mt-5 text-[0.9rem] leading-relaxed text-[#c0392b]">
          {failure}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-7 inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 text-[0.95rem] font-medium text-[var(--accent-ink)] shadow-[var(--glass-shadow)] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send message'}
        <Send size={16} aria-hidden="true" />
      </button>

      <p className="mt-4 text-[0.85rem] text-[var(--faint)]">
        Or email{' '}
        <a
          href={`mailto:${SITE.email}`}
          className="text-[var(--accent)] underline-offset-4 hover:underline"
        >
          {SITE.email}
        </a>
        .
      </p>
    </form>
  );
}
