# NDA Paper II — General Ability Test · Mock Blueprint

**Standing reference. Read this file before building any NDA GAT mock paper.**
Do not re-derive the weightage from scratch and do not invent a syllabus-based split —
the numbers below are measured from the bank, and §12 records the SQL so a later session
can re-run them rather than guess.

- **Scope:** offline/printed mock, assembled by `scripts/bank-paper/build.ts` → Word download.
- **Not** the online `/mock` runner. That surface serves real papers whole ("use PYQPs as is",
  2026-07-10). A sampled paper is a separate product and must never be published as a
  `mock_tests` row alongside the 18 faithful GAT sittings.
- **Naming.** `NDA_GAT_PAPER` in `src/lib/mocks/blueprints.ts` already means something else —
  the *delivery* shape (duration, marking, sections) of a real paper. This file is a *content*
  blueprint. Keep the two words apart in code, exactly as `NDA_MATHS_BLUEPRINT.md` does for
  Paper I.
- **Direction matters.** `scripts/practice-paper/GAT_RULES.md` governs bringing a printed GAT
  paper **IN** to the bank. This file governs assembling one **OUT** of it. They share a
  subject and nothing else.

> **Why this file exists.** Until 2026-08-27 the GAT content blueprint lived only as prose
> comments on the last spec that used it, and was hand-copied forward: Mock 2's chapter list
> is a copy of Mock CDS-1's. Copying a spec copies its undocumented assumptions — §4, §7 and
> §8 below each record something that was load-bearing and written nowhere.

---

## 1. Paper spec (matches the real UPSC paper)

| | |
|---|---|
| Questions | 150 |
| Marks | 600 |
| Duration | 150 min |
| Marking | +4 correct, −1.33 (= 4/3) wrong |
| Format | MCQ, 4 options, exactly one correct |
| Sections | Part A — English (50) · Part B — General Knowledge (100) |

**The exported paper prints NO "Part A" / "Part B" heading, and that is a decision, not a
gap** (2026-08-27). Questions run 1..150 in section order and the split is implicit. Mocks
CDS-1, 2 and 3 all ship this way; do not "fix" it.

Part A prints before Part B. `build.ts` `layout: "sequential"` and the section order in
`sections[]` are what enforce it; `export-docx.ts` prints by (section's place in the
template, then position within it), because `paper_questions.position` restarts per section.

---

## 2. Where the rules live — do not restate them here

Three gates already encode the hard rules, and they are executable. This file points at them
so there is one copy of each rule, not two that can disagree.

| Rules | File | Enforced by |
|---|---|---|
| **R1–R9** — English section structure: stimulus vs directions sets, set atomicity, block size, contiguity, one exam's convention per block | `scripts/bank-paper/english.ts` | `auditEnglishSection`, blocking at `--apply` |
| **P1–P7** — question TEXT defects: statement run-on, match-list not a table, P./Q./R./S. run-on, figure-ref with no image, duplicated figure text, hand-wave solution, internal provenance leaking into a student-facing key | `scripts/bank-paper/paper-text.ts` | `auditPaperText`; P1–P4 + P7 blocking, P5–P6 reporting |
| **STRUCT / DUP_OPT / SOLN≠KEY** — objective option-set defects | `scripts/bank-paper/build.ts` `auditRows` | STRUCT + DUP auto-excluded; SOLN≠KEY **reported only**, human call |

Two of those distinctions are deliberate and should not be "tightened":

- **SOLN≠KEY is high-signal, not proof.** Auto-excluding it would silently drop correct
  questions whose solution dismisses a distractor by letter.
- **P5/P6 are non-blocking on purpose.** A duplicated figure description is sometimes the only
  thing making a question answerable, and "clearly" has legitimate uses no regex separates from
  a hand-wave. Marking them blocking trains people to skip the gate.

---

## 3. Subject allocation

Measured over all 18 sittings in the bank (2017-Apr … 2026-Apr, every one exactly 150 q).

| Subject | **Seats** | Last 3 sittings /paper | Lifetime /paper |
|---|---|---|---|
| English | **50** | 50.0 | 50.0 |
| Physics | **25** | 25.0 | 24.9 |
| Geography | **20** | 20.0 | 19.3 |
| Chemistry | **15** | 14.7 | 14.5 |
| History | **12** | 11.7 | **14.4** |
| Current Affairs | **11** | 11.3 | 10.0 |
| Biology | **10** | 9.7 | 10.5 |
| Polity | **6** | 6.3 | 5.0 |
| Economics | **1** | 1.3 | 1.3 |
| | **150** | 150.0 | 150.1 |

