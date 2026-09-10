# CBSE Class-12 PHYSICS + CHEMISTRY board PYQs — Phase-0 analysis

**Measured 2026-09-10.** Everything below is a measurement against the real archives
or the live database, not an inference from the Mathematics ingest. Where something
is still unmeasured it says so explicitly — those are the items the next session
must settle before writing code, not assumptions it may inherit.

The Mathematics ingest (`scripts/cbse-12-pyq/`, 1,766 q across 78 papers, complete
2026-08-21) is the template. **It is a good template and a dangerous one**: four of
its load-bearing decisions do not survive contact with these two subjects, and each
one fails silently rather than loudly.

---

## 1. Sources — ALL PRESENT, nothing is blocked on acquisition

All 20 archives exist at the official CBSE URLs and were probed by HTTP HEAD:

| year | Physics QP | Chemistry QP | Physics MS | Chemistry MS |
|---|---|---|---|---|
| 2022 | 25.3 MB | 19.0 MB | 18.0 MB | 7.1 MB |
| 2023 | 35.9 MB | 20.3 MB | 16.7 MB | 8.4 MB |
| 2024 | 36.2 MB | 29.0 MB | 35.7 MB | 23.7 MB |
| 2025 | 53.5 MB | 25.5 MB | 81.4 MB | 15.2 MB |
| 2026 | 12.5 MB | 20.9 MB | 67.4 MB | 19.4 MB |

**~571 MB total.** URL shape (same as `C:\tmp\cbse_fetch.sh`, which fetched Maths):

```
https://www.cbse.gov.in/cbsenew/question-paper/<year>/XII/{Physics,Chemistry}.zip
https://www.cbse.gov.in/cbsenew/Marking-Scheme/<year>/XII/{Physics,Chemistry}.zip
```

The server is case-insensitive on the filename (`Physics.zip` and `PHYSICS.zip` both
200, while `Phy.zip` 404s — so the 200s are real, not a catch-all).

