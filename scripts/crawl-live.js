// Crawler-style audit of the LIVE site: no JS, follows sitemap + home links.
const SITE = 'https://yorubaheritage.com';
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' };
const get = async u => { try { const r = await fetch(u, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(20000) }); return { s: r.status, t: await r.text(), u: r.url }; } catch (e) { return { s: 0, t: '' }; } };
const strip = h => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
const words = h => (strip(h).match(/\S+/g) || []).length;
const meta = (h, re) => ((h.match(re) || [])[1] || '').trim();
(async () => {
  const sm = await get(`${SITE}/sitemap.xml`);
  const urls = [...sm.t.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log('sitemap urls:', urls.length, 'status', sm.s);
  const rows = []; const titles = new Map(); const descs = new Map(); const bodies = new Map();
  let i = 0;
  const q = [...urls];
  async function worker() {
    while (q.length) {
      const u = q.shift(); const r = await get(u); const h = r.t;
      const title = meta(h, /<title>([^<]*)<\/title>/i);
      const desc = meta(h, /<meta name="description" content="([^"]*)"/i);
      const w = words(h);
      const noindex = /noindex/i.test(h);
      const canon = meta(h, /<link rel="canonical" href="([^"]*)"/i);
      const ads = /adsbygoogle/.test(h);
      rows.push({ u, s: r.s, w, title, desc, noindex, canon, ads });
      titles.set(title, (titles.get(title) || 0) + 1); descs.set(desc, (descs.get(desc) || 0) + 1);
      const key = strip(h).replace(/\s+/g, ' ').slice(0, 600); bodies.set(key, (bodies.get(key) || 0) + 1);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  const bad = rows.filter(r => r.s !== 200);
  const thin = rows.filter(r => r.w < 300);
  const dupT = rows.filter(r => titles.get(r.title) > 1);
  const dupD = rows.filter(r => r.desc && descs.get(r.desc) > 1);
  const noTitle = rows.filter(r => !r.title), noDesc = rows.filter(r => !r.desc);
  const ni = rows.filter(r => r.noindex);
  const canonBad = rows.filter(r => r.canon && r.canon.replace(/\/$/, '') !== r.u.replace(/\/$/, ''));
  const sorted = [...rows].sort((a, b) => a.w - b.w);
  const med = sorted[sorted.length >> 1].w;
  console.log('crawled', rows.length, '| non-200:', bad.length, '| under 300 words:', thin.length, '| median words:', med);
  console.log('dup titles:', dupT.length, '| dup descriptions:', dupD.length, '| missing title:', noTitle.length, '| missing description:', noDesc.length);
  console.log('noindex in sitemap:', ni.length, '| canonical mismatch:', canonBad.length, '| near-identical page openings:', [...bodies.values()].filter(v => v > 3).length);
  console.log('ad script on', rows.filter(r => r.ads).length, 'of', rows.length, 'pages');
  console.log('\nshortest 12:'); sorted.slice(0, 12).forEach(r => console.log(String(r.w).padStart(5), r.u.replace(SITE, '')));
  const by = {}; rows.forEach(r => { const k = r.u.replace(SITE + '/', '').split('/')[0].replace(/\.html$/, '') || 'home'; (by[k] ||= []).push(r.w); });
  console.log('\nby section (count / median words):');
  Object.entries(by).sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => console.log(' ', k.padEnd(22), String(v.length).padStart(4), v.sort((a, b) => a - b)[v.length >> 1]));
  if (dupT.length) console.log('\ndup title sample:', dupT.slice(0, 5).map(r => r.title + ' | ' + r.u.replace(SITE, '')));
  if (bad.length) console.log('non-200 sample:', bad.slice(0, 5).map(r => r.s + ' ' + r.u));
})();
