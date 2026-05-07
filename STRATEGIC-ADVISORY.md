# 📋 Yoruba Heritage — Strategic Advisory & Improvement Plan
**Prepared by:** GitHub Copilot / ORI Global Ltd  
**Date:** May 2026  
**Status:** For Review & Action

---

## ✅ What Was Just Done

The footer credit line has been added to **all 9 pages** of the site:

```
© 2025 Yoruba Heritage. All rights reserved. | Built with respect for our ancestors
Courtesy of Eletu  |  Created by ORI Global Ltd
```

- It is very small, subtle, and sits below the copyright line
- "ORI Global Ltd" links to www.origloballtd.com
- Styled in muted, professional grey — not distracting
- Visible on every page

---

## 📖 Part 1: Onboarding Document Review & Suggested Improvements

The existing **CONTENT-TEAM-ONBOARDING.md** is solid. Suggested improvements:

### ✅ What Is Good Already
- Clear business case and vision
- Detailed content roadmap with priority levels
- Step-by-step CMS instructions
- Writing standards and templates
- First-week action plan

### 🔧 Suggested Additions

#### 1. Add an FAQ Section
New contributors always have the same questions. A short FAQ saves time:

> **Q: Can I write about topics not on the priority list?**  
> A: Yes, but discuss with the project lead first.
>
> **Q: Do I need to know about Yoruba culture already?**  
> A: No. Thorough research and respectful curiosity are enough.
>
> **Q: What happens after I save a draft?**  
> A: The project lead reviews it, may suggest edits, then publishes.
>
> **Q: Can I use AI tools to help write?**  
> A: Yes, but always review, rewrite, and personalise. Never publish raw AI output.

#### 2. Add a Content Checklist (Pre-submission)
Before saving any draft, contributor should tick:
- [ ] Word count is within target range
- [ ] Spelling and grammar checked
- [ ] No content copied from other websites
- [ ] All facts are verified or noted as uncertain
- [ ] Featured image is sourced legally and credited
- [ ] Excerpt written (1–2 sentences)
- [ ] Category and tags filled in
- [ ] Read time estimated
- [ ] Saved as Draft (not Published)

#### 3. Tone Examples
Add 2–3 side-by-side examples:

| ❌ Don't write like this | ✅ Write like this |
|--------------------------|-------------------|
| "The Yoruba tribe lived in West Africa" | "The Yoruba people are one of West Africa's largest and most sophisticated civilisations" |
| "Sango was a god of thunder" | "Sango is one of the most revered Orisa — a divine force associated with thunder, justice, and royal power" |
| "IFA is a form of fortune-telling" | "IFA is one of the world's most complex philosophical and divination systems, recognised by UNESCO as Intangible Cultural Heritage" |

---

## 🎥 Part 2: Video on the Website — How to Do It Free

### Option A: Embed YouTube or TikTok Videos (Recommended — Free Forever)

**How it works:**
- You post a video on YouTube or TikTok as normal
- You copy the embed code
- You paste it into any article or page via the CMS

**Pros:** ✅ Free, ✅ No hosting costs, ✅ Videos already live on your social channels, ✅ Improves SEO

**To add to CMS (we can implement this):**
- Add a "Video URL" field to the Articles content type
- When an article has a video URL, it auto-embeds below the article header
- Works with YouTube, TikTok, Vimeo, Instagram Reels

**Example embed in article body (Markdown):**
```html
<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" allowfullscreen></iframe>
</div>
```

### Option B: Create a Dedicated Videos/Watch Page

We already have the structure for this. We could add a `/watch` page that:
- Shows a grid of embedded YouTube videos
- Organised by category
- Each video links to the related article
- Completely free — all video hosted on YouTube

**Cost: £0**

### My Recommendation:
Start with Option A (embed in articles). Once you have 10+ videos, build a Watch page. Both are free.

---

## 💬 Part 3: Comments / Discussion — Best Free Options

You want people to discuss articles openly, where everyone can see the conversation.

### Option 1: Giscus (My Top Recommendation — Free, No Ads)

**What it is:** A comments system powered by GitHub Discussions. Completely free, open source, no ads, no data selling.

**How it looks:** Clean, modern comment section at the bottom of each article. Anyone with a GitHub account can comment. All comments are public and visible to everyone.

**Pros:**
- ✅ 100% free, no ads ever
- ✅ Comments are moderated via your GitHub repo
- ✅ You can reply, react, pin important comments
- ✅ Beautiful design that matches any site
- ✅ Spam resistant (requires GitHub login)
- ✅ No GDPR issues

