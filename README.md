# Fairdeal Hub Clean

A cleaner version of Fairdealhub.online, built with Next.js as an affiliate marketing site.

## Features

- Home page with email signup popup and sales funnel integration
- Categories page for products
- Discount codes page with 100% working codes
- Blog section tied to sales funnel
- Admin panel with password protection for managing affiliates, settings, and analytics
- API routes for updating brands, products, and codes based on trends
- SEO optimized with meta tags
- Google Analytics integration (placeholder)
- Custom styling with deepdollz-inspired colors (placeholder)

## Setup

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: /admin
- Password: admin123 (change in production)

## API Endpoints

- POST /api/update-brands - Update popular brands
- GET /api/update-brands - Get current brands
- Similar for products and codes (placeholders)

## Notes

- All APIs and affiliate integrations are placeholders until you sign up for services.
- Update colors in src/app/globals.css for deepdollz theme.
- Add logo to public/logo.png
- Integrate real sales funnel for email signups.
- Add Google Analytics tracking ID in layout.tsx
