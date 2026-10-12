"use client";

import SpaceCard from "./SpaceCard";
import {
  areAllSpacesUnavailable,
  areAllRoomsUnavailable,
  getRooms,
  isSpaceAvailable,
} from "@/lib/helpers";

/**
 * SpaceGrid — Responsive grid of rental space cards.
 * Implements exact empty-state and listing rules from SPEC.md Section 5.
 * Strictly reads from the centralized propertyData.js without any caching layer.
 */
export default function SpaceGrid({ spaces }) {
  const allSpacesUnavailable = areAllSpacesUnavailable(spaces);
  const allRoomsUnavailable = areAllRoomsUnavailable(spaces);
  const rooms = getRooms(spaces);

  // Filter strictly for available spaces
  const availableSpaces = spaces.filter((s) => isSpaceAvailable(s));

  return (
    <section id="spaces" className="scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            Rental Spaces
          </h2>
          <p className="text-stone-500 mt-1 text-sm">
            {availableSpaces.length > 0
              ? "Browse available residential rooms and shared spaces"
              : "Check current vacancy status at Chaudhary Villa"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {availableSpaces.length > 0 ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {availableSpaces.length} {availableSpaces.length === 1 ? "Space" : "Spaces"} Available Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-semibold rounded-full border border-stone-200">
              0 Spaces Available (House Full)
            </span>
          )}
        </div>
      </div>

      {/* Empty state: ALL 5 spaces are unavailable */}
      {allSpacesUnavailable && (
        <div className="text-center py-12 px-6 bg-white rounded-3xl border border-stone-200/90 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mx-auto mb-4 text-3xl">
            🏠
          </div>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Current Status: Fully Occupied
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-2">
            Sorry, no rental spaces are currently available.
          </h3>
          <p className="text-stone-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            All rooms and spaces at Chaudhary Villa are currently occupied.
            Please check back later when a vacancy opens.
          </p>
        </div>
      )}

      {/* Room-specific empty state: All 3 ROOMS unavailable, but kitchen/lobby available */}
      {!allSpacesUnavailable && allRoomsUnavailable && rooms.length > 0 && (
        <div className="p-4 sm:p-5 bg-amber-50/80 rounded-2xl border border-amber-200 mb-8 flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">ℹ️</span>
          <div>
            <p className="text-amber-900 font-semibold text-sm">
              Sorry, no rooms are currently available. You can check back later.
            </p>
            <p className="text-amber-700 text-xs mt-0.5">
              Shared spaces (such as kitchen or lobby) currently available for rent are listed below.
            </p>
          </div>
        </div>
      )}

      {/* Space Cards Grid: Only renders cards for currently AVAILABLE spaces */}
      {availableSpaces.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {availableSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}
    </section>
  );
}
