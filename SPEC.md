# PROJECT SPECIFICATION: QR-Based Rental Property Website

## 1. Role and Objective

Act as a senior frontend architect, Next.js engineer, and premium UI/UX designer.

Build a complete, polished, mobile-first rental property website for my family's residential property in India.

The website will be accessed primarily by people scanning a QR code printed on our physical TO-LET board.

Visitors should be able to see the rental spaces, availability, photographs, optional videos, prices, facilities, house rules, charges, and terms and conditions.

I want the simplest possible architecture that is inexpensive to host and easy for a non-technical property owner to maintain.

**This project must be frontend-only. Do not create a backend, database, authentication system, admin dashboard, API, server actions, or external storage integration.**

Build the actual application, not merely a design mockup.

## 2. Mandatory Technology Stack

Use:
- Next.js with the App Router.
- JavaScript only; no TypeScript.
- React.
- Tailwind CSS.
- Lucide React for icons where appropriate.
- GitHub for source control.
- Vercel for deployment.

Use a static-site-compatible architecture that can be deployed on Vercel without requiring a database or application server.

Prefer Next.js static export if compatible with the complete implementation.

Do not introduce Supabase, Firebase, MongoDB, Express, authentication providers, CMS platforms, payment gateways, or other backend services.

Do not add unnecessary dependencies.

## 3. Core Architecture

Store all property information in one centralized JavaScript data file, such as:

`src/data/propertyData.js`

This file must be the single source of truth for:
- Property name and locality.
- Rental spaces.
- Availability.
- Occupancy options.
- Monthly prices.
- Image and video paths.
- Descriptions.
- Facilities.
- House rules.
- Charges.
- Security deposits.
- Electricity billing information.
- Terms and conditions.
- General website content.

Create reusable components that read from this file.

Do not duplicate prices, room names, or availability values across multiple components.

If I change a value in the configuration file, every relevant part of the website must reflect the change after the next successful deployment.

Add clear comments explaining how a beginner can edit the data safely.

## 4. Initial Rental Spaces and Pricing

Create these five separate listings.

### A. Front Balcony Room
- Single occupancy: ₹5,000 per month.
- Double occupancy: ₹6,000 per month.

### B. Middle Room
- Single occupancy: ₹5,000 per month.
- Double occupancy: ₹6,000 per month.

### C. Back Room
- Single occupancy: ₹5,000 per month.
- Double occupancy: ₹6,000 per month.

### D. Kitchen
- Monthly rent: ₹2,500.

### E. Lobby
- Monthly rent: ₹2,000.

All prices must come from the centralized data file.

The three rooms must support separate single-occupancy and double-occupancy prices. The kitchen and lobby must have a single monthly price.

Display prices in Indian rupees using appropriate number formatting.

Do not invent property dimensions, furnishing details, or other features.

## 5. Availability Management

Every rental space must have an availability field controlled through the centralized JavaScript configuration.

Use explicit statuses such as:
- `available`
- `unavailable`

Never assume that a room is vacant simply because the website has been generated.

Initialize availability conservatively and clearly document where I can change the status after confirming the actual situation.

When a space is available:
- Display an attractive green Available badge.
- Display the correct price.
- Display its photographs and optional video.
- Allow visitors to open its details page.

When a space is unavailable:
- Display an Unavailable badge.
- Clearly state that the space is currently unavailable.
- Do not imply that it can currently be rented.

If all three rooms are unavailable, display:

"Sorry, no rooms are currently available. You can check back later."

If all five spaces are unavailable, display:

"Sorry, no rental spaces are currently available."

If some spaces are available, prominently show those spaces while retaining unavailable listings with clear status indicators.

Do not count the kitchen and lobby as rooms when deciding whether the room-specific empty state should appear.

Use a single reusable availability component throughout the application.

## 6. Public Homepage

Create a beautiful, premium-looking, mobile-first homepage.

### Header
Include:
- An editable property name.
- Navigation links for Rooms, Facilities, House Rules, and Terms.
- A responsive mobile menu.

### Hero Section
Use a polished heading such as:

"Find Your Space. Feel at Home."

Supporting text:

"Explore our rental spaces, view photos, check prices, and learn about the facilities and house rules."

Include a button that scrolls to the rental listings.

Make the headline and supporting text editable in the centralized data file.

### Rental Listing Grid
Show all five rental spaces in attractive responsive cards.

