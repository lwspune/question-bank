# ISC Class-12 PCM — board PYQ ingestion

CISCE's past **ISC** (Class 12) papers for Mathematics, Physics and Chemistry
into `question_kind='pyq'` rows on a new `isc-12` exam.

> **ISC is Class 12. ICSE is Class 10.** Both are CISCE certificates and both
> archives sit side by side on disk. This lane is ISC. An ICSE Class-10 lane is
> wanted later and is *not* a rename of this one — different papers, different
> syllabus, different pattern.

---

## Status — paused 2026-09-16

| | |
|---|---|
| Registry | `isc-12` added (`board: "CISCE"`, the third board). **No `mixedFormats`** — see below |
| Taxonomy | authored from the official ISC syllabus — 15 Maths / 14 Physics / 10 Chemistry chapters |
| Sources | 2025 marking schemes + 2026 question papers + Class-XII syllabus, staged under `C:\tmp\PYQPs\ISC\XII\` |
| Pure cores | `pattern.ts`, `config.ts`, `crosscheck.ts` — 44 tests, all green |
| Transcribed | **2025 Mathematics Q1 ONLY** — 15 subparts = 15 bank rows |
| Committed to the bank | **NOTHING** |

**Q1 is one question, not one paper.** It is the densest question in the paper
(Section A's 15x1-mark block), so it alone yields 15 of that paper's ~54 rows —
which reads like more progress than it is. Q2-Q22 are untouched, as is all of
Physics, all of Chemistry, and all of 2026.

```
done   15 rows   ~28% of ONE paper   ~6% of the PCM x 2-year scope
left  ~245 rows
```

Nothing is in the database. The exam, its subjects and its chapters are **not
seeded**, deliberately — see "Do not seed early" below. Consequently `isc-12`
does **not** appear in the `/browse` exam filter (that list is built by
`listExams()` from the `exams` TABLE). It *does* render an "ISC Class 12 ·
Coming soon" card on the homepage, because that grid maps `EXAM_REGISTRY`
directly; the card links to `/browse` unfiltered.

---

## RESUME HERE

The blocker is transcription. Everything around it is built and tested.

**Next unit: finish ISC 2025 Mathematics (Q2–Q22, ~39 more rows).** That turns
the pilot into a genuine complete paper and replaces an accuracy figure resting
on 11 MCQs with one resting on the whole paper.

```sh
# 1. pages are already rendered at C:\tmp\PYQPs\ISC\XII\render\2025-Mathematics\
#    (p08..p43). Re-render if needed:
python scripts/isc-12-pyq/render.py 2025 Mathematics

# 2. transcribe Q2..Q22 by READING THE PAGE IMAGES (never the text layer — it
#    is lossy, see "Measured properties"). Write TWO files per block, splitting
#    question from key exactly as 2025-Mathematics-Q1.* does:
#      data/2025-Mathematics-Q<n>.questions.json   ← no answers, ever
#      data/2025-Mathematics-Q<n>.key.json         ← CISCE's MARKING SCHEME

# 3. blind-derive, then diff:
npx tsx scripts/isc-12-pyq/dump-for-derivation.ts 2025 Mathematics Q<n>
#    → hand C:\tmp\PYQPs\ISC\XII\blind\<stem>\ to a FRESH deriver, key withheld
npx tsx scripts/isc-12-pyq/report-crosscheck.ts 2025 Mathematics Q<n>

