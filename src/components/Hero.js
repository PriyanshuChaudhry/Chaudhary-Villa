"use client";

import { ArrowDown } from "lucide-react";
import { heroContent } from "@/data/propertyData";

/**
 * Hero — Top section of homepage with headline, subtitle, and CTA button.
 * Text is editable through the centralized property data file.
 */
export default function Hero() {
  const scrollToSpaces = () => {
    const el = document.getElementById("spaces");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-8 sm:py-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/40 via-white to-white" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-6 border border-teal-100">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          Residential Rental Spaces
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight tracking-tight">
          {heroContent.headline}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {heroContent.subtitle}
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={scrollToSpaces}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm"
            aria-label="Scroll to available rental spaces"
          >
            {heroContent.ctaText}
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
