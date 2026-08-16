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

Render the answer block with **`npx tsx scripts/mh-sb-11/render.ts <chapterId> --answers`**
(ported 2026-08-16 — the pipeline previously needed a hand-written one-off PyMuPDF call each
time, which cost seven chapters' worth of retyping).

It writes to **`out/_answers/<chapterId>/`**, a SIBLING of `out/<chapterId>/` rather than a
child, and that placement is load-bearing: the chapter render does `rmSync(out/<chapterId>)`,
so answer pages written inside it are destroyed by the next `render.ts <chapterId>` — and worse,
that same rmSync would pull the page images out from under any in-flight transcription agent.
Keeping the trees apart makes the two commands order-independent instead of requiring a
remembered order (the trap `dump-text.ts` hit in `mh-sb-9`). Only the chapter render clears its
directory; `--answers` is additive.

**2a. RUN `render_solution_diagrams.py` FROM THE REPO ROOT, not from this directory.**
It writes its manifest paths with `os.path.relpath(p, os.getcwd())`, so running it from
`scripts/mh-sb-11/` emits `out/<chapter>-diagrams/…` where `attach-solution-image.ts` — which
resolves against the repo root — needs `scripts/mh-sb-11/out/…`. The failure is loud (`PNG not
found`) rather than silent, but it costs a re-render:

```
python scripts/mh-sb-11/render_solution_diagrams.py <chapterId>   # from the repo root
npx tsx scripts/mh-sb-11/attach-solution-image.ts <chapterId> --apply
```

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

then reconcile: every page carrying a `Solution :` must fall inside some band.

**Match `Sol(?:utio)?n\.?\s*:` , not `Solution\s*:`.** Measured on Ch.6 Functions 2026-08-16: the
book abbreviates **`Soln. :`** on some pages and writes `Solution :` on others, MIXING BOTH ON
ADJACENT PAGES (Ex. 6 and Ex. 7 on p-07 use `Soln. :`; Ex. 8 on p-08 uses `Solution :`). A
`Solution`-only scan reported 28 markers against 34 printed `Ex. n` headings and made two genuine
worked examples look unsolved. Ch.1 has also been seen misspelling it `Sloution :`.

Worse, **some solutions carry no word at all.** In the same chapter, Ex. 5 and Ex. 6 of run 2 mark
their solution with a bare **arrow glyph** (`→`) — no "Solution", no "Soln.", nothing a text scan
can key on. So THREE distinct marker forms appear in one 27-page chapter.

The count is therefore a **LOWER bound in every case**: the pass condition is
`transcribed >= scanned`, and a page carrying `Ex.` markers with zero solution markers is SUSPECT,
never empty. Do not build a band plan that assumes the two numbers should match — plan from the
`Ex. <n>` HEADINGS (which are reliable) and use the solution markers only to sanity-check. Two
further rules earned the same way:

- **Cut bands at BLOCK boundaries, never page boundaries.** A solved run or an exercise must sit
  wholly inside one band. Where two blocks share a page, name the split point explicitly in both
  prompts and say who owns which side.
- **Tell every agent to REPORT on content it does not own.** Each of the four gaps found in
  Ch.1/Ch.5 was recovered only because an agent described what it saw in a neighbour's territory
  instead of silently ignoring it. This instruction is doing more work than the boundaries.
- **Theory-embedded examples need sub-section-scoped refs** (`5.1.3 SolvedEx.1`, `5.2.5
  SolvedEx.1`), because the bare `<N.M> SolvedEx.<n>` namespace belongs to the boxed block and
  the book reuses its `Ex.` numbers across both. When a theory-embedded example sits in the SAME
  sub-section as a boxed block and PRECEDES it, suffix the sub-section (`2.3.1a SolvedEx.1`,
  `2.4a`, and the shipped `9.1.1a` / `4.5b`) and order the `a` block FIRST in `sections.ts`.

**2c. DERIVE EACH EXERCISE'S QUESTION COUNT FROM THE PRINTED ANSWER KEY BEFORE DISPATCHING.**
This is the cheapest check on the whole pipeline and it catches the failure in 2b directly.
Render the chapter's ANSWERS block first (step 2 above), then read off the HIGHEST question
number the key gives for each `EXERCISE N.M` and for the Miscellaneous block, and put that number
in the band prompt as a FLOOR the agent must reconcile against.

Why a floor and not a total: the key omits every proof / "show that" / "verify" question, so the
real count is `>=` the key's max, never `<`. An agent finding FEWER questions than the key's
highest number has certainly hit a boundary too early — which is exactly what happened on
2026-08-16, where a band plan built from a page-position scan under-counted **four** exercises:
Ex 5.1 (7 vs a true 10), Ex 5.3 (9 vs 15), Ex 2.1 (12 vs 15) and Ex 2.3 (4 vs 8). Every one of
them spilled onto the next page, above the following section's heading, and every one was
recovered only after the key exposed the gap. One agent had actively *confirmed* its short count
by cropping the foot of its last page — evidence about a page, which cannot testify about a block
that crosses it.

Corollary, and it cuts the other way: tell the agent to report an honest shortfall rather than
force a match. A key numbered HIGHER than the questions that exist is a real book defect —
Sequences' Exercise 2.2 has 13 questions and its key numbers the last answer `15)`.

A ~30-line probe over the answers block gives every block's max in one pass; do it once per
chapter, not once per band.

**THE KEY USES THREE DIFFERENT QUESTION-NUMBERING FORMATS, and a probe that knows only one
returns 0 instead of failing.** Measured 2026-08-16 across the answers section:

| form | example | chapters seen |
|---|---|---|
| `1)` or `1.` | `1) 2x - 4y + 5 = 0` | most |
| `Q.1` — the dot comes BEFORE the number | `Q.1  i) 0  ii) 11i` | Complex Numbers |
| `(1)` under roman group headers `(I)`…`(V)` | `(IV) (1) ...` | Differentiation |

So match all three, and note the `Q.` form needs its own alternative rather than a shared trailing
delimiter:

```python
NUM = re.compile(r'(?m)^\s*(?:Q\.\s*(\d{1,2})\b|\((\d{1,2})\)|(\d{1,2})\s*[\).])')
```

This bit twice in one sitting: the first pass reported Complex Numbers as having **zero** keyed
questions in all four of its exercises, and Differentiation as 9 when it is 25 — and a zero reads
exactly like "this chapter has no key", which is a conclusion about the BOOK drawn from a defect in
the PROBE. If a block reports 0, open the key page and look at it before believing it.

**A FOURTH failure mode, and it under-counts rather than zeroing: the key is set in TWO COLUMNS.**
A line-anchored regex reads only the left column of a block and stops where it ends. Measured on
P&C's Miscellaneous part (II): the probe reported a max of 6 because the key's left column runs
1)–6) and its right column continues 7)–18). The real count is 18. So a key-floor that looks
implausibly SMALL for the page area it occupies is as suspicious as a zero — reconcile it against
the block's physical extent before using it as a band boundary, and treat every floor as a floor.

