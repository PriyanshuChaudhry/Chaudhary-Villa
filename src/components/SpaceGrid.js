"use client";

import SpaceCard from "./SpaceCard";
import {
  areAllSpacesUnavailable,
  areAllRoomsUnavailable,
  getRooms,
} from "@/lib/helpers";

/**
 * SpaceGrid — Responsive grid of rental space cards.
 * Handles empty states per SPEC.md requirements.
 */
export default function SpaceGrid({ spaces }) {
  const allSpacesUnavailable = areAllSpacesUnavailable(spaces);
  const allRoomsUnavailable = areAllRoomsUnavailable(spaces);
  const rooms = getRooms(spaces);

  return (
    <section id="spaces" className="scroll-mt-24">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">
            Rental Spaces
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Browse our available rooms and shared spaces
          </p>
        </div>
        <span className="text-sm text-gray-400">
          {spaces.filter((s) => s.availability === "available").length} of{" "}
          {spaces.length} available
        </span>
      </div>

      {/* Empty state: ALL spaces unavailable */}
      {allSpacesUnavailable && (
        <div className="text-center py-16 px-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="text-4xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            No Rental Spaces Currently Available
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Sorry, no rental spaces are currently available. You can check back
            later.
          </p>
        </div>
      )}

      {/* Empty state: All ROOMS unavailable (but some utilities may be available) */}
      {!allSpacesUnavailable && allRoomsUnavailable && rooms.length > 0 && (
        <div className="text-center py-10 px-6 bg-amber-50/50 rounded-2xl border border-amber-100 mb-8">
          <p className="text-amber-700 font-medium">
            Sorry, no rooms are currently available. You can check back later.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Other spaces may still be available below.
          </p>
        </div>
      )}

      {/* Space cards grid */}
      {!allSpacesUnavailable && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}

      {/* Show all cards even when all unavailable (for reference) */}
      {allSpacesUnavailable && (
        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-4">
            Our rental spaces for reference:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
            {spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
