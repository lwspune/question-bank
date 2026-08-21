# CBSE Class-12 Maths — board PYQ ingestion

CBSE's own past board question papers for Class-12 Mathematics (code 041),
2022–2026, into `question_kind='pyq'` rows on the **existing `cbse-12` exam and
its existing 13 chapters** — beside the NCERT textbook corpus that
`scripts/ncert/` put there, separated on `/browse` by the PYQ/Practice toggle.
The `mh-hsc-12-pyq` / `mh-ssc-10-text` shape.

**`practiceOnly` comes off the `cbse-12` registry entry when the first rows go
PUBLIC** — not before, or the exam advertises a PYQ view that is still empty.

---

## What makes this ingest different from its three predecessors

`mh-ssc-10`, `mh-sb-9` and `mh-hsc-12` all ship **no answer key**, so every
answer there is derived and the end-of-source cross-check gate cannot run.

Here **CBSE publishes an official marking scheme, paired 1:1 with every paper**,
carrying the answer and step-wise working. Section-A answers are transcribed from
it verbatim, never derived, and the gate that compares our answers to CBSE's own
can actually run. That is the single biggest quality difference — use it.

---

## Source

Both halves come from CBSE, and the archive covers exactly 2022–2026:

```
https://www.cbse.gov.in/cbsenew/question-paper/<year>/XII/…zip
https://www.cbse.gov.in/cbsenew/Marking-Scheme/<year>/XII/…zip
```

