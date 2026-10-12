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
        <div className="space-y-8">
          {termsAndConditions.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-base font-semibold text-charcoal flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
                    {sectionIndex + 1}
                  </span>
                  {section.title}
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.terms.map((term, termIndex) => (
                    <li key={termIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400 mt-2" />
                      <span className="text-gray-600 text-sm leading-relaxed">
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
        <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100 text-center">
          <p className="text-gray-400 text-xs">
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
