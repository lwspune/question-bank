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

> ⚠️ **`render.ts` here has NO `--answers` flag** (the `mh-sb-9` one does). Until it is ported,
> render the answer block with a one-off PyMuPDF call writing into `out/_answers/<chapterId>/`.
> Do NOT re-run `render.ts <chapterId>` to get them: it rmSync's the chapter's page PNGs, which
> destroys the images any in-flight transcription agents are reading.

**2b. PLAN TRANSCRIPTION BANDS FROM A `Solution :` SCAN, NOT FROM SECTION BANNERS.**
This is the single most expensive mistake made on this book so far — it stranded questions in
two consecutive chapters. A banner scan (`SOLVED EXAMPLES` / `EXERCISE N.M` / `MISCELLANEOUS`)
finds only the BOXED blocks, but the book also embeds worked examples with printed solutions
directly in the theory narrative, and the brief says those are `solved` rows too. In Ch.5 the
boxed blocks account for ~18 of the chapter's **29** `Solution :` markers; the other ~11 sat in
the theory and were invisible to a banner scan. Before dispatching, run a per-page count:

```
for each page: len(re.findall(r'Solution\s*:', text)),
               re.findall(r'Ex\.?\s*(\d+)?\s*:', text),
               'SOLVED EXAMPLES' in text.upper(),
               re.findall(r'EXERCISE\s*[:\-]?\s*(\d+\.\d+)', text)
```

then reconcile: every page carrying a `Solution :` must fall inside some band. (The regex
under-counts — it misses solutions typeset without a colon — so treat a page with `Ex.` markers
and zero `Solution :` as suspect rather than empty.) Two further rules earned the same way:

- **Cut bands at BLOCK boundaries, never page boundaries.** A solved run or an exercise must sit
  wholly inside one band. Where two blocks share a page, name the split point explicitly in both
  prompts and say who owns which side.
- **Tell every agent to REPORT on content it does not own.** Each of the four gaps found in
  Ch.1/Ch.5 was recovered only because an agent described what it saw in a neighbour's territory
  instead of silently ignoring it. This instruction is doing more work than the boundaries.
- **Theory-embedded examples need sub-section-scoped refs** (`5.1.3 SolvedEx.1`, `5.2.5
  SolvedEx.1`), because the bare `<N.M> SolvedEx.<n>` namespace belongs to the boxed block and
  the book reuses its `Ex.` numbers across both.

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

**5b. A chapter may print MORE THAN ONE Miscellaneous block, and the default refs collide.**
Ch.4 Determinants and Matrices prints `MISCELLANEOUS EXERCISE - 4 (A)` mid-chapter (closing the
Determinants half) and `- 4 (B)` at the end (closing Matrices), each split into part (I) MCQ and
part (II) free-response — four blocks, where `Misc I `/`Misc II ` gives only two names. That
chapter uses `Misc 4A I `/`Misc 4A II `/`Misc 4B I `/`Misc 4B II `. Decide this BEFORE dispatching
transcription: refs route the `/board` structure, so discovering it afterwards means re-transcribing
them. Check for a second `MISCELLANEOUS` banner in the exercise-banner scan (§2b).

Related: where a section carries **two boxed solved blocks** the book restarts `Ex. 1)` in each, so
a bare `<N.M> SolvedEx.<n>` namespace collides. If the section has numbered sub-sections use those
(`4.3.1`/`4.3.2`/`4.3.3`); if it does not, suffix the second block (`4.5b`) — Ch.4 needed both.
Do NOT solve the collision by numbering continuously across the blocks: `assignSections` routes by
prefix, so the reader would then render a post-exercise solved block BEFORE the exercise it follows.

**4b. For an IDENTITY chapter, verify every printed identity NUMERICALLY before proving it —
and not at convenient angles.** A corrupted trigonometric identity still reads like an
identity, so nothing but evaluation catches it. Ch.3 shipped with **three printed identities
that are FALSE as printed**, and the sharpest of them (`Ex 3.1 Q2(ii)`) agrees with the correct
form at `θ = 0` — a spot-check at zero passes it. Conversely `Ex 3.3 Q3(xviii)` fails 0 of 7
sample points while its intended form passes 7 of 7; **that contrast is what turns "this looks
wrong" into evidence**, and it is what the errata bracket should quote. Use several assorted
angles (include a negative and an obtuse one); for triangle identities use two or three
genuinely different triangles, never only the equilateral case, where many false identities
coincidentally hold.

**5a. ORDERING: `apply-errata.ts` must be the LAST write. Never run `apply-solutions.ts`
after it.** `apply-errata` prepends the bracket to the live row and mirrors it into the
SOURCE — but for an EXERCISE row it mirrors into the transcription *band* fragment, which
`apply-solutions` does not read. So a later `apply-solutions --apply` rewrites that row's
solution from `<id>.<group>.solutions.json` and **silently drops the bracket**. Solved
examples are unaffected (their text lives in the band fragment).

Bit us on Ch.9: an OMML fix after the errata pass required a re-run of `apply-solutions`,
which destroyed **9 of 17** brackets. The DB count is the only place it shows —

```sql
select count(*) filter (where solution like '[Textbook%') from questions where source_file = '…';
```

— so check that against the entry count in `<id>.errata.json` before flipping PUBLIC.
`apply-errata` is idempotent (it skips a solution already starting with `[`), so the repair
is simply to re-run it.

**5c. Run `npm run audit:omml -- <source_file>` before calling a chapter done.**
It is scoped, cheap, and it checks the WORD EXPORT, which no other gate touches — an
unconvertible math zone renders fine on the web (KaTeX) and degrades to raw LaTeX in a
teacher's downloaded paper. Known failure found on Ch.9: the converter cannot render a
**superscript applied to a parenthesised group containing `\cup` or `\cap`** — `(A \cup B)'`
and `(A \cup B)^{c}` both fail, while `A'` and `(A + B)'` are fine. Write the complement of
a group as `\overline{A \cup B}`. Probability and Sets chapters are where this bites; test a
candidate through `findOmmlFailures` rather than guessing which form converts.

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
