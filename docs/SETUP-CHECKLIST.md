# Guided launch checklist: veenasolar.com

Updated 13 October 2026. Cloudflare setup is in progress and the first production build succeeded. The owner chose free email forwarding instead of paid Google Workspace. See [current setup progress](SETUP-PROGRESS.md) before repeating any creation steps below.

## Stage 1 — Cloudflare DNS

1. Create a [Cloudflare account](https://dash.cloudflare.com/sign-up) using an email address you already receive, and verify it.
2. Add **veenasolar.com** as a domain and choose the Free website/DNS plan for this initial setup.
3. Review the imported records against GoDaddy's DNS list. Keep them while setting up the zone. We will replace only the website parking records when connecting Pages.
4. Cloudflare will assign two nameservers. Copy those exact values; they are account-specific.
5. In GoDaddy, open **Domain Portfolio → veenasolar.com → DNS → Nameservers → Change nameservers**. Choose your own nameservers and replace the GoDaddy pair with Cloudflare's assigned pair.
6. Complete GoDaddy's save/verification steps. Return to Cloudflare and check for **Active** status. If DNSSEC is already enabled, follow Cloudflare's migration instructions before changing delegation.

Read-only DNS check on 13 October showed `ns13.domaincontrol.com` and `ns14.domaincontrol.com`, with no published MX or root TXT answers. This snapshot is not a substitute for reviewing the dashboard immediately before changes.

GoDaddy continues to handle domain ownership and renewal. Cloudflare becomes the DNS provider. [Cloudflare setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) · [GoDaddy nameserver instructions](https://www.godaddy.com/help/change-my-domain-nameservers-664).

Checkpoint: **Cloudflare says Active.**

## Stage 2 — Free incoming email forwarding

Follow [EMAIL-FORWARDING.md](EMAIL-FORWARDING.md): activate Cloudflare Email Routing and route info@veenasolar.com to shubhamsharma173@gmail.com. Use the existing Gmail inbox. Google Workspace is an optional paid upgrade, not part of this launch.

Checkpoint: **Mail addressed to info@veenasolar.com arrives in the selected Gmail inbox.**

## Stage 3 — Prepare Cloudflare Pages and the form

1. In Cloudflare, create a D1 database named **veena-leads**. Copy its database ID. That ID is a public configuration identifier, not an API secret.
2. Replace the all-zero ID in `wrangler.jsonc`. Apply `migrations/0001_leads.sql` through authenticated Wrangler using `npx wrangler d1 migrations apply veena-leads --remote` after confirming the target account.
3. Create a managed Turnstile widget for **veenasolar.com** and **www.veenasolar.com**. Keep its secret private; the site key is public. [Widget instructions](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/).
4. Create the Resend account, verify **notify.veenasolar.com** and add its exact DNS records without replacing Google's root MX. Create a restricted sending API key.
5. Update the local production configuration and run the checks. Commit and push the reviewed changes to GitHub. The fixes are currently on **codex/website-fixes-cloudflare**; the remote version2 branch does not contain them yet.
6. Create **Workers & Pages → Create application → Pages → Connect to Git**. Authorize only the needed GitHub repository and select **shubhamsharma173/Veena-Enterprises**. [Cloudflare Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/).

Use these settings:

| Setting | Value |
| --- | --- |
| Project name | veena-solar, if available |
| Production branch | The branch containing the reviewed fixes and real D1 ID |
| Root directory | Leave empty: the GitHub repository root contains package.json |
| Framework preset | None, with explicit build settings, or Next.js Static HTML Export |
| Build command | npm run build:production |
| Output directory | out |
| Build variable NODE_VERSION | 24 |
| Build variable NEXT_PUBLIC_TURNSTILE_SITE_KEY | Your real public Turnstile key |

Use the production secret settings to add **TURNSTILE_SECRET_KEY**, **RATE_LIMIT_SECRET** and **RESEND_API_KEY**. Generate RATE_LIMIT_SECRET as a cryptographically random value of at least 32 bytes. The code already configures recipient, sender and allowed production origins in `wrangler.jsonc`. Verify the **DB** binding points at the intended D1 database. Do not set LOCAL_DEV in the cloud.

Runtime secrets may need to be added after the Pages project exists; redeploy after adding them. Until then the form fails safely. The initial pages.dev URL is for checking the static site: the form intentionally accepts only the configured custom-domain origins. Do not broaden the allowlist or reuse the production database for arbitrary previews.

Checkpoint: **Pages build succeeds; D1 migration and runtime secrets are configured.**

## Stage 4 — Connect the domain and test

1. In Pages **Custom domains**, add **veenasolar.com** and **www.veenasolar.com**. Let Cloudflare create the website records, replacing conflicting parking records for these names. Preserve Google mail and verification records.
2. Wait for active HTTPS. Redirect www to the apex domain while preserving paths and queries.
3. On https://veenasolar.com, complete a labelled test inquiry with Turnstile. Confirm the D1 row and the notification in the new Gmail inbox.
4. Test the phone/email links, mobile navigation, policy pages and an unknown URL returning 404.
5. Restrict preview deployments and review the customer statistics, address and image rights before promoting the site.

[Detailed deployment configuration](DEPLOYMENT.md) · [Daily lead workflow](LEAD-OPERATIONS.md).

Account signup, acceptance of provider terms, passwords and payment are completed by the owner. Share public DNS records, D1 IDs and Turnstile site keys for configuration help; enter API and Turnstile secrets directly in the provider's secret settings.
