# MHT-CET PYQ ingestion pipeline

> ## The source is the `.docx` paper, never the `.xlsx` question bank
>
> **Canonical papers: `C:\Vilas\LWS_Pune\MHT-CET\PYQPs\{2021..2025}\`** (`C:\tmp\PYQPs\MHT-CET\`
> is an older mirror). This holds for FIGURES exactly as much as for stems, options and keys.
>
> The `*_QuestionBank.xlsx` files named in `questions.source_file` for the 2023–24 rows are
> **not an independent source — they ARE what the bank was ingested from**, same garbled
> options and same key, so they can only ever reproduce a gap, never close one.
>
> **Figures are EMBEDDED RASTERS**, so take them with
> `pandoc "<paper>.docx" -t markdown --extract-media=<dir>` — the exact picture the author
> inserted, native resolution, leak-free by construction. Do not render the page and crop it;
> that is the fallback for ink-only books (`scripts/lib/figures/derive.py`) and it is strictly
> worse here.
>
> **Resolve a row to its paper by `pyq_year` + `pyq_note`, NEVER by `source_file`.**
> `MHT_CET_3rdMay2023_S1_QB.xlsx` contains a row whose note reads "3rd May **2nd** Shift": the
> note records the sitting, the filename records which spreadsheet it was typed out of. Getting
> this wrong attaches a figure from the wrong shift, which is worse than leaving it missing.
>
> Runner for the figure gap: `scripts/figures/backfill-mhtcet.ts`. See
> `[[mhtcet-source-docx-render]]`.

## 2026 onward: the source is a typeset PDF (`PDF_SHIFTS` in `config.ts`)

`PYQPs\2026\` holds one third-party PDF per shift (26 shifts, key on the last pages).
Sections run **Chemistry 1-50, Maths 51-100, Physics 101-150**. The prose is a real text
layer but every formula and number is drawn as vector paths, so each question is
**transcribed by hand from a crop**, and the text layer is used only to check the
transcription. Every figure carries the publisher's watermark, so **no source figure is
ever uploaded**: each is redrawn from its content (RDKit structures from SMILES, schemdraw
circuits, matplotlib graphs; `figures/2026/draw.py`), or written as LaTeX where the
"figure" is really a formula or a reaction scheme.

```sh
python scripts/mhtcet/pdf-extract.py "<paper.pdf>" <shiftId>     # crops + key + text layer -> out/pdf/<id>/ (fails unless 150 + 150)
npx tsx scripts/mhtcet/dump-taxonomy.ts                           # live chapters/subtopics -> out/taxonomy.json
# author transcripts/<id>.txt (format: transcript.ts) — stem, options, chapter, subtopic,
# difficulty, OUR answer, OUR solution. Solve BEFORE looking at the PDF key.
python scripts/mhtcet/figures/2026/<id>/figures.py                # redraw -> qNNN.png / qNNN-A..D.png
npx tsx scripts/mhtcet/build-pdf-shift.ts <id> --partial          # check as you go (writes nothing)
npx tsx scripts/mhtcet/build-pdf-shift.ts <id>                    # -> out/<id>.records.json + shifts/<id>.json
# then steps 6-9 below exactly as for a docx shift (commit, attach-images, validate-db, flip-public)
```

`build-pdf-shift.ts` refuses to write until: every chapter + subtopic exists live; every
word of the PDF text layer appears in the transcription and no prose word is invented
(`pdfSource.textLayerFidelity` — formulas are checked by the key, not by this); KaTeX,
delimiters and raw-unicode are clean; every declared figure exists; a question printed
with a figure declares one (or a `note:` says it became text); and every answer that
differs from the PDF key carries a `note:`. The transcript is the source of record —
commit it, the figures' `figures.py` and their PNGs.

It also checks **the text commit.ts will store, not the transcript** (`lib.commitText`):
the function-name upgrade reaches prose inside math, so `\text{during expansion}` became
`\exp ansion` (19 May S2 Q116). Keep prose outside `\( \)`.

**Difficulty must be graded on the bank's scale.** The first 2026 labels ran far easier
than 2021-2025 (Maths HARD 11% against 29-46%) and every one had to be re-graded. So
`build-pdf-shift` refuses a subject whose EASY or HARD share sits more than 20 points from
`difficulty-baseline.json` (2023-2025 mix, written by `difficulty-baseline.ts`; pure core
`difficultyDrift.ts`). Grade each question against 2023-2025 samples of its own chapter. A
label changed after commit reaches the bank only through `sync-difficulty.ts <id> --apply`,
because commit.ts skips a row that already exists.

**Before flipping a new year PUBLIC, forecast what goes stale.** The three guides and the
MHT-CET `/notes` intros quote bank counts in hand-written prose, so the flip moves numbers
nothing re-derives. Run the read-only checks first and plan the refresh with the flip:
`npx vitest run --config vitest.prod-contract.config.ts tests/guide-mht-cet-*.test.ts
tests/notes-intro-counts.test.ts`, then `npm run mhtcet:matrix` (x3) and the
`tests/mhtcet-*trends-reconcile.test.ts` suites after it. The 2026 flip found 3 guides and
41 notes counts stale only after the fact.

Pilot `2026-apr-15-s1` (2026-10-12): 150/150 committed PRIVATE, 0 key disagreements,
2 figure questions (Q39 four RDKit structures, Q128 schemdraw circuit).

## 2021-2025: LWS `.docx` papers

Ingests LWS-typed reproductions of MHT-CET PCM shifts (born-digital OMML `.docx`,
one file = all three subjects continuously numbered Physics 1-50 / Chemistry
51-100 / Maths 101-150, plus a **separate `<paper>_AK.docx`** holding the answer
letter + a worked reference solution per question).

Modeled on `scripts/jee/` (pandoc → `commitStaged`). The AK answer + solution are
captured **only as a cross-check reference** — we author our OWN answer + solution
(verification = independent re-derivation), because the LWS reproductions carry
occasional wrong keys (errors cluster in hard numerics + reaction/IUPAC naming).

## Per-shift flow

A shift's metadata + source paths live in the `SHIFTS` registry in `config.ts`.
Generated artifacts go under `out/` (gitignored); the curated derivation lives in
`shifts/<shiftId>.json` (committed audit trail).

```sh
# 0. (once) dump the live MHT-CET taxonomy the agents classify into
npx tsx scripts/mhtcet/dump-taxonomy.ts          # -> out/taxonomy.json

