# Chaudhary Villa — QR-Based Rental Property Website

A fast, mobile-first, static rental property website built for **Chaudhary Villa**. Designed specifically for prospective tenants scanning a QR code printed on the physical **TO-LET** board outside the property.

---

## Table of Contents

- [Chaudhary Villa — QR-Based Rental Property Website](#chaudhary-villa--qr-based-rental-property-website)
  - [Table of Contents](#table-of-contents)
  - [Architecture \& Philosophy](#architecture--philosophy)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
  - [Centralized Property Configuration](#centralized-property-configuration)
    - [Initial Listings Included:](#initial-listings-included)
  - [How to Update Property Information](#how-to-update-property-information)
    - [1. Changing Room Availability](#1-changing-room-availability)
      - [Method A: Using the Owner Admin Portal (`/admin`)](#method-a-using-the-owner-admin-portal-admin)
      - [Method B: Editing `src/data/propertyData.js` Directly](#method-b-editing-srcdatapropertydatajs-directly)
    - [2. Updating Rental Prices](#2-updating-rental-prices)
    - [3. Adding Real Photographs](#3-adding-real-photographs)
    - [4. Adding Video Tours](#4-adding-video-tours)
    - [5. Updating Facilities](#5-updating-facilities)
    - [7. Updating Terms \& Conditions](#7-updating-terms--conditions)
  - [Local Development](#local-development)
  - [Building for Production](#building-for-production)
  - [Deploying to GitHub and Vercel](#deploying-to-github-and-vercel)
    - [Step 1: Push to GitHub](#step-1-push-to-github)
    - [Step 2: Connect to Vercel](#step-2-connect-to-vercel)
    - [Step 3: Subsequent Updates (Redeploying)](#step-3-subsequent-updates-redeploying)
  - [Generating \& Printing the TO-LET QR Code](#generating--printing-the-to-let-qr-code)
  - [Important Constraints \& Design Decisions](#important-constraints--design-decisions)

---

## Architecture & Philosophy

This website is engineered as a **100% frontend-only static website**:

- **No backend, no database, no server actions, and no authentication.**
- **No external paid services** (no Supabase, Firebase, MongoDB, or WhatsApp API).
- **Zero hosting cost:** Employs Next.js Static HTML Export (`output: "export"`), deploying to Vercel's global edge CDN.
- **Single Source of Truth:** All property data (rooms, prices, availability, facilities, rules, charges, terms) is strictly maintained in one centralized JavaScript file: [`src/data/propertyData.js`](file:///c:/Users/priya/Desktop/Chaudhary%20Villa/src/data/propertyData.js).

When the property owner updates the configuration file and pushes to GitHub, Vercel automatically rebuilds and redeploys the website within seconds.

---

## Technology Stack

- **Framework:** Next.js (App Router, Static Export)
- **Language:** JavaScript (ES Modules, strictly no TypeScript)
- **Styling:** Tailwind CSS v4 with custom design tokens (Warm off-white `#FAFAF9`, charcoal text `#1C1917`, vibrant teal accents `#0D9488`)
- **Icons:** Lucide React
- **QR Generation:** `qrcode.react` (client-side SVG generation)
- **Hosting:** Vercel (Static Site Deployment)

---

## Project Structure

All project files live directly in the root workspace folder:

```text
Chaudhary Villa/
├── public/
│   ├── images/              # Property photographs (JPG, PNG, WebP)
│   ├── videos/              # Optional video tours (MP4)
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # Static SEO XML sitemap
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, Tailwind CSS, utility styles
│   │   ├── icon.svg         # SVG favicon
│   │   ├── layout.js        # Global HTML layout and metadata
│   │   ├── not-found.js     # Friendly 404 page
│   │   ├── page.js          # Homepage (Hero, Listings, Facilities, Rules, Charges)
│   │   ├── qr/
│   │   │   └── page.js      # Printable QR code generator for TO-LET board
│   │   ├── spaces/[slug]/
│   │   │   └── page.js      # Individual detail page for each room/utility
│   │   └── terms/
│   │       └── page.js      # Full Terms & Conditions page
│   ├── components/
│   │   ├── AvailabilityBadge.js  # Available / Unavailable indicator
│   │   ├── ChargesSection.js     # Deposits, electricity meter info, cleaning
│   │   ├── FacilitiesList.js     # Shared amenities list
│   │   ├── Footer.js             # Standard footer
│   │   ├── Header.js             # Navigation with Quick QR modal trigger
│   │   ├── Hero.js               # Welcoming hero section
│   │   ├── HouseRules.js         # Community guidelines
│   │   ├── Lightbox.js           # Fullscreen modal image viewer
│   │   ├── PhotoGallery.js       # Thumbnail strip & interactive photo viewer
│   │   ├── PriceDisplay.js       # Formatted INR pricing component
│   │   ├── SpaceCard.js          # Card for listings grid
│   │   └── SpaceGrid.js          # Filterable/responsive grid of listings
│   ├── data/
│   │   └── propertyData.js  # ★ SINGLE SOURCE OF TRUTH (Prices, availability, rules)
│   └── lib/
│       └── helpers.js       # Formatting, slug resolution, and utilities
├── jsconfig.json            # Path alias configuration (@/* -> ./src/*)
├── next.config.mjs          # Next.js static export settings
├── package.json             # Dependencies and build scripts
├── AGENTS.md                # Project guidelines & engineering rules
├── SPEC.md                  # Authoritative functional specification
└── README.md                # Owner manual & documentation
```

---

## Centralized Property Configuration

The file [`src/data/propertyData.js`](file:///c:/Users/priya/Desktop/Chaudhary%20Villa/src/data/propertyData.js) controls **all** data rendered across the website.

You never need to touch React components or CSS just to edit property information.

### Initial Listings Included:

| Space Name | Type | Single Occupancy | Double Occupancy | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Front Balcony Room** | Room | ₹5,000 / month | ₹6,000 / month | Conservative default: `unavailable` |
| **Middle Room** | Room | ₹5,000 / month | ₹6,000 / month | Conservative default: `unavailable` |
| **Back Room** | Room | ₹5,000 / month | ₹6,000 / month | Conservative default: `unavailable` |
| **Kitchen** | Utility | ₹2,500 / month | N/A | Conservative default: `unavailable` |
| **Lobby** | Utility | ₹2,000 / month | N/A | Conservative default: `unavailable` |

---

## How to Update Property Information

Open [`src/data/propertyData.js`](file:///c:/Users/priya/Desktop/Chaudhary%20Villa/src/data/propertyData.js) in your text editor (VS Code, Notepad, etc.).

### 1. Changing Room Availability

You have two convenient methods:

#### Method A: Using the Owner Admin Portal (`/admin`)
1. On your phone or computer, open `/admin` (or tap the small **Lock icon** in the website footer).
2. Enter the Owner PIN: ``.
3. Tap the toggle switches to mark rooms as **Available (Vacant)** or **Unavailable (Occupied)**, or click **"Mark House Full"** with 1 click.
4. Adjust prices if needed.
5. Choose your action:
   - **"Push to GitHub"**: Automatically commits the change directly to your GitHub repository using the GitHub API. Vercel detects the commit and redeploys the site in ~30 seconds!
   - **"Copy Code"** or **"Download File"**: Copies or downloads the updated `propertyData.js` without any syntax errors.

#### Method B: Editing `src/data/propertyData.js` Directly
Open [`src/data/propertyData.js`](file:///c:/Users/priya/Desktop/Chaudhary%20Villa/src/data/propertyData.js):

```javascript
// To mark a space as available:
availability: "available",

// To mark a space as occupied / unavailable:
availability: "unavailable",
```

- When `available`, the website shows the room with an attractive green **Available** badge, price, photographs, and **"View Details & Photos"** button.
- When `unavailable`, the room displays a clean **Unavailable** badge and **"Currently Occupied"** status.
- When **all three rooms** are unavailable (but kitchen or lobby are available), the website displays:  
  `"Sorry, no rooms are currently available. You can check back later."`
- When **all five spaces** are unavailable, the website prominently displays:  
  `"Sorry, no rental spaces are currently available."`
- Available spaces are always placed prominently at the top of the listings grid.

### 2. Updating Rental Prices

Find the `pricing` block for the room:

```javascript
// For rooms with single and double occupancy:
pricing: {
  singleOccupancy: { label: "Single Occupancy", amount: 5500 },
  doubleOccupancy: { label: "Double Occupancy", amount: 6500 },
},

// For utilities with flat monthly rent:
pricing: {
  monthly: { label: "Monthly Rent", amount: 2800 },
},
```

> **Note:** Enter numbers without commas (e.g. `5500`, not `5,500`). The website automatically formats them into Indian Rupee format (`₹5,500`).

### 3. Adding Real Photographs

1. Place your photo files (e.g., `front-room-1.jpg`) into the [`public/images/`](file:///c:/Users/priya/Desktop/Chaudhary%20Villa/public/images) folder.
2. In `propertyData.js`, add or update the file path in the `images` array:

```javascript
images: [
  "/images/front-room-1.jpg",
  "/images/front-room-2.jpg",
],
```

### 4. Adding Video Tours

1. Place your video (MP4 format) into the [`public/videos/`](file:///c:/Users/priya/Desktop/Chaudhary%20Villa/public/videos) folder.
2. In `propertyData.js`, update the `video` property:

```javascript
video: "/videos/front-room-tour.mp4",
// or set to null if no video:
video: null,
```

### 5. Updating Facilities

Edit the `facilities` array in `propertyData.js`:

```javascript
export const facilities = [
  {
    name: "Refrigerator",
    description: "A refrigerator shared by residents for storing food and beverages.",
    icon: "refrigerator",
  },
  {
    name: "Geyser",
    description: "A geyser (water heater) is available in the bathroom for hot water.",
    icon: "flame",
  },
];
```



### 7. Updating Terms & Conditions

Edit the `termsAndConditions` array in `propertyData.js`. You can add, edit, or remove sections (Occupancy, Security Deposit, Electricity Billing, Notice Period, etc.).

---

## Local Development

Ensure you have **Node.js 18+** installed on your computer.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```

3. **Open the site in your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

4. **Verify responsive layout:**
   Press `F12` in your browser and toggle the mobile device toolbar (`Ctrl+Shift+M`) to preview the site on mobile screen dimensions (375px, 414px, etc.).

---

## Building for Production

To test the production build and verify static export:

```bash
npm run build
```

This compiles all pages and outputs static HTML/CSS/JS into the `out/` directory:
- `/` (Home page)
- `/qr/` (QR generator page)
- `/terms/` (Terms & conditions page)
- `/spaces/front-balcony-room/`
- `/spaces/middle-room/`
- `/spaces/back-room/`
- `/spaces/kitchen/`
- `/spaces/lobby/`
- `/404.html`

To run the ESLint check:
```bash
npm run lint
```

---

## Deploying to GitHub and Vercel

### Step 1: Push to GitHub

1. Initialize git and commit files:
   ```bash
   git add .
   git commit -m "Chaudhary Villa rental property website"
   ```
2. Create a new repository on GitHub (e.g. `chaudhary-villa`).
3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/<your-username>/chaudhary-villa.git
   git branch -M master
   git push -u origin master
   ```

### Step 2: Connect to Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New Project"** and select **"Import Git Repository"**.
3. Choose your `chaudhary-villa` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**.

Within ~45 seconds, your site is live with a free SSL certificate on a URL like `https://chaudhary-villa.vercel.app` (or your custom domain).

### Step 3: Subsequent Updates (Redeploying)

Whenever you change prices or availability in `src/data/propertyData.js`:
```bash
git add src/data/propertyData.js
git commit -m "Update room availability and prices"
git push
```
Vercel detects the push and automatically redeploys the site in under a minute.

---

## Generating & Printing the TO-LET QR Code

1. After deploying to Vercel, copy your live website URL (e.g., `https://chaudhary-villa.vercel.app`).
2. Visit `/qr` on your deployed site (e.g. `https://chaudhary-villa.vercel.app/qr`).
3. Paste the URL into the input field.
4. Click **"Print QR Code"** (or use your browser's Print dialog `Ctrl+P`).
5. Print the QR code, laminate or protect it against weather, and stick it on your physical **TO-LET** board.
6. **Important:** Test the QR code using your smartphone's camera before mounting it on the board.

---

## Important Constraints & Design Decisions

1. **Owner Admin Portal (`/admin`):** Chaudhary Villa includes a lightweight, secure client-side admin portal at `/admin`. It allows the owner to toggle room availability ("Available" / "Occupied" / "House Full") and sync updates directly to GitHub via the GitHub Contents API without any backend server. Access is protected by a PIN configured via the `NEXT_PUBLIC_ADMIN_PIN` environment variable in Vercel (or local `.env`).
2. **Indian Rupee Formatting:** All currency values are formatted according to the Indian numbering system (e.g., `₹5,000` / `₹6,000`).
3. **Conservative Availability:** Rooms default to `unavailable` until the owner explicitly verifies vacancy and sets `availability: "available"`.
4. **Separate Meters:** Clear disclosure that electricity is billed per individual sub-meter and is separate from base rent.
5. **No WhatsApp Integration / No WhatsApp Buttons:** Per specification instructions, direct WhatsApp integration is excluded.
6. **Environment Variable Configuration in Vercel:**
   - In your Vercel Dashboard, navigate to **Project Settings** → **Environment Variables**.
   - Add Key: `NEXT_PUBLIC_ADMIN_PIN`, Value: your custom secret PIN.
   - Click **Save** and trigger a **Redeploy** to apply the updated PIN to your live website.