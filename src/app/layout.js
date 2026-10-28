import "./globals.css";
import { propertyInfo } from "@/data/propertyData";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

/**
 * Root layout — wraps all pages with shared metadata, fonts, and structure.
 * Uses Inter font from Google Fonts for modern typography.
 * Includes PWA manifest and service worker registration for installability.
 */
export const metadata = {
  metadataBase: new URL("https://chaudhary-villa.vercel.app"),
  title: {
    default: `${propertyInfo.name} — ${propertyInfo.tagline}`,
    template: `%s | ${propertyInfo.name}`,
  },
  description: propertyInfo.seoDescription,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: propertyInfo.name,
  },
  openGraph: {
    title: `${propertyInfo.name} — ${propertyInfo.tagline}`,
    description: propertyInfo.seoDescription,
    type: "website",
    locale: "en_IN",
    siteName: propertyInfo.name,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport = {
  themeColor: "#0D9488",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Inter for modern, clean typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-warm-white text-charcoal antialiased">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
