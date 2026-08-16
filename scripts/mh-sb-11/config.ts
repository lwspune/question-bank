// Config for the MAHARASHTRA STATE BOARD Class-11 textbook-ingestion pipeline.
//
// Source: the Balbharati (Maharashtra State Board) Class 11 Mathematics textbooks —
// Part 1 (chapters 1-9) + Part 2 (chapters 1-9) — under SOURCE_ROOT. Born-digital
// PDFs with a decent-LOOKING text layer (~1.5-2.5k chars/page) that is nonetheless
// UNUSABLE for math. Mirrors scripts/mh-sb-9 (which in turn re-exports the
// stateboard pure core verbatim — see ./lib.ts).
//
// TRANSCRIPTION IS VISION-ONLY. Do NOT reach for dump-text.ts to read a stem or an
// option, however clean the prose looks. MEASURED on Ch.2 Trigonometry I (21pp):
// U+221A occurs exactly ONCE in the whole chapter and "/" exactly ONCE, while the
// pages carry dozens of surd values and stacked fractions. Radicals are vector-drawn
// and fraction bars are layout rather than characters, so the text layer renders
// "root 3 over 2" as the bare digits "3 2", and "tan 120 = minus root 3" as "= - 3".
// A text-first pass therefore yields questions that are arithmetically DIFFERENT
// from the printed ones, with nothing to flag it. Greek letters, degree signs and
// the relational operators DO survive, which is exactly what makes the text layer
// look trustworthy. Same failure mode as the Class-9 Real Numbers chapter; assume
// it across this whole book until measured otherwise. dump-text.ts stays useful for
// locating block boundaries and for prose-only checks.
//
// UNLIKE the Class-9 pipeline, the publisher ships PRE-SPLIT per-chapter PDFs
// (`Part N_Chapterwise/Ch_NN_*.pdf`), so `pdf` points at a whole chapter file and
// `pages` is omitted — render everything. The chapterwise files carry NO answers,
// so `answersPdf` points at the WHOLE-BOOK PDF and `answerPages` at that chapter's
// block inside it (mapped from the book's own answer-section chapter headers).
//
// Each textbook chapter yields the same three buckets (see ../stateboard/lib.ts):
//   - solved              : worked examples WITH the book's solution → ship PUBLIC
//   - exercise-mcq        : the "MISCELLANEOUS EXERCISE - N (I)" MCQ block
//   - exercise-subjective : Exercise N.M + Miscellaneous (II) free-response
//
// Committed question_kind='practice', visibility='PRIVATE' (post-commit UPDATE).
// Class 11 is NOT a board year, so there are no PYQ papers to follow — this
// textbook corpus is the whole bank for this exam, exactly like mh-sb-9.
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / stateboard / mh-sb-9 pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra State Board Class 11 exam (seeded 2026-08-09); Mathematics subject
// seeded alongside it. NOTE `subjects.exam_id` is NOT NULL — this exam has its OWN
// "Mathematics" row, distinct from the Class-9 / Class-12 / MHT-CET ones.
export const EXAM_ID = "795fe36e-a0b5-4936-b671-a73affd3b55c";

export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\MHT-CET\\State_Board\\11th\\Maths";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

// Pre-split per-chapter PDFs (the transcription source).
const p1 = (f: string) => join(SOURCE_ROOT, "Part 1", "Part 1_Chapterwise", f);
const p2 = (f: string) => join(SOURCE_ROOT, "Part 2", "Part 2_Chapterwise", f);
// Whole-book PDFs — the ONLY place the ANSWERS section lives (step-6 cross-check).
const BOOK1 = join(SOURCE_ROOT, "Part 1", "State_Board_Maths_11th_Part_1.pdf");
const BOOK2 = join(SOURCE_ROOT, "Part 2", "State_Board_Maths_11th_Part_2.pdf");

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Mathematics")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the pre-split CHAPTER PDF
  pages?: number[]; // 0-based page indices to render; omit → the whole chapter file
  answersPdf?: string; // WHOLE-BOOK PDF holding the ANSWERS section
  answerPages?: number[]; // 0-based indices of this chapter's answer block (step-6)
  note: string; // questions.pyq_note
  // Canonical subtopics — transcription maps each question to exactly one.
  // Per the shipped mh-ssc-10-text decision, these are the TEXTBOOK's OWN section
  // headings (here: the `syllabus_concepts` MH-State-Board XI spine, which was
  // extracted from these very books), lightly merged where the book splits a single
  // teaching unit across thin sub-sections. They are NOT invented.
  subtopics: string[];
};

