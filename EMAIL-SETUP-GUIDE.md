# Email setup guide

## Resend account

1. Create or reuse the Resend account that will send mail for Sinda Khenine.
2. Add the sending domain in Resend, then publish the exact SPF, DKIM, and verification DNS records shown by Resend.
3. Wait until Resend reports the domain as verified. Do not use `founder@skatalystai.com` as a production sender before verification.
4. Create a segment named `Sinda Website Updates`.
5. Create a public Topic for occasional website updates with explicit opt-in behavior.
6. Copy the segment and Topic IDs into the matching environment variables.

## Environment

Copy `.env.example` to `.env.local` and add server-side values. Never prefix the API key or token secret with `NEXT_PUBLIC_`.

`SUBSCRIPTION_TOKEN_SECRET` must be a randomly generated secret of at least 32 bytes. A durable database must store a hashed token identifier, normalized email, optional first name, expiry time, confirmation time, and single-use state before subscription can be enabled.

## Local and preview testing

1. Use a Resend test key or restricted test environment.
2. Run `npm run dev` and submit `/contact` with an address you control.
3. Confirm both the founder notification and visitor confirmation arrive.
4. Confirm Reply-To targets the visitor.
5. Test invalid input, the honeypot, throttling, and a simulated Resend failure.
6. Repeat in preview with preview-only environment variables and approved recipient addresses.

## Production activation

1. Complete legal review of the privacy wording.
2. Verify the sending domain and run a genuine Resend delivery test.
3. Configure a durable token store and implement its `SubscriptionStore` adapter.
4. Enable the subscribe and confirmation routes only after expired, invalid, and reused tokens are verified against that store.
5. Confirm the segment, Topic, consent text, unsubscribe page, rate limits, and production site URL.
6. Replace the disabled updates UI only after the complete double opt-in flow passes preview testing.

The built-in contact limiter is suitable for a single local process and basic preview testing. Production should use a provider-compatible shared rate limiter so limits remain consistent across server instances.
