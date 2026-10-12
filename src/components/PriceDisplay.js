"use client";

import { formatPrice } from "@/lib/helpers";

/**
 * PriceDisplay — Shows pricing information for a rental space.
 * Handles both room (single/double occupancy) and utility (monthly) pricing.
 */
export default function PriceDisplay({ pricing, type, variant = "card" }) {
  if (type === "room") {
    return (
      <div className={variant === "detail" ? "space-y-3" : "space-y-1"}>
        {pricing.singleOccupancy && (
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-gray-500 text-sm">
              {pricing.singleOccupancy.label}
            </span>
            <span
              className={`font-semibold text-charcoal ${
                variant === "detail" ? "text-xl" : "text-lg"
              }`}
            >
              {formatPrice(pricing.singleOccupancy.amount)}
              <span className="text-gray-400 text-sm font-normal">/month</span>
            </span>
          </div>
        )}
        {pricing.doubleOccupancy && (
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-gray-500 text-sm">
              {pricing.doubleOccupancy.label}
            </span>
            <span
              className={`font-semibold text-charcoal ${
                variant === "detail" ? "text-xl" : "text-lg"
              }`}
            >
              {formatPrice(pricing.doubleOccupancy.amount)}
              <span className="text-gray-400 text-sm font-normal">/month</span>
            </span>
          </div>
        )}
      </div>
    );
  }

  // Utility type (kitchen, lobby) — single monthly price
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-gray-500 text-sm">
        {pricing.monthly?.label || "Monthly Rent"}
      </span>
      <span
        className={`font-semibold text-charcoal ${
          variant === "detail" ? "text-xl" : "text-lg"
        }`}
      >
        {formatPrice(pricing.monthly?.amount)}
        <span className="text-gray-400 text-sm font-normal">/month</span>
      </span>
    </div>
  );
}
