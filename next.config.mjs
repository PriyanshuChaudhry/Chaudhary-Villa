/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization — Vercel automatically serves AVIF/WebP via its CDN.
  // All pages are still pre-rendered at build time (no backend required).
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Trailing slashes for SEO consistency
  trailingSlash: true,
};

export default nextConfig;
