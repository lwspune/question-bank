# Product roadmap

Pending features, data-model changes, and content work for Question Bank. Mirrors the "deferred" annotations scattered through the `CLAUDE.md` decisions log and consolidates them in one place.

**Live state** — for current bank size, per-subject counts, shipped features, test counts, and migration count, see the **"Live bank size"** line at the top of `CLAUDE.md` and the **Decisions log** section below it. Don't duplicate that here; it drifts on every upload.

---

## ~~Backfill ledger — NDA Maths `/notes` formula gaps vs the PYQ corpus~~ — ALL TIERS DONE 2026-09-24

**Closed 2026-09-24 (same day, second branch).** Tiers 1–3 shipped across all 30 chapters (84 files; two new ConceptUnits `aod-trig-max-without-calculus` + `cn-loci-in-argand-plane`, both tagged; 19 chapters gained their first `related` block). **Four further findings were already in the files** and needed nothing: `(kA)⁻¹ = (1/k)A⁻¹` (Matrices), `tan A + cot A = 2/sin 2A` and `csc A + cot A = cot(A/2)` (Trig Identities), `cos(α+β)cos(α−β)` (3D direction angles). **Declined:** Lucas' theorem, `∏sin(kπ/n)` (outside NDA scope). **Open follow-ups:** (1) run `npm run quiz:sync` — expect the 2 verified atoms of `sub-trig-identity` to go stale and new `needs_review` atoms for the two new concepts; re-verify. (2) `notes:coverage` per chapter was not re-run as a closing check. (3) The two new cards are proven only by the build's prerender, not by a browser read. Everything else in the entry below is history.

**Tier 0 status:** 10 of the 12 claimed items shipped (AoD exact-vs-approximate · Complex argument conventions · PoT `cos3C`/`cos2C` · PoT `cos2α` tangent form · PoT `cot15°` and siblings · Indefinite Integration `1/(ab)` arctan · Trig Equations `cot(x/2)` collapse · Circles perpendicularity test · DE differentiate-the-integral · Differentiation parametric second derivative). **Two DECLINED on verification:** Inverse Trig `it-principal-values` already states all four negative-argument identities (report C's claim was wrong); the two Conics PYQs (`88fd7bc8`, `c8af6a78`) are not any card's `pyqExampleId`, so the perpendicularity test in Conics is a Tier-1 item (3 PYQs), not a blocker. **Policy calls for the open tiers:** Tier 2 = one-line restatement in a `definition` body + a `related` link to the home chapter; Tier 3 = trap lines for one-off tricks, DECLINE Lucas' theorem, `∏sin(kπ/n)` and the Blaschke factor as outside NDA scope. Next: `quiz:sync` will flag `sub-trig-identity`'s 2 verified atoms stale — re-verify them.

Three agent reports in `generated-papers/nda-maths-pyq-formula-gaps-{A,B,C}.md` (**gitignored** — regenerate from the brief if lost) read ALL 2,274 PUBLIC `question_kind='pyq'` NDA Maths solutions with a non-null solution across ALL 30 registered `nda-maths` notes chapters (A: 9 ch/1,175 q · B: 10/742 · C: 11/357; report C's "31 chapters / other 20" is an arithmetic slip — the registry has 30) and diffed each solution's load-bearing result against that chapter's `_data`. **~270 findings, ~150 single-occurrence** (no minimum frequency was applied on purpose). Verified this session: the AoD `aod-rate-approximation` self-check uses PYQ `…fcf4a3`'s exact stem and answers 6 where the paper asks for the TOTAL change and keys 6.03 (the one finding that costs a mark, not time); Complex `…9e3474` is keyed 240° on the `[0°,360°)` convention while the notes assert `(-π,π]`; the Statistics skew-ordering UNSURE is TAUGHT by the `SkewMeanMedianMode` visualization (diagram only — no prose, so quiz-harvest and the revision sheet cannot see it); all six "see note" ids in report A resolve. Tiers, in order: **(0)** 2 wrong-way cards + 10 featured-PYQ blockers (a card's `pyqExampleId` needs a result the card never states — 8 listed in report C's table, plus DE `order-and-degree`/`…318cab` and the AoD card); **(1)** ~20 gaps used by ≥3 PYQs (largest: AoI power rule 11/27, BD `nCk` 10, AoD trig-max block 9, CN `(1±i)` block 8, Trig `cot−tan=2cot2θ` 7, CN loci 6, TE prerequisite identities ~11 PYQs, DE geometric families 5, Prob divisibility 5, PoT special angles 5); **(2)** the shared prerequisite layer (`sin²+cos²=1`, double/compound angle, Vieta, `Σk`, `∫xⁿ`, the perpendicularity test) — each TAUGHT in its home chapter, missing where borrowed; policy decision pending: one-line restatement in a `definition` body + `related` link vs link only; **(3)** the single-occurrence tail — trap lines for one-off tricks, explicit declines for out-of-NDA-scope results (Lucas, `∏sin(kπ/n)`, Blaschke). Mechanics that bound the cost: `formula.latex` edits re-flag verified quiz atoms (`quiz:sync` staleness), `definition`/`trap` edits do not; new ConceptUnits need a globally unique slug, a `pyqExampleId`, concept tags for the cited PYQs, and `notes:arc` placement; re-run `notes:coverage` per chapter as the check. Not covered by the reports: practice rows, the other exams' same-named chapters, tag coverage, teaching order.

## Backfill ledger — logged 2026-09-24 (Class 12 Geography ingest)

- **Migrate `scripts/mh-sb-9/audit-grounding.ts` and `scripts/mh-ssc-10-text/audit-grounding.ts` onto the shared `scripts/lib/grounding.ts`.** The two carried their own copies of `ungroundedTokens` and had DRIFTED: the mh-ssc-10-text one has five noise fixes (possessive stripping both sides, math/emphasis stripping, pipe-table + paragraph sentence boundaries, trailing-connector trimming, case-insensitive stopword test) that mh-sb-9's lacks. The shared core is seeded from the newer one and specced in `tests/grounding-core.test.ts`; `scripts/stateboard/audit-grounding.ts` already imports it. **Both existing copies are deliberately UNTOUCHED** — they are shipped pipelines whose grounding reports are on the record, and swapping the implementation under them would change verdicts already acted on. Migrating mh-sb-9 would strictly reduce its false positives; migrating mh-ssc-10-text is a no-op in behaviour and pure de-duplication.
- **Tune the shared grounding core's connector-joined name pairs.** Measured on the Geography lane: ~20 candidates per chapter, of which the dominant class (roughly 4 in 5) is two separate names joined across `and`/`of`/`the` into one token that appears nowhere — `Mississippi and Nile`, `Gobi and Sahara`, `Kalyan and Virar`. A second, smaller class is a hyphenated or spaced word broken across a line (`Hydro-` / `electricity`, `Bombay` / `High`). Deliberately NOT tuned during the ingest: 20 readable hits per chapter is not a signal-to-noise failure, and tuning on one book's evidence would diverge the shared core from the two copies above and complicate their backfill. Revisit with more evidence.
- ~~**Geography board PYQs are available and not ingested.**~~ **DONE 2026-09-24** — all six papers ingested, 343 q PUBLIC. They did NOT belong to the `scripts/mh-hsc-12-pyq/` lane as this entry guessed: that lane's `buildPyqRecords` takes ONE chapter per file and a Geography board paper spans all eight, so a third lane `scripts/mh-hsc-12-geo-pyq/` re-exports `mh-ssc-10/lib` instead. **Class 11 Geography** (9 chapters, `…/Geography/11th/Chapters`) is still available and would go to `mh-sb-11`.
- **`scripts/mh-ssc-10/flip-public.ts` has no `derived_model` gate, and `scripts/mh-sb-9/` should be checked for the same.** CLAUDE.md states that `flip-public.ts` refuses to publish an unstamped authored row; that is true of `scripts/stateboard/`'s copy and was NOT true of the `mh-ssc-10` copy, which checks only that a row carries an answer. Found while building `mh-hsc-12-geo-pyq/` from that copy, where the gate was added and fault-injected (it refused 58/58 before stamping). **Logged, not swept:** adding the refusal to a shipped lane could block a future re-flip of rows published before `stamp-provenance` existed on it, so it needs a count of how many live rows would fail the gate BEFORE the gate goes in. Do that count first; the answer decides whether this is a one-line change or a backfill.

## IPMAT Phase 5 — the checklist before anything goes PUBLIC (2026-09-22)

**1,418 IPMAT / JIPMAT questions are loaded and PRIVATE.** Pipeline, gates and full narrative:
`scripts/ipmat/README.md`. Nothing is student-visible: the three exams are absent from
`EXAM_REGISTRY` and anon reads 0 questions and 0 options.

**Every item below must hold before the first PUBLIC flip.** They are listed here rather than
left to memory because the load is finished and the next session will not re-derive them.

### 1. ~~Derive the keys~~ — CLOSED 2026-09-22, no full re-derivation

IIM Indore publishes no answer key and afterboards claims none, so all keys are the source's
own derivation (BLIND lane). **All three subjects are now blind-measured — 124 rows, 0 wrong
keys.**

| Subject | Rows | Measurement |
|---|---|---|
| English | 582 | **37/40 (92.5%)** |
| Logical Reasoning | 310 | **32/34 (94.1%)** |
| Mathematics | 549 | **50/50 (100%)** — 16 of them numeric free-response |

All five disagreements adjudicated to the SOURCE (four were our errors, one an ambiguous
odd-one-out). **Verdict + the bound it does NOT beat: `scripts/ipmat/data/derive/KEY_TRUST.md`**
— 0 in 124 puts the wrong-key rate under **~2.4%** at 95%, not under 1%. The Worksheets
precedent (~5% wrong AI keys → re-derive everything) does not transfer to a human-edited
source measured at 0.

Two method findings worth carrying: sample by **subject**, not by the source's section
(reasoning questions sit inside Indore's quant sections, so `--section=LR` would have measured
only two of three exams — hence `--subject` on `dump-derive.ts`); and the **per-row confidence
flag** has now predicted 5 of 5 disagreements, though it cannot see a confident error. The 65
figure-bearing rows are outside every number above — the packets are text-only.

### 1b. ~~Adopt the NDA/CDS subject convention~~ — DONE 2026-09-22

NDA and CDS both **discard the paper structure** and name subjects academically. NDA Paper II
GAT covers English + 8 GK subjects and there is no "GAT" or "Paper II" subject anywhere — a
Physics question from Paper II Part B simply sits under **Physics**. IPMAT currently names its
subjects after the paper's SECTIONS instead.

Measured effect of switching (`resolveTaxonomy` remap only, no new data):

| | now | NDA/CDS convention |
|---|---|---|
| subject rows | 9 | 9 |
| **chapter rows** | **147** | **114** (33 fewer) |
| Indore | QA (MCQ) 229 · QA (Short Answer) 115 · Verbal Ability 325 | Mathematics 294 · Logical Reasoning 50 · English 325 |
| Rohtak | QA 57 · LR 55 · VA 60 | Mathematics 55 · Logical Reasoning 60 · English 57 |
| JIPMAT | QA 197 · LR 183 · VA 197 | Mathematics 195 · Logical Reasoning 185 · English 197 |

**Three things it fixes.** The 26 duplicated Indore quant chapters collapse (most of the 33).
The SECTION LEAKS go away — Rohtak currently has a 1-question "Linear Equations" chapter under
*Logical Reasoning* and "Clocks and Calendars" under *Quantitative Ability*, because the exam
filed a few questions in the other section; that is visible in Rohtak's numbers shifting
above. And **"English" rather than "Verbal Ability"** makes
`English > Reading Comprehension` one chapter spanning NDA (2,549 PUBLIC), CDS (2,400) and all
three IPMATs, the same cross-exam argument that put the CHAPTER names in CDS house style.

**The cost, stated plainly: it reverses the earlier "keep sections as subjects" decision.**
Indore's SA/MCQ split stops being a subject. It does not vanish — `question_format` already
records those 148 typed-answer rows as `numeric`, and `/browse`'s Format filter (All · MCQ ·
Written · Numeric) already exposes it, which is arguably the right axis for a format
distinction. Confirm that trade before remapping.

**SHIPPED.** Measured result matches the prediction exactly: **147 chapter rows -> 114**, and
subtopics **205 -> 166**. Subjects are now `Mathematics` / `Logical Reasoning` / `English` for
all three exams. Verified: 0 empty chapters, 0 empty subtopics, 0 questions without a subtopic,
1,418 still PRIVATE, and the 58 question images + 28 option images preserved.

Done by `scripts/ipmat/remap-taxonomy.ts` rather than a reload, which would have discarded
`image_url` and forced 86 re-uploads. **Re-running `commit.ts` would NOT have worked**:
`commitStaged` upserts with `ignoreDuplicates: true` (ON CONFLICT DO NOTHING) and taxonomy is
not part of `content_hash`, so every row already existed by hash and a re-run skipped all 1,418.

Two things that script records for anyone doing a similar move:

- **The FK order is the whole trick.** `questions.subject_id` and `chapter_id` are RESTRICT,
  but `subtopic_id` is **SET NULL** — so deleting a subtopic before its questions move would
  silently null them, with no error. Create every target first, move the questions, delete last.
- **Deleting old SUBJECTS is not enough.** Two of the nine target subject names already existed
  (`Logical Reasoning`, for Rohtak and JIPMAT), so those rows were kept — and an unwanted
  chapter under them survived with no questions in it. Rohtak's one-question "Linear Equations"
  chapter under Logical Reasoning, a section leak, became an empty husk. A `step 3b` now deletes
  orphans under a surviving subject, guarded on BOTH "no questions" and "not in the target set",
  so a chapter the map wants can never be dropped for being momentarily empty.

### 1c. `/mock` — machinery BUILT and proven; the 5 Indore mocks are gated on step 1 (2026-09-22)

**Decided: the IPMAT mocks are actual PYQs, in the `/mock` section** — a mock is one real
sitting reconstructed from the bank, the same product as the 18 faithful NDA GAT sittings. Not
the sampled/printed kind: `scripts/bank-paper/NDA_GAT_BLUEPRINT.md` is a *content* blueprint for
assembling a Word paper OUT of the bank and says a sampled paper "must never be published as a
`mock_tests` row alongside the 18 faithful GAT sittings". This is the other path —
`src/lib/mocks/blueprints.ts` + `scripts/mocks/build.ts`.

#### What is available

48 papers are already loaded, one `source_file` each (`ipmat/<exam>-<year>-<section>`):
Indore 24 (8 sittings x 3 sections), Rohtak 6 (2 x 3), JIPMAT 18 (6 x 3) — **16 sittings**.

Measured, per paper:

| | papers | sittings |
|---|---|---|
| complete as loaded | 39 / 48 | — |
| short **only** because the exam CANCELLED a question | 5 | Indore 2024 · Rohtak 2019 + 2020 · JIPMAT 2021 + 2023 |
| short because rows are excluded or reconstructed | 4 | JIPMAT 2025 (LR, VA) · JIPMAT 2026 (LR, VA) |

So with grace handling, **14 of 16 sittings can be served complete**, and JIPMAT 2025 + 2026
are the two to HOLD rather than ship short — the posture MOCKS.md already takes for 30 papers.

#### Status: built, proven, and blocked on one thing

**`IPMAT_INDORE_PAPER` ships, and all five 2022-2026 sittings reconstruct** — 90 q / 360
marks each, sections 30/15/45, 2024 carrying its grace question, and Short Answer correctly
carrying no negative marking. Proven by `npx tsx scripts/ipmat/mock-smoke.ts`, which drives
the real `buildMockPaper` over the real bank rows and writes nothing.

**They cannot be CREATED yet.** `fetchPaperRows` in scripts/mocks/build.ts filters
`.eq("visibility", "PUBLIC")` — correctly, because a mock puts questions in front of a
student — and every IPMAT row is PRIVATE until its keys are derived. So the real builder
returns 0 rows. **This is step 1's gate doing its job, not a defect.**

Once the Indore chapters flip PUBLIC, the whole remaining job is one command:

```sh
npx tsx scripts/mocks/build.ts --paper=ipmat-indore --apply --publish
```

#### The researched pattern (2026-09-22)

| | Indore | Rohtak | JIPMAT |
|---|---|---|---|
| Questions | **90** (QA-MCQ 30 · QA-SA 15 · VA 45) | 120 (40 x 3) | 100 (33 QA · 33 DILR · 34 VARC) |
| Marks | **360** | 480 | 400 |
| Duration | **120 min, 40 min PER SECTION, locked** | 120 min | **150 min, no sectional limit** |
| Correct | **+4** | +4 | +4 |
| Wrong | **-1 MCQ · 0 on SA** | -1 | -1 |

Cross-checked across independent sources; the Indore figures agree everywhere. **The 100 -> 90
change happened in 2022**, which is why 2022-2026 is one clean pattern and the three earlier
sittings are out of scope. **Rohtak's sectional timing is CONTRADICTED between sources** (one
says 40 min per section, another says candidates divide the 120 minutes freely) — unresolved,
and moot while its loaded data is 2019 (115 q) and 2020 (60 q), neither matching the current
120-question pattern.

**Section ORDER is not firmly established.** MCQ -> SA -> VA is used, being how most published
descriptions list it, but sources disagree and our corpus numbers each section from 1
independently, so no global ordering survives to check against. With one combined timer it is
presentational.

#### What was built

- **`MockSectionBlueprint.marking`** — per-section marking, because SA has no negative marking
  and a paper-level scheme would penalise every SA mistake and mis-score every student.
  `buildMockPaper` stamps it onto each question, and grading already reads per-question marks.
- **`MockSectionBlueprint.sourceFileSuffix`** — sections identified by `source_file`. Subject
  cannot separate Indore's two quant sections (both are Mathematics + Logical Reasoning), and
  **neither can format**: 2025's SA section holds one MCQ among fourteen numeric rows.
  `source_file` records where the exam itself printed the question.
- **`SourceFileSitting.extraFiles`** — a fourth sitting rule. An IPMAT sitting is THREE files,
  one per section, UNIONED. Deliberately not `mergeWith`, which dedupes two labels for one
  paper — the opposite operation.
- **`scripts/mocks/ipmatSittings.ts`** — the five sittings, file names DERIVED from
  `sourceFileFor` so a rename cannot leave them pointing at nothing. Grace is keyed by section
  AND number, because numbering restarts per section and a bare `[7]` would also grace SA Q7
  and VA Q7.
- **`totalMarks` now SUMS the stamped marks** instead of `count x paper.correct`. The two agree
  only while every section shares the paper's scheme.
- **The cancelled row is loaded.** `commit.ts --include-dropped` loaded Indore 2024 MCQ Q7 with
  its four printed options and NONE marked correct, which is legal and precedented (31 bank
  questions already have zero correct options). Inventing a key to satisfy a check would be
  storing a false answer.

#### Still open

- **The sectional lock.** An attempt has a single `expires_at`. Per-section deadlines need the
  runner, the attempt service, the palette and `mock:sweep` — a live surface. Decided
  2026-09-22 to ship on one 120-minute timer and defer this; scores are exact, only time
  management is easier than the real exam.
- Rohtak and JIPMAT mocks. JIPMAT needs its own blueprint (no sectional limit, 150 min) and can
  serve 4 of 6 sittings; Rohtak's loaded sittings predate its current pattern.

#### Three blockers as first identified — all now resolved or recorded

1. **THE 8 EXAM-CANCELLED ROWS ARE NOT IN THE BANK, AND THEY NEED TO BE.** Phase 4 excluded
   every `dropped` row. But `reconstruct.ts` is explicit: *"It appeared on the real paper, so a
   faithful mock includes it — but it has no valid key, so it's graded as GRACE."* Grace is
   declared per sitting as `graceNumbers: number[]` in `scripts/mocks/build.ts`, which presumes
   the question is present. Loading those 8 turns 5 short papers complete. **Open detail:** how
   a keyless row is stored in `questions`/`options` was NOT established — the preflight's
   exactly-one-correct rule would currently refuse it. Check an existing grace sitting before
   designing this (and note that matching on `question_number` across sittings is meaningless,
   because numbers restart per paper).

2. **NO PER-SECTION TIMER.** `MockPaperBlueprint.durationSecs` is a single number for the whole
   paper. IPMAT is timed **per section** (the source reports 40 minutes each for Indore — worth
   confirming against an official source). One combined timer would let a student spend the
   whole sitting on quant, which is the opposite of what the exam measures. Needs a
   `durationSecs` on `MockSectionBlueprint` plus runner, timer and palette support.

3. **NO FORMAT CONSTRAINT ON A SECTION, and that is a consequence of step 1b.**
   `MockSectionBlueprint` carries only `subjects: string[]` and an optional `count`. Since the
   subject axis became academic, Indore's SA and MCQ sections **both** draw from `Mathematics`
   and `Logical Reasoning`, so subject alone can no longer separate them. The split is available
   — `question_format` is `numeric` for exactly the 148 SA rows — but the type has no way to
   express it. Add a `questionFormat?: "mcq" | "numeric"` to the section, or reconstruct the
   split from `source_file`, which still encodes the section.

#### Still unknown

- **The marking scheme, per exam and per year.** Not established for any of the three. MOCKS.md
  is where per-exam schemes live. Do not guess: MHT-CET is the bank's one zero-negative-marking
  exam precisely because that was checked rather than assumed.
- **Indore's paper size changed three times** — 100 q (2019), 60 (2020, 2021), 90 (2022-26). That
  is three delivery shapes for one exam, the same situation as NEET's 180/200 layouts, which is
  exactly why `count` is optional on a section. Expect three blueprints or a soft count.

### 2. ~~Finish the CBSE-style grouping~~ — SHIPPED 2026-09-24

All three items below are done; kept for the reasoning, which the commits cite. See the
2026-09-24 (third) Decisions entry. **What actually happened differs from the plan in two
ways worth reading before the next registry change:**

- **Item 3's guard caught a defect that was already SHIPPED, not a prospective one.** `isc-12`
  was rendering as a target-exam chip pointing at an exam with **no `exams` row at all**. It
  is now flagged `noPublicContent`, and `tests/exam-registry-content` (prod-contract)
  re-measures every registry entry against the live bank in both directions.
- **Item 1 needed one thing the plan missed: the member-axis LABEL.** FilterBar builds from the
  DB exam list, not the registry, so the three grouped in `/browse` the instant the registry
  resolved their names — under a control hardcoded `"Class"`. Families now declare
  `familyAxis` ("Institute"); `ExamFamilyNode.board`→`key`, `classes`→`members`.
- **`mixedFormats` was deliberately NOT set** (the plan said to set it). The flag describes the
  PUBLIC corpus and that corpus is empty, which is what `tests/format-mix-registry` requires —
  setting it from the papers is the mistake the `isc-12` entry already records. Set it at the
  flip, from a live count.

The database half was **already done**: three separate exam rows, exactly as CBSE is
`cbse-10`/`11`/`12`. The picker half was these three, in order:

1. **Generalise the family axis.** `groupExamFamilies` groups on `board` + `std`, and IPMAT is
   neither a board nor a class, so it needs a second generic grouping key. `BOARDS`,
   `stdsForBoard` and `getExamForBoardStd` have **no consumers** in `src/` or `scripts/` (a
   forward-looking written-paper API, tested only), so `Board`/`Std` can stay untouched.
   `ExamFamilyNode` is typed `{ kind: "family"; board: Board; ... }` and 5 call sites read
   `node.board` / `classes[].std`, so widen the type rather than overloading `board`.
2. **Add the three exams to `EXAM_REGISTRY`** under family "IPMAT". Set `mixedFormats: true`
   (Indore carries 148 numeric rows); leave `hasMocks` false until blueprints land.
3. **Guard the student exam chips FIRST.** `src/lib/profile/examChoices.ts` maps
   `EXAM_REGISTRY` straight to chips with **no content check**, so step 2 without this lets a
   student pick "IPMAT Indore" as their target exam and find nothing anywhere — worse than the
   current dead dropdown entry. Add a zero-PUBLIC-content guard **plus a test asserting an
   empty exam never reaches the chips**, or the guard rots silently.

`/browse`'s landing tiles need no guard — `buildExamStarters` already drops an exam with
nothing in the default view.

### Interim state — RESOLVED for IPMAT 2026-09-24, still true for UPSC CSE

Since step 2, `/browse`'s dropdown shows ONE grouped "IPMAT" entry (Indore / Rohtak / Jammu)
instead of three flat dead ones; selecting it still shows "0 questions match" until the flip,
but it no longer reads as three unrelated broken exams. `UPSC CSE (Prelims)` remains a flat
dead entry, deliberately — it is absent from the registry, and `groupExamFamilies` rule 1
fails OPEN so a newly-ingested exam cannot vanish from every picker.

