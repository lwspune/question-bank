# Coaching-book chapters (scanned) -> practice questions

The lane that took GPCC NKL Physics Vol II Ch. 23-29 into NEET practice (2026-10-30: 938
questions, 144 redrawn figures). A chapter is a phone scan of a printed two-column book: sections
numbered from 1, each with an ANSWER KEY table (an image, no text layer) and SOLUTIONS (often
not scanned). It rides the Pariksha lane (`../commit.ts`, `../attach-images.ts`,
`../flip-public.ts`, `../preview.ts`) as one `TESTS` entry per chapter in `../config.ts`.

## The method, and why
- **Transcribe, then solve blind.** Pass A agents transcribe and read the printed key into a
  separate file; Pass B agents (fresh, never shown a key or a page image) solve every question.
  Diffing the two catches book key errors AND transcription slips: on Ch. 23-28, 862 of 880
  keyed questions agreed outright, and the 18 that did not split into 7 book key errors and 11
  places where the book was right (convention, a trap, a figure misread by the solver).
- **The main session settles every disagreement by hand**, re-deriving it and reading the
  scan (zoomed) whenever a figure is involved. Never by default in either direction.
- **Figures are redrawn, not cropped** (Pass C), and every one is checked side by side.

## Runbook (per chapter; `<WORK>` = a folder in the session's scratchpad)
1. **Register**: a `TESTS` entry in `../config.ts` (sourceFile, pdf, `hasKey: true`, ONE subject,
   `chapterHint` = the bank chapter, `questionCount: 0` until step 5).
2. **Render**: `python -P scripts/pariksha/book/render-columns.py "<pdf>" <WORK> <testId>`.
   Look at a few pages first: which pages are missing, is it really two-column.
3. **Pass A** (agents, `PASS_A.md`): one agent per chapter, or per ~20 pages (split slices write
   `<testId>a.A.json`, `<testId>b.A.json`). Output `<WORK>/drafts/<testId>*.A.json` + `*.keys.json`.
   Each section's count must match its key table: a gap there is a missing QUESTION page; a
   skipped page between key and next section is only solutions.
4. **Crops + Pass B**: `python -P scripts/pariksha/book/figcrop.py <WORK> <testId>`, then one
   solve agent per A file (`PASS_B.md`) -> `<testId>*.B.json`.
5. **Assemble + settle**: `npx tsx scripts/pariksha/book/assemble.ts <testId> <WORK>` prints
   coverage (both ways), held rows and every disagreement. Settle each in
   `<WORK>/drafts/<testId>.settle.json`:
   ```jsonc
   { "27.1 Q6":  { "answer": 3, "solution": "**Note:** The book's key gives option (4) ... \n\n<working>" },
     "26.2 Q21": { "solution": "**Note:** As worded ... (defective, key kept)\n\n<working>" },
     "27.1 Q28": { "hold": "options clipped at the scan's edge; needs a rescan" } }
   ```
   Then `--write`, set `questionCount` to the number it prints, and dry-run `../commit.ts`.
6. **Commit PRIVATE**: `npx tsx scripts/pariksha/commit.ts <testId> --apply`. Two kinds of skip are
   expected and harmless: an exact repeat inside the book (dropped before insert) and a question
   already in the exam (the DB's content-hash dedup; find which row with `question_number`).
7. **Pass C** (agents, `PASS_C.md`) -> `<WORK>/figdraft/<testId>/figures*.py` + PNGs + sheets.
   The main session reads every sheet; then copy the scripts and the PNGs of COMMITTED figure
   questions into `scripts/pariksha/figures/<testId>/`, write `data/<testId>.figures.json` as
   `{ "<ref>": { "png": "scripts/pariksha/figures/<testId>/<ref_>.png" } }`, and run
   `../attach-images.ts <testId> --apply`.
8. **Review + flip**: `../preview.ts <testId>` for the owner; `npm run audit:text -- <srcSubstr>`
   and `npm run audit:figures -- <srcSubstr>`; on the owner's OK
   `../flip-public.ts <testId> --apply --force` (`--force` skips the scan-crop figure gate, which
   does not apply to redraws).

## Settling rules (the owner's defective-question policy, 2026-10-29)
- **Book key wrong, maths certain** -> the correct answer, with a `**Note:**` above the solution
  saying the book's key differs and why.
- **Defective as printed** (no option right, two right, a value missing) -> keep the book's key,
  `**Note:**` saying exactly what is wrong. Not hidden.
- **Book right after all** -> the printed key, with a solution that shows why (the virtual-object
  convention, magnitudes vs signs, a forward-biased zener). A solver's figure reading is a claim:
  check the scan zoomed before calling anything defective (Ch. 23's 23.1 Q11 was wrongly flagged
  until M2 was seen to be convex).
- **A value clipped at the scan's edge, or garbled in print** -> `hold`, listed for a rescan.
- **Repeats** with reordered options are held by hand (the dedup only catches exact repeats).

## Files
`assemble-core.ts` (pure, `tests/pariksha-book-assemble.test.ts`) · `assemble.ts` (CLI) ·
`render-columns.py` · `figcrop.py` · `compare.py` · `PASS_A.md` · `PASS_B.md` · `PASS_C.md`.
