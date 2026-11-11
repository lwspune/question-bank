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
| `plan` | "plan my week", "4 months left" | `plan_week`, `my_plan`, `exam_strategy` | a plan is made and shown | typed only since 2026-10-27; follow-through low (5 of 63 chapter days done) |
| `reflect` | "how am I doing?", "good at Maths, bad at GAT" | `my_progress`; the "How's my progress" button opens a card built without AI (`lib/chat/progressCard.ts`, 2026-10-27) | answers the question they asked | typed: no per-subject split |
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
- **A student's own working may be checked (owner, 2026-11-08).** V says plainly
  whether their answer is right or names the first wrong step (rule 7b). It
  still never solves a bare numeric question for them: it gives the method and
  asks for their working. A bank question is checked against its key.
- **An Ask V tap pins its question in code (2026-11-08).** The tools read the
  tapped question and pick, whatever id the model passes (`tappedFrom`): 12 of
  426 tap explanations had named the previous question. V never takes back an
  earlier reply unless the student says it was wrong.
- **A language asked for every reply is saved** on the profile
  (`set_language`, migration 0232) and named on every reply, buttons included
  (owner, 2026-11-08: 8 students asked 17 times in 60 days).
- **"One more like this"** under an explanation picks another question from the
  same subtopic with no AI call (`/api/chat/similar`, owner 2026-11-08). V
  cannot write questions and never promises one.
- **V sees the follow-up answer (owner, 2026-11-10, V_LEARNING_LOOP.md step 2).**
  The "One more like this" card is linked to the explanation it followed
  (`v_followups`, migration 0250) once the server has checked V explained it
  today; the first one per explanation per day uses no free answer while
  `chat_settings.followup_free` is on. A right pick says "Right: you used the
  same idea on a new question." and offers another; a wrong one offers "Show
  me where I went wrong", where V is told the question it explained before and
  starts from the step that differs (its "leave earlier replies alone" line is
  replaced there, since the earlier reply is the point).
