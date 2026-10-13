# Deployment progress

Updated 13 October 2026.

## Completed

- Website fixes, contact details, policies, responsive layout and inquiry backend implemented and tested locally. See [audit resolution](AUDIT-RESOLUTION.md).
- Added **veenasolar.com** to the existing Cloudflare account and selected the Free plan.
- Reviewed the five scanned DNS records. Kept the parking records during setup and set `_domainconnect` to DNS-only.
- Cloudflare assigned **gabriel.ns.cloudflare.com** and **sneh.ns.cloudflare.com**. The owner saved these at GoDaddy; public DNS now returns both Cloudflare nameservers.
- Created D1 **veena-leads** in APAC, ID **282431fe-335c-4c70-b5b0-e9d8d4ecd831**.
- Applied `0001_leads.sql` remotely and connected the public database ID in `wrangler.jsonc`.
- Pushed the tested website changes to **codex/website-fixes-cloudflare**, commit **f04d244**.
- The owner connected GitHub access for **Veena-Enterprises** to Cloudflare Pages.
- Created Pages project **veena-solar** with the fixed branch, `npm run build:production` and output `out`.
- Created a managed Turnstile widget for apex and www. Public site key: **0x4AAAAAAFVt14cONETwIbpS**. The secret remains outside Git.
- The owner chose **free Cloudflare Email Routing** instead of paid Google Workspace, forwarding **info@veenasolar.com** to **shubhamsharma173@gmail.com**. Cloudflare recognises the destination as verified; routing DNS has been installed.
- The corrected Pages build **cdc3189** succeeded (deployment **56ab99bd-640f-4122-8cb9-59da795f7244**).
- **veenasolar.com** and **www.veenasolar.com** are active with SSL enabled.
- The **info@veenasolar.com → shubhamsharma173@gmail.com** forwarding rule is active. Catch-all remains disabled.
- **TURNSTILE_SECRET_KEY** and **RATE_LIMIT_SECRET** are saved as encrypted production secrets. Deployment **34668980-47e8-4e06-8e14-6f5d693534b1**, commit **fce9750**, succeeded after those settings were saved.
- Preview configuration explicitly has no D1 binding and no allowed form origins.
- Live smoke checks passed: 12 public routes, 23 linked assets, correct contact details, security headers, the 404 page, and GET `/api/contact` returning 405.
- The owner approved the live verification and form submission. Test **b8c8d1cb** was accepted by the website and independently confirmed in production D1 on 13 October 2026 at 21:46 IST. Its lead status is `new`; notification status is `unconfigured` because the Resend key has not yet been added.
- The owner created the Resend account and approved DNS authentication and a restricted sending key. Resend has verified `notify.veenasolar.com` in the Tokyo region. Added its TXT DKIM record and the DNS-only CNAME records `rsend.notify` and `send.notify`, preserving Cloudflare's incoming-mail records.
- Created **Veena Solar production inquiries**, a sending-only Resend API key restricted to `notify.veenasolar.com`, and saved it as the encrypted production secret **RESEND_API_KEY** in Pages. The key is outside Git.
- A Cloudflare redirect rule sends both HTTP and HTTPS `www.veenasolar.com` requests to `https://veenasolar.com` with status 308, preserving paths and query strings. Both variants were tested. HTTP apex also redirects to HTTPS.

## Pending

- Live inbox receipt test for the configured email forwarding.
- Deploy after the new Resend secret so the production function uses it.
- Repeat the labelled production form test after notification setup and confirm inbox delivery. Production form submission and D1 storage have passed; notification delivery has not yet been tested.

The website is deployed at **https://veenasolar.com** and the form saves inquiries in D1. Form notification delivery and email forwarding still need their final live tests. Google Workspace signup has been cancelled as a setup plan; no paid subscription was purchased by the agent. Email forwarding is incoming-only; Gmail replies use the Gmail address. The latest CLI D1 read returned an authorization error; database verification succeeded through the Cloudflare dashboard instead. Hosting uses the owner's approved GitHub integration.

## DNS snapshot before migration

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 13.248.243.5 |
| A | @ | 76.223.105.230 |
| CNAME | www | veenasolar.com |
| CNAME | _domainconnect | _domainconnect.gd.domaincontrol.com |
| TXT | _dmarc | v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net; |

Former registrar nameservers: `ns13.domaincontrol.com` and `ns14.domaincontrol.com`. Current nameservers are `gabriel.ns.cloudflare.com` and `sneh.ns.cloudflare.com`.

The imported GoDaddy DMARC record should be reviewed when the notification sender is configured. Its reporting address belongs to GoDaddy. Authenticate the legitimate sender with the provider's exact DNS records and verify alignment before changing the DMARC policy.

Keep passwords and API secrets outside Git. This file contains only public configuration identifiers and DNS records.
