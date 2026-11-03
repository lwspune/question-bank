# MCAT pilot (2026-10-30)

Twenty original practice questions for the MCAT's Psychological, Social, and
Biological Foundations of Behavior section, written to test whether we can make
MCAT content worth selling. Nothing here is in the database. The next step is a
review by someone who scored 515 or more (owner, 2026-11-03: review later), and
Phase 1 (about 300 Psych/Soc questions) waits on that review.

## What is here

| File | What it is |
|---|---|
| `questions.json` | The current set (round 3): 2 passages of 6 questions + 8 stand-alones, all 12 content categories. Each question has its key, a solution explaining every option, a difficulty guess and a `provenance` record (the open source it was checked against, or "invented study"). |
| `check.mjs` | The scripted checks: structure, answer spread, length tells, the passage arithmetic, chapter coverage, and three leak checks (a key worked out from other options' numbers, a sibling question giving the answer away, the key being the only cautious option). `node check.mjs`; add `--blind-dir=<folder outside the repo>` to write the two blind files the checker agents read. |
| `round3-blind-result.json` | A separate solver, without the key: 20/20 agree. |
| `round3-nopassage-result.json` | A solver with the passages removed, told to use every trick: of the 7 questions written to need the passage, none answered confidently. |
| `round1/`, `round2/` | The earlier drafts and their check results. Round 1: 11 of 12 passage questions were answerable without the passage. |

## Copyright rules these were written under

No AAMC material was used, even as a model: AAMC's prep terms forbid derivative
works, including AI/LLM modelling. Sources allowed: the public content outline
(topic list only), OpenStax CC BY books, CC BY research papers, public-domain
texts, invented studies. Not allowed: any AAMC prep material, Khan Academy MCAT
(non-commercial licence), any competitor's questions, Anki or Quizlet decks,
exam-recall posts. Every stand-alone and passage opening was web-searched for a
published match before this set was kept; none was found.

## What the review should judge

Correct, and needing their passages: shown by the checks above. Open: whether
the questions feel like the real MCAT, and difficulty (the checker rated most
easy to moderate). The checkers are the same kind of model as the writer, which
is why a person who sat the exam has the final word.
