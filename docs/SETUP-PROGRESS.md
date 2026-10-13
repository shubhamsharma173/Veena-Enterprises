# Deployment progress

Updated 13 October 2026.

## Completed

- Website fixes, contact details, policies, responsive layout and inquiry backend implemented and tested locally. See [audit resolution](AUDIT-RESOLUTION.md).
- Added **veenasolar.com** to the existing Cloudflare account and selected the Free plan.
- Reviewed the five scanned DNS records. Kept the parking records during setup and set `_domainconnect` to DNS-only.
- Cloudflare assigned **gabriel.ns.cloudflare.com** and **sneh.ns.cloudflare.com**. The GoDaddy delegation has not yet been changed.
- Created D1 **veena-leads** in APAC, ID **282431fe-335c-4c70-b5b0-e9d8d4ecd831**.
- Applied `0001_leads.sql` remotely and connected the public database ID in `wrangler.jsonc`.

## Pending

- GoDaddy sign-in, DNSSEC check and nameserver update; Cloudflare zone activation.
- Google Workspace signup, mailbox password and subscription selection for **info@veenasolar.com**.
- Google ownership TXT, MX, SPF, DKIM and DMARC configuration and mail tests.
- Real Turnstile widget, notification sender and runtime secrets.
- Push the website branch, connect a Pages project, build and deploy.
- Custom domains, HTTPS and a production inquiry test confirming both D1 storage and inbox delivery.

The website and mailbox are **not yet live**. The Cloudflare CLI currently has D1 access but lacks Pages deployment permission; use an appropriately authorized deployment connection.

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
