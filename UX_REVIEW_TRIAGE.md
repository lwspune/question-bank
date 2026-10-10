# UX review triage — every point, a decision, a reason

**Date:** 2026-10-02 · **Inputs:** four reviews —
**U** = `UX_REVIEW.md` · **B** = `PYQ_Vault_10_10_UX_Redesign_Brief.md` ·
**W** = `PYQ_Vault_UX_UI_Review.docx` · **D** = `deepseek_text_20261002_817e48.txt`.

**Verdicts:**
- **DO**: act. It is in the action plan (§2).
- **DONE**: already shipped. The file is cited.
- **WRONG**: the review's premise is false. The fact is cited.
- **MEASURE**: plausible, but get the named evidence first.
- **DEFER**: sound, not now. The trigger to revisit is named.
- **DECLINE**: not doing it, with the reason.
- **YOURS**: touches a decision you already made. The new evidence is shown and the call is yours.

---

## 1. Facts this triage rests on

Checked on 2026-10-02 against the code and the live database. The reviews had none of these.

| # | Fact | Source |
|---|---|---|
| F1 | 462 accounts; 254 signed up in the last 28 days | `auth.users` |
| F2 | **Last 7 days, signed-in users:** 103 active. **52 revealed 1,229 answers in the bank**, 19 revealed 199 in `/board`. **22 sat 30 mocks.** 12 opened `/drill`, 7 drills finished. 41 opened `/me`. **1 opened `/me/map`. 1 opened `/start`.** 1 weekly goal set. 1 email click | `user_activity` |
| F3 | Bank reveals record **no verdict**: the beacon sends question ids only (`correct` = 0 on every row) | `src/components/reveal/practiceBeacon.ts` |
| F4 | The question text on a `/browse` card **is already a full-width tap target**, and has been since 2026-06-09 | `src/app/browse/QuestionCard.tsx:251-262` |
| F5 | `/browse` is **already answer-first on the client**: tap an option and the card shows Correct / Your pick | `QuestionCard.tsx:395-414` |
| F6 | The reveal-wall fix (lock shown up front, 10 free reveals) reached `origin/main` about 01:30 IST on 2026-10-02. U's Clarity window (30 Sep – 2 Oct) is almost all **before** it | `git log origin/main` |
| F7 | NDA: **14,024 PUBLIC** (homepage counts every kind) vs **5,130 PYQ** (`/nda` and `/browse` count past-year only). The gap is 8,894 practice questions | `src/app/page.tsx:221` vs `src/lib/exam/examHomeStats.ts:35` |
| F8 | `/nda` leads with a brand-filled **"Build a paper"**, has **no link to mocks anywhere**, says "Anonymous-friendly", and its breadcrumb "Home" goes to `/browse` | `src/app/nda/page.tsx:125-171` |
| F9 | The mock path is `/mock` → exam → type → paper → Start. **Resume** exists only in `AttemptsList` (`/me`, `/mock/attempts`) | `src/app/mock/**` |
| F10 | Board: a section opens by default when it is alone or has sub-headers (since 2026-09-03). The **third level** (exercise blocks) is a closed `<details>` with a muted, uppercase label | `src/lib/board/query.ts:82`, `src/app/board/BoardReader.tsx:529-535` |
| F11 | Chat launcher: a 56 px circle, fixed bottom-right, on every page with AppHeader | `src/components/chat/ChatWidget.tsx:117,202` |
| F12 | Pricing: signed in, the buy button is brand indigo. **Signed out, "Sign in to buy" is black and has no `focus-visible` ring**, which breaches your accessibility rule | `src/app/pricing/page.tsx:131,175-182` |
| F13 | Drill: green/red option states, the solution shown on the same screen, a progress bar, 52 px option targets, a brand "Next question". **The count of retired ("fixed") questions is computed but never shown to the student** | `src/app/drill/DrillRunner.tsx`, `src/lib/drill/select.ts:32` |
| F14 | `/me/map`: chapter tiles, subtopic bands, accuracy % and a Practise link per subtopic | `src/app/me/map/page.tsx` |
| F15 | Signed-in students never see the homepage: `/` → `/dashboard` → `/me`. `/me`'s heading is "Your dashboard" plus the student's **email** | `src/app/page.tsx:192`, `src/app/dashboard/page.tsx:60`, `src/app/me/page.tsx` |
| F16 | Phone tabs are a fixed five (Bank · Guides · Notes · Mocks · Board), the same for every role, **by a measured rule**. The desktop **Fix** tab in ENGAGEMENT_SPEC §A2 is **not in `PrimaryNav`** | `src/lib/nav/mobileTabs.ts`, `src/components/PrimaryNav.tsx:44-80` |
| F17 | The per-question "% correct" chip on `/browse` is **staff-only on purpose**: telling a student "88% missed this" before they try it anchors them (ITEM_STATS.md decision 5). Students see peer rates only *after* a mock, on the findings card | `src/app/browse/ItemStats.tsx:8` |
| F18 | Dark mode exists (`ThemeToggle`, visible to everyone). Difficulty is on every card. Keyword search exists (`q` filter). Empty state with "Clear filters" exists | `src/components/ThemeToggle.tsx`, `src/app/browse/page.tsx:452-461` |
| F19 | Only 2 `loading.tsx` files exist (`/browse`, `/dashboard`). Most public pages are cached, so they arrive whole | `find src/app -name loading.tsx` |
| F20 | Already decided: no daily streaks (median gap between visits is 2 days); no leaderboards, XP or coins; short sittings as the default first unit **declined** (2026-09-24); answer-first bank verdicts (spec B3) **parked** (2026-09-24); V stays chip-only until usage justifies an LLM; one ₹99 pass for students and teachers (2026-10-01) | ENGAGEMENT_SPEC.md, CLAUDE.md |

