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
 * Get all budget-type spaces (kitchen, lobby).
 */
export function getBudgetSpaces(spaces) {
  return spaces.filter((space) => space.type === "budget" || space.type === "utility");
}

/**
 * Get all utility-type spaces (kitchen, lobby). Alias for backwards compatibility.
 */
export function getUtilities(spaces) {
  return getBudgetSpaces(spaces);
}

/**
 * Robustly check if a rental space is currently available.
 * Handles "available", "Available", "AVAILABLE", "vacant", etc., safely trimming whitespace.
 */
export function isSpaceAvailable(spaceOrStatus) {
  if (!spaceOrStatus) return false;
  const status =
    typeof spaceOrStatus === "string" ? spaceOrStatus : spaceOrStatus.availability;
  if (!status) return false;
  const normalized = String(status).trim().toLowerCase();
  return normalized === "available" || normalized === "vacant" || normalized === "yes";
}

/**
 * Check if all rooms are unavailable.
 */
export function areAllRoomsUnavailable(spaces) {
  const rooms = getRooms(spaces);
  return rooms.length > 0 && rooms.every((room) => !isSpaceAvailable(room));
}

/**
 * Check if all spaces (rooms + utilities) are unavailable.
 */
export function areAllSpacesUnavailable(spaces) {
  return spaces.length > 0 && spaces.every((space) => !isSpaceAvailable(space));
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
  // Budget or utility type (kitchen, lobby) — single monthly price
  return `${formatPrice(space.pricing.monthly?.amount)}/month`;
}

/**
 * Get all available slugs for static generation.
 */
export function getAllSlugs(spaces) {
  return spaces.map((space) => space.slug);
}
