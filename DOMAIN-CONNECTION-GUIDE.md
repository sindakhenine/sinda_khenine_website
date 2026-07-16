# Domain connection guide

1. Add `sindakhenine.com` and `www.sindakhenine.com` to the Vercel project before changing Cloudflare.
2. In Vercel Domains, copy the exact record type, name, and target shown for each hostname. Do not use generic targets from documentation.
3. Record the existing Cloudflare DNS configuration before editing it. Preserve all MX, SPF, DKIM, DMARC, and Resend records.
4. Add or update only the web records Vercel requests. Use **DNS only** initially when required for verification.
5. Verify the apex hostname in Vercel, then verify `www`.
6. In Vercel, configure `www.sindakhenine.com` to redirect permanently to `sindakhenine.com`.
7. Confirm HTTPS certificates are active for both hostnames.
8. Test both HTTP and HTTPS variants, one redirect only, no loop, and a final canonical URL of `https://sindakhenine.com`.
9. Check page canonicals, Open Graph URLs, structured data, sitemap, and robots after the production build is attached.

Cloudflare DNS targets remain an owner action because Vercel has not displayed project-specific values yet.
