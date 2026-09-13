# NDA Paper I (Mathematics) — PYQ ingestion

Scanned UPSC NDA "Test Booklet — Mathematics" papers (image PDFs, **no text
layer**, **no answer key**, **bilingual**) → the bank, `question_kind='pyq'`,
under the existing **NDA / Mathematics** subject.

**Status: `2026-2` COMPLETE — 120 q PUBLIC + the 19th NDA Maths mock (`nda-2026-sep-maths`).**

## Why this pipeline exists

The bank already holds **18 NDA Mathematics sittings** (2017-I … 2026-I), every
one exactly 120 questions. All 18 arrived as `.xlsx` through the generic
`/upload` path and **not one `.xlsx` is tracked in this repo** — so none of them
is reconstructable, re-checkable or re-committable, and there was no NDA-PYQ
pipeline to extend. `2026-2` is the first NDA sitting with a source of record.

NDA runs twice a year, so this amortises from the next paper onward. Paper II
(GAT) is a different animal — 150 questions across nine subjects — and would need
its own catalog, but the same core.

## Four measured facts that govern everything

1. **ZERO text layer.** 0 extractable characters across all 44 pages of `2026-2`,
   against ~300 DPI scans. Vision-only, with no text-first fallback.
2. **The booklet is RAW BILINGUAL.** Hindi and English alternate page by page.
   English is on the **EVEN 0-based indices, 2…42** — 21 pages. That was
   established by reading a contact sheet of all 21 candidates, not inferred; see
   the long note on `englishPages` in `config.ts` for why the obvious heuristic
   does not separate this booklet.
3. **No answer key exists.** A UPSC question booklet never prints one, and the
   official key follows the recruitment cycle by roughly a year. Every answer is
   DERIVED.
4. **Figure load is ZERO — measured across all 21 English pages**, not
   extrapolated from a sample. NDA Paper I states every question in words,
   including the whole coordinate-geometry, 3-D and vectors run. The only
   non-text marks on the pages are **student pen-working** (a hand-drawn curve in
   the margin of printed p29, scribbled algebra on several others), which is not
   content. Measured at contact-sheet resolution, so a small inline diagram is
   not strictly excluded and agents still flag at full resolution — but do not
   design for figures on this paper.

## This is a SINGLE blind pass, and that is a deliberate divergence

The sibling `scripts/cds-maths` runs **two** independent blind passes and
crosstabs them. This runs **one**, because an external key is expected afterwards
and is reconciled by `reconcile-key.ts`.

That ordering is stronger than it looks: the pass is written **before** the key is
seen, so it cannot be contaminated by it — which is the property that makes a
later disagreement mean something. On `cds-maths`, of five rows where a blind
pass disagreed with a prep-house key, **four were the KEY's error and zero were
ours**.

It is also weaker in one specific way, and the pipeline is built around that: a
single pass measures **~95%** on UPSC papers in this repo — about **6 wrong in
120**. So rows commit **PRIVATE** and stay there until a key has been
reconciled. `flip-public.ts` and the `/mock` build are gated on that, because
`/mock` grades real students against a FROZEN score and a later key fix would
need every prior attempt re-graded by hand.

**What `2026-2` actually landed on.** Its key is an INDEPENDENT third-party one
(Centurion, series A) and **there is no official UPSC key for this sitting and
none is expected** — so the reconciliation is final, not interim. **117 of 120
agreed. All 3 disagreements resolved AGAINST the key**, each read off the
printed booklet: Q4 and Q11 are power-of-two factor slips on standard identities
(and share an identical option set), Q62 is a reading in which the key excludes
the axis-aligned endpoints where statement II's minimum is attained — and the
blind pass had NAMED that runner-up in advance.

The calibration held where it matters: **the two MED rows and the one LOW row
all AGREE with the key**, and every disagreement is on a HIGH row. That includes
Q106 (mutually inconsistent givens) and Q112 (both inequalities printed
reversed) — the paper meant them as printed, vindicating solve-as-printed.