Both columns sum to 150, so neither is a rounding artefact.

**Seats are the last-3 window rounded.** The one large divergence is real and recent:
**History has fallen 14.4 → 11.7 per paper**, with Polity (5.0 → 6.3) and Current Affairs
(10.0 → 11.3) absorbing it. Keep the seats on the recent window; the lifetime column is here
so the drift stays visible rather than being rediscovered as a "bug" in the allocation.

---

## 4. THE TWO-WINDOW RULE — subject seats and chapter seats use different windows

This is the assumption that was written nowhere, and the one most likely to be mistaken for an
error later.

- **Subject seats (§3) reproduce from the LAST-3 window.** All nine, exactly.
- **Chapter seats (§5) reproduce from the LIFETIME window**, taken as each chapter's *share*
  of its subject, scaled to that subject's seat total, with the rounding residual assigned to
  the largest remainder. Verified for Geography, History and Polity; Economics is a
  single-chapter subject with nothing to allocate.

It is defensible — a subject's total is a structural fact about the current paper pattern,
while a chapter's share is noisy at n=3 and a lifetime share is the steadier estimator. But it
must be **stated**, because the two windows disagree loudly in places (History Modern India is
6.8 lifetime against 4.0 recent) and a reader checking chapter seats against §3's window will
conclude the spec is wrong.

**If you change one window, change both or say why.**

---

## 5. Chapter allocation — subjects drawn from NDA PYQ directly

### Geography — 20

| Chapter | Seats | Last-3 | Lifetime |
|---|---|---|---|
| Indian Geography — Economy, Resources and Transport | 5 | 5.0 | 4.5 |
| Earth's Structure, Landforms and Geological Time | 4 | 5.7 | 4.1 |
| Indian Geography — Physical Features | 4 | 2.0 | 3.7 |
| Climatology, Atmosphere and Weather | 3 | 4.3 | 3.3 |
| World and Human Geography | 2 | **0.0** | 1.4 |
| Earth in Space, Maps and Coordinates | 1 | 1.0 | 1.2 |
| Oceanography | 1 | 2.0 | 1.1 |

⚠ **World and Human Geography has not been asked in the last three sittings** and holds 2 seats
on its lifetime share. That is the two-window rule at its least comfortable. Defensible (it ran
1.4/paper for a decade and 2026 is one sitting), but if it stays at zero through 2026-Sep, move
its seats to Earth's Structure, which is running 5.7 against 4 seats.

### History — 12

| Chapter | Seats | Last-3 | Lifetime |
|---|---|---|---|
| Modern India | 6 | 4.0 | 6.8 |
| Medieval India | 2 | 2.3 | 2.9 |
| Ancient India | 2 | 3.0 | 2.4 |
| World History | 2 | 2.3 | 2.3 |

### Polity — 6

| Chapter | Seats | Last-3 | Lifetime |
|---|---|---|---|
| Government Structure — Parliament, Judiciary and Constitutional Bodies | 2 | 2.7 | 2.0 |
| Fundamental Rights, DPSP and Local Governance | 2 | 1.0 | 1.2 |
| Indian Constitution — Making, Foundation and Amendments | 1 | 1.0 | 1.1 |
| World Polity, Democracy and International Relations | 1 | 1.7 | 0.7 |

### Economics — 1

Indian Economy, 1 seat (1.3 / 1.3). The subject is one chapter; nothing to allocate.

---

## 6. Chapter allocation — subjects drawn from the Foundation Course

Physics, Chemistry and Biology are filed under **Foundation Course (Class 9/10 NCERT) chapter
names**, which are a *different taxonomy* from the NDA chapters the weightage is measured in.
So the allocation is a hand-authored MAPPING, and until now it existed only inside the seat
labels — `(incl. the Oscillations seat)`, `(+ the Fluids seat: thrust, pressure, buoyancy)`,
`(+ the Bonding seat)`, `(+ a Plant Biology seat)`. **Those parentheticals are load-bearing.
Do not "tidy" them out of a spec.** The mapping is promoted here so it survives a rename.

### Physics — 25

