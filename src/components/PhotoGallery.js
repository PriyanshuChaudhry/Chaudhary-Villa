"use client";

import { useState, useRef, useCallback } from "react";
import {
  ImageOff,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
} from "lucide-react";
import Lightbox from "./Lightbox";

/**
 * PhotoGallery — Professional MakeMyTrip / Airbnb style gallery.
 * Features:
 * - Touch swipe left/right for mobile users
 * - Floating left & right navigation arrows
 * - Floating "1 / N" photo counter badge
 * - Interactive pagination dots
 * - Thumbnail strip with active ring
 * - Click to open full-screen lightbox
 * - Graceful placeholder for missing/errored images
 */
export default function PhotoGallery({ images = [], spaceName = "Space" }) {
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Touch swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const validImages = images.filter((_, index) => !imageErrors[index]);
  const hasMultiple = validImages.length > 1;

  const goNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setMainIndex((prev) => (prev + 1) % validImages.length);
    },
    [validImages.length]
  );

  const goPrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setMainIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    },
    [validImages.length]
  );

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!hasMultiple) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // minimum distance in px to register a swipe

    if (diff > threshold) {
      // Swiped left → Next photo
      goNext();
    } else if (diff < -threshold) {
      // Swiped right → Previous photo
      goPrev();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/10] bg-stone-100 rounded-3xl flex flex-col items-center justify-center text-stone-400 border border-stone-200/80">
        <ImageOff className="w-12 h-12 mb-3 opacity-40 text-stone-400" />
        <p className="text-sm font-semibold text-stone-600">No photos available yet</p>
        <p className="text-xs mt-1 text-stone-400">Photos will appear here once added</p>
      </div>
    );
  }

  const currentImage = validImages[mainIndex] || images[0];

  return (
    <div className="space-y-3.5">
      {/* Main Image Container */}
      <div
        className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-sm cursor-pointer select-none group"
        onClick={() => {
          if (validImages.length > 0) setLightboxOpen(true);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {imageErrors[mainIndex] ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
            <ImageOff className="w-12 h-12 mb-3 opacity-40" />
            <p className="text-sm font-medium">Photo unavailable</p>
          </div>
        ) : (
          <>
            <img
              src={currentImage}
              alt={`${spaceName} - Photo ${mainIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              onError={() => handleImageError(mainIndex)}
              draggable="false"
            />

            {/* Subtle Gradient Overlays for controls readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

            {/* MakeMyTrip / Airbnb Floating Counter Badge */}
            <div className="absolute bottom-3.5 right-3.5 z-10 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 border border-white/10">
                <Camera className="w-3.5 h-3.5 text-white/90" />
                <span>
                  {mainIndex + 1} / {validImages.length}
                </span>
              </div>

              {/* Fullscreen indicator */}
              <div
                className="hidden sm:flex px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium shadow-lg items-center gap-1 border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity"
                title="View Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand</span>
              </div>
            </div>

            {/* Floating Left Arrow (MakeMyTrip style) */}
            {hasMultiple && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-stone-200/60"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 text-stone-800" />
              </button>
            )}

            {/* Floating Right Arrow (MakeMyTrip style) */}
            {hasMultiple && (
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-stone-200/60"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 text-stone-800" />
              </button>
            )}

            {/* Pagination Dots at Bottom Center */}
            {hasMultiple && (
              <div
                className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {validImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMainIndex(idx);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      idx === mainIndex
                        ? "w-5 h-1.5 bg-white"
                        : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {hasMultiple && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
          {validImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setMainIndex(index)}
              className={`
                flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-2xl overflow-hidden 
                transition-all duration-200 border
                ${
                  index === mainIndex
                    ? "ring-2 ring-teal-600 ring-offset-2 ring-offset-warm-white border-transparent shadow-sm opacity-100"
                    : "border-stone-200/80 opacity-60 hover:opacity-100"
                }
              `}
              aria-label={`View photo ${index + 1}`}
            >
              <img
                src={img}
                alt={`${spaceName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {lightboxOpen && validImages.length > 0 && (
        <Lightbox
          images={validImages}
          currentIndex={Math.min(mainIndex, validImages.length - 1)}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
