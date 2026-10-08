import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Browser-side Firebase, used only by the admin dashboard.
const app = getApps()[0] ?? initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