| NDA chapter (last-3 / lifetime) | Seat holder | Seats |
|---|---|---|
| Light and Optics 5.3 / 5.4 | Light – Reflection and Refraction **3** + The Human Eye and the Colourful World **3** | 6 |
| Electricity and Magnetism 4.3 / 5.2 | Electricity **3** + Magnetic Effects of Electric Current **3** | 6 |
| Sound 1.3 / 1.9 **+** Oscillations and Waves 0.7 / 0.7 | Sound *(incl. the Oscillations seat)* | 3 |
| Heat and Thermodynamics 3.0 / 2.2 | *NDA PYQ* — Heat and Thermodynamics | 2 |
| Laws of Motion and Forces 2.7 / 2.3 | Force and Laws of Motion | 2 |
| Gravitation 1.0 / 0.9 **+** Fluid Mechanics 1.7 / 1.3 | Gravitation *(+ the Fluids seat)* | 2 |
| Modern Physics 0.3 / 1.4 | *NDA PYQ* — Modern Physics | 2 |
| Work, Energy and Power 2.3 / 1.3 | Work and Energy | 1 |
| Kinematics and Motion 1.0 / 1.3 | Motion | 1 |
| Units, Measurement and Dimensions 0.7 / 0.8 | — | **0** |
| Astronomy and Space 0.3 · Energy Sources 0.3 | — | **0** |

Heat and Modern Physics come from **NDA PYQ, not Foundation** — no Class 9/10 chapter covers
them, and unlike the Foundation rows those already carry worked solutions.

### Chemistry — 15

| NDA chapter (last-3 / lifetime) | Seat holder | Seats |
|---|---|---|
| Industrial and Applied Chemistry 2.3 / 1.5 **+** Metals and Non-Metals 0.0 / 0.9 | Metals and Non-metals *(+ the Industrial seats)* | 3 |
| Carbon and Its Compounds 1.7 / 2.5 **+** Chemical Bonding 0.3 / 0.6 | Carbon and Its Compounds *(+ the Bonding seat)* | 3 |
| Atomic Structure and Periodic Classification 2.0 / 1.9 | Structure of the Atom | 2 |
| Acids, Bases and Salts 2.0 / 1.8 | Acids, Bases and Salts | 2 |
| Matter and Its States 2.0 / 1.7 | Matter in Our Surroundings | 2 |
| Chemical Reactions 2.3 / 1.7 | Chemical Reactions and Equations | 2 |
| Hydrogen and Water 0.7 / 0.6 | *NDA PYQ* — Hydrogen and Water | 1 |
| Chemistry in Everyday Life 0.7 · Mole Concept and Stoichiometry 0.7 · Practical Chemistry 0.0 | — | **0** |

### Biology — 10

| NDA chapter (last-3 / lifetime) | Seat holder | Seats |
|---|---|---|
| Human Physiology 4.7 / 2.9 | Life Processes **3** + Control and Coordination **1** | 4 |
| Cell Biology 1.0 / 2.4 | The Fundamental Unit of Life | 2 |
| Plant Biology 1.3 / 1.6 | Tissues **2** — *and one of Life Processes' 3 above* | 2 |
| Reproduction 0.3 / 0.7 | How Do Organisms Reproduce | 1 |
| Ecology and Environment 0.0 / 0.6 **+** Biodiversity and Classification 0.0 / 0.6 | Our Environment | 1 |
| **Microbiology and Disease 1.0 / 1.2** | — | **0** |
| Genetics and Evolution 0.7 / 0.2 · Biochemistry 0.7 / 0.2 | — | **0** |

