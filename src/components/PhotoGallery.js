"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import Lightbox from "./Lightbox";

/**
 * PhotoGallery — Displays property photographs with a main image and thumbnails.
 * Opens a full-screen lightbox when an image is clicked.
 * Handles missing images gracefully with a clean placeholder.
 */
export default function PhotoGallery({ images = [], spaceName = "Space" }) {
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Filter out images that have errored
  const validImages = images.filter((_, index) => !imageErrors[index]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-400 border border-gray-100">
        <ImageOff className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm font-medium">No photos available yet</p>
        <p className="text-xs mt-1 opacity-70">Photos will appear here once added</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 cursor-pointer group"
        onClick={() => {
          if (validImages.length > 0) setLightboxOpen(true);
        }}
      >
        {imageErrors[mainIndex] ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <ImageOff className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">Photo unavailable</p>
          </div>
        ) : (
          <>
            <img
              src={images[mainIndex]}
              alt={`${spaceName} - Photo ${mainIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              onError={() => handleImageError(mainIndex)}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-charcoal px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                View full size
              </span>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainIndex(index)}
              className={`
                flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden 
                transition-all duration-200
                ${
                  index === mainIndex
                    ? "ring-2 ring-teal-500 ring-offset-2 opacity-100"
                    : "opacity-60 hover:opacity-90"
                }
              `}
              aria-label={`View photo ${index + 1}`}
            >
              {imageErrors[index] ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <ImageOff className="w-4 h-4 text-gray-400" />
                </div>
              ) : (
                <img
                  src={img}
                  alt={`${spaceName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={() => handleImageError(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
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
