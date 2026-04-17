# Christopher Kisa Ebenezer — Academic personal site

Production-ready personal site for a university lecturer, built with **Next.js (App Router + React Server Components)**, **TypeScript**, **Tailwind CSS**, and **Cloudflare Turnstile** on the contact form.

## Features

- Home, About, Publications, Teaching, Blog, and Contact pages
- Dynamic filtering for publications and blog content
- Contact form with server-side validation and Turnstile verification
- Optional email delivery via Resend API
- Quick connect links: direct email, GitHub, and downloadable contact card (`.vcf`)

## Contact integration

The contact form is implemented in `src/actions/contact.ts`.

### Required for bot protection

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

### Optional for real email delivery

- `RESEND_API_KEY`
- `CONTACT_EMAIL_TO` (defaults to `siteConfig.email`)
- `CONTACT_EMAIL_FROM` (defaults to `website@resend.dev`)

If Resend variables are not set, the form still validates and returns a success response, but no outbound email is sent.

## Contact card download

`GET /api/contact.vcf` returns a downloadable vCard file generated from `src/lib/site.ts`.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env template:

   ```bash
   cp .env.example .env.local
   ```

3. Start dev server:

   ```bash
   npm run dev
   ```

## Deploy to Cloudflare Pages

Use Cloudflare Pages with Git integration for the smoothest deploy path.

- Build command: `npm run pages:build`
- Build output directory: `.vercel/output/static`
- Node.js version: `24`

Set these environment variables in Cloudflare Pages:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY` (optional)
- `CONTACT_EMAIL_TO` (optional)
- `CONTACT_EMAIL_FROM` (optional)

### Windows note

`npm run pages:build` uses `@cloudflare/next-on-pages`, which requires `bash` locally.
If you are on Windows, use one of the following:

- Deploy through Cloudflare Pages Git integration (recommended), or
- Install Git Bash / WSL for local `pages:build`.

## Deploy to Cloudflare Workers (OpenNext)

If you want a Workers-hosted site (`*.workers.dev`), use:

- `npm run cf:build`
- `npm run cf:deploy`

Or run both in one command:

- `npm run deploy`

In Cloudflare Workers CI, set deploy command to:

- `npm run deploy`

## Content customization

- Profile and social links: `src/lib/site.ts`
- Contact form behavior: `src/actions/contact.ts`
- Contact page UI: `src/app/contact/page.tsx`
