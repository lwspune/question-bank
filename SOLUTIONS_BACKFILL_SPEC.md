# Missing solutions backfill: spec

Owner decision, 2026-10-24: write a worked solution for every question that
has only an answer. This file is the brief for the work: an orchestrating
session (Claude Opus 5.5) builds the pipeline, exports batches, checks drafts
and alone writes; drafting agents (Claude Haiku 5.5, at most 3 at once) solve
the questions (owner, 2026-10-24; first written for one Sonnet 5.5 session).
Read the repo's `CLAUDE.md` first: its rules apply here
(plan first, test first, one branch per change, `npm run gate`, no push unless
the owner asks).

## 1. Why

V, the study chatbot, explains a question only from OUR solution
(`V_SPEC.md`, rule 7). When a question has only its final answer, V can say
the idea and the answer but not the working. Example, 2026-10-24: a student
tapped Ask V on a notes practice question ("Two 10 g particles with 1 μC each
sit on a table with μ = 0.25. Least separation at which they stay at rest?",
answer 0.6 m) and got the idea and "the answer is 0.6 m", no steps.

A worked solution fixes this at the root: V explains from it, students see it
on the site, and V's rule ("never do your own working") stays as it is.

## 2. What is missing (measured 2026-10-24; re-measure before you start)

**Part A, bank questions** (`questions.solution` empty, `visibility = 'PUBLIC'`):
10,854 of 116,525. About 117 of those can never be filled: 116 carry a
`cancelled_note` (102 MPSC, 4 JIPMAT, 10 UPSC) and one IPMAT Indore MCQ has no
correct option. So roughly 10,737 are fillable. The biggest groups:

| Exam | Kind | Missing | With a figure |
|---|---|---|---|
| Foundation Course | practice | 2,659 | 271 |
| NEET | practice | 1,769 | 237 |
| MPSC Group B & C Prelims | pyq | 1,385 | 22 |
| MPSC State Services Prelims | pyq | 983 | 7 |
| MPSC ASO Mains | pyq | 900 | 0 |
| MPSC STI Mains | pyq | 600 | 0 |
| JIPMAT | pyq | 581 | 44 |
| IPMAT Indore | pyq (MCQ 522, numeric 148) | 670 | 5 |
| MPSC PSI Mains | pyq | 500 | 0 |
| MPSC State Services Mains | pyq | 200 | 0 |
| IPMAT Rohtak | pyq | 172 | 9 |
| MH State Board 11 / JEE / MPSC Group B Mains / MH SB 9 / NDA | practice / pyq | 425 | 0 |

Re-measure with:

```sql
select e.name, q.question_format, q.question_kind, count(*)
from questions q join exams e on e.id = q.exam_id
where q.visibility = 'PUBLIC' and coalesce(trim(q.solution), '') = ''
group by 1, 2, 3 order by 4 desc;
```

**Part B, notes quick practice reps** (`practiceSet` in
`src/app/notes/**/_data/*.ts`, type `PracticeProblem` in
`src/app/notes/_types.ts`): 19,260 reps, and only 3,292 have even a one-line
`method`. The rest have a prompt and an answer only. (Worked examples, 4,352,
and self-check examples, 5,410, already have full steps: leave them alone.)

## 3. Rules that never bend

1. **The answer key is the truth.** Solve each question yourself first,
   without looking at the key, then compare. Write the solution only when your
   working reaches the stored answer. If it does not, write NOTHING for that
   question and add it to the disputes list (section 6). Never change a key,
   an option, the question text or `numeric_answer`.
2. **Never overwrite.** Only fill an empty `solution` (or a rep with no
   steps). A solution someone already wrote stays.
3. **Skip, and list, these:** questions with a `cancelled_note` (cancelled or
   withdrawn, no key: 116 rows), questions with no key at all (an MCQ with no
   correct option, a numeric row with no `numeric_answer`), `publish_blocked`
   rows, PRIVATE rows, and questions whose figure you cannot see. A question
   with an `image_url` that needs the figure: open the image; if you still
   cannot read what you need, skip it. A question whose text points at a
   figure it does not carry (about 368 rows mention a figure, diagram or graph
   and have no image) is exported with `pointsAtFigure: true`: the solver
   skips it unless the text alone gives everything needed. (Only about a
   quarter of such hits really depend on the figure, `npm run audit:figures`,
   so skipping all of them would drop solvable rows.) `apply.ts` rejects any
   solution that leans on a figure its row does not carry. Never describe a
   figure you have not seen.
4. **The solution is not part of a question's identity.** `content_hash`
   (`src/lib/upload/hash.ts`) is built from the text, the options and the key
   (MCQ) or excludes the solution by design (subjective, numeric). Filling it
   in keeps every row's id and hash. Do not touch any other column.
