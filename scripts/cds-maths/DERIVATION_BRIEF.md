# CDS Elementary Mathematics — blind derivation brief

You are deriving the answers to one CDS Elementary Mathematics paper. Two
independent passes do this separately and are then crosstabbed; you are ONE of
them. Read this whole file before you start.

## What "blind" means here, precisely

- You have **not** seen any answer key, and you must not go looking for one.
- You have **not** seen the other pass's output, and must not read it.
- You **may** open the page images (`scripts/cds-maths/out/<paperId>/pNN.png`)
  and the source PDF. **No CDS booklet prints an answer key** — every paper ends
  at Q100 — so the page can only tell you what the question is, never what the
  answer is. Reading it is safe and it is the only way to see a diagram.

If you find anything that looks like an answer key, **stop and report it**
instead of using it. Two papers in this corpus do have an external prep-house
key on disk; if you ever see one, the measurement is void and we need to know.

## Input and output

Input: `scripts/cds-maths/data/<paperId>.derive.json` — number, context, stem,
options, and a `hasFigure` flag. No answers.

Output: `scripts/cds-maths/data/<paperId>.<passName>.json`, an array of:

```json
{
  "number": 41,
  "answer": "C",
  "value": "4",
  "confidence": "HIGH",
  "reasoning": "Three-digit numbers divisible by 7 whose digit-reversal is also divisible by 7: 161, 168, 252, ... exactly four such numbers exist."
}
```

- `answer` — one of A, B, C, D, or **`null`** where no printed option is
  correct. See "If no option is correct" below.
- `value` — **mandatory**, and not decoration. It is the answer's content in
  plain terms: `"4"`, `"37.5 km/hour"`, `"\\(3\\sqrt{2}\\) cm"`. The crosstab
  compares two derivations of the same *quantity*, which is what separates a
  genuine disagreement from two labels sitting on the same fact. A paper that
  prints its correct answer twice needs the option repaired, not the answer
  changed, and only `value` can tell those apart.
- `confidence` — HIGH / MED / LOW. See the calibration rule below.
- `reasoning` — the derivation, short but complete enough to check. This is
  **REVIEWER EVIDENCE**: it is what the crosstab prints on a disputed row so a
  human can adjudicate, and the runner-up rule below applies to it.
- `solution` — **the same derivation written for a STUDENT.** Required on every
  row. See below; it is the field that ships.

### Why `reasoning` and `solution` are separate

They have different readers and one field cannot serve both. `reasoning` must
name the runner-up, say what would flip the answer, and record which tool
confirmed it — all of which a reviewer needs and a student must never see.

Piping `reasoning` straight through is not hypothetical: it shipped on **419 of
800 published rows** of this corpus before anyone looked at a rendered card.
Students were reading "RUNNER-UP: option C, if the interval were closed",
"Verified with sympy", and — on 328 rows — bare ASCII like "the product vanishes
only if sin alpha equals -2" sitting beside a fully typeset stem.

So write both. `solution` is what a student reads:

1. **No process language.** No runner-up, no confidence, no "both passes", no
   naming the CAS, no "I verified". If the runner-up matters mathematically, say
   what is ambiguous about the QUESTION, not what you did about it.
2. **Every expression typeset** in `\( ... \)` — `\(\sqrt{x}\)` not `sqrt(x)`,
   `\(\pi\)` not `pi`, `\(9^{27}\)` not `9^27`, `\(\ge\)` not `>=`. A prose-only
   answer with no formula is correct as prose; do not manufacture maths.
3. **Name an option by what it SAYS, never by its bare letter.** A capital A–D in
   the prose makes the structural key-audit read it as the solution's own
   conclusion and flag a correct row.
4. **Say plainly when the PAPER is defective** — two valid answers, no correct
   option, a statement inconsistent with its own stem. That belongs in front of
   a student, in the student's terms.
5. Two to four sentences.
6. Write **nothing about where the answer came from.** No key disclaimer, no
   sourcing footnote. Provenance is structured data elsewhere.

`npx tsx scripts/cds-maths/audit-solutions.ts <paperId>` probes exactly these
shapes and is the check to run before you report. It reads the DATABASE, so
before a paper is committed it can only be run over the text you would ship.

**Write the file early and append as you go.** Do not batch 100 questions to the
end; if you are interrupted, everything already written survives.

## Derive. Do not recognise.

Every answer must be **computed from the stem**, not recalled and not
pattern-matched from a familiar-looking problem. CDS reuses shapes with changed
numbers, and the changed number is usually the point.

- Where arithmetic is non-trivial, **verify numerically** (python / sympy).
  Reaching the same number twice by two routes is the cheapest real check there is.
- A CAS returning nothing is a **question, not a verdict**. `solve` missing a
  root, or `simplify` failing to reduce an identity to zero, is not evidence the
  answer is wrong — test the claimed value directly and scan numerically.
- Watch floating point on boundaries and equalities. Use exact arithmetic
  (`Fraction`, `Rational`) for anything that decides "is this an integer",
  "is this on the boundary", "are these equal". A residual of `-5.5e-17` is zero.
