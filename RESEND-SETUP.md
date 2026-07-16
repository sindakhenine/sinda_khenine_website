# Resend production setup

Do not add guessed DNS records or use `founder@skatalystai.com` as the From address unless `skatalystai.com` is separately verified.

1. Sign in to Resend and open **Domains**.
2. Add `mail.sindakhenine.com`.
3. If Resend offers **Sign in to Cloudflare**, review the requested zone and record changes before authorizing them.
4. Otherwise copy the exact SPF, DKIM, MX or feedback, and optional tracking records generated for this domain.
5. Open Cloudflare DNS for `sindakhenine.com` and add those records exactly, including priorities. Keep applicable email CNAME records DNS-only.
6. Return to Resend and run verification. Wait until the dashboard reports **Verified**.
7. In Vercel, configure `RESEND_FROM_EMAIL=Sinda Khenine <hello@mail.sindakhenine.com>` and keep `CONTACT_TO_EMAIL=founder@skatalystai.com`.
8. Deploy a preview with the Preview-scoped values.
9. Submit one controlled contact inquiry using an address the owner controls.
10. Confirm founder delivery, visitor confirmation, visitor Reply-To, SPF/DKIM alignment, and absence of message-body logs.

Do not send a newsletter or Broadcast during deployment validation.