## Relationship to `scripts/cds-maths`

`lib.ts` **re-exports that pipeline's pure core verbatim** (the `mh-sb-9`
pattern) rather than restating it. Same animal: scanned maths booklet, no text
layer, no key, shared-stimulus sets, per-question chapter. Restating 500 lines
would mean applying every future fix twice.

Two options on those shared functions carry the divergence, both default-off so
CDS is byte-identical (proved by its four test files staying green):

| | cds-maths | here | why |
|---|---|---|---|
| `validateCatalog` subtopic | warning | **error** (`strictSubtopics`) | its catalog is seeded and growing; NDA's is CLOSED after a bank-wide cleanup, so an unlisted name is a near-miss that auto-creates and splits a chapter |
| `buildRecords` `source_row` | `n` | **`n + 1`** (`sourceRowOffset`) | all 18 existing NDA sittings run 2..121 from their `.xlsx` origin |

The script `main()`s are near-copies, which is duplication of argument handling
and file paths only.

## The catalog is GENERATED, never authored

`catalog.json` comes from the live bank via `dump-catalog.ts` — 31 chapters, 111
subtopics. Any divergence between it and the database is the defect. Hand-editing
it to "add" a name defeats the gate at the exact moment it matters; add the
subtopic to the bank deliberately first, then re-run.

## Running it

```sh
npx tsx scripts/nda-pyq/dump-catalog.ts --apply       # refresh from the live taxonomy
npx tsx scripts/nda-pyq/render.ts       2026-2        # englishPages -> out/<id>/pNN.png
# [transcription agents, one per band — TRANSCRIPTION_BRIEF.md]
npx tsx scripts/nda-pyq/check-bands.ts  2026-2        # structural probe over band files
npx tsx scripts/nda-pyq/merge.ts        2026-2 --apply
npx tsx scripts/nda-pyq/render-check.ts 2026-2        # every math zone through KaTeX
npx tsx scripts/nda-pyq/render-check.ts --self-test   # prove the probe can go red
npx tsx scripts/nda-pyq/dedup-check.ts  2026-2        # BEFORE deriving; see below
npx tsx scripts/nda-pyq/dump-derive.ts  2026-2 --apply   # -> <id>.derive.json (no answers)
# [blind derivation agents — DERIVATION_BRIEF.md -> <id>.d1.json .. <id>.dN.json]
npx tsx scripts/nda-pyq/merge-answers.ts 2026-2 --apply  # -> <id>.answers.json
npx tsx scripts/nda-pyq/commit.ts       2026-2 --apply   # PRIVATE
npx tsx scripts/nda-pyq/audit-solutions.ts 2026-2

# --- WHEN AN ANSWER KEY ARRIVES ----------------------------------------------
npx tsx scripts/nda-pyq/parse-key.ts        2026-2 "<key.pdf>" A --apply
npx tsx scripts/nda-pyq/reconcile-key.ts    2026-2    # work list; applies NOTHING
# [adjudicate each disagreement by hand AGAINST THE PRINTED PAGE]
npx tsx scripts/nda-pyq/apply-adjudication.ts 2026-2 --apply
npx tsx scripts/nda-pyq/stamp-provenance.ts 2026-2 --apply
npx tsx scripts/nda-pyq/flip-public.ts      2026-2 --apply
npx tsx scripts/mocks/build.ts --paper=maths --only=2026-Sep --apply --publish
npx tsx scripts/reviews/record-nda-2026-2-key-crosscheck.ts --apply

# NOTE: only re-commit if an ANSWER changed (it did not for 2026-2 — all three
# adjudications kept ours). `reasoning` never reaches the DB; only `solution` does.
# NOTE: pass --only= to the mock build. Without --publish a re-run DEMOTES the
# whole NDA Maths family to draft.
```

## The mock needs no registry edit

