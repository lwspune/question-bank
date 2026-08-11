# Pythagoras Theorem (MH State Board Class 10, Geometry) — ingest findings

56 textbook rows, `question_kind='practice'`, PUBLIC, alongside the chapter's 35
board PYQs. Ingested 2026-08-11.

## Verification summary

| Check | Result |
|---|---|
| Answer-key cross-check (step 6), keyed questions | **28 / 28 AGREE**, 0 disagreements |
| MCQ keys | **3-way agreement on all 8** — two independent blind derivations + the book's printed key |
| Unkeyed proofs | 8, each verified numerically before the proof was written (see below) |
| Book answer-key errors found | **0** |
| Question-level textbook defects | **0** |
| `audit:text` · `audit:keys` · `audit:omml` · `board:lint` | clean |

The MCQ agreement is genuinely independent: the transcribing agent derived its
letters without opening the key, a second agent transcribed the key without
seeing the questions, and a third re-derived from a dump with the key withheld.
All three produced `B, B, A, C, D, C, B, A`.

**0 book answer-key errors is unusual for this project** (across the 12 Class-12
chapters the Balbharati key was wrong ~4× as often as our authored answers). This
chapter's key is clean — every one of the 28 printed answers reproduced.

## The 8 unkeyed "prove that" questions

The book prints an answer for every numeric question and none for these. There is
therefore no external check on them; the compensating controls are (a) each claim
verified numerically with concrete instances BEFORE the proof was written, and
(b) every step cited to a result this chapter itself establishes
(`pythagoras-10.chapter-theorems.md` is the inventory).

These 8 rows — and only these — carry `derived_model` / `derived_at`, matching
the convention on the other State Board books: stamped where nothing external can
confirm the answer.

| Ref | Verified with |
|---|---|
| Ex 2.1 Q.9 | (PR, RM) = (3,4), (5,2), (7,1.5) |
| Ex 2.2 Q.3 | (ST, QR/2, PT) = (1,3,4), (2,5,3), (0.5,4,7) |
| Ex 2.2 Q.5 | rect 5×4 T(2,1); 9×2 T(7,1.5); 3×3 T(1,2) |
| PS2 Q.8 | a = 1, 2, 3.5 |
| PS2 Q.9 | 4 parallelograms incl. an oblique one |
| PS2 Q.11 | 3-4-5 right triangle |
| PS2 Q.13 | AD=2, CD=1, DB=3, BC=4 |
| PS2 Q.16 | side a = 3 |

**Ex 2.2 Q.3's figure is load-bearing.** Fig. 2.28 fixes the order Q–T–S–R, which
decides the sign: ∠PSR obtuse (so `+2·SR·ST`) and ∠PSQ acute (so `−2·QS·ST`).
From the stem alone one could pick either and produce a proof that "works" for a
configuration the figure rules out.

## One result the chapter does not give you

**PS2 Q.14** (distance from the apex to the centroid) needs the centroid 2:1
division. Chapter 2 states Apollonius but never the centroid ratio, so its last
step cannot be taken from this chapter alone — the stored solution says so
explicitly rather than importing the fact silently. The printed key gives 8 cm,
so the book evidently expects it from earlier study (it is Class-9 material).

## Textbook defects — reported, not corrected

None of these affects an answer, so none carries a `[Textbook …]` errata bracket
(that convention marks a defect in a QUESTION or its KEY; these are in the
chapter's prose).

1. **A real algebraic misprint, printed p.31**, in the "For more information"
   Pythagorean-triplet box. Line (II) prints
   `(a² − b²) = a⁴ − 2a²b² + b⁴` — no square on the left, equating a degree-2
   expression to a degree-4 one. Line (I) above it carries its square, and the
   book's own conclusion two lines below prints `(a² − b²)²`. So the page
   contradicts itself. Verified independently against the page image and the
   text layer. **This is the one worth sending to Balbharati.**
2. `p.50` Ex.(2) jumps from `c² = a² + 2ax + x² + p²` to `∴ c² = a² + 2ax + b²`
   without showing `+x² − x²` cancelling. Result correct, a step is missing.
3. Practice set 2.2 Q.3 labels its two parts inconsistently — `(1)` then `ii)`.
4. Spellings: "remaning" (pp.30, 35 — correct on p.34), "refering" (p.30),
   "obtain 5 Pythagorean triplet" (p.31), "parellel" (p.39 Q.10),
   "hypotenus" (p.44 Q.1(7)), "the length a diagonal" (p.44 Q.2(3)),
   "equilatral" (p.46 Q.16), and a missing full stop in "Remember this!" item 3.

Items in (4) that appear inside a QUESTION STEM were corrected in the stored row
(house rule: correct where nothing factual turns on it; preserve-and-flag
anything that changes a claim). The correction is recorded here so it is not
silent, and is re-runnable via `normalise-bands.ts`.

Not a defect, recorded so nobody "fixes" it: **Solved Ex.7** asks to prove
`AB² + CD² = BD² + AC²` and its printed final line reads `AB² + CD² = AC² + BD²`
— the same identity with the right-hand terms swapped. Transcribed as printed.

## Source-layer note

Transcription was VISION-ONLY and had to be. The text layer of
`10th_Maths_Part2_SB.pdf` drops **every** radical (zero `√` characters in the
whole chapter) and collapses stacked fractions, so p.32's "each perpendicular
side is 1/√2 times the hypotenuse" extracts as `1\n2`, i.e. 1/2 — a false
statement from a book that is correct. The answer pages carry the same defect
(`PS = 6 3` is `6√3`). See the note on `pythagoras-10` in `config.ts`.
