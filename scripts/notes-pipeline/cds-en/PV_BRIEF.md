# CDS English — PAGE VERIFICATION BRIEF (one agent = one paper, every row)

You verify ONE CDS English paper (120 rows) against its PRINTED PAGES. Every row, not a sample.
You are READ-ONLY: never pass `--apply`, never write to the DB, never edit scripts/cds/data/* or any repo file.
The only files you write are your two outputs in generated-papers/ (named below).

## Inputs (paper id = <PID>, e.g. 2019-2)
- `generated-papers/_pv_<PID>.md` — every bank row as students see it, in paper order: full id, chapter / subtopic,
  set context (directions / passage, printed once per set), stem, options. No keys.
- `generated-papers/_pv_<PID>_keys.md` — keys, solutions, PRECHECK flags. **Do not open it until you have answered
  every item yourself from the pages** (write your answers down first; see the ledger below).
- Pages: `scripts/cds/out/<PID>/p01.png ...` (read them in order; the paper is ~24-32 pages; English text is on
  alternate pages in bilingual papers, so skim past Hindi pages).
- Source of record (to see how a row is built): `scripts/cds/data/<PID>.{sections,questions,underlines}.json`,
  builder `scripts/cds/lib.ts` (`buildRecords`). Read the relevant part of lib.ts before writing any stem fix.

## What to check for EVERY row (compare bank text with the page)
1. Stem wording — exact words, no dropped/added words, no "corrected" printed errors (a spotting-error item must keep
   the printed error; an item whose page error was silently fixed is a defect).
2. Underline — the underlined word/phrase in the bank is the one underlined on the page.
3. Options — each label's text matches the page's (a)/(b)/(c)/(d) exactly; watch for options shifted between labels.
4. Set/section — the row sits under the right directions; RC passages and cloze passages match the page
   (wording, blank numbering). Directions in the bank are often a short PARAPHRASE of the printed directions — that is
   the house style; report directions only when they describe a different task or omit something needed to answer.
5. Chapter / subtopic — report a row filed under a chapter that does not match its printed section.
6. Answer — answer the item yourself from the page. Then open the keys file and compare. On a disagreement, think
   again; if you still disagree, write the case (see outputs). Papers before 2026-II have DERIVED keys (no official
   key existed), so a wrong key is possible. **2026-2 keys come from UPSC's provisional key: report a disagreement,
   but do not put a key change for 2026-2 in the spec.**
7. Solution — agrees with the key, explains the English correctly, and carries no internal notes ("KEY FIX
   PENDING", "scan", "OCR", "bank", "transcribed", page refs, tool names). PRECHECK flags point at likely problems;
   they are not verdicts (e.g. "scant" can trip the "scan" flag).

## Output 1 — fix spec `generated-papers/_fix-cdsen-pv-<PID>.json`
Follow `scripts/notes-pipeline/cds-en/FIX_BRIEF.md` exactly (format, verdicts, reasoning rules, dry-run validation),
with paper = <PID>. Only what `scripts/cds/apply-notes-fixes.ts` can express: answer, reasoning, stem (source stem as
printed, plain text, no markup), option texts, single-underline token. Run the dry run; it must end with
"dry run — add --apply to write" and no error. If you have no fixes, write `[]`.
A key change needs `from` and new reasoning arguing the new answer.

## Output 2 — report `generated-papers/_pv-report-<PID>.md`
```
# <PID> page verification
checked: 120/120 rows · pages read: p01-pNN
spec: N entries (key_fixed a · stem_fixed b · solution_rewritten c) · dry run OK

## Ledger (one line per row, all 120)
Q1 mine=B key=B ok
Q2 mine=C key=C FIX options(B,D swapped)
Q3 mine=A key=D DISPUTE (see below)
...

## Key disputes
Q3 <id8>: printed item, why <mine> and not <key>, how sure you are. (also in spec unless 2026-2)

## Not expressible in the spec (exact printed text required)
- sections.json: wrong directions / section boundary / type, passage wording, cloze blank numbering,
  a misfiled chapter, a multi-word or double underline, anything else.
```
Final message: three lines — counts (rows checked, spec entries by verdict, disputes), dry-run result, and the
number of not-expressible items. Keep tool outputs small (use head/grep; don't print whole files).

## Scratch files
Other agents run at the same time. Any scratch file you write (in the scratchpad or anywhere) must be prefixed
`pv<PID>_` (e.g. `pv2024-2_answers.txt`). Never write an unprefixed name like m.txt or k.txt.

## Ordering keys
When you argue a key for a sentence-ordering item, test EVERY printed option against your reasoning, not only the
one you prefer. (A 2017-1 claim that "only (b) keeps Q-S together" missed that (c) did too, and (c) was better.)
