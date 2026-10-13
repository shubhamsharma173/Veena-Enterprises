# Customer inquiries: storage and follow-up

## How it works

```mermaid
flowchart LR
  Customer[Customer submits form] --> API[Pages Function: validate and check spam]
  API --> DB[(D1: permanent lead record)]
  DB --> Confirmation[Customer sees saved confirmation]
  DB --> Resend[Resend notification]
  Resend --> Inbox[info@veenasolar.com mailbox]
```

D1 is the source of truth. Email is a notification, so an email outage does not erase the customer's inquiry. Failed database writes do not show a success message.

The form stores name, normalized Indian mobile number, message, submission time, consent version, a random reference, workflow status and notification status. It does not collect customer email, payment details or documents. Inquiry fields are sent with POST, not in the URL. No public lead-list or admin API is exposed.

Protection includes server validation, bounded request size, a honeypot, exact-origin checks, Turnstile validation and a five-attempts-per-network-per-ten-minute rate limit. Network identifiers are keyed hashes in a separate expiring table; raw IP addresses are not stored in lead records. Cleanup runs with successful submissions; run the cleanup query below during routine maintenance too.

## Your daily workflow

1. Open the notification in the **info@veenasolar.com** mailbox.
2. Call the customer during Monday–Friday, 9am–6pm IST; record agreed follow-up.
3. Check the authenticated **Cloudflare dashboard → D1 → veena-leads → Console** for new leads and missed notifications.
4. Update the status: **new → contacted → quoted → won / closed**.
5. Restrict D1 access to staff who need it. Use MFA. Do not share database tokens or export links publicly.

D1 is storage, not a complete CRM. Email plus the authenticated console is the initial workflow. A staff dashboard with login, assignment and reminders is the next improvement when several people handle leads.

List recent inquiries:

```sql
SELECT id, created_at, name, phone, message, status, notification_status
FROM leads ORDER BY created_at DESC LIMIT 50;
```

Update a chosen lead only after confirming its full ID:

```sql
UPDATE leads SET status = 'contacted' WHERE id = 'COPY_THE_FULL_LEAD_ID';
```

## Notification failures

Check:

```sql
SELECT id, created_at, name, phone, notification_status
FROM leads
WHERE notification_status IN ('pending', 'failed', 'unconfigured')
ORDER BY created_at;
```

- **pending:** saved; notification has not finished, or the background task was interrupted.
- **unconfigured:** sender, recipient or API key is missing.
- **failed:** sending or recording the provider response failed.
- **sent:** the provider accepted the email. This does not prove inbox delivery; inspect delivery/bounce status in Resend.

The initial implementation does not run an automatic retry scheduler. After fixing sending configuration, an authorized operator can run `node scripts/retry-notifications.mjs` with these variables set privately in their shell:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_DATABASE_ID
CLOUDFLARE_API_TOKEN
RESEND_API_KEY
LEAD_FROM_EMAIL
LEAD_NOTIFY_EMAIL
```

The Cloudflare token needs D1 query/write access limited as tightly as the account permits. This tool actually sends email to the configured recipient: review the account, database and recipient first. Run one copy at a time. It processes up to 20 unresolved notifications older than five minutes. Review statuses afterward and rerun for the next batch.

Retries use the same Resend idempotency key. Resend's deduplication window is finite; after that window, an earlier send whose confirmation was lost can produce another notification. The D1 inquiry itself remains a single row. See [Resend idempotency](https://resend.com/changelog/idempotency-keys).

## Retention, exports and recovery

Choose and document an inquiry retention period before launch. A practical starting proposal is reviewing closed or unresponsive inquiries after 12 months, retaining only what the business still needs. This is a proposal, not an automatic deletion policy or legal retention rule. Align the privacy notice and mailbox retention with the final decision.

For an access, correction or deletion request, verify the requester appropriately, locate the inquiry in D1 and check matching mailbox copies and backups. Customer contracts and invoices need a separate records policy.

Clean expired anti-abuse entries:

```sql
DELETE FROM contact_rate_limits WHERE expires_at < unixepoch();
```

Use D1 dashboard tools or authenticated Wrangler for exports and recovery. Keep exports in restricted storage outside the repository, never under public/ or out/. If opening user-entered text in spreadsheets, import columns as text to prevent formula interpretation. A database export contains personal data, so protect it like the live database.

Schedule regular backups and practice recovery before relying on them. D1's [Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/) availability depends on the plan. No recurring backup or notification job has been created by this task.
