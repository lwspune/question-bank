# Lesson-to-topic review: brief

You review ONE Learn course's draft table: for every Learn lesson, which bank topics (subtopics) of
the same chapter its idea is tested by. Run commands from the checkout's root. Keep tool output
small: read files in chunks, pipe long output through `head`.

**When to run (2026-11-27):** after a `learn:import` that adds lessons or chapters,
`tests/learn-v-links-live.test.ts` fails on a lesson with no row. Then:
1. `npx tsx scripts/learn/topics-draft.ts --from=<bundle dir> --course=<slug>` writes the draft and
   packet to `generated-papers/learn-topics/` (reads the live bank, read-only).
2. A Maharashtra course: `npx tsx scripts/learn/topics-from-sources.ts --course=<slug> --from=<bundle dir>` (the topics
   Concept Ladder recorded as each lesson's source), then read the rows it lists as empty. Any other
   course: a reviewer (a person, or one agent per course) follows this brief.
3. `npx tsx scripts/learn/topics-commit.ts --course=<slug> --apply` writes
   `src/lib/learn/lessonTopics/<slug>.json` and the index.

A re-run REPLACES a course's file, so start the review from the committed file, not the draft, and
review only the new lessons.

## Why it matters

When a student gets 3 of their last 4 questions on a bank topic wrong, PYQ Vault offers "Teach me
the idea" and opens the Learn lesson filed under THAT topic. V also counts a student's mistakes per
lesson to choose where to start. A wrong row sends a stressed student to the wrong lesson, so
**an empty list is better than a guess**.

## The rule

Topic T belongs on lesson L when a bank question filed under T mainly tests L's idea, so a student
who got T's question wrong should be sent to L.
- Several lessons can share one topic (a broad topic like "Multiplication of Matrices" covers both
  the "how to multiply" lesson and the "properties of multiplication" lesson).
- A lesson usually gets ONE topic; TWO when it is truly the core of both; THREE almost never.
- A broad chapter with one or two broad topics: nearly every lesson gets that topic (that is right).
- ORDER MATTERS on a shared topic: when several lessons carry one topic, the stuck offer opens the
  FIRST one (in the chapter's lesson order) the student has not mastered. So do not put a minor or
  side lesson that comes EARLY in the chapter on a broad topic whose questions are mostly about a
  later lesson (e.g. an optical-isomerism lesson on a broad "Chemical Reactions" topic that is
  mostly SN1/SN2): it would catch every miss. Leave such a lesson empty or on its own narrow topic.
- EMPTY `[]` when no topic of the chapter tests the lesson's idea (a background or Learn-only
  idea the bank never asks), or when you cannot tell. Do not force a match.
- Use ONLY the topics listed for that chapter in the packet, copied EXACTLY (case, punctuation,
  spacing). Never invent or rename a topic.
- Judge the meaning, not shared words: the draft was made by word overlap and agrees with careful
  hand review only ~59% of the time (12% outright wrong), so check every row.

## Finished example (hand-checked, CBSE Class 12 Maths)

```
matrices:  types-of-matrices -> ["Order and Types of Matrices"]
           matrix-multiplication -> ["Multiplication of Matrices"]
           multiplication-properties -> ["Multiplication of Matrices"]
           symmetric-and-skew -> ["Symmetric and Skew-Symmetric Matrices"]
determinants: area-and-collinearity -> ["Area of a Triangle"]
              singular-matrices -> ["Adjoint and Inverse of a Matrix"]
              linear-systems-word-problems -> ["Solving System of Linear Equations"]
probability-12: total-probability-bayes -> ["Theorem of Total Probability", "Bayes' Theorem"]
```

## Inputs (for course `<C>`)

- Packet: `generated-papers\learn-topics\packet\<C>.md`: per chapter, its topics (name, question
  count, two sample stems), then a table of lessons (slug, title, summary, draft, top scores).
- Draft: `generated-papers\learn-topics\draft\<C>.json`: `{ chapter: { lesson: [topics] } }`.
- A lesson in full when the title and summary are not enough:
  `npx tsx scripts/learn/topics-lesson.ts --course=<C> --chapter=<chapter> --lesson=<lesson> --items=6`

## Output

1. `generated-papers\learn-topics\final\<C>.json`: the SAME shape and the same chapters and lessons
   as the draft, with your topics. Start from a copy of the draft and fix rows.
2. `generated-papers\learn-topics\notes\<C>.md`: at most 25 lines: the rows you are unsure of
   (`chapter/lesson: why`), then one line: how many rows you changed and how many you left empty.
3. Check it: `npx tsx scripts/learn/topics-commit.ts --course=<C>` must print `OK`. Fix and re-run
   until it does. NEVER pass `--apply`.

## Do not

Touch any other file, the database, or git. Do not run tests or the dev server. Do not read the
bundle JSON directly (30 MB); use topics-lesson.ts.

## Report back (short)

`<C>: OK, N lessons, X changed, Y empty, Z unsure` plus the unsure lines.
