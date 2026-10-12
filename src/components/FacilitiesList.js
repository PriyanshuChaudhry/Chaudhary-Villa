"use client";

import { Refrigerator, Flame, Wifi, Car, Wind, Droplets, Zap, Home } from "lucide-react";

/**
 * Map of icon names to Lucide components.
 * Add more icons here as needed.
 */
const iconMap = {
  refrigerator: Refrigerator,
  flame: Flame,
  wifi: Wifi,
  car: Car,
  wind: Wind,
  droplets: Droplets,
  zap: Zap,
  home: Home,
};

/**
 * FacilitiesList — Displays property facilities/amenities from config.
 * Each facility shows an icon, name, and description.
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
        {facilities.map((facility, index) => {
          const IconComponent = iconMap[facility.icon] || Home;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 border border-teal-100/60 flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-teal-700" />
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
          );
        })}
      </div>
    </section>
  );
}
