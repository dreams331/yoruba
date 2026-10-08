// Flags articles sharing long exact word runs with their cited source pages.
const fs = require('fs');
const dir = 'content/articles';
const N = 8;
const norm = s => s.toLowerCase().replace(/<[^>]*>/g, ' ').replace(/\[[^\]]*\]\([^)]*\)/g, ' ').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
const shingles = w => { const s = new Set(); for (let i = 0; i + N <= w.length; i++) s.add(w.slice(i, i + N).join(' ')); return s; };
(async () => {
  const out = [];
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const t = fs.readFileSync(`${dir}/${f}`, 'utf8');
    const urls = [...new Set([...t.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map(m => m[1].split('?')[0]))]
      .filter(u => !/youtube|youtu\.be|yorubaheritage/.test(u)).slice(0, 8);
    if (!urls.length) continue;
    const body = norm(t.replace(/^---[\s\S]*?\n---/, ''));
    const mine = shingles(body);
    let hit = new Set();
    for (const u of urls) {
      try {
        const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(15000) });
        if (!r.ok) continue;
        const theirs = shingles(norm(await r.text()));
        for (const s of mine) if (theirs.has(s)) hit.add(s);
      } catch (e) {}
    }
    out.push([f, urls.length, hit.size, mine.size]);
  }
  out.sort((a, b) => b[2] - a[2]);
  out.forEach(([f, n, h, m]) => console.log(`${String(h).padStart(4)} matches / ${m} windows (${(100 * h / m).toFixed(1)}%)  srcs=${n}  ${f}`));
  console.log('articles with citations:', out.length);
})();
