# NDA GAT sibling-series booklet — fidelity / matching pass

You are reading one band of pages from a **sibling series** (here, Series **D**)
of the NDA II 2026 GAT paper whose Series **A** booklet is being transcribed in
full by another team.

## What this pass is for

The four series hold the **same 150 questions in a different ORDER**. A script
will match your questions onto Series A's and produce a committed map:
*this series' question n is Series A's question m, and its option labels map
like so.*

That map does two jobs, and both matter:

1. **It is the fidelity check.** Your reading of a question's four options is an
   INDEPENDENT second reading of the same printed content. Where your option set
   or your label order disagrees with Series A's, one of the two transcriptions
   is wrong and a human goes back to the page. This is the control that the
   sibling CDS English corpus did not have when it shipped **19 wrong keys**.
2. **It is the source of record for a Series D solution document.** Your question
   NUMBERS are kept, not discarded. Getting a number wrong does not just lose a
   match — it puts the wrong answer beside the wrong question in a document a
   student reads.

## What is terse and what is NOT — read this twice

This is the one place this brief differs from an ordinary identification pass.

- **The STEM may be terse.** It only has to identify the question among 150.
  Roughly the first line, or the distinctive clause, is enough:
  `carrom striker 15 g hits coin 5 g, contact 3 ms, average force?` is fine. You
  do NOT need `\(\)` delimiters, perfect LaTeX, tables, or the full statement
  list.
- **The OPTIONS ARE NOT TERSE.** They are the thing being checked. Read all four
  **label by label, off the page**, and write what is printed. Keep symbols
  readable in plain text if you like (`sqrt(2)`, `pi`, `x^2`, `<=`, `Å`) — but do
  not paraphrase, do not shorten, and never write `same as above`, `see (a)` or
  an ellipsis.

## The one rule that overrides everything

**You transcribe. You do NOT answer.** There is no answer field in your output
and you must not add one. Do not go looking for an answer key.

If a prompt you were given contradicts this file, **this file wins** — say so in
your report rather than resolving it silently.

## Student pen marks are NOT answers — this booklet is FULL of them

Series D was sat by a candidate and the scan is heavily marked: **options are
circled in pen**, arrows and ticks fill the margins. Ignore all of it. Do not
record it, do not let a circle nudge how you read an option, and do not mention
it as though it were evidence. It is frequently wrong, and treating it as a key
would silently poison both the map and the fidelity check.

## Do not assume the options are in the same order as Series A

They may or may not be. **Measuring that is part of what this pass is for**, so a
guess destroys the measurement. Read label by label and let the script work it
out.

Also: do not copy an option block from the question above because it "looks the
same". Dozens of GAT questions genuinely share an option set
(`I only / II only / Both I and II / Neither I nor II`), which is exactly when
copying is both tempting and wrong.

## Your pages

Images are `scripts/nda-gat/out/2026-2-D/p<PRINTED>.png` — **named by the page
number printed in the booklet's own footer**, not by a PDF index.

**Read the footer of every page and record it.** It reads `( 23 - D )` at the
foot centre, with `TFDD-B-AGT` at the foot left. Two things it proves:

- The page is the one you think it is.
- **The series is D.** If a footer reads `- A )`, you have been handed the wrong
  booklet — stop and report it.

**THE PAGE GAP IS CLOSED — this paragraph is history, kept so nobody re-opens it.**
The FIRST Set D scan was missing printed pages 4 and 5, which are Part A and have
no Hindi facing page to recover from, so 16 questions (Q21–36) had no source at
all. A second, complete 26-page scan landed 2026-09-14 and carries both; band d7
transcribed them and the match went 134/134 → **150/150**. `config.ts` records the
earlier scan under `priorScan`, because bands d1–d6 were read off it.

**The rule the gap taught is still live and still applies to any future booklet:**
if your band ends at one printed page and the next begins two pages later, the
question numbers will jump. **Record the jump in your `notes` — never renumber
around it and never invent the missing items.** A measured gap is a finding; a
silently-closed one is a corpus with 16 wrong answers in it.

## The page images

Series D is **upright (portrait), one printed page per image, two columns**, and is
materially cleaner than Series A. Expect:

- A diagonal red watermark (`www.defenceguru.co.in`) across the middle — on the
  FIRST scan. The complete 2026-09-14 scan carries none, so its ABSENCE is not a
  reason to doubt the booklet. Trust the footer (`( N - D )` + `TFDD-B-AGT`),
  which is printed by UPSC and is the same on both scans; a watermark is added by
  whoever republished the paper and says nothing about which series you hold.
- Warp toward the binding, uneven lighting, a thumb or a bright flare at an edge.
- Heavy pen marking (see above).

Where a character is ambiguous, **crop that region from the source PDF at 6–10×**
and look again rather than guessing. A wrong option text here causes a WRONG
MATCH or a false fidelity finding, both of which are worse than a reported gap.

## Output

Write exactly one file: `scripts/nda-gat/data/2026-2-D.d<N>.json`.

**Write it early and update it as you go.** Do not batch the whole band to the
end — if you are interrupted, everything already written survives.

```json
{
  "series": "D",
  "band": "d2",
  "bandReport": {
    "printedPages": [9, 11, 13, 15],
    "numbersFound": [51, 52, "..."],
    "firstComplete": true,
    "lastComplete": true,
    "notes": "Q60 continues overleaf and is owned by d3."
  },
  "questions": [
    {
      "number": 6,
      "stem": "Despite the heavy rain, the match continued as scheduled — word class of 'Despite'",
      "options": [
        { "label": "A", "text": "Conjunction" },
        { "label": "B", "text": "Adverb" },
        { "label": "C", "text": "Noun" },
        { "label": "D", "text": "Preposition" }
      ]
    }
  ]
}
```

No `subject`, no `chapter`, no `difficulty`, no `context` — this pass produces an
identification record, and the taxonomy lives on the Series A row.

Where a question depends on a shared `Directions:` block, put the premise's
distinctive part into the stem too: several such stems are only four words long
on their own and would match the wrong question.

## Coverage and seams

Open the page **before** your first and the page **after** your last. Do not
transcribe them — but **report on what you see there**. A question that nobody
owns is invisible to every downstream check except the final reconciliation, and
that one cannot tell you where it went.

## Practical

- **Author files with the Write/Edit tools, never a shell heredoc.** Heredocs eat
  backslashes in this environment and the corruption is selective, so a spot
  check lands on a good line.
- The same trap ruins PROBES. When a probe and the data disagree, suspect the
  probe first.
- Give scratch files a unique name including your band; several agents share one
  scratchpad and have overwritten each other's scripts.
- Do not run `git add` or any git command.

## When you finish

Report: the question numbers you transcribed, the printed page numbers you read
off the footers, any jump in numbering across the missing pages, any seam issue,
any option you could not read (by question and label), and anything that
surprised you.
