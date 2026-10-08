# Auto-posting Yoruba Heritage to Facebook (Make.com)

**Goal:** every new article or story on the website is posted to the Facebook Page automatically, with a short hook and a link, and reads like a real person wrote it.

**You do not need Buffer or RSS.app.** The website already publishes its own feed:

    https://yorubaheritage.com/feed.xml

It lists the 30 newest articles and stories (title, link, date, a one-to-two sentence summary and an image). It updates itself every time the site is deployed. You do not need access to the code repository.

## Setup (about 15 minutes)

1. In Make.com create a **new scenario**.
2. Add the module **RSS → Watch RSS feed items**.
   - URL: `https://yorubaheritage.com/feed.xml`
   - Maximum number of returned items: `3`
   - On the first run choose **"From now on"** (not "All"), otherwise it will post the 30 existing items at once.
3. Add the module **Facebook Pages → Create a Post with Photos** (the same one used in the tutorial video).
   - Connection: log in with a Facebook account that is an **admin of the Page**.
   - Page: choose the Yoruba Heritage Page.
   - Image input type: **Use a photo URL**.
   - Photo URL: map `Enclosure URL` (the image from the feed).
   - Message: see the templates below.
4. Set the schedule to run **every 1 hour** (or every 15 minutes if the plan allows). Posts are not instant: they go out after the next website deploy plus the next scenario run.
5. Click **Run once** to test. Check the post on the Page, then switch the scenario **ON**.

## Message template (so posts don't look automated)

Use the item's fields in this order. Keep it short.

    {Title}

    {Description}

    Read more: {Link}

    #Yoruba #YorubaCulture #YorubaHeritage

Tips:
- Put the **link last** so the preview card shows.
- Don't paste the whole article. The summary is already one or two sentences.
- Use the **Category** field (it is `history`, `culture`, `story`, and so on) to vary the hashtag or opening line with a Make **Router**: one route for stories ("A traditional story:"), one for articles ("New on Yoruba Heritage:"). That variety makes the Page feel less robotic.
- Do **not** post more than 2 items per hour. Facebook may treat bursts as spam.

## Checks

- If a post is missing, open `https://yorubaheritage.com/feed.xml` in a browser. The new item should be at the top. If it is not there, the website has not deployed yet (see the branch notes below).
- Items older than the last run are skipped automatically (Make remembers what it has seen).

## Publishing content so it reaches the feed

The site uses the Decap CMS editorial workflow. A save alone does **not** publish:

1. Write the entry and **Save**.
2. Set the status to **Ready**.
3. Click **Publish → Publish now**.
4. Wait for the site to deploy (about 1–2 minutes), then check the live page in a private browser window.

New items appear in `feed.xml` after that deploy.
