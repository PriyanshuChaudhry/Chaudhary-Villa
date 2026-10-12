"use client";

import { AlertTriangle } from "lucide-react";

/**
 * HouseRules — Displays house rules as a clean readable list.
 * Supports both global and space-specific rules.
 */
export default function HouseRules({
  globalRules = [],
  spaceRules = [],
  compact = false,
}) {
  const allRules = [...globalRules, ...spaceRules];

  if (allRules.length === 0) return null;

  return (
    <section id="rules" className="scroll-mt-24">
      {!compact && (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">
            House Rules
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Please follow these rules during your stay
          </p>
        </>
      )}

      <div className="bg-amber-50/60 rounded-2xl border border-amber-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-amber-800 text-sm">
            {compact ? "House Rules" : "Important Guidelines"}
          </h3>
        </div>
        <ul className="space-y-3">
          {allRules.map((rule, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700 text-sm leading-relaxed">
                {rule}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