- **The student's past mistakes reach them as a button, not through V's text
  (owner, 2026-11-10, V_LEARNING_LOOP.md step 3).** Under an explanation, the
  chapter's "Fix N mistakes in this chapter" line opens the drill for that
  chapter (tag `v_chapter`). A note telling V the student's recent mistakes on
  the topic was tried and dropped: in 18 test replies over three wordings,
  one a rule-7 exception, V used it once. V keeps to the solution and sees
  only the pick, never why it was picked. Do not try that note again without
  new evidence (a different model, or the student's working).
- **A second try after a No is never the first one reworded (owner, 2026-11-10,
  V_LEARNING_LOOP.md step 4).** V finds the step that lost them and does one
  of: that step in full with the numbers, the idea it needs first, or a tiny
  example. After a No on a reply with numbered steps the chat asks "Which step
  lost you?" with a button per step; a step message counts as a No everywhere.
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
4. **The learning loop** (2026-11-10, planned, not built): V sees whether its
   explanation worked and remembers the student. Audit, baseline and build
   order in [V_LEARNING_LOOP.md](V_LEARNING_LOOP.md).

## 7. The weekly review (Thursdays, first 2026-10-29)

1. **Scorecard of last week's real chats:** messages and people, the share per
   job, failures by kind (false not-found, ungrounded, wrong, refused something
   answerable, made-up apology), thumbs, and practice within 30 minutes of a
   reply. Read-only, free.
2. **New failures become cases** (`v:eval:seed`).
2a. **Follow-up line:** `npm run v:followups`: the share of V's replies the
   student followed up within 30 minutes, a week at a time (repeat Ask V taps
   on the same question left out). The owner's measure of V as a study partner.
2b. **Verified learning:** `npm run v:learning` (2026-11-10, V_LEARNING_LOOP.md).
   A NEED is a graded miss, or an Ask V explanation of a bank question; it is
   VERIFIED when the same student gets a DIFFERENT question in the same
   subtopic right within 7 days. Counted per week by student and by need, each
   student once; one need per student, question and India day. Graded answers
   are bank, board, guide and daily taps, V's try card, the drill and mock
   picks; self-marks are left out (nobody checked them). Beside each week, the
   student's accuracy on other questions in that subtopic in the 30 days
   before the week against the 7 days after their first need: a check on
   "they already knew it", thin while few students have a history there. A
   week stays open 7 days after it ends. Staff left out. Baseline 2026-11-10:
   after a miss 54-57% of students; after an Ask V explanation 26-43%.
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
- 2026-10-23: a new reply grows in its bubble a line at a time (owner: one
  block is heavy to take in; it is how students read chats). Pure core
  `lib/chat/reveal.ts`; a tap shows the rest; reduced motion shows it whole;
  replies from history show whole. Judged on follow-up questions (growth
  experiment `v-reveal`): 48% of AI replies followed up within 30 minutes
  before it (111 of 233, 15 to 23 Oct). Thumbs are too few to read.
- 2026-10-23: an Ask V tap on a notes question stores which one it was
  (`asked_notes_item`, migration 0181), and V's memory labels it like a bank
  question's id. Two taps on two notes questions had sent the identical
  "Explain this question." unlabelled, and V apologised that its first reply
  "explained a different problem". The same key rebuilds the card above the
  tap and lets the runner replay notes taps. Case cd661fa2 (Mx Amit's second
  tap, its memory labelled as V now sees it): no apology in 2 runs.
- 2026-10-23: "Did you understand? Yes / No" replaces the thumbs under
  explanations (a reply that used explain_question or explain_concept, or
  answered a No); other replies keep the thumbs. Yes shows "Great!"; No sends
  "I didn't understand. Please explain it more simply." and V explains again
  in smaller steps (rule 7), then asks again. Kept per reply (migration 0182).
  Read weekly: the share of explanations understood, and of No turned into
  Yes. Case 76a45899 (a No after a real explanation): simpler and the same
  answer in 2 runs.
- 2026-10-23: V says "the solution" and "the answer", never "stored" (owner:
  "why not just soln?"). The word was ours, in rule 7 and the tools' labels,
  and V repeated it in 39 of 218 replies. Every case now fails a reply that
  says it. Run da51bf83 (explain_question): 55 of 57 clean; the 2 that said it
  copied it from V's older replies in their memory.
- 2026-10-23: V reports a slip in OUR solution (`report_solution_issue`):
  a typo or a wrong step while the answer is right becomes a question report
  ("V, while explaining: ...", category incorrect-solution, one open per
  question, migration 0183) for /dashboard/reports, and the student gets the
  correct working plus at most one short line. Trigger: a JEE solution listed
  -1 twice and V told only that student. Run 1757d4e4 (57 explanations): one
  report, and it was right (q2 written as +4, not -4, with the direction also
  flipped; the answer stands); none on a correct solution.
- 2026-10-24: on notes questions V just explains: nothing about where the
  question comes from or what it lacks, and Report only when the student says
  the answer is wrong (Soham: "This is a notes item, so I can't use the stored
  solution steps", then Report unasked). Case 3417df59: clean in 2 runs. The
  root cause, questions with only an answer, goes to the solutions backfill
  (`SOLUTIONS_BACKFILL_SPEC.md`).
- 2026-10-27: the "Plan my week" button became "How's my progress" (owner). 20
  students tapped the plan button in a week, but 5 of the 63 chapter days in
  their plans were done and one asked to see a plan again. The card is built
  from the student's numbers by `lib/chat/progressCard.ts` with no model call
  (so no v:eval case moves: V's text is not involved), its own switch at
  /dashboard/chat (0191). Typed plan asks still reach `plan_week`. Growth
  experiment `v-progress`.
- 2026-11-07: gaps from the first review since 10-27 (V's tone and explanations
  unchanged, owner: "keep it that way"). (1) A second Ask V tap on a question V
  already explained in the session reopens that explanation, no new answer
  (`explainedTap`): 104 of 440 taps were the same student re-tapping the same
  question within a minute. (2) Follow-ups are counted without those repeats
  (`npm run v:followups`); counted, they had held the share at 48%; without
  them it is 39% before the reveal and 36%, 35%, 27% over the last three
  weeks, while Ask V taps grew to most messages. (3) V answers "is there an
  app?" with Add to Home screen (10 asks since October). (4) "maths" finds
  Quantitative Aptitude (SSC) and Numerical Ability (AFCAT). Run d7a3b608: the
  3 app cases that failed now pass, plus 2 new cases (bbae8896, 82b9f130), 5/5
  read, $0.0096.
- 2026-11-07: Premium Pass holders may ask V 50 messages an hour, everyone
  else 5 (owner; migration 0226, `lib/chat/hourlyLimit.ts`). The ₹199
  Practice Pass keeps V's explanations (it promises unlimited answers). At the
  limit V says when to ask again in its own bubble, and a free student gets the
  Premium card; a Practice holder only the line, until an upgrade price exists
  (owner: prorated by days left, to think through). Stopped messages are now
  kept (`hourly_limit`). No change to V's text, so no v:eval case moves.
  Growth experiment `v-premium-hourly`.
- 2026-11-10: "Price" and "How to buy" (two students, 2026-11-09) each got a
  paragraph of free limits and no way to buy, because rule 6 said to lead
  with what is free. Rule 6 now gives each pass's price and length, then the
  steps (open /pricing, sign in, tap Buy, pay by UPI, card or netbanking),
  even when unsure they mean our pass; "what is free" (6b) and "which pass"
  (6c) keep their own answers. V had also been told free accounts get "5
  whole past-paper downloads a day": that is the pass holders' cap (0137); a
  free account gets one free paper with its key and one free formula sheet.
  Full run a11e8f22 188/204; the pricing cases 5/5 after the last edit (run
  9f0beac5). "Notes for cbse" (7ab00300) failed on the branch and once on
  main too: 9 of 19 runs ever, a coin flip, not this change. The two new
  messages are not cases yet: seeding writes to production and was not run.
- 2026-11-11: a tap on a notes practice question could make V explain a
  DIFFERENT question. One real chat: the student asked V about a mock's
  trigonometry question, then 45 minutes later tapped Ask V on a definite
  integral in the notes; V called `explain_question` with the old question's
  id and explained the trigonometry one (1 of 25 notes taps in 30 days). A
  bank tap was already pinned in code (2026-11-08); a notes tap now is too
  (`notesTappedFrom`, `lib/chat/questionToolSet.ts`): when its question and
  solution loaded, the three question tools answer "explain the one at the
  end of your instructions" instead of looking anything up. Replayed 4 times
  through V: 4/4 explained the integral, none mentioned the old question.
  Full run 1f78474b 210/220. "??" after an explanation (494dbce4) fails about
  3 runs in 4 on main as well (V calls its earlier reply a mistake and echoes
  "stored" from the old reply in the history): a separate slip, not this
  change.
