# V tutor, step 1: "Teach me step by step" (plan, 2026-11-11)

Status: PLAN, waiting for the owner's OK. Nothing is built. Part of V_SPEC.md
section 0 (the tutor vision), step 1 of its ladder.

Mockup: https://claude.ai/artifact/A43XLhtVi4phBsH9cQMEqU

## 1. What the student gets

Under a V explanation of a bank question, two buttons and nothing else:

    [ One more like this ]   [ Teach me step by step ]

"Teach me step by step" turns the stored solution into 2 to 5 steps. Each
step is one short message from V. At most 2 steps end with a check the
student taps (or a number they type). The next step opens only after an
answer: the wait is in the code, not in V's instructions. A wrong pick gets a
reply written for that mistake and one more try; after two misses V shows it
and moves on. "Show me" is always there. Where the question has an animation
whose steps line up, the board above the chat moves one step at a time. The
walkthrough ends with the one idea to keep and "Try one like it".

## 2. Which questions get the button

A question gets it only if a walkthrough could be written AND passed every
check (section 4). Three kinds, by what the question needs:

| Kind | Examples | Button | How V's steps are checked |
|---|---|---|---|
| Calculation | Maths, Physics, chemistry numericals, SSC Quant, CSAT | yes | code, line by line (the algebra-steps checker), and the key |
| Statements and reasoning | UPSC/MPSC/CDS/NDA statement questions, logical reasoning, grammar rules, reading passages, chemistry reasoning | yes | the key, plus a second model check against the stored solution, plus weekly review |
| Pure memory | a fact, a definition, a date | no | (a hint and another try fits better: a later step) |

A stored solution too short to split gets no button.

**Pilot order:** Maths and Physics first (code checks most steps; 373 of 602
Ask V question taps in the 60 days to 2026-11-11). Statement questions second,
once the review has caught a few mistakes.

## 3. Where the steps come from

Written on the first tap, checked, then saved for every later student
(interest is spread thin: 602 asks over 390 questions in 60 days, so writing
them in advance would miss most). The first student waits about 10-20 seconds
("V is preparing the steps…"); everyone after gets it at once and costs
nothing, because the steps play in the browser with no AI call per step.

Rules for the writer (a model, Sonnet 5.5 proposed; V's chat stays Haiku):
- Every step comes from the stored solution. New working is allowed only
  where code can check it (an algebra or calc line) or it is a single obvious
  move the second check confirms.
- A check has exactly one right option, and it must follow from the solution.
- The last step's answer must equal the key.
- Statement questions: one statement per step, then "So which are correct?".

## 4. The checks before any student sees it

1. **Shape:** 2-5 steps, at most 2 checks, every check one right option,
   lengths capped, board step references exist in the question's animation.
2. **Key:** the final answer equals the key (option letter or numeric answer).
3. **Code:** any working written as a checkable line passes the algebra-steps
   checker (`lib/visuals/scenes/algebraSteps.ts` rules).
4. **Second check:** a separate model call sees the question, key, stored
   solution and the walkthrough, and must agree every step and every "right"
   option is correct. It does not see the writer's reasoning.

Fail any one: the walkthrough is not saved as usable, the student sees
"This one can't be done step by step yet" with the explanation still there,
and the question is marked so the button does not show again. A saved
walkthrough is dropped when the solution changes (the same fingerprint the
animations use).

## 5. Rules this changes (V_SPEC section 3)

- **"Did you understand? Yes / No" goes** from under explanations. "Teach me
  step by step" counts as the No (the question goes to Fix your mistakes, as
  today). This ends experiment `v-better-retry` early (too few answers to
  read). "One more like this" keeps its label, so `v-follow-up-loop` runs on.
- **"No check-question in V's text"** stays for ordinary replies; checks
  exist only inside this mode, which the student asked for.
- **Free answers and the hourly cap:** the walkthrough costs nothing extra.
  The explanation already used the one free answer; the steps use no messages.

## 6. What gets built

| Part | What |
|---|---|
| Migration | `v_walkthroughs`: question_id, solution fingerprint, steps (jsonb), verdict (usable / unsuitable / failed + why), writer and checker model, created_at, reviewed_at. Written by the server only. |
| Pure core | `lib/chat/walkthrough/`: the step format, the shape and key checks, the code checks, and the player's state (which step, misses, finished). TDD. |
| Writer | server route `/api/chat/walkthrough`: signed-in, the question must be one V just explained; read the saved one or write, check and save it. |
| Panel | the two-button row; the walkthrough in V's panel; the board, when steps line up with the animation (the player gets a "show step N" option it lacks today). |
| Events | walkthrough started / step answered (right, wrong, shown) / finished, in `user_activity`, de-duplicated. |
| Review | `npm run v:walkthroughs`: new and failed walkthroughs with their checks, for the Thursday V review; any row can be dropped. |
| Experiment | `v-step-by-step` in the growth registry (section 7). |

## 7. How we will know it works

- **First 2 weeks:** taps per explanation shown; share who finish; where they
  stop; how often a check is missed. Keep going if about 10%+ tap and half
  finish. If almost nobody taps, the problem is where the button is, not the
  walkthrough: try offering it before the explanation next.
- **Then (about 2 months, small numbers):** verified learning (`npm run
  v:learning`) for students who finished a walkthrough against those who only
  read the explanation. Students who choose it differ from those who don't,
  so this is a signal, not proof.
- **Quality:** every new walkthrough reviewed weekly; any wrong one is
  dropped and the case added to the writer's tests.

## 8. Phases

1. **Dry run, no student sees anything:** the writer and checks over 30 real
   Maths and Physics questions students asked V about. A review sheet for the
   owner. Go / no-go on quality.
2. **Live on Maths and Physics** (signed-in students), with the two-button
   row. 2-week read.
3. **Statement questions** (UPSC, MPSC, CDS, NDA GK), after phase 2's read.

## 9. Decisions for the owner

1. The two-button row replaces "Did you understand?" (ends `v-better-retry`). OK?
2. Written on first tap, checked twice, saved (not written in advance). OK?
3. Writer model Sonnet 5.5 for quality; cost is once per question, read with `npm run v:cost`. OK?
4. Pilot on Maths and Physics, statements next. OK?
5. Free, like the explanation it follows. OK?

## 10. Owner feedback, 2026-11-11: parked

**A 10-20 second wait on the first tap is too long** (owner). Picked up later.
Options to weigh then: write the steps in the background as soon as V's
explanation is shown, so they are ready by the time the student has read it;
write them in advance for the questions students ask about most and for whole
chapters as they are reviewed; or a faster writer model, measured against the
dry run's quality.
