# MH HSC Class-12 Maths — the BOARD PAPER lane

The sibling pipeline one directory up (`../extract.ts`) ingests an LWS
**chapterwise compilation** (.docx, via pandoc). This lane ingests the **actual
printed board question papers** (PDF). Different source, different failure modes,
and — for the two sittings they overlap on — a way to check the compilation
against the page it was typed from.

## The six papers

| id | source file | printed cover | code | status |
|---|---|---|---|---|
| `feb-2026` | `March 2026 paper.pdf` ⚠ | **2026 II 21** | J-165 | new |
| `jun-2026` | `June 2026 paper.pdf` | 24/06/2026 | J-276 | new |
| `jul-2024` | `Maths July 2024 paper.pdf` | 2024 VII 25 | J-174 | new |
| `jul-2025` | `Maths July 2025 paper.pdf` | 2025 VII 03 | J-384 | new |
| `mar-2024` | `Maths March 2024 paper new.pdf` | 2024 III 02 | J-862 | **reconcile** — 42 of 44 in bank |
| `feb-2025` | `Maths March 2025 paper new.pdf` ⚠ | **2025 II 22** | J-312 | **reconcile** — 44 of 44 in bank |

⚠ **Two files are misnamed**, both calling a February sitting "March". The
printed cover is truth; `render.ts` re-reads it and REFUSES to run on a paper
whose cover disagrees with `config.ts`. Fault-injecting a wrong month and a
wrong paper code both trip it, so it is a gate rather than a comment.

**The compilation's 2024/2025 rows ARE these papers.** Their `Q. 1. (vi)`,
`Q. 1. (vii)`, `Q. 1. (viii)` and `Q. 2. (iv)` stems match the March-2024 cover's
items verbatim. A question-number census gives the exact delta: March 2024 is
missing `Q. 2. (iii)` and `Q. 23`; February 2025 is complete.

## Paper shape — identical on all six

44 items, 112 printed marks against a Max of 80. The gap **is** the optionality.

| section | refs | n | format | marks | choice |
|---|---|---|---|---|---|
| A | `Q. 1. (i)`–`(viii)` | 8 | mcq | 2 | all |
| A | `Q. 2. (i)`–`(iv)` | 4 | subjective | 1 | all |
| B | `Q. 3`–`Q. 14` | 12 | subjective | 2 | any 8 |
| C | `Q. 15`–`Q. 26` | 12 | subjective | 3 | any 8 |
| D | `Q. 27`–`Q. 34` | 8 | subjective | 4 | any 5 |

**Not a `/mock` candidate**, complete though these papers are: 36 of 44 items are
free-response and three sections carry "attempt any N". Neither auto-grades.

## The text layer is lossy, and silently

Born-digital typeset, so a text layer exists (~5–7k chars) — but every math
symbol is a glyph **image**, not a character, so the layer renders

    The converse of contrapositive of  is _____.

for a question whose entire content is the missing `~p → q`. Nothing marks the
hole. `dump-text.ts` marks it: each line carrying dropped glyph-images is
prefixed `[math xN]`, so a transcription pass can see its own blind spots.
Measured loss: 40–72% of lines per paper.

**Use the text layer for** numbering, section boundaries, marks brackets, reading
order and pure-prose stems. **Never** transcribe math from it.

## Figures

Switching circuits are the only figure genre in this corpus — 5 of 5 in the
shipped bank, 4 of 4 here. `fig_bounds.py` finds them; see its docstring for the
two rules and the measurements behind them. In short: a figure is embedded as one
raster **sliced into contiguous same-x strips**, and is distinguished from tall
display math by having **no text beside it** (once the right-margin marks bracket
is excluded) plus a height floor sitting in a measured 21.0pt → 82.3pt gap.

Result across the six papers: **4 figures, 0 false positives.**

| paper | ref | in bank? |
|---|---|---|
| `mar-2024` | `Q. 15` | yes — a 512×276 speckled photocopy, to be **replaced** |
| `feb-2025` | `Q. 15` | yes — 437×210, to be **replaced** |
| `jul-2024` | `Q. 27` | **no** — sitting never ingested |
| `jul-2025` | `Q. 27` | **no** — sitting never ingested |

`Q. 3` on both 2026 papers says "**Construct** the switching circuit" — the
student draws it, so there is nothing to crop. Do not add them to `figureRefs`.

⚠ **A grep over the stems missed `jul-2024` Q.27** — the corpus's largest figure.
The stem does say "the following **circuit**"; the pattern enumerated
`switching circuit` and `given circuit` and never bare `circuit`, so a third
phrasing walked through and nothing reported a near-miss. Detection over the
whole paper found it at once. That is why `crop-figures.ts` reconciles detection
against the manifest **both ways** and fails on either mismatch, and why
detection — not prose — is the source of truth for `figureRefs`.

⚠ **A crop is not verified because the geometry is confident.** On the NCERT
Class-10 run, 6 of 22 crops passed every numeric check and were visibly wrong.
`crop-figures.ts` writes a contact sheet and prints REVIEW REQUIRED; it never
reports success. The human verdict lives in `data/figures/verified.json`, and a
crop with no entry there has not been looked at.

## Pipeline

```sh
# 1. verify each printed cover against the manifest, then rasterise
npx tsx scripts/mh-hsc-12-pyq/paper/render.ts --all

# 2. dump the lossy text layer as a transcription scaffold
npx tsx scripts/mh-hsc-12-pyq/paper/dump-text.ts --all

# 3. find + crop the figures, then LOOK at out/_contact/<id>.png
npx tsx scripts/mh-hsc-12-pyq/paper/crop-figures.ts --all

# 4. vision-transcribe, one agent per section block (A-mcq / A-vsa / B / C / D)
#    -> data/<id>.<block>.json   (PaperQuestion[], chapter HARD-validated)
# 5. blind MCQ key pass — stem + options only, no sight of step 4's answers
# 6. author model answers to ../SOLUTION_BRIEF.md (board-answer style)
# 7. merge -> commit PRIVATE -> audit -> attach figures -> flip PUBLIC
```

Steps 4–7 are not built yet. Step 7's commit must **name** every row the
exam-scoped `content_hash` absorbs into an existing one: board reuse is real here
(the chain-rule proof already appears 4× across 2016–2022, the pair-of-lines
theorem 4× across 2016–2025), and a silent `skipped=1` in a whole-paper ingest is
indistinguishable from a question that was never on the paper.

## Reconciliation is gated

`mar-2024` and `feb-2025` overlap 86 rows that are already PUBLIC. Verifying
those against the printed page is the highest-value thing in this batch — it is
the first independent ground truth for a compilation the project has already
caught wrong 18 times out of 22 adjudicated defects. It is also **rework of
shipped content**, so it goes through a backfill-ledger entry + a 360 analysis +
explicit sign-off before any row is touched.

Note `content_hash` covers the stem, so correcting a stem is **delete +
re-commit**, not an edit — which is exactly why the gate exists.
