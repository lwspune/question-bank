# Chapter-ingestion contract — MH State Board Class 10 textbook layer

You own **one chapter, end to end**. Read this whole file before your first command.
It is the contract; your dispatch message names only which chapter and anything
specific to it. Where the two disagree, the dispatch message wins and you should say
so in your report.

Repo root: `C:\Users\vilas\Downloads\Question_Bank`. Run every command from there.

---

## 0. What this pipeline is

`scripts/mh-ssc-10-text/` ingests the **Balbharati Class-10 textbook exercises** as
`question_kind='practice'` into the SAME exam and the SAME chapters that already hold
the board PYQ corpus. `/browse`'s PYQ/Practice toggle separates them. So:

- **Never invent a chapter or subtopic name.** `config.ts` lists the exact live DB
  strings for your chapter. Use them verbatim. A near-miss silently auto-creates a
  duplicate chapter and splits the corpus in two with no error.
- Your unit is the chapter's **exercise blocks**. See §3 for exactly which.

## 1. The loop

```
npx tsx scripts/mh-ssc-10-text/commit.ts <id> --apply          # inserts PRIVATE
npx tsx scripts/mh-ssc-10-text/dump-subjective.ts <id>         # -> data/<id>.all.topaper.json
npx tsx scripts/mh-ssc-10-text/dump-mcq.ts <id>                # -> data/<id>.mcq-blind.json (if any MCQs)
npx tsx scripts/mh-ssc-10-text/apply-solutions.ts <id> --apply
npx tsx scripts/mh-ssc-10-text/audit-grounding.ts <id>
npx tsx scripts/mh-ssc-10-text/backfill-sections.ts <id> --apply
npx tsx scripts/mh-ssc-10-text/flip-public.ts <id> --apply --with-mcq
```

Then the three standing audits, **scoped to your source_file substring** (unfiltered
runs read the whole bank):

```
npm run audit:keys -- <sourceFileSubstring>
npm run audit:text -- <sourceFileSubstring>
npm run audit:omml -- <sourceFileSubstring>
```

Pages are already rendered to `scripts/mh-ssc-10-text/out/<id>/p-<idx>.png` and the
prose text layer is dumped to `out/<id>.text.md`. If either is missing, run
`npx tsx scripts/mh-ssc-10-text/render.ts <id>` and
`npx tsx scripts/mh-ssc-10-text/dump-text.ts <id>`.

## 2. Transcription — READ THE PAGE IMAGES

**Transcribe from the rendered PNGs, not from the text dump.** This is measured, not
cautious: across the first 40 pages of each Science volume there are ZERO occurrences
of the arrow, the degree sign and any sub/superscript digit, in books full of all
four. Exponents flatten (`r^2` → `r2`, `1.83 x 10^9` → `1.83 x 109`), fractions
serialise out of order, and `∝` becomes the letter `a`. The Maths volumes are worse.
Use `out/<id>.text.md` **only** for grounding prose answers in §5 — and check any
formula you take from it against the page.

Write `scripts/mh-ssc-10-text/data/<id>.questions.json`, an array of:

```jsonc
{
  "ref": "Ex Q2(a)",              // see §3 — must match a sections.ts refPrefix
  "bucket": "exercise-subjective", // or "exercise-mcq"
  "format": "subjective",          // or "mcq"
  "subtopic": "<exact string from config.ts>",
  "difficulty": "EASY" | "MODERATE" | "HARD",
  "context": "Answer the following questions.",  // the shared instruction, when there is one
  "setLabel": "Ex Q2",             // present when siblings share a context
  "stem": "...",
  "options": ["...", "...", "...", "..."],  // MCQ only, exactly 4
  "answer": "B",                            // MCQ only
  "note": "..."                             // optional; see §6
}
```

Rules that have each cost a real defect:

- **A question that is not four-option MCQ is `subjective`.** Some blocks print
  THREE choices, or picture options. Ship those as subjective with the printed
  choices written into the stem. **Never invent a fourth option.**
