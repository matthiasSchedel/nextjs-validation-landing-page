# nextjs-validation-landing-page

Config-driven, self-hostable SaaS landing page template built with Next.js 14.

## What it does

- Renders a simple route index at `/`
- Renders a template gallery at `/templates`
- Renders landing variants at `/templates/[slug]`
- Captures waitlist emails via Resend (`/api/waitlist`)
- Generates framework stubs in `framework/`

## Figma reference

Use this design source when implementing or adjusting variants:

- https://www.figma.com/design/CyQvPi7MVFJwzs7PNy4eck/SaaS-Waitlist-Landing-Page-Examples--Community-?node-id=0-1&p=f&t=UWQO6cUIIVGnch3g-0

## Current variants

- `/templates/minimal-mobile-light` (implemented one-pager)
- `/templates/classic-saas` (implemented multi-section template)
- `/templates/figma-example-01` ... `/templates/figma-example-20` (all implemented)
- `/templates/figma-example-03` ... `/templates/figma-example-08` use custom coded one-pagers
- Remaining Figma examples render responsive reference exports from the source file

Use `/` as a simple route index, then open `/templates` to pick a template and iterate from there.

## Configure content/theme

Edit `saas.config.ts` for product content, branding, pricing, and theme.

Create local env file:

```bash
cp .env.local.example .env.local
```

Required env vars for waitlist API:

- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`

Optional:

- `FAL_KEY` (for `npm run generate:images`)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Deploy (Vercel)

```bash
npm run deploy
```

Before production deployment, add the following env vars in Vercel Project Settings:

- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `FAL_KEY` (optional)

## Add a new variant

1. Add a new item in `src/lib/template-catalog.ts` with a unique `slug`.
2. Create a component in `src/components/templates/`.
3. Wire it in `src/app/templates/[slug]/page.tsx`.
4. Keep lead capture posting to `/api/waitlist`.
5. Validate visual direction against the Figma reference URL above before committing.