**The finding that reframes all four reviews (F2 + F3):** the bank is where students practise. In the last week it had 52 students and 1,229 answers, against 22 students and 30 mocks. Yet the bank is the one surface that records no right or wrong. Every progress feature the reviews ask for (rings, "questions solved", accuracy, mastery) is computed from mocks, the surface students now use least. See **Y1**.

---

## 2. Action plan

Ordered by evidence × reach ÷ cost. Each item names the review points it answers.

### Do now (small, evidence-backed)

| # | Action | Answers | Why | Size |
|---|---|---|---|---|
| A1 | **One definition of the question count.** Say "5,130 past-year questions" wherever a count is past-year only, or count past-year only everywhere. Recommended: past-year only on the homepage and the exam cards, because the product is PYQ-first and practice rows are a different thing | U4, U-evidence | F7. The gap is 2.7×, and a student who sees both trusts neither | S |
| A2 | **Pricing, signed out:** "Sign in to buy" in brand fill **plus a focus ring** | U15 | F12. The focus ring is an accessibility-rule breach, so this is a bug, not taste | S |
| A3 | **`/nda` leads with the student job.** Primary: "Sit a past NDA paper" (to `/mock/exam/nda`). Second: the bank. "Build a paper" moves to the teacher banner at the bottom. Cut "Anonymous-friendly". Breadcrumb "Home" goes to `/` | U2, U5, U11 | F8. NDA is the biggest exam and its home has no mock link at all | S |
| A4 | **`/me` opens with ONE next action**, a brand-filled card that picks the first that applies: resume an open mock → a teacher-assigned paper due → "N questions to fix" → the next unsat paper for the target exam. Replace the email in the heading with the exam and days left | U13, U12 (brand fill), B4 logged-in, B5, B13, B P0-1/2, D4-"recommended" | F15 + F2: `/me` is the one student surface with traffic (41 of 103). Every input already exists (`resumeAttempt`, `listMyAssignments`, the pulse `due`, `firstMockHref`). No new engine needed | M |
| A5 | **Show "fixed" as a number** on `/me` and the drill end screen: "12 fixed · 5 waiting" | B8, B19 | F13. Metacognition principle. The ladder already computes `retired`; only the display is missing | S |
| A6 | **Notes page sideways scroll**: find the element, fix it, add a phone-width overflow check | U7 | A plain bug, measured at 427 px on 390 px | S–M |
| A7 | **Chat launcher smaller on phones** (56 → 44 px) and hidden while scrolling down | U8 | F11. It covers content on every page. Check V's chip usage at `/dashboard/chat` in the same pass; if near zero, hide it on phones entirely | S |
| A8 | **Homepage, above the fold:** remove the "PYQ Vault" eyebrow (it repeats the logo); put a compact row of exam chips first; shorten the exam blurbs to one line, with the long text on each exam's page | U1 (chips, move descriptions), U11 | 115 of 211 sessions are mobile and the cards run to about 1,500 px. The chips use links that already exist | S |
| A9 | **Put the three-step loop on the homepage** by rendering the same `HowItWorks` object `/start` uses | U10 (second half), U-keep | F2: `/start` had 1 viewer in a week. It is the product's story and nobody reads it. Reusing the same object means it cannot drift | S |
| A10 | **Copy pass**, exact strings: "Anonymous-friendly" (`/nda`), "served whole" (`/mock`, `/mock/exam`, `/about`, `/start`), "built to the same blueprint" (`/mock/exam`), "EASY + MODERATE" (`/guide/nda-maths/traps`, notes Statistics) | U11 | Each one is staff vocabulary on a student page | S |
| A11 | **"Resume — N min left"** card at the top of `/mock` when an attempt is open | U5 (second half) | F9. Resume is buried in lists; an open attempt is the highest-intent state a student has | S |
| A12 | **On `/browse`, open the solution automatically after a WRONG pick** (client only, no server write) | U14, B7, W-microfeedback | Immediate-feedback principle. Saves a tap for the student who most needs the explanation; 1,229 reveals a week sit on this flow | S |
| A13 | **Homepage "What's inside" cards:** the "Open" label is `opacity-0` until hover, so it is invisible on touch. Show it always or drop it | (found while checking U10) | Mobile-first audience; a hover-only affordance does not exist on phones | S |