The seats column sums to 10 and the seat holders are exact, but **the mapping is many-to-many
here in a way it is not elsewhere**: Life Processes' 3 seats carry Human Physiology *and* a
Plant Biology seat, and Tissues has no NDA counterpart chapter of its own — it exists to hold
Plant Biology and Cell Biology weight. Mock 2's labels say so (`BIO Life Processes (+ a Plant
Biology seat)`, `BIO Tissues (+ a Plant Biology seat)`); read the NDA-weight column as
indicative and the seat-holder column as authoritative.

Biology comes from the Foundation Course because **the NDA Biology PYQ corpus (189 rows) is
fully consumed** by three chapter-drill papers built 30 Jul – 5 Aug 2026. Its free supply is
zero and will stay zero.

---

## 7. English — 50

### 7a. The mix ROTATES. Do not build to the mean.

Per-sitting counts by chapter. 2026 is one sitting; every other year is two.

| Chapter | 2026 | 2025 | 2024 | 2023 | 2022 | Last-3 | Lifetime |
|---|---|---|---|---|---|---|---|
| Grammar | 18 | 20 | 15 | **0** | **0** | 19.3 | 6.0 |
| Vocabulary | 21 | 15 | 10 | 22.5 | 20 | 17.0 | 17.6 |
| Sentence Rearrangement | **0** | 10 | 5 | 5 | 10 | 6.7 | 6.3 |
| Reading Comprehension | **0** | 5 | 5 | 2.5 | **0** | 3.3 | 3.4 |
| Idioms and Phrases | 6 | **0** | 5 | 5 | 10 | 2.0 | 4.8 |
| Spotting Errors | 5 | **0** | **0** | 10 | 10 | 1.7 | 6.4 |
| Cloze Test | **0** | **0** | 10 | **0** | **0** | 0.0 | 2.5 |
| Fill in the Blanks | **0** | **0** | **0** | 5 | **0** | 0.0 | 3.1 |
| | 50 | 50 | 50 | 50 | 50 | 50.0 | 50.1 |

**Only Vocabulary appears in every sitting.** Grammar did not exist in the paper in 2022 or
2023 and is now the largest chapter. Cloze appeared in 2024 and in no other year of the window.
Spotting Errors ran 10/paper, vanished for two years, and returned at 5 in 2026.

> **THE RULE THAT FOLLOWS: build English to imitate ONE plausible sitting, not the average of
> sittings.** The mean would seat Cloze (2.5), Fill in the Blanks (3.1), Spotting Errors (6.4)
> *and* Grammar (6.0) simultaneously — a paper that has never existed. This is the opposite of
> §4's advice for General Knowledge, and the difference is real: GK chapter shares are stable
> and English chapter shares are not.
>
> Mock 2's Cloze-10 block is legitimate on exactly this ground — it mirrors the 2024 sittings,
> which ran Cloze 10 with no separate Reading Comprehension block.

### 7b. Block structure

English is selected by **`blocks` (whole directions sets), never by difficulty quota.** A
per-question pick scatters the sets and `auditEnglishSection` refuses the apply — the difficulty
sweep is exactly what tore the sets apart in the 2026-08-21 mock.

- Real GAT English block sizes: **2, 3, 5, 5, 5, 5, 5, 5, 10** — modal 5, never 1.
  Target **7–10 blocks** for 50 questions.
- `MIN_BLOCK_SIZE = 2` (R4). A one-question block prints a directions paragraph to ask a
  single question.
- A **shared-PASSAGE** set (Reading Comprehension, Cloze) is **atomic** — omit `take` so the
  whole set is drawn (R2). Taking 2 of a 5-question passage means a candidate reads the whole
  passage for 2 marks.
- A **directions-only** set (everything else) may be partially drawn with `take`.
- R1 tells the two apart **by chapter, not by context length** — deliberately, so expanding an
  instructions block can never silently reclassify a directions line as a passage.

---

## 8. Corpus choices, and what forced each

| Section | Corpus | Why it is not NDA PYQ |
|---|---|---|
| English | **CDS** (`includePrivate`, `requireConfirmedReview`) | Originally forced by the HARD-only mock: NDA English has almost no HARD rows. **Carried forward into Mocks CDS-1, 2 and 3 for continuity — see the warning below.** |
| Biology | Foundation Course | NDA Biology PYQ free supply is **zero** (§6). |
| Physics, Chemistry | Foundation Course + NDA for uncovered chapters | Foundation is the right level for GAT science; NDA fills Heat, Modern Physics, Hydrogen and Water. |
| Current Affairs | Current-year authored pool | **A PYQ from 2019 asks about 2019 facts.** `/guide/nda-current-affairs` measured that 90% of explicit-year mentions fall within 12 months of the paper, so the bank calibrates question SHAPE and the facts must be current. |
| Geography, History, Polity, Economics | NDA PYQ | Deep, audited, carries the paper-setter's own key. |

### ⚠ 8a. The English corpus decision is a standing risk, recorded

The CDS gate reads `question_reviews` run `bank-paper:cds-english-blind-2026-08-23`. CLAUDE.md's
2026-08-25 entry records that **a blind re-derivation structurally cannot catch the dominant CDS
defect** — a transcriber copying the correct option's text into the wrong letter's slot — and
that one of that run's 89 confirmations was subsequently disproved from the printed page. The
remaining rows of that run should be treated as unverified.

**The alternative, measured 2026-08-27 and left on the table:** NDA English PYQ has **1,916 free
rows across 117 unused directions blocks of ≥5**, and **52 of 57 free Reading Comprehension rows
carry a real stored passage** (against CDS, where 83% of RC has no passage at all). Those carry
UPSC's own printed key. Switching would restore the RC block Mock 2 had to drop, remove the
review-gate starvation entirely, and supply many further mocks.

CDS was reaffirmed for Mock 3. Revisit before Mock 4 — §9 shows it cannot survive one.

### ⚠ 8b. `kinds: ["practice"]` does NOT pin the Current Affairs pool

There are **21 distinct practice `source_file`s** in NDA Current Affairs. Only
`Current Affairs_Sep26.docx` (88 PUBLIC, 59 free) is the current-year pool; the rest are CA
questions harvested from older mocks and books, and several are genuinely stale.

`ChapterPlan` has no source filter, so a spec comment naming the pool asserts an intent the code
cannot enforce. **Measured consequence: Mock 2's 11 Current Affairs picks are 8 from the Sep-26
pool and 3 from `NDA_GAT_MOCK_W1.docx`**, despite its comment stating the pool outright. Those
three are from a 2026 LWS mock so their content is probably fine — but nothing stopped an
Oswaal-book CA row being drawn instead, and there are over 100 free.

Either add a `sourceFile` filter to `ChapterPlan`, or verify the CA picks by `source_file` after
every dry run. Do not trust the comment.

---

## 9. Supply ledger — measured 2026-08-27

`build.ts` excludes any question already used in **any** paper in the org, so each mock lands
disjoint from its predecessors automatically. What remains:

**Comfortable.** Geography 286 free NDA PYQ · History 224 · Polity 71 · Economics 16 ·
Current Affairs 59 in the current pool · NDA Physics Heat 30 / Modern 21 · NDA Chemistry
Hydrogen and Water 8.

**Tight — Foundation Course, free AND confirmed.** Physics 47 for 21 seats · Chemistry 23 for
14 · Biology 22 for 10. Enough for Mock 3, and the pool is now **HARD-skewed**: Mocks CDS-1
and 2 drew its EASY and MODERATE rows, and 8 chapters have **zero MODERATE left**.

> **Consequence for the spec: use `take:` not `quota:` on Foundation chapters.** A `quota`
> reports a shortfall against a difficulty that no longer exists; `take` spends against the
> paper's `shape` and substitutes. Copying Mock 2's quota entries verbatim under-fills roughly
> eleven of them.

**Zero slack — three chapters sit at exactly their seat count.** One STRUCT/DUP refusal in any
of these and that subject lands short:

| Chapter | Free confirmed | Seats |
|---|---|---|
| Force and Laws of Motion | 2 | 2 |
| Structure of the Atom | 2 | 2 |
| The Fundamental Unit of Life | 2 | 2 |

**⚠ English is exhausted after Mock 3.** Free AND confirmed CDS English, in blocks of ≥3:

| Chapter | Blocks | Rows |
|---|---|---|
| Vocabulary | 4 (5,5,5,3) | 18 |
| Idioms and Phrases | 2 (5,5) | 10 |
| Cloze Test | 1 (8) | 8 |
| Grammar | 2 (5,3) | 8 |
| Sentence Rearrangement | 1 (3) | 3 |
| Spotting Errors | 1 (3) | 3 |
| **Total** | **11 blocks** | **50** |

**Exactly 50 rows for 50 seats, with no margin**, plus ~10 more stranded in blocks of 1–2 that
R4 forbids printing. Mock CDS-1 already lost 2 rows of a block to the duplicate-option audit;
one such hit here puts the section at 49. The resulting mix is also distorted against §7a —
Idioms at 10 against a real 2.0–4.8, Grammar at 8 against 19.3 recent, no Reading Comprehension.
11 blocks is one over the real paper's 7–10.

**After Mock 3 there is no confirmed CDS English left.** Mock 4 must either run a fresh blind
pass, adopt NDA English (§8a), or do the transcription-fidelity check CLAUDE.md names as the
control that actually works for this corpus — comparing the option **set** against the printed
page and, separately, the label→text **order**.

---

## 10. Uncovered weightage — two kinds, and only one is cheap to fix

Roughly 1.1 seats/paper of Physics, 1.3 of Chemistry and 2.4 of Biology have no seat at all.
The distinction below decides what to do about it.

**Structural — no chapter exists in the bank.** Needs an ingest, not a spec change.

- **Biology · Microbiology and Disease — 1.2/paper, the largest uncovered chapter in the GK
  half.** No Foundation counterpart; Class 9's *Why Do We Fall Ill* was never ingested.
- Physics · Units, Measurement and Dimensions (0.8), Astronomy and Space (0.2), Energy Sources (0.1).
- Chemistry · Practical Chemistry (0.2).

**Gate-only — the chapter exists with ample rows, and `requireConfirmedReview` is the only
thing blocking it.** A blind pass with the existing `scripts/bank-paper/dump-gk-blind.ts` opens
all three:

| Chapter | PUBLIC rows | Free confirmed | Would cover |
|---|---|---|---|
| Biology · Heredity and Evolution | 56 | **0** | Genetics and Evolution 0.7 |
| Chemistry · Atoms and Molecules | 58 | **0** | Mole Concept and Stoichiometry 0.7 |
| Chemistry · Is Matter Around Us Pure | 69 | **0** | Chemistry in Everyday Life 0.7 |

Doing that pass is also the cheapest way to relieve the three zero-slack chapters in §9.

---

## 11. Build procedure

```sh
# 1. Add a PaperSpec to PAPERS in scripts/bank-paper/build.ts, citing this file.
# 2. Dry run — the default. Prints the exact rows --apply would add, plus the
#    structural key audit, the English structure audit and the text audit.
npx tsx scripts/bank-paper/build.ts nda-gat-lws-mock-3

