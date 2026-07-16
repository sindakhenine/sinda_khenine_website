# Resend and Cloudflare setup

Do not invent or reuse DNS values from another domain. Copy every value from the Resend dashboard for `mail.sindakhenine.com`.

1. In Resend, open **Domains**, select **Add Domain**, and enter `mail.sindakhenine.com`.
2. Keep the Resend page open and copy its generated DKIM TXT, SPF TXT, SPF or feedback MX, and any optional tracking CNAME exactly.
3. In Cloudflare, open `sindakhenine.com > DNS > Records`.
4. Add each record with the type, name, content, priority, and TTL shown by Resend. Do not alter quoting or append the domain twice.
5. Keep email-related CNAME records **DNS only** when Cloudflare offers a proxy toggle. TXT and MX records are not proxied.
6. Add DMARC only from a reviewed policy. A monitoring policy can be considered first, but the exact value requires owner and email-administrator approval.
7. Return to Resend and select **Verify DNS Records**.
8. Wait until Resend reports the domain as **Verified**. DNS visibility alone is not sufficient.
9. Set `RESEND_FROM_EMAIL=Sinda Khenine <hello@mail.sindakhenine.com>` in the appropriate Vercel environment. Keep `CONTACT_TO_EMAIL=founder@skatalystai.com`.
10. Send a controlled test through the preview contact form. Confirm founder delivery, visitor confirmation, sender alignment, and visitor Reply-To behavior.

Do not claim email readiness until both Resend verification and the end-to-end test succeed.