**A FIFTH: an exercise printed in ROMAN PARTS restarts its numbering in each part, and the probe
flattens them.** Limits' Exercise 7.7 is printed `I)`, `II)`, `III)`, each headed "Evaluate the
following" and each numbering from 1) — 3, 3 and 5 questions, eleven in total. The probe reported a
max of 5, which is part III's last item, not any block total. Exercise 7.6 is the same shape. So a
key-floor from a parted exercise is neither the total NOR a floor on the total; it is the largest
number in whichever part happens to have the most items. **Check for `I)` / `II)` / `III)` headers
before using the number at all**, and when an exercise IS parted, mirror the book's part labels in
the refs (`Ex 7.7 I Q1`) and give `sections.ts` one block per part.

Net: this one probe has misread the key in FIVE distinct ways in a single sitting — unknown
numbering format (silent zero), a `Q.`-prefix it could not match, a two-column layout it read half
of, a roman-part structure it flattened, and a chapter whose real total it under-reported by 16. It
is genuinely useful: it caught EIGHT exercises spilling past their banner page, including one whose
eleven-row tail was owned by nobody. But its output is a HINT to be reconciled against the page,
never a measurement to plan against on its own — and it is the agents reading the images, told to
report on territory they do not own, that have caught every one of these.

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

**5a-bis. `apply-errata.ts` MIRRORS INTO THE FIRST MATCHING FILE AND STOPS, so file ORDER
decides where a bracket lands.** Fixed 2026-08-16, after it had already fired on three
chapters. For an exercise-subjective row TWO source files hold the ref — the transcription
band fragment, which has **no `solution` key** (exercise answers are authored later), and the
authored `*.solutions.json`, which does. In `readdirSync` order `<id>.band-a.json` sorts
before `<id>.ex-6.solutions.json`, so the applier **created** a `solution` field on the band
row holding the bracket ALONE and never touched the real one. Two ways that bites: the
authored solution keeps no record of the bracket, and a later re-commit would read the band's
bracket-only field as that question's entire model answer. `*.solutions.json` files are now
ranked first. Same defect and same fix as `scripts/mh-sb-9`; this pipeline had never taken it.

