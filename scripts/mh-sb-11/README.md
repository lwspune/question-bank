# MH State Board Class 11 Maths — ingestion pipeline

**The runbook is `scripts/stateboard/README.md`.** This pipeline is the Class-11 twin of the
Class-12 (`scripts/stateboard`) and Class-9 (`scripts/mh-sb-9`) ones: `lib.ts` re-exports the
State Board pure core VERBATIM, and every IO script here is its sibling with `./config`
repointed. Follow that runbook's steps 1-9 as written. This file records only what is
DIFFERENT about Class 11.

Exam: **Maharashtra State Board Class 11** (`mh-sb-11`, practiceOnly + boardExam).
Source: `C:\tmp\PYQPs\MHT-CET\State_Board\11th\Maths` — Part 1 (Ch.1-9) + Part 2 (Ch.1-9),
18 chapters, ~410pp. Class 11 is **not a board year**, so there are no PYQ papers to follow;
this textbook corpus is the whole bank for the exam.

## What differs from the sibling pipelines

**1. Transcription is VISION-ONLY. This is the single most important rule here.**
The text layer looks clean (~2k chars/page of readable prose) and is unusable for math.
Measured on Ch.2 Trigonometry I, 21pp: `√` (U+221A) occurs **once** and `/` occurs **once**,
against dozens of surds and stacked fractions on the pages. So the extractor yields
`3 2` where the book prints "root three over two", and `= - 3` for "tan 120° = −√3". Greek
letters, degree signs and relational operators survive, which is what makes the text layer
look safe. Never author a stem, an option, or an answer from extracted text. `dump-text.ts`
is retained only for locating block boundaries and prose-only checks.

**2. Pre-split chapter PDFs, whole-book answers.** Unlike Class 9 (two whole-book PDFs with
per-chapter `pages` ranges), the publisher ships `Part N_Chapterwise/Ch_NN_*.pdf`, so `pdf`
points at a whole chapter and `pages` is omitted. Those chapter files carry **no answers** —
`answersPdf` points at the whole-book PDF and `answerPages` at that chapter's block inside it.
The full answer-section map (Part 1 idx 225-241, Part 2 idx 205-221) is in `config.ts`.

Render answer pages to **`out/_answers/<chapterId>/`** — a SIBLING of `out/<chapterId>/`,
because `render.ts` does `rmSync(out/<chapterId>)` and would otherwise delete them (the same
trap `dump-text.ts` hit in `mh-sb-9`).

**3. Book layout is the Class-12 shape, not the Class-9 shape.** Interleaved `SOLVED EXAMPLES`
blocks, numbered `EXERCISE N.M` blocks, then `MISCELLANEOUS EXERCISE - N` split into part
**(I)** (MCQ) and part **(II)** (free-response). Refs therefore follow the Class-12 convention:
`Ex N.M Q<n>`, `Misc I Q<n>`, `Misc II Q<n>`, `<N.M> SolvedEx.<n>` — NOT Class 9's
`Practice set` / `Prob Q<n>`.

**4. Part 2 restarts at Ch.1.** The `syllabus_concepts` XI spine renumbers Part 2 continuously
(Complex Numbers is spine ch.10 = book Part-2 ch.1, i.e. book + 9). **Refs follow the BOOK**,
because that is what a student sees on the page and what `sections.ts` matches on. No
collision results — each chapter is its own `source_file`. Do not "fix" a Part-2 ref to its
spine number.

**5. Subtopics come from the book's own section headings**, via the XI spine in
`syllabus_concepts` (which was extracted from these very books), lightly merged where the book
splits one teaching unit across thin sub-sections. This follows the shipped `mh-ssc-10-text`
decision. They are not invented, and they are already authored for all 18 chapters in
`config.ts`.

**6. The step-6 answer-key cross-check gate IS feasible for every chapter** — both volumes
carry a full ANSWERS section including MCQ key tables. Run it; it is mandatory. Read the
answer pages as IMAGES (rule 1 applies to the answer section too).

## Book defects recorded so far
- The Part-1/Part-2 answer sections misspell three of their own headers:
  `DETERMINANTS AND MARTICES`, `PERMUTIONS AND COMBINATIONS`, `MISECLLANEOUS EXERCISE`.
  Navigation-only; do not carry those spellings into chapter names.
- Part 2 Ch.7 Limits prints `EXERCISE 7.6` then `7.8` with no `7.7` (visible in the book's own
  answers section) — a printed numbering gap, not a transcription miss.
- Publisher filename typos kept verbatim in `config.ts`: `Ch_04_Determinent_Matrices.pdf`,
  `Ch_07_Conics_Section.pdf`, `Ch_09_Diffrentiation.pdf`.

## Not applicable here
`audit-grounding.ts` and the HUMANITIES briefs from `mh-sb-9` are deliberately NOT copied —
they exist for a prose book with no answer key, and this book has answers for everything.
