import { Home, Lock } from "lucide-react";
import Link from "next/link";
import { footerContent, navLinks } from "@/data/propertyData";

/**
 * Footer — Simple footer with property name, navigation, and copyright.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Property info */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-charcoal text-sm block">
                {footerContent.text}
              </span>
              <span className="text-xs text-gray-400">
                {footerContent.location}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-4" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright & Owner Link */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center flex flex-col items-center">
          <p className="text-xs text-gray-400">
            © {year} {footerContent.text}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-xs text-gray-400">
              Residential rental listing.
            </p>
            <Link
              href="/admin"
              className="text-gray-300 hover:text-teal-600 transition-colors p-1"
              title="Owner Admin"
            >
              <Lock className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