The original note, still the reason `listExams()` is not filtered: `/browse`'s exam **dropdown**
listed the three exams as separate flat entries (built from an unfiltered `listExams()`), and
selecting one showed
"0 questions match" with advice to clear filters that cannot help. **This is pre-existing in
kind** — `UPSC CSE (Prelims)` has 1,789 rows, 0 PUBLIC, and has been in that dropdown all
along. Filtering `listExams()` would fix all four at once but removes the deliberate
fail-open behaviour that stops a newly-ingested exam vanishing from every picker, so it was
left alone.

### 3. ~~Then, and only then~~ — SHIPPED 2026-09-24. IPMAT IS LIVE.

**1,419 questions PUBLIC across three exams; five timed Indore mocks published.** Bank
72,426 → 78,774 across 16 live exams. See the 2026-09-24 (fourth) Decisions entry.

Two things the plan did not list, both now permanent parts of this lane:

- **`stamp-provenance.ts` is a PREREQUISITE of the flip, not an afterthought.** Every key is
  afterboards' third-party derivation, and `flip-public.ts` REFUSES an unstamped row.
- **`publish.ts` + `tests/ipmat-publish`** hold the ship rule, because the cancelled 2024
  MCQ Q7 forced it past "has an answer": the mock needs that row PUBLIC to reconstruct at 90,
  but "unkeyed ⇒ publish" cannot tell a cancelled question from a missing key, so the
  allowance keys on the sitting registry's DECLARED grace list.

~~Flip PUBLIC per chapter~~ — done, 114 chapters. `noPublicContent` removed from all three;
`mixedFormats: true` on `ipmat-indore` only, set from a live count (522 mcq + 148 numeric).
- ~~`/mock`~~ — the five Indore 2022-26 sittings are published (90q / 360m / 120min, 2024
  carrying its grace question, Short Answer correctly carrying no negative marking).
- ~~Update the `/browse` Hero "Coming soon" copy~~ — **NO-OP: no such copy exists.** Grep found
  no IPMAT or CUET mention in any user-facing string; the only "Coming soon" strings are the
  homepage's per-exam guide/notes placeholders. Recorded rather than invented into a change.
- ~~`npm run stats` and `npm run seo:dates`~~ — done and committed.
- 4 declared exclusions and 15 reconstructed rows stay held back; re-read
  `scripts/ipmat/README.md` before assuming any of them became shippable.

**What is still NOT built** (unchanged by the launch): JIPMAT mocks (its own blueprint — 150
min, no sectional limit, 4 of 6 sittings servable), Rohtak mocks (its two loaded sittings
predate the current 120-question pattern), and the per-section timer, so Indore ships on one
120-minute clock — scores are exact, only time management is easier than the real exam.

---

## CBSE keys BOTH readings of "same intensity" in photoelectric questions (2026-09-22)

**Not a defect to fix — a convention to carry into every future photoelectric solution.**
Found while solving the Physics PYQ papers; three papers already committed disagree with
one another, and the disagreement is CBSE's, not ours.

`intensity` in a photoelectric stem can mean either **energy per unit area per second**
(W/m²) or **photons per unit area per second**. The two give opposite answers whenever the
frequency changes, because at fixed W/m² a lower-frequency beam must carry proportionally
MORE photons.

| Paper | Keyed answer | Reading it requires |
|---|---|---|
| `2022-55-4-1` Q9(b)(II) | red ejects MORE electrons than yellow | energy flux (W/m²) |
| `2025-55-5-1` Q30(ii) | saturation current REMAINS THE SAME as frequency rises | photon flux |
| `2022-55-1-1` Q2(b)(i) | three frequencies share ONE saturation plateau | photon flux |

Both readings are defensible; neither is wrong in isolation. What is not available is a
single rule that satisfies all three keys.

**How the shipped solutions handle it:** each states which reading its own keyed answer
rests on, and does not present either as the settled meaning. That is the standing
approach — do NOT "harmonise" them to one convention, because each follows its own paper's
key and flipping any of them would contradict CBSE.

**What is NOT done:** no sweep of the other photoelectric rows across the corpus to check
which convention each assumes. Doing that means re-reading every such row against its own
marking scheme, on papers already shipped — so it is a backfill candidate, not a task.

---

## Backfill ledger — the Chemistry compilation mislabels three of its own sittings (2026-09-24)

**Found during the MH HSC 12 Chemistry board-paper ingest.** Logged, NOT swept — it
re-labels 153 shipped PUBLIC rows, so it is a decision rather than a tidy-up.

The chapterwise compilation files its 2023, 2024 and 2025 Chemistry sittings as **March**.
Two of those covers read otherwise:

