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

## Resume updates

The downloadable resume is `public/Sinda_Khenine_Resume.pdf`. Update the content in
`resume/build_resume.py` and its HTML companion, `resume/Sinda_Khenine_Resume.html`,
then run `python3 resume/build_resume.py` with ReportLab and Pillow installed.
Review both PDF pages and links before committing the regenerated PDF; the Next.js
build serves this file as-is. The shared website headline and social links are in
`content/site/config.ts`.

## Production deployment

Production uses the Vercel Git integration for
`sindakhenine/sinda_khenine_website`, with `main` as the production branch and
`sinda-khenine-website` as the Vercel project. Pushing to `main` triggers a build
and production deployment for `https://sindakhenine.com`. Confirm the Vercel
deployment status and the live pages and PDF after each release.

This setup was verified in September 2026. Earlier deployment reports describe
the initial setup and may still contain historical, pre-launch status notes.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The contact route requires a verified Resend sending domain plus `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. Updates signup remains disabled until persistent single-use double-opt-in storage is configured. See the email, Vercel, domain, and production-readiness guides before deployment.
