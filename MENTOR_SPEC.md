# Board path (V as mentor): spec (2026-11-07)

What this document is: the plan for PYQ Vault's first step from a library
(questions, notes, guides, homework) to a mentor that shows a student what to
study each day and owns one promise. Written before any code; Phase 0 and
Phase 1 are now built (§8, §14). The engagement principles gate in CLAUDE.md applies to every
item, and each phase still goes plan → owner OK → test first → build.

Scope, set by the owner on 2026-11-07: **Class 12 boards (CBSE 12 and MH HSC
12), Physics, Chemistry and Mathematics only.** Other subjects and exams
follow only if students ask for them.

## 1. Why

Students are clueless about what to study and in what order (the owner's
offline experience), and the live data agrees.

| Measure (30 days to 2026-11-07, staff excluded) | Value |
|---|---|
| Active students, all exams | 1,929 |
| Active on one day only | 1,130 (59%); median active days = 1 |
| Students who gave an exam date / a weekly goal | 44 / 15 (of 2,530 accounts) |
| V week plans made / chapter tasks done | 21 plans, 6 of 68 chapter tasks |
| Homework day pages opened / finished (since 11-04) | 20 students opened, 5 finished one |
| Class 12 board students (target CBSE 12 or HSC 12) | 624 profiles, 519 active |
| Of those active, on 4+ days | CBSE 67 of 210 (32%), HSC 87 of 309 (28%) |
| Took a chapter test / opened a revision tab / self-marked an answer | 144 / 7 / 54 |
| Told us their stream (PCM, PCB, PCMB) | 41 of 624 |

What students typed to V this month (paraphrased): "I don't understand what to
study or which questions to do first"; "my coaching test is on the 2nd, here
is the portion, plan my days"; "if I start now can I get 480 in boards, give
me a timetable"; "how do I study Electrostatics for boards"; about 25 taps on
"Plan my week".

**The lesson from what we already built:** a plan on its own is not
mentoring. Students did not follow V's week plans or the homework days. What
is missing is the loop around a plan: one small step today, real work that
marks it done, a clear "on track" or "behind", and a plan that changes when
life happens. The parts of a mentor exist (bank, Top 10 PYQs, revision
sheets, chapter tests, drill, V, /me); nothing joins them into a path.

## 2. The promise

**Every Physics, Chemistry and Maths chapter done before the board exam, with
three weeks left for papers and revision.**

A chapter is **done** when all three of these are true:

1. its **revision sheet** has been opened (the /board Revision tab);
2. every question in its **Top 10 PYQs** has been worked, by the Homework
   tab's rule (`lib/homework/progress`, owner 2026-11-05) so the Top 10 tab,
   Homework and the path never disagree: a written or numeric answer
   self-marked Understood or Review later (or answered in the drill), an MCQ
   answered or its answer revealed;
3. its **chapter test** has been finished (submitted or timed out with
   answers in it).

Done is measured by work, never by a tick. A student who already knows a
chapter clears it in one sitting, which is why the path can start from zero.

Fixing mistakes (the drill) is part of the daily path but **not** part of
done: every chapter test makes new mistakes, so a chapter that needed them
fixed could never finish (§4, Fix task).

## 3. Who gets it

- Signed-in students whose target exam is CBSE 12 or MH HSC 12. Progress needs
  an account; nothing is offered signed out in Phase 1.
- Subjects: Physics, Chemistry, Mathematics. Because 583 of 624 have no stream
  on file, starting the path asks one thing: **"Maths in your subjects?"**
  (PCM / PCMB = all three; **PCB = Physics and Chemistry, with one line that
  Biology is not in the path yet**, D1). The answer is saved to
  `student_profiles.academic_stream`, which already exists. The number of PCB
  starters is the demand signal for adding Biology.

## 4. How it works for the student

### Start (one tap, no intake)
On /me, a Class 12 student sees "Finish Physics, Chemistry and Maths before
your boards: about N minutes a day" with a Start button. V offers the same
when a Class 12 student asks for a plan or a timetable. Starting asks only the
stream question above. The board exam date comes from `lib/exam/calendar.ts`.

### The path (computed, never stored)
- Each subject is a queue of its chapters in **book order** (`chapters.order_index`,
  checked 2026-11-07 against all six PCM books: it matches; the outdated CBSE
  Surface Chemistry chapter is left out).
