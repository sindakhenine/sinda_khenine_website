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
