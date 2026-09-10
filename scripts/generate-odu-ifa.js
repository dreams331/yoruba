#!/usr/bin/env node
/**
 * Generates markdown content files for all 256 Odu Ifa
 * (16 principal Odu Meji + 240 Omo Odu combinations)
 * into content/odu-ifa/ so they are editable via the CMS
 * and processed by build-content.js into data/odu-ifa.json.
 *
 * Run with: node scripts/generate-odu-ifa.js
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'content', 'odu-ifa');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// The 16 principal Odu Meji in traditional order of seniority.
// pattern: 4 marks for one leg ("I" = single line, "II" = double line).
// Since it's a "Meji" (twin), both legs are identical.
const MAJORS = [
  { slug: 'eji-ogbe', name: 'Èjì Ogbè', pattern: ['I','I','I','I'], orisha: 'Ọ̀rúnmìlà / Olódùmarè', theme: 'light, new beginnings, divine potential',
    short: 'The senior Odu — pure light, new beginnings and the seed of all destiny.',
    proverbYo: 'Imọ́lẹ̀ kìí ṣe n̄ǹkan tí a fún ọ — imọ́lẹ̀ ni ọ jẹ́.',
    proverbEn: 'Light is not something given to you — light is what you are.',
    lesson: 'You were not born by accident. Every person carries an ori (destiny) chosen before birth. Ogbè teaches that your task is to remember and fulfil your purpose, and to lead with clarity, honesty and generosity of spirit.' },
  { slug: 'oyeku-meji', name: 'Ọ̀yẹ̀kú Méjì', pattern: ['II','II','II','II'], orisha: 'Ikú (Death) / Ọ̀sun', theme: 'endings, the ancestors, the unseen world, mortality',
    short: 'The Odu of endings, the ancestors, and the wisdom hidden in darkness.',
    proverbYo: 'Òkú tó sun, kì í jí mọ́; ẹ̀mí tó lọ, kì í padà bí ara.',
    proverbEn: 'The dead that sleeps does not wake again; the spirit that departs does not return in the same body.',
    lesson: 'Ọ̀yẹ̀kú teaches respect for the ancestors, acceptance of mortality, and the understanding that every ending clears space for renewal. It warns against arrogance in the face of life\'s fragility.' },
  { slug: 'iwori-meji', name: 'Ìwòrì Méjì', pattern: ['I','II','I','II'], orisha: 'Ọ̀sanyìn / Ọ̀rúnmìlà', theme: 'self-knowledge, hidden truth, inner vision',
    short: 'The Odu of self-knowledge — seeing what is hidden, including within oneself.',
    proverbYo: 'Bí a kò bá mọ ara ẹni, a kì í mọ ẹlòmíràn.',
    proverbEn: 'If one does not know oneself, one cannot truly know another.',
    lesson: 'Ìwòrì calls for introspection and honesty about one\'s own motives before judging others. It reveals secrets — both dangerous and beneficial — and teaches that true wisdom begins with self-awareness.' },
  { slug: 'odi-meji', name: 'Òdí Méjì', pattern: ['II','I','I','II'], orisha: 'Ọya / Yemọja', theme: 'the womb, mystery, transformation, hidden depth',
    short: 'The mystery of the womb — transformation, secrets, and the depths of creation.',
    proverbYo: 'Ohun tó wà nínú, kì í fi ara rẹ̀ hàn ní ọ̀nà kan ṣoṣo.',
    proverbEn: 'What is within does not reveal itself in only one way.',
    lesson: 'Òdí teaches patience with processes that are not yet visible — pregnancy, growth, and transformation take time in darkness before they emerge into light. It also warns against forcing what must unfold naturally.' },
  { slug: 'irosun-meji', name: 'Ìrosùn Méjì', pattern: ['I','I','II','II'], orisha: 'Ṣàngó / Ọya', theme: 'blood, sacrifice, warning, consequence',
    short: 'The Odu of blood and consequence — sacrifice, warning, and the price of action.',
    proverbYo: 'Ẹ̀jẹ̀ tí a tú sílẹ̀ kì í padà sí inú ara.',
    proverbEn: 'Blood that is spilled does not return to the body.',
    lesson: 'Ìrosùn warns that actions have irreversible consequences, and that ẹbọ (sacrifice) — whether of time, pride, or resources — is often required to avert disaster. It teaches accountability.' },
  { slug: 'owonrin-meji', name: 'Ọ̀wọ́nrín Méjì', pattern: ['II','I','II','I'], orisha: 'Èṣù / Ọ̀rúnmìlà', theme: 'instability, change, the trickster\'s lesson, humility',
    short: 'The Odu of upheaval and change — nothing stays the same, and pride precedes a fall.',
    proverbYo: 'Ohun tó dúró jẹ́ẹ́, ni yíò yí padà.',
    proverbEn: 'What stands firm today may be overturned tomorrow.',
    lesson: 'Ọ̀wọ́nrín teaches humility in success and resilience in reversal. It reminds us that fortunes change, so one must remain adaptable, avoid arrogance, and treat others well on the way up.' },
  { slug: 'obara-meji', name: 'Ọ̀bàrà Méjì', pattern: ['I','I','I','II'], orisha: 'Ṣàngó / Ọ̀bàtálá', theme: 'honour, boastfulness, the danger of pride, leadership',
    short: 'The Odu of honour and pride — the gift and the danger of confidence.',
    proverbYo: 'Ìgbéraga ni í tẹ̀lé àṣejù ìṣọ́ra.',
    proverbEn: 'Excess confidence is often followed by a fall.',
    lesson: 'Ọ̀bàrà teaches that leadership and confidence are gifts, but boastfulness invites downfall. True honour is shown through humility and generosity, not empty declarations.' },
  { slug: 'okanran-meji', name: 'Ọ̀kànràn Méjì', pattern: ['II','I','I','I'], orisha: 'Ọya / Ògún', theme: 'conflict, truth-telling, sharp consequences',
    short: 'The Odu of sharp truths — conflict, exposure, and the cost of dishonesty.',
    proverbYo: 'Òtítọ́ máa ń dùn, ṣùgbọ́n irọ́ máa ń pa ni níkẹyìn.',
    proverbEn: 'Truth may sting, but a lie eventually destroys.',
    lesson: 'Ọ̀kànràn exposes what is hidden and warns against betrayal, gossip, and dishonesty. It teaches that confronting conflict honestly, though painful, prevents greater harm later.' },
  { slug: 'ogunda-meji', name: 'Ògúndá Méjì', pattern: ['I','II','II','II'], orisha: 'Ògún', theme: 'struggle, tools, perseverance, clearing the path',
    short: 'The Odu of struggle and perseverance — clearing a path through hardship with the tools you have.',
    proverbYo: 'Ọ̀nà tí a kò gbóná, a kì í rìn án láìsí ọgbọ́n.',
    proverbEn: 'A path that has not been cleared cannot be walked without skill and effort.',
    lesson: 'Ògúndá honours the warrior spirit of Ògún — perseverance, the courage to clear obstacles, and the discipline of using one\'s tools and skills wisely rather than recklessly.' },
  { slug: 'osa-meji', name: 'Ọ̀sá Méjì', pattern: ['II','II','II','I'], orisha: 'Ọya', theme: 'upheaval, the whirlwind, sudden change, protection from harm',
    short: 'The Odu of the whirlwind — sudden upheaval that clears away stagnation.',
    proverbYo: 'Afẹ́fẹ́ tó le kì í fi ìgi sílẹ̀ láìṣí àyípadà.',
    proverbEn: 'A strong wind never leaves a tree unchanged.',
    lesson: 'Ọ̀sá teaches resilience through sudden disruption. What feels destructive can also clear away what no longer serves growth. It calls for protection (ẹbọ) and steady faith during turbulent seasons.' },
  { slug: 'ika-meji', name: 'Ìká Méjì', pattern: ['I','II','II','I'], orisha: 'Ọya / Èṣù', theme: 'cruelty, resentment, the need for restraint',
    short: 'The Odu that warns against cruelty, resentment, and the corrosive effects of malice.',
    proverbYo: 'Ìkà ọkàn kì í mú àlàáfíà wá.',
    proverbEn: 'A cruel heart never brings peace.',
    lesson: 'Ìká warns of the dangers of bitterness, envy, and vengeance — both suffering it and inflicting it. It teaches restraint, forgiveness, and guarding one\'s heart against becoming hardened by pain.' },
  { slug: 'oturupon-meji', name: 'Òtúrúpọ̀n Méjì', pattern: ['II','II','I','I'], orisha: 'Ọbàtálá / Ọ̀rúnmìlà', theme: 'illness and healing, secrets of the body, patience',
    short: 'The Odu of illness and healing — patience with the body and the wisdom of proper treatment.',
    proverbYo: 'Àrùn tí a kò tọ́jú lọ́nà tí ó tọ́ kì í yá.',
    proverbEn: 'An illness not treated in the right way does not heal.',
    lesson: 'Òtúrúpọ̀n calls for patience, proper diagnosis before action, and respect for the body\'s natural healing processes. It also symbolises the wisdom that comes from surviving hardship.' },
  { slug: 'otura-meji', name: 'Òtúrá Méjì', pattern: ['I','I','II','I'], orisha: 'Ọ̀rúnmìlà / Ọbàtálá', theme: 'transformation, clarity after confusion, truth revealed',
    short: 'The Odu of transformation — clarity and truth emerging after a period of confusion.',
    proverbYo: 'Kùràkùrà ọjọ́ ni ìmọ́lẹ̀ ọjọ́ tuntun.',
    proverbEn: 'The dimness before dawn gives way to the light of a new day.',
    lesson: 'Òtúrá teaches that confusion and difficulty are often temporary, giving way to clarity for those who remain patient and truthful. It marks turning points and the wisdom gained through transformation.' },
  { slug: 'irete-meji', name: 'Ìrẹtẹ̀ Méjì', pattern: ['I','II','I','I'], orisha: 'Ọ̀rúnmìlà / Ọya', theme: 'perseverance despite setbacks, hidden victory',
    short: 'The Odu of quiet perseverance — victory that comes after private struggle.',
    proverbYo: 'Ìṣẹ́gun tí a kò fojú rí ni í dùn jù.',
    proverbEn: 'The victory unseen by others is often the sweetest.',
    lesson: 'Ìrẹtẹ̀ teaches resilience in adversity, especially struggles others cannot see. It reassures that persistence — even quiet, unglamorous effort — leads to eventual triumph.' },
  { slug: 'ose-meji', name: 'Ọ̀ṣẹ́ Méjì', pattern: ['II','II','I','II'], orisha: 'Ọ̀ṣun', theme: 'blessings, sweetness, abundance, gratitude',
    short: 'The Odu of blessings and sweetness — abundance that flows from generosity and gratitude.',
    proverbYo: 'Ọwọ́ tí ó fúnni, ni Ọlọ́run í fi kún.',
    proverbEn: 'The hand that gives is the one Olódùmarè fills.',
    lesson: 'Ọ̀ṣẹ́ celebrates the sweetness of life earned through generosity, hospitality, and gratitude. It teaches that abundance flows to those who share freely and honour Ọ̀ṣun\'s spirit of grace.' },
  { slug: 'ofun-meji', name: 'Òfún Méjì', pattern: ['II','I','II','II'], orisha: 'Ọbàtálá / Olódùmarè', theme: 'purity, old age, completion, moral integrity',
    short: 'The elder Odu of purity and completion — moral integrity across a long life.',
    proverbYo: 'Funfun ni àrà; kò gba ìdọ̀tí láti dúró funfun.',
    proverbEn: 'White is sacred; it takes discipline to remain unstained.',
    lesson: 'Òfún, closely tied to Ọbàtálá, teaches purity of character, patience, and the moral discipline required to age gracefully and finish life\'s journey with integrity intact.' },
];

// Fix the reversed array literal above (typo-safe)
MAJORS.forEach(m => { if (!Array.isArray(m.pattern)) m.pattern = ['I','I','I','I']; });

function frontMatterEscape(str) {
  return String(str).replace(/"/g, '\\"');
}

function writeMd(filename, fm, body) {
  const lines = ['---'];
  Object.entries(fm).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      v.forEach(item => lines.push(`  - "${frontMatterEscape(item)}"`));
    } else if (typeof v === 'boolean' || typeof v === 'number') {
      lines.push(`${k}: ${v}`);
    } else {
      lines.push(`${k}: "${frontMatterEscape(v)}"`);
    }
  });
  lines.push('---', '');
  fs.writeFileSync(path.join(OUT_DIR, filename), lines.join('\n') + body + '\n');
}

let count = 0;

// 1) Write the 16 principal Odu Meji (full depth)
MAJORS.forEach((m, i) => {
  const body = `\n## ${m.name}\n\n> *"${m.proverbYo}"*\n> *"${m.proverbEn}"*\n\n---\n\n### Meaning\n\n${m.short}\n\n### Associated Òrìṣà\n\n${m.orisha}\n\n### Life Lesson\n\n${m.lesson}\n\n---\n\n*This is one of the 16 principal Odù Ifá (Odù Méjì) — the senior figures from which all 240 Omo Odù are formed by combination.*\n`;
  writeMd(`odu-meji-${String(i+1).padStart(2,'0')}-${m.slug}.md`, {
    title: m.name,
    number: i + 1,
    category: 'Odu Meji',
    slug: m.slug,
    parent1: m.slug,
    parent2: m.slug,
    orisha: m.orisha,
    theme: m.theme,
    proverb_yo: m.proverbYo,
    proverb_en: m.proverbEn,
    excerpt: m.short,
    pattern_right: m.pattern.join(','),
    pattern_left: m.pattern.join(','),
  }, body);
  count++;
});

// 2) Generate the 240 Omo Odu (all ordered pairs of two different majors)
MAJORS.forEach((a, i) => {
  MAJORS.forEach((b, j) => {
    if (i === j) return; // skip Meji (already written above)
    const combinedName = `${a.name.replace(' Méjì','').replace(' Ogbè','Ogbè')}-${b.name.replace(' Méjì','').replace(' Ogbè','Ogbè')}`;
    const slug = `${a.slug.replace('-meji','')}-${b.slug.replace('-meji','')}`;
    const short = `${combinedName} combines the energy of ${a.name} (${a.theme}) with ${b.name} (${b.theme}). It is read as a distinct Odù with its own guidance, drawing on both influences.`;
    const lesson = `When ${combinedName} appears, it suggests a situation where the lessons of ${a.name} — ${a.theme} — must be balanced with the lessons of ${b.name} — ${b.theme}. ${a.name} advises: ${a.lesson.split('.')[0]}. ${b.name} adds: ${b.lesson.split('.')[0]}. Together, they call for wisdom that honours both sides of this Odù.`;
    const body = `\n## ${combinedName}\n\n### Meaning\n\n${short}\n\n### Governing Influences\n\n- **${a.name}** — ${a.theme} (${a.orisha})\n- **${b.name}** — ${b.theme} (${b.orisha})\n\n### Guidance\n\n${lesson}\n\n---\n\n*${combinedName} is one of the 240 Omo Odù formed by combining two of the 16 principal Odù Méjì. Naming conventions for Omo Odù can vary between Ifá lineages; this entry uses a systematic right–left naming for clarity.*\n`;
    writeMd(`omo-odu-${String(count-15).padStart(3,'0')}-${slug}.md`, {
      title: combinedName,
      number: count + 1,
      category: 'Omo Odu',
      slug,
      parent1: a.slug,
      parent2: b.slug,
      orisha: `${a.orisha}; ${b.orisha}`,
      theme: `${a.theme}; ${b.theme}`,
      excerpt: short,
      pattern_right: a.pattern.join(','),
      pattern_left: b.pattern.join(','),
    }, body);
    count++;
  });
});

console.log(`✅ Generated ${count} Odu Ifa files in ${OUT_DIR}`);
