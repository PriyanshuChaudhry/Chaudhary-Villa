/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Vercel deployment without a backend
  output: "export",

  // Disable server-based image optimization (not available in static export)
  images: {
    unoptimized: true,
  },

  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
