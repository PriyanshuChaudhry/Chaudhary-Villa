"use client";

import Link from "next/link";
import { ImageOff } from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";
import { getDisplayPrice } from "@/lib/helpers";

/**
 * SpaceCard — A card representing a single rental space in the listing grid.
 * Shows cover photo, name, availability, price, and description.
 */
export default function SpaceCard({ space }) {
  const { slug, name, description, availability, images, type } = space;
  const coverImage = images && images.length > 0 ? images[0] : null;

  return (
    <Link
      href={`/spaces/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
      id={`space-card-${slug}`}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${name} cover photo`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback placeholder (shown when no image or image fails to load) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50 ${
            coverImage ? "hidden" : "flex"
          }`}
          style={coverImage ? { display: "none" } : {}}
        >
          <ImageOff className="w-10 h-10 mb-2 opacity-50" />
          <p className="text-xs">No photo yet</p>
        </div>

        {/* Availability badge overlay */}
        <div className="absolute top-3 left-3">
          <AvailabilityBadge status={availability} size="small" />
        </div>

        {/* Type badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-600 rounded-full">
            {type === "room" ? "Room" : type === "utility" ? "Utility" : type}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-charcoal mb-1 group-hover:text-teal-700 transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>

        {/* Price */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-teal-700 font-semibold text-base">
            {getDisplayPrice(space)}
          </p>
        </div>

        {/* Unavailable message */}
        {availability === "unavailable" && (
          <p className="text-gray-400 text-xs mt-2 italic">
            Currently unavailable for rent
          </p>
        )}

        {/* View details hint */}
        <div className="mt-3 flex items-center text-sm text-teal-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View details →
        </div>
      </div>
    </Link>
  );
}
