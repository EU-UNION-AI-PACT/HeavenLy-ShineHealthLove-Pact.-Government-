# ✦ GloryaShine Pilger Platform

**Heiliges Jahr 2026 — Pilger der Hoffnung — Gottes Heilender Pfad**

A multi-tenant spiritual pilgrimage platform for the Holy Year 2026. Built with ceremonial design principles, zero-trust security architecture, and the highest standards of child protection (COPPA / DSGVO / EU AI Act).

---

## Architecture Overview

### The Three Passages — Sacred Calendar Anchor

| Date | Passage | Meaning |
|------|---------|---------|
| 6. Januar 2026 | Der Ursprung | Epiphany — seed of light in the Julian rhythm |
| 12. Juni 2026 | Die Spiegelung | Mirror point — Pilger der Hoffnung → Heilender Pfad |
| 24. Dezember 2026 | Die Krönung | Jubilee arrival — hope becomes certainty |

### Role System

| Role | Access | Description |
|------|--------|-------------|
| `SUPER_ADMIN` | `/admin/*` | Global platform governance, all tenants |
| `TENANT_ADMIN` | `/admin/tenant/[slug]/*` | Single tenant management |
| `PILGRIM` | `/portal/*` | Adult member — petitions, news, vacancy |
| `PARENT` | `/portal/guardian/*` | Eltern-Passage — child link management |
| `JUNIOR` | `/portal/junior` | Silent Junior ID — closed environment only |

### Alliance Nodes

```
ID-EU   — EU-Union  (Ethics/Legal Framework, DSGVO+, AI Act)
ID-US   — USA       (Tech infrastructure, Agentic Infrastructure)
ID-UN   — UNITED NATIONS (Global neutrality, World Heritage)
ID-CH   — Switzerland   (Crypto anchor, Sovereign ID vault)
ID-IE   — Ireland       (Cloud hosting hub)
ID-NO   — Norway        (Digital society pioneer)
ID-SE   — Sweden        (Transparency, trust layer)
ID-FI   — Finland       (Digital governance pioneer)
ID-FR   — France        (Philosophical/cultural depth)
ID-ES   — Spain         (Bridge to other continents)
ID-PT   — Portugal      (Cultural bridge)
```

---

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom gold/midnight design system
- **Auth**: NextAuth.js v5 (credentials + JWT)
- **ORM**: Prisma 7 (PostgreSQL)
- **Email**: Resend
- **Fonts**: Cinzel, Cormorant Garamond, Playfair Display

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Public landing page
│   ├── login/page.tsx              # Credentials login
│   ├── admin/
│   │   ├── page.tsx                # Super-Admin dashboard
│   │   ├── giessfast/page.tsx      # Alchemical reactor dashboard
│   │   ├── resonanz/page.tsx       # Resonanz-Bilanz daily report
│   │   ├── junior-safety/page.tsx  # Junior-Schutz-Zentrale
│   │   ├── mentors/page.tsx        # Mentor vetting / validation
│   │   └── tenant/[slug]/page.tsx  # Tenant-Admin dashboard
│   ├── portal/
│   │   ├── page.tsx                # Pilgrim portal hub
│   │   ├── news/page.tsx           # Resonance Feed inbox
│   │   ├── petition/new/page.tsx   # Submit Fürbitte
│   │   └── guardian/
│   │       ├── page.tsx            # Eltern-Passage portal
│   │       ├── family-orbit/page.tsx  # SVG orbit visualization
│   │       └── transition/page.tsx    # Age-Transition Gate
│   ├── portal/junior/page.tsx      # Silent Junior workspace
│   └── api/
│       ├── auth/[...nextauth]/     # NextAuth handler
│       ├── petitions/route.ts      # Fürbitte CRUD
│       ├── news/route.ts           # Resonance Feed CRUD
│       ├── vacancies/route.ts      # Match-Orchestrator
│       ├── seed/route.ts           # One-time DB setup
│       └── cron/resonanz/route.ts  # Nightly Resonanz-Bilanz
├── components/landing/
│   ├── PassageGrid.tsx             # 3 holy passage stations
│   ├── AllianceBar.tsx             # Alliance node status
│   └── CalendarWidget.tsx          # Live countdown to Dec 24
├── lib/
│   ├── auth.ts                     # NextAuth config
│   ├── prisma.ts                   # Prisma singleton
│   ├── email.ts                    # Resend templates
│   └── sovereign-id.ts             # ID-GLB / ID-JNR generation
├── data/
│   └── countries.ts                # ISO-2/3 country registry
├── types/
│   └── index.ts                    # Role, passage, alliance types
└── proxy.ts                        # Route guards (Next.js 16)
```

---

## Child Protection Architecture — The Golden Law

> **KEIN DIREKTKONTAKT MIT KINDERN.** This is an absolute architectural constraint, not a policy.

- Junior IDs (`ID-JNR-GLOB-*`) have **no email route** — set to `null` in DB
- All events triggered by a Junior ID are **automatically mapped to the parent's Sovereign ID**
- The `api/vacancies` match-orchestrator enforces this at code level — Junior arrival → parent relay only
- The `api/news` endpoint returns `403` for any `JUNIOR` role request
- The proxy guards block Junior access to `/portal/guardian`, `/admin`, and `/portal/news`

---

## Environment Setup

```bash
cp .env.local.example .env.local
# Fill in all values in .env.local
```

Key variables: `DATABASE_URL`, `AUTH_SECRET`, `RESEND_API_KEY`, `SOVEREIGN_ID_SALT`, `SEED_SECRET`, `CRON_SECRET`, `GUARDIAN_LINK_SECRET`

---

## Database Setup

```bash
npx prisma migrate dev --name init
# Then seed (replace YOUR_SECRET):
curl -X POST "http://localhost:3001/api/seed?secret=YOUR_SECRET"
```

---

## Development

```bash
npm install
npx prisma generate
npm run dev
# → http://localhost:3001
```

---

## Cron Job

Configure your scheduler to call:

```
GET /api/cron/resonanz
Authorization: Bearer <CRON_SECRET>
```

Every night at **00:00 UTC** to generate the Resonanz-Bilanz daily report.

---

## Welt-Allianz Statement

*„Wir agieren heutzutage nicht mehr nebeneinander, sondern füreinander. Über alle Grenzen hinweg."*

🛡️ Verified by Admin-Tenant (Zero-Trust) · 🌍 Global Mesh · 🔑 GPG-signed · 432 Hz