# 4. adjudicate every DISAGREE into FINDINGS.md before moving on
```

Where each question sits in the 2025 APUP (`render/2025-Mathematics/pNN.png`):
Q1 pp8-11 · Q2-Q3 p13 · Q4-Q9 pp15-23 · Q10-Q14 pp24-30 · Q15-Q18 pp31-36 ·
Q19-Q22 pp37-43. Physics is pp8-41 of its APUP, Chemistry pp8-32.

**Then:** Physics 2025 → Chemistry 2025 → all of 2026 → figures → seed → commit
→ audits → flip PUBLIC.

### Three things to re-check on resume

1. **`mixedFormats` must be set at the FIRST INGEST**, from a live count, not
   from the papers. It is currently absent and pinned absent by a test.
   `tests/format-mix-registry` measures it against the live bank and an exam
   with no PUBLIC rows must stay unflagged.
2. **Run `npm run test:prod-contract` by hand after any registry change.** It
   left the push gate on 2026-08-31 and runs on a daily schedule, so a green
   `prepush` says nothing about the registry-vs-bank contract. That is exactly
   how a bad `mixedFormats` flag shipped on 2026-09-16 and had to be reverted.
3. **CISCE's 2026 marking scheme publishes ~November 2026.** When it lands,
   re-run the cross-check over the 2026 rows — they ship DERIVED AND UNVERIFIED
   until then, and `YEAR_SOURCES` in `config.ts` says so.

---

## Sources, and what each year can support

Everything is unpacked under `C:\tmp\PYQPs\ISC\XII\` (nothing is committed).

| Year | Questions from | Official key? |
|---|---|---|
| **2025** | Analysis of Pupil Performance (Oct 2025) | ✅ complete |
| **2026** | ISC 2026 Q.P.s archive | ❌ not yet published |

CISCE's **Analysis of Pupil Performance** is the find that shapes this lane. It
is not a statistics report with a few worked answers — it reproduces **every
question** and a `MARKING SCHEME` block for **every question**, with step-wise
working and *Alternative Method* variants. Verified: 22 / 20 / 21 marking-scheme
blocks against 22 / 20 / 21 questions, no gaps, all sections present including
Maths Section C.

So 2025 needs no separate question paper (120 candidate archive URLs were probed;
none exists, and none is required). The 2025 edition was published in November
2025, so on that cadence the **2026 edition is expected around November 2026**,
at which point the 2026 answers get the same cross-check retroactively.

2021–2024 were **not located**. `cisce.org` migrated off `downloads.aspx` and the
new archive pages are JavaScript-driven; 1,584 candidate URLs were probed and
only 2025 responded. This is an open gap, not a closed question.

---

## The method: blind first, key second

Answers are **derived independently, then diffed against CISCE's own** — not
transcribed from the key. That ordering is the point: it makes 2025 the one
place ISC derivation accuracy can be **measured** rather than asserted, and that
measured rate is what says how far to trust 2026, which has no key at all.

```
render.py            source PDF        → page images (vision)
   ↓                 (transcribe by reading the images)