- **Tables are GFM pipe tables** — header row, then a `|---|---|` separator row, then
  data rows. The separator is mandatory; without it nothing renders a table.
- **Maths goes in `\( ... \)`**, e.g. `\(g = 10\ \text{m/s}^2\)`. Balance every
  delimiter — `commit.ts` refuses an unbalanced file.
- **Skip open-ended items**: "Project:", "Use your brain power", "Can you tell?",
  "Try this", inline Activity boxes, "collect information about…". Anything with no
  determinate answer. Say in your report how many you skipped and why.
- Transcribe **exactly as printed**, misprints included. See §6.
- **Do not author code through a shell heredoc.** In this environment the shell eats
  backslashes and injects control characters — it has corrupted real data here.
  Write files with the Write tool, or with a Python script you wrote with the Write
  tool. If you must check something inline, re-read the bytes afterwards.

## 3. Which blocks, and the `ref` convention

**Science and humanities chapters** carry ONE end-of-chapter `Exercise`. Refs are
`Ex Q1`, `Ex Q2(a)`, `Ex Q5(iii)` — always prefixed `Ex `. Solved examples inside the
body are deliberately OUT of scope.

**Maths chapters (Algebra, Geometry)** are different: the questions are in numbered
`Practice set N.M` blocks spread through the chapter, plus a terminal `Problem set N`,
plus worked `Solved Examples`. All three are in scope. Refs:

- `Ex 1.1 Q3` for Practice set 1.1 question 3
- `PS1 Q4` for Problem set 1 question 4
- `<Topic> SolvedEx.2` for a worked example under a named topic heading

A Maths chapter needs its own section outline. Write
`scripts/mh-ssc-10-text/data/<id>.sections.json`:

```jsonc
[
  { "group": "Similarity of triangles", "label": "Solved Examples",
    "kind": "solved_example", "refPrefixes": ["Similarity of triangles SolvedEx."] },
  { "group": "Practice set 1.1", "label": "Practice set 1.1",
    "kind": "exercise", "refPrefixes": ["Ex 1.1 "] },
  { "group": "Problem set 1", "label": "Problem set 1",
    "kind": "miscellaneous", "refPrefixes": ["PS1 "] }
]
```

**in printed book order** — `/board` renders this as the reading order, so it must be
the order the blocks appear on the page. `backfill-sections.ts` fails if any row is
left unrouted, which is your check that every ref matched a prefix.

A **solved example carries the book's own printed solution**, so transcribe that
solution with it and put it in the `solution` field of the questions row — do not
re-derive it, and do not "improve" it (but see §6 if it is wrong).

## 4. MCQ keys

Derive every key **by solving the question**, then check it against the chapter. If
your derivation and the chapter disagree, say so in your report rather than quietly
picking one.

Write `data/<id>.mcq-verify.json`:

```jsonc
[{ "id": "<uuid from the mcq-blind dump>", "ref": "Ex Q1(1)",
   "derived_answer": "B", "solution": "...", "method": "<see below>" }]
```

The `method` string must be honest about what this pass actually was. You transcribed
the options and keyed them in the same pass, so this is **not** a blind
re-derivation. Use exactly:

> method: keyed from the chapter at transcription time and re-checked against the
> quoted sentence; this is NOT an independent blind re-derivation, so no
> question_reviews row is recorded for it (do not run mark-mcq-verify.ts on this file).

**Do not run `mark-mcq-verify.ts`.** It would write a `blind_rederivation` verdict
into `question_reviews` that this pass did not earn.

## 5. Answers — grounding is the whole control

**The humanities books print NO answer key at all, and the Science books print
almost none**, so the end-of-book cross-check that governs the Maths books cannot
run. Every answer is authored, and the only thing standing between us and a fluent
invention is that each claim comes from the chapter's own prose.

