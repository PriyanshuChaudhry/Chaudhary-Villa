/**
 * ============================================================================
 * CHAUDHARY VILLA — CENTRALIZED PROPERTY CONFIGURATION
 * ============================================================================
 *
 * This is the SINGLE SOURCE OF TRUTH for all property information displayed
 * on the website. When you need to change prices, availability, photos,
 * facilities, rules, or terms — edit THIS file only.
 *
 * After editing, push to GitHub and Vercel will automatically redeploy.
 *
 * HOW TO EDIT:
 * 1. Open this file in any text editor (VS Code, Notepad, etc.)
 * 2. Find the section you want to change (use Ctrl+F to search)
 * 3. Change the value between the quotes or after the colon
 * 4. Save the file
 * 5. Push to GitHub → Vercel auto-deploys
 *
 * IMPORTANT RULES:
 * - Keep all text inside quotes: "like this"
 * - Don't remove commas at the end of lines
 * - Availability must be exactly: "available" or "unavailable"
 * - Prices must be numbers without commas: 5000 (not 5,000)
 * - Image paths start with /images/ and video paths with /videos/
 * ============================================================================
 */

// ─────────────────────────────────────────────
// PROPERTY INFORMATION
// ─────────────────────────────────────────────
export const propertyInfo = {
  // The name displayed in the header and page titles
  name: "Chaudhary Villa",

  // Short tagline shown below the name in the header
  tagline: "Residential Rental Spaces",

  // Locality shown on the website (do NOT put full address for privacy)
  locality: "India",

  // SEO description for search engines
  seoDescription:
    "Explore rental spaces at Chaudhary Villa. View photos, check availability, prices, facilities, and house rules.",

  // Open Graph image for social media sharing (place image in public/images/)
  ogImage: "/images/og-image.jpg",
};

// ─────────────────────────────────────────────
// HOMEPAGE HERO SECTION
// ─────────────────────────────────────────────
export const heroContent = {
  // Main headline on the homepage
  headline: "Find Your Space. Feel at Home.",

  // Supporting text below the headline
  subtitle:
    "Explore our rental spaces, view photos, check prices, and learn about the facilities and house rules.",

  // Text on the button that scrolls to listings
  ctaText: "View Available Spaces",
};

// ─────────────────────────────────────────────
// RENTAL SPACES
// ─────────────────────────────────────────────
// Each space has: id, slug, name, type, description, availability,
// pricing, images, videos, and optional space-specific rules.
//
// TO CHANGE AVAILABILITY:
//   Find the space below and change status to "available" or "unavailable"
//
// TO CHANGE PRICES:
//   Find the space below and change the number next to "amount"
//
// TO ADD PHOTOS:
//   1. Place your photo in the public/images/ folder
//   2. Add the path to the images array below, e.g. "/images/front-room-3.jpg"
//
// TO ADD A VIDEO:
//   1. Place your MP4 video in the public/videos/ folder
//   2. Set the video path below, e.g. "/videos/front-room-tour.mp4"
//
export const rentalSpaces = [
  {
    id: "front-balcony-room",
    slug: "front-balcony-room",
    name: "Front Balcony Room",
    type: "room", // "room" or "utility" (kitchen/lobby)
    description:
      "A well-ventilated room with a front-facing balcony, offering natural light and a pleasant view.",

    // ── Availability ──
    // Change to "available" when this room is vacant
    // Change to "unavailable" when this room is occupied
    availability: "unavailable",

    // ── Pricing ──
    // Rooms support single and double occupancy pricing
    pricing: {
      singleOccupancy: { label: "Single Occupancy", amount: 5000 },
      doubleOccupancy: { label: "Double Occupancy", amount: 6000 },
    },

    // ── Photos ──
    // Add your actual property photos here
    // Place image files in the public/images/ folder
    images: [
      "/images/front-room-1.svg",
      "/images/front-room-2.svg",
    ],

    // ── Video (optional) ──
    // Set to null if no video is available
    // Place MP4 files in the public/videos/ folder
    video: null,

    // ── Space-specific rules (optional) ──
    // These appear in addition to the global house rules
    rules: [],
  },

  {
    id: "middle-room",
    slug: "middle-room",
    name: "Middle Room",
    type: "room",
    description:
      "A centrally located room within the house, providing a quiet and private living space.",
    availability: "available",
    pricing: {
      singleOccupancy: { label: "Single Occupancy", amount: 5000 },
      doubleOccupancy: { label: "Double Occupancy", amount: 6000 },
    },
    images: [
      "/images/middle-room-1.svg",
      "/images/middle-room-2.svg",
    ],
    video: null,
    rules: [],
  },

  {
    id: "back-room",
    slug: "back-room",
    name: "Back Room",
    type: "room",
    description:
      "A room located at the back of the house, offering a quieter environment away from the street.",
    availability: "unavailable",
    pricing: {
      singleOccupancy: { label: "Single Occupancy", amount: 5000 },
      doubleOccupancy: { label: "Double Occupancy", amount: 6000 },
    },
    images: [
      "/images/back-room-1.svg",
    ],
    video: null,
    rules: [],
  },

  {
    id: "kitchen",
    slug: "kitchen",
    name: "Kitchen",
    type: "utility",
    description:
      "A shared kitchen space available for rent, suitable for cooking and meal preparation.",
    availability: "unavailable",
    pricing: {
      monthly: { label: "Monthly Rent", amount: 2500 },
    },
    images: [
      "/images/kitchen-1.svg",
    ],
    video: null,
    rules: [],
  },

  {
    id: "lobby",
    slug: "lobby",
    name: "Lobby",
    type: "utility",
    description:
      "A common lobby area available for rent, providing additional shared space.",
    availability: "available",
    pricing: {
      monthly: { label: "Monthly Rent", amount: 2000 },
    },
    images: [
      "/images/lobby-1.svg",
    ],
    video: null,
    rules: [],
  },
];

