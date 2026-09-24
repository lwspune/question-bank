# Engagement engine — spec (2026-09-24)

What this document is: the plan for making PYQ Vault a product students come
back to, written after reviewing the engine as built and the live numbers on
2026-09-24. It replaces the "Engagement engine — what remains" section of
ROADMAP.md as the source of truth for this work. The principles gate in
CLAUDE.md still applies to every item here.

## 1. The diagnosis

The engine is honest and well-instrumented. It sits on a core loop that makes
most students fail on their first visit, and the three mechanics that could
change that are invisible.

| Measure (live, 2026-09-24) | Value |
|---|---|
| Accounts / signed up in the last 28 days | 391 / 245 |
| Students with any recorded activity | 249 |
| Of those, active on exactly ONE day ever | 137 (55%) |
| Returned within 7 days of first activity | 72 of 207 (35%) |
| Students who sat a mock / sat exactly one | 196 / 89 (45%) |
| Median paper served | 150 questions, 150 minutes |
| Median share of the paper answered | 27% |
| Attempts that timed out unattended | 199 of 758 |
| Median score as a share of max marks | 11% |
| Accuracy on attempted, when at least half was answered | 70% |
| `/drill` completions since launch (09-19) | 8, by 2 students |
| Shares ever / report emails in the last 7 days | 3 / 6 |

Acquisition is fine. Retention breaks at the first session. The typical first
experience is a full past paper, a quarter of it attempted, a headline near
10%, and a Retake button offering the same 150 minutes again. Students who
attempt are competent (70% accuracy). The product tells them they failed when
they mostly ran out of paper.

`/drill` and `/me` are reachable only from the avatar popover. The result page
links to the drill only inside the findings card, below the score and Retake.

## 2. What "addictive" means here

Four properties, all inside the gate:

1. **A short, winnable loop** that ends in a result and one next action.
2. **Something waiting** when they come back, and a visible count of it.
3. **Visible progress** that changes because of what they did.
4. **A deadline or a cohort** pulling them, not a rank pushing them.

Kept out, deliberately: daily streaks (measured cadence is `mixed`, median gap
2 days; a broken streak shown on every visit is the demotivator), XP or coins,
leaderboards (a class WhatsApp group rebuilds one from broadcast scores, which
is why the share loop already keeps the score opt-in).

## 3. Items and status

| # | Item | Status |
|---|---|---|
| 1 | Result screen reframed around what they attempted, with "Fix these" as the primary action | **Tranche A — building** |
| 2 | Due queue visible: a Fix tab with a count, a badge on the avatar, the count on /me | **Tranche A — building** |
| 6 | Weekly sittings goal, student-chosen, with a progress ring | **Tranche A — building** |
| 5 | Mastery map: chapter tiles with subtopic dots from the existing weak/mastered bands | **SHIPPED 2026-09-24** at `/me/map` (no schema; `npm run map:smoke`) |
| 4 | Daily set: five questions, due drill first then unseen from weak subtopics | Tranche B — specified below, depends on the unseen picker |
| 10 | Feed the drill from /browse, notes checkpoints and public quizzes | Tranche B — specified below |
| 7 | Teacher-assigned paper with a deadline for a batch | **SHIPPED 2026-09-24** — `mock_assignments` (migration 0115), teacher card on the batch roster, due list on `/me`, line on the mock page |
| 8 | Content-led nudges at 12:30 IST | **SHIPPED 2026-09-24** — email only (`npm run email:due-nudge`, cron `.github/workflows/due-nudge.yml`, migration 0114) |
| 9 | Exam date and days-to-exam | Tranche C — DECIDED 2026-09-24: derive from a calendar, student override (§5) |
| — | Per-question peer rates on the findings card | Tranche C — DECIDED 2026-09-24: yes, question level only (§5) |
| 3 | Short sittings as the default first unit | **Declined by the user, 2026-09-24.** Not built. |

## 4. Tranche A — the build

### A1. Result screen reframe (item 1)

**What the student sees.** The headline card leads with accuracy on what they
attempted, then the number left unanswered, then the marks. Example:

> **70% right** — 21 of the 30 you attempted. 120 left unanswered.
> 34 / 300 marks

The primary button is **Fix these mistakes** and opens a drill built from THIS
attempt's wrong answers. Retake becomes a secondary button. When the attempt
has no wrong answers the primary button is **Take another mock**. When nothing
was attempted the headline says so plainly and the primary button is Retake.

**Rules** (pure, `src/lib/mocks/resultHeadline.ts`, spec
`tests/mock-result-headline.test.ts`):
- attempted = correct + wrong. accuracy = round(correct / attempted × 100), or
  null when attempted is 0.
- The headline never prints a percentage of max marks. Marks stay on the card
  as a secondary line, because negative marking makes "11%" read as a verdict
  on the student when it is mostly a verdict on the clock.
- `primaryAction`: `fix` when wrong > 0, `another` when wrong = 0 and
  attempted > 0, `retake` when attempted = 0.