Each card should include:
- Cover photograph.
- Space name.
- Availability badge.
- Applicable monthly prices.
- Short description.
- A button to view details.

Use a responsive grid with one column on small mobile screens where appropriate, two columns on medium screens, and a balanced layout on larger screens.

Avoid clutter and excessive animation.

## 7. Individual Details Pages

Create individual pages for:
- `/spaces/front-balcony-room`
- `/spaces/middle-room`
- `/spaces/back-room`
- `/spaces/kitchen`
- `/spaces/lobby`

Each page must display:
- Space name.
- Current availability.
- Applicable monthly prices.
- Photograph gallery.
- Optional video.
- Description.
- Facilities.
- Applicable charges.
- House rules.
- Relevant terms and conditions.

Generate these pages from the centralized configuration rather than duplicating the listing data.

Use a photo gallery with a clear main image and thumbnail navigation or another accessible gallery design.

Allow images to open in a larger view when appropriate.

For videos, use locally stored, optimized MP4 files with standard browser playback controls.

If a space has no photos or videos, show a clean placeholder rather than a broken image.

If a requested space does not exist, show a proper not-found page.

## 8. Property Facilities

Initially include:
- A refrigerator shared by residents.
- A geyser in the bathroom.

These facilities must be stored in the configuration file.

Allow me to add, edit, and remove facilities by modifying the data file.

Do not invent Wi-Fi, air conditioning, furniture, parking, or any other unconfirmed amenities.

## 9. House Rules

Create a dedicated house rules section on the homepage and on applicable details pages.

Initially include:

"Switch off lights and electrical appliances when they are not in use."

Allow the rules to be maintained in the centralized configuration file.

Support global rules and, if useful, space-specific rules.

Render rules as clean, readable lists with suitable icons.

Do not hardcode rules separately into React components.

## 10. Charges and Terms and Conditions

Display an editable charges and billing section.

Known information:
- Electricity is paid separately by tenants.
- Each room has a separate electricity meter.
- Bathroom cleaning charges apply once every two months.

Provide configurable fields for:
- Security deposit.
- Cleaning charge amount and calculation.
- Electricity billing instructions.
- Other applicable charges.

Do not invent security deposits or cleaning charge amounts.

If a charge has not been specified, display "To be confirmed" or omit its numerical value.

Create a dedicated `/terms` page with the terms and conditions stored in the centralized configuration file.

Allow the owner to edit:
- Occupancy conditions.
- Security deposit conditions.
- Electricity billing.
- Cleaning charges.
- Maintenance responsibilities.
- Guest policies.
- Notice periods.
- Additional house rules and conditions.

Do not invent legally binding policies. Clearly identify sample or unconfirmed content.

## 11. Photographs and Videos

Store public property media inside the project:

- Photographs: `public/images/`
- Videos: `public/videos/`

Use descriptive filenames, such as:
- `front-room-1.jpg`
- `front-room-2.jpg`
- `middle-room-1.jpg`
- `back-room-1.jpg`
- `kitchen-1.jpg`
- `lobby-1.jpg`

Reference these paths from the centralized data file.

Use actual supplied property photographs when available.

If real photographs are not yet available, create neutral placeholders or use a placeholder design that can easily be replaced. Do not present stock photographs as genuine photographs of my property.

Optimize photographs for mobile performance and use lazy loading where appropriate.

Do not place large video files unnecessarily in the repository. Explain how to compress videos before adding them.

## 12. Design System

Use a refined, professional visual design inspired by premium residential property websites.

Preferred style:
- Warm white or off-white background.
- Charcoal text.
- Subtle green or teal accents.
- Modern, readable typography.
- Generous whitespace.
- Rounded cards.
- Subtle shadows and borders.
- High-quality photography.
- Consistent spacing.
- Restrained transitions.
- Clear availability indicators.

Avoid:
- Excessive gradients.
- Excessive animations.
- Unnecessary decorative elements.
- Fake reviews, ratings, testimonials, or statistics.
- Cluttered layouts.
- Unnecessary popups.

The design must be excellent on mobile phones because visitors will arrive through a QR code.

Use accessible colors, semantic HTML, keyboard navigation, meaningful alt text, and readable font sizes.

## 13. Strict Functional Restrictions

