"use client";

import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { heroContent, propertyInfo } from "@/data/propertyData";

export default function Hero() {
  const scrollToSpaces = () => {
    const element = document.getElementById("spaces");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split the existing headline into two lines.
  const headlineParts = heroContent.headline.split(".");
  const headlineStart = headlineParts[0]?.trim() ?? "";
  const headlineAccent = headlineParts.slice(1).join(".").trim();

  return (
    <section className="relative isolate overflow-hidden bg-white">

      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-teal-50/70 via-white to-stone-50/60">
        <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-teal-100/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-teal-50/50 blur-3xl" />
      </div>

      {/* Background image */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 sm:h-80 lg:inset-0 lg:h-auto">

        <Image
          src="/images/chaudhary-villa-room-background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-center"
        />

        {/* Mobile gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/10 lg:hidden" />

        {/* Desktop gradient for readable text */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.99) 25%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.78) 52%, rgba(255,255,255,0.28) 68%, rgba(255,255,255,0) 82%)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-[58%] lg:text-left">

          {/* Tagline badge */}
          <div className="hero-badge-glow mb-6 inline-flex items-center gap-2.5 rounded-full border border-teal-200/70 bg-white/90 px-4 py-2 text-sm font-medium text-teal-700 shadow-sm backdrop-blur-sm sm:mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
            </span>

            <span>{propertyInfo.tagline}</span>
          </div>

          {/* Main heading */}
          <h1 className="text-[2.55rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            <span className="block text-charcoal">
              {headlineStart}.
            </span>

            {headlineAccent && (
              <span className="block bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                {headlineAccent}
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-600 sm:mt-6 sm:text-lg lg:mx-0">
            {heroContent.subtitle}
          </p>

          {/* Location */}
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-stone-500 sm:mt-5 sm:text-base">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{propertyInfo.locality}</span>
          </div>

          {/* Call to action */}
          
<div className="mt-8 sm:mt-9">
  <button
    type="button"
    onClick={scrollToSpaces}
    aria-label="Scroll to available rental spaces"
    className="
      group relative inline-flex min-h-14 w-full max-w-[290px]
      items-center justify-center gap-3
      overflow-hidden rounded-2xl
      border border-teal-400/30
      bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500
      px-7 py-2
      text-base font-bold tracking-wide text-white
      shadow-[0_8px_25px_rgba(13,148,136,0.28)]
      transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:shadow-[0_14px_32px_rgba(13,148,136,0.38)]
      active:translate-y-0 active:scale-[0.98]
      focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-teal-500
      focus-visible:ring-offset-2
      sm:w-auto sm:min-w-[260px]
    "
  >
    {/* Subtle shine effect */}
    <span
      aria-hidden="true"
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
    />

    <span className="relative whitespace-nowrap">
      {heroContent.ctaText}
    </span>

    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white/30">
      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
    </span>
  </button>
</div>


        </div>
      </div>
    </section>
  );
}