"use client";

import { ArrowDown, MapPin } from "lucide-react";
import { heroContent, propertyInfo } from "@/data/propertyData";

/**
 * Hero — Premium top section with gradient text, animated badge, and polished CTA.
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
    <section className="relative py-12 sm:py-20 overflow-hidden">
      {/* Premium background with layered gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/60 via-white to-stone-50/40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-stone-100/50 via-transparent to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center px-4">
        {/* Animated badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-sm text-teal-700 rounded-full text-sm font-medium mb-8 border border-teal-200/60 shadow-sm hero-badge-glow">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
          </span>
          <span>{propertyInfo.tagline}</span>
        </div>

        {/* Headline with gradient accent */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
          <span className="text-charcoal">{heroContent.headline.split(".")[0]}.</span>
          {heroContent.headline.split(".").length > 1 && (
            <>
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                {heroContent.headline.split(".").slice(1).join(".").trim()}
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-stone-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {heroContent.subtitle}
        </p>

        {/* Location tag */}
        <div className="mt-5 inline-flex items-center gap-1.5 text-stone-400 text-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span>{propertyInfo.locality}</span>
        </div>

        {/* CTA Button with hover glow */}
        <div className="mt-8">
          <button
            onClick={scrollToSpaces}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 text-sm"
            aria-label="Scroll to available rental spaces"
          >
            {heroContent.ctaText}
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
