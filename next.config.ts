import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    // Tailwind's CSS is small, so it ships inside the HTML instead of as a render-blocking file.
    inlineCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    // Files in /public have no content hash, so they are cached for 30 days rather than forever.
    return [
      {
        source: '/:path*.:ext(png|jpg|jpeg|webp|avif|gif|svg|ico|mp4|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
