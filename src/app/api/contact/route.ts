import { NextResponse } from 'next/server';
import { SITE } from '@/lib/site';

/**
 * Contact form delivery.
 *
 * Posts to Web3Forms, which emails the submission straight to SITE.email.
 * Set WEB3FORMS_ACCESS_KEY in the Vercel project (get one free at
 * web3forms.com — it only needs an email address, no account). Without the
 * key the route reports that it is not configured rather than silently
 * dropping the message.
 */

const MAX = { name: 120, email: 160, message: 5000 };

type Body = {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot: real people leave this empty. */
  company?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Bots fill every field, including the hidden one. Accept and discard.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please add your name.';
  else if (name.length > MAX.name) errors.name = 'That name is too long.';
  if (!email) errors.email = 'Please add an email address.';
  else if (!isEmail(email)) errors.email = 'That email address looks wrong.';
  else if (email.length > MAX.email) errors.email = 'That email is too long.';
  if (!message) errors.message = 'Please add a message.';
  else if (message.length < 10) errors.message = 'A little more detail, please.';
  else if (message.length > MAX.message) errors.message = 'That message is too long.';

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY is not set; contact form cannot send.');
    return NextResponse.json(
      {
        error: `The form isn't configured yet. Please email ${SITE.email} directly.`
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio message from ${name}`,
        from_name: 'muzaffarkhaydarov.com',
        replyto: email,
        name,
        email,
        message
      })
    });

    const result = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (!res.ok || !result.success) {
      console.error('Web3Forms rejected the submission', res.status, result);
      return NextResponse.json(
        { error: `Could not send. Please email ${SITE.email} directly.` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form delivery failed', err);
    return NextResponse.json(
      { error: `Could not send. Please email ${SITE.email} directly.` },
      { status: 502 }
    );
  }
}