**Attempt-scoped drill.** `/drill?attempt=<uuid>` serves up to five of the
questions the student got wrong in that attempt, intersected with the due pool
(a question they have since fixed is not served). Pure
`scopeToAttempt(due, wrongIds)` in `src/lib/drill/select.ts`. The scoped
drill's end screen offers "Another five from this paper" while any remain,
then falls back to the general drill. The findings card's existing "Fix five
of these now" button points at the same scoped drill so the two CTAs agree.

**Not changed.** The mobile gate, the share card, the review list, the
findings card's content.

### A2. The due queue, visible (item 2)

**What the student sees.**
- Desktop: a **Fix** tab in the primary nav, after Mocks, with the due count
  as a badge. Signed-in only.
- Phone: the tab bar stays a fixed five (that is a measured constraint, see
  `lib/nav/mobileTabs.ts`). The count appears as a badge on the avatar button,
  and the "Fix your mistakes" row in the menu carries "N due".
- `/me`: the drill card shows the count (it deliberately showed none before,
  because the honest number was expensive to compute on that page; it now
  arrives from the same endpoint the header uses).

**Data.** `GET /api/me/pulse` → `{ due, week: { done, goal } }`. Signed-in only,
`no-store`. `due` is the drillable pool size from the same read path as
`/drill` (`getOwnDuePool`), so the number the header shows is the number the
drill will serve. Not an approximation, and not a second implementation of the
ladder.

**Cost control.** The client hook (`src/lib/viewer/usePulse.ts`) fetches once
per page load only when a session exists, and caches the answer in
`sessionStorage` for 10 minutes. The cache is invalidated when a drill answer
is recorded and when a mock result page mounts, so the count is fresh at the
two moments it changes. Pure freshness rule `isPulseFresh` in
`src/lib/pulse/cache.ts`, spec `tests/pulse-cache.test.ts`. If the endpoint
shows up in `db:health`, the upgrade path is a SQL RPC for the fold with an
equality test against the TS ladder; not built until it is needed.

### A3. Weekly goal (item 6)

**What the student sees.** On `/me`, a card: "This week: 2 of 3 sittings",
with a ring and a one-line growth-framed sentence. A sitting is a finished
mock, a finished drill, a notes checkpoint, or a public quiz. The goal is
theirs to set (2, 3, 5 or 7 a week; default suggestion 3). The header menu
shows the same line.

**Rules** (pure, `src/lib/goals/weekly.ts`, spec `tests/goals-weekly.test.ts`):
- Week starts Monday 00:00 IST. `weekStartIst(now)`.
- `WEEK_SITTING_KINDS = mock_submitted | drill_completed | note_checkpoint |
  quiz_taken`. Counted from `user_activity`, `count: "exact", head: true`, so
  the 1000-row cap cannot touch it.
- `weeklyProgress(done, goal)` → done, goal, remaining, pct (capped at 100),
  met. `weeklyGoalSentence` names what moved and what is next, never a bare
  number, and a met goal says so without asking for more.
- `sanitizeWeeklyGoal` accepts integers 1..14, else null.

**Schema.** Migration 0113 adds `student_profiles.weekly_goal smallint` with a
CHECK 1..14, nullable. Null means "not chosen": the UI shows the default of 3
and the ring, and the card says the goal is a suggestion until they pick one.

**Why not a streak.** The measured cadence is `mixed` (median gap 2.0 days,
205 of 419 gaps next-day). A weekly target fits both daily and burst students;
a daily streak punishes half of them.

### Measurement — what "substantial" means

The user's requirement (2026-09-24): this work must show a substantial
improvement in PMF metrics. These are the targets, read on `/dashboard/pmf`
four weeks after each tranche ships, on the cohorts that signed up AFTER it
shipped (earlier cohorts never saw the change and would dilute the read):

| Metric | Baseline (2026-09-24) | Target after A | Target after A+B+C |
|---|---|---|---|
| 7-day return after first activity | 35% | 45% | 55% |
| Students with exactly one active day ever | 55% | 45% | 35% |
| Sat exactly one mock, never a second | 45% | 35% | 25% |
| `drill_completed`, distinct students per week | 2 | 30 | 80 |
| WAU/MAU | 19% | 25% | 35% |
| DAU/MAU | 9.6% | 12% | 18% |

Honest expectation: Tranche A fixes the first session and makes the queue
visible, which is necessary but not the whole lift. The largest movers of
return rate in this cohort are the things that reach a student who has closed
the tab: the nudge (C2), the teacher deadline (C1) and the daily set (B2). A
substantial result needs those, so the C decisions in §5 should be made soon
after A ships rather than left open. The sample floors on `/dashboard/pmf`
(10 per cell) mean a weekly cohort of fewer than ten will show a count and
withhold the rate; read the 4-week cohort rather than the weekly one.

## 5. Tranches B and C — specified, not built

**Build order agreed 2026-09-24:** push Tranche A first (the PMF read is on post-ship cohorts) → C2 nudge + B1 mastery map → C1 teacher deadline → C3 exam date → C4 peer rates → B2 daily set → B3 wider fuel.

### B1. Mastery map (item 5)

