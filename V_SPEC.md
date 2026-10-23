# V, the study partner: spec (2026-10-22)

What this document is: the framework every change to V is made against. Until
2026-10-22 V's rules (`src/lib/chat/facts.ts`) grew one patch at a time, each
written for the conversation that had just gone wrong, with nothing to say
whether the patch broke something else. The owner asked for a framework and a
weekly review instead. Read this before changing V's instructions or tools.

The runbook (keys, switches, caps, cost, exports) stays in OPERATIONS.md, "V's
AI answers". The history of each change is in the project memory and git.

## 1. What V is for: the student's jobs

Every message a student sends V is one of these jobs. A change to V names the
job it improves, and is tested on that job's cases (section 4).

| Job | Example | Where the answer comes from | Done when | State (2026-10-22) |
|---|---|---|---|---|
| `find` | "SSC vocab PYQs", "notes for MH SSC linear equations" | `find_chapters`, exam and notes facts | the right page is linked, or V asks the ONE thing it needs (usually the exam) | mostly works; false "not found" about 1 in 4 (`v-finder`, check 2026-11-02) |
| `explain_question` | Ask V on a question, "why F = nmv?" | `explain_question` / `get_question`: the stored solution | correct, from our solution, never against the key | works well |
| `explain_concept` | "derive the potential due to a point charge", "what is active transport" | `explain_concept` (section 2) | a correct, grounded explanation | built 2026-10-22 (step 2) |
| `practise` | "test me on NLM", "mini test" | the practice-test builder, `similar_question` | the student starts practising | works |
| `plan` | "plan my week", "4 months left" | `plan_week`, `my_plan`, `exam_strategy` | a plan is made and shown | works; follow-through not measured |
| `reflect` | "how am I doing?", "good at Maths, bad at GAT" | `my_progress` | answers the question they asked | no per-subject split |
| `help` | payment, app, homework, "is it free" | site facts | the right next step | gaps: app install, homework |
| `chat` | greetings, role-play, gibberish, abuse | none | one friendly line back to studying; abuse gets the fixed line | works |

## 2. Where V's knowledge comes from (the ladder)

V answers from the first rung that has the answer, and says which rung when it
is the last one.

1. **Our questions and their solutions.** The bank holds board model answers
   for most classic derivations and definitions (the trigger case, "Derive an
   expression for electric potential due to a point charge", is in MH HSC 12
   Electrostatics word for word). Searched by `v_search_answers` (migrations
   0177-0178) over `questions.search_vector`, PUBLIC rows only, the student's
   exam and the page's subject ranked first, written answers above MCQs.
2. **Our /notes:** the concept cards of every notes chapter, searched by name
   in `notesConcepts.generated.ts` (written by `npm run chat:notes-data`, loaded
   only on a concept question), each card read from its chapter alone.
3. **The model's own knowledge**, for concepts and derivations only (owner,
   2026-10-22), with no fixed opening line: "General explanation (not from our
   question bank):" was dropped on 2026-10-23 (owner: it adds no value to the
   student).
   Never to override an answer key, never a new numeric problem, and never for
   site facts, prices, exam dates or what a future paper will ask. Only when
   rungs 1 and 2 found NOTHING: a failed search is not "nothing", and V says
   to try again instead.

All three are the `explain_concept` tool (`lib/chat/conceptSearch.ts`, rule 7a
in `facts.ts`), on the same switch as Ask V's explanations. A concept answer
does not use a free answer (owner, 2026-10-22): it answers a topic, not the
question on the student's screen.

## 3. Standing decisions

The owner's rulings, collected so a change does not quietly reverse one. Each
is enforced in `facts.ts` or the tools; the date is when it was made.

- **Students only.** Teacher and download questions were dropped from V (2026-10-15).
- **Ask, never guess the exam.** "Class 12" alone is not an exam (2026-10-18).
- **Answer only what was asked.** No unsolicited "try this one" or check-question
  in V's text (2026-10-22). Optional TAP BUTTONS under a reply are allowed
  (decision B, 2026-10-22).
- **Explanations come from the stored solution and never override the key.** A
  V explanation spends one free reveal; the pass is unlimited (2026-10-19).
- **Caps:** 5 messages per person per hour, kept even when a feature wants more;
  V will get its own pricing later (2026-10-19). Signed out: one typed question
  per browser, replies that only ask back free up to 3; Ask V signed out is a
  sign-in link (2026-10-16, 10-18, 10-19).
- **Abuse:** one fixed calm line, then no reply (2026-10-20).
- **Off-topic and role-play:** a friendly line back to studying; observe, no
  new rule without new evidence (2026-10-16).
- **Memory:** a session ends after an hour with no messages; V remembers the
  last 2 exchanges of it; Reply names an earlier message (2026-10-21).
- **Facts follow `EXAM_REGISTRY`**, pinned by a test; never an exact exam count
  ("20+ exams") (2026-10-20).
- **Model and cost:** Claude Haiku 5.5. No pre-written "why your pick is wrong"
  notes until V's AI spend nears $1 a day (2026-10-20).
- **Cost is tracked, and cut only where quality cannot move (owner, 2026-10-23):**
  the fixed instructions sit in the 1-hour prompt cache (most cache writes
  came 5-60 minutes apart, after the 5-minute one had lapsed); a change is
  tested on its own cases first (`--case`), the whole set once before merging.
  Test runs are NOT batched: tried 2026-10-23, a batch's requests did not read
  the cache and the find cases cost 2.5x as much. Cost per answer is on
  `/dashboard/chat` and in `npm run v:cost`.
- **Parked:** withdrawn UPSC questions (V says the pick "is marked wrong"; 10
  such questions; re-raise only when the owner does); the mock result page
  being wider than a phone.

## 4. Testing: real conversations, replayed

**Cases** live in `v_eval_cases` (migration 0176), not in git, because they are
student messages and the repository is public. Each is one real message with
everything needed to replay it (page, signed in or not, the student's exams,
the question Ask V was tapped on, V's memory at the time, a Reply's context),
its job, the automatic checks it must pass (`expect`) and, in words, what a good
reply does (`good_reply`). `original_verdict` marks the reply V actually gave,
the baseline the framework started from.

**Every failure found becomes a case before it is fixed.** That is what stops
the next fix from undoing this one.

**Runner:** `npm run v:eval` replays every active case through
`lib/chat/answer.ts`, the same function the live route calls, with V's live
settings and the real model. What it cannot replay it stands in for, writing
nothing: a reveal is always allowed, a plan or a save stays in memory, the
student has no results yet. So a `reflect` case tests that V reads the
results, not what it says about them. `-- --case=<id start,...>`,
`-- --job=find`, `-- --limit=N`, `-- --label="..."`, `-- --dry`. About
$0.0005 a case, roughly $0.10 a run. In the week to 2026-10-22, test runs cost
$0.31 and students' answers $0.16, so test spend is watched too: re-test a
change on its own cases (`--case`), and run the whole set once, before merging.

**Checks** (`scripts/lib/vEval.ts`, spec `tests/v-eval.test.ts`): tools called
or not, tappable links, wording that must or must not appear, length, plus
three on every case (a reply at all, no markdown link, no em dash). `judge: true`
asks a person to read the reply (is the explanation right, the tone kind).

**Marking** is done in a Claude Code session reading the run's report
(`generated-papers/v-eval/`, gitignored), never by a paid grader model (owner,
2026-10-22). Marks go back with `npm run v:eval:mark -- <marks.json>`, which
prints the score per job.

**Adding cases:** label messages in a JSON file kept OUT of the repo, then
`npm run v:eval:seed -- <file>` (dry run) and `-- <file> --apply`. The script
reads everything else from the stored row.

## 5. How a change is made

1. Name the job and the cases that show the problem (add them if missing).
2. Change `facts.ts` or a tool.
3. `npm run v:eval -- --case=<ids>` (or `--job=<job>`) while working, then the
   whole set once before merging.
4. Read the report: no case that passed before may now fail without a reason
   written down; mark the `judge` cases.
5. Ship, and say in the commit which job and cases it moved.

## 6. Build order

1. **This framework** (2026-10-22): spec, cases, runner, baseline score. V's
   behaviour unchanged.
2. **`explain_concept`:** a tool that searches question text, then /notes; then
   rung 3, labelled. Measured against the baseline.
3. **`facts.ts` rewritten by job**, each rule pointing at the cases that justify
   it; the pending fixes from the 2026-10-22 review go through the test loop.

## 7. The weekly review (Thursdays, first 2026-10-29)

1. **Scorecard of last week's real chats:** messages and people, the share per
   job, failures by kind (false not-found, ungrounded, wrong, refused something
   answerable, made-up apology), thumbs, and practice within 30 minutes of a
   reply. Read-only, free.
2. **New failures become cases** (`v:eval:seed`).
3. **Cost line:** `npm run v:cost`: cost per answer over the last 7 days
   against the 7 before (flagged above a 20% rise, once both weeks have 20+
   answers), and what the week's test runs cost. A flagged rise is looked into
   before any new change.
4. **Pick at most one or two changes** for the week, by job.
5. **Test and ship** as in section 5.
6. **Note the outcome here** in the log below, one line.

### Log

- 2026-10-22: framework agreed; decisions A (own knowledge for concepts,
  labelled) and B (buttons only) made. 192 cases from every message students
  had typed (4 inactive: the row never recorded the question tapped, and 3
  depend on a day's free answers). **Baseline run a605009e: 153 of 185 pass
  (83%), $0.08.** By job: find 35/41 · explain_question 46/54 ·
  explain_concept 5/12 · practise 2/4 · plan 31/33 · reflect 3/3 · help 15/22
  · chat 16/16. Every stored-solution explanation read was right. The failures
  cluster in: no answer to a concept or derivation (step 2); false "not found"
  or the wrong exam for a Maharashtra student; the app ("add to home screen")
  and homework facts; V pointing at "Build a practice test" for a test;
  withdrawn UPSC questions (parked); a made-up apology after "??".
- 2026-10-22, step 2 built: `explain_concept` (bank model answers, then notes
  concept cards, then a labelled general explanation), rule 7a, and rules 7
  and 9 adjusted (a written question without options and a word to define
  are concepts; a topic name alone is still a chapter search). **Run ad54f6ec:
  167 of 185 pass (90%), was 153 (83%).** explain_concept 12/12 (was 5/12);
  no job below its baseline. The search first read ~80,000 buffers per call
  (2 s): 0178 made it GIN-first, ~3,500 buffers. Open for the owner: questions
  with no stored solution (rule 7 forbids V's own working, so V cannot explain
  them); and explain_concept once answered a "how do I study X" ask with a
  lecture (watch it in the weekly review).
- 2026-10-23: the "General explanation (not from our question bank):" opening
  line dropped (owner: it adds no value to the student); the permission to
  explain a concept from V's own knowledge when the bank and notes have nothing
  is unchanged. Run 21b31d5a: explain_concept 12/12, every reply read; new case
  711820ea (Hemant's "why cos c is 0", a follow-up that had opened with the
  label) passes. Same day: the 1-hour prompt cache, `--case`, and the cost line
  (`npm run v:cost`); Message Batches tried for test runs and dropped (dearer).
