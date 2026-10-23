"use client";

import { MapPin, Phone, Navigation, ExternalLink } from "lucide-react";
import { contactInfo, propertyInfo } from "@/data/propertyData";

/**
 * ContactSection — Embedded Google Map, phone numbers, and directions.
 * Designed for QR-code visitors who need to find the property quickly.
 */
export default function ContactSection() {
  const formatPhone = (num) =>
    `${num.slice(0, 4)} ${num.slice(4, 7)} ${num.slice(7)}`;

  return (
    <section id="contact" className="scroll-mt-20">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
          Contact & Location
        </h2>
        <p className="text-stone-500 mt-1 text-sm">
          Find us on the map or call directly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
        {/* Map — takes 3 of 5 columns on desktop */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm bg-stone-100">
          <iframe
            src={contactInfo.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "320px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`${propertyInfo.name} location on Google Maps`}
            className="w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]"
          />
        </div>

        {/* Contact Info Card — takes 2 of 5 columns */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Address Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-bold text-charcoal text-base">
                Visit Us
              </h3>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-5">
              {contactInfo.address}
            </p>
            <a
              href={contactInfo.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 w-full justify-center px-5 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 text-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Phone Numbers Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-bold text-charcoal text-base">
                Call Us
              </h3>
            </div>
            <div className="space-y-3">
              {contactInfo.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:+91${phone}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 hover:bg-teal-50 border border-stone-200/60 hover:border-teal-200/80 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-stone-200/60 group-hover:border-teal-200/80 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-stone-500 group-hover:text-teal-600 transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-stone-700 group-hover:text-teal-800 transition-colors tracking-wide">
                    +91 {formatPhone(phone)}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-3">
              Tap to call directly from your phone
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
