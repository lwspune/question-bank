# NDA Paper II (GAT) — PYQ ingestion

Scanned UPSC NDA "General Ability Test" booklets (image PDFs, **no text layer**,
**no answer key**, **partly bilingual**) → the bank, `question_kind='pyq'`, under
the existing **NDA** exam across **nine subjects**.

**Status: `2026-2` transcribed (150/150) and fidelity-checked against Series D.
Derivation in progress. Nothing committed, nothing PUBLIC.**

## Why this pipeline exists

The bank already holds **18 NDA GAT sittings** (2017-I … 2026-I), every one
exactly 150 questions: English 50 at `source_row` 2–51, then eight General
Knowledge subjects at 52–151. All 18 arrived as `.xlsx` through the generic
`/upload` path and **not one `.xlsx` is tracked in this repo** — so none is
reconstructable, re-checkable or re-committable. `2026-2` is the first GAT
sitting with a source of record.

## Why it is not `scripts/nda-pyq`

That pipeline is Mathematics at MODULE level — one `SUBJECT`, one `SUBJECT_ID`,
a two-level catalog and `QUESTIONS_PER_PAPER = 120`. A GAT paper carries **nine**
subjects and decides `subject` **per question**, which makes the catalog three
levels. That is a TYPE change, which is the same criterion `cds-maths` used when
it forked from `cds-gs`.

But the fork is small, and deliberately so. Of the nine functions in the
`cds-maths` pure core, **seven re-export verbatim** — including `validateRows`
(duplicate options, `content_hash` collisions, LaTeX balance, pipe-table
separators) and `validateSets` (a `Directions:` set must stay contiguous). Only
`validateCatalog` and `buildRecords` hard-code a single subject and are restated,
about 90 lines. **No shipped file was modified.**

One function is genuinely new: **`validateSections`**, which enforces the printed
Part A / Part B boundary. See below.

## Six measured facts that govern everything

1. **ZERO text layer in both booklets** — 0 extractable characters across all 26
   pages of Set A and all 45 of Set D. Vision-only, no text-first fallback.

2. **THE BILINGUAL RULE IS NOT A PARITY.** Part A (English, Q1–50) is printed in
   **English only** — it is an English test, so UPSC prints no Hindi
   counterpart — over six CONSECUTIVE pages, 2–7. Part B (Q51–150) then
   alternates, even = Hindi and odd = English, pages 8–47. So the English pages
   are `2,3,4,5,6,7` then every odd page `9…47` — **26 of the booklet's 46**.
   Anything that assumes one parity across the whole booklet is wrong for the
   first six pages.

3. **Set A is 23 SPREADS photographed SIDEWAYS.** Rotation is 270, not 90 — at 90
   the text renders upside down. After rotation the LEFT half is the even page.
   Set D is one upright page per image.

