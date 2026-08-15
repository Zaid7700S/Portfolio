# Zaid Arshad — Portfolio (Next.js)

This is the original single-file HTML portfolio converted into a Next.js 14 (App Router) + TypeScript + Tailwind CSS project, with the exact same dark/lime theme, fonts, animations, and interactions.

## What's included

- **Next.js App Router** structure (`app/layout.tsx`, `app/page.tsx`)
- **Tailwind CSS** configured with the same CSS variables as the original (`--bg`, `--accent`, etc.) in `app/globals.css`
- **next/font** for Space Grotesk, JetBrains Mono, and Instrument Serif (replacing the Google Fonts `<link>` tags)
- **Font Awesome** icons via CDN (same as original)
- Component-per-section structure under `components/`:
  - `CursorDot` / `GlobalEffects` — mix-blend custom cursor, magnetic buttons, tilt cards, scroll-reveal, scroll progress bar
  - `ParticleCanvas` — the animated particle network background
  - `Navbar` — nav links with active-section highlighting, animated status text, mobile menu
  - `Hero` — the typewriter terminal animation
  - `About`, `Skills` (with `SkillBar`), `Projects`, `Manifesto`, `Experience`, `Contact`, `Footer`
  - `ProjectModal` — project case-study modal, now driven by React state instead of `innerHTML`
  - `Counter` — animated stat counters that trigger on scroll into view

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Notes

- Project images are served from `picsum.photos` (same as the original) via `next/image`, already whitelisted in `next.config.mjs`.
- Update the project data (case studies) in `data/projects.ts` and `components/Projects.tsx`.
- Update your social links and email in `components/Contact.tsx` and `components/Footer.tsx`.
