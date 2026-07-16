# Email privacy notes

The contact flow collects name, email, subject, message, submission time, and source page. Resend is the email processor. Logs record delivery codes and time, not message bodies or full email addresses.

The updates flow must store only normalized email, optional first name, consent time, token hash or identifier, expiry, and confirmation state. It remains disabled until durable storage exists. In-memory production tokens are prohibited.

Before production, legal review must confirm controller details, lawful basis, retention periods, international transfers, data-subject rights, and the final privacy notice. Future Broadcasts must include Resend preference and unsubscribe functionality.
