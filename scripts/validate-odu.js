// Sanity-check the Odu Ifa data used by the Odù Explorer / Cast widget.
// Usage: node scripts/validate-odu.js   (exits 1 on any problem)
const d = require('../data/odu-ifa.json');
const meji = d.filter(o => o.category === 'Odu Meji');
const omo = d.filter(o => o.category === 'Omo Odu');
const slugs = new Set(meji.map(x => x.slug));
const pm = Object.fromEntries(meji.map(x => [x.slug, x.pattern_right]));

const badParents = omo.filter(o => !slugs.has(o.parent1) || !slugs.has(o.parent2)).map(o => o.id);
const unmatched = [];
for (const r of meji) for (const l of meji) {
    if (r.slug === l.slug) continue;
    const n = omo.filter(o => o.parent1 === r.slug && o.parent2 === l.slug).length;
    if (n !== 1) unmatched.push(`${r.slug} + ${l.slug} (${n})`);
}
const badPatterns = omo.filter(o => o.pattern_right !== pm[o.parent1] || o.pattern_left !== pm[o.parent2]).map(o => o.id);
const dupPatterns = meji.length - new Set(meji.map(x => x.pattern_right)).size;

console.log(`Odù Méjì: ${meji.length}, Omo Odù: ${omo.length}`);
console.log('Unknown parents:', badParents.length, badParents);
console.log('Pairs without exactly one match:', unmatched.length, unmatched);
console.log('Pattern mismatches vs parents:', badPatterns.length, badPatterns);
console.log('Duplicate Méjì patterns:', dupPatterns);
process.exit(meji.length === 16 && omo.length === 240 && !badParents.length && !unmatched.length && !badPatterns.length && !dupPatterns ? 0 : 1);
