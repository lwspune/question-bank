# Grounding + key-audit pipeline (NDA Maths first)

Builds the RAG **augmentation** layer (`questions.plain_text` + `questions.solution_json`)
AND runs a high-precision **wrong-key audit** as a side-effect. Migration `0040`
added the columns + the `embeddings` table + `match_chunks` RPC.

Pure helpers: `lib.ts` (TDD `tests/grounding-extract.test.ts`). All scripts load
`.env.local` (service-role) and are idempotent.

## The two derived fields
- **`plain_text`** — deterministic `latexToPlainText(context+text)`, no LLM. The
  embedding/retrieval input. Backfill independently: `backfill-plain-text.ts`.
- **`solution_json`** — `{approach, steps[], final_answer, option_matched}`, authored
  by **blind agents** (they never see `is_correct`), so `option_matched` vs the
  verified key is a real audit.

## Per-wave cadence (the deliberate loop)
1. **Export** 4 non-overlapping batches of 25:
   `export-batch.ts w<N>b0<1..4> --limit 25 --offset 0|25|50|75`
   (NDA Maths PUBLIC pyq, `solution_json IS NULL` — committed rows drop out, so
   offset 0 always takes the next un-grounded rows.)
2. **Structure** — one blind Sonnet agent per batch: reads `data/<batch>.input.json`,
   writes `data/<batch>.solution.json` (`[{id, approach, steps[], final_answer,
   option_matched}]`). Agents MUST emit the FULL uuid (a truncated id is skipped by
   commit, not crashed — UUID guard in `commit.ts`).
3. **Commit** — `commit.ts <batch> --apply`. Agreeing rows write `solution_json` +
   `plain_text` + provenance; **disputes (option_matched ≠ key) are HELD** (never
   written — the grounding layer must never contradict the verified key) and logged
   to `scripts/logs/key-mismatches.jsonl`.
4. **Source-verify the disputes** (the deliberate gate). Pull each held row's
   `pyq_year/pyq_month/question_number`, group by paper, and run one agent per paper
   over the local scans `C:\tmp\PYQPs\NDA\NDA_Maths_PYQPs\Maths_<YEAR>_NDA<1|2>.pdf`
   (Apr=NDA1, Sep=NDA2; no printed key → confirm the stem/options extraction +
   re-derive). Each writes a verdict file: `keep_key | flip_key | fix_stem |
   preserve_flawed | needs_human`.
5. **Apply** source-confirmed fixes: `apply-fix.ts <name> --apply` from
   `data/<name>.fixes.json` (`[{id, text?, context?, options?, new_label, solution}]`)
   — flips `is_correct`, rewrites stem/options/solution, **recomputes content_hash**
   (collision-guarded). Solutions: LaTeX only, NO unicode math (× ÷ → ² etc.).
6. **Re-commit** the fixed batches — corrected rows now agree, so they ground.

## Findings so far (NDA Maths)
- ~5–11% of structured rows dispute the bank; **source-verified ~90% are real**
  (wrong key or corrupt extraction) — a major bank-quality result on "audit-closed"
  content. Wave 1: 4/5 real. Waves 2–3: 17/18 of the verified disputes were real fixes.
- The disagreement is the AUDIT; the agreeing rows are the GROUNDING. Both ship.

## Deferred / edge cases
- **`05c32038` set (2025 NDA1 Q99 + sibling Q100 `d80c28cc`)** — doubly corrupt
  (shared `f(x)=[√x]` context wrong → `[x²]`; Q100 stem `∫√2 to √2` also wrong).
  Needs a focused two-question source read; left ungrounded for now.
- **Flawed-but-keep-official** (e.g. `1431f3ac`, `1e76ff0d`) — bank key stays; these
  may re-hold each wave (agent disagrees) until grounded by hand — harmless churn.

## Retrieval half (not built yet)
`backfill-plain-text.ts --apply` over all pyq → generate embeddings (keyless model,
TBD: Supabase `gte-small` edge fn vs local `bge-small`) → `match_chunks` is ready.
Then the cross-app grounding/retrieval API (mirror `src/app/api/sync/mock/route.ts`)
that nda-tracker's tutor calls.
