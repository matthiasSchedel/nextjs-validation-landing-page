# nextjs-validation-landing-page

Config-driven, self-hostable SaaS landing page template built with Next.js 14.

## What it does

- Renders a complete landing page from `saas.config.ts`
- Captures waitlist emails via Resend (`/api/waitlist`)
- Generates framework stubs in `framework/`

## Configure

Edit only `saas.config.ts` for product content, branding, pricing, and theme.

Create local env file:

```bash
cp .env.local.example .env.local
```

Required env vars:

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
