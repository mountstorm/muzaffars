'use server';

import { Resend } from 'resend';

type ContactPayload = {
  subject: string;
  email: string;
  body: string;
};

export async function sendContactEmail({
  subject,
  email,
  body
}: ContactPayload): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: 'Email service is not configured.' };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: 'mkhaydar@go.olemiss.edu',
      replyTo: email,
      subject: subject || `New message from ${email}`,
      text: `${body}\n\nFrom: ${email}`
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to send email.'
    };
  }
}
