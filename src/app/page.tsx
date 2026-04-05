import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLang = headersList.get('accept-language') || '';

  const isArabic = acceptLang.toLowerCase().includes('ar');

  if (isArabic) {
    redirect('/ar');
  } else {
    redirect('/en');
  }
}