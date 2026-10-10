# UX review — pyqvault.com

**Date:** 2026-10-02 · **Overall: 6 / 10**

**How it was reviewed:** the live site, signed out, on an emulated phone (390 × 844, touch, mobile user agent) and on desktop (1440 × 900), plus 3 days of Microsoft Clarity data (30 Sep – 2 Oct: 211 sessions, 115 of them mobile).

**Not covered:** the signed-in screens — the mock runner, the result page, `/drill` and the mastery map. The ideas below that touch them come from the code and the specs, not from using them.

**One constraint on everything below:** the brief was "sleek and addictive". The engagement rules in `CLAUDE.md` forbid streaks, leaderboards, hearts and vanity badges for this cohort, and they are right to. Every suggestion here builds pull from progress, unfinished work and the exam deadline instead.

---

## Scorecard

| Area | Score | Why |
|---|---|---|
| Content depth and trust | 9 | 85k tagged questions, real papers, official keys. Nothing in this market competes with it. |
| Visual polish | 7 | Clean and consistent, but every surface is the same grey card, so nothing tells the student what to do now. |
| Mobile ergonomics | 6 | Good bottom nav. The chat bubble covers content on every page; the notes page scrolls sideways. |
| Clarity of value | 5 | The homepage sells a library ("sorted question by question"), not an outcome. |
| Time to first question | 4 | Five taps from the Mocks tab to a first question. The homepage's main button is "Browse". |
| Habit loop | 4 | The best idea on the site — the loop on `/start` — is on a page few visitors find. |

---

## Evidence

| What | Where | Number |
|---|---|---|
| Dead clicks (a tap that did nothing) | `/browse` | **96** in 3 days |
| Rage clicks (repeated angry taps) | `/board/mh-hsc-12/mathematics/vectors` | **9** in 3 days, plus 26 dead clicks |
| Quick backs (left a page within seconds) | all devices | about **1.4 per session** |
| Taps from the Mocks tab to a first question | `/mock` → exam → past papers → paper → instructions → start | **5** |
| NDA question count | homepage vs `/nda` and `/browse` | **14,024** vs **5,130** |
| Page width on a 390 px phone | `/notes/nda-maths/statistics/central-tendency` | **427 px** (scrolls sideways) |

---

## Suggestions, in priority order

### Do first (about one week; changes what a new visitor does and whether they trust it)

**1. Lead the homepage with an exam picker and one action.**
- Now: the hero says "Every past paper, sorted question by question", followed by "Browse the question bank" and 14 tall exam cards (about 1,500 px of scrolling on a phone).
- Change: a row of exam chips first, then one button: **"Start a 10-question NDA check — no sign-up"**. The result names the student's weak chapters, and that is where the sign-up ask goes, because the reward is in front of them.
- Remember the exam they pick; the `qb_exam` cookie already exists.
- Move the long exam descriptions to each exam's own page.

**2. Separate the teacher's jobs from the student's.**
- Now: `/browse`'s main button is **"Download · 85533"**, `/nda` leads with **"Build a paper"**, and every question card carries a **"+"** to add it to a paper. Those are teacher actions, and for a student the first two are paywalled.
- Change: for students the main action is **Practice**. Give teachers a mode switch, or their own entry point, where Download and Build a paper lead.

**3. Make tapping the question text expand it.**
- Now: the stem cuts off with "This ..." and only the small chevron opens it. That fits the 96 dead clicks on `/browse`; confirm with a few Clarity recordings.
- Change: the whole stem is the tap target.
- Also show the "Playbook" / "Concept notes" chips once per page, not on every card. Drop the truncated breadcrumb on each card ("Biology → Ce…"); the page heading already says it.

**4. Make the question counts agree.**
- Now: NDA shows 14,024 on the homepage and 5,130 on `/nda` and `/browse`. A student who sees both will trust neither.
- Change: pick one definition (all questions, or past-year only), use it everywhere, and say which it is ("5,130 past-year questions").

### Do next (removes friction on the main paths)

**5. One tap to a paper.**
- Add a **"Start the latest NDA paper"** card at the top of `/mock` and of each exam page.
- When an attempt is in progress, show **"Resume — 23 minutes left"** in the same place.

**6. Open the board reader's first section by default.**
- Now: every section is folded, two levels deep, so every question is two taps away. This page had the most rage clicks.
- Change: open the first exercise. Make the second-level rows look tappable: today they are pale grey caps that read as labels.
- Confirm the cause with recordings before redesigning further.

**7. Fix the sideways scroll on the notes page.**
- `/notes/nda-maths/statistics/central-tendency` is 427 px wide on a 390 px phone. It traces to formula-rendering markup; the exact element is not yet pinned down.
- Add a phone-width overflow check to the smoke tests so the next chapter cannot ship the same way.

**8. Tame the chat bubble.**
- Now: a large floating bubble covers card arrows and the pricing terms on every mobile page.
- Change: make it smaller, hide it while the student scrolls, or move it into the menu.

**9. Free up the mobile header.**
- The theme toggle takes prime space next to Sign in. Move it into the menu.

### Then (makes it feel alive and brings students back)

**10. Show the product, not a description of it.**
- Replace the six "What's inside" text cards with one real result card, or a mastery map, as a picture.
- Put the three steps from `/start` on the homepage: *Sit a real paper → Fix what you missed → Watch your map fill.*

**11. Halve the copy and write it in student language.**
- Cut phrases like "Anonymous-friendly", "served whole", "built to the same blueprint", "EASY + MODERATE bandwidth".
- Drop the "PYQ VAULT" label that sits directly above "PYQ Vault".
- Rule of thumb: an intro is one sentence a 16-year-old would say.

**12. Use colour to show what to do next.**
- Today every card is the same grey box with a grey icon tile, so "start a mock" and "read about guides" look equally important.
- Give action cards (Start, Resume, Fix 5 mistakes) the brand fill.
- Give each exam its own accent colour.
- Show a progress ring on each chapter a student has touched.

**13. Bring the signed-in features to the front.**
- Days-to-exam, the weekly goal and "N mistakes waiting" already exist but sit behind the avatar menu.
- For a signed-in student the homepage becomes **"Your NDA"**: days left, the next paper to sit, mistakes waiting, this week's goal.

**14. Make answering feel good.**
- When a student answers: a quick colour change, a short vibration on phones (`navigator.vibrate`), and the explanation sliding in on the same screen.
- Celebrate only real milestones, such as a subtopic reaching 80%, never "logged in 3 days".

**15. Pricing.**
- Make the buy button the brand colour; today it is black.
- Set *Free* and *Pass* side by side, so the ₹99 reads as an upgrade, not a gate.
- Add real proof, such as "N mocks sat this week" filled from live data. Only true figures.

---

## What is already good — keep it

- The bottom tab bar on mobile, and the clear active-tab state.
- Serif for question text, sans for interface text: content and chrome are easy to tell apart.
- The `/questions` chapter pages: the right shape for search traffic.
- Honest copy about marking schemes and keys. Trust is this product's edge.
- The `/start` loop. It is the product's story; it just needs to be on the homepage.

---

## How to measure it

Pick one number per change, and read it in Clarity and `user_activity` two weeks after it ships:

| Change | Number to watch |
|---|---|
| 1, 5, 10 | share of new visitors who answer a first question in their first session |
| 2 | taps on Download by signed-out students (should fall) |
| 3 | dead clicks on `/browse` (should fall from 96 per 3 days) |
| 6 | rage clicks on `/board` pages |
| 13 | share of signed-in students who come back within 7 days (about 33% today) |
