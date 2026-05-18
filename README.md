# slydr web

Modern Next.js migration of the slydr landing page.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Cloudflare Pages static export

The original static page is preserved as `slydr.html`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

The app is configured with `output: "export"`, so production assets are written to `out/`.

## Cloudflare Pages

Use these settings:

- Build command: `npm run build`
- Build output directory: `out`
- Node version: 20 or newer

`wrangler.jsonc` also points static assets at `out/` for local Cloudflare preview:

```bash
npm run preview
```

## Calendly

The Calendly modal is implemented in `components/modal/CalendlyModal.tsx`.

Replace:

```ts
https://calendly.com/YOUR_CALENDLY_LINK/30min
```

with the production slydr Calendly URL.
