# 🔧 Domain Connection Troubleshooting Guide

## 🚨 Current Issue

Your domain `yorubaheritage.com` shows **"This domain has recently been registered with Namecheap"** instead of your website.

### Why This Happens:
- ✅ Domain registered successfully
- ✅ DNS may be configured
- ❌ **Netlify is NOT serving your site at this domain**
- ❌ The domain is pointing to Namecheap's parking page, not Netlify

---

## 🎯 Solution: Connect Your Domain to Netlify

### **Step 1: Check Your Netlify Deployment**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Log in to your account
3. Find your Yoruba Heritage site
4. Check the **site URL** (should be something like `yoursite.netlify.app`)

**Questions:**
- Is your site deployed on Netlify? (Do you have a `*.netlify.app` URL?)
- Can you access your site at the Netlify URL?

---

### **Step 2: Add Custom Domain in Netlify**

If your site is deployed:

1. **In Netlify Dashboard:**
   - Click your site
   - Go to **"Domain management"** or **"Domain settings"**
   - Click **"Add custom domain"**
   - Enter: `yorubaheritage.com`
   - Also add: `www.yorubaheritage.com`
   - Click **"Verify"** and **"Add domain"**

2. **Netlify will show DNS instructions:**
   - You'll see either:
     - **Option A**: Netlify DNS (nameservers)
     - **Option B**: External DNS (A record + CNAME)

---

### **Step 3A: Using Netlify DNS (Recommended)**

**Advantages:**
- ✅ Automatic SSL
- ✅ Faster DNS updates
- ✅ Easier management
- ✅ Better performance

**Steps:**

1. **In Netlify:**
   - Copy the 4 nameservers (e.g., `dns1.p01.nsone.net`)

