# NCERT Chemistry — answer-key cross-check brief (MANDATORY GATE before PUBLIC)

**Read `PHYSICS_CROSSCHECK_BRIEF.md` and follow it.** Its verdict vocabulary, equivalence
and rounding rules, evidence standards, and the instruction to report the DIFFED denominator
honestly all apply unchanged. This file is the delta.

## THE STRUCTURAL DIFFERENCE: there are TWO keys, one per stream

Physics has one answer source. Chemistry has two, and they answer different questions:

| Our rows | Key source | Covers |
|---|---|---|
| `Ex <n>.m` | the end-of-book `*an.pdf` — rendered to `out/_answers/<chapterId>/ak-NN.png` | the Exercises |
| `Intext <n>.m` | the **chapter's own LAST PAGE**, under a heading "Answers to Some Intext Questions" — in `out/<chapterId>/p-NN.png` | most of the Intext stream |
| `Eg <n>.m` | — | **SKIP.** A worked example prints its own solution; there is nothing external to diff. |

**Both keys are partial by design.** The intext heading literally says "*Some*". A question
with no entry is `NO-KEY-ENTRY`, not a defect — the Physics brief's rule, applying to both
streams here.

In the end-of-book key, find your chapter's `UNIT <n>` heading and read only to the next one.
Several units share a page.

## The trap this chapter is built around

Intext Questions and Exercises are **both numbered `<n>.1, <n>.2, …`**. So the two keys
contain the same-looking labels for different questions. **Never match a key entry to a row
by number alone — match it within the correct stream and its own key source.** Diffing an
Intext answer against the Exercise key (or the reverse) manufactures findings that look
exactly like real ones.

## Chemistry equivalence — agree on these, they are not defects

Report the mechanism in `note` rather than a verdict where the difference is one of these:

- **Unit convention.** `\(2.86 \times 10^2\)` bar and `282` atm are the SAME Henry's constant.
  So are Pa/kPa/bar/torr/mm Hg pairs. Convert before judging.
- **A different atomic mass table** (Co 58.9 vs 59) shifts a molar mass in the third
  significant figure. Agree if the answer matches to the key's stated precision.
- **The dilute approximation.** `x₂ ≈ n₂/n₁` versus the exact mole fraction differs by ~1%
  on these questions. Both are defensible; say which side used which.
- **Molality vs molarity basis** where a stem's wording is genuinely ambiguous ("per kg of
  water" = solvent, or the solution?). Our authors flagged these in `_note` — read those
  notes BEFORE scoring, and treat a difference that traces to the stated reading as a
  reading difference, not an arithmetic error.
- **van't Hoff `i`** taken as the ideal integer versus a value derived from a given `K_a`.

## What the authoring pass already flagged

Every authored row may carry a `_note`. Those are hypotheses recorded by an author who was
FORBIDDEN from looking at either key — several name the exact alternative reading a key might
have taken. Read them first: they will explain most disagreements, and where one does, the
verdict is `AGREE` with the mechanism recorded.

Where the note says the BOOK's data look unphysical, that is for you to adjudicate — you are
the only pass that sees both sides.

## Output

`scripts/ncert/data/<chapterId>.crosscheck.json` — `{ref, verdict, ourAnswer, keyAnswer, note}`,
verdicts `AGREE | OUR-ANSWER-WRONG | BOOK-KEY-WRONG | NO-KEY-ENTRY | CANT-READ-KEY`.
Write it with the **Write tool**, never a shell heredoc.

Report the tally, the DIFFED denominator per stream separately (exercises and intext are
different keys and deserve separate counts), and one line of justification per non-AGREE row.
**You do not write errata brackets and you do not flip anything PUBLIC** — the maintainer
adjudicates your findings.