**Cons:**
- ❌ Users need a free GitHub account to comment (takes 2 mins to create)
- ❌ Not suitable if your audience is non-technical (but most people have GitHub now)

**Setup:** I can add this to your site. You just need a public GitHub repo (you already have one: `dreams331/yoruba`).

---

### Option 2: Disqus (Popular but Has Drawbacks)

**Pros:** ✅ Very widely used, ✅ No GitHub account needed

**Cons:** ❌ Shows ads on free tier, ❌ Sells user data, ❌ Slows down page load, ❌ Not recommended for a professional platform

---

### Option 3: Hyvor Talk (Best if Budget Allows — ~$5/month)

**What it is:** A premium, privacy-focused comment system with full features — reactions, nested replies, polls.

**Cost:** ~$5/month (within your £50 budget)  
**My view:** Worth it if you want the best user experience and no GitHub requirement.

---

### My Recommendation: **Giscus** (free) to start
- I can implement it today
- It sits at the bottom of every article and story
- People can discuss, react, reply
- You moderate via GitHub
- If you later want to upgrade to Hyvor Talk, easy to swap

**Shall I implement Giscus now?** Just say yes and I'll add it to all article pages.

---

## 📱 Part 4: Social Media Auto-Posting — Facebook, Instagram, TikTok

### What You Want:
When a new article is published, it automatically posts to your social media accounts (or you post with one click from a dashboard).

### The Honest Reality:

**Fully automatic, one-click posting is possible — but requires a small setup.** Here are your options:

---

### Option A: Zapier (Free Tier — Recommended to Start)

**What it does:** When a new article is published (detected via your RSS feed), Zapier automatically posts to Facebook Page and Twitter/X.

**What's free:**
- 100 tasks/month (enough for ~4 articles/week)
- Can post to Facebook Pages automatically
- Can post to Twitter/X automatically

**What requires paid tier:**
- Instagram (requires Meta Business Suite — see below)
- TikTok (no direct API for auto-posting)

**Setup needed:**
1. Create a free Zapier account
2. Connect your RSS feed: `https://yorubaheritage.com/data/articles.json`
3. Connect your Facebook Page
4. Set up the "Zap" — new RSS item → post to Facebook
5. Done — every published article auto-posts

**Cost: £0 for basic use**

---

### Option B: Buffer (Free Tier — Best for Managing All Platforms)

**What it is:** A social media scheduling dashboard. You write one post, send it to all platforms.

**Free tier includes:**
- 3 social channels
- 10 scheduled posts per channel
- Works with: Facebook Pages, Instagram (Business), Twitter/X, TikTok, LinkedIn

**How your workflow would look:**
1. Publish article in CMS
2. Open Buffer dashboard
3. Copy article title + link + image
4. Click "Share to all channels"
5. All platforms posted — done in 60 seconds

**Cost: £0 on free tier**  
**Upgrade ($6/month) if:** you want more than 10 queued posts per channel

---

### Option C: Meta Business Suite (For Facebook + Instagram Together)

**What it is:** Facebook's own free tool for managing Facebook Pages + Instagram Business accounts in one place.

**How it works:**
- Connect your Facebook Page and Instagram Business account
- Post to both simultaneously
- Schedule posts in advance
- 100% free from Meta

**My recommendation for Instagram:** Use Meta Business Suite. It's free and specifically designed for Facebook + Instagram.

---

### Option D: TikTok — Honest Assessment

**TikTok is the hardest to auto-post to.** Their API requires business verification. Options:

1. **Buffer** (free tier) — supports TikTok manual approval (you click "post" from Buffer)
2. **Later.com** — best TikTok scheduler, free for 1 account
3. **Manual posting** — most common approach; create the video, post from phone

**My honest advice on TikTok:** For a heritage/educational brand, **short TikTok videos** (30–90 seconds) work extremely well. The best approach:
- Film a short video summarising a new article
- Post manually to TikTok with the link in bio
- Use trending audio relevant to African/heritage content
- TikTok's algorithm will do the rest

This takes 10–15 minutes per article and will drive far more traffic than any auto-post.

---

### Recommended Social Media Stack (All Free):

| Platform | Tool | Effort |
|----------|------|--------|
| Facebook Page | Zapier (auto) or Buffer | Near-zero |
| Instagram | Meta Business Suite | 2 minutes |
| TikTok | Manual or Buffer | 10–15 minutes |
| Twitter/X | Zapier (auto) or Buffer | Near-zero |