### Measure first (named evidence, named date)

| # | What | Answers | Evidence and date |
|---|---|---|---|
| M1 | Re-read `/browse` dead clicks for 2026-10-03 → 10-09 (a clean week after F6). If they stay high, watch 5 recordings to see **what** is tapped | U3, U-evidence | U's cause is **wrong** (F4: the stem already expands). The likely cause was the reveal wall (F6), now fixed |
| M2 | Watch 5 Clarity recordings of `/board/.../vectors` | U6 | F10: sections usually open already; the third-level labels look like plain text. If the recordings show taps on those labels, restyle them as tappable rows (a DO of size S) |
| M3 | Read the MHT-CET chapter-test result on 2026-10-29 | U1 ("10-question check"), B9 (mission size), D1 (hero drill) | It is your live experiment on a short first unit. Do not pre-empt it |
| M4 | Read V chip usage at `/dashboard/chat` | B16-18, A7 | It decides whether V earns screen space, let alone an LLM |
| M5 | Check whether the desktop **Fix** tab (ENGAGEMENT_SPEC §A2) was dropped on purpose or never built | B11, U13 | F16. Specced and absent; worth knowing which |

### Your call (touches an earlier decision; new evidence)

| # | Decision | New evidence | What it unlocks |
|---|---|---|---|
| **Y1** | **Record right/wrong on bank picks** (spec B3, parked 2026-09-24 as "too much hassle for the return; revisit if the drill runs dry of mock misses") | F2: mocks fell to 30 a week from 22 students; the bank had 1,229 answers from 52. The drill's only fuel is mock misses. The reviews' case is different from the parking reason: it is about **progress for the surface students actually use** | U12 rings, B6 mastery map on real data, B19 "questions solved", W "42/120 solved" rings, D2 "after 3–5 questions answered", and drill fuel. Without Y1, none of those can be honest for bank users. **I am not re-proposing it; I am flagging that the condition you set may be close.** |
| Y2 | A short first unit on the homepage ("10-question check, no sign-up") | Declined 2026-09-24; the chapter-test experiment is running | Wait for M3 |

---

## 3. Point-by-point: `UX_REVIEW.md` (U)

### Header and scorecard

| Point | Verdict | Reason |
|---|---|---|
| Overall 6/10 | DECLINE (as a number) | Scores across the four reviews run 6 to 7.8 on no common scale; none drives a decision. The reasons behind them are triaged below |
| "Not covered: signed-in screens" | Noted | That gap is why U13 misses that `/me` exists (F15) |
| Constraint: no streaks, leaderboards, hearts, badges | Agree | Matches F20 |
| Content depth 9 | Agree | No action |
| Visual polish 7: "every surface the same grey card" | DO (partly) | Covered by A4 (one brand-filled action card on `/me`) and A3. Not a site-wide recolour; see U12 |
| Mobile 6: chat bubble, sideways scroll | DO | A6, A7 |
| Clarity of value 5: "sells a library, not an outcome" | Partly agree | The subtitle already names the outcome ("drill the thing you keep getting wrong"). A9 shows the loop instead of rewriting the headline; see D1 for why not rewrite |
| Time to first question 4 | Partly | For a mock, 5 taps (F9). For the bank, the homepage button lands on questions in 1 tap. A11 and A3 cut the mock path |
| Habit loop 4: `/start` is hidden | Agree | F2 (1 viewer). A9 |

### Evidence table

| Point | Verdict | Reason |
|---|---|---|
| 96 dead clicks on `/browse` | MEASURE (M1) | The window predates the reveal-wall fix (F6) |
| 9 rage + 26 dead clicks on a board page | MEASURE (M2) | One page, 3 days; recordings before redesign, as U itself says |
| 1.4 quick backs per session | No action | No page named, so nothing to act on. Re-read per page after A3/A8 |
| 5 taps from Mocks to a first question | DO (partly) | A11 (resume) and A3 (mock link on `/nda`). Skipping the instructions page: DECLINE, because it carries the marking scheme, which students need before a negatively marked paper |
| 14,024 vs 5,130 | DO | A1 (F7 confirms the cause) |
| 427 px on a 390 px phone | DO | A6 |

