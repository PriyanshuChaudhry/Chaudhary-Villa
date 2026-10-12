import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { termsAndConditions, propertyInfo } from "@/data/propertyData";

/**
 * Metadata for the Terms page.
 */
export const metadata = {
  title: `Terms & Conditions`,
  description: `Terms and conditions for renting at ${propertyInfo.name}. Read about occupancy, deposits, billing, and responsibilities.`,
};

/**
 * TermsPage — Dedicated page for terms and conditions.
 * All content comes from the centralized property data file.
 */
export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-16">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Please read these terms carefully before renting a space at{" "}
            {propertyInfo.name}. These terms apply to all rental spaces unless
            stated otherwise.
          </p>
          <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-amber-700 text-xs">
              <strong>Note:</strong> Some terms are samples and are subject to
              confirmation by the property owner. Please discuss specific
              conditions directly with the owner before finalizing.
            </p>
          </div>
        </div>

        {/* Terms sections */}
        <div className="space-y-6 sm:space-y-8">
          {termsAndConditions.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 bg-stone-50/90 border-b border-stone-200/60">
                <h2 className="text-base font-bold text-charcoal flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold flex items-center justify-center">
                    {sectionIndex + 1}
                  </span>
                  {section.title}
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3.5">
                  {section.terms.map((term, termIndex) => (
                    <li key={termIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-500 mt-2" />
                      <span className="text-stone-600 text-sm leading-relaxed">
                        {term}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-5 bg-stone-100/70 rounded-2xl border border-stone-200/60 text-center">
          <p className="text-stone-500 text-xs leading-relaxed">
            Last updated: The terms reflect the latest version in the property
            configuration. For questions or clarifications, please contact the
            property owner directly.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
