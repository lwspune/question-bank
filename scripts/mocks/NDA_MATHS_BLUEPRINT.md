# NDA Paper I — Mathematics · Mock Blueprint

**Standing reference. Read this file before building any NDA Maths mock paper.**
Do not re-derive the weightage from scratch and do not invent a syllabus-based split —
the numbers below are measured from the bank, and the method is recorded so a later
session can re-run it rather than guess.

- **Scope:** offline/printed mock, assembled in the `/browse` paper builder → Word download.
- **Not** the online `/mock` runner. That surface serves real papers whole ("use PYQPs as is",
  2026-07-10) and this blueprint deliberately does NOT change that decision — a sampled
  paper is a separate product, and it must never be published as a `mock_tests` row
  alongside the 18 faithful PYQ sittings.
- **Naming:** `MockPaperBlueprint` in `src/lib/mocks/blueprints.ts` already means something
  else — the *delivery* shape (duration, marking, sections) of a real paper. This file is a
  *content* blueprint. Keep the two words apart in code.

---

## 1. Paper spec (matches the real UPSC paper)

| | |
|---|---|
| Questions | 120 |
| Marks | 300 |
| Duration | 150 min |
| Marking | +2.5 correct, −0.83 wrong |
| Format | MCQ, 4 options, exactly one correct |

---

## 1a. HARD RULES — these override the allocation

> **RULE 1 — A CONTEXT IS ALL-OR-NOTHING.**
> If you pick **any** question that shares a context with others, you must include **every**
> question of that context. Never take a subset. Never take one and leave the rest.
>
> The grouping key is **`questions.set_id`** — take all rows with the same `set_id`.
> If a context cannot be included whole, **drop it entirely** and pick a different question.

