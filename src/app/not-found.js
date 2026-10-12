import Link from "next/link";
import { Home, Search } from "lucide-react";

/**
 * NotFound — Custom 404 page shown when a URL doesn't match any page.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-teal-500" />
        </div>
        <h1 className="text-4xl font-bold text-charcoal mb-3">404</h1>
        <h2 className="text-lg font-semibold text-charcoal mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Please check the URL or go back to the homepage.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
