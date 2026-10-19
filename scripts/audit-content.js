const fs = require('fs');
const wc = s => (s.replace(/^---[\s\S]*?\n---/, '').match(/\S+/g) || []).length;
for (const d of ['articles', 'stories', 'ifa', 'news', 'events']) {
  const f = fs.readdirSync('content/' + d).filter(x => x.endsWith('.md'));
  const w = f.map(x => [wc(fs.readFileSync(`content/${d}/${x}`, 'utf8')), x]).sort((a, b) => a[0] - b[0]);
  console.log(d, f.length, 'min', w[0][0], 'median', w[w.length >> 1][0], '<400:', w.filter(x => x[0] < 400).length, '<800:', w.filter(x => x[0] < 800).length);
  if (d === 'articles') w.slice(0, 12).forEach(x => console.log('   ', x[0], x[1]));
}
let real = 0, tpl = 0;
for (const x of fs.readdirSync('content/odu-ifa')) {
  /### Overview/.test(fs.readFileSync('content/odu-ifa/' + x, 'utf8')) ? real++ : tpl++;
}
console.log('odu with overview', real, 'templated', tpl);
