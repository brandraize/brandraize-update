import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Tajawal } from 'next/font/google';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brandraize Admin',
  robots: { index: false, follow: false },
  // Lets the dashboard be installed as its own desktop or phone app.
  manifest: '/admin-app/manifest.webmanifest',
  icons: { apple: '/admin-app/icon-192.png' },
  appleWebApp: { capable: true, title: 'Brandraize Admin', statusBarStyle: 'black-translucent' },
};

export const viewport: Viewport = {
  themeColor: '#07173d',
};

// The dashboard has its own layout: no site header, footer or tracking tags.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${tajawal.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
