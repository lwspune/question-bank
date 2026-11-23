# Model-answer edits (MH HSC 12): the agent's brief

One agent drafts minimal edits to a group of live model answers. **It drafts; the main session
reviews and applies** with `scripts/notes-pipeline/hsc/apply-solution-edits.ts`, which writes the
live row and every source copy. Written 2026-11-23 (owner: "fix it" on the board-notes leftovers).

Your input is `generated-papers/_ans-<group>.json` (and the readable `.md`): one object per row,
`{ id, chapter, kind, year, number, flagged, stem, solution }`. `kind: "pyq"` is a board
past-paper answer, `"practice"` a textbook exercise or solved example.

Your output is `generated-papers/_edits-<group>.json`, an array of
`{ "id": "<full uuid>", "why": "<one line>", "find": "<exact passage>", "replace": "<new passage>" }`,
and a short report `generated-papers/_edits-<group>.md` (under 60 lines).

**Keep tool output small.** Read in chunks of about 150 lines; never print a whole file.

## Hard limits

- Write ONLY those two files and scratch files named `generated-papers/_scratch-<group>-*`.
- Never: a DB write, git, `apply-solution-edits.ts`, any file under `src/` or `scripts/*/data`.
- Write the JSON with a script (Python `json.dump(..., ensure_ascii=False)` or Node), never by
  hand-typing escapes: the solutions are full of LaTeX backslashes.

## The edits

1. **Dashes.** Every em dash (—) and en dash (–) in every solution goes, except a minus sign
   inside maths (those are − or -, not dashes; leave maths alone). Replace each with what the
   sentence needs: a full stop, a colon, a comma, or brackets. A range "2–4 mm" becomes "2 to 4 mm".
   Do not reword anything else in the sentence unless the punctuation alone reads badly.
2. **Flagged rows** (`flagged: true`): the review found a specific problem. Read the chapter's
   report `generated-papers/_prep-hscp-<xx>.md` for what it is, check it against the textbook
   chapter PDF in `C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Physics\State_Board\Topics\12th_Topics\`
   (`pdftotext "<pdf>" - | grep -i ...`, small outputs), and fix it if the fix is in the text:
   - A **method note** (a line on how the answer was got or checked against outside sources:
     "checked numerically with...", "re-derived from accepted masses", "agrees with the accepted
     value", "Note: the chapter lists...") goes. Keep a line that changes what the student does
     with this question: a misprint, a wrong printed key, a question that cannot be answered as
     printed. Keep plain "Check:" lines that verify the student's own arithmetic.
   - A **fact the textbook states differently** is aligned with the book (values, lists, names).
   - A **garbled or thin answer** is rewritten to what its marks need, in the same style.
   - A `[Textbook ...]` note says "above" when the working is below: fix the word.
   - A problem that needs a FIGURE, or a change to the STEM or options, cannot be fixed here: list
     it in the report, do not edit.
3. Nothing else. No style rewrites of answers that are fine.

## Rules for `find`

- `find` must occur EXACTLY ONCE in the current solution. Include enough context (about 15 to 30
  characters either side) to make it unique.
- Several edits on one row are applied in order, each to the result of the one before, so a later
  `find` must match the text AFTER earlier edits on that row.
- Keep `\(...\)` delimiters balanced in every `replace`; never split a maths zone.

## Before you finish

Run a check script over your edits against `_ans-<group>.json`: apply them in order per row and
confirm that every `find` matched exactly once, that no — or – is left in any edited row's text
outside maths, that `\(` and `\)` counts are equal in every result, and that every row with a dash
has at least one edit. Report the counts.

Final message (short): rows edited, dashes removed, flagged rows fixed (one line each), flagged
rows left (and why), anything you are unsure of.