The Science exception is small and exact, and your dispatch will say whether it
touches your chapter. Measured across all twenty chapter dumps with
`\bAns(wer)?[[:space:]]*[:.]`, the two volumes print **24 answers across six
chapters** — Gravitation 7, Lenses 4, Effects of Electric Current 4, Heat 4, Space
Missions 3, Refraction of Light 2 — and nothing in the other fourteen. Note the
book is inconsistent about the spelling: `Ans:`, `Ans :` with a space, and
`Answer :` all occur, which is exactly how the first census of this came out at
nine instead of twenty-four. Where a printed answer exists: **derive it yourself
first**, then compare, then state the agreement in the stored solution. Never put
the printed answer in the stem, and never quietly adopt it over your own
derivation — a disagreement is a finding worth reporting loudly.

- Author strictly from `out/<id>.text.md` and the page images. If the chapter does
  not state something, **say so in the answer** rather than supplying it from general
  knowledge. Answers that read "the chapter does not name a specific case" are
  correct and expected — several already shipped.
- Quote the chapter where it settles a point. That is what makes the answer checkable.
- `audit-grounding.ts` extracts years and proper nouns from your answers and diffs
  them against the chapter. It is **triage, not proof** — it is blind to an invention
  phrased in lowercase. Read every candidate it reports; most are run-join artefacts,
  but the point of the pass is the one that is not.
- Write `data/<id>.solutions.json` as `[{ "id", "ref", "solution" }]` built by joining
  the topaper dump **on `ref`**, and assert that every emitted row's id still pairs
  with its own ref. A dropped row that shifts the tail is a *permutation*: the id set
  matches, the count matches, every gate passes, and every answer is attached to the
  wrong question.

### Maths chapters only — the answer-key cross-check IS a gate

Both Maths volumes carry an ANSWERS section (`answersPdf` / `answerPages` in
`config.ts`). Render those pages and **diff every answer you authored against the
printed key**. Report the split as three numbers: AGREE / OUR-ANSWER-WRONG /
BOOK-KEY-WRONG, and say how many rows you actually diffed versus how many the chapter
has — a proof question with no key entry is not a gap, and reporting "0 wrong across
40" when you diffed 25 overstates the evidence.

Where the book is wrong, fix nothing in the stem: keep our correct answer and add an
errata bracket naming the defect (§6). Where we are wrong, fix our answer.

*Known: Geometry Ch.4 Geometric Constructions has NO printed answers at all — the key
skips it, because a ruler-and-compass construction has no numeric answer.*

## 6. Book defects — preserve, never smooth

Transcribe the stem exactly as printed. If the book is wrong, record it:

- a `note` on the questions row saying what is printed and why it looks wrong, and
- for an answer-affecting defect, a bracket at the START of the stored solution:
  `[Textbook note: the book prints X; the correct value is Y, because …]`

Never silently correct a printed stem — `content_hash` is stem-derived, so a
"helpful" repair makes the row un-dedupable against a later re-ingest, and it hides a
real finding.

## 7. Verify, then report

Before you report done, confirm from the database (not from a script's exit code):

- every row PUBLIC, with a solution, a `section_seq`, a chapter and a subtopic
- `audit:text` clean across all five classes
- `audit:omml` 0 failing zones
- `audit:keys` — for a chapter with no MCQs this prints **"NOTHING SCANNED"**, which
  is a false alarm, not a clean result. Say which it was.
- `audit-grounding` — report the candidate count and your triage of each

**Report honestly and specifically.** Say what you skipped, what you could not
resolve, any place the book contradicts itself, and anything you had to guess. A
finding you flag is worth more than a clean number you cannot support. If something
blocks you, write what you have to disk first — everything here is restartable from
the database state, so a half-finished chapter loses nothing, but an unwritten file
is gone.

**Namespace your scratch files** — several agents are running at once and share a
scratchpad. Prefix anything temporary with your chapter id.

**Do not touch** `config.ts`, `sections.ts`, or any file outside
`scripts/mh-ssc-10-text/data/<your-id>.*`. If you believe `config.ts` is wrong (a
page range that misses a block, a subtopic that does not fit), **say so in your
report** — do not edit it. A page range that is short by one page is a real and
recurring defect and reporting it is valuable.
