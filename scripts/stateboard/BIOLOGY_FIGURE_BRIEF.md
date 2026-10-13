# Figure crop brief: Balbharati BIOLOGY, Std XI and Std XII

Step 7 of the state-board runbook for the two Biology books (`<lane>` is
`scripts/stateboard` for Std XII, `scripts/mh-sb-11` for Std XI). Companion to
`BIOLOGY_BRIEF.md` and `BIOLOGY_SOLUTION_BRIEF.md`.

Two kinds of figure, both cut off the rendered book page as a box in page FRACTIONS
(`[x0, y0, x1, y1]`, 0 to 1, origin top left):

1. **Question figures**: a question the student cannot answer without the picture
   printed with it (`<id>.figneed.json` lists them, with page and what).
2. **Answer figures**: the book's own figure shown as the model answer to a "draw a
   labelled diagram" question (`<id>.diagram-answers.json`, with figure name, page,
   what; an entry with `"figure": null` is a decision that no book figure fits; leave
   it alone).

Direct boxes, not snapCrop anchors: these figures are coloured, and snapCrop's ink
threshold cannot see pale art (scripts/lib/figures/README.md). That makes the
visual check below the only thing standing between a clipped figure and a student.

## Pages

`<lane>/out/<id>/p-NNN.png` are the rendered pages, named by the page index the
JSON files use. VIEW the page. The Read tool tells you when it shows an image
scaled down ("displayed at W x H"): take fractions from the DISPLAYED size,
x / W and y / H, and they hold at any scale.

## 1. Question figures

For every entry in `<id>.figneed.json`, find the figure printed WITH that question
(in the exercise, not the matching figure elsewhere in the chapter, unless the
question only names a chapter figure and prints none) and write
`<lane>/data/<id>.figs.fig.json`:

```json
[{ "ref": "Ex Q7(3)", "page": 38, "bbox": [0.12, 0.40, 0.88, 0.62] }]
```

The box takes in the whole drawing and every letter, pointer and label printed on
it (A, B, C, i, ii...). It leaves out the question's own words above it and the
next question below it. Where one question prints several drawings, one box takes
them all if they sit together; otherwise tell me (one ref takes one image).

Then crop: `npx tsx <lane>/attach-images.ts <id>` (DRY RUN only, never `--apply`).
Crops land in `<lane>/out/<id>-figs/fig-*.png`.

## 2. Answer figures

For every entry in `<id>.diagram-answers.json` whose `figure` is not null, add a
`"bbox"` to that entry (keep every other field as it is). The box takes in the
drawing and all its labels and leader lines; it leaves out the `Fig. x.y ...`
caption and any body text beside or below. A figure with two panels where the
question wants one (the `what` says so) is boxed to that panel only.

Then crop: `npx tsx scripts/lib/figures/crop-answer-figures.ts <lane-folder> <id>`
(`stateboard` or `mh-sb-11`; DRY RUN, never `--write`). Crops land in
`<lane>/out/<id>-answerfigs/ans-*.png`.

## Check every crop: VIEW it

For each PNG, Read it and confirm:
- **Complete:** nothing cut at any edge: no half a label, no leader line running
  off to nothing, no missing letter the question or answer names. Read the
  question (and for an answer figure, the labels the answer text lists) and tick
  each named label off on the image. A label hugging the edge is the usual miss.
- **Clean:** no question text, no next question, no caption, no running header,
  no page number, no neighbouring column.

Fix a box and re-crop until every crop passes. Measure from the page, not by
nudging blind.

Write with the **Write tool** (or a small node script for the JSON edits), never a
heredoc. Do not touch any other file, never pass `--apply` or `--write`, never
write to the database.

## Report back

Per chapter: each ref with a one-line verdict ("complete + clean" or what is
wrong), every figure you could not box cleanly and why, and the size of any PNG
over 900 KB.
