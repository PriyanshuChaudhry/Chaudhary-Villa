"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Lock } from "lucide-react";
import { propertyInfo, navLinks } from "@/data/propertyData";

/**
 * Header — Sticky navigation bar with property name, links, and mobile menu.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Property name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Go to homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Home className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-charcoal text-base leading-tight block">
                {propertyInfo.name}
              </span>
              <span className="text-[11px] text-gray-400 leading-none hidden sm:block">
                {propertyInfo.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isAdmin = link.href === "/admin";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isAdmin
                      ? "ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 rounded-lg transition-all duration-200 border border-stone-200/80"
                      : "px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all duration-200"
                  }
                >
                  {isAdmin && <Lock className="w-3 h-3 text-stone-500" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isAdmin = link.href === "/admin";
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      isAdmin
                        ? "inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-stone-700 bg-stone-100/90 hover:bg-stone-100 rounded-xl transition-all duration-200 mt-1"
                        : "px-4 py-3 text-sm font-medium text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-all duration-200"
                    }
                  >
                    {isAdmin && <Lock className="w-3.5 h-3.5 text-stone-500" />}
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