5. **Language follows the question.** English questions get English
   solutions. MPSC Mains rows are Marathi language papers stored in Marathi:
   their solutions are written in Marathi. MPSC Prelims rows are English with
   a Marathi translation (`question_translations`, migration 0118): write the
   English solution only; the translation's solution is out of scope. A
   Marathi reader still sees it: `solutionVersions`
   (`src/lib/i18n/bilingual.ts`) falls back to the English solution.
6. **Back up before any bulk write:** `npm run db:backup`.

## 4. How a solution is written

Same style as the solutions already in the bank (read 20 of them for the
exam first).

- Short steps, one idea per line, usually 3 to 8 lines. Start from what the
  question gives, end with the answer it asks for. For an MCQ, the last line
  names the option, as "So the answer is (B) 3."
- Plain words. Never "stored" for the answer or key ("the stored answer");
  as science it is fine ("bile is stored in the gall bladder"). Never doubt
  the key.
- Maths inside `\( ... \)` inline and `\[ ... \]` on its own line. Use LaTeX,
  not Unicode symbols, for maths (`\pi`, `\times`, `\leq`, not π × ≤). Balanced
  delimiters.
- No em dash or en dash anywhere (`CLAUDE.md`, voice rule). Use a full stop,
  colon, comma or brackets.
- Real line breaks, never a literal backslash-n.
- A table is a GFM pipe-table with its `|---|` separator line.
- Factual (GK, polity, history) questions: give the fact and why the other
  options are wrong in one line each, no essay.
- Numeric (IPMAT `numeric`) questions: end with the number the key holds.
  "Reaches the key" means `matchesNumericAnswer` (`src/lib/mocks/answers.ts`),
  the rule mocks grade by, so 0.5 and 1/2 are the same answer.

## 5. Build first (a small pipeline, tested)

The bank already has per-exam scripts that write solutions
(`scripts/imat/apply-solutions.ts` is the closest pattern). Build one shared
pipeline under `scripts/solutions/`, test first:

1. **`scripts/lib/solutionText.ts`**: the pure checks every solution must pass
   before it is written: empty, control characters (an escape eaten on the
   way), en or em dash, unbalanced `\( \)` / `\[ \]`, literal `\n`
   (`literalNewlineFields`), "stored" for the answer or key, and a line break inside a
   `\( ... \)` zone. That last one is how an escape eaten by JSON shows:
   `"\neq"` in a JSON string is a line break followed by "eq", and `\nu`,
   `\nabla`, `\not` the same, none of which is a control character the other
   check sees. Lift the rest from `scripts/imat/apply-solutions.ts`
   `problems()` rather than retyping them, and have the IMAT script use the
   shared one. Spec: `tests/solution-text.test.ts`.
2. **`scripts/solutions/export.ts`**: writes a batch of questions to solve
   (gitignored, under `generated-papers/solutions/`): id, exam, subject,
   chapter, text, context, options with labels, the key, format,
   `numeric_answer`, `image_url`. The key goes in a SEPARATE file from the
   questions, so the solving step stays blind. Selection by `--exam`,
   `--limit`, and the priority order of section 7. Questions sharing a passage
   (`context`) stay in the same slice, so one solver reads them together. The
   skips of rule 3 are left out and listed. Read-only.
3. **The drafts**: one JSON per batch,
   `{ "<questionId>": { "solution": "...", "solvedAnswer": "B" } }`, written
   by solving from the questions file alone.
4. **`scripts/solutions/apply.ts`**: dry run by default, `--apply` writes.
   For each draft: the checks of step 1 pass, `solvedAnswer` equals the key,
   the row is still PUBLIC, not blocked, not cancelled, and its solution is
   still empty (re-read at write time). Anything else is listed and not
   written. An update whose filter matches no row returns no error, so the
   update selects the row back and only a returned row counts as written.
   Prints counts: written, disputed, skipped and why.

Part B is a code change, so it needs the owner's OK on a before/after sheet
(`CLAUDE.md`, UI changes):

5. Add `steps?: string[]` to `PracticeProblem`. `PracticeSet.tsx` shows the
   steps under the answer once it is revealed (as worked examples show
   theirs), and `src/lib/chat/notesItem.ts` gives them to V as the SOLUTION
   of a practice rep. Tests first, then fill the steps chapter by chapter,
   editing the `_data` files with the Edit tool (shell heredocs eat
   backslashes in LaTeX). Keep `method` where it exists. Rule 1 applies here
   too: a rep's `answer` is one we wrote, not an official key, so it can be
   wrong. Solve blind; a rep whose working does not reach its answer gets no
   steps and goes on the disputes list. After each chapter:
   `npm run notes:lint`, `npm run notes:latex`, typecheck.

## 6. Disputes and skips

Every question whose working does not reach the key, and every skip, goes
in `generated-papers/solutions/disputes-<batch>.md` (gitignored: it may quote
student-facing content but no student data): id, exam, the key, what you got,
one line on why. The owner reads it. A dispute is a question, not a verdict:
the key may be wrong, or the question may be defective as printed. Never act
on it yourself.

