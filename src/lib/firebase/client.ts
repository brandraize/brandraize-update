import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Browser-side Firebase, used only by the admin dashboard.
const app = getApps()[0] ?? initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Asks the website to drop its cached copy of the dashboard content, so a change shows to
// visitors right away. Failing is harmless: the cache then expires on its own within a minute.
export async function refreshSite() {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) await fetch('/api/revalidate', { method: 'POST', headers: { authorization: `Bearer ${token}` } });
  } catch {
    // Ignored, see above.
  }
}
