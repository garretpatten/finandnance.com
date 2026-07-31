# Fin and Nance

![Fin and Nance hero](public/assets/images/fin-and-nance.png)

> A children's book series that makes money lessons simple, friendly, and fun.

**Fin and Nance** is the marketing home for a wholesome chapter book series on financial literacy for children ages 6–10. The site is built with Vue 3, Vite, and Tailwind CSS, and is deployed to Cloudflare Pages.

- **Live site:** [finandnance.com](https://finandnance.com)
- **Amazon:** [Buy the books on Amazon](https://www.amazon.com/dp/B0G5PMK92F)
- **Instagram:** [@fin_and_nance](https://www.instagram.com/fin_and_nance/)

## About the series

Join siblings Fin and Nance as everyday adventures turn into real-world lessons about saving, borrowing, bartering, inflation, and responsible money choices. Each story blends humor, sibling teamwork, and a bonus learning section to spark meaningful family conversations.

## Setup

Requires Node.js **20.19+** or **22.12+** (see `.nvmrc` / `package.json` engines).

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Stack

- [Vue 3](https://vuejs.org/) with Composition API
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Project structure

```text
src/
├── components/    # Header, Footer, BookCard
├── views/         # LandingView, AboutView, BooksView
├── router/        # Route definitions
├── stores/        # Theme store (dark mode)
├── assets/css/    # Global styles and motion utilities
├── App.vue
└── main.js
public/
├── assets/images/ # Book covers, author photo, hero image
├── fonts/         # Web fonts
└── _redirects     # SPA redirect rules for Cloudflare Pages
```

## Brand guidelines

- **Palette:** earthy Gruvbox Dark Hard tones with warm brand accents (`terracotta`, `butter`, `aqua`, `sage`).
- **Typography:** Libre Baskerville for headings and body; JetBrains Mono for accents.
- **Mascots:** Fin and Nance — the friendly faces of the series.
- **Voice:** warm, encouraging, and accessible to kids and parents alike.

## Deployment

The site builds to `dist/` with `npm run build` and is published to Cloudflare Pages. SPA routing is handled by `public/_redirects`:

```text
/* /index.html 200
```

## License

All rights reserved.
