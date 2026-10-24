# Grading answer sheets

Students write a board past paper from `/question-papers` on paper, upload photos
or a PDF, and are promised a report **within 48 hours**: marks for every question,
what earned them, what was missing, where the marks went, what to work on next,
and their own pages back with our marks on them. Free while we shape these
rules: one sheet per student per IST day. Migrations 0153 and 0175.

This file is the grading contract. **Read it in full at the start of every
grading session.** Every new rule or learning goes into the ledger at the bottom,
so sheet 50 is graded the same way as sheet 5.

## The routine

1. `npm run grading:pull` fetches every waiting sheet into `grading-inbox/<id>/`
   (gitignored): `brief.md`, `scans/` (the files as uploaded), `pages/` (the
   same pages upright where the photo says so, PDFs split into pages), `grid/`
   (those pages under a labelled 0-100 grid) and `grade.json`. Oldest first.
   The daily 18:00 IST email says when sheets are waiting
   (`.github/workflows/grading-queue.yml`).
2. Say: "Grade grading-inbox/<id> by scripts/grading/GRADING.md". One session
   may grade several sheets in turn. Mark each against the paper, the model
   answers and the rules here, never against the student graded before it.
3. Read `brief.md` (the paper, marks, OR and part markers, model answers), then
   every page in `pages/` in order, with Read. Read `pages/`, not `scans/`: a
   PDF in `scans/` cannot be opened on this machine, and mark positions are
   percent of the prepared pages. **A page still sideways?** `pages/` is turned
   upright only when the photo carries a rotation tag, and many phone photos
   have none. Turn it with `npm run grading:rotate -- <id> <page> left` before
   placing marks: `left` turns it anticlockwise (its right edge becomes the
   top), `right` clockwise. Marks already on that page move with it, and the
   turn is saved with the grade, so a regrade pull turns the page the same way.
4. Work out each answer yourself before marking. The model answer can be wrong;
   if yours and it disagree, re-derive, and note it in the ledger if the model
   answer was wrong.
5. Fill `grade.json`: the grades (with a `cause` wherever marks were lost), then
   the `marks` on the pages, placed by reading positions off `grid/`.
6. `npm run grading:preview -- <id>` draws the marks onto `preview/NN.jpg` and
   builds `preview/report.pdf`, the report the student downloads (summary, then
   these pages). **Read every preview page.** These exact images are what the
   student sees. Any mark not where it belongs: fix its `x`/`y` and preview
   again. The commit refuses marks that were not previewed as they stand.
7. `npm run grading:commit -- <id> --dry` until the check passes, then
   `npm run grading:commit -- <id>` (uploads the previewed pages and the PDF,
   saves, and emails the student).
8. Anything new learned: add it to the ledger below, in general terms.
9. Weekly: `npm run grading:purge -- --apply`. Scans, marked pages and the PDF
   go 30 days after checking (the promise made at upload and on /privacy); the
   grade, its causes and its marks stay.

Oldest sheet first. Anything past 36 hours goes before everything else.

## grade.json

```json
{
  "submissionId": "…",
  "wentWell": "One or two specific things.",
  "nextSteps": "One or two concrete actions.",
  "grades": [
    { "position": 1, "max": 1, "outcome": "scored", "awarded": 1, "earned": "Correct option (b).", "missing": "", "cause": "", "topic": "" },
    { "position": 7, "max": 3, "outcome": "scored", "awarded": 1.5, "earned": "Correct formula and substitution.", "missing": "Arithmetic slip in the last line; the unit is missing.", "cause": "careless", "topic": "" },
    { "position": 8, "max": 3, "outcome": "scored", "awarded": 0.5, "earned": "The final value.", "missing": "No working: the product rule is never used.", "cause": "concept", "topic": "Product rule" },
    { "position": 9, "max": 3, "outcome": "not_attempted", "awarded": null, "earned": "", "missing": "", "cause": "", "topic": "" },
    { "position": 10, "max": 3, "outcome": "not_counted", "awarded": null, "earned": "", "missing": "Q.16 was answered first; only one side of an OR counts.", "cause": "", "topic": "" }
  ],
  "marks": []
}
```