`scripts/mocks/build.ts` discovers NDA sittings **from the bank** by
(`pyq_year`, `pyq_month`), so `nda-2026-sep-maths` appears on its own once the
rows are PUBLIC. `NDA_MATHS_PAPER` already declares 120 q / 300 marks / 150 min /
+2.5 / −0.83, matching this booklet's printed cover exactly (`समय : दो घण्टे और
तीस मिनट`, `पूर्णांक : 300`, `120 प्रश्नांश`, one-third penalty).

**And `discoverSittings` filters on `visibility = 'PUBLIC'`** — verified in the
source, not assumed. So while the rows sit PRIVATE awaiting key reconciliation
the builder cannot see this sitting at all, and the mock cannot be published
early by accident. The gating is structural, not a convention someone has to
remember.

`count: 120` is a HARD count: a paper one question short does not degrade, it
fails to build. That is the right behaviour — a mock is the real paper or it is
nothing.

## `parse-key.ts` — the series column is the whole risk

A key of this shape prints SET-A..SET-D side by side and **the four series are
independently scrambled**. Reading the wrong column does not fail: it produces
120 confident WRONG entries and a mismatch list that reads as a catastrophe in
the transcription. So the script REFUSES a series that disagrees with the
booklet cover (`series` in config.ts), and ASSERTS the three-block row
arithmetic rather than assuming it. For `2026-2` the extraction was additionally
verified by a SECOND, independent method — spatial, by x-distance to the SET-A
header — with 0 disagreements across all 120.

That key's own disclaimer claims star marks on doubtful answers. **There are
none on it** — checked on the RENDERED page, because a star drawn as vector art
would be invisible to a text parse. The yellow bands that look like highlighting
run at the same height across all three blocks, i.e. they are the watermark.

## Probes, and why each exists

- **`check-bands.ts`** — runs on raw band files, before merge. A clean run here
  does NOT mean the paper is covered: each band is checked against its own
  `bandReport`, so two bands that both stop short are each internally consistent
  and both pass. `merge.ts` is the coverage gate.
- **`merge.ts`** refuses when two bands disagree about a question — that is two
  agents reading one page differently, a finding to resolve against the page, not
  a duplicate to settle by whichever file was listed last.
- **`render-check.ts`** — every math zone through the repo's own KaTeX. It
  **fails on zero zones**, because a probe reporting "clean" over nothing is the
  worst outcome, and `--self-test` proves it rejects known-bad LaTeX first.
- **`reconcile-key.ts`** — never applies anything. See its header.

## The derivation is ONE pass, split into ranges for throughput

`merge-answers.ts` combines `<id>.d1..dN.json`. Because it is one pass and not
several, a question appearing in two range files is a DISPATCH ERROR and is
reported as one — there is nothing to reconcile. Contrast `merge.ts`, where an
overlap between transcription bands is expected and a disagreement is a finding.

## Dedup, and the honest limits of the probe

`dedup-check.ts` runs BEFORE the derivation, because a question already in the
bank is both (a) a silent `content_hash` skip that would shorten the paper and
fail the mock's hard count with no explanation, and (b) a free key.

It reports two things and **only one of them is trustworthy**:

- **EXACT normalised-stem match — decisive.** It over-approximates
  `content_hash` (stem only), so it cannot miss a collision. On `2026-2`:
  **0 matches across 7,314 NDA Mathematics rows**, with a positive control (49
  rows containing "eccentricity") proving the probe reached the data.
- **Weighted fuzzy similarity — a reading list, and a weak one.** Measured, it
  does not discriminate on this corpus, and that is a property of NDA Maths
  rather than an unfixed bug: the stems are short, heavily templated, and their
  real content is mathematical structure that tokenises poorly. Four successive
  fixes each improved it and none made it decisive — `lim sin^2 x/(x|x|)` still
  scores 0.99 against `lim f(x)/g(x)`. Read it as "similar SHAPE", never
  "probable duplicate", and do not tighten the threshold to make it look clean.

The standing detector remains `commit.ts`, which **NAMES** every row that dedups
rather than letting a silent `skipped` count stand for a question that was never
on the paper.
