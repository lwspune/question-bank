# GATE (Computer Science): past papers

GATE is the IITs' and IISc's entrance to M.Tech and the screen for PSU jobs. Each year's
organising institute publishes every master question paper and its **final** answer key; the
key is the answer of record, and nothing is committed on anything else.

## Status

| Paper | Organiser | Questions | Blind solve vs final key | State |
|---|---|---|---|---|
| 2026 Set 1 | IIT Guwahati | 65 (28 MCQ, 24 MSQ, 13 NAT) | 65/65 | PRIVATE (Wave 1) |
| 2026 Set 2 | IIT Guwahati | 65 (35 / 11 / 19) | 64/65 (Q58: TCP round count, key right) | PRIVATE |
| 2025 Set 1 | IIT Roorkee | 65 (30 / 13 / 22) | 64/65 (Q44: L1 is not regular, key right) | PRIVATE |
| 2025 Set 2 | IIT Roorkee | 65 (32 / 18 / 15) | 62/65 (Q27, Q47, Q51: all key right) | PRIVATE |
| 2024 Set 1 | IISc Bengaluru | 65 (29 / 20 / 16) | 63/65 (Q48: text layer lost 2^20; Q10: see below) | PRIVATE |
| 2024 Set 2 | IISc Bengaluru | 65 (32 / 18 / 15) | 65/65 | PRIVATE |

**383/390 blind (98.2%).** Every disagreement was re-derived by the main session (the
settlement and its reason are in `data/<paper>.settle.json`). The key stood every time.
**2024 Set 1 Q10** (squares to add for a line of symmetry): two independent counts of the
printed figure give 5 (C); IISc's final key marks 6 (A). Key kept, a notice above the
solution, grace in mocks (owner policy 2026-10-29).

Wave 2 (owner, 2026-11-23: "only wave one" for now): 2012-2023 papers. Sources, all official
prints, are in `memory/project_gate_cs_ingestion.md` (IISc's wp-content archive for 2014 and
2019-2023; the Wayback Machine's copy of IIT Kharagpur's archive for 2007-2018).

## Method

```
src/<paper>-paper.pdf --extract.py--> work/<paper>/{pages,text,anchors.json,cand,figures.json}
src/<paper>-key.pdf   --keyrows.py--> work/keys/<paper>.keyrows.json --buildkey.ts--> data/<paper>.key.json
                                       (checked against the rendered key page by a person)
helper (DRAFT_BRIEF.md, never sees a key) --> blind/<paper>/derived.json
compare.ts: blind vs key --> the main session settles each disagreement in data/<paper>.settle.json
assemble.ts: derived + settle --> data/<paper>.questions.json
figures.py: derived hints + settle --> figures/<paper>/Q<nn>.png + sheet.png (LOOK at it)
commit.ts (dry run, then --apply) --> the bank, PRIVATE
```

- **Keys are read by word position, never `pdftotext -layout`**: the layout text shifted a cell
  into the next row (2026 Set 2 printed Q26's key on Q30's line). `parseKeyRows` refuses a cell it
  cannot read, a GA/CS section that does not match the number, and marks that disagree with the
  printed layout (GA Q1-5 one mark, Q6-10 two; CS Q11-35 one, Q36-65 two).
- **The text layer drops superscripts**: 2024 Set 1 Q48 compared with "220" and "210" where the
  page prints \(2^{20}\) and \(2^{10}\). PyMuPDF flags superscript spans; check every printed
  superscript appears as a power in the transcription (the audit used in Wave 1 is a 40-line
  script: span flags & 1, owner question by anchor, normalise math italics, primes, bars, stars).
- **Watermarks**: 2025 and 2026 paint a full-page background image (and a logo) on every page;
  2024 draws a grey "GATE 2024" as shapes at fill opacity .50. `pdfclean.py` deletes the images
  that recur on 5+ pages and makes every half-transparent graphics state invisible before any
  figure is cut. The commit still runs the watermark gate on every figure.
- **Code**: C, pseudocode and SQL go in fenced blocks (```c ... ```), which the bank renders
  monospace with its spacing kept (parseTableBlocks, 2026-11-23). **Options never hold a fence**
  (options render inline everywhere): an option's code is written as plain lines, and an output
  pattern of `*`, `$` and `#` as `\(\texttt{**\$*\#\#\#}\)`, or the page reads it as bold and maths.
- **Never inline backticks**: the bank uses them as quote marks.
- The dry run of `commit.ts` refuses a literal backslash-n outside a code fence, a control
  character (a Python string that ate `\alpha` writes BEL + "lpha"), a method note (0280), a code
  fence in an option, a context, and lists every word that will render bold or italic.

## Commands

```sh
python -P -E scripts/gate/extract.py 2026-cs1        # pages, text, anchors, figure candidates
python -P -E scripts/gate/keyrows.py 2026-cs1        # the key's rows by word position
npx tsx scripts/gate/buildkey.ts 2026-cs1             # -> data/2026-cs1.key.json
npx tsx scripts/gate/compare.ts 2026-cs1              # blind vs key, after the helper's draft
npx tsx scripts/gate/assemble.ts 2026-cs1             # draft + settlement -> questions.json
python -P -E scripts/gate/figures.py 2026-cs1        # figures + sheet.png
npx tsx scripts/gate/commit.ts 2026-cs1               # dry run
npx tsx scripts/gate/seed.ts 2026-cs1 --apply         # exam + the subjects this paper uses, right before:
npx tsx scripts/gate/commit.ts 2026-cs1 --apply       # PRIVATE
npx tsx scripts/mocks/build.ts --paper=gate           # six mocks (dry run; --apply writes drafts)
```

`seed.ts` and `commit.ts` read the production settings from the environment: a worktree holds
only `.env.test.local` (2026-11-18 incident). Python runs with `-P -E` (not `-I`: PyMuPDF lives in
user site-packages), and `figures.py`/`extract.py` add only their own folder to the path.

## Taxonomy

Subjects: General Aptitude, then the ten sections of the official CS syllabus in its order
(`GATE_CS_SUBJECTS`). Chapters are the syllabus's own items, fixed in `config.ts` `CATALOG`; a
transcription naming any other chapter is refused. Subtopics are free text.

## Mocks

`gatePaper()`: 3 hours, 100 marks, sections by printed number (GA 1 mark, GA 2 marks, CS 1 mark,
CS 2 marks). A wrong MCQ costs a third of its marks; MSQ (exact set only) and NAT cost nothing
(`gateNoPenalty` marks those rows). One mock per paper: `gate-cs-<year>-cs<set>`.
