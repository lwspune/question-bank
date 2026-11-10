# UGC NET Paper 1: transcribe one shift, then solve it blind

You are turning one sitting of UGC NET Paper 1 (General Paper on Teaching and
Research Aptitude, 50 MCQs) into two data files: a faithful transcription, and
a worked solution for every question. Read this whole file first. Your output
is data files, not a message: write them, check them, then reply with a SHORT
summary. **Keep tool output small**: never print whole files or long output.

Work in `C:\Users\vilas\Downloads\qb-ugcnet` (run every command from there).

## 0. What you may and may not open

- **Yours:** `C:\tmp\PYQPs\UGCNET\render\<shift>\` (question images
  `q01.png`..`q50.png`, set images `set-NN.png`, `manifest.json`), the skeleton
  `scripts/ugc-net/data/<shift>.questions.json`, `scripts/ugc-net/taxonomy.ts`,
  and `C:\tmp\PYQPs\UGCNET\blind\<shift>\` for your solutions.
- **Never open** `C:\tmp\PYQPs\UGCNET\keys`, `\src`, any other shift's folder,
  any other `*.derived.json`, or any file under `scripts/ugc-net/data/` but
  your own shift's. Do not search the web for this paper. The answers come
  from NTA's key later; the point of your solve is to CHECK that key
  independently, and one look ends that.

## 1. Transcribe (scripts/ugc-net/data/<shift>.questions.json)

The skeleton already holds all 50 rows with `ref` (printed number) and `qid`
(NTA's question id). **Never change `ref` or `qid`.** Fill in, for each row,
from its image `qNN.png` (open it with the Read tool and transcribe by LOOKING):

- `text`: the stem, AS PRINTED. Never correct a question; if something looks
  wrong (two identical options, a missing word), transcribe it faithfully and
  add `"_flag": "what looks wrong"`.
- `options`: the four options in printed order (1, 2, 3, 4), without their
  `1.`/`2.` numbers.
- `chapter` and `subtopic`: copied VERBATIM from `taxonomy.ts` (the subtopic must
  belong to that chapter). A question goes under the unit it mostly tests.
  Reading-comprehension sets are `Comprehension` / `Reading comprehension`;
  table and chart sets are `Data Interpretation` / `Data interpretation`.
- `context`: for a set (the manifest's `sets`, usually Q1-5 and Q46-50), the
  shared passage or table from `set-NN.png`, the SAME string on every row of
  the set. The stem of each row is only its own question.

Formats this paper uses:

- **Statement questions**: the statements go in `text` one per line, labelled as
  printed (`A. ...`, `B. ...`), then the closing line ("Choose the correct
  answer from the options given below:"). Options stay as printed: `B and C Only`.
- **Match List I with List II**: one GFM pipe table in `text`
  (`| List I | | List II | |` style is fine: header row, then a `|---|---|`
  separator row, then rows), then the closing line. Options as printed:
  `A-II, B-III, C-I, D-IV`.
- **Assertion / Reason** (`Statement I` / `Statement II`, `Assertion A` /
  `Reason R`): each on its own line, labelled as printed.
- **A table** (in a set or a stem) is a GFM pipe table, typed, never cropped.
  Merged header cells: flatten to one header row that keeps every printed word
  ("Revenue: Journals | Revenue: Magazines | ...").
- **A chart or diagram** (bar, line, pie, Venn, any drawing) that cannot be
  typed: add `"figure": { "file": "set-01.png", "region": [left, top, right,
  bottom], "note": "what it shows, with EVERY label and value printed on it" }`
  on every row that needs it. `region` is in FRACTIONS (0-1) of that image, a
  few percent generous, around the drawing only (not the question text). Still
  type the intro sentence into `context`. A person crops and checks it.
- Maths (rare here) in `\( ... \)`; plain numbers, percentages and rupees stay
  plain text (`₹ 45 lakh`, `12.5%`). Indian-logic terms keep their printed
  diacritics (`Asādhārana`).
- Line breaks are real newlines in the JSON string, never a literal backslash-n.
- **Write files with the Write tool, never a shell heredoc** (the shell eats
  backslashes). In JSON a LaTeX backslash is doubled: `"\\(x^2\\)"`.

Also set `"_transcription"`: one or two sentences on anything odd.

Then run `npx tsx scripts/ugc-net/validate.ts <shift>` and fix everything it
reports (it checks every row, the taxonomy and the ids; it never shows answers).

## 2. Solve (C:\tmp\PYQPs\UGCNET\blind\<shift>\derived.json)

Solve every question from YOUR transcription and the images, as a strong
candidate would. Options are labelled A, B, C, D = printed 1, 2, 3, 4.

```json
{
  "derivedBy": "short description of you",
  "answers": [
    {
      "ref": "1",
      "label": "B",
      "value": "the text of option B",
      "working": "the student-facing solution (below)",
      "difficulty": "Moderate",
      "confidence": "HIGH",
      "flag": "optional: anything wrong or doubtful"
    }
  ]
}
```

- One entry per question, same `ref`, all 50.
- **Solve as printed.** If a question is defective (no correct option, two
  correct, a statement that is plainly arguable), give the most defensible
  answer, say exactly what is wrong in `flag`, and never repair it silently.
- Theory questions (teaching, research, communication, higher education,
  environment, ICT) rest on the standard textbook view the UGC NET syllabus
  follows: NEP 2020, UGC regulations, the SDGs, the usual research-methods and
  communication texts. Where reasonable sources disagree, say so in `flag` and
  use `MEDIUM` confidence.
- **SWAYAM PRABHA channels** come up often and memory is unreliable here. The
  official allocation (swayamprabha.gov.in/ch_allocation/he, read 2026-11-10):
  1 Sanskar and 2 Sanvahak (CEC), 3 Kautilya (EMRC Ahmedabad), 4 Aryabhatt
  (EMRC Calicut), 5 Spandan (EMRC Srinagar), 6 Daksh (EMRC Chennai), 7 Vyas
  (CEC), 8 Aatmagyan (INFLIBNET), 9 AICTE, **10-16 IGNOU**, 17-20 IIT Bombay,
  21-22 IIT Delhi, 23 IIT Gandhinagar, 24-28 IIT Kanpur (25 = Humanities and
  Social Sciences), 29-30 IIT Kharagpur, 31-36 IIT Madras, 37-38 IIT Tirupati,
  39-40 University of Hyderabad. Numbering has changed over the years; if a
  question's premise clashes with this list, say so in `flag`.
- `difficulty`: `Easy` (one fact or one step), `Moderate` (two linked steps, or
  a fact most candidates half-know), `Hard` (an idea most candidates would not
  see, or long working).
- `confidence`: `HIGH`, `MEDIUM` or `LOW`; LOW whenever you could not read
  something you needed.

### `working` is the published solution

Students read it under the question. Plain English a final-year student reads
easily. Explain why the right option is right and, where it helps, why the
tempting one is wrong; for statements, say which are true and why; for a
match, give each pair; show every step of a calculation; end with the option,
e.g. `So the answer is option (B).` (the site shows the four options as A-D, so
use the LETTER, never the printed number 1-4). Usually 3 to 8 sentences.

- Paragraphs separated by a blank line. `**bold**` for a key term. A table as a
  GFM pipe table. Maths in `\( ... \)` only: no bare unicode maths signs
  (`× ÷ √ ≤ ≥ ≠`); write `\(64 \times 12 = 768\)` or plain words. Plain `+`,
  `-`, `=` and `%` in simple arithmetic are fine.
- When you name another option inside the working, use its letter too:
  `option (C) is true`, never `option 3`.
- **No em dashes** (—) anywhere, and no " – " or " -- ": use a full stop, colon,
  comma or brackets.
- Never mention a key, "blind", "transcription", NTA's answer, or yourself.
- Balance every `\(` with `\)`.

Check the file: `node -e "const a=JSON.parse(require('fs').readFileSync('C:/tmp/PYQPs/UGCNET/blind/<shift>/derived.json','utf8')).answers;console.log(a.length, a.filter(x=>x.confidence!=='HIGH').length)"`.

## 3. Report

Reply in at most ~15 lines: validate.ts's last line, rows with a `figure`,
every `_flag`, every non-HIGH answer and why, every solver `flag`.