4. **Set D is the CLEANER source** (~1150×1570 real pixels per page against Set
   A's ~885×1184) and is missing printed pages **4, 5, 34 and 36**. Only 4 and 5
   cost content — 34 and 36 are the Hindi versos of pages that are present. The
   two missing Part-A pages are exactly **Series D's Q21–Q36**, measured from the
   numbering jump and corroborated by the `Directions` blocks either side.

5. **No answer key exists.** A UPSC question booklet never prints one. Every
   answer is DERIVED and says so; an external key is reconciled LATER.

6. **Figure load is ZERO** — measured across all 26 English pages, and confirmed
   by all ten transcription bands independently. The two candidates that looked
   like diagrams at survey resolution turned out to be LaTeX radicals. Do not
   design for figures on this paper.

## The Part A / Part B gate is not cosmetic

`NDA_GAT_PAPER` declares two sections with HARD counts — english 50, gk 100 —
and reconstructs each by SUBJECT membership. So an English question mis-filed
under Physics does not merely land in the wrong `/browse` filter: it makes the
English section 49 and the GK section 101, and the mock fails to build with an
error that names neither the question nor the cause.

The boundary is printed on the page (`PART — A` on page 2, `PART — B` on page 9),
so this is checkable against the source rather than inferred. `validateSections`
runs in `check-bands` (per band, where an agent can still fix it in context),
`merge` and `commit`.

## THE RECONCILIATION IS NOT THE MATHS ONE — read this before the key arrives

On NDA Mathematics 2026-II all three key disagreements resolved **against** the
key, because a maths answer is derivable from the printed page.

**A GK fact is not.** "Which committee recommended constitutional recognition for
local bodies" has no derivation, only recall, where a single blind pass measures
about **94%** in this repo. So on the 100 GK questions the KEY is the stronger
source, and the default on a disagreement is to **defer to it unless it is
self-refuting**. Part A sits in between: an antonym or a PQRS ordering really is
derivable from the page, so a Part A disagreement deserves the Mathematics
treatment.

That asymmetry is why the derivation brief insists on an honest confidence flag
and a named runner-up, and why `merge-answers` prints the confidence split per
SECTION rather than blended.

## Running it

```sh
npx tsx scripts/nda-gat/dump-catalog.ts --apply          # refresh from the live taxonomy
npx tsx scripts/nda-gat/render.ts        2026-2          # Set A  -> out/2026-2/p<PRINTED>.png
npx tsx scripts/nda-gat/render.ts        2026-2 --series=D
# [transcription agents, one per band — TRANSCRIPTION_BRIEF.md]
npx tsx scripts/nda-gat/check-bands.ts   2026-2
npx tsx scripts/nda-gat/merge.ts         2026-2 --apply
npx tsx scripts/nda-gat/render-check.ts  2026-2          # every math zone through KaTeX
npx tsx scripts/nda-gat/render-check.ts  --self-test     # prove the probe can go red
# [fidelity agents, one per band — FIDELITY_BRIEF.md]
npx tsx scripts/nda-gat/match-variant.ts 2026-2 D --apply
npx tsx scripts/nda-gat/dedup-check.ts   2026-2          # BEFORE deriving
npx tsx scripts/nda-gat/dump-derive.ts   2026-2 --apply --split=30
# [blind derivation agents — DERIVATION_BRIEF.md -> <id>.d1.json .. <id>.dN.json]
npx tsx scripts/nda-gat/merge-answers.ts 2026-2 --apply
npx tsx scripts/nda-gat/commit.ts        2026-2 --apply  # PRIVATE
npm run audit:text -- NDA2_2026_GAT
npm run audit:omml -- NDA2_2026_GAT
npm run audit:underlines

# --- WHEN AN ANSWER KEY ARRIVES ----------------------------------------------
# parse-key / reconcile-key / apply-adjudication / stamp-provenance / flip-public
# then:  npx tsx scripts/mocks/build.ts --paper=gat --only=2026-Sep --apply --publish
```

## The fidelity pass, and what it measured

Series D was transcribed a second time — terse stems, but **options read label by
label** — and matched onto Series A by option TEXT. It does two jobs:

1. **Fidelity.** An independent second reading of the same printed options. The
   defect it exists to catch is the correct option's text landing in the WRONG
   LETTER's slot: the question then reads perfectly, passes every structural
   gate, and makes a blind derivation confirm the wrong letter. On the sibling
   CDS English corpus that produced **19 wrong keys**, while a full blind
   re-derivation returned `confirmed` on all 89 rows it saw.
2. **Order.** Series D's own numbering is kept in `data/2026-2-D.map.json`, so a
   four-series solution document can be built in each series' own order.

**Result on `2026-2`: 134 of 134 matched — 0 PERMUTED, 0 OPTION_MISMATCH.** Two
independent readings of two different booklets agree on option set AND label
order for every matched question, so **UPSC does not permute options between GAT
series on this paper**. The 16 base questions with no Series D counterpart are
Q11–20 and Q41–46, which is exactly what sat on Set D's missing pages.

**A perfect score from a greedy matcher is worth nothing unchecked**, so the map
was validated against two observations made BEFORE the tooling existed: an
eye-check of Set A p4 against Set D p2, and the b4 transcription agent's
independent block report (`A Q51–60 = D Q91–100`, `A Q61–66 = D Q76–81`). Both
pass, the map is bijective, and every label map is the identity.

It also earned its keep as a NORMALISATION detector. The one row it initially
refused — D-Q76 against base Q61 — has byte-identical stems and options reading
`\(45^\circ\)` against `45 degrees`. The fix belongs in the fold, never in the
threshold: lowering a floor that is protecting 133 other questions to admit one
is how a wrong pairing gets in.

## Probes, and why each exists

- **`check-bands`** runs on raw band files before merge. A clean run does NOT
  mean the paper is covered — each band is checked against its OWN bandReport,
  so two bands that both stop short are each internally consistent and both pass.
  `merge` is the coverage gate. It also can only catch a chapter that exists
  NOWHERE, because `checkBand` takes a flat name set; the subject-scoped catalog
  gate is in `merge`.
- **`merge`** refuses when two bands disagree about a question — two agents
  reading one page differently is a finding to resolve against the page, not a
  duplicate to settle by file order.
- **`render-check`** runs every math zone through the app's own KaTeX. It FAILS
  on zero zones, because a probe reporting "clean" over nothing is the worst
  outcome, and `--self-test` proves it rejects known-bad LaTeX first.
- **`dedup-check`** runs BEFORE the derivation. It reports a stem-only candidate
  list and then the DECISIVE test — stem AND option set — because `content_hash`
  folds the options and this paper legitimately carries five "Which is the
  correct sentence ?" items whose entire content is in their options. On
  `2026-2`: **0 true collisions across 14,695 NDA rows**, with a positive control
  proving the scan reached the data.
- **`match-variant`** never picks a winner and never lowers its own threshold.

## A `$` is a math delimiter here

`check-bands` inherits a blanket ban on `$` from a Mathematics pipeline where it
is never legitimate. A GAT paper prints CURRENCY, so `nda-gat/check-bands`
suppresses that error **only when every dollar in the question is escaped**. One
bare `$` and the whole question keeps the error.

The hazard is real and is why the blanket rule exists: a bare `$` pairs with
another and swallows everything between them. Four repairs were measured against
the real parser when that last bit, and backslash-escaping the bare character
**does not work** — there is no escape handling outside a math zone. `\(\$\)` is
the form that survives, and `render-check`'s self-test pins it.

## A script starting with `_` is INVISIBLE to git in this repo

`.gitignore` line 116 is `scripts/*/_*`. It exists for a good reason — it keeps
agents' in-flight probes out of commits, after `git add -A scripts/ncert` once
swept one in — and it silently swallowed this pipeline's two data-repair scripts
across two commits while `git add` reported success for every other file.

They were not scratch. `fix-glyphs.py` and `fix-negation.py` are the auditable
record of edits made to **already-committed data**, each asserting its
before-state and refusing a re-run. If a script changes committed data, it
belongs in the repo — so name it without the underscore, and do not reach for
`git add -f`, which fights the rule instead of acknowledging the file is not
scratch.

**The tell is that nothing tells you.** `git add <path>` on an ignored path exits
non-zero with a hint; `git add <many paths>` where only some are ignored exits
non-zero too — but a commit staged earlier in the session simply lacks the file,
and the `A scripts/…` list is long enough that one absence does not stand out.
Diff the file list you intended against `git ls-files` before believing a commit
is complete.

## Conventions this paper needed

- **Underlines are load-bearing.** Roughly half the Part A questions turn on which
  word is underlined, and the underline is ink on a photograph. Stored as
  `\(\underline{\text{word}}\)` — 20 stems carry one.
- **Two-column pair lists are GFM pipe tables**, converted in the TRANSCRIPTION
  (the column boundary lives in the printed layout; once flattened it is
  irrecoverable). A header row AND a `|---|---|` separator are both mandatory.
  10 stems carry one.
- **An emphasised `not` is `**not**`.** Eight stems print `not` in bold italic,
  which inverts the question. Ten independent agents rendered that three
  different ways — `**not**`, `\(\textit{not}\)` and plain — and nothing in the
  pipeline catches a cross-band convention split, because each band is internally
  consistent. `**not**` wins on evidence: 381 CDS rows use `**`, and it renders
  on BOTH surfaces (`KatexRenderer` parses rich segments; `docxBuilder.mathRuns`
  turns it into a native Word bold run).

## Things the transcription bands found that are worth keeping

- **Student pen marks are everywhere and are not answers.** Both booklets were
  sat by a candidate; options are circled, sometimes two on one question. Every
  brief says to ignore them.
- **Set D's right edge is clipped on printed pages 2 and 3**, costing stem text —
  including one underlined target word cut mid-word. Options are intact, which is
  what the fidelity check turns on.
- **Set A's printed page 11 is the worst in the booklet.** Two option blocks are
  backed by ~109×73 and ~85×24 real source pixels, so zoom adds nothing. They
  were closed from Set D under the rule that the MATCH must be established on
  independently legible content first, and the two values that came from Set D
  alone are flagged in the row.
- **Cropping can make things WORSE.** On the faded pages, 4–5× is the useful zoom
  and 8× returns pure blur — the brief's "crop at 6–10×" is right for the sharp
  pages and wrong for the soft ones.
- **A defect in the PREVIOUS sitting, found in passing and not fixed here.** A
  transcription band reported that the NDA I 2026 English rows store their pair
  tables with **no `|---|---|` separator row**, so they render as literal pipes.
  Its count was low, and measuring it properly made the finding sharper rather
  than smaller: **`GAT_NDA1_2026_QuestionBank.xlsx` carries 12 pipe-bearing rows
  across SIX subjects — English 4, Geography 2, Polity 2, History 2, Chemistry 1,
  Current Affairs 1 — and ZERO of them have a separator**, while every other GAT
  sitting that carries a table has one (2017-I 8/8, 2018-II 6/6, 2025-II 4/4,
  and so on). So it is not an English problem; **that one sitting's whole ingest
  lost the separator row.** Out of scope here — it is shipped content in another
  sitting — and logged to the SUGGESTIONS backfill ledger.

  Two things NOT to mistake for it: `GAT_NDA2_2017_PYQ.xlsx`'s five English rows
  join their P/Q/R/S parts with pipes, which is a different (and also wrong)
  shape; and `NDA2_2026_Maths_SetA.pdf`'s 12 pipe rows are absolute values and
  determinants, where having no separator is CORRECT.