- `position` is the paper's (`position` in the brief), not the printed number.
- `outcome`: `scored` (answered, marks given, 0 allowed), `not_attempted`
  (nothing written for it), `not_counted` (answered, but the paper's choice
  rules exclude it: say why in `missing`).
- `awarded`: halves only (0, 0.5, 1, …), never above `max`, `null` unless scored.
- Marks lost → `missing` and `cause` are required. Marks given → `earned` is
  required. **Full marks → `missing`, `cause` and `topic` stay empty.**
- A part of a question (`part of Q.x` in the brief) has no row: grade the whole
  question on its own row.
- The checker refuses an unfilled template, a total over the paper's maximum,
  both sides of an OR scored, nothing scored at all (that is a rejection), and
  then any page mark that breaks the rules below.

## Marks on the pages (`marks`)

The student sees their own pages with your marks on them, as an examiner's red
pen would leave them, so they can see *where* each mark went without asking.

```json
"marks": [
  { "page": 1, "position": 1, "kind": "tick",   "x": 60, "y": 30 },
  { "page": 1, "position": 1, "kind": "score",  "x": 88, "y": 27 },
  { "page": 2, "position": 7, "kind": "circle", "x": 77.5, "y": 68, "w": 15, "h": 4 },
  { "page": 2, "position": 7, "kind": "note",   "x": 62, "y": 74, "text": "Unit missing: 9 cm", "to": { "x": 76, "y": 70 } },
  { "page": 2, "position": 7, "kind": "score",  "x": 85, "y": 61 }
]
```

- `page` is the number of the file in `pages/` (`pages/02.jpg` is page 2).
  `x` and `y` are percent across and down that page: read them off `grid/`.
  For a circle, `x`/`y` is its centre and `w`/`h` its width and height.
- `position` is the question the mark belongs to, as in `grades`.

| `kind` | Use it for | Rules |
|---|---|---|
| `score` | The question's marks, circled, beside its answer | **Exactly one** per scored question, none on any other. No text: it prints the marks from the grade. |
| `tick` | A step that earned marks | Any scored question. |
| `cross` | A wrong step or answer | Only on a question that lost marks. |
| `circle` | Around the exact place a mark was lost | Only on a question that lost marks. |
| `note` | What is wrong or missing, at most 80 characters; `to` draws a line to the spot | On a question that lost marks, or on an answer `not_counted` (saying why). |

- **A question that lost marks needs a cross, circle or note at the step where
  they were lost.** Put it at the step itself, not at the question number.
- **Full marks: ticks and the score only.** A red cross or note beside full
  marks reads as lost marks.
- **Not attempted: nothing on the page.** Not counted: a note at most.
- Put notes and scores in **blank space** (margins, the gap after an answer),
  not over writing; use `to` to point from the note to the step.
- A note says the same as `missing`, shorter. It describes the answer, never
  the student.
- **Notes print in Segoe UI Symbol**: Greek, ≠, ⇒, √, π and superscript digits
  (x², m₁) are fine; superscript letters (xⁿ) print as boxes, so write "x to
  the n" or the value. Check every note in the preview.

## Marking rules

These follow how board examiners mark. Where a rule is ours, it says so.

1. **Mark what is written, not what was meant.** Never fill in a step the
   student skipped because the next line implies it.
