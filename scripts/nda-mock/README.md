# NDA Maths mock-test-series ingestion

Ingests LWS authored mock papers into the bank as **NDA / Mathematics,
`question_kind='practice'`**. Two sources, both 120 q on the NDA Paper I blueprint:

| ids | source | folder |
|---|---|---|
| `m1`–`m10` | "NDA Math 1 to 10 - Complete Mock" author manuscripts | `Test_Series/NDA Math 1 to 10 - Complete Mock/` |
| `w1`–`w4` | the **weekly NDA-1 2026 series**, dated 8-3-26 → 29-3-26 | `Test_Series/NDA_Mock_Tests/` |

They are SIBLING folders with confusingly similar names and they are different
papers. See "The weekly series" below for what differs — it is not a variant of
the ten-paper series, it is a second source that happens to fit the same pipeline.

These are *authored* mock papers, not real NDA sittings, so they must not enter the
audited PYQ corpus. One `source_file` per paper keeps each mock reconstructable — a
prerequisite if they later become `/mock` timed tests (they match the NDA Paper I
blueprint exactly: 120 q · 300 marks · 150 min).

**The weekly folder holds five papers and only four are ingested.** Its Test-5
(5-4-26) **is** the paper already committed as `NDA_Maths_Mock_Test_03.docx`: a
stem-similarity pass over all 6,829 NDA Maths rows matched 68 of its questions at
Jaccard 1.00, every one at the SAME question number and 100% concentrated in that
one `source_file`. Mocks 1–4 by contrast show only ten incidental single-question
overlaps between them, at differing numbers and scattered across sources. So the
two folders are not disjoint, and **any further paper from either must be
similarity-checked against the bank before it is added**, not assumed new.

## Why this is the pandoc lane, not the vision lane

`scripts/practice/` renders PDFs to PNGs and transcribes them by vision, because the
practice-book PDFs have a lossy text layer. **These DOCX files do not** — their math is
real OMML and pandoc recovers it as clean LaTeX. Vision here would be slower and
strictly worse. The one exception is **Mock 9**, whose math is legacy MS-Equation
`.wmf` images (380 of them); that paper needs the vision lane and is left for last.

## Per-paper loop

```sh
# 1. Extract: pandoc both DOCX -> stems, options, printed key, solutions, sets.
#    Reports every defect it finds; it never guesses.
npx tsx scripts/nda-mock/extract.ts m1

# 2. Blind packets: stems + options ONLY (key and solution withheld) + a live
#    taxonomy handout so classification can't invent a chapter.
npx tsx scripts/nda-mock/dump-blind.ts m1 20

# 3. Agent pass (6 agents x 20 q). Each derives the answer FROM SCRATCH and
#    classifies into the handout's taxonomy -> data/m1.blind.<range>.json.
#    Dispatch ~3 at a time; larger fan-outs have hit the account session limit.
#    The contract is BLIND_BRIEF.md — point each agent at it rather than
#    restating the rules inline, and name the packet, handout and output path.
#    It carries the one rule that matters (config.ts and the *.extract.json
#    carry the printed key, so an agent that opens either is no longer blind)
#    and the describe-never-repair rule for defective questions.

# 2b. Prove the math RENDERS. Delimiter balance is not enough — this runs every
#     zone through the real KaTeX parser using the site's own splitter.
npx tsx scripts/nda-mock/validate.ts m1

# 4. Adjudicate: blind answer vs printed key -> AGREE / FLAGGED / DISAGREE /
#    UNRESOLVED. Auto-resolves a clean AGREE (and a FLAGGED, where both
#    sources already agree and the note is advisory).
npx tsx scripts/nda-mock/adjudicate.ts m1

# 5. Settle every DISAGREE/UNRESOLVED by hand, as a `resolutions` entry in
#    config.ts — `{answer}` to commit a letter, `{hold}` to keep a defective
#    question out. Re-run adjudicate to apply.

# 6. Commit PRIVATE + question_kind='practice'. Dry-run first.
npx tsx scripts/nda-mock/commit.ts m1
npx tsx scripts/nda-mock/commit.ts m1 --apply

# 7. Review, then flip PUBLIC.
```

