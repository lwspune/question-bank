# Exam-twin match brief

A board student (Class 11 or 12) studying a textbook or board-paper question sees a line under it
such as "Asked in NDA 2 2023". Your job: for each board question in your slice, find the exam's
past questions that really are the same question or the same task. A wrong match tells a student
something false about a real exam, so when unsure, leave it out or list it under "unsure".

## Input (read only)

- `evidence/target.md`: the exam's past questions to match in this run: the whole chapter the
  first time, only the newly added ones after an ingest. Header:
  `### <id> | <paper> | <subtopic>`, or `### <id> | <paper> | <chapter>: <subtopic>` when the run
  covers several chapters (one board chapter can teach more than one exam chapter: match against
  all of them).
- `evidence/board-<n>.md`: your slice. Header: `### <id> | <source> | <mcq|subjective|numeric>`.
  The source is a textbook (with its section and question number) or a board paper. A textbook
  item may be a sub-part ("Q.3 (ii)"): judge it on its own.
- An item marked `has a figure you cannot see`: match it only when the text alone shows it is the
  same question.

Read the whole target file first (in chunks), so you know what the exam asks, then work through
your slice.

## Three kinds of match

Format never matters: an MCQ and a written question can match, and so can "prove that" and "find"
when they lead to the same result.

- **exact**: the same question. Same matrix, determinant, equation or data AND the same ask, so the
  answer is the same. Only wording, notation, format or option order differ.
  e.g. board "Prove |1 a a^2; 1 b b^2; 1 c c^2| = (a-b)(b-c)(c-a)" and exam "the value of
  |1 a a^2; 1 b b^2; 1 c c^2| is" -> exact.
- **numbers**: the same question with different numbers, a different matrix of the same shape, or a
  different constant, solved by the same steps.
  e.g. board "find the inverse of [[2,1],[3,4]] by the adjoint method" and exam "the inverse of
  [[3,1],[5,2]] is" -> numbers.
  NOT numbers: a trick question whose numbers make it special (two rows proportional so any k works,
  a matrix that is its own inverse); call that similar at most.
  Word problems whose situation shapes the setup (Bayes causes, what is drawn from what, committees,
  arrangements, solvers and truth-tellers): numbers only when the SITUATION is the same too (machines
  and defective items with other percentages; balls drawn from a bag with other counts). The same
  structure in a different situation (a car-rental Bayes question against a bolt-factory one; cards
  against a committee; letters of a word against people in a row) is similar: "new numbers" promises
  the student it is the same question. Where the situation is only a label on given data (variance of
  a list of marks or of patients; comparing CVs from given means and SDs), it does not matter.
- **similar**: the same SPECIFIC task with different data, where one worked example teaches both.
  Narrow: you could write it in one line such as "value of k for which a 3x3 system has no unique
  solution", "det of kA given det A for a 3x3 A", "split a matrix into symmetric and skew-symmetric
  parts". NOT a topic ("properties of determinants", "inverse of matrices" as a whole). If the one
  line you would write is a topic, it is no match.

Not a match:
- the board question is only one step of the exam question, or the reverse (finding cofactors vs
  an adjoint question; "does AB exist" vs "find AB");
- the same object with a different ask (same determinant: board asks when it vanishes, exam asks
  which equation alpha satisfies);
- the same idea in a different task; the same chapter.

A board question may match several exam questions: list each one. Many will match nothing: that is
expected, do not stretch.

## Output

Write `out/board-<n>.json` (your slice number):

```json
{
  "slice": 1,
  "checked": 135,
  "matches": [
    { "board": "<board id>", "target": "<exam question id>", "kind": "numbers",
      "why": "both: inverse of a 2x2 numeric matrix by adjoint" }
  ],
  "unsure": [
    { "board": "<board id>", "target": "<exam question id>", "why": "exam adds a condition on k; same steps otherwise?" }
  ]
}
```

`checked` = how many board questions in your slice you read (all of them). `why` is one short
plain-text line (no LaTeX, at most 200 characters) naming the shared task. Copy ids, never retype
them.

Then run the validator and fix every error it reports:

    npx tsx scripts/cross-exam/validate.ts <run dir> <n>

## Rules

- Use only ids from `evidence/target.md` and your own `evidence/board-<n>.md`.
- Write ONLY `out/board-<n>.json`; a helper file, if you need one, goes in the run dir named
  `scratch-<n>.*`. Do not edit any other file, do not run git, do not touch the database.
- Keep tool output small: read evidence in chunks of about 150 lines, never print a whole file back.
- When done, reply with: matches by kind, how many board questions got at least one match, the 5
  board questions with the most matches (id + one line), and anything you were unsure about.
