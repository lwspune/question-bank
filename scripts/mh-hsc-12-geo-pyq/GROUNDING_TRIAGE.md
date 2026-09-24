# Grounding triage — Geography board papers, 2026-09-24

`npx tsx scripts/mh-hsc-12-geo-pyq/audit-grounding.ts --all` on the first full
run: **140 ungrounded tokens across 343 rows.** Every one was read. **Zero are
inventions.** This file is the record, so the next run has a baseline to diff
against instead of re-adjudicating 140 hits from scratch.

## The three classes

**1. Conjunction artefacts — the largest class, and not a finding at all.**
The tokeniser joins two capitalised names across `and`, then tests the joined
phrase. `Nigeria and Bangladesh`, `Tokyo and New York`, `Germany and Sweden`,
`India and Kimberley` are all reported although both halves of each are in the
syllabus. Nothing to fix in the data; it is the probe's grain.

**2. `Draw <Noun>` — my own imperative, four hits.**
A model answer for a "draw a labelled diagram" question opens `Draw Industries
at the top…`, and the sentence-start rule does not fire because `Draw` is the
capital, not `Industries`. Harmless.

**3. Real names the textbook's PROSE does not carry — 42 distinct, checked
individually against the concatenated dumps.** Every one is real and correct.
Examples: Ratzel, Vidal de la Blache, Jamshedpur, the Damodar valley,
Chandigarh, Brasilia, Varanasi, Mecca, Oxford, the Netherlands, INSAT, GSAT,
MGNREGA, SAARC, BHEL, HAL, Newfoundland, Honshu, Cape Horn.

## The finding worth keeping: the haystack cannot read map labels

While adjudicating class 3, the world grasslands were counted in the dumps:

| term | occurrences in the 8 chapter dumps |
|---|---|
| Pampas | 3 |
| Downs | 3 |
| Steppes | 1 |
| Veld | 1 |
| **Prairie** | **0** |
| Savanna | 0 |
| Campos | 0 |
| Llanos | 0 |

A Class-12 Geography textbook that names the Pampas, Steppes, Veld and Downs
does not omit the Prairie. **The dumps are of the PDF text layer, and this book
puts much of its place-naming on MAPS, which are rasters.** So the haystack is
systematically short of exactly the tokens this probe tests, and a "not in the
syllabus" hit on a place name is weaker evidence than it looks. It is still
worth running — a fabricated organisation or year would not be on a map either
— but a place-name hit should be checked against the book's maps before it is
treated as out-of-syllabus.

## Standing decision

Model answers here MAY name a real example the book's prose does not, and
several deliberately do (Ratzel and Vidal de la Blache for determinism and
possibilism, which the book teaches as concepts without naming their authors;
MGNREGA as an employment programme; BHEL and HAL as public-sector examples).
That is enrichment, not error, and it is what a good board answer does. The line
this probe defends is different and narrower: **nothing may be named that is not
TRUE.** Re-adjudicate on that basis, not on presence in the dump.