# 3. Read the report before applying:
#    - any SHORTFALL           -> a quota met a difficulty that no longer exists (§9)
#    - any R1-R9 violation     -> English structure; blocking
#    - any P1-P4/P7 violation  -> text defect; blocking
#    - SOLN≠KEY / P5 / P6      -> reported; adjudicate by hand, do not auto-drop
#    - Current Affairs picks   -> verify by source_file (§8b)

npx tsx scripts/bank-paper/build.ts nda-gat-lws-mock-3 --apply

# 4. Word paper + answer key (the same builders as the /browse download).
npx tsx scripts/bank-paper/export-docx.ts <paperId> NDA_GAT_LWS_Mock_3
```

Selection is deterministic (stable id order, no `Math.random`), so the dry run is truthful
rather than indicative. The build is idempotent: the paper is reused if one with the same title
exists, and `addQuestion` upserts on (paper, question).

---

## 12. Method — so the numbers can be re-measured, not trusted

Every figure in §3, §5, §6 and §7a comes from the bank. The windows are:

- **Lifetime** = all 18 sittings, `pyq_year is not null`, divided by 18.
- **Last-3** = `pyq_year >= 2025`, divided by 3. That is exactly 2025-Apr, 2025-Sep and
  2026-Apr — verify the sitting count before reusing the divisor, because a new sitting lands
  every six months and the divisor is not automatic.

```sql
-- Subject allocation (§3)
select s.name,
  round(count(*) filter (where q.pyq_year >= 2025)::numeric / 3, 1) as last3,
  round(count(*)::numeric / 18, 1) as lifetime
from questions q
join chapters c on c.id = q.chapter_id
join subjects s on s.id = c.subject_id
join exams e on e.id = s.exam_id
where e.name = 'NDA' and q.question_kind = 'pyq'
  and s.name <> 'Mathematics' and q.pyq_year is not null
group by 1 order by 2 desc;

-- Chapter allocation (§5, §6, §7a): same query, add `c.name` to select and group by.
-- English rotation (§7a): pivot on q.pyq_year and divide by that year's sitting count.
```

**A note on the previous figures.** The English chapter weightage recorded in the Mock CDS-1
spec comment (Grammar 17.6, Vocabulary 14.2, Rearrangement 6.0, RC 4.0, Idioms 3.2, Spotting
1.0) does **not** reproduce from the bank for its stated window, and sums to 46 rather than 50.
§7a supersedes it. This is the reason §12 exists: a weightage figure with no recorded query
cannot be checked, and this one turned out not to survive checking.
