# Deployment Guide

## Recommended hosting

Vercel is the lowest-risk default for this existing Next.js App Router application because it supports the current static/dynamic route mix, image optimization and environment variables without custom server maintenance. This is a recommendation, not an authorization to deploy.

## Pre-deployment gates

1. Replace every legal placeholder and obtain professional review.
2. Confirm the final domain and set `NEXT_PUBLIC_SITE_URL` to its HTTPS origin.
3. Confirm event/article links, resume privacy, media rights and captions/transcripts.
4. Keep `NEWSLETTER_MODE=mock` until a production provider and data-processing terms are approved.
5. Run `npm ci`, lint, typecheck, tests and production build from a clean checkout.
6. Run browser accessibility, 375/768/1440 responsive and reduced-motion checks.

## Vercel steps

1. Create a new project from this website repository only.
2. Framework preset: Next.js. Root directory: repository root.
3. Build command: `npm run build`; install command: `npm ci`.
4. Add `NEXT_PUBLIC_SITE_URL=https://[CONFIRMED-DOMAIN]`, `NEWSLETTER_MODE=mock`, and `NEXT_PUBLIC_ANALYTICS_MODE=off`.
5. Deploy to a protected preview URL first. Validate routes, metadata, media byte-range playback and resume download.
6. Connect the approved domain only after legal/content sign-off.
7. Prefer apex as canonical and redirect `www` to apex; preserve MX, SPF, DKIM and DMARC records.

## Rollback

Keep the previous verified deployment, do not mutate source assets during deployment, and use Vercel’s immutable deployment rollback if a production issue appears.

No credentials were inspected and nothing was deployed.
