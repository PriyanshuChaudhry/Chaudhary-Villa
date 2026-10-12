"use client";

import SpaceCard from "./SpaceCard";
import { useLiveAvailability } from "@/lib/useLiveAvailability";

/**
 * SpaceGrid — Responsive grid of rental space cards.
 * Displays live room availability synced with the Owner Admin panel.
 */
export default function SpaceGrid({ spaces: initialSpaces }) {
  const { spaces } = useLiveAvailability(initialSpaces);
  const availableSpaces = spaces.filter((s) => s.availability === "available");
  const unavailableSpaces = spaces.filter((s) => s.availability !== "available");
  const hasAvailable = availableSpaces.length > 0;

  return (
    <section id="spaces" className="scroll-mt-24">
      {/* If ALL spaces are unavailable, show the clean House Full banner */}
      {!hasAvailable ? (
        <div className="text-center py-12 px-6 bg-white rounded-3xl border border-stone-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mx-auto mb-4 text-3xl">
            🏠
          </div>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Current Status: House Full
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-2">
            No Rooms Currently Available
          </h3>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            All rooms at Chaudhary Villa are currently occupied. Thank you for your interest! Please check back later when a vacancy opens up.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-charcoal">
                Available Spaces
              </h2>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                Vacant and ready for immediate occupancy
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {availableSpaces.length} Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>

          {unavailableSpaces.length > 0 && (
            <p className="text-center text-xs text-stone-400 mt-6 italic">
              ({unavailableSpaces.length} other {unavailableSpaces.length === 1 ? "space is" : "spaces are"} currently occupied)
            </p>
          )}
        </>
      )}
    </section>
  );
}
