# Veena Enterprises — Solar Services Website

A responsive website presenting solar installation, inverter and battery,
maintenance, and subsidy-assistance services in Jaipur. Built with Next.js
App Router, TypeScript and Tailwind CSS, it brings the service catalogue,
business information and enquiry interface into a single page.

**[View the live site](https://veena-enterprises.vercel.app)** ·
[Page composition](./app/page.tsx) ·
[UI components](./app/components/) ·
[Current limitations](#current-limitations)

**Scope:** the service sections and interactive navigation are implemented. The
enquiry form is currently UI only and **does not deliver enquiries to the business**.

## Implemented features

- Responsive service, benefits and contact sections with a mobile navigation
  menu and section links.
- Reusable React components for the header, hero, services, benefits, contact
  area and footer.
- Policy dialogs that load text from local static files.
- Next.js metadata configuration, LocalBusiness structured data, and generated
  `robots.txt` and sitemap routes.
- Tailwind brand colours, Lucide icons, Inter via `next/font`, and web-app
  manifest/icon assets.
- Response headers for frame protection, content-type handling and referrer
  policy in `next.config.js`.

## Architecture

| Location | Responsibility |
| --- | --- |
| [app/page.tsx](./app/page.tsx) | Composes the landing-page sections |
| [app/components/](./app/components/) | Section UI, mobile menu and policy dialogs |
| [app/layout.tsx](./app/layout.tsx) | Root layout, font, metadata and structured data |
| [app/globals.css](./app/globals.css), [tailwind.config.js](./tailwind.config.js) | Shared styles and brand palette |
| [app/robots.ts](./app/robots.ts), [app/sitemap.ts](./app/sitemap.ts) | Search-engine metadata routes |
| [public/](./public/) | Icons, manifest and policy text |

Most sections use the App Router's default server-component model. Client
components handle the menu, policy dialogs and favicon behavior. Content is
stored in the repository; there is no CMS, database, authentication or enquiry
API. This keeps the current site easy to deploy, while content changes require
a code update and enquiry delivery still needs implementation.

## Run locally

Prerequisites: Git, Node.js and npm. The committed Next.js version is 14.0.4;
choose a compatible, supported Node.js release. Dependencies are recorded in
[package-lock.json](./package-lock.json).

```sh
git clone https://github.com/shubhamsharma173/Veena-Enterprises.git
cd Veena-Enterprises
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The current application
does not read environment variables, so no `.env.local` is required.
`next/font/google` fetches Inter during development/build, so font retrieval
requires network access.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve an existing production build |
| `npm run lint` | Run `next lint`; no ESLint configuration is committed, so the first run may prompt for setup |

To preview a production build locally:

```sh
npm run build
npm start
```

## Verification

No automated tests or CI workflow are committed. The commands above describe
the project's scripts; this README does not claim a passing build, test suite,
accessibility audit or performance score.

Before deployment, verify the production build, mobile menu, section links,
policy dialogs, keyboard navigation and narrow-screen layout. Validate metadata
against the actual deployment domain and routes. Add a form-delivery test when
the enquiry backend is implemented.

## Current limitations

- **Enquiry delivery:** the form has no submission handler or backend. Do not
  use it to collect real enquiries until delivery, validation and feedback
  states are implemented.
- **Metadata:** the configuration still uses `veenaenterprises.com`, a
  placeholder Google verification value and a missing `/og-image.jpg`. The
  sitemap lists `/services`, `/contact` and `/about`, but no corresponding
  page routes exist; the site currently uses home-page section links.
- **PWA scope:** a manifest is present, but no service worker or offline
  behavior is implemented.
- **Maintenance:** dependency updates, repeatable lint configuration, automated
  checks and measured accessibility/performance results remain follow-up work.

## Customization and deployment

Update section content in `app/components/`, colours in `tailwind.config.js`,
and policy text in `public/policies/`. Keep metadata, structured data, sitemap
and robots configuration aligned with the real public domain and routes.

The live site is hosted on Vercel. For another deployment, import the repository
as a Next.js project, use the committed lockfile and the `npm run build` script,
then verify the generated site and metadata. The current code requires no
application secrets.

## License

No repository license has been declared in a `LICENSE` file. This README does
not grant a software or business-asset reuse license.
