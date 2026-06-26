# مُرَقِّب — Moraqeb

### Smart Land Management Platform for Makkah & The Holy Sites

> Built at **Barmajon Sana Hackathon** — organized by the Royal Commission for Makkah City and Holy Sites (RCMC)

`Next.js` `PostgreSQL` `ArcGIS` `Drizzle` `Supabase` `TypeScript` `Tailwind CSS`

---

## What is Moraqeb?

Moraqeb is a web platform for managing and monitoring land in Makkah Al-Mukarramah and the Holy Sites. It connects real estate deed data to interactive GIS maps, enabling property owners and municipal authorities to track land usage, detect violations, and make data-driven decisions — with a special focus on the Hajj and Umrah seasons.

---

## The Problem

Land management in Makkah's Holy Sites is uniquely complex:
- Massive seasonal population surges during Hajj and Umrah
- Difficulty linking paper-based deed records to physical geographic locations
- No unified platform for monitoring land violations or neglect in real time
- Authorities lack a streamlined tool for informed urban planning decisions

Moraqeb addresses this by bringing deed data, GIS mapping, and land analytics into one place.

---

## Features

- **Interactive GIS Map** — visualize real estate parcels across Makkah using ArcGIS, with geographic coordinate mapping of deed data
- **Deed Management** — connect and manage property deeds linked to their physical location on the map
- **Land Violation Detection** — identify neglected or misused land parcels through map layer analysis
- **Authentication** — secure user login with JWT and bcrypt-based credential handling
- **Responsive Dashboard** — clean UI for property owners and municipal staff to monitor and act on land data

---

## Technologies

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework — routing, API, server-side rendering |
| React 19 | UI components |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| ArcGIS (`@arcgis/core`) | Professional-grade GIS mapping and geographic data visualization |
| Drizzle ORM | Type-safe database queries |
| PostgreSQL | Primary database |
| Supabase | Authentication and database services |
| shadcn/ui | Accessible UI component library |
| JWT + bcryptjs | Secure authentication |

---

## Context

This project was built as an MVP during a competitive hackathon with limited team slots. The scope intentionally covers the core GIS integration, interactive map layer, backend data layer, and authentication. The vision for the full platform includes satellite imagery analysis and government API integrations (Najiz, Nafath) as future extensions.

---

## Running Locally

**Prerequisites**
- Node.js 20.x
- PostgreSQL database (or Supabase project)

**Environment Variables**

```env
DATABASE_URL=your_postgres_connection_string
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
```

**Install & Run**

```bash
git clone https://github.com/zyadfallatah/moraqeb.git
cd moraqeb
npm install
npm run db:setup
npm run dev
```

---

## Author

Built by [Ziyad Fallatah](https://zyadfallatah.com)
