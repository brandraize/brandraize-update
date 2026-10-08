'use client';

import type { ReactNode } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappHref, type Locale } from '@/lib/site';
import { trackContact } from '@/lib/track';

type ContactLinkProps = {
  href: string;
  method: 'whatsapp' | 'phone' | 'email';
  source: string;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
};

// A WhatsApp / tel: / mailto: link that reports the click to the ad platforms.
export default function ContactLink({ href, method, source, children, ...rest }: ContactLinkProps) {
  const external = method === 'whatsapp';

  return (
    <a
      href={href}
      onClick={() => trackContact(method, source)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

// Floating WhatsApp button shown on every page.
export function WhatsAppFloat({ locale }: { locale: Locale }) {
  return (
    <ContactLink
      href={whatsappHref(locale)}
      method="whatsapp"
      source="floating_button"
      aria-label={locale === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      className="fixed bottom-4 end-4 z-40 flex h-12 w-12 items-center sm:bottom-5 sm:end-5 sm:h-14 sm:w-14 justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 -z-10 animate-ring rounded-full bg-[#25d366]" aria-hidden="true" />
      <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
    </ContactLink>
  );
}
