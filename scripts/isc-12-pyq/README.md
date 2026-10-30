# ISC Class-12 PCM — board PYQ ingestion

CISCE's past **ISC** (Class 12) papers for Mathematics, Physics and Chemistry
into `question_kind='pyq'` rows on a new `isc-12` exam.

> **ISC is Class 12. ICSE is Class 10.** Both are CISCE certificates and both
> archives sit side by side on disk. This lane is ISC. An ICSE Class-10 lane is
> wanted later and is *not* a rename of this one — different papers, different
> syllabus, different pattern.

---

## Status — LIVE 2026-10-30

| | |
|---|---|
| Bank | **257 rows PUBLIC**, `question_kind='pyq'`: 2025 Maths 51 · Physics 39 · Chemistry 37; 2026 Maths 54 · Physics 39 · Chemistry 37 |
| Registry | `isc-12` (`board: "CISCE"`), `mixedFormats: true` (59 MCQ vs 198 subjective, measured live), `noPublicContent` removed |
| Figures | 24 cropped from the page renders and attached (`image_url`); 4 decorative ones left off |
| 2025 accuracy | blind solve vs CISCE's key: **35/36 MCQ** (the 1 = CISCE's own 1(ix), key kept) and **98/98 written answers** read side by side |
| 2026 | **NO official key yet** (404 on cisce.org, checked 2026-10-30). Two independent solvers: 30/30 MCQ, 98/100 written; both differences settled in `data/2026-Mathematics.adjudication.json` |

Per-paper files in `data/`: `<year>-<Subject>.questions.json` (transcription,
no answers), `.key.json` (2025 only: CISCE's marking scheme),
`.derived.json` (the blind solve: source of every published solution and
difficulty), `.second.json` (2026's independent control, answers only) and
`.adjudication.json` (every human decision, with its reason). A solve in
progress writes under `C:\tmp\PYQPs\ISC\XII\blind\<stem>\`; copy it into `data/`
once the paper is settled (`derivationPath` in `config.ts` reads `data/` first).

## Re-running a paper

```sh
npx tsx scripts/isc-12-pyq/validate.ts 2026 Physics          # catalog, marks, delimiters, control chars
python  scripts/isc-12-pyq/crop-figures.py 2026 Physics --sheet   # LOOK at _sheet.png
npx tsx scripts/isc-12-pyq/dump-for-derivation.ts 2026 Physics   # key-free payload + figure crops
#   -> a solver reads DERIVATION_BRIEF.md and writes blind/<stem>/derived.json
#   -> 2026: a second solver writes blind/<stem>/second.json (answers only)
npx tsx scripts/isc-12-pyq/report-crosscheck.ts 2026 Physics     # vs key (2025) or vs second.json (2026)
#   -> record every decision in data/<stem>.adjudication.json
npx tsx scripts/isc-12-pyq/commit.ts 2026 Physics [--apply]      # PRIVATE; re-syncs solution/difficulty/image
npx tsx scripts/isc-12-pyq/seed.ts --order --apply               # chapter + subtopic order
npx tsx scripts/isc-12-pyq/flip-public.ts 2026 Physics [--apply]
```

`commit.ts` refuses on any unread disagreement (`assemblePaper` in `lib.ts`,
spec `tests/isc-12-lib.test.ts`). Transcription contract: `TRANSCRIPTION_BRIEF.md`.

### Still open

1. **CISCE's 2026 marking scheme (~November 2026).** When it lands, transcribe
   it to `data/2026-<Subject>.key.json` and re-run `report-crosscheck.ts`: the
   2026 answers ship as worked out by us until then, and `YEAR_SOURCES` says so.
2. **2021-2024 papers not located** (see below).
3. **ICSE Class 10** is a separate lane, not a rename of this one.

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
npx tsx scripts/isc-12-pyq/dump-for-derivation.ts 2025 Mathematics

# diff a derivation against CISCE's key
npx tsx scripts/isc-12-pyq/report-crosscheck.ts 2025 Mathematics
```

Both CLIs **refuse an unmeasured year** rather than defaulting to the nearest
one — a default turns "nobody has looked at this year" into an assertion.

---

## What is left

See "Still open" under Status.