### Suggestions

| # | Point | Verdict | Reason |
|---|---|---|---|
| U1a | Exam chips first | DO | A8 |
| U1b | One button: "Start a 10-question NDA check, no sign-up" | YOURS (Y2) / MEASURE (M3) | Close to the declined short-sittings item; the chapter-test experiment answers it on 10-29 |
| U1c | The result names weak chapters; the sign-up ask goes there | DEFER (with U1b) | The right placement principle ([[signup-gate-placement]]), but it depends on U1b. Note: the public `/quiz/[slug]` funnel already does "short quiz → gate at the reward" for its 4 public quizzes |
| U1d | Remember the picked exam in `qb_exam` | DO (with A8) | Today only `/welcome` and `/account` write the cookie. A homepage chip that writes it means `/browse` opens on that exam next time |
| U1e | Move the long descriptions to each exam's page | DO | A8 |
| U2a | `/browse`'s main button is "Download · 85533" | DECLINE (premise outdated) | Since 2026-10-01 the ₹99 pass sells downloads **to students**, and 44 of 52 teacher-access requests came from students. Download is a student revenue button |
| U2b | `/nda` leads with "Build a paper" | DO | A3 |
| U2c | "+" add-to-paper on every card | DECLINE | Building a paper and downloading it is the pass product students buy; the "+" is how they do it. It is icon-only on phones already |
| U2d | Practice as the student's main action; a teacher mode switch | DECLINE (the switch) | On `/browse`, practice already *is* the card (F5). A mode switch adds a state every page must respect, for ~10 staff |
| U3a | Make the question text the tap target | WRONG | F4: it has been, since 2026-06-09 |
| U3b | Show the Playbook / Concept-notes chips once per page | DECLINE | They are per question **by design**: a tag-level chip overrides the chapter chip per question (CLAUDE.md cross-link design axis). Once per page would drop the specific links |
| U3c | Drop the truncated breadcrumb on each card | DECLINE (mostly) | With no exam filter, the breadcrumb is the only place a card says which exam and chapter it is from. Keep it; maybe hide only when a chapter filter makes it redundant (S, low value) |
| U4 | Make the counts agree | DO | A1 |
| U5a | "Start the latest NDA paper" card on `/mock` and exam pages | DO (on `/nda`), DEFER (elsewhere) | A3 for `/nda`. `/exams/[slug]` already links "Sit a paper as a timed mock". "Latest" is not always the best first paper (NDA's latest is 150 questions); A4 picks per student |
| U5b | "Resume — 23 minutes left" | DO | A11 |
| U6a | Open the first board section by default | DONE (mostly) | F10, since 2026-09-03 |
| U6b | Make second-level rows look tappable | MEASURE → DO | M2. Cheap if the recordings confirm |
| U6c | Confirm with recordings | Agree | M2 |
| U7a | Fix the sideways scroll | DO | A6 |
| U7b | Phone-width overflow check in smoke tests | DO | A6. New work, so it becomes an automatic check (your learnings rule) |
| U8 | Tame the chat bubble | DO | A7 |
| U9 | Move the theme toggle into the menu on phones | DO (small) | The header at 360 px holds logo, toggle and Sign in. Keep it visible on desktop. Bundle with A7 |
| U10a | Replace "What's inside" with a real result card or map as a picture | DEFER | Needs a designed image that stays true to the product; do it after A9 shows whether the loop text moves anything |
| U10b | The three `/start` steps on the homepage | DO | A9 |
| U11a | Cut the jargon | DO | A10, with exact locations |
| U11b | Drop the "PYQ VAULT" label above the logo | DO | A8 |
| U11c | One-sentence intros a 16-year-old would say | DO (as a rule for A10) | Matches your "simple English" preference |
| U12a | Brand fill on action cards | DO (on A4 and A3 only) | Your brand rule is **selective**: brand on primary CTAs. Applying it to one action card per page follows the rule; applying it to all cards breaks it |
| U12b | Each exam its own accent colour | DECLINE | 18 exams means 18 colours, and the non-indigo palette is reserved for content meaning on `/notes` and `/guide` (CLAUDE.md colour rule). Names and icons already tell exams apart |
| U12c | A progress ring on chapters a student has touched | YOURS (Y1) | For mock users it exists as `/me/map` (F14). For bank users it needs Y1 |
| U13 | A "Your NDA" homepage for signed-in students | DO (as `/me`) | A4. Signed-in students never see `/` (F15), so the right place is `/me` |
| U14a | Quick colour change on answer | DONE | F5 (bank) and F13 (drill) |
| U14b | `navigator.vibrate` | DECLINE | Not supported on iPhone Safari, and a vibration on a wrong answer reads as punishment |
| U14c | Explanation slides in on the same screen | DO (bank, wrong pick) / DONE (drill) | A12 / F13 |
| U14d | Celebrate only real milestones (a subtopic reaching mastery) | DEFER | Right rule. The spec already describes "Trigonometry moved from weak to mid" on the drill end screen. With 7 drills finished a week it would fire for almost no one; revisit when drill completions grow |
| U15a | Buy button in brand colour | DO (signed out) / DONE (signed in) | A2, F12 |
| U15b | Free and Pass side by side | DEFER | One centred card plus a "free" line is clear. 4 signed-in pricing views a week (F2). Revisit with Vercel's anon pricing views |
| U15c | Live proof ("N mocks sat this week") | DECLINE | The true number is 30 (F2). Small true numbers are anti-proof, and you never show invented ones |

### Keep list and measurement table

| Point | Verdict | Reason |
|---|---|---|
| Keep: bottom tab bar, serif/sans split, `/questions` pages, honest copy, `/start` loop | Agree | No action, except `/start` → A9 |
| Measure each change in Clarity and `user_activity` two weeks after | Agree, with two fixes | (1) U's "7-day return about 33%" is stale; the weekly-cohort figure fell 36% → 13% (ENGAGEMENT_SPEC first read). Use per-cohort. (2) Signed-in counts come from the `surface_viewed` heartbeat (since 2026-09-27); anon from Clarity. Don't compare across them |

---

## 4. Point-by-point: the 10/10 Redesign Brief (B)

| § | Point | Verdict | Reason |
|---|---|---|---|
| 1 | Score 7.8 | DECLINE (as a number) | Same as U |
| 1 | Assets listed, including "future AI tutor capability through V" | WRONG (V) | V is a chip-only FAQ with no LLM, by your decision (F20) |
| 1 | Mental model "repository" → "preparation engine" | Agree (direction) | The engine exists (drill, map, nudges, peer rates). What is missing is reach: F2 shows `/me/map` at 1 viewer |
| 1 | "What should I do next?" | DO | A4 |
| 2 | Loop: Diagnosis → Recommendation → Action → Feedback → Adaptation | DONE (as a loop) | Mock → findings card → drill → map is that loop. Its failure is usage, not design (F2) |
| 3 P1 | Always one clear primary CTA; avoid many equal options | DO | A3, A4, A8 |
| 3 P2 | Personalisation over navigation | DO (A4) / DECLINE (as a rebuild) | A4 personalises the one surface with traffic. A personalised homepage for anon has no data to personalise from |
| 3 P2 | Signals list (weight, accuracy, time available…) | Partly | "Time available" is not collected and asking adds a form. The rest exists |
| 3 P3 | Practice should feel like an app: Q → A → Feedback → Next | DONE (drill) / partly (bank) | F13; F5 + A12 for the bank. Full verdict recording is Y1 |
| 3 P4 | Reward learning, not activity; no coins/XP/leaderboards | Agree | F20 |
| 4 | Hero "Prepare smarter with real exam questions" | DECLINE | Generic; "smarter" says nothing. The current headline is specific. At ~70 sessions a day a copy A/B test cannot reach significance, so a swap would be a guess |
| 4 | Supporting line "PYQs → practice → fix mistakes → repeat" | DO (as A9) | A9 shows the same loop from the shared object |
| 4 | Primary CTA "Choose your exam" with exam options | DO | A8 |
| 4 | Logged-in greeting "Good afternoon, Arjun" | DECLINE | No learning value. A4 replaces the email heading with the exam and days left |
| 4 | Logged-in progress: questions solved, accuracy, mistakes fixed | DO (fixed) / YOURS (solved) | A5 shows "fixed". "Questions solved" across the bank needs Y1; mock accuracy exists on `/performance` |
| 4 | "Your next step: Probability · 6 mistakes · high importance · 51%" | DO | A4. Exam weight is available only where a trends grid exists (NDA, MHT-CET, CDS, JEE); show it there, omit it elsewhere |
| 4 | Secondary recommendations (3 items) | DECLINE | Three options defeats P1. One action, plus the existing links |
| 5 | A dedicated cockpit page | DONE | `/me` (F15) |
| 5 | Header progress bar "78%" for the exam | DECLINE | No honest definition of "78% prepared" exists. Coverage of 14,024 questions would read near 0% and demoralise |
| 5 | Today's mission: 15 questions / 20 min | DECLINE (size) | The daily set exists as a 5-question fill of `/drill` (spec B2). 7 drills finished last week; size is not the bottleneck. M3 informs it |
| 5 | Weak-areas table with 🔴🟡🟢 | DONE (as `/me/map`) / DECLINE (emoji) | F14; your convention bans emoji for UI |
| 5 | Recent activity incl. time spent | DECLINE | Time spent is not a learning measure and rewards dawdling (activity, not learning: P4) |
| 6 | Mastery map with % bars per chapter | DONE | F14 (bands + accuracy). Usage: 1 viewer (F2), so the fix is reach (A4 links it), not redesign |
| 6 | Drill-down: attempted, accuracy, mistakes, recurring, importance, weak subtopics, "Fix" CTA | DONE (mostly) | Map tiles carry subtopic accuracy and Practise links. "Importance" per chapter: DEFER until the map has users |
| 7 | Top bar "NDA Maths · Probability · Q 7/20" + progress bar | DONE | Drill progress bar (F13); mock palette |
| 7 | Large typography, large tap targets | DONE | Drill options are 52 px; serif question text |
| 7 | After correct: short explanation, "Next", "Explain further" | DONE / DECLINE | Drill shows the solution and Next. "Explain further" needs V+LLM (M4) |
| 7 | After incorrect: your answer, correct answer, explanation | DONE | F13 |
| 7 | "This is a recurring weak area for you" | DEFER | Needs a per-subtopic miss history at answer time. Cheap later; low reach today (7 drills a week) |
| 7 | "Practice 5 more like this" | DEFER | The "more like it" half is deferred in spec B2; the fill already serves unseen questions from the weakest subtopics |
| 7 | "Ask V" | DECLINE (now) | M4 |
| 8 | Persistent Mistakes area with a count | DONE | `/drill` + the avatar badge + `/me` count (spec A2) |
| 8 | Sections: recent / recurring / weak concepts / fixed | DECLINE (as a page) | The drill is the list in action; a browsable list of mistakes is re-exposure, not retrieval practice |
| 8 | "Fix 5 now" | DONE | The drill serves 5 |
| 8 | Mark ✓ Fixed; the count visibly decreases | DO (A5) / DONE (decrease) | The due count falls already; the fixed count is A5 |
| 9 | Daily mission + "Mission complete" screen + "Tomorrow's mission" | DONE (set + end screen) / DECLINE ("tomorrow") | Median gap between visits is 2 days; "tomorrow" frames every skipped day as a failure |
| 10 | Lightweight "6-day practice streak" | DECLINE | F20 and the 2-day median gap |
| 10 | "Mastery streak: 4 topics mastered this month" | DEFER | Not a streak; a real-learning count, so it passes the gate. Needs band history (bands are computed live). After A5 |
| 11 | Nav: Home · Practice · Mocks · Learn · Search | DECLINE | The phone bar is a measured fixed five, the same for every role (F16). A "Fix" tab would show anon visitors a login wall. Renaming Bank → Practice also renames it for teachers, who use it to build papers |
| 11 | Practice submenu: PYQs, weak topics, mistakes, saved | DONE (spread) | `/browse`, `/me/map`, `/drill`, `/saved` |
| 11 | Mocks submenu: full papers, custom tests, previous attempts | DONE / DEFER | Full papers + `/mock/attempts` exist. Custom tests = M3 |
| 12 | Natural-language search ("questions I got wrong", "matrices from 2024") | DECLINE | Keyword search and filters exist (F18). Parsing intent needs an LLM or a grammar, and no data shows students searching. Revisit only if Clarity shows filter struggle |
| 13 | "What should I study today?" 30-minute plan | DECLINE (as a planner) / DO (A4) | A4 is the one-action version. A multi-step plan is a heavier commitment than the weekly goal, which 1 student has set (F2) |
| 14 | Frame guides as "Exam Intelligence" with weight % | DONE (content) / DECLINE (rename) | 17 guides with trend grids exist. A rename has no evidence behind it, and "Intelligence" over-claims |
| 15 | Exam-specific prep hubs | DONE | `/nda` + `/exams/[slug]`; A3 fixes `/nda`'s lead |
| 15 | "AI: Ask V, explain a question, teach me" | DECLINE (now) | M4 |
| 16 | "V noticed something" proactive prompt | DECLINE (now) | M4. Also a risk: some keys are derived, not official; a tutor explaining a wrong key confidently is worse than none |
| 16 | V inside question | DECLINE (now) | Same |
| 17 | V as the intelligence layer | DECLINE (now) | Same; also a cost line with no revenue line yet |
| 18 | Question → Concept → Practice loop | DONE (non-AI) | Cards link chapter and subtopic notes; notes have drills and checkpoints. The AI step is M4 |
| 19 | "Your NDA Journey" stats screen | DO (A5) / DEFER (rest) | Solved/topics needs Y1 |
| 19 | "Accuracy +17% this month" | DECLINE | Accuracy across different papers is not comparable and the samples are small; it would show false trends both ways |
| 20 | Set exam + date | DONE | `EXAM_CALENDAR` + `exam_date` override (spec C3) |
| 20 | 90-day phased plan; a 45-minute mission each day | DECLINE | Same reason as §13. Revisit if the weekly goal gets real use |
| 21 | Mobile priorities and requirements (large targets, fixed CTA, minimal filters, fast transitions) | DONE (mostly) | The drill meets them. `/browse` filters live in a sheet on phones |
| 22 | Empty states: "Clear filters" | DONE | F18 |
| 22 | "You've mastered this topic → next weak topic" | DEFER | With U14d |
| 23 | Don't over-gamify | Agree | F20 |
| 24 | Visual direction: IA before cosmetics | Agree | That is why the action plan has no restyle |
| 25 | P0–P3 roadmap | DECLINE (as ordering) | Its P0 (cockpit, engine, mistake loop) is built (F13–F15). The evidence-based order is §2 |
| 26 | Target scores per stage | DECLINE | Not measurable |
| 27–29 | Positioning: "a system that understands what a student should do next" | Agree (inside the product) / DECLINE (as copy) | A4 is the concrete form. Saying "intelligent engine" in public copy over-claims what students see today |
| 30 | Seven-question implementation rule | DECLINE (as a new rule) | Your engagement gate already covers questions 1–5. "Product, not a content website" (Q7) is not testable, and the public content site is your SEO engine |
| North star | Don't optimise for discovery; optimise for next actions | Agree, with a caveat | Discovery is how anon visitors arrive (`/questions`, SEO), and anon is most of the traffic. Next actions matter for signed-in students. Both |

---

## 5. Point-by-point: the Word review (W)

| Point | Verdict | Reason |
|---|---|---|
| Score 7.2 | DECLINE (as a number) | Same as U |
| Works: clear value proposition, no fluff | Agree | No action |
| Works: dense, well-categorised exam grid | Partly | Dense on desktop; long on phones → A8 |
| Works: teacher Word downloads with separate key | Agree, updated | Since 2026-10-01 students buy the same pass |
| Friction: "static, passive, like a database directory" | Partly | True of the anon homepage; false of the bank card (F5) and the drill (F13). The review saw only the homepage |
| Friction: no streaks, difficulty meters or confidence flags | WRONG / DECLINE | Difficulty is on every card (F18); streaks are declined (F20); flags, see below |
| Friction: tags, counts and descriptions share similar weights | Partly | Name is semibold, count is xs muted, blurb is serif muted. The real problem is length → A8 |
| Dark mode, `#0F172A` | DONE | F18. The palette is token-based; no new hex |
| Accent colours per stream (violet, cyan, emerald) | DECLINE | Same as U12b: those exact hues are content semantics on `/notes` |
| Hover scale 1.02, border glows | DECLINE | 115 of 211 sessions are on phones, where hover does not exist |
| Skeleton shimmers | DEFER | Most pages are cached and arrive whole (F19). Add only where a dynamic page is measurably slow; `/me` is the candidate after A4 |
| Sticky pill filter bar, Exam → … → Year, live counts | DONE (mostly) | The desktop filter column is `sticky`, options carry facet counts, and active filters show as removable chips (`ActiveFilterChips`); phones use a sheet |
| "TikTok for PYQs" | DECLINE | An infinite feed is engagement without a stopping point; it fails your gate (no mastery gate, no end) |
| Instant full-screen drill mode | DONE | `/drill` |
| Haptic pulse on answer | DECLINE | U14b |
| Micro-confetti on streak milestones | DECLINE | No streaks (F20) |
| Solution accordion: Formula / Concept / Trap tabs | DECLINE | Solutions are one prose field across ~85k rows; splitting means re-authoring them. Formulas and traps already live in `/notes`, one chip away from the card |
| Daily streak widget + GitHub heatmap in the header | DECLINE | A heatmap is a streak with a picture: blank days shout. 2-day median gap |
| Chapter mastery rings "42/120 solved, 35%" | DONE (bands, mock users) / YOURS (Y1) | F14; bank needs Y1. Note "35% mastered" from "42 solved" conflates coverage with mastery; the map deliberately uses accuracy bands |
| Confidence flags: Mastered / Tricky / Needs review | DECLINE | Self-rating is weaker evidence than an answer; the drill ladder rates from real answers. Bookmarks (`/saved`) already cover "come back to this" |
| Drag-and-drop paper canvas with live preview | DEFER | The editor has sections, target counts, reorder and move (`PaperEditor.tsx`). The Teacher Pass sold 0 and is retired. Trigger: an institute asks |
| Auto-balance difficulty (30/50/20) | DEFER | Same trigger. Note the difficulty tags skew MODERATE on several exams (JEE is all MODERATE), so a ratio control would mislead there |
| Custom institute branding / watermark | DEFER | Institute downloads are deliberately unbranded so they can print on their own letterhead. Pass downloads carry the PYQ Vault watermark (2026-10-01). Trigger: an institute asks for its logo |
| Summary table, "Teacher tooling: static file download links" | WRONG | A collaborative paper builder with batches and per-batch no-repeat warnings exists |
| Summary table, "Progress: passive browsing without tracking" | WRONG (signed in) | `/me`, `/me/map`, `/performance`, `/drill` |

---

## 6. Point-by-point: DeepSeek (D)

| Point | Verdict | Reason |
|---|---|---|
| Rating 6.5; "Date: [Insert Date]" | DECLINE (as a number) | A template left unfilled; built from the homepage alone |
| Works: clear value prop, numbers, free browsing, teacher hook, clean look | Agree | One update: anon visitors get 10 free answer reveals, then a sign-in (2026-10-01) |
| Gap: text-heavy, tells but doesn't show | Agree | A9 now; U10a deferred |
| Gap: passive discovery | Partly | A8 |
| Gap: no social proof or gamification | DECLINE (fix) | True, and deliberate: honest numbers are small (F2), gamification fails the gate |
| Gap: "vault" metaphor under-used | DECLINE | A theme is cosmetic; it changes no student behaviour your data points at |
| S1 interactive demo hero: headline "See what you're missing. Master every question." | DECLINE | "Master every question" over-promises; same A/B limit as B§4 |
| S1 sample question with tags + "Reveal answer" | DONE (one tap away) | That is a `/browse` card (F5). Embedding one in the hero duplicates it; the hero's job is to route (A8) |
| S1 "Want to drill 500 more like this? Pick your exam" | DECLINE | "500 like this" is a made-up count unless computed; A8 routes to the exam |
| S2 guest progress "mastered 1 of 85,533" | DECLINE | False: one right answer is not mastery. Vanity count |
| S2 streak "1-day streak, come back tomorrow" | DECLINE | F20 |
| S2 one-click sign-up (Google/Apple) after 3–5 questions | DONE (Google) / DECLINE (Apple) | Google One Tap at the reveal wall shipped 2026-10-01, after 10 reveals. Apple needs a paid developer account and a second auth flow for a small iPhone share in this market; revisit if Clarity shows iOS sign-up drop-off |
| S3 quest board, exams as vaults | DECLINE | Cosmetic; see "vault" above |
| S3 "% of vault unlocked" rings | DECLINE | Coverage of 14,024 questions reads near 0% for months; a demotivator |
| S3 "12,000 students drilling JEE right now" | DECLINE (firmly) | Invented. You have 462 accounts (F1). Invented user counts break trust and are a consumer-law risk |
| S3 "Most active vault this week" / trending | DECLINE | True numbers are small (30 mocks a week); a near-empty "trending" undercuts the product |
| S3 "Recommended for you" | DO (as A4) | For signed-in students only; anon has no data |
| S3 "Most popular starting points" | DEFER | Could be honest from Vercel page views. Low value next to A8 |
| S4 carousel of recently answered questions | DECLINE | It shows other people's activity, not the student's next step |
| S4 "Solved by 8,200 students" / "65% got this wrong" | DECLINE | The first is invented. The second is deliberately not shown before an attempt: it anchors the student (F17). Students already get it after a mock, on the findings card |
| S5 "Paper Builder Studio" tagline, mockup, smart generation | DEFER | Same trigger as W (an institute asks). "Two clicks" is concrete; "Studio" is vaguer |
| S6 hover animations | DECLINE | Phones have no hover |
| S6 skeleton loaders | DEFER | W, F19 |
| S6 feedback animation / colour | DONE | F5, F13 |
| S6 sound on feedback | DECLINE | Students study in classrooms, libraries and at home at night |
| S6 dark mode | DONE | F18 |
| Final take: active, rewarded engagement fast | Agree (direction) | A4, A12, Y1 |

---

## 7. What all four agree on, and what that means

| Agreement | Status | Read |
|---|---|---|
| Lead with one next action | Not done → **A4, A3, A8** | Strongest signal; cheapest to act on with data already in hand |
| Practice should be answer → feedback → next | Done in drill and bank (client); verdict not recorded → **Y1** | The real gap is recording, not UI |
| Show progress | Built (`/me/map`) but seen by 1 student (F2) | Reach, not more features: A4 links to it |
| Gamify (streaks, heatmaps, confetti) | Declined (F20) | Three of four suggest it. None had your visit-gap data |
| Social proof | Declined | One review invents numbers; true numbers are too small to help yet |
| AI tutor | Declined for now | No usage evidence (M4) and a wrong-key risk |

**Backfill note (your learnings rule):** none of the actions above rework shipped work to apply a *new* learning. A1–A13 are fixes or new work. Y1 is a parked decision, presented for your call, not acted on.
