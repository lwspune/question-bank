# Student education — spec (2026-09-24)

What this document is: the plan for making students aware of what PYQ Vault
does, written after the owner spoke to students who did not know the features
existed, and after measuring which features the cohort actually uses. It is
the source of truth for this work. The engagement principles gate in CLAUDE.md
applies to every item here: teaching a feature is itself a mechanic, and a
tour that interrupts a stressed student to sell a feature they have no reason
to want yet fails the gate the same way a streak does.

## 1. The diagnosis

The activity log covers signed-in students only. Reading notes and guides
while anonymous leaves no row, so every number below is a FLOOR for reading
and an accurate count for doing.

| Feature (379 student accounts, 2026-09-24) | Students who ever used it |
|---|---|
| Sat a mock | 193 |
| Saved a question | 51 |
| Revealed an answer on /browse or /board | 40 |
| Completed a notes checkpoint or marked mastery | 27 |
| Finished a drill (Fix your mistakes) | 2 |
| Took a public quiz while signed in | 0 |
| Used a mock and nothing else | 149 |
| Used three or more features | 13 |

To most students the product is a mock-test site. Three quarters of
mock-takers never touched anything else. The drill, the performance page, the
mastery map, the weekly goal and the exam date are invisible in practice.

Why they do not find the features, from reading the surfaces:

- **The nav names content, not actions.** Bank, Guides, Notes, Mocks, Board.
  Every ACTION feature (Fix your mistakes, Your performance, the map, Saved,
  the dashboard) lives behind the avatar letter in a popover.
- **The one screen every student sees says nothing.** `/welcome` reaches 359
  of 383 profiles and asks two questions. It never says what the product does.
- **The result page introduces the drill without explaining it.** The lead
  button reads "Fix these mistakes". A student who has never seen a drill does
  not know it means five spaced questions rather than the same paper again.
- **Email has barely been used.** 38 sends ever, three kinds, all about mocks.
  No email has ever described a feature.
- **Nothing in the repo teaches the product.** No help, FAQ, how-it-works or
  start page. The blog has two paper analyses.
- **Teachers are the real channel and have nothing to hand out.**

## 2. Principles

1. **Teach at the moment of need, at the trigger surface, once.** The
   engagement engine fires celebrations at the result page, not a dashboard.
   Education follows the same rule.
2. **No tours, no overlays, no tooltips-on-everything.** Phone-first cohort,
   short sessions. A tour needs a dependency the stack does not have and
   teaches features the student has no reason to want yet.
3. **One text, many surfaces.** The three-step loop is written ONCE
   (`src/lib/education/howItWorks.ts`) and rendered by the start page, the
   welcome step and the email, so the copy cannot disagree across surfaces.
4. **Content-led, never absence-led.** The welcome email says what exists and
   where to tap. It never says "you haven't tried X".
5. **Honest to the exam.** A board-exam student (Class 12, SSC) has no mocks.
   Their loop is the book reader, attempt-first reveal, and saving. The
   helper picks the loop from the registry flags, never from prose.

## 3. The loop, as written

Two loops, chosen by the student's primary exam (registry `hasMocks` first,
then `boardExam`, then practice-only / no exam falls to the general mock
loop only when the exam has mocks, otherwise to the bank loop).

**Mock loop** (NDA, CDS, NEET, MHT-CET, JEE Mains, IPMAT Indore):

1. **Sit a real past paper.** Timed, auto-graded, the exact questions of one
   sitting. → `/mock/exam/<slug>`
2. **Fix what you missed.** Five of the questions you got wrong, with
   solutions. A question you get right goes quiet; one you miss comes back
   round. → `/drill`
3. **Watch your map fill.** Every subtopic a paper touched, coloured by how
   you did. It changes because of what you fix. → `/me/map`

**Bank loop** (board exams and practice-only exams):

1. **Read the chapter as the book lays it out.** Solved examples, then the
   exercise, in order. → `/board/<slug>` (board exams) or `/browse`
2. **Attempt before you reveal.** Tap "Show answer" only after you have
   written yours. → `/browse`
3. **Save what you will revisit.** The bookmark on any question keeps it on
   one page for revision week. → `/saved`

The words above are the words in the code. Change them there.

## 4. What ships in slice 1 (this build)