**After ANY parser change, re-check every already-committed paper:**

```sh
npx tsx scripts/nda-mock/drift.ts m1
```

`content_hash` is derived from stem + options + answer, so a later parser fix
silently invalidates a committed paper — and re-running commit would INSERT a
second copy instead of upserting. `drift.ts` re-extracts and diffs the hashes
against the bank.

## Repair policy (what an errata entry may and may not do)

Source defects are common — mislabelled options (`(a)(b)(c)(c)`, an empty `()`),
duplicated options, dropped coefficients, whole missing lines. The rule that keeps
these repairs honest:

**Repair to what a source DOCUMENTS, never to what would make an answer fit.**
In practice the intended text is nearly always recoverable from one of two places:

1. **the paper's own worked solution** — it routinely prints the clean version of a
   stem the question block corrupted (Mock 2 Q17's `(2−λ)ĵ`, Q86's `(3a−b)×(a+3b)=k(a×b)`,
   Q113's `[[1,3],[0,1]]`, Mock 3 Q88's Cramer setup);
2. **the typeset booklet** (`printedPdf`) — which restored Mock 2 Q66's missing fourth
   option and Q82's missing question line verbatim.

Then check the repair is *minimal and self-consistent*: after it, the paper's own key
should be correct. If a repair would require assuming BOTH the solution and the key
are wrong, prefer the other reading. Mock 2 Q33 is the worked example — the printed
`lim x→0` has no correct option, but the solution substitutes `x = 1−h` (i.e. `x→1`)
and gets the keyed answer, so one edit to the limit point beats two errors.

Where neither source documents the intended text and the defect is only cosmetic (a
duplicated distractor), a distinct wrong option of the same family may be substituted
**provided the key is untouched** — Mock 2 Q23 and Q70 both took this route, and both
record that the answer was independently verified first.

## The rule that matters: the printed key is a PEER, not an oracle

Mocks 1 and 2 contain **ten wrong printed keys** between them, and most are
contradicted by the paper's own working:

| Q | Printed key | Correct | How it was caught |
|---|---|---|---|
| m1 64 | D | **C** | the author's own `Corrections.docx` |
| m1 51 | A | **D** | the paper's own solution ends `sin C = 1/√2` |
| m1 96 | B | **D** | the paper's own solution says `1/8` |
| m1 65 | A | **C** | key AND solution both wrong: `det(AB)=det(A)det(B)=0`, so AB IS singular |
| m2 108 | A | **D** | solution forgets `\|kM\| = k²\|M\|` for a 2×2, giving 1 instead of 1/ab |
| m2 62 | D | **B** | the paper's own solution literally writes "⇒ B = C" |
| m2 32 | D | **A** | solution calls `x²/x` a polynomial; it is undefined at 0 |
| m2 55 | D | **B** | factors to `t²(t−1)²(t²+t+1)`, so it is not an identity |
| m2 90 | A | **B** | `m+n = 2+(−3) = −1`; the solution drops the sign |
| m2 20 | C | **D** | "always real" fails for complex coefficients |

Equally important: **the blind derivation is also wrong sometimes.** Two Mock 2
disagreements were resolved in the KEY's favour — Q23 (the paper is self-consistent and
correctly answers "None of these") and Q104 (definitional, not mathematical). Adjudicate
each one; never apply a blanket rule in either direction.

So a question is committed only when its answer is *settled*, never on the strength of
the key alone. Three independent grounds are available and should agree:

1. **the blind derivation** (agent, never shown the key),
2. **the paper's printed worked solution** (often contradicts its own key letter — when
   it does, the working is the better evidence),
3. **your own re-derivation** of anything the first two disagree on.

`adjudicate.ts` decides nothing by itself: a DISAGREE is surfaced with all three
sources side by side and waits for a human call.

## Source variation across the ten papers (measured, not assumed)

