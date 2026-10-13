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
- **TURNSTILE_SECRET_KEY** and **RATE_LIMIT_SECRET** are saved as encrypted production secrets. A redeployment applies the new runtime settings.

## Pending

- Live inbox receipt test for the configured email forwarding.
- Notification sender and encrypted runtime secrets.
- The first Pages build failure was fixed by moving public build variables into `wrangler.jsonc` and pinning Node 24 in `.node-version`. The subsequent build succeeded.
- Preview configuration explicitly has no D1 binding and no allowed form origins.
- Custom domains, HTTPS and a production inquiry test confirming both D1 storage and inbox delivery.

The static website is deployed at **https://veenasolar.com**. Form notification delivery and email forwarding still need their final live tests. Google Workspace signup has been cancelled as a setup plan; no paid subscription was purchased by the agent. Email forwarding is incoming-only; Gmail replies use the Gmail address. The Cloudflare CLI currently has D1 access but lacks Pages deployment permission; hosting uses the owner's approved GitHub integration.

## DNS snapshot before migration

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 13.248.243.5 |
| A | @ | 76.223.105.230 |
| CNAME | www | veenasolar.com |
| CNAME | _domainconnect | _domainconnect.gd.domaincontrol.com |
| TXT | _dmarc | v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net; |

Current registrar nameservers: `ns13.domaincontrol.com` and `ns14.domaincontrol.com`.

The imported GoDaddy DMARC record must be reviewed during Gmail setup. Its reporting address belongs to GoDaddy, and quarantine should not be retained blindly before legitimate sending has been authenticated.

Keep passwords and API secrets outside Git. This file contains only public configuration identifiers and DNS records.
