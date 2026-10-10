# UX action plan: Y1 + A1–A13

> **Status 2026-10-10: mostly shipped (2026-10-02 to 10-05).** Done: Y1 (and D3, board picks, with celebrations), A1, A2, A3, A4 (as `TodayCard`; the teacher-assignment branch was left out), A5 (with celebrations), A6's fix (`overflow-x: clip` on html/body, `cae2578b`), A7's chat launcher, A8, A9, A10, A12, A13. **Not built:** A11 (resume card on `/mock`), U9 (theme toggle into the menu on phones) and A6's `layout:overflow` probe. Those and the dated readings in section 4 are carried in [ROADMAP.md](ROADMAP.md) under "UX triage: what is left". The rest of this file is the plan as written on 2026-10-02.

**Date:** 2026-10-02 · **Source:** [UX_REVIEW_TRIAGE.md](UX_REVIEW_TRIAGE.md) · **Status:** CONFIRMED 2026-10-02. D1, D2, D3 (not now) and D5 accepted; D4 explained, awaiting a pick (affects A6 only). The print-handout branch is merged; work branches from `main`.

Every item below has: what changes, the files, the test written first (your TDD rule), how it is verified, and the commit. One commit per item (conventional, atomic).

---

## 0. Before any code

**Branch.** You are on `fix/print-handout-legends-branding`: 5 commits not in `main`, plus uncommitted edits to `ROADMAP.md` and `SEO_INDEXING_WORKLIST.md` that are not mine. A10 edits the same line in `central-tendency.ts` that commit `f8b94f50` on that branch edits.
**Recommended:** you merge that branch to `main` first (your usual merge flow). Then I branch `feat/ux-triage` from `main`. I will not touch, stage or stash your uncommitted files.

**Decisions I need from you** (my recommendation first):

| # | Question | Recommendation | Why |
|---|---|---|---|
| D1 | Homepage headline count (A1) | **"46,993 past-year questions and 38,540 textbook and practice questions"** (live today): keep both, name each | Honest and keeps the big number. Dropping practice from the headline cuts it by 45%. "Textbook" matters: for the board exams, the non-PYQ rows are the book's own exercises |
| D2 | Bank misses go straight into the drill (Y1) | **Yes** | That is the point of recording them. Side effect: due-nudge emails start reaching bank-only students. The send cap (30/day) is unchanged, so the shared email quota is safe |
| D3 | Record `/board` picks too (Y1) | **Not now** | You asked for the bank. Board rows are book exercises, mostly not MCQ (199 reveals a week). Add it later with one line if the bank data looks clean |
| D4 | The durable overflow check (A6) | **A local probe that drives the installed Edge** over its debugging protocol, using Node's built-in WebSocket. No new npm dependency | Playwright would be a new dependency; your rule asks for a clear gap first. The probe runs like the other `*:smoke` scripts, not in the push gate |
| D5 | Chat bubble on phones (A7) | **Shrink to 44 px, hide while scrolling down, show on scroll up** | V had 66 uses from 19 signed-in students in 4 days, so hiding it entirely would remove something in use |

---

## 1. Y1: record right or wrong on bank answers

### What it does
When a signed-in student taps an option on a bank card (`/browse` and the `/questions` chapter pages, which use the same card), the server grades the pick and records it:

| Pick | Rows written | Meaning |
|---|---|---|
| Wrong | `question_practiced` {surface: bank, chose, correct: false} **+** `answer_wrong` {surface: bank} | A reveal with a verdict, plus drill fuel |
| Right, missed before | `question_practiced` {…, correct: true} **+** `answer_correct` {surface: bank} | A recovery; counts toward retiring it from the drill |
| Right, never missed | `question_practiced` {…, correct: true} | Practice only; `answer_correct` keeps its documented meaning ("a recovery", not "any correct answer") |
| Reveal with no pick ("Show solution") | `question_practiced` {surface: bank}, as today | Unchanged |

