
"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import { Home } from "lucide-react";

/**
 * FacilitiesList — Displays property facilities/amenities from config.
 */
export default function FacilitiesList({ facilities, variant = "full" }) {
  if (!facilities || facilities.length === 0) {
    return null;
  }

  return (
    <section id="facilities" className="scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">
        Facilities
      </h2>

      <p className="text-gray-500 text-sm mb-8">
        Shared amenities available to residents
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {facilities.map((facility, index) => (
          <div
            key={facility.name || index}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 border border-teal-100/60 flex items-center justify-center">
              <DynamicIcon
                name={facility.icon || "home"}
                size={20}
                strokeWidth={1.8}
                className="text-teal-700"
                fallback={() => (
                  <Home
                    size={20}
                    strokeWidth={1.8}
                    className="text-teal-700"
                  />
                )}
              />
            </div>

            <div>
              <h3 className="font-bold text-charcoal text-base">
                {facility.name}
              </h3>

              {variant === "full" && facility.description && (
                <p className="text-stone-500 text-sm mt-1 leading-relaxed">
                  {facility.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
