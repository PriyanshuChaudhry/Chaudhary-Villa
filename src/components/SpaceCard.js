"use client";

import Link from "next/link";
import { ImageOff, ArrowRight } from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";
import { getDisplayPrice, isSpaceAvailable } from "@/lib/helpers";

/**
 * SpaceCard — A card representing a single rental space in the listing grid.
 * Styled with warm residential aesthetics, clear pricing, and mobile-optimized buttons.
 */
export default function SpaceCard({ space }) {
  const { slug, name, description, availability, images, type } = space;
  const isAvailable = isSpaceAvailable(space);
  const coverImage = images && images.length > 0 ? images[0] : null;

  return (
    <Link
      href={`/spaces/${slug}`}
      className={`group block bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
        isAvailable
          ? "border-emerald-300/80 shadow-md hover:shadow-xl ring-1 ring-emerald-500/20"
          : "border-stone-200/80 shadow-sm hover:shadow-md opacity-90"
      }`}
      id={`space-card-${slug}`}
    >
      {/* Cover image container */}
      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${name} photo`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              const fallback = e.target.nextElementSibling;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}

        {/* Fallback placeholder */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-stone-400 bg-stone-100 ${
            coverImage ? "hidden" : "flex"
          }`}
        >
          <ImageOff className="w-8 h-8 mb-1.5 opacity-40 text-stone-400" />
          <p className="text-xs text-stone-400">Photo coming soon</p>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3">
          <AvailabilityBadge status={availability} size="small" />
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 text-[11px] font-semibold bg-white/95 backdrop-blur-md text-stone-700 rounded-full shadow-sm border border-stone-200/60 uppercase tracking-wider">
            {type === "room" ? "Room" : "Shared Utility"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-1.5 group-hover:text-teal-700 transition-colors">
            {name}
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3.5 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">
                Rental Price
              </span>
              <p className="text-teal-800 font-extrabold text-base sm:text-lg">
                {getDisplayPrice(space)}
              </p>
            </div>
          </div>

          {/* Action indicator */}
          {isAvailable ? (
            <div className="w-full py-2.5 px-3 bg-teal-50 hover:bg-teal-100/80 text-teal-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-teal-200/60">
              <span>View Details & Photos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          ) : (
            <div className="w-full py-2 px-3 bg-stone-100 text-stone-500 text-xs font-medium rounded-xl text-center">
              Currently Occupied
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
