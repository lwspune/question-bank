# Grading answer sheets

Students write a board past paper from `/question-papers` on paper, upload photos
or a PDF, and are promised a report **within 48 hours**: marks for every question,
what earned them, what was missing, what went well and what to work on next.
Free while we shape these rules: one sheet per student per IST day. Migration 0153.

This file is the grading contract. **Read it in full at the start of every
grading session.** Every new rule or learning goes into the ledger at the bottom,
so sheet 50 is graded the same way as sheet 5.

## The routine

1. `npm run grading:pull`: fetches every waiting sheet into `grading-inbox/<id>/`
   (`scans/`, `brief.md`, `grade.json`). The daily 18:00 IST email says when
   sheets are waiting (`.github/workflows/grading-queue.yml`).
2. **One sheet per fresh session.** Say: "Grade grading-inbox/<id> by
   scripts/grading/GRADING.md". Never grade two sheets in one session: one
   student's answers must not colour another's report.
3. Read `brief.md` (the paper, marks, OR and part markers, model answers), then
   every scan in order. Images with Read; a PDF with Read 20 pages at a time.
4. Fill `grade.json`. Positions are the paper's (`position` in the brief), not
   the printed numbers.
5. `npm run grading:commit -- <id> --dry` until the check passes, then
   `npm run grading:commit -- <id>` (saves and emails the student).
6. Anything new learned: add it to the ledger below, in general terms.
7. Weekly: `npm run grading:purge -- --apply` (scans go 30 days after checking;
   the promise made at upload).

Oldest sheet first. Anything past 36 hours goes before everything else.

## grade.json

```json
{
  "submissionId": "…",
  "wentWell": "One or two specific things.",
  "nextSteps": "One or two concrete actions.",
  "grades": [
    { "position": 1, "max": 1, "outcome": "scored", "awarded": 1, "earned": "Correct option (b).", "missing": "" },
    { "position": 7, "max": 3, "outcome": "scored", "awarded": 1.5, "earned": "Correct formula and substitution.", "missing": "Arithmetic slip in the last line; the unit of the answer is missing." },
    { "position": 8, "max": 3, "outcome": "not_attempted", "awarded": null, "earned": "", "missing": "" },
    { "position": 9, "max": 3, "outcome": "not_counted", "awarded": null, "earned": "", "missing": "Q.16 was answered first; only one side of an OR counts." }
  ]
}
```

- `outcome`: `scored` (answered, marks given, 0 allowed), `not_attempted`
  (nothing written for it), `not_counted` (answered, but the paper's choice
  rules exclude it: say why in `missing`).
- `awarded`: halves only (0, 0.5, 1, …), never above `max`, `null` unless scored.
- Marks lost: `missing` is required. Marks given: `earned` is required.
- A part of a question (`part of Q.x` in the brief) has no row: grade the whole
  question on its own row.
- The checker refuses an unfilled template, a total over the paper's maximum,
  both sides of an OR scored, and nothing scored at all (that is a rejection).

## Marking rules

These follow how board examiners mark. Where a rule is ours, it says so.

1. **Mark what is written, not what was meant.** Never fill in a step the
   student skipped because the next line implies it.
2. **Steps carry the marks.** Split a question's marks the way the model answer's
   steps go (concept or formula, working, answer with unit). A 1-mark question
   or an MCQ is right or wrong.
3. **A correct answer with no working** on a 2+ mark question gets the marks for
   the answer step only, unless the question asks only for a value.
4. **Any correct method gets full marks**, even if it differs from the model
   answer. Check it yourself; do not compare it to the model answer line by line.
5. **Carry-forward:** a later step done correctly on an earlier wrong value gets
   its marks; the wrong step loses its own.
6. **Units** (ours, provisional): a numerical final answer without its unit or
   with a wrong unit loses half a mark, once per question.
7. **MCQ:** the option letter or the option's text, either is enough. Two options
   marked, or a letter that contradicts the text written: 0.
8. **OR choices (CBSE rule):** if both sides are answered, the one answered FIRST
   in the sheet counts; the other is `not_counted`.
9. **"Attempt any N" (Maharashtra; ours, provisional):** if more than N are
   answered, the first N in the order written count; the rest are
   `not_counted`, with a line telling the student the board may do the same, so
   answer only N.
10. **Diagrams:** marks as the model answer gives them (drawing, labels).
    Unlabelled where labels were asked: lose the label marks.
11. **Question numbers:** match an answer to its question by content when the
    student numbered it wrongly, and say so in `missing`.
12. **A page that cannot be read:** mark what can be read; for questions on that
    page say "Page N could not be read" in `missing`. If a third or more of the
    sheet is unreadable, reject instead.

## Feedback style

- Plain English, short sentences, at most two per field. No em dashes.
- Name the exact step: "The integral of sec²x is tan x, not sec x tan x", not
  "Check your calculus".
- `wentWell` is specific and true ("Clear, labelled diagrams in Section C").
  Never empty praise.
- `nextSteps` is one or two actions the student can take this week, tied to what
  lost the most marks.
- Never judge the student ("careless", "weak"). Describe the answer.

## Rejecting a sheet

`npm run grading:commit -- <id> --reject="…"`. Reject when a third or more is
unreadable, the sheet is for another paper, it is blank, or it is not answers
(textbook photos, the printed paper). The reason must tell the student what to
do: "Pages 3 to 6 are too dark to read. Retake them in daylight, flat, one page
per photo." A rejection frees the student's day, so they can send it again.

## A student questions a grade

`grading:pull` lists open questions in `grading-inbox/questions.md`.

1. `npm run grading:pull -- --id=<id>` (writes the saved grade into `grade.json`).
2. Re-read that question in the scans. If the student is right, fix the row.
3. Write `grading-inbox/<id>/answers.json`: `[{"position": 7, "answer": "You are right: the units are on page 4. Marks updated to 3 / 3."}]`.
4. `npm run grading:commit -- <id>`. The report shows the answer and "Updated
   after you asked us to look again"; no second email.

Every upheld question is a learning: write it in the ledger.

## Privacy

Scans and grades are about a named student. Never copy a student's answers,
name or anything identifying into the repo, this file or a commit. Ledger
entries are general ("students often omit the constant of integration"), never
about one sheet.

## Ledger

Newest first. One line each: date, rule or learning, and why.

- 2026-10-11: Rules 6 (units) and 9 (attempt any N) are provisional, ours, not
  confirmed board practice. Confirm with a board examiner before charging.
