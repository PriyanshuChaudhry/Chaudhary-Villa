"use client";

import { IndianRupee, Zap, SprayCan, CircleDollarSign } from "lucide-react";
import { formatPrice } from "@/lib/helpers";

/**
 * ChargesSection — Displays security deposit, electricity, cleaning,
 * and other applicable charges from the centralized config.
 */
export default function ChargesSection({ charges, compact = false }) {
  if (!charges) return null;

  const chargeItems = [
    {
      ...charges.securityDeposit,
      icon: CircleDollarSign,
      color: "blue",
    },
    {
      ...charges.electricity,
      icon: Zap,
      color: "yellow",
    },
    {
      ...charges.cleaning,
      icon: SprayCan,
      color: "purple",
      extra: charges.cleaning?.frequency
        ? `Frequency: ${charges.cleaning.frequency}`
        : null,
    },
    ...(charges.otherCharges || []).map((c) => ({
      ...c,
      icon: IndianRupee,
      color: "gray",
    })),
  ];

  const colorMap = {
    blue: { bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      ring: "ring-yellow-100",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      ring: "ring-purple-100",
    },
    gray: { bg: "bg-gray-50", text: "text-gray-600", ring: "ring-gray-100" },
  };

  return (
    <section id="charges" className="scroll-mt-24">
      {!compact && (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">
            Charges & Billing
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Additional charges beyond the monthly rent
          </p>
        </>
      )}

      <div className="space-y-4">
        {chargeItems.map((item, index) => {
          if (!item.label) return null;
          const colors = colorMap[item.color] || colorMap.gray;
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <div
                className={`flex-shrink-0 w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-charcoal text-sm">
                    {item.label}
                  </h3>
                  <span className="text-sm font-semibold text-charcoal">
                    {formatPrice(item.amount)}
                  </span>
                </div>
                {item.description && (
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.extra && (
                  <p className="text-gray-400 text-xs mt-1">{item.extra}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