**Total cost: £0**

---

## 🔧 Part 5: Should You Move to Vercel?

**Short answer: No. Stay on Netlify.**

Here is a clear comparison:

| Feature | Netlify (Current) | Vercel |
|---------|-------------------|--------|
| CMS (Netlify CMS) | ✅ Works perfectly | ❌ Would need migration |
| Forms | ✅ Built in (free) | ❌ Requires third party |
| Identity/Auth | ✅ Built in | ❌ Requires third party |
| Build performance | ✅ Fast | ✅ Slightly faster |
| Free tier | ✅ Generous | ✅ Generous |
| Domain management | ✅ Already set up | Migration effort required |
| Edge functions | ✅ Available | ✅ Better |

**Why Netlify is better for YOUR specific project:**
- Your CMS is tightly integrated with Netlify Identity and Netlify Forms
- Your current build system works perfectly
- Your domain and DNS are already configured
- Migration would break your CMS until reconfigured
- The only reason to move would be if you needed Next.js or a complex serverless backend — which you don't

**Verdict: Stay on Netlify. The grass is not greener.**

---

## 🚀 Part 6: Overall Improvement Recommendations

### Immediate (Can Do Now — No Cost):

| # | Improvement | Impact | Effort |
|---|-------------|--------|--------|
| 1 | ✅ Footer credit — DONE | Brand | Low |
| 2 | Add Giscus comments to articles | High engagement | Low |
| 3 | Set up Buffer free account + connect social channels | Reach | Low |
| 4 | Set up Zapier RSS → Facebook auto-post | Automation | Low |
| 5 | Add YouTube embed support to article CMS fields | Content richness | Low |
| 6 | Update footer social links with real handles | Trust | Low |
| 7 | Add reading progress bar to articles | UX | Low |
| 8 | Add dark mode toggle | UX | Medium |

### Short-Term (1–4 Weeks):

| # | Improvement | Impact | Effort |
|---|-------------|--------|--------|
| 9 | Add Google Analytics 4 | Data/insights | Low |
| 10 | Add sitemap.xml + robots.txt | SEO | Low |
| 11 | Add Contact and Contribute pages | Trust/community | Medium |
| 12 | Build a Videos/Watch page | Engagement | Medium |
| 13 | Gallery — add first 20 images | Content | Content team |
| 14 | Newsletter (EmailOctopus free) | Community growth | Medium |

### Medium-Term (1–3 Months):

| # | Improvement | Impact | Effort |
|---|-------------|--------|--------|
| 15 | Multi-language support (Yoruba, Spanish, French) | Reach | High |
| 16 | PWA / offline mode | Mobile UX | Medium |
| 17 | Related articles section | Engagement | Medium |
| 18 | "Save for later" bookmarking | Engagement | Medium |
| 19 | Search improvements (full text) | UX | Medium |

---

## 📌 Part 7: Action Summary — What to Do Next

### This Week:
1. ✅ Footer credit added — push to GitHub to deploy
2. **Tell me:** Do you want Giscus comments added? (say "yes, add comments")
3. **You do:** Create a free [Buffer](https://buffer.com) account, connect your social channels
4. **You do:** Create a free [Zapier](https://zapier.com) account for auto-posting
5. **You do:** Invite your new content contributor to the CMS via Netlify Identity

### Next Week:
6. Tell me your social media handles so I can update the footer links
7. Tell me if you want a Videos/Watch page
8. Tell me if you want Google Analytics added (I can add a placeholder)
9. Confirm if you want the reading progress bar and dark mode implemented

### This Month:
10. Content team starts producing articles using the onboarding doc
11. Gallery gets its first 20 images
12. Newsletter form gets connected to EmailOctopus

---

## 💬 Quick Answers to Your Questions

**Q: Best way to have video on the site free?**  
A: Embed YouTube videos in articles. I can add a "Video URL" field to the CMS so your content team can add YouTube links without touching code.

**Q: Best way to have public chat/discussion per article?**  
A: Giscus (free, no ads, everyone can see). I can implement it today.

**Q: Best way to auto-post to social media?**  
A: Buffer (free, all platforms) + Zapier for full automation. Takes 30 minutes to set up.

**Q: Should you move to Vercel?**  
A: No. Netlify is the right choice for your setup. Don't change what's working.

**Q: What are the most impactful things to do right now?**  
A: (1) Giscus comments, (2) Buffer social setup, (3) Google Analytics, (4) real social media links in footer.

---

*Advisory prepared by ORI Global Ltd | May 2026*
