# Veena Enterprises Solar Services

Next.js 16 static website, Cloudflare Pages Functions and D1 inquiry storage. The layout follows the supplied design reference and adapts to phones and tablets.

Business contact: **+91 82332 61929** · **info@veenasolar.com**.
Hours: **Monday–Friday, 9am–6pm IST**.

## Run locally

Use Node.js 24 or newer.

```powershell
npm ci
Copy-Item .dev.vars.example .dev.vars
npm run db:local
npm run build
npm start
```

Open http://127.0.0.1:3000. This runs the exported site and its real Pages Function against **local** D1. The loopback-only development setting skips Turnstile, and no email is sent without credentials. Local data stays in the ignored `.wrangler` directory. Never put `LOCAL_DEV` in a cloud environment.

`npm run dev` gives a faster frontend-only Next preview. Its contact API is not available; use the full preview above to test submissions.

## Checks

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

Tests use SQLite and mocked network calls; they do not contact customers or email providers.

## Project map

- `app/components/`: sections, responsive images, menu, carousel and inquiry form.
- `app/globals.css`: shared layout, responsive breakpoints and reduced-motion styles.
- `lib/business.ts`: business identity and canonical domain.
- `lib/contact-handler.mjs`: validated inquiry endpoint and notification handling.
- `functions/api/contact.ts`: Cloudflare Pages route.
- `migrations/`: D1 schema, indexes and lead workflow status.
- `scripts/build-assets.mjs`: responsive WebP photos, icons and social preview.
- `wrangler.jsonc`: Pages configuration with the real production D1 ID, public Turnstile key and isolated preview settings.

## Launch and operation

Read [deployment and email setup](docs/DEPLOYMENT.md), [lead management](docs/LEAD-OPERATIONS.md), [business improvements](docs/BUSINESS-IMPROVEMENTS.md) and [audit resolution](docs/AUDIT-RESOLUTION.md).

The website is live at **https://veenasolar.com** on Cloudflare Pages. GoDaddy nameservers point to Cloudflare. The inquiry form saves to production D1 and sends Resend notifications to **info@veenasolar.com**, which forwards to **shubhamsharma173@gmail.com**. A labelled live test passed storage, provider delivery and Cloudflare forwarding, with SPF, DKIM and DMARC passing; the owner confirmed arrival in the Gmail inbox. See [current setup progress](docs/SETUP-PROGRESS.md) for verification evidence, and [email forwarding](docs/EMAIL-FORWARDING.md) for the mailbox workflow. This free incoming-forwarding setup replaces the original paid Workspace plan; replies use the Gmail address. Customer figures and the supplied Jaipur address need owner verification before promotion.
