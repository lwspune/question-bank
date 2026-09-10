# Authoring brief — MH HSC Class-12 board PYQs

The contract every subtopic-assignment and solution-authoring pass works to.
Read this in full before touching a chapter.

## What this corpus is

Maharashtra HSC Class-12 Mathematics **board past-year question papers**,
2015–2025 (no 2021 — the exams were cancelled). They are being added to chapters
that **already hold the Balbharati textbook corpus** for the same chapter, so a
chapter ends up carrying its exercises and its board PYQs together.

**There is no answer key anywhere.** A board question paper never ships one, and
none of the compilations carry one either. So every MCQ key is DERIVED and every
model answer AUTHORED. That is normal here, not a gap — but it means your
derivation is the primary evidence, and there is nothing downstream to catch you.

## Inputs, per chapter `<id>`

| file | what it is |
|---|---|
| `out/<id>.subjective.json` | the free-response rows needing a model answer |
| `out/<id>.blind-mcq.json` | MCQ rows: stem + options, **no key** |
| `out/<id>.practice-corpus.json` | the chapter's EXISTING textbook rows **with worked solutions** |

The practice corpus does double duty and is the most valuable file:

1. **It calibrates subtopic assignment.** Assign each board PYQ to the subtopic
   the bank ALREADY files that kind of question under. Do not invent a scheme —
   read how the existing rows are filed and match it. Where a distinction looks
   arbitrary, the bank's existing convention wins.
2. **It is the reuse source.** Roughly 30% of these board questions have a
   near-verbatim solved twin in that file, and another ~24% a close relative.
   Where a twin exists, follow its method, notation and law names, so the chapter
   reads consistently. Record the twin's stem in the `twin` field.

## Rules

- **Math in `\(...\)` delimiters.** NEVER unicode maths symbols (∧ ∨ ∼ → ↔ ≡ ∫
  ∑ √ ∞ ≠ ± × ÷ ≤ ≥ α β θ π) in any output field — use `\land \vee \sim
  \rightarrow \longleftrightarrow \equiv \int \sum \sqrt \infty \neq \pm \times
  \div \leq \geq \alpha \beta \theta \pi`.
- **Tables are GFM pipe-tables and the `|---|---|` separator row is MANDATORY.**
  Without it the table renders as raw pipes. Truth tables must be complete — all
  4 rows for two variables, all 8 for three — and must state the conclusion in
  words afterwards.
- **WRITE IT AS A BOARD ANSWER.** This is the one rule with a probe behind it —
  `scripts/lib/boardAnswerStyle.ts`, enforced by `promote.ts`, so an offending
  answer never reaches `data/`. The reader is a student preparing for the board
  exam, so the solution must read as the answer THEY would write to score the
  marks: state the principle, show every step, close on the result. It is not a
  note to whoever is marking it, and it is not a commentary on the question.

  These BLOCK, and each was written by a real authoring pass before it was
  caught in review:

  | do not write | why |
  |---|---|
  | `(Other acceptable applications: SONAR, …)` | offers a marker alternatives instead of answering |
  | `**A caution worth stating.**` · `It is worth noting…` | an aside addressed to the reader |
  | `Note the question asks for the same SPEED…` | comments on the question rather than answering it |
  | `By the standard result…` · `It can be shown that…` | asserts what the next rule says you must derive |
  | `…which is option B` · `rules out options A and D` | names an option LETTER in prose — and it is what makes `audit:keys` misfire |

  Conventions the shipped corpus follows, MEASURED across its 153 numericals —
  quote these figures rather than re-deriving them:

  - **`\therefore` before the concluding step — 135 of 153 (88%).** A numerical
    without one is reported by `promote.ts` as a style warning, not a refusal.
  - **Close a numerical with a CHECK, not a restatement.** Substitute the answer
    back, or bound it ("the area must lie between 6 and 12; 9.33 is consistent").
    Only **0 of 153** end on a bolded result line — a bolded conclusion is fine
    but is NOT the house style, and an early draft of the probe that warned on
    its absence fired on 43% of the shipped corpus before being corrected.
  - An MCQ opens `**(B)** <the value>`, then the working.
  - Where a convention is genuinely ambiguous, STATE it as part of the answer
    ("the phase difference here is taken as \(\Delta\phi = \frac{2\pi}{\lambda}\Delta x\)")
    rather than as a note about the answer.

- **Show the working, do not assert the result.** "By the standard result…" is
  not a solution. A student reading it must be able to reproduce every step.
- **Verify what can be verified.** Differentiate an integral back. Substitute a
  solution into its differential equation. Check a claimed point actually lies on
  its curve. Several board questions in this corpus are defective and the check
  is how you find out.
- **Do not invent a citation, a convention or a figure.** If a convention is
  ambiguous (which way a switching table reads 1/0, whether an interval is
  closed), STATE the convention you used in the answer rather than assuming the
  reader shares it.
- **Difficulty** is one of `EASY` | `MODERATE` | `HARD`, judged against the
  practice corpus so the whole chapter sits on one scale. A field where every row
  carries the same value is worse than useless — it reads as a judgement nobody
  made.

## When a question looks broken

This has already happened repeatedly in this corpus, in both directions.

- An MCQ where **no option is correct** is a real and expected outcome. Report
  `key: null` with the correct expression, and do not force a pick.
- A stem that contradicts itself, a point that is not on its curve, a p.d.f. that
  does not integrate to 1 — **flag it, do not repair it.** These are `pyq` rows
  and fidelity to the printed paper is the whole point of a PYQ bank.
- **A defect report is a hypothesis about WHOSE defect it is.** Ours (a
  transcription slip) and the board's (a printed misprint) look identical from
  the arithmetic. Say which you believe and why; the printed page settles it, and
  that check happens after you.

## Output

Two files per chapter, in `out/`:

`<id>.assigned.json` — the subtopic for EVERY row in the chapter (both formats):
```json
[{ "ref": "...", "subtopic": "exactly one of the chapter's subtopics",
   "why": "one line, only where the call is not obvious" }]
```

`<id>.solutions.json` — one entry per row, MCQ and subjective alike:
```json
[{ "ref": "...", "answer": "the model answer; for an MCQ open with **(B)** then the working",
   "key": "A|B|C|D|null — MCQ rows only",
   "difficulty": "EASY|MODERATE|HARD",
   "twin": "the textbook stem it reuses, or null",
   "flag": "omit unless the question itself is defective" }]
```

**Write both files early**, complete but rough, then improve them. Do not leave
them unwritten while refining — an interrupted pass with a file on disk is
recoverable and one without is not.

**Diff your ref list against the input's before finishing.** Not a count — the
actual set. A permutation passes a count and fails a diff.