Unpacked to `C:\tmp\PYQPs\CBSE\XII\Mathematics\<year>\{qp,ms}\`.

**78 regular papers** — 5–6 series × 3 sets per year. Excluded: five `65(B)`
visually-impaired papers, a separately adapted question set. The 2024 ZIP also
ships three papers **twice under two filenames each**, byte-identical; dedup by
file hash, never by name (`papers.ts` does).

---

## Four measured properties

1. **Vision only, all five years — and for 2026 that is measured, not assumed.**
   2022–2025 papers have a zero-character text layer. 2026 is born-digital and
   looks clean at ~18k chars of English, yet `√`, `∫` and `π` each occur **zero**
   times and a question *about transposes* extracts with every prime gone. Scan
   quality is otherwise excellent — crisp typeset, not photocopy.
2. **Bilingual**, Hindi and English on **alternating pages** (page 4 is the Hindi
   of page 5). English only — a translation can never dedup against the real
   English stem, since `content_hash` is stem-derived.
3. **Two paper patterns.** 2023–2026 is 38 questions / 80 marks / five sections.
   **2022 is the COVID Term-2 paper** — 14 questions / 40 marks / three sections
   and **no MCQs at all**, so the blind-MCQ control is unavailable for those 15
   papers. `patternForYear` THROWS for an unmeasured year rather than defaulting.
4. **Sets are not interchangeable.** Cross-series overlap is ~0 (3 shared blocks
   across all 15 pairs of 2025); within a series the three sets overlap anywhere
   from **8% to 55%**. No single assumption covers that spread.

---

## Dedup: two stages, and only the first is automatic

CBSE's marking schemes embed each question as a discrete image, and a reused
question is **byte-identical** across sets. A SHA-256 match is therefore evidence
of reuse, not a similarity guess — which is what makes a *pre*-transcription
filter safe here where an OCR-fingerprint filter would not be.

> ⚠ **CORRECTED 2026-08-19 — a hash match proves the same IMAGE, not the same
> QUESTION.** This was originally written as proof of question identity. CBSE has
> been observed pasting a sibling set's question block into the wrong marking
> scheme: `2024 65/4/2` ms p10 prints 65/4/1's Q30 (`Max Z = 2x + 3y`, `x + y ≤ 6`)
> above a worked solution that solves 65/4/2's ACTUAL Q30 (`Max Z = x + 3y`,
> `x + 2y ≤ 200`). The question paper, the Hindi mirror and the MS *solution* all
> agree with each other; only the pasted question image is wrong.
>
> Consequence: **the question paper is the authority, never the marking scheme's
> question block.** The safety net held here only because agents are required to
> content-verify every skip against their own page — a pipeline that auto-skipped
> on the hash alone would have shipped the wrong stem under this question number.

| Stage | Signal | Action | Found |
|---|---|---|---|
| 1 | exact SHA-256 | auto-skip | 770 |
| 2 | perceptual / text similarity | **reviewed ledger, never auto-skip** | 120 |

Validated three ways before being trusted: visually (a block is one whole
question *including* its options), by yield, and by **correctness** — across the
27 questions appearing in more than one 65/5 set the official answers **agree 14,
disagree 0**.

Stage 2 is not optional tidying: series **65/1 and 65/4 re-encode their images**,
so exact hashing under-detects there (15 and 11 extra pairs, vs 1–2 elsewhere).
Its design follows `scripts/mh-hsc-12-pyq/dedupe.ts`, whose header records why a
bare threshold is not enough.

**Totals: 2,861 raw blocks → 1,971 unique (31% removed). Zero cross-YEAR reuse.**

### ⚠ The index's power varies ENORMOUSLY by series — measured, 2025

Byte-hashing only detects a duplicate when CBSE reuses the *same typeset block*.
Some series re-typeset the marking scheme between sets, and there the hash sees
almost nothing:

| Series | index predicted NEW | agent found NEW (by content) | index verdict |
|---|---|---|---|
| 65/2 | 12 | 12 | accurate |
| 65/1 | 40 | **14** | 26 false "new" |
| 65/4 | 36 | **14** | 22 false "new" |

So a low exact-unique count does **not** mean a series has little internal reuse —
it may mean the publisher re-typeset it. An earlier reading of the whole-year
numbers concluded "series 65/1 barely reuses anything within itself"; that was
**wrong**, and only the agents' content-matching revealed it. 65/1/2 reuses 38 of
its 52 rows.

The error direction is safe (over-transcribing, never wrongly skipping), but the
effort estimate can be off by 3x. **Treat `plan.txt` as a COUNT, not a map, and
never as a coverage claim** — its per-question labels have been wrong on every
series checked.

> ⚠ **The image index is a DEDUP TOOL, not a question inventory.** It covers ~87%
> of items. Numbering and the authoritative item list come from the PAPERS. An
> item the index misses is simply transcribed and caught by stage 2 — the safe
> direction, and the reason it may run before transcription at all.

#### 2026: a low match count NEVER means "different questions"

Three of 2026's five series show a low exact-match count. The obvious reading -
that CBSE set different questions - is wrong on all three, and I shipped it before
checking.

| series | blocks | sha match | dHash adds | ACTUALLY shared (by content) |
|---|---|---|---|---|
| 65/1 | 48 | 28, 33 | 2, 1 | **41** of 55 |
| 65/2 | 47 | 33, 33 | 0, 0 | **41** of 54 |
| 65/3 | 44 | 3, 3 | 2, 2 | **41** of 54 |
| 65/4 | **18** | 0, 0 | 4, 4 | **41** of 52 |
| 65/5 | 50 | 4, 4 | 4, 4 | **41** of 52 |

**All ten followers share EXACTLY 41 rows with their opener** - not approximately,
exactly, in every one of the five series. Each set reuses 41 questions and swaps
the remainder (11 to 14 rows, the spread being how many OR-branches that paper
carries). Every 2026 series is a reshuffle; none contains genuinely different
questions.

Measured two ways that agree: an independent (stem, options, context) comparison
over the JSON, and `commit.ts`'s own `content_hash` dedup, which skipped 41 on
every follower. 124 genuinely new rows across the ten papers.

> ### HOW I GOT THIS WRONG: a positional sample cannot detect a permutation
>
> I rendered the FIRST SIX question blocks of 65/3/1 and 65/3/2 side by side, saw
> no overlap at all, and concluded the sets were different papers. I then wrote it
> into this file, into a commit message, and into the dispatch for four agents.
>
> The sets are RESHUFFLED. Comparing block 1 against block 1 and block 2 against
> block 2 can only find a match by coincidence - the agent that transcribed
> 65/3/2 said so in as many words, and measured 30 shared rows where I had claimed
> zero. The comparison felt decisive because I was looking at real pages; it was
> decisive about nothing, because it tested the wrong pairs.
>
> Same shape as the id-permutation hazard the sibling pipelines guard against: a
> check that passes a permutation perfectly is not a check. An all-pairs
> comparison is the cheap fix, and it is what the dHash pass already does - it
> simply is not sensitive enough (it recovered 2 of 30 here, 4 of 41 on 65/5).
>
> A postscript on trusting a reported COUNT over a reported LIST. The 65/3/2 agent
> said "30 of 54 shared" and this file quoted it. The true figure is 41 - but the
> agent's LIST of which rows were new was exactly right, all 13 refs matching an
> independent recomputation. Its identification was perfect and only its
> arithmetic was wrong. Check a summary number against the artifact it summarises;
> here `commit.ts` skipping 41 is what exposed it.
>
> I made the same generalisation error twice more in one session: extending this
> 65/3 reading to 65/5 without rendering it, and calling 2026's instruction (viii)
> a year-level property from one paper. In this source almost nothing is
> year-level. Measure the paper in hand.

**How to tell them apart: you cannot, from the hashes.** `plan_paper.py` reports
both counts and flags a partially-blind index, and that is the limit of what it
knows. It distinguishes "the index can see this paper" from "the index cannot",
which is worth having - but it can never tell you how much content is shared.
Only reading the questions does that, which is why every follower agent is told
to match against the opener's JSON and to report the overlap it found.

A perceptual hit is never a skip. Two different questions set in one typeface at
one width genuinely look alike, so only the byte-hash may say "already covered";
the perceptual pass only says "go and read this one". Transcribing a true
duplicate anyway is free — `content_hash` collapses it at commit.

---

## The lane

```
python scripts/cbse-12-pyq/prep.py 2025 65-5-2 --against 65-5-1
      → out/2025-65-5-2/{pNN.png, ms/pNN.png, plan.txt, contact.png}