**An MCQ row is the legitimate create-the-field case** — it has no `*.solutions.json` entry at
all, so the band fragment IS its only home. A repair that moves every bracket out of the band
files is therefore WRONG; classify by whether a solutions file owns the ref (6 of the 12
affected rows in that batch were MCQs and correctly stayed put).

**5d-bis. A PROBE MANGLED BY THE SHELL MANUFACTURES FALSE DEFECTS AS READILY AS IT HIDES REAL
ONES.** Five separate agents in the 2026-08-16 batch had a hygiene probe written through a
heredoc / `python -c` / `node -e` report a CLEAN file as double-escaped; one nearly "repaired"
29 correct rows, and another had its script clobbered by a concurrent agent sharing `/c/tmp`
and unknowingly ran a different chapter's checker against its own file. Two rules: **write
probes to a FILE** (use `chr(92)` for backslashes so no escaping layer can reach them), and
**put per-agent scratch in the session scratchpad, never a shared tmp**. The corollary is what
matters — when a probe and the data disagree, suspect the probe first; on this book it has
been the probe every time.

**5d. HAND-AUTHORED JSON IS DOUBLE-ESCAPED SO RELIABLY THAT BOTH APPLIERS NOW REFUSE IT.**
Writing an errata bracket or a solution that quotes the book's own words, the natural thing to
type for an inner quote is `\\"` — which JSON-decodes to a *literal backslash then a quote*, so
the page renders a stray `\` beside every quoted phrase. `findLatexImbalance` cannot see it (the
delimiters still balance) and neither can `board:lint`. It reached the batch-1 chapters (14 files
repaired after `audit:text` flagged them) and then reached the batch-2 chapters again — **written
by the same hand that had just repaired the first set, and then a THIRD time in the very next
file.** That is why it is a guard rather than another repair: fixing the data does not fix the
hand that writes the data.

`apply-errata.ts` and `apply-solutions.ts` both now REFUSE (never silently normalise — the source
file has to be corrected or the next re-apply reinstates it) on:

| symptom | what it means | correct form in the file |
|---|---|---|
| `\"` in the decoded string | JSON escaping applied twice | `\"` for a quote — one level |
| `\\(` in the decoded string | same, on a math delimiter | `\\(` in the file decodes to `\(` |
| a control char (`\f` `\t` `\b` `\v`) | authored through a heredoc or `python -c`: the shell ate one backslash and Python string-escaped the rest, so `\theta` arrived as TAB+`heta` | author with the **Write tool**, never a heredoc |

The known false positive is LaTeX's umlaut accent `\"o`; no Balbharati maths erratum has needed
one. If that ever changes, widen the check to ignore `\"` followed by a letter or a brace.

**5e. `apply-solutions.ts` GATES THE `ref` -> `id` PAIRING, not just the id set.** An authoring
agent that drops one row and pads the tail produces a *permutation*: the id set matches, the count
matches, every downstream gate passes, and every solution is attached to the wrong question. It has
happened twice on this book. The applier now rebuilds the pairing from each group's own
`<id>.<group>.topaper.json` and refuses on any mismatch. Keep the topaper files until after the
apply — the check silently skips a group whose input has been deleted.

