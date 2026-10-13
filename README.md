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
- `wrangler.jsonc`: Pages configuration; replace the local placeholder database ID before deployment.

## Launch and operation

Read [deployment and email setup](docs/DEPLOYMENT.md), [lead management](docs/LEAD-OPERATIONS.md), [business improvements](docs/BUSINESS-IMPROVEMENTS.md) and [audit resolution](docs/AUDIT-RESOLUTION.md).

The implementation is local. No GitHub push, Cloudflare deployment, DNS change, mailbox purchase or live email test has been performed. The owner confirmed **veenasolar.com** and selected **Google Workspace (Gmail)** on 13 October 2026. Start with the [guided setup checklist](docs/SETUP-CHECKLIST.md). Customer figures and the supplied Jaipur address need owner verification before launch.