| Paper | Numbering | Answer key | Notes |
|---|---|---|---|
| 1, 2, 3, 5 | `1.  ` md list | tail `ANSWER KEYS` block in the QP | separate solution DOCX |
| 4 | `1\. ` escaped | tail `ANSWER KEYS` block in the **SOLUTION** doc | QP carries no key at all; recurring defect is a corrupted FOURTH option label |
| 6, 7, 8 | `1\. ` escaped | inline `N.(c)` on the solutions | 6 + 8 have Direction/Passage sets |
| 8 | | + a supplement's own tail key for Q1-3 | 3 solutions AND those 3 keys live in a separate supplement DOCX, headed `Solution 8` not `8.` |
| 9 | `Q.1) `, but `Q.118 ` + `(A)` for the last three | `N. (b)` at the head of each solution entry, readable as TEXT | **VISION LANE** — equations are legacy MS-Equation `.wmf`, so pandoc sees only an image reference. The PDFs have a text layer but Word exported each formula as positioned glyphs, so math arrives shredded and exponents flattened |
| 10 | `1\. ` escaped | `**SOL. (a)**` | one DOCX, Q and solution interleaved. Numbers TWO questions "96", so one is unnumbered and gets absorbed into Q95; switches from `a.` to `(a)` labels mid-paper |

Three spellings of the shared-context header, and every one missed cost the same two
things — the passage glued onto the PRECEDING question's last option, and no context at
all on the questions it introduces:

| Spelling | Paper |
|---|---|
| `(Q. Nos. 84-85)` | most |
| `(Ex. Nos. 9-10)` | 7 — `Ex.`, not `Q.` |
| `Q.(75-77) :` | 8 — no `Nos.` at all, and the paren sits AFTER the `Q.` |
| `(Q. Nos. 114 and 115)` | 1 — joined by "and", not a dash |

## The weekly series (w1–w4) — what differs, measured

Same pandoc lane, same downstream steps. Four structural differences, each of
which silently lost data before it was handled:

| | w1 | w2 | w3 | w4 |
|---|---|---|---|---|
| standalone GRID answer key | yes, 120/120 | **none** | yes, 119/120 | **none** |
| letters printed on solutions | 33 | 100 | 87 | 103 |
| questions with NO key from any source | 0 | **20** | 0 | **17** |
| shared-context sets | 1 | 16 | 3 | 8 |

- **The answer key is a standalone DOCX holding a GRID table** (`answerKeyDocx`),
  not a tail `ANSWER KEYS` block. Row *k* carries six `(number, letter)` pairs —
  k, k+20, k+40, k+60, k+80, k+100 — so 120 answers fit in 20 rows. Read by
  `parseGridAnswerKey`, which REPORTS duplicate and missing labels rather than
  resolving them; see the w3 defect under Errata.
- **w2 and w4 have no key document at all**, so 37 questions across them have no
  answer from any source and rest entirely on the blind derivation. Those are
  `resolutions` entries carrying the derivation and its numeric verification.
- **Stray `dir="rtl"` runs split question NUMBERS.** Two shapes, both handled by
  `normalizeRtlSpans` and both invisible downstream — a lost question just makes
  the paper commit short:
  - `**2**[0]{dir="rtl"}**.**` — the number split mid-digit;
  - `[40]{dir="rtl"}**.**` — the whole number wrapped, leaving the bold marker
    between the number and its terminator (`40**.**`).
  w3 lost **26 of its 120** questions to these. The same markers wrap ordinary
  prose, so the rule is an unwrap, never a delete.
- **Solution heads carry the answer in four spellings** — `N. Ans. (d) :`,
  `N. Ans-(b)`, `N. Ans- (c)`, `N. Sol. (c)`, plus a bare `N. (b)` — and mix
  within one document. `parseInlineAnswers` accepts an optional answer word
  between the number and the letter; without it w2 read 45 of its 100 printed
  letters and the other 55 reported as "no answer from any source", which is
  indistinguishable from a paper that prints no key.

