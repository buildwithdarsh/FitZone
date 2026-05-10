> This project is made with the help of Claude (1M context).

# FitZone

Fitness discovery and booking platform connecting members with 500+ partner gyms in Bangalore.

## Overview

FitZone helps users find gyms, book classes, and hire certified personal trainers. Built for 5,000+ active members with detailed structured data (Schema.org SportsActivityLocation) for local SEO. Includes member, business/franchise, and trainer flows.

## Features

- **Gym discovery** — Filter and explore partner gyms
- **Membership plans** — Tiered pricing with instant signup
- **Class booking** — Schedule yoga, HIIT, strength, cardio
- **Trainer marketplace** — Certified personal trainers with profiles
- **Workout tracking** — Member progress and class attendance
- **Business dashboard** — Franchise/owner controls
- **Reviews + ratings** — Aggregate ratings and testimonials
- **Schema.org structured data** — Local SEO for gyms and memberships

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts
- **Dates:** date-fns
- **Icons:** Lucide React
- **SDK:** @buildwithdarsh/sdk
- **Deploy:** Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Live: [fitzone.work.withdarsh.com](https://fitzone.work.withdarsh.com)

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint
