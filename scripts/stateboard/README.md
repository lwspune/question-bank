# State Board textbook ingestion — end-to-end workflow

Pipeline for ingesting a **Maharashtra State Board (Balbharati) textbook chapter** into the
bank as `question_kind='practice'`. A textbook chapter is 3 buckets — **solved examples**
(ship the book's own solution PUBLIC), **exercise MCQs** (answer DERIVED), **exercise
subjective** (answer AUTHORED). Mixed MCQ + subjective (`question_format`, migration 0041);
set-grouping for `Q.N → i)/ii)/iii)` sub-items. Background + design: [[state-board-ingestion]]
+ [[textbook-chapter-ingestion]] memories.

Run the steps **in order**. Steps 6 (answer-key cross-check) and 7 (figures/solution_image)
are **gates before PUBLIC** — do not `flip-public` until they're done.

---

## The flow

### 1. Register the chapter — `config.ts`
Add a `CHAPTERS[<id>]` entry: `chapterName`, `subjectName` (must exist), `sourceFile`
(dedup/rollback key), `pdf` (absolute path), canonical `subtopics[]` (pick the teaching
arc, not the book's raw section labels — split a section if it fuses distinct skills).

### 2. Render — `render.ts <id>`
Full-page PNGs → `out/<id>/p-NN.png` (gitignored).

**Most pages are TWO-COLUMN, and the layout VARIES within a chapter** (Differentiation 60 of 64 pages two-col; Vectors 33 of 61; App-of-Derivatives 21 of 30 with a single-column Miscellaneous). Tell each agent to read the **LEFT column fully, then the RIGHT** — reading across scrambles question order and can shred a solved example. **Do NOT hand agents a per-page column map derived from a block-geometry heuristic**: on App-of-Derivatives a `wide-block` heuristic mislabelled three pages, and each time the agent caught it only because it *looked at the page*. Say "these pages are usually two-column — verify per page yourself" and let them check.

**Map blocks by (page, y) — NOT by page.** Sections start MID-PAGE, so a plain header scan
gives you a *page* list, not a *block* map, and any band you derive from it will silently drop
questions. Use `page.get_text('blocks')` and record each header's **y**:

```py
for i, p in enumerate(doc):
    for b in p.get_text('blocks'):
        t = ' '.join(b[4].split())
        if HEADER_RE.match(t): print(f'p{i:02d} y={b[1]:6.1f} | {t[:58]}')
```

Bit us on **Differentiation**: a header scan put "1.3.1" on p29, so Ex 1.2 was bounded at p28 —
but 1.3.1 begins at **y≈531**, so the top of p29 was still Exercise 1.2. The gap-fill recovered
**31 rows (~32% of that fragment)**, including a whole Q.10 (i)–(ix). Same class as the Vectors
page-boundary gap. Give every agent an explicit `p<N> y≈<Y>` start AND stop, and tell it that a
page boundary is not a block boundary — the agents then catch straddles you missed.

### 3. Transcribe → merge → commit PRIVATE
- **One vision agent per teaching section** (+ one for the Miscellaneous MCQ+subjective block),
  each writing `data/<id>.<sec>.json`, refs **section-prefixed** to stay globally unique.
  Text for stems/options/prose; **VISION for truth-tables → GFM pipe-tables** + figures.
  Unicode math → LaTeX in `\(…\)`.
- `merge.ts <id>` (duplicate-ref guard) → `commit.ts <id>` (dry-run validates every row:
  subtopic-in-set, difficulty, LaTeX balance, exactly-one-correct for mcq) → `--apply`
  (PRIVATE + practice). Validate the HARDEST section first (truth tables) before fanning out.

### 4. Verify MCQ keys — independent re-derivation
`dump-mcq.ts <id>` → `data/<id>.mcq-blind.json` (**omits `is_correct`** so the check is genuinely
independent; it also **refuses to dump unless every MCQ carries 4 options** — the sibling NCERT
pipeline shipped a dump with a wrong field name that silently emitted `options: []`, so its
verifier "checked" keys it couldn't see). Spawn an agent that re-solves every MCQ from scratch
against that file → `data/<id>.mcq-verify.json` (`{id, ref, derived_answer, solution}`).
Then `mark-mcq-verify.ts <id> --write` stamps `matches_current` **here** (the verifier must not
self-report agreement, or it stops being blind). `apply-solutions.ts` applies the brief solution
and flags every `matches_current=false` LOUD for a manual re-key. Do NOT trust the ingest key.

**"Activity" fill-in-the-blank SOLVED examples (Indefinite Integration).** Some chapters print a worked example as a fill-in-the-blank *activity* — dotted `(....)` blanks in the book's OWN solution, WITH the final answer. When these sit in the SOLVED-example flow (not an exercise), they commit as `bucket:solved` and ship PUBLIC with the book's solution — so a `(....)`-riddled "model answer" would ship broken. **Complete the blanks** with the correct intermediate terms (the final answer is printed, the steps are standard), **sympy-verify** the completed derivation, and — since `apply-solutions` only touches exercise-subjective — push the fix with a **direct DB `solution` UPDATE + mirror to the source fragment**. Watch for agents handling these inconsistently (one may fill, one may preserve); scan committed solved rows for `\.\.\.\.`/`ldots`/`refer .* solve it` and adjudicate (many hits are false positives: `..... (i)` equation-numbering, `\ldots by LIATE` annotations, terse-but-complete standard-result formulas).

**⚠️ Authoring LaTeX in a one-off? Use the Write tool, NEVER `python -c`/heredoc.** A `python -c` heredoc double-escapes: the shell eats one backslash AND Python string-escapes `\f`→formfeed, `\t`→tab, `\b`→backspace — so `\frac`/`\therefore`/`\because` become control chars in the written JSON. This bit the MAINTAINER (not just subagents) on Indefinite Integration's solved-example fixes. Author into a `.py`/`.json`/`.ts` file with the **Write tool** using **raw strings** (`r"""..."""`); then scan the DB (`solution ~ '[\f\t\b]'`) to confirm 0 control chars. See [[heredoc-backslash-eating]].

### 5. Author subjective solutions — `apply-solutions.ts <id> --apply`
Parallel authoring agents (partition by subtopic / exercise block) write
`data/<id>.<group>.solutions.json` (`{id, ref, solution}`) for the exercise-subjective rows
(the solved examples already carry the book's solution). No raw unicode math (`× ÷ √ ∴` →
LaTeX or plain English). `apply-solutions.ts` validates LaTeX balance and does a **solution-only,
hash-safe** UPDATE via `normalizeNewlines`. Flag `diagramWouldHelp` here (feeds step 7).

### 6. ✅ GATE — Answer-key cross-check (against the end-of-book ANSWERS section)
**Mandatory whenever the book's answers PDF is on hand** (`State_Board_Maths_12th_Part_1.pdf`
/ `…_Part_2.pdf` under `SOURCE_ROOT` — the full book carries an `ANSWERS` section at the end).
Do this BEFORE `flip-public` so PUBLIC ships correct + flagged from the start; if the answers
PDF only arrives later, run it as a post-flip pass (it's idempotent).

1. **Locate the block.** Find the `ANSWERS` section (PyMuPDF scan near the end of the Part-1/2
   PDF), then the chapter's block (`N. CHAPTER TITLE` in ALL CAPS) → its page range.
2. **Render** the answer pages (`fitz.Matrix(3.5,3.5)`) → a temp `out/` dir.
3. **Fan out parallel vision agents by exercise block.** Feed each `dump-review.ts <id> "<refPrefix>"`
   → `data/<id>.<block>.review.json` (`{ref, stem, our_solution, our_key, options}`). It **refuses to
   dump unless every row carries real answer text** — the Line-and-Planes ingest shipped a dump
   emitting only a `has_solution` BOOLEAN, so the agents compared our answers against nothing and
   returned a meaningless all-AGREE. Verify the guard's char-count line before trusting a report.
4. **Independently re-derive EVERY disagreement** (sympy for matrices/algebra, truth-tables for
   logic, boundary-checks for word problems). **The book key is a peer, not an oracle** — the
   Balbharati keys are wrong ~4× as often as our authored answers (99 items across 10 chapters).
   Categorize each: `OUR-ANSWER-WRONG` / `BOOK-KEY-WRONG` / interpretive. See [[audit-probe-symmetry]].
   Three techniques that decide it (all earned on Differentiation, which finished 0-ours vs 9-book):
   - **Establish a THIRD independent ground truth** — numerically differentiate the ACTUAL stem
     (mpmath, 30–50 dps) and test **both** our answer and the book's against it. Comparing the two
     to each other lets a shared error hide, and a script that tests only OUR answer proves nothing
     about the book's.
   - **`simplify()` returning non-zero is NOT evidence of inequality.** Constraint-curve identities
     only collapse when reduced against the given relation / evaluated at points solved ONTO the
     curve. This alone would have manufactured 3 false "our answer is wrong" findings on Ex 1.3.
   - **A sympy `solve`/`solveset` MISS is not evidence either — same trap, different function.**
     On App-of-Derivatives Ex 2.3 it returned *no* roots in `(0, 2π)` for one trig row and only
     `π/4` (missing `5π/4`) for another — principal-branch artifacts, not mathematics. Taken at
     face value they'd have produced 2 bogus `OUR-ANSWER-WRONG` findings. **Test the claimed value
     directly** (`f'(3π/4)` came back ~1e-41 = zero) and scan the interval numerically for roots,
     rather than trusting an empty/short solution set. Generally: a CAS returning "nothing" is a
     question, never a verdict.
   - **Expect ~20 apparent disagreements per chapter to dissolve** on equivalence testing
     (`2\cdot4^x\log4` ≡ `4^{x+1}\log2`), and treat a book answer that prints ONE principal branch
     where ours documents ± as AGREE, not an error.
   **Tell agents to REPORT, never fix** — you adjudicate against the source page. On Linear
   Programming three agents told the maintainer to "fix" answers that source-verification proved
   were already right. Make every agent test the rival hypothesis "OUR transcription is wrong" by
   **rendering the source page and looking**.
5. **Apply (two outcomes, both flagged at the TOP of the solution in a square bracket):**
   - **Our error** → fix the solution. If it's an **OCR mis-read of OUR transcription** (the book
     printed X, we transcribed Y — e.g. Pair-of-Lines `gy²` for the book's `9y²`), fix the stem
     too + recompute the hash. Distinct from a defect the **book itself printed** (below).
   - **Book question is misprinted** (stem/option/"show that" target wrong, faithfully transcribed)
     → `[Textbook misprint: …]`. PRESERVE the stem, solve the intended form, note it.
   - **Book answer key is wrong** (question fine, our derived answer correct) →
     `[Textbook answer-key error: …]`. Our answer stands; the bracket records book-key vs correct.
   - Apply by editing the `*.solutions.json` / `*.mcq-verify.json` entry then re-running
     `apply-solutions.ts <id> --apply`. **Some rows were committed inline at ingest and are NOT in a
     solutions file** (e.g. switching-circuit rows) — edit those with a direct DB `solution` UPDATE
     (apply-solutions won't touch them, so it won't overwrite).
6. Adjudicate every FIX yourself against the source before touching live content (agents
   over-flip and mis-read figures — verify circuit/figure reads against the rendered page).

### 7. Figures + solution_image (gate before PUBLIC)
- **Figures the student must read** (circuits, diagrams) → `snap-crop.ts` + `attach-images.ts`
  (ink-bounding via the shared `scripts/lib/figures/snapcrop.py`; montage-verify — never trust an
  agent's self-verify of its own crop). See [[figure-snapcrop-verify]].
- **Authored SOLUTION diagrams** (`diagramWouldHelp` from step 5) → add specs, render, montage-verify
  each against its stem, attach via `attach-solution-image.ts` (migration 0042).

  **Decide with this line, not the flag count:** build where **the figure IS the answer** — LP's
  feasible regions (65), App-of-Def-Integration's area regions (40), Pair-of-Lines' constructions
  (20). Skip where the figure is only the SETUP and the answer is a number, and the prose already
  defines every variable — Vectors + Line-and-Planes shipped without any. **The gating question is
  "is any STEM unanswerable without the figure?"**, not "would a picture be nice".

  Two renderer families now exist, `SPEC_BUILDERS[chapterId]` picks per chapter, and all are
  DATA-DRIVEN (authoring agents emit `data/<id>.diagram-specs*.json`; the App-of-Derivatives builder
  globs part-files so parallel agents don't clobber each other, and errors on a duplicate ref):
  - **Coordinate-plane** (LP, area regions): `lines` (INFINITE, clipped to the viewport), `feasible`
    (Sutherland-Hodgman half-plane clip), `curves` (`y=f(x)` exprs), `shade`, `conics`.
  - **Physical geometry** (App-of-Derivatives — cones, boxes, ladders, windows): **`segments`**
    (FINITE, between two points — `lines` is useless here), `axes:false`, arc `conics` (`t0`/`t1`
    in degrees), outlined `polys`, `rightangles`.
    - **Set `equal_aspect` (default ON for that builder).** `px()` maps xr/yr to the drawable box
      INDEPENDENTLY, so without it a circle renders as an ellipse and a right angle isn't square.
      It only ever EXPANDS a range. It is OFF globally so the coordinate-plane chapters are untouched.
    - **`polys` draw AFTER `segments`** — a closed poly silently overdraws a coloured highlight edge,
      so the label names a colour that isn't on screen. Highlight edges with `segments` only.
    - **Draw 3-D solids as a 2-D AXIAL CROSS-SECTION** (there are no 3-D primitives, and the
      cross-section is what the maths actually uses). Say so in the caption. A NET beats an oblique
      projection where one exists — a net is literally truthful, an oblique sketch is foreshortened.
  - **Geometry must be TRUTHFUL, not schematic** — an inscribed corner must actually satisfy
    `x²+y²=r²`; a stated 30° must actually compute to 30°. **Audit this yourself from the spec data**
    (a few lines of python), don't accept an agent's self-report. Where the OPTIMUM is the answer,
    draw the optimum; where the VARIABLE is the point, stay generic.

### 8. Flip PUBLIC — `flip-public.ts <id> --with-mcq --apply`
Flips `question_format='subjective' AND solution IS NOT NULL` (+ MCQs with a correct option).
Then set `subtopics.order_index` 1..N to the teaching sequence (orders the `/browse` filter list
+ the question sort). Spot-check on `/browse` (practice-only exam → Practice view by default).

### 8b. ✅ GATE — Book-faithful section structure (the `/board` reader)
The `/board` reader renders the chapter the way the BOOK is laid out (each numbered section →
Solved Examples → Exercise → …, then Miscellaneous). That structural axis is ORTHOGONAL to the
conceptual `subtopic` (a single Exercise is split across subtopics), and can't be parsed reliably
from the messy `question_number` strings — so each chapter carries an authored, **PDF-verified**
section outline. migration 0043 = the `section_kind`/`section_group`/`section_label`/`section_seq`
columns; pure matcher `assignSections` (lib.ts, TDD).

1. **Author the outline** in `sections.ts` (`SECTIONS[<id>]`): an ordered `SectionSpec[]` = the book's
   table of contents in **physical reading order**. Scan the chapter PDF for the block-header
   sequence (PyMuPDF), get section titles from the p0 "Let's Study" TOC. Be faithful to the book:
   a Miscellaneous part can sit MID-chapter (e.g. Matrices 2(A)); a ref's leading "N.M" prefix can
   be OFFSET from the book's real exercise number (Diff-Eq "6.4 Exercise 6.3" = book Ex 6.3) — trust
   the PDF. `kind` follows the transcription `bucket` (solved⟺solved_example); refs route by
   longest-matching `refPrefixes`.
2. **Backfill** — `backfill-sections.ts <id>` (dry-run prints the reconstructed outline + flags any
   ref that matches NO block or contradicts its bucket) → `--apply` (writes the columns, matching live
   rows by `question_number`). **Eyeball the reconstructed outline against the book before applying.**
3. **Gate** — `npm run board:lint` fails if any PUBLIC board row is missing section fields or a
   chapter's `section_seq` isn't contiguous 1..N. Run it before considering the chapter done.
4. **Smoke-test** the reader: `/board/<examSlug>/<subjectRoute>/<chapterSlug>`.

**Going forward (native capture):** the transcription agents already READ these headings — when
ingesting a NEW chapter, have them emit `section_kind` + verbatim `section_label` + a section ordinal
per question so the outline is captured at ingest instead of reconstructed. The backfill path above is
for the chapters ingested before 0043.

### 9. Errata + commit — `errata.ts [--write]`
`errata.ts` scans ALL chapters for solutions beginning `[Textbook …]` and emits the grouped
markdown **errata report for the publisher (Balbharati)** — `--write` →
`generated-papers/StateBoard_Errata.md` (gitignored, regenerable). Every chapter that went
through step 6 feeds it automatically. Commit the config + `data/*.json` (transcription + solutions
+ mcq-verify) + docs; update CLAUDE.md header + a Decisions entry + [[state-board-ingestion]].

---

## Scripts
`config.ts` · `lib.ts` (pure record core incl. `assignSections`, TDD) · `render.ts` · `merge.ts` ·
`commit.ts` · `apply-solutions.ts` · `flip-public.ts` · `snap-crop.ts` + `attach-images.ts` (figures) ·
`render_solution_diagrams.py` + `attach-solution-image.ts` (solution diagrams) · `errata.ts` ·
`sections.ts` + `backfill-sections.ts` + `lint-sections.ts` (`/board` book-section structure — see step 8b).
`out/` PNGs gitignored; `data/<id>.*.json` = committed transcription + solutions (source of truth).
