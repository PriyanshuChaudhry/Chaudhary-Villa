import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SpaceGrid from "@/components/SpaceGrid";
import FacilitiesList from "@/components/FacilitiesList";
import HouseRules from "@/components/HouseRules";
import ChargesSection from "@/components/ChargesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import {
  rentalSpaces,
  facilities,
  houseRules,
  charges,
} from "@/data/propertyData";

/**
 * Homepage — The main landing page visitors see after scanning the QR code.
 * Shows hero section, rental space grid, facilities, house rules, charges,
 * and contact & location info.
 * All data comes from the centralized propertyData.js file.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Content sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-12 sm:space-y-16">
          {/* Rental Spaces Grid */}
          <SpaceGrid spaces={rentalSpaces} />

          {/* Facilities */}
          <FacilitiesList facilities={facilities} />

          {/* House Rules */}
          <HouseRules globalRules={houseRules} />

          {/* Charges & Billing */}
          <ChargesSection charges={charges} />

          {/* Contact & Location */}
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
