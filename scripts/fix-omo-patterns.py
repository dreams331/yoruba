#!/usr/bin/env python3
"""Set pattern_right / pattern_left of every Omo Odu file from its two parents'
Odu Meji patterns (right = parent1, left = parent2). Idempotent."""
import glob, os, re

BASE = os.path.join(os.path.dirname(__file__), '..', 'content', 'odu-ifa')

def field(txt, name):
    m = re.search(r'^%s:\s*"?([^"\n]+?)"?\s*$' % name, txt, re.M)
    return m.group(1).strip() if m else None

meji = {}
for p in glob.glob(os.path.join(BASE, 'odu-meji-*.md')):
    t = open(p, encoding='utf-8').read()
    meji[field(t, 'slug')] = field(t, 'pattern_right')

fixed = 0
for p in sorted(glob.glob(os.path.join(BASE, 'omo-odu-*.md'))):
    t = open(p, encoding='utf-8').read()
    r, l = meji[field(t, 'parent1')], meji[field(t, 'parent2')]
    new = t
    for name, val in (('pattern_right', r), ('pattern_left', l)):
        new = re.sub(r'^%s:.*$' % name, '%s: "%s"' % (name, val), new, count=1, flags=re.M)
    if new != t:
        open(p, 'w', encoding='utf-8').write(new)
        fixed += 1
print('fixed', fixed, 'files')