data/*.questions.json   +   data/*.key.json      ← SPLIT AT TRANSCRIPTION TIME
   ↓
dump-for-derivation.ts  → C:\tmp\...\blind\<stem>\   ← questions only, no key
   ↓                       (a fresh deriver reads ONLY this)
derived.json
   ↓
report-crosscheck.ts    → agreement rate + leads
   ↓
FINDINGS.md             ← adjudicated, one entry per disagreement
```

### Why the split is structural and not a convention

For 2025 the source **interleaves the answer with the question** — p11 of the
Mathematics APUP carries subpart (xv) and the `MARKING SCHEME` block on the same
page. A deriver handed page images is contaminated by construction, and no
instruction to "ignore the key" can undo that.

`dump-for-derivation.ts` therefore writes to a directory containing no key file
and **refuses to run** if the transcription carries an answer-shaped field or if
a key file already sits in the destination. Withholding at dump time is the only
enforceable form of the rule. See `[[blind-check-contamination]]`.

---

## Pilot result — 2025 Mathematics Q1

**10/11 MCQ agreement (90.9%)**; read together with the four free-response rows,
**14 of 15 agree**. One contested, and it is contested in CISCE's direction:

* **1(ix)** — official (c) says the Reason is *false*, but the Reason is a
  correct statement of the definition of a function (totality). Adjudicated as a
  probable error in the official key. **Key preserved, solution to carry the
  note** — CISCE issued this key and candidates were marked against it.
* **1(v)** — CISCE printed **two** accepted answers. Recorded as a `grace` row
  rather than flattened to one letter; flattening would manufacture a
  disagreement *and* ship a question that marks a correct student wrong.

Full adjudication, plus three non-blocking paper defects, in `FINDINGS.md`.

---

## Measured properties

1. **Vision only.** The 2026 papers have a **zero-character** text layer (150 dpi
   scans). The 2025 marking schemes *do* have a text layer and it is **lossy, not
   noisy** — every math-italic glyph is doubled and distinct letters collapse
   onto each other, so `dx` and `dy` both extract as `𝑑𝑑𝑑𝑑` and `sin` as
   `𝑆𝑆𝑆𝑆𝑆𝑆`. No substitution table can repair that. Prose cross-check only.
2. **No vector drawings anywhere** — every page is a raster, so figures are
   cropped from the page image rather than extracted as objects.
3. **One paper per subject per year.** ISC prints no series/set variants (unlike
   CBSE's 5–6 series × 3 sets), so there is no cross-set dedup axis.
4. **Three different patterns in one sitting** — Maths 22 q / 3 sections / 80
   marks with **Section B *or* C**; Physics 20 q / 4 sections / 70; Chemistry
   21 q / 4 sections / 70. See `pattern.ts`.

### The internal-choice trap

ISC numbers an internal choice's branches as **subparts**:

```
Question 16                      Question 1
 (i)  …drone cameras…             (i)   …
        OR                        (ii)  …
 (ii) …perpendicular vectors…     (iii) …
```

Under Q16 those are **alternatives**; under Q1 they are all **compulsory**.
Identical label shape, opposite meaning, and the only discriminator is the bare
`OR` line. Both branches are bank rows either way — what the distinction
protects is the marks arithmetic and any future `/mock` reconstruction.

---

## Do not seed early

`listSubjects` applies no question-count filter, so **a subject row with zero
questions renders as a live `/browse` filter that returns nothing**. A Std-XI
Physics row was seeded that way in the `mh-sb-11` lane on 2026-09-02 and had to
be removed the same day.

Seed the exam, its subjects and its chapters **immediately before** the first
`commit --apply`, never as "setting up".

Related: the `isc-12` registry entry is deliberately **not** `boardExam`.
"ISC is a school board, so `boardExam: true`" is the wrong inference — that flag
tracks whether an exam has a **textbook-structured** corpus (the `section_kind` /
`section_seq` axis behind the `/board` reader), and ISC ships papers and no
textbook. `board:lint` iterates `BOARD_EXAMS`, so flipping it would widen that
gate's scope to an exam owning no rows it can check.

---

## Commands

```sh
# render a source to page images for vision transcription
python scripts/isc-12-pyq/render.py 2025 Mathematics
python scripts/isc-12-pyq/render.py 2026 Physics --dpi 220 --dump-text

# emit a blind (key-free) payload for a deriver
npx tsx scripts/isc-12-pyq/dump-for-derivation.ts 2025 Mathematics Q1

# diff a derivation against CISCE's key
npx tsx scripts/isc-12-pyq/report-crosscheck.ts 2025 Mathematics Q1
```

Both CLIs **refuse an unmeasured year** rather than defaulting to the nearest
one — a default turns "nobody has looked at this year" into an assertion.

---

## What is left

1. Transcribe the remaining 2025 questions (Maths Q2–22, Physics, Chemistry) and
   all of 2026. ~260 rows in total; 15 are done.
2. Crop figures from page rasters and attach them.
3. Seed exam → subjects → chapters, then `commit --apply`.
4. Run `audit:keys`, `audit:text`, `audit:omml` scoped to the new `source_file`.
5. Flip PUBLIC, `npm run stats`, update `CLAUDE.md`.
6. Re-run the 2026 cross-check when CISCE publishes its 2026 APUP (~Nov 2026).
7. Find the 2021–2024 archive, or record that it is unreachable.