const range = (startIncl: number, endIncl: number) =>
  Array.from({ length: endIncl - startIncl + 1 }, (_, i) => startIncl + i);

// ── Book numbering vs spine numbering — READ BEFORE AUTHORING REFS ───────────
// The `syllabus_concepts` XI spine renumbers Part 2 CONTINUOUSLY (Part-2 Ch.1
// Complex Numbers is spine chapter 10, i.e. book number + 9) so that a section ref
// is unique across the year. The BOOK itself restarts at Ch.1 in Part 2, and its
// exercises are printed "Exercise : 1.1" / "MISCELLANEOUS EXERCISE - 1" in BOTH
// parts. Question refs MUST follow the BOOK, not the spine — that is what a student
// sees on the page and what sections.ts matches on. There is no collision risk in
// the bank because each chapter is its own `source_file`, but do NOT "fix" a
// Part-2 ref to its spine number.
//
// ── Answer-section map (0-based indices into the WHOLE-BOOK PDFs) ────────────
// Part 1 answers run idx 225-241, Part 2 idx 205-221. A chapter's block starts
// MID-PAGE right after the previous chapter's tail, so each range below runs from
// the page carrying this chapter's header through the page carrying the NEXT
// chapter's header (inclusive) — an extra half page of a neighbour is harmless,
// a missing page silently loses answers.
//
// Book defect, recorded not corrected: the answer section misspells three of its
// own headers — "DETERMINANTS AND MARTICES" (P1), "PERMUTIONS AND COMBINATIONS"
// and "MISECLLANEOUS EXERCISE" (P2). Harmless for navigation; do not transcribe
// those spellings into chapter names.

