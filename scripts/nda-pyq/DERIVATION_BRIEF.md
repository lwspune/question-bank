# NDA Paper I (Mathematics) — blind derivation brief

You are deriving the answers to one NDA Paper I (Mathematics) paper. Read this
whole file before you start.

## You are a SINGLE pass, and an external key is coming later

This paper is derived by **one** blind pass — yours — rather than the two that
the sibling CDS pipeline uses. An external answer key will arrive afterwards and
be reconciled against your output by `reconcile-key.ts`.

That sequencing is deliberate and it changes what your output is for. **You are
not producing the answer; you are producing the independent second opinion that
makes the key checkable.** Because you write before the key exists, you cannot be
influenced by it — which is exactly the property that lets a disagreement between
the two mean something. On the sibling CDS corpus, of five rows where a blind
pass disagreed with a prep-house key, **four were the KEY's error and zero were
ours**. Your derivation is what would have caught those four.

Two consequences for how you work:

- **Nothing you write is final.** Every row you mark MED or LOW is going onto a
  review queue the moment the key lands. Say what you are unsure about; do not
  round it up to confident.
- **Your `reasoning` is read by a human adjudicating against a key**, not by a
  grader. It has to be complete enough for someone to re-check your route.

## What "blind" means here, precisely

- You have **not** seen any answer key, and you must not go looking for one — not
  on the web, not in the repo, not in another file in `data/`.
- You **may** open the page images (`scripts/nda-pyq/out/<paperId>/pNN.png`) and
  the source PDF. **No UPSC question booklet prints an answer key** — this one
  ends at Q120 and its last page is a coaching-institute advertisement — so the
  page can only tell you what the question is, never what the answer is. Reading
  it is safe and it is the only way to resolve an ambiguous glyph.

If you find anything that looks like an answer key, **stop and report it**
instead of using it. A pass that has seen a key is not blind, and the whole point
of running this before the key arrives is lost silently.

## Input and output

Input: `scripts/nda-pyq/data/<paperId>.derive.json` — number, context, stem,
options, and a `hasFigure` flag. No answers.

Output: `scripts/nda-pyq/data/<paperId>.<passName>.json`, an array of:

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
  plain terms: `"4"`, `"37.5 km/hour"`, `"\\(3\\sqrt{2}\\) cm"`. It is what makes
  a disagreement with the key legible. If the key says B and you say D but your
  `value` is the text printed at B, then the paper printed its answer TWICE and
  the repair is to the option text, never to the answer. Without `value` that
  case is indistinguishable from a genuine wrong key, and the two need opposite
  fixes.
- `confidence` — HIGH / MED / LOW. See the calibration rule below.
- `reasoning` — the derivation, short but complete enough to check. This is
  **REVIEWER EVIDENCE**: it is what `reconcile-key.ts` prints beside a row that
  disagrees with the key, so a human can adjudicate, and the runner-up rule below
  applies to it.
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

`npx tsx scripts/nda-pyq/audit-solutions.ts <paperId>` probes exactly these
shapes and is the check to run before you report. It reads the DATABASE, so
before a paper is committed it can only be run over the text you would ship.

**Write the file early and append as you go.** Do not batch 100 questions to the
end; if you are interrupted, everything already written survives.

## Derive. Do not recognise.

Every answer must be **computed from the stem**, not recalled and not
pattern-matched from a familiar-looking problem. UPSC reuses shapes with changed
numbers, and the changed number is usually the point. This is a 120-question
paper spanning 31 chapters — the standard-looking integral is where a recalled
answer costs you.

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

## What happens to your file when the key arrives

`reconcile-key.ts` diffs your answers against the external key and prints a work
list. **It applies nothing.** A human then edits your file:

- if the KEY is right, `answer` AND `value` are both overridden — overriding only
  `answer` leaves the row asserting one option as a letter and a different one in
  plain words, which shipped once on the sibling corpus and was caught by someone
  reading the row rather than by any check;
- if YOUR derivation is right, the row is left alone and the key is recorded as
  defective;
- either way the number is added to `reconciled`, and the adjudication is
  APPENDED to `reasoning` rather than replacing it. Your original argument is the
  evidence for why the call was close.

Nothing goes PUBLIC, and no `/mock` is built, until that pass is done. Write
accordingly: an honest LOW is worth more to the person doing it than a confident
guess.

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
- **Give every probe a canary: feed it a known-bad string and confirm it FIRES
  before you trust a clean run.** A probe that has never gone red proves nothing,
  and the worst case is not a probe that lies — it is one that tests nothing and
  reports clean. That happened here: a validator's control-character regex was
  written as escape literals, the escapes were eaten, the pattern became inert,
  and the scan returned green having checked nothing. The data was fine; the
  probe was not. A canary is the only thing that separates those two states.
- Give scratch files a unique name including your pass name; several agents share
  one scratchpad and have overwritten each other's scripts.

## When you finish

Report: how many you derived, the HIGH/MED/LOW split, every question where no
option matched, every question you judged misprinted, and every figure you could
not read.
