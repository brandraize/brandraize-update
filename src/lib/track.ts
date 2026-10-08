type Tracked = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

const adsLeadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

// Fired when a lead form is submitted successfully.
export function trackLead(source: string) {
  const w = window as Tracked;
  w.dataLayer?.push({ event: 'generate_lead', lead_source: source });
  w.gtag?.('event', 'generate_lead', { lead_source: source });
  if (adsLeadLabel) w.gtag?.('event', 'conversion', { send_to: adsLeadLabel });
  w.fbq?.('track', 'Lead', { content_name: source });
}

// Fired when a visitor taps WhatsApp, phone or email.
export function trackContact(method: 'whatsapp' | 'phone' | 'email', source: string) {
  const w = window as Tracked;
  w.dataLayer?.push({ event: 'contact_click', contact_method: method, contact_source: source });
  w.gtag?.('event', 'contact_click', { contact_method: method, contact_source: source });
  w.fbq?.('track', 'Contact', { content_name: `${method}:${source}` });
}
