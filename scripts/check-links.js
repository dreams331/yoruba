const fs = require('fs'), p = require('path');
let bad = 0, checked = 0;
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(p.join(d, e.name)) : [p.join(d, e.name)]);
const all = [...files, ...walk('read').filter(f => f.endsWith('.html'))];
for (const f of all) {
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|\/\/|javascript:)/.test(u)) continue;
    if (u === '/') continue;
    checked++;
    const t = u.startsWith('/') ? u.slice(1) : u;
    if (!fs.existsSync(t)) { bad++; if (bad < 20) console.log(f, '->', u); }
  }
}
console.log(`checked ${checked} refs in ${all.length} pages; broken: ${bad}`);