- **HSC Maths is two queues**, Part 1 (chapters 1-7) and Part 2 (chapters
  8-15), because schools often teach the two books side by side (D2). CBSE
  Maths is one book and one queue.
- Each chapter is three tasks, in this order: **revision sheet** (read the
  summary) → **Top 10 PYQs** (retrieval with model answers) → **chapter test**
  (retrieval under time).
- The path starts from zero: every chapter starts not done. Work a student did
  on the site before starting counts, because it is real work.

### Today (the core change)
The top of /me becomes a **Today card** for a path student: 2 to 4 tasks, about
the day's minutes, each a link straight to the work (the Revision tab, the Top
10 tab, the chapter test). Tasks are taken from the subject furthest behind
its own pace, so the three subjects interleave on their own. A task turns done
when its work is recorded (§2), on the card and in V.

Each task carries a small **"Not taught yet"** link. It moves that chapter
behind the next one in the same subject and shows the next task instead. The
path learns the school's order while the student works, so nobody is asked
for it up front. A deferred chapter comes back after **14 days**, or at once
when the student does any work in it (D6): a deferral is "later", never
"skip".

### The Fix task (the drill inside the path)
When mistakes from path chapters are waiting, Today adds **"Fix N mistakes"**:
- at most 5 questions, from the existing chapter-scoped drill
  (`/drill?chapter=`), limited to path chapters;
- only mistakes made on an **earlier day**, never today's, so each fix is a
  spaced retrieval rather than an immediate repeat;
- its mistakes come from chapter-test misses and from Top 10 answers marked
  Review later (which already write `answer_wrong`);
- the existing ladder applies: one right answer since the last miss fixes a
  question, a later miss puts it back.

It is counted in the day's minutes (§5). If the load proves too heavy, the
Fix task moves to every other day before anything else changes.

### /me for a path student
The Today card and status line replace the weekly study-days ring and goal
(D4): one pace on the page, not two. Only 15 students ever set a weekly goal.
The student can **stop or restart the path from /account** (D7). Stopping
returns /me to normal; restarting keeps every chapter already done, because
done comes from work, not from the path.

### Status (one line, honest)
"Physics 4 of 14 · Chemistry 3 of 10 · Maths 5 of 13, on track", or "behind by
3 days". On track means the chapters done are at least what the pace needs by
today. Behind never shows a streak, a red number or a missed-day count, only
what is next and the new finish date.

