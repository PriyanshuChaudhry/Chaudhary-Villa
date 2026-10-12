"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ImageOff,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";
import { getDisplayPrice, isSpaceAvailable } from "@/lib/helpers";

/**
 * SpaceCard — A card representing a single rental space in the listing grid.
 * Styled with warm residential aesthetics, clear pricing, and MakeMyTrip-style
 * multi-photo cycling with left/right arrows, touch swipe, and pagination dots.
 */
export default function SpaceCard({ space }) {
  const { slug, name, description, availability, images = [], type } = space;
  const isAvailable = isSpaceAvailable(space);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasMultiplePhotos = images && images.length > 1;
  const activeImage = images && images.length > 0 ? images[currentImgIndex] : null;

  const handleNextPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!hasMultiplePhotos) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      e.preventDefault();
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    } else if (diff < -40) {
      e.preventDefault();
      setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

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
      {/* Cover image container with MakeMyTrip style photo carousel */}
      <div
        className="relative aspect-[16/10] bg-stone-100 overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${name} photo ${currentImgIndex + 1}`}
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
            activeImage ? "hidden" : "flex"
          }`}
        >
          <ImageOff className="w-8 h-8 mb-1.5 opacity-40 text-stone-400" />
          <p className="text-xs text-stone-400">Photo coming soon</p>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10">
          <AvailabilityBadge status={availability} size="small" />
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 text-[11px] font-semibold bg-white/95 backdrop-blur-md text-stone-700 rounded-full shadow-sm border border-stone-200/60 uppercase tracking-wider">
            {type === "room" ? "Room" : "Shared Utility"}
          </span>
        </div>

        {/* Carousel Floating Controls (MakeMyTrip style) */}
        {hasMultiplePhotos && (
          <>
            {/* Left Chevron */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 active:scale-95 border border-stone-200/60"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Chevron */}
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 active:scale-95 border border-stone-200/60"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Photo Counter Pill (bottom right) */}
            <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 border border-white/10 shadow-sm">
              <Camera className="w-3 h-3 text-white/90" />
              <span>
                {currentImgIndex + 1}/{images.length}
              </span>
            </div>

            {/* Pagination Dots (bottom center) */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-md">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-full transition-all duration-200 ${
                    idx === currentImgIndex
                      ? "w-3.5 h-1 bg-white"
                      : "w-1 h-1 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
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
