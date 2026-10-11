# IMAT twins

One original practice question per in-scope Cambridge question (2011-2022).
The Cambridge papers are private forever; the twin is what a student
practises on. Scope rule, data shape and checks: `lib.ts`. Files:
`twins/<year>.json`, one array per Cambridge year.

```sh
npx tsx scripts/imat/practice/check.ts               # checks every twin file + coverage table; exits 1 on a problem
npx tsx scripts/imat/practice/commit.ts all          # dry run of the database load
npx tsx scripts/imat/practice/commit.ts all --apply  # write (back up first: npm run db:backup)
```

In the bank the twins are PRIVATE practice questions (question_kind
'practice', written at insert), each with its solution, under source_file
`imat-twins-<year>.json` (roll back by that). Not publish_blocked: they are
ours. The Cambridge source is never written to the database. All 681 were
loaded on 2026-10-11 (577 text twins, then the 104 figure twins).

## Writing a twin

Keep from the source: section, chapter, the skill tested, the format
(numbered statements, row table, single answer, calculation) and the
difficulty. Change everything else.

1. **Write the stem from a blank page, not by editing the source.** Editing
   leaves the source's sentence frame behind ("X is in Group V of the Periodic
   Table. What is the shape...", "What is the formula of this oxide? [Ar
   values: ..."). On 2021 this happened on 7 of 26 twins and the originality
   check caught every one; the fix is to not start from the source's words.
2. **New situation, new numbers, new options.** A different organism, organ,
   compound or object; numbers that lead to a different answer; distractors
   built from real mistakes on THIS question (the forgotten factor of 2, the
   pOH reported as pH), not the source's distractors.
3. **Same answer value is a smell.** If your twin's correct answer equals the
   source's (same electron configuration, same formula), change the case.
4. **Spread the correct letter.** check.ts prints the running count; keep it
   level across A-E.
5. **Recompute every calculation by script** before committing, and check
   any "which of these is/are correct" item statement by statement in the
   solution.
6. **Solutions explain the trap**, not just the answer: name what the most
   tempting wrong option got wrong.

## General knowledge twins: static facts only

IMAT general knowledge is a fixed body of knowledge, not news. Of 67 Cambridge
general-knowledge questions only one concerned the previous three years, and
the ministry papers (2023-2026) ask classics, civics and economic concepts:
characters and their books, De Bello Gallico, the President's role in a
parliamentary system, the Hundred Years' War. The syllabus says the same
("placing historical and cultural phenomena in time and space; major national
and international institutions; law, economics and citizenship").

So a general-knowledge twin tests settled knowledge in the ministry's style:
classic literature and philosophy, history placed in time and space, how
institutions work (EU, UN, parliamentary systems, courts), basic economics.
Never a current officeholder or a recent event, even when the Cambridge source
asked one; such a question also goes out of date.

A finding from the originality check that you are sure is not a copy (a
standard formula, the topic's own name) can be cleared with a reason in
`scripts/imat/originality-reviews.json`; prefer rewording.

## Figure questions

A figure question is in scope like any other (owner, 2026-10-11). Its twin
takes one of three routes:

1. **No picture.** If the skill survives as text or a table (a U-tube's
   contents, a kidney's filtration factors), write it that way.
2. **Drawn.** Charts, grids, pedigrees, geometry: draw an SVG in `figures/`,
   named `twin-<year>-Q<n>.svg`, with explicit `width` and `height`, and run
   `npx tsx scripts/imat/practice/render-figures.ts`. Generate the drawing by
   script from the same numbers the solution uses, and **look at every PNG**
   before writing the stem. Set `figure: { file, origin: "drawn" }`.
3. **OpenStax (biology).** OpenStax Biology 2e is CC BY 4.0. Keep the source
   image in `figures/` (`openstax-biology-2e-fig-<n>.png`) and reference it by
   bare name from the twin's SVG (the renderer resolves it there); number or
   crop it as the question needs. Set `origin: "openstax"` and a `credit`
   ("adapted from OpenStax Biology 2e, Figure 5.2, CC BY 4.0"); the loader
   prints it under the stem.

Name the graphs or diagrams 1 to 5, not A to E: "Graph A ... Graph E" as
options are the source's options word for word.

## Writing the files: never through a shell string

A shell or `node -e` string eats one backslash, so `\(\mathrm{CH_4}\)` lands
as `(mathrm{CH_4})` and `\theta` as a TAB plus "heta". With the delimiters
gone, KaTeX never sees the math, so on 2026-10-11 eleven loaded twins were
broken and every check passed. checkTwins now refuses control characters and
LaTeX outside math. Write twins with the Write tool, or with a script file
using `String.raw`.

## Correcting a twin already in the bank

Never re-commit an edited twin: the new hash inserts a second row beside the
faulty one. Copy the twin as loaded into a JSON array first, edit the year
file, then:

```sh
npx tsx scripts/imat/practice/correct.ts <before.json>          # dry run
npx tsx scripts/imat/practice/correct.ts <before.json> --apply  # rewrite the rows in place, same ids
```
