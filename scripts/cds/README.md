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
  (commit reports `skipped`).

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
- Remaining 2017–2023 papers: render → section-map → transcribe → commit.
- `2024-1` was Elementary Mathematics; replaced with the correct English booklet 2026-06-15.
