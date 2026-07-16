# Vercel setup guide

Do not attach the production domain until the preview checklist passes.

1. In Vercel, select **Add New > Project** and connect the GitHub account that owns `sinda_khenine_website`.
2. Select the repository and choose **Import**.
3. Confirm the root directory is the repository root and the framework preset is **Next.js**. Keep the standard install and build commands.
4. Under **Environment Variables**, add the keys from `.env.example`. Use `https://sindakhenine.com` for `NEXT_PUBLIC_SITE_URL`. Add real secrets only in Vercel, never in Git. Scope preview test values to Preview and production values to Production.
5. Deploy a preview from a non-production branch or pull request. Do not add custom domains yet.
6. Run every check in `PRODUCTION-LAUNCH-CHECKLIST.md` against the preview, including the real Resend contact test after domain verification.
7. In **Project Settings > Domains**, add `sindakhenine.com`, then `www.sindakhenine.com`. Copy only the DNS targets Vercel displays.
8. After DNS and HTTPS verification, edit `www.sindakhenine.com` in Vercel Domains and set a permanent redirect to `sindakhenine.com`.
9. Promote only the reviewed deployment from **Deployments**, or merge the approved branch into the configured production branch.

The application uses App Router Route Handlers and has no runtime filesystem writes. `/api/contact` requires the Node.js runtime used by its crypto dependency and the Resend SDK.