2. **In Namecheap:**
   - Go to [Namecheap Dashboard](https://ap.www.namecheap.com/)
   - Click "Domain List"
   - Click "Manage" next to `yorubaheritage.com`
   - Scroll to **"NAMESERVERS"**
   - Select **"Custom DNS"**
   - Enter Netlify's 4 nameservers:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - Click **"Save"**

3. **Wait 24-48 hours** for DNS propagation
   - Usually works in 1-2 hours
   - Check status: [whatsmydns.net](https://www.whatsmydns.net/)

---

### **Step 3B: Using Namecheap DNS (Current Setup)**

If you want to keep Namecheap DNS:

1. **Get Netlify's IP address:**
   - In Netlify > Domain settings
   - Look for the A record IP (usually `75.2.60.5`)
   - Note the CNAME target for `www` (usually `yoursite.netlify.app`)

2. **In Namecheap:**
   - Go to Domain List > Manage > Advanced DNS
   - Delete the default "URL Redirect Record" and "Parking Page" records
   - Add these records:

   | Type  | Host | Value                    | TTL       |
   |-------|------|--------------------------|-----------|
   | A     | @    | 75.2.60.5               | Automatic |
   | CNAME | www  | yoursite.netlify.app    | Automatic |

   ⚠️ **Replace** `yoursite.netlify.app` with YOUR actual Netlify URL

3. **In Netlify:**
   - Go to Domain settings
   - Click **"Verify DNS configuration"**
   - Wait for SSL certificate (automatic, takes 1-2 hours)

---

## 🔍 Current Diagnosis

Based on your screenshot, I can see:

1. ✅ Domain resolves (DNS working)
2. ✅ Site loads (200 status codes)
3. ❌ **Shows Namecheap parking page** = Domain NOT connected to Netlify
4. ❌ Netlify is NOT receiving requests for this domain

### Most Likely Causes:

**Cause #1: Site Not Deployed to Netlify**
- Have you pushed your code to GitHub/GitLab?
- Have you connected the repository to Netlify?
- Is the site building successfully?

**Cause #2: Domain Not Added in Netlify**
- Domain must be added in Netlify's domain settings
- Can't just change DNS without telling Netlify

**Cause #3: Wrong DNS Records**
- DNS points to Namecheap, not Netlify
- Need to update A records or nameservers

---

## ✅ Quick Checklist

Please check and tell me:

- [ ] **Is your code on GitHub/GitLab?**
  - If NO: Need to push code first
  - If YES: What's the repository URL?

- [ ] **Is your site on Netlify?**
  - If NO: Need to deploy first
  - If YES: What's your `*.netlify.app` URL?

- [ ] **Can you access the Netlify dashboard?**
  - If NO: Need to create account
  - If YES: Can you see your site?

- [ ] **Have you added the custom domain in Netlify?**
  - If NO: **THIS IS LIKELY THE ISSUE**
  - If YES: What DNS method are you using?

---

## 🚀 Complete Setup Process (If Starting Fresh)

### Phase 1: Deploy to Netlify (If Not Done)

1. **Push code to GitHub:**
   ```bash
   cd /Users/eletu/Yoruba
   git init
   git add .
   git commit -m "Initial commit - Yoruba Heritage Website"
   # Create repo on GitHub first, then:
   git remote add origin https://github.com/yourusername/yoruba-heritage.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `./` (root)
   - Click "Deploy"

3. **Wait for deployment:**
   - First build takes 2-5 minutes
   - You'll get a `*.netlify.app` URL

### Phase 2: Connect Domain

1. **In Netlify Dashboard:**
   - Site settings > Domain management
   - Add custom domain: `yorubaheritage.com`
   - Add custom domain: `www.yorubaheritage.com`

2. **Choose DNS Method:**
   - **Option A**: Use Netlify DNS (copy nameservers to Namecheap)
   - **Option B**: Use Namecheap DNS (add A + CNAME records)

3. **Update DNS:**
   - Follow steps in Step 3A or 3B above

4. **Wait for propagation:**
   - 1-48 hours (usually 1-2 hours)

5. **SSL Certificate:**
   - Netlify auto-provisions SSL
   - Takes 1-2 hours after DNS is verified
   - Your site will show SSL error until ready
   - Then: ✅ `https://yorubaheritage.com` works!

---

## 🔧 Testing Your Setup

### Check DNS Propagation:
```bash
# Check if domain points to Netlify
dig yorubaheritage.com

# Should show Netlify's IP (75.2.60.5) or nameservers
```

### Check in Browser:
1. Clear browser cache (Cmd+Shift+R on Mac)
2. Try incognito/private mode
3. Visit: `http://yorubaheritage.com` (without https first)
4. Visit: `https://www.yorubaheritage.com`

### Check DNS Globally:
- Visit: https://www.whatsmydns.net/
- Enter: `yorubaheritage.com`
- Check if it points to Netlify servers

---

## 🆘 Still Not Working?

### Tell Me:

1. **Your Netlify URL** (e.g., `inspiring-curie-12345.netlify.app`)
   - Or: "I don't have one yet"

2. **Your GitHub repo** (if you have one)
   - Or: "Code is only on my computer"

3. **What you see in Netlify dashboard**
   - Screenshot or description

4. **Your Namecheap DNS settings**
   - Go to: Advanced DNS tab
   - Screenshot the records

5. **When you registered the domain**
   - Today? Last week?

---

## 🎯 Most Common Solutions

### Solution #1: Deploy First (Most Likely)
```bash
# If you haven't deployed yet:
cd /Users/eletu/Yoruba

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub (create repo first on github.com)
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# Then connect to Netlify via their dashboard
```

### Solution #2: Add Domain in Netlify
- Netlify Dashboard > Your Site > Domain settings
- Click "Add custom domain"
- Enter your domain
- Follow DNS instructions

### Solution #3: Fix DNS Records
- Use Netlify DNS (recommended)
- OR update A record to point to Netlify

---

## 📞 Next Steps

**Please provide:**

1. Your Netlify URL (or confirm you need to deploy)
2. Whether your code is on GitHub
3. Screenshot of Netlify domain settings (if deployed)
4. What you want me to help with first

**Then I can:**
- Guide you through deployment if needed
- Help fix DNS configuration
- Set up SSL certificate
- Get your site live! 🚀

---

*This is a common issue and easy to fix once we know which step needs attention!*
