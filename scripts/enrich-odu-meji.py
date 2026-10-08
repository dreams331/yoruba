#!/usr/bin/env python3
"""Append original interpretive sections to the 16 Odu Meji content files.
Idempotent: files that already contain '### Overview' are skipped."""
import glob, os, re

BASE = os.path.join(os.path.dirname(__file__), '..', 'content', 'odu-ifa')

# slug -> (overview, [themes], guidance, reflection question)
D = {
'eji-ogbe': (
 "Èjì Ogbè is the figure made of four open marks on both sides, the most complete expression of openness in the system. Because it is placed first, it is often described as the doorway to the other fifteen principal figures. It speaks of beginnings, of clarity, and of the moment before a path is chosen.",
 ["Clarity of purpose and honest self-presentation", "Leadership that serves rather than dominates", "The idea that every person arrives with a destiny (ori) to recognise and carry out", "Fresh starts, initiation and the opening of a season"],
 "When this figure is cast, tradition reads it as encouragement to act openly. Plan in the light, speak plainly, and avoid shortcuts that need to be hidden later. It also reminds a person that a good start still needs steady follow-through.",
 "What would I do differently if I had nothing to hide?"),
'oyeku-meji': (
 "Ọ̀yẹ̀kú Méjì is made of four closed marks on both sides, the mirror of Èjì Ogbè. If Ogbè is light, Ọ̀yẹ̀kú is the darkness that holds, rests and receives. In Yorùbá thought this is not only loss: night, sleep and the ancestors are part of the cycle that makes new life possible.",
 ["Respect for ancestors and elders", "Honest acceptance that life is finite", "Endings as preparation for renewal", "Rest, stillness and the value of what is not seen"],
 "Read in daily life, this figure asks a person to honour those who came before, settle unfinished obligations, and stop treating limits as enemies. It cautions against pride about health, wealth or status, since all of them are borrowed for a time.",
 "What do I need to close properly so that something new can begin?"),
'iwori-meji': (
 "Ìwòrì Méjì has a pattern of an open centre framed by closed marks, and its name is tied to the idea of looking inward and seeing. It is associated with insight, with discovering what lies beneath appearances, and with the discipline of examining one's own motives first.",
 ["Self-knowledge before judging others", "Hidden matters coming to light", "Careful observation and discernment", "Honesty in what one says about oneself"],
 "Tradition uses this figure to counsel reflection. Before blaming, ask what part is yours. Before trusting a story, look for what is missing from it. Insight gained this way can protect a person from deception, including self-deception.",
 "What am I refusing to look at in myself?"),
'odi-meji': (
 "Òdí Méjì is read through images of enclosure: the womb, the sealed pot, the closed door. These images are not negative. Many things must be held in a protected space before they can emerge, and this figure is a reminder that growth often happens out of sight.",
 ["Patience with slow, hidden processes", "Pregnancy, motherhood and nurture", "Protection and privacy", "Transformation that cannot be rushed"],
 "In practice, this figure advises a person not to uncover a plan, a project or a relationship too early. Give it time and shelter. It also warns against forcing outcomes, because pressure applied at the wrong stage can damage what is forming.",
 "What in my life needs more time and shelter before it is shown?"),
'irosun-meji': (
 "Ìrosùn Méjì is linked with the colour red, with blood, and with the deep ties between the living and their lineage. Its tone is serious. It is often treated as a figure of warning, because it points to the weight of actions and the need to respond to them responsibly.",
 ["Accountability and consequence", "Ẹbọ (offering) as a way of restoring balance", "Lineage, family blood and inheritance", "Caution in anger and in haste"],
 "Tradition reads this figure as a call to slow down and take stock before acting, especially when emotions run high. Where harm has been done, it points toward repair: acknowledging it, making amends, and not repeating it.",
 "Which of my actions still needs to be answered for or repaired?"),
'owonrin-meji': (
 "Ọ̀wọ́nrín Méjì is associated with shifting situations, with chance, and with the trickster qualities attributed to Èṣù. Its pattern is unbalanced in a way that suggests instability, and its teaching is mostly about how to behave when circumstances turn.",
 ["Humility in success", "Resilience in reversal", "Adaptability and quick thinking", "Treating people well because fortunes change"],
 "This figure suggests that a position held today can change tomorrow, so kindness and good relationships are better security than status. It also advises preparing for uncertainty rather than pretending it will not come.",
 "Am I treating people the way I would want to be treated if my position changed?"),
'obara-meji': (
 "Ọ̀bàrà Méjì is connected with confidence, public standing and leadership. It treats these as real strengths that need guarding against their most common weakness, which is boastfulness. A person who speaks beyond what they have done invites a fall.",
 ["Leadership and public responsibility", "Pride and its consequences", "Generosity as proof of real honour", "Keeping promises and commitments"],
 "Read practically, this figure advises that a person should let results speak. Say less than you can do, deliver what you say, and share credit. Reputation built that way is stronger than one built on announcements.",
 "Do my actions match what I say about myself?"),
'okanran-meji': (
 "Ọ̀kànràn Méjì is tied to sharp speech, conflict and the exposure of what has been concealed. It is a figure of direct truth. The tradition connects it to the cost of lies, gossip and betrayal, and to the relief that comes when matters are faced openly.",
 ["Truthfulness even when uncomfortable", "The harm done by gossip and betrayal", "Confronting conflict early", "Careful use of words"],
 "In everyday terms, this figure advises resolving disputes directly rather than letting them grow in silence. It also asks a person to think before speaking, because words once said cannot be taken back.",
 "Is there a conversation I have been avoiding that would clear the air?"),
'ogunda-meji': (
 "Ògúndá Méjì is associated with Ògún, the òrìṣà of iron, tools and the clearing of paths. Its themes are work, skill and perseverance. It honours the person who removes obstacles through effort and craft, and warns against using that same force carelessly.",
 ["Hard work and craftsmanship", "Clearing obstacles and opening roads", "Courage with discipline", "Responsible use of strength and tools"],
 "This figure reads as encouragement to keep working at a difficult task and to prepare the right tools before starting. It also cautions that power without restraint becomes destructive, so strength should be directed by purpose.",
 "What obstacle am I ready to clear, and do I have the right tools?"),
'osa-meji': (
 "Ọ̀sá Méjì is linked with wind, sudden movement and upheaval. It describes events that arrive quickly and rearrange things. The tradition does not treat this only as danger. A storm can also remove what has become stale and make room for new growth.",
 ["Sudden change and how to meet it", "Protection through offerings and prayer", "Letting go of what cannot be held", "Steadiness during turbulence"],
 "Practically, this figure advises preparation and calm. Keep essentials secure, avoid reacting to every disturbance, and look for what the change makes possible once it settles.",
 "What would I lose, and what might I gain, if things changed suddenly?"),
'ika-meji': (
 "Ìká Méjì is concerned with the inner life of bitterness, envy and cruelty, both in oneself and in others. It is a moral figure. Its attention is on how unresolved pain can harden into harmful behaviour, and on the self-control needed to prevent that.",
 ["Restraint and self-mastery", "Forgiveness as protection for oneself", "Recognising envy and resentment", "Not repaying harm with harm"],
 "This figure counsels watchfulness over one's own heart. If someone has wronged you, address it but do not let it define you. It also advises caution around people whose behaviour is driven by resentment.",
 "Which old hurt am I still feeding?"),
'oturupon-meji': (
 "Òtúrúpọ̀n Méjì is associated with illness, recovery and the body. In the tradition's reading, health is something to understand carefully, not to rush. The figure also stands for the strength of those who have come through hardship.",
 ["Proper diagnosis before action", "Patience in healing", "Respect for the body and its limits", "Wisdom gained from surviving difficulty"],
 "Read in daily life, this figure advises seeking the right help early, following treatment through, and resting enough. It also encourages care for people who are unwell, since recovery is helped by support.",
 "Am I paying attention to what my body and mind are telling me?"),
'otura-meji': (
 "Òtúrá Méjì marks a turn from confusion to clarity. Its pattern and name are associated with peace, with speaking truthfully, and with the moment when a problem becomes understandable. It carries a calmer tone than some of the more cautionary figures.",
 ["Clarity after difficulty", "Peaceful speech and reconciliation", "Turning points and transformation", "Patience until understanding arrives"],
 "In practice, the figure encourages a person not to make final decisions in the middle of confusion. Wait for understanding, speak calmly, and expect that the picture will clear for those who stay honest and patient.",
 "What decision should wait until I can see more clearly?"),
'irete-meji': (
 "Ìrẹtẹ̀ Méjì is associated with persistence through setbacks and with achievements that others do not see. It is a figure for people doing steady work without recognition, and it treats that quiet effort as meaningful in itself.",
 ["Perseverance in the face of delay", "Private effort that leads to later success", "Not being discouraged by comparison", "Careful, patient progress"],
 "This figure reads as reassurance for those who feel stuck. Keep going, keep records of progress, and avoid measuring yourself against people whose circumstances differ. Results often arrive later than hoped but are lasting when earned.",
 "What am I building quietly that deserves more patience?"),
'ose-meji': (
 "Ọ̀ṣẹ́ Méjì is linked with Ọ̀ṣun and with sweetness, beauty, abundance and care. It speaks of prosperity that comes through generosity and good relationships rather than through hoarding.",
 ["Gratitude and hospitality", "Generosity as the root of abundance", "Beauty, care and attractiveness of character", "Healthy relationships and community"],
 "Practically, this figure suggests giving freely where one can, expressing thanks, and keeping a warm home and workplace. It also reminds a person that sweetness is not weakness, and that kindness takes discipline.",
 "Who can I support or thank this week?"),
'ofun-meji': (
 "Òfún Méjì is associated with Ọbàtálá, with whiteness, purity and calm authority. It is often read as a figure of completion and moral integrity, and it connects with the dignity of old age and a life lived with care.",
 ["Purity of character and intention", "Calm, patient authority", "Completion and finishing well", "Respect for elders and for ritual discipline"],
 "In daily terms, this figure advises keeping one's word, being slow to anger, and finishing what one starts. It is also a reminder that integrity is maintained through small choices made consistently.",
 "What would it mean to finish this chapter of my life with integrity?"),
}

def main():
    changed = 0
    omo = {}
    for p in glob.glob(os.path.join(BASE, 'omo-odu-*.md')):
        m = re.search(r'^parent1:\s*"?([^"\n]+)"?', open(p, encoding='utf-8').read(), re.M)
        if m:
            omo[m.group(1).strip()] = omo.get(m.group(1).strip(), 0) + 1
    for p in sorted(glob.glob(os.path.join(BASE, 'odu-meji-*.md'))):
        txt = open(p, encoding='utf-8').read()
        if '### Overview' in txt:
            continue
        slug = re.search(r'^slug:\s*"?([^"\n]+)"?', txt, re.M).group(1).strip()
        ov, themes, guide, q = D[slug]
        n = omo.get(slug, 0)
        block = "### Overview\n\n" + ov + "\n\n### Core Themes\n\n" + \
            "\n".join("- " + t for t in themes) + \
            "\n\n### Everyday Guidance\n\n" + guide + \
            "\n\n### Reflection\n\n" + q + \
            "\n\n### In the Wider System\n\nThis is a principal figure (Odù Méjì). It is the first parent of " + str(n) + \
            " of the 240 compound figures (Omo Odù), and the second parent of another " + str(n) + \
            ". Each of those inherits something of this figure's character and adds the influence of its partner.\n\n" + \
            "*This page is an interpretive summary written for general readers. Practising priests (babaláwo) hold the full oral corpus (ẹsẹ Ifá) for each Odù, which is learned through apprenticeship and is not reproduced here.*\n\n"
        marker = "---\n\n*This is one of the 16"
        if marker in txt:
            txt = txt.replace(marker, block + marker, 1)
        else:
            txt = txt.rstrip() + "\n\n" + block
        open(p, 'w', encoding='utf-8').write(txt)
        changed += 1
    print('updated', changed, 'files')

main()