export const CHAPTERS: Record<string, Chapter> = {
  // ══ PART 1 ══════════════════════════════════════════════════════════════
  "angle-measurement-11": {
    id: "angle-measurement-11",
    chapterName: "Angle and its Measurement",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Angle_and_its_Measurement.pdf",
    pdf: p1("Ch_01_Angle and its Measurement.pdf"),
    answersPdf: BOOK1,
    answerPages: range(225, 226),
    note: "Maharashtra State Board (Class 11) — Angle and its Measurement (Balbharati textbook, Part 1)",
    subtopics: [
      "Directed Angles",
      "Sexagesimal System (Degree Measure)",
      "Circular System (Radian Measure)",
      "Arc Length and Area of a Sector",
    ],
  },

  // ── PILOT CHAPTER (2026-08-09). Chosen as the validation chapter because it is
  //    the highest-weightage Class-11 chapter in the MHT-CET bank (99 PYQ under
  //    "Trigonometry - I") while staying mid-sized at 21pp, and because it exercises
  //    the pipeline's hard parts: unit-circle/quadrant-sign tables, a graphs section
  //    (figures), and a full Miscellaneous MCQ block with a printed key.
  "trigonometry-1-11": {
    id: "trigonometry-1-11",
    chapterName: "Trigonometry - I",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Trigonometry_I.pdf",
    pdf: p1("Ch_02_Trigonometry_01.pdf"),
    answersPdf: BOOK1,
    answerPages: range(226, 228),
    note: "Maharashtra State Board (Class 11) — Trigonometry I (Balbharati textbook, Part 1)",
    subtopics: [
      "Trigonometric Functions on the Unit Circle",
      "Signs of Trigonometric Functions in Quadrants",
      "Trigonometric Functions of Specific and Negative Angles",
      "Fundamental Identities",
      "Domain, Range and Periodicity",
      "Polar Co-ordinate System",
      "Graphs of Trigonometric Functions",
    ],
  },

  // ── INGESTED 2026-08-16 (166 q). 24pp, 40 `Solution :` markers — the DENSEST
  //    chapter of this book, and the one whose defects are hardest to see, because a
  //    corrupted trigonometric identity still LOOKS like an identity.
  //
  //    1. STRUCTURE: every solved block spills onto the page carrying the NEXT
  //       exercise banner (p-04, p-07, p-16, p-19), and on p-04 the banner sits in the
  //       RIGHT column BESIDE the last solved example rather than below it. Cut
  //       ownership at the banner, column-wise, at all five boundaries.
  //    2. Two SolvedEx prefixes name a sub-section narrower than the block's content
  //       (`3.3.2` covers double AND triple angles; `3.4.2` covers factorization AND
  //       defactorization). That follows the "name it for the sub-section it FOLLOWS"
  //       rule; both were checked for a second block and there is none.
  //    3. The book misspells its own §3.2 heading "allied ANGELS".
  //
  //    THE METHOD THAT FOUND THE DEFECTS, and it should be standard for any identity
  //    chapter: verify every printed identity NUMERICALLY at several angles before
  //    proving it — and NOT at convenient angles. Three printed identities are FALSE
  //    as printed, and one of them (Ex 3.1 Q2(ii)) agrees with the correct form at
  //    theta = 0, so a spot-check at zero passes it. Ex 3.3 Q3(xviii) fails 0 of 7
  //    sample points while its intended form passes 7 of 7 — that contrast is what
  //    turns "this looks wrong" into evidence.
  //
  //    1 answer-key error: Ex 3.1 Q1(i) keys sin 15 as (sqrt3+1)/(2sqrt2) = 0.9659,
  //    which is cos 15; correct is 0.2588. NOT a transposition with (ii) — cos 75
  //    equals sin 15, so (ii)'s key is correct and must not be "fixed". Plus three
  //    false identities (Ex 3.1 Q2(ii), Ex 3.3 Q3(xviii), 3.4.2 SolvedEx.3(i) whose
  //    stem contradicts its own printed solution), an undomained nested radical
  //    (Ex 3.3 Q3(vii)), and Misc II Q20 whose conclusion is INCOMPLETE — the
  //    hypothesis admits angle C = pi/2 as well as the printed angle B = pi/2
  //    (counterexample 30-60-90). All 18 in data/trigonometry-2-11.errata.json.
  //
  //    The Miscellaneous MCQ block is CLEAN: the book's printed key, the transcriber's
  //    derivation and an independent blind pass all agree 10/10. Note Misc I Q4's four
  //    options are two +/- PAIRS (A = -C, B = -D) — paired but never equal, the shape
  //    most likely to be misread as a twin.
  "trigonometry-2-11": {
    id: "trigonometry-2-11",
    chapterName: "Trigonometry - II",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Trigonometry_II.pdf",
    pdf: p1("Ch_03_Trigonometry_02.pdf"),
    answersPdf: BOOK1,
    answerPages: range(228, 229),
    note: "Maharashtra State Board (Class 11) — Trigonometry II (Balbharati textbook, Part 1)",
    subtopics: [
      "Compound Angles",
      "Allied Angles",
      "Multiple Angles — Double and Triple",
      "Factorization Formulae — Sum or Difference into Product",
      "Defactorization Formulae — Product into Sum or Difference",
      "Trigonometric Functions of Angles of a Triangle",
    ],
  },

  // ── INGESTED 2026-08-16 (264 q). The LARGEST chapter in the book at 44pp, and
  //    structurally the odd one out — read these three facts before touching it.
  //
  //    1. TWO Miscellaneous blocks. The chapter is really two half-chapters:
  //       Determinants (p-00..p-18, closed by `MISCELLANEOUS EXERCISE - 4 (A)` on
  //       p-16) and Matrices (p-19..p-43, closed by `- 4 (B)` on p-40). BOTH split
  //       into a part (I) MCQ block and a part (II) free-response block, so the
  //       pipeline's default `Misc I `/`Misc II ` refs would collide — this chapter
  //       uses `Misc 4A I `/`Misc 4A II `/`Misc 4B I `/`Misc 4B II `. See sections.ts.
  //
  //    2. THE PRINTED KEY IS PARTIAL BY DESIGN. It omits every proof / "show that" /
  //       "verify" question (e.g. Exercise 4.2 keys only Q.1, Q.5, Q.6 of its seven).
  //       A MISSING ENTRY IS NOT A DEFECT — do not read the gaps as findings, and do
  //       not doubt an authored solution because the book gives it no answer.
  //
  //    3. Book defects found, all in data/determinants-matrices-11.errata.json (24):
  //       THREE answer-key errors — Misc 4A I Q5 (key B; the value is option C, and
  //       A/B/D are mutually equal so a key of B makes A and D equally correct),
  //       Misc 4A I Q6 (key C is indistinguishable from B and D; the stem's "at least
  //       one solution" is true for all four options), and Ex 4.7 Q1(ii) (a dropped
  //       minus in the key). Plus Exercise 4.2 printing no Q.4 at all.
  //       Counter-lesson worth keeping: THREE separate "this looks wrong" suspicions
  //       raised at transcription (Misc 4A II Q5(ii)'s un-squared `4x`, Misc 4B II
  //       Q3(i)'s duplicated RHS, Ex 4.5 Q9's non-integral answers) were all resolved
  //       as THE BOOK BEING RIGHT once its own key was consulted. The "out of
  //       character" heuristic went 0 for 3 here — consult the key before concluding.
  "determinants-matrices-11": {
    id: "determinants-matrices-11",
    chapterName: "Determinants and Matrices",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Determinants_and_Matrices.pdf",
    pdf: p1("Ch_04_Determinent_Matrices.pdf"), // publisher's filename typo — kept verbatim
    answersPdf: BOOK1,
    answerPages: range(229, 233),
    note: "Maharashtra State Board (Class 11) — Determinants and Matrices (Balbharati textbook, Part 1)",
    subtopics: [
      "Value of a Determinant",
      "Minors and Cofactors",
      "Properties of Determinants",
      "Cramer's Rule and Consistency of Equations",
      "Area of a Triangle and Collinearity",
      "Types of Matrices",
      "Algebra of Matrices",
      "Properties of Matrix Multiplication",
      "Properties of the Transpose of a Matrix",
    ],
  },

  "straight-line-11": {
    id: "straight-line-11",
    chapterName: "Straight Line",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Straight_Line.pdf",
    pdf: p1("Ch_05_Straight_Line.pdf"),
    answersPdf: BOOK1,
    answerPages: range(233, 234),
    note: "Maharashtra State Board (Class 11) — Straight Line (Balbharati textbook, Part 1)",
    subtopics: [
      "Locus and its Equation",
      "Shift of Origin",
      "Slope, Parallel and Perpendicular Lines",
      "Angle Between Intersecting Lines",
      "Equation of a Line in Standard Forms",
      "General Form of the Equation of a Line",
      "Distance of a Point from a Line",
      "Distance Between Two Parallel Lines",
      "Family of Lines",
    ],
  },

  "circle-11": {
    id: "circle-11",
    chapterName: "Circle",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Circle.pdf",
    pdf: p1("Ch_06_Circles.pdf"),
    answersPdf: BOOK1,
    answerPages: range(234, 235),
    note: "Maharashtra State Board (Class 11) — Circle (Balbharati textbook, Part 1)",
    subtopics: [
      "Different Forms of the Equation of a Circle",
      "General Equation of a Circle",
      "Parametric Form of a Circle",
      "Tangent and the Condition of Tangency",
      "Tangents from a Point and the Director Circle",
    ],
  },

  "conic-sections-11": {
    id: "conic-sections-11",
    chapterName: "Conic Sections",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Conic_Sections.pdf",
    pdf: p1("Ch_07_Conics_Section.pdf"), // publisher's filename — kept verbatim
    answersPdf: BOOK1,
    answerPages: range(235, 238),
    note: "Maharashtra State Board (Class 11) — Conic Sections (Balbharati textbook, Part 1)",
    subtopics: [
      "Conic Sections and their Definition",
      "Parabola — Standard Equation and Tracing",
      "Parabola — Other Standard and Parametric Forms",
      "Tangents to a Parabola",
      "Ellipse — Standard Equation and Properties",
      "Tangents to an Ellipse",
      "Auxiliary and Director Circles of an Ellipse",
      "Hyperbola — Standard Equation and Properties",
      "Tangents to a Hyperbola",
      "Asymptotes and the Director Circle of a Hyperbola",
    ],
  },

  // ── INGESTED 2026-08-16 (69 q). The SMALLEST chapter of the book at 14pp, and the
  //    cleanest source so far — ONE answer-key error against 69 questions.
  //
  //    Facts a later session should not have to re-derive:
  //    1. The chapter has 14 `Solution :` markers but only TWELVE real solved
  //       examples. The other two (p-09, p-10) are FILL-IN-THE-BLANK scaffolds inside
  //       an unnumbered Activity section (`S.D. = √‾‾‾ =` with an empty radicand,
  //       tables with 3 of 7 cells filled). Their answers ARE the blanks, and they
  //       carry no question number — so the shipped "ingest a numbered question
  //       merely tagged (Activity)" precedent does NOT apply. Ingesting one would put
  //       a half-written derivation into the bank as a model solution.
  //    2. The §8.2.3 solved block is SIX examples, not five: Ex.6 sits entirely on
  //       p-05 ABOVE the EXERCISE 8.2 banner. A band cut at the p-04/p-05 page edge
  //       strands it. §8.2.2 has no solved block of its own.
  //    3. CONVENTIONS THAT DECIDE ANSWERS: population divisor (n, not n-1) — verified
  //       against the book's own Ex 8.2 Q2 key, which only works with n. Range for
  //       grouped data is the difference of the EXTREME CLASS BOUNDARIES (Ex 8.1 Q5's
  //       key of 10 confirms it; the midpoint convention would give 8). Inclusive
  //       class intervals (14-18, 19-23) must be converted to continuous boundaries:
  //       midpoints are unchanged but the width becomes a true h=5, not the 4 the
  //       printed limits suggest — using 4 gives 26.4 instead of 41.25.
  //
  //    1 answer-key error: Misc II Q20 keys the yield C.V. as 5.91 where it is 6.011
  //    (no rounding path reaches 5.91; a digit slip from 6.01). Plus Ex 8.2 Q3/Q4,
  //    where the printed variance is off in the second decimal purely from
  //    mid-calculation rounding, and Misc I Q2, which asks for a standard deviation
  //    whose value (√5 ≈ 2.24) matches NO printed alternative — the key of 5 is the
  //    VARIANCE, so the defect is in the stem/options and the key is the setter's
  //    intent. The book's printed key was confirmed to agree with BOTH independent
  //    MCQ derivations on all 10, so the MCQ block itself has no key error.
  "dispersion-11": {
    id: "dispersion-11",
    chapterName: "Measures of Dispersion",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Measures_of_Dispersion.pdf",
    pdf: p1("Ch_08_Measures_of_Dispersion.pdf"),
    answersPdf: BOOK1,
    answerPages: range(238, 239),
    note: "Maharashtra State Board (Class 11) — Measures of Dispersion (Balbharati textbook, Part 1)",
    subtopics: [
      "Range",
      "Variance and Standard Deviation",
      "Change of Origin and Scale",
      "Standard Deviation for Combined Data",
      "Coefficient of Variation",
    ],
  },

  // ── INGESTED 2026-08-16 (191 q). Structurally the EASY shape — ONE terminal
  //    Miscellaneous block, so the default `Misc I `/`Misc II ` refs apply. What
  //    makes it fiddly is density: NINE solved blocks in 23pp, several sharing a
  //    section, so nearly every SolvedEx prefix is sub-section-scoped (see
  //    sections.ts for the block-to-page map).
  //
  //    Facts a later session should not have to re-derive:
  //    1. §9.1.5 EXISTS. A section-heading regex will miss it because the book
  //       misspells its own heading "Elementary Properties of Probabilty". The
  //       second §9.1 solved block sits under it, not under §9.1.4.
  //    2. p-09 carries TWO boxed solved blocks, one per COLUMN, split by the
  //       §9.3.2 heading — a page-level scan sees one.
  //    3. The §9.3.4 block does NOT end on p-11: it runs through p-12's whole left
  //       column and into the top of its right column, ending only at the
  //       EXERCISE 9.3 banner. Ownership must be cut at that banner, never at a
  //       page edge, or two solved examples strand silently.
  //    4. The printed key is PARTIAL BY DESIGN (skips proofs / "write the sample
  //       space"). A missing entry is NOT a defect.
  //
  //    3 answer-key errors, all source-verified (data/probability-11.errata.json):
  //      Ex 9.3 Q1  key gives the JOINT 2/7 where the stem asks a CONDITIONAL (2/3)
  //                 — stem checked word-for-word against the printed page
  //      Ex 9.4 Q4  key 4/5; correct 2/5. The prior 1/2 was dropped from the
  //                 numerator but kept in the denominator. Impossible on sight:
  //                 P(A/E1) < P(A/E2) forces the posterior BELOW the prior of 1/2
  //      Ex 9.5 Q1(i) key repeats (ii)'s 3/5; odds IN FAVOUR 4:3 give 4/7
  //    Against those, FOUR "this looks wrong" suspicions resolved as the BOOK BEING
  //    RIGHT once its key was consulted (Misc II Q4's degenerate P(B)=1, Misc II
  //    Q10's dropped name, Ex 9.1 Q16's 16th-person reading, an unreduced 12/51).
  //
  //    Word-export trap found here and worth knowing bank-wide: the docx OMML
  //    converter CANNOT render a superscript applied to a parenthesised group
  //    containing \cup or \cap — `(A \cup B)'` and `(A \cup B)^{c}` both fail,
  //    while `A'` and `(A + B)'` are fine. Use `\overline{A \cup B}` for the
  //    complement of a group. Measured against the exporter's own findOmmlFailures.
  "probability-11": {
    id: "probability-11",
    chapterName: "Probability",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Probability.pdf",
    pdf: p1("Ch_09_Probability.pdf"),
    answersPdf: BOOK1,
    answerPages: range(239, 241),
    note: "Maharashtra State Board (Class 11) — Probability (Balbharati textbook, Part 1)",
    subtopics: [
      "Basic Terminology and Sample Space",
      "Probability of an Event and its Elementary Properties",
      "Addition Theorem",
      "Conditional Probability and the Multiplication Theorem",
      "Independent Events",
      "Bayes' Theorem",
      "Odds",
    ],
  },

  // ══ PART 2 (the book restarts at Ch.1 — see the numbering note above) ═════
  "complex-numbers-11": {
    id: "complex-numbers-11",
    chapterName: "Complex Numbers",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Complex_Numbers.pdf",
    pdf: p2("Ch_01_Complex_Numbers.pdf"),
    answersPdf: BOOK2,
    answerPages: range(205, 208),
    note: "Maharashtra State Board (Class 11) — Complex Numbers (Balbharati textbook, Part 2)",
    subtopics: [
      "Complex Numbers and Equality",
      "Conjugate and Algebra of Complex Numbers",
      "Powers of i and Division",
      "Square Root of a Complex Number",
      "Quadratic Equations in the Complex Number System",
      "Argand Diagram, Modulus and Argument",
      "Polar and Exponential Form",
      "De Moivre's Theorem",
      "Cube Roots of Unity",
      "Sets of Points in the Complex Plane",
    ],
  },

  "sequences-series-11": {
    id: "sequences-series-11",
    chapterName: "Sequences and Series",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Sequences_and_Series.pdf",
    pdf: p2("Ch_02_Sequence_and_Series.pdf"),
    answersPdf: BOOK2,
    answerPages: range(208, 210),
    note: "Maharashtra State Board (Class 11) — Sequences and Series (Balbharati textbook, Part 2)",
    subtopics: [
      "Sequences",
      "Arithmetic Progression",
      "Geometric Progression — General Term and Sum",
      "Sum of Infinite Terms of a G.P.",
      "Recurring Decimals as Rational Numbers",
      "Harmonic Progression",
      "Arithmetic, Geometric and Harmonic Means",
      "Arithmetico-Geometric Progression",
      "Power Series",
    ],
  },

  "permutations-combinations-11": {
    id: "permutations-combinations-11",
    chapterName: "Permutations and Combination",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Permutations_and_Combination.pdf",
    pdf: p2("Ch_03_Permutation_and_Combination.pdf"),
    answersPdf: BOOK2,
    answerPages: range(210, 212),
    note: "Maharashtra State Board (Class 11) — Permutations and Combination (Balbharati textbook, Part 2)",
    subtopics: [
      "Fundamental Principles of Counting",
      "Factorial Notation",
      "Permutations of Distinct Objects",
      "Permutations with Repetition",
      "Permutations with Identical Objects",
      "Circular Permutations",
      "Combinations",
      "Properties of Combinations",
    ],
  },

  "induction-binomial-11": {
    id: "induction-binomial-11",
    chapterName: "Methods of Induction and Binomial Theorem",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Methods_of_Induction_and_Binomial_Theorem.pdf",
    pdf: p2("Ch_04_Method_of_induction_Binomial_Theorem.pdf"),
    answersPdf: BOOK2,
    answerPages: range(212, 214),
    note: "Maharashtra State Board (Class 11) — Methods of Induction and Binomial Theorem (Balbharati textbook, Part 2)",
    subtopics: [
      "Principle of Mathematical Induction",
      "Binomial Theorem for a Positive Integral Index",
      "General Term in the Expansion",
      "Binomial Theorem for a Negative or Fractional Index",
      "Binomial Coefficients",
    ],
  },

  "sets-relations-11": {
    id: "sets-relations-11",
    chapterName: "Sets and Relations",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Sets_and_Relations.pdf",
    pdf: p2("Ch_05_Set_Relation.pdf"),
    answersPdf: BOOK2,
    answerPages: range(214, 216),
    note: "Maharashtra State Board (Class 11) — Sets and Relations (Balbharati textbook, Part 2)",
    subtopics: [
      "Sets and their Representation",
      "Types of Sets and Number of Elements",
      "Operations on Sets",
      "Intervals",
      "Ordered Pairs and the Cartesian Product",
      "Relations — Domain, Co-domain and Range",
      "Types of Relations",
    ],
  },

  "functions-11": {
    id: "functions-11",
    chapterName: "Functions",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Functions.pdf",
    pdf: p2("Ch_06_Functions.pdf"),
    answersPdf: BOOK2,
    answerPages: range(216, 218),
    note: "Maharashtra State Board (Class 11) — Functions (Balbharati textbook, Part 2)",
    subtopics: [
      "Functions and Types of Functions",
      "Representation and Graph of a Function",
      "Some Basic Functions",
      "Algebra of Functions",
      "Composition of Functions",
      "Inverse Functions",
      "Piecewise Defined Functions",
    ],
  },

  // NOTE the book prints Exercise 7.6 then 7.8 with NO 7.7 (visible in its own
  // answers section) — a printed-book numbering gap, not a transcription miss.
  "limits-11": {
    id: "limits-11",
    chapterName: "Limits",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Limits.pdf",
    pdf: p2("Ch_07_Limits.pdf"),
    answersPdf: BOOK2,
    answerPages: range(218, 219),
    note: "Maharashtra State Board (Class 11) — Limits (Balbharati textbook, Part 2)",
    subtopics: [
      "Definition of a Limit and One-Sided Limits",
      "Algebra of Limits",
      "Method of Factorization",
      "Method of Rationalization",
      "Limits of Trigonometric Functions",
      "Substitution Method",
      "Limits of Exponential and Logarithmic Functions",
      "Limits at Infinity and Infinite Limits",
    ],
  },

  "continuity-11": {
    id: "continuity-11",
    chapterName: "Continuity",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Continuity.pdf",
    pdf: p2("Ch_08_Continuity.pdf"),
    answersPdf: BOOK2,
    answerPages: range(219, 220),
    note: "Maharashtra State Board (Class 11) — Continuity (Balbharati textbook, Part 2)",
    subtopics: [
      "Continuity of a Function at a Point",
      "Continuity from the Left and from the Right",
      "Examples and Properties of Continuous Functions",
      "Types of Discontinuity",
      "Continuity Over an Interval",
      "The Intermediate Value Theorem",
    ],
  },

  "differentiation-11": {
    id: "differentiation-11",
    chapterName: "Differentiation",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_11_Maths__Differentiation.pdf",
    pdf: p2("Ch_09_Diffrentiation.pdf"), // publisher's filename typo — kept verbatim
    answersPdf: BOOK2,
    answerPages: range(220, 221),
    note: "Maharashtra State Board (Class 11) — Differentiation (Balbharati textbook, Part 2)",
    subtopics: [
      "Definition of the Derivative and Differentiability",
      "Derivative by the Method of First Principle",
      "Derivatives of Standard Functions",
      "Relationship Between Differentiability and Continuity",
      "Rules of Differentiation",
      "Derivatives of Algebraic Functions",
      "Derivatives of Trigonometric Functions",
      "Derivatives of Logarithmic and Exponential Functions",
    ],
  },
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
