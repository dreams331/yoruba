# 🤖 Automated Workflow Guide

## TL;DR - You Don't Need to Run Commands Manually!

### ✅ Production (Netlify - Fully Automated)
1. Edit content in CMS (`/admin`)
2. Click "Publish"
3. **That's it!** Netlify automatically builds and deploys

### ✅ Local Development (Semi-Automated)
```bash
# Run ONCE at the start:
npm run dev

# Then just create/edit .md files
# Builds happen automatically!
```

---

## 🌐 Production Workflow (Netlify)

### How It Works (Zero Manual Commands!)

```
You → CMS (/admin) → Click "Publish"
                      ↓
         Markdown file saved to Git
                      ↓
         Netlify detects Git change
                      ↓
         Netlify runs: node build-content.js
                      ↓
         JSON files generated automatically
                      ↓
         Site deployed with new content
                      ↓
         ✅ Live in ~30 seconds!
```

### What Happens Automatically:

1. **Content Creation**:
   - You write in CMS at `https://your-site.netlify.app/admin`
   - Click "Publish"

2. **Git Commit** (Automatic):
   - Netlify CMS commits your `.md` file to Git
   - Commit message: "Update Article: [title]"

3. **Build Trigger** (Automatic):
   - Netlify detects the new commit
   - Starts build process

4. **Content Build** (Automatic):
   - Runs `node build-content.js` (from `netlify.toml`)
   - Converts all `.md` files to JSON
   - Generates `data/*.json` files

5. **Deployment** (Automatic):
   - Deploys updated site
   - New content is live!

### Configuration

Already set up in `netlify.toml`:
```toml
[build]
  publish = "."
  command = "node build-content.js"
```

This tells Netlify to run your build script on every deploy!

---

## 💻 Local Development Workflow

### Option 1: Auto-Watch Mode (Recommended)

**Start the watcher** (run once):
```bash
npm run dev
# or
npm run watch
```

**What it does**:
- ✅ Watches `content/` directory
- ✅ Detects any `.md` file changes
- ✅ Automatically rebuilds JSON files
- ✅ Shows you what changed
- ✅ Runs continuously

**Your workflow**:
1. Start watcher: `npm run dev`
2. Create/edit `.md` files (manually or via local CMS)
3. Save file
4. **Automatic rebuild happens!**
5. Refresh browser to see changes

**Example Output**:
```
👀 Watching content directory for changes...

📝 Detected change: 2025-10-24-new-article.md (rename)
🔄 Rebuilding content...

✓ Processed: 2025-10-24-new-article.md
✓ Wrote 14 items to articles.json

✅ Auto-rebuild complete! Refresh your browser to see changes.
```

### Option 2: Manual Build (When Needed)

If you prefer to build manually:
```bash
# After creating/editing content:
npm run build
```

### Option 3: Populate Existing Content

Only needed once to migrate existing JavaScript data to CMS:
```bash
npm run populate  # Creates .md files from JS data
npm run build     # Converts .md to JSON
```

---

## 🔄 Complete Workflows

### Scenario 1: Adding a New Article (Production)

```
1. Go to https://your-site.netlify.app/admin
2. Click "New Article"
3. Fill in:
   - Title
   - Category
   - Excerpt
   - Content (write in Markdown)
   - Upload image (optional)
4. Click "Publish"
5. Wait ~30 seconds
6. Visit your site - article is live!
```

**Commands needed**: ZERO ✅

---

### Scenario 2: Adding a New Article (Local Dev)

**With auto-watch**:
```bash
# Terminal 1: Start watcher
npm run dev

# Terminal 2: Start local server  
python3 -m http.server 8000

# Then:
# 1. Create file: content/articles/2025-10-24-my-article.md
# 2. Save (watcher rebuilds automatically)
# 3. Refresh browser
```

**OR manually**:
```bash
# 1. Create file: content/articles/2025-10-24-my-article.md
# 2. Run:
npm run build
# 3. Refresh browser
```

---

### Scenario 3: Bulk Content Migration

Only needed once:
```bash
# Migrate all JS fallback data to CMS
npm run populate

# Build JSON files
npm run build

# Now all content appears in CMS at /admin
```

---

## 📋 Command Reference

| Command | When to Use | Automation Level |
|---------|-------------|------------------|
| `npm run dev` | **Local development** - Start this and forget it | ⚡ **Fully automatic** |
| `npm run watch` | Same as `dev` (alias) | ⚡ **Fully automatic** |
| `npm run build` | Manual build (if not using watch mode) | 🔨 Manual |
| `npm run populate` | **One-time**: Migrate JS data to CMS | 🔨 Manual (once) |

---

## 🎯 Recommended Workflows

### For Content Authors (Non-Technical)

**Production**:
1. Go to CMS: `https://your-site.netlify.app/admin`
2. Create content
3. Click "Publish"
4. Done! ✅

**No commands needed at all!**

---

### For Developers (Local Testing)

**Best Practice**:
```bash
# Start your work session:
npm run dev            # Terminal 1 (leave running)
python3 -m http.server 8000  # Terminal 2 (leave running)

# Then just:
# - Create/edit .md files
# - Save
# - Refresh browser
# (Auto-rebuild happens in background)
```

**OR Quick & Dirty**:
```bash
# Edit content
npm run build
# Refresh browser
```

---

## 🚀 Production Setup (One-Time)

### Initial Netlify Setup

1. **Push to Git**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Connect to Netlify**:
   - Go to netlify.com
   - "New site from Git"
   - Connect your repo
   - Build settings auto-detected from `netlify.toml`
   - Deploy!

3. **Enable Identity**:
   - Site Settings → Identity
   - Enable Identity
   - Registration: "Invite only"

4. **Invite Team**:
   - Identity tab
   - Click "Invite users"
   - Enter email addresses

### Build Settings (Already Configured)

In `netlify.toml`:
```toml
[build]
  command = "node build-content.js"  # Runs automatically on deploy
  publish = "."
```

**You never need to change this!**

---

## 🐛 Troubleshooting

### "Content not updating on Netlify"

**Check**:
1. Go to Netlify dashboard
2. Click "Deploys"
3. See if build ran
4. Check build log for errors

**Common causes**:
- Markdown syntax error in front matter
- Missing required fields
- Special characters in YAML

**Fix**: Edit the markdown file in CMS or Git to fix syntax

---

### "Watch mode not detecting changes"

**Fix**:
```bash
# Stop the watcher (Ctrl+C)
# Restart it:
npm run dev
```

---

### "I want to see what will be built without deploying"

```bash
# Run a local build:
npm run build

# Check the output:
cat data/articles.json
```

---

## ✨ Pro Tips

### 1. Keep Watch Mode Running
```bash
# Start once in the morning:
npm run dev

# Leave it running all day
# Every save auto-rebuilds!
```

### 2. Use Git Branches for Experiments
```bash
git checkout -b new-feature
# Edit content
# Test locally with npm run dev
# When happy, merge to main
git checkout main
git merge new-feature
git push  # Netlify auto-deploys
```

### 3. Preview Before Publishing (CMS)
- In CMS, click "Save" (creates draft)
- Review locally
- When ready, click "Publish"

### 4. Batch Edits
```bash
# Edit multiple .md files
# Watch mode rebuilds after each save
# Or turn it off and:
npm run build  # Build once after all edits
```

---

## 📊 Comparison

| Workflow | Local Dev | Production |
|----------|-----------|------------|
| **Create content** | Edit .md or use local CMS | Use CMS at /admin |
| **Build trigger** | Save file (auto) or manual | Git commit (auto) |
| **Build command** | `npm run dev` (auto) | Netlify runs automatically |
| **Deploy** | Refresh browser | Netlify deploys automatically |
| **Time to see changes** | Instant | ~30 seconds |
| **Manual steps** | 0 (with watch) or 1 (manual build) | 0 (fully automatic) |

---

## 🎉 Summary

### ✅ You DON'T need to run commands manually if:
1. **Production**: You use the CMS at `/admin` (Netlify handles everything)
2. **Local Dev**: You run `npm run dev` once and leave it running

### ⚠️ You ONLY need manual commands if:
1. You're not using watch mode locally
2. You're doing initial setup (`npm run populate`)
3. You're troubleshooting

---

## 🚀 Quick Start Reminder

**First time**:
```bash
npm run populate  # Migrate existing content (once)
npm run build     # Initial build
```

**Every day (local dev)**:
```bash
npm run dev  # Start and leave running
# Edit files, save, refresh browser
```

**Production**:
```
Use CMS → Click Publish → Done!
```

---

**The goal**: You should rarely, if ever, need to run build commands manually! 🎯
