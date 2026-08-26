# Blind derivation brief

You are deriving answers for one packet of an NDA Mathematics mock paper.

## The one rule that matters

**Derive every answer yourself, from the question alone.** The printed key and
the paper's worked solution are deliberately withheld from your packet, and the
whole value of this pass is that you never see them. A derivation bent toward a
key you guessed at is worse than no derivation: it cannot disagree with the key,
so the cross-check it feeds learns nothing, and a wrong printed key survives.

**Therefore you MUST NOT open any of these**, even if something seems to call
for it:

- `scripts/nda-mock/config.ts` — carries printed-key repairs and hand rulings
- `scripts/nda-mock/data/*.extract.json` — carries the printed key per question
- `scripts/nda-mock/data/*.adjudication.json`
- the source DOCX/PDF under `C:\Vilas\LWS_Pune\...`
- the database

Your packet file and the taxonomy handout are the only inputs you need. If you
open one of the above by accident, say so plainly in your final report — a
declared contamination is recoverable, an undeclared one is not.

## Inputs

- **Packet**: `scripts/nda-mock/out/<id>/blind/q<range>.md` — 20 questions,
  stems and options only.
- **Taxonomy**: `scripts/nda-mock/out/<id>/taxonomy.md` — the LIVE chapter and
  subtopic names. Classification must come from this file; do not invent a
  chapter or subtopic, and do not adapt a name to fit. Copy them verbatim.

## Output

Write `scripts/nda-mock/data/<id>.blind.<range>.json` — a JSON array, one object
per question, in question order:

```json
[
  {
    "number": 1,
    "answer": "C",
    "working": "One or two sentences that actually derive it.",
    "confidence": "high",
    "chapter": "Quadratic Equations",
    "subtopic": "Vieta's Relations and Root-Coefficient Identities",
    "difficulty": "EASY",
    "notes": ""
  }
]
```

- `answer` — the option LETTER `"A"`–`"D"`, or `null` if the question genuinely
  cannot be answered (see Defects). Never guess to fill the field.
- `working` — how you got there, not a restatement of the answer. This is what a
  human reads when your answer and the printed key disagree, so it has to carry
  the reasoning.
- `confidence` — `"high"` / `"medium"` / `"low"`. Use `"low"` honestly; a
  low-confidence disagreement is triaged differently from a high-confidence one.
- `difficulty` — `"EASY"` / `"MODERATE"` / `"HARD"`, your own estimate.
- `notes` — `""` normally. Otherwise see below.

## Defects: describe, never repair

Some questions are damaged in the source. **Report what you see and answer the
question AS PRINTED**; do not silently "correct" a stem into the question you
think was intended, and do not pick the nearest option to an answer that matches
none. Both destroy the evidence the adjudication step needs.

Put it in `notes` and set `answer: null` where nothing is correct:

- no option matches your derived value → `notes`: your value and why
- two options are identical → say which
- the stem is missing data it depends on (a figure, a value, a limit)
- the stem is self-contradictory

If a question has a shared context block (`Directions (Q. Nos. …)`) the packet
prints it; those questions are unanswerable without it, so read it.

## Verification expectations

- Prefer an exact check to a plausible one. Where a value is numeric, evaluate
  it; where an identity is claimed, test it at an awkward point (not 0, not
  π/4 — a convenient point makes a false identity pass).
- A CAS returning nothing is a question, not a verdict. If `solve` finds no
  root, test the candidate values directly and scan numerically before
  concluding "no solution".
- Watch for the inadmissible-root trap: a root that satisfies the algebra but
  breaks the question's own premise (a zero term in a GP, a negative under a
  even root, an excluded point) is not an answer, and the distractor built from
  it is usually one of the four options.

## Practical

- **Do not author JSON through a shell heredoc.** The shell eats backslashes and
  will corrupt LaTeX in your `working` field into control characters. Use the
  Write tool.
- Keep `working` plain ASCII prose where you can; it does not need LaTeX.
- Namespace any scratch file you create with your packet id — several agents
  share one scratch directory and a generic name gets overwritten underneath you.
- Report at the end: how many you answered, how many are `null`, which numbers
  carry notes, and your low-confidence numbers.
