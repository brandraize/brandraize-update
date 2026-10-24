import webpush from 'web-push';
import { firebaseConfig, firestoreRest } from '@/lib/firebase/config';

type FsSubscription = {
  fields?: {
    endpoint?: { stringValue?: string };
    p256dh?: { stringValue?: string };
    auth?: { stringValue?: string };
  };
};

export type PushMessage = { title: string; body: string; tag: string; url: string };

// Sends a notification to every device where an admin turned on new-request alerts
// (/admin → Requests → "Turn on new-request alerts"). Does nothing until the VAPID keys are set.
//
// The devices are listed in Firestore under "pushSubscriptions", which the website can read
// without logging in. That is safe: a push service only delivers messages signed with
// VAPID_PRIVATE_KEY, which never leaves the server.
export async function notifyAdmins(message: PushMessage) {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return;

  const res = await fetch(`${firestoreRest}/pushSubscriptions?pageSize=100&key=${firebaseConfig.apiKey}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Firestore responded ${res.status}: ${await res.text()}`);
  const { documents = [] } = (await res.json()) as { documents?: FsSubscription[] };

  const options = {
    vapidDetails: { subject: `mailto:${process.env.LEAD_TO_EMAIL ?? 'info@brandraize.com'}`, publicKey, privateKey },
    // Delivered as soon as possible, and kept for a day if the computer is off.
    TTL: 86400,
    urgency: 'high' as const,
  };
  const payload = JSON.stringify(message);

  await Promise.allSettled(
    documents.map(({ fields }) => {
      const endpoint = fields?.endpoint?.stringValue;
      const p256dh = fields?.p256dh?.stringValue;
      const auth = fields?.auth?.stringValue;
      if (!endpoint || !p256dh || !auth) return Promise.resolve();
      // A device that turned alerts off or uninstalled the app answers 404/410; it is skipped.
      return webpush.sendNotification({ endpoint, keys: { p256dh, auth } }, payload, options);
    }),
  );
}