| # | Item | Surface | Status |
|---|---|---|---|
| 1 | Pure loop helper + tests | `src/lib/education/howItWorks.ts` | building |
| 2 | Welcome step 2 — the loop for the chosen exam, one CTA into step 1 of it, a secondary link to wherever they were headed | `/welcome` | building |
| 3 | `/start` — the public, static, indexable how-it-works page: both loops + one line per tab | `/start`, linked from Footer, UserMenu, `/me`, `/about` | building |
| 4 | Result-page caption under "Fix these mistakes" | `/mock/attempt/[id]/result` | building |
| 5 | Empty-state copy on Saved points at the bookmark on mock review as well as Browse | `/saved` | building |
| 6 | Welcome email — the loop by email, once per account ever, includes the existing backlog | `npm run email:welcome`, cron `.github/workflows/welcome.yml`, migration 0117 | building |
| 7 | Classroom script for teachers | appendix A of this file | written |

Item 2 detail. After Continue or Skip on the exam screen the page does not
navigate. It shows the loop for the primary exam (Skip = general mock loop).
The primary button is step 1 of the loop. When the student arrived with a
specific `?next=` (a mock they tapped before being asked to sign up, a
pricing page from a quiz), the primary button is "Continue" to that
destination and the loop entry is the secondary link, because interrupting a
specific intent to redirect it is the pattern the gate forbids. `onboarded_at`
is stamped on the FIRST screen as before, so a student who closes the tab on
step 2 is never asked the exam question again and simply misses the second
screen once. That is the cheaper failure.

Item 6 detail. Selector rules, checked in order and total by construction:
no-email · opted-out · already-welcomed (dedupe key `welcome:<userId>`,
UNIQUE in the table, one EVER per account) · mailed-today (any other kind in
the last 24 hours, so the evening mock report and the welcome do not land on
the same day). No account-age rule: the cron runs daily, so a student signed
up at 10:00 gets it the next morning at 09:00 IST (03:30 UTC). **The backlog
is included on purpose:** the students the owner spoke to are existing
accounts, and a July signup who sat one mock has the same gap as a new one.
`--limit=100` in the workflow means the ~370-account backlog drains over four
mornings. The first run is the owner's call: dry-run first.

## 5. Not in slice 1, and why

- **One-shot in-app callouts stored server-side** (a hint on first visit to
  a surface). Deferred: needs a `seen` column and a client island per
  surface; the permanent caption on the result page and the start page cover
  the two highest-value moments without either.
- **A "How it works" card on the batch roster for teachers, and the script in
  the batch invite email.** Slice 2. The script itself is appendix A now.
- **A blog post on how to prepare with PYQ Vault.** Slice 3. Cheap and
  indexable; written prose, not code.
- **Anything that changes the nav.** The five-tab bar is a measured
  constraint. `/start` goes in the UserMenu and the Footer, not a tab.

## 6. Measurement

Success is feature breadth within seven days of signup, not visits to
`/start`. The events already exist:

| Measure | Baseline (2026-09-24) | Target after slice 1 |
|---|---|---|
| Students who ever used a second feature | 49 of 379 (13%) | 30% of signups in their first 7 days |
| Students who ever finished a drill | 2 | 25% of students who sat a mock |
| Welcome email → any activity within 48 h | none sent | read from `email_sends` × `user_activity` (`-- --report`) |

Re-measure with the SQL in the 2026-09-24 Decisions entry after two weeks of
the cron running.

## Appendix A — classroom script for teachers (five minutes)

Read aloud or paraphrase. Assumes students have phones and have signed up.

1. "Open PYQ Vault, tap Mocks, and sit the paper I assigned. It is the real
   paper from that year, timed. Answer what you can; leave the rest."
2. After the sitting: "On the result page, ignore the score for now. Look at
   the line that says how many you got right of the ones you attempted. That
   number is your real level."
3. "Tap the big button, Fix these mistakes. It gives you five of the
   questions you got wrong, one at a time, with the solution after each. Do
   all five now. It takes about five minutes."
4. "Tap your initial at the top right. The number on it is how many mistakes
   are waiting for you. When it is zero, you are done for the day. Tap Your
   map to see which chapters are red."
5. "Before the next class, do one round of Fix your mistakes each day. Not
   another full paper. Five questions."

For board classes replace steps 1 to 4 with: "Tap Board, open the chapter we
are on, and attempt each exercise question before you tap Show answer. Save
the ones you got wrong with the bookmark. Before the exam, open Saved."
