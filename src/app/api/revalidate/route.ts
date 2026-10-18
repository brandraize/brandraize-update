import { revalidatePath } from 'next/cache';
import { firebaseConfig } from '@/lib/firebase/config';

// Accounts allowed to refresh the site. Keep in step with isAdmin() in /firestore.rules.
const ADMIN_EMAILS = ['info@brandraize.com'];

// Called by the admin dashboard after it changes content, so visitors see the change right away
// instead of after the cache expires. The caller proves who they are with their Firebase ID token.
export async function POST(request: Request) {
  const idToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!idToken) return Response.json({ ok: false }, { status: 401 });

  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ idToken }),
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  }).catch(() => null);
  const data = res?.ok ? ((await res.json()) as { users?: Array<{ email?: string }> }) : null;
  const email = data?.users?.[0]?.email?.toLowerCase();
  if (!email || !ADMIN_EMAILS.includes(email)) return Response.json({ ok: false }, { status: 403 });

  // Every page reads from the dashboard, so the whole site is refreshed.
  revalidatePath('/', 'layout');
  revalidatePath('/api/defaults');
  return Response.json({ ok: true });
}
