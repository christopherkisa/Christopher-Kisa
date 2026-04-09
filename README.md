<<<<<<< HEAD
# Christopher Kisa Ebenezer — Academic personal site

Production-ready personal site for a university lecturer, built with **Next.js 15 (App Router + React Server Components)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui-style primitives**, **Framer Motion**, **MDX** (via `next-mdx-remote`), and **Cloudflare Turnstile** on the contact form. Deploys to **Cloudflare Pages** using **`@cloudflare/next-on-pages`**.

## Features

- **Home:** Parallax-style hero (scroll-linked motion), latest publications & blog preview, research highlights.
- **About:** Bio, education, experience timeline, animated skill bars.
- **Publications:** 15 sample records from `src/lib/publications-data.ts` with client **year / type / keyword** filters and sorting.
- **Teaching:** Course cards from `src/lib/courses-data.ts` with search, schedule/level filters, and sort.
- **Blog:** Six MDX posts in `src/content/blog/` with featured posts, categories, and client search/sort/filter.
- **Contact:** Server action + Turnstile verification (placeholder hook for Resend / Email Workers).
- **Theme:** Dark / light / system via `next-themes`.
- **SEO:** Metadata, Open Graph, Twitter cards, and JSON-LD `Person` schema.

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Local Next.js dev server |
| `npm run build` | Standard `next build` |
| `npm run pages:build` | Build for Cloudflare Pages (`@cloudflare/next-on-pages`) |
| `npm run pages:deploy` | Build + `wrangler pages deploy` to your Pages project |
| `npm run pages:dev` | After a Pages build, preview locally with Wrangler (see comment in `package.json`) |

## Local setup

1. **Install**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set at minimum:

   - `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000` while developing, or your real `https://….pages.dev` URL in production.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — public site key from Cloudflare Turnstile.
   - `TURNSTILE_SECRET_KEY` — server secret for `siteverify` (set as a **secret** in production, not exposed to the client).

   If `TURNSTILE_SECRET_KEY` is unset in **development**, the server action skips verification so you can work locally without keys.

3. **Run**

   ```bash
   npm run dev
   ```

## Cloudflare Turnstile

1. In the Cloudflare dashboard go to **Turnstile** and create a widget.
2. Choose **Managed** (recommended) or **Non-interactive** as needed.
3. Add the **site key** to `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
4. Add the **secret key** to `TURNSTILE_SECRET_KEY` (Cloudflare Pages → **Settings** → **Environment variables** — use **Encrypt** for the secret).

The contact form posts to the server action in `src/actions/contact.ts`, which calls Cloudflare’s `siteverify` endpoint.

## Deploy to Cloudflare Pages

### Dashboard (recommended)

1. Push this repository to GitHub/GitLab.
2. In **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Configure the project:
   - **Framework preset:** None / custom (or Next.js if your UI suggests it — the important part is the **build command** below).
   - **Build command:**  
     `npx @cloudflare/next-on-pages@1`
   - **Build output directory:**  
     `.vercel/output/static`
   - **Root directory:** repository root (or the subdirectory if the app lives in a monorepo folder).
4. Under **Environment variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://your-project.pages.dev` or custom domain).
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = Turnstile site key.
   - `TURNSTILE_SECRET_KEY` = Turnstile secret (**secret**/encrypted).
5. Deploy. After the first successful deploy, open the site and test the contact form with Turnstile enabled.

`wrangler.toml` in this repo documents `pages_build_output_dir = ".vercel/output/static"` for consistency with `next-on-pages`.

### CLI

With Wrangler authenticated (`wrangler login`):

```bash
npm run pages:build
npx wrangler pages deploy .vercel/output/static --project-name=your-project-name
```

Set the same environment variables for the **production** environment in the Pages project settings.

### Email from the contact form

`submitContact` currently validates Turnstile and returns a success message. To deliver mail:

- **Resend:** `fetch` to their API from the server action (store `RESEND_API_KEY` as a secret), or  
- **Cloudflare Email Workers / routing** as per your account setup.

Keep secrets only in the server environment on Pages.

## Content customization

- **Profile & links:** `src/lib/site.ts`
- **Publications:** `src/lib/publications-data.ts`
- **Courses:** `src/lib/courses-data.ts`
- **Blog:** add `.mdx` files under `src/content/blog/` with frontmatter (`title`, `description`, `date`, `category`, optional `featured: true`).
- **Hero image:** `heroImage` in `site.ts` (uses `next/image` + remote pattern for `images.unsplash.com`).

## Note on adapters

Cloudflare’s `@cloudflare/next-on-pages` continues to work for many Next.js apps; newer guidance may point to **OpenNext** for long-term support. This repo follows your spec using `next-on-pages`; you can migrate later if your team standardizes on OpenNext.

## Project structure (high level)

```
src/
  app/                 # App Router pages & layout
  components/          # Layout, sections, UI primitives
  content/blog/        # MDX posts
  lib/                 # Data + blog helpers
  actions/             # Server actions (contact)
```

## License

Use and modify freely for your academic profile. Replace placeholder links (Scholar, ORCID, social) in `src/lib/site.ts` with your real URLs.
=======
# Welcome to React Router + Cloudflare Workers!

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/react-router-starter-template)

![React Router Starter Template Preview](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/bfdc2f85-e5c9-4c92-128b-3a6711249800/public)

<!-- dash-content-start -->

A modern, production-ready template for building full-stack React applications using [React Router](https://reactrouter.com/) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)
- 🔎 Built-in Observability to monitor your Worker
<!-- dash-content-end -->

## Getting Started

Outside of this repo, you can start a new project with this template using [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/react-router-starter-template
```

A live public deployment of this template is available at [https://react-router-starter-template.templates.workers.dev](https://react-router-starter-template.templates.workers.dev)

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Typegen

Generate types for your Cloudflare bindings in `wrangler.json`:

```sh
npm run typegen
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

If you don't have a Cloudflare account, [create one here](https://dash.cloudflare.com/sign-up)! Go to your [Workers dashboard](https://dash.cloudflare.com/?to=%2F%3Aaccount%2Fworkers-and-pages) to see your [free custom Cloudflare Workers subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) on `*.workers.dev`.

Once that's done, you can build your app:

```sh
npm run build
```

And deploy it:

```sh
npm run deploy
```

To deploy a preview URL:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
npx wrangler versions deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
>>>>>>> 018f87b2964546455ab772a95cb72a2a14862ec1
