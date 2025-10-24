# Yoruba Heritage Website

A comprehensive digital platform dedicated to preserving and sharing the rich history, culture, and wisdom of the Yoruba people. Features a modern, collaborative content management system for easy updates and team collaboration.

## Features

- **Historical Articles**: In-depth articles on Yoruba kingdoms, civilization, and notable figures
- **Traditional Stories**: Folktales, legends, and oral traditions
- **IFA Wisdom**: Respectful exploration of IFA divination and spiritual teachings
- **Gallery**: Visual documentation of cultural artifacts and practices
- **Advanced Search**: Powerful search functionality across all content
- **Responsive Design**: Beautiful, modern interface that works on all devices
- **Netlify CMS Integration**: Easy content management with user roles and permissions
- **Markdown Support**: Write content in simple Markdown format
- **Automatic Build**: Content updates automatically convert to JSON for the live site

## Technology Stack

- HTML5, CSS3, Vanilla JavaScript
- **Netlify CMS**: For content management
- **Markdown**: For content authoring
- **Node.js**: For build scripts
- **JSON**: For content delivery
- Font Awesome Icons
- Google Fonts (Playfair Display & Inter)

## Quick Start

### Local Development

1. Clone the repository
2. Run the build script to generate content:
   ```bash
   npm run build
   ```
3. Open `index.html` in your browser or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

### Watch Mode (Auto-rebuild on changes)

```bash
npm run build:watch
```

This will watch the `content/` directory and automatically rebuild JSON files when you save Markdown files.

## Content Management

### Using Netlify CMS (Recommended)

1. Deploy to Netlify (see Deployment section below)
2. Enable Netlify Identity on your site
3. Invite team members via the Netlify Identity tab
4. Access the CMS at: `https://your-site.netlify.app/admin`
5. Login and start creating content!

See [CMS-SETUP-GUIDE.md](CMS-SETUP-GUIDE.md) for detailed instructions.

### Manual Content Management

Content is stored as Markdown files in the `content/` directory:

```
content/
├── articles/         # Historical articles
├── stories/          # Traditional stories
├── ifa/              # IFA wisdom content
├── gallery/          # Gallery image metadata
└── pages/            # Static pages (about, etc.)
```

#### Creating New Content

1. Create a new `.md` file in the appropriate folder
2. Add front matter (metadata) at the top:
   ```markdown
   ---
   title: "Your Article Title"
   date: 2025-10-24T10:00:00.000Z
   category: "history"
   image: "/images/uploads/your-image.jpg"
   excerpt: "Brief description..."
   readTime: "8 min"
   featured: false
   tags: ["tag1", "tag2"]
   ---
   
   ## Your Content Starts Here
   
   Write your content in Markdown...
   ```
3. Run `npm run build` to convert to JSON
4. Refresh your site to see the changes

## Deployment

### Netlify (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build settings are configured in `netlify.toml`:
   - Build command: `node build-content.js`
   - Publish directory: `.`
6. Deploy!

The build script will automatically convert Markdown content to JSON during deployment.

### Enabling CMS Access

After deployment:
1. Go to Site Settings > Identity in Netlify
2. Click "Enable Identity"
3. Configure registration (Invite only recommended)
4. Go to Identity tab and invite team members
5. They'll receive an email to set up their account

## Project Structure

```
yoruba-heritage/
├── index.html              # Homepage
├── articles.html           # Articles listing
├── stories.html            # Traditional stories
├── ifa-wisdom.html         # IFA wisdom content
├── gallery.html            # Image gallery
├── about.html              # About page
├── search.html             # Search page
├── article-detail.html     # Article detail view
├── admin/                  # Netlify CMS admin panel
│   ├── config.yml         # CMS configuration
│   └── index.html         # CMS entry point
├── content/                # Markdown content files
│   ├── articles/
│   ├── stories/
│   ├── ifa/
│   ├── gallery/
│   └── pages/
├── data/                   # Generated JSON files
│   ├── articles.json
│   ├── stories.json
│   ├── ifa.json
│   ├── gallery.json
│   ├── pages.json
│   └── all-content.json
├── images/
│   └── uploads/            # CMS uploaded images
├── css/                    # Stylesheets
├── js/
│   ├── main.js            # Main JavaScript
│   ├── content-loader.js  # CMS content loader
│   ├── articles.js        # Articles functionality
│   ├── stories.js         # Stories functionality
│   ├── ifa.js             # IFA page functionality
│   ├── search.js          # Search functionality
│   └── article-detail.js  # Article detail page
├── build-content.js        # Build script (Markdown → JSON)
├── watch-content.js        # Watch mode script
├── package.json            # NPM configuration
├── netlify.toml            # Netlify configuration
└── CMS-SETUP-GUIDE.md     # Detailed CMS setup guide
```

