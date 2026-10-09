import { ImageResponse } from 'next/og';
import { locales, site } from '@/lib/site';

export const alt = 'Brandraize — Digital Marketing & Web Development Company in Saudi Arabia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// The card shown when a link to the site is shared.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #07173d 0%, #10306f 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ marginTop: 20, fontSize: 44, lineHeight: 1.25, color: '#d6e1fa' }}>
          Digital Marketing &amp; Web Development Company in Saudi Arabia
        </div>
        <div style={{ marginTop: 56, fontSize: 30, color: '#e8b84a' }}>brandraize.com</div>
      </div>
    ),
    size,
  );
}