**Four archives are already downloaded** to `C:\tmp\PYQPs\CBSE\XII\_probe\` for this
analysis: `phy2026qp.zip`, `phy2023ms.zip`, `chem2022ms.zip`, `chem2025ms.zip`.
`SOURCE_ROOT` for the real run should follow the Maths layout:
`C:\tmp\PYQPs\CBSE\XII\<Subject>\<year>\{qp,ms}\`.

---

## 2. Subject codes — Physics **55**, Chemistry **56** (Maths is 65)

CBSE's internal subject codes appear in marking-scheme filenames and headers:
**Physics = 042, Chemistry = 043, Maths = 041.** The paper code printed on the paper
is `55/1/1` and `56/1/1`.

⚠ **`paperCodeLabel()` in `lib.ts` HARDCODES `65/`** and would mislabel every row's
provenance. `parsePaperCode()`'s visually-impaired exclusion also hardcodes
`/65[\s_\-(]*B/i`.

---

## 3. Paper structure — a 70-mark / 33-question exam, NOT Maths' 80/38

Measured from the printed General Instructions of Physics 2026 `55/1/1`:

| section | questions | type | marks each |
|---|---|---|---|
| A | 1–16 | MCQ | 1 |
| B | 17–21 | Very Short Answer | 2 |
| C | 22–28 | Short Answer | 3 |
| D | 29–30 | **Case study** | 4 |
| E | 31–33 | Long Answer | 5 |

16 + 10 + 21 + 8 + 15 = **70 marks, 33 questions, 3 hours** — reconciles exactly.
Chemistry 2025 `56/1/1` prints `MM: 70` and the same `SECTION A` with Q1–16 MCQ.

**2022 is the COVID Term-II paper for these subjects too** — Chemistry 2022's
marking scheme is headed *"Senior Secondary School Term–II Examination, 2022"*, so
the `full80` / `term2` split in `SECTION_BANDS` has a direct counterpart here. It is
NOT the same numbers: expect `full70` and a Term-II shape that must be measured from
a 2022 paper, not copied.

---

## 4. ⚠ THE BIGGEST FINDING — the Maths dedup strategy does NOT carry over

The Maths ingest's stage-1 dedup is *proof-grade* because **CBSE's Maths marking
schemes embed each question as a discrete image**, byte-identical when a question is
reused, so a SHA-256 match is evidence rather than a heuristic. It found 770 of 890
duplicates.

**Physics and Chemistry marking schemes are built the other way round.** They are
TEXT documents with figures embedded inside the ANSWERS:

```
Q. No | Value points | Mark          MARKING SCHEME: PHYSICS(042)  Code: 55/1/1
SECTION A                            Q.No. VALUE POINTS/EXPECTED ANSWERS  Marks
 1   (A)   1                          1.  (b) 8 F                          1
 2   (B)   1                          2.  (d)                              1
 …                                    5.  (a) Repelled by both the poles.  1
16   (B)   1
```

Verified with a control so the probe is trustworthy in both directions: the same
scan finds **24 varied question-sized blocks in 8 pages** of a Maths 2025 MS (each a
different size — genuine per-question images), and in Chemistry 2022 finds only **4
identical images repeated on every page** (header/footer art). Full-year schemes do
contain question-sized images — Chemistry 2025 `56/1/1` 12 in 8 pages, Physics 2023
59 in 66 pages — but page 6 of the Physics scheme shows what they are: *"Forward
Bias / Reverse Bias — Characteristics of silicon Diode"* beside `½ + ½` mark
allocations. **They are answer figures, not question blocks.**

**Consequence, and it cuts both ways:**

- ✗ **Dedup must be TEXT-based**, on transcribed question papers — the
  `scripts/mh-hsc-12-pyq/dedupe.ts` shape (a reviewed ledger, adjudicated by reading
  both copies) rather than a hash. Do not port stage 1. Hashing these images would
  measure *figure* reuse and silently under-detect question reuse.
- ✓ **The official answer KEY becomes machine-readable**, which Maths never had. For
  Maths the answer is inside an image and needs vision; here `1 (A) 1` parses
  straight out of the text layer. **This is the strongest MCQ evidence class this
  bank has ever had** — an official, parseable key for ~16 MCQs per paper.

---

## 5. Transcription is VISION-ONLY — measured, not assumed

Physics 2026 `55/1/1` is born-digital with a healthy-looking **38,021 characters**
of text across 32 pages. Then count the glyphs a physics paper cannot do without:

> `√ ∫ π Ω λ μ → ° ² ⁻ Δ θ` — **every one occurs ZERO times.**

Chemistry 2022's marking scheme yields exactly one `√` in 10,805 characters. And the
Physics marking scheme carries the **Symbol-font private-use trap** already recorded
for MH State Board Std XI Physics: `F=q(v×B)` extracts as `F=q(v×B) \uf072 \uf072\uf075\uf072`,
and `8 μF` extracts as `8 F` with the μ simply gone.

So the text layer is *arithmetically lossy while looking clean* — the same trap as
mh-sb-11, cbse-11 and Maths 2026. **Read the papers as images.**

Precise and useful bound: the corruption hits SYMBOLS, not ASCII. **The MCQ option
letter survives intact** (`(b)`, `(d)`, `(a)` are all clean), while the answer's
value text does not. So the key is text-extractable and the worked solution is not.

---

## 6. Archive shape — messier than Maths in four distinct ways

Each of these breaks `parsePaperCode` / the file walker, and each is measured:

1. **Series are SPARSE, not contiguous.** Chemistry 2025 ships series
   `{1, 2, 4, 5, 6, 7}` — **there is no series 3**, and series 6 and 7 exist. Maths
   assumed 5–6 contiguous series.
2. **Three sets MERGED into one PDF.** Physics 2023 ships
   `Marking scheme 55-1-1,2,3 meged.pdf` (sic) — one file, three papers, 66 pages.
   `parsePaperCode` returns a single `{series, set}` and cannot express this.
3. **Hindi-medium files ship in the SAME archive.** Chemistry 2025 splits into
   `043 Chemistry -English Medium/` and `043 Chemistry -Hindi Medium/`. The Hindi set
   must be EXCLUDED — `content_hash` is stem-derived, so a translated row can never
   dedup against the real English paper (the mh-ssc-10 rule). Note the Hindi folder
   is itself incomplete (56-1-1 and 56-1-3, no 56-1-2), so absence there is not a
   signal about the English set.
4. **Filename conventions vary WITHIN one directory.** Chemistry 2025 English medium
   holds `56-6-1`, `56_1- 1` (embedded space), `56_2- 1-` (trailing dash), `56_4_1`
   and `56_7_1` — five conventions in one folder. Physics 2026 mixes
   `2383-1_55-1-1_Physics.pdf` (series 1–2) with bare `55-3-1.pdf` (series 3–5).

**The visually-impaired marker is NOT one token.** Physics 2026 uses `55(B)`,
Chemistry 2025 uses `56_B`, Chemistry 2022 uses **`56_Blind`**. Excluding these is a
deliberate decision (a separately adapted question set), not an oversight — but the
regex must cover all three spellings.

---

## 7. Taxonomy — READY, both subjects, zero work needed

Both subject rows and every chapter already exist, created by the NCERT textbook
ingest. Verbatim from the live DB (`commit.ts` validates against this list and a
name differing by one space silently FORKS the corpus — the mh-ssc-10-text lesson):

**Physics** (subject `f7f1cf0c-…`) — 14 chapters, 276 practice rows, **0 pyq**:
Alternating Current · Atoms · Current Electricity · Dual Nature of Radiation and
Matter · Electric Charges and Fields · Electromagnetic Induction · Electromagnetic
Waves · Electrostatic Potential and Capacitance · Magnetism and Matter · Moving
Charges and Magnetism · Nuclei · Ray Optics and Optical Instruments · Semiconductor
Electronics: Materials, Devices and Simple Circuits · Wave Optics

**Chemistry** (subject `25a40b51-…`) — 10 chapters, 450 practice rows, **0 pyq**:
Alcohols, Phenols and Ethers · Aldehydes, Ketones and Carboxylic Acids · Amines ·
Biomolecules · Chemical Kinetics · Coordination Compounds · Electrochemistry ·
Haloalkanes and Haloarenes · Solutions · The d-and f-Block Elements

Exam `9b11f033-…` (CBSE Class 12) is **already not `practiceOnly`** — the Maths PYQ
ingest dropped that flag on 2026-08-21 — so no registry change is needed and no
existing page moves.

⚠ **Chapter-count mismatch worth planning for:** the NCERT textbook has 14 Physics
and 10 Chemistry chapters, but a *board paper* spans the syllabus as CBSE defines
it. Chemistry's rationalised syllabus dropped Solid State, Surface Chemistry,
p-Block, Polymers and Environmental Chemistry — all of which the 2022 Term-II paper
may still examine. Expect 2022 items with no clean NCERT home and **file them on the
nearest chapter rather than inventing one**, exactly as the Maths config instructs
for its own 2022 paper.

---

## 8. SEO — this ingest creates ~24 new landing pages, where Maths created 1

**Measured, not assumed.** `listChapterLandings` derives the question kind from the
EXAM's `practiceOnly` flag ([landing.ts:94](../../src/lib/questions/landing.ts#L94)),
not the subject's. `cbse-12` is not `practiceOnly`, so `kind = "pyq"` for *every*
subject on it — and Physics and Chemistry hold zero PYQ rows.

Driving the loader's own RPC (`get_chapter_facets`, `p_kind='pyq'`, floor 15):

```
Physics      facets=  0   landing pages=  0
Chemistry    facets=  0   landing pages=  0
Mathematics  facets= 13   landing pages= 13
```

**So 726 published textbook questions across 24 chapters currently have NO
`/questions` landing page at all.** Every chapter that clears 15 PYQs gains one. At
the Maths density (1,766 PYQs over 13 chapters ≈ 136/chapter) all 24 will clear it
comfortably. Nothing can be LOST — there is nothing there to lose.

Run `flip-impact.ts` anyway before committing, the way Maths did: the value is a
measured before/after, not a prediction.

---

## 9. Scale estimate — and its uncertainty stated honestly

Papers per subject-year: 15–18 regular (5–6 series × 3 sets) + 1 VI paper excluded.
Over five years that is **~75–90 papers per subject**, against Maths' 78. Maths
yielded 1,766 unique questions from 78 papers after 31% redundancy was removed.

A *naive* scaling gives ~1,700 per subject. **Expect materially fewer**, for a reason
that is structural rather than a guess: a Maths paper is 38 questions and these are
33, and the within-series set overlap that drove Maths' 31% redundancy is unmeasured
here — it can only be measured after transcription, since there are no MS question
images to hash. A defensible planning range is **~1,200–1,700 per subject**, and the
next session should treat that as a range, not a target.

---

## 10. The figure load is the real cost driver, and it is unlike Maths

Maths needed almost no figures — the NCERT ingest found *one* genuinely data-bearing
figure in the whole textbook. **A Physics board paper is the opposite.** One 32-page
Physics 2026 QP carries **79 embedded images**; ray diagrams, circuits and field
sketches are load-bearing, and a Chemistry paper's structures and mechanisms equally
so.

`extract_figures.py`, `attach-images.ts`, `figure-groups.ts` and `audit-figures.ts`
already exist in this pipeline and ran for Maths. **They have never been exercised at
this density.** Budget for it, and run `audit-figures.ts` early rather than at the
end — it is the only gate that reads a stem and asks whether the thing it points at
exists.

---

## 11. Recommended plan

**Parameterise `scripts/cbse-12-pyq/`, do NOT fork it.** The NCERT Class-11 precedent
is explicit: a fork means applying every future fix twice, and this repo already has
a live instance of that drift. Follow the technique that worked there — *remove* the
module-level constant so the typechecker enumerates every call site, rather than
defaulting it and hoping.

Concretely, the subject-specific things found so far:
`SOURCE_ROOT` · `SUBJECT_NAME` · `CHAPTERS` · the paper-code prefix in
`paperCodeLabel` · the VI-exclusion regex · `SECTION_BANDS` (70/33, not 80/38) ·
`parsePaperCode`'s filename patterns · the merged-PDF case · the Hindi-medium
exclusion.

**Order of work:**

1. Fetch all 20 archives into the Maths directory layout; **verify by file hash**,
   since the 2024 Maths ZIP shipped three papers twice under different names.
2. Build the paper inventory FIRST and reconcile it both ways (papers on disk ↔
   papers parsed), the `coverage.ts` discipline. This is where the sparse series, the
   merged PDFs and the Hindi folders get caught — cheaply, before any transcription.
3. Take ONE full-length paper per subject as a pilot, end to end, and choose the
   hardest shape rather than the easiest: **Physics 2023** (merged 3-in-1 MS, heavy
   figures) and **Chemistry 2025** (sparse series, dual-medium folders). Retiring the
   structural unknowns on the pilot is worth more than a fast first chapter.
4. Parse the official MCQ key from the MS text layer and treat it as the primary
   evidence for Section A — but **diff it against an independent derivation** rather
   than trusting it outright. This bank has already found a whole shift-2 key block
   displaced by +2 in a JEE paper, and a published key is evidence, not proof.
5. Only then fan out per year.

**Do not skip the step-6 cross-check.** Unlike mh-hsc-12/mh-ssc-10/mh-sb-9, this
source ships an official key with step-wise working. The Maths config states the rule
plainly and it holds doubly here, where the key is machine-readable: *no answer ships
without being diffed against CBSE's own.*