2. **Steps carry the marks, split the same way every time**, so two sessions
   give the same answer the same mark. A 1-mark question or an MCQ is right or
   wrong. Otherwise split the printed marks in these proportions, in halves
   (ours, from nda-tracker's faculty, 2026-10-13; confirm with an examiner):

   | Question | Split of 5 marks (scale to the printed marks) |
   |---|---|
   | Calculation | method 1 · working 2 · condition or check 1 · final answer with unit 1 |
   | Proof or derivation | setup (what is given, the right definition or formula) 1 · key steps 2 · the condition that makes a step legal 1 · conclusion 1 |
   | Prove …, hence find … | proof 3 · hence 2 (working 1, answer 1) |

   A 2-mark question: method and working 1 · condition or check 0.5 · final
   answer 0.5. A 3-mark question: method 1 · working 1 · condition 0.5 · answer
   0.5. Where a question has no condition, its share goes to working. A
   descriptive answer (Biology, Geography) is split by the points the model
   answer makes, as before.
3. **A correct answer with no working** on a 2+ mark question gets the final-
   answer share only, unless the question asks only for a value.
4. **Any correct method gets full marks**, even if it differs from the model
   answer. Check it yourself; do not compare it line by line.
5. **Carry-forward:** a later step done correctly on an earlier wrong value gets
   its marks; the wrong step loses its own.
6. **Units and slips** (ours, provisional): a final answer with a missing or
   wrong unit loses 0.5 from the final-answer share. A slip in the working (a
   dropped sign, a copied number, dy/dx written for dy/dt) loses 0.5 from the
   working share, **once per question**, however many there are, even when the
   final answer is right.
7. **A condition left out costs the same as a condition written wrong**
   (ours, from nda-tracker). The condition or check is its own share (rule 2);
   leaving it out, or getting it wrong ("dx/dt = 0"), loses that share even
   when the algebra reaches the right result.
8. **A calculation states the fact it rests on before using it** (ΣP = 1,
   E(X) = np, F = ma, PV = nRT) (ours, from nda-tracker). In a calculation that
   fact is the condition share: using it without writing it loses that share,
   as rule 7 does. Several facts split the share between them, in halves.
9. **The deductions in rules 6 to 8 stack**, but a question never goes below 0.
10. **MCQ:** the option letter or the option's text, either is enough. Two
    options marked, or a letter that contradicts the text written: 0.
11. **OR choices (CBSE rule):** if both sides are answered, the one answered
    FIRST in the sheet counts; the other is `not_counted`.
12. **"Attempt any N" (Maharashtra; ours, provisional):** if more than N are
    answered, the first N in the order written count; the rest are
    `not_counted`, with a line telling the student the board may do the same,
    so answer only N.
13. **Diagrams:** marks as the model answer gives them (drawing, labels).
    Unlabelled where labels were asked: lose the label marks.
14. **Question numbers:** match an answer to its question by content when the
    student numbered it wrongly. It costs nothing (boards do not deduct for it).
    Say so in `missing` if marks were lost there anyway; on a full-marks
    question, say it in `nextSteps`, never in `missing`.
15. **A page that cannot be read:** mark what can be read; for questions on that
    page say "Page N could not be read" in `missing`. If a third or more of the
    sheet is unreadable, reject instead.

## Why marks were lost (`cause`, `topic`)

Every scored question that lost marks names **one** cause. The report adds the
lost marks up by cause ("−6 concept gaps, −2 slips"), says what fixing the slips
is worth, and builds its "what to focus on" list from them, so the choice must
be the same in every session.

| `cause` | When | `topic` |
|---|---|---|
| `concept` | The idea is wrong: a wrong formula, law, property or method, or a step that shows the idea is not understood. | **Required**: the idea to relearn, as a syllabus phrase ("Lenz's law", "Angles in the same segment"). |
| `incomplete` | The approach is right but marks were lost for what is not written: steps, the reason or condition for a step (rules 7, 8), labels, the final statement. | **Required**: what to show ("Steps of the derivation", "The condition dx/dt ≠ 0"). |
| `careless` | The method is right and the student shows they know the step, but slipped: arithmetic, a sign, a copied number, units (rule 6). They would catch it by rereading. | Optional. |
| `misread` | A different question was answered from the one set: a wrong value copied from the paper, the wrong quantity found. | Optional. |
| `mcq` | A 1-mark MCQ or one-value answer is wrong and there is no working to show why. If the working shows why, use that cause instead. | Optional. |

- **Two causes in one question:** choose the one that cost more marks. On a tie,
  the one to fix first: `concept`, then `misread`, then `incomplete`, then
  `careless`.
- **The same slip twice in one sheet** is not careless: it is `concept`.
- **Full marks, `not_attempted` and `not_counted`:** no cause, no topic. The
  report counts unanswered marks on its own.
- `topic` is at most 60 characters, written for the student, with no question
  number and no judgement of the student.
- The cause is a category for the report; the student sees `careless` as
  "Slips". `missing` still describes the answer, never the student.

## Feedback style

- Plain English, short sentences, at most two per field. No em dashes.
- **Write maths as plain text and symbols (Δu ≠ 0, x², √2, π/4), never LaTeX.**
  The feedback is printed in the report PDF, which shows LaTeX as raw code.
- Name the exact step: "The integral of sec²x is tan x, not sec x tan x", not
  "Check your calculus".
- `wentWell` is specific and true ("Clear, labelled diagrams in Section C").
  Never empty praise.
- `nextSteps` is one or two actions the student can take this week, tied to what
  lost the most marks.
- Never judge the student ("careless", "weak"). Describe the answer.

## Rejecting a sheet

`npm run grading:commit -- <id> --reject="…"`. Reject when a third or more is
unreadable, it is blank, or it is not answers (textbook photos, the printed
paper). The reason must tell the student what to do: "Pages 3 to 6 are too dark
to read. Retake them in daylight, flat, one page per photo." A rejection frees
the student's day, so they can send it again.

**A sheet written for a different test is graded, not rejected** (owner,
2026-10-12). Grade it against the paper the student chose: anything that matches
a question by content (rule 14) is scored, the rest `not_attempted`. At least one
row must be `scored` (0 allowed). Open `wentWell` with a note that the pages
answer a different test, so they could not earn marks on this paper. Then use
`wentWell` and `nextSteps` to give feedback on the answers actually written, and
end by pointing to the question papers page. This overrides the two-sentence
limit for those two fields. A graded sheet uses up the student's day; only a
rejection gives it back.

## A student questions a grade

`grading:pull` lists open questions in `grading-inbox/questions.md`.

1. `npm run grading:pull -- --id=<id>` (writes the saved grade AND its page
   marks into `grade.json`, and prepares the pages again).
2. Re-read that question in `pages/`. If the student is right, fix the row and
   its marks (a full-marks question loses its crosses and notes).
3. Write `grading-inbox/<id>/answers.json`: `[{"position": 7, "answer": "You are right: the units are on page 4. Marks updated to 3 / 3."}]`.
4. `npm run grading:preview -- <id>`, read the pages, then
   `npm run grading:commit -- <id>`. The report shows the answer and "Updated
   after you asked us to look again"; no second email.

Every upheld question is a learning: write it in the ledger.

**A re-mark** (a grade to redo from scratch, not correct) starts from an empty
template: `npm run grading:pull -- --id=<id> --fresh`. Correcting a grade you
can see anchors the new marks to the old ones.

## Privacy

Scans and grades are about a named student. `brief.md` and the report PDF name
no student; keep it that way. Never copy a student's answers, name or anything
identifying into the repo, this file or a commit. Ledger entries are general
("students often omit the constant of integration"), never about one sheet.

## Ledger

Newest first. One line each: date, rule or learning, and why.

- 2026-10-22: Where answers are listed one per line (an MCQ column), leave out
  the ticks and give each row only its score, kept beside the answer it belongs
  to. On the first sheet graded this way, ticks there sat closer to the next row
  and read as marks on the wrong answer. A note's `x` is its LEFT edge, and it
  wraps at the page edge, so a long note placed near the right margin breaks
  mid-value ("C\n= 75°"): place it further left or shorten it.

- 2026-10-21: Brought over from nda-tracker's homework grading (it was copied
  from this file on 2026-10-12 and then shaped on 60+ hand-ins): marks on the
  pages with a preview the commit refuses to skip, a `cause` and `topic` on
  every loss feeding the report summary, pages prepared upright with PDFs split
  (Read cannot open a PDF here: poppler is not installed), `grading:rotate`,
  `--fresh` re-marks, and rules 2 and 6 to 9. Not brought over: the 0.5 penalty
  for renumbering (boards do not deduct it), "an MCQ worth 2+ marks needs
  working" (board MCQs are 1 mark), the handwriting check (students practise
  for themselves).
- 2026-10-21: The one-sheet-per-fresh-session rule is removed (owner): a session
  may grade several sheets in turn, each marked against the paper and rules
  alone, not against the previous student.
- 2026-10-21: Feedback is written without LaTeX: it is printed in the report
  PDF, which cannot render it.
- 2026-10-12: A sheet for a different test (often a student's own school or
  coaching test) gets a report, not a rejection: the student still sees feedback
  on what they wrote. Owner's call. Students may upload such a sheet within
  minutes of signing up, which suggests they want their own tests checked.
- 2026-10-11: Rules 6 (units) and 12 (attempt any N) are provisional, ours, not
  confirmed board practice. Confirm with a board examiner before charging.