// ─────────────────────────────────────────────
// PROPERTY FACILITIES
// ─────────────────────────────────────────────
// These are shared amenities available to all residents.
// Add or remove items as needed. Each item needs a name and description.
//
// DO NOT add facilities that don't actually exist at the property.
//
export const facilities = [
  {
    name: "Refrigerator",
    description: "A refrigerator shared by residents for storing food and beverages.",
    icon: "refrigerator", // Icon name from Lucide icons
  },
  {
    name: "Geyser",
    description: "A geyser (water heater) is available in the bathroom for hot water.",
    icon: "flame", // Icon name from Lucide icons
  },
];

// ─────────────────────────────────────────────
// HOUSE RULES
// ─────────────────────────────────────────────
// Global rules that apply to ALL rental spaces.
// Add new rules as strings in this array.
//
export const houseRules = [
  "Switch off lights and electrical appliances when they are not in use.",
];

// ─────────────────────────────────────────────
// CHARGES & BILLING
// ─────────────────────────────────────────────
// Information about additional charges beyond the monthly rent.
// Set amount to null if the charge has not been decided yet —
// it will display as "To be confirmed" on the website.
//
export const charges = {
  securityDeposit: {
    label: "Security Deposit",
    amount: null, // Set a number when decided, e.g. 10000
    description: "To be confirmed by the property owner.",
  },
  electricity: {
    label: "Electricity Charges",
    amount: null, // Paid separately — no fixed amount
    description:
      "Electricity is paid separately by tenants. Each room has a separate electricity meter. Charges are based on actual consumption as per the electricity board rates.",
  },
  cleaning: {
    label: "Bathroom Cleaning",
    amount: null, // Set a number when decided
    description:
      "Bathroom cleaning charges apply once every two months. The exact amount is to be confirmed.",
    frequency: "Once every two months",
  },
  otherCharges: [
    // Add additional charges here if needed, for example:
    // { label: "Water Charges", amount: 200, description: "Monthly water charge" },
  ],
};

// ─────────────────────────────────────────────
// TERMS AND CONDITIONS
// ─────────────────────────────────────────────
// Each section has a title and an array of terms.
// The owner can edit, add, or remove terms as needed.
//
// NOTE: These are sample/placeholder terms. The owner should review
// and update them to reflect actual agreements before publishing.
//
export const termsAndConditions = [
  {
    title: "Occupancy",
    terms: [
      "The rental space is to be used for residential purposes only.",
      "Subletting or transferring the tenancy is not permitted without written consent from the owner.",
      "The maximum number of occupants must match the agreed occupancy type (single or double).",
    ],
  },
  {
    title: "Security Deposit",
    terms: [
      "A security deposit is required before moving in. The amount will be confirmed by the owner.",
      "The deposit is refundable at the time of vacating, subject to deductions for damages or unpaid dues.",
    ],
  },
  {
    title: "Electricity Billing",
    terms: [
      "Each room has a separate electricity meter.",
      "Tenants are responsible for paying their own electricity bills based on actual consumption.",
      "Electricity charges are separate from the monthly rent.",
    ],
  },
  {
    title: "Cleaning Charges",
    terms: [
      "Bathroom cleaning charges apply once every two months.",
      "The exact cleaning charge amount will be confirmed by the owner.",
    ],
  },
  {
    title: "Maintenance & Responsibilities",
    terms: [
      "Tenants must maintain the rented space in a clean and orderly condition.",
      "Any damage to the property beyond normal wear and tear will be charged to the tenant.",
      "Tenants must report any maintenance issues to the owner promptly.",
    ],
  },
  {
    title: "Guest Policy",
    terms: [
      "Overnight guests require prior intimation to the owner.",
      "The tenant is responsible for the behaviour of their guests.",
    ],
  },
  {
    title: "Notice Period",
    terms: [
      "A notice period is required before vacating. The duration will be confirmed by the owner.",
      "Failure to provide adequate notice may result in forfeiture of the security deposit.",
    ],
  },
  {
    title: "General Conditions",
    terms: [
      "The owner reserves the right to revise rental terms with reasonable notice.",
      "Any disputes shall be resolved amicably between the owner and tenant.",
      "These terms are subject to change. Tenants will be notified of any updates.",
    ],
  },
];

// ─────────────────────────────────────────────
// FOOTER CONTENT
// ─────────────────────────────────────────────
export const footerContent = {
  text: "Chaudhary Villa",
  // Set your locality — don't publish your full address for privacy
  location: "India",
};

// ─────────────────────────────────────────────
// NAVIGATION LINKS
// ─────────────────────────────────────────────
// These are the main navigation links in the header.
// You can add or remove links as needed.
export const navLinks = [
  { label: "Spaces", href: "/#spaces" },
  { label: "Facilities", href: "/#facilities" },
  { label: "House Rules", href: "/#rules" },
  { label: "Terms", href: "/terms" },
];
