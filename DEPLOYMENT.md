# Deployment Guide — Christopher Kisa Ebenezer Website

## Project Overview

This is a **production-ready Next.js 15 academic website** for Christopher Kisa Ebenezer, Lecturer at Gulu University. It's fully optimized for Cloudflare Pages deployment with built-in SSR + API support.

**Tech Stack:**
- Next.js 15 (App Router + React Server Components)
- TypeScript, Tailwind CSS, shadcn/ui
- Framer Motion (animations)  
- MDX (blog posts)
- Cloudflare - Turnstile (spam protection), Pages (hosting)

---

## ⚡ Quick Start (Local Development)

```bash
cd "c:\Users\Administrator\Documents\final website dad"
npm install
npm run dev
```

Visit **http://localhost:3001** (or the port shown in terminal).

---

## 🔧 Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```env
# Cloudflare Turnstile (contact form anti-spam)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here

# Site URL (update for production)
NEXT_PUBLIC_SITE_URL=https://yourname.pages.dev
```

### Getting Turnstile Keys:
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to: **Turnstile** > **Sites** > **Create Site**
3. Choose **Managed** challenge mode
4. Copy the **Site Key** and **Secret Key**
5. Paste into `.env.local`

---

## 🚀 Deployment to Cloudflare Pages

### Step 1: Push Your Repo to GitHub

```bash
git remote -v  # Verify origin is your GitHub repo
git push -u origin master
```

Your repo is already connected:
```
https://github.com/shammah111111/react-router-starter-template
```

### Step 2: Connect to Cloudflare Pages

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Pages** > **Connect to Git**
3. Select your GitHub account → Choose the repo → Click **Begin setup**
4. Fill in:
   - **Project name:** `ck-ebenezer-website` (or your choice)
   - **Production branch:** `master`
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Node.js version:** `24.14.1` (or latest stable)

5. Click **Save and Deploy**

### Step 3: Add Environment Variables in Cloudflare

1. In **Pages** > Your Site > **Settings** > **Environment Variables**
2. Add for both **Production** and **Preview**:
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY = your_site_key
   TURNSTILE_SECRET_KEY = your_secret_key
   NEXT_PUBLIC_SITE_URL = https://your-project.pages.dev
   ```
3. Click **Save**

### Step 4: Redeploy

Cloudflare will now redeploy with the correct environment variables.

---

## ✅ Verification Checklist

After deployment, verify these pages load:

- [ ] **Home** → `/` — Hero with animations
- [ ] **About** → `/about` — Timeline, education, skills  
- [ ] **Publications** → `/publications` — Live filters (year, type, keyword)
- [ ] **Teaching** → `/teaching` — Current & past courses
- [ ] **Blog** → `/blog` — MDX posts with categories
- [ ] **Contact** → `/contact` — Form with Turnstile + confirmation message

**Test the form:**
- Fill name, email, subject, message
- Complete Turnstile challenge
- Submit → You should see "Message received!" confirmation

---

## 🌐 Custom Domain (Optional)

1. In Cloudflare Pages: **Settings** > **Custom domains** > **Add custom domain**
2. Enter your domain (e.g., `christopher.guluniv.ac.ug`)
3. Cloudflare will show nameserver setup if needed
4. Wait 5–30 minutes for propagation
5. Test: Visit your custom domain

---

## 📝 Content Updates

### Blog Posts

**Location:** `src/content/blog/`

To add a new post:
1. Create `my-post.mdx`
2. Add frontmatter:
   ```mdx
   ---
   title: "My Great Post"
   excerpt: "Short summary displayed in blog list"
   date: "2025-03-30"
   category: "Research"
   featured: true
   ---
   
   # Your content here
   ```
3. Commit & push → Cloudflare redeploys automatically

### Publications & Courses

**Locations:**
- `src/lib/publications-data.ts` — Edit publication entries
- `src/lib/courses-data.ts` — Edit course listings

Edit, commit, push → Auto-reload in dev/production.

### Site Config

**Location:** `src/lib/site.ts`

Update:
- Name, title, university
- Bio, office hours, email
- Social links (Scholar, ORCID, LinkedIn, etc.)
- Hero image URL

---

## 🛠 Local Development Commands

```bash
npm run dev      # Start dev server (port 3001)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check for ESLint issues
```

---

## 🔍 Build Optimization

The Next.js build automatically:
- **Pre-renders** all pages as static HTML (ultra-fast)
- **Optimizes images** via `next/image`
- **Code splits** JavaScript bundles
- **Minifies** CSS/JS

First Load JS is **~160 KB** (excellent for academic sites).

---

## 🚨 Troubleshooting

### Dev server won't start
```bash
npm run dev  # Port 3000 in use? Auto-switches to 3001
```

### Build fails with TypeScript errors
```bash
npm run build  # Run locally to replicate Cloudflare error
```

### Contact form not working
- Check `.env.local` has `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Cloudflare Pages needs: `TURNSTILE_SECRET_KEY` env var set
- Test locally first: `npm run dev`

### Blog posts not showing
- Check file is `.mdx` (not `.md`)
- Frontmatter must be valid YAML
- Verify `date` format is `YYYY-MM-DD`

---

## 📊 Performance Tips

- ✅ All static files pre-rendered
- ✅ Framer Motion animations use GPU (smooth)
- ✅ Images optimized automatically
- ✅ Turnstile loads on demand (contact page only)
- ✅ Blog search happens in browser (fast)

**Score on Lighthouse:** Expected 90+

---

## 📞 Support

For issues:
1. Check `.vercel/output/` after `npm run build`
2. View Cloudflare Pages build logs: **Pages** > Your Site > **Deployments**
3. Local dev match production: Use same Node version as Cloudflare

---

## 📄 License & Attribution

Built with:
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://shadcn.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

**Last Updated:** March 30, 2025  
**Status:** ✅ Ready for production
