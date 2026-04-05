'use client';

import { useEffect, useState } from 'react';

type Locale = 'en' | 'ar';

const STORAGE_KEY = 'locale';

export const useLocale = () => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ar') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocale(saved);
      }
    } catch {
      // ignore storage failures
    }
  }, []);

  const changeLocale = (lng: Locale) => {
    setLocale(lng);
    try {
      window.localStorage.setItem(STORAGE_KEY, lng);
    } catch {
      // ignore storage failures
    }
  };

  return { locale, changeLocale };
};