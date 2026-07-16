# Email implementation report

## Works now

The contact form has accessible idle, submitting, success, validation-error, and server-error states. The server validates and sanitizes fields, applies limits, checks a honeypot and minimum completion time, rate limits repeated requests, fixes the recipient, sends the founder notification with visitor Reply-To, then sends the visitor confirmation through Resend.

Automated tests use mocked clients. No real email was sent during implementation.

## Disabled

Updates signup is publicly disabled. The UI, consent wording, API boundary, signed-token helpers, store interface, and confirmation tests are prepared. Double opt-in is not complete because this project has no durable database or token store. No contact is added to Resend Contacts, the updates segment, or the Topic yet.

## Configuration state

Required values are listed in `.env.example`. Their production values have not been verified. The sending-domain verification status is unknown. A genuine Resend delivery test is still required before claiming production email works.

## Local test and production activation

Follow `EMAIL-SETUP-GUIDE.md` exactly. Contact delivery requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. Subscription additionally requires the site URL, segment ID, Topic ID, token secret, and a durable `SubscriptionStore` implementation.
