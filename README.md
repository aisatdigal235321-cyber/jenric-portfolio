# Jenric Digal · AI Video Editor Portfolio

A plain HTML/CSS/JS site. No build step. Vercel hosts it; Supabase stores the videos and the project list.

```
index.html          page layout
styles.css          design
app.js              loads projects from Supabase, filters, video player
config.js           ← your Supabase keys, name, email, social links
supabase/schema.sql ← run once in Supabase
vercel.json         Vercel settings
```

Until `config.js` has your Supabase keys, the site shows 4 example projects so you can see the layout.

## 1. Set up Supabase

1. Create a project at supabase.com.
2. Go to **SQL Editor → New query**, paste everything in `supabase/schema.sql`, click **Run**.
   This makes the `projects` table and a public `portfolio` storage bucket.
3. Go to **Storage → portfolio** and upload your videos (`.mp4`, H.264 works everywhere) and optional thumbnails (`.jpg`).
4. Click each uploaded file → **Get URL** and copy it.
5. Go to **Table Editor → projects → Insert row** and fill in one row per video:
   - `style` = `realistic` or `animated` (decides whether it shows under Realistic or Pixar-style 3D)
   - `title`, `category` (Commercial, UGC, Music Video, Short Film…), `description`
   - `video_url` = the URL you copied, `thumbnail_url` = the image URL (optional)
   - `tools` = e.g. `{Higgsfield,Premiere Pro}`
   - `duration` = `0:30`, `aspect_ratio` = `16:9` or `9:16`
   - `featured` = true for the one that plays in the hero
   - `sort_order` = 1, 2, 3… to set the order
6. Go to **Project Settings → API** and copy the **Project URL** and the **anon public** key into `config.js`.

Tip: keep each video under 50 MB (the Supabase free-plan file limit) and export at 1080p.

## 2. Put it on Vercel

Easiest (GitHub):
1. Create a GitHub repo and upload all these files.
2. At vercel.com → **Add New → Project** → import the repo → **Deploy**. Framework preset: **Other**. No build command.

Or from your computer with the Vercel CLI:
```
npm i -g vercel
cd jenric-portfolio
vercel        # first deploy (preview)
vercel --prod # live
```

Every time you add a row in Supabase, the live site shows it on the next page load. You don't need to redeploy.

## 3. Personalize

Edit `config.js`: email, tagline, and your YouTube / Instagram / TikTok / LinkedIn links (blank ones are hidden).
