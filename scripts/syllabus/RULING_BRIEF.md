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
