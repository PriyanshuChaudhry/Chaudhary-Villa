"use client";

/**
 * AvailabilityBadge — Reusable badge showing "Available" or "Unavailable".
 * Used on listing cards and detail pages throughout the site.
 */
export default function AvailabilityBadge({ status, size = "default" }) {
  const isAvailable = status === "available";

  const sizeClasses = {
    small: "px-2 py-0.5 text-xs",
    default: "px-3 py-1 text-sm",
    large: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${sizeClasses[size] || sizeClasses.default}
        ${
          isAvailable
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
            : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
        }
      `}
      role="status"
      aria-label={isAvailable ? "Available for rent" : "Currently unavailable"}
    >
      <span
        className={`
          inline-block w-2 h-2 rounded-full
          ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}
        `}
      />
      {isAvailable ? "Available" : "Unavailable"}
    </span>
  );
}
