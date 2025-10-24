# Yoruba Heritage Website

A comprehensive digital platform dedicated to preserving and sharing the rich history, culture, and wisdom of the Yoruba people.

## Features

- **Historical Articles**: In-depth articles on Yoruba kingdoms, civilization, and notable figures
- **Traditional Stories**: Folktales, legends, and oral traditions
- **IFA Wisdom**: Respectful exploration of IFA divination and spiritual teachings
- **Gallery**: Visual documentation of cultural artifacts and practices
- **Advanced Search**: Powerful search functionality across all content
- **Responsive Design**: Beautiful, modern interface that works on all devices

## Technology Stack

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Playfair Display & Inter)

## Deployment

This site is optimized for deployment on Netlify:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Deploy!

## Project Structure

```
yoruba-heritage/
├── index.html          # Homepage
├── articles.html       # Articles listing
├── stories.html        # Traditional stories
├── ifa-wisdom.html     # IFA wisdom content
├── gallery.html        # Image gallery
├── about.html          # About page
├── search.html         # Search page
├── css/
│   ├── styles.css      # Global styles
│   ├── articles.css    # Articles page styles
│   ├── search.css      # Search page styles
│   ├── about.css       # About page styles
│   └── gallery.css     # Gallery page styles
└── js/
    ├── main.js         # Main JavaScript
    ├── articles.js     # Articles functionality
    ├── stories.js      # Stories functionality
    ├── ifa.js          # IFA page functionality
    └── search.js       # Search functionality
```

## Adding Content

### Articles
Edit `js/articles.js` and add new articles to the `articlesData` array.

### Stories
Edit `js/stories.js` and add new stories to the `storiesData` array.

### IFA Wisdom
Edit `js/ifa.js` and add new content to the `ifaContent` array.

### Images
Add images to an `images/` folder and update the relevant JavaScript files to reference them.

## Customization

### Colors
The color scheme can be customized in `css/styles.css` by modifying the CSS custom properties in the `:root` selector:

```css
:root {
    --primary-color: #C17817;    /* Gold/Bronze */
    --secondary-color: #8B0000;  /* Deep Red */
    --accent-color: #2C5F2D;     /* Forest Green */
    ...
}
```

### Typography
Fonts are loaded from Google Fonts. To change them, update the import in each HTML file and the font variables in `css/styles.css`.

## License

Copyright © 2025 Yoruba Heritage. All rights reserved.

## Contact

For questions, contributions, or collaboration, please visit our Contact page on the website.

---

Built with respect for our ancestors and dedication to preserving Yoruba heritage for future generations.
