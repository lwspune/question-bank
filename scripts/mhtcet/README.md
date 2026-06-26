# MHT-CET PYQ ingestion pipeline

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
