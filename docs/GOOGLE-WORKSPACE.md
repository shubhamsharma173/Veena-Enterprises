# Set up info@veenasolar.com in Gmail

Selected by the owner on 13 October 2026. The domain is new and unused. Finish the Cloudflare nameserver setup in [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md) first, so all new DNS records go in one place.

## 1. Create the Workspace account

1. Open [Google Workspace](https://workspace.google.com/) and start signup for your business.
2. Enter your business details and an existing email address you can already access for recovery and setup messages.
3. Choose the option to use an existing domain and enter **veenasolar.com**. Do not buy another domain.
4. For a single dedicated mailbox, create the username **info**, giving **info@veenasolar.com**. Set the password yourself. If you prefer a named user with info as an alias, decide this before creating extra paid users; an alias is not a separate login or inbox.
5. Choose the smallest plan that meets your needs for custom business Gmail. Review the price, taxes, renewal terms and billing commitment on the checkout screen. The owner completes signup, terms and payment. [Current India plans](https://workspace.google.com/intl/en_in/pricing/).
6. Sign in to [Google Admin](https://admin.google.com/) with the new Workspace account and enable two-step verification. Keep recovery details with the business owner.

## 2. Verify ownership

Google will provide a unique TXT value beginning with `google-site-verification=`. Add it under **Cloudflare → veenasolar.com → DNS → Records → Add record**:

| Field | Enter |
| --- | --- |
| Type | TXT |
| Name | @ |
| Content | The exact complete value from Google |
| TTL | Auto |

Return to Google Admin and select **Verify**. After nameservers move, Cloudflare is the DNS host even though GoDaddy remains the registrar. Select Cloudflare/manual DNS setup if Google's wizard asks where to add the record. [Google verification instructions](https://knowledge.workspace.google.com/admin/domains/verify-your-domain-with-a-txt-record).

## 3. Deliver incoming mail to Gmail

After verification, add this record in Cloudflare:

| Type | Name | Mail server | Priority | TTL |
| --- | --- | --- | --- | --- |
| MX | @ | smtp.google.com | 1 | Auto |

This is Google's current single-record setup. Use the Google Admin wizard if it explicitly supplies different values. At this hostname, retain only the intended Google mail delivery records; do not enable Cloudflare Email Routing or add another provider's root MX records.

In Google Admin, use **Activate Gmail** for veenasolar.com, then sign in to [Gmail](https://mail.google.com/) as **info@veenasolar.com**. DNS recognition can take up to 72 hours. [Google MX instructions](https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace).

## 4. Authenticate outgoing messages

For Google Workspace as the only sender using the root domain's SPF identity, add:

| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| TXT | @ | v=spf1 include:_spf.google.com ~all | Auto |

Maintain one SPF record per hostname. The website notification sender will be verified separately on **notify.veenasolar.com**, using Resend's records at the exact hosts it specifies. Do not replace Google's root MX or add a second root SPF record. [Google SPF instructions](https://support.google.com/a/answer/33786?hl=en-eu).

For DKIM, open **Google Admin → Apps → Google Workspace → Gmail → Authenticate email**. Select veenasolar.com, generate a 2048-bit record and copy the exact TXT name and value to Cloudflare. The default name is usually `google._domainkey`. Return to Google and click **Start authentication**. Newly activated Gmail accounts may need 24–72 hours before key generation becomes available. [Google DKIM instructions](https://support.google.com/a/answer/174124?hl=en-IE).

After SPF and DKIM are working for at least 48 hours, add an initial DMARC monitoring policy. A basic record without a reporting destination is:

| Type | Name | Content |
| --- | --- | --- |
| TXT | _dmarc | v=DMARC1; p=none |

This does not request aggregate reports or enforce rejection. To monitor reports, first configure a receiving mailbox or reporting service, then add its `rua=mailto:...` value. Once all legitimate senders are verified, review reports and progressively move to quarantine/reject. Do not start with strict enforcement while sender setup is incomplete. [Google DMARC rollout](https://support.google.com/a/answer/10032473?hl=en-in).

## 5. Test the mailbox

1. From an existing personal email account, send a clearly labelled test to info@veenasolar.com.
2. Open it in the Workspace Gmail inbox and reply.
3. Confirm the reply reaches the original mailbox and displays info@veenasolar.com as sender.
4. In the receiving Gmail account, use **Show original** to inspect SPF, DKIM and DMARC results once authentication is configured.
5. Verify password recovery and two-step verification access. Do not share the mailbox password with website code.

Google Workspace provides the staff inbox. The website's existing Resend integration sends automated lead alerts into that inbox; it does not need your Gmail password. Continue with [DEPLOYMENT.md](DEPLOYMENT.md) to verify the notification sender and add the server secrets.
