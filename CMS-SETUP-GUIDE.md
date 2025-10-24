# Yoruba Heritage CMS Setup Guide

## 🎉 Congratulations! Your CMS is Ready!

You now have a powerful Content Management System integrated into your Yoruba Heritage website. Here's how to set it up and use it:

---

## 📋 Setup Steps (After Deploying to Netlify)

### Step 1: Enable Netlify Identity

1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Settings** → **Identity**
4. Click **Enable Identity**

### Step 2: Configure Git Gateway

1. In Identity settings, scroll to **Services**
2. Click **Enable Git Gateway**
3. This allows the CMS to save changes to your GitHub repository

### Step 3: Set Registration Preferences

1. In Identity settings, go to **Registration**
2. Set to **Invite only** (so only you can invite collaborators)
3. Add external providers if desired (Google, GitHub, etc.)

### Step 4: Invite Users

1. Go to **Identity** tab in Netlify
2. Click **Invite users**
3. Enter email addresses of collaborators
4. They'll receive an invitation email

---

## 🎯 How to Access the CMS

### For Administrators:
**URL**: `https://your-site-name.netlify.app/admin/`

**Example**: `https://yoruba-heritage.netlify.app/admin/`

### Login Process:
1. Visit `/admin/` on your live site
2. Click "Login with Netlify Identity"
3. Enter your email and password
4. Start creating content!

---

## 📝 What You Can Do in the CMS

### 1. **Articles**
- Create new historical articles
- Upload featured images
- Categorize (history, culture, people, diaspora, language)
- Set featured status
- Add tags
- Write in Markdown with rich text editor

### 2. **Traditional Stories**
- Add folktales, legends, myths, parables
- Include moral lessons
- Upload images
- Easy formatting

### 3. **IFA Wisdom**
- Document IFA teachings
- Organize by category
- Add educational content

### 4. **Gallery**
- Upload images with descriptions
- Categorize by type
- Add location and credit information

### 5. **Pages**
- Edit About page
- Update mission statement
- Modify static content

---

## 👥 User Permission Levels

You can set different roles in Netlify Identity:

### **Admin**
- Full access to everything
- Can publish immediately
- Can invite users
- Can delete content

### **Editor**
- Create and edit content
- Submit for review
- Cannot publish without approval

### **Contributor**
- Create drafts only
- Must submit for review
- Limited editing rights

**To set roles**: Netlify Dashboard → Identity → Select user → Edit roles

---

## 🔄 Editorial Workflow

The CMS includes an editorial workflow with three stages:

1. **Drafts** - Work in progress
2. **In Review** - Ready for approval
3. **Ready** - Approved and published

This ensures quality control before content goes live!

---

## 📁 How Content is Stored

All content is saved as **Markdown files** in your Git repository:

```
content/
├── articles/     # All articles
├── stories/      # Traditional stories
├── ifa/          # IFA wisdom
├── gallery/      # Gallery images
└── pages/        # Static pages

images/
└── uploads/      # Uploaded images
```

Every change creates a Git commit, so you have full version history!

---

## 🖼️ Image Management

### Uploading Images:
1. In any content form, click the image field
2. Upload from your computer or drag & drop
3. Images are automatically saved to `/images/uploads/`
4. Optimized for web automatically

### Image Requirements:
- **Recommended size**: 1200x800px for featured images
- **Format**: JPG, PNG, or WebP
- **Max file size**: 5MB (for performance)

---

## 🚀 Publishing Workflow

### Create New Content:
1. Login to `/admin/`
2. Choose a collection (Articles, Stories, etc.)
3. Click **New [Type]**
4. Fill in the form
5. Click **Save**

### Publishing:
- **Quick Publish**: Click "Publish" → "Publish now"
- **Editorial Workflow**: Change status to "In Review" → Admin approves → Publish

### Editing Existing Content:
1. Find the content in your collection
2. Click to edit
3. Make changes
4. Save and publish

---

## 🔐 Security Best Practices

1. **Use strong passwords** for all CMS users
2. **Enable 2FA** in Netlify Identity if available
3. **Keep invites to "invite-only"**
4. **Regularly review user list**
5. **Remove access** for users who no longer need it

---

## 🛠️ Connecting Your Existing Content

To connect the CMS content to your website, you'll need to:

1. Create a build script that reads Markdown files
2. Convert them to JSON for JavaScript to use
3. Update `js/articles.js`, `js/stories.js`, etc. to fetch from content folder

Would you like me to create these integration scripts for you?

---

## 💡 Tips for Success

✅ **Write good excerpts** - They show on listing pages
✅ **Use categories consistently** - Helps with filtering
✅ **Add alt text to images** - Good for SEO and accessibility
✅ **Preview before publishing** - Check how it looks
✅ **Use the editorial workflow** - Quality control matters

---

## 🆘 Common Issues & Solutions

### Can't login to CMS?
- Make sure Netlify Identity is enabled
- Check your email for the invitation
- Try clearing browser cache

### Images not showing?
- Check file size (max 5MB)
- Verify image path in content
- Ensure images/ folder exists

### Content not updating?
- Wait 2-3 minutes for Netlify to rebuild
- Check Netlify deploy logs
- Verify Git commit was created

---

## 📞 Next Steps

1. ✅ Deploy your site to Netlify
2. ✅ Enable Identity and Git Gateway
3. ✅ Invite your first collaborators
4. ✅ Create your first piece of content
5. ✅ Set up the build integration (optional)

Your Yoruba Heritage website now has a professional CMS that multiple people can use to keep content fresh and up-to-date! 🎊

---

**Need help?** Check the Netlify CMS documentation at: https://www.netlifycms.org/docs/
