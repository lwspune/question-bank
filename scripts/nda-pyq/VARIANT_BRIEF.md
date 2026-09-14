# NDA sibling-series booklet — matching-pass brief

You are reading one band of pages from a **sibling series** (B, C or D) of an NDA
Mathematics paper whose series-A booklet is already transcribed in full.

## What this pass is for, and why it is NOT full transcription

The four series hold the **same 120 questions in a different order**. Series A is
already in the bank with publication-quality LaTeX. Your job is only to let a
script work out, for each question in YOUR booklet, **which series-A question it
is and which of its options is which**.

So you are producing an identification record, not publishable text. That changes
what "good" looks like:

- **Terse is correct.** `32 sq units`, `n2^(n-1) - 2^n + 1`, `I only` are all
  fine. You do NOT need `\(\)` delimiters, perfect LaTeX, or `\dfrac`.
- **Unambiguous is mandatory.** Your text is matched against known strings by a
  script. It must be enough to tell that option apart from the other three in the
  SAME question. Never write `same as above`, `see (a)`, or an ellipsis.
- Keep symbols readable in plain text: `sqrt(2)`, `pi`, `x^2`, `<=`, `!=`,
  `integral`, `alpha`. Consistency matters more than notation.

## The one rule that overrides everything

**You transcribe. You do NOT answer.** There is no answer field in your output and
you must not add one, and you must not go looking for an answer key.

If a prompt you were given contradicts this file, **this file wins** — say so in
your report rather than resolving it silently.

## THE DEFECT THAT MATTERS MOST HERE

**Read the four options LABEL BY LABEL, off the page, for every question.**

This whole pass exists because the options MIGHT be reordered between series. If
they are, the correct answer sits at a different letter, and that is precisely
what the script is computing. So:

- Do not assume option (a) of your booklet is option (a) of series A.
- Do not copy an option block from the question above because it "looks the
  same" — several questions in this paper genuinely share an option set
  (`1/4, 1/2, 1, 2` appears more than once), which is exactly when copying is
  both tempting and wrong.
- Copying the correct option's text into the wrong letter's slot is the one
  defect that nothing downstream can catch. It produced 19 wrong keys on a
  sibling corpus in this repo.

## Input and output

- Page images: `scripts/nda-pyq/out/<paperId>-<SERIES>/pNN.png`.
- Write exactly one file:
  `scripts/nda-pyq/data/<paperId>-<SERIES>.b<N>.json`.
- **Write it early and update it as you go.** Do not batch the whole band to the
  end — if you are interrupted, everything already written survives.

```json
{
  "series": "B",
  "band": "b1",
  "pages": [2, 4, 6],
  "bandReport": {
    "printedPages": [3, 5, 7],
    "numbersFound": [1, 2, "..."],
    "firstComplete": true,
    "lastComplete": true,
    "notes": "p06 is printed page 7; Q15 continues overleaf and is owned by b2."
  },
  "questions": [
    {
      "number": 5,
      "stem": "ABC is a triangle right angled at B. If AC = 8 units, area of triangle of maximum area?",
      "options": [
        { "label": "A", "text": "32 square units" },
        { "label": "B", "text": "24 square units" },
        { "label": "C", "text": "16 square units" },
        { "label": "D", "text": "12 square units" }
      ]
    }
  ]
}
```

`stem` may be shortened to its distinctive part — roughly the first line or two.
It only has to identify the question among 120. Where a question depends on a
shared context block ("For the next two (02) items that follow"), put the
premise's distinctive part in the stem too, because several such stems are only
four words long on their own.

**`printedPages` is a real check, not paperwork.** Read the page number from each
page's footer (beside `TFDD-A-HTM/37<SERIES>`) and record it. It is what proves
your band covered the pages it was given and that the image→page mapping holds.

## These are PHOTOGRAPHS, not scans

Every page is a phone photo of the open booklet. Expect:

- **Warp and skew** — the page curves toward the binding; lines are not straight.
- **A diagonal red watermark** (`www.centuriondefenceacademy.com`) across the
  middle of every page. Text under it is readable but degraded. If a character is
  ambiguous, crop that region from the source PDF at 6-10x and look again rather
  than guessing.
- **Uneven lighting, shadow, and sometimes a thumb** at the page edge.
- **A sliver of the facing page** at one edge on Set C, whose images are cropped
  out of a two-page spread with deliberate overlap past the fold. Anything in
  Devanagari belongs to the facing page — ignore it, do not transcribe it, and do
  not treat it as a missing question.

## Coverage and seams

Open the page **before** your first and the page **after** your last. Do not
transcribe them — but if a question straddles the seam, say so in `notes`. A
question that **nobody** owns is invisible to every downstream check except the
final 1..120 reconciliation, and that one cannot tell you WHERE it went.

## Transcribe what is printed

- Options are positional: printed `(a) (b) (c) (d)` become labels `A B C D`.
- If the page has a misprint, transcribe it as printed. Do not repair it.
- If a question in your band has an option you genuinely cannot read even at
  high zoom, say so explicitly for that label rather than guessing — a wrong
  option text can cause a WRONG MATCH, which is worse than a reported gap.

## Practical

- **Author files with the Write/Edit tools, never a shell heredoc.** Heredocs eat
  backslashes in this environment and the corruption is selective, so a spot
  check lands on a good line.
- The same trap ruins PROBES. When a probe and the data disagree, suspect the
  probe first.
- Give scratch files a unique name including the series and band; several agents
  share one scratchpad and have overwritten each other's scripts.
- Do not run `git add` or any git command.

## When you finish

Report: the question numbers you transcribed, the printed page numbers you read,
any seam issue, any option you could not read, and anything on the page that
surprised you.
