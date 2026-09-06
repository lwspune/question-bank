# Solution brief — CDS Elementary Mathematics

The contract for **student-facing** solution text. Binding.

This brief exists because it did not. `reasoning` was written to a derivation
brief that (correctly) asks for reviewer evidence, and that string was piped
straight into `questions.solution`, which is what a student reads. The result
reached production on **419 of 800 published rows**. A lane without a written
contract inherits whatever the prompt-writer happened to remember.

---

## The two fields, and why both exist

| field | audience | contract |
|---|---|---|
| `reasoning` | the reviewer adjudicating a crosstab dispute | DERIVATION_BRIEF.md — name the runner-up on a MED item, say what would flip it, name the tool that verified it |
| `solution` | the student | this file |

**Never overwrite `reasoning` to fix a solution.** The runner-up note is the most
useful artefact the derivation protocol produces, and it is the evidence behind
every retained key. Add `solution`; leave the evidence intact.

A row whose `reasoning` is already good student prose needs no `solution` at
all — the absence of the field means "ship the reasoning", and that is the
common case.

---

## Rules

### 1. Write to the student, not about the process

Nothing about how the answer was produced belongs in the solution. Cut every
one of these:

- `RUNNER-UP: option C, if the interval were closed` — reviewer-only
- `ADJUDICATED BY HAND -- the two blind passes DISAGREED (B vs C)`
- `Verified with sympy` / `confirmed by SLSQP from 3000 starts`
- `both passes independently reached this`
- `confidence: MED`

The provenance bracket `[Derived answer — this booklet carries no official
key…]` is **appended automatically** and is deliberate. Do not write it
yourself and do not remove it.

### 2. Keep what the STUDENT needs to know about a defective question

This is the important half of rule 1 and it cuts the other way. Where the paper
itself is broken, say so plainly — a student who reaches a different answer
deserves to know why:

- *"The equation has two valid solutions, \\(+3\\) and \\(-3\\); only \\(-3\\) is
  printed, so (b) is the sole available option."*
- *"As printed, Statement I is inconsistent with the stem: angles in ratio 1:2:3
  make the triangle 30-60-90, so the second side would be 21.65 cm, not 24."*
- *"Option (c) 'Non-negative' is also true; (b) is the tighter statement."*

Say it in the student's terms — what is wrong with the question — never in the
reviewer's terms — which pass thought what.

### 3. Maths is typeset, not spelled out

Every mathematical expression goes in `\\( ... \\)`. This is not cosmetic: the
stem beside it is typeset, so ASCII in the solution reads as a different
document.

| never | always |
|---|---|
| `sqrt(400-144) = 16` | `\\(\\sqrt{400-144} = 16\\)` |
| `2 pi (3)(7) = 42 pi` | `\\(2\\pi(3)(7) = 42\\pi\\)` |
| `sin alpha equals -2` | `\\(\\sin\\alpha = -2\\)` |
| `9^27` | `\\(9^{27}\\)` |
| `x >= 4` | `\\(x \\ge 4\\)` |
| `9 = 1 mod 4` | `\\(9 \\equiv 1 \\pmod 4\\)` |
| `1/3 : 1/4 : 1/5` | `\\(\\tfrac13 : \\tfrac14 : \\tfrac15\\)` |

Plain prose stays plain prose. A data-sufficiency answer with no formula in it
is correct as it stands — do not manufacture maths to satisfy this rule.

### 4. Name an option by what it SAYS, not by its letter

`audit:keys` reads a bare capital A–D as the solution's own conclusion, so
`option C is excluded on sign alone` makes a correct row look like a wrong key.
Write `the negative root is excluded on sign alone` instead. This has produced
false positives in three separate pipelines in this repo; naming the value
keeps the pedagogy and silences the probe permanently rather than relocating it.

### 5. Do not change the answer

You are rewriting prose. If the maths looks wrong to you, **say so in your
report and change nothing** — `apply-solutions.ts` refuses the whole paper if a
stored key and the answers file disagree, and it is right to.

### 6. Length

Two to four sentences. Enough to follow the derivation, not a transcript of it.

---

## Checking your work

```sh
npx tsx scripts/cds-maths/audit-solutions.ts <paperId>          # should reach 0 flagged
npx tsx scripts/cds-maths/render-check.ts <paperId>             # every math zone must render
npx tsx scripts/cds-maths/apply-solutions.ts <paperId>          # dry run; refuses if a key moved
```

`audit-solutions` is TRIAGE, not proof. A clean run means none of the *known*
defect shapes are present; it cannot tell you the solution reads well, and it is
blind to a derivation that is simply wrong. Read what you wrote.

**Author files with the editor, never a shell heredoc** — heredocs eat
backslashes here, and every rule in section 3 is made of backslashes.
