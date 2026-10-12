import "./globals.css";
import { propertyInfo } from "@/data/propertyData";

/**
 * Root layout — wraps all pages with shared metadata, fonts, and structure.
 * Uses Inter font from Google Fonts for modern typography.
 */
export const metadata = {
  metadataBase: new URL("https://chaudhary-villa.vercel.app"),
  title: {
    default: `${propertyInfo.name} — ${propertyInfo.tagline}`,
    template: `%s | ${propertyInfo.name}`,
  },
  description: propertyInfo.seoDescription,
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
        <meta name="theme-color" content="#0D9488" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-warm-white text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