## 7. Order of work

1. **Build** section 5, steps 1 to 4, with tests. Gate, merge.
2. **Pilot:** 100 bank questions (40 NEET practice, 40 Foundation, 20 IPMAT
   Indore) and one notes chapter (`jee-mains-physics/electrostatics`, which
   holds the 0.6 m question). Stop and show the owner: the counts, 10
   solutions picked at random, and the disputes. Continue only on their OK.
3. **Then by use, busiest first:** questions students tap Ask V on
   (`chat_interactions.asked_question_id`), questions in published mocks
   (the JSON list `mock_tests.questions`, where `status = 'published'`; read
   `src/lib/mocks/` for its shape), then the rest of each exam, biggest groups
   first. (Measured 2026-10-24: only 2 Ask V questions lack a solution, so for
   the bank this step is small.) For notes, the items students ask V about
   first (`chat_interactions.asked_notes_item`), then chapters in order of
   traffic.
4. **MPSC Mains (Marathi) last,** as its own batch, after the owner has seen
   five Marathi solutions.

Agents: drafting is done by Haiku 5.5 agents, at most 3 at once (owner's
standing rule for ingestion work). Drafting by agents is what makes it blind:
a session that exports both files and drafts itself has the key file in reach.
Agents only draft from the questions file; they never see the key file, never
write to the database and never touch git. Only `apply.ts` compares a draft to
the key. The main session checks every batch and alone runs `apply.ts`,
commits and merges.

On a four-option MCQ, flawed working can still land on the right letter, so
"reaches the key" does not prove the working sound. The main session's read
(section 8) is the check on that; record in the progress log how many read
solutions it rejected, so the pilot shows how often it happens.

## 8. Done, per batch

- `apply.ts` dry run clean, then `--apply`; counts recorded in the batch's
  commit message (or the progress log below for DB-only batches).
- 10% of the batch read by the main session before applying.
- `npm run audit:text -- <source substring>` shows no new hits. Its argument
  is a `source_file` substring, not an exam name: an exam name scans nothing,
  prints "NOTHING SCANNED" and still exits 0.
- The SQL of section 2 shows the gap shrinking by what was written.

## 9. Out of scope

Solutions for Marathi translations of English questions; withdrawn or
cancelled questions; PRIVATE rows; changing any key; V working out its own
steps (owner considered it 2026-10-24 and chose this backfill instead).

## 10. Progress log

One line per batch: date, exam, written, disputed, skipped.

- 2026-10-24: spec written; nothing filled yet.
- 2026-10-24, pilot (3 Haiku agents, 104 exported): written 92 (NEET 34,
  Foundation 37, IPMAT Indore 21). Disputed 2, both with the key right and the
  draft wrong (fungi class, reading passage). Settled by the main session 2
  (one letter mislabelled under correct working, one "stored" reworded).
  Skipped 10 by the solvers, 1 at export (no key). Main session read 15 of 92
  before writing and rejected none; one loose wording seen after ("morels and
  truffles are edible mushrooms": they are sac fungi; fixed to "fungi").
- 2026-10-24, b01 MPSC Group B & C Prelims (324 exported): written 182.
  Disputed 9 (key right 5, question ambiguous 1, key doubtful 3: in the
  batch's disputes file). Skipped 114 by the solvers, nearly all current
  affairs Haiku does not know; 19 left undrafted. Read 25 of 182, rejected 0.
- 2026-10-24, b02 MPSC Group B & C Prelims (324 exported): written 252.
  Disputed 8 (key right 5, key doubtful 2, judgement 1). Skipped 64. Read 30
  of 252: 2 wording slips (a fund's name, "one more triple bond") fixed before
  writing, plus 3 option symbols put in LaTeX. Paused here at the owner's
  word; b03 is exported (324 questions) but not drafted.
- 2026-10-24, b03 MPSC Group B & C Prelims (324 exported, resumed after the
  pause): written 164. Disputed 10 (key right 3, key doubtful 2, judgement 5).
  Skipped 150 (geography and history of Maharashtra Haiku does not know).
  One solver left out solvedAnswer: read from its own last lines, all 22
  matched. Read 30 of 164, rejected 0.
- 2026-10-24, b04 MPSC Group B & C Prelims (398 exported, the rest of the
  exam): written 307. Disputed 7 (key right 3, judgement 4). Skipped 84.
  Read 35 of 307: one calendar solution rewritten to work from the
  question's clue, one quoted symbol put in LaTeX. Group B & C first pass
  done: 905 written of 1,351 fillable; the rest are skips and disputes.
- 2026-10-24, b05 MPSC State Services Prelims (324 exported): written 190.
  Disputed 12 (key looks wrong 1: Krebs hydration; key doubtful 1; key right
  4; judgement 6). Skipped 108, 14 undrafted. Read 30 of 190, rejected 0. A
  solver flagged one duplicated question and one garbled one (disputes file).
