# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

No test suite is configured.

## Architecture

Single-page React 19 app built with Vite, Tailwind CSS v4, and Framer Motion. It's a Valentine's Day gift site with a gated entry experience.

**Entry flow:** `App.jsx` renders `EntryPass` as a full-screen overlay (z-200). Clicking the envelope triggers a Framer Motion zoom-out animation; after 800ms `hasEntered` flips to `true`, revealing the main site underneath via opacity transition.

**Main layout (rendered but hidden until entry):**
- `MusicPlayer` — autoPlays `public/music.mp3` once `hasEntered`
- `Navigation` — fixed nav bar
- `AuroraBackground` wrapping `FloatingHearts` + `Hero` — full-viewport hero section
- `main` block: `Gallery` → `Timeline` → `VideoSection` → `LoveLetter`

**Key patterns:**
- `src/lib/utils.js` exports `cn()` (clsx + tailwind-merge) — use for conditional class names
- Framer Motion (`motion`, `AnimatePresence`) is used throughout for all animations
- Google Fonts (`Great Vibes` cursive) loaded via `index.html`, used for romantic text styling
- Static assets live in `public/` (`music.mp3`, `us.mov`, `cupid.png`)
- Custom Tailwind animations (`float-slow/medium/fast`, `aurora`) defined in `tailwind.config.js`

**Deployment:** Netlify (`netlify.toml` present, build command is `npm run build`, publish dir `dist`).
