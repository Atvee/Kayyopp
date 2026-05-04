# KAYYOPP

Create. Connect. Sell.

KAYYOPP is a fully runnable Next.js MVP for Kerala artisan discovery, direct sales, bookings, and verification. It is built as a credential-free local demo, so the core product flows work without Supabase, Mapbox, payment keys, or AI API keys.

## Core Functionality

- AI-assisted artisan profile builder with browser-saved drafts
- Tourist discovery assistant for craft, location, availability, and verification queries
- Token-free interactive Kerala discovery map
- Artisan profiles with portfolio, story, availability, reviews, credentials, and Smart Verification Score
- Visit booking requests saved in local storage
- Marketplace with search, craft/location filters, verified-only and custom-order filters
- Product checkout simulation for UPI/card direct sales
- QR verification pages for physical stalls and workshops
- Artisan dashboard with listing generation, availability, fraud/quality signals, and verification readiness

## Main Routes

- `/` - KAYYOPP command center
- `/discover` - map and tourist discovery
- `/marketplace` - direct craft sales
- `/dashboard` - artisan workspace
- `/artisans/narayanan-wood-studio` - sample artisan profile
- `/products/prod-teak-elephant` - sample product checkout
- `/verify/narayanan-wood-studio` - QR verification record

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

Current build status: passing. ESLint may show advisory warnings about regular `<img>` tags; they are intentional for simple remote demo imagery.

## Production Upgrade Path

- Replace the demo data in `src/lib/demo-data.ts` with Supabase/Firebase records.
- Connect checkout actions to Razorpay/UPI.
- Replace the SVG map with Google Maps or Mapbox.
- Connect profile/listing generation to GPT, Gemini, or another LLM.
- Anchor approved verification records to Hyperledger Fabric or another permissioned ledger.
