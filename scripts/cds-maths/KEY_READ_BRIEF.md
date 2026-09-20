# CDS Elementary Mathematics — answer-key read brief

You are transcribing **one printed answer-key table** into JSON. Read this whole
file before you start.

## What you are doing, and what you are NOT doing

You are copying letters out of a table. **You are not answering anything, not
checking anything, and not reasoning about any question.** You will never see the
question paper and you must not go looking for it.

This is a *clerical* task on purpose. The maths is derived elsewhere, by a pass
that is deliberately blind to this file. If you were to reason about whether a
key letter "looks right", you would be doing that pass's job with its answer in
front of you, which destroys the only measurement this paper exists to produce.

## Why there are two of you

The key is a **scan** — zero extractable characters — so reading it is a vision
transcription of 100 table cells, and a vision transcription has an error rate.

A misread cell is uniquely nasty here: it manufactures a *false disagreement*
between the key and the derived answer, and a human then adjudicates a dispute
that never existed. So two readers transcribe the same table independently and
`parse-key.ts` refuses to emit a key unless **both reads agree on all 100 cells**.

You will not be told what the other reader saw, and you must not try to find out.
Two reads that were reconciled by talking to each other are one read.

## Input and output

- The key PDF's path and the **series page index** are in your prompt. The paper's
  own series is in the prompt too.
- Pre-rendered images live in `scripts/cds-maths/out/<paperId>-key/`:
  `seriesA_full.png` (whole page) and `seriesA_cols0..3.png` (column groups at
  high zoom). Prefer the column crops — the full page is an overview, not a
  reading surface.
- You may crop your own regions from the source PDF with PyMuPDF at any zoom.
- Write exactly one file, the path is in your prompt:
  `scripts/cds-maths/data/<paperId>.keyread<N>.json`

```json
{
  "series": "A",
  "sourceFile": "ProvAnsKey-ElMath-CDSE-II-26-160926.pdf",
  "pageIndex": 0,
  "readerId": "keyread1",
  "answers": { "1": "B", "2": "A", "3": "A" },
  "report": {
    "headerRead": {
      "totalQuestions": 100,
      "questionsDropped": 0,
      "questionsScored": 100,
      "subject": "EL. MATHEMATICS",
      "paper": "III"
    },
    "lowConfidenceCells": [],
    "notes": ""
  }
}
```

- `answers` keys are **strings** `"1"`..`"100"`, values are exactly one of
  `"A" "B" "C" "D"` (uppercase). All 100 present, none extra.
- `headerRead` is not paperwork. **Read the header boxes yourself.** If
  `questionsDropped` is not 0, some question was withdrawn and the whole
  downstream scoring changes — that must surface here, not be discovered later.

## THE TRAP: you are reading ONE series out of several

The key PDF carries **one page per series** (A, B, C, D). UPSC shuffles question
order between series, so the pages hold genuinely different letter sequences —
on this exam Series A's Q1 is `B` where Series B's Q1 is `D`, and they diverge
all the way down.

**Reading the wrong page produces a 100% wrong key that looks entirely
plausible.** Nothing downstream can detect it: it is well-formed, it covers
1..100, and it disagrees with the derivation on ~75 of 100 rows, which reads as
"the derivation collapsed" rather than "the key is the wrong series".

So, before transcribing a single cell:

1. Read the **Series** box in the page header yourself.
2. Confirm it matches the series named in your prompt.
3. Record what you saw in `report.notes`.

If it does not match, **stop and report**. Do not go hunting for the right page
on your own initiative — the page index you were given may be wrong for a reason
worth knowing about.

## Reading the table without losing your place

The table is laid out as **repeating `Q. No. | Key` column pairs across the
page**, not as one long list. On this exam that is seven pairs of fifteen rows:
1-15, 16-30, 31-45, 46-60, 61-75, 76-90, 91-100 (the last pair is short).

The failure mode is a **row-skip inside one column pair**, which silently shifts
every subsequent letter in that block by one. Two defences, use both:

- Transcribe **column pair by column pair**, and after each one check that the
  `Q. No.` values you read are consecutive with no gap and no repeat. The printed
  question number is next to every letter — *use it*, never infer a number from
  the row's position.
- Do not read across a row. Adjacent pairs are unrelated (row 1 holds Q1, Q16,
  Q31, Q46, Q61, Q76, Q91).

A cell you cannot read confidently goes in `lowConfidenceCells` as
`{"q": 47, "read": "B", "why": "ink bleed, could be D"}` **and** you still record
your best read in `answers`. Never leave a hole and never guess silently.

## Practical — how to write the file without silently corrupting it

**Author the file with the Write tool, never a shell heredoc.** Heredocs eat
backslashes in this environment. There is no LaTeX in this file, so the blast
radius is small, but the habit is the point.

**Probe your own output as a FILE, not a `python -c` one-liner** — one-liners have
their backslashes mangled before they run and report defects that are not there.
Assert, at minimum: exactly 100 keys; the key set is exactly `"1"`..`"100"`; every
value is in `A B C D`.

**Give every probe a canary.** Feed it a deliberately broken copy (drop Q50,
set Q7 to `"E"`) and confirm it goes RED before you trust a clean run. A probe
that has never fired proves nothing — on this corpus a validator's regex was
silently inert and returned green having checked nothing.

Give scratch files a unique name including the paper and your reader id. Do not
run `git add` or any git command.

## When you finish

Report: the series you confirmed off the page, the header numbers you read, your
count of transcribed cells, every low-confidence cell, and the letter
distribution (how many A / B / C / D). A badly skewed distribution — say 40 of
one letter — is worth mentioning; UPSC keys run fairly close to 25 each, so a big
skew is weak evidence you slipped a column.