[transcription agent, against TRANSCRIPTION_BRIEF.md]
      → data/2025-65-5-2.questions.json

npx tsx scripts/cbse-12-pyq/validate.ts 2025-65-5-2     # must pass
npx tsx scripts/cbse-12-pyq/commit.ts   2025-65-5-2 --apply
```

Supporting tools:

| | |
|---|---|
| `papers.ts --check` | discovers all 78 papers, validates codes, pairs marking schemes |
| `dedup_index.py --write` | whole-corpus duplicate index |
| `plan_paper.py` | per-paper skip list — turns the index into a work plan |
| `lib.ts` | pure core: `parsePaperCode`, paper patterns, `sectionForQuestion` |

Then the solution lane:

```
npx tsx scripts/cbse-12-pyq/dump-solutions.ts  2025-65-5-2
[solution agent, against SOLUTION_BRIEF.md]     → fills data/2025-65-5-2.topaper.json
npx tsx scripts/cbse-12-pyq/apply-solutions.ts 2025-65-5-2 --apply
npx tsx scripts/cbse-12-pyq/audit-keys.ts      2025        # structural, zero-LLM
npx tsx scripts/cbse-12-pyq/audit-omml.ts                  # Word-export gate
```

**RE-DUMPING A PAPER DROPS ITS ALREADY-APPLIED ROWS, and that is deliberate** —
78 papers print 3,519 questions across only 1,766 distinct rows, so omitting a
question solved from a sibling series is what keeps the job finite. The
consequence is that a re-dumped `.topaper.json` is no longer a complete archive
of that paper's solutions: for those rows the **DB is the live copy**, and git
history holds the text as authored. `--all` re-emits every row, but always with
an EMPTY `solution` — it is a fresh work file, not a restore. (`apply-solutions`
skips blank rows, so re-running it can never blank a stored solution.)

`audit-omml.ts` is local rather than the shared `npm run audit:omml` because that
one filters with `ilike source_file` over a wide row shape ordered by id — no
index applies, so Postgres sorts all ~49k rows to return this subset and dies on
a statement timeout. Filtering on `exam_id` rides `questions_filter_idx`. It
reuses `findOmmlFailures` verbatim, so it cannot disagree with the exporter.

---

## Hazards that have already bitten

- **The commit leaves a PUBLIC window.** `commitStaged` inserts at the table
  default, PUBLIC since migration 0022; the flip to PRIVATE happens after. On the
  pilot that flip hit a statement timeout and left 52 unreviewed rows publicly
  visible. `commit.ts` now flips **by primary key** (`source_file` is UNINDEXED —
  a Seq Scan over 55k rows to find 52), retries, and **verifies by reading back**
  rather than inferring success from the absence of an error.
- **Re-commit orphans rows.** `content_hash` covers stem + options + answer.
  Editing any of those inserts a NEW row and orphans the old; delete by
  `source_file` first. Editing only `solution` is safe. **`context` is the
  exception** — `subjectiveContentHash` is context-aware, so editing a case
  study's shared passage moves its sub-parts' identity too.
- **Chapter names auto-create.** A misspelling silently forks the corpus rather
  than failing. `validate.ts` checks against the LIVE axis.
- **Never hand-roll a literal-`\n` check.** Use `normalizeNewlines`. A `/\\n/`
  regex fires on `\neq`, `\notin`, `\nabla` and matrix `\\` separators — this
  validator did exactly that and reported three phantom defects on first run.
- **Never author JSON through a shell heredoc.** The shell eats one backslash and
  `\theta` arrives as a TAB.

---

## Per-year variation — measured, and almost none of it is per-YEAR

The five years share the `full80` section structure but differ in ways that must
be read off each paper. The heading is deliberate: nearly every property that
looks like a year-level fact turned out to be a **series**-level one, and 2026 is
where that became unmistakable.

| | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|
| Pattern | **term2** (14 q / 40 marks, NO MCQs) | full80 | full80 | full80 | full80 |
| Option labels | — | lowercase, **except 65/2 which is uppercase** | uppercase | uppercase | uppercase (65/1, 65/2, 65/4 confirmed) |
| Case-study headings | — | printed (some sets ROMAN, `Case Study-I`) | varies by series | varies by series | **65/4 prints `Case Study – N`; 65/1 and 65/2 print NONE** |
| Decimal points | — | raised in QP, ordinary in MS | ordinary | varies by series; 65/5 QP and MS disagree | 65/4 raised; **65/1 and 65/2 print no decimal at all** |
| Instruction (viii) | — | explicit counts | explicit counts; **65/4 gives TEN pairs** | explicit counts (nine) | **65/1, 65/2 give NO counts; 65/3, 65/4, 65/5 do** |

### Instruction (viii) in 2026 — read off all five openers

| series | wording | internal choices |
|---|---|---|
| 65/1, 65/2 | "an internal choice has been provided **in few questions in all the Sections except Section – A**" | none stated; **10** found by reading |
| 65/3 | 2 in B, 3 in C, 2 in D, **3 in E** | 10 |
| 65/4, 65/5 | 2 in B, 3 in C, 2 in D, **2 in E** | 9 |

Where counts are printed they matched what the agents found by reading, on every
paper. Two typesetters are visible across the year — 65/1 and 65/2 print
`SECTION – A` and "This section comprises **20** Multiple Choice Questions",
65/3–65/5 print `SECTION A`. That split lines up with which series the byte-hash
index can see: 65/1 and 65/2 match 28–33 blocks against their openers, 65/3 and
65/5 only 3–4 — while all four in fact share 30–41 rows. The typesetting explains
the index's blindness, not any difference in the questions.

### The check that does NOT work

Primary-branch marks summing to 80 is real and it is **blind to a missed
OR-alternative**, because an alternative is not a primary branch: dropping one
loses a row without moving the total by a mark. It catches a dropped or
mis-banded QUESTION and nothing else. Where instruction (viii) prints counts they
are the check; where it does not, walk the marking scheme question by question —
it reprints both branches. (This was found by the agent on 2026 65/1/1, against an
earlier brief that offered the sum as *the* check.)

All five 2026 openers reconcile to exactly 80 (A 20 · B 10 · C 18 · D 20 · E 12)
and their OR counts match their own printed instruction — 10, 10, 10, 9, 9.

**Practical rule: inherit nothing across papers.** Read option-label case,
case-study headings, decimal style and instruction (viii) off the paper in hand,
and report them, even when the previous four papers agreed.

### 2022 Term-2 — measured off all five series openers before dispatch

Verified against the printed covers and general instructions, not inferred:

- **14 questions, 40 marks, 2 hours**, identical on all five series. `term2` in
  `lib.ts` matches the printed structure exactly — Section A Q1-6 @2, Section B
  Q7-10 @3, Section C Q11-14 @4, with **Q14 a case-based question of two 2-mark
  subparts**. 12 + 12 + 16 = 40.
- **No MCQs at all**, so `audit:keys` has nothing to scan and the blind
  key-re-derivation that anchors the other years is unavailable here.
- **The English pages are idx 2, 4 and 6 — only THREE of them.** The paper is
  Hindi-block-then-English-block per chunk (idx 1 Hindi Q1-6, idx 2 English
  Q1-6, idx 3 Hindi Q7-11, idx 4 English Q7-11, and so on), so the even-page rule
  holds but the RANGE does not: do not carry "2 through 22" over from a full80
  paper. The odd-page overflow seen in 2026 was NOT observed here — each language
  block starts cleanly on its own page — but check rather than assume.
- **Instruction (vi) reads "There is an internal choice in some questions" with
  NO counts**, like 2026 series 65/1 and 65/2. The ORs can only be found by
  reading, and the 40-mark sum is blind to a missed alternative for the same
  reason it is at 80. Walk the marking scheme.
- Printed page count varies by series (65/1 and 65/3 say 8, the rest 7), so it is
  not a usable cross-check.
- **Series 65/1 is re-typeset**: its sets match 0 of 13 blocks by byte-hash and 5
  by dHash. Its siblings 65/2-65/5 match 7-11 by byte-hash and gain nothing from
  the perceptual pass. Expect the skip list to be useless for 65/1 alone.

## CBSE-acknowledged defects — three categories, all PRESERVED

CBSE's marking schemes admit their own defects in writing, and there are three
distinct shapes. All are transcribed **as printed** and preserved with the
scheme's own wording, per this project's standing convention — never repaired,
never dropped.

| Category | CBSE's wording | Handling | Seen |
|---|---|---|---|
| **No correct option** (MCQ) | *"1 mark for any attempt as correct answer is not given in any option"* · *"No option is correct. Full marks may be awarded"* | `_noCorrectOption: true`, all 4 options stored, **none** marked correct | 4 rows (the same `\|λa\|` question across all three 65/6 sets, plus 65/2/1 Q6) |
| **Printing error, question unanswerable** (subjective) | *"Due to printing error, the given function is not integrable. So full marks may be given for every attempt."* | stem as printed, `_flag` carrying the ruling; the solution step reproduces CBSE's verdict rather than inventing a repair | 65/4/2 Q34(b) |
| **Impossible data, NOT acknowledged** | — | stem as printed, official key kept, `_flag` explaining why the key still follows | 65/7/1 Q17 (`P(A∩B) = 4/7 > P(A) = 1/7`; the key's route never touches `P(A)`) |

The third is the one to watch: CBSE did not notice it, so only re-derivation finds
it. The first two announce themselves in the scheme and can be grepped for.

## 2024 figures are CORRUPT IN THE SOURCE — corrected 2026-08-21

An earlier entry here blamed PyMuPDF ("mis-composites the strips, painting black
between the bands") and told you to crop from `doc.extract_image(xref)` instead.
**That diagnosis was wrong and the advice is a dead end.** Measured on
`2024 65/2/1` p20: the extracted PNGs are corrupt too. Each strip decodes to
content **repeated three times horizontally with the remainder black**, i.e. the
declared width does not match the stored data. It is in the source bytes, so no
renderer setting and no extraction route recovers it.

What made the old reading plausible: a page's FIRST strip is usually fine
(`cs=1`) and the later ones are not (`cs=3`), so extracting one strip and finding
it legible "confirms" a theory that the rest of the figure disproves.

Nor does a sibling paper rescue it — the corruption is uniform across a series
(all three members of every affected group measure 0.39–0.55 black).

**The 2024 MARKING SCHEMES reprint the same figures cleanly (0.00 black), and
that is the source of record for them.** `extract_figures.py` supports it via a
`source: "ms"` pick; see the figure phase below.

## The figure phase — done 2026-08-21

**41 distinct figures attached** to 1,766 PYQ rows. Run:

```
npx tsx scripts/cbse-12-pyq/figure-groups.ts --write   # the work list
python  scripts/cbse-12-pyq/extract_figures.py --crop  # crops + collision check
python  scripts/cbse-12-pyq/contact_figures.py         # THE VERIFY GATE
npx tsx scripts/cbse-12-pyq/attach-images.ts --apply
```

Four things worth knowing before touching it again:

**The unit of work is 41, not 96.** 96 transcribed rows carry `_figure: REQUIRED`,
but the series reprint the same questions, so grouping by `content_hash` — with
the real hash functions, never a re-implementation — collapses them.

**Figures are SLICED into horizontal strips**, and the slicing differs per file:
the same Venn diagram is 3 strips of 55pt in one paper and 7 of 24.5pt in
another. So `extract_image` returns a fragment by construction. `regions.py`
unions the strips and the RENDERED page is cropped over the union, which also
picks up vector or text drawn on top. Its self-test exists because the first
merge silently DELETED strips (`fitz.Rect`'s `|=` returns a new object, so the
list element was never updated) — one figure read as three fragments and two
pages read as "no figure at all", with nothing in the output saying so.

**Collisions are decided by the IMAGES.** The `_figure` notes are prose written by
different agents; normalising the parts allowed to vary still flags 19 of 41
groups, nearly all innocent, so that check is only a hint. The real one crops
every member and compares perceptually — byte comparison is useless because the
same figure sits at a different y per series. Measured: worst genuine reprint 8,
the one true collision 42, nothing between.

**The page index in a `_figure` note is ADVISORY.** One is off by one and one by
four, so pages are scanned independently. Anything the rules cannot settle — a
page with no region, or with several — is REFUSED and adjudicated by hand in
`data/figure-picks.json`, which records what was seen rather than a rule.

### Does every question that TALKS about a figure carry one? — audited 2026-08-21

`audit-figures.ts`. No other gate reads a stem and asks whether the thing it
points at exists: `validate.ts` checks transcription files, `board:lint` checks
section structure, `audit-keys` checks options, `audit-omml` checks Word export.
A row whose stem says "In the given figure, ..." with `image_url` null is
**unanswerable, renders as a complete question, and is invisible to every count**.

**Result: 23 rows reference a figure they do not carry — and all 23 are
answerable from the words.** They are only EIGHT distinct questions, six of them
case-study sets whose four sub-parts share one context, and every one was opened
and read rather than sampled:

| | why the figure is illustrative |
|---|---|
| 2023 65/1/1 Q23(a) | `AC = (5/4)AB` fixes C on ray AB algebraically |
| 2023 65/1/1 Q37 (4 rows) | semi-vertical angle 45° is stated in the context |
| 2023 65/4/1 Q38 (2 rows) | the stem itself defines x and y and the 200 m of wire |
| 2024 65/1/1 Q25 | the labelling ABCD determines `AD = AB − DB` |
| 2024 65/1/1 Q38 (4 rows) | context defines the whole map in words; the graph is the familiar sine curve |
| 2026 65/2/1 Q37 (3 rows) | ellipse equation AND the 3 m track width both given |
| 2026 65/3/1 Q38 (4 rows) | vertices A(0,4), B(−2,0), C(3,0) given explicitly |
| 2026 65/4/1 Q36 (4 rows) | cup is 15 cm deep, radius 5 cm — both stated |

This CONFIRMS the figure phase's judgement: 41 attached figures is the real load,
and nothing load-bearing was missed.

**The probe's own bug is the transferable part.** Version 1 was written from the
rows it flagged, so it learned only their phrasing and reported 16. Run against
rows that DO carry a figure, it turned out blind to three more forms — `as shown
below`, `The following graph is a combination of`, `The following graph
represents` — each of which, on a row with no image, is precisely the
unanswerable case. Widening it found **7 more rows across two whole sets**. A
probe validated only against the cases it already flags cannot show you what it
misses; check it against the population it calls CLEAN.

The reverse direction (15 rows carrying an image whose stem never says "figure")
is all legitimate — "The following graph represents :" is a question where the
figure IS the stem. The regex stays narrow there on purpose: matching "the graph
of y = sin x" would bury the real hits.

### Questions whose OPTIONS are graphs — resolved

`2025 65/1/x Q5/Q14/Q18` (a graph stem with four graph options) and
`2025 65/2/x Q6/Q14/Q16` (four bare Venn diagrams) print options as pictures. The
options column is text, so the stored option texts are *descriptions read off the
page*. Both now carry a crop of the whole option block, so a reader sees the
question as printed and the descriptions are a supplement rather than a
substitute. Each is an adjudicated pick: for the Venn set the pick names
**65/2/3 deliberately**, because on its two siblings the same four boxes share a
page with the NEXT question's graph and a union there would splice two questions
together.

## Known taxonomy gap — open

Rationalised NCERT Ch.13 **no longer teaches random variables, probability
distributions or expectation**, so `cbse-12` Probability has no subtopic for
them — while CBSE examined them every year **2022–2025** (and, measurably, **not
in 2026**). Such rows are filed on `Probability / Independent Events` with a
`_flag` reading `TAXONOMY GAP — random variables`.

Deliberately NOT resolved yet: adding a subtopic to a shipped chapter needs a
decision, and it is worth taking on frequency evidence from several papers rather
than one. Grep the committed data for that flag before deciding.

A second suspected gap was **withdrawn**: 3-D trisection is not homeless, it
belongs to `Vector Algebra / Section Formula`, which is where NCERT teaches it.
