'use client';

import dynamic from 'next/dynamic';

// The dashboard talks to Firebase from the browser only, so it is never rendered on the server.
const AdminApp = dynamic(() => import('./AdminApp'), { ssr: false });

export default function AdminLoader() {
  return <AdminApp />;
}