**A fifth `Directions` spelling: `(Q Nos. 57-59)`, no dot after the Q** (w4).
`NOS_RANGE` already tolerated it; `tests/nda-mock-parse.test.ts` now pins that so
it cannot regress.

### Data printed as a picture of a table

Five questions across the weekly series print their data as an image, leaving the
stem unanswerable — the defect m3 Q60/Q93 still carries as an open item below.
These are clean grids, so they are transcribed as **GFM pipe-tables** into the
stem or the shared context (the bank's own convention: renders on `/browse`,
exports as a native Word table) rather than attached as an image:

| question | data |
|---|---|
| w2 Q104 | x/f frequency row |
| w2 Q110–112 (set) | variate/frequency distribution, total 229 |
| w3 Q90 | probability distribution (the f values sum to 1) |
| w3 Q94–98 (set) | a deliberately INCOMPLETE performance table |
| w4 Q98 | marks/number-of-girls distribution |

Two of these transcriptions are corroborated by the paper's own keys rather than
trusted: w2's missing frequency x = 34 reproduces the printed keys for Q111 and
Q112, and w3's three recovered numbers (10, 32, 30) reproduce all five keys of
the Q94–98 set simultaneously.

**One figure is a genuine diagram and is HELD** — w2 Q109 asks what a plotted
curve represents, and the answer *is* what the curve is called, so it can be
neither transcribed nor described without stating it. This pipeline has no
`image_url` attach path; re-admit the row if one is added.

## Parser traps already paid for

Each of these silently lost real questions before it was fixed; the tests in
`tests/nda-mock-parse.test.ts` pin all of them.

- **A question's own NUMBER can be printed inside its stem.** w2 Q108 reads
  "...the deviations of 50 observations from 30 is **108.** then the mean...", so
  no Q108 start exists to split on. That costs TWO questions, not one: with no
  boundary, Q108's text and its four options are absorbed into Q107, and under
  "last chain wins" Q107 then ships with Q108's options and a key pointing into
  them — a wrong answer on a question that looks intact. Q107 is repaired by
  errata and Q108 supplied via `extraQuestions` (its first use in this pipeline).
- **A 4-space-indented sub-list is not a question.** Q4 embeds "1. AB is defined /
  2. BA is defined"; reading those as question starts truncated the paper at Q4 and
  lost 89 of 120. Hence the ≤3-space cap in `Q_LEAD`, and no whitespace between the
  bold marker and the number.
- **A decimal in a data table is not a question.** A frequency table inside solution
  113 ("5.5 - 10.5") looked exactly like a numbered start. Hence `(?![0-9])`.
- **Interior noise must not end the sequence.** Picking the longest ascending *run*
  split 1..120 into 1..113 and 114..120 and discarded the tail; a greedy forward scan
  picks the noise itself. Question numbering is recovered as a longest increasing
  *subsequence*, tie-broken towards later elements so the boilerplate "Instructions"
  list (1..4) loses to the question body.
