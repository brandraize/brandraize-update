import { firebaseConfig, firestoreRest } from '@/lib/firebase/config';
import { site } from '@/lib/site';

type Lead = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  locale: string;
  source: string;
  page: string;
};

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

async function sendEmail(lead: Lead) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL,
      to: process.env.LEAD_TO_EMAIL ?? site.email,
      reply_to: lead.email || undefined,
      subject: `New lead: ${lead.name} — ${lead.service || 'General enquiry'}`,
      text: [
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email || '-'}`,
        `Service: ${lead.service || '-'}`,
        `Message: ${lead.message || '-'}`,
        '',
        `Form: ${lead.source} (${lead.locale})`,
        `Page: ${lead.page}`,
      ].join('\n'),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

// Saved with the public web key; the Firestore rules allow anyone to create a lead and nothing else.
async function saveToFirestore(lead: Lead) {
  const fields: Record<string, unknown> = {
    status: { stringValue: 'new' },
    createdAt: { timestampValue: new Date().toISOString() },
  };
  for (const [key, value] of Object.entries(lead)) fields[key] = { stringValue: value };

  const res = await fetch(`${firestoreRest}/leads?key=${firebaseConfig.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`Firestore responded ${res.status}: ${await res.text()}`);
}

async function sendWebhook(lead: Lead) {
  const res = await fetch(process.env.LEAD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Lead webhook responded ${res.status}`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Bots fill the hidden field; accept silently so they don't retry.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const lead: Lead = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160),
    service: clean(body.service, 120),
    message: clean(body.message, 2000),
    locale: clean(body.locale, 5),
    source: clean(body.source, 60),
    page: clean(body.page, 500),
  };

  if (!lead.name || lead.phone.replace(/\D/g, '').length < 7) {
    return Response.json({ error: 'invalid_lead' }, { status: 400 });
  }

  const deliveries: Promise<void>[] = [saveToFirestore(lead)];
  if (process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL) deliveries.push(sendEmail(lead));
  if (process.env.LEAD_WEBHOOK_URL) deliveries.push(sendWebhook(lead));

  const results = await Promise.allSettled(deliveries);
  const failures = results.filter((r) => r.status === 'rejected');
  failures.forEach((f) => console.error('Lead delivery failed:', (f as PromiseRejectedResult).reason));

  // If nothing accepted the lead, say so: the form then offers WhatsApp instead of losing it.
  if (failures.length === results.length) {
    return Response.json({ error: 'delivery_failed' }, { status: 502 });
  }
  return Response.json({ ok: true });
}
