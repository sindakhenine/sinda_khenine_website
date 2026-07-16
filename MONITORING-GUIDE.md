# Production monitoring guide

The website uses Vercel Web Analytics, Vercel Runtime Logs and Observability, Resend delivery records, and the founder inbox. It does not include a custom analytics or contact administration dashboard.

## Vercel Web Analytics

Dashboard path: **Vercel Dashboard > sinda_khenine_website > Analytics**.

If Analytics has not been enabled for the project, select **Enable** in this view and redeploy the latest commit. Choose **Production**, **Preview**, or **All Environments** from the environment control.

- **Page views** count loaded pages and show which public content receives attention.
- **Pages** show visited URL paths without query parameters.
- **Routes** group visits by the Next.js route definition, which is useful for dynamic project pages.
- **Referrers** show the external page or domain that led to an initial visit when browser policy supplies it.
- **Countries** show aggregate visitor location by country.
- **Custom Events** show completed interactions named `contact_form_submitted`, `book_excerpt_opened`, `cv_downloaded`, `skatalyst_link_clicked`, and `conference_profile_clicked`.

Custom Events require a Vercel Pro or Enterprise plan. The event payloads contain only the event name. They do not include names, email addresses, subjects, messages, or other form values.

## Vercel Logs and Observability

Runtime log path: **Vercel Dashboard > sinda_khenine_website > Logs**. Filter **Route** to `/api/contact`, select the relevant environment and time range, then search by request ID or error category.

Each contact log contains only `requestId`, `timestamp`, `success`, `resendEmailId`, and `errorCategory`. Categories distinguish validation, rate limiting, spam rejection, configuration, notification delivery, and visitor-confirmation delivery without exposing visitor identity or message content.

Observability path: **Vercel Dashboard > sinda_khenine_website > Observability > Vercel Functions**. Select `/api/contact` to review invocation count, error rate, duration, and outbound request behavior. Use the linked logs to investigate a specific failure.

## Resend email delivery

Dashboard path: **Resend Dashboard > Emails**. Open an email to inspect status changes such as queued, delivered, bounced, or complained. Use the Resend email ID from the Vercel contact log to correlate a founder notification with its Resend record.

Domain path: **Resend Dashboard > Domains > mail.sindakhenine.com**. Production sending is ready only when this page reports **Verified**.

The contact route sends the founder notification to `founder@skatalystai.com`, sets Reply-To to the visitor address, and then sends a separate confirmation to the visitor.

## Founder inbox

Inbox path: open the Gmail or Google Workspace mailbox for `founder@skatalystai.com`, then check **Inbox**, **Spam**, and any configured filters. Replying to a website inquiry should address the visitor because the notification uses their email as Reply-To.

If a Vercel log reports success but no inquiry is visible, look up its `resendEmailId` in Resend before resubmitting the form. A Resend delivered state confirms handoff to the recipient mail provider, while the inbox confirms that the message reached the expected mailbox view.
