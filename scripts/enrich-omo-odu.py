#!/usr/bin/env python3
"""Append a 'Reading this figure' section to every Omo Odù entry, drawn from its two
parent Odù Méjì (life lesson, everyday guidance, proverb). Idempotent: replaces the
block between the markers on re-run.
Run: python3 scripts/enrich-omo-odu.py"""
import re, glob, os

root = os.path.join(os.path.dirname(__file__), '..', 'content', 'odu-ifa')
START, END = '<!-- READING_START -->', '<!-- READING_END -->'

def section(text, name):
    m = re.search(r'### ' + re.escape(name) + r'\n\n(.*?)(?=\n### |\n---\n|\Z)', text, re.S)
    return m.group(1).strip() if m else ''

def fm(text, key):
    m = re.search(r'^' + key + r':\s*"?(.*?)"?\s*$', text, re.M)
    return m.group(1).strip() if m else ''

parents = {}
for f in glob.glob(os.path.join(root, 'odu-meji-*.md')):
    t = open(f, encoding='utf-8').read()
    slug = fm(t, 'slug')
    parents[slug] = dict(
        title=fm(t, 'title'), lesson=section(t, 'Life Lesson'),
        daily=section(t, 'Everyday Guidance'), py=fm(t, 'proverb_yo'), pe=fm(t, 'proverb_en'),
        reflect=section(t, 'Reflection'), meaning=section(t, 'Meaning'))

def marks(p):
    return ' · '.join('single' if x == 'I' else 'double' for x in p.split(','))

n = 0
for f in sorted(glob.glob(os.path.join(root, 'omo-odu-*.md'))):
    t = open(f, encoding='utf-8').read()
    p1, p2 = fm(t, 'parent1'), fm(t, 'parent2')
    if p1 not in parents or p2 not in parents:
        continue
    a, b = parents[p1], parents[p2]
    title = fm(t, 'title')
    pr, pl = fm(t, 'pattern_right'), fm(t, 'pattern_left')
    block = f'''{START}

### How this figure is read

In Ifá, a figure is built from two columns of four marks, read from the right column to the left. Here the right column is {a['title']} ({marks(pr)}) and the left column is {b['title']} ({marks(pl)}). Many diviners start with the right column and then bring in the left, though schools of Ifá differ in how they weigh the two. Reading {title} means holding both lessons together and asking how they bear on the question at hand.

### From {a['title']}

{a['lesson']}

*{a['py']}*  
"{a['pe']}"

### From {b['title']}

{b['lesson']}

*{b['py']}*  
"{b['pe']}"

### Putting the two together

{a['daily']} At the same time, {b['daily'][0].lower() + b['daily'][1:]}

Interpretations of individual Omo Odù differ between lineages and between diviners, so treat this page as a reading aid and not a ruling. A consultation with a trained Babaláwo or Ìyánífá will always be fuller than any written summary.

{END}
'''
    if START in t:
        t = re.sub(re.escape(START) + r'.*?' + re.escape(END) + r'\n?', block, t, flags=re.S)
    else:
        t = re.sub(r'(\n- - -\n|\n---\n\n\*)', lambda m: '\n' + block + m.group(1), t, count=1) \
            if re.search(r'\n(?:- - -|---)\n\n\*', t) else t.rstrip('\n') + '\n\n' + block
    open(f, 'w', encoding='utf-8').write(t)
    n += 1
print('enriched', n)