- Pick test points that **discriminate**. A value where the right and the wrong
  answer agree proves nothing, and convenient angles (0, 30, 45, 90 degrees) are
  exactly where wrong trigonometric identities pass.

## Solve the question AS PRINTED

If the stem looks misprinted, **solve what is printed anyway** and say so in
`reasoning`. Do not solve the question you think was intended. A "helpfully
corrected" derivation cannot disagree with the source, so it destroys the very
comparison this pass exists to make. Flag it; do not fix it.

## If no option is correct

**Set `answer` to `null`**, drop `confidence` to LOW, and state plainly in
`reasoning` and `solution` what the computed value is and why no option matches.

**Never choose the nearest option to make the question resolve.** A question with
no correct answer is a real and expected outcome on a scanned corpus, and it is a
finding we want, not a failure to hide.

This paragraph used to say "set `answer` to your best reading" instead, and the
two instructions give opposite results. `buildRecords` DROPS a null row, so the
paper ships one question short — which is true. A "best reading" is committed
like any other answer, so the bank marks an option correct that is not, a
student is told they are wrong for choosing something equally defensible, and
nothing downstream can tell the row apart from a normal one. The drop is
recorded and visible; the best reading is silent. Prefer the visible failure.

Two distinctions worth holding:

- **"None of the above" being printed is NOT this case.** 2019-I Q43's computed
  values match no NUMERIC option, but the paper offers "None of the above" and
  it is correct under both readings of the stem — so it is an ordinary answer.
  Null is for when no option, including any escape hatch, is right.
- **An ambiguous stem with two defensible answers is not this case either.**
  2018-I Q64 has two printed options that are both correct; that is a normal
  answer plus a note, not a null. Null means *nothing* printed is right.

## Figure-bearing questions

Where `hasFigure` is true the diagram carries data the stem does not — an angle
mark, a labelled length, which chord is which. **Open the page image and read the
figure.** Do not attempt these from the stem alone, and do not assume a
"standard" configuration.

If the figure is genuinely unreadable at high zoom, say so and use LOW.

## Confidence, and the runner-up rule

- **HIGH** — you computed it, you checked it, and no other option is defensible.
- **MED** — you have an answer but a specific alternative survives a reading of
  the stem you cannot rule out.
- **LOW** — the stem is ambiguous or defective, the figure is unreadable, or no
  option matches.

Do not inflate. On the sibling UPSC corpus, measured against real keys, the HIGH
band ran 98.5% correct while essentially every error landed in MED — that makes
confidence a usable router for review effort, and it stops being one the moment
anyone marks a shaky answer HIGH.

**On any MED item, NAME THE RUNNER-UP** in `reasoning` and say what would have to
be true for it to win. Measured on the UPSC papers, the key repeatedly landed on
exactly the alternative the deriver had named and set aside — in both directions,
so this is a tendency and not a law. It costs a sentence and it turns the MED
list into a ranked review queue rather than a pile.

## Adjudicating a dispute

When the crosstab shows a DISPUTE and you settle it by hand, override BOTH
`answer` AND `value` on that row. The answers file is normally built by copying
one pass wholesale and overriding the adjudicated rows; override only `answer`
and the row keeps the OTHER pass's `value`, so it asserts one option in the
letter field and a different one in plain words. That shipped on 2022-I Q5 --
`answer: "D"` ("cannot be determined") beside `value: "45"` -- and was caught by
a rewrite agent reading the row, not by any check.

Append the adjudication to `reasoning` rather than replacing it. The losing
pass's argument is the evidence for why the call was close, and a `reasoning`
that reads as self-contradictory is the audit trail working, not a defect.

## Practical

- Do not run `git add` or any git command.
- Author files with the Write/Edit tools, never a shell heredoc — heredocs eat
  backslashes here and will corrupt LaTeX into invisible control characters. The
  corruption is selective, which is what makes it survive review: a KNOWN escape
  is consumed (`\t` becomes a TAB, `\f` a form feed, `\r` a CR, `\a` a BEL) while
  an unknown one comes through untouched. So `\tan` and `\frac` are destroyed
  while `\sqrt` and `\(` are fine, and a spot check lands on a good line.
- **The same trap ruins PROBES, and there it is worse.** A `python -c` or
  `node -e` one-liner that checks your output has its own backslashes mangled
  before it ever runs, so it reports a defect that is not there, or misses one
  that is. Both happened on this corpus in a single day: a transcriber's
  `\tan`/`\frac` genuinely corrupted and was caught only by a scan run FROM A
  FILE, and another agent's one-liner reported a bogus "literal backslash-n" that
  was three legitimate `\ne`. The person who wrote this bullet then hit the same
  trap writing it, and emitted four control characters into this very paragraph.
  **Author a probe as a file, and when a probe and the data disagree, suspect the
  probe first.**
- After writing, scan your own output for control characters **by CODEPOINT**
  (`ord(ch) < 32`, allowing only newline and tab), never by eyeballing it. These
  bytes are invisible in a terminal and pass a read-through.
- Give scratch files a unique name including your pass name; several agents share
  one scratchpad and have overwritten each other's scripts.

## When you finish

Report: how many you derived, the HIGH/MED/LOW split, every question where no
option matched, every question you judged misprinted, and every figure you could
not read.
