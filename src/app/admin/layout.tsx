import '../globals.css';
import type { Metadata } from 'next';
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
