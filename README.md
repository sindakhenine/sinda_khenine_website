# Sinda Khenine website

Personal website for Sinda Khenine, built with Next.js App Router and intended for Vercel.

## Local setup

Requirements: a current Node.js LTS release and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Never commit `.env.local` or real credentials.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The contact route requires a verified Resend sending domain plus `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. Updates signup remains disabled until persistent single-use double-opt-in storage is configured. See the email, Vercel, domain, and production-readiness guides before deployment.
