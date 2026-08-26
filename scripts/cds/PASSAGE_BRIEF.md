# CDS passage backfill — the contract

Restoring the reading-comprehension and cloze passages that were never
transcribed. 58 sections across 15 papers currently hold a placeholder reading
`(Passages not stored — refer to the source booklet: …)`, and **367 PUBLIC
questions are unanswerable as a result** — they sit in live mocks where a wrong
answer costs marks.

## What you change, and what you must not

You edit **one field**: the `passage` of the named sections in
`scripts/cds/data/<paper>.sections.json`. Optionally also that section's
`directions`, and only when the booklet's printed directions differ materially
from the paraphrase already there (the booklet's own wording is preferable).

**Never** touch stems, options, answers, `qFrom`/`qTo`, `setLabel`, or any other
file. A wrong passage is worse than no passage, and a changed stem changes
`content_hash`, which mints a new row and orphans its paper memberships.

## Five things the pilot learned the hard way

1. **The booklet is TWO COLUMNS.** Reading order is left column top→bottom, then
   right column top→bottom. On the pilot, the right column alone yielded a
   passage that looked complete — and the word the question asked about
   (`dilettantes`) was in the *left* column. A truncated passage that looks whole
   is the main failure mode here.

2. **One section can hold MORE THAN ONE passage.** The pilot's S7 covered Q51-60
   with `Passage – I` (Q51-55) and `Passage – II` (Q56-60) under a single
   Directions block. Put **all** of them in that section's `passage` field, each
   under its printed heading, in printed order.

3. **A passage can span a page break.** Follow it to its end; do not stop at the
   bottom of a page.

4. **Verify against the questions, not by eye.** For every question in the
   section's range, identify the specific words the answer depends on and
   confirm they are in what you transcribed. If a question asks the meaning of a
   word, that exact word MUST appear. If it cannot be found, you have transcribed
   the wrong or a partial passage — go back.

5. **Transcribe VERBATIM.** Preserve the booklet's spelling, punctuation, em
   dashes, and curly quotes. Do not correct the booklet, modernise spelling, or
   paraphrase. If the booklet misprints something, keep it.

## Encoding — non-negotiable

Write passage text with the **Write/Edit tool**, never a shell heredoc. On this
machine a heredoc encodes as cp1252 and silently mangles em dashes and curly
quotes into invalid UTF-8. Then confirm your file contains no U+FFFD and no
control characters.

## Cloze sections

A cloze passage is prose with numbered blanks. Transcribe the blanks as printed,
keeping the question number visible so a student can match blank to item — e.g.
`… the horse was ___(71)___ by the noise …`. The blank markers are the whole
point; a cloze passage without them is unusable.

## How to work

```
# page count + render a page (0-based index)
python -c "import fitz; d=fitz.open(PDF); print(len(d))"
python -c "import fitz; d=fitz.open(PDF); d[N].get_pixmap(matrix=fitz.Matrix(4,4), clip=fitz.Rect(x0,y0,x1,y1)).save(OUT)"
```

These booklets have **no text layer** (pure scans), so every read is visual.
Page width is ~573pt: the left column is roughly x 8–286 and the right x 282–573.
Render a column in two vertical halves at zoom 4 for legibility. To locate a
section quickly, render all pages small into one contact sheet first.

Put scratch renders in your own scratchpad directory under a filename unique to
you — several agents run at once and a generic name gets overwritten.

## Report back

Per section: the set label, the character count written, the passage headings
found, and — for each question in the range — the phrase you verified its answer
against. Flag anything you could not verify rather than guessing, and say
explicitly if a question still looks unanswerable from the passage you found.

## If the API blocks your output

A turn can come back as `400 Output blocked by content filtering policy`. It is a
server-side block on the RESPONSE, so **nothing was written** - the tool call
never reached the file. Trust `audit-passages.ts`, never the agent's own account
of what it did.

**The cause is LENGTH, not content - measured 2026-08-26.** A passage that
blocked as one block went through cleanly when written a paragraph at a time,
same text, same session. So do not try to reword, summarise or sanitise a
passage to get past it; that would break the verbatim rule for no reason. Just
write it in pieces.

**The mechanism: chunk files + `set-passage.ts`.** Write each paragraph to
`<scratchpad>/chunks_<paper>_<S>/NNx.txt` with the Write tool, then run

```
npx tsx scripts/cds/set-passage.ts <paper> <S> <chunkDir>          # dry run
npx tsx scripts/cds/set-passage.ts <paper> <S> <chunkDir> --apply
```

Leading digits are the PARAGRAPH number: `01a.txt` and `01b.txt` are two halves
of one paragraph (joined with a space), `01*` vs `02*` are different paragraphs
(joined with a blank line). Split a long paragraph across `a`/`b` rather than
inventing a paragraph break the booklet does not have. The script refuses to
overwrite a real passage, refuses U+FFFD and control characters, and writes the
committed 1-space JSON format so the diff is one line.

Work so a block costs one paragraph rather than one section:

1. **Write incrementally.** Transcribe one printed passage heading (or one
   paragraph) per Edit call, appending to the section's `passage`. Never build a
   4k-character block in one call.
2. **Do not echo the passage back.** In the report, quote at most a short phrase
   (under ~10 words) per question as the verification anchor. Pasting the passage
   into the summary emits the whole thing a second time for no gain.
3. **On a repeat block on the same text**, halve it and append the second half
   with an Edit anchored on the last sentence you managed to write.
4. **If it blocks deterministically on one small chunk**, that is content rather
   than length. Leave the section as a stub, say so, and move on - it is 1 of 62,
   and a wrong passage is worse than no passage.
