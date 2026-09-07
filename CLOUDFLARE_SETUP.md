# 🚀 Cloudflare Pages Setup Guide (Windows)

## Step 1: Log into Cloudflare Dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Log in with your Cloudflare account (create one if needed)

---

## Step 2: Connect GitHub Repository

1. In the left sidebar, click **Pages**
2. Click **Connect to Git**
3. Click **GitHub** 
4. Click **Authorize Cloudflare** (if prompted)
5. Select your GitHub account
6. Find and select: **`react-router-starter-template`**
7. Click **Begin setup**

---

## Step 3: Configure Build Settings

Fill in the following:

| Field | Value |
|-------|-------|
| **Project name** | `ck-ebenezer-website` |
| **Production branch** | `master` |
| **Build command** | `npm run build` |
| **Build output directory** | `.next` |
| **Node.js version** | `24` |

**Leave other fields blank** (including "Root directory").

Click **Save and Deploy** → Cloudflare will start the first build (may take 2-3 minutes).

---

## Step 4: Add Environment Variables (Critical!)

1. After deployment, go to your site's **Settings** tab
2. Click **Environment Variables**
3. Click **Add variable** and add these ONE AT A TIME:

### For **Production** environment:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY = 1x00000000000000000000AA
TURNSTILE_SECRET_KEY = 1x0000000000000000000000000000000000000
NEXT_PUBLIC_SITE_URL = https://ck-ebenezer-website.pages.dev
```

(Replace with your actual Turnstile keys from [Cloudflare Turnstile](https://dash.cloudflare.com))

### Optional:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = (your Google Maps API key if you have one)
```

**After adding each variable, click "Save"**

---

## Step 5: Trigger a Redeploy

1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Select **Retry** (or push a commit to GitHub)

Cloudflare will rebuild with the new environment variables.

---

## Step 6: Verify Deployment

Once the build completes (green checkmark), visit:
```
https://ck-ebenezer-website.pages.dev
```

Test:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Contact form with Turnstile appears
- ✅ Google Maps on contact page
- ✅ No console errors

---

## Future Deployments (Automatic!)

From now on:
1. Make changes locally
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push origin master`
4. **Cloudflare automatically redeploys** within 1-2 minutes ✨

---

## Troubleshooting

**Build fails?**
- Check the **Deployments** tab for error logs
- Look for red error messages in the build output

**Turnstile widget not showing?**
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly
- It should appear on the contact page

**Map not showing?**
- Google Maps works without an API key (basic embed)
- Check browser console for any errors

---

## Custom Domain (Optional)

To use a custom domain like `christopher.guluniv.ac.ug`:

1. In Pages → Your site → **Settings** → **Custom domains**
2. Click **Add custom domain**
3. Enter your domain
4. Update DNS nameservers if prompted
5. Wait 5-30 minutes for propagation

---

**Questions?** See [DEPLOYMENT.md](DEPLOYMENT.md) for more details.
