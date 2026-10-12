/**
 * Helper utilities for formatting and data access.
 */

/**
 * Format a number as Indian Rupees (₹).
 * Example: formatPrice(5000) → "₹5,000"
 */
export function formatPrice(amount) {
  if (amount === null || amount === undefined) {
    return "To be confirmed";
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Find a rental space by its slug.
 * Returns the space object or undefined.
 */
export function getSpaceBySlug(spaces, slug) {
  return spaces.find((space) => space.slug === slug);
}

/**
 * Get all room-type spaces (not kitchen/lobby).
 */
export function getRooms(spaces) {
  return spaces.filter((space) => space.type === "room");
}

/**
 * Get all utility-type spaces (kitchen, lobby).
 */
export function getUtilities(spaces) {
  return spaces.filter((space) => space.type === "utility");
}

/**
 * Check if all rooms are unavailable.
 */
export function areAllRoomsUnavailable(spaces) {
  const rooms = getRooms(spaces);
  return rooms.every((room) => room.availability === "unavailable");
}

/**
 * Check if all spaces (rooms + utilities) are unavailable.
 */
export function areAllSpacesUnavailable(spaces) {
  return spaces.every((space) => space.availability === "unavailable");
}

/**
 * Get the primary display price for a space card.
 * For rooms: shows the range "₹5,000 – ₹6,000"
 * For utilities: shows the single price "₹2,500/month"
 */
export function getDisplayPrice(space) {
  if (space.type === "room") {
    const single = space.pricing.singleOccupancy?.amount;
    const double = space.pricing.doubleOccupancy?.amount;
    if (single !== null && double !== null && single !== double) {
      return `${formatPrice(single)} – ${formatPrice(double)}/month`;
    }
    return `${formatPrice(single || double)}/month`;
  }
  return `${formatPrice(space.pricing.monthly?.amount)}/month`;
}

/**
 * Get all available slugs for static generation.
 */
export function getAllSlugs(spaces) {
  return spaces.map((space) => space.slug);
}
