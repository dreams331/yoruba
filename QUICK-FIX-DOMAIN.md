# 🔧 Quick Fix Guide - Domain Reconnection

## 🎯 Your Situation

- ✅ Site deployed: `yoruba-heritage.netlify.app`
- ✅ Code on GitHub: `github.com/dreams331/yoruba`
- ✅ Domain was working before
- ❌ Now shows Namecheap parking page

## 🚨 What Happened

Something likely changed in:
1. Netlify domain settings (domain removed or DNS not verified)
2. Namecheap DNS records (accidentally changed or reset)
3. SSL certificate expired or needs renewal

---

## ✅ SOLUTION: Reconnect Your Domain

### **Step 1: Check Netlify Domain Settings**

1. Go to: https://app.netlify.com/sites/yoruba-heritage/settings/domain
2. Look under **"Custom domains"**
3. Check if `yorubaheritage.com` is listed

**If the domain is NOT listed:**
- Click **"Add custom domain"**
- Enter: `yorubaheritage.com`
- Click "Verify" and "Add domain"
- Also add: `www.yorubaheritage.com`

**If the domain IS listed but has warnings:**
- Look for yellow/red warnings about DNS
- Click "Verify DNS configuration"
- Note any error messages

---

### **Step 2: Check Your DNS Method**

In Netlify domain settings, check which DNS you're using:

**Option A: Netlify DNS** (Recommended)
- Shows 4 Netlify nameservers
- Faster, easier, automatic SSL

**Option B: External DNS** (Namecheap)
- Shows A record and CNAME instructions
- Need to configure in Namecheap

---

### **Step 3A: If Using Netlify DNS (Recommended)**

1. **In Netlify:**
   - Copy the 4 nameservers (example):
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```

2. **In Namecheap:**
   - Go to: https://ap.www.namecheap.com/domains/list/
   - Click "Manage" next to `yorubaheritage.com`
   - Scroll to "NAMESERVERS"
   - Select "Custom DNS"
   - Enter all 4 Netlify nameservers
   - Click "Save" (green checkmark)

3. **Wait 1-4 hours** for DNS propagation
   - Clear browser cache
   - Try in incognito mode
   - Check: https://www.whatsmydns.net/#NS/yorubaheritage.com

---

### **Step 3B: If Using Namecheap DNS**

1. **In Netlify:**
   - Note the Load Balancer IP: `75.2.60.5` (or check your specific IP)

2. **In Namecheap:**
   - Go to: Domain List > Manage > **Advanced DNS**
   - Click "ADD NEW RECORD"
   - Create these records:

   | Type  | Host | Value                           | TTL       |
   |-------|------|---------------------------------|-----------|
   | A     | @    | 75.2.60.5                      | Automatic |
   | CNAME | www  | yoruba-heritage.netlify.app    | Automatic |

   **Delete these if they exist:**
   - URL Redirect Record
   - Parking Page
   - Any other A or CNAME records for @ or www

3. **Save changes** and wait 30 minutes - 2 hours

---

### **Step 4: Force SSL Certificate Renewal**

After DNS is correct:

1. **In Netlify:**
   - Domain settings > HTTPS
   - Click "Verify DNS configuration"
   - If shows error, wait 30 mins and try again
   - Click "Renew certificate" if available

2. **Wait for SSL:**
   - Takes 1-2 hours after DNS is verified
   - You'll see: "Netlify is provisioning a certificate"
   - When done: Shows "HTTPS enabled"

---

## 🔍 Quick Diagnostic Commands

Run these in your terminal to check current status:

```bash
# Check if domain points to Netlify
dig yorubaheritage.com +short

# Expected for Netlify DNS: nameservers
# Expected for A record: 75.2.60.5 (or similar)

# Check www subdomain
dig www.yorubaheritage.com +short

# Expected: yoruba-heritage.netlify.app or IP

# Check nameservers
dig NS yorubaheritage.com +short

# Should show Netlify nameservers if using Netlify DNS
```

---

## 🚀 Most Likely Fix (Based on Your Situation)

Since it WAS working before, probably:

### Fix #1: Re-verify DNS in Netlify
1. Go to Netlify domain settings
2. Click "Verify DNS configuration"
3. If fails, check Namecheap DNS records
4. Ensure A record points to `75.2.60.5`
5. Ensure CNAME for www points to `yoruba-heritage.netlify.app`

### Fix #2: Switch to Netlify DNS (Easiest)
1. In Netlify: Click "Use Netlify DNS"
2. Copy the 4 nameservers
3. Update in Namecheap
4. Wait 2-4 hours
5. Done! ✅

---

## ⚡ Immediate Actions

**Do this RIGHT NOW:**

1. **Check Netlify:**
   - Visit: https://app.netlify.com/sites/yoruba-heritage/settings/domain
   - Screenshot the "Custom domains" section
   - Tell me what you see

2. **Check Namecheap DNS:**
   - Visit: https://ap.www.namecheap.com/domains/list/
   - Click "Manage" next to yorubaheritage.com
   - Go to "Advanced DNS" tab
   - Screenshot your DNS records
   - Tell me what records you see

3. **Test your Netlify site:**
   - Visit: https://yoruba-heritage.netlify.app
   - Does it work? (It should!)

---

## 📞 Tell Me What You See

Please check and report:

1. **Netlify Domain Settings:**
   - Is `yorubaheritage.com` listed under custom domains?
   - Any warnings or errors?
   - What does it say about DNS?

2. **Namecheap Nameservers:**
   - Go to: Domain List > Manage > Domain tab
   - What nameservers are showing?
     - Namecheap Basic DNS?
     - Custom DNS (Netlify)?
     - Other?

3. **Namecheap DNS Records (if using Namecheap DNS):**
   - Go to: Advanced DNS tab
   - What records exist for @ (root) and www?

Once you tell me what you see, I can give you the EXACT steps to fix it in 5 minutes! 🎯

---

## 🎁 Bonus: Prevent This in Future

After we fix it:
- Don't change nameservers in Namecheap
- Don't delete domain in Netlify
- Keep "Auto-renew" enabled for domain
- Document your DNS setup for reference

---

**Reply with what you see in Netlify and Namecheap, and I'll give you exact fix steps!** 🚀
