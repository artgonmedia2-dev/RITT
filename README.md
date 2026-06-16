# RITT — Site Vitrine Freight Forwarder

Site vitrine de **RITT** (Régie Internationale de Transport et Transit), freight forwarder marocain opérant en Afrique et à l'international.

## Stack technique

- **Next.js 16** — App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — Animations scroll
- **next-intl v4** — Internationalisation (FR / EN / AR)
- **React Hook Form + Zod v4** — Formulaires avec validation
- **Lucide React** — Icônes

## Installation

```bash
cd ritt-app
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — redirige automatiquement vers `/fr`.

## Build de production

```bash
npm run build
npm start
```

## Pages disponibles

| URL | Description |
|-----|-------------|
| `/fr` | Homepage (FR) |
| `/en` | Homepage (EN) |
| `/ar` | Homepage (AR, RTL) |
| `/fr/services` | Liste des 6 services |
| `/fr/services/sea-freight` | Détail Sea Freight |
| `/fr/services/air-freight` | Détail Air Freight |
| `/fr/services/road-freight` | Détail Road Freight |
| `/fr/services/transit-customs` | Détail Transit & Customs |
| `/fr/services/supply-chain` | Détail Supply Chain |
| `/fr/services/import-export` | Détail Import/Export |
| `/fr/reseau` | Réseau mondial + carte SVG |
| `/fr/tracking` | Tracking shipment |
| `/fr/devis` | Wizard devis 4 étapes |
| `/fr/blog` | Liste des articles |
| `/fr/contact` | Formulaire contact |
| `/fr/mentions-legales` | Mentions légales |

## Test du Tracking

- **RITT-2026-001234** — Casablanca → Marseille (En transit)
- **RITT-2026-002567** — Shanghai → Casablanca (Livré)

## Couleurs Brand

| Token Tailwind | Hex | Usage |
|---|---|---|
| `navy` | `#1a237e` | Titres, Header, Footer |
| `navy-light` | `#283593` | Hover |
| `navy-dark` | `#0d1642` | Backgrounds sombres |
| `brand` | `#00bcd4` | CTAs, accents |
| `brand-light` | `#4dd0e1` | Hover CTAs |

## Structure

```
ritt-app/
├── app/[locale]/      # Pages i18n (fr/en/ar)
├── components/        # Layout, Sections, Wizard, Shared
├── messages/          # fr.json, en.json, ar.json
├── lib/               # data.ts, schema.ts, constants.ts, utils.ts
└── i18n/              # routing.ts, request.ts
```

---
© 2026 RITT — Régie Internationale de Transport et Transit
