# IMAT notes: authoring brief

The contract every IMAT notes chapter is written to, by hand or by an agent.
Model chapter: `src/lib/sites/imat/notes/physics/fluids/` (read all four files
before writing anything).

## What these notes are

Self-sufficient teaching notes for students preparing for IMAT, the Italian
ministry's medicine-in-English admission test. A student who reads a chapter
top to bottom should be able to answer any IMAT question on it, including the
parts of the official syllabus the past papers have not asked yet.

The IMAT paper since 2023: 60 questions, five options (A-E), 100 minutes.
Reading skills and knowledge 4 · Logical reasoning 5 · Biology 23 ·
Chemistry 15 · Physics and Mathematics 13. +1.5 right, -0.4 wrong, 0 blank.
Before 2023 the paper was set by Cambridge (more logic and general knowledge).

They are rendered by PYQ Vault's /notes components but are NOT part of PYQ
Vault: they live in `src/lib/sites/imat/notes/` and are registered only in
`src/lib/sites/imat/notes/registry.ts`.

## The evidence, and the one hard rule about it

`generated-papers/imat-notes/<subject>--<chapter>.md` lists every past IMAT
question in the chapter (2011-2026) with its correct option. Run
`npx tsx scripts/imat/notes/dump-chapters.ts` if the folder is missing.

**Never quote, translate, or closely paraphrase a past question, its numbers
or its options.** 2011-2022 belong to Cambridge and can never be published.
Use the evidence only to learn WHAT is tested, HOW OFTEN, and in what SHAPE
(a fact, a calculation, "which statements are correct"). Every worked example,
self-check and practice rep is original: new situation, new numbers, new
wording. Stating a fact a question relied on (water pressure doubles at about
10 m) is teaching, not quoting.

## Cover the syllabus, not only the questions

The chapter list comes from the questions, but the official syllabus is wider.
Cover every standard topic of the chapter at the level of a strong final-year
school course (Italian liceo / A-level / Class 12). Give tested topics more
depth and more traps; untested syllabus topics still get a concept each. Where
the ministry papers (2023+) and the Cambridge papers differ in emphasis,
follow the ministry papers.

## Files (write ONLY inside your chapter folder)

`src/lib/sites/imat/notes/<subject>/<chapter-folder>/`, where `<subject>` is
one of `biology`, `chemistry`, `physics`, `maths`, `logic`, `reading`:

- `chapter.ts` exports `IMAT_<CODE>_CHAPTER: ChapterNote`.
- One file per page, exporting a `SubtopicNote`.
- `index.ts` exports `IMAT_<CODE>_NOTES` (slug -> page, in teaching order),
  `IMAT_<CODE>_SLUGS = Object.keys(...)`, and re-exports the chapter. Exactly
  one export each ending `_CHAPTER`, `_NOTES`, `_SLUGS`.

Import types from `@/app/notes/_types`. Do NOT edit the registry, the types,
any component, any other chapter, or anything outside your folder.

## Shape

- **2-6 pages per chapter** (1-2 for a thin chapter), **2-5 concepts per page**.
  A page is a teaching unit; order pages and concepts so every term is
  introduced before it is used (foundations first, applications last).
- `chapterName` must equal the chapter name in the evidence file exactly.
- `subtopicName` on each page: a clear 2-5 word name for the page's topic,
  unique within the chapter (it will become a DB subtopic later).
- **Slugs**: every page slug and concept slug starts `imat-<code>-`, using the
  chapter code you were given. Never reuse a slug.
- `intro` (chapter): over 260 characters, 3-5 sentences. The FIRST sentence
  is a bank fact: "<Chapter> has N past questions since 2011, and the ministry
  papers from 2023 on have asked M of them." Use only those two numbers (the
  checker rejects any other "N questions" claim). Then say what kind of work
  the chapter demands and where the difficulty sits. Never list the pages.
- `whyItMatters` (page): one or two sentences of what the past papers ask on
  this page (years, shapes), no numbers you have not counted.

## Every concept (ConceptUnit)

`kind: "formula"` (a method or equation: needs `authoredExample`, and a
`formula` box when there is a recallable equation) or `kind: "reference"`
(named facts to learn: needs a `table` of 2-5 columns, every cell filled,
no dashes or blanks; drop a row rather than leave a cell empty). Recall-heavy
chapters (most of Biology, General Knowledge) are mostly reference concepts.

Every concept carries, in this order of teaching:
1. `intuition` (2-4 sentences, why it works), `definition` (`**bold**` key
   terms; `- ` bullets when list-shaped).
2. `formula` (formula kind, when there is an equation) with a `symbols` legend.
3. `authoredExample` (formula kind) or `table` (reference kind).
4. `selfCheckExample` **written as an IMAT question**: a `prompt`, exactly
   five `options` (no "(A)" labels inside them; the card adds the letters),
   `steps` that solve it and say why the tempting wrong options are wrong,
   and `answer` starting with the letter in brackets, e.g. `"(C) 80%"`.
   Spread the correct letter across the chapter (use at least three
   different letters; never all A). Distractors must be the mistakes students
   really make (wrong power of ten, the reversed ratio, the neighbouring fact).
5. `practiceSet`: 3-4 short reps `{ prompt, answer, method? }`.
6. `traps`: the misconceptions IMAT options exploit. At least 3 per chapter;
   aim for one on most concepts. Each trap states the wrong idea AND the
   right fact, standing alone.

Never set `pyqExampleId` or `visualizationSlug`.

The worked example, the self-check and each practice rep are DIFFERENT
problems (different numbers, not the same problem reworded), and none of
them may use a technique taught later in the chapter.

## Writing rules

- Plain English for a 17-year-old whose first language may not be English.
  Short sentences. No filler ("it is important to note"), no hype.
- **No em dashes or en dashes** anywhere, and no " -- ". Use a full stop,
  colon, comma or brackets.
- **Plain-text fields** take NO LaTeX and NO Markdown: chapter `title`, page
  `title`, `oneLineDefinition`, `whyItMatters`, concept `name`,
  `formula.label`. Use Unicode there (², ³, °, ×, →, ρ, Δ).
- Everywhere else, maths goes in `\\(...\\)` (inline) or `\\[...\\]` (display)
  inside the TS string, i.e. doubled backslashes. `formula.latex` is bare
  LaTeX (no delimiters). Chemistry: `\\(\\mathrm{H_2SO_4}\\)`, arrows
  `\\(\\rightarrow\\)`, equilibria `\\(\\rightleftharpoons\\)`; no `\\ce{}`.
  Never `\\iff`. Units in `\\text{}` inside maths.
- `concept.name` must make sense on its own ("Archimedes' principle: the size
  of the upthrust", not "The magic rule").
- Biology and chemistry facts must be textbook-correct and current (e.g. the
  fluid mosaic model, 2-3 ATP per NADH is approximate: say so).

## Check your own work

1. Re-derive every number in every example, self-check and rep with Python
   (`python -c "..."`), not in your head. A wrong worked example is the worst
   defect these notes can have; no automated check catches it.
2. Check that each self-check has exactly one defensible answer among the
   five options.
3. Run `npx tsx scripts/imat/notes/check-chapter.ts <subject>/<chapter-folder>`
   until it prints PASS.
4. Do NOT run `npm run typecheck`, `npm test`, the build, or any git command;
   the main session does those.

Keep tool output small: read files in chunks of ~150 lines, never `cat` a
large file whole. Write files with the Write tool, never a shell heredoc
(heredocs eat backslashes).

Final message: the folder(s), pages and concepts per chapter, the syllabus
topics you added that the past papers never asked, and anything you were
unsure of.
