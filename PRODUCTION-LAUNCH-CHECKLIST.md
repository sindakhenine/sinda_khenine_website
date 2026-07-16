# Production launch checklist

## Source and preview

- [ ] Local repository has at least one reviewed commit and the correct GitHub remote.
- [ ] GitHub source is current and contains no secrets, local paths, or private manuscript paths.
- [ ] Vercel preview build succeeds with Preview environment variables.
- [ ] Homepage, About, Projects, all project details, Speaking, Writing, Book, Resume, Contact, Privacy, Imprint, sitemap, robots, and 404 pass.
- [ ] Presentation video, book teaser, conference reel, cover, portrait, and CV load completely.
- [ ] Mobile, tablet, and desktop layouts pass visual inspection.
- [ ] Public-copy scan finds no mock language, internal notes, em dashes, incorrect event status, contact address, book status, or PhD claim.

## Email and legal

- [ ] Resend reports `mail.sindakhenine.com` verified.
- [ ] Preview contact test sends the founder notification and visitor confirmation with correct Reply-To.
- [ ] Invalid, missing, repeated, honeypot, rate-limit, and provider-error cases pass.
- [ ] Updates signup remains disabled until durable double opt-in storage and unsubscribe behavior pass.
- [ ] Privacy copy has professional review.
- [ ] Imprint placeholders are resolved or expressly approved for launch.

## Domain and production

- [ ] Vercel-provided records are installed in Cloudflare without disturbing email DNS.
- [ ] Apex and `www` are verified and HTTPS is active.
- [ ] `www` redirects once to the apex without a loop.
- [ ] Canonical, sitemap, robots, Open Graph, and structured-data URLs use `https://sindakhenine.com`.
- [ ] Final lint, TypeScript, tests, and production build pass from the reviewed commit.

## Verdict

**NO-GO.** There is no connected Git repository or Vercel preview. Resend verification, real email delivery, Cloudflare/Vercel DNS, privacy review, and imprint resolution are incomplete.
