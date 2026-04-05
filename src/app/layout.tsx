import './globals.css';
import { headers } from 'next/headers';
import { Tajawal } from 'next/font/google';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata = {
  title: 'Brandraize',
  description: 'Global website with i18n support',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') ?? 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${tajawal.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}