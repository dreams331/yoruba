# Quick Start Guide - Yoruba Heritage Website

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js installed (for build scripts)
- A web browser
- A text editor (VS Code recommended)
- Git (for version control)

---

## Local Development

### 1. Clone or Download the Project

```bash
git clone <your-repo-url>
cd Yoruba
```

### 2. Start Auto-Watch Mode (Recommended)

```bash
npm run dev
```

This will:
- Build content once
- Watch for any changes to `.md` files
- Automatically rebuild when you save
- Keep running in the background

**💡 TIP**: Leave this running while you work! No need to run build commands manually.

### 3. Start Local Server

In a **new terminal**:

```bash
# Python (usually pre-installed on Mac)
python3 -m http.server 8000

# Node.js
npx serve

# VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

### 4. View in Browser

Open: `http://localhost:8000`

---

## Alternative: Manual Build

If you prefer not to use watch mode:

```bash
# Build once:
npm run build

# Start server:
python3 -m http.server 8000
```

You'll need to run `npm run build` every time you edit content.

---

## Development Workflow

### Working with Content

**Option A: Watch Mode (Recommended)**
```bash
npm run build:watch
```
- Edit any `.md` file in `content/`
- Saves automatically rebuild JSON
- Refresh browser to see changes

**Option B: Manual Builds**
```bash
# Make changes to content/*.md files
npm run build
# Refresh browser
```

### File Structure

```
Important Directories:
├── content/          ← Edit Markdown files here
│   ├── articles/
│   ├── stories/
│   ├── ifa/
│   └── pages/
├── data/             ← Generated JSON (auto-created)
├── images/uploads/   ← Add images here
├── css/              ← Styles
└── js/               ← JavaScript

Key Files:
├── build-content.js       ← Build script
├── package.json           ← NPM scripts
├── netlify.toml           ← Netlify config
└── README.md              ← Full documentation
```

---

## Common Tasks

### Add a New Article

1. Create file: `content/articles/2025-10-24-my-article.md`
2. Add content:
   ```markdown
   ---
   title: "My Article Title"
   date: 2025-10-24T10:00:00.000Z
   category: "history"
   image: "/images/uploads/my-image.jpg"
   excerpt: "Brief description..."
   readTime: "8 min"
   featured: false
   tags: ["tag1", "tag2"]
   ---
   
   ## Your Article Content
   
   Write in Markdown...
   ```
3. Run: `npm run build`
4. Refresh browser to see your article

### Add a New Story

Same process in `content/stories/`:
```markdown
---
title: "Story Title"
category: "folktales"
moral: "The lesson..."
---

Story content...
```

### Add Images

1. Place image in `images/uploads/`
2. Reference in Markdown:
   ```yaml
   image: "/images/uploads/my-image.jpg"
   ```

### Change Colors

Edit `css/styles.css`:
```css
:root {
    --primary-color: #C17817;    /* Change this */
    --secondary-color: #8B0000;  /* And this */
    ...
}
```

---

## Deploy to Netlify

### First Time Setup

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Build settings (auto-detected from `netlify.toml`):
     - Build command: `node build-content.js`
     - Publish directory: `.`
   - Click "Deploy"

3. **Enable CMS Access**
   - Go to: Site Settings → Identity
   - Click "Enable Identity"
   - Settings:
     - Registration: "Invite only"
     - External providers: Email (minimum)
   - Go to Identity tab
   - Click "Invite users"
   - Add team member emails

### Every Deploy After

```bash
git add .
git commit -m "Update content"
git push
```

Netlify automatically rebuilds!

---

## Using the CMS

### Access the CMS

After Netlify Identity is enabled:
1. Go to: `https://your-site.netlify.app/admin`
2. Login with invited email
3. Set password on first visit

### Create Content

1. Click "New Article" (or Story, IFA)
2. Fill in fields:
   - Title (required)
   - Date (required)
   - Category (dropdown)
   - Excerpt (summary)
   - Content (main body - use Markdown)
   - Image (upload or select)
3. Click "Save" (draft) or "Publish"
4. Site rebuilds automatically!

### Upload Images

1. In CMS, click "Media"
2. Click "Upload"
3. Select image
4. Copy the image path
5. Use in image field: `/images/uploads/filename.jpg`

---

## Troubleshooting

### "Content not loading"
```bash
# Rebuild content
npm run build

# Check data folder
ls data/

# Check browser console
# Press F12 → Console tab
```

### "Build script fails"
```bash
# Check Node.js version
node --version  # Should be 14+

# Check Markdown syntax
# Look for the file mentioned in error
# Fix YAML front-matter
```

### "CMS not loading"
- Use HTTPS (not HTTP)
- Check: Site Settings → Identity → Enabled?
- Clear browser cache
- Try incognito mode

### "Images not showing"
- Check file path: `/images/uploads/file.jpg` (not `images/...`)
- Verify file exists in `images/uploads/`
- Check filename (case-sensitive!)

---

## NPM Scripts Reference

```bash
npm run build          # Build content once
npm run build:watch    # Watch for changes, auto-rebuild
```

---

## Helpful Commands

```bash
# Check if Node.js installed
node --version

# Check if Python installed
python3 --version

# List files in directory
ls content/articles/

# View file content
cat content/articles/2025-10-20-oyo-empire.md

# Search for text in files
grep -r "search term" content/
```

---

## Browser Console

Press `F12` (or `Cmd+Option+I` on Mac) to open Developer Tools.

**Console Tab** - Check for errors:
```
✓ Loaded 10 articles from CMS  ← Good!
❌ Failed to load articles      ← Problem!
```

**Network Tab** - Check file loading:
- Look for `/data/articles.json`
- Status should be `200` (success)

---

## File Editing Tips

### VS Code Extensions (Recommended)
- Markdown All in One
- Live Server
- Prettier (code formatter)

### Markdown Syntax
```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*

- Bullet point
- Another point

1. Numbered item
2. Another item

[Link text](https://example.com)

![Image alt text](/path/to/image.jpg)
```

---

## Content Guidelines

### Article Front Matter
```yaml
---
title: "Required - Article title"
date: 2025-10-24T10:00:00.000Z    # ISO format
category: "history"                # history|culture|people|diaspora|language
image: "/images/uploads/pic.jpg"  # Optional
excerpt: "Required - Short summary (1-2 sentences)"
readTime: "8 min"                 # Estimate
featured: true                     # Show on homepage?
tags: ["tag1", "tag2"]            # Keywords
---
```

### Categories

**Articles:**
- history
- culture
- people
- diaspora
- language

**Stories:**
- folktales
- myths
- legends
- parables

**IFA:**
- IFA Basics
- Odu IFA
- Orisha
- Practice

---

## Next Steps

1. ✅ Get local site running
2. ✅ Add some test content
3. ✅ Deploy to Netlify
4. ✅ Enable Netlify Identity
5. ✅ Invite team members
6. ✅ Start adding real content!

---

## Resources

- 📖 [Full README](README.md) - Complete documentation
- 🔧 [CMS Setup Guide](CMS-SETUP-GUIDE.md) - Detailed CMS setup
- 📋 [Integration Summary](CMS-INTEGRATION-SUMMARY.md) - Technical details
- 🌐 [Netlify Docs](https://docs.netlify.com/) - Deployment help
- ✍️ [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax

---

## Getting Help

### Check These First
1. Browser console (F12)
2. Build output (`npm run build`)
3. Netlify build logs (if deployed)
4. Documentation files

### Common Issues & Solutions
| Issue | Solution |
|-------|----------|
| Content not showing | Run `npm run build` |
| CMS not loading | Enable Netlify Identity |
| Images not displaying | Check path: `/images/uploads/` |
| Build fails | Check Markdown front-matter syntax |
| Changes not visible | Clear browser cache (Cmd+Shift+R) |

---

**You're ready to go! Start by running `npm run build` and opening the site in your browser.** 🚀

For detailed information, see the [Full README](README.md).