# 1. extract QP + AK -> out/<shiftId>.records.json  (pandoc, no DB)
npx tsx scripts/mhtcet/extract.ts "<QP.docx>" "<AK.docx>" <shiftId>

# 2. split records per subject for the derivation agents
#    (python: out/<shiftId>.records.json -> out/split/<shiftId>.{physics,chemistry,maths}.json)

# 3. DERIVE: 3 parallel agents (one per subject) each read their split records +
#    out/taxonomy.json, INDEPENDENTLY solve, classify into EXISTING chapter+subtopic,
#    author a clean solution, cross-check vs the AK letter, and WRITE
#    shifts/<shiftId>.<subject>.json. Figure Qs: read the PNG at imageRefs.

# 4. merge the 3 fragments -> shifts/<shiftId>.json (validates 150 keys + fields,
#    coerces array-form optionOverrides, reports disagreements + flawed)
npx tsx scripts/mhtcet/merge-shift.ts <shiftId>

# 5. RECONCILE: apply any stem fixes the agents flagged (dropped-digit typos via
#    stemOverride), set figureRefIndex / optionFigures / optionImages / flawed.
#    Re-run merge-shift after edits.

# 6. commit PRIVATE (commitStaged: dedup / taxonomy / content_hash)
npx tsx scripts/mhtcet/commit.ts <shiftId>           # dry-run (chapter distribution)
npx tsx scripts/mhtcet/commit.ts <shiftId> --apply

# 7. attach figures (stem / option-figure / option-image)
npx tsx scripts/mhtcet/attach-images.ts <shiftId> --apply

# 8. validate the committed rows (KaTeX / leaks / delimiters / unicode / completeness)
npx tsx scripts/mhtcet/validate-db.ts <shiftId>

# 9. flip PUBLIC (everything except `flawed` rows)
npx tsx scripts/mhtcet/flip-public.ts <shiftId> --apply

# 10. animated solutions, once MHT-CET is in VISUAL_INGESTION_FROM (src/lib/visuals/launch.ts):
#     the agents drafted each question's verdict + visual with its solution (scripts/visuals/README.md)
npm run visuals:run -- <batch>            # check + review sheet; LOOK at it
npm run visuals:run -- <batch> --apply    # writes solution_visual only
```

## Figure-as-option questions ("which structure/graph is X")

- **Default to ATTACH, not describe.** Set `optionFigures: true` to attach the option figures (5 imageRefs → stem + A-D; 4 → A-D). Only use `optionImages: true` (describe each option in text) when the description is **faithful AND does not name the answer** — for "identify the structure of [named compound]" the text route names the answer (a giveaway: e.g. option A = "…— phloroglucinol"), so attach instead. Verify the image→option order before flipping PUBLIC (the answer's option must map to the right figure).
- **`commit.ts` hardens the content_hash for `optionFigures` rows** — it hashes on each option image's content (sha256 of the bytes), not the neutral `(A)(B)(C)(D)` labels, so two image-option questions sharing a stem + answer can't collide and silently drop. (Text-option rows hash on option text as before.) Because of this, editing/adding an `optionFigures` row changes its hash → delete-then-recommit it (the whole shift is re-set PRIVATE by commit, then flip-public restores it).

## Gotchas (banked from the 2025 April ingest)

- **Verify EVERY classification against `out/taxonomy.json` before commit** — a
  cross-subject mis-file (e.g. a Chemistry Q sent to the Physics chapter
  "Semiconductor Devices") auto-creates an empty chapter. `merge-shift`'s consumer
  should diff (chapter, subtopic) against taxonomy; clean up any auto-create.
- **The re-commit-after-edit hazard:** `content_hash = sha256(stem + options + answer)`.
  Editing a committed stem/option/answer changes the hash, so re-running `commit`
  INSERTS a new row + orphans the old one. Always DELETE the affected rows first,
  then re-commit (others dedup-skip). Editing only the solution is safe (not hashed),
  but `commit` won't UPDATE an existing row's solution (upsert ignores duplicates) —
  delete + recommit to change a solution too.
- **`cleanupArtifacts` (in `lib.ts`) runs at commit before hashing** and strips the
  recurring pandoc artifacts (trailing `\\`, stray `\`/`\ ` before a math close,
  `\\[Npt]`, glued macros `\sim`/`\mid`/`\land`/`\in`/`\int`/`\angle`/long-arrows,
  `\leqslant` splits). Add new globbed-macro patterns here as future papers expose them.
- **Agent output quirks to expect:** `optionOverrides` emitted as an array instead of
  an object (merge-shift coerces); raw unicode (×, ², Å) or `_2_{(g)}` double-subscripts
  in solutions (validate-db flags; fix per-shift). Authoring LaTeX-heavy `stemOverride`
  strings via an inline heredoc corrupts backslashes — use a `.py` file with raw strings.
- Per-exam dedup auto-skips exact cross-shift recurrences; near-dupes are kept
  intentionally (recurrence signal).
