import enMessages from '@/locales/en/common.json';
import arMessages from '@/locales/ar/common.json';
import { getRequestConfig } from 'next-intl/server';

const messages = {
  en: enMessages,
  ar: arMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const validLocale = locale === 'ar' ? 'ar' : 'en';

  return {
    messages: messages[validLocale as keyof typeof messages] || messages.en,
    locale: validLocale,
  };
});
