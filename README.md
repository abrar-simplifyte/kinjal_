# Prensu Sonkar — UI/UX Designer Portfolio

A modern, high-performance UI/UX design portfolio web application showcasing 8 comprehensive case studies, interactive prototype simulators, design systems, and an ATS-friendly printable A4 resume.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Library:** React 19
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript
- **Styling:** Vanilla CSS design tokens with custom CSS variables (Dark & Light theme support)
- **Deployment:** Netlify

## ✨ Key Features

- **8 Flagship Case Studies:** In-depth breakdown covering Problem, Research, User Personas, User Flows, Design Systems, Key Screens, Usability Testing, and Retrospectives.
- **Interactive Prototype Simulators:** Live mini-prototypes demonstrating interaction design patterns (cart flows, search filters, state machines).
- **Theme Switching:** Dark Red & Black (Default) and Light theme powered by SSR-safe `useSyncExternalStore`.
- **A4 Printable Resume Modal:** CSS `@media print` optimized single-page curriculum vitae.
- **Micro-Interactions:** Cursor ambient spotlight tracking, toast feedback notifications, and canvas confetti effects.

## 🛠️ Project Structure

```
├── public/                 # Project mockups, static Netlify form, social assets
├── src/
│   ├── app/                # Routes, layout, metadata, sitemap, robots, icons
│   ├── components/         # Reusable UI components & modals
│   │   └── simulators/     # Interactive project prototype simulators
│   ├── data/               # Portfolio profile and project case study data
│   ├── hooks/              # useTheme, useActiveSection, scroll lock, focus trap
│   ├── lib/                # Site constants and clipboard helper
│   └── types/              # TypeScript interfaces and domain models
├── netlify.toml            # Deployment configuration
├── next.config.ts          # Next.js build configuration
└── package.json            # Project dependencies and scripts
```

## 💻 Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Lint

```bash
# Type check
npx tsc --noEmit

# Lint code
npm run lint

# Production build
npm run build
```

## 🌐 Deployment

Deploy to Netlify with the included `netlify.toml`. Set `NEXT_PUBLIC_SITE_URL` to
the production origin (for example `https://prensusonkar-portfolio.netlify.app`)
so canonical URLs, Open Graph metadata, the sitemap, and the resume portfolio
link all resolve to the live domain.

The contact form is registered through `public/__forms.html` and submits with
`fetch`; if the form endpoint is unavailable, the visitor is offered a `mailto:`
fallback instead of a false success message.