| Sitting | Compilation says | Printed cover | Rows |
|---|---|---|---|
| 2024 | March | `2024 II 29` = **29 February** | 50 |
| 2025 | March | `2025 II 20` = **20 February** | 52 |
| 2023 | March | (no board cover; the reproduction's own heading says March) | 51 |

On an MH cover the **roman numeral IS the month** — the July-2024 paper prints `2024 VII 23`
for 23 July, which is what validates the reading. So the compilation is simply wrong about
February 2024 and February 2025.

**The Physics compilation has no such gap**, filing the same years as February and matching
its covers. This is a Chemistry-only defect, which is why two subjects shipped without it
surfacing.

**Worked around, not fixed.** `Paper.bankMonth` in `scripts/mh-hsc-12-pyq/paper/config.ts`
records the label reconciliation must SEARCH on, while `month` stays cover truth and is what
new rows are stamped with. Without it `reconcile-diff` returned **zero** bank rows and would
have reported a fully-covered sitting as entirely missing.

**360 before touching anything:**

- **Scope** — 102 rows across the 2024 and 2025 sittings carry `pyq_month = 'March'` where the
  cover says February. The 2023 sitting is NOT in scope: no board copy exists to check against.
- **Blast radius** — `pyq_month` feeds the `/browse` PYQ-year filter, mock sitting-discovery and
  the public provenance bracket. Re-labelling splits what students currently see as one March
  sitting into February, and any mock built from "March 2024" would need rebuilding.
- **Does it really apply** — yes for 2024 and 2025, on cover evidence. NOT established for 2023.
- **Risk + reversibility** — a single `UPDATE ... SET pyq_month`, fully reversible, no hash change
  (`content_hash` does not cover `pyq_month`).
- **Cost** — minutes for the update; the unknown is whether any shipped mock references the old label.
- **Recommendation** — **DEFER.** The new rows are correct; the old ones are wrong but consistent.
  Fix when someone can check no mock or saved paper depends on the March label.

---

## Backfill ledger — RESOLVED 2026-09-24: attach-figures hung a Chemistry structure on a MATHS question

**Found and repaired the same day**, during the Chemistry ingest. Recorded because the row was
PUBLIC and because the mechanism is the classic two-id-spaces collision.

`attach-figures.ts` chose which rows a reconcile paper's questions live on with a **hardcoded**
source-file prefix:

```ts
q = paper.bankStatus === "reconcile" ? q.like("source_file", "MH_HSC_12_Maths_PYQ__%") : ...
```

For `chem-mar-2023` it therefore searched the **Maths** compilation, matched `Q. 1. vi.` of the
same March-2023 sitting — `\int\cos^{3}x\,dx`, Indefinite Integration — and attached a benzene
ring to it. The row went PUBLIC carrying a Chemistry structure it never referenced.

**Why it survived two subjects.** `question_number` is unique only WITHIN a subject, and
`pyq_year` + `pyq_month` do not separate three subjects' sittings. Physics never tripped it
because **none of its reconcile papers carries a figureRef**, so this branch had only ever run
for Maths, where the hardcoded prefix happened to be right.

**Repair.** The spurious `image_url` was cleared (the Maths row had none before — its stem
references no figure, so nothing was destroyed), the prefix is now derived per subject via a
`COMPILATION_TOKEN` map, and the re-run landed the crop on the correct Chemistry row. Verified
after: 4 Chemistry crops, all on Chemistry rows, **0 on any other subject**, and
`audit:figures` reports 0 references-without-image across the 241 new rows.

Note the token is NOT the subject name — the Maths files say `Maths` where the bank's subject
is `Mathematics`.

---

## Backfill ledger — a shipped Chemistry row leaks a pandoc image artifact into its stem (2026-09-24)

**Noticed while checking whether two figure crops were needed.** One row, PUBLIC.

`MH_HSC_12_Chemistry_PYQ__Aldehydes_Ketones_and_Carboxylic_Acids.docx`, March 2025 `Q.1.viii`,
carries raw markdown in its question text:

```
The highest acidic compound among the following is _____. ![](media/image8.png){width="0.8...
```

The row DOES have an `image_url`, so the figure itself is attached and the question is
answerable — but the student also sees the literal `![](media/image8.png){width=...}` markup.

`npm run audit:text`'s PANDOC_ARTIFACT class did not report it, which is the more interesting
half: the probe is scoped by `source_file` substring and this row sits under the compilation's
`.docx` name, outside the `MH_HSC_12_Chemistry_PYQ__20` filter used after the ingest.

**360 before touching anything:**

- **Scope** — UNMEASURED. One row found incidentally; the compilation is ~378 rows and the same
  pandoc path produced all of them. Run `audit:text -- MH_HSC_12_Chemistry_PYQ__` (no year) first.
- **Blast radius** — a text-only edit. `content_hash` covers the stem, so a correction is
  delete + re-commit unless done in place with the hash recomputed (see the overline entry above
  for that technique).
- **Does it really apply** — yes, it is visible markup in a PUBLIC stem.
- **Risk + reversibility** — low, reversible.
- **Cost** — minutes once the true count is known.
- **Recommendation** — **MEASURE FIRST.** Do not repair one row until the unfiltered probe has
  said whether it is one or a hundred.

---

## Backfill ledger — RESOLVED 2026-09-24: a Boolean overline was dropped at ingestion, and the shipped PUBLIC row asked the wrong question

**Found during the MH HSC 12 Physics printed-paper ingest. Investigated, resolved and repaired
the same day** — logged here because it was a silent corruption of a PUBLIC row, and because the
mechanism will recur on any future `.docx` ingest.

`reconcile-diff` compared the three reconciled printed papers against the compilation rows
already shipped for those sittings and flagged 38 differences. Thirty-six are LaTeX spacing
(`200\ \text{cm}^{2}` vs `200\text{ cm}^{2}`, `10^{-8}` vs `10^{- 8}`, `(i)` vs `i.`). One was a
different question:

| | stem | key |
|---|---|---|
| Shipped bank row | `\(Y = A + B\)` | (A) OR gate |
| Feb-2023 PDF (third-party) | `\(Y = \overline{A + B}\)` | (C) NOR gate |

The bank row was internally consistent — stem, key and solution all said OR — so no probe could
see it. But its four options were OR / AND / **NOR** / NAND, and a bare `A + B` makes that a
giveaway: the overline is what the NOR and NAND distractors exist for.

### Why the first 360 said DEFER, and why that was wrong

The initial recommendation was to defer, on the grounds that the Feb-2023 source is third-party
and cannot outrank a shipped row. **That reasoning treated the bank row as an independent
reading. It is not.** The chapterwise compilations are themselves DERIVED work — a publisher's
transcription of the board paper — and our row is our pandoc pass over that, with a known lossy
step. It is third-hand. Once the bar is shown to have been present upstream, the row has no
evidential standing at all.

### What settled it — the compilation's own `.docx`

The source is `16. Semiconductor Devices.docx`. Its OMML for this item is
`<m:oMath>15. Y = A + B</m:oMath>` and **`<m:bar>` appears zero times in the whole document** —
so at first reading the publisher also said OR. It does not. The bar is there, drawn as a
**floating VML shape** anchored in the *previous* paragraph:

```
<v:shape type="#_x0000_t32"
         style="position:absolute;margin-left:44.5pt;margin-top:14.75pt;width:25.5pt;height:0"/>
```

Rendered, that line lands in the gap between the two lines, so it reads equally as an underline
on item 14 or an overline on item 15. **The glyph coordinates decide it.** In the PDF the drawn
line runs `x 80.50 -> 106.00`; on item 15, `A` begins at `x 80.30` — a 0.2pt match. On item 14 it
would begin and end *mid-glyph* at both ends (inside `t`, inside `e`), which no real underline
does. It is an overline over `A + B`.

So two independent derived transcriptions agree on NOR — the publisher by drawing the bar, the
third-party PDF by writing `\overline` — and **nothing anywhere asserts OR**. That reading existed
only as an artifact this pipeline manufactured.

### The repair — in place, NOT delete-and-re-commit

The first 360 assumed a stem change forces delete + re-commit (because `content_hash` covers the
stem), orphaning reviews, tags, bookmarks and `paper_questions`. **It does not have to.**
`contentHash(stem, options, answer)` is a pure function of three fields, so the row can be
UPDATEd in place and the `content_hash` column recomputed in the same write — the row id survives
and nothing is orphaned. Re-ingest dedup stays correct because the stored hash still matches its
own preimage.

Applied to row `6c7a0016-8427-4a41-8339-9452963e8c77` (`Q. 1(iii)`, 2023, PUBLIC): stem gained the
overline, key moved A to C, solution rewritten with a truth table, `content_hash`
`dde7dc11…` to `4127fc27…`, options untouched. Verified after: exactly one correct option.
The row had 0 reviews, 0 tags, 0 bookmarks, 0 paper links, so the in-place route was belt-and-braces
here — it is recorded because the NEXT such repair may not be so lucky.

### Scope — measured, and it is one row

**Pandoc drops `<w:pict>` entirely**, so every hand-drawn bar in a source `.docx` is lost in
silence. **All 1,751 `.docx` files under the whole source tree** were scanned for zero-height
`v:shape` lines — 81 hits, classified by width:

| width | count | what it is |
|---|---|---|
| >400pt (all 535.5pt) | 62 | template page-header rules; carry no meaning |
| 61.5-69.7pt | 18 | long-division brackets + subtraction rules, in 2 worksheet files (each counted twice: `Quizzes/` and `Tests/` hold duplicate copies) |
| 25.5pt | **1** | **this defect** |

Neither worksheet reached the bank (`source_file ILIKE '%APP TEST%'` and `'%3-D TEST%'` both
return 0), so the 18 arithmetic rules are moot. **Exactly one narrow math overline exists in the
entire source tree, and it is this one. No further backfill.** Width is the discriminator: a page
rule spans the text column, a math bar spans a few characters.

**Durable check for any future `.docx` ingest** — a drawn bar leaves no trace in the extracted
text, so grep the source before trusting it:

```
python -c "import zipfile,re,sys; x=zipfile.ZipFile(sys.argv[1]).read('word/document.xml').decode('utf-8','replace'); print([s for s in re.findall(r'<v:shape [^>]*style=\"([^\"]*)\"', x) if 'height:0' in s])" FILE.docx
```

### Still open from the same sweep

Feb-2023 `Q. 20` differs in SCOPE — the bank row carries extra parts ("Define the current gain
\(\alpha_{DC}\) and \(\beta_{DC}\)...") the third-party PDF does not print. No forensic tiebreak
exists for a scope difference the way it did for a drawn glyph, so this one genuinely waits for a
board paper. **Reproduce:** `npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-diff.ts phy-feb-2023`

---

## Backfill ledger — the escaped space `\ ` is DROPPED by the Word export (2026-09-22)

**Measured, not fixed.** The fix is one mapping in the exporter, but it changes every
downloaded answer key in the bank, so it is a decision rather than a tidy-up.

`\ ` (backslash-space, the usual way to part a number from its unit inside a math zone)
becomes an **empty run** in OMML. Driven through the shipped helper `latexToOmml`:

| LaTeX | Runs the exporter emits | Word shows |
|---|---|---|
| `6328\ \mathrm{nm}` | `"6328"`, `""`, `"nm"` | `6328nm` |
| `6328\,\mathrm{nm}` | `"6328"`, `" "`, `"nm"` | `6328 nm` |

`\,` survives as a real U+0020; `\ ` does not. The cause is that temml renders `\ ` as
`<mpadded>` and mathml2omml prints **`Type not supported: mpadded`** and emits nothing for
it. That line is already on every `audit:omml` run and has always been read as noise.

**`audit:omml` cannot see this and never will as written** — it asks whether a zone
CONVERTED, and this one converts. It just converts to the wrong thing. The same blind spot
covers any other element mathml2omml declines: the message goes to stderr, the counter says
0 failing zones. A gate that counts conversions is not a gate on fidelity.

Scope, measured over all 80,402 rows: **8,881 solutions and 3,412 stems** carry an escaped
space, **9,979 of the affected rows are PUBLIC**. It is bank-wide, not a CBSE-PYQ habit —
the heaviest sources are NDA Maths mocks, Cadetprep worksheets, State Board Chemistry and
Maths, MH-HSC Chemistry and JEE.

**Do NOT fix it by rewriting 11k authored strings.** The content is correct LaTeX and renders
correctly on `/browse`, which is the surface students actually use; only the teacher's Word
download is affected. Two candidate fixes, both in code:

1. Map `mpadded` to a single space during the MathML→OMML walk (narrow, and it also fixes
   `\;`, `\quad` and friends if they land on the same element — unverified).
2. Normalise `\ ` → `\,` at the export boundary only, leaving stored text untouched.

Either needs a golden test in the shape of `tests/docx-solution-table.test.ts`: assert the
rendered run carries a space, since the current suite would pass with it missing.

---

## Backfill ledger — five CBSE Physics rows are unanswerable: figure referenced, no image (2026-09-22)

**Surfaced by widening `audit-figures.ts`, NOT fixed.** Each needs a crop authored and
attached, which is per-row work on papers already shipped.

The probe's `FIGURE_REF` regex matched `shown` but not `shows`, so **"The figure shows ..."**
— the commonest opening CBSE gives a figure question — missed on a single letter. That is the
exact failure its own file header warns about ("a probe validated only against the cases it
already flags cannot show you what it misses"). `2025-55-6-1` Q1 was unanswerable with no
image and the probe called it clean.

Measured after widening, both directions:
- `REFERENCES-NO-IMAGE` **42 → 47** — five genuinely unanswerable rows surfaced, zero lost.
- `IMAGE-NO-REFERENCE` **119 → 86** — 33 false "mis-keyed attach" flags cleared, rows that
  carried a figure all along and whose stems the probe simply could not read.

The five to crop and attach:

| Paper | Q | Stem opens |
|---|---|---|
| `2023-55-3-3` | Q28 | "The figure shows a rectangular conductor PQRS ..." — **attached 2026-09-23** |
| `2023-55-3-3` | Q30 | "(a) The figure shows de Broglie wavelength (λ) for two particles ..." — **attached 2026-09-23** |
| `2023-55-5-2` | Q11 | "Figure shows a plot of stopping potential (V₀) versus 1/λ ..." — **attached 2026-09-23** |
| `2025-55-4-3` | Q24 | "(b) The figure shows the plot of magnitude of induced emf (ε) versus the rate of change of current in two coils ..." — **attached 2026-09-23** |
| `2026-55-1-1` | Q24 | "Figure shows a narrow beam of electrons entering ... symmetrically" — **attached 2026-09-22** |

Worth a sweep for the same one-letter class elsewhere: the regex is an **enumerated phrasing
list**, and this is the second time it has under-matched silently.

Live counts as of 2026-09-23, after the figures attached while solving the sibling papers: `REFERENCES-NO-IMAGE` **31**, `IMAGE-NO-REFERENCE` **84**, `DRAWN-OPTIONS-NO-IMAGE` **0**. **All five rows above are now attached — this ledger is closed.** Each was cropped when its paper came up in the sibling run rather than as a separate sweep, which is why they landed across 2026-09-22 and 09-23.

The **remaining 31** are not this class and are not tracked here: they are rows whose figure has simply not been cropped yet, and they will be picked up the same way — as their papers come up. The `IMAGE-NO-REFERENCE` **84** is a different thing again and should not be read as 84 mis-keyed attaches: most are rows that DO carry a correct image but whose stem `FIGURE_REF` cannot see, because the regex is an enumerated noun list and CBSE names a drawing by what it depicts. `2024-55-4-3` Q25 — "In the given network, calculate:" — is the worked example: the regex matches `network shown/below/above` but not `given network`. Widening it would move counts on shipped rows, so it is left alone and recorded here instead.

### Superseded 2026-09-23 — the rule went bank-wide, and the `given network` widening above was taken

`npm run audit:figures` (pure core `scripts/lib/figureRefs.ts`, spec `tests/figure-refs.test.ts`)
now runs the rule across **every exam**. It replaces two pipeline-scoped copies —
`scripts/cbse-12-pyq/audit-figures.ts` and `scripts/mh-hsc-12-pyq/audit-figure-refs.ts`, both of
which now import the shared core rather than carrying their own. The two copies had learned
DIFFERENT lessons and neither knew the other's: this one knew `shows`, `network` and the plurals
revert; that one knew the bare `Fig. N` form and that a determiner needs a gap before its noun.

The `given network` widening the paragraph above deliberately declined was measured and taken,
anchored on a PREPOSITION (`in|from|for|across|of|through` + determiner + up to two words +
`circuit|network`). Measured bank-wide: **+147 on the recall check for 7 additions**, 5 of them
genuine. The preposition is what keeps it honest — without it the rule also swallows the verb, and
"You are given three circuit elements X, Y and Z" is a text-only CBSE question with no figure.
Its effect on this corpus: `REFERENCES-NO-IMAGE` 31 → **36**, `IMAGE-NO-REFERENCE` 84 → **76**.

A widening that was measured and REJECTED, recorded so it is not re-proposed: extending the same
determiner rule to `structure|curve|graph` scored **50 additions of which ~6 were real** — it
matched "Which of the following is correct structure of tyrosine?" (the options are the figure,
not the stem) and even "does NOT figure among the Five Principles of Panchsheel", where *figure*
is a verb. Each of its false positives is pinned as a negative fixture in the spec.

**Bank-wide baseline, 2026-09-23: `REFERENCES-NO-IMAGE` 385, of which 378 are PUBLIC.**

READ THE `RECALL` COLUMN BEFORE THE COUNT. It is the share of an exam's rows that DO carry a
figure which the rule can name, and it is reported per exam because the achievable ceiling differs
by corpus — a Balbharati geometry stem always names its figure, a Geography map question never
does, and a chemistry stem names the molecule rather than a picture. Where recall is low the count
is a **floor**, not a measurement, and a small number there is not good news. A single bank-wide
figure averages those into something that means nothing about either, which is why it is not the
headline.

| Exam | recall | refs | no image | rate |
|---|---|---|---|---|
| Maharashtra State Board Class 10 | 44% ⚠ | 255 | **140** | 55% |
| CBSE Class 12 | 78% | 337 | 70 | 21% |
| Foundation Course | 74% | 244 | 34 | 14% |
| CBSE Class 10 | 97% | 81 | 23 | 28% |
| CBSE Class 11 | 93% | 59 | 21 | 36% |
| JEE Mains | 40% ⚠ | 549 | 19 | 3% |
| Maharashtra HSC Class 12 | 54% | 61 | 18 | 30% |
| MHT-CET | 53% | 153 | 17 | 11% |
| Maharashtra State Board Class 11 | 25% ⚠ | 27 | 13 | 48% |
| NDA | 48% ⚠ | 26 | 11 | 42% |
| NEET | 50% | 211 | 8 | 4% |
| Maharashtra State Board Class 9 | 79% | 120 | 4 | 3% |

**The defect arrives per CHAPTER, not per row, which is why the report groups by source file.**
Each pipeline's figure step is driven by a per-chapter manifest (`data/<chapterId>.*fig.json`), so
a file with ZERO images was never figure-processed at all, while a file with some images lost
individual rows. Those are different repairs. `scripts/mh-ssc-10-text/data/` holds 16 manifests —
Geography, History, Science — and for Maths exactly one, `pythagoras-10`. The DB agrees precisely:
Pythagoras Theorem has 23 images and **0** missing, while Circle, Similarity, Mensuration and
Statistics have **0 images and 125 missing between them**. `scripts/mh-sb-9/data/` has manifests
for every geometry chapter, and Class 9 sits at 3%. Same team, same book family, same pipeline.

### Done 2026-09-23 — 94 figures attached to the four MH SSC 10 Maths chapters; bank-wide 385 → 291

`REFERENCES-NO-IMAGE` for the whole MH SSC 10 textbook corpus went **135 → 41**, its rate 86% → 26%,
and it is no longer the worst exam in the bank (CBSE Class 12 is). Attached: Circle 40 ·
Similarity 23 · Mensuration 18 · Statistics 13.

**The method, and why it is not the hand-anchoring the other chapters used.** This book is
born-digital: every figure is vector-drawn or an embedded raster, and every figure carries a
printed `Fig. N.M` caption as REAL TEXT that the question stems name ("In figure 3.37, …").
So the extent is measured and the question→figure mapping is READ off the page, never inferred
from reading order. `derive-figs.py` → `map-figs.ts` → `contact-sheet.py` → `attach-images.ts`.

**Five defects, each found only by LOOKING at the crops, each with a green pipeline before it:**
1. Captions sit BESIDE figures as often as below — the first version assumed below and silently
   lost three figures on one page.
2. Label absorption ITERATED, so boxes climbed the page; one ended up containing the "Practice
   set 3.5" header and the whole of the next question. Now single-pass and clamped.
3. A crop was the pink "ICT Tools or Links" panel with one corner of Fig. 3.103. Clusters
   containing prose are now rejected.
4. Mensuration's solids are EMBEDDED RASTERS, not vector paths — 22 of its 48 captions resolved
   to nothing until image placements were clustered too. The chapter that most needs pictures was
   the one the first method was blindest to.
5. A box widened to hold its CAPTION shaves the right-hand ends off a paragraph wrapped beside the
   figure. Length cannot see it (wrapped lines are short) and distance cannot either; what
   separates body text from a callout is that body text sits on a COLUMN EDGE shared by four or
   more lines, measured from the page rather than assumed.

**Where it ends: the script REFUSES rather than guesses.** A bbox is a rectangle and a page is
not, so some layouts admit no clean box. One that still contains body text is reported
underivable and goes to the backlog below. Measured against the 40 Circle boxes a human had
already passed, that refusal costs **2 of 40 (5%)** — false refusals in the safe direction.

**The review is a committed gate, not a habit.** `data/<id>.figs-review.json` lists every ref a
person has seen on a contact sheet; `map-figs.ts` emits only those and HOLDS the rest. Verified by
fault injection. Three boxes were rejected at review and are in the backlog. `map-figs.ts` also
refuses to overwrite a shipped manifest with an empty one.

**Hand-anchor backlog — 30 rows the derivation will not guess at.** Not defects in the script;
each is a case where the page does not carry the information the join needs.

| chapter | n | why |
|---|---|---|
| Circle | 8 | 4 stems say "the adjoining figure" and print NO number; 3 numbers (3.28/3.38/3.39) are printed twice on one page; 1 cluster merged two figures |
| Similarity | 8 | 4 boxes refused as unclean; 2 numberless; 1 stem reads three figures at once; Fig. 1.9 is outside the page range |
| Mensuration | 8+2 | 5 numberless (the Ex 7.3 Q.13 set); 1 reads two figures; Fig. 7.47 out of range; 1 refused; plus Ex 7.1 Q.8 and PS7 Q.11 rejected at review |
| Statistics | 6 | Fig. 6.6 and 6.4 are wide frequency-polygon/histogram plots that no clean rectangle bounds |

A numberless "adjoining figure" row could be resolved by reading order, and deliberately is not —
picking a figure by position is exactly the inference this design exists to avoid.

### Done 2026-09-23 — the CBSE/NCERT/MH tail was READ: 151 rows, and the probe's real precision is 26%, not 70%

Three parallel lanes, contract in `scripts/lib/figures/TRIAGE_BRIEF.md`, per-row verdicts committed
under `scripts/lib/figures/triage/`. Every row read individually; none sampled.

| lane | rows | MISS | DRAWS | CONCEPT | SELFCONTAINED | DESCRIBED | miss rate |
|---|---|---|---|---|---|---|---|
| `cbse-12` | 70 | 18 | 3 | 2 | 43 | 4 | 26% |
| `cbse-10-11` | 44 | 10 | 0 | 0 | 34 | 0 | 23% |
| `mh-11-12` | 37 | 11 | 0 | 0 | 20 | 6 | 30% |
| **total** | **151** | **39** | 3 | 2 | 97 | 10 | **26%** |

**CORRECTION TO THE 2026-09-23 ESTIMATE ABOVE.** The "~70% precision" figure came from reading 16
rows spread across all exams. On the CBSE/NCERT/MH corpora the true rate is **26%**, and the
over-reporting is NOT the `DRAWS` class the rule was built to avoid — DRAWS is 3 of 151, and one
whole lane returned zero. It is **`SELFCONTAINED`, 97 of 151**: the NCERT and Balbharati
transcriptions inlined the figure's numbers into the stem while keeping its citation, so
"see Fig. 12.9" survived and the dependence did not. **A figure CITATION is not a figure
DEPENDENCE, and no stem rule can separate them** — the discriminating signal is whether the stem
states a connection or arrangement (series, parallel, "which of the vectors are collinear") rather
than a named shape with its dimensions.

**Two causes were fixable in the shared core and are now fixed** (spec'd in
`tests/figure-refs.test.ts`, measured bank-wide 291 → **272**):
- A GFM pipe-table satisfies "shown below in the table". Guarded both ways — the table only
  excuses a match when the text names no figure at all, so a row that prints a table AND reads a
  figure is still flagged.
- `describesFigureInText` knew only the state-board `[Figure: …]` bracket; NCERT writes
  `[Read from Fig. 2.8: …]` and `[Fig. 2.29 shows …]`. Four correctly-handled rows had been sitting
  in the serious list looking like defects. CBSE Class 12: 70 → 59, DESCRIBED 0 → 6.

**The most important finding is a NEGATIVE one, and it corrects the framing above.** The lane on
the two lowest-recall exams (MH HSC 12 at 54%, MH State Board 11 at 25%) went looking for the
hidden population that a low recall implies, five different ways — including harvesting phrasings
from the 61 with-image rows the rule cannot name, which is the check `figureRefs.ts` prescribes.
**It found zero unanswerable rows.** Those exams' with-image corpora are chemistry structure
drawings and Mathematical-Logic switching circuits, which the ingestion DID attach; the
corresponding image-less rows inline their data as LaTeX and need nothing. So for these two exams
the count is close to a real measurement, not the floor the recall column warns about. The warning
stays — it is the right default, and it is why the check was run — but it has now been tested
twice and come back clean, and that is worth more than the warning itself.

**A widening that was measured and REJECTED, so it is not re-proposed:** adding
`structure|molecule|compound|reaction|pair` to the noun list (the dominant reason MH SB 11 reads
25% recall) pulls in **~280 rows**, overwhelmingly false — "Show that the following pairs of lines
are perpendicular", "Determine which of the following pairs of angles are co-terminal". Precision
would collapse and the MISS list would stop being read.

**Known blind spots, logged not fixed:**
- `drawn below` matches no branch, so that row never enters the report at all. **`DESCRIBED` is a
  floor for the same reason `MISS` is** — nothing reaches `describesFigureInText` unless
  `referencesFigure` fired first.
- **The probe reads STEMS only.** 78 lane rows cite a figure in their *solution* while the stem is
  silent, and `StateBoard_11_Chemistry__Adsorption_and_Colloids.pdf Ex Q.10(b)-(d)` are model
  answers opening "The labelled diagram (see the figure) shows…" against no figure. Invisible here
  and to `audit:text`.
- **The case-study multiplier distorts any per-exam count.** 24 of CBSE 12's 36 pyq hits are set
  members of five word problems whose SHARED context carries one ornamental clause ("a tank, as
  shown in the figure below"); one phrase becomes 4-5 hits. Two sets also carry the image on some
  members and not others, which confirms from data that a set's figure must be duplicated onto
  every member row — there is no `context_image_url`.

**The full population is now read: 302 rows across SIX lanes, 65 genuine — 22% precision.** The
three later lanes (`mh-ssc-10` 48 rows/2 MISS, `foundation-neet-cds` 40/8, `jee-cet-nda-misc` 63/16)
confirm the pattern the first three found and sharpen it:

- **MH SSC 10 came back at 4%**, the lowest in the bank — the 94 attaches genuinely closed that
  corpus rather than moving a number. Its residue is systematically self-contained: the state-board
  vision pipeline appends the figure's data as a parenthetical or an explicit "Figure :" paragraph.
- **NDA: 11 of 11 flagged rows are false alarms of an instructive kind.** That ingest TRANSCRIBES
  figures into prose rather than dropping them, so its 3-images-in-9,715-rows figure is a design
  choice, not a gap.
- **The single biggest repair was one repeat defect, not eight** — 8 MHT-CET Linear Programming
  rows, one per sitting across 8 `.xlsx` files, each "the shaded area in the given figure is a
  solution set" with no region attached.
- **Four more probe defects, each spec'd and fixed:** a pipe-table satisfies "shown below in the
  table"; `[Diagram:` and the NCERT `[Read from Fig.` / `[Fig. N shows` brackets now register as
  described-in-text; and branch 1 read **"the fig wasp completes its life cycle in fig fruit"** as a
  figure reference (bare `fig` now requires its period).
- **Two blind spots logged, not chased:** `drawn below` matches nothing, so DESCRIBED is a floor for
  the same reason MISS is; and the probe reads STEMS ONLY — 78 rows cite a figure in their SOLUTION
  against no image, invisible here and to `audit:text`.
- **A widening measured and REJECTED:** adding `structure|molecule|compound|reaction|pair` pulls in
  ~280 rows, overwhelmingly false ("Show that the following pairs of lines are perpendicular").

### Done 2026-09-23 — 22 of the 65 genuine misses repaired; the rest need per-book work

`npm run audit:figures` bank-wide: **385 → 248**. Attached: **11 MHT-CET** + **11 NCERT/State Board**
(on top of the 94 MH SSC 10 Maths earlier). MHT-CET 17 → 6 (rate 11% → 4%); CDS reached **zero**.

**MHT-CET went through the `.docx` papers, not the `.xlsx`, and that is the durable lesson**
(user instruction; recorded in `scripts/mhtcet/README.md`, CLAUDE.md's exam table and
[[mhtcet-source-docx-render]]). The `*_QuestionBank.xlsx` named in `source_file` IS the bank's
ingestion input, so it can only ever reproduce a gap. The papers' figures are **embedded rasters**,
so `pandoc --extract-media` returns the exact picture the author inserted — native resolution,
leak-free BY CONSTRUCTION. Every crop-and-trim heuristic in `derive.py` exists to approximate, on
ink-only books, what this gets for free. **Where a source offers the embedded object, take it.**

**A rule recorded BACKWARDS and corrected within the hour.** On finding `MHT_CET_3rdMay2023_S1_QB
.xlsx` holding a row noted "3rd May 2nd Shift", the note was assumed authoritative. It is not: the
question is printed in **shift 1**, so the filename was right and **the note is a data defect**
(that row will mis-file in any shift-based view). The rule now implemented and written down: the
sitting is a HINT, both shifts are searched, and the **stem-and-options match is the authority**.

**Four bugs in the shared derivation, all found by looking rather than by a gate:**
1. **A LINE HAS NO AREA.** Ink was filtered by `get_area() > 6`, which discards every purely
   horizontal or vertical stroke. NCERT diagrams are thin lines and arrowheads, so a whole page of
   vector diagram collapsed to ONE cluster with the figure invisible. Balbharati survived it only
   because its figures use arcs and closed shapes. Regression-checked against the 40 shipped boxes:
   33 identical, 2 already-refused, none newly lost.
2. Fixing (1) let page furniture in — NCERT's tall coloured sidebars bridged everything into one
   page-spanning cluster. Ink must now be CONTAINED in the content box, not merely overlap it.
3. **Clustering was quadratic** — fine on tens of paths, hopeless on thousands. Rewritten as a
   y-ordered sweep retiring clusters that can no longer merge: byte-identical output, minutes → 13s.
4. **`column_edges(page)` was being called once per TEXT LINE**, each call re-parsing the page. One
   chapter exceeded 240s; hoisting it gave 17s.

**New: `scripts/lib/figures/overrides.json`** — committed hand-anchored boxes that win over the
derivation, for a figure whose layout admits no clean rectangle and for a derived box that is right
but untidy. It is a file rather than an edit to the generated catalogue because the catalogue is
rebuilt every run: a fix written there survives exactly until the next invocation. Every entry
carries a `why`, because a coordinate with no reason behind it cannot be re-checked.

**The remaining 43, and why each group is stuck — none is a defect in the tooling:**

| group | n | blocked on |
|---|---|---|
| Balbharati Class 11/12 Physics | ~10 | stems say "as shown in the figure" with NO number, so the number-join cannot fire; needs REF-keyed overrides (the current override file is fig-number-keyed) |
| NCERT Physics/Maths residue | 7 | derivation refuses the box (no clean rectangle on that layout) |
| NCERT Class-10 Science | 4 | a third book layout — 13 captions yielded 1 box |
| CBSE board papers | 7 | not in the source resolver; different ingest shape |
| Foundation · Pariksha · JEE · UPSC · MH SSC 10 | ~15 | mostly no resolver; Pariksha `PARIKSHA_VV_13136.pdf` is 5 rows of one file that dropped figures wholesale and wants a re-ingest, not per-row repair |

**`scripts/ncert/` has no Class-10 SCIENCE config** — 421 questions are in the bank and the books
are on disk, but whatever ingested them was never committed. `sources.ts` states that mapping
explicitly and says why; the missing pipeline is worth restoring separately.

## Backfill ledger — `contentHash` is context-blind, and match-list questions collide (2026-09-22)

**Found during the IPMAT load.** Logged, NOT swept — the fix touches the dedup key of every
row in the bank, so it is a decision, not a tidy-up.

`contentHash(question, options, answer)` in `src/lib/upload/hash.ts` deliberately excludes
`context`. `subjectiveContentHash` and `numericContentHash` both include it; only the MCQ
one does not. For a corpus where the stem carries the question that is harmless. For a
**match-list** question it is not: the stem is a bare directive and the real question sits
in the context.

The IPMAT pre-flight caught a live instance — JIPMAT 2024 VA Q29 and Q33 share the stem
"Choose the correct answer from the options given below :", the same four
`(A) - (I), (B) - (II)…` permutation options, and the same key D, differing only in their
context (parts of speech vs idioms). Because `commitStaged` dedups by **UPSERT**, a
collision does not error: one row silently replaces the other and the inserted count comes
back short with no explanation.

IPMAT works around it locally with an `IPMAT`-namespaced context-aware digest
(`scripts/ipmat/hash.ts`). **The open question is whether any already-loaded corpus lost
rows to this.** CDS and NDA both carry match-list questions; CLAUDE.md already records "37
same-stem/diff-option groups" as an open content-audit item, which is the adjacent shape.

**360 before touching anything:**

- **Scope** — MCQ rows with a non-null `context` whose (normalised stem + sorted options +
  answer) matches another row in the same exam. Measurable read-only with one SQL query; do
  that first, because the answer may be zero.
- **Blast radius** — `content_hash` is the dedup key for every ingestion script and for the
  `/uploads` re-upload path. Redefining the shared helper changes the digest of all ~72k
  rows, so **the next re-ingest of every corpus would duplicate rather than dedup**. That is
  the reason this was not fixed in passing.
- **Does it really apply** — only where a stem is non-distinctive AND options repeat. A
  normal MCQ whose stem carries the question cannot collide this way.
- **Risk + reversibility** — a lost row cannot be recovered from the DB; it has to be
  re-ingested from source. Reversible only where the source is still on disk.
- **Cost** — the measuring query is minutes. A per-corpus re-ingest is not.
- **Recommendation** — **MEASURED 2026-09-22: zero rows lost. No action needed.**

### The measurement

One read-only query over the whole bank looked for MCQ groups sharing (normalised stem +
sorted option texts + answer) within an exam while differing in context. It found **two
groups, four rows, and every one of them is present**:

| Exam | Rows | Verdict |
|---|---|---|
| JIPMAT | 2024 VA Q29 + Q33 | The known pair. Both present — `ipmatContentHash` separated them. |
| NDA | Q22 of `LWS_11th__QP_ENG_Parts_of_Speech.pdf` + Q49 of `Oswaal_NDA_GAT_Mock_Test_10.pdf` | Both present, different stored `content_hash`. A genuine cross-source duplicate of one question, which this project deliberately **keeps** as a recurrence signal. |

So the latent collision never fired on loaded data: the only near-instance is one question
legitimately reused across two source files, and its stored hashes already differ.

**What this closes.** No re-ingest, no change to `src/lib/upload/hash.ts`, and no per-corpus
hash beyond the one IPMAT already has. **What it leaves open**, cheaply: the query above is
worth keeping as a standing probe, because the exposure grows with every match-list corpus
and the failure mode is silent by construction — a lost row shows up as a count that is
short, never as an error.

---

## Backfill ledger — /notes intro duplication + ungated prose counts (2026-09-20)

**Found while fixing the MHT-CET Indefinite Integration hero.** Logged, NOT swept — rewriting
shipped editorial copy is a per-chapter decision, and the two classes below have different
risk profiles. `npm run notes:intro` reproduces both lists at any time.

**Class A — 48 intros enumerate their own subtopics.** (Was 54; all nine MHT-CET Maths chapters were cleared on 2026-09-21, so what remains is NDA × 6 subjects, MHT-CET Chemistry and CDS.) The
chapter landing already renders those subtopics as cards, with one-line definitions and LIVE
counts, so the prose list is the same information twice and is the copy that rots. Cutting it
is what took Indefinite Integration from 218 words to 94. **Blast radius:** `intro` also feeds
the print handout cover and, via `chapterCardBlurb`'s first-sentence fallback, the subject-card
and `<meta description>` of any chapter without an authored `cardBlurb` — so a rewrite must keep
the FIRST SENTENCE inside the 8–40 word band that `tests/notes-card-blurb.test.ts` enforces.
**Does it really apply:** not everywhere. An enumeration earns its place where it says something
the cards cannot — Mathematical Logic's intro names where the difficulty actually sits
(Switching Circuits 12 q at 67% HARD vs Negation 14 q at 14%), which no card carries. Read each
one; do not regex them out. **Cost:** ~10 min per chapter. **Recommendation:** partial — do it
opportunistically when a chapter is open for another reason, newest-authored first.

**Class B — 41 stale count claims in subtopic `whyItMatters` / `oneLineDefinition`.** (Was 56; the 15 MHT-CET Maths ones are fixed.) Same
defect class as the intro counts now gated by `tests/notes-intro-counts.test.ts`, but this prose
is NOT gated: 130 such claims exist across the corpus and 56 match no live chapter count, no
subtopic count and no two-subtopic sum. **Blast radius:** body text only — no metadata, no
cards, no JSON-LD. **Cost:** mechanical, but every number needs its own live query (the claims
are per-subtopic and some are pair sums). **Recommendation:** do it per chapter as part of the
post-upload ritual's step 5, then flip the `whyItMatters` rule from the probe into the gate.
The gate flip is the real prize — until then this class can re-stale silently after any ingest.

**What the MHT-CET Maths pass taught, for whoever takes the next subject:** a relative claim ("the densest subtopic", "the hardest") needs its RANKING recomputed, not just its number — 6 of the 15 were superlatives that a number-only backfill would have left standing and false. And cutting a numbered list can break prose ELSEWHERE in the same intro: Mathematical Logic's framing referred to "the algebra in block 5". Grep the intro for "block", "movement" and "(n)" back-references before cutting.

---

## Backfill ledger — 16 test suites still sign in RAW instead of through `mustSignIn` (logged 2026-09-25)

Three consecutive `npm run gate prepush` runs on 2026-09-25 failed on ONE suite, `tests/dashboard-stats-authz.test.ts`, with
`AuthApiError: Request rate limit reached` — 409 of 410 files green each time and the build never reached. The cause was
the auth window, not the code: each run began inside the previous run's five-minute window (the gate's own ~150 sign-ins
plus the targeted vitest runs between them), and that suite called `signInWithPassword` directly, so the first
rate-limited sign-in threw instead of waiting. It now goes through `mustSignIn` (which waits 65 s × up to 5) with its
`beforeAll` timeout raised to fit. **`grep -ln "signInWithPassword" tests/*.test.ts` still lists 16 files** doing the same
thing; each is a latent identical failure on a busy afternoon. Migrating them is mechanical (import the helper, replace
the call, raise the hook timeout) but touches 16 shipped suites, so it is logged here rather than swept. Until then:
leave ≥6 minutes between any two test runs that sign in, and never run a targeted DB suite while a gate is in flight.

## Backfill ledger — subtopic ORDER drift between /guide and /notes (8 MHT-CET Maths chapters)

**Found 2026-09-20** while fixing the Mathematical Logic teaching arc. Logged, NOT fixed —
reordering shipped chapters is an editorial decision per chapter, not a mechanical sweep.

A chapter's subtopic order is stated in three places: the `/notes` chapter's `subtopicOrder`
(canonical — `npm run notes:order` syncs it into `subtopics.order_index`, so it drives `/browse`
too), the `/guide` playbook card's `subtopics`, and the `/guide` detail page's `subSkills`.
Mathematical Logic had all three disagreeing; fixing it exposed that **eight more chapters carry
order-only drift** between the card and `/notes` (same subtopics, different sequence):

`line-and-plane` · `vectors` · `applications-of-derivative` · `differential-equations` ·
`indefinite-integration` · `differentiation` · `probability-distribution` · `binomial-distribution`

Two of them (`differential-equations`, `differentiation`) additionally have `subSkills` whose SET
differs from the card at equal length — a content disagreement, not just order.

**Guarded meanwhile:** `tests/notes-guide-subtopic-order.test.ts` hard-asserts SET equality for
every chapter (so a subtopic can no longer go missing from one surface) and asserts ORDER only for
slugs on its `ARC_VERIFIED` allowlist. Today that list holds `mathematical-logic`, `limits`, `definite-integration` and `applications-of-definite-integral` (the last three arc-verified at birth on 2026-09-25 — notes order, guide card and `subSkills` were written together). The eight
above render as skipped tests naming this ledger.

**To clear one:** decide which order is pedagogically right (the `/notes` arc is usually the
considered one — the guide card was often written first), sync the other two surfaces to it, run
`npm run notes:arc -- mht-cet-maths <chapter> --terms` to check the arc holds, then add the slug to
`ARC_VERIFIED`. Do not sync blindly to whichever surface was edited last.

**Why not now:** eight chapters is eight independent editorial judgements about teaching order,
each needing the bank read that the Mathematical Logic pass needed. Batching them into a
"consistency sweep" would pick an order by coin-flip and call it a fix.

---

## Classroom projection — the "Project" button goes icon-only

**Decided 2026-09-18, deferred to a later pass** (the overlay itself shipped the same day).

The trigger currently renders a `Presentation` icon **plus the word "Project"**. The word was
there for discoverability of an unfamiliar affordance; the decision is that the icon alone
carries it once teachers know the control, and the label costs horizontal room in a card meta
row that already holds a bookmark and a cart toggle — worst on `/board`, where it sits beside
the stem rather than in a dedicated row.

**What changes:** drop the text node in `PresentButton.tsx`. The button already carries
`aria-label="Project this question on the board"` and a `title`, so the accessible name and the
hover tooltip survive the change untouched — this is a visual-only edit, not an accessibility
one. Sizing wants a look at the same time: the control becomes an icon button and should match
the neighbouring icon controls rather than keep the label-shaped padding.

**Why not now:** it is a deliberate visual change to a control nobody has yet used on a real
panel, and the one thing that would inform it — whether the word is in fact needed for a
teacher to find the control — is answered by the browser pass that is still owed. Making it
icon-only before that pass would be guessing at the answer rather than reading it.

---

## Item statistics — what remains

**Built and live (2026-09-11/12).** Migrations 0095 + 0096, the pure core, the vault rollup,
the nda-tracker export + ingest, the `/browse` staff chip, `/dashboard/item-stats`, and
exposure in the paper builder. **8,984 sitting rows over 8,245 questions; 1,462 at n>=10, 625
at n>=20; 319 leads.** Spec: [ITEM_STATS.md](ITEM_STATS.md). Runbook: OPERATIONS.md.

Nothing here is blocked on code. What is left:

- **The browser click-through — owed, and only a human can do it.** Every surface is auth-gated
  `ƒ`, so the gate proves compilation and the two smokes prove the loaders; neither proves
  layout. Worth checking: the `/browse` card's expanded panel (five blocks now), the chip at
  360px, `/dashboard/item-stats` at 319 rows, and the two chips side by side in the paper
  editor and add panel — a question carrying both is the interesting case.
- **The weekly refresh is documented but NOT scheduled.** It is a genuine two-repo manual step
  (`node item_stats.js --out=…` there, then `itemstats:ingest` + `itemstats:rollup` here) and
  no single cron spans two repos. Either accept it as a Monday habit alongside `db:backup`, or
  decide to automate it — which needs the export committed somewhere both sides can reach.
- **The `/browse` leads filter**, deferred with reason: narrowing to leads needs the aggregate
  *before* the question query, i.e. an RPC or a full-table fetch on the hottest public page.
  Viable once a maintained aggregate exists — which decision 6 already anticipates for the
  read-path ceiling (~30-40 sittings on one question; ~1.3 today).
- **Difficulty promotion: deliberately NOT work.** `questions.difficulty` drives
  `selectByQuota` in every mock blueprint and is quoted as %HARD in 11 shipped guides;
  overwriting it from measurement would silently change which papers get built. If ever
  revisited, bands must be **per-format** — an MCQ p-value carries a ~25% guessing floor and a
  NAT one ~0%.

### Closed — the two MARK != KEY findings

Adjudicated 2026-09-12 (`question_reviews`, run `item-stats-leads:2026-09-12`): **both bank
keys are CORRECT**, verified by independent derivation. `∫₀⁴|x−1|dx` is 5, and the sentence
rearrangement's SPRQ is uniquely correct among its four options. Nothing in the bank needed
changing, and those two verdicts stand on their own.

The defects were institute-side grading — `Blueprint mock 1` q108 credited every attempter
though nobody chose the key, and `GAT MOCK W011` q25 denied every attempter including the four
who chose it. Measured impact: **14 student-questions, net −11.98 marks** (10 over-credited
3.33 each, 4 under-credited 5.33 each).

**Correcting those marks was considered and DELIBERATELY NOT DONE (user's call, 2026-09-12).**
Recorded here so it does not resurface as outstanding work. `nda-tracker/regrade_impact.js`
stays: it is read-only, wired into nothing, and reusable for the next finding —
`node regrade_impact.js --exam=<id> --q=<n>` reports who is mis-marked and by how much without
writing anything.

---

## Student education — what remains (2026-09-24)

Slice 1 of [STUDENT_EDUCATION_SPEC.md](STUDENT_EDUCATION_SPEC.md) shipped
2026-09-24: `/start`, the welcome screen's second step, the result-page
caption, the welcome email (migration 0117, cron `welcome.yml`), and the
classroom script (appendix A of the spec). Left, in the order the spec ranks
them:

- ~~**Teacher card + invite email (slice 2).**~~ SHIPPED 2026-09-24: a collapsed
  "Five minutes in class" card on the batch roster (`ClassroomScriptCard` +
  `CopyScriptButton`, one source `lib/education/classroomScript.ts`) and three
  loop lines in `buildBatchInviteEmail`. Render of the card is unverified
  (middleware-gated `f`, button behind a click).
- **Blog post — how to prepare for NDA with PYQ Vault (slice 3).** Prose, not
  code; indexable; answers the query a new student actually searches. Link it
  from `/start`.
- **One-shot in-app callouts, stored server-side.** A first-visit hint per
  surface (result page, drill end, map) with a `seen` column and a client
  island each. Deferred because the permanent result caption and `/start`
  cover the two highest-value moments; build it only if the measured breadth
  (spec §6) does not move.
- **Measure before adding more.** Re-run the spec's §1 SQL two weeks after the
  cron first fires. `npm run email:welcome -- --report` is the delivery-side
  readout. If second-feature use within 7 days is still under 20%, the
  problem is not awareness and this section should not grow.

## Engagement engine — what remains

**The plan, the status of every item and the PMF targets now live in
[ENGAGEMENT_SPEC.md](ENGAGEMENT_SPEC.md) (2026-09-24).** Tranche A shipped that
day (result headline reframed + attempt-scoped drill · due count on the avatar
badge and /me · weekly sittings goal, migration 0113). Tranches B and C are
specified there; the C items each need a decision named in its §5. **Short
sittings as the default first unit was DECLINED by the user (2026-09-24)** and
is not to be built. **B3 (feed the drill from /browse, notes checkpoints and public
quizzes) was PARKED by the user on 2026-09-24**: too much change to the public reveal
flow for a second miss source the drill does not yet need. Every other item in the spec
shipped 2026-09-24. The goal-progress decision below is now RESOLVED (C3 shipped: a
committed calendar with a per-student override). Every item must still clear the **principles gate** in
`CLAUDE.md`: no leaderboards, hearts, variable rewards, streak freezes or vanity
milestones.

### Goal progress — BLOCKED on a schema + capture decision

The engagement gate's own guidance is to **prefer deadline/goal-progress over
daily streaks** for an exam cohort (the sibling AI Tutor shipped 6 milestone
kinds and 3 fired zero times, because students study in bursts). Nothing can be
built until we decide where "days to exam" comes from, because `student_profiles`
records **which** exams a student targets and never **when** they sit one.

What exists today (measured 2026-09-19, 342 profiles):

| field | filled | note |
|---|---|---|
| `target_exams` | 280 (82%) | NDA 246 · JEE 67 · MHT-CET 55 · CBSE-12 39 · CDS 33 |
| `stage` | 124 (36%) | a structured pick |
| `goal` | **4 (1%)** | optional free text |
| *exam date* | — | **does not exist** |

**Decision 1 — schema.** Three shapes, and they differ in coverage rather than
effort:
- *Derive a default, let the student override.* Resolve the next sitting from
  `target_exams` + a maintained calendar, add a nullable `exam_date` that wins
  when set. Reaches 280 students on day one; wrong for a Class-11 student aiming
  at a later sitting, which the override exists to fix.
- *Student-entered `exam_date` only.* Always accurate, never guesses — but
  `goal` at 1% and `stage` at 36% are the evidence for what a new optional ask
  actually collects. A goal-progress mechanic most students never see.
- *Target SITTING, not a date* (`nda-2027-I`) resolved against a calendar. A
  postponed exam is then one central edit rather than 246 stale student dates.
  Still needs an ask, so expect coverage near `stage`'s 36%.

**Decision 2 — who maintains the calendar, and what stops it rotting.** Official
dates for up to 13 exams have to live somewhere. A committed TS registry beside
`EXAM_REGISTRY` plus a probe that FAILS once the next sitting is past is this
repo's usual answer (the gate catches the rot rather than trusting memory); a DB
table with `/superadmin` editing fixes a postponement without a deploy but is
gated by nothing, and an empty calendar looks identical to a working one. A
third option is NDA-only — 246 of 280 students, honest absence for the rest.

**The `1%` figure is the thing to argue with first.** If a new ask is expected to
reach ~30%, a mechanic that depends on it is a mechanic for a minority, and the
derive-with-override shape is the only one that shows anything to most students.

### `/drill` transfer half — "3 more like it"

Now **B2 (daily set)** in ENGAGEMENT_SPEC.md: due drill questions first, then
unseen PYQs from the two weakest subtopics. Needs the unseen + difficulty-matched
picker. Build once Tranche A shows drills being finished (8 completions by 2
students at the time of writing).

### Decisions-log archive gap (docs debt, not a feature)

`npm run docs:budget` reports the active Decisions log at **91% of its 35.2 KB
hard ceiling**, and that **7 of 16 live entries have NO full narrative in
`DECISIONS_HISTORY.md`** — so the next routine archive sweep would DELETE them
rather than move them. Pre-existing; the 2026-09-18/19 entries all have their
long forms written. Order matters: write the missing narratives BEFORE the
ceiling forces an eviction, never raise the ceiling.

## Gate — conditional DB-integration suite (parked 2026-09-21)

The third of three gate-cost levers, deliberately NOT built. The first two shipped that day (`maxForks` 2 → 5 and a conditional `notes:lint`) and took a typical no-build push from ~7 min to ~2m45s. This one would take a docs/ingestion-only push to ~25 s by skipping the ~76 fixture-writing test files when the pushed range touches nothing they read — 453 of 672 commits in the prior 30 days qualified (push-level will be lower; the build precedent measured 54%).

**Why it is parked:** it deliberately breaks "green pre-push = green CI" for skipped pushes (CI still runs everything, later); and it needs a DERIVED, guard-tested split of DB vs pure test files — no naming convention exists, a hand-maintained manifest rots in the dangerous direction (a new DB test silently skipped), and the obvious "safe" path list was wrong once already (`src/lib/notes/` is imported by three DB tests). Same shape as `needsNotesLint` + `notes-lint-import-roots`: a rule plus an import-graph guard. Revisit only if two minutes proves insufficient.
## Data model

### Cross-topic questions — decouple concept tags from the home subtopic (2-phase)

**Diagnosis (2026-06-07):** `subtopic_id` is overloaded — it does *filing/navigation* (where a question shows on `/browse`, which paper it belongs to) AND *concept membership* (because a concept tag is welded to the home subtopic: `question_concept_tags.subtopic_slug` must equal the question's subtopic). That weld causes every cross-topic friction point: the **same technique re-taught across N subtopics** (e.g. line-of-intersection = n₁×n₂ taught 3× in DC&Ratios/Straight-Line/Plane), **invisible cross-chapter prerequisites** (a Functions question needs `f'(1)` but links nowhere), and **move-as-the-only-fix** for mis-filing (move ⇒ forced retag). Today's footprint is small — 13 multi-concept-tag questions, 0 cross-subtopic tags (the wall holds), ~5–6 cross-chapter-prerequisite questions found in the MODERATE sweep.

**Ideal model (keep one canonical home; decouple membership):**
- Keep a **single canonical home** (chapter+subtopic) for navigation — `/browse`, the PYQ paper-builder, Word export, and guides all need one answer to "which paper/chapter." Do NOT multi-home or go fully tag-only; the chapter tree is load-bearing.
- **Drop `subtopic_slug` from the concept tag** (`concept_slug` is already globally unique; derive the subtopic from the concept). Then a question filed under *Functions/Domain* can point at the *Differentiation/derivative-at-a-point* concept without moving — kills the re-teaching duplication (one canonical teaching home per technique, removes **rename-rot** risk) and makes cross-chapter membership expressible.
- Add a **tag role** `primary | secondary | prerequisite`. Formalises the hand-applied rules: *home follows primary* (mis-filing mostly disappears); coverage gaps = primary/secondary not taught (prerequisites are expected-elsewhere, not flagged — automating the sweep's "exclude cross-chapter prerequisite" rule); and **prerequisite** unlocks the chip in Phase 1 below.
- Keep the **principles-vs-concepts authoring distinction** (curated/selective vs coverage/per-upload) — as a flag/role, not necessarily a merge; the authoring-loop reason for the wall is real.

**Phasing — trigger-gated, do NOT migrate preemptively:**
- **Phase 1 (cheap, no schema change to the home model): prerequisite links.** Surface "Needs: Differentiation →" cross-chapter pointers so a cross-topic question links the student to the missing prerequisite instead of stranding them. Curated TS map rendered through the existing `getQuestionResources` → `ResourceChip` cross-link infra; seed with the cross-topic questions already known (the `[d/dx]` Functions/Sequence ones, binomial-variance-in-Statistics, etc.). Highest UX value, no migration. **← do this first.**
- **Phase 2 (the decouple migration): only when rename-rot actually bites** — i.e. the first time renaming a shipped concept silently breaks its re-taught copies across subtopics. Drop `subtopic_slug` from the tag PK; rework `loadConceptDrills` / mastery-checkpoint queries / `getQuestionResources`; re-derive. Real regression surface for currently-low volume — the rename-rot incident is the trigger, not a calendar date.

### Cross-batch passage reuse — `passages` table (option C)

Promote `set_id` (currently a string `"<uploadJobId>:<setLabel>"`) into a real table so the same passage can be reused across batches. Tradeoff documented in the 2026-05-12 "Question sets" decision-log entry: option B (current per-upload scope) is sufficient for now; user said re-upload is their preferred backfill anyway. Migration B → C is mechanical when wanted.

### Audit columns: `updated_at`, `updated_by`

Per-question audit trail. Currently `created_at` + `created_by` only. Useful for "who touched this question last and when" once teacher accounts exist.

### Optimistic locking on edit

Currently no concurrency check — two admins editing the same question race the write. Low risk today (one admin per org), but add `version int` or `updated_at` check on PUT before opening teacher writes.

---

## Formula axis — next chapters, and the three things deferred at launch

`/formula` shipped 2026-09-17 with **one chapter**: Matrices & Determinants, 40 identities over 707 questions, every one of its 768 MCQs read individually. Pipeline + runbook: `scripts/formula/README.md`.

**Scaling it is a data project, and the honest cost is known.** A signature classifier scored against all 768 hand labels reached **59.2% precision / 45.0% recall**, with 1 of 79 identities clearing a 90%/85% bar (`npm run formula:score` re-runs it). So each chapter costs a full read of its solutions. The one thing that would change that is an **LLM tagging pass** — the reading done by the machinery the grounding and key-audit pipelines already run at scale, with a human-verified sample to measure it against these 768 labels as ground truth. Not built; this is the highest-leverage follow-up by a distance.

**Deferred at launch, in priority order:**

1. **Pagination on dense pages.** `/formula/cofactor-expansion` renders 99 question cards in one ~2.3 MB page. The exam and PYQ/Practice filters take the edge off, but the top few identities need paging before this is comfortable on a phone or worth pushing publicly. `lib/paging.ts` + the `Pager` pattern from `/dashboard/students/[id]/performance` is the precedent.
2. **A primary-nav tab.** Deliberately NOT added: the nav already carries 7 public tabs, and a "Formulas" tab promises site-wide coverage while one chapter of one subject is live — most visitors would dead-end. Entry points today are the footer, the sitemap (41 URLs) and a "Questions by formula" chip on any `/notes` chapter that has an index, derived from `FORMULA_CHAPTERS` so it appears automatically. Revisit once several chapters across more than one subject are done, which is also when a per-chapter or per-subject index page starts to earn its place over the single flat `/formula`.
3. **Shareable filtered views.** Filters are client-side and not in the URL, so `NDA + Past-year` cannot be linked. That is a deliberate trade (see the note in `src/lib/formula/filters.ts`) against two documented traps — the prerender bail and the same-route prefetch outage of 2026-09-15. If shareable links are wanted, the safe shape is a separate static route per combination, not a query param on this one.

**Also worth a look when a second chapter lands:** whether the flat global slug namespace holds. `det-2x2` is chapter-agnostic but `cofactor-expansion` may mean something slightly different in a Determinants chapter and a Linear Algebra one, and today a slug is global across all chapters.

## `/guide` expansion

**Nine guides shipped:** NDA Mathematics (Template A — principles-first), NDA English (Template B — playbooks-first), NDA PART B Physics (Template C — chapter-playbooks + skill-strand + formula compendium), NDA Chemistry (Template B variant — Recall/Rule/Calculate), NDA Biology (Template B variant — Recall/Apply/Verify), NDA Geography (Template B + non-flat %HARD variant), NDA History (Template B + tier-style strands variant — Cornerstone/Foundation Recall/Quick-Win), NDA Polity (Template B + tier-style strands variant 2 with INVERTED third-tier — Cornerstone/Foundation Recall/Specialist Wildcard), NDA Economics (single-page landing — deliberately thinner terminal node; bank too small for a multi-route guide). Template choice flow + per-template editorial shape: CLAUDE.md "Guide structure templates" section. Don't propose forcing one template onto a subject whose bank shape rejects it — see [[english-guide-structure-diverges]]. **NDA Current Affairs is explicitly deferred** (content half-life issue — see CLAUDE.md decisions log 2026-05-19).

### Guide-side Present mode (adapt `NotePresenter` for `/guide` playbook pages)

Today Present mode exists only on `/notes` subtopic pages (the slide deck derives from a `SubtopicNote` via `splitNoteIntoSlides`). Teachers projecting playbook content in class would benefit from the same overlay applied to playbook detail pages (trigger + story + sub-skills + traps + worked examples). Needs a playbook-shaped slide splitter (similar to `splitNoteIntoSlides` but consuming `PlaybookDetail`) + presenter wiring across all 7 playbook-bearing guide subtrees (English / Physics / Chemistry / Biology / Geography / History / Polity). ~2–3 hour build. Tier 4 scope per the 2026-05-18 Present-mode-discoverability ship which deliberately left this to a separate commit.

### MHT-CET strategy guides (Maths / Physics / Chemistry)

Reuse the shared infra (`_components/`, `resolveTaxonomy`, JSON-LD, OG image, sitemap pattern). Subject-level taxonomy cleanup must precede each guide — Physics + Chemistry still pending (see Taxonomy section below). MHT-CET Maths is already cleanly bucketed (248 q · 56 sub). Template choice per subject after a bank-shape analysis. **This is now the primary remaining `/guide` scope** — NDA guide coverage is effectively complete (9 of 10 NDA subjects guided; Current Affairs explicitly deferred).

### Future-exam guides

CUET, NEET, JEE Main — already shown in `/browse` Hero as "Coming soon." Each needs taxonomy seed + question bank + strategy guide. **IPMAT's bank is DONE** — 1,418 questions loaded PRIVATE on 2026-09-22; see the Phase 5 checklist below.

---

## `/notes` graduated practice — L1/L2/L3 inline reps + practice sourcing (analysis done 2026-07-22; deferred)

**Trigger for revisit:** user flagged the current per-concept `practiceSet` as low quality and asked whether to (a) source practice from HSC/CBSE and (b) add L2/L3 tiers alongside L1 with 3 questions each. Analysed in detail, then parked as a "big change — sleep on it." Full reasoning in the 2026-07-22 chat; key facts distilled here so we don't re-derive.

**Two distinct problems, don't conflate:**
1. **L1 quality.** The authored `practiceSet` reps are deliberately trivial fluency items (e.g. "Order of a 3×5 matrix? → 3×5", "Iⁿ? → I") — vocabulary/one-step recall, not exam-representative. Fixable cheaply by rewriting them into genuine one-step *problems*; **no architecture change**. This is Phase 0.
2. **No graduated harder practice inline.** The only inline attemptable practice is the authored self-check (1) + `practiceSet` (L1). Real bank questions appear only as the single featured PYQ + a "Drill N more" link *out* to `/browse`. Adding inline L2/L3 is the real feature.

**Load-bearing constraint (the crux cost):** `question_concept_tags` holds **4,792 PYQ questions and 0 practice** — practice/board questions are never concept-tagged by design, because every tag-gated surface (notes drills, guide principles, quiz-harvest, worked examples) assumes **tag ⇒ PYQ**. To surface bank *practice*/board questions per concept you must either (a) concept-tag practice too + add a `kind`/exam guard at every PYQ-only consumer (invasive, regression-prone), or (b) build a **separate practice-tag axis** that never touches `question_concept_tags` (cleaner, more new code). Recommend (b).

**Source decision — NDA practice bank beats HSC/CBSE.** The NDA *practice* corpus (~219 practice q in Matrices alone, difficulty-labelled, MCQ, same exam) is the right primary source: aligned, correct format, no cross-exam mapping. Boards are ~90% **subjective** (CBSE Matrices+Determinants = 207 q but only 18 MCQ; State Board Matrices ~120 q subjective + error-prone keys, 151 errata bank-wide) → poor fit for MCQ short-reps; use CBSE **MCQ-only** as a thin supplement for genuinely thin concepts, skip HSC subjective.

**Feasibility of "3 per tier per concept":** EASY is thin at the *concept* level (Special Determinants: 1 PYQ-EASY + 2 practice-EASY for the whole 4-concept subtopic; Linear Systems 1+1) — that thinness is *why* L1 is authored. A rigid 3×3 won't fill uniformly. Prefer **variable counts** and/or tier at the **subtopic** level where volume exists.

**Recommended phasing when revisited:** Phase 0 = rewrite L1 reps to genuine problems (Matrices pilot, no schema). Phase 1 = pilot inline L2/L3 sourced from the NDA practice bank via a **separate practice-tag axis**, Matrices only, variable counts; measure effort/quality before bank-wide. Boards = targeted MCQ supplement only. Avoid duplicating the existing subtopic **mastery checkpoint** + per-concept **"Drill N more"** link — inline tiers must add *graduated attempt-then-check without leaving the page*.

**Type/UI implications:** `PracticeProblem` (prompt/answer/method) is too light for real MCQs — either extend it with a `tier`/`difficulty` and keep authoring, or reference bank UUIDs and render MCQ-style (options + reveal, like `WorkedExampleCard`). Open decisions for the user: primary source · tagging mechanism · tier rigidity · first-cut scope.

---

## Taxonomy cleanup (data work)

Per-chapter subtopic consolidation from question-leakage names ("Integral of 1/(1−cosx)") to technique-level canonicals ("Half-Angle Substitution"). Workflow documented in the [[reclassification-sql-pattern]] and [[taxonomy-inline-iteration]] memories. Done counts + per-subject narratives: CLAUDE.md "Cleaned subjects · post-delta sizing" table and [[taxonomy-cleanup-progress]] memory.

Pending:
- MHT-CET Chemistry (33 chapters · ~241 subtopics)
- MHT-CET Physics (27 chapters · ~243 subtopics)
All NDA cleanup complete. Phase B/C/D template fully stable.

---

## MHT-CET Mathematical Logic — three provenance defects found 2026-09-19

Found while attaching switching-circuit figures from the Word originals (Phase A of
the Mathematical Logic `/notes` build). The figures are done; these three are what
reading the printed papers turned up and did NOT fix.

1. **`1d52a988` has no locatable source.** Row is `pyq_year 2025`, `pyq_month May`,
   `pyq_note "Shift ||"`, `source_file MHT_CET_2025_PCM.xlsx`, `question_number NULL`
   — "Which of the following are pairs of equivalent circuits" with options I–V. It is
   the only Mathematical Logic circuit row still carrying no figure, so it is
   **unanswerable as rendered**. There is no May-2025 MHT-CET paper on disk. Either
   source the May 2025 Shift II paper, or set the row PRIVATE. Do NOT reuse the
   2023 2-May composite — the same-looking question recurs across sittings with
   different circuits, so copying one would be a guess, not a source.

2. **`MHT_CET_2025_14th_May_Shift_2_QP.pdf` is misnamed.** The PDF's own running head
   reads "MHT-CET 2025 Question Paper - PCM / 19th April 2025 (Shift – II)". It is a
   duplicate of a shift already ingested from docx (`2025-apr-19-s2`), not a May paper.
   It is also image-only (no text layer, ~48 sliced rasters per page). Renaming it is a
   local-disk fix, outside the repo.

3. **`95815d68` has a wrong `pyq_note`.** It reads "3rd May 2nd Shift", but the
   switching-circuit question is Q147 of **Shift 1** (Shift 2's Q147 is a line-and-plane
   problem — verified against both `(ques).docx` files). Its `source_file`
   (`MHT_CET_3rdMay2023_S1_QB.xlsx`) is correct, so the row is filed right and only the
   human-readable note is wrong. Low harm; fix in a provenance sweep rather than alone.

**Open question this raises:** the xlsx-seeded 2023/2024 MHT-CET rows carry option text
that the printed paper does not have. One of the five inspected (`5826a024`) had
**fabricated options and therefore a wrong key** (see the 2026-09-19 Decisions entry).
That was a 1-in-5 hit rate on a sample chosen for a different reason, so the class is
probably wider than Mathematical Logic. A scoped probe — xlsx-sourced rows whose
options are placeholders ("Circuit (a)", "Option a") or whose stem references a figure
they do not have — would size it.

## Syllabus-map spine is stale for MHT-CET Maths Mathematical Logic (2026-09-19)

The 2026-09-19 Phase-D reshape took Mathematical Logic from 3 subtopics to 6. The
`syllabus_concepts` bank spine still carries the OLD three (MHT-167/168/169), and
`scripts/syllabus/data/maths-cet-rulings.json` still points its coverage rulings at
them by those names.

**Nothing is broken and nothing is lying.** Spine and rulings agree with each other,
so `commit-bank-rulings.ts` guard #2 still passes; `audit-directions` does not audit
MHT-CET at all ("those spines carry no covered_by pointers"); and the coverage claims
remain SUBSTANTIVELY true — the same State Board sections cover the same material,
which the reshape only re-partitioned. What drifted is spine-vs-bank, and no probe
asserts that pair. `audit-spine-freshness` reports it as triage, alongside NDA, which
has been drifted with 66 stale PYQ counts for some time.

**Do not fix this by re-running `ingest-bank-spine.ts --apply`.** Its own header is
explicit: `section_no` is positional and numbering runs across JEE Mains, MHT-CET and
NDA *together*, so adding 3 MHT-CET subtopics renumbers the other two exams. Rows
whose ref survives are upserted IN PLACE — same row id, new subtopic, ruling still
attached and now describing something else — and rows whose ref does not survive are
pruned, taking their rulings with them via ON DELETE CASCADE. That is a silent
corruption, not a visible failure.

The refresh is the documented 3-step migration (snapshot with `renumber-rulings.ts
--snapshot`, then ingest `--apply`, then `renumber-rulings.ts --files=... --apply` and
re-commit each ruling file), preceded by `npm run db:backup`. Worth batching with the
NDA drift rather than doing for one chapter.

**Also open, and older than this work:** `npm run syllabus:audit` fails
`audit-directions` on 5 pre-existing Chemistry/JEE contradictions (Solid State 1.2/1.3
vs "Classification of Solids"; Polymers 15.3/15.5/15.6 vs "Types of Polymers"). Not
caused by the Logic reshape — that probe does not audit MHT-CET — but it means the
syllabus gate is currently red and would mask a new failure.

## Content quality audits (data work)

Per-chapter sweep for LaTeX formatting, broken math, hallucinated solutions, and **wrong correct-answer keys**. The *primary* value of this audit is the last item — LaTeX prettification is a cleanup side-effect. Audit workflow is now stable: paired skills `/latex-cleanup` (mechanical, ASCII-safe) and `/solution-cleanup` (judgment-heavy, key flips need user approval), with autonomous gdrive PDF fetch for stem/option verification and screenshot fallback for diagram-dependent rows. See [[gdrive-pdf-fetch]] and [[unicode-in-solution-rewrites]] for the supporting workflow memories.

**Done — NDA bank-wide closed at probe-flagged surface (2026-05-27):**

| Subject | q | Wrong-key flips | Preserved paper defects | Notes |
|---|---|---|---|---|
| NDA Maths (full per-chapter) | 2,160 | ~82 | 2 (Functions Q77, IT Q42) | All 31 chapters individually audited |
| NDA English | 900 | 11 | 0 | Sentence Rearrangement dominated |
| NDA Physics | 449 | 10 | 1 (Work Q123) | First diagram-fallback usage (Q70 circuit + Q132 B-field) |
| NDA Geography | 345 | 8 | 0 | 1 judgment-flag flip (Q142 forest order — option set imperfect) |
| NDA Chemistry | 262 | 5 | 0 | Q140 self-inflicted unicode regression caught + fixed |
| NDA History | 260 | 3 | 1 (Ancient Q85 Senguttuvan) | First non-Maths preserved-defect |
| NDA Current Affairs | 180 | 4 | 0 | Combined-pass with Polity + Economics |
| NDA Biology | 190 | 1 | 0 | Cleanest subject (0.5% rate) |
| NDA Polity | 90 | 0 | 1 (Q150 NCAP options all seem valid) | Combined-pass |
| NDA Economics | 24 | 2 | 0 | Combined-pass |
| **NDA total** | **4,860** | **~126** | **5** | All 10 subjects probe-closed; ~51% of bank |

Per-subject narratives + per-row decisions are in CLAUDE.md "Decisions log" 2026-05-27 entries. Per-chapter / per-flip register in [[content-audit-progress]].

### Pending — JEE Mains content-correctness audit (its own future pass)

**The original 13 subjects are now BANK-WIDE CLOSED** at the no-source-needed surface (9,546 q, ~100%) — MHT-CET Maths (1,587) + Physics (1,574) closed 2026-06-02, **MHT-CET Chemistry (now 1,525) closed 2026-06-03** across three passes + a source-PDF verification pass (31 wrong-key flips, 24 dupes deleted, 3 → PRIVATE). See CLAUDE.md "Decisions log" 2026-06.

**The remaining audit frontier is JEE Mains.** The ingested JEE q (2021 Papers 1-4, 240 q / 239 PUBLIC as of 2026-06-03, growing toward all 26 papers of 2021) are **NOT** part of the bank-wide audit above — they carry source answer keys verified only against the source images during ingestion, plus 54 AI-authored solutions. **Schedule a JEE content-correctness audit as its own pass once the 2021 set is fully ingested.** It's tractable: the DOCX source papers are local (`C:\tmp\PYQPs\JEE_Mains\2021\`), so `/solution-cleanup`-style re-derivation + source-image verification applies. Known seeds already surfaced during ingestion: P2 Q1 wrong-keyed by a duplicate-numbered soln block (fixed via override), P3 Q37 incomplete → PRIVATE, P4 Q44 multi-figure stem fixed via composite image. See [[jee-mains-ingestion]].

**Pre-flagged rows deferred from closed audits — revisit on the next content pass:**
- MHT-CET Chemistry: ~6 image-based IUPAC-naming rows + 5 user-deferred conflicting-key dup-pairs + 32 same-stem/diff-option groups — all need the source PDF/figure, not derivation (see CLAUDE.md 2026-06-03 source-PDF verification entry).
- `5044c336` (MHT-CET Sequences & Series · "sin(θ−α), sinθ, sin(θ+α) in H.P. → cos²θ"): **probable wrong-key** (a stealth case — bank solution likely agrees with a wrong key, so the matches-option probe never flagged it). Surfaced 2026-06-02 by cross-referencing its Trig-II sibling `b358ae2f` ("…→ cos2θ", answer `(1−4cos²α)/2`): `5044c336`'s `(1−2cos²α)/2` doesn't reconcile. Also arguably misfiled to Sequences (it's a trigonometry question). Derive the HP→cos²θ result independently, flip the key if wrong, and consider moving it to Trigonometry-II. Not touched during the 2026-06-02 Sequences bank-hygiene fix (out of hygiene scope).

**Prerequisite for MHT-CET audit:** the gdrive `PYQPs/MHT-CET/` folder is enumerated (2026-05-27) with year sub-folders 2021–2025, but it's lightly populated — most years have `MHT_CET_{year}_QP.docx` + `_AK.docx` (annual), and 2025 has only 1 of ~14 per-shift PDFs (`MHT_CET_2025_14th_May_Shift_2_QP.pdf`). Compared with NDA gdrive (22 PDFs covering full years 2015–2026), MHT-CET source coverage is sparser. The audit can proceed where DB rows have year/shift metadata that matches an available source file; rows from unavailable shifts (~90% of 2025) will need to defer or rely on internal-consistency derivation only.

### Probes (stable workflow)

The audit uses two skills with probes baked in. Don't re-implement.

- **`/latex-cleanup <chapter>`** — Phase 1 probes: `unicode_in_qtext/solution/options`, `unbalanced_qtext/solution/options`, `pipe_cond_*`, `english_math_words_*`, `matches_option_disagrees_with_key`. Phase 4 applies Bucket A (mechanical) automatically; Bucket B (wrong_key / REVIEW / hedge / plain-text-heavy) defers.
- **`/solution-cleanup <chapter>`** — Phase 1 probes (content-correctness only, formatting assumed clean): `matches_option_disagrees_with_key`, `review_markers`, `hedge_phrases`, `plain_text_heavy_sol`, `broken_matrix_env`. Phase 3 STOPS on every DISAGREE / PRINTED-PAPER-ERROR / STEM-BROKEN row for user approval before flipping `is_correct`.

The 6-row PDF-vs-bank extraction-error taxonomy ([[gdrive-pdf-fetch]]) covers the resolution shapes: option-text / stem-text / context-text / set-context-overspecification / dropped-sign / preserved-paper-defect.

### Patterns observed across the NDA bank-wide audit

- **Wrong-key rate correlates with derivation complexity.** Math-derivation subjects (Maths 3.8%, Physics 2.2%) significantly higher than pure-recall subjects (Biology 0.5%, Polity 0%, History 1.2%). LLM extraction handles named facts better than algebraic chains.
- **Combined-pass for small subjects** works. Polity + Current Affairs + Economics (294 q across 13 chapters) ran in one consolidated DO block on 2026-05-27 — saves the per-subject latex+solution cleanup round-trip. Recommended pattern when individual subjects are <100 q.
- **Diagram-dependent rows need screenshot fallback.** gdrive PDF OCR captures text but not spatial info (arrow directions, circuit topology). Two NDA Physics rows (Q70 circuit + Q132 B-field) required user-pasted screenshots after gdrive returned only text-around-the-figure. Rule embedded in `/solution-cleanup` Phase 3.
- **Self-inflicted unicode regression risk.** When rewriting solution prose, NEVER write unicode math chars (`× ÷ ≈ ✓ ✗ → ² ³` etc.) — they'll be caught by next `/latex-cleanup`. Lesson recorded in [[unicode-in-solution-rewrites]] after the Q140 Chemistry incident.
- **Cluster pattern by paper-batch.** Wrong-keys often cluster within a single paper sitting (Statistics 2017-Sep all 5 keyed wrong, Trig Id 2020-Apr 6 of 6). Likely an extraction-prompt batch effect — worth flagging at upload-audit time on new MHT-CET batches.
- **Stealth wrong-key gap.** When bank's solution prose is mathematically wrong but lands on the same wrong value as the stored key, NO probe flags it. Only close-reading every flagged solution catches these (e.g. Definite Integration Q96 on 2026-05-27). For MHT-CET audits, plan to close-read every solution that surfaces for ANY reason, not just trust the matches-option probe.

### Future hardening

`npm run content:lint` script that gates the pre-push hook for new uploads (mostly the formatting probes — wrong-key is not auto-detectable without human derivation). Still deferred — but the audit-skill probes are stable enough that lifting them into a script is mechanical. ~2 hours when there's appetite to wire it up.

### Notes-coverage probe — ✅ SHIPPED 2026-06-07 (`npm run notes:coverage`)

`scripts/notes-coverage.ts [subjectRoute] [chapterSlug]` (default `nda-maths statistics`). Per `/notes`-covered subtopic, diffs the math in that subtopic's PUBLIC question SOLUTIONS against the math in its notes bodies (incl. `formula.latex` + reference-table cells, which are raw LaTeX outside `\(...\)`), reporting two token kinds appearing in ≥2 solutions but 0 notes: **macros** (`\[a-z]+`, minus a common/relational-operator allowlist) and **structural fragments** (operands abstracted to `@`, so `(20^2-1)/12` ≡ `(n^2-1)/12`). The macro channel is the high-signal one; structural fragments are noisy (generic arithmetic) → human-review triage, **not a gate**. Validated on Statistics (would have flagged the `(n²−1)/12` gap pre-fill; resolved post-fill) and run on **Matrices & Determinants → no gaps** (all flags triaged to notation variants `\Delta`/`\det`, cross-subtopic trig, and the ln-of-GP determinant which IS covered in prose). The Matrices run **hardened the probe**: (1) strip LaTeX row-breaks `\\` before tokenizing — a matrix row entry after `\\` was matching as a spurious `\p`/`\l` macro; (2) collect notes math from raw string fields (recursive walk), NOT `JSON.stringify` — the latter doubles backslashes, which `stripBreaks` then ate, dropping macros from notes-vocab and false-flagging `\sin`/`\cos`. **Remaining:** run across the other 10 noted chapters + triage. Inherently misses "present-but-under-emphasised" (finds ABSENCE) and semantic equivalents in different notation; the structural-fragment channel is noisy (human-read), the macro channel is the high-signal one.

---

## Content ingestion (source material)

### GRB IIT-JEE chemistry textbooks → JEE Mains practice bank (analysis done 2026-07-17; ingestion deferred)

Three GRB (G.R. Bathla) IIT-JEE chemistry textbooks sit at `C:\tmp\Practice\JEE_Mains\Chem\` — **GRB Physical (995pp · 15 ch), Organic (1,107pp · 18 ch), Inorganic (997pp · 19 ch)**, ~3,100 pages total. These are third-party **commercial** prep books, not PYQs; they'd land as `question_kind='practice'` under **JEE Mains → Chemistry**.

**Findings from the 2026-07-17 source probe (so a future session doesn't re-probe 3,100 pages):**
- **Fully scanned books with a GARBLED OCR text layer — unusable for parsing.** Every page is a full-page scan with a bad two-column OCR overlay (`"AroM1CSTRUC!LfFl~"`=ATOMIC STRUCTURE, `"4TtEo"`=4πε₀; stems + solutions shredded together). **Vision transcription is forced** — reuse the practice-PDF / NEET pipeline shape (per-column hi-DPI render → vision agents) at ~10× the scale.
- **Volume: ~1,400 exercise pages → roughly 15k–30k questions** (theory dominates the rest; exercises are 30–110pp blocks at chapter ends). Must be **phased** book-by-book / chapter-by-chapter, not one-shot.
- **Formats are diverse**: standard 4-option MCQ + assertion–reason (Statement-1/2) + statement (I/II/III) + List I–II matching + comprehension + subjective/numerical. Most carry (a)–(d) so model as MCQ; matching/subjective need special handling (subjective supported since 0041).
- **Answer keys present inline** (per-section ANSWERS blocks + `[Hint:…]` worked solutions) → vision-extractable; good for correctness + notes/RAG.
- **Figures baked into the page scans** (Organic especially — wall-to-wall structures) → snapCrop per question (no extractable image objects).

**Two open decisions (deferred by the user, to settle at pilot time):**
1. ⚠️ **Copyright / visibility.** Third-party commercially copyrighted content — publishing on public pyqvault.com is a real infringement/reputation risk against the PYQ-first positioning. Recommendation: **PRIVATE (org-staff practice) at most**, never PUBLIC. Confirm intent before ingesting.
2. **Scope + formats.** Recommendation: **pilot ONE chapter of ONE book** (e.g. Physical Ch.1 exercises), **MCQ-only** first, validate quality, then scale. Don't run all 3 books before a pilot proves the pipeline.

See [[practice-pdf-vision-ingestion]] + [[figure-snapcrop-verify]] + [[neet-ingestion]] for the reusable pipeline shape.

---

## Admin tooling

### `/dashboard/quizzes` — server-side filtering + pagination (past ~1000 quizzes)

`listAssembledQuizzes` now returns up to 1000 quizzes (raised from a silent 60-cap that hid older quizzes once the bank crossed 60 — fixed 2026-06-11) and `QuizBrowser` filters them client-side. This is fine at the current ~100 quizzes but ships every quiz's full `questions` snapshot to the client. Past ~1000 quizzes (the PostgREST page size) the list would silently truncate again. The scalable fix: push the exam/subject/chapter/theme/status filters into the query (server-side), drop the per-quiz `questions` payload from the list (lazy-load on row expand via a server action), and paginate. The "Quizzes built" stat already uses a true `count:"exact"` (`countAssembledQuizzes`), so it stays honest even if the list is capped.

### Per-question editing of upload-level metadata

`/questions/[id]/edit` doesn't currently expose `pyq_year`, `pyq_month`, `pyq_note`, or `question_number`. Those are set at upload time or via `/uploads/[id]` bulk-PATCH. Per-question override is sometimes needed (correcting a single row after upload).

### Set merge / split / move UI

Sets are immutable post-upload by design — to fix a structural mistake (wrong set membership, wrong context, etc.) the admin re-uploads. A first-class UI for set operations would avoid the re-upload cycle.

### Excel-embedded image extraction

Today teachers upload text-only Excels and add images via the per-question edit page. An xlsx-parser → exceljs swap would extract images directly from Excel cells. Smaller blast radius than doing it now, but real friction for teachers with diagram-heavy papers.

### Teacher invitation flow

First admin is seeded via SQL; teacher addition is manual. A proper "invite teacher" flow was gated on SMTP being available (see Auth section) — **that gate LIFTED 2026-07-16: Supabase Auth SMTP is wired to Resend and verified.** (Teachers are also created directly in `/dashboard/members` since 2026-05-26, so this is now about invitations rather than access.) **Inherit the caveat:** an invite mail uses the same `ConfirmationURL` mechanism as the reset mail, so it will carry the same cross-domain link that Gmail flags as phishing — do the `/auth/confirm` work under "Password reset flow" first, or the invite lands in spam too.

### Notes-lint guide-side rename validation — ✅ SHIPPED 2026-05-30

Done via an equivalent implementation to the originally-planned notes-lint extension. Every guide's drill targets now resolve against live taxonomy in a `describe.skipIf(!HAS_ENV)` test: `tests/guide-nda-<subject>-playbooks.test.ts` (English/Physics/Chemistry/Biology/Geography/History/Polity) validate each PLAYBOOK's `chapter` + `subtopics[]`; `tests/guide-nda-current-affairs-themes.test.ts` validates theme `chapter` + `drillSubtopics`; `tests/guide-nda-maths-taxonomy.test.ts` (added this session — Template A has no PLAYBOOKS array) validates principles/compounds/strategy drill targets. The `/notes`-side chapter + subtopic names are validated by `scripts/notes-lint.ts` check 1. The `/browse` backlink chips (`getQuestionResources`) build their guide maps from the same PLAYBOOKS arrays + the `NOTES_CHAPTERS` registry, so they're covered transitively; Economics/CA chips + landing CTAs key on `examId`/`subjectId`, not chapter names. `.github/workflows/ci.yml` runs all of these on every push/PR (requires the three Supabase repo secrets). The guard caught two real broken-CTA regressions in its first session (Sound + Probability — see Decisions log). Recurring-lesson memory: [[shipped-chapter-rename-downstream-sync]].

### Derive `/nda` NOTES_PREVIEWS array from `NOTES_CHAPTERS` registry

Mop-up of the 2026-05-18 registry refactor. The `/nda` exam home's `NOTES_PREVIEWS` array (chapter cards with hand-written blurbs + concept counts) is still hardcoded — derivable from `NOTES_CHAPTERS` if we add `blurb` + `conceptCount` accessors to the registry entries, or compute `conceptCount` live at render time. ~15 min cleanup; trivial but consolidates the new-chapter ritual further.

---

## Organic search + acquisition

### BASELINE — the first Search Console read (2026-09-17): 98% of search clicks are the brand name

Search Console was verified ~2026-07-27, so the export's "Last 3 months" filter **overstates the window** — there are 7 weeks of data (2026-07-27 → 2026-09-14), not 3 months. Raw totals: **751 clicks / 1,804 impressions**, India 750 of 751 (targeting is correct).

**The finding that reframes this whole section: 739 of 751 clicks (98%) land on the homepage, and `pyq vault` + `pyqvault` alone account for 530 of them at position ~1.0.** Those are navigational queries — people who already know the site using Google as an address bar. They are a *lagging indicator of word-of-mouth*, not acquisition. Strip them out and **non-brand organic acquisition is between 12 and 24 clicks in 7 weeks** — a range, not a figure, because `Pages.csv` over-attributes (see the correction below). It reports 763 clicks against the property's 751, spread as `/guide/nda-maths` 12, `/guide/nda-english` 9, `/browse` 2, `/questions/cds/english/reading-comprehension` 1 — while the property total leaves only **12** clicks off the homepage. **Every named non-brand query has zero clicks**: 770 of the 789 query-level impressions are brand, and the remaining 19 converted nothing. So the September signup surge (5 → 14 → 63 → 102 → 160/mo) is not organic search; it is arriving through some other channel, and migration 0106's first-touch attribution is what will name it.

**Coverage collapse — 25 of the 1,473 sitemap URLs (1.7%) got a single impression:**

| Section | URLs in sitemap | Impressions | Clicks |
|---|---|---|---|
| `/guide` | 160 | ~1,900 | 21 |
| `/questions` | 631 | 41 | 1 |
| `/mock` | 204 | 1 | 0 |
| `/notes` | 465 | **1** | **0** |

`/notes` is the largest content investment in the project — 84 hand-authored chapters, 559 prerendered pages — and it is **invisible in search**. `/questions` was built specifically for discovery and is not ranking either. `/guide` is the only section with any traction, which is worth noting: it is also the only section written as *prose a human would search for* rather than as a question listing.

**CORRECTED 2026-09-17 — the page-level CTR gap is mostly an ATTRIBUTION ARTEFACT, not a metadata problem.** The first read of this export called the CTR gap “the nearest-term opportunity … fixable in metadata alone”. Reading the export end-to-end contradicts that, and the contradiction is arithmetic: **`Pages.csv` sums to 4,169 impressions against a property total of 1,804 — 2.3×.** `Chart.csv`, `Devices.csv` and `Countries.csv` independently agree on 1,804, so the property figure is the sound one and the page-level one double-counts. A single property impression is therefore being attributed to two or three pages at once, which is what happens when several URLs from one site appear in the same result block.

The page-level evidence fits that and not the metadata story: **nine URLs sit above position 2.0 and draw 879 impressions and 3 clicks between them** — `/browse` 642 impressions at position 1.42, `/guide/mht-cet-maths/playbooks/complex-numbers` 102 at 1.34, `/guide/nda-maths/principles/double-angle` 58 at 1.31, `/questions/neet/zoology/human-reproduction` 39 at 1.23, `/quiz/nda-maths-vectors-computation-1` 33 at 1.88. A genuine position-1.3 ranking returns roughly 30% CTR; **0.3% across 879 impressions is not a title problem** — it is those pages riding along on brand searches rather than ranking on their own, and rewriting their metadata would change nothing. `Search appearance.csv` is empty, so the export cannot name the appearance type: **the arithmetic is the evidence here, not a GSC label**, and that is the honest limit of what this export proves.

**What survives the correction.** `/guide/nda-maths` (960 impressions, position 5.00) and `/guide/nda-english` (765, position 2.61) sit far enough down the page to be plausible long-tail rankings rather than tag-alongs; their impression counts are inflated by the same factor but not invented. Those two are worth a metadata read — **two pages, not a site-wide CTR programme.** See the Step 2.5 entry below for why even that is sequenced late.

**THE GATING QUESTION — ANSWERED 2026-09-17, and the answer is worse than either hypothesis.** The Coverage export (`pyqvault.com-Coverage-2026-09-17.zip`, scope "All known pages") reads: **12 pages indexed, 1,462 not.** The breakdown is `Discovered - currently not indexed` **1,424** · `Crawled - currently not indexed` 32 · `Blocked by robots.txt` 3 · `Page with redirect` 3 · `Duplicate without user-selected canonical` **0** (so the 2026-08-09 `/login` noindex fix is confirmed working).

**"Discovered - currently not indexed" means Google knows the URL from the sitemap and has decided not to spend the crawl on it — it has not fetched the page at all.** So this is not a ranking problem and not a content problem; 97% of the site has never been looked at. The `/notes` tree's single impression in 7 weeks is fully explained: those pages have not been crawled.

**The trend is the actionable part, and it runs the wrong way.** Indexed held at **20** from 2026-08-05 through 2026-09-04, then **fell to 12 on 2026-09-05** and has stayed there. Over the same window not-indexed climbed **961 → 1,462**. The 2026-09-05 step is +249 discovered URLs in one day (the MHT-CET/JEE/CDS mock ships of 2026-09-01→09-07) against −8 indexed. **Every batch of new URLs has so far made indexing worse, not better** — which is the empirical case for a publish freeze on new indexable surfaces, not merely a theoretical one.

**CRAWL STATS — read 2026-09-17, and this is the mechanism.** `pyqvault.com-Crawl-stats-2026-09-17.zip`, 51 days (2026-07-27 → 2026-09-15): **1,173 total crawl requests = 23.0/day.** The composition is the finding — **82.5% of that budget is not HTML**: JavaScript **49.45%** · JSON 12.28% · other 9.55% · CSS 7.84% · failed 3.32% · images 0.09%, leaving **HTML at 17.48% ≈ 4.0 page fetches per day**. By Googlebot type, **66.24% is "Page resource load"** against 28.13% real page crawls (Desktop 14.32 + Smartphone 13.81). By purpose: **Refresh 98.21%, Discovery 1.79% ≈ 0.41 requests/day.**

**The arithmetic explains the 12 indexed pages without appealing to quality at all.** At 4.0 HTML fetches/day, crawling all 1,474 known URLs **once** takes **367 days**. At 0.41 discovery requests/day, working through the 1,424 discovered-not-crawled backlog takes **~3,459 days — 9.5 years.** Google is not judging this content; it has not got to it, and at the current rate it will not.

**Cause 3 (host responsiveness) is CLEARED as a blocker and CONFIRMED as a contributor.** The Hosts table reports **"No problems"** for both `www.pyqvault.com` (1,126 requests) and `pyqvault.com` (47) — Google is not backing off over host errors, so the 57014-era history did not poison the crawl. But average response is **435 ms with 21 of 50 days above 500 ms** (peaks ~1.18 s), and since 82.5% of requests are fast CDN assets the HTML itself must be materially slower than that average. **Measured directly 2026-09-17:** a `/questions` landing page cold is **1.86–2.60 s**; the same URL warm is **0.23–0.27 s** (`X-Vercel-Cache: HIT`). That is a vicious circle worth naming — `generateStaticParams` prerenders only the top 40 of ~631 landings (`src/app/questions/[examSlug]/[subjectSlug]/[chapterSlug]/page.tsx:48`) and `revalidate = 86400` expires a day later, while Googlebot returns to any given URL months apart at 4 pages/day. **So essentially every Googlebot fetch of that section is a cold MISS paying the full ~2.5 s render**, which suppresses crawl rate, which lengthens the gap, which guarantees the next hit is cold too. A stratified 27-URL sample of the live sitemap returned **200 on every URL**, so sitemap rot is not among the causes.

**Cause, in descending confidence (revised).** (1) **Domain age + no external links.** `pyqvault.com` went live 2026-06-04, is ~3.5 months old, and has essentially no backlinks. Crawl budget on a young unlinked domain is minimal, and **this is the only item that raises the 23/day ceiling** — everything else merely redistributes it. (2) **Crawl depth and internal linking**, which is what starves Discovery down to 1.79%: the homepage links to exactly **two** internal destinations (`/browse` and `/guide/nda`); the Footer links the 10 guides, `/formula`, `/blog`, `/about` and two `/notes` hubs but **not `/questions`, `/mock`, `/board` or `/browse`**; `PrimaryNav` carries Bank · Guides · Notes · Mocks · Board · Blog · About but **no `/questions` tab**. The only crawlable path into the 631-page landing surface is `BrowseLanding.tsx:146`, leaving it **3 clicks deep behind a dynamic, uncacheable `/browse`**. (3) **Cold-render cost + crawl waste** — the ISR miss circle above, plus **8.3% of the budget (≈97 requests) spent on 301s (4.94%) and 404s (3.32%)**. No apex-domain URL is referenced anywhere in `src/`, so the 47 apex requests arrive from outside the codebase.

**What this changes.** Adding ~195 paper pages today would put them in a backlog Google is working through at 0.41 URLs/day. Revised order, cheapest first:

1. **Stop the waste (~8.3% of budget).** Find the 404s and the apex 301s. Nothing in `src/` links the apex, so those 47 requests come from outside — worth identifying rather than assuming.
2. **Make crawling cheap.** Raise the `.slice(0, 40)` prerender cap and lengthen `revalidate` well past 86400 (or revalidate on-demand after an ingest, which is when this content actually changes). Ending the guaranteed cold-MISS on `/questions` is the single most mechanical fix available, and it directly targets the 435 ms average.
3. **Fix internal linking and crawl depth**, which is what Discovery's 1.79% is measuring: a `/questions` entry in nav or footer, homepage links into the real content hubs, flatter paths to chapter pages.
4. **Submit a focused sitemap** of the ~100 best URLs. At 4 HTML fetches/day a 1,474-URL sitemap communicates no priority whatsoever.
5. **Earn external links.** Off-site, slow, and **the only lever that increases the 23/day budget rather than reallocating it.**
6. **Hand-request indexing** for the 10–20 pages that matter, via URL Inspection — to seed, not to scale.
7. **Only then add surfaces.**

**Do NOT `Disallow` `/_next/static` or the JS/CSS in `robots.txt`.** It is the intuitive reaction to "49% of crawl is JavaScript" and it is an own-goal: Google needs those resources to render and evaluate the page, and blocking them degrades how the page is understood rather than freeing budget for HTML.

Secondary observations, recorded so they are not re-derived: desktop ranks far worse than mobile (position 11.45 vs 3.75) on 725 impressions; ~150 impressions come from US/UA/VN/BR/DZ with zero clicks and are noise; and three `/browse?examId=…` filter URLs still draw impressions despite the `robots.txt` `Disallow: /browse?*` — correct behaviour, since Disallow prevents *crawling*, not the indexing of URLs Google already knows.

### Step 2.5 — metadata pass on the two pages that genuinely rank (RE-SCOPED 2026-09-17 after the attribution correction)

**Originally scoped as a site-wide CTR repair.** The attribution correction above removes most of it: `/browse` and the four other sub-position-2 pages are not under-converting good rankings, they are appearing beside the homepage on brand searches. There is nothing to fix in their titles.

**What is left is genuinely small** — `/guide/nda-maths` and `/guide/nda-english`, which plausibly rank on long-tail queries at positions 5.00 and 2.61.

**Why it is not actionable from the export.** Deciding whether their titles match intent needs the queries that surface *those specific pages*, and the bulk export cannot supply it: `Queries.csv` is property-wide, and **789 of 1,804 impressions (44%) are named while 56% sit in the anonymised long-tail bucket** that GSC withholds. So this is a Search Console UI task (Performance → filter by page → Queries) before it is a code task; the code change afterwards is two `generateMetadata` strings.

**Sequencing: after Step 2, and possibly not yet at all.** With non-brand acquisition at 12–24 clicks in 7 weeks there is no baseline to improve against — a CTR change on two pages would be indistinguishable from noise. Revisit once the crawl work has produced enough non-brand traffic to measure against.

### REVIEW — the external SEO brief `PYQVault_SEO_Recommendations_Claude_Code.md` (reviewed 2026-09-17): sound guardrails, wrong diagnosis, one dangerous section

Recorded so the reasoning is not re-derived if the document resurfaces. It is a competent generic SEO brief written without repo access or crawl-budget arithmetic; its **Guardrails** section is better than its prescriptions.

**1. The diagnosis inverts the constraint.** It reads the backlog as Google *judging* discovered URLs not worth indexing, and prescribes classifying 1,424 URLs into filter / pagination / duplicate / thin buckets. The crawl stats say Google has not *fetched* them: Discovery purpose is 1.79% of 23 requests/day ≈ **0.41 URLs/day**, so the backlog needs ~9.5 years at the current rate. “Discovered — currently not indexed” means known-and-uncrawled. The audit was run anyway across all 1,473 sitemap URLs: **1,470 × 200, 3 × 404**, zero filter URLs, zero pagination, zero parameters, zero duplicates. All eight of its categories collapse to one.

**2. Section 11 (JavaScript / rendering) is actively dangerous.** It reads the 49.45% JavaScript share as evidence of client-side rendering. That share is Googlebot fetching `/_next/static/*.js` — ordinary resource crawling for a server-rendered app. The remedy it points toward is `Disallow: /_next/static`, which would leave Google unable to render the site at all; the warning against exactly that is already recorded above. Section 3 (“make content available in initial HTML”) rests on the same wrong premise — there are **1,413 prerendered `.html` files on disk**, 630 of them `/questions` pages carrying stem, options and solution in the initial HTML.

**3. Sections 2, 5, 8, 9, 13 and 14 describe work already shipped.** §2 proposes `/nda/maths/probability/`; `/questions/<exam>/<subject>/<chapter>` already exists at 630 pages with per-chapter titles and descriptions — **adopting its scheme would mean 630 redirects and discarding what crawl history exists.** §5’s “topic hubs” are `/questions` + `/notes` (84 chapters) + `/guide` (11) + `/formula` (40) + `/board` + `/mock`. §8: 95 `alternates: { canonical }` declarations with `metadataBase` set. §9: `robots.ts` already blocks `/browse?*` while leaving bare `/browse` crawlable, asserted behaviourally by `tests/robots-rules.test.ts`. §13: JSON-LD across guides and blog.

**4. The omission that matters more than the document.** Seventeen sections, **no mention of domain age or backlinks**. A ~3.5-month-old domain with no external links is what sets the 23 requests/day ceiling; every section in the brief redistributes a fixed budget and none raises it.

**Worth taking:** §7 (sitemap strategy — already Step 2), §15 (search intent drives page creation), §16 (measurement — baseline above), and the Guardrails, especially *“do not assume ‘not indexed’ automatically means ‘technical bug’”*, which cuts against the brief’s own Phase 1. **Verdict: not adopted as a plan.** The existing sequence stands — Step 1 crawl entry points, Step 2 focused sitemap, Step 3 external links.

**One claim of the brief’s that CHECKS OUT:** mobile-first. **478 of 751 clicks (64%) are mobile**, 248 desktop, 25 tablet. Caveat — 98% of clicks are the brand-name homepage search, so this mostly says people type “pyq vault” on a phone.

### RETRACTED 2026-09-17 — "Bing has ~694 pages indexed" was NOISE. A `site:` count is not a measurement.

**This entry replaces a wrong one written an hour earlier.** It claimed Bing had **~694** pages indexed against Google's 12, called that "58x", and concluded the indexing problem was Google-specific. **The 694 was a single sample from a number that does not hold still.**

**The disproof, five consecutive runs of the IDENTICAL query** (`site:pyqvault.com`, no parameters, same minute, same user-agent):

| run | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| "results" | 54,700 | 110,000 | 51 | 32 | 54 |

Paging with `&first=N` is no better: 4,570 → 8,910 → 50 → 1 → 19,800. And the SERP HTML yields **no result URLs to count by enumeration** (JS-rendered), so there is no fallback. **A `site:` count cannot baseline anything, on Bing or Google.** It was already known to be approximate; it is worse than that — it varies by three orders of magnitude between back-to-back identical requests.

**A SECOND trap found on the way, worth its own line:** passing `&count=50` makes Bing answer *"About 50 results"*, which reads exactly like an index count and is really the page-size cap. Two different artefacts, both of which render as a plausible small integer.

**WHAT SURVIVES, because it rests on different evidence.** The claim "Bing serves this site better than Google does" still stands, but on **referral data, not index counts**: Vercel Analytics for the 30 days to 2026-09-17 records **bing.com 204 visitors** — the #3 referrer behind only Google and Reddit — against **~10 non-brand visitors from Google** (751 GSC clicks, 98% of them the brand query `pyq vault` at position 1.02). Those are counted visits, not an engine's estimate of its own index. **The multiple is unknown and must not be quoted.**

**HOW TO ACTUALLY MEASURE BING'S INDEX — there is exactly one way, and it is not scriptable from here.** **Bing Webmaster Tools**: *Site Explorer* gives a folder tree of the site with per-URL crawl/index state (drill into `/questions`, `/notes`, `/guide`); *URL Inspection* gives one page's live status; and the **IndexNow panel** shows the submitted URLs and what Bing did with each — the only direct read on whether the 2026-09-17 submission of 1,280 URLs landed. The property can be imported from Search Console. **Until BWT is set up, the honest answer to "how many pages does Bing have?" is that we do not know.**

**The generalisation, because this is the second time in one session the same mistake landed.** Earlier, `Pages.csv` positions of 1.2–1.3 were read as real rankings when they were a brand over-attribution artefact. Both failures are the same shape: **a number that renders plausibly is not thereby a measurement.** Before a figure is written down here, it needs a stated source and a reason to believe it is stable — and where cheap, a repeat reading. Five curls would have caught this one before it was ever said out loud.

### SHIPPED 2026-09-17 — the indexing diagnosis, IndexNow, and a ranked manual worklist

**THE NUMBER IS 21.** The crawl-stats export (`pyqvault.com-Crawl-stats-2026-09-17.zip`, 51 days, 2026-07-27 → 09-15, 1,173 requests) breaks down as **JavaScript 49.45% · HTML 17.48% · JSON 12.28% · CSS 7.84% · other 9.55% · failed 3.32%**, and Googlebot's own split is **66.24% "page resource load"** against 28.1% actual page crawls. Purpose is **98.21% Refresh / 1.79% Discovery** — so in 51 days Google made **21 discovery requests**, and the 1,424-URL discovered-not-crawled backlog clears in **~9.5 years**. **79% of a tiny budget is spent on bundles, not pages.**

**NOTHING IS BROKEN, WHICH IS THE POINT.** 91.73% of responses are 200; both hosts report "No problems"; `robots.ts` is clean; and the August `Duplicate without user-selected canonical` flag is **1 → 0**, confirming the 2026-08-09 `/login` noindex fix worked. Crawl is also **accelerating**: 19.9 → 17.3 → **31.8** requests/day across the three thirds of the window. This is not a misconfiguration to find. Crawl **capacity** is fine; crawl **demand** is the constraint, and demand is a function of external links and domain age — `pyqvault.com` has been live since 2026-06-04.

**A REVERSAL OF MY OWN READ, TWO HOURS OLD.** I quoted `Pages.csv` positions of 1.23–1.34 as evidence the content ranks where indexed. Those are the **brand over-attribution artefact** again. `Queries.csv` carries the real non-brand positions: `nda english pyq` **9**, `nda notes maths` **36**, `nda determinants pyq` **28**, `probability nda pyq` **34**, `nda sequence and series pyq` **45**, `pnc weightage in nda` **45**, `nda maths strategy` **41**. Meanwhile `pyq vault` sits at **1.02 with 87.32% CTR** and 489 of 751 clicks. **Indexing is a prerequisite, not a ranking fix** — expect impressions first and clicks only as authority arrives.

**What the queries DO prove is worth the work.** `nda determinants pyq`, `probability nda pyq` and `nda sequence and series pyq` are precisely what `/questions/nda/mathematics/<chapter>` exists to answer, and **those pages are not indexed** — Google is matching a generic page at position 28 because the specific one is invisible. **Demand cannot be read off these numbers**: impressions are suppressed at position 45, so low impressions mean low visibility, not low demand.

**TWO LEVERS SHIPPED, AND THEY REACH DIFFERENT ENGINES.**

1. **`npm run seo:indexnow`** (`src/lib/seo/indexnow.ts` pure core + 13 tests, `scripts/seo/indexnow.ts` CLI, dry-run by default like `email:send`). Pushes the live sitemap to **Bing, Yandex, Naver and Seznam**. **Google does not participate in IndexNow** — said three times in the code, because a green run invites exactly the opposite inference. Bing earns it independently: **204 visitors in the 30 days to 2026-09-17**, the #3 referrer behind only Google and Reddit, and Bing's index is what ChatGPT search reads (46 chatgpt.com referrals in the same window). The payload builder **throws on an off-host URL rather than filtering it**, because IndexNow 422s the WHOLE submission on one bad entry — and the case that matters most, an apex `pyqvault.com` URL, is visually identical to a human. The key is **public by design** (served at `/<key>.txt` as the ownership proof); it belongs in the repo and is not a leak — see `public/README-indexnow.md`.

2. **[SEO_INDEXING_WORKLIST.md](SEO_INDEXING_WORKLIST.md)** — 1,279 URLs ranked for Search Console's manual **Request Indexing**, batched 10/day against its ~10–12/day quota. Ranked by **winnability, not content depth**: at domain-authority zero a JEE or NEET page cannot outrank Allen or Physics Wallah whatever is on it, so exam weight outranks question count (NDA 1.00 · CDS 0.92 · MHT-CET 0.80 · JEE/NEET 0.32 · Worksheets 0.18, which are LWS course material with no public search demand). **The first 300 are 91% NDA by decision** — topical depth beats breadth for a new domain, and every recorded non-brand query is NDA. Reversible: it is one table in `scripts/` — regenerate to reweight.

**`/formula` IS EXCLUDED FROM BOTH.** It shipped hours earlier on 2026-09-17 and has had no browser pass. Asking an index to fetch an unverified surface is the definition-of-done failure in another costume. `HOLD_PREFIXES` in the CLI carries the removal condition, so it is a dated hold rather than a permanent rule.

**Wasted budget, measured but NOT the fix.** 39 requests died on 404s and 58 on 301s — **47 of those are the apex `pyqvault.com` host**, and our own OG social cards print the URL as `pyqvault.com/guide/nda-english` with no `www`, so every share teaches the redirecting form. Together ~8% of budget. Worth fixing, nowhere near a 10x.

**The JavaScript share was investigated and DEPRIORITISED.** 580 JS fetches against 205 HTML page crawls is **2.8 JS per page**, so Googlebot is caching chunks well (a page references 18). The residual tracks deploy churn — there were commits on **51 of 51 days** in the window, 1,278 of them, and every deploy re-mints content-hashed chunks. But resource loads are **subordinate to** page crawls, not competing with them: they are a consequence of crawling 205 pages, not the reason only 205 were crawled. Reducing chunks per page is a real but small lever. **Not worth the days it would cost** — recorded so it is not re-derived.

### SHIPPED 2026-09-17 — 192 thin mock pages leave the sitemap, and the “September 5 collapse” is explained

**The mock leaves came out: `/mock` goes from 204 sitemap URLs to 12** (index + 5 exam pages + 6 per-type listings). Measured against production, `/mock/nda-2017-apr-maths` renders **98 words** of body text, and across all 192 leaf pages the only things that differ are the paper name and four numbers — the prose and the whole Instructions block are byte-identical, because the questions sit behind sign-in. That is 13% of the sitemap spent advertising near-duplicate thin pages at a measured ~4 HTML fetches/day. **They stay reachable** through `/mock/exam/<exam>/<type>`; they are simply no longer advertised. Pure core `src/lib/mocks/sitemapEntries.ts` + `tests/mock-sitemap-entries.test.ts`.

**Why a pure core rather than an inline filter: the leaf rows are still what DATES the hubs.** `/mock/exam/nda` must carry the newest `updated_at` among NDA's mocks even though none of them is emitted — deleting the row loop would silently stamp every hub with the build clock, the exact defect `src/lib/seo/lastmod.ts` exists to prevent. A test pins it.

**THE SEPTEMBER 5 COVERAGE CHANGE — investigated, and the date is an artefact.** Coverage changed **9 times in 50 days**, and from mid-August every change lands on a **Saturday** (Aug 15 · Aug 22 · Aug 29 · Sep 5). The figure is recomputed weekly, so “September 5” is a REPORTING date, not an event date — any cause sits somewhere in the Aug 29–Sep 5 window, and Google's index state lags its crawl on top of that. **Investigating deployments “around Sep 5” aims at the wrong window.**

**The +249 not-indexed is content growth, not a regression.** That window holds **212 commits**, including `/mock` + 66 mock URLs entering the sitemap for the first time (`e6d2ff15`, Aug 29), 60 MHT-CET mock papers (`43e1d5d0`, Sep 1), MH State Board Std XII Physics (617 q / 16 ch), Std XI Physics (587 q / 14 ch) and MH State Board Chemistry (1,416 q / 32 ch). Every new chapter mints a `/questions` landing page and a `/board` page. **Rising “not indexed” is what shipping content looks like on a site with no crawl budget** — the denominator grew and the numerator could not.

**The 20 → 12 indexed drop has a named mechanism, NOT a proof.** The same Aug 29 commit that added mocks to the sitemap **removed 63 direct links from `/mock`**, turning a flat list into a picker; its own message anticipated this (“which would have left every mock two hops from an indexed page with no backstop”). Verified live: `/mock` emits five links, all `/mock/exam/<exam>`, and zero direct links to a mock. The real path is four levels — `/mock` → `/mock/exam/nda` → `/mock/exam/nda/past-papers` → `/mock/<slug>`. **Whether those 8 dropped pages were mocks is unprovable from the export, which carries aggregate counts and no URL list.** Recorded as a hypothesis with a mechanism.

**Two things ruled OUT while looking, so they are not re-investigated.** (1) **`lastmod` is sound** — `/questions` carries 45 distinct dates across 631 URLs and the sitemap spans June to September, so the site is not training Google to distrust it. (2) **Splitting the sitemap into a per-section index is NOT worth doing.** Google does not allocate crawl budget per sitemap file; the only gain was per-file index counts in Search Console, and with 12 indexed pages total that breakdown is already near-knowable from the Performance report. It was proposed here and withdrawn before any code.

**A verification trap worth keeping.** `listChapterLandings` is wrapped in `unstable_cache`, which needs a Next render context. Driven from a bare `tsx` script it throws, and the `catch` in `sitemap.ts` returns `[]` — so a smoke script reports **zero** `/questions` URLs and looks like a catastrophic regression. **Any `unstable_cache`-wrapped loader is invisible to the `*:smoke` script pattern**, and a swallowing `catch` renders that as empty data rather than as an error.

### Per-paper public route — `/past-papers/<examSlug>/<slug>` (analysis done 2026-09-17; SEQUENCED BEHIND the indexing check above)

**What it is.** The highest-intent query class in this market is the paper, not the chapter — *"NDA 2 2024 maths question paper with solutions"*, *"JEE Mains 2025 Jan 29 shift 1 solutions"*. The bank holds 189 such sittings fully reconstructed, and **not one of them has an indexable page**: `/mock/[slug]` renders only a stat strip and instructions, with every question behind sign-in, and `/questions` is addressed by chapter alone.

**Why it is cheap.** `mock_tests` already *is* a paper — `slug`, `pyq_year`, `paper_code`, `sections` jsonb and `questions` jsonb as an ordered question-ref snapshot, with the three sitting-discovery rules already resolved and frozen. `queryQuestionsByIds` in `src/lib/questions/query.ts` returns the same `QuestionRow` view-model `/browse` and `/questions` render. So the data path is **snapshot ids → `queryQuestionsByIds` → reorder by snapshot order → existing `QuestionList`**, which inherits `QuestionCard`, KaTeX/`BlockText`, the reveal meter, the backlink chips and numeric/subjective handling for free. No new renderer.

**Scope.** `/past-papers` index → `/past-papers/<examSlug>` (papers grouped by year — the ranking target for *"NDA previous year question papers"*) → `/past-papers/<examSlug>/<slug>`. 189 PYQ papers (NDA 38 · MHT-CET 64 · CDS 55 · JEE 24 · NEET 8) + 5 exam hubs + 1 index = **~195 URLs**, taking the sitemap to ~1,668. The 5 `source='practice'` mocks are excluded — they are not past papers, and the `source` column already discriminates. `/papers` is taken by the teacher builder, hence `/past-papers`, which is keyword-bearing anyway.

**SCOPE CONFIRMED AT ALL 189 (decided 2026-09-17), against a proposal to start with ~40.** Live usage: **183 of 344 accounts (53%) have attempted a mock**, 733 attempts / 617 submitted at 4.0 per student over 69 days — so this targets the most-used measured surface on the site. But the attempt distribution is steep: **125 of 194 published mocks have never been attempted once**, and **20 papers carry 75.4% of all attempts**. That was read here as an argument for shipping the ~40 papers with any attempts first and proving the format before minting 125 pages for papers nobody has opened.

**That argument was rejected, and it was wrong.** An internal attempt count measures what a signed-in student picked off a list; search demand measures what a stranger types into Google. **Different populations, different question** — a 2017 paper with zero internal attempts can still be exactly what someone searches for, and the long tail of “<exam> <year> question paper” is the whole point of the route. Do not re-derive the phasing proposal from the usage table; the usage table does not speak to search demand.

**Decisions taken.** (1) Answers ship *in the HTML*, gated only by the client reveal meter — `revealMeter.ts` is explicit that it is a soft nudge over PUBLIC content, so the page is fully indexable and still converts at 3 reveals. (2) The ~30 papers HELD from `/mock` for being 1–3 questions short are **out of v1**: a read-only page does not need the completeness a graded test does, but reaching them means querying the bank by sitting rather than reading a snapshot — a different data path, worth a phase 2 (+16% pages). (3) `queryQuestionsByIds` issues a single `.in("id", ids)` and pre-2025 NEET papers are 200 questions, right at the documented URL-overflow threshold — **chunk at 200 before relying on it here**.

**The product call to make before building.** A free, complete, indexable paper with answers competes with the timed mock, currently the most-used measured feature. The argument for shipping anyway: every one of these questions is *already* public on `/browse` and `/questions`, so this only reorganises them by sitting, and you cannot rank a page you do not serve — the mock keeps the timer, scoring and analysis. Not yet decided.

**Build order** (TDD, pure core first): `src/lib/papers/` pure helpers (slug↔route, snapshot→ordered view, section grouping, metadata/JSON-LD builders) → `listPapers`/`getPaper` loaders on the anon client cached like `listChapterLandings` → the three routes (`revalidate = 86400`, `generateStaticParams` prerendering the ~40 most recent, rest ISR, no `searchParams`) → plumbing (sitemap with `lastmod = mock_tests.updated_at`, Footer, nav, cross-link from `/mock/<slug>`) → DB-integration tests (anon reads a published PYQ paper; practice excluded; draft 404s). Roughly a day.

**READ THE USAGE CLAIM WITH ITS DATES.** “Mocks are the most-used surface” rests on 69 days of `mock_attempts` against **bank instrumentation that is hours old** — `question_practiced` (the `/browse` + `/questions` answer-reveal event, migrations 0104–0106) has a `first_seen` of **2026-09-17**. On its first partial day it recorded **55 reveals from 4 users** against 3 mock submissions from 3 users. So the two surfaces are NOT yet comparable, and anyone reading this after ~2026-10-01 should re-run the comparison rather than quote the 53% figure as a ranking. This is the same partly-instrumented reading the 2026-09-17 PMF entry already had to reverse once — see [[pmf-partial-instrumentation-is-a-floor]].

**Why it is not the top of this section.** The site has 1,474 known pages and **12 indexed** (2026-09-17 Coverage read above). Adding 195 more to a site whose existing inventory Google declines to crawl is treating a symptom — they would join the 1,424-URL discovered-not-indexed queue. Sequenced behind the crawl-depth and external-link work; the analysis here is complete and ready to build the moment indexing recovers.

### External links — the verified prospect list (researched 2026-09-18; NOT started)

**Why this sits in this section at all.** The 2026-09-17 diagnosis above is explicit that domain age + no external links is **the only item that raises the 23-requests/day discovery ceiling** — every other item redistributes a fixed budget. IndexNow shipped for the engines that answer; Google does not participate. This is the Google-side lever, and it is the one with no code in it.

**The one channel with evidence behind it is Reddit.** Vercel Analytics for the 30 days to 2026-09-17 records Reddit as the **#2/#3 referrer**, above Bing (204) and far above non-brand Google (~10). That is measured referral, not an estimate — so the prospect list below is ordered by *what already works here*, not by domain authority. **Caveat on verification, and it is stronger than it first read.** reddit.com blocks our fetch agent, so subscriber counts and per-subreddit self-promotion rules here are UNVERIFIED and must be read on the subreddit before posting. More importantly, **a fetch can only establish that a page renders and that a fee is or is not advertised — it cannot establish that anyone is there.** PaGaLGuY below was wrongly certified on exactly that confusion. Treat every "verified" in this entry as scoped to its stated fact (a published policy, a published price) and to 2026-09-18; audience liveness is a human check, every time.

**Tier 1 — audience-first (nofollow; the value is human traffic, which is itself a crawl signal).** Reddit (r/NDA, r/IndianDefence, r/JEENEETards, r/Btechtards, r/CBSE — read each sidebar first; most Indian exam subs ban bare self-promo). Quora, where NDA/JEE/NEET 2026 question threads are demonstrably live. **PaGaLGuY — REJECTED 2026-09-18, and the retraction is the lesson.** It was listed here as "VERIFIED ACTIVE" on the strength of September-2026 post dates returned by a page fetch; a human check found the forum dead. **The fetch measured that pages render, not that a community exists** — and the evidence that should have caught it was already in my own probe output: both "recent" threads were LPU admission promos, i.e. the exact residue a dead forum accumulates. A date stamp is a claim about a template, never about liveness. Any forum proposed for this list must be checked for *human* replies within ~30 days, by a person, before it is written down. Telegram/WhatsApp groups carry no link equity but are how this cohort actually shares material, and the 0109 share loop was built for exactly that.

**Tier 2 — editorially earned, highest value per link.** `.ac.in`/`.edu.in` resource pages (we are a real org — a partner-school "useful links" page is a legitimate ask, not outreach spam); Wikipedia external links on the NDA/JEE/NEET articles (hard, and reverted unless the site reads as a reference archive — a free 70k-question bank with per-paper provenance is closer to qualifying than most); pitches to Careers360 / Shiksha / Jagran Josh offering **the data, not the site** ("what NDA Maths weightage actually shifted to across 22 papers" — we hold `wt` and nobody else does).

**Tier 3 — free guest posts, all VERIFIED unpaid 2026-09-18** (so they are not link schemes under Google's spam policy — re-verify before submitting, policies drift). `edustoke.com/blog/write-for-us` — explicitly **one do-follow link, must point at a blog, no commercial/affiliate targets**, 500–1000 words, so the target is a `/blog` post and never `/pricing`. `examcharcha.in/write-for-us-education` — one backlink, states outright "we do not offer paid write for us". `futuretopper.in/write-for-us` — free, no link policy published. `indiastudychannel.com` — free but the **strictest and therefore the best signal**: it rejects keyword-stuffed anchors and anything "written just for the purpose of building backlinks". `bloggers.feedspot.com/indian_education_blogs` is a usable prospect list, not a target.

**Tier 4 — under our own control, do once and stop.** GitHub README (the repo is public and it is a dofollow from a high-authority domain), Google Business Profile, LinkedIn company page, Product Hunt / Show HN, and Medium/Hashnode/Dev.to cross-posts of `/blog` carrying `rel=canonical` home.

**AVOID, and this is the part that can do damage.** Paid link packages, PBNs, comment spam, article directories, "1000 backlinks" sellers. For a domain this young the payoff is asymmetric — neutralised at best, a disavow project at worst. The distinguishing question for any prospect is **"would this page link to us if we did not ask?"**; that is why the Tier-3 entries above were each checked for a fee before being listed.

**The lever that beats every tier.** Linkable assets we alone hold: per-chapter weightage across 22 NDA papers, 189 reconstructed sittings, the three-book syllabus crosswalk, `/formula`'s identity-level addressing. Coaching blogs and Reddit threads cite *data*. This is also the cheapest to produce — the numbers already exist behind `npm run stats`, `loadAlignmentRows` and the 0100 weightage derivation.

**Not started. No owner, no date.** Sequenced alongside — not behind — the crawl-depth work, because the two fix different halves of the same constraint: internal linking redistributes the budget, external links raise it.

---

## Web performance — Core Web Vitals field failure (diagnosed 2026-09-20, NOT started)

**Diagnosed only. No code changed; the working tree was untouched by this pass.** PageSpeed Insights, mobile, `https://www.pyqvault.com/`.

**The lab score is already 100** (Performance 100 · Accessibility 96 · Best Practices 100 · SEO 100; FCP 0.9 s, LCP 1.5 s, TBT 20 ms, CLS 0.001). What fails is the **field** assessment — CrUX, real Chrome users, 28-day trailing:

| Metric | Field p75 | Threshold | |
|---|---|---|---|
| LCP | 3.6 s | 2.5 s | fail |
| INP | 269 ms | 200 ms | fail |
| CLS | 0 | 0.1 | pass |
| FCP | 3.2 s | 1.8 s | poor |
| TTFB | 1.4 s | 0.8 s | poor |

Field FCP 3.2 s against LCP 3.6 s means the page paints nearly complete the moment it paints at all — **the entire problem is getting to first paint**, not rendering. Lab TTFB was 10 ms against a field 1.4 s; that 140x gap is geography, because Lighthouse runs beside `iad1` and real users do not.

**READ THIS BEFORE PRIORITISING IT: this is not the acquisition bottleneck.** The 2026-09-17 indexing diagnosis above stands — discovery and demand are the constraint (21 discovery requests in 51 days, non-brand positions 9-73). Core Web Vitals is a tiebreaker among near-equal results at the top of page one; it does not move a keyword sitting at position 45. The one honest reason to fix it is that a failing CWV panel in Search Console is a standing false alarm that will keep pulling attention away from the indexing work.

**Three findings, each traced to code:**

1. **The homepage has never been cached.** `export const revalidate = 86400` at `src/app/page.tsx` is dead, because the two session reads below it (`getSessionMember` / `getSessionUser`, both redirecting to `/dashboard`) force dynamic rendering. Measured: `/` and `/browse` serve `private, no-store` + `X-Vercel-Cache: MISS` at 0.31-0.51 s TTFB, while `/notes`, `/guide`, `/questions` and `/mock` all serve `public` + HIT/PRERENDER at 0.10-0.14 s. The 2026-07-29 shell fix worked everywhere except the two routes that read identity in their own body.
2. **Every function runs in `iad1`.** There is no `vercel.json`, so Vercel's default region applies: the `bom1` edge accepts the request and invokes the function in Washington DC. Measured floor **~350 ms per invocation** from India, steady state (`/api/drill/answer` returning 405 with zero work does not go faster than that); cold starts reach ~1 s.
3. **~52 KB brotli of `@supabase/supabase-js` + GoTrue ships on every page**, because `src/components/UserMenu.tsx` imports `createSupabaseBrowserClient` at module level for a single `signOut()` call inside a click handler. `HeaderBar` renders `UserMenu` everywhere, so every anonymous visitor downloads an auth SDK to support a button they will never press. Matches the report's `Reduce unused JavaScript - 42 KiB`.

**Sketched but deliberately NOT built (2026-09-20 - judged to need more thought than the session had):**

- **Prerender the homepage.** The naive fix (add `/` to the middleware matcher) walks straight back into the 2026-06-27 narrowing: `updateSession()` runs an `auth.getUser()` network round-trip per matched request and once burned ~40% of Vercel Active CPU on public traffic. The homepage is the busiest public route, so it is the worst possible place to reintroduce that. Design that survives the constraint: branch middleware on pathname, and for `/` do a **cookie-presence check only** - no Supabase client, no network. Second trap: `isSupabaseAuthCookieName` **cannot be reused** for this. It is deliberately permissive and matches `-code-verifier` (set mid-OAuth, before sign-in completes); its own doc says false positives are cheap *because they cost one null lookup*, which stops being true once the decision is a redirect. Needs a stricter pure sibling (`sb-*-auth-token` + its `.0`/`.1` chunks, rejecting `-code-verifier`), TDD'd. De-risked: a false positive is benign, because `src/app/dashboard/page.tsx` sends a memberless, userless visitor to `/browse`, not `/login` - no loop, no dead end. Acceptance is **artifact-based, not reasoning-based** (see `[[shell-component-decaches-site]]`): `find .next/server/app -name '*.html' | wc -l` must rise, and every `.html` AND `.rsc` must be grepped for emails and org names before it ships. The signed-in redirect is auth-gated and cannot be proven headlessly - that browser pass belongs to a human.
- **`vercel.json` with `"regions": ["bom1"]`. BLOCKED on one unanswered fact: which region the Supabase project is in.** It flips the item from a clear win to actively harmful. `ap-south-1` (Mumbai) → `bom1` collocates functions with the database and kills both the user→function hop and every function→DB hop. `us-east-1` → functions already sit beside the database, and moving them to `bom1` would save ~350 ms once while adding a cross-ocean hop *per query*, making any multi-query page **worse**. Three attempts to determine it from outside all failed: DNS for `db.<ref>.supabase.co` is wildcard-hijacked (returns a Prague parking IP), the privileged metrics endpoint carries no region label, and a latency inference was **wrong** - the probed routes short-circuit on a cookie check when unauthenticated and do no database work, so the 992 ms reading was a cold start, not query time. **Answer it from the dashboard: Settings → General → Region.** Also unconfirmed: Hobby allows a single function region, so the config should be accepted, but only a deploy proves it.
- **Touch-target spacing** (the one Accessibility deduction, 96 → 100). **The failing nodes are not known.** The PDF has the audit collapsed, and the first guess - the exam-family class pills - is probably **wrong**: at `py-1` + `text-xs` + borders they compute to ~26 px, clearing Lighthouse's 24 px bar, and WCAG 2.5.8 passes a target at ≥24x24 regardless of spacing. The likelier culprits are the footer's inline text links (~20 px line-height). Get the truth first - expand the audit in the PSI report, or run `npx --yes lighthouse` locally (Chrome is installed; `npx` adds no dependency) - then change what it actually names.
- **INP 269 ms - not actionable yet.** Lab TBT is 20 ms, so it is not gross main-thread cost; it is real devices being slower than the emulated Moto G Power. Diagnosing it needs field RUM this project does not have. **Note that fixing TTFB alone does not flip the assessment**: it should take LCP to roughly 2.3 s and pass, but INP still fails, and CWV requires all three.

**Whenever this is picked up:** CrUX is a 28-day trailing window, so any fix ships invisible and surfaces over a month.

---

## Tech debt / refactoring

### BACKFILL LEDGER — `concludedLetter` reads the ARTICLE "a" as option A (logged 2026-09-22)

Found while solving CBSE 2025 Physics 55/7/1. The sentence *"Note that the answer is a temperature
RISE"* was flagged `SOLN_A!=KEY_B`: the `answer\s*is\s*\(?([A-Da-d])\)?` pattern in
`concludedLetter` ([scripts/practice/audit-keys.ts](scripts/practice/audit-keys.ts)) matched the
indefinite article. The `END` lookahead does not help, because a letter followed by a space is
exactly what an article looks like.

This is a **fifth** phrasing of the class the cbse-12-pyq memory already records four of (the
Assertion-Reason `(A)`/`(R)` labels, `option a <text>`, a closing parenthetical dismissing a
distractor by letter, and `Hence B is …` where B names a matrix). The rule that prevents all five —
*never leave a bare capital A–D where a probe could read it as an option label* — now has to be read
as covering lowercase `a` after "answer is" too.

**Worked around, not fixed.** The solution was reworded to *"what is asked for is a temperature
RISE"* and the probe is green.
**RECURRED 2026-09-22**, on CBSE 2024 Physics 55/2/1 Q4: *"produces the option a factor of ten
away"* was flagged `SOLN_A!=KEY_C`. That is the `option a <text>` phrasing this entry already lists,
hit again in a fresh paper — so the class is not a one-off and the wording rule above is not enough
on its own to prevent it. Reworded again. Each recurrence costs a re-apply and a re-probe cycle,
which is the running cost the proposed fix would remove.
 `auditRow` is SHARED by the practice bank, JEE and cbse-12, so
tightening it changes results across three corpora and wants its own pass.

**Proposed fix, for that pass:** reject a BARE (unparenthesised) lowercase letter that is followed by
whitespace and another word — an option conclusion is written `(A)` or ends the clause, while an
article always introduces a noun. Worth running before/after across all three corpora and diffing the
flag set, since the point of the probe is that its zero is trustworthy.

### ~~BACKFILL LEDGER — CBSE Class 10 Science Ch.12 is missing its first in-text box~~ — DONE 2026-09-21

Found while starting Ch.2, whose page 1 carries the same shape. Approved and repaired the same day:
Ch.12 is now 25 q, all five boxes present and correctly banded, `board:lint` green. The record below
is kept because the DETECTION story is the reusable part.

A question box holding a single item is headed **QUESTION**, singular. Exactly two exist in the
book — Ch.2 p1 and Ch.12 p1 — and `spacedHeadingRe("QUESTIONS")` matches neither. That regex fed
both `science-items.ts` **and** my own page survey, so Ch.12 shipped reporting `in-text boxes:
book 4, transcribed 4` with its first box invisible to both sides of the check. A shared blind
spot reads exactly like agreement. Fixed in `questionBoxRe()` (commit `4e303ee5`); re-running the
corrected probe over all six shipped chapters names **Ch.12 alone**.

**Scope — two defects, not one.**
1. One question absent from the bank: *"Why does a compass needle get deflected when brought near
   a bar magnet?"* (Ch.12 p1, closing the §12.1 opening prose). Ch.12 would go 24 q → 25 q.
2. **All 12 of Ch.12's in-text rows are banded one box too low.** Their refs say `IT 12.1`–`IT 12.4`
   where the book's boxes are 2–5, so every `section_group` on the `/board` reader names the wrong
   section. This is the larger half and it is invisible on `/browse`, which never reads `section_*`.

**Blast radius.** 12 PUBLIC rows change `ref`, `section_group`, `section_label` and `section_seq`;
1 row is added. `ref` is not the content hash (`subjectiveContentHash` is over stem + context), so
re-banding does not duplicate or orphan a row, and no `/notes` or `/guide` editorial points at
Ch.12. `board:lint` re-checks `section_seq` contiguity afterwards.

**Does it really apply.** Yes, and it is not a judgement call: the render shows a bordered box with
one item, and the corrected probe reports `box 1 items in BOOK not transcribed: 1`. No other chapter
is affected — measured over all six, not assumed.

**Risk + reversibility.** Low and fully reversible — additive insert plus a column update on 12
rows, data files committed, no migration. **Cost** ~30 min including re-audit.

**Outcome.** Refs re-banded in one set-based UPDATE (14 rows: 12 in-text + 2 worked examples, whose
band prefixes name the box they precede and so shift with it), then `commit.ts --apply` reported
`inserted=1 skipped=24` — which is also the proof that `ref` is outside the content hash. Verified
after: 25 rows, 25 distinct hashes, one compass-needle row, `section_seq` contiguous 1..8, 0 rows
not PUBLIC. **Note for the next repair: `commit.ts` sets every row of the chapter back to PRIVATE,
so the flip has to be re-run even though only one row was new.**

### BACKFILL LEDGER — `seo:dates --check` can never pass on a Windows working tree (logged 2026-09-19)

Found while building the MHT-CET matrix generator, which copied that script's `--check` pattern.

`scripts/seo/content-dates.ts` compares the file on disk against freshly-rendered text with a
**byte** comparison. This repo has `core.autocrlf=true`, so a checked-out file is CRLF in the
working tree while `render()` emits LF — measured: `contentDates.generated.ts` is 7,172 chars on
disk and 7,063 after normalising, i.e. 109 CRLF pairs. So `npm run seo:dates -- --check` reports
**"content dates are stale" on a git-clean tree**, whatever the content actually says. Confirmed by
running it against an unmodified file.

**Why it has gone unnoticed:** the check is not in `prepush` and not in CI, so nothing runs it
except by hand, and by hand it is on Windows. On Linux (LF checkout) it would pass.

**Blast radius:** low and one-directional — the check only ever over-reports staleness, so it
cannot have let a stale sitemap through. The cost is that the probe is useless locally, which is
the only place it runs.

**Fix (one line, not applied):** compare on normalised line endings, as
`scripts/mhtcet/trends-matrix.ts` now does (`lf()` helper, with the reasoning in a comment there).

**Do not apply without checking the same class elsewhere** — any other generator using
`readFileSync(...) !== rendered` has it too. `grep -rn "existsSync(OUT_PATH)" scripts/` is the
starting point.


### BACKFILL LEDGER — MHT-CET Maths trigonometry, PHASE 2: split the 94 mixed identity/equation questions (logged 2026-09-17)

Phase 1 shipped 2026-09-17: the Std XII chapter was renamed `Inverse Trigonometric Functions` →
**`Trigonometric Functions`**, and the two triangle subtopics (22 in Trigonometry - I + 52 in
Trigonometry - II) plus Trigonometry - II's 21 inverse questions were merged into it. That chapter
is now **168 q** — the 4th-largest in CET Maths — and the guide was re-tiered from Long Tail to
Cornerstone to match. Two of the three overlaps are gone.

**What is left: 94 questions in two subtopics that each MIX Std XI and Std XII material.**

| Subtopic | Chapter | q |
|---|---|---|
| `Trig Identities, Compound Angle, and Equations` | Trigonometry - I | 77 |
| `Trigonometric Identities and Compound/Half-Angle Formulas` | Trigonometry - II | 17 |

Both bundle Std XI identity work (allied / compound / multiple / half-angle, factorisation) with
Std XII **trigonometric equations and general solutions**, which are section 1 of Balbharati XII
Ch.3 and belong in `Trigonometric Functions`. Unlike Phase 1 this is **NOT a bulk UPDATE** — it
needs a per-question read of all 94 stems, because the split is within a subtopic, not between
subtopics.

**Target shape:** a new `Trigonometric Equations and General Solutions` subtopic under
`Trigonometric Functions` (matching the board's own section name); the residual identity rows
consolidate into `Trigonometry - II`, which is the Std XI identity chapter; `Trigonometry - I`
holds none of its own namesake material (unit circle, quadrant signs, domain/range, polar) — the
CET bank has **zero** questions on any of it — so once emptied that chapter should be DELETED.

**Downstream, all of it name-keyed and already proven to break loudly:** `src/lib/books/registry.ts`
(`tests/books-registry.test.ts`), the `/guide/mht-cet-maths` editorial across strategy / trends /
traps / playbooks / playbook-details-core+tail / formulas / mht-cet-maths.ts
(`tests/guide-mht-cet-maths-playbooks.test.ts`), and the `/questions/mht-cet/maths/<chapter>`
landing-page URLs. No chapter UUID is pinned anywhere in the repo — checked all three in Phase 1 —
and there are no CET trig `/notes` chapters, so the rot surface is those two files plus the guide.

**Before starting, confirm the carve against the official MHT-CET syllabus PDF.** Phase 1 inferred
it from the Balbharati spine in our own DB (`syllabus_concepts`, source `MH State Board`), which is
strong evidence but is not the syllabus document.

### BACKFILL LEDGER — 176 questions draw matrices in ROUND brackets (logged 2026-09-17)

Square bracket is the house style: after the 2026-09-17 repair, **884 question rows carry
`bmatrix` against 176 with `pmatrix`**. The 176 are the rows that are UNIFORMLY round — the 15
that disagreed with themselves were converted, and `audit:text`'s MIXED_MATRIX_DELIM class
(`mixedMatrixDelimiters` in `scripts/lib/textProbes.ts`) now reports 0 and will catch the next one
at ingest. Converting the remaining 176 is `npx tsx scripts/reviews/normalise-matrix-delimiters.ts`
with its probe-derived scope widened; it is deliberately NOT done.

**Recommendation: DECLINE unless the house style is ever enforced for another reason.** The
benefit is zero on screen — a uniformly round question has nothing to mismatch against, and both
fences render correctly in KaTeX and in Word (`wrapMatrixDelimiters` handles `(`, `[`, `|`, `{`,
`‖` symmetrically). The cost is not zero:

- `content_hash` is `sha256(stem + sorted options + answer)`, so each rewrite changes its preimage.
  Recomputing (the invariant every write path here maintains) desynchronises the hash from the
  source `.docx`/`.pdf`/`.xlsx` — which live OUTSIDE the repo, so there is nothing to fix alongside —
  and from nda-tracker's copy, where `applyMockSync` looks rows up by hash and would insert
  duplicates on the next sync.
- ~12 `question_reviews` and ~71 `question_item_stats` rows key on that hash and would flip to
  stale for content nobody re-verified.
- 8 `quizzes` rows hold FROZEN `stem` snapshots, so a bank UPDATE would not reach them and the two
  surfaces would disagree.

**Never convert** `\begin{pmatrix} n \\ k \end{pmatrix}` in Binomial Theorem — it is nCk, and JEE
2021 Paper19 Q62 defines `(n k)` and `[n k]` as two DIFFERENT symbols told apart by their brackets.
Both the probe and the repair carry that exemption (single-column AND the row mentions
combinations); measured bank-wide it exempts exactly the 3 rows that want exempting.

### ~~BACKFILL LEDGER — 28 files carry a RAW control byte~~ — DONE 2026-09-15

All 28 fixed the day after they were logged: 68 raw control bytes replaced with `\uXXXX` escapes,
the guard's allowlist deleted, and `tests/no-control-bytes.test.ts` now simply asserts none.

Two corrections to what this entry originally claimed, both found by measuring before editing:

- **It was not "every one the same pattern, a NUL separator".** Eight distinct bytes — 0x00 x24,
  0x01 x10, 0x08 x5, 0x0B x11, 0x0C x5, 0x0E x4, 0x1F x8, 0x7F x1 — across THREE classes:
  composite-key separators, control-char DETECTOR regexes (`/[\u0000-\u0008\u000B...]/`), and
  deliberate test FIXTURES (`"has a \u0001 byte"`). Escaping is behaviour-preserving for all three,
  but only the first class was the one this entry described.
- **The allowlist was breaking CI and the local gate could not see it.** 16 of its 28 paths were
  gitignored scratch files present only on this machine, so its "every entry still offends"
  assertion passed here and failed on a clean checkout — from the commit that introduced it.
  Proven by moving those 16 aside and re-running. A list of PATHS is a claim about a working tree,
  not about the repository.

Verification, since the risk was concentrated in one file: `lib/quiz/atoms.ts` feeds its separator
into a STORED sha1, and `fingerprint()` returns byte-identical output across 7 inputs before and
after; 13 character classes were rebuilt from both the escaped and the raw form and compared over
all 256 byte values (identical); typecheck and the full suite green.


Deferred remainder of the 2026-06-01 (later) tech-debt pass. That session shipped the guide component de-dup (12 parallel files → 2 generics), the `questionResources.ts` resolver registry, and cross-link + billing test coverage (see CLAUDE.md Decisions log). These three are the lower-urgency items it explicitly left out.

### Split `EditQuestionForm` (1,154-line god-component)

`src/app/questions/[id]/edit/EditQuestionForm.tsx` fuses form state, the exam→subject→chapter→subtopic cascade, concept tagging, image upload/preview/validation, set-membership, and role-gated visibility behind ~11 drilled props. Works + server-guarded, but untestable as a unit. Natural seams: `TaxonomyPicker`, `ImageSlot`, `ConceptTagger`, `VisibilityControl`. Tier-2 — do it when the edit page is next touched.

### Extract `docxBuilder` paragraph-construction helpers

`src/lib/export/docxBuilder.ts` (~468 lines) is dense imperative Word-layout code (numbering, set-banner + passage truncation, OMML placeholder-swap, image fitting). Cohesive but hard to follow — extract `buildSetBanner` / `buildOptions` / `applyOmmlPatch` opportunistically when next touched. Lower priority than the form split.

### Collapse the `/`→`/dashboard`→`/browse` double-redirect

`src/app/page.tsx` sends a signed-in org-less student to `/dashboard`, which then bounces them to `/browse` — a wasted hop, and the inline comment ("orphan-user state lives on /dashboard") is stale after the 2026-06-01 dashboard change. Route org-less users straight to `/browse` from `/`. Tier-3; ~5-minute fix.

---

## UI / IA polish

The 2026-05-18 Tier 1 IA + cross-linking ship (primary nav, exam pill, `/nda` exam home, backlink chips, click-to-reveal, filter recipes, in-app reports) left these student / teacher journey items as follow-ups.

### Brand link → exam home for non-admin viewers

`AppHeader` brand link currently goes to `/browse` for non-admins (and `/dashboard` for admins). Now that `/nda` exists, non-admin brand link should go to the cookie-active exam's home (`/nda` today; future `/mht-cet` etc.) so "go home" means "go to your exam's everything-page". Behaviour change worth its own commit; cost is ~10 minutes (one helper edit). Deferred from Tier 1 Phase 1.

### Per-exam `/browse` route

Today `/browse` is exam-agnostic and the user applies the exam filter via cookie / URL param. A `/nda/browse` route (and future `/mht-cet/browse`) that defaults to the exam's `examId` would drop the "pick exam" step for the 95% case and let direct deep-links carry exam context naturally. Plumbing: route alias + middleware default-filter injection. ~1 hour. Deferred from Tier 2 (the empty-state recipes ship was the smaller half of Tier 2 student journey).

### Cookie-driven resume

Last-read playbook / last-opened concept note / current cart as a tiny `qb_resume` cookie. Lets a returning student pick up where they left off without an account. No DB cost; ~1 hour. Deferred from Tier 2 student journey.

### Saved filter sets (DB-backed teacher infra) — Tier 3 scope

New `saved_filters(user_id, org_id, name, filters_jsonb, created_at)` table + a small UI under `/dashboard` (probably split into "Admin" + "Teach" tabs). Lets a teacher save the same recipe ("MHT-CET Physics HARD 2024") and reuse it weekly without rebuilding. Half-day; first new schema since the Tier 1 UI overhaul began. Needs a small product decision on UI placement (dashboard tab vs `/browse` toolbar vs cart-style panel) before scoping. Subsumes the existing "Optional user accounts — saved filters / history" entry below.

---

## Auth + accounts

### Custom SMTP for Supabase Auth — ✅ DONE 2026-07-16 (but the stock template gets flagged as phishing — see Password reset flow)

**Two different things share the name "Resend"; both are now live, but they are not the same system:**

| | What it is | State |
|---|---|---|
| **Resend API** | Our app POSTs to `api.resend.com` with `RESEND_API_KEY`. Powers the mock-recommendation campaign (migration 0059, `src/lib/email/`). | ✅ Shipped 2026-07-16 |
| **Supabase Auth SMTP** | Password-reset + magic-link + invite mail, sent by **Supabase**, not our code. | ✅ Wired 2026-07-16 |

**Config (Supabase → Authentication → Emails → SMTP Settings):** host `smtp.resend.com` · port 465 · username `resend` · password = a Resend API key · sender `noreply@pyqvault.com` / "PYQ Vault". **Enabling SMTP does not lift the throttle** — the separate `GOTRUE_RATE_LIMIT_EMAIL_SENT` was raised **2/1h → 30** (Authentication → Rate Limits). Both halves are needed; the old ~2/hour cap was the actual bug.

**Verified end-to-end**, not assumed: a live `POST /auth/v1/recover` produced `user_recovery_requested` with `status:200, error:null` and a **2.77s duration** (an SMTP round-trip, not a no-op), and the mail arrived with **SPF PASS · DKIM PASS (`pyqvault.com`) · DMARC PASS**, delivered in 1 second via `ap-northeast-1.amazonses.com`.

**⚠️ It arrives in SPAM with Gmail's red "This message might be dangerous" phishing banner** — and the cause is NOT deliverability. See "Password reset flow" below; the same-day campaign proves the domain is healthy (31/31 to inbox).

### Optional user accounts — recently-built papers, drill streaks

**Self-serve accounts now exist** (`/signup`, 2026-06-01) and the per-user `entitlements` table is live — so this is unblocked. Remaining: recently-built papers history, per-user drill streaks / progress, account-bound preferences (the "saved filters" half is a separate scope under **UI / IA polish**; the cross-device cart under **Cart / persistence** is also now unblocked). These attach to `auth.users(id)` the same way entitlements do.

### Password reset flow

No UI yet — admins reset directly via SQL (see CLAUDE.md Operations). Self-serve email/password students shipped 2026-06-01 and have no "forgot password" path; Google-OAuth students are unaffected. **The SMTP half is DONE (2026-07-16, above). What remains is code — and a hard requirement we now have evidence for.**

**THE FINDING (2026-07-16): Supabase's stock reset template gets flagged by Gmail as PHISHING, and it is a CONTENT problem, not a deliverability one.** The mail lands in **spam** under a red *"This message might be dangerous — messages like this one were used to steal personal information"* banner. Why: the stock template's `{{ .ConfirmationURL }}` always resolves to the **project domain** (`<ref>.supabase.co/auth/v1/verify?token=…`), so the email says `From: PYQ Vault <noreply@pyqvault.com>` and its only link points somewhere else entirely. A password-reset email whose link domain ≠ its From domain is the textbook credential-harvesting shape.

**The same-day natural experiment isolates it beyond doubt** — same domain, same hour, same provider, same auth result, only the content differs:

| | Mock campaign (our `src/lib/email/`) | Auth reset (Supabase stock template) |
|---|---|---|
| SPF / DKIM / DMARC | PASS / PASS / PASS | PASS / PASS / PASS |
| Links point to | `www.pyqvault.com` (= From domain) | `…supabase.co` (≠ From domain) |
| Outcome | ✅ **31/31 to INBOX** | ❌ spam + phishing banner |

So: do **not** chase DNS/warm-up/reputation. The fix is to make the link live on our domain.

**Scope (the documented Supabase pattern):**
1. Custom template → `<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">` (dashboard).
2. **`/auth/confirm`** route handler — `verifyOtp({token_hash, type})` → session → redirect. Validate `type` + the redirect target (open-redirect risk).
3. **`/reset-password`** page — new-password form (`updateUser({password})`).
4. **`/forgot-password`** page — the email input; today there is no UI at all (the 2026-07-16 test was a hand-rolled `POST /auth/v1/recover`).
5. Brand the auth templates while there — they're student-facing, so the same rule as the reply-to applies (PYQ Vault, not the tenant org).

Same treatment fixes magic-link + invite mail, which use the identical `ConfirmationURL` mechanism. **Deferred by the user 2026-07-16** ("we will take this in future") — nothing is broken that wasn't broken before; a student who forgets their password was already stuck, and is now stuck one step later (the mail sends, but lands in spam looking dangerous).

---

## Premium / paywall (Razorpay)

The 4-phase paywall shipped 2026-06-01 (signup → entitlements → comp-access UI → notes preview-gate → Razorpay checkout; see CLAUDE.md Decisions log + [[project-paywall-build]]). The code is complete and gate-green; these are the **open activation + follow-up** items.

### Activate Razorpay (the only thing blocking real transactions)

Checkout returns 503 until 4 env vars are set in Vercel + `.env.local`: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` (= key id), `RAZORPAY_WEBHOOK_SECRET`. Steps: create a Razorpay account (test mode needs **no KYC**) → generate test keys → create an `order.paid` webhook → `https://question-bank-sage.vercel.app/api/billing/webhook` → run a test-card payment → confirm an `entitlements` row + a paid chapter unlocks. **Open question (2026-06-01):** the user's existing Razorpay login looked like a partner-linked/Route account ("Registered By: CREATOR ECONOMY TECH", limited nav, no API-keys page) — may not expose standalone keys; a fresh direct razorpay.com merchant account may be required. Going live later = KYC + swap the 4 vars to `rzp_live_…` + repoint the webhook (no code change).

### Designate the first paid notes chapter

All 5 current `/notes` chapters are `free` — the preview-gate machinery is dormant. Making a future chapter premium = set `tier:"paid"` (+ optional `paidScope`/`previewConceptCount`) in the `NOTES_CHAPTERS` registry AND make its `[subtopicSlug]/page.tsx` wrapper `export const dynamic = "force-dynamic"` + drop `revalidate`/`generateStaticParams` (notes-lint enforces the contract). Product decision: which chapter, and confirm the 2-concept preview line reads well for it.

### Pro-plan hardening (when on Supabase Pro)

`auth_leaked_password_protection` (HaveIBeenPwned check on new passwords) is **Pro-only** and currently off — worth enabling now that strangers set passwords. On Free, the lever for abuse is Attack Protection → CAPTCHA (hCaptcha/Turnstile, free-tier) — only wire if bot signups appear.

### Per-chapter / multi-tier pricing (future)

The entitlement model already supports non-`'all'` scopes (`scope` is free-text), so selling individual chapters or tiers needs **no migration** — add `PLANS` entries + per-chapter `paidScope` + a richer `/pricing`. Single-tier (one ₹999/365 pass) is the current shipped shape; revisit only if the catalog of paid chapters grows enough to warrant à-la-carte.

### Receipts / invoices / GST (ops, not code)

Razorpay dashboard handles payment receipts; GST on the price itself (if LWS is GST-registered) is a CA/tax question, not a code change. Flag for the finance side before going live.

---

## Export quality

### Printable per-chapter `/notes` PDF — "Download PDF" button

Generate a printable PDF study booklet per `/notes` chapter, straight from the existing notes data (no new authoring — it's pure layout over `ChapterNote` → `SubtopicNote` → `ConceptUnit`). **Structure approved 2026-06-04** (full booklet ending in a revision sheet):

1. **Cover** — title · `subjectDisplay` · exam · PYQ Vault mark · chapter `intro` · stat band · short URL.
2. **Chapter map** — `subtopicOrder` contents + the auto-derived `ConceptWeightTable` (high-yield triage).
3. **Teaching body** — per subtopic → per concept: `name` → `intuition` → `definition` → boxed `formula`/`ReferenceTable` → worked example (`authoredExample`) → traps → `[Q# · month · year]` provenance. Static SVGs inline; rotatable ones print their default frame.
4. **Practice workbook** — every `selfCheckExample` + `practiceSet` rep as numbered problems, with…
5. **Answer key** — solutions at the back, back-referenced (so it's self-test-usable on paper).
6. **Revision sheet** — the auto-derived `ChapterRevisionSheet`, dense two-column finale.

**Delivery (decided):** a server-side **"Download PDF" button** on the chapter landing → headless-Chrome render of a dedicated print route → streamed `application/pdf`.

**Sample approved:** `C:\tmp\indefinite-integration-sample.pdf` (51 pages, MHT-CET Indefinite Integration), generated by a throwaway DB-light proof-of-concept (not kept — regenerable from this recipe: a `tsx` script reads the chapter's real `_data`, pre-renders each `\(...\)` zone with the bundled `katex` package's `renderToString`, emits print-styled HTML linking `node_modules/katex/dist/katex.min.css`, then `msedge --headless=new --no-pdf-header-footer --print-to-pdf=...`). Confirmed KaTeX math, formula boxes, worked examples, traps, and the two-column revision sheet all render cleanly.

**Architecture (single source of truth):**
- **Phase 1** — a print route `/notes/<subject>/<chapter>/print` (server component) renders the full booklet flat (non-interactive) via the existing `KatexRenderer`/`RichText`/diagram renderers + a print stylesheet. Independently viewable, so browser **Save-as-PDF is a zero-infra fallback**. TDD the pure helpers: `collectPrintBooklet(registration)` (ordered flattened sections), the **answer-key separation** (relocate every practice/self-check answer to the back, numbered + back-referenced), `pdfFilename(registration)`.
- **Phase 2** — a PDF API route (`/api/notes/[subject]/[chapter]/pdf`) launches headless Chrome, navigates the print route, waits for `document.fonts.ready` + KaTeX, `page.pdf()`, returns the buffer; plus the button, running headers / page numbers (Puppeteer `headerTemplate`/`footerTemplate`), the **real SVG diagrams** (replace the Phase-1 placeholders), and the **DB-backed featured PYQs + drill refs** (omitted in the sample).

**New dependency:** `puppeteer-core` + `@sparticuz/chromium` (no in-stack substitute — react-pdf can't render KaTeX; the docx pipeline is for question papers, not prose). Risks on the record: **Vercel Hobby 10s function timeout** (a 30–50 page render + cold start is the main risk; Pro lifts it to 60s — relevant to the pre-Razorpay Pro move), ~50 MB chromium bundle (fits Hobby, adds cold-start latency on a click-to-download path), and the Save-as-PDF fallback if it ever bites.

**Defaults taken:** A4, one PDF per chapter, button beside the existing Present-mode control. **Open product questions:** (a) **free vs entitlement-gated** download (decide at the button — ties into the paywall machinery); (b) **page length** — 51 pp is what "everything for one chapter" costs (biggest chapter); levers if too heavy are dropping the practice+answer-key section or making it opt-in.

### Auto-split exports (> 200 questions)

Current cap: 200 questions per export, enforced because of Vercel function timeout. Beyond that, the user gets a clear error ("narrow filters"). Auto-split (multiple Word files for one big request) was deliberately not built; revisit if a real teacher hits the cap.

### Custom-designed OG PNG

The dynamic `ImageResponse`-based OG image (both `/opengraph-image` and `/guide/opengraph-image`) renders fine but is less polished than a designer-built PNG. Cosmetic-only.

---

## Cart / persistence

### Cross-device cart sync (DB-backed paper drafts)

The paper cart is localStorage-only — per-browser, doesn't survive a phone-to-laptop switch. DB-backed drafts would let a teacher build a paper on phone, finish on desktop. Needs auth (sign-in to associate drafts to a user).

---

## Cross-app integration

### Phase B — direct API push of a built paper to nda-tracker (retire the tagged Excel)

User-confirmed long-term direction (2026-06-14). Phase A shipped the auto-generated **tagged sheet (.xlsx)** download (see the 2026-06-14 Decisions-log entry) — it kills the hand-typed-file error class but keeps a lossy, schema-coupled Excel bridge. Phase B removes the Excel:

- PYQ Vault pushes the built paper's tags (questions + options + answer + chapter/subtopic/difficulty/solution + **context + set grouping + images**) over the **existing cross-app Bearer-secret bridge** — same pattern as the Quiz Factory's `quiz-import` (`NDA_TRACKER_IMPORT_URL` + `QUIZ_IMPORT_SECRET`, deterministic id via `slugToUuid`).
- nda-tracker stores it keyed to a stable **paper id**; the upload wizard gains a "pick a pre-loaded paper" dropdown, so the operator uploads **only the Evalbee Results** (the OMR output, which can never come from PYQ Vault).
- Lossless: writes the same `exams.questions` **jsonb** the same way as the Tags path → **still no DB migration**. Re-push is idempotent (same paper id).
- Reuses everything Phase A built on the kept side (the nda-tracker `context` field + passage rendering + the Maths chapter-name sync). The only things retired are the `.xlsx` generation + the `parseTagsFile` context column (~5 lines).
- Effort is a two-app change (new nda-tracker endpoint + "imported papers" store + wizard dropdown branch) — same cross-app care as [[cross-app-feature-execution]]. Gate on actually wanting to drop the Tags upload; Phase A already removed the error class.

### MHT_CET_AI publisher button (explicitly deferred)

`POST /api/sync/mock` is the receiver side, already live. The publisher button inside MHT_CET_AI is a separate cross-project change. User explicitly chose "complete this project, defer cross-integration."

---

## Observability + ops

### Staging Supabase for the gate (tests first) + ECONNRESET retry hardening (analysis done 2026-08-05; deferred)

> **Largely superseded 2026-08-05 — MEASURE BEFORE BUILDING THIS.** Two things changed after this was written.
>
> **(a) The IO/ECONNRESET half is fixed at the cause** (`fa9b627`): `queryQuestions` was sorting the full row shape and spilling ~14 MB to disk per call — 99.4% of the project's temp writes, 1,097 GB lifetime — which drained the Disk IO Budget and made every burst fragile. The gate now passes with zero ECONNRESET/timeout signals, so item 4 below (retry hardening) has lost most of its urgency; it is now cheap insurance for Vercel deploy builds, not a live-failure fix.
>
> **(b) Egress was measured, and builds ARE the egress.** A `/questions` landing page response is 37 kB (25 rows, 1,506 bytes/question); a full build is ~25 MB; there were 145 pushes to main in 30 days × 3 builds each (pre-push, CI, Vercel) ≈ **10.9 GB/month against 11.48 GB observed.** That also explains the previously-unexplained flat ~200 MB daily plateau — it is a count of builds, not a mystery baseline.
>
> **What was done instead** (`918f0b5`): the pre-push and CI builds are now conditional on the changeset, since 78 of those 145 pushes changed nothing the compiler reads. That removes ~3.9 GB/month with **no** loss of gate coverage — strictly better than the "skip the local build" idea in item 5, which traded away protection. Combined with batching pushes (~5/day today), the free-tier allowance is clearable without staging at all.
>
> **So the remaining case for staging is: the test-flake fix, plus headroom that does not depend on push discipline.** Real, but much narrower than the "one fix, three symptoms" pitch below. Watch the egress chart for a week first — if normal-activity days settle under ~150 MB, do not build this. One cost the tables never captured: for CI's build to prerender against staging, staging needs a real content snapshot that stays in sync as the bank grows, or CI builds pages that do not match production.

**Problem:** the single shared prod Supabase is the binding constraint on the pre-push gate — now **three distinct symptoms of one root cause**: `/questions` prerender statement timeouts (2026-08-03, tuned away with `cpus: 4` + `staticPageGenerationTimeout: 180`), random DB-integration test flakes under concurrent-session load (2026-08-04 SUGGESTIONS ledger entry), and now **pool exhaustion** — a gate run where every stage passes alone but `build` immediately after `test` gets 344 ECONNRESETs (2 of 689 pages fail). Mechanism: 79 test files hammer the DB, `global-teardown` finishes with heavy cascade deletes, and the build then fires 4 prerender workers at ~317 DB-querying pages while the small shared instance is still saturated → the pooler/PostgREST resets connections. The existing retry in `queryQuestions` only matches SQLSTATE 57014 (a PostgREST error object); an ECONNRESET is a *thrown fetch-level network error* and nothing retries it. Each fix so far has tuned headroom against a moving target (bank growth + concurrent sessions), so the class recurs structurally.

**Plan (agreed 2026-08-05, deferred):**
1. **Second free-tier Supabase project** (user creates it — the MCP can't create projects); apply migrations 0001–0066 from the repo files + `db:seed`.
2. **Restore a snapshot of prod's content tables** (organizations → taxonomy → questions/options/tags; skip user-keyed tables — `org_members`, `mock_attempts`, `notes_progress`, etc. FK onto `auth.users` and tests create their own users). The "LWS Pune" org row must come along (DB tests `.eq("name","LWS Pune")`).
3. **Point tests at it**: `.env.test` preferred over `.env.local` in `tests/setup.ts`; flip the three CI secrets. Kills the global-teardown "sweep prod" fragility outright and lets `maxForks: 2` be raised (faster suite).
4. **Independently valuable, do even without staging:** extend the prerender retry (`queryQuestions` + landing-page loaders) to catch thrown fetch failures/ECONNRESET, not just 57014 — **Vercel deploy builds prerender the same 689 pages against prod by necessity, so an ECONNRESET burst can fail a production deploy today.**
5. Local/CI **build** stays on prod initially (build-alone has passed twice); phase 2 — export staging env for the gate's build stage too — only if build-vs-prod contention recurs. The local build artifact is discarded (Vercel builds the real deploy), so nothing depends on it hitting prod.

**Standing costs to accept:** migration discipline (every new migration applied to BOTH projects — checklist line or small script), and free-tier auto-pause after ~1 week idle (a stale staging project fails the gate confusingly; weekly keep-alive ping or manual wake). Alternatives considered + rejected: Supabase Pro upgrade (pays prod capacity to absorb test traffic — wrong shape, just moves the cliff); prerendering from a build-time JSON snapshot (largest change, fights the data-driven page design).

### Frontend error monitoring (Sentry or equivalent)

Currently relying on Vercel function logs (server-side `console.error` paths) + Vercel Analytics (pageview counts, cookieless). Frontend exceptions don't surface anywhere. Consider Sentry only if noise picks up — premature otherwise.

### Health-check endpoint

Premature without an external uptime watch. Wire if and when an uptime monitor (Better Uptime, etc.) is configured.

### About / FAQ pages

Content rather than infrastructure. Could live under `/about` and `/faq`. Not load-bearing for the paper-builder use case.

---

## Education-data asset — verified reasoning corpus + eval benchmark (far-horizon strategic bet)

Captured 2026-06-14 from a strategy brainstorm. This is **forward-looking, mostly un-built, and explicitly gated on a demand signal** — not near-term product work. Don't pour net-new hours into Phase 2 / workstream (a) until a buyer signal exists.

**The thesis.** The durable, AI-proof asset under everything is the **verified, concept-tagged, solution-rich PYQ corpus** — because AI commoditizes *generating* plausible content but not *verifying* it, so verified ground truth is the scarce complement. Productize it three ways, in this order of monetization but reverse order of build-dependency:
- **(a) Content + assessment API / white-label to other coaching institutes** — the near-term *cash* (warm distribution via LWS's network; institutes have students but not content rigor). **Deferred by user.** This is what funds the rest.
- **(b) Reasoning-trace + rationale schema** — the *foundation*; turns every verified solution into structured fine-tune/eval data. Nearly free to start.
- **(c) Eval benchmark** (held-out slice of (b) + a scoring rubric) — *credibility/inbound, not direct revenue*. Built on (b).
- The existing apps (PYQ Vault, nda-tracker, English tutor, quizzes) are the **data flywheel** that fills the corpus.

**Grounded baseline (measured 2026-06-14):** 13,304 PUBLIC q (10,264 PYQ + 3,040 practice); **13,303 have a solution (~99.99%)**; only **~150 (~1.1%) carry garbling signals** (104 stripped-backslash LaTeX, 34 hedge/defect markers, 17 trivially-short, 1 control-char) — **all probe-detectable**; 26% concept-tagged (the noted chapters); **~230 documented key-flips** (in the Decisions log, not a structured column) = ready-made ground truth for the key-audit task. The bank is essentially *built*, so the asset is locked in the existing corpus — which is why a **retrofit** is warranted, not just going-forward capture.

### (b) The record schema + phasing

One canonical structured record per question (`schema-version b-1.0`): identity/taxonomy + `concept_slugs` + `stem`/`context`/`options` (no `is_correct` in the payload) + `verified_answer` + `provenance` (ingested vs verified key, flip date, method) + `reasoning_trace` (ordered steps) + `distractor_rationales` (per wrong option: the misconception) + `source_hash` (staleness key) + `phase` tag. Each record projects into: an **SFT row** (messages format) and four **eval items** — **T1 answer-accuracy**, **T2 reasoning-faithfulness**, **T3 misconception-diagnosis**, **T4 key-audit**. T3 + T4 are the differentiated, moat-using tasks only this corpus can build (everyone solves the exam; almost nobody diagnoses or audits).

**Storage (decided):** files, not tables, for the derivable part. Phase 0 records + eval/SFT sets = **JSONL exports** regenerated from a query (don't store what you can derive; `source_hash` flags staleness). The **only** new persistent object in Phase 0 is a small `key_flips` lookup (CSV or tiny table) holding the ~230 flips' `ingested_key`/`flipped_on`/`note`, since flip history isn't a column today. Generated content (traces, rationales) lands in **one new table `question_traces (question_id FK, reasoning_trace, distractor_rationales, statuses…)`** in Phase 1/2 — **never** new columns on `questions`/`options`, so the live app is untouched and the whole asset is `DROP`-reversible.

- **Phase 0 — pure projection (free, near-zero risk).** Deterministic SQL → JSONL. Unlocks **T1**, **T4** (via the `key_flips` lookup = "0b"), and a **raw-prose SFT corpus**. No LLM, no authoring, no writes. **Status: Step 1 validated 2026-06-14 on the Gravitation chapter — 17/17 records emitted clean, exactly-one-correct gate green, session/hash/tags all populated, escape-speed flip (`95e70f86`, B→A) demonstrated the 0b path end-to-end.** Not yet generalized to 13,304.
- **Phase 1 — structure the solutions (cheap, ~2–3 focused days).** An LLM pass structures the ~99%-clean `solution` prose into `reasoning_trace`; gates = **G1 trace-conclusion == verified_answer** (which doubles as a bank-wide stealth-wrong-key probe — likely catches a few more), **G2 LaTeX integrity** (auto-repair the 104 known), **G3 grounding/hallucination** (sampled), **G4 non-triviality**, **G5 no-leakage** (projection-time). Cost is sampling QA (~350 traces for an error bar) + the ~150-row long-tail, *not* per-row review. Unlocks **T2** + a clean SFT corpus. Bonus: doubles as a latent solution-quality audit of the live product.
- **Phase 2 — distractor rationales (expensive, GATED on demand).** Author + human-verify the per-distractor misconception for the **high-value slice only** (HARD + the ~230 flips + benchmark items), NOT all 13k — LLM-drafted rationales risk poisoning the moat with plausible-but-wrong labels, so verification is the real cost. Unlocks **T3**.

### (c) The benchmark (IVERA-STEM)

A manifest (tasks T1–T4 + splits + contamination policy) + a held-out test split + a scoring rubric (T3 judged 1.0/0.5/0.0 on misconception specificity; T4 = wrong-key detection + a false-flag penalty). **Publish a small dev split** (gets cited, becomes a reference) + **hold a private test split** (the leverage; naturally refilled by each new exam year *before* public release → structurally uncontaminated, a thing scraped benchmarks can never have). Budget it as marketing/optionality, not income. The held-out split must be hand-verified (don't trust the Phase-1 auto-pass there).

### Standing recommendation + the trap

**Do Phases 0–1 as a self-funding asset+audit pass** (cheap, reversible, hardens the live bank via the G1 wrong-key gate) — justified even before a buyer. **Gate Phase 2 and workstream (a) on a real demand signal** (one conversation with one partner institute: "would you pay for verified, concept-tagged banks + auto-grading under your brand?"). The recurring trap across this whole thesis: the seductive framing (knowledge graph / "education OS" / your own fine-tuned model) is always one expensive abstraction layer *above* the real advantage (verified content + pedagogy). Keep (b)/(c) only as thick as a consumer needs — the schema is "done" the moment it emits a valid SFT row + an eval item, not when it's an elegant ontology. Do **not** build a benchmark *platform*, a knowledge-graph schema, or a from-scratch model. Ruled out explicitly: foundation-model training (unwinnable treadmill / capex), third-party developer platform (chicken-and-egg), speculative knowledge graph (build only when a feature pulls it).

---

**Decisions-log style note**: when an item ships, move its entry from this file into the `CLAUDE.md` Decisions log (with a `2026-MM-DD —` prefix and a "Why" sentence). Don't let ROADMAP.md and the decisions log diverge.
