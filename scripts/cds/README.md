# CDS English ingestion

Scanned CDS English booklets (image PDFs, **no text layer**, **no answer key**) → the bank,
PRIVATE, `question_kind='pyq'`. Answers are **LLM-derived** + confidence-flagged; a human
spot-checks before flipping PUBLIC. New exam **CDS** reuses the NDA-English taxonomy.

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

- `2026-1` — committed PRIVATE (120). The trial that produced this pipeline.
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

**INGESTION COMPLETE (2026-06-16):** all **19 CDS English papers** (2017-I … 2026-I) committed PRIVATE — **2280 questions**, every one with Directions-in-context + 4 options + exactly 1 correct; 253 sets. **Before flipping PUBLIC:** human spot-check the LLM-derived answers (no official keys exist), prioritising MED-flagged items; the oldest dense scans (2017-1 especially, + the part-rearrangement grids) carry the most uncertainty.
- `2024-1` was Elementary Mathematics; replaced with the correct English booklet 2026-06-15.