Why it is absolute: the shared context is printed once and literally reads *"Consider the
following for the next 03 (three) items"*. Ship two of those three and the paper promises three
questions and delivers two — visibly broken to every student holding it, and unfixable after
printing. The context is also the only place the data lives (the stems are *"What is the value
of A?"*, *"What is the value of B?"*), so a split set can leave a question with no data at all.

**Consequences for counting — the allocation bends to this rule, not the other way round:**
- The **whole set counts** against the subtopic's `n`. A 3-set fills 3 slots.
- If a set is larger than the slots left in that subtopic, either take it whole and borrow the
  slots from **another subtopic in the same chapter**, or skip the set. Never split it.
- Set siblings are **mixed difficulty** (a 3-set can be HARD + MODERATE + MODERATE). Accept the
  resulting drift in the E/M/H split — a bent difficulty profile is a rounding matter; a broken
  context is a defective paper.
- **On the printed paper, keep set siblings consecutive** with the context printed once above
  them. This is the one exception to the "interleave chapters" instruction in §6.

**Scale:** 456 of 2,160 PYQs (21%) sit in 198 multi-question sets — 155 of size 2, 39 of size 3,
1 of size 4, 3 of size 5. The practice pool has exactly **one** such pair (2 questions), which is
the main reason practice is the cleaner sampling source.

`set_id` is verified sufficient: of the 198 multi-question context groups, **0 have a null
`set_id` and 0 are split across different `set_id`s**, so grouping by `set_id` is exactly
grouping by shared context. 14 further PYQs carry a context but are genuine singletons — those
are safe to pick alone.

**Check before printing** (must return zero rows):
```sql
-- any set represented in the paper but not fully included
select q.set_id, count(*) picked,
       (select count(*) from questions x
         where x.set_id = q.set_id and x.visibility = 'PUBLIC') AS in_bank
from questions q
where q.id = any (:picked_ids) and q.set_id is not null
group by q.set_id
having count(*) <> (select count(*) from questions x
                     where x.set_id = q.set_id and x.visibility = 'PUBLIC');
```

> **RULE 2 — FILL A GAP FROM ANOTHER EXAM RATHER THAN DISTORTING THE BLUEPRINT.**
> When the NDA practice pool cannot supply a cell, take the question from another exam's bank
> instead of dropping the slot or over-filling a neighbouring subtopic. The paper is defined by
> the blueprint, not by which `exam_id` a question happens to be filed under.

Every source below is a PUBLIC MCQ in the same *subject*; only the exam row differs. Use in this
order and record which source each filled question came from.

| # | Source exam | Unused MCQ | Unused EASY | Use it for |
|--:|---|--:|--:|---|
| 1 | **NDA — Mathematics** (`question_kind='practice'`) | 3,671 | 678 | The default. Same taxonomy, so chapter/subtopic map 1:1. |
| 2 | **Worksheets - 11th+12th** | **7,356** | 2,552 | **Best source for a missing TOPIC.** LWS's own *Cadetprep NDA-Maths* course — NDA-targeted by construction, so syllabus fit is a given, and it is the only bank holding the three chapters NDA practice cannot fill. **Do NOT take its EASY tier** — see the calibration warning below. |
| 3 | **State Board textbook MCQs** — MH HSC 12 · MH SB 11 · MH SB 9 | 184 · 167 · 83 (**434**) | 65 · 50 · 57 (**172**) | The Balbharati books' own "select the correct alternative" blocks. Textbook-clean, well-keyed (every one blind-re-derived at ingest), and **EASY-rich** — 40% of them, against 8% in the depleted NDA practice pool. Best second source for EASY. |
| 3b | MHT-CET | 2,016 | 223 | Set on the State Board syllabus, so 11th/12th algebra, calculus and coordinate geometry map onto NDA well. Screen for fit. |
| 4 | CBSE Class 12 | 756 | 313 | MCQ subset only — most of that bank is subjective and cannot enter an MCQ paper. |
| 5 | JEE Mains | 2,620 | **51** | Sparingly. Hardest bank, almost no EASY, and it carries content outside the NDA syllabus — screen with `question_audience_exclusions` (migration 0062). |
| 6 | NDA PYQ | — | — | Last resort: every PYQ is already inside the 18 published mocks, so it is a repeat. |

**Do NOT use CBSE Class 11 — that book contains ZERO MCQs** (measured; it has no "choose the
correct answer" anywhere), so it can never supply an MCQ paper.

> **RULE 2a — DIFFICULTY LABELS ARE NOT COMPARABLE ACROSS EXAMS.**
> `EASY`/`MODERATE`/`HARD` are assigned *relative to the exam the question was ingested for*, so
> the same label means a different standard in each bank. Never carry a label across a bank
> boundary unexamined — match on TOPIC, then judge the level by reading the question.

Calibration against NDA, to apply when filling:
- **Worksheets is a foundation course, so its EASY sits BELOW NDA standard** — a Worksheets EASY
  in an NDA paper is a giveaway. When filling an NDA EASY slot from Worksheets, **step up one
  tier and take a MODERATE**; for a MODERATE slot take a HARD. This is why source 2's large EASY
  count is deliberately not the reason to pick it.
- **State Board textbook MCQs sit closest to NDA level** (board-standard questions, not drill),
  which is what makes source 3 the right one for the EASY tier despite being ~17× smaller.
- **JEE runs harder than NDA throughout** — a JEE MODERATE is nearer an NDA HARD.

**Four things that bite when filling across exams:**
- **Chapter and subtopic rows are per-exam**, so the blueprint's subtopic id does not transfer.
  Match by NAME, and expect near-misses — NDA prints `Height & Distance`, Worksheets prints
  `Height and Distance`.
- **Syllabus fit is not automatic** for sources 3–5. A chapter existing in both banks does not
  mean the questions are in NDA scope; the further from source 2, the more this matters.
- **RULE 1 still applies** — check `set_id` in the source exam too.
- **Re-run the §5c structural exclusion** against the source exam; it is not NDA-specific.

**Measured for the three chapters NDA practice cannot fill at all** (all three fully consumed by
existing papers). MHT-CET and CBSE carry **none** of them — they are not in those syllabi — so
source 2 is the only viable fill:

| Chapter | NDA practice unused | Worksheets unused MCQ (E / M / H) |
|---|--:|---|
| Height & Distance | 0 | **316** (106 / 142 / 68) |
| Logarithms | 0 | **162** (73 / 75 / 14) |
| Binary Numbers | 0 | **65** (35 / 41 / 9) |

---

## 2. Evidence base

Measured **2026-08-25** against the live bank.

- **2,160 PYQs across 18 complete sittings** (2017 Apr → 2026 Apr), **exactly 120 per sitting**.
  So chapter weightage is *measured*, not estimated.
- The split is **9 papers pre-2022 / 9 papers 2022+**, so old-vs-new comparison needs no
  normalising. 2020 has one sitting only (Sep 2020 cancelled).
- 31 chapters, 111 subtopics, every PYQ row carries both.

### The paper has drifted — this is what a syllabus-based blueprint gets wrong

Per-paper averages: lifetime-18 → recent-9 (2022+) → last-5 (2024+).

| Rising | | Falling | |
|---|---|---|---|
| Probability | 8.11 → 9.89 → **11.40** | Statistics | 10.33 → 7.44 → **6.40** |
| Definite Integration | 2.89 → 4.44 → 4.80 | Differential Equations | 4.44 → 2.56 → **2.20** |
| Applications of Integration | 0.89 → 1.89 → 2.00 | Trigonometric Identities | 8.56 → 6.78 → 6.60 |
| Binomial Distribution | 1.11 → 2.22 → 2.00 | Sets & Relations | 4.44 → 3.22 → 2.80 |
| Permutation & Combination | 3.78 → 4.89 → 4.60 | Lines | 6.00 → 4.78 → 5.40 |
| Properties of Triangle | 2.22 → 3.22 → 3.00 | Application of Derivatives | 4.56 → 3.56 → 3.80 |

Most stable chapter: **3D Geometry** (4.94/paper, sd 0.64). Most volatile: **Trigonometric
Identities** (sd 3.69, range 2–16).

### Difficulty hardened, then held

| Window | EASY | MODERATE | HARD |
|---|---|---|---|
| All 18 papers | 30.6% | 46.8% | 22.5% |
| Recent 9 (2022+) | **25.1%** | **48.4%** | **26.5%** |
| Last 5 (2024+) | 25.3% | 47.8% | 26.8% |
| *Practice pool (supply)* | *11.1%* | *60.2%* | *28.7%* |

Recent-9 and last-5 agree to within 0.3pp — a **stable regime, not sampling noise**.

---

## 3. Method (reproducible — re-run when the bank grows)

Two axes, deliberately treated **differently**:

- **Chapter + subtopic weight** = `0.60 × recent-9 + 0.40 × lifetime-18`, then
  largest-remainder (Hamilton) rounding to 120.
  *Why blend:* per-chapter counts are noisy at the tail (a 1.2/paper chapter is ~11 questions
  total across 18 papers). Blending shrinks toward the 18-paper mean — statistically the right
  move — while keeping ~2/3 of the measured drift.
- **Difficulty** = **recent-9 only, NOT blended.**
  *Why not blend:* it is one proportion over 1,080 questions, and two independent windows agree
  to 0.3pp. Lifetime includes an era that is measurably different, so blending would drag back
  a regime that is gone.

Both weight series sum to 120 by construction (every sitting is exactly 120 questions), so any
convex blend also sums to 120.

**Result: 30 EASY / 58 MODERATE / 32 HARD = 120** — the per-chapter largest-remainder rounding
landed on the global target exactly, with no manual adjustment.

The SQL that produces every table below is in §7.

---

## 4. THE BLUEPRINT — 120 questions

Each subtopic row is **directly executable as a `/browse` filter**:
`Exam = NDA · Subject = Mathematics · Chapter = … · Subtopic = … · Difficulty = …`
(`src/lib/questions/filters.ts` supports all four axes plus the PYQ/Practice `kind` toggle.)

Ordered by chapter allocation, descending.

### Matrices & Determinants — 10 (E2 / M5 / H3)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Determinant Properties, Operations, and Sums | 3 | 0 | 1 | 2 |
| Cofactors, Adjoint, and Inverse | 2 | 0 | 2 | 0 |
| Matrix Operations, Polynomials, and Equations | 2 | 0 | 2 | 0 |
| Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation | 2 | 2 | 0 | 0 |
| Special Determinants — Trig, Complex, Roots of Unity, Polynomial | 1 | 0 | 0 | 1 |

*Largest chapter in the paper and the hardest big one (30.6% HARD lifetime). "Linear Systems —
Consistency, Cramer's Rule" (0.44/paper) drops out at 120.*

### Probability — 9 (E3 / M4 / H2)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Probability via Counting | 5 | 2 | 2 | 1 |
| Conditional Probability, Total Probability, and Bayes' Theorem | 1 | 0 | 1 | 0 |
| Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive | 1 | 1 | 0 | 0 |
| Independent Events | 1 | 0 | 1 | 0 |
| Bounds on Probability | 1 | 0 | 0 | 1 |

*Fastest-rising chapter. With Binomial Distribution (2) the probability block is **11 of 120**.*

### Statistics — 8 (E3 / M4 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Measures of Central Tendency — Mean, Median, Mode | 4 | 2 | 2 | 0 |
| Dispersion — Standard Deviation, Variance, Mean Deviation | 2 | 0 | 2 | 0 |
| Regression and Correlation | 1 | 0 | 0 | 1 | ⚠ |
| Frequency Distributions and Graphical Representation | 1 | 1 | 0 | 0 | ⚠ |

*Steepest decline in the paper (10.3 → 6.4). Easiest big chapter — 12.5% HARD.
⚠ = thin/zero practice supply, see §5.*

### Trigonometric Identities — 7 (E1 / M3 / H3)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Compound Angle Formulas | 2 | 0 | 2 | 0 |
| Multiple and Half-Angle Formulas | 2 | 0 | 0 | 2 |
| Product-to-Sum and Sum-to-Product Identities | 1 | 0 | 0 | 1 |
| Maximum and Minimum of Trigonometric Expressions | 1 | 1 | 0 | 0 |
| Specific Values and Quadrants | 1 | 0 | 1 | 0 |

### Functions — 6 (E2 / M3 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Domain, Range, and Function Properties | 2 | 2 | 0 | 0 |
| Composition and Inverse of Functions | 2 | 0 | 1 | 1 |
| Functional Equations | 1 | 0 | 1 | 0 |
| Function Definition and Classification — Injectivity, Surjectivity, Bijectivity | 1 | 0 | 1 | 0 |

*"Greatest Integer Function" (0.39/paper) drops out at 120.*

### 3D Geometry — 5 (E1 / M3 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Sphere | 1 | 0 | 1 | 0 |
| Direction Cosines and Ratios | 1 | 0 | 1 | 0 |
| Distance, Section, and Collinearity in 3D | 1 | 0 | 0 | 1 | ⚠ |
| The Plane | 1 | 1 | 0 | 0 |
| The Straight Line in 3D | 1 | 0 | 1 | 0 |

*The most predictable chapter in the paper — sd 0.64, present in all 18 sittings.*

### Differentiation — 5 (E1 / M2 / H2)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions | 2 | 0 | 2 | 0 |
| Parametric, Implicit, and Higher-Order Derivatives | 2 | 0 | 0 | 2 |
| Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions | 1 | 1 | 0 | 0 |

### Limits & Continuity — 5 (E2 / M2 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory | 2 | 0 | 2 | 0 |
| Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms | 2 | 2 | 0 | 0 |
| One-Sided Limits, Greatest Integer, and Absolute Value Limits | 1 | 0 | 0 | 1 |

### Lines — 5 (E1 / M3 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Equation, Slope, and Family of Lines | 2 | 1 | 1 | 0 |
| Triangles, Quadrilaterals, and Polygons | 1 | 0 | 1 | 0 |
| Distance, Section, and Locus | 1 | 0 | 0 | 1 |
| Angle Between Lines, Parallelism, and Perpendicularity | 1 | 0 | 1 | 0 |

### Permutation & Combination — 5 (E1 / M3 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Forming Numbers from Digits | 1 | 0 | 1 | 0 |
| Arrangements with Restrictions | 1 | 0 | 1 | 0 |
| Factorials and Binomial Coefficients | 1 | 0 | 0 | 1 |
| Geometric Counting | 1 | 0 | 1 | 0 |
| Combinations | 1 | 1 | 0 | 0 |

### Sequence & Series — 5 (E1 / M3 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Arithmetic Progressions | 3 | 0 | 3 | 0 |
| Geometric Progressions | 1 | 1 | 0 | 0 | ⚠ |
| Interrelating AP, GP and HP | 1 | 0 | 0 | 1 |

*AP dominates GP nearly 2:1 and the gap is widening (GP 15 old → 4 new).*

### Vectors — 5 (E1 / M3 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Cross Product and Triple Product | 2 | 0 | 1 | 1 |
| Dot Product and Angle | 2 | 1 | 1 | 0 |
| Vector Geometry — Triangles, Parallelograms, Quadrilaterals | 1 | 0 | 1 | 0 |

### Application of Derivatives — 4 (E2 / M1 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Monotonicity, Extrema, and Critical Points | 3 | 2 | 1 | 0 | ⚠ |
| Optimisation — Geometric, Trigonometric, AM-GM | 1 | 0 | 0 | 1 |

*"Tangents and Slopes" has 0 questions since 2021 — correctly drops out.*

### Complex Numbers — 4 (E1 / M2 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Modulus, Argument, and Conjugate | 2 | 0 | 2 | 0 |
| Cube Roots of Unity | 1 | 0 | 0 | 1 |
| Powers and Roots | 1 | 1 | 0 | 0 | ⚠ |

### Definite Integration — 4 (E1 / M2 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Properties of Definite Integrals — Symmetry, King's, Odd/Even | 2 | 0 | 1 | 1 |
| Fundamental Theorem, Periodic Integrals, and Leibniz Rule | 1 | 1 | 0 | 0 |
| Integration of Absolute Value, Piecewise, and Greatest Integer Functions | 1 | 0 | 1 | 0 |

### Quadratic Equations — 4 (E1 / M1 / H2)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Vieta's Relations and Root-Coefficient Identities | 2 | 0 | 1 | 1 |
| Nature of Roots and Boundary Conditions | 1 | 1 | 0 | 0 | ⚠ |
| Special Quadratics — Parametric, Logarithmic, Constructed | 1 | 0 | 0 | 1 |

*39.7% HARD — one of the three hardest chapters.*

### Sets & Relations — 3 (E1 / M2 / H0)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Counting Sets, Subsets, and Inclusion-Exclusion | 1 | 1 | 0 | 0 |
| Set Operations, Identities, and Cartesian Products of Sets | 1 | 0 | 1 | 0 |
| Relations — Properties, Cartesian Product, and Counting | 1 | 0 | 1 | 0 |

### Binomial Theorem — 3 (E1 / M1 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Coefficients and Specific Terms in Expansion | 1 | 0 | 1 | 0 |
| Integer and Fractional Parts of Binomial Expressions | 1 | 0 | 0 | 1 | ⚠ |
| Sums of Binomial Coefficients — Alternating, Weighted, and Symmetric | 1 | 1 | 0 | 0 |

*"Integer and Fractional Parts" is a genuinely NEW pattern — 0 questions before 2022, 8 since.*

### Properties of Triangle — 3 (E0 / M1 / H2)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Sine and Cosine Rules — Solving Triangles | 2 | 0 | 0 | 2 |
| Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle | 1 | 0 | 1 | 0 |

*44.9% HARD — second-hardest chapter. Rising (2.22 → 3.22).*

### Differential Equations — 3 (E1 / M1 / H1)
| Subtopic | n | E | M | H |
|---|--:|--:|--:|--:|
| Solving and Verifying ODEs — Separable, IVP, and Applications | 1 | 1 | 0 | 0 |
| Order, Degree, and Solutions of ODE | 1 | 0 | 0 | 1 |
| Formation of ODE from Curves and General Solutions | 1 | 0 | 1 | 0 |

### Two-question chapters
| Chapter | E/M/H | Subtopics (n · difficulty) |
|---|---|---|
| Conics | 1/1/0 | Parabola — Equation, Properties, and Latus Rectum (1·M) · Ellipse — Foci, Eccentricity, and Focal Distances (1·E) |
| Indefinite Integration | 0/1/1 | Integration by Substitution — Algebraic, Trigonometric, and Composite Forms (1·H) · Standard Forms — Exponential, Logarithmic, and Paired Trigonometric Integrals (1·M) |
| Inverse Trigonometry | 0/1/1 | Identities, Properties, and Sum-Difference Formulas (1·M) · Evaluation of Composite Inverse Trigonometric Expressions (1·H) |
| Binomial Distribution | 1/1/0 | Computing Binomial Probabilities — Exact, At-Least, and Complementary Events (1·E) · Mean, Variance, and Parameter Estimation in B(n, p) (1·M) |
| Trigonometric Equations | 0/1/1 | General Solutions and Counting Solutions of Trigonometric Equations (1·H) · Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta (1·M) |
| Applications of Integration | 1/1/0 | Area Bounded by a Curve, Lines, and Axes (1·E) · Area Between Two Curves and Intersection Points (1·M) |
| Circles | 0/1/1 | Circle Equation — Centre, Radius, Diameter, and Properties (1·M) · Inscribed Geometry, Tangents, and Segments (1·H) |

### One-question chapters
| Chapter | Subtopic | Difficulty |
|---|---|---|
| Height & Distance | Heights and Distances from Angles of Elevation | **HARD** ⚠ |
| Logarithms | Logarithm Identities, Change of Base, and Sums | MODERATE |
| Binary Numbers | Binary Arithmetic — Addition, Division, and Algebraic Identities | MODERATE ⚠ |

*Height & Distance is the hardest chapter in the whole paper — **70.8% HARD** — so its single
slot is correctly a HARD one. It is also absent from 6 of 18 sittings.*

### Deliberately allocated ZERO
**Linear Inequalities** — 0.24/paper blended (5 questions in 18 papers, absent from 14 of them).
Including it would over-represent it. It also has **zero practice supply**. Leave it out; if a
120th slot is ever needed, it is the first candidate to reinstate.

---

## 5. Constraints that MUST be respected

### 5a. Set-bound questions are ATOMIC
**See RULE 1 in §1a — it is the single source of truth for this and overrides the allocation.**
Summary: 456 of 2,160 PYQs sit in 198 multi-question sets; take every question of a `set_id` or
none of them.

*Detection note: the naive probe `context ILIKE '%next three items%'` returns 0 and is WRONG —
the real phrasing is `next 03 (three) items` / `next three (03) items that follow`. Do not use
prose matching to find sets at all; group on `set_id` (§1a) and use the §7 regex only when
auditing whether a context still promises a count the paper doesn't deliver.*

### 5b. Supply gaps — practice pool cannot fill everything
Verified: **no chapter is EASY-short**, so the blueprint IS feasible from practice alone. But
these cells (marked ⚠ above) are thin or empty:

| Cell | Demand | Practice supply | Action |
|---|---|---|---|
| Statistics → Frequency Distributions | 1 EASY | **0** | Substitute from PYQ, or move the slot to Central Tendency |
| Statistics → Regression and Correlation | 1 HARD | 2 (both MODERATE, 0 HARD) | Take a MODERATE, or source from PYQ |
| Binary Numbers → Binary Arithmetic | 1 MODERATE | **0** (only 1 practice q in the whole chapter, in a different subtopic) | Use the one available Binary practice q, or PYQ |
| 3D Geometry → Distance, Section, Collinearity | 1 HARD | 2 (both MODERATE) | Take a MODERATE, or PYQ |
| Height & Distance | 1 HARD | 4 HARD of 18 total, **0 EASY** | OK, but the pool is small |
| Quadratic Equations | 1 EASY | **1** | Only one candidate exists — check it first |
| Application of Derivatives | 2 EASY | **2** | Both must be used; no choice |
| Sequence & Series | 1 EASY | **2** | Nearly forced |
| Complex Numbers | 1 EASY | 3 | Tight |

Total genuinely unfillable from practice: **~4 questions of 120 (3.3%)**.

### 5c. Question quality — exclude before picking
Structural audit of the NDA Maths PUBLIC pool (2026-08-25):

| Pool | Scanned | Not exactly 1 key | Duplicate options | Clean |
|---|--:|--:|--:|--:|
| Practice | 3,188 | 11 | 2 | **3,175 (99.6%)** |
| PYQ | 2,160 | 0 | 6 | 2,154 |

The 13 practice rows are an exclusion list. The 6 PYQ rows are **preserved paper defects**
(house convention) — do not "fix" them, just don't put them in a mock.

**The stealth wrong-key class has NEVER been swept on this practice pool.** Measured prior from
the 2026-08-11 blind pass: **~1 wrong key per 180 practice questions**, so expect **~0.5 in a
120-question paper**. On a printed paper the wrong answer goes home in the student's hand.
→ **Run `npm run audit:keys` scoped to the chosen source files before printing.** It catches the
structural classes only; a blind re-derivation of the 120 selected questions is the stronger
control if the paper matters.

### 5d. Print-path gates
No NDA Maths question carries an image (`image_url` is null across all 5,348), so there are no
figure-crop problems. Still run before distributing:
- `npm run audit:omml -- <source_file>` — math zones the Word exporter cannot convert (they ship
  as raw LaTeX in the .docx).
- `npm run audit:underlines` — underline fall-throughs.
- `npm run audit:text -- <source_file>` — literal `\n`, broken pipe tables, option leaks.

### 5e. RULE 4 — REVIEW THE SOLUTIONS BEFORE PRINTING, AND SOURCE-VERIFY EVERY FLAG

> **A blind re-derivation tells you a row is WRONG. It cannot tell you WHOSE fault it is.**
> Every flag is a hypothesis. Open the printed booklet before changing anything — on the
> Mock 1 review, **all three flagged rows had a CORRECT key and a corrupt transcription**,
> so acting on the derivation alone would have discarded three good questions.

Workflow (tooling already exists — do not re-invent it):
```
npm run reviews:paper -- --paper=<id>                          # dump (key + solution shown)
npx tsx scripts/reviews/triage-dump.ts <id>                    # cheap mechanical screens
npm run reviews:paper -- --paper=<id> --method=blind_rederivation   # key + solution WITHHELD
   ... fan the dump out to independent solvers, then:
npx tsx scripts/reviews/crosstab-blueprint-mock.ts <id> <resultsDir>
npx tsx scripts/reviews/render-check-paper.ts <id>             # KaTeX + OMML
npm run reviews:paper -- --paper=<id> --record --apply         # keep the verdicts
```

**What each stage is actually worth, measured on Mock 1 (120 q):**

| Stage | Found |
|---|---|
| `triage-dump` mechanical screens | **1 flag, a false positive.** These catch only the SELF-CONTRADICTING solution; a stealth defect passes by construction. |
| Blind re-derivation (6 solvers) | **116 AGREE · 0 wrong keys · 3 real defects · 1 two-answer row.** The only stage that finds the stealth class. |
| `render-check-paper` | **1 defect nothing else could see** — a Word-only OMML failure, invisible on the web. |
| Source verification of the 3 flags | **All 3 keys were right**; the defect was our transcription every time. |

**Verify the blind pass is actually blind** — assert the dump carries no `is_correct` and no
`solution`. An "independent" derivation that can see the key is not evidence.

**Four defect classes this review found, all worth looking for again:**
- **Transcription corruption that destroys the answer.** Q1111: booklet prints `π/3` in all four
  options, ours had `π/6` in two — which removed the correct answer AND made options a=d, b=c.
  Q2015: booklet prints `(z−z₁)/2`, ours had `/0` — which manufactured a second correct answer.
  Q1826: three separate corruptions in one row. **A row with duplicate options is usually a
  mis-transcription, not a bad question.**
- **A solution that argues itself into the key.** "Following the book the length = √33" after
  computing something else; "the matching option is … after the printed sign/angle convention".
  Those phrases are a tell that the author was fighting corrupt data — grep for *following the
  book*, *the printed*, *convention*, *Wait*, *recalculat*.
- **OMML-only failures.** Renders perfectly in KaTeX, ships raw LaTeX in the Word key. For an
  OFFLINE paper that is the surface that matters. `\overline{…}` is the only convertible form of
  a set complement — `'`, `^{c}` and `^{\prime}` all fail (re-verified here).
- **Internal audit notes printed to students.** "[Source answer key prints 'b' …]" references a
  book the student has never seen. Keep the provenance, word it for the reader.

**Repairing:** `scripts/reviews/apply-source-verified-fixes.ts` is the pattern — each edit must
match EXACTLY ONCE or the batch is refused, a `find` equal to its `to` is refused (that is what a
shell-mangled needle looks like), and **`content_hash` is RECOMPUTED** when stem or option text
changes while the row id is preserved so `paper_questions` refs survive. Editing only the
`solution` leaves the hash untouched by design — which is also a useful self-check.

### 5f. RULE 5 — A SOLUTION MUST DERIVE, NOT ASSERT

> **A solution that names a method and then states its result is not a solution.**
> The student cannot follow it, and a printed answer key is the one surface where
> they cannot ask a follow-up question. **Correctness and explicability are separate
> properties and need separate gates** — RULE 4's blind pass CANNOT see this class,
> because the key is right, so the row simply AGREEs.

**Diagnostic — a narrative verb carrying the conclusion, with no executed step:**

| Marker | What it is hiding |
|---|---|
| `(verified numerically)` / `verified numerically at x = …` | a spot-check standing in for a proof |
| `evaluating gives` / `simplifying gives` / `works out to` | the evaluation that IS the question |
| `achieved e.g. by an appropriate …` / `a suitable choice` | the witness that makes the claim checkable |
| `it can be shown` / `standard result` / `well-known result` | the derivation |
| `the printed solution …` / `following the book` | an authority the student has never seen |

**BREVITY IS NOT THE TEST — this is the part that is easy to get wrong.** A
one-step question deserves a one-line solution: *"Sum = 6 × 41 = 246"* is complete.
Length and equation-count are poor proxies and produce mostly false positives
(measured: a length/equation probe flagged 15 rows of which 11 were fine). The test
is whether every claimed step is *executed*, not how long the text is. Prose can be
complete too — *"the matrix is Hermitian, so its determinant is real"* names a
property the reader can verify entry by entry.

**Measured on Mock 1: 4 of 120 (3.3%)** — all four with correct keys, so all four
invisible to the blind pass. One had an actual algebra error underneath the
hand-waving (a term double-counted, then papered over by deferring to "the printed
solution"), which is the reason this is a correctness risk and not only a
readability one.

**Bank-wide NDA Maths (5,347 PUBLIC solutions), by marker:** `it can be shown` /
`standard result` 34 · `the printed solution` / `following the book` 22 ·
`evaluating gives` 20 · `verified numerically` 12 · `by an appropriate` 1.

**THE SWEEP'S REAL FINDING — this class is a CORRECTNESS probe, not a readability
one.** Rewriting the 79 flagged rows produced **62 rewrites, 2 legitimate keeps and
15 REPORTs where the keyed answer could not be reached at all** — a 19% defect
rate among flagged rows. Nearly every REPORT is a **mis-transcribed stem sitting
under a correct key**, and the hand-waving was the symptom: the original author
could not derive the printed answer from the corrupted stem either, so they
gestured at a method and asserted the result. Read that way, "verified
numerically" is a *distress signal*, and grepping for it finds broken questions
that no key-checking gate can see.

**One trap that justifies banning numeric-check-as-justification outright.** On
one row the true relation and the transcribed one **intersect at exactly one
point** — and that point is the obvious angle to spot-check (45°). A numerical
check there agrees by coincidence and *falsely confirms* the wrong stem. That is
almost certainly how the original claim was produced. A spot-check cannot
distinguish "identity" from "coincidence at the point I happened to pick".

**Give the rewriter three verbs, not one.** REWRITE / KEEP / REPORT. Without an
explicit REPORT option a rewriter facing an unreachable key will manufacture a
plausible derivation — the exact failure being repaired. Every REPORT is a
correctness finding for source adjudication and must never be auto-applied.

**Repairing:** `scripts/reviews/apply-solution-rewrites.ts` takes a run file of
rewrites and refuses one that is a no-op, carries a control character, is
double-escaped, or **still contains a marker phrase** (rewriting hand-waving into
different hand-waving). It also asserts **hash neutrality**: `contentHash` covers
(text, options, answer) and NOT `solution`, so a solution rewrite must leave the
hash byte-identical — which is what makes this class safe to fix in bulk without
stranding a single `question_reviews` verdict.

**What the REPORTs turned out to be — adjudicated against the printed sources
2026-08-26, and the result is the most useful part of the whole sweep.** All 14
outstanding REPORTs were read against the source. They split exactly by corpus,
and the two halves needed OPPOSITE treatment:

- **10 practice rows — every key was already RIGHT.** 10/10 matched the
  booklet's own printed answer key, so not one was a wrong answer. Eight were
  OUR transcription corrupting the stem or options; two are BOOK defects where
  our text is byte-faithful and the printed page is itself wrong.
- **4 PYQ rows — every key was WRONG.** All four stems byte-faithful to the
  scanned UPSC booklets, so the answer was the issue, not the text.

**The rule that falls out: WHICH corpus a REPORT comes from predicts what is
broken.** A practice row comes from a vision-transcribed booklet that ships its
own printed key, so the key is the trustworthy half and the text is the suspect
half. A PYQ row comes from a clean scanned paper that ships **no key at all**
(the tail pages are "SPACE FOR ROUGH WORK") — so the text is the trustworthy
half and the *answer* is a derivation someone made later. Check the half that
can be wrong.

**Corollary for PYQs, and it is why the Excel must never be cited as a source:**
where a stored PYQ answer traces to a prep-house spreadsheet rather than a
published key, it is a derivation with no more standing than a fresh one — and
in this batch a demonstrably worse one, since the spreadsheet's own `Solution`
column contained a literal `?` placeholder mid-derivation on one row and ended
"REVIEW: official answer is 0; ... check problem statement" on another. Correcting
such a key is not overriding the examiner. Preserve-the-paper's-defect applies
only when there IS an issued key to preserve.

**Reconstructions are hypotheses — measured 3 wrong out of 4.** Where a rewriter
proposed what the "intended" stem must have been, the printed page contradicted
it three times out of the four it guessed. Never apply a REPORT on a derivation.

**A key move does not re-grade.** `mock_attempts` stores a frozen score, so
correcting a key leaves the review screen showing a student's answer as correct
while the result screen still calls it wrong. Run
`scripts/reviews/regrade-attempt.ts <mockSlug>` after any key change; it reuses
the app's own `gradeMock` and refuses to lower a score without `--allow-lower`.

---

## 6. Build procedure (paper builder)

1. **Choose the pool** and record it on the paper. Default recommendation: **practice-only**,
   because all 2,160 PYQs are already locked inside the 18 published PYQ mocks — every PYQ pick
   is a repeat for a student who has done those. Use PYQ only to fill the §5b gaps.
2. Work **chapter by chapter, largest first** (Matrices & Determinants → … → Binary Numbers).
   Filter `Chapter + Subtopic + Difficulty`, pick the stated `n`.
3. **Apply RULE 1 (§1a) at every pick.** Before adding a question, check whether it carries a
   `set_id`. If it does, add the whole set or none of it, and count all its members against the
   allocation. Rebalance within the chapter, never by splitting the set.
4. Skip anything on the §5c exclusion list.
5. If a cell is short, take the substitution named in §5b and **write down that you did** — the
   paper's difficulty profile should be reported as built, not as designed.
6. Reconcile: the paper must total **120 = 30 E + 58 M + 32 H**. Chapter subtotals are the
   binding constraint; the per-subtopic difficulty is a strong default, and a ±1 swap *within a
   chapter* is fine. Where RULE 1 forced a bend, the set wins and the split is reported as built.
7. **Run the RULE 1 completeness check (§1a).** It must return zero rows before anything is
   printed. This is the last point at which a split set is still fixable.
8. Run the §5d audits scoped to the source files used.
9. **Run the RULE 4 solution review (§5e)** — blind re-derivation + render check, and
   source-verify every flag before changing anything. Expect ~2-3% of rows to need repair.
10. **Run the RULE 5 hand-wave scan (§5f)** — grep the paper's solutions for the marker
    table. This is a SEPARATE pass from step 9 and finds a different class: step 9 checks
    the answer is right, step 10 checks the student can see WHY. Expect ~3%.
11. Download Question Paper + Answer Key (teacher-gated — needs a TEACHER/org account).

**Question order on the printed paper — RULE 3.** Do NOT print in chapter order: that hands the
student a free difficulty map. Two properties must both hold, and the second is easy to miss:

1. **Interleave chapters** so no two consecutive questions share a chapter.
2. **Spread each difficulty evenly across the paper.** Chapter-interleaving alone does NOT
   achieve this — measured on the first build of Mock 1, the EASY questions landed **3 / 4 / 10 /
   14** across quartiles (expected ~7.8), i.e. heavily back-loaded, with HARD front-loaded at
   8/8/6/4. On a 150-minute timed paper that is a real defect: a student who runs short of time
   loses the easy marks, which are the ones they were most likely to bank.

Method that satisfies both (deterministic, no shuffling):
```
chapter_frac = (rank within chapter) / (count in chapter)          -- interleaves chapters
diff_frac    = (rank within difficulty, ordered by chapter_frac)
               / (count at that difficulty)                        -- spreads difficulty
ORDER BY diff_frac, chapter_frac
```
After that fix the same paper measured EASY 8/7/8/8, MODERATE 15/15/15/15, HARD 7/8/7/7, with
**0 consecutive same-chapter pairs**.

**Verify with the quartile check** — and note `paper_questions.position` is `double precision`,
so cast it: `position::int`. Integer-dividing the raw column silently groups on fractions and the
probe reports nonsense.

**Exception: set siblings stay consecutive**, with their shared context printed once above the
group (RULE 1).

---

## 7. Reproducing this (SQL)

Re-run when the bank grows by a sitting (a new NDA paper lands) or when the practice pool changes.
All queries scope with:

```sql
with m as (
  select s.id sid from exams e join subjects s on s.exam_id = e.id
  where e.name ilike '%NDA%' and s.name = 'Mathematics'
)
```

**Weight (chapter or subtopic):**
```sql
0.60 * ((count(*) filter (where pyq_year >= 2022))::numeric / 9)
+ 0.40 * (count(*)::numeric / 18)
```
Then largest-remainder round to 120 (chapter), then proportionally within each chapter (subtopic).
Both series sum to 120 by construction — every sitting is exactly 120 questions. **Verify that
before trusting a re-run**: if `count(*) / sittings <> 120`, a paper is incomplete and the whole
allocation is wrong.

**Difficulty target:** recent-9 shares only, no blend.

**Set detection (the correct regex — the plain ILIKE misses it):**
```sql
context ~* 'next\s*\(?\d*\)?\s*\(?(two|three|four|five|02|03|04|05)\)?\s*\(?\d*\)?\s*items'
```

**Structural exclusion list:**
```sql
-- rows with not-exactly-one correct option, or duplicate option text
select q.id from questions q join options o on o.question_id = q.id
group by q.id
having count(*) filter (where o.is_correct) <> 1
    or count(distinct btrim(o.text)) < count(*)
```

---

## 8. Change log

| Date | Change |
|---|---|
| 2026-08-25 | Created. Measured against 2,160 PYQ / 18 sittings; practice pool 3,188. Blueprint = 120 q, 30/58/32. |
| 2026-08-25 | Added **RULE 2 / 2a** (§1a): fill a gap from another exam rather than distorting the blueprint, with a measured source table — and difficulty labels are NOT comparable across exams (Worksheets is a foundation course; its EASY, and much of its HARD, sits below NDA standard, so step up one tier). Added **RULE 3** (§6): spread difficulty across the paper, not just chapters — chapter-interleaving alone left EASY at 3/4/10/14 by quartile. |
| 2026-08-25 | Built **Mock 1** (paper `f755370e`): 120 q, 117 NDA practice + 3 Worksheets, 31E/60M/29H, all 30 chapters at delta 0. |
| 2026-08-25 | **Reviewed Mock 1's solutions** (RULE 4, §5e): blind re-derivation of all 120 by 6 independent solvers -> 116 AGREE, **0 wrong keys**, 3 transcription defects, 1 Word-only OMML defect, 3 audit notes leaking to students. All 7 repaired and source-verified against the printed booklet; 120/120 review rows recorded. Added **RULE 4** and the two parameterised tools `render-check-paper.ts` + `crosstab-blueprint-mock.ts` (the existing ones were pinned to a previous run's papers). |
| 2026-08-27 | **The blueprint became EXECUTABLE.** `scripts/mocks/blueprintSpec.ts` parses §4 into 99 allocation rows and asserts them against the totals this document states about itself (120 = 30/58/32, and every chapter against its own heading); `scripts/mocks/build-blueprint-mock.ts` selects, orders and writes the paper. The markdown stays the single source of truth — encoding the rows a second time in TypeScript would create two specs that drift silently. |
| 2026-08-27 | **Fixed 12 subtopic names in the two-question table.** They had been abbreviated to fit the row (`Ellipse — Foci, Eccentricity, Focal Distances`) while the live taxonomy reads `…Eccentricity, and Focal Distances`, so §4's claim that every row is "directly executable as a `/browse` filter" was false for all six two-question chapters. The builder now REFUSES on a name matching no taxonomy row: a broken reference and an empty shelf both surface as "0 of 1" and are completely different problems. |
| 2026-08-27 | **RULE 1 measured on the mock-paper sources — `set_id` is NOT sufficient there.** §1a verified that all 198 PYQ contexts carry a non-null `set_id`; the LWS mock papers contain 2 rows sharing a context with `set_id = NULL`, which the §1a pre-print check cannot see. A blueprint mock therefore skips every row carrying a `set_id` **or** a `context`, except where a set is DECLARED and taken whole. |
| 2026-08-27 | **The NDA practice pool is not homogeneous.** §5b says Height & Distance, Logarithms and Binary Numbers have zero unused practice; that is true of the practice **booklet** only. The pool also holds whole 120-question papers ingested as practice (`NDA_Maths_Mock_Test_01–10`, `NDA_Maths_Weekly_Mock_2026_T1–T4`, plus three mock-shaped files hiding under the `NDA_Maths_Practice__` prefix). They are drawn on only where the booklet cannot fill a cell. Their difficulty labels are NOT comparable to the booklet's — **3.6% HARD against 38%** — so their EASY tier was read and confirmed at NDA standard before use. |
| 2026-08-27 | **Reviewed Mock 2 (RULE 4 + RULE 5).** 8 independent blind solvers over all 120: **117 AGREE · 3 NONE · 0 FLIP — ZERO wrong keys.** Two of the three NONEs were an artifact of the reviewer's own batch splitter dropping `context`, so a set-bound pair read as "U, V and W are never defined" — the blind dump DOES carry `context`; the ad-hoc splitter did not. Re-derived with it, both keys confirmed. One genuine defect: **Q1130's stem said `tan(α/2) = b/a` and matched NO option; the printed booklet says `tan α = b/a`** — the Mock 1 pattern again (correct key, corrupt stem). Repaired, re-derived blind against the corrected text, agrees with key A. RULE 5 found **0 hand-wave markers** across all 120 (the 2026-08-26 bank-wide sweep had rewritten 62 of these solutions) plus one solution printing an internal `KEY DISPUTE` note to students, reworded. All 120 recorded: 118 `confirmed` · 1 `stem_fixed` · 1 `solution_rewritten`. |
| 2026-08-27 | **RULE 4 gained two hard lessons, both from the solvers rather than the tooling.** (1) **`question_number` is NOT unique in a multi-source paper** — Mock 2 holds three questions numbered 75 and two numbered 113 — and the crosstab joined on it, so three derivations were silently overwritten while the row still reported AGREE *against another question's answer*. Now joined on `questionId`. (2) **A multi-correct question can carry exactly ONE key and pass every structural gate.** Q3019's stem says "is (are) true" and both A and C hold; `count(is_correct) = 1`, so nothing flagged it — unlike the 11 rows withdrawn on 2026-08-26, which had two. Only a blind solver reading the stem caught it. Swapped out at the same printed position and withdrawn from the bank. |
| 2026-08-27 | Built **Mock 2** (paper `9248f15d`): 120 q, exactly **30 E / 58 M / 32 H**, every chapter within **±0.53** of its measured PYQ weightage. Sources as built: booklet 82 · LWS mock papers 31 · Worksheets 5 · NDA PYQ 2. Zero overlap with any existing paper; 0 broken sets; render-check PASS on web and Word. |
| 2026-08-25 | Added **RULE 1** (§1a): a context is all-or-nothing — include every question of a `set_id` or none. Promoted above the allocation, which now bends to it. Verified `set_id` is a sufficient grouping key (0 of 198 multi-question contexts have a null or split `set_id`) and added the pre-print completeness check. |
| 2026-08-29 | Built **Mock 3** (paper `4091015f`): 120 q, **30 E / 59 M / 31 H**, all 30 chapters, max chapter delta **0.53** (mean 0.239), 0 repeats against the two earlier mocks. Sources as built: NDA 112 - Worksheets 7 - JEE Mains 1, i.e. 8 declared cross-source RULE 2 fills. The 59/31 split rather than 58/32 is deliberate and stated rather than silently rounded: the JEE fill is labelled MODERATE in its own bank, and RULE 2a says a JEE MODERATE sits nearer an NDA HARD, so the paper is harder than the raw count reads. Note the paper spans **35 chapter IDs but 30 chapter NAMES** - a cross-exam fill lands on its own exam's chapter row, so `Height and Distance` and `Height & Distance` are two rows for one chapter. Group by normalised name, never by `chapter_id`, or the weightage check reports a phantom 8.53 deviation. |
| 2026-08-29 | **Reviewed Mock 3 (RULE 4 + RULE 5): 120/120 AGREE, ZERO wrong keys - the third paper running.** The blind pass produced FIVE letter-level disagreements and not one was a wrong key; every one was a CORRUPT TRANSCRIPTION under a correct key, settled by rendering the printed booklet page. Q161's stem invented three extra factors and an ellipsis (four factors give 16 = key D; seven give -128w, which is not real and matches no option). Q304 had its stem constant AND all four option values corrupt (booklet: T(n+1)-T(n) = 36 with options 2/5/6/9; ours: = 10 with 5/10/8/7) - and its stored solution was already solving the booklet's real question. Q1572 carried two coefficient errors in one stem (the booklet's pair gives sqrt(135)/4 = key C; ours gave sqrt(4403)/17, matching nothing). Q1892's option A alone was wrong (booklet pi/3, ours pi/2), while its stored solution already derived pi/3 and said 'Matches option A'. Q1912 had lost the leading '(b+c) .' and left a bare comma where the operator belonged. **Acting on the derivations alone would have flipped five correct keys and shipped five wrong answers.** |
| 2026-08-29 | **Two questions REPLACED rather than repaired, and the distinction is the rule.** Q92 (Mock_Test_03) was unprintable - option (a) had leaked into the stem and been truncated mid-LaTeX, leaving a broken stem and three options - and Q82 (Mock_Test_02) keys 'all of them' for whether AM, median and GM are defined over 'discrete numbers' while never restricting them to positives, so the keyed answer holds only under a condition the question does not state. **Their source .docx files are NOT on disk**, so there is nothing to repair them AGAINST and reconstructing the missing half would be invention rather than repair. New `scripts/mocks/swap-paper-question.ts` swaps in place under refusals for cell drift (chapter, subtopic and difficulty must all match), RULE 1, and any placement in ANY other paper - and it never writes `position`, which is a fractional sort key, so RULE 3's whole-paper interleaving survives a one-row change. |
| 2026-08-29 | **RULE 4 lesson: a structural option check compares TEXT and cannot see that two options denote the SAME THING.** The first Sets question swapped in here was an NDA 2018 PYQ whose option C reads `(A u B) - (A n B)` and whose option D reads `(A' u B') - (A' n B')` - De Morgan turns the second into `(A n B)' - (A u B)'`, which IS the first. Options A and B are likewise the same set as each other. Four distinct strings, TWO correct answers, and `nopt=4`, `ncorr=1`, `ndist=4` and `audit:keys` all green, because none of them evaluates the mathematics. It was caught only because a blind solver asked to name the option matching its derived value found two, and confirmed it by exhausting all 256 (A,B) pairs over a 4-element universe (which realises every Boolean atom, so it settles the identity rather than sampling it). **A swap-in is NOT cleared by the swap script; it must go through the blind pass afterwards.** The row is recorded `unverifiable` in `question_reviews` even though it is no longer in the paper, so the finding survives the question leaving. |
| 2026-08-29 | **A silent ordering bug in `crosstab-blueprint-mock.ts`, found by reading a result that disagreed with repairs already applied.** It iterated `readdirSync` order, which is lexicographic - `result1, result10, result11, result2, ...` - so `result2` came AFTER `result11` and the STALE derivation won every collision. Mock 3 read as 2 FLIP + 2 NONE when all four had already been repaired and re-derived. The tool prints 'later wins' and was telling the truth about its own order, just not the order intended. Now sorted numerically, matching `record-mock2-review.ts`, which had always sorted - and that is why the RECORDED verdicts were never at risk: the record script REFUSES to write a row whose blind letter disagrees with the stored key, so a stale collision blocks the write rather than corrupting it. Defence in depth doing its job. |
| 2026-08-29 | **The render gate found a defect class the blind pass structurally cannot.** `render-check-paper` reported PASS and emitted only a `strict:warn` line about U+2013 inside a math zone - KaTeX renders an en-dash in warn mode, so it LOOKS like a minus on screen and nothing downstream fails. Chasing that warning surfaced a pandoc artifact from the LWS mock .docx ingest: en-dashes became a literal `--` in text and U+2013 inside math, so a student sees an option printed as `-- A`. Three rows of this paper repaired in scope; **83 of the 1,694 rows from those files (4.9%)** carry it and are logged as a backfill candidate rather than swept, because a blanket `--` to `-` sweep would be wrong (`non -- empty` needs the spaces removed too). Two of the three also failed RULE 5 independently - Q111's stored 'solution' was its own stem copied verbatim with the answer appended and no working at all. |
