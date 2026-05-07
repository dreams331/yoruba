# 🌿 Branch & Content Workflow Guide

## How the Two-Branch System Works

```
content person writes → dev branch → preview URL (Netlify)
                                            ↓
                              you review & approve
                                            ↓
                         you merge dev → main → yorubaheritage.com
```

---

## Branch Summary

| Branch | Who uses it | Where it deploys | URL |
|--------|-------------|------------------|-----|
| `main` | You only | Production | yorubaheritage.com |
| `dev` | Content team + CMS | Preview only | dev--yoruba-heritage.netlify.app |

---

## For the Content Person

### How to post content (CMS)

1. Go to: **https://yorubaheritage.com/admin**
2. Log in with your invited email
3. Write articles, stories, IFA entries as normal
4. Click **"Save"** or **"Publish"**
5. The CMS automatically commits to the **`dev` branch**
6. The preview site rebuilds in ~2 minutes
7. Check the preview URL to see your content live in dev

### Preview URL
```
https://dev--yoruba-heritage.netlify.app
```
(Netlify generates this automatically for the dev branch)

### What happens to your content?
- It is live on the **preview URL immediately**
- It does **NOT** appear on yorubaheritage.com until Eletu reviews and merges
- You will be told when it goes live on the main site

---

## For Eletu (Project Lead) — Review & Merge Workflow

### Step 1: Check what the content person has added
```bash
# See what's new in dev vs main
git log main..dev --oneline
```

### Step 2: Preview the changes
Visit the dev preview URL:
```
https://dev--yoruba-heritage.netlify.app
```
Review all new articles, stories, images.

### Step 3: Merge to main (publish to live site)
```bash
# Switch to main
git checkout main

# Merge dev into main
git merge dev

# Push to GitHub — Netlify auto-deploys to yorubaheritage.com
git push origin main

# Switch back to dev to continue working
git checkout dev
```

### Step 4: Netlify rebuilds automatically
- yorubaheritage.com updates within ~2 minutes
- No further action needed

---

## Cloning the Repo (Fast — Shallow Clone)

### For new team members / fresh setup:

Instead of cloning the full history (which grows with every article), use a **shallow clone**. This only downloads the latest state — not the entire history.

```bash
# Shallow clone (fast — only downloads latest snapshot)
git clone --depth 1 git@github.com:dreams331/yoruba.git

# Or clone a specific branch only
git clone --depth 1 --branch dev git@github.com:dreams331/yoruba.git
```

**Why this matters:**
- With 10,000 articles and full history, a normal clone could be 1GB+
- A shallow clone stays small regardless of how many commits exist
- The content person only needs the latest state — not 3 years of history

### If they already have a full clone and want to reduce size:
```bash
git fetch --depth 1
git gc --aggressive --prune=all
```

---

## About Images (Why They're Excluded from Git)

Images uploaded through the CMS are excluded from the git repository via `.gitignore`.

```
images/uploads/*   ← excluded from git
```

**Why?**
- A repo with 10,000 articles and their images could be 10GB+
- Cloning would be very slow
- Netlify stores and serves images from its own CDN automatically
- This keeps the repo lean and fast to clone forever

**What this means for the content team:**
- Upload images through the CMS as normal — nothing changes for them
- Images appear on the site as expected
- They just aren't stored in git history

---

## Netlify Setup Needed (One-Time — You Do This)

To enable the `dev` branch preview URL:

1. Go to: **https://app.netlify.com/sites/yoruba-heritage/settings/deploys**
2. Scroll to **"Branch deploys"**
3. Under **"Branch deploy controls"** select:
   - ✅ **"Let me add individual branches"**
   - Add: `dev`
4. Click **Save**
5. Netlify will now build both branches:
   - `main` → yorubaheritage.com
   - `dev` → dev--yoruba-heritage.netlify.app

Also:
6. Go to **Identity settings**
7. Confirm the content person's email is invited
8. They log in at yorubaheritage.com/admin — CMS will commit to `dev` automatically

---

## Merging Best Practices

### Do merge when:
- ✅ You've reviewed the preview URL
- ✅ Content is accurate and well-written
- ✅ Images look correct
- ✅ You're happy with the quality

### Don't merge when:
- ❌ Content hasn't been reviewed
- ❌ There are broken images or formatting issues
- ❌ The content is incomplete (still a draft)

### Merging frequency suggestion:
- **Weekly**: Review and merge all approved content once a week
- This gives the content person a clear deadline
- Keeps the live site consistently updated

---

## Git Cheat Sheet for This Workflow

```bash
# See current branch
git branch

# Switch to dev
git checkout dev

# Switch to main
git checkout main

# See what's new in dev (not yet in main)
git log main..dev --oneline

# Merge dev into main
git checkout main
git merge dev
git push origin main
git checkout dev

# Pull latest dev changes (if content person pushed via CMS)
git checkout dev
git pull origin dev
```

---

## Summary of What Was Set Up

| What | How |
|------|-----|
| CMS commits to `dev` | `admin/config.yml` → `branch: dev` |
| `dev` gets preview URL | `netlify.toml` → `[context.dev]` |
| Images excluded from git | `.gitignore` → `images/uploads/*` |
| Uploads folder kept | `images/uploads/.gitkeep` |
| Fast cloning | Use `git clone --depth 1` |

---

*Setup completed: May 2026*
