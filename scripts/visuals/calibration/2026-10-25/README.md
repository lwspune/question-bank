# Triage calibration, 2026-10-25

Question: can a cheaper model decide which questions need an animated
solution, without losing quality? (Owner asked whether Haiku 5.5 or Sonnet 5.5
could do it.)

## Method

- 150 PUBLIC JEE Mains + MHT-CET questions with a solution, drawn on a fixed
  seed (`visuals-calib-1`, md5 order): 60 Maths (pool 7,114), 60 Physics
  (6,872), 30 Chemistry (6,921).
- The main session triaged all 150 against `../../TRIAGE_BRIEF.md`
  (animate / still / none, plus the situation and a confidence).
- Three Haiku agents triaged the same 150 blind (50 each). Sonnet then triaged,
  blind, the 56 that Haiku did NOT call "none" with high confidence.
- `verdicts.json` holds every verdict side by side (ids only, no question text).

## Results (picture = animate or still)

| Setup | Picture-or-not agreement with the main session |
|---|---|
| Haiku alone | 131/150 = 87.3% |
| Sonnet on the hard 56 | 44/56 = 78.6% |
| **Haiku's confident "none" final, Sonnet on the rest** | **133/150 = 88.7%** |

- Haiku's "none, high confidence" covered 94 of 150 (63%); the main session
  marked a picture on 5 of those, all low-confidence calls.
- Haiku judges by the solution's METHOD ("it is algebra"), so it missed strong
  cases: a midpoint tracing a half-size circle (n 103), standing waves in pipes
  (n 39). Sonnet caught every high-confidence "animate" in its 56.
- Most remaining disagreement is still-vs-none (Sonnet calls a fixed diagram
  "still" where the stem already has the figure). That class creates no
  animation, so it costs little.
- The pipeline drops 6 of the main session's 37 "animate" calls, all of them
  low-confidence on the main session's side too.

**Decision for Wave 1:** Haiku first; its confident "none" is final. Sonnet
judges the rest. Every "animate" is reviewed by the main session when its scene
is drafted (the review sheet), so a wrong "animate" cannot ship.

## What the sample says about scenes (main session's verdicts)

- By subject: Maths 24 animate / 36 none; Physics 13 animate, 6 still, 41
  none; Chemistry 1 still, 29 none.
- Situations among pictures: function-graph 6, line-plane-3d 5, circuit 5,
  conic 3, waves 3, area-between-curves 3, circle-geometry 2, curve-sketch 2,
  shm 2, and singles. One question here is roughly 140 in the 20,911-question
  JEE + CET bank, so the error bars are wide.
- Build order chosen: function graph, coordinate geometry (circles, conics,
  lines, loci), 3D lines and planes, waves, SHM.

## Cost seen

About 3,100 tokens a question for Haiku and 4,900 for Sonnet on this brief.
Triage chapter by chapter where a scene exists, not the whole bank up front.
