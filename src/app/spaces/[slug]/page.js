import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import PriceDisplay from "@/components/PriceDisplay";
import FacilitiesList from "@/components/FacilitiesList";
import HouseRules from "@/components/HouseRules";
import ChargesSection from "@/components/ChargesSection";
import {
  rentalSpaces,
  facilities,
  houseRules,
  charges,
  propertyInfo,
} from "@/data/propertyData";
import { getSpaceBySlug, isSpaceAvailable } from "@/lib/helpers";

/**
 * Generate static params for all space pages at build time.
 * This is required for static export — every page must be known at build time.
 */
export function generateStaticParams() {
  return rentalSpaces.map((space) => ({
    slug: space.slug,
  }));
}

/**
 * Generate metadata for each space page.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const space = getSpaceBySlug(rentalSpaces, slug);

  if (!space) {
    return {
      title: "Space Not Found",
    };
  }

  return {
    title: `${space.name} — ${propertyInfo.name}`,
    description: `${space.description} View photos, prices, and availability at ${propertyInfo.name}.`,
    openGraph: {
      title: `${space.name} — ${propertyInfo.name}`,
      description: space.description,
      images: space.images?.[0] ? [{ url: space.images[0] }] : [],
    },
  };
}

/**
 * SpaceDetailPage — Individual page for each rental space.
 * Shows gallery, pricing, availability, facilities, rules, and charges.
 */
export default async function SpaceDetailPage({ params }) {
  const { slug } = await params;
  const space = getSpaceBySlug(rentalSpaces, slug);

  if (!space) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
        {/* Back navigation */}
        <Link
          href="/#spaces"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all spaces
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column: Gallery */}
          <div>
            <PhotoGallery images={space.images} spaceName={space.name} />

            {/* Video player (if available) */}
            {space.video && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Video Tour
                </h3>
                <video
                  controls
                  preload="metadata"
                  className="w-full rounded-2xl bg-gray-50"
                  poster={space.images?.[0] || undefined}
                >
                  <source src={space.video} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            )}
          </div>

          {/* Right column: Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <AvailabilityBadge status={space.availability} size="large" />
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {space.type === "room" ? "Room" : "Utility Space"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
                {space.name}
              </h1>
              <p className="text-gray-500 mt-2 leading-relaxed">
                {space.description}
              </p>
            </div>

            {/* Unavailable notice */}
            {!isSpaceAvailable(space) && (
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong className="text-amber-900 block font-semibold mb-0.5">Currently Unavailable / Occupied</strong>
                  This space is not available for rent at this time. Please check
                  back later for updates.
                </p>
              </div>
            )}

            {/* Pricing */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                Monthly Pricing
              </h3>
              <PriceDisplay
                pricing={space.pricing}
                type={space.type}
                variant="detail"
              />
            </div>

            {/* Charges */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                Additional Charges & Electricity
              </h3>
              <ChargesSection charges={charges} compact />
            </div>

            {/* House Rules */}
            <div>
              <HouseRules
                globalRules={houseRules}
                spaceRules={space.rules}
                compact
              />
            </div>

            {/* Terms link */}
            <div className="pt-4 border-t border-stone-200/60">
              <Link
                href="/terms"
                className="inline-flex items-center text-sm text-teal-700 hover:text-teal-800 font-semibold transition-colors group"
              >
                <span>View full Terms & Conditions</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Facilities section */}
        <div className="mt-16">
          <FacilitiesList facilities={facilities} variant="compact" />
        </div>
      </main>
      <Footer />
    </>
  );
}