### V's part
V is the voice of the path, never the only place it lives (plans that lived
only inside V's window got 6 of 68 tasks done):
- V says today's tasks when the student opens V, and answers "what should I do
  now?", "plan my week" and "timetable" from the path instead of making a
  separate week plan.
- **Weekly review** (once a week, inside V and as a line on /me): what went
  well, chapters done this week, what is next, and the new finish date if it
  moved. Growth framed, never a bare score.
- **After a gap:** the next visit opens on "Pick up here: Current Electricity,
  Top 10", not on what was missed.
- A chapter turning done is a genuine learning achievement: V celebrates it at
  that moment, on the screen where the last task finished.

### Pace (set from the date)
Nobody is asked for hours a day. The day's minutes are worked out from what is
left and the days to the revision buffer (§5). "Lighter" and "More" taps on
the card move the daily load; Lighter shows the honest finish date it leads
to.

**The path never shrinks what "done" means to fit the time (D3).** When the
needed minutes are high (a late starter, a long gap), the card says so
plainly with the finish date at the current pace ("At this pace you finish
on 2 Feb. Tap More to finish by 21 Jan."). Chapters still not done when the
last three weeks start come first then, smallest first.

### The last three weeks
From three weeks before the board exam, Today switches from chapters to
**board papers** (`/question-papers`, already published), revision of the
chapters with the most Review later marks, and **the Fix task as a main daily
item** (spaced retrieval of every mistake still waiting). A student with
chapters still not done at that point gets them first, smallest first.

## 5. The pace maths (realistic now, tighter every week)

Time per chapter (estimates, to be measured in Phase 1): revision sheet ~10
min, Top 10 ~30 min, chapter test 15 min (HSC, median 10 questions) or 23-30
min (CBSE, median 15-20 questions).

| | CBSE 12 | MH HSC 12 |
|---|---|---|
| PCM chapters | 37 (Physics 14, Chemistry 10, Maths 13) | 47 (Physics 16, Chemistry 16, Maths 15) |
| Time per chapter | ~65-70 min | ~55 min |
| Chapter work from zero | ~41 h | ~43 h |
| Fix task (~6-7 mistakes a chapter, ~1.5 min each) | ~6 h | ~8 h |
| Total | ~47 h | ~51 h |
| First board paper (calendar.ts, **unofficial**) | 2027-02-15 | 2027-02-11 |
| Revision buffer starts | 2027-01-25 | 2027-01-21 |
| If Phase 1 ships 2026-11-25, minutes a day (6 study days a week) | ~54 | ~62 |

HSC starts just over an hour a day with the Fix task in; without it, ~53.
That is the first lever if Phase 1 measures the load as too heavy (§4).
Every week of delay adds about 7-9 minutes a day. The date is the anchor of
the whole path: both board dates are marked `official: false`, and CBSE
publishes its date sheet around Nov-Dec. Update calendar.ts the day it is out
(per-subject dates can come later).

## 6. Free limits during the pilot

Owner decision: **work inside today's path tasks does not use free answers**,
so the path never stalls for a free student. The limits switched on today
(`paywall_settings`, 2026-11-07) and why each matters:

| Limit | Value | Without an exemption |
|---|---|---|
| Answers a day (`free_reveals_per_day`) | 15 | One chapter's Top 10 is 10; a two-chapter day stalls |
| Chapter tests (`free_chapter_test_limit`) | **5 in total**, not per day | The path needs 37-47 tests: a free student stops at chapter 6 |
| Drill questions a day (`free_drill_per_day`) | 10 | The Fix task (5) fits; the exemption keeps other drilling free to use the rest |

"Today's tasks" is always computed on the server from the path, never sent
by the browser. How each limit is exempted:

- **Answers.** The answer limit is a soft wall in the browser (the answers
  are in the cached page; `/api/me/reveals` returns the day's count). The
  route subtracts today's path questions from the count and returns them as
  exempt, so the meter neither counts nor walls them.
- **Chapter tests.** Enforced by a database trigger
  (`private.enforce_free_mock_limit`), which already lets a test through when
  a friend sent it (`mock_invite_joins`). Same pattern: when the server serves
  a chapter-test task it writes a grant row (student, mock); the trigger lets
  a granted test through and does not count it against the 5.
- **Drill.** `/api/drill/answer` leaves questions in today's Fix task out of
  the day's drill count.
- **A V explanation still uses a free answer as now** (D5), even on a path
  question: the work itself is free (written questions show the model answer,
  MCQs reveal theirs), V's explanation is extra help, and V's cost stays
  capped.
- Pricing is not decided. Nothing in this spec adds a price, a pass check or
  pass copy.

## 7. Data (as built in migration 0225)

Follows the house rule from `weekly_goal` (0113) and `study_plans` (0169):
**no done column**. What a student did lives in `user_activity`; the path only
stores what the student chose, plus the server's pick of today.

- `study_paths`: user, exam slug (CHECK cbse-12 / mh-hsc-12), subjects
  (CHECK subset of physics / chemistry / mathematics), started_at,
  **daily_minutes** (set at start from what is left over the study days to the
  buffer, 30-90; Phase 3's Lighter / More change it), ended_at. One active path
  per student (partial unique index on user where ended_at is null). Own-row RLS.
- `study_path_days` (added in the Phase 1 build): the server's pick of each
  day's tasks, stored on the first read of the IST day. It keeps the card the
  same all day and is where the free-limit exemptions are read from (today's
  Top 10 and Fix question ids), so the reveal and drill routes make one small
  read instead of rebuilding the path. Service-role writes only; a student
  reads their own.
- `study_path_test_grants`: the chapter tests a student's path served
  (service-role writes); `private.enforce_free_mock_limit` lets a granted test
  start past the limit and `private.free_tests_used` leaves it out of the count.
- `study_path_deferrals`: path, chapter, deferred_at. One row per "Not taught
  yet" tap; a deferral is active for 14 days or until the first work in that
  chapter after it, both read at view time (nothing to expire by job).
- The Fix task needs nothing stored: the due pool is already a fold over
  `answer_wrong` / `answer_correct` (`/drill`), filtered here to path
  chapters and to misses before today (IST).
- Done is a fold over existing events: `surface_viewed` with surface
  `board_revision` and the chapter path; `self_mark`, `question_practiced`,
  `answer_wrong`, `answer_correct` on the chapter's Top 10 questions; a
  finished `mock_attempts` row on the chapter's sectional mock.
- When a chapter first turns done, write one `path_chapter_done` event
  (idempotent dedupe key per student and chapter; widens the `user_activity`
  kind CHECK). It fixes the moment for the celebration and the readout, and it
  stops a Top 10 rebuild (a homework plan rebuild re-ranks the tab) from
  quietly un-doing a finished chapter.
- The Top 10 list is read from the published homework plan, the same read the
  /board Top 10 tab uses (`lib/homework/chapterTop.ts`).

## 8. Phases

| # | Phase | What ships | Status |
|---|---|---|---|
| 0 | Ready | Chapter tests for the 4 HSC chapters that have none (Physics: Magnetic Fields due to Electric Current, Magnetic Materials, Structure of Atoms and Nuclei; Chemistry: Green Chemistry and Nanochemistry). They hold only 7-9 MCQs each, under the builder's 10-question minimum, so how to cover them is an owner call · ~~check every PCM chapter's Top 10~~ **checked 2026-11-07: all 84 PCM chapters have 10+ slots** · `npm run path:readout` with today's baselines (§9), measured before anything is visible · V eval cases for path asks | **Done 2026-11-07**; the 4 short tests published with owner OK |
| 1 | Path + Today | Start tap and stream question · path computed from book order (HSC Maths as two queues) · Today card on /me replacing the weekly ring · done derived from work · "Not taught yet" with the 14-day return · Fix task · on-track line · free-limit exemption for today's tasks · `path_chapter_done` · stop / restart on /account | **Built 2026-11-07**, merged to main 2026-11-08; 0225 applied to production 2026-11-08 (owner OK) |
| 2 | V as the voice | V reads and says the path; "plan my week" and "timetable" answered from it · weekly review · "Pick up here" after a gap · chapter-done celebration · a path line on /board chapter pages for Class 12 students (D8) | **Built 2026-11-08** on `feat/mentor-path-phase2` (§15); no migration |
| 3 | Pace and the last weeks | Lighter / More with the honest finish date · behind handling · switch to board papers and revision three weeks before the exam | Not started; **must ship by ~2026-01-15** (HSC buffer starts 01-21) |
| 4 | Proof, then decide | Readout at 4 weeks and after the boards · ask results (`results:announce`) · decide pricing and the next subjects or exams from what students used | After the boards |

Phase 1 is the whole bet; 2 and 3 make it hold. Phase 1 should ship by about
2026-11-25 to keep the pace near an hour a day (~54 min CBSE, ~62 min HSC,
§5); every week later adds 7-9 minutes.

## 9. How we will know

Read on `/dashboard/growth` as an experiment (`board-path`) and with
`npm run path:readout`, on students who start the path, at 4 weeks after
Phase 1 ships, and again after the boards.

| Measure | Baseline (Class 12, 2026-11-07) | Target at 4 weeks |
|---|---|---|
| Class 12 students who start a path | 0 | 150 (about 30% of ~500 active) |
| Starters active on 4+ days in their first 28 days | CBSE 67/210 (32%), HSC 89/313 (28%) of active Class 12, 30 days | 50% |
| Starters on track at week 4 | none | 40% |
| Chapters done per starter in 4 weeks (median) | 0: no active Class 12 student has a chapter done, all time (520 read). 89 finished a chapter test, 217 worked part of a Top 10, 20 half of one, none all of one; 7 opened a sheet | 8 |
| Today task completion (tasks done / tasks shown) | V plans 6/68 chapter tasks (9%) | 35% |
| Starters who fix mistakes on 2+ days | Class 12: 14 of 312 with a miss (4%); all exams 41 of 947 (4%) | 30% |
| After the boards: starters with every chapter done before the buffer | none | 25% |

Honest caveat: students who choose to start are keener than those who do not,
so starters will beat the baseline on day one. The readout compares starters
with themselves before they started, and the start rate shows how many
students the path reaches at all.

Baselines above from `npm run path:readout`, 2026-11-07 (Phase 0). At that
read 4 HSC chapters had their short tests built as drafts, not yet published.

## 10. Principles gate

| Mechanic | Learning principle it serves |
|---|---|
| Today card from the path | Deliberate practice (the next specific chapter), retrieval practice (Top 10, test) |
| Chapter done = sheet + Top 10 + test | Mastery before progression, retrieval practice |
| On-track line and finish date | Metacognition, deadline progress (preferred over streaks here) |
| Weekly review | Metacognition, growth-framed feedback |
| Chapter-done celebration | A genuine learning achievement, shown at the trigger surface |
| Fix task (earlier-day mistakes only, 5 at most) | Spaced repetition, deliberate practice (exactly what was missed) |
| Review later marks feeding the last-weeks revision | Spaced repetition |

Kept out on purpose: streaks and missed-day counts, leaderboards or comparing
students, guilt reminders, any "you're falling behind others" copy, vanity
milestones ("opened 10 sheets").

## 11. Out of scope

Biology, English, languages and other Class 12 subjects · other exams · human
mentors and WhatsApp check-ins · parent reports · pricing and paywalls ·
signed-out paths · coaching-schedule import (a student pasting their coaching
portion). Each comes back only on demand from students.

## 12. Decisions (owner, 2026-11-07)

| # | Question | Decided |
|---|---|---|
| D1 | PCB students | Physics + Chemistry, with one line that Biology is not in the path yet. PCB starters are the demand signal for Biology |
| D2 | HSC Maths (two books, often taught side by side) | Two queues, Part 1 and Part 2. CBSE Maths one queue |
| D3 | A late starter facing a heavy daily load | Show the honest finish date and offer More; never quietly shrink what "done" means |
| D4 | The weekly study-days ring on /me | Replaced by the path for path students: one pace on the page |
| D5 | V explanation of a question in today's tasks | Uses a free answer, as now |
| D6 | When a "Not taught yet" chapter comes back | After 14 days, or at once when the student works in it |
| D7 | Stop or restart | Yes, from /account; restarting keeps chapters done |
| D8 | Where the path is offered | Phase 1: /me and V only. Phase 2: a line on /board chapter pages for Class 12 students |
| D9 | The drill | In the path as the daily Fix task (earlier-day mistakes from path chapters, 5 at most, exempt from free limits); **not** part of chapter done; a main item in the last three weeks |

Earlier owner decisions (same day): Class 12 boards first · V as the mentor,
AI only · the promise is syllabus done on time · pricing not decided · both
boards together · done = revision sheet + Top 10 + chapter test · Today card
on /me with V as the voice · start from zero · path tasks do not use free
answers · book order · pace set from the date · PCM only for now.

## 13. Risks

- **Students may not follow this plan either.** The Today card, done-by-work
  and Pick up here exist because static plans failed; the readout says
  whether that was enough.
- **The board date is unofficial.** A wrong date mis-paces every student.
- **School pace is slower than book order.** Many "Not taught yet" taps would
  mean the path is mostly for chapters already taught; the readout counts
  them.
- **A homework plan rebuild changes a Top 10 list.** Handled by
  `path_chapter_done`; a not-yet-done chapter is judged against the current
  list.
- **The free-limit exemptions widen what free students get.** Starting a path
  makes that day's path work free; the chapter-test grant is the one that
  matters for money (5 tests become every PCM chapter's test). Granted only
  for the chapter test a student's own path serves that day, and readable on
  /dashboard/growth so the owner sees what it costs in passes.
- **Load estimates are guesses** until Phase 1 measures real task times.

## 14. Build plan: Phase 0 and Phase 1 (agreed 2026-11-07; both built)

Owner decisions on the plan: the 4 HSC chapters get **short tests** (7-9
questions from the MCQs they have; the HSC minimum is lowered for these
chapters only, existing tests untouched because `build-sectional.ts --plan`
only appends) · the signed-in cards get a **throwaway dev-only preview page**
for the before/after sheet, deleted before merge, plus the owner's phone
check after the push.

**Phase 0 (no visible change):** 0.1 short tests for the 4 HSC chapters
(`build-sectional.ts --exam=mh-hsc-12 --plan`, dry run, then `--apply`,
publish with owner OK) · 0.2 Top 10 coverage, done · 0.3 `npm run
path:readout`, baselines written into §9 · 0.4 ~6 V eval cases for Class 12
plan asks (Phase 2's acceptance set).

**Phase 0 results (2026-11-07):**
- 0.1: the four short tests (Magnetic Fields due to Electric Current 9 q,
  Magnetic Materials 9 q, Structure of Atoms and Nuclei 8 q, Green Chemistry
  and Nanochemistry 7 q; `wholePoolTestSize`), PUBLISHED with the owner's OK
  on 2026-11-07, one slug at a time. They take the next free numbers (Physics 14-16,
  Chemistry 16), so the /mock catalogue lists them after that subject's other
  tests, not in book order; the path links by chapter, so it is not affected.
- 0.3: `npm run path:readout` (pure core `src/lib/path/done.ts`, the first
  piece of Phase 1's core); baselines in §9. No Class 12 Top 10 slot is
  numeric, so every slot can be worked on /board today.
- 0.4: six real Class 12 plan asks are V cases (`ae910fe6`, `31ca2aef`,
  `5723a8ba`, `d78f5a9e`, `857caaf7` active; `8c897518` switched off because
  its test date is now past and it cannot replay). Baseline run `b04d24ac`:
  3 of 5 active pass. Phase 2 rewrites their good replies to the path.
- Found while reading those chats, for Phase 2: `plan_week` takes no chapter
  list, so a plan for a coaching test's portion added chapters outside it
  (Vectors, Line and Plane) and V told the student to skip them; and its CBSE
  plans pick "the biggest chapters", not book order.

**Phase 1 (own branch, test first, target ~2026-11-25):**
1. Pure core `src/lib/path/`: queues (book order, HSC Maths Part 1 / Part 2,
   outdated out) · done (three parts; the short tests count as tests) ·
   deferrals (14 days or work) · pace (minutes a day at 6 days a week, finish
   date, on track / behind by N days) · today (2-4 tasks from the queue
   furthest behind its pace + the Fix task; stable through the IST day, done
   tasks stay shown as done).
2. Migration 0225 (0223-0224 went to the tutor price): `study_paths` (one active per student, own-row RLS, CHECKs
   on exam, subjects, pace) · `study_path_deferrals` · `study_path_test_grants`
   (service-role writes; `private.enforce_free_mock_limit` lets a granted test
   through and leaves it out of the free count, the `mock_invite_joins`
   pattern) · `path_chapter_done` in the `user_activity` kind CHECK. Test DB
   first, prod with owner OK.
3. Server: read service (bulk reads; `.in()` lists chunked at ~200) · routes
   to start (board + stream), set pace / stop, defer a chapter, read Today
   (no-store) · `/api/me/reveals` returns today's path questions as exempt ·
   `/api/drill/answer` leaves today's Fix questions out of the drill count.
4. Screens: /me start card for Class 12 students (stream tap when unknown) and
   the Today card + status line replacing the weekly ring for path students
   (the staff view of /me follows, read-only) · /board chapter pages open on
   `#top` / `#revision` (read from `location.hash`, NEVER `useSearchParams`,
   which would de-cache the page; a deep-linked Revision still fires
   `reportRevisionOpened`) · stop / restart on /account · `from=path` drill
   tag.
5. Checks: TDD on every pure rule · RLS integration tests for the new tables ·
   route validation tests · a test that exemptions are decided server-side ·
   `npm run path:smoke` (real loaders, real Class 12 students, read-only) ·
   growth experiment `board-path` incl. chapter tests granted · full gate
   before merge · before/after sheet from the preview page.

**Phase 1 results (2026-11-07, `feat/mentor-path-phase1`):** all five items
built, test first. What changed from the plan, and why:
- **Today's pick is stored** (`study_path_days`, §7), not recomputed: it
  keeps the card stable through the day, and the reveal and drill routes read
  the exemptions from it in one small read. Written by the service role only,
  on the student's first read of the day; the staff view computes without
  storing.
- **The pace is minutes a day** (`daily_minutes`), set at start between 30
  and 90 from what is left and the study days to the buffer. On track = the
  finish date at that pace is on or before the buffer. From zero on
  2026-11-07: CBSE about 45 min, HSC about 50 (`path:smoke`).
- **A day works one chapter through its parts** (sheet, then its Top 10 while
  the summary is fresh, then its test) and switches subject between chapters.
  The first build switched after every task, and `path:smoke` showed an HSC
  student four revision sheets and no questions on day one. A day stops at
  80% of its minutes once it holds two tasks. A simulation test pins the
  promise: following every day's card finishes both boards before their
  buffers.
- **The Fix task is done when each of its questions is answered today on any
  page**, not only in the drill, so a mistake fixed in the bank first does not
  hold the task open.
- Exemptions are decided on the server: the reveal and drill routes read
  `study_path_days`, which a student cannot write (RLS test). A Top 10 page
  opened before /me on a new day has no exemption yet: the pick is made on the
  first /me or /api/path read of the day, and the task links come from /me.
- `npm run path:smoke` (read-only, real content and 8 students per board):
  every PCM chapter has its Top 10 and a published test; HSC Maths queues are
  7 and 8 chapters. `npm run path:readout` gains the STARTERS section.
- **Live checks (2026-11-08):** 0225 applied to production with the owner's
  OK. The Chrome extension cannot open localhost, so the golden path ran
  through the real service code against production on the owner's account
  (start, the stored day and its exemptions, Not taught yet, the staff view,
  stop), rows deleted afterwards. The click-through is the owner's phone
  check after the push.

## 15. Phase 2: V as the voice (built 2026-11-08)

Owner decisions on the plan (2026-11-08): V's path card is its own button,
**"My plan for today"** (owner's words were "my today's plan"); the weekly
review shows the **first 2 days** of each path week; V **offers the path** to a
Class 12 board student who asks for a plan.

What shipped, and why each is shaped so:
- **V's card is built from numbers, not by the model** (`VPathCard`, the
  pattern of "How's my progress", which replaced "Plan my week" on 10-27): no
  message spent, nothing made up, the same view as /me. The button shows only
  when the shared pulse says the student is on a path (`pulse.path`, one
  indexed read, only for students with a Class 12 board among their exams).
- **"Plan my week", "timetable" and "what now" are answered from the path**
  (`plan_week` / `my_plan` read `getPathForV`): today's card plus the coming
  days picked by the same rule as if each day is done (`week.ts`), and the
  card under the reply. Another exam named, or `week_only` (a coaching test),
  plans a week as before.
- **The offer names the board date it paces to and says nothing was planned.**
  The first eval run had V pace the path to a student's preboards and, on
  another case, call the offer "your plan is ready". /me was not on V's list
  of linkable pages, so it was dropped from replies; it is now (NAV_FACTS).
  Eval: the 5 Class 12 plan cases read right (d78f5a9e asks which of three
  exams first without a tool, as it did in the Phase 0 baseline); full run
  188/198, one unrelated change each way.
- **A chapter done is said where it finished**: on the chapter test's result
  page (the usual last part), on the /board page, and on /me as a backstop.
  Once, exactly: the `path_chapter_done` upsert returns only rows it inserted
  (the milestone pattern), so two tabs cannot both celebrate.
- **The weekly review compares the week's start with its end** from dated
  records (`fold.ts`: a chapter's state as of any moment; Postgres writes
  "+00:00" and JavaScript "Z", so moments compare as instants). Lines with
  nothing are left out; a quiet week opens on "A new week on your path.", and
  the finish date shows only when it moved (an honest later date included).
- **"Pick up here"** after 3+ days with no path work: the next chapter task,
  never what was missed.
- **The /board line** (D8) is a browser island beside "Fix N mistakes", so
  the page stays cached; it asks `/api/path/chapter` only for a path student
  on their board's page, again when the tab returns to view.
- **Phase 1's gap is closed**: the reveal and drill routes now pick today
  first for a path student with no pick yet (`ensureTodayExemptions`), so a
  /board page or the drill opened before /me gets today's free questions.
- **Not built:** a line after Top 10 marks on the same /board page re-checks
  only when the tab returns to view or the page reloads, so a chapter whose
  LAST part was a Top 10 mark is celebrated on the next view or on /me.
