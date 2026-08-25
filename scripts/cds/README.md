# CDS English ingestion

Scanned CDS English booklets (image PDFs, **no text layer**, **no answer key**) → the bank,
`question_kind='pyq'`. Answers are **LLM-derived** + confidence-flagged. New exam **CDS** reuses
the NDA-English taxonomy.

**Status: all 2,280 rows are PUBLIC and back 19 timed mocks (2026-08-25).** `commit.ts` still
writes PRIVATE — publishing is a separate, deliberate step (`flip-public.ts`). The blind
re-derivation of the LLM-derived keys is still outstanding; see the section at the bottom, and
read the defect-class note there before editing any transcription.

Each paper is ~120 Q in ~13 **sections**, each opening with a `Directions:` block. **Section
order/selection varies by year** — so every paper gets a section-map pre-pass, and transcription
is assigned **by section, never by raw page range** (a section split across agents loses its
Directions, which can silently flip answers — it flipped 5 in the 2026 trial).

## Pipeline

```sh
npx tsx scripts/cds/render.ts  <paperId>            # 1. rasterise pages -> out/<id>/pNN.png
# 2. SECTION-MAP pre-pass (agent): read the pages, write data/<id>.sections.json
# 3. TRANSCRIBE by section (agents): write data/<id>.questions.json
# 4. UNDERLINES (agent): write data/<id>.underlines.json  (sections with underline flags)
npx tsx scripts/cds/commit.ts  <paperId>            # 5. dry-run: build + validate (no write)
npx tsx scripts/cds/preview.ts <paperId>            # 6. review HTML (out/<id>.preview.html)
npx tsx scripts/cds/commit.ts  <paperId> --apply    # 7. commit PRIVATE
```

Paper registry + the **section-type catalog** (the durable CDS knowledge: each section type →
chapter/subtopic + `underline`/`inlineStimulus`/`passage`/`perQuestionSubtopic` flags) live in
`config.ts`. Pure assembly + validation in `lib.ts` (TDD: `tests/cds-lib.test.ts`).

## The data files (per paper, committed under `data/`)

