/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure ESM modules are not compiled to CommonJS
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'react-icons', 'lucide-react'],
  },

  // Enable compression
  compress: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