- **An option label can be glued to the previous option's math** (`+ c$(d) $\frac...`).
  The label boundary therefore accepts `$` and `)`, and the boundary character stays
  with the option it belongs to — otherwise `\(3\)` is truncated to `\(3\`.
- **Consume NOTHING after an option label.** A boundary character is *required before*
  a label, so anything the match eats after one is stolen from the next label's
  boundary. This truncated option runs twice before the rule was understood:
  `**(a)** … **(b)**` (trailing `*` eaten, so `(b)`/`(c)` vanished) and
  `(c) Only (A) and (B) (d) …` (trailing space eaten, so `(d)` vanished). Trim the
  option TEXT downstream instead.
- **In raw pandoc output `\(A\)` is an escaped literal paren — a genuine label — not a
  math zone.** Math at that stage is `$...$`; the conversion to `\(...\)` happens
  afterwards. A test fixture that writes option math as `\(A\)` is testing the wrong
  input format and will disagree with the real pipeline.
- **`Direction:` takes a colon** — and `**Directions --**` takes emphasis and a dash.
  Missing the colon cost Mock 1 Q71-75 the shared data they depend on, leaving five
  unanswerable questions.
- **An assertion-reason block prints its four codes ONCE**, in the Directions block,
  and none of its questions repeats them (Mock 2 Q102-105). `detectDirectionSets`
  lifts those codes into `set.options` and the member questions inherit them. A
  prose data block has no a->b->c->d chain, so the same code no-ops there.
- **Labels can be `\(a\)`** — pandoc escapes a line-initial literal paren — and can be
  wrapped in emphasis, `**(a)**`. Two coupled traps here: consuming the trailing `*`
  after a label eats the NEXT label's required boundary (so `(b)` and `(c)` silently
  stopped matching), and the bare `x.` label form must be **lowercase only**, because
  uppercase "A." is everywhere in assertion-reason prose ("…and R explains A.").
- **A stray backslash inside a math zone breaks KaTeX.** pandoc's hard-break marker
  lands inside `$...$`; strip it to a fixed point, since a zone can end `...\ \` and
  removing one exposes the other. 25 zones failed on the first attempt.
- **`$...$` zones span newlines** (every matrix), and a newline-forbidding pattern does
  not merely skip them — it pairs one zone's CLOSING `$` with the next zone's OPENING
  `$` and converts the prose between into math. Hence the scanner, not a regex.
- **`\\` at end of line is a matrix row separator, not a hard break.** Stripping it
  blindly broke every matrix and determinant in the paper.
- **`\[` is pandoc's escaped LITERAL bracket, not display math.** pandoc writes real
  display math as `$$`, so every `\[` it emits is a literal `[`. Left escaped, a
  bracketed aside that happens to contain math (`\[but $x \neq \log_2(-1)$\]`) reads as
  a display zone wrapping an inline one — illegal nesting KaTeX rejects outright.
  Unescape BEFORE converting `$...$`, and protect `\left[` / `\right]`.
- **The tail `ANSWER KEYS` block is not always in the question paper.** Mock 4 prints
  it at the end of the SOLUTION doc and gives the QP no key at all, so the block is
  looked for in both documents (and a disagreement between two such blocks is
  reported, not silently resolved).

## A stem repair INVALIDATES that question's blind derivation

The blind pass answers the stem as it stood when the packet was written. Repair
the stem afterwards — restore a lost radical, fix a limit point, supply a missing
context — and the derivation on file is about a different question. `adjudicate`
cannot know that, so it keeps reporting a DISAGREE (or an UNRESOLVED, where the
agent correctly returned `null` on the broken text) forever.

Either re-run that packet, or record a `resolutions` entry saying the blind is
stale and why. Do NOT leave it looking like a live disagreement: the next reader
has no way to tell a real key dispute from a repaired stem. Four questions in
the weekly series carry such an entry — w1 Q51/Q52 (context declared after the
fact), w3 Q57 ('maximum' -> 'minimum'), w4 Q65 (radical restored) — and in each
the agent's own note already says what its answer would have been under the
repaired reading, which is what makes the ruling checkable rather than asserted.

## Errata

`config.ts` carries a per-paper `errata` map, and **every entry is re-verified against
the extracted text before being trusted** — of Mock 1's four `Corrections.docx` items,
two were already applied in the Author Manuscript. Recording that explicitly stops a
later session "re-applying" a fix and corrupting a correct value.

**The weekly series' sharpest key defect is a mislabelled grid cell.** w3's key
prints "59" in the cell where 49 belongs, so 59 appears twice and 49 never does —
and a first-wins read would hand Q59 the letter belonging to Q49 and report a
complete key, i.e. a wrong answer with no symptom. The grid's own geometry fixes
it: the offending cell is the 3rd pair of the row beginning 9 (9, 29, **49**, 69,
89, 109), so its C is Q49's, and the genuine Q59 sits in the row beginning 19 and
reads B. The solution document independently gives B — and that was the ONLY
disagreement between the grid and the 87 letters printed on w3's solutions, which
is what makes the diagnosis safe rather than a guess.

`optionTexts` is the escape hatch for when the source's own option *labels* are broken
(Q17 prints `(a)(b)(c)(c)`): the parser refuses to guess which duplicate was meant to
be `(d)`, so the four texts are supplied explicitly.

## Dedup

`content_hash` is unique per `(org_id, exam_id)`, so a mock question identical to one
already in the NDA bank is dropped by the database. `commit.ts` **reports every such
drop** with the colliding `source_file` and question number, so the overlap stays
visible rather than silently vanishing. Measured overlap is low (6 of 8 probe stems
were absent from the bank).

## Post-commit checks

```sh
npx tsx scripts/nda-mock/verify.ts m7       # which numbers actually landed, and why any are missing
npm run audit:text -- NDA_Maths_Mock_Test_07
npm run audit:keys -- NDA_Maths_Mock_Test_07
```

`verify.ts` distinguishes the three reasons a paper can be short — **deduped** (a twin
elsewhere in the exam, including in the SAME paper), **held** (a `resolutions` hold, or no
settled answer), and **LOST** (a row was built but nothing in the bank carries its hash).
Only the third is a bug.

### Known `audit:keys` false positives

The probe's `concludedLetter` looks for a letter after "Hence"/"Therefore", which also
matches ordinary prose. Source-verified as CORRECT, do not "fix":

| Row | Flag | Why it fires |
|---|---|---|
| m3 Q94 | `SOLN≠KEY` | solution says "nothing can be said about option (a), (b) and (c)" — the trailing `(c)` reads as the conclusion |
| m10 Q11 | `SOLN_A!=KEY_C` | solution ends "Hence A ∩ B = Φ" — `A` is a SET NAME, not an option letter. Key C is right: e^x > x for all real x, so the curves never meet |

The third standing flag is NOT a false positive and must not be "fixed" either:

| Row | Flag | Why it fires |
|---|---|---|
| m6 Q10 | `SOLN_A!=KEY_B` | the printed solution proves "Statement I is false. Statement II is true by definition" and then closes "Hence, **(a)** is the correct answer" — contradicting itself in its own last line. The stored answer B ("Only II") follows the reasoning and is correct; the source's concluding LETTER is the defect |

So the bank-wide sweep over all 1,181 rows leaves exactly three flags: two probe artefacts and one
genuine source contradiction whose row is already right.

## Arbitrating against the printed booklet

```sh
npx tsx scripts/nda-mock/align-printed.ts m10
```

Compares manuscript numbering against the typeset booklet on PROSE WORDS (the booklet's
text layer shreds every formula, so math is useless as a key). **Which booklet belongs to
which manuscript is measured, not assumed** — and the filenames mislead:

| Booklet | Manuscript | Evidence (4-word phrase hits) |
|---|---|---|
| 04, 07, 08, 10 | m4, m7, m8, m10 | 37–43 hits vs ≤12 for any other pairing |
| 01, 05 | — | PDF text layer carries no question prose at all |
| **06, 09** | **NONE** | max 12 hits against any of the nine manuscripts — pure noise. So "Mock 6" as published is NOT the Mock 6 manuscript, and m5's 9 shared questions are probably a source-labelling issue |

So booklet arbitration is available for m4/m7/m8/m10 ONLY. It settled two Mock 10
questions that no other source could: Q112's options (b) and (c) are byte-identical in the
BOOKLET too (the paper's own defect, so the row is held), and Q100's option C really does
print `e^y` on the left, confirming the manuscript lost a superscript rather than the
question being designed that way.

Two measurement traps, both of which produced a wrong answer before being fixed:

- **Overlap must be Jaccard over the UNION.** Dividing by the smaller set scores 1.00
  whenever one stem's words are a subset of the other's, so a 3-word printed stem matched
  dozens of longer manuscript stems perfectly and the tool reported **60 numbering errors in
  an already-committed paper**. All noise.
- **A missing phrase is not evidence of a mismatch.** Even a correctly-paired booklet
  misses ~50% of stems, because its formulas are images and a prose run gets broken. Only
  the CONTRAST between pairings carries information.

## Open, needs a decision (not silently changed)

- **m3 Q60 and Q93** are committed with a markdown image link pointing at a local
  extraction path, and both stems say "as shown in the figure above" — so they are
  unanswerable as shipped. The parser now strips the dead link, but that does not restore
  the figure: these two need the image attached (`image_url`) or a hold.
- **`--` for a minus sign**, ~70 questions across every paper. pandoc writes an en dash as
  `--`, and this source uses en dashes as minus signs throughout (`Y = 1.12X -- 5.8`).
  Converting is a policy call — an en dash, an ASCII minus, or leave it — and most of the
  affected rows are already committed, so it is deliberately untouched.

## The vision lane (Mock 9 only)

```sh
npx tsx scripts/nda-mock/render-vision.ts m9     # both PDFs -> page PNGs at 200 DPI
# [vision agents transcribe pages -> data/m9.transcribe.<range>.json]
npx tsx scripts/nda-mock/extract-vision.ts m9    # merge + pull keys from the solution TEXT
# from here the pandoc lane's steps work unchanged: dump-blind, validate,
# adjudicate, commit, drift, resync, verify
```

Mock 9's equations are legacy MS-Equation `.wmf` objects, so pandoc emits an image
reference and nothing else. Its PDFs *do* carry a text layer, but Word exported every
formula as individually-positioned glyphs, so `(2x^2 - x + 1)^35` arrives as
`35 2 )1 2 ( +-x x` with every exponent flattened onto the baseline. Prose survives;
math does not. Hence: render the pages, transcribe by eye.

**The answer letters still come from TEXT, not vision.** The solution PDF heads each
entry `N. (b)`, and a letter is an ordinary character rather than math, so 109 of 120
parse straight out of the text layer (`parseVisionAnswerKey`). That is not just cheaper —
a single letter read by eye is precisely the kind of thing a transcription slip corrupts
silently and no probe can catch, so having a machine-readable provenance for the key
matters more here than anywhere else. The blind pass then supplies the missing 11 and
cross-checks the other 109.

`extract-vision.ts` emits the SAME `ExtractedQuestion[]` shape as the pandoc lane, which
is what lets every downstream step run untouched. Two deliberate choices:

- **Worked solutions are not transcribed.** They run to 27 pages of equally-flattened
  math, and a row commits without one. `commit.ts` flags each as "no solution in source".
- **The transcription brief says transcribe what is PRINTED**, defect and all, and
  describe the problem in `notes` — which `extract-vision.ts` promotes to a `defects`
  entry. A transcriber who quietly repairs a stem destroys the evidence the adjudication
  step needs. Mock 9's page-1 pass returned 13 such notes, including a question whose
  interval is simply missing from the paper.

### Mock 9's solution document is not fully in step with its question paper

FOUR of its solution entries solve an entirely different question from the one they
are numbered as — the entry headed `9.` works out a mean and standard deviation while
question 9 asks when `(z-1)/(z+1)` is purely imaginary; likewise Q110, Q113 and Q116.
Where that happens the printed key is not merely wrong, it belongs to another question.

**Why this does not put the committed answers at risk.** Every row's answer is also
supported by a blind derivation that never saw the solution document, and 108 of 120
agreed with the text-layer key. The 12 that did not were each adjudicated by hand. So a
foreign solution can only muddy a key's *provenance*, never the stored answer — and no
solution text is stored for this paper at all.

**A vocabulary-overlap probe for this was written and then deleted.** It flagged 40
candidates for the 4 real defects, with "best fit" offsets scattered from -117 to +71,
i.e. noise. The solution bodies are too terse and their notation too far from the stems'
for token overlap to separate a foreign solution from a merely terse one — the real Q113
case scored *lower* than several false positives. Reading each solution is the only
reliable method, and the blind pass already bounds the risk. Do not rebuild it on the
same signal.
