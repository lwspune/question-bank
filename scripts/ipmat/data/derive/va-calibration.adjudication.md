# VA calibration — adjudication of the 3 leads

**Score pinned first** (`va-calibration.score.json`, packet commit `ed843adb`): 40 scored,
37 agreed, **92.5% agreement**. Adjudicating a row destroys the measurement for it, so the
number above was frozen before anything below was read.

## What this measures

**Agreement between one blind pass and afterboards' own derivation, on a 40-row stratified
sample of the 582 committable Verbal Ability rows (6.9%).** It is not accuracy. IIM Indore
publishes no key, so there is no ground truth here at all — only two derivations.

Blindness is **ordering only**: one agent derived all 40 from a packet carrying no answer,
froze the answers, then scored. That is weaker than the dual-reader setup it imitates, and
weaker than the CDS 2026-II measurements where an official key existed.

## The three leads

| Row | Mine | Source | Verdict |
|---|---|---|---|
| Indore 2024 VA Q6 | C | D | **My error.** Source better supported. |
| Rohtak 2019 VA Q24 | B | A | **My error**, by test convention. |
| Rohtak 2020 VA Q6 | C | A | **Ambiguous item.** Both answers are correct English. |

### Indore 2024 VA Q6 — my error

"Which one of the following statements is correct?" I chose C, *"The 50 most polluted cities
in the world are in India"*, which the passage plainly contradicts: it says **42** Indian
cities are *among* the 50. The source's D, *"Industrialization makes Begusarai the most
polluted city in the world"*, is partly supported — the passage does call Begusarai the
world's most polluted city and notes it is "partly industrialized, housing among others an
oil refinery", even while adding that it is "primarily agrarian".

Neither option is cleanly correct, which is why I flagged the row while deriving. But D is
the more defensible reading and C is refutable from the text. **Source key stands.**

### Rohtak 2019 VA Q24 — my error, by convention

*"Should powerful nations attack relatively weaker nations which pose probable danger to
world peace?"* with (1) "Yes. War is justified for the noble purpose of peacekeeping" and
(2) "No. War/violence should never be resorted to."

I answered B ("only 2"). Under the standard strong-arguments convention, an absolutist
assertion with no reasoning specific to the question is the **weak** one, and the argument
that supplies a purpose is the strong one — so "only 1" is the conventional answer.
**Source key stands.** I applied a moral reading where the item wanted a test convention.

Worth noting separately: this row's **option labels are mismatched to its stem**. The stem
asks which argument is strong; the options say "implicit", which belongs to an
assumptions question. That is a defect in the source's transcription of the item, not in
the key, and it should be fixed before the row ships.

### Rohtak 2020 VA Q6 — genuinely ambiguous

Join "The unemployment rate has dropped sharply this quarter" and "It may only be
temporary". I chose *though*; the source chose *but*. Both produce correct, coherent,
idiomatic English, and the instruction ("best possible way without changing the intended
meaning") does not separate them. **No error on either side.** The item is under-determined
and cannot be scored reliably in either direction.

## What follows

**Zero wrong keys were found in the source across 40 VA rows.** Two disagreements were my
errors and one was an ambiguous item. So on this sample the source's VA keys are better than
the 92.5% agreement figure suggests — agreement was limited by the weaker party, which was
my pass, not theirs.

That is a materially better result than feared, and it does **not** license skipping
derivation:

- n = 40 of 582 VA rows. One clean sample is not a base rate.
- Agreement cannot see **correlated error** — a misconception we both share is invisible
  here by construction. This project measured exactly that gap on UPSC CSE, where two
  independent passes that AGREED were still right only 94.4% of the time.
- **Confidence was well calibrated**, which is the usable product: all 3 leads were rows
  flagged as uncertain during derivation. A larger pass should record a confidence flag per
  row and re-check the non-HIGH band first.

**Recommended next step:** a QA/LR sample of comparable size, then a decision on full
derivation per section rather than for the corpus as a whole. Quant is self-verifying and
cheap to check; VA now looks lower-risk than assumed; LR is still entirely unmeasured.

## One more defect, and one more lying probe

Adjudicating Rohtak 2019 VA Q24 surfaced a defect class worth measuring: a stem that asks
which ARGUMENT is strong, carrying options that talk about what is IMPLICIT — which belongs
to an assumptions question. A scan found **exactly one** such row, this one. It is a
transcription defect in the source, not a wrong key, and the row should have its options
corrected before it ships rather than being excluded.

The scan first reported **two**. The second, Rohtak 2020 VA Q17, was a false positive: its
option text reads "self-sufficiency in food clothes and **simplicity** of the lifestyle",
and `s·implicit·y` contains the substring `implicit`. A word-boundary match would not have
fired. Recorded because it is the third probe in this pipeline to report a defect that was
its own, after the pipe check that counted absolute-value bars and the stray-dollar check
that flagged correctly-escaped `\$250`.
