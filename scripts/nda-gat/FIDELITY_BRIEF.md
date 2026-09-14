# NDA GAT sibling-series booklet — fidelity / matching pass

You are reading one band of pages from a **sibling series** — **B**, **C** or
**D** — of the NDA II 2026 GAT paper whose Series **A** booklet has been
transcribed in full and is the base.

**Your dispatch names your series and your pages. Everything below that says
`<SERIES>` means that letter.** The per-series facts that differ — what the
booklet physically is, and what can go wrong with it — are in
**[Your booklet](#your-booklet)** near the bottom. Read that section for your
series before you start; the rest of this file applies to all three.

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
2. **It is the source of record for your series' solution document.** Your
   question NUMBERS are kept, not discarded. Getting a number wrong does not just
   lose a match — it puts the wrong answer beside the wrong question in a
   document a student reads.

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

## Student pen marks are NOT answers

These are photographs of booklets that were **sat by candidates**. Series D's
scan is heavily marked — **options circled in pen**, arrows and ticks filling the
margins — and B and C have not been checked for it, so apply this rule whatever
you find. Ignore all of it. Do not record it, do not let a circle nudge how you
read an option, and do not mention it as though it were evidence. It is
frequently wrong, and treating it as a key would silently poison both the map and
the fidelity check.

## Do not assume the options are in the same order as Series A

They may or may not be. **Measuring that is part of what this pass is for**, so a
guess destroys the measurement. Read label by label and let the script work it
out.

Also: do not copy an option block from the question above because it "looks the
same". Dozens of GAT questions genuinely share an option set
(`I only / II only / Both I and II / Neither I nor II`), which is exactly when
copying is both tempting and wrong.

## Your pages

Images are `scripts/nda-gat/out/2026-2-<SERIES>/p<PRINTED>.png` — **named by the
page number printed in the booklet's own footer**, not by a PDF index. All three
series render to the same 26 English pages: **2–7, then every odd page 9–47.**

**Read the footer of every page and record it.** It reads `( 23 - <SERIES> )` at
the foot centre, with `TFDD-B-AGT` at the foot left. Two things it proves:

- The page is the one you think it is.
- **The series is yours.** If a footer's letter is not your series, you have been
  handed the wrong booklet — stop and report it.

**`TFDD-B-AGT` IS THE PAPER CODE AND IS IDENTICAL IN ALL FOUR BOOKLETS.** Its
`B` is not a series marker. The series is *only* the letter in `( N - X )` at
foot centre. Do not confirm your series from the foot-left code.

**If you see a page of Devanagari, STOP AND REPORT IT — do not transcribe it and
do not skip past it.** The renderer selects English pages from a page list in
`config.ts`; a Hindi page means that list is wrong, which means other pages are
wrong too, which means questions will go missing **silently**. This is a finding
about the pipeline, not a page to work around.

**If your band ends at one printed page and the next begins two pages later, the
question numbers will jump. Record the jump in your `notes` — never renumber
around it and never invent the missing items.** A measured gap is a finding; a
silently-closed one is a corpus with wrong answers in it. Series D's first scan
was missing printed pages 4 and 5 and so lost Q21–36 outright; that gap is now
closed (see [Your booklet](#your-booklet)), but the rule it taught is live.

Where a character is ambiguous, **crop that region from the source PDF at 6–10×**
and look again rather than guessing. A wrong option text here causes a WRONG
MATCH or a false fidelity finding, both of which are worse than a reported gap.

## Your booklet

All three are **upright (portrait), one printed page per image, two columns**,
and all three are materially cleaner than Series A. Common hazards: warp toward
the binding, uneven lighting, a thumb or a bright flare at an edge, pen marking.

### Series B — the FULL BILINGUAL booklet

The only one of the three whose English pages had to be **selected**. The source
holds 47 images: a cover, then Part A as **six consecutive English pages** (there
is no Hindi counterpart for an English test, so this stretch is *not* a parity),
and from there Part B alternates **Hindi first, then English**.

**So the Devanagari rule above matters most here** — B is the booklet where a
wrong page list is physically possible, because the Hindi pages really are in the
file and really were skipped over to build your render.

Roughly 2175×2748 to 2250×3000 real pixels per page.

### Series C — an English-only extract

Cover and every Hindi page were already dropped upstream, so the render is the
whole file. The tell that it is an extract: printed 8 (the Hindi Part B page) is
absent, so printed 7 is followed directly by printed 9.

**This is the highest-resolution scan of the four** (~2600–2800 × 3400–3800 real
pixels a page, against Series A's ~1239×1632), so if you need a 6–10× crop it
will repay you more here than anywhere else.

### Series D — an English-only extract, already matched

Same shape as C. **Its gap is closed and this note is history, kept so nobody
re-opens it:** the first Set D scan was missing printed pages 4 and 5 — Part A,
with no Hindi facing page to recover from — so 16 questions (Q21–36) had no
source at all. A complete 26-page scan landed 2026-09-14 and carries both; band
d7 transcribed them and the match went 134/134 → **150/150**. `config.ts` records
the earlier scan under `priorScan`, because bands d1–d6 were read off it.

A diagonal red watermark (`www.defenceguru.co.in`) crosses the middle of the
FIRST scan. The complete scan carries none, so its ABSENCE is not a reason to
doubt the booklet — a watermark is added by whoever republished the paper and
says nothing about which series you hold. Trust the footer.

### Part A paginates DIFFERENTLY in each series

Questions per Part A page — B: **5/10/8/7/10/10**, C: **10/6/6/8/10/10**. So a
band plan written for one series must never be reused for another, and neither
must an expectation of which questions sit on a given page.

## Output

Write exactly one file: `scripts/nda-gat/data/2026-2-<SERIES>.d<N>.json`.

**The `d` in `d<N>` is a literal band prefix for every series, not a "D".** The
matcher globs `<id>-<S>.d<name>.json`, anchored so it cannot swallow the map file
or a scratch artifact; your series is already in the filename before the dot. So
Series B's third band is `2026-2-B.d3.json`.

**Write it early and update it as you go.** Do not batch the whole band to the
end — if you are interrupted, everything already written survives.

Set `series` to YOUR letter — the example below is written for Series B:

```json
{
  "series": "B",
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
