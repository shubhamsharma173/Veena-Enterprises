# Hosting and domain email plan

Updated 13 October 2026. Confirmed domain: **veenasolar.com**. The owner selected **Google Workspace (Gmail)** and confirmed that the domain is unused. GoDaddy remains the registrar; renew the domain there. Begin with the [guided setup checklist](SETUP-CHECKLIST.md).

## Recommended services

| Purpose                           | Service                                           | Reason                                                         |
| --------------------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| Domain registration               | Existing GoDaddy account                          | No domain transfer needed                                      |
| DNS, HTTPS and static website     | Cloudflare DNS + Pages                            | Matches the requested hosting platform                         |
| Inquiry API and permanent records | Pages Function + Cloudflare D1                    | Leads survive an email outage                                  |
| Spam protection                   | Cloudflare Turnstile + application rate limit     | Checks submissions on the server                               |
| Automated inquiry notifications   | Resend                                            | Implemented server-side adapter with delivery status tracking  |
| Staff mailbox                     | Google Workspace (Gmail)                          | A real inbox for receiving and replying as info@veenasolar.com |

Choose a Google Workspace plan after checking current India pricing, storage and user limits. No paid plan has been purchased. [Google Workspace offers business Gmail](https://workspace.google.com/products/gmail/). The [Google Workspace setup guide](GOOGLE-WORKSPACE.md) contains the exact DNS steps.

Cloudflare email routing is useful for forwarding, but a forwarding address alone is not a staff mailbox. Cloudflare now also documents a sending service in beta; that is distinct from a complete hosted inbox. This implementation uses Resend for automated notifications. [Cloudflare Email Service](https://developers.cloudflare.com/email-service/).

## 1. Prepare the domain and accounts

1. The domain is confirmed. Verify the business address and the existing 500+/1K+/5+ claims before launch.
2. Create the Cloudflare, Google Workspace and Resend accounts as needed.
3. Inventory existing GoDaddy DNS records. Preserve working MX, TXT, verification and other service records when moving DNS.
4. Add the domain as a Cloudflare zone. Follow Cloudflare's DNSSEC migration instructions if DNSSEC is already enabled; an old DS record must not point at the wrong DNS provider.
5. In GoDaddy, change the domain's nameservers to the **two assigned by Cloudflare**. Continue paying for registration at GoDaddy; manage DNS at Cloudflare after activation.

The apex domain needs a Cloudflare zone for Pages. See [Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Cloudflare nameserver setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) and [GoDaddy nameserver instructions](https://www.godaddy.com/help/change-my-domain-nameservers-664). No nameserver changes have been made.

## 2. Set up the mailbox

1. Create **info@veenasolar.com** in Google Workspace using the [mailbox setup guide](GOOGLE-WORKSPACE.md).
2. Add its domain-verification TXT record in Cloudflare DNS.
3. Add the provider's exact MX records and priorities. Use the records shown in your own account and region.
4. Configure the provider's SPF and DKIM records. Use one valid SPF record per hostname, combining authorized senders when needed.
5. Configure DMARC, initially monitoring until legitimate senders pass authentication, then strengthen the policy.
6. Test inbound email from another provider, outbound messages, and replies. Check spam folders and authentication results.

Do not mix competing inbound MX providers on the same hostname. Mail-related CNAME records must be DNS-only where the provider requires it. Protect the mailbox with MFA.

## 3. Prepare notification sending

In Resend, verify **notify.veenasolar.com**, then add the exact DNS records it provides. Keeping this sender subdomain separate avoids replacing the main mailbox's MX records. The configured sender is:

```text
Veena Solar <leads@notify.veenasolar.com>
```

Notifications go to **info@veenasolar.com**. Resend sends notifications; staff read them in their chosen mailbox. The form currently collects a phone number, so staff call the customer instead of using email reply-to.

See [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction) and [send-email API](https://resend.com/docs/api-reference/emails/send-email). Store the API key in Cloudflare secrets, never in public frontend variables.

## 4. Create D1 and apply the schema

Already completed for this deployment: **veena-leads**, ID **282431fe-335c-4c70-b5b0-e9d8d4ecd831**, created in APAC and migrated on 13 October 2026. `wrangler.jsonc` contains the real ID. Do not create a duplicate. The commands below describe setup for a new environment.

From the repository root, after authenticating Wrangler with the correct account:

```powershell
npx wrangler d1 create veena-leads
```

Replace the all-zero `database_id` in `wrangler.jsonc` with the returned ID. Keep the binding name **DB**.

```powershell
npx wrangler d1 migrations apply veena-leads --remote
```

Review the target account and database before applying. The migration creates `leads` and `contact_rate_limits`.

D1 location hints are not a promise of India-only storage. Select an appropriate supported location and review [D1 data location](https://developers.cloudflare.com/d1/configuration/data-location/) against your needs before collecting customer data. Use a separate D1 database and separate credentials for cloud previews.

## 5. Configure Turnstile and Pages

Create a Turnstile widget for **veenasolar.com** and **www.veenasolar.com**. Use real keys in production. The server verifies token success, hostname and action; it rejects missing configuration. [Server verification is required](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

| Variable / binding             | Where                        | Value                                             |
| ------------------------------ | ---------------------------- | ------------------------------------------------- |
| NODE_VERSION                   | Pages build environment      | 24                                                |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Build environment            | Real public widget key                            |
| DB                             | D1 binding / Wrangler config | Production veena-leads database                   |
| TURNSTILE_SECRET_KEY           | Encrypted runtime secret     | Widget secret                                     |
| RATE_LIMIT_SECRET              | Encrypted runtime secret     | Random long secret, at least 32 bytes             |
| RESEND_API_KEY                 | Encrypted runtime secret     | Restricted sending API key                        |
| LEAD_NOTIFY_EMAIL              | Runtime variable             | info@veenasolar.com                               |
| LEAD_FROM_EMAIL                | Runtime variable             | Veena Solar <leads@notify.veenasolar.com>         |
| ALLOWED_ORIGINS                | Runtime variable             | https://veenasolar.com,https://www.veenasolar.com |

Do **not** configure `LOCAL_DEV` in production or previews. Cloud previews require real Turnstile keys allowed for their exact hostnames, their own DB and an exact origin allowlist. Avoid broad wildcard origins.

Connect the GitHub repository to a **Pages** project after reviewing and pushing these changes. Select the intended production branch; the current local branch is `codex/website-fixes-cloudflare`, based on `version2`.

| Build setting       | Value                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| Repository root     | Root of Veena-Enterprises (not the local wrapper folder named source) |
| Build command       | npm run build:production                                              |
| Output directory    | out                                                                   |
| Framework           | Next.js Static HTML Export, or configure explicitly                   |
| Functions directory | functions, at repository root                                         |

This site uses a static Next export plus a separate Pages Function. It does not require a Next server or SSR adapter. See [Cloudflare's static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/). Use Git integration or Wrangler deployment for Functions, not a dashboard upload of only the static out folder.

## 6. Connect and launch

1. In **Pages → Custom domains**, associate the apex domain and www before adding/changing their records.
2. Wait for both hostnames and HTTPS certificates to activate.
3. Redirect www to https://veenasolar.com, preserving path and query. Configure HTTPS enforcement and test without redirect loops.
4. Protect preview deployments and redirect the production pages.dev address to the canonical custom domain when ready.
5. Submit a clearly labelled launch test with the owner's approval. Confirm the D1 row, notification email, spam folder, phone link and form success state.
6. Test actual Turnstile on desktop and a phone. The local preview skips it; a live production check remains necessary.
7. Test privacy/terms, missing-page 404, icons, social preview, sitemap, robots and mobile navigation.
8. Add the actual Search Console verification and submit the sitemap. No placeholder verification token is shipped.
9. Check quotas, billing notifications and logs. Start with the smallest suitable plans, then monitor actual D1, Functions and sending usage.

Keep secrets in the dashboards or a secret manager. The build gate checks the public site key and real D1 ID; runtime secrets and DNS still require the launch checks above.

## Operations and rollback

Use [the lead runbook](LEAD-OPERATIONS.md) daily. Keep account ownership and recovery access with the business. Test a database backup and restore process; D1 Time Travel is limited by plan and is not a permanent archive. [D1 backups](https://developers.cloudflare.com/d1/reference/time-travel/).

A Pages deployment rollback restores website code, not database contents or DNS. Keep migrations additive and preserve the database when rolling back a site release. Keep a copy of pre-migration DNS records until website and mailbox delivery have both been verified.
