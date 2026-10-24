# Missing solutions backfill: spec

Owner decision, 2026-10-24: write a worked solution for every question that
has only an answer. This file is the brief for the session doing the work
(Claude Sonnet 5.5). Read the repo's `CLAUDE.md` first: its rules apply here
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
10,854 of 116,525. The biggest groups:

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
   withdrawn, no key: the 10 UPSC rows are these), `publish_blocked` rows,
   PRIVATE rows, and questions whose figure you cannot see. A question with an
   `image_url` that needs the figure: open the image; if you still cannot read
   what you need, skip it. Never describe a figure you have not seen.
4. **The solution is not part of a question's identity.** `content_hash`
   (`src/lib/upload/hash.ts`) is built from the text, the options and the key
   (MCQ) or excludes the solution by design (subjective, numeric). Filling it
   in keeps every row's id and hash. Do not touch any other column.
5. **Language follows the question.** English questions get English
   solutions. MPSC Mains rows are Marathi language papers stored in Marathi:
   their solutions are written in Marathi. MPSC Prelims rows are English with
   a Marathi translation (`question_translations`, migration 0118): write the
   English solution only; the translation's solution is out of scope.
6. **Back up before any bulk write:** `npm run db:backup`.

## 4. How a solution is written

Same style as the solutions already in the bank (read 20 of them for the
exam first).

- Short steps, one idea per line, usually 3 to 8 lines. Start from what the
  question gives, end with the answer it asks for. For an MCQ, the last line
  names the option, as "So the answer is (B) 3."
- Plain words. Never "stored". Never doubt the key.
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

## 5. Build first (a small pipeline, tested)

The bank already has per-exam scripts that write solutions
(`scripts/imat/apply-solutions.ts` is the closest pattern). Build one shared
pipeline under `scripts/solutions/`, test first:

1. **`scripts/lib/solutionText.ts`**: the pure checks every solution must pass
   before it is written: empty, control characters (an escape eaten on the
   way), en or em dash, unbalanced `\( \)` / `\[ \]`, literal `\n`
   (`literalNewlineFields`), the word "stored". Lift these from
   `scripts/imat/apply-solutions.ts` `problems()` rather than retyping them,
   and have the IMAT script use the shared one. Spec:
   `tests/solution-text.test.ts`.
2. **`scripts/solutions/export.ts`**: writes a batch of questions to solve
   (gitignored, under `generated-papers/solutions/`): id, exam, subject,
   chapter, text, context, options with labels, the key, format,
   `numeric_answer`, `image_url`. The key goes in a SEPARATE file from the
   questions, so the solving step stays blind. Selection by `--exam`,
   `--limit`, and the priority order of section 7. Read-only.
3. **The drafts**: one JSON per batch,
   `{ "<questionId>": { "solution": "...", "solvedAnswer": "B" } }`, written
   by solving from the questions file alone.
4. **`scripts/solutions/apply.ts`**: dry run by default, `--apply` writes.
   For each draft: the checks of step 1 pass, `solvedAnswer` equals the key,
   the row is still PUBLIC, not blocked, not cancelled, and its solution is
   still empty (re-read at write time). Anything else is listed and not
   written. Prints counts: written, disputed, skipped and why.

Part B is a code change, so it needs the owner's OK on a before/after sheet
(`CLAUDE.md`, UI changes):

5. Add `steps?: string[]` to `PracticeProblem`. `PracticeSet.tsx` shows the
   steps under the answer once it is revealed (as worked examples show
   theirs), and `src/lib/chat/notesItem.ts` gives them to V as the SOLUTION
   of a practice rep. Tests first, then fill the steps chapter by chapter,
   editing the `_data` files with the Edit tool (shell heredocs eat
   backslashes in LaTeX). Keep `method` where it exists. After each chapter:
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
   first. For
   notes, chapters in order of traffic.
4. **MPSC Mains (Marathi) last,** as its own batch, after the owner has seen
   five Marathi solutions.

Agents: drafting may be split across at most 3 agents at once (owner's
standing rule for ingestion work). Agents only draft from the questions file;
they never see the key file, never write to the database and never touch git.
The main session checks every batch and alone runs `apply.ts`, commits and
merges.

## 8. Done, per batch

- `apply.ts` dry run clean, then `--apply`; counts recorded in the batch's
  commit message (or the progress log below for DB-only batches).
- 10% of the batch read by the main session before applying.
- `npm run audit:text -- <exam>` shows no new hits.
- The SQL of section 2 shows the gap shrinking by what was written.

## 9. Out of scope

Solutions for Marathi translations of English questions; withdrawn or
cancelled questions; PRIVATE rows; changing any key; V working out its own
steps (owner considered it 2026-10-24 and chose this backfill instead).

## 10. Progress log

One line per batch: date, exam, written, disputed, skipped.

- 2026-10-24: spec written; nothing filled yet.
