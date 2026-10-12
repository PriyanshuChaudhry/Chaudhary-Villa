import { Home, Lock } from "lucide-react";
import Link from "next/link";
import { footerContent, navLinks } from "@/data/propertyData";

/**
 * Footer — Simple footer with property name, navigation, and copyright.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-100/70 border-t border-stone-200/70 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Property info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-sm">
              <Home className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-charcoal text-sm block">
                {footerContent.text}
              </span>
              <span className="text-xs text-stone-500">
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
                className="text-sm font-medium text-stone-600 hover:text-teal-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-stone-200/60 text-center">
          <p className="text-xs text-stone-500">
            © {year} {footerContent.text}. All rights reserved.
          </p>
          <p className="text-xs text-stone-400 mt-1 flex items-center justify-center gap-2">
            <span>Personal residential rental property listing.</span>
            <span>•</span>
            <Link
              href="/admin"
              className="text-stone-400 hover:text-stone-600 transition-colors inline-flex items-center gap-1"
              title="Owner Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
