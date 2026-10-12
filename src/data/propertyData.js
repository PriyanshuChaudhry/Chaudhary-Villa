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
 * ============================================================================
 */

export const propertyInfo = {
  "name": "Chaudhary Villa",
  "tagline": "Residential Rental Spaces",
  "locality": "India",
  "seoDescription": "Explore rental spaces at Chaudhary Villa. View photos, check availability, prices, facilities, and house rules.",
  "ogImage": "/images/og-image.jpg"
};

export const heroContent = {
  "headline": "Find Your Space. Feel at Home.",
  "subtitle": "Explore our rental spaces, view photos, check prices, and learn about the facilities and house rules.",
  "ctaText": "View Available Spaces"
};

export const rentalSpaces = [
  {
    "id": "front-balcony-room",
    "slug": "front-balcony-room",
    "name": "Front Balcony Room",
    "type": "room",
    "description": "A well-ventilated room with a front-facing balcony, offering natural light and a pleasant view.",
    "availability": "unavailable",
    "pricing": {
      "singleOccupancy": {
        "label": "Single Occupancy",
        "amount": 5000
      },
      "doubleOccupancy": {
        "label": "Double Occupancy",
        "amount": 6000
      }
    },
    "images": [
      "/images/front-room-1.svg",
      "/images/front-room-2.svg"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "middle-room",
    "slug": "middle-room",
    "name": "Middle Room",
    "type": "room",
    "description": "A centrally located room within the house, providing a quiet and private living space.",
    "availability": "available",
    "pricing": {
      "singleOccupancy": {
        "label": "Single Occupancy",
        "amount": 5000
      },
      "doubleOccupancy": {
        "label": "Double Occupancy",
        "amount": 6000
      }
    },
    "images": [
      "/images/middle-room-1.svg",
      "/images/middle-room-2.svg"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "back-room",
    "slug": "back-room",
    "name": "Back Room",
    "type": "room",
    "description": "A room located at the back of the house, offering a quieter environment away from the street.",
    "availability": "unavailable",
    "pricing": {
      "singleOccupancy": {
        "label": "Single Occupancy",
        "amount": 5000
      },
      "doubleOccupancy": {
        "label": "Double Occupancy",
        "amount": 6000
      }
    },
    "images": [
      "/images/back-room-1.svg"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "kitchen",
    "slug": "kitchen",
    "name": "Kitchen",
    "type": "utility",
    "description": "A shared kitchen space available for rent, suitable for cooking and meal preparation.",
    "availability": "available",
    "pricing": {
      "monthly": {
        "label": "Monthly Rent",
        "amount": 2500
      }
    },
    "images": [
      "/images/kitchen-1.svg"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "lobby",
    "slug": "lobby",
    "name": "Lobby",
    "type": "utility",
    "description": "A common lobby area available for rent, providing additional shared space.",
    "availability": "available",
    "pricing": {
      "monthly": {
        "label": "Monthly Rent",
        "amount": 2000
      }
    },
    "images": [
      "/images/lobby-1.svg"
    ],
    "video": null,
    "rules": []
  }
];

export const facilities = [
  {
    "name": "Refrigerator",
    "description": "A refrigerator shared by residents for storing food and beverages.",
    "icon": "refrigerator"
  },
  {
    "name": "Geyser",
    "description": "A geyser (water heater) is available in the bathroom for hot water.",
    "icon": "flame"
  }
];

export const houseRules = [
  "Switch off lights and electrical appliances when they are not in use."
];

export const charges = {
  "securityDeposit": {
    "label": "Security Deposit",
    "amount": null,
    "description": "To be confirmed by the property owner."
  },
  "electricity": {
    "label": "Electricity Charges",
    "amount": null,
    "description": "Electricity is paid separately by tenants. Each room has a separate electricity meter. Charges are based on actual consumption as per the electricity board rates."
  },
  "cleaning": {
    "label": "Bathroom Cleaning",
    "amount": null,
    "description": "Bathroom cleaning charges apply once every two months. The exact amount is to be confirmed.",
    "frequency": "Once every two months"
  },
  "otherCharges": []
};

export const termsAndConditions = [
  {
    "title": "Occupancy",
    "terms": [
      "The rental space is to be used for residential purposes only.",
      "Subletting or transferring the tenancy is not permitted without written consent from the owner.",
      "The maximum number of occupants must match the agreed occupancy type (single or double)."
    ]
  },
  {
    "title": "Security Deposit",
    "terms": [
      "A security deposit is required before moving in. The amount will be confirmed by the owner.",
      "The deposit is refundable at the time of vacating, subject to deductions for damages or unpaid dues."
    ]
  },
  {
    "title": "Electricity Billing",
    "terms": [
      "Each room has a separate electricity meter.",
      "Tenants are responsible for paying their own electricity bills based on actual consumption.",
      "Electricity charges are separate from the monthly rent."
    ]
  },
  {
    "title": "Cleaning Charges",
    "terms": [
      "Bathroom cleaning charges apply once every two months.",
      "The exact cleaning charge amount will be confirmed by the owner."
    ]
  },
  {
    "title": "Maintenance & Responsibilities",
    "terms": [
      "Tenants must maintain the rented space in a clean and orderly condition.",
      "Any damage to the property beyond normal wear and tear will be charged to the tenant.",
      "Tenants must report any maintenance issues to the owner promptly."
    ]
  },
  {
    "title": "Guest Policy",
    "terms": [
      "Overnight guests require prior intimation to the owner.",
      "The tenant is responsible for the behaviour of their guests."
    ]
  },
  {
    "title": "Notice Period",
    "terms": [
      "A notice period is required before vacating. The duration will be confirmed by the owner.",
      "Failure to provide adequate notice may result in forfeiture of the security deposit."
    ]
  },
  {
    "title": "General Conditions",
    "terms": [
      "The owner reserves the right to revise rental terms with reasonable notice.",
      "Any disputes shall be resolved amicably between the owner and tenant.",
      "These terms are subject to change. Tenants will be notified of any updates."
    ]
  }
];

export const footerContent = {
  "text": "Chaudhary Villa",
  "location": "India"
};

export const navLinks = [
  {
    "label": "Spaces",
    "href": "/#spaces"
  },
  {
    "label": "Facilities",
    "href": "/#facilities"
  },
  {
    "label": "House Rules",
    "href": "/#rules"
  },
  {
    "label": "Terms",
    "href": "/terms"
  },
  {
    "label": "Admin",
    "href": "/admin"
  }
];