**`<id>.sections.json`** — `Section[]` in paper order, one set label per section:
```json
[{ "type": "antonyms", "qFrom": 1, "qTo": 10, "setLabel": "S1",
   "directions": "Each item in this section consists of a sentence with an underlined word ... opposite in meaning ..." },
 { "type": "reading-comprehension", "qFrom": 116, "qTo": 120, "setLabel": "S13",
   "directions": "Read the following passage ...", "passage": "As the new century begins ..." }]
```
`type` must be a key in `SECTION_CATALOG`. Capture `directions` **verbatim** (with or without the
`Directions:` prefix — it's normalized). For `passage`/`cloze` sections add the shared `passage`.

**`<id>.questions.json`** — `TQ[]`, one per question, with the **clean question-specific stem only**
(NO directions — those come from the section). `answer` is LLM-derived; rate `confidence`
HIGH/MED/LOW. Set `subtopic` when the section is `perQuestionSubtopic` (Grammar blanks, Spotting
Errors, RC). For `inlineStimulus` sections (match-list, S1-S2, rearrangement) put the List/sentences
**in the stem** (so the content_hash is unique). For `spotting-errors` give the 3 parts as options
A/B/C + `"No error"` as D — the stem is rebuilt + underlined from them.

**`<id>.underlines.json`** — `{ single: {n: word}, triple: {n: {1,2,3}} }` for `underline` sections.

## Hard-won rules (baked into `lib.ts`)

- **Directions in `context`, one set per section** — matches the NDA-English bank (887/900 store
  directions in context, 895/900 are in sets). `/browse` + Word export render the block once per set.
- **Directions are load-bearing** — synonyms vs antonyms look identical without them and flip the
  answer. The section-map's verbatim Directions are the source of truth for the task type.
- **Fold the per-question stimulus into the hash-bearing stem** — match-list code options + S1-S2
  share a generic stem; `content_hash` excludes `context`, so two would collide (silently dropped).
  `validateRows` fails the build on any collision.
- **Underlines** — `\(\underline{\text{word}}\)` (single/triple/errorParts); 0 unbalanced `\(\)`.
- **No official key** → every answer carries `[LLM-derived, confidence: …; verify before PUBLIC]`
  in `solution`. Spot-check all non-HIGH (and a HIGH sample) before flipping PUBLIC.
- **Cross-year duplicates** are kept as a recurrence signal; `content_hash` drops only EXACT repeats
  within the SAME exam (per-exam dedup, migration 0038) — CDS↔NDA shared UPSC questions land under both.
- **`sentence-part-rearrangement` ("Ordering of Words") = a spatial P/Q/R/S grid spanning BOTH columns.**
  Transcribe those pages from a **FULL-WIDTH hi-DPI render** (`fitz.Matrix(3.0+)`, whole page) — the default
  2.2x and especially per-column crops SPLIT the grid at the gutter and drop/scramble fragment text (Q21-30
  garbled on 2024-2; Q31-40 illegible-with-crops on 2022-2, recovered cleanly full-width). When the
  section-map flags a `sentence-part-rearrangement` section, render its pages full-width and give it its own pass.

## Status

- `2026-1` — committed PRIVATE (120). The trial that produced this pipeline; **back-ported to the standard `data/2026-1.*` shape 2026-06-16** (re-`commit`s as a 0-insert no-op — `inserted=0 skipped=120`), so all 19 papers are now reproducible identically via `commit.ts`. The legacy `final.json` + `commit-trial.ts` were removed.
- `2025-1` — committed PRIVATE (120). Validated the generalized pipeline (15 sections, 2 new
  section types `word-usage-count`/`word-usage-select`, cloze + dual match-lists; 0 collisions).
- `2025-2` — committed PRIVATE (120). 14 sections (no synonyms/antonyms/RC; opens with
  sentence-improvement; two match-lists + cloze). `commit`/`preview` now run `normalizeQuestions`
  to self-heal two recurring agent quirks (object-form `options`, difficulty synonyms/casing).
- `2024-1` — committed PRIVATE (120). 16 sections; has a 2-passage RC section (Q51-60). The RC
  passage prose was NOT stored (a subagent reproducing it tripped a content-filter) — `passage` is
  a placeholder pointing to the source; the RC questions+answers are transcribed (the agent read the
  passage to derive, without echoing it). Directions are paraphrased (the verbatim/passage capture
  was filter-blocked), not verbatim like the other papers.
- `2024-2` — committed PRIVATE (120). 16 sections; two new types `voice-transformation` + `word-meaning-statements` + `usage-statements`. Q44 is a cross-exam duplicate of an NDA English question — kept under both exams via the new **per-exam dedup** (migration 0038). **Caveat:** Q21–30 (sentence-part-rearrangement) are a spatial P/Q/R/S grid layout that OCR's poorly even at full-width hi-DPI — committed LOW-confidence, **verify against the source before PUBLIC**. Q31–40 (paragraph) re-done cleanly.
- `2023-1` — committed PRIVATE (120). 13 sections; clean (part-rearrangement Q21–30 came back mostly HIGH, unlike 2024-2's grid). 37 MED.
- `2023-2` — committed PRIVATE (120). Same 13-section template as 2023-1 (both 2023 sittings share layout). 36 MED.
- `2022-1` — committed PRIVATE (120). 13 sections (opens spotting-errors, word-class last). 45 MED — Q31–40 grid part-rearrangement binding + a few rearrangements whose natural order wasn't an option; flagged for key cross-check.
- `2022-2` — committed PRIVATE (120). 14 sections (opens with 3 RC passages). Q31–40 part-rearrangement grid re-done from a full-width render (the per-column crops left fragments illegible). 48 MED.
- `2021-1` — committed PRIVATE (120). 13 sections; Q31–40 grid done proactively from a full-width render (all HIGH). 38 MED.
- `2021-2` — committed PRIVATE (120). 13 sections; Q31–40 grid full-width (all HIGH). 50 MED.
- `2020-1` — committed PRIVATE (120). 12 sections; 3 new types `spelling-select` + `sentence-transformation` + `reported-speech` (Reported Speech → Direct/Indirect Speech). Q21–30 grid full-width. 40 MED.
- `2020-2` — committed PRIVATE (120). 11 sections (20-blank cloze; spelling-select). `normalizeQuestions` now also maps a rearrangement-grid agent's ordering-string `answer` (e.g. "QSPR") back to its option label. 34 MED.
- `2019-1` — committed PRIVATE (120). 13 sections (4 RC passages 51–70, 20-q spotting-errors, grid full-width). 34 MED.
- `2019-2` — committed PRIVATE (120). 13 sections, irregular boundaries (13-q grid, 15-q spotting-errors). Edge cases handled: 4 **five-option** spotting-errors (4 underlined parts + "No error") refit to 4 options (answer=No-error → 3 parts + No error; answer=a part → keep 4 parts, drop the unused No-error); RC (Q104–120) numbering had drifted + Q110 was off the 2.2x render — re-transcribed from full hi-DPI with verified number anchors. 33 MED.
- `2018-1` — committed PRIVATE (120). 13 sections (4 RC passages, 20-q spotting-errors, grid full-width). 55 MED (Q41–50 rearrangements low-confidence on a dense scan).
- `2018-2` — committed PRIVATE (120). 15 sections, irregular (20-q grid Q69–88, reported-speech + voice). Gotcha: a grid section's first item (Q69) sat at the bottom of the page BEFORE the rendered grid block — render one page earlier when the grid start is uncertain. 50 MED.
- `2017-1` — committed PRIVATE (120). 11 sections, old dense format (20-q grid Q1–20, 26-q spotting-errors with 4-part Q21–27, 22-q sentence-improvement, 6 RC passages). **Lowest-confidence paper — 60 MED** (the packed grid + rearrangements with blank-S fragments); prioritise for source review before PUBLIC.
- `2017-2` — committed PRIVATE (120). 12 sections (20-q paragraph-rearrange, 20-q part-rearrange grid, 5 RC passages, 25-q spotting-errors, Word-Substitution synonyms). 50 MED.

**INGESTION COMPLETE (2026-06-16):** all **19 CDS English papers** (2017-I … 2026-I) committed PRIVATE — **2280 questions**, every one with Directions-in-context + 4 options + exactly 1 correct; 253 sets.

## PUBLIC + 19 mock tests (2026-08-25)

The whole corpus is **PUBLIC** (`flip-public.ts`) and backs **19 timed mocks** at `/mock` — 120 q / 100 marks / 2 h, penalty 1/3 (`cds-<year>-<i|ii>-english`). The blind re-derivation of the LLM-derived keys was **deliberately deferred** by product decision; see the SUGGESTIONS.md backfill ledger.

### The defect class this surfaced — read before touching any CDS transcription

Preparing the mocks found **19 wrong answer keys**, and the mechanism matters more than the count: **the transcriber repeatedly copied the CORRECT option's text into the WRONG letter's slot and then keyed that letter.** The answer as *content* was right; the answer as a *letter* was wrong.

Three consequences, each learned the expensive way:

1. **Repairing option text alone makes a row WORSE.** It moves the correct answer to a different letter and leaves the key on a genuine distractor — while removing the duplicate that was the only tripwire. Text and key must move together; `apply-key-fixes.ts` asserts both the old and the new key and refuses if the new key still sits in a duplicate group.
2. **A BLIND RE-DERIVATION CANNOT CATCH IT.** The solver derives the right answer, finds that text at some label, and confirms that label. Proof, not inference: `question_reviews` holds `bank-paper:cds-english-blind-2026-08-23`, 89 rows, all `confirmed` — and one of them (2021-2 Q59) is a key we then proved wrong from the printed page. **Transcription fidelity is a PREREQUISITE control, not a parallel one.**
3. **Duplicate detection is a weak detector.** Sweeping the 60 match-list questions found **10 of 40 corrupted in the unswept papers — 0 of them with any duplicate**, 9 carrying live wrong keys. A swap or rotation of an option block leaves four distinct strings, invisible to `audit:keys`, to the duplicate scan, and to a set-only comparison.

**The check that does work, per question:** compare the option **set** against the printed page (catches a wrong option) **and separately** the label→text **ORDER** (catches a swap/rotation). Both. `2025-1` Q78 is the case that proves you need both — its set was wrong yet its key was still right, so a set-only check would have "fixed" it into being wrong.

**Root cause is LAYOUT, so triage by it:** 7 of the 10 sit in `2025-1` Q71-80, whose page interleaves three questions and three `Code:` tables across two columns — in column flow a table belongs to the question whose lists END the left column, not the one printed beside it. Blocks where the code table sits directly under its own question came back clean (2026-1 10/10, 2025-1 Q101-110 10/10). Note `2025-1`'s two blocks were transcribed to *opposite* standards in the same paper.

### Tools added

| script | what |
|---|---|
| `flip-public.ts` | PRIVATE→PUBLIC, scoped by `exam_id`; structural gate fails closed; warns on duplicate options and separates key-in-group from distractor-only; asserts a bank-wide PUBLIC delta so nothing outside CDS moved |
| `apply-key-fixes.ts` | the 20 adjudicated key corrections as data, each asserting old + new key; idempotent |
| `resync.ts` | deletes rows whose `content_hash` no longer matches the JSON, reusing the real commit pipeline to compute expected hashes; **refuses if a stale row is used in a teacher paper** |
| `verify-keys.ts` | asserts every adjudicated key is live, PUBLIC and unambiguous — reads expectations from `KEY_FIXES`, so there is no second copy to drift |
| `verify-mocks.ts` | asserts each mock's 120 refs resolve to live PUBLIC gradeable rows (a PRIVATE ref renders BLANK with no error and grades every answer wrong) |
| `matchlist-verify.ts` | re-asserts all 40 match-list code tables; proven to go red on an injected wrong code and an injected wrong key |
| `audit-keys.ts` | CDS-scoped structural probe (`npm run audit:keys` is hard-filtered to `question_kind='practice'`) |

**Order matters when repairing a live paper:** `commit.ts <paper> --apply --allow-unpublish` → `resync.ts <paper> --apply` → `flip-public.ts <paper> --apply`. `commit.ts` sets the WHOLE paper PRIVATE, not just new rows, so it now refuses to silently un-publish a live paper without that flag.

**Still owed:** human spot-check / blind re-derivation of the LLM-derived answers (no official keys exist), prioritising MED-flagged items — worst first by uncertain-row count: 2025-2 (62), 2017-1 (60), 2024-2 (58), 2018-1 (55), 2022-2 (53). The oldest dense scans and the part-rearrangement grids carry the most uncertainty. Treat the 89 rows of the 2026-08-23 blind run as **unverified** until their option sets have been checked against the source.
- `2024-1` was Elementary Mathematics; replaced with the correct English booklet 2026-06-15.
