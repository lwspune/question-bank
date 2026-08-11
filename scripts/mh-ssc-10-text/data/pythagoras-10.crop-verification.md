# Crop verification — Pythagoras Theorem (mh-ssc-10-text), 23 figures

Verified 2026-08-11, pre-upload gate. Each crop was checked against
`scripts/mh-ssc-10-text/data/pythagoras-10.questions.json` (matched on `ref`) and, where a
defect or a tight margin was suspected, against the source render
`out/pythagoras-10/p-<NN>.png` and the independent `out/_figure-catalogue.md`.

Two files were checked at `data/figs/` (pre-made masked versions) rather than
`out/pythagoras-10-figs/`, as instructed: `fig-Solved_Ex_4.png`, `fig-Solved_Ex_7.png`.

Method: visual read of every image, plus a programmatic ink-margin scan (distance from the
outermost dark pixel to each edge) to catch clipping too small to see, plus per-page ink-band
analysis to locate the true top/bottom of each figure, its caption, and the prose above/below.

**Result: 22 PASS · 1 FAIL · 4 LOW-severity notes · 0 wrong pairings.**

## Verdict table

| ref | fig | page | verdict | what I saw |
|---|---|---|---|---|
| Solved Ex.1 | 2.11 | 45 | PASS | △ABC complete: A, B, C, right-angle mark at B, `30°` at A, `60°` at C, `14` on AC, caption `Fig. 2.11`. Matches stem (∠B=90°, ∠A=30°, AC=14). Margins t=4 b=7 px — tight but nothing clipped (verified: A-label ink starts y=0.1814, crop top 0.180; caption ends y=0.3758, crop bottom 0.378). |
| Solved Ex.2 | 2.12 | 45 | PASS | △ABC with AD⊥BC: A, B, C, D, right-angle at D, `5` on BD, `8` on DC, `8√2` on AC, caption present. The adjacent right-hand solution column (`AD =`, `DC =`, `BC =`) is correctly excluded at x1=0.370. See LOW note 5 on the `8`. |
| Solved Ex.3 | 2.13 | 45 | PASS | △PQR complete: P, Q, N, R, right-angle at Q, right-angle at N, `9` on PN, `16` on NR, caption `Fig. 2.13`. Matches stem exactly. |
| Solved Ex.4 | 2.14 | 46 | PASS | (masked version) △PQR: P, Q, S, R, right-angle at Q and at S, `10` on PS, `8` on SR, `x` on QS, `y` on QR, `z` on PQ, caption `Fig. 2.14`. Every one of the six quantities the stem's parenthetical claims is visible and on the right segment. Mask is clean — no residual neighbouring content. |
| Solved Ex.7 | 2.16 | 47 | PASS | (masked version) △ABC obtuse layout: B, D, A, C, right-angle mark at D, B-D-C collinear with A below, caption `Fig. 2.16`. The proof line that runs into the `B` vertex (the tightest crop in the chapter per the catalogue) has been masked out cleanly — `B` is intact and no proof text survives. |
| Ex 2.1 Q.2 | 2.17 | 47 | PASS | △MNP: M, N, Q, P, right-angle at N, right-angle at Q on NQ⊥MP. Comfortable margins all round. MQ=9/QP=4 come from the stem, not the figure — correct, the book does not print them. |
| Ex 2.1 Q.3 | 2.18 | 47 | **FAIL** | **Top of the `P` vertex label is sliced flat by the top edge** — ink present in crop rows 0–3 at x 271–289, which is the letter P. Confirmed by zoom (`out/_verify/zoom-Q3-P.png`): the apex of the P is cut off horizontally. Separately the caption's `g` descender in `Fig.` is shaved at the bottom edge (ink in rows 415–418). Diagram body, `10`, `8`, Q, M, R and the right-angle at P are all fine. See FAIL detail below. |
| Ex 2.1 Q.4 | 2.19 | 48 | PASS | △PSR: S, P, R, right-angle mark at S, `30°` at P, `6` on SR, caption `Fig. 2.19` (sitting to the RIGHT of the diagram — the catalogue's crop hazard — and fully captured). **All three data the stem's parenthetical relies on are present and legible.** |
| Ex 2.1 Q.5 | 2.20 | 48 | PASS | △ABC: A, B, C, right-angle mark at B, **double tick marks on both AB and BC** (the equality the stem relies on), `√8` on AC, caption `Fig. 2.20`. **Every stem-relied datum is visible.** The magenta fill-in answer boxes that sit beside this figure are correctly excluded. |
| Ex 2.1 Q.7 | 2.21 | 48 | PASS | △DEF: D, E, F, G, right-angle at F, right-angle at G, `8` on GD, `12` on FG, G clearly between E and D. Caption present. Matches stem. |
| Ex 2.1 Q.9 | 2.22 | 48 | PASS | △PQR: P, Q, R, M, right-angle mark at R, tick marks on RM and MQ showing M is the midpoint, cevian PM drawn. Caption `Fig. 2.22`. Matches stem. |
| Ex 2.2 Q.3 | 2.28 | 52 | PASS | △PQR with S and T on QR: P, Q, T, S, R all present, right-angle mark at T (PT⊥QR), median PS drawn. Caption `Fig. 2.28`. Matches stem ("seg PS is the median … and PT ⊥ QR"). |
| Ex 2.2 Q.4 | 2.29 | 52 | PASS *(LOW)* | **Pairing confirmed** — the diagram is △ABC with M on BC carrying tick marks on BM and MC (i.e. M is the midpoint) and cevian AM drawn, which is exactly what the stem describes. A, B, C, M all present. LOW: the caption's `g` descender in `Fig.` is clipped flat at the bottom edge; caption still fully legible as `Fig. 2.29`. |
| Ex 2.2 Q.5 | 2.30 | 52 | PASS | Rectangle PQRS with interior point T: P, Q, R, S, T, A, B all present; the four segments TP/TQ/TR/TS drawn; dashed seg AB with A-T-B. Caption `Fig. 2.30`. Top margin is 6 px — verified not clipped (content starts y=0.5295, crop top 0.528). |
| PS2 Q.8 | 2.31 | 54 | PASS | △MPN: M, Q, S, R, N collinear along the base ✔; right-angle mark at S (PS⊥MN) ✔; `a` on PQ and on PR ✔; `a` on MQ, on RN, and a dimension bar `a` spanning QR ✔. **Every label transcribed into the stem is present in the figure and matches.** Caption `Fig. 2.31`. |
| PS2 Q.11 | 2.32 | 54 | PASS | Right △ABC (A bottom-right, B top, C left): medians BL (tick marks on CL and LA) and CM (tick marks on BM and MA) both drawn. Caption `Fig. 2.32`. Matches stem. The book prints no explicit right-angle mark at A; the stem states ∠BAC = 90°, so nothing is missing from the crop. |
| PS2 Q.13 | 2.33 | 54 | PASS | △ABC with AD⊥BC: A, C, D, B, right-angle mark at D, D between C and B with CD visibly ~⅓ of DB (consistent with DB = 3CD). Caption `Fig. 2.33`. Top margin 3 px — verified not clipped (A-label ink starts y=0.6580, crop top 0.657). |
| PS2 Q.15 | 2.34 | 55 | PASS | Trapezium ABCD: A, B, C, D, right-angle marks at D and at C, `15` on AD, `15` on BC, `25` on AB, both diagonals drawn. Caption `Fig. 2.34`. Matches stem. |
| PS2 Q.16 | 2.35 | 55 | PASS | Equilateral △PQR: P, Q, R, S, T; `60°` at Q and at R; S and T both on QR; PS and PT drawn. Caption `Fig. 2.35`. Matches stem (S on QR with QS = ⅓QR); T is the book's own construction point, printed in the source. |
| Application of Pythagoras theorem SolvedEx.1 | 2.23 | 49 | PASS *(LOW)* | △ABC with AD⊥BC: A, B, C, D, right-angle at D, labels `c`, `b`, `p`, `a − x`, `x` all present. Caption `Fig. 2.23`. LOW: a sliver of the prose line above bleeds in at the top edge (ink in rows 0–3 spanning x 307–502) — unreadable letter-bottoms, no content. |
| Application of Pythagoras theorem SolvedEx.2 | 2.24 | 49 | PASS *(LOW)* | △ABC with ∠ACB obtuse, AD⊥BC extended: A, D, C, B, right-angle at D, labels `p`, `b`, `c`, `x`, `a` all present. Caption `Fig. 2.24`. LOW ×2: a 3-px sliver of the prose line above at the top edge, and the **top of the solution line `(I)`** intruding below the caption at the bottom edge. `(I)` is a bare equation-reference label — no mathematical content, and this is a solved example whose solution ships anyway — but it is question-adjacent text that should not be in a figure. |
| Apollonius theorem SolvedEx.1 | 2.26 | 51 | PASS | △PQR: P, Q, M, R, median PM labelled `9`, tick marks on QM and MR. Caption `Fig. 2.26`. Matches stem. Note this figure is on `p-51` while its question text is on `p-50` (the catalogue's §3 page-split case) — the crop is correctly taken from p-51 and is complete. |
| Apollonius theorem SolvedEx.2 | 2.27 | 51 | PASS *(LOW)* | Rhombus P-S-R-Q with both diagonals PR and SQ meeting at T; P, S, Q, R, T all present; tick marks on all four sides. Caption `Fig. 2.27`. Matches the stem/solution (□PQRS, diagonals PR and SQ meet at T). LOW: the ascender tips of the following solution line (`Given : …`) intrude ~2 px at the bottom edge — unreadable fragments. |

## The one FAIL, in full

**`Ex 2.1 Q.3` — `fig-Ex_2_1_Q_3.png`, source page index 47 (printed p.38), Fig. 2.18.**

Current bbox: `[0.120, 0.774, 0.415, 0.898]`

Two clips, both caused by `y0`/`y1` being set to the exact ink boundary with no margin:

1. **The `P` vertex label is clipped at the top edge.** Page ink-band analysis puts the P label
   at `y 0.7724–0.7811`; the crop starts at `0.774`, so the top ~0.0016 of page height
   (≈4 page px, ≈5 render px) of the letter is gone. Zoom evidence: `out/_verify/zoom-Q3-P.png`
   — the apex of the P is a flat horizontal cut against the frame. P is the right-angle vertex
   the stem names (`∠QPR = 90°`), so this is a priority-1 label clip.
2. **The caption's `g` descender is shaved at the bottom edge.** Caption band ends at
   `y 0.8979`; the crop ends at `0.898`. Caption still reads `Fig. 2.18`.

**Recommended bbox: `[0.120, 0.770, 0.415, 0.902]`** on page index **47**.
- `y0 0.774 → 0.770` — the nearest ink above is the question's prose line, which ends before
  `y 0.755`, so there is ample clearance; this leaves ~4 page px of margin above the P.
- `y1 0.898 → 0.902` — the magenta page-footer band starts at `y 0.9098`, so 0.902 clears the
  caption descender without touching it.
- `x` bounds are already comfortable (drawing spans `x 0.1325–0.3990` inside `0.120–0.415`).

Verified: `out/_verify/chk-Ex21Q3-fixed.png` is that exact crop rendered from the source page —
complete `P`, complete caption, clean margins, no contamination.

## LOW-severity notes

1. **`Ex 2.2 Q.4` (Fig 2.29, page 52)** — caption `g` descender clipped flat at the bottom edge.
   Caption fully legible; no diagram content or vertex label affected.
   Optional fix: `[0.20, 0.398, 0.43, 0.539]` → **`[0.20, 0.398, 0.43, 0.5415]`**
   (caption ink ends `y 0.5397`; the next prose line starts `y 0.5425`).
   Verified: `out/_verify/chk-Ex22Q4-fixed.png`.
2. **`Application of Pythagoras theorem SolvedEx.1` (Fig 2.23, page 49)** — bottom sliver of the
   prose line above bleeds into the top edge. Unreadable, no content leaked.
   Optional fix: `y0 0.383 → 0.388` (prose above ends `y 0.3855`; the `A` label starts `y 0.3930`).
3. **`Application of Pythagoras theorem SolvedEx.2` (Fig 2.24, page 49)** — 3-px prose sliver at
   the top edge, and the top of the solution's `(I)` reference label below the caption.
   The most substantive of the four contamination notes, though still content-free.
   Optional fix: `[0.55, 0.703, 0.90, 0.885]` → **`[0.55, 0.706, 0.90, 0.876]`**
   (prose above ends `y 0.7031`, `A` starts `y 0.7118`; caption ends `y 0.8690`, `(I)` starts `y 0.8824`).
4. **`Apollonius theorem SolvedEx.2` (Fig 2.27, page 51)** — ascender tips of the next solution
   line (`Given : …`) intrude ~2 px at the bottom edge. Unreadable.
   Optional fix: `y1 0.620 → 0.615` (caption ends `y 0.6113`; next prose starts `y 0.6196`).

Notes 2–4 are the "stray glyph fragments from prose running alongside the figure" class the
brief pre-accepts. They are cosmetic and would not make any question unanswerable or leak
anything; the bbox corrections are given so they can be cleared in one pass alongside the FAIL
if that is cheap.

## Answer leak

**None found.** No crop contains a worked solution, a numeric result, or an answer written into
the diagram. The two contamination fragments that come from solution text
(`(I)` in Fig 2.24, the ascender tips in Fig 2.27) carry no mathematical content, and both sit
on *solved examples* whose solutions are published with the question in any case.

One thing that is **not** a crop defect but is worth knowing (item 5):

5. **`Solved Ex.2` (Fig 2.12)** — the figure prints `DC = 8`, which the stem does not state, and
   from which both requested quantities follow almost immediately (`BC = 5 + 8 = 13`, and
   `AD = DC = 8` by the 45-45-90 property). I confirmed against the source page
   (`out/_verify/chk-SolvedEx2-wide.png`) that this is **the textbook's own figure**, printed
   exactly so, and that no `45°` mark or other label was lost in the crop. The crop is faithful;
   the redundancy is the book's. This is a solved example, so nothing is given away that the
   published solution does not already give.

## Pairing

**Every one of the 23 images is paired with the correct question.** Each diagram was read
against its question's stem independently of the filename. The three flagged for particular
attention:

- **`Ex 2.2 Q.4`** (stem names no figure number; pairing was inferred from page layout) —
  **CONFIRMED CORRECT.** The stem is "In △ABC, point M is the midpoint of side BC … AM = 8 cm,
  find BC"; the diagram is △ABC with M on BC carrying tick marks on both BM and MC and the
  cevian AM drawn. Vertex letters, the midpoint marking and the cevian all match. No other
  figure on page 52 could belong to it (2.28 is △PQR with a median *and* an altitude, 2.30 is a
  rectangle), and no other question on the page is unaccounted for.
- **`Ex 2.1 Q.5`** and **`Ex 2.1 Q.4`** (stems say the figure supplies data the sentence does
  not) — **CONFIRMED, and every stem-relied datum is visible.** Fig 2.20 shows the right-angle
  mark at B, double tick marks on both AB and BC, and `√8` on AC. Fig 2.19 shows the
  right-angle mark at S, `30°` at P, and `6` on SR.
- **`PS2 Q.8`** (labels transcribed into the stem) — **CONFIRMED, all six claims match.**
  M-Q-S-R-N collinear ✔, seg PS ⊥ seg MN (right-angle mark at S) ✔, PQ = PR = a ✔,
  MQ = QR = RN = a ✔ (MQ and RN labelled directly, QR by a dimension bar).

---

Scratch evidence written during this pass lives in `out/_verify/` (comparison crops and zooms).
No JSON, no manifest and no figure image was modified.