The following features must not exist:
- Backend.
- Database.
- Administrator authentication.
- Admin dashboard.
- API routes.
- Server actions.
- Online payments.
- WhatsApp buttons.
- Public phone number.
- Contact forms.
- Booking functionality.
- User accounts.
- Persistent visitor-side editing controls.

Visitors must be able to browse the entire website without registering or signing in.

Do not simulate an admin dashboard with browser storage and claim that it updates the public website.

Do not use `localStorage` to manage globally shared availability.

The property owner will update information by editing the centralized JavaScript data file and redeploying the website.

## 14. Performance, SEO and Static Deployment

Use a static-compatible implementation.

Include:
- SEO metadata.
- Appropriate page titles and descriptions.
- Open Graph metadata.
- A favicon.
- `robots.txt`.
- A sitemap.
- Responsive images.
- Loading and empty states.
- A custom not-found page.

Use configurable property information for metadata. Do not invent the address.

Ensure that the individual space pages work under the chosen static export configuration.

If using Next.js static export, configure `output: "export"` where appropriate and avoid unsupported server-dependent features.

Do not use server-side functionality that would make the website require an application backend.

Explain that static exports require all necessary pages to be generated at build time.

## 15. QR Code

The QR code will point to the deployed public homepage.

Create a small QR-code utility or print-friendly QR page that accepts the final website URL.

If you implement QR generation in the project, ensure it uses a lightweight, compatible library and generates a real scannable QR code.

Provide instructions for generating the QR code after deployment.

Do not hardcode a temporary deployment URL.

The QR code should point directly to the stable production URL.

Test the QR code with a phone before printing it.

## 16. Project Structure

Use a clean and maintainable structure, for example:

- `src/app/`
- `src/components/`
- `src/data/propertyData.js`
- `src/lib/`
- `public/images/`
- `public/videos/`

Use reusable components for rental cards, availability badges, pricing, galleries, facilities, rules, and navigation.

Keep all editable property information centralized.

Avoid giant components and unnecessary abstractions.

Use JavaScript consistently. Do not create TypeScript files.

## 17. Testing and Acceptance Criteria

Before declaring the project complete, verify that:

1. The project installs successfully.
2. The production build succeeds.
3. All five listings render correctly.
4. All initial prices are correct.
5. Availability badges reflect the configuration.
6. The room-specific and property-wide empty states work correctly.
7. Individual listing pages show the correct information.
8. Editing a price in the configuration updates every relevant page.
9. Editing availability updates all relevant pages.
10. House rules, facilities, and terms come from the configuration file.
11. Missing photographs do not cause broken layouts.
12. Mobile layouts are usable and visually polished.
13. The QR code points to the production homepage.
14. No backend or authentication dependency exists.
15. No payment or WhatsApp functionality exists.
16. The application deploys correctly on Vercel.

Do not claim that a test passed unless it was actually executed.

If an environment limitation prevents testing, explain what I must verify myself.

## 18. Required Deliverables

Provide:
- Complete project source code.
- Full folder structure.
- Centralized rental data file.
- All reusable components and pages.
- `package.json`.
- Tailwind CSS configuration as required by the selected version.
- Next.js configuration.
- A detailed `README.md`.
- Setup instructions.
- Local development instructions.
- Instructions for editing prices and availability.
- Instructions for replacing photographs and videos.
- GitHub setup instructions.
- Vercel deployment instructions.
- QR-code generation and printing instructions.
- Production build and testing results.

If you have access to a coding workspace, create the files directly.

If you cannot create files directly, provide complete code in manageable batches without omitting required files or replacing functionality with pseudocode.

## 19. Implementation Process

Proceed in this order:

Phase 1: Explain the architecture and folder structure.

Phase 2: Create the Next.js project and design system.

Phase 3: Create the centralized rental data file.

Phase 4: Implement the homepage and individual listing pages.

Phase 5: Implement availability handling, prices, galleries, facilities, rules, and terms.

Phase 6: Implement SEO, the QR-code utility, and static deployment configuration.

Phase 7: Run the production build, test all acceptance criteria, and fix any errors.

Phase 8: Write a complete beginner-friendly README.

Start implementing the actual project. Do not stop after providing a plan.

**Final goal:** Deliver a beautiful, fast, secure-by-simplicity, static rental website that is easy to host and maintain, requires no backend services, and lets me update all property information by editing one JavaScript file and redeploying.