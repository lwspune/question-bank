# Ruling brief — "does this book teach what this exam asks, and where?"

Contract for authoring `syllabus_concept_exams` rulings. Read it fully before
writing a single ruling. It exists because every rule below was learned by
getting something wrong first.

## What you are deciding

For ONE exam subtopic, two independent verdicts:

- **stateBoard** — does the Maharashtra State Board Std XI/XII book teach it?
- **ncert** — does the NCERT Std XI/XII book teach it?

Each verdict is `full`, `partial` or `not`, and `full`/`partial` MUST cite the
section(s) that teach it.

## The one rule that matters most

**A title match is not evidence. Read the book text.**

The State Board's AC chapter has no "Transformers" heading, yet XII:12.15 teaches
transformers in full — turns ratio, ideal-transformer power relation, step-up and
step-down. Ruling `not` on the missing heading would have been wrong. Conversely
a chapter can carry a heading and teach nothing usable.

So: search the TEXT, per chapter, and cite the section that actually teaches it.

## Your tool

```
python scripts/syllabus/search_corpus.py "packing efficiency" "unit cell"
python scripts/syllabus/search_corpus.py --source=NCERT "polymerisation"
python scripts/syllabus/search_corpus.py --word "NOR"          # ordinary English
python scripts/syllabus/search_corpus.py --substring "hydroxy"  # rarely wanted
```

Default matching anchors the START of the term to a word boundary and leaves the
end open, so `cement` matches cements but NOT displa**cement**, and `aldehyde`
matches aldehydes. Use `--word` for a term that is also ordinary English.

Output is PER CHAPTER and never totalled, because the chapter matters:

- **A hit may be a passing mention.** `urea` scores 41 hits — but 13 are in the
  Solutions chapter using it as a convenient non-electrolyte for molality sums.
  That is not "fertiliser chemistry is taught". `vitamin` appears 9 times in the
  State Board corpus while its own Biomolecules chapter says it zero times.
- **A hit in the wrong chapter proves nothing.** Only the chapter that would
  actually teach the topic counts.

## Before you write `not`

Absence is the weakest evidence available, and it has been wrong repeatedly.
Four independent false "absent" claims, each from a different cause:

| Cause | Example |
|---|---|
| spacing | `step-?up` misses "step up" written with a space |
| punctuation | `newton's law` misses the CURLY apostrophe both books use |
| homonym | `\bNOR\b` matches the ordinary word "nor" |
| substring | `cement` matched displa*cement* 96 times |
| **-s- vs -z-** | `polymerisation` finds 9 NCERT hits and misses the State Board's **61** — that book spells it `polymerization` |
| **different name** | `bisulphite` is zero in NCERT, which calls the same reagent `hydrogensulphite` |

**The last two are systematic between these two books, not one-off.** The State
Board prefers -z- (polymerization, trimerization) where NCERT uses -s-, and the
two disagree on reagent names outright. Always try both spellings, and if a
topic you are confident is taught comes back empty, assume a naming difference
and go looking for the other name before writing `not`.

**Vary spelling, spacing AND punctuation, and try the synonyms a textbook would
use, before you write `not`.** For "Fertilizers" that meant checking
fertilizer / fertiliser / urea / superphosphate / ammonium nitrate / manure /
NPK — only then is `not` defensible.

## Citation format

`coveredBy` is a comma-separated list of section refs, each prefixed with the
school YEAR:

```
"XI:11.8"                      one section
"XI:11.8, XI:11.8.2"           several in one chapter
"XI:9.2, XII:6.9"              the topic spans both years
```

**Every ref must exist in `generated-papers/chemistry-sections-handout.md`.**
`commit-bank-rulings.ts` refuses to write a ref that resolves to no section, so
an invented ref fails the commit rather than shipping.

Note the books do not align by year: a topic can be Std XI in one book and
Std XII in the other. Cite each book's own year.

## Choosing the status

- **full** — the book teaches the topic to the depth the exam asks. Cite it.
- **partial** — genuinely half-covered, on stated grounds. Say what is MISSING,
  not just that something is. "AM is taught but the modulation index is absent."
  Do not use `partial` as a hedge for "I am unsure" — go and read.
- **not** — no section teaches it, after varying the vocabulary. In the `note`,
  say what you searched and where the topic actually lives if you know
  (e.g. "Class 9/10 general science", "general awareness").

## Output

Return ONLY a JSON array, no prose around it, one object per subtopic:

```json
[
  {
    "section_no": "NDA-304",
    "subtopic": "Fertilizers",
    "stateBoard": {
      "status": "not",
      "note": "No section on fertilisers. 'fertilizer'/'fertiliser'/'manure'/'NPK' are all ZERO across both years; 'urea' has 41 hits but they are colligative-property examples in XII:2 Solutions, and 'superphosphate' is one passing mention. Class 9/10 material."
    },
    "ncert": { "status": "not", "note": "Same searches, same result; NCERT also dropped its Chemistry in Everyday Life chapter." }
  },
  {
    "section_no": "NDA-293",
    "subtopic": "Redox: Oxidation, Reduction and Reducing Agents",
    "stateBoard": { "status": "full", "coveredBy": "XI:6.1, XI:6.2" },
    "ncert": { "status": "full", "coveredBy": "XI:7.1, XI:7.2" }
  }
]
```

`note` is REQUIRED on `partial` and `not`, and optional on `full` — add one only
where a reader would otherwise be surprised (a cross-year mapping, a naming
mismatch between the books, a topic taught in an unexpected chapter).

**A note must be 500 characters or fewer.** That is a database CHECK constraint,
not a style preference: the write fails outright above it. Cut redundancy, never
evidence — the section refs, the zero-result searches and the named MISSING item
are the whole value of the note. `commit-bank-rulings.ts` reports any note that
is too long, with its length, during the dry run.

## Honesty

Your rulings become a teacher-facing claim about what a book contains. A wrong
ruling is plausible, internally consistent and unfalsifiable by any automated
check — it is the one error class no probe in this repo can catch. If the
evidence does not settle a subtopic, say so in the note rather than picking the
tidy answer.

## A hit is not coverage — the false-POSITIVE catalogue

The mirror of the false-absence table above. Each of these produced a wrong
"taught" claim before being caught:

- **A stale chapter INTRO.** Rationalised NCERT intros still promise deleted
  content (binomial distribution, A.P., special series, tangents/normals — at
  least four chapters). Trust the section spine + targeted searches, never the
  opening prose.
- **A worked/optimisation EXAMPLE.** Every 'sphere' hit in both Maths corpora
  is the cone-in-sphere maximisation example; "in-circle" hits are the same.
  A topic used as an example's setting is not a topic taught.
- **An appendix pointer.** "(Refer A.1.3 of Class XI Text book)" is not a
  taught section.
- **A chapter TITLE.** NCERT ch.4 is still titled "…and Quadratic Equations";
  every 'quadratic equation' hit is the title/header/intro — the teaching
  section was deleted.

## Per-subject addenda

Dispatch prompts point here instead of re-typing this. Each block: corpus
name, ref quirks, the subject's own trap list, source PDF locations.

### Chemistry (`--corpus=chem`)

- Corpora: `dump_chem_corpus.py`. Handout: `chemistry-sections-handout.md`.
- Traps proven here: the -s-/-z- split (`polymerisation` 9 NCERT vs
  `polymerization` 61 SB — SYSTEMATIC); reagent-name splits (bisulphite /
  hydrogensulphite, bidentate / didentate); `Huckel` umlauted in NCERT; the
  SB prints **`Plank`** for Planck (Std XI Structure of Atom, 5×).
- Rationalised NCERT dropped: Solid State, Surface Chemistry, Polymers, Green
  Chemistry, s-/p-Block, States of Matter (Boyle/Charles/kinetic theory gone
  entirely). Molar volume: NCERT says 22.7 L, never 22.4; SB the reverse.

### Physics (`--corpus=physics`)

- Corpora: `dump_physics_corpus.py`. SB per-chapter PDFs under
  `…\Subjects\Physics\State_Board\Topics\{11th,12th}_Topics`.
- Traps proven here: `step-?up` misses "step up" with a space; `\bNOR\b` is
  the only way to dodge the word "nor"; `newton's law` needs the CURLY
  apostrophe. The SB is a two-pass SPIRAL (electrostatics, current, magnetism,
  optics, semiconductors split across both years) — check BOTH years before
  `not`.
- Rationalised NCERT dropped: Communication Systems, logic gates, transistors,
  Doppler, potentiometer, LC/damped oscillations, earth's magnetism.

### Mathematics (`--corpus=maths`)

- Corpora: `dump_maths_corpus.py` — **keyed by the SPINE's renumbered chapter
  numbers.** The SB Maths years are two Parts both restarting at Ch.1: spine
  refs renumber Part 2 continuously (Std XI ch10-18 = printed Part-2 Ch.1-9,
  +9; Std XII ch8-15 = printed Ch.1-8, +7). Cite HANDOUT refs
  (`maths-sections-handout.md`); the SB Part-2 corpus TEXT prints its own
  numbers, so translate when reading pages.
- **The SB text layer GARBLES math** (∫ extracts as Sinhala glyphs, 2-D forms
  flatten): prose-term search works, formula-level evidence needs the rendered
  page. SB PDFs: `C:/tmp/PYQPs/MHT-CET/State_Board/11th/Maths/Part 1/Part
  1_Chapterwise`, `…/Part 2/Part 2_Chapterwise`, `…/12th/Part 01`, `…/Part
  02`. NCERT PDFs: `…\NCERT\Books\{11th,12th}\Maths` (12th split Part 1/2;
  Part-2 files "01. Integrals.pdf" = printed Ch.7+).
- Traps proven here: `Rolle` prefix-matches **"rolled"** dice; `telescop`
  hits are the telescope INSTRUMENT in conics; SB prints **"orthocenter"**
  (-er); `bijective` is ZERO in SB (it says "one-one and onto"); `cosec`
  never `csc`; curly apostrophes on surnames (search `Bayes` not `Bayes'`).
- Rationalised NCERT dropped: the Plane, trig equations, both triple
  products, Mathematical Reasoning, binomial distribution + random-variable
  pmf/mean/variance, quadratic-equation theory, A.P./H.P./special sums,
  determinant manipulation properties, the inverse-trig identity toolkit,
  conic tangents/asymptotes, sine/cosine/projection rules, Rolle/MVT,
  n(A∪B), the power set. NCERT-only strengths: mean deviation,
  image-of-a-point, FTC derivative form, remainder-by-expansion,
  one-variable linear inequalities (SB teaches these NOWHERE).
