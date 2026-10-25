import { Home, Lock, MapPin, Phone, ArrowUpRight, Navigation } from "lucide-react";
import Link from "next/link";
import { footerContent, navLinks, propertyInfo } from "@/data/propertyData";
import { contactInfo } from "@/data/contactData";

/**
 * Footer — Premium footer with gradient accent, organized columns, and polished layout.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  // Separate nav links for footer display (exclude Admin from main links)
  const mainLinks = navLinks.filter((l) => l.href !== "/admin");

  const formatPhone = (num) =>
    `${num.slice(0, 4)} ${num.slice(4, 7)} ${num.slice(7)}`;

  return (
    <footer className="relative mt-24">
      {/* Gradient accent strip */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      <div className="bg-stone-950">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Column 1: Branding */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-white text-base block leading-tight">
                    {footerContent.text}
                  </span>
                  <span className="text-xs text-stone-400 leading-none">
                    {footerContent.tagline}
                  </span>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mt-3">
                Affordable, well-maintained residential rental spaces for boys.
                Clean rooms, shared facilities, and a peaceful living environment.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-widest mb-5">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-teal-400 transition-colors duration-200 inline-flex items-center gap-1.5 group w-fit"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-widest mb-5">
                Contact
              </h3>
              <div className="space-y-3">
                {/* Location */}
                <div className="flex items-start gap-2.5 text-stone-400">
                  <MapPin className="w-4 h-4 text-stone-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{contactInfo.address}</span>
                </div>

                {/* Phone numbers */}
                {contactInfo.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:+91${phone}`}
                    className="flex items-center gap-2.5 text-stone-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 text-stone-500 flex-shrink-0" />
                    <span className="text-sm">+91 {formatPhone(phone)}</span>
                  </a>
                ))}

                {/* Directions link */}
                <a
                  href={contactInfo.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-teal-500 hover:text-teal-400 transition-colors duration-200 mt-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Admin link — subtle */}
              <div className="mt-6 pt-4 border-t border-stone-800">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-500 hover:text-stone-300 bg-stone-900 hover:bg-stone-800 rounded-lg transition-all duration-200 border border-stone-800 hover:border-stone-700"
                  title="Owner Admin Portal"
                >
                  <Lock className="w-3 h-3" />
                  <span>Owner Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-stone-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <p className="text-xs text-stone-500">
                © {year} {footerContent.text}. All rights reserved.
              </p>
              <p className="text-xs text-stone-600">
                Personal residential rental property listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
