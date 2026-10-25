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
  "tagline": "Home Sweet Home",
  "locality": "Mahanagar, Lucknow, India",
  "seoDescription": "Affordable residential rental spaces at Chaudhary Villa. View photos, check availability, prices, facilities, and house rules.",
  "ogImage": "/images/og-image.jpg"
};

export const heroContent = {
  "headline": "Find Your Space. Feel at Home.",
  "subtitle": "Affordable residential rental spaces for boys. Please check availability, view photos compare prices, and explore facilities & house rules, all in one place.",
  "ctaText": "View Available Spaces"
};

export const rentalSpaces = [
  {
    "id": "front-balcony-room",
    "slug": "front-balcony-room",
    "name": "Front Balcony Room",
    "type": "room",
    "description": "A well-ventilated room with a front-facing balcony, offering natural light and a pleasant view. Comes fully furnished with bed, table, chair, and racks.",
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
    "highlights": [
      "Front-facing balcony with natural light",
      "Separate electricity meter (₹9/unit)",
      "Furnished — bed, table, chair & racks provided"
    ],
    "images": [
      "/images/front-room-1.jpeg",
      "/images/front-room-2.png",
      "/images/front-room-3.png"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "middle-room",
    "slug": "middle-room",
    "name": "Middle Room",
    "type": "room",
    "description": "A centrally located room within the house, providing a quiet and private living space. Comes fully furnished with bed, table, chair, and racks.",
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
    "highlights": [
      "Quiet & private central location",
      "Separate electricity meter (₹9/unit)",
      "Furnished — bed, table, chair & racks provided"
    ],
    "images": [
      "/images/middle-room-1.jpeg",
      "/images/middle-room-2.jpeg",
      "/images/middle-room-3.jpeg",
      "/images/middle-room-4.jpeg"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "back-room",
    "slug": "back-room",
    "name": "Back Room",
    "type": "room",
    "description": "A room located at the back of the house, offering a quieter environment away from the street. Comes fully furnished with bed, table, chair, and racks.",
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
    "highlights": [
      "Peaceful backside location, away from street noise",
      "Separate electricity meter (₹9/unit)",
      "Furnished — bed, table, chair & racks provided"
    ],
    "images": [
      "/images/back-room-1.jpeg"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "kitchen",
    "slug": "kitchen",
    "name": "Mini Room",
    "type": "budget",
    "description": "A compact budget-friendly living space with a wooden bed, ideal for individuals seeking affordable accommodation. This is not a shared cooking kitchen — it is a small room available for rent at a lower price.",
    "availability": "unavailable",
    "pricing": {
      "monthly": {
        "label": "Monthly Rent",
        "amount": 2500
      }
    },
    "highlights": [
      "Most affordable private space",
      "Wooden bed provided",
      "No separate electricity meter — electricity included in rent"
    ],
    "images": [
      "/images/kitchen-1.svg"
    ],
    "video": null,
    "rules": []
  },
  {
    "id": "lobby",
    "slug": "lobby",
    "name": "Lobby Space",
    "type": "budget",
    "description": "A hall-style open living space with a wooden bed, offered at the most affordable rent. Ideal for budget-conscious individuals who need a simple, clean place to stay.",
    "availability": "unavailable",
    "pricing": {
      "monthly": {
        "label": "Monthly Rent",
        "amount": 1500
      }
    },
    "highlights": [
      "Lowest rent in the house",
      "Wooden bed provided",
      "Open hall-style living space",
      "No separate electricity meter — electricity included in rent"
    ],
    "images": [
      "/images/lobby-1.png",
      "/images/lobby-2.jpeg"
    ],
    "video": null,
    "rules": []
  }
];

export const facilities = [
  {
    "name": "24/7 CCTV Security",
    "description": "24/7 security surveillance with CCTV cameras installed in the house to help ensure the safety and security of all residents.",
    "icon": "cctv"
  },
  {
    "name": "Two Bathrooms",
    "description": "Two shared bathrooms — one with a Western toilet and one with an Indian toilet. Both are shared by all residents.",
    "icon": "bath"
  },
  {
    "name": "Geyser (Hot Water)",
    "description": "A geyser (water heater) is available in the bathroom for hot water during winters.",
    "icon": "flame"
  },
  {
    "name": "Refrigerator",
    "description": "A shared refrigerator is available for all residents to store food and beverages.",
    "icon": "refrigerator"
  },
  {
    "name": "24×7 Water Supply",
    "description": "Continuous water supply is available round the clock.",
    "icon": "droplets"
  },
  {
    "name": "Electricity Supply",
    "description": "Uninterrupted electricity supply. The three main rooms have separate electricity meters (₹9/unit). Mini room and Lobby spaces have electricity included in rent.",
    "icon": "zap"
  },
  {
    "name": "Furnished Spaces",
    "description": "All spaces come with bed, table, chair, and racks. Budget spaces (Mini room & Lobby) are provided with a wooden bed.",
    "icon": "home"
  },
  {
    "name": "Clean & Peaceful Environment",
    "description": "The property is well-maintained with regular cleaning and a calm, peaceful atmosphere for focused living.",
    "icon": "wind"
  }
];

export const houseRules = [
  "Full advance rent must be paid at the beginning of each month. Only after payment are you allowed to stay.",
  "Switch off lights, fans, and all electrical appliances when not in use.",
  "Flush and spray water after using the toilets so that other residents are not disturbed.",
  "No loud music or sound systems. Maintain a quiet and peaceful environment.",
  "No activities that disturb neighbours or are disrespectful to other residents or the property.",
  "Gate closing time is 10:30 PM. No entry after 10:30 PM except in genuine emergencies. The gate opens early in the morning.",
  "This property is for boys only. No girls are allowed on the premises.",
  "A valid government ID proof (Aadhaar card) is required at the time of the rental agreement.",
  "The landlord or property owner may inspect the property at any time without prior notice.",
  "No non-vegetarian food is allowed inside the house.",
  "No drinking or smoking is permitted anywhere on the premises.",
  "One month's notice period is required before vacating. Inform the owner at least one month in advance so that a new tenant can be arranged.",
  "The owner reserves the right to immediately remove any tenant from the property in case of any rule violation or disruptive behaviour.",
  "Friends and visitors may come for a short time, but they are not permitted to stay for extended periods or overnight without prior approval."
];

export const charges = {
  "electricity": {
    "label": "Electricity Charges",
    "amount": 9,
    "description": "Electricity is charged at ₹9 per unit. The three main rooms (Front Balcony, Middle, and Back Room) have separate electricity meters. For Mini room and Lobby spaces, electricity cost is included in the monthly rent."
  },
  "cleaning": {
    "label": "Bathroom Cleaning",
    "amount": 120,
    "description": "A sweeper comes once a month for bathroom cleaning. The charge of ₹120 is shared on a rotation basis among all residents — you pay only when it is your turn, not every month.",
    "frequency": "Monthly (on rotation — one resident per month)"
  },
  "otherCharges": [
    {
      "label": "No Personal Wi-Fi",
      "amount": null,
      "description": "No personal Wi-Fi connection is provided by the property. Residents may arrange their own internet connection if needed."
    }
  ]
};

export const termsAndConditions = [
  {
    "title": "Occupancy",
    "terms": [
      "This property is exclusively for boys. No girls are permitted on the premises.",
      "The rental space is to be used for residential purposes only.",
      "Subletting or transferring the tenancy is not permitted without written consent from the owner.",
      "The maximum number of occupants must match the agreed occupancy type (single or double)."
    ]
  },
  {
    "title": "Rent & Payment",
    "terms": [
      "Full advance rent must be paid at the beginning of each month before continuing to stay.",
      "There is no security deposit required.",
      "Failure to pay rent on time may result in the owner asking you to vacate immediately."
    ]
  },
  {
    "title": "Electricity Billing",
    "terms": [
      "The three main rooms (Front Balcony Room, Middle Room, and Back Room) each have a separate electricity meter.",
      "Electricity is charged at ₹9 per unit based on actual meter readings.",
      "Electricity charges are separate from the monthly rent for rooms with meters.",
      "For Mini room and Lobby spaces, electricity cost is included in the monthly rent — no separate meter is installed."
    ]
  },
  {
    "title": "Bathroom Cleaning",
    "terms": [
      "A sweeper comes once a month for bathroom cleaning. The charge is ₹120.",
      "This charge is shared on a rotation basis among all residents — each resident pays when it is their turn.",
      "You will not be charged every month. The payment rotates among all occupants in the house."
    ]
  },
  {
    "title": "House Conduct & Restrictions",
    "terms": [
      "No non-vegetarian food is allowed inside the house.",
      "No drinking or smoking is permitted on the premises.",
      "No loud music, disturbances, or activities that disrupt neighbours or other residents.",
      "The property gate closes at 10:30 PM. Late entry is allowed only in genuine emergencies.",
      "Friends and visitors may come for a short time but are not allowed to stay overnight without prior approval."
    ]
  },
  {
    "title": "Property Inspection & ID",
    "terms": [
      "A valid government ID proof (Aadhaar card) must be provided at the time of rental agreement.",
      "The landlord or property owner may inspect the property at any time without prior notice.",
      "Residents must maintain their rented space in a clean and orderly condition."
    ]
  },
  {
    "title": "Notice Period & Vacating",
    "terms": [
      "A minimum notice period of one month is required before vacating.",
      "Inform the property owner at least one month in advance so that a replacement tenant can be found.",
      "The owner reserves the right to ask any tenant to vacate immediately in case of rule violations or disruptive behaviour."
    ]
  },
  {
    "title": "Maintenance & Responsibilities",
    "terms": [
      "Tenants must maintain the rented space in a clean and orderly condition.",
      "Any damage to the property beyond normal wear and tear will be charged to the tenant.",
      "Tenants must report any maintenance issues to the owner promptly.",
      "Switch off all electrical appliances when not in use."
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
  "tagline": "Residential Rental Spaces",
  "location": "Mahanagar, Lucknow, India"
};

export const contactInfo = {
  "phones": ["8090546567", "6387056662"],
  "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d889.7014597701996!2d80.94595726955819!3d26.8779091947698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUyJzQwLjUiTiA4MMKwNTYnNDcuOCJF!5e0!3m2!1sen!2sin!4v1792749573670!5m2!1sen!2sin",
  "mapDirectionsUrl": "https://maps.google.com/?q=26.877909,80.946611",
  "address": "521/96, Mahanagar, Lucknow, Uttar Pradesh, India"
};

export const navLinks = [
  {
    "label": "Home",
    "href": "/"
  },
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
    "label": "Contact",
    "href": "/#contact"
  },
  {
    "label": "Admin",
    "href": "/admin"
  }
];