**5f. `apply-solved-fixes.ts` — repairing a SOLVED example whose printed derivation is WRONG.**
`apply-solutions.ts` only fills rows where `solution IS NULL`, so it never touches a `solved` row
(those carry the book's own worked solution, committed inline from the band fragment). When that
printed derivation is not merely ugly but arithmetically wrong, preserving it verbatim ships a
model answer that teaches the error — Limits `7.1.7 SolvedEx.2` evaluates \(2^2\) as 8, and
`SolvedEx.3` prints \((3-2)/3 = 1/2\). Per the shipped Ch.4 precedent, **correct the derivation AND
carry an errata bracket naming the defect**. Input is `data/<id>.solved-fixes.json`
(`{ref, why, find, replace}`); the `find` must match the stored solution EXACTLY ONCE or the fix is
refused, and a fix whose `find` equals its `replace` is refused too, since that is what a
shell-mangled needle looks like. Runs BEFORE `apply-errata` (rule 5a).

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

**6a. THE GATE STRUCTURALLY CANNOT COVER SOLVED EXAMPLES, AND ITS "0 OUR-ANSWER-WRONG" MUST BE
READ WITH THAT SCOPE ATTACHED.** The printed ANSWERS section is organised under `EXERCISE N.M`
and `MISCELLANEOUS` headings only; a solved example's answer is printed *inside its own worked
solution*, so there is no external key to diff it against. Measured across the 2026-08-16 batch:
**153 of 770 committed rows (20%) are `bucket: solved` and were outside the gate** — Limits 44,
Complex Numbers 46, Perm & Comb 49, Continuity 14. That is not a dispatch oversight; feeding those
refs to `dump-review.ts` would only produce rows with nothing to compare against.

It matters because **that is exactly where this book's answer-affecting errors have been found**:
Limits `7.1.7 SolvedEx.2` evaluates \(2^2\) as 8 and `SolvedEx.3` prints \((3-2)/3 = 1/2\), both
caught by the TRANSCRIPTION agent noticing the printed derivation contradicts itself — not by any
gate. So the regime for solved examples is:

- the transcription agent must be told to check each printed derivation for INTERNAL consistency
  (does the working actually reach the number the book prints?) and report, not repair;
- an answer-affecting hit goes through `apply-solved-fixes.ts` + an errata bracket (rule 5f);
- when reporting a chapter, say the cross-check covered the exercise rows and give the solved
  count separately. "0 our-answer-wrong" over 137 rows is a different claim from one over 181.

A cross-check agent flagged this scope gap itself on Limits, from a row-count mismatch in its own
brief. Give every gate the total it should expect, so a shortfall is visible to it.

**6b. WHEN THE CHAPTER AND THE KEY DISAGREE ABOUT AN EXERCISE *NUMBER*, FOLLOW WHICHEVER IS
INTERNALLY CONTIGUOUS — and check it per chapter, because this book has gone both ways.**
Three chapters have now printed an exercise-numbering disagreement, and guessing a house rule
from any one of them gets another wrong:

| chapter | the page says | the key says | who is right | ref used |
|---|---|---|---|---|
| Ch.7 Limits (P2) | `7.1`…`7.7`, contiguous | `7.1`…`7.6` then **`7.8`** | the CHAPTER | `Ex 7.7 Q<n>` |
| Ch.7 Conic Sections (P1) | `7.1`, `7.2`, `7.3`, contiguous | `7.1`, `7.2`, **`7.4`**, no `7.3` | the CHAPTER | `Ex 7.3 Q<n>` |
| Ch.6 Functions (P2) | Ex 6.1 prints **two** questions numbered `14)` | numbers them 13, 14, 15 and stays aligned to the end | the KEY | `Ex 6.1 Q13` |

Settle it by CONTENT, never by which source looks more authoritative: match the key's answers
against the questions they must belong to. Conic Sections' "Exercise 7.4" block answers *length of
transverse axis, conjugate axis, eccentricity, foci* over ten sub-items (i)–(x), which is the
chapter's Ex 7.3 Q1(i)–(x) exactly — and the chapter contains no 7.4 anywhere. **Tell the agent
the resolved number, or it will hunt a block that does not exist.**

## Book defects recorded so far
- The Part-1/Part-2 answer sections misspell three of their own headers:
  `DETERMINANTS AND MARTICES`, `PERMUTIONS AND COMBINATIONS`, `MISECLLANEOUS EXERCISE`.
  Navigation-only; do not carry those spellings into chapter names.
- **Part 2 Ch.7 Limits** — the CHAPTER is coherent (`7.1`…`7.7`); the ANSWERS SECTION labels that
  final block `EXERCISE 7.8` and never prints `7.7`. *(This bullet had the polarity BACKWARDS
  until 2026-08-16 — it read as though the chapter skipped 7.7. `config.ts` carries the
  correction and the evidence; see rule 6b above.)*
- **Part 1 Ch.7 Conic Sections** — same shape: the chapter prints `7.1`, `7.2`, `7.3`; the answers
  section keys `7.1`, `7.2`, `7.4` and never prints a `7.3`.
- Publisher filename typos kept verbatim in `config.ts`: `Ch_04_Determinent_Matrices.pdf`,
  `Ch_07_Conics_Section.pdf`, `Ch_09_Diffrentiation.pdf`.
- **Part 2 Ch.4** is ingested as **binomial only** and its DB chapter is named `Binomial Theorem`,
  not the book's "Methods of Induction and Binomial Theorem" — the one deliberate divergence from
  rule 5. Induction has zero PYQ weight in every exam bank; binomial is a live chapter in three.
  `MISCELLANEOUS - 4` is shared, so its part (II) is ingested from `Q4` (Q1–Q3 are induction) with
  the book's numbering kept. `EXERCISE 4.5` is all proofs and is correctly unkeyed. See `config.ts`.

## Not applicable here
`audit-grounding.ts` and the HUMANITIES briefs from `mh-sb-9` are deliberately NOT copied —
they exist for a prose book with no answer key, and this book has answers for everything.
