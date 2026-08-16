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

  // ── INGESTED 2026-08-16. Structure mapped before dispatch; two facts matter.
  //
  //    1. NINE separate SOLVED EXAMPLES blocks, each restarting at "Ex. 1)" — the
  //       most of any chapter in this book. The bare `<N.M> SolvedEx.<n>` namespace
  //       therefore collides nine ways, so every block is scoped to the sub-section
  //       it FOLLOWS: 5.1.1 (p-01) · 5.1.2 (p-02) · 5.2.2 (p-03..04) · 5.2.3 (p-04) ·
  //       5.2.4 (p-05) · 5.3 (p-09..10) · 5.4 (p-12..15) · 5.4.3 (p-16..17) ·
  //       5.4.4 (p-18). See sections.ts. Decide this BEFORE transcription — refs
  //       route the /board structure, so a late discovery means re-transcribing.
  //
  //    2. A PRINTED SECTION-NUMBER DEFECT on p-03: the book heads the inclination
  //       section "5.1.2 Inclination of a line", but 5.1.2 is already "Shift of
  //       Origin" on p-01, and this one sits under §5.2 with "5.2.2 Slope of a line"
  //       immediately after. The book means 5.2.1 (which it otherwise never prints).
  //       Refs are unaffected — the p-03 solved block follows §5.2.2 — but do not
  //       "restore" 5.1.2 as a prefix here; it would collide with the p-02 block.
  //
  //    Figures: 18 (Fig. 5.1-5.18), ALL in the theory. Verified that no exercise or
  //    Miscellaneous question references one — Fig. 5.9 sits in the §5.3 theory on
  //    p-06, above which Exercise 5.2 ends. So this chapter needs no figure-attach.
  //
  //    SHIPPED: 183 q (46 solved + 127 subjective + 10 MCQ). 12 errata.
  //    ZERO our-answer-wrong: every one of the ~120 keyed items was independently
  //    derived and matched, and the 10 MCQ keys are TRIPLE-confirmed (transcriber
  //    derivation = blind pass = printed key).
  //    The sharpest defect is `Ex 5.4 Q15`, which is IMPOSSIBLE as printed: it asks
  //    for points at distance 1 from a line PARALLEL to the one they must lie on,
  //    so every candidate is at √2. The key's two points are at distance exactly 1
  //    from 4x+3y-10=0, which identifies the line the stem lost. Two more are
  //    answer-affecting solution errors (5.3 SolvedEx.3(i) y=3 for y=-3; (ii)
  //    asserting tan 30° = √3). The rest are typesetting.
  //
  //    EXERCISE 5.1 AND 5.3 BOTH SPILL PAST THE PAGE THEIR BANNER SITS ON — 5.1 runs
  //    to Q10 on p-03 and 5.3 to Q15 on p-12, against a page-scan estimate of 7 and
  //    9. Both were recovered only by checking the printed key's highest question
  //    number (README rule 2c). Nine solved blocks and a chapter this fragmented is
  //    exactly where that check pays.
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
  // ── INGESTED 2026-08-16. The FIRST chapter of Part 2, and the one whose ANSWER
  //    KEY uses a numbering format found nowhere else in the book: it numbers
  //    questions **`Q.1`, `Q.2`, …** with the dot BEFORE the number, where every
  //    other chapter uses `1)`. That broke the step-6 key-floor probe silently —
  //    it reported ZERO keyed questions for all four exercises, which reads exactly
  //    like "this chapter has no key". See README rule 2c for the three formats and
  //    the regex that handles all of them.
  //
  //    MANY SMALL SOLVED BLOCKS, each restarting at `Ex. 1`, so nearly every one
  //    needs a sub-section-scoped prefix: `1.2` (the p-04 banner block), `1.3`,
  //    `1.4`, `1.5.2`, `1.5.5`, `1.6`, `1.8`, plus the in-line `1.2.x` items under
  //    the algebra sub-sections. Do NOT merge them into one continuous run.
  //
  //    Exercise 1.2 SPILLS onto p-09 — the sixth exercise in this book found running
  //    past the page its banner sits on, and the boundary is MID-LEFT-COLUMN: Ex 1.2
  //    Q5(v) ends ~70% down p-09's left column and §1.5 opens immediately beneath it
  //    in that same column. Nothing about the page geometry marks the transition.
  //
  //    Figures: 9, mostly Argand-diagram illustrations in the §1.5 theory. No page
  //    carries both a figure and an exercise banner, so expect no figure-attach.
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

  // ── INGESTED 2026-08-16. The DENSEST chapter in the book by solutions per page
  //    (36 `Solution :` markers in 20pp). Three structural facts.
  //
  //    1. EIGHT solved blocks, scoped to the sub-section each FOLLOWS: 2.3.1
  //       (p-01..03) · 2.3.2 (p-05..08) · 2.4 (p-09) · 2.4.1 (p-10) · 2.5 (p-11) ·
  //       2.6.3 (p-12..13) · 2.7.1 (p-15) · 2.8 (p-16). Note 2.4.1 and 2.7.1 are
  //       THEORY-EMBEDDED (no banner) and are invisible to a banner scan — the §2b
  //       trap. Six of the eight carry a banner; two do not.
  //
  //    2. TWO shared-page seams, both needing an explicit split named in both
  //       agents' prompts: p-14 (EXERCISE 2.4 above, §2.7 A.G.P. below) and — the
  //       sharper one — p-17, which carries `EXERCISE 2.6` AND `MISCELLANEOUS
  //       EXERCISE - 2` on the same page. p-05 also reads column-wise: the text
  //       layer returns the SOLVED EXAMPLES banner BEFORE the §2.3.2 heading, which
  //       cannot be the physical order (examples never precede their own theory).
  //
  //    3. §2.2 Arithmetic Progression is RECALL ONLY — it shares p-00 with §2.1 and
  //       §2.3 and has no exercise of its own, Class 10 having covered A.P. So the
  //       "Arithmetic Progression" subtopic draws almost entirely on Miscellaneous
  //       questions. A thin count there is the book's shape, not a transcription miss.
  //
  //    Figures: exactly ONE (Fig. 2.1, in the §2.4 infinite-G.P. theory). No question
  //    references a figure; no figure-attach needed.
  //
  //    SHIPPED: 187 q (44 solved + 133 subjective + 10 MCQ). 12 errata.
  //    ZERO our-answer-wrong; the 10 MCQ keys are TRIPLE-confirmed. This chapter has
  //    the DIRTIEST KEY of the three — FOUR genuine answer-key errors, each verified
  //    by direct computation rather than algebra:
  //      Ex 2.6 Q2  printed closed form is wrong at EVERY n (n=1 gives 5/2, not even
  //                 an integer). 0 of 5 test values pass; the correction passes 5/5.
  //      Ex 2.6 Q8  the book summed r(2r+1)(2r+3) where the question prints 2r-1. It
  //                 AGREES at n=1 (both 15) and diverges from n=2 (120 vs 85) — the
  //                 canonical non-discriminating test point, see
  //                 [[discriminating-test-points]].
  //      Ex 2.3 Q8  bouncing ball keyed 25 m; the true distance is 40 m. The key
  //                 counts each rebound once, i.e. the ball rises but never falls.
  //      Ex 2.1 Q11 bacteria keyed 800 (four doublings) where "end of the 5th hour"
  //                 is 1600. What settles it is the book contradicting ITSELF in the
  //                 same exercise: Q12 and Q14 both put the exponent equal to periods
  //                 ELAPSED. Internal inconsistency beats a lone re-derivation.
  //    Plus Ex 2.3 Q4, whose data force |r| = 11/6 > 1 for a sum to infinity, and a
  //    key that numbers Exercise 2.2's last answer "15)" when the exercise has 13
  //    questions — the mirror image of the spill defects.
  //
  //    THREE exercises spill past their banner page (2.1 -> 15 on p-05, 2.2 -> 13 on
  //    p-09, 2.3 -> 8 on p-11). All three were caught by README rule 2c.
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
      // The book's own heading for the section between 2.7 A.G.P. and 2.8 Power
      // Series, which it prints WITHOUT a section number — which is why the XI
      // spine (built from numbered headings) has no entry for it and this list
      // originally lacked it. Added 2026-08-16: Exercise 2.6 and the solved block
      // above it are entirely summation-of-special-series work (Sigma r, r^2, r^3),
      // 26 rows, and TWO transcription agents independently reported that "Power
      // Series" was the only slot available and a poor fit. Exercise 2.6 is
      // physically PRINTED under 2.8 Power Series, so the book-structure axis
      // (sections.ts) files it there while this conceptual axis files it here —
      // the two axes diverging is the documented design, not a discrepancy.
      "Properties of Summation",
      // Zero rows, correctly: 2.8 Power Series is pure theory (five printed
      // expansions) with no worked example and no exercise of its own.
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

  // ── INGESTED 2026-08-16. The FIRST chapter in this book to need FIGURES, and the
  //    first with no solved-example banners at all. Four facts.
  //
  //    1. THERE IS NO `SOLVED EXAMPLES` BANNER ANYWHERE IN THE CHAPTER — a banner
  //       scan over all 27 pages returns ZERO, while the chapter carries 34 numbered
  //       worked examples. They sit in TWO theory-embedded runs, each numbered
  //       continuously: Ex.1-18 under §6.1 (p-03..p-11) and Ex.1-16 under §6.2
  //       (p-14..p-21). Prefixes `6.1 SolvedEx.` and `6.2 SolvedEx.` — one per RUN,
  //       not per sub-section, because each run's numbering is already continuous
  //       across its sub-sections. This is the §2b trap in its purest form: plan
  //       bands from a `Solution :` scan here, never from banners.
  //
  //    2. FIGURES ARE LOAD-BEARING IN THE EXERCISES, unlike every earlier chapter —
  //       but the scope is SMALL and was over-estimated at first. 46 figures exist
  //       (Fig. 6.1-6.46) and all but three are THEORY illustrations needing no row.
  //       The three that matter are `Ex 6.1 Q1(a)(b)(c)`, arrow-diagram "is this
  //       relation a function?" questions carrying Fig. 6.32 and 6.33 on p-11 and
  //       Fig. 6.34 on p-12 — so ONE question's figure set SPANS A PAGE BREAK (the
  //       mh-sb-9 Precipitation case).
  //
  //       CORRECTED 2026-08-16: `Misc II Q39` was predicted to read intervals off a
  //       graph, on the strength of key answers like (-3,0), (2,5) and {-2,2,4}.
  //       That was WRONG and the transcription agent refuted it from the page. Q39
  //       is "Solve the following for x" over modulus / greatest-integer /
  //       fractional-part functions, and those key entries are the SOLUTION SETS of
  //       its equations (|x^2-x-6| = x+2 gives {-2,2,4}, and so on). It has no
  //       figure and no figure number to join on. There are NO printed figures at
  //       all on p-24..p-26. An interval-shaped answer is not evidence of a graph.
  //
  //       Only `Misc II Q16` (f(x)=x+5) and `Q17` (f(x)=x^3+1) are "draw its graph"
  //       questions whose ANSWER is a graph; those two get a rendered
  //       `solution_image`. Total figure work for this chapter: 3 crops + 2 renders.
  //
  //    3. EXERCISE 6.1 IS MISNUMBERED ON THE PAGE, and the printed key is the one
  //       that is right. The exercise runs 1..12, skips 13, and then prints TWO
  //       consecutive questions numbered 14 — "14) Check the injectivity and
  //       surjectivity" at the foot of p-12 and "14) Show that if f : A -> B and
  //       g : B -> C are..." at the top of p-13. The key numbers the injectivity
  //       question **13**, leaves the two "Show that" proofs unkeyed (14, 15), and
  //       every later number then aligns exactly (16 -> 3/16 for f(x)=3(4x+1) at
  //       x=-3; 24, 25 likewise). So the page is self-inconsistent and the key is
  //       coherent. REFS FOLLOW THE KEY: the injectivity question is `Ex 6.1 Q13`.
  //       Numbering it Q14 as printed would collide with the next question's ref
  //       and would disagree with the answer key the step-6 gate diffs against.
  //       Recorded as an erratum; do NOT "restore" the printed duplicate.
  //       Exercise 6.2's printed key omits Q4 (a "show that" question) — normal.
  //       Note the key stops at Q25 while the exercise runs to Q28; Q26-Q28 are
  //       logarithm-identity proofs, so an unkeyed tail there is expected.
  //
  //    4. The largest Miscellaneous block in the book: part (I) is 10 MCQs (printed
  //       key B B B C C A A B C B) and part (II) runs to ~44 questions over p-24..26.
  //
  //    SHIPPED: 252 q (41 solved + 201 subjective + 10 MCQ) — the LARGEST chapter of
  //    the three. 20 errata, the most of any chapter here. ZERO our-answer-wrong; the
  //    10 MCQ keys are TRIPLE-confirmed (transcriber = blind pass = printed key).
  //    FOUR answer-affecting errors in the book's own printed SOLUTIONS, which is
  //    more than the other two chapters combined:
  //      6.1 SolvedEx.2   states g(3) = -5 while the book's OWN Fig. 6.14 puts the
  //                       minimum at y ≈ -4. Settled without scale calibration: the
  //                       minimum marker sits at the same page height as the labelled
  //                       point (-6,-4), and two points at the same height share a
  //                       y-value.
  //      6.1 SolvedEx.13  an inner sign flips + to - mid-derivation and is carried to
  //                       the final line.
  //      6.2 SolvedEx.11  reaches |x| > 4 correctly and then prints the COMPLEMENT.
  //                       On the printed answer the function is undefined everywhere.
  //      6.2 SolvedEx.15  never substitutes back into its own equation; it unions the
  //                       intervals and prints [1,3) where the answer is two points.
  //    Plus Ex 6.1 Q6(b), where the key prints both roots of the SQUARED equation and
  //    one is extraneous, and Misc I Q4, a multiple-correct item reused as a
  //    single-answer MCQ (all four statements are true at once).
  //
  //    THE KEY RUNS OUT BEFORE THE QUESTIONS DO. It stops PART-WAY THROUGH Misc II
  //    Q39 — its (g) and (h) are unanswered — while the exercise continues to Q44, so
  //    21 answerable parts have no printed answer at all. That is NOT the usual
  //    "the key omits proofs" pattern (Q40 is find-the-domain in 7 parts, Q41
  //    find-the-range in 5). Those answers were derived unaided and checked by
  //    substitution, which is weaker evidence than the rest of the chapter carries.
  //
  //    Note `render_solution_diagrams.py` here is the 663-line pre-BarCanvas copy and
  //    had NEVER been run on this book before this chapter — `curves` already plots
  //    y=f(x) from an expression, but `point` drew only FILLED dots, so an `open`
  //    marker was added for the step/piecewise graphs where the open-vs-closed
  //    endpoint IS the mathematical content.
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

  // ── NUMBERING DEFECT, and this note previously had it BACKWARDS. Corrected
  //    2026-08-16 against both the chapter and the answers section.
  //
  //    The CHAPTER is coherent: it prints EXERCISE 7.1 … 7.6 and then 7.7
  //    (p-24, split into parts I and II), contiguous, with no 7.8 anywhere.
  //    The ANSWERS SECTION is the defective one: it keys 7.1 … 7.6 and then
  //    labels that final block "EXERCISE 7.8", skipping 7.7 entirely. The two
  //    are the same block — the chapter's 7.7 part I has three questions and the
  //    key's "7.8" part I has exactly three entries (a/e, 1, 7/8).
  //
  //    REFS FOLLOW THE CHAPTER: `Ex 7.7 Q<n>`. There is no Exercise 7.8 to look
  //    for, and an agent told otherwise would hunt a block that does not exist.
  //    Note this is the OPPOSITE polarity to Ch.6 Functions' Exercise 6.1, where
  //    the page was self-inconsistent and the KEY was coherent — so neither
  //    source outranks the other by default. Whichever one is internally
  //    contiguous is the one to follow, and that has to be checked per chapter.
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

  // ── INGESTED 2026-08-16. STRUCTURALLY THE SIMPLEST CHAPTER IN THE BOOK: exactly
  //    ONE solved block and ONE exercise block, against Straight Line's nine and
  //    seven. The solved run is numbered continuously Ex.1..Ex.12 across p-04..p-11
  //    and never restarts, so it takes a single `8.1 SolvedEx.` prefix.
  //
  //    NO theory-embedded solved example exists, so the `a`-suffix device used in
  //    Sequences (2.3.1a, 2.4a) and Probability (9.1.1a) is NOT in play here. The
  //    solution marker on p-02 was checked and is the continuation of a numbered
  //    *Illustration* in the theory, not an `Ex. n`. This chapter's Illustrations
  //    1-6 are deliberately not ingested — they are worked theory passages that
  //    pose no question.
  //
  //    ALMOST EVERY PAGE BREAKS MID-COLUMN — repeatedly a stem sits at the foot of
  //    the left column with its entire solution in the right. On p-05 the text
  //    layer even returns "Ex. 3" before "Ex. 2", because the two headings sit at
  //    nearly the same HEIGHT in opposite columns and a y-sorted extraction
  //    interleaves them. Physical order is plain column order; verify from the image.
  //
  //    Figures: 11, all in the §8.1.x theory (discontinuity types). Only ONE page
  //    carries both a figure and an exercise banner; check it, expect no crop.
  //
  //    ITS MISCELLANEOUS EXERCISE HAS **EIGHT** PRINTED PARTS, (I) … (VIII) — by far
  //    the most in this book, where every other chapter splits Miscellaneous into
  //    just (I) MCQ and (II) free-response. (I) is 10 MCQs; (II) discuss-continuity
  //    7; (III) classify the discontinuity 3; (IV) classify + redefine 2; (V) find k
  //    2; (VI) find a and b 2; (VII) find f(a) 2; (VIII) apply the IVT 2. The book's
  //    own key keys ALL EIGHT and its per-part counts match exactly, which is what
  //    confirms the structure rather than a reading of the page alone.
  //    Refs therefore run `Misc I ` … `Misc VIII `, and sections.ts needs eight
  //    miscellaneous blocks for this chapter, not two.
  //
  //    Exercise 8.1 runs to Q18 while its key stops at 14 — NOT a defect: Q15/Q16
  //    are IVT existence proofs and Q17/Q18 are Activities, none of which this key
  //    ever answers. Q17 IS defective on its own terms though: it gives no interval
  //    for either branch, so as printed both apply on all of R, and even reading the
  //    intended `x < 1` off Fig. 8.11 leaves one equation in two unknowns.
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