## Build System

### How It Works

1. **Content Creation**: Authors create Markdown files in `content/` (via CMS or manually)
2. **Build Process**: `build-content.js` parses Markdown files and extracts:
   - Front matter metadata (title, date, category, etc.)
   - Content body (converted to HTML)
3. **Output**: Generates JSON files in `data/` directory
4. **Frontend**: JavaScript loads JSON and displays content dynamically

### Build Scripts

- `npm run build`: Build content once
- `npm run build:watch`: Watch for changes and auto-rebuild

## Content Structure

### Articles
```yaml
---
title: "Article Title"
date: 2025-10-24T10:00:00.000Z
category: "history|culture|people|diaspora|language"
image: "/images/uploads/image.jpg"
excerpt: "Brief summary..."
readTime: "8 min"
featured: true
tags: ["tag1", "tag2"]
---
```

### Stories
```yaml
---
title: "Story Title"
date: 2025-10-24T10:00:00.000Z
category: "folktales|myths|legends|parables"
image: "/images/uploads/image.jpg"
excerpt: "Brief summary..."
readTime: "5 min"
moral: "The lesson learned..."
---
```

### IFA Wisdom
```yaml
---
title: "IFA Article Title"
date: 2025-10-24T10:00:00.000Z
category: "IFA Basics|Odu IFA|Orisha|Practice"
image: "/images/uploads/image.jpg"
excerpt: "Brief summary..."
readTime: "10 min"
---
```

## Customization

### Colors
The color scheme can be customized in `css/styles.css`:

```css
:root {
    --primary-color: #C17817;    /* Gold/Bronze */
    --secondary-color: #8B0000;  /* Deep Red */
    --accent-color: #2C5F2D;     /* Forest Green */
    ...
}
```

### Typography
Fonts are loaded from Google Fonts. Update the import in HTML files and font variables in `css/styles.css`.

### CMS Configuration
Edit `admin/config.yml` to:
- Add new content collections
- Modify content fields
- Change editor options
- Configure media settings

## Maintenance

### Adding New Content Categories

1. Add category to `admin/config.yml`
2. Create corresponding directory in `content/`
3. Update `build-content.js` to include new category
4. Create or update JavaScript loader in `js/`
5. Add navigation link if needed

### Updating Dependencies

The site uses minimal dependencies (vanilla JS). To update:
- Update Font Awesome CDN link
- Update Google Fonts link
- Update Netlify CMS version in `admin/index.html`

## Troubleshooting

### Content not appearing on site
1. Run `npm run build` to regenerate JSON
2. Check browser console for errors
3. Verify JSON files exist in `data/` directory
4. Check Markdown front matter syntax

### CMS not loading
1. Verify Netlify Identity is enabled
2. Check `admin/config.yml` configuration
3. Ensure you're accessing via HTTPS
4. Check browser console for errors

### Build failing on Netlify
1. Check build log in Netlify dashboard
2. Verify `build-content.js` runs locally
3. Check all Markdown files have valid front matter
4. Ensure no syntax errors in content files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run build`
5. Submit a pull request

## Resources

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Netlify Documentation](https://docs.netlify.com/)

## License

Copyright © 2025 Yoruba Heritage. All rights reserved.

## Contact

For questions, contributions, or collaboration, please visit our Contact page on the website.

---

Built with respect for our ancestors and dedication to preserving Yoruba heritage for future generations.