**SHIPPED 2026-09-24 at `/me/map`.** Pure core `src/lib/performance/masteryMap.ts` (`bandOf` reads the accordion's own thresholds, `buildMasteryMap` sorts tiles worst-first; TDD). Native `<details>` tiles, two columns on a phone, exam/subject pills reuse `buildLaneNav` so `/performance` and the map agree on the selection, every pill `prefetch={false}`. Linked from `/me` (beside "See what to work on") and the drill's end screen. Not verified: the render (auth-gated); `npm run map:smoke` drives the data chain. As specified: per target exam and subject, a grid of chapter tiles. Each tile carries one
dot per subtopic coloured by the band the performance code already computes
(`WEAK_BELOW` 0.5, `MASTERED_AT` 0.7, else mid, grey when fewer than
`MIN_JUDGED_FOR_CLAIM` judged). Tapping a tile opens its subtopics with a
"Practise" link each (existing `goPracticeHref`). Lives at `/me/map` and is
linked from `/me` and the result page. Read-only over `getOwnPerformance`; no
schema. The drill retiring a question is what moves a dot, so it should be
visible from the drill's end screen ("Trigonometry moved from weak to mid").

### B2. Daily set (item 4)

Five questions per target exam, fixed size, drawn in order: due drill questions,
then unseen PYQs from the student's two weakest subtopics, then unseen PYQs from
the exam at large. Needs an "unseen for this student" picker (exclude every
question id in their `attempt_answers` and `user_activity`), difficulty-matched
to their band. Ends in the drill's end screen. This is the deferred "3 more
like it" transfer half; build it once Tranche A shows drills being finished.

### B3. Feed the drill from every surface (item 10)

`answer_wrong` is mock-only. Make `/browse`'s reveal attempt-first (choose,
then reveal, like `/board`) and record the verdict server-side; emit
`answer_wrong` from notes checkpoint self-scores where the student marks a
question wrong, and from public-quiz grading for signed-in students. Each
emitter carries `metadata.surface` so PMF can tell them apart.

### C1. Teacher-assigned paper with a deadline (item 7)

**SHIPPED 2026-09-24.** `mock_assignments` (0115): one row per (batch, mock), a due date, an optional 200-char note; RLS mirrors 0083 (enrolled students read their batches' rows; staff read and write within `batches_select_scoped`), pinned by `tests/mock-assignments-rls.test.ts`. Teacher: an "Assigned papers" card on `/dashboard/batches/[id]/roster` — pick a published mock (the batch's exam first), a due date, a note; each row shows "12 of 30 sat" and, behind a disclosure, who has not. **No score column and no ordering of students, by rule.** Student: a "Set by your teacher" list on `/me` (unsat first, soonest due first, one Start button; rendered only when there is one) and a line under the title on `/mock/[slug]`. Pure core `src/lib/assignments/core.ts` (`validateAssignmentInput` · `assignmentState` open / due-soon (48h) / overdue · `dueLabel` in IST · `completionFor` = any GRADED attempt of that mock by a roster student · `studentAssignmentViews`; TDD). Writes via `POST /api/batches/assign` through the caller's RLS client. The decision was: does an assignment live on `papers` (a paper targets a batch
already) or on `mock_tests` (a timed sitting)? Recommended: a new
`mock_assignments` table (batch_id, mock_id, due_at, assigned_by) so a teacher
picks a published mock for a batch with a date; students in that batch see
"Due Sunday" on `/me` and `/mock`; the teacher sees completion per student.
Deadline pull only, no ranking.

### C2. Content-led nudges (item 8)

**SHIPPED 2026-09-24, email only.** Who: students with a due drill pool, not opted out, no drill activity in the last 24 hours, no nudge in the last 3 days, and no more after three unanswered nudges until they drill again; one a day at most (the dedupe key carries the IST day, enforced by the UNIQUE index). What: subject leads with the top chapter and its count ("3 Trigonometry questions are waiting"), body lists the chapters and the cost of a drill, one "Fix them" link to `/drill`, never "we miss you". When: 07:00 UTC = 12:30 IST, `--apply --limit=200` in the workflow only. Measure: `npm run email:due-nudge -- --report` prints recipients who drilled within 24 hours of a send. **Needs the same two repo secrets as the mock report (`RESEND_API_KEY`, `EMAIL_FROM`).** Pure core `src/lib/email/dueNudge.ts` (TDD), reads `dueNudgeService.ts` (one pass over `user_activity`, the drill's own fold), template `buildDueNudgeEmail`. The decision was: email only (Resend, exists) or WhatsApp too (no
provider yet). Rule either way: send only when something is due, name the
content, one per day at most, 12:30 IST, and never "we miss you".

### C3. Exam date (item 9)

**Decided 2026-09-24: derive-with-override, as recommended.** The roadmap's two questions are answered by it: derive-with-override, a TS
calendar beside `EXAM_REGISTRY` with a probe that fails once a sitting is past,
NDA first. Then `/me` and the header can say "NDA 2027-I in 112 days".

### C4. Per-question peer rates

**Decided 2026-09-24: yes, question level only, never person level.** The findings card deliberately showed no "62% of students got this right".
Recommendation: allow it at question level only, never person level. It is
metacognitive and it is not a ranking. Needs a service-role read on a student
page, which is why it is a decision and not a default.
