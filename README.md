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

This setup was verified in the Vercel dashboard on 19 October 2026. The project
uses the repository root, the Next.js framework preset, Node.js 24.x and no build
or output overrides. `npm run build` produces `.next`; `public/` contains files
served directly from the site root. The custom domain is `sindakhenine.com`.
Earlier deployment reports describe
the initial setup and may still contain historical, pre-launch status notes.

## Search metadata and Bing verification

`public/BingSiteAuth.xml` is the unmodified Bing ownership file and must remain
available at `https://sindakhenine.com/BingSiteAuth.xml`. It is not an application
credential and is intentionally public. Complete Bing's Verify step in the
Webmaster Tools account after confirming this URL serves XML with HTTP 200.

The canonical origin is fixed to `https://sindakhenine.com` in
`content/site/config.ts`; the legacy `NEXT_PUBLIC_SITE_URL` variable is ignored.
This prevents local or preview values from pointing search engines at another
domain. Page metadata and the connected Person, Organization, WebSite and About
ProfilePage schemas are maintained in `lib/seo.ts` and the page modules.
SKatalyst AI is linked as an external organization founded by Sinda Khenine;
this repository does not deploy its website or application.

Keep `app/sitemap.ts` aligned with public routes and project records. The
last-modified date should reflect a content revision, not each sitemap request.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The contact route requires a verified Resend sending domain plus `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. Updates signup remains disabled until persistent single-use double-opt-in storage is configured. See the email, Vercel, domain, and production-readiness guides before deployment.

## Languages and appearance

The public site has English (unprefixed URLs), German (`/de`) and French (`/fr`)
versions. Page modules live under `app/[locale]`. `next-intl` provides routing and
request-scoped language context; `i18n/routing.ts` keeps URL language explicit
instead of redirecting visitors based on browser settings. Language links use a
full document navigation so the HTML language and saved theme apply together.
API routes, images, PDF downloads, robots, sitemap and Bing XML remain at the root.

Copy is stored in `i18n/messages/{en,de,fr}.json`, with stable `copyKey` identifiers
for the English source phrases. Update all three catalogues when editing a phrase.
`getCopy` handles server prose; `useCopy` handles interactive components. Only the
small `i18n/client-messages.ts` subset is sent to client components. Technical
identifiers, product names, original screenshots, videos and the English resume
PDF retain their original form. German and French prose was prepared with machine
translation and editorial corrections, including the About story, navigation,
identity and legal-page headings. Translations are saved locally; no translation
service runs when a visitor opens the website.

Each page has its own localized metadata, canonical and `hreflang` alternatives.
The sitemap lists 69 URLs (23 pages × 3 languages). Keep all three variants in the
sitemap when adding a public route.

The theme uses the visitor's system preference until a light/dark choice is saved
under `sinda-theme` in local storage. `lib/theme.ts` applies it before first paint;
`components/ThemeToggle.tsx` handles the control and system/storage changes.
Colors and responsive language controls are in `app/globals.css`.

For a local production smoke test, run `npm run build`, then
`npm run start -- --hostname localhost --port 3015` and visit
`http://localhost:3015`. Use the matching hostname: Next.js 16.2's production
proxy can loop when the listener and its internal worker disagree on localhost
versus 127.0.0.1. This does not affect the normal development preview.