### Rules, and why each exists
1. **The server grades; the browser only reports which option was tapped.** The drill already insists on this: a client-asserted verdict would let the browser retire its own questions (`src/lib/drill/query.ts:198`). The card's own green/red stays client-side and instant.
2. **First act only.** A verdict is recorded only if the pick is the student's first act on that question in this page session. If they opened "Show solution" first, the later pick is not an attempt. This reuses the beacon's existing once-per-session dedupe (`practiceBeacon.ts`), so collapsing and re-opening a card cannot record a second verdict.
3. **One ladder verdict per question per day.** `answer_wrong`/`answer_correct` from the bank carry a dedupe key `bank-answer:<userId>:<questionId>:<IST day>`. Without it, a reload followed by a correct re-pick of the answer just shown would put the question to sleep for 10 days.
4. **Graded only when gradable:** MCQ, PUBLIC, exactly one keyed option, not cancelled, and a label that exists on the question. Anything else gets the plain `question_practiced` row. A row with no key must never punish the student (the same rule as `gradeDrillAnswer`).
5. **Signed-in only, as today.** Anonymous picks are still not recorded (migration 0105's reason stands). Privacy already covers this: `/privacy` says we keep "what you practise" (`src/app/privacy/page.tsx:44-45`).
6. **No migration.** All three kinds already exist; the verdict goes in `metadata` (jsonb).
7. **Backward-compatible payload.** Old cached JavaScript still sends `{questionIds, surface}` during a deploy. The new optional `picks` field is ignored when absent.

### Changes
| File | Change |
|---|---|
| `src/lib/questions/practiceBatch.ts` | `parsePracticeBatch` accepts optional `picks: {[questionId]: "A"–"D"}`. Each pick id must be in `questionIds`; a bad label is dropped, not fatal |
| **new** `src/lib/questions/bankVerdict.ts` (pure) | `gradePicks(picks, keys)` → verdict per id, or null when not gradable. `bankAnswerEvents(verdicts, priorWrongIds, userId, istDay)` → the rows from the table above, with dedupe keys |
| `src/components/reveal/practiceBeacon.ts` | `recordPractice(id, signedIn, surface, chose?)`. The queue carries the optional label; the payload adds `picks` |
| `src/components/reveal/useRevealMeter.ts` | `attemptReveal(id, chose?)` passes the label through |
| `src/app/browse/QuestionCard.tsx` | `pickOption` passes `label` into `tryReveal`, only for gradable MCQs (not cancelled). `toggleSolution` passes nothing |
| `src/app/api/activity/practice/route.ts` | After parsing: if picks exist and surface is `bank`: (1) one read of keys for ≤50 ids through the user's client (PUBLIC rows are readable); (2) one read of prior `answer_wrong` for the correctly answered ids; (3) build rows with the pure core; (4) insert the `question_practiced` rows and upsert the ladder rows with `ignoreDuplicates` |
| `src/lib/activity/service.ts` | `logActivityBatchOnce` (the batch form of `logActivityOnce`) for the deduped ladder rows |
| `src/lib/activity/shape.ts` | Label "Mock question missed" → "Question missed" (it is no longer mock-only) |
| `src/lib/pmf/snapshot.ts` | `SURFACE_COVERAGE` bank entry: now records verdicts; update the "lost" text |
| `src/app/drill/page.tsx` | Empty state: "Take a mock test" plus "or answer questions in the bank". Bank misses now feed the drill |
| `src/lib/activity/events.ts` comments, `ENGAGEMENT_SPEC.md` B3, CLAUDE.md digest | B3 status → shipped (bank only); the `answer_wrong` comment no longer says "in a graded mock" only |

### Tests, written first
- `tests/practice-batch.test.ts` (extend): picks parsed; a pick id outside `questionIds` rejected; a bad label dropped; the old payload still parses.
- **new** `tests/bank-verdict.test.ts`: right/wrong grading; case-insensitive labels; no key, two keys, cancelled, numeric, unknown label → null; wrong → practiced + `answer_wrong`; right with a prior wrong → practiced + `answer_correct`; right and new → practiced only; dedupe key format and the IST day boundary (23:59 vs 00:01 IST).
- **new** `tests/practice-route-verdict.test.ts` (integration, **test Supabase project**, per your rule for API code): sign in a test user, POST picks for one known-right and one known-wrong question, assert the rows; re-POST the same day → no second ladder row; the old payload still writes plain rows. Fixtures cleaned in `afterAll`.

### Verification
- Gate: `npm run gate`, the full chain.
- Live chain: after deploy, a SQL read of `user_activity` for `surface = bank` with a `correct` field. That is the only proof the browser→route→DB path works; it needs a signed-in browser click from you (`/browse` is click-gated).
- **The data check that decides whether this stays as is (2026-10-16):** the bank wrong rate. Mocks show about 30% wrong when attempted. If the bank shows ≥70% wrong, students are tapping an option just to see the answer, and the verdicts are noise. The fix then is a visible "Show answer" button that records nothing, and I will bring that back to you.

### Commits
1. `feat(activity): grade bank picks server-side and record right or wrong`
2. `docs: bank verdicts shipped (ENGAGEMENT_SPEC B3, pmf coverage)`

### Not in this step (phase 2, your call later)
`/me/map` and `/performance` read mock attempts only (`get_own_performance`, migration 0099). Showing bank answers there means changing that RPC (a migration) and deciding whether an untimed bank answer counts the same as a timed mock answer. I'll bring a proposal after two weeks of data.

---

## 2. A1–A13

### A1. One definition of the question count
- **Now:** the homepage shows every PUBLIC question (NDA 14,024). `/nda`, `/exams/[slug]` and `/browse` show past-year only (NDA 5,130). The pills on `/browse` already use "the number the destination shows" (`src/lib/questions/browseLanding.ts:94`).
- **Change:** every single-exam count, everywhere, becomes the default-view count (`getDefaultViewCountsByExam`: past-year, or practice for a practice-only exam), labelled with its kind ("5,130 past-year questions" / "2,852 practice questions"). Totals show both kinds (D1). Surfaces: homepage hero + chip + exam cards, `/nda`, `/exams/[slug]`, `/about`, `/guide` picker, `llms.txt`.
- **Test first:** a pure `countLabel(count, kind)` and a `splitTotals(catalog)`; a test that the homepage card count for an exam equals the `/browse` pill count for it (the same function feeds both).
- **Verify:** Edge headless screenshots of `/`, `/nda`, `/exams/jee-mains`; for each, the number must match `/browse?examId=…`.
- **Commit:** `fix(home): one definition of the question count on every surface`

### A2. Pricing, signed out
- **Change:** "Sign in to buy" (`src/app/pricing/page.tsx:175-182`) → brand fill + `focus-visible` ring, like every other primary button.
- **Test:** none (styling; your TDD calibration skips UI chrome).
- **Verify:** Edge screenshot signed out; keyboard focus checked by a Tab press in your browser.
- **Commit:** `fix(pricing): brand fill and a focus ring on the signed-out buy button`

### A3. `/nda` leads with the student's job
- **Change** (`src/app/nda/page.tsx`): primary button "Sit a past NDA paper" → `/mock/exam/nda`; second "Practise in the bank"; "All ten guides" stays. "Build a paper" moves into the teacher banner at the bottom (it already exists there). Cut "Anonymous-friendly". Breadcrumb "Home" → `/`.
- **Test:** none (copy and links). A source test would only restate the JSX.
- **Verify:** Edge screenshot at 390 and 1440 px; curl `/nda` for the new hrefs.
- **Commit:** `feat(nda): lead the NDA home with sitting a paper`

### A4. `/me` opens with one next action
- **Now:** `/me` already has a "continue" hero (resume a mock → continue notes → welcome), but it sits below "Your exams" and the stage nudge, and the heading is "Your dashboard" plus the email.
- **Change:** the hero moves to the top and its order becomes: resume a mock → a teacher-assigned paper due within 48 h or overdue → **"N questions to fix"** (the drill) → continue notes → the next paper for the target exam. The due count comes from the pulse the header already fetches (it was too costly to compute on this page), so that step is a small client island that upgrades the server-chosen hero when `due > 0` and nothing above it applies. The heading becomes the exam and days left ("NDA 2027 (I) · 206 days, expected"). The email moves to `/account`. The card uses the brand fill.
- **Test first:** pure `pickNextAction({resume, assignments, due, notesRecent, nextMockHref})` in `src/lib/me/nextAction.ts`: every branch, the 48-hour boundary, and "an overdue assignment beats due drills".
- **Verify:** `/me` is auth-gated and dynamic, so no headless proof of render exists. Data: `npm run drill:smoke`-style read of the pulse for three real students. Render: your browser check, said plainly.
- **Commit:** `feat(me): lead the student home with one next action`

### A5. Show "fixed" as a number
- **Change:** a pure `ladderCounts(events, now)` → `{due, cooling, retired}` beside `dueQuestions` (same fold, so no second definition). The pulse returns `fixed` alongside `due`, from the same read, so no new query. `WeekStrip` shows "12 fixed · 5 to fix"; the drill end screen shows "Fixed so far: 12".
- **Test first:** `tests/drill-select.test.ts` (extend): counts for retired / cooling / due / never-missed, and a miss after retiring moves it back to due.
- **Verify:** pulse response for real students via a smoke read; render is your browser check.
- **Commit:** `feat(drill): show how many questions a student has fixed`

### A6. Notes page sideways scroll
- **Step 1, diagnose:** run `/notes/nda-maths/statistics/central-tendency` in Edge headless at 390 px and list every element whose right edge passes the viewport. The suspect is formula markup without `overflow-x-auto`.
- **Step 2, fix** the element's container.
- **Step 3, durable check (D4):** `npm run layout:overflow -- <paths>`: starts headless Edge with remote debugging, loads each path at 390×844, reports `document.documentElement.scrollWidth > 390` plus the widest offenders. Default list: one notes chapter per subject route, `/`, `/nda`, `/browse`, `/pricing`. Triage probe, exits 0, like the other probes. Pure core (offender ranking) tested; the browser driver is not.
- **Plus a source contract** if the cause is a pattern (for example "every display-math wrapper carries `overflow-x-auto`"), in the style of `tests/long-form-field-renderer-contract.test.ts`. That one does run in the gate.
- **Commits:** `fix(notes): stop the central-tendency page scrolling sideways on phones` · `feat(scripts): phone-width overflow probe`

### A7. Chat bubble, plus the theme toggle (U9)
- **Change:** below `sm`, the launcher is 44 px and slides away on scroll down, back on scroll up (`src/components/chat/ChatWidget.tsx`). Desktop unchanged. The theme toggle moves into the account menu below `sm` (it stays in the header on desktop; anon visitors get it in the menu sheet).
- **Test first:** pure `scrollVisibility(prevY, y, threshold)`. The rest is chrome.
- **Verify:** Edge screenshots at 390 px (top of page, after a scroll); the scroll behaviour is your phone check.
- **Commits:** `feat(chat): smaller launcher that hides while scrolling on phones` · `refactor(header): theme toggle into the menu on phones`

### A8. Homepage above the fold
- **Change** (`src/app/page.tsx`): drop the "PYQ Vault" eyebrow (it repeats the logo). Under the hero: one row of exam chips (NDA, JEE Mains, NEET, MHT-CET, CDS, MPSC, IPMAT, Boards → the family). A chip writes `qb_exam` on tap (a small client island using the existing `setExamCookie`), so `/browse` opens on that exam next time. Exam-card blurbs are cut to one line; the long text is already on each exam's own page.
- **Test first:** pure `homeChips(catalog)`: order, the boards family collapse, and no chip for an exam with zero questions.
- **Verify:** Edge screenshots at 390 px; measure where "Choose your exam" sits relative to the old ~1,500 px.
- **Commit:** `feat(home): exam chips above the fold, one-line exam cards`

### A9. The three-step loop on the homepage
- **Change:** render `<HowItWorks loop={loopFor(null)} />` (the same object `/start` uses, `src/components/HowItWorks.tsx`) between the chips and the exam cards, with "How it works →" to `/start`.
- **Test:** none new; the shared object is already tested by its own spec.
- **Verify:** Edge screenshot.
- **Commit:** `feat(home): show the three-step loop on the homepage`

### A10. Copy pass
Exact strings → replacements (simple English, one sentence):

| Where | Now | New |
|---|---|---|
| `src/app/nda/page.tsx:143` | "…built from the live past-year question bank. Free, no sign-up. Anonymous-friendly." | "Every NDA past paper since 2017, sorted by chapter. Free." |
| `src/app/mock/page.tsx:21,177`, `src/app/mock/exam/[examSlug]/page.tsx:118,187`, `src/app/start/page.tsx:54` | "served whole" | "the full paper, as it was set" |
| `src/app/mock/exam/[examSlug]/page.tsx:187` | "built to the exam blueprint" | "with the same number of questions per subject" |
| `src/app/notes/nda-maths/statistics/_data/central-tendency.ts:13` | "the entire EASY + MODERATE …" | "every easy and medium question …" |
| `src/app/guide/nda-maths/traps/page.tsx:182` | "EASY+MODERATE is ~56%" | "easy and medium questions are about 56%" |

Not changed: page `description` metadata (SEO text already indexed, phrased for search, not shown on the page) and `/about:138`, which uses "served whole" correctly in a sentence for adults.
- **Test:** `npm run notes:lint` + `notes:intro` cover the notes string; nothing else is testable.
- **Commit:** `fix(copy): plain words on the NDA, mock and notes pages`

### A11. Resume card at the top of `/mock`
- **Now:** `/mock` and `/mock/exam/[slug]` are cached (`revalidate = 3600`), so a per-student card cannot render on the server without un-caching them.
- **Change:** the pulse adds `resume: {slug, attemptId, title, minutesLeft} | null` from one cheap query (the student's single in-progress attempt, if not expired). A client island on the two `/mock` pages renders "Resume {title} — N min left" when present. The pages stay cached; anon visitors see nothing.
- **Test first:** pure `minutesLeft(expiresAt, now)` and `resumeFrom(attempts, now)`: an expired attempt is not offered (the hourly sweep grades it).
- **Verify:** curl the two pages still serve cached HTML (no `cookies()` added); render is your browser check.
- **Commit:** `feat(mock): resume an open attempt from the top of the mock pages`

### A12. Open the solution after a wrong pick on the bank
- **Change** (`QuestionCard.tsx`): when a pick is wrong and the question has a solution, open it at once. A right pick keeps the "Show solution" button. Client-only; no extra reveal is charged (the pick already spent it).
- **Test:** pure `shouldAutoOpenSolution({picked, isCorrect, hasSolution, cancelled})` in the card's helper module.
- **Verify:** a click is needed; your browser check.
- **Commit:** `feat(browse): open the solution after a wrong pick`

### A13. "Open" label invisible on touch
- **Change:** the homepage "What's inside" cards show their "Open →" always (`src/app/page.tsx`, `opacity-0 group-hover:opacity-100` removed).
- **Commit:** folded into A8's commit (the same file, the same pass).

---

## 3. Order of work

| Step | Items | Why this order |
|---|---|---|
| 1 | **Y1** | Your decision, and data starts counting only from deploy. Verdicts take two weeks to judge |
| 2 | A2, A13, A10, A3 | Small public fixes; quick and independent |
| 3 | A1 | Needs D1 |
| 4 | A8, A9 | The same file (`page.tsx`) after A1, so no conflict |
| 5 | A5, A4, A11 | All extend the pulse; A5 benefits from Y1's bank recoveries |
| 6 | A7, A12 | Phone chrome, then the card change |
| 7 | A6 | Needs the probe built first |

After each step: `npm run gate` (prepush). At the end: one full gate, Edge screenshots of every public page touched, and a list of the auth-gated or click-gated renders that only your browser can confirm.

**I merge to `main` with your usual flow (branch → merge --no-ff → delete) and do not push.** Pushing is yours.

---

## 4. Measurement, dated

| Date | Read | Decides |
|---|---|---|
| 2026-10-09 | `/browse` dead clicks, Clarity (M1) | Whether the bank card needs more work |
| 2026-10-16 | Bank wrong rate; drill completions by bank-only students; `fixed` counts | Whether Y1 stays as is, needs a "Show answer" button, or goes to phase 2 (map + performance) |
| 2026-10-16 | `/me` hero clicks by branch (resume / fix / next paper) via `surface_viewed` on the target pages | Whether A4's order is right |
| 2026-10-29 | MHT-CET chapter tests (M3) | The short-first-unit question (Y2) |

## 5. Not in this plan, on purpose
Everything marked DEFER, DECLINE or MEASURE in the triage, plus Y1 phase 2. Board picks (D3) unless you say yes.
