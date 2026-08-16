// Config for the MAHARASHTRA STATE BOARD Class-9 textbook-ingestion pipeline.
//
// Source: the Balbharati (Maharashtra State Board) Class 9 Mathematics textbooks —
// Part 1 (Algebra) + Part 2 (Geometry) — under SOURCE_ROOT. Born-digital PDFs with
// a clean PROSE text layer (~1500 ch/page) but unicode math (∈ ∪ ∩ √ ∴) that
// flattens to `�`, plus figures (Geometry-heavy Part 2). So extraction is a HYBRID:
// text-first for prose stems + MCQ options + prose solutions, VISION for math-dense
// stems / figures / truth-tables. Mirrors scripts/stateboard + scripts/ncert
// (render → transcribe → merge → commit).
//
// UNLIKE the Class-12 pipeline, the source is TWO WHOLE-BOOK PDFs (not pre-split
// per chapter), so every chapter sets `pages` (0-based) to its page range.
//
// The Class-9 book uses "Practice set N.M" (per-topic exercises) + one chapter-end
// "Problem Set N" (whose Q.1 is usually an MCQ block "Choose the correct
// alternative"). A chapter yields the same three buckets (see ../stateboard/lib.ts):
//   - solved              : worked examples in the theory (book's solution) → PUBLIC
//   - exercise-mcq        : the Problem-Set "choose the correct alternative" block
//   - exercise-subjective : Practice-set + Problem-set free-response (answer authored)
//
// The MATHS books ship an ANSWERS section at the back (Part1 p139-146 / Part2
// p134-138, 1-based) giving per-Practice-set FINAL answers + Problem-set MCQ keys —
// so for those chapters the step-6 answer-key cross-check gate is fully feasible
// (see `answersPdf`/`answerPages`). The HISTORY / POLITICAL SCIENCE book has NO
// answers section at all, so that gate cannot run there — see the block comment
// above those chapters before assuming a missing `answersPdf` is a mistake.
//
// Committed question_kind='practice', visibility='PRIVATE' (post-commit UPDATE).
// A textbook exercise corpus is not PYQ; Class-9 is not a board year, so there are
// no PYQ papers to follow. flip-public.ts flips solved examples + keyed MCQ +
// answered subjective.
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / stateboard / ncert pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra State Board Class 9 exam (seeded 2026-07-17); Mathematics subject seeded alongside.
export const EXAM_ID = "2030d309-a3de-4b0f-abea-75cb1b21fb18";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\State-Board\\01. 9th";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

const PART1 = join(SOURCE_ROOT, "9th_Maths_Part1_SB.pdf"); // Algebra
const PART2 = join(SOURCE_ROOT, "9th_Maths_Part2_SB.pdf"); // Geometry
// History AND Political Science ship as ONE physical book (108pp): History ch.1-10
// (printed pp 1-54) then Political Science ch.1-6 (printed pp 57-96), each with its
// own contents page. They are two separate BANK subjects (matching mh-ssc-10, where
// the board likewise prints one paper carrying both). Printed page N → 0-based PDF
// index N+9. Canonical chapter names below come from the book's own contents pages,
// NOT the pre-split `9th_Chapters/` folder names, which paraphrase (that folder's
// splits also drop the odd opener page, so we render from the whole book).
const HIST = join(SOURCE_ROOT, "9th_Hist_SB.pdf"); // History + Political Science
// Geography — 12 chapters over four areas (Practical / Physical / General / Human),
// same +9 page offset, and like the History book it ships NO answers section.
// Structurally it is the HARDEST of the three: only 5 of its ~217 questions are
// four-option MCQs (Ch.7), two more "tick the correct option" blocks print just
// THREE options (Ch.2, Ch.6) and so ship as free-response with the options in the
// stem, and its figures are LOAD-BEARING — several questions ("study the map and
// answer", "identify the landforms in the diagrams") are unanswerable without the
// printed graphic, unlike the humanities book where one figure was optional colour.
const GEOG = join(SOURCE_ROOT, "9th_Geog_SB.pdf"); // Geography

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Mathematics")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the whole-book PDF
  pages?: number[]; // 0-based page indices to render (the chapter's range)
  answersPdf?: string; // absolute path to the book PDF holding the ANSWERS section
  answerPages?: number[]; // 0-based page indices of this chapter's answer block (step-6)
  note: string; // questions.pyq_note
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const range = (startIncl: number, endIncl: number) =>
  Array.from({ length: endIncl - startIncl + 1 }, (_, i) => startIncl + i);

export const CHAPTERS: Record<string, Chapter> = {
  // ── Validation chapter — Ch.1 Sets (Part 1, Algebra). Low figure load (a few
  //    Venn diagrams). Pages 11-28 (1-based) → 0-based 10-27. Structure:
  //    Practice set 1.1 (writing sets / methods) · 1.2 (types, subsets, universal) ·
  //    1.3 (intersection & union) · 1.4 (number of elements — n(A∪B) word problems) ·
  //    Problem Set 1 (Q.1 = MCQ "choose the correct alternative" i-iv; Q.2+ subjective).
  //    Answers: Part1 p139-140 (1-based) → 0-based 138-139.
  "sets-9": {
    id: "sets-9",
    chapterName: "Sets",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Sets.pdf",
    pdf: PART1,
    pages: range(10, 27),
    answersPdf: PART1,
    answerPages: range(138, 139),
    note: "Maharashtra State Board (Class 9) — Sets (Balbharati textbook, Part 1 Algebra)",
    subtopics: [
      "Concept of a Set and Methods of Writing Sets",
      "Types of Sets",
      "Venn Diagrams",
      "Operations on Sets — Intersection and Union",
      "Number of Elements in a Set",
    ],
  },

  // ── Ch.2 Real Numbers (Part 1, Algebra). Pages 19-35 (1-based) → 0-based 28-44.
  //    Structure: Practice set 2.1 (p21 — terminating vs recurring decimals, p/q form) ·
  //    2.2 (p25 — irrationality proofs, number line, rationals between two numbers) ·
  //    2.3 (p30 — surds: order, surd-or-not, like/unlike, simplify, compare, add,
  //    multiply, divide, rationalize a monomial denominator) · 2.4 (p32 — binomial
  //    surds: multiply + rationalize with a conjugate) · 2.5 (p33 — absolute value) ·
  //    Problem Set 2 (pp34-35; Q.1 = a TEN-part MCQ block (i)-(x), Q.2-8 free-response).
  //    Answers: Part1 p130-131 (1-based) → 0-based 139-140 (ch.2's block starts
  //    mid-page on 139, right after the tail of Problem set 1).
  //
  //    ⚠ VISION-ONLY — do NOT reach for dump-text.ts here, unlike Ch.1 Sets. The
  //    radical sign is VECTOR-DRAWN in this book: U+221A occurs ZERO times across
  //    all 17 pages of the chapter (and in its answers block). So the text layer
  //    extracts "(B) √5" as "(B) 5", "∛7" as "7 3", and "√27" as "27" — a
  //    text-first pass yields questions that are arithmetically DIFFERENT from the
  //    printed ones, with nothing to flag it. Read the rendered pages.
  "real-numbers-9": {
    id: "real-numbers-9",
    chapterName: "Real Numbers",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Real_Numbers.pdf",
    pdf: PART1,
    pages: range(28, 44),
    answersPdf: PART1,
    answerPages: range(139, 140),
    note: "Maharashtra State Board (Class 9) — Real Numbers (Balbharati textbook, Part 1 Algebra)",
    // The book's OWN section headings (the chapter-opener bullet list on p19),
    // plus "Absolute value" — a "Let's learn" section on p33 that the opener list
    // omits but which Practice set 2.5 drills.
    subtopics: [
      "Properties of Rational Numbers and Decimal Expansion",
      "Irrational Numbers and the Number Line",
      "Surds — Order, Like and Unlike, Simplification",
      "Comparison of Quadratic Surds",
      "Operations on Quadratic Surds",
      "Rationalization of the Denominator",
      "Absolute Value",
    ],
  },

  // ── Ch.3 Polynomials (Part 1, Algebra). Pages 36-56 (1-based) → 0-based 45-65.
  //    Structure: theory + 2 Activities (pp36-38) · Practice set 3.1 (p39-40 — is it
  //    a polynomial / degree / types) · Operations solved Ex(1)-(5) (pp41-42) ·
  //    3.2 (p43 — add, subtract, multiply, divide) · Euclid's division lemma +
  //    Synthetic division (pp44-46) · 3.3 (p46 — divide, write quotient+remainder) ·
  //    Value of a polynomial (pp46-47) · 3.4 (p48) · Remainder theorem (pp48-50) ·
  //    Factor theorem (pp51-52) · 3.5 (p53) · Factorization (pp53-54) · 3.6 (p54) ·
  //    Problem Set 3 (pp55-56; Q.1 = a TEN-part MCQ block (i)-(x), Q.2+ free-response).
  //    Answers: Part1 p131-133 (1-based) → 0-based 140-142 (ch.3's block opens
  //    mid-page on 140, right after the tail of Problem set 2).
  //
  //    ⚠ VISION-ONLY — do NOT reach for dump-text.ts here. Unlike Ch.1 Sets (whose
  //    prose text layer is clean) this chapter's text layer is arithmetically WRONG
  //    and gives no signal that it is: U+FFFD occurs ZERO times and there are no
  //    radicals to vanish, but EXPONENTS ARE SEPARATE 7.6pt SPANS against a 13-14pt
  //    body, so `get_text()` flattens \(63x^2 + 5x - 2\) to "63x2 + 5x - 2" — a
  //    DIFFERENT polynomial, silently. 575 such spans across the chapter. The
  //    synthetic-division layouts flatten to bare number runs ("- 2 3 2 0 - 1 -6")
  //    with the grid lost. Read the rendered pages.
  //
  //    No figures: the chapter is pure symbol manipulation (0 exercise figures).
  "polynomials-9": {
    id: "polynomials-9",
    chapterName: "Polynomials",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Polynomials.pdf",
    pdf: PART1,
    pages: range(45, 65),
    answersPdf: PART1,
    answerPages: range(140, 142),
    note: "Maharashtra State Board (Class 9) — Polynomials (Balbharati textbook, Part 1 Algebra)",
    // The chapter-opener "Let's study" bullet list (p36), plus "Factor Theorem" and
    // "Factorization" — two "Let's learn" sections the opener list omits but which
    // Practice sets 3.5 and 3.6 drill (the same call as Ch.2's "Absolute value").
    subtopics: [
      "Introduction to Polynomials",
      "Degree of a Polynomial",
      "Operations on Polynomials",
      "Synthetic Division",
      "Value of a Polynomial",
      "Remainder Theorem",
      "Factor Theorem",
      "Factorization of Polynomials",
    ],
  },

  // ── Ch.6 Financial Planning (Part 1, Algebra). Pages 93-107 (1-based) →
  //    0-based 102-116. Structure: savings/expenditure + investments with solved
  //    examples (pp93-97) · Practice set 6.1 (p98) · taxation, types of tax,
  //    income tax terms (pp99-100) · computation of income tax + the three
  //    age-band SLAB TABLES (pp101-102) · worked computations (pp104-105) ·
  //    Practice set 6.2 (p106) · Problem Set 6 (p107; Q.1 is a TWO-part MCQ block
  //    — the smallest in the volume).
  //    Answers: Part1 p135-136 (1-based) → 0-based 144-145.
  //
  //    ⚠ THE RUPEE SIGN IS A FONT HACK. The book sets ₹ from a font named
  //    `RupeeForadian` whose glyph is mapped onto the BACKTICK character, so the
  //    text layer yields "` 1200" for ₹1200 — 25 occurrences chapter-wide. It
  //    reaches the DB looking like ordinary text and passes `audit:text`, so
  //    transcribe the printed ₹ (or the book's own "Rs.") and never the backtick.
  //
  //    ⚠ CHAPTER-LEVEL REFERENCE TABLES. The income-tax slab Tables I/II/III are
  //    printed ONCE in the theory (pp101-102) — one per age band — and Practice
  //    set 6.2 / Problem set 6 then ask "compute the tax for a 62-year-old with
  //    income X". Those questions are unanswerable without the slabs, and this is
  //    NOT a per-question figure: it is a chapter-level table. Per the user's call
  //    (2026-08-15) the relevant band's slab table is inlined into each dependent
  //    question's `context` as a GFM pipe-table — searchable, and a native
  //    <w:tbl> in the Word export. `context` is part of subjectiveContentHash, so
  //    this MUST be settled before commit; it cannot be backfilled.
  //
  //    ⚠ Practice set 6.1's two "Activity" prompts (write your family's weekly
  //    income/expenditure; discuss dry-land farming) are open-ended and NOT
  //    ingested — but 6.1 ALSO carries 5 real numbered questions with printed
  //    answers, so the set is not skipped wholesale. The p103 "Mr. Pandit" box and
  //    the p102 "Mr. Mehta" box are likewise Activities (fill-in-the-boxes) and
  //    are not ingested; the chapter-end "Project" (look up 80C/80G/80D, study a
  //    PAN card) is open-ended and never ingested.
  //
  //    Inventory, CONFIRMED page by page: 7 solved examples (4 in the Investments
  //    section pp95-97, 3 in the income-tax section pp104-106) + Practice set 6.1
  //    = Q1-Q5 (5 q) + Practice set 6.2 = Q1(i)-(v) + Q2 (6 q) + Problem set 6 =
  //    Q1(i)-(ii) MCQ + Q2-Q7 + Q8(i)-(iii) (11 q). 29 rows.
  //    Both Problem-set MCQ keys blind-re-derived — (i) A (80C caps at 1,50,000)
  //    and (ii) B (income earned in FY 2017-18 is assessed in 2018-19) — 2/2 match
  //    the printed key. Every printed answer value re-derived; all AGREE except:
  //      (a) p96 Ex(4) STEM MISPRINT — it reads "If Anil's monthly EXPENDITURE is
  //          96,000 rupees", but the book's own solution on p97 sets 5x = 9600
  //          from "Anil's monthly INCOME is 9600 rupees", and the printed answers
  //          (Aman 16,800; Anil's saving 1,920) follow from that. Wrong in BOTH
  //          the quantity (expenditure for income) and the magnitude.
  //      (b) Problem set 6 Q3 ANSWER-KEY ERROR — the key gives Hiralal's gain as
  //          36.73%. He invested 2,15,000 and received 3,05,000, so the gain is
  //          90,000 and 90000/215000 = 41.86%. The key's figure is exactly
  //          90000/245000, i.e. it divided by 2,45,000 — a 1-for-4 digit slip in
  //          the principal. (Ramniklal's 16.64% is correct and the verdict
  //          "Hiralal's profit is more" is unaffected either way.)
  //      (c) Problem set 6 Q8(i)/(ii) ANSWER-KEY NOTE — the key gives 2,13,000 and
  //          7,500, which are the income tax BEFORE the 2% + 1% cess. The question
  //          asks for the tax PAYABLE and all three of the chapter's own worked
  //          examples (Mhatre, Ahmed, Hinduja) add the cess to reach a total, so
  //          our answers give both figures and name the inconsistency.
  "financial-planning-9": {
    id: "financial-planning-9",
    chapterName: "Financial Planning",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Financial_Planning.pdf",
    pdf: PART1,
    pages: range(102, 116),
    answersPdf: PART1,
    answerPages: range(144, 145),
    note: "Maharashtra State Board (Class 9) — Financial Planning (Balbharati textbook, Part 1 Algebra)",
    // The chapter-opener "Let's study" list (p93). Its first bullet is printed
    // truncated as "Introduction to" (the noun is lost in the setting), so the
    // savings/expenditure section is named from its own "Savings" heading on p94.
    subtopics: [
      "Savings and Expenditure",
      "Investments",
      "Tax Structure",
      "Computation of Income Tax",
    ],
  },

  // ── Ch.7 Statistics (Part 1, Algebra). Pages 108-128 (1-based) → 0-based
  //    117-137. The LAST chapter of the volume. Structure: sub-divided and
  //    percentage bar diagrams with solved examples (pp108-110) · Practice set 7.1
  //    (p111 — DRAW the diagrams) · data collection, primary/secondary (pp112-113) ·
  //    Practice set 7.2 (p113) · classification + frequency distribution tables
  //    (pp114-117) · Practice set 7.3 (p118) · cumulative frequency (pp119-120) ·
  //    Practice set 7.4 (p121) · measures of central tendency (pp122-124) ·
  //    Practice set 7.5 (p125) · Problem Set 7 (pp126-127; Q.1 = the MCQ block).
  //    Answers: Part1 p136 (1-based) → 0-based 145.
  //
  //    ⚠ TABLE-HEAVY, NOT FIGURE-HEAVY, and that is the useful distinction. 40
  //    data tables across pp.114-127, and they belong in the STEM as GFM
  //    pipe-tables (searchable, and a native <w:tbl> in the Word export) rather
  //    than as cropped images. Only the bar-diagram READING questions need a
  //    figure. VISION for the tables (the text layer flattens a grid into a bare
  //    number run with the row/column structure lost).
  //
  //    ⚠ Practice set 7.1 has NO printed answers — CONFIRMED against the rendered
  //    ANSWERS page (out/_answers/statistics-9/p-145.png), which runs 7.2 → 7.3 →
  //    7.4 → 7.5 → Problem set 7 with no 7.1 block, because its answers are
  //    DRAWINGS. Its determinate maths (the percentage/component figures) is to be
  //    authored, and its diagrams rendered as `solution_image` (the user's call,
  //    2026-08-15). PS 7.1 is exactly TWO questions: Q1 (trucks/buses →
  //    percentage bar) and Q2 (permanent/temporary roads → sub-divided AND
  //    percentage bar), so ~3 diagrams. The "girls per 1000 boys" block below them
  //    is an Activity and is NOT ingested.
  //
  //    🚧 NOT TRANSCRIBED YET — no data/statistics-9.*.json exists and nothing is
  //    committed. Pages are rendered under out/statistics-9/ and the answers under
  //    out/_answers/statistics-9/. Established so far:
  //      · Problem set 7's MCQ key, read off the ANSWERS page: (i) C (ii) B
  //        (iii) D (iv) B (v) A (vi) D (vii) B (viii) A (ix) C (x) C — ten items.
  //        Blind-re-derive before trusting these; they are recorded here only so
  //        the cross-check has something to diff against.
  //      · The book prints answers for only PART of Practice sets 7.3 and 7.4
  //        (7.3 → Q1-Q3 only; 7.4 → Q3 and Q4 only), so the step-6 cross-check
  //        covers those two sets PARTIALLY. 7.2 and 7.5 are fully answered.
  //      · EXERCISE INVENTORY — COMPLETE, every practice set and the problem set
  //        read page by page. 57 exercise ROWS (a sub-item is its own row):
  //          PS 7.1  (p111)      2 q  — draw the diagrams; no printed answers.
  //          PS 7.2  (p113)      1 q / 4 sub-items — see the defect below.
  //          PS 7.3  (p118)      6 q  — Q1-Q3 one-liners on class limits/marks,
  //                                     Q4 fill-in tally table, Q5 a 45-value raw
  //                                     data set, Q6 the 50 decimals of pi.
  //          PS 7.4  (p121-122) 10 rows — Q1 + Q2 fill-in cumulative tables,
  //                                     Q3(i)-(iv) on 62 students' marks,
  //                                     Q4(i)-(iv) reusing Q3's data.
  //          PS 7.5  (p125)     14 q  — mean/median/mode one-liners, all on one
  //                                     page, ALL fully answered by the key.
  //          Prob 7  (p126-128) 21 rows — Q1(i)-(x) MCQ + Q2 + Q3 + Q4(i)-(ii)
  //                                     + Q5 + Q6(i)-(iii) + Q7(i)-(ii) + Q8.
  //      · SOLVED EXAMPLES — the central-tendency block (pp.123-124) is READ and
  //        every value re-derived: Mean Ex.(1) 130/5 = 26 · Mean Ex.(2) the
  //        35-mark fx table (all 13 frequencies re-counted from the raw list,
  //        Sum f = 35, Sum fx = 956, mean 27.31) · Median Ex.(1) = 72 ·
  //        Median Ex.(2) = 32.5 · Mode Ex.(1) = 55 · Mode Ex.(2) = 21 and 27
  //        (a genuine BIMODAL example, worth keeping). Six rows.
  //        p117's exclusive-method Ex. is also READ and verified: with classes
  //        6-10 / 11-15 / 16-20 the frequencies 2 / 3 / 2 are right and exactly
  //        two of the nine observations fit no class, and the re-cut table
  //        (5-10 / 10-15 / 15-20 / 20-25 -> 1 / 5 / 2 / 1) is right too.
  //        STILL TO READ: p116 (inclusive method, class limits) and pp.119-121
  //        (cumulative frequency). That plus authoring is all that remains.
  //      · TWO MORE MISPRINTS in that block, neither changing an answer, both to
  //        be carried as `[Textbook misprint: ...]` on the row:
  //          Median Ex.(1) — the stem lists "54, 63, 66, 72, 98, 87, 92" but the
  //          solution's ascending order reads "54, 63, 66, 72, 78, 87, 92". The
  //          4th value is 72 either way, so the median is unaffected.
  //          Mean Ex.(2) — the prose says Sum fx is "14 x 1 + 15 x 6 + ... + 40 x 3"
  //          while its own table gives 15 the frequency 2, not 6. The table is
  //          right (Sum f = 35 only with 2), so the prose digit is the misprint.
  //          p117 exclusive-method Ex. — the prose twice names the two values
  //          that fit no class as "10.3 and 15.7", but the stem's observations
  //          are 6, 10, 10.5, 11, 15.5, 19, 20, 12, 13: the excluded pair is
  //          10.5 and 15.5. Both of the page's tables are correct for the
  //          printed data, so only the prose is wrong. (Two cosmetic slips in
  //          the same paragraph, not worth a bracket: "In 5-10 or 10-20 ?" for
  //          10-15, and "convension" for convention.)
  //      · NOT ingested, and the line is the Ch.6 one: p114 Ex.(1) (the 50-mark
  //        "Let's recall" lead-in) and the p115 "complete the table" block print
  //        NO solution and sit in the theory as activities, so they are skipped
  //        like the Mehta/Pandit boxes. The p124 "Let's recall" (i)/(ii) prompts
  //        about n odd/even and the p128 "Fun with maths" Pascal's triangle are
  //        likewise open-ended.
  //      · ALL 10 Problem-set-7 MCQ KEYS BLIND-RE-DERIVED, 10/10 match the
  //        printed key (C B D B A D B A C C). Every PS 7.5 answer (14 of 14) and
  //        Problem set Q2/Q3/Q4/Q5/Q8 were independently re-derived and AGREE.
  //      · A SECOND BOOK DEFECT — Problem set 7 Q1(vi) STEM MISPRINT. It reads
  //        "The mean of five numbers is 80, out of which mean of 4 numbers is 46,
  //        find the 5th number", whose answer is 5(80) - 4(46) = 216 — matching
  //        NONE of the four printed options (4, 20, 434, 66). The key's D = 66 is
  //        exactly 5(50) - 4(46), so the intended first mean is 50, not 80. This
  //        is the only repair that makes the key right; solving 5a - 4(46) for
  //        each option gives a non-integer or impossible partner mean otherwise.
  //        Preserve the stem as printed, key D, and carry a
  //        `[Textbook misprint: ...]` bracket.
  //      · SOLVED EXAMPLES: the bar-diagram block has exactly ONE (p110 Ex.1,
  //        five sub-parts (i)-(v), answered on p111). It is a FIGURE-READING
  //        question — the percentage bar diagram carries all the data, so the
  //        five siblings need the figure attached or they are unanswerable.
  //        pp.109-110 are otherwise pure theory with no exercise questions.
  //      · A BOOK DEFECT, confirmed by reading both pages at zoom: **Practice
  //        set 7.2's printed list ends at (iv) on p113 and p114 opens a new
  //        section, so the question has exactly FOUR sub-items — but the printed
  //        answer key names FIVE** ("Primary data : (i), (iii), (v)  Secondary
  //        data : (ii), (iv)"). The key is also off by one against the printed
  //        list: its (iv) = secondary, whereas the printed (iv) ("information of
  //        trees gathered by visiting a forest") is unambiguously PRIMARY. Both
  //        facts are explained by the same cause — an item that was secondary
  //        was dropped between (iii) and the trees item during typesetting, so
  //        the key's (v) IS our (iv). Ingest the four printed items, classify
  //        them on their own merits ((i) primary · (ii) secondary · (iii)
  //        primary · (iv) primary) and carry a `[Textbook answer-key error: ...]`
  //        bracket explaining the numbering. Do NOT renumber to match the key.
  //      · NOT ingested (Activity boxes, no determinate answer): the
  //        girls-per-1000-boys fill-in table below PS 7.1 (p111) and the
  //        primary-vs-secondary discussion prompt above PS 7.2 (p113).
  //      · Suggested bands, cut at block boundaries: idx 117-120 (bar diagrams +
  //        PS 7.1) · 121-122 (data collection + PS 7.2) · 123-127 (classification
  //        + frequency tables + PS 7.3) · 128-130 (cumulative frequency + PS 7.4)
  //        · 131-134 (central tendency + PS 7.5) · 135-137 (Problem set 7).
  //    THE BAR RENDERER NOW EXISTS (2026-08-15). `render_solution_diagrams.py`
  //    gained a `BarCanvas` selected by `kind: "bars"`, plus a `statistics-9`
  //    spec builder, and all three PS 7.1 diagrams render:
  //      npx --no-install -- python scripts/mh-sb-9/render_solution_diagrams.py statistics-9
  //    → out/statistics-9-diagrams/ + data/statistics-9.solution-images.json.
  //    It is a SEPARATE canvas, not a mode on `Canvas`: a bar diagram's x-axis is
  //    CATEGORICAL while `Canvas.px()` assumes a numeric x, so sharing would mean
  //    inventing fake x-coordinates. Stacked-only, because both the sub-divided
  //    and the percentage bar diagram are stacks — the book has no grouped
  //    variant. Dispatch is `canvas_for(spec)` on a `kind` key no existing spec
  //    carries, PROVEN a pass-through: rendering `pair-lines-12` through this
  //    copy and through the untouched `scripts/stateboard` original gives 21 of
  //    21 byte-identical PNGs.
  //    The derived percentages (rounded to the nearest integer, as both questions
  //    instruct) are Q1 84/16 · 81/19 · 79/21 · 78/22 and Q2 58/42 · 58/42 ·
  //    57/43 · 51/49 — every pair happens to close at exactly 100, so no bar
  //    needs a rounding fudge.
  "statistics-9": {
    id: "statistics-9",
    chapterName: "Statistics",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Statistics.pdf",
    pdf: PART1,
    pages: range(117, 137),
    answersPdf: PART1,
    answerPages: [145],
    note: "Maharashtra State Board (Class 9) — Statistics (Balbharati textbook, Part 1 Algebra)",
    // The chapter-opener "Let's study" list (p108) plus the "Let's learn" sections
    // it omits but which Practice sets 7.3-7.5 drill (classification/frequency
    // tables, cumulative frequency, measures of central tendency).
    subtopics: [
      "Sub-divided Bar Diagram",
      "Percentage Bar Diagram",
      "Primary and Secondary Data",
      "Classification of Data and Frequency Distribution",
      "Cumulative Frequency",
      "Measures of Central Tendency",
    ],
  },

  // ── Ch.4 Ratio and Proportion (Part 1, Algebra). Pages 57-79 (1-based) →
  //    0-based 66-88. The LONGEST chapter of the volume at 23pp and the most
  //    solved-example-dense (~28 worked examples across 6 theory blocks).
  //    Structure: ratio/proportion + direct & inverse proportion + properties,
  //    solved Ex(1)-(5) (pp57-61) · Practice set 4.1 (p61) · comparison of
  //    ratios, solved Ex(1)-(4) (pp62-63) · Practice set 4.2 (p63) · operations
  //    on equal ratios + componendo-dividendo + applications, solved Ex(1)-(6)
  //    and Ex(1)-(2) (pp64-70) · Practice set 4.3 (p70) · theorem on equal
  //    ratios, solved Ex(1)-(4) (pp71-72) · Practice set 4.4 (p73) · continued
  //    proportion + k-method, solved Ex(1)-(3) and Ex(1)-(4) (pp74-76) ·
  //    Practice set 4.5 (p77) · Problem Set 4 (pp77-79; Q.1 is a FIVE-part MCQ
  //    block using the wording "Select the appropriate alternative answer" —
  //    each Part-1 chapter words this instruction differently, so a transcription
  //    contract must key on the block's SHAPE, never on one phrase).
  //    Answers: Part1 p133-134 (1-based) → 0-based 142-143.
  //
  //    ⚠ VISION-ONLY, and this is the chapter where the text layer is WORST.
  //    Stacked fractions do not merely lose their bar — the extractor interleaves
  //    numerator and denominator into unrecoverable word order: \(\frac{a}{b} =
  //    \frac{7}{3}\) comes out as "3 b a 7 =", and \(\frac{a-2b}{a+2b}\) as
  //    "2 2 a b a b - +". 256 fraction bars chapter-wide. There is no repair for
  //    this at the text layer; read the rendered pages.
  //
  //    No figures: the chapter is pure ratio algebra (0 exercise figures).
  //
  //    Six transcription bands (b1-ps41 … b6-prob). Band boundaries are cut at
  //    BLOCK boundaries, not page breaks — Practice set 4.4 spans pp.73-74, so the
  //    b4/b5 cut sits inside it and b4 carries Q3(iii)-(v) and Q4 from p74.
  "ratio-proportion-9": {
    id: "ratio-proportion-9",
    chapterName: "Ratio and Proportion",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Ratio_and_Proportion.pdf",
    pdf: PART1,
    pages: range(66, 88),
    answersPdf: PART1,
    answerPages: range(142, 143),
    note: "Maharashtra State Board (Class 9) — Ratio and Proportion (Balbharati textbook, Part 1 Algebra)",
    // The chapter-opener "Let's study" list (p57) plus "Comparison of ratios" and
    // the direct/inverse proportion pair — "Let's learn" sections the opener list
    // omits but which Practice sets 4.1 and 4.2 drill (the Ch.2 "Absolute value"
    // and Ch.3 "Factor Theorem" call).
    subtopics: [
      "Ratio and Proportion",
      "Direct and Inverse Proportion",
      "Properties of Ratio",
      "Comparison of Ratios",
      "Operations on Equal Ratios",
      "Theorem on Equal Ratios",
      "Continued Proportion",
      "k-Method",
    ],
  },

  // ── Ch.5 Linear Equations in Two Variables (Part 1, Algebra). Pages 80-92
  //    (1-based) → 0-based 89-101. The SMALLEST chapter of the volume at 13pp.
  //    Structure: intro + graphical solution (pp80-82) · elimination method with
  //    solved Ex(1)-(2) (pp83-84) · general form + substitution method with
  //    solved Ex(1)-(2) (pp85) · Practice set 5.1 (p86) · word problems with
  //    solved Ex(1)-(4) (pp87-89) · Practice set 5.2 (pp90-91) · Problem Set 5
  //    (pp91-92; Q.1 is a THREE-part MCQ block (i)-(iii) — NOT the ten-part block
  //    every other Part-1 chapter uses; Q.2+ free-response).
  //    Answers: Part1 p134-135 (1-based) → 0-based 143-144.
  //
  //    ⚠ VISION like its siblings, though this is the chapter where the text
  //    layer comes CLOSEST to usable: only 9 sub-body spans and 15 fraction bars
  //    chapter-wide (vs 575 and 256 in Polynomials / Ratio). It is still read
  //    from the rendered pages, so the whole volume is transcribed one way and a
  //    later session does not have to re-derive which chapters are exceptions.
  //
  //    NO graph figures are needed: the graphical-solution material is theory
  //    (pp80-82) and NOT ONE exercise question asks the student to draw or read a
  //    graph — verified by scanning every "draw"/"graph" instruction in the
  //    chapter's exercises, which returns zero.
  "linear-equations-9": {
    id: "linear-equations-9",
    chapterName: "Linear Equations in Two Variables",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Linear_Equations_in_Two_Variables.pdf",
    pdf: PART1,
    pages: range(89, 101),
    answersPdf: PART1,
    answerPages: range(143, 144),
    note: "Maharashtra State Board (Class 9) — Linear Equations in Two Variables (Balbharati textbook, Part 1 Algebra)",
    // The chapter-opener "Let's study" list (p80) resolved against the book's own
    // section headings: the opener's "Solving simultaneous equations" is taught as
    // TWO named methods (elimination, substitution), each with its own heading and
    // its own worked examples, so they are separate subtopics.
    subtopics: [
      "Linear Equations in Two Variables",
      "Elimination Method",
      "Substitution Method",
      "Word Problems on Simultaneous Equations",
    ],
  },

  // ── Ch.4 Constructions of Triangles (Part 2, Geometry). Pages 51-56 (1-based)
  //    → 0-based 60-65, the SMALLEST chapter in the volume at 6 pages. Opener
  //    VERIFIED: 60 carries the "4 Constructions of Triangles" banner and 66
  //    opens "5 Quadrilaterals".
  //
  //    ⚠ THE BOOK PRINTS NO ANSWERS FOR THIS CHAPTER AT ALL - the Part-2 answers
  //    section runs 1, 2, 3, 5, 6, 7, 8, 9 and skips 4. That is not an omission:
  //    every answer here is a ruler-and-compass DRAWING. So the mandatory step-6
  //    cross-check cannot run, exactly as for the Class-9 humanities book.
  //
  //    ⚠ EXTRACTION IS TEXT-FIRST HERE, unusually for Part 2. The exercises are
  //    plain prose with no math beyond "6.4 cm" and a degree sign, so the text
  //    layer reads them cleanly (only the angle glyph substitutes, as `Ð`).
  //    Vision is needed only for the worked constructions' figures.
  //
  //    EXERCISE INVENTORY, read off the text layer - 14 constructions of THREE
  //    types, and every one is the same three types repeated:
  //      PS 4.1 (p53) 4 q - base, adjacent angle, and the SUM of the other two
  //        sides. Q1 PQR (4.2, 40, 8.5) · Q2 XYZ (6, 50, 9) · Q3 ABC (6.2, 50,
  //        9.8) · Q4 ABC (3.2, 45, perimeter 10).
  //      PS 4.2 (p54) 3 q - base, adjacent angle, and the DIFFERENCE of the other
  //        two sides. Q1 XYZ (7.4, 45, 2.7) · Q2 PQR (6.5, 40, 2.5) · Q3 ABC
  //        (6, 100, 2.5).
  //      PS 4.3 (p56) 3 q - two angles and the PERIMETER. Q1 PQR (70, 80, 9.5) ·
  //        Q2 XYZ (58, 46, 10.5) · Q3 LMN (60, 80, 11).
  //      Prob 4 (p56) 4 q - Q1 sum-type · Q2 perimeter-type · Q3 perimeter 14.4
  //        with sides in the ratio 2:3:4 (a FOURTH shape - the only one that is
  //        not one of the three taught types) · Q4 difference-type.
  //
  //    ✅ THE RENDERER EXISTS AND NO NEW CANVAS WAS NEEDED. A ruler-and-compass
  //    figure is drawable with the physical-geometry primitives already in
  //    render_solution_diagrams.py - finite `segments`, `conics` as compass ARCS
  //    via t0/t1, labelled `points`, `equal_aspect` and `axes: false`.
  //    `build_constructions_specs()` computes each figure from the question's own
  //    data (`_construct_sum` / `_construct_diff`), so the drawing is TRUTHFUL,
  //    not schematic: the apex really is on the ray at the given angle and really
  //    is equidistant from D and C. The two compass arcs are drawn over the
  //    angular window spanning their REAL intersections, so they visibly cross on
  //    the perpendicular bisector - that crossing IS the construction step.
  //    Still to add: the perimeter type (PS 4.3, Prob Q2) and the ratio type
  //    (Prob Q3), then the 5 incircle/circumcircle constructions of Ch.6 PS 6.3.
  "constructions-9": {
    id: "constructions-9",
    chapterName: "Constructions of Triangles",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Constructions_of_Triangles.pdf",
    pdf: PART2,
    pages: range(60, 65),
    // NO answersPdf ON PURPOSE - the book keys no question in this chapter.
    // Do not "restore" one; see the note above.
    note: "Maharashtra State Board (Class 9) — Constructions of Triangles (Balbharati textbook, Part 2 Geometry)",
    // The book's own "Construction I / II / III" headings, which are exactly the
    // three types the exercises drill.
    subtopics: [
      "Construction Given Base, Base Angle and Sum of Remaining Sides",
      "Construction Given Base, Base Angle and Difference of Remaining Sides",
      "Construction Given Two Angles and Perimeter",
    ],
  },

  // ── Ch.6 Circle (Part 2, Geometry). Pages 76-87 (1-based) → 0-based 85-96.
  //    Boundary VERIFIED, and the derived one was WRONG AT BOTH ENDS: the
  //    practice-set positions suggested 86-97, but 85 carries the "6 Circle"
  //    banner and 97 already opens "7 Co-ordinate Geometry". Second chapter in a
  //    row where inferring the opener from the first practice set was off by one.
  //    Structure: properties of a chord with three theorems (pp77-79) · Practice
  //    set 6.1 (p79) · arcs and the incircle/circumcircle theory (pp80-82) ·
  //    Practice set 6.2 (p82) · constructions (pp83-86) · Practice set 6.3 AND
  //    Problem set 6 (pp86-87).
  //    Answers: 0-based 135-136.
  //
  //    ⚠ THE KEY IS THE SPARSEST IN THE VOLUME, and that is structural rather
  //    than an omission: most of this chapter is THEOREMS and CONSTRUCTIONS, and
  //    the book keys neither. Transcribed in full:
  //      PS 6.1  1. 20 cm · 2. 5 cm · 3. 32 units · 4. 9 units
  //      PS 6.2  1. 12 cm · 2. 24 cm
  //      PS 6.3  (NOTHING - it is entirely "construct the incircle and
  //              circumcircle of ...", whose answer is the drawing)
  //      Prob 6  1. (i) A (ii) C (iii) A (iv) B (v) D (vi) C (vii) **D or B**
  //              2. 2:1 · 4. 24 units
  //    ⚠ NOTE Problem set 6 Q1(vii): the printed key itself reads "D or B" - the
  //      BOOK acknowledges two acceptable options. Do not "resolve" that to a
  //      single letter; blind-re-derive it and, if both genuinely fit, preserve
  //      the ambiguity with an errata bracket rather than picking one.
  //
  //    ⚠ Vision-only (Part-2 operator-glyph substitution) and heavily
  //    figure-bearing, like Ch.2 - the chord/arc exercises reference numbered
  //    figures carrying the given lengths.
  //
  //    🚧 NOT COMMITTED YET. Exercise pages are 0-based 88 (PS 6.1), 91 (PS 6.2)
  //    and 95-96 (PS 6.3 + Problem set 6); solved examples sit on 87, 88 and 90.
  //    Established so far:
  //      · PS 6.1 (printed p79) = 6 questions - Q1-Q4 numeric chord/radius work
  //        (ALL FOUR printed answers re-derived and AGREE) + Q5 (Fig 6.9, show
  //        AP = BQ) + Q6 (prove two bisected chords are parallel). Only Q5 needs
  //        a crop.
  //      · PS 6.3 (p86) = 5 questions, EVERY ONE a ruler-and-compass construction
  //        ("construct the incircle / circumcircle of ..."). No printed answers,
  //        and none possible - the answer is the drawing. **Whatever is decided
  //        for Ch.4's construction diagrams applies here too**; until then this
  //        set is the chapter's blocker.
  //      · Problem set 6 Q1 (p86) = SEVEN MCQs. All 7 blind-re-derived: six match
  //        the printed key exactly (A C A B D C) and the seventh is a defect -
  //        see below. Q2 onward are on 0-based 96 and NOT yet read.
  //
  //    ⚠ A BOOK ANSWER-KEY DEFECT, and it is the interesting kind - the key is
  //      too GENEROUS rather than wrong. Problem set 6 Q1(vii) asks for the
  //      distance between two parallel chords of lengths 6 cm and 8 cm in a
  //      circle of radius 5 cm that are **on opposite sides of the centre**, and
  //      the printed key reads "D or B". The two chords are at distances
  //      sqrt(25-9) = 4 and sqrt(25-16) = 3 from the centre. On OPPOSITE sides
  //      the distance is 4 + 3 = 7 cm (option D); on the SAME side it would be
  //      4 - 3 = 1 cm (option B). The stem says opposite sides, so **D is the
  //      only correct answer** and B answers a question the stem excludes. Key D
  //      and carry an errata bracket rather than reproducing the hedge.
  "circle-9": {
    id: "circle-9",
    chapterName: "Circle",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Circle.pdf",
    pdf: PART2,
    pages: range(85, 96),
    answersPdf: PART2,
    answerPages: range(135, 136),
    note: "Maharashtra State Board (Class 9) — Circle (Balbharati textbook, Part 2 Geometry)",
    // 🚧 PROVISIONAL — replace with the chapter's own "Let's study" list once the
    // opener page (0-based 85) is read.
    subtopics: [
      "Properties of Chord",
      "Arcs of a Circle",
      "Incircle and Circumcircle",
    ],
  },

  // ── Ch.9 Surface Area and Volume (Part 2, Geometry). Pages 114-123 (1-based)
  //    → 0-based 123-132, the LAST chapter of the volume. Opener VERIFIED: 0-based
  //    123 carries the "9 Surface Area and Volume" banner and 133 begins the
  //    ANSWERS section, so the chapter runs to 132.
  //    Structure: Practice set 9.1 (printed p115) · Practice set 9.2 (p119) ·
  //    Practice set 9.3 AND Problem set 9 (both on p123 - the two share the
  //    chapter's last page).
  //    Answers: 0-based 136-137.
  //
  //    ⚠ THE KEY IS COMPLETE AND PURELY NUMERIC, which makes this the easiest
  //    Part-2 chapter to verify: every answer is an area, a volume or a length,
  //    so the cross-check is arithmetic rather than judgement. Transcribed key:
  //      PS 9.1  1. 640 sq.cm, 1120 sq.cm · 2. 20 units · 3. 81 sq.cm, 121.50
  //              sq.cm · 4. 3600 sq.cm · 5. 20 m · 6. 421.88 cu.cm
  //              7. 1632.80 sq.cm, 4144.80 sq.cm · 8. 21 cm
  //      PS 9.2  1. 5 cm · 2. 36960 cu.cm · 3. 10 cm, 6 cm · 4. Rs 2640 · 5. 15 cm
  //              6. 8 cm · 7. 550 sq.cm · 8. 2816 sq.cm, 9856 cu.cm
  //              9. 600 cu.m · 10. 28.51 cu.m, 47.18 sq.m
  //      PS 9.3  1. (i) 200.96 sq.cm, 267.95 cu.cm (ii) 1017.36 sq.cm, 3052.08
  //              cu.cm (iii) 153.86 sq.m, 179.50 cu.cm  ** the units disagree
  //              within (iii) - sq.m against cu.cm - so one of them is a misprint;
  //              settle it against the question before authoring **
  //              2. 157 sq.cm, 235.5 sq.cm · 3. 14130 cu.cm · 4. 5544 sq.cm
  //              5. 60 cm
  //      Prob 9  1. 1980 sq.m · 2. 96801.6 cu.cm · 3. 12 m, 13 m · 4. 6 cm
  //              5. 1728 cu.cm · 6. 179.67 cu.cm · 7. 21 cm · 8. 132 sq.m, Rs 6864
  //              9. 4620 sq.m, Rs 32340
  //
  //    ⚠ THE RUPEE SIGN IS THE SAME FONT HACK AS PART 1 - the answers page prints
  //    "` 2640" because the glyph is mapped onto the BACKTICK. Transcribe the
  //    printed rupee amount, never the backtick.
  //
  //    ⚠ Vision-only (Part-2 operator-glyph substitution). Solved examples sit on
  //    0-based 127, 128 and 131, plus a worked Activity on 130.
  //
  //    🚧 NOT COMMITTED YET - pages rendered under out/surface-area-volume-9/ and
  //    the answers under out/_answers/surface-area-volume-9/. Established:
  //      · PS 9.1 (printed p115) = 8 questions, NO figures (all text), and ALL
  //        EIGHT printed answers were re-derived and AGREE.
  //      · PS 9.2 (pp119-120) = 10 questions; Q1-Q9 read, Q10 overleaf on p120
  //        NOT yet read. Q1, Q2, Q3, Q4, Q6, Q8 and Q9 re-derived and AGREE.
  //      · PS 9.3 (p123) = 5 questions and Problem set 9 (p123) = 9 questions -
  //        the two SHARE the chapter's last page; neither is read yet.
  //
  //    ⚠ TWO STEM MISPRINTS FOUND IN PS 9.2, both of the shape "the key is right
  //    and the stem is wrong", and both diagnosed the same way - the printed
  //    answer is clean only for one nearby value:
  //      Q5 "Volume of a cone is 6280 cubic cm and base radius is 30 cm. Find its
  //        perpendicular height." With r = 30 this gives h = 6.67, but the key
  //        says 15. With r = **20**, (1/3)(3.14)(400)h = 6280 gives h = 15
  //        EXACTLY. The radius should read 20 cm.
  //      Q7 "Volume of a cone is 1212 cubic cm and its height is 24 cm. Find the
  //        surface area." The key is 550 sq.cm, which needs r = 7 (then l = 25
  //        and CSA = (22/7)(7)(25) = 550). But r = 7 with h = 24 gives a volume
  //        of **1232**, not 1212. The volume should read 1232 cubic cm.
  //      Verify BOTH against the printed page before authoring - each rests on a
  //      single-digit reading.
  //    ⚠ PS 9.3 Q1(iii)'s key reads "153.86 sq.m, 179.50 cubic cm" - the two
  //      units disagree within one answer, so one is a misprint. Settle it
  //      against the question when p123 is read.
  "surface-area-volume-9": {
    id: "surface-area-volume-9",
    chapterName: "Surface Area and Volume",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Surface_Area_and_Volume.pdf",
    pdf: PART2,
    pages: range(123, 132),
    answersPdf: PART2,
    answerPages: range(136, 137),
    note: "Maharashtra State Board (Class 9) — Surface Area and Volume (Balbharati textbook, Part 2 Geometry)",
    // THIS CHAPTER HAS NO "Let's study" BOX - the only one in the volume that
    // does not. It opens straight into a revision of the cuboid, cube and
    // cylinder formulas from earlier standards, so the subtopics are taken from
    // its own printed section headings ("Terms related to a cone and their
    // relation", "Surface area of a cone", "Surface area of a sphere") plus the
    // solids the exercises actually drill.
    subtopics: [
      "Surface Area and Volume of Cuboid and Cube",
      "Surface Area and Volume of a Cylinder",
      "Terms Related to a Cone",
      "Surface Area of a Cone",
      "Volume of a Cone",
      "Surface Area and Volume of a Sphere and Hemisphere",
    ],
  },

  // ── Ch.7 Co-ordinate Geometry (Part 2, Geometry). Pages 88-99 (1-based) →
  //    0-based 97-108. Boundary VERIFIED, and the derived one was WRONG BY ONE:
  //    the practice-set positions suggested the chapter opened at 0-based 98, but
  //    97 carries the "7 Co-ordinate Geometry" banner. Always confirm an opener
  //    against the page rather than inferring it from the first practice set.
  //    0-based 109 opens "8 Trigonometry".
  //    Structure: Practice set 7.1 (printed p93) · Practice set 7.2 (p97) ·
  //    Problem set 7 (pp98-99, Q.1 = a SIX-part MCQ block — the largest MCQ block
  //    in the volume so far).
  //    Answers: 0-based 136-137.
  //
  //    ⚠ THIS CHAPTER IS WELL-KEYED, unlike Ch.2. The Part-2 key is terse and
  //    normally skips proofs, but Co-ordinate Geometry has almost none, so every
  //    question except Problem set 7 Q4 carries a printed answer. Its full key,
  //    for the cross-check to diff against:
  //      PS 7.1  1. A:QII B:QIII K:QI D:QI E:QI F:QIV G:QIV H:Y-axis M:X-axis
  //                 N:Y-axis P:Y-axis Q:QIII
  //              2. (i) QI (ii) QIII (iii) QIV (iv) QII
  //      PS 7.2  1. Square · 2. x = -7 · 3. y = -5 · 4. x = -3 · 5. 4
  //              6. (i) Y-axis (ii) X-axis (iii) Y-axis (iv) X-axis
  //              7. To X-axis (5,0), to Y-axis (0,5)
  //              8. (-4,1), (-1.5,1), (-1.5,5), (-4,5)
  //      Prob 7  1. (i) C (ii) A (iii) B (iv) C (v) C (vi) B
  //              2. (i) Q(-2,2), R(4,-1) (ii) T(0,-1), M(3,0) (iii) point S
  //                 (iv) point O
  //              3. (i) QIV (ii) QIII (iii) QII (iv) QII (v) Y-axis (vi) X-axis
  //              5. (i) 3 (ii) P(3,2), Q(3,-1), R(3,0) (iii) 0
  //              6. y = 5, y = -5 · 7. |a|
  //              (Q4 is the one unanswered item.)
  //
  //    ⚠ Vision-only for the Part-2 reason (operator-glyph substitution). Only
  //    LIGHTLY figure-bearing, unlike Ch.2: PS 7.1 Q1 lists its twelve points as
  //    text, so only Problem set 7 Q2 (Fig 7.11) and Q5 (Fig 7.12) read points
  //    off a printed grid - 2 crops across 7 rows.
  //
  //    EXERCISE INVENTORY, read page by page - 42 rows:
  //      PS 7.1 (p93)      6 rows  - Q1 (12 points, one row) + Q2(i)-(iv) + Q3.
  //      PS 7.2 (pp97-98) 14 rows  - Q1-Q5 + Q6(i)-(iv) + Q7 + Q8 + Q9(i)-(iii).
  //                                  **NINE questions, not eight**: Q5-Q9 are
  //                                  overleaf on printed p98, and the key stops
  //                                  at Q8 because Q9 is a drawing task.
  //      Prob 7 (pp98-99) 22 rows  - Q1(i)-(vi) MCQ + Q2(i)-(iv) [Fig 7.11] +
  //                                  Q3(i)-(vi) + Q4 + Q5(i)-(iii) [Fig 7.12] +
  //                                  Q6 + Q7*.
  //    ALL 6 Problem-set MCQ keys blind-re-derived, 6/6 match (C A B C C B), and
  //    every other printed answer re-derived and AGREES.
  //
  //    ⚠ TWO BOOK DEFECTS:
  //      PS 7.2 Q5 STEM MISPRINT - "X-axis and line x = -4 are parallel lines.
  //        What is the distance between them?" The line x = -4 is parallel to the
  //        Y-AXIS and PERPENDICULAR to the X-axis, so as printed the question has
  //        no answer. The printed key of 4 is the distance from the Y-axis, which
  //        is what the question means to ask.
  //      p93 solved example - the question lists "(vi) (-2, 2.5)" while its own
  //        printed solution table reads "(vi) (-2, -2.5) Quadrant III". The
  //        solution is self-consistent (both co-ordinates negative IS Quadrant
  //        III); the question dropped the minus sign. As printed, (-2, 2.5) would
  //        be Quadrant II.
  //
  //    🚧 SOLVED EXAMPLES DEFERRED. Probing the text layer finds Ex./Solution
  //    blocks on 0-based 99, 100, 102, 105 and 106 - five pages. Two are read
  //    (p93's quadrant table and p97's graph of 2x - y + 1 = 0) and three are
  //    not, so the chapter ships EXERCISES ONLY rather than a partial solved
  //    block, which /board would render as a complete "Solved Examples" section
  //    with an invisible gap. sections.ts therefore carries three exercise
  //    blocks; add a solved block when 99, 100 and 105 are transcribed.
  "coordinate-geometry-9": {
    id: "coordinate-geometry-9",
    chapterName: "Co-ordinate Geometry",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Co_ordinate_Geometry.pdf",
    pdf: PART2,
    pages: range(97, 108),
    answersPdf: PART2,
    answerPages: range(136, 137),
    note: "Maharashtra State Board (Class 9) — Co-ordinate Geometry (Balbharati textbook, Part 2 Geometry)",
    // The chapter's own "Let's study" list (printed p88), verbatim - six bullets.
    subtopics: [
      "Axis, Origin, Quadrant",
      "Co-ordinates of a Point in a Plane",
      "To Plot a Point",
      "Line Parallel to X-axis",
      "Line Parallel to Y-axis",
      "Equation of a Line",
    ],
  },

  // ── Ch.2 Parallel Lines (Part 2, Geometry). Pages 13-23 (1-based) → 0-based
  //    22-32. Boundaries VERIFIED from the PDF, not derived: 0-based 22 opens
  //    "2 Parallel Lines" and 0-based 33 opens "3 Triangles". Structure:
  //    Practice set 2.1 (p17) · Practice set 2.2 (p21) · Problem set 2 (pp22-23,
  //    Q.1 = a FIVE-part MCQ block).
  //    Answers: Part2 printed p125 → 0-based 134, a SINGLE page that also carries
  //    the start of Ch.3's key.
  //
  //    ⚠ THE PART-2 ANSWERS SECTION IS 0-BASED 133-137 (printed 124-128) — five
  //    pages for all NINE chapters, so the key is TERSE and coverage is partial
  //    by design. For this chapter it answers PS 2.1 Q1,2,3,5 (not Q4), PS 2.2
  //    Q1 and Q4 (not Q2,Q3) and Problem set 2 Q1,4,5,6 (not Q2,Q3) — the
  //    unanswered ones are proofs, which the book never keys. So the step-6
  //    cross-check covers this chapter PARTIALLY; do not read a missing entry as
  //    a defect.
  //    Its full transcribed key, for the cross-check to diff against:
  //      PS 2.1  1. (i) 95 (ii) 95 (iii) 85 (iv) 85 · 2. a=70, b=70, c=115, d=65
  //              3. a=135, b=135, c=135 · 5. (i) 75 (ii) 75 (iii) 105 (iv) 75
  //      PS 2.2  1. No. · 4. ABC = 130
  //      Prob 2  1. (i) C (ii) C (iii) A (iv) B (v) C · 4. x=130, y=50
  //              5. x=1260 · 6. f=100, g=80
  //      (all in degrees; blind-re-derive the 5 MCQ keys before trusting them.)
  //
  //    ⚠ VISION-ONLY, and for the Part-2 reason rather than the Part-1 one: this
  //    volume's text layer substitutes SYMBOL-FONT glyphs — `Ð` for the angle
  //    sign, `^` for perpendicular, `\` for therefore, `D` for triangle, `@` for
  //    congruent — so a text dump reads "Ð a = 70" and every proof turns to
  //    noise. Part 1 flattened exponents and fractions; this one substitutes
  //    operators. Same conclusion, different cause.
  //
  //    ⚠ FIGURES ARE LOAD-BEARING, as in Ch.1 and unlike all of Part 1, and here
  //    it is near-total: EVERY question of Practice set 2.1 references a numbered
  //    figure carrying the angle measures the question asks about, so not one of
  //    them is answerable from the stem alone. VECTOR art → snapCrop, and every
  //    crop must clear the montage verify-gate before flip.
  //
  //    🚧 NOT COMMITTED YET — pages rendered under out/parallel-lines-9/ and the
  //    answer page under out/_answers/parallel-lines-9/. EXERCISE INVENTORY IS
  //    COMPLETE, read page by page: 31 exercise ROWS.
  //      Practice set 2.1 (printed pp17-18) = 5 q / 11 rows — Q1 (Fig 2.5, four
  //        sub-items) · Q2 (Fig 2.6, find a,b,c,d) · Q3 (Fig 2.7, find a,b,c) ·
  //        Q4* (Fig 2.8, a PROOF) · Q5 (Fig 2.9, four sub-items).
  //      Practice set 2.2 (printed pp21-22) = 6 q / 6 rows — Q1 (Fig 2.18) ·
  //        Q2 (Fig 2.19, proof) · Q3 (Fig 2.20, proof) · Q4 (Fig 2.21) ·
  //        Q5 (Fig 2.22, proof) · Q6 (Fig 2.23, proof). **Q5 and Q6 sit at the
  //        TOP of printed p22, overleaf from Q1-Q4** — a band cut at the page
  //        break would silently lose them (the Ch.4 Ratio lesson).
  //      Problem set 2 (printed pp22-23) = 8 q / 14 rows — Q1(i)-(v) MCQ ·
  //        Q2* (draw a figure, three sub-items) · Q3 (proof) · Q4 (Fig 2.24) ·
  //        Q5 (Fig 2.25) · Q6 (Fig 2.26) · Q7 (Fig 2.27, proof) ·
  //        Q8 (Fig 2.28, proof).
  //      SIXTEEN crops needed: Fig 2.5-2.9, 2.18-2.24, 2.25-2.28. That figure
  //      load, not the transcription, is the bulk of this chapter.
  //
  //    · NO SOLVED EXAMPLES AT ALL — probed the text layer of all 11 pages: the
  //      chapter carries only Theorems (printed pp15, 16, 18, 19, 20) and two
  //      Corollaries (p21), no "Solved example" block anywhere. The theorems ARE
  //      printed complete (Given / To prove / Construction / Proof), so they are
  //      ingestable as `solved` on the Ch.1 precedent, which took that chapter's
  //      two worked proofs the same way. Corollary II is NOT — the book says
  //      "Write the proof of the corollary", i.e. it is an exercise prompt with
  //      no printed proof.
  //    · ALL 5 Problem-set MCQ KEYS BLIND-RE-DERIVED, 5/5 match (C C A B C).
  //    · A BOOK DEFECT: **Problem set 2 Q5's key prints "x = 1260"**, which is not
  //      an angle. With AB || CD || EF and y : z = 3 : 7, the co-interior pair
  //      gives 10k = 180, so y = 54 and z = 126, and x = z = 126 as corresponding
  //      angles. The key has an extra zero: the answer is **126 degrees**.
  //      Q4 (x=130, y=50) and Q6 (f=100, g=80) were re-derived and AGREE.
  "parallel-lines-9": {
    id: "parallel-lines-9",
    chapterName: "Parallel Lines",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Parallel_Lines.pdf",
    pdf: PART2,
    pages: range(22, 32),
    answersPdf: PART2,
    answerPages: [134],
    note: "Maharashtra State Board (Class 9) — Parallel Lines (Balbharati textbook, Part 2 Geometry)",
    // The chapter's own "Let's study" list (printed p13), which is only THREE
    // bullets, plus a subtopic for the "Let's recall" section on the eight angles
    // a transversal forms — the list omits it, but Practice set 2.1 drills it
    // directly. Same call as Ch.1's added "Line Segment, Ray and Congruence".
    subtopics: [
      "Pairs of Angles Formed by a Transversal",
      "Properties of Parallel Lines",
      "Tests of Parallelness of Two Lines",
      "Use of Properties of Parallel Lines",
    ],
  },

  // ── Ch.1 Basic Concepts in Geometry (Part 2, Geometry) — the FIRST chapter from
  //    the Geometry volume. Pages 1-12 (1-based) → 0-based 10-21. Structure:
  //    Practice set 1.1 (p5 — distance on a number line, betweenness) ·
  //    1.2 (pp7-8 — segments, rays, congruence; Q1 is a TABLE, Q5/Q6 read figures) ·
  //    1.3 (p11 — if-then form and converses) · Problem Set 1 (pp11-12; Q.1 = a
  //    five-part MCQ block, Q.2-8 free-response).
  //    Answers: Part2 p124 (1-based) → 0-based 133 — the WHOLE chapter's key fits
  //    on that single page (Practice sets 1.1/1.2/1.3 + Problem set 1).
  //
  //    ⚠ FIGURES ARE LOAD-BEARING HERE, unlike every Class-9 Maths chapter so far.
  //    Three exercise figures carry data the question cannot be answered without:
  //    Fig 1.5 (the number line for Ex 1.1 Q1, 8 sub-items), Fig 1.13 (Ex 1.2 Q5,
  //    7 sub-items) and Fig 1.14 (Ex 1.2 Q6, 3 sub-items) — 18 rows in total. They
  //    are VECTOR art, not raster, so they render as ink and snapCrop applies (the
  //    same shape as Ch.1 Sets' Venn diagrams); an eyeballed bbox fails here just
  //    as it did there. Every crop must clear the montage verify-gate.
  //
  //    Symbol note: the text layer substitutes Symbol-font glyphs (`Ð` for ∠,
  //    `^` for ⊥, `\` for ∴, `D` for △), so transcription is VISION — but the
  //    reason is different from Ch.2 Real Numbers, where the radical was absent
  //    from the text layer entirely rather than merely substituted.
  "basic-geometry-9": {
    id: "basic-geometry-9",
    chapterName: "Basic Concepts in Geometry",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Basic_Concepts_in_Geometry.pdf",
    pdf: PART2,
    pages: range(10, 21),
    answersPdf: PART2,
    answerPages: [133],
    note: "Maharashtra State Board (Class 9) — Basic Concepts in Geometry (Balbharati textbook, Part 2 Geometry)",
    // The chapter's own "Let's study" bullet list (p1), plus a subtopic for the
    // segment/ray/congruence section the book teaches on pp6-8 and drills in
    // Practice set 1.2 but does not name in that opener list.
    subtopics: [
      "Point, Line and Plane",
      "Co-ordinates of Points and Distance",
      "Betweenness",
      "Line Segment, Ray and Congruence",
      "Conditional Statements and Converse",
      "Proof",
    ],
  },

  // ── History + Political Science (the 9th_Hist_SB.pdf book) ─────────────────
  //
  // ⚠ NO `answersPdf`/`answerPages` ON ANY CHAPTER BELOW, AND THAT IS NOT AN
  // OVERSIGHT: unlike both Maths books (and every Class-12 / NCERT chapter), this
  // textbook ships NO answers section anywhere in its 108 pages — verified by
  // scanning the full text layer. So the step-6 end-of-book answer-key cross-check
  // — the gate that has caught real errors on BOTH sides every time it has run —
  // simply cannot run here. Every MCQ key is DERIVED and every model answer is
  // AUTHORED, both grounded in the chapter's own prose (which, for recall-shaped
  // humanities questions, states the answer almost verbatim), then blind-re-derived
  // for MCQs and REVIEW-flagged throughout. Do not "restore" an answers reference.
  //
  // Structure per chapter: interleaved prose + inline activity boxes, ending in a
  // single "Exercises" block (Q.1 usually the "choose the correct option" MCQ set,
  // the rest free-response). There is NO solved-example bucket at all, so nothing
  // ships PUBLIC off the book's own working — every row needs an authored answer.
  // The chapter-end "Projects" and the inline "Try this / Let's do it! / Find out
  // and participate" boxes are DELIBERATELY NOT INGESTED: they are open-ended
  // activity prompts ("collect pictures of…", "get information from the internet")
  // with no determinate answer, so any model answer would be invented rather than
  // grounded. ~13 Projects + ~15 inline boxes across these five chapters.

  "sources-of-history-9": {
    id: "sources-of-history-9",
    chapterName: "Sources of History",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Sources_of_History.pdf",
    pdf: HIST,
    pages: range(10, 13), // printed pp 1-4; Exercises on p13
    note: "Maharashtra State Board (Class 9) — Sources of History (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Written Sources",
      "Material Sources",
      "Oral Sources",
      "Audio-Visual Sources",
    ],
  },

  "events-after-1960-9": {
    id: "events-after-1960-9",
    chapterName: "India : Events after 1960",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Events_after_1960.pdf",
    pdf: HIST,
    pages: range(14, 18), // printed pp 5-9; Exercises on p18
    note: "Maharashtra State Board (Class 9) — India : Events after 1960 (Balbharati textbook, History and Political Science)",
    // The book narrates this chapter by decade, but the exercise questions cut
    // THEMATICALLY across decades (a wrong-pair item spans four Prime Ministers;
    // the Planning Commission question reaches back before 1960), so the subtopic
    // axis is thematic. "Science and Technology" is a book heading with zero
    // exercise questions → deliberately not a subtopic.
    subtopics: [
      "Political Leadership and Governments",
      "Wars and External Relations",
      "Economic Policy and Reforms",
      "Challenges and Strengths of Independent India",
    ],
  },

  "internal-challenges-9": {
    id: "internal-challenges-9",
    chapterName: "India's Internal Challenges",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Internal_Challenges.pdf",
    pdf: HIST,
    pages: range(19, 23), // printed pp 10-14; Exercises on p23
    note: "Maharashtra State Board (Class 9) — India's Internal Challenges (Balbharati textbook, History and Political Science)",
    // 1:1 with the book's own section headings. This chapter has NO MCQ block.
    subtopics: [
      "The Unrest in Punjab",
      "Issues Concerning North-East India",
      "Communalism",
      "Naxalism",
      "Regionalism",
    ],
  },

  "post-ww-political-developments-9": {
    id: "post-ww-political-developments-9",
    chapterName: "Post World War Political Developments",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__Post_World_War_Political_Developments.pdf",
    pdf: HIST,
    pages: range(66, 73), // printed pp 57-64; Exercises span p72-73
    note: "Maharashtra State Board (Class 9) — Post World War Political Developments (Balbharati textbook, History and Political Science)",
    // "Creation of Military / Regional Organisations" is a book heading with zero
    // exercise questions → folded into the international-system subtopic.
    subtopics: [
      "The World Wars and the International System",
      "The Cold War and Bipolarisation",
      "Non-alignment and the Non-Aligned Movement",
      "End of the Cold War and Globalisation",
    ],
  },

  "foreign-policy-9": {
    id: "foreign-policy-9",
    chapterName: "India's Foreign Policy",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__Indias_Foreign_Policy.pdf",
    pdf: HIST,
    pages: range(74, 80), // printed pp 65-71; Exercises span p79-80
    note: "Maharashtra State Board (Class 9) — India's Foreign Policy (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Meaning, Importance and National Interest",
      "Factors Influencing Foreign Policy",
      "Objectives and Principles of India's Foreign Policy",
      "India's Foreign Policy — Phases and Nuclear Policy",
    ],
  },

  // ── History ch.4-10 ────────────────────────────────────────────────────────
  // Every range below was verified by checking that the page after the range is
  // the NEXT chapter's opener. Richer exercises than ch.1-3: most carry a
  // "complete the table/chart/timeline" activity (→ GFM pipe-table in the stem,
  // separator row mandatory) alongside the usual MCQ / short-note / give-reasons
  // blocks. "Projects" and inline activity boxes stay un-ingested as before.

  "economic-development-9": {
    id: "economic-development-9",
    chapterName: "Economic Development",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Economic_Development.pdf",
    pdf: HIST,
    pages: range(24, 31), // printed pp 15-22; Exercises on p31
    note: "Maharashtra State Board (Class 9) — Economic Development (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Mixed Economy and the Sectors",
      "The Five Year Plans",
      "Nationalisation of Banks and the 20-Point Programme",
      "Industrial Workers and Their Movements",
    ],
  },

  "education-9": {
    id: "education-9",
    chapterName: "Education",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Education.pdf",
    pdf: HIST,
    pages: range(32, 39), // printed pp 23-30; Exercises on p39
    note: "Maharashtra State Board (Class 9) — Education (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Primary and Secondary Education",
      "Commissions and Educational Institutions",
      "Higher, Technical and Professional Education",
      "Science, Agriculture and Medical Research",
    ],
  },

  "empowerment-9": {
    id: "empowerment-9",
    chapterName: "Empowerment of Women and other Weaker Sections",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Empowerment_of_Women.pdf",
    pdf: HIST,
    pages: range(40, 45), // printed pp 31-36; Exercises on p45
    note: "Maharashtra State Board (Class 9) — Empowerment of Women and other Weaker Sections (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Women's Movements and Participation",
      "Laws for Women",
      "Weaker Sections and Minorities",
      "Human Rights",
    ],
  },

  "science-technology-9": {
    id: "science-technology-9",
    chapterName: "Science and Technology",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Science_and_Technology.pdf",
    pdf: HIST,
    pages: range(46, 51), // printed pp 37-42; Exercises on p51
    note: "Maharashtra State Board (Class 9) — Science and Technology (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Atomic Energy and Nuclear Tests",
      "Missile Development",
      "Space Research and Satellites",
      "Communication and Transport",
    ],
  },

  "industry-trade-9": {
    id: "industry-trade-9",
    chapterName: "Industry and Trade",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Industry_and_Trade.pdf",
    pdf: HIST,
    pages: range(52, 55), // printed pp 43-46; Exercises on p55
    note: "Maharashtra State Board (Class 9) — Industry and Trade (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Major Industries of India",
      "Industrial Policy and Institutions",
      "Natural Resources and Allied Sectors",
      "Trade — Internal and Foreign",
    ],
  },

  "changing-life-1-9": {
    id: "changing-life-1-9",
    chapterName: "Changing Life : 1",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Changing_Life_1.pdf",
    pdf: HIST,
    pages: range(56, 60), // printed pp 47-51; Exercises on p60
    note: "Maharashtra State Board (Class 9) — Changing Life : 1 (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Family and Social Change",
      "Social Welfare and Weaker Sections",
      "Public Health and Medical Advances",
      "Rural Development and Urbanisation",
    ],
  },

  "changing-life-2-9": {
    id: "changing-life-2-9",
    chapterName: "Changing Life : 2",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Changing_Life_2.pdf",
    pdf: HIST,
    pages: range(61, 63), // printed pp 52-54; Exercises on p63
    note: "Maharashtra State Board (Class 9) — Changing Life : 2 (Balbharati textbook, History and Political Science)",
    // Only 3 subtopics: the chapter is 3pp / 8 questions, and Theatre-Films-and-
    // Television is one continuous media narrative in the book.
    subtopics: [
      "Language",
      "Sports",
      "Media — Newspapers, Films and Television",
    ],
  },

  // ── Political Science ch.3-6 ───────────────────────────────────────────────

  "defence-system-9": {
    id: "defence-system-9",
    chapterName: "India's Defence System",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__Indias_Defence_System.pdf",
    pdf: HIST,
    pages: range(81, 85), // printed pp 72-76; Exercises on p85
    note: "Maharashtra State Board (Class 9) — India's Defence System (Balbharati textbook, History and Political Science)",
    subtopics: [
      "National Security and Its Safeguards",
      "The Armed Forces",
      "Paramilitary and Auxiliary Forces",
      "Human Security and Challenges",
    ],
  },

  "united-nations-9": {
    id: "united-nations-9",
    chapterName: "The United Nations",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__The_United_Nations.pdf",
    pdf: HIST,
    pages: range(86, 92), // printed pp 77-83; Exercises span p91-92
    note: "Maharashtra State Board (Class 9) — The United Nations (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Establishment, Objectives and Principles",
      "Organs of the United Nations",
      "Peacekeeping and Development Goals",
      "India and the United Nations",
    ],
  },

  "india-other-countries-9": {
    id: "india-other-countries-9",
    chapterName: "India and Other Countries",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__India_and_Other_Countries.pdf",
    pdf: HIST,
    pages: range(93, 99), // printed pp 84-90; Exercises on p99
    note: "Maharashtra State Board (Class 9) — India and Other Countries (Balbharati textbook, History and Political Science)",
    subtopics: [
      "India and Pakistan",
      "India and China",
      "India and Her Other Neighbours",
      "India and the Wider World",
    ],
  },

  "international-problems-9": {
    id: "international-problems-9",
    chapterName: "International Problems",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__International_Problems.pdf",
    pdf: HIST,
    pages: range(100, 105), // printed pp 91-96; Exercises on p105
    note: "Maharashtra State Board (Class 9) — International Problems (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Human Rights",
      "Environmental Degradation and Conservation",
      "Terrorism",
      "Refugees",
    ],
  },

  // ── Geography (9th_Geog_SB.pdf) ─────────────────────────────────────────────
  // PILOT chapter, ingested first so the Geography question shapes could be judged
  // before committing the other 11. Chapter ranges for the full book, all verified
  // by checking the page after each range is the next chapter's opener (printed →
  // 0-based PDF = +9): 1 Distributional Maps 10-17 · 2 Endogenetic 18-31 ·
  // 3 Exogenetic-1 32-38 · 4 Exogenetic-2 39-49 · 5 Precipitation 50-58 ·
  // 6 Sea Water 59-65 · 7 IDL 66-72 · 8 Economics 73-75 · 9 Trade 76-83 ·
  // 10 Urbanisation 84-90 · 11 Transport 91-96 · 12 Tourism 97-105.
  "endogenetic-9": {
    id: "endogenetic-9",
    chapterName: "Endogenetic Movements",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Endogenetic_Movements.pdf",
    pdf: GEOG,
    pages: range(18, 31), // printed pp 9-22; Exercise on p29
    note: "Maharashtra State Board (Class 9) — Endogenetic Movements (Balbharati textbook, Geography)",
    // The book's own section arc: classification → slow (orogenic → folds/blocks/
    // rift valleys; epeirogenic) → sudden (earthquakes) → volcanoes.
    subtopics: [
      "Classification of Internal Movements",
      "Mountain-building Movements — Folds, Blocks and Rift Valleys",
      "Continent-building Movements",
      "Earthquakes",
      "Volcanoes",
    ],
  },

  "distributional-maps-9": {
    id: "distributional-maps-9",
    chapterName: "Distributional Maps",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Distributional_Maps.pdf",
    pdf: GEOG,
    pages: range(10, 17), // printed pp 1-8; Exercise spans p16-17
    note: "Maharashtra State Board (Class 9) — Distributional Maps (Balbharati textbook, Geography)",
    // "Geographical field-visit" is a book section with no exercise questions.
    subtopics: [
      "Purpose and Types of Distributional Maps",
      "Dot Method",
      "Choropleth Method",
      "Isopleth Method",
    ],
  },

  "exogenetic-1-9": {
    id: "exogenetic-1-9",
    chapterName: "Exogenetic Processes Part-1",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Exogenetic_Processes_1.pdf",
    pdf: GEOG,
    pages: range(32, 38), // printed pp 23-29; Exercise on p38
    note: "Maharashtra State Board (Class 9) — Exogenetic Processes Part-1 (Balbharati textbook, Geography)",
    subtopics: [
      "Mechanical Weathering",
      "Chemical Weathering",
      "Biological Weathering",
      "Mass Movements and Erosion",
    ],
  },

  "exogenetic-2-9": {
    id: "exogenetic-2-9",
    chapterName: "Exogenetic Processes Part-2",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Exogenetic_Processes_2.pdf",
    pdf: GEOG,
    pages: range(39, 49), // printed pp 30-40; Exercise spans p48-49
    note: "Maharashtra State Board (Class 9) — Exogenetic Processes Part-2 (Balbharati textbook, Geography)",
    subtopics: [
      "Work of Rivers",
      "Work of Glaciers",
      "Work of Wind",
      "Work of Sea Waves",
      "Work of Groundwater",
    ],
  },

  "precipitation-9": {
    id: "precipitation-9",
    chapterName: "Precipitation",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Precipitation.pdf",
    pdf: GEOG,
    pages: range(50, 58), // printed pp 41-49; Exercise spans p57-58
    note: "Maharashtra State Board (Class 9) — Precipitation (Balbharati textbook, Geography)",
    subtopics: [
      "Forms of Precipitation — Snow, Hail and Rain",
      "Types of Rainfall",
      "Fog, Dew and Frost",
      "Measurement of Rainfall",
      "Acid Rain and Effects of Precipitation",
    ],
  },

  "sea-water-9": {
    id: "sea-water-9",
    chapterName: "The Properties of Sea Water",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Properties_of_Sea_Water.pdf",
    pdf: GEOG,
    pages: range(59, 65), // printed pp 50-56; Exercise on p65
    note: "Maharashtra State Board (Class 9) — The Properties of Sea Water (Balbharati textbook, Geography)",
    subtopics: [
      "Salinity of Sea Water",
      "Temperature of Sea Water",
      "Density of Sea Water",
    ],
  },

  "idl-9": {
    id: "idl-9",
    chapterName: "International Date Line",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__International_Date_Line.pdf",
    pdf: GEOG,
    pages: range(66, 72), // printed pp 57-63; Exercise on p71
    note: "Maharashtra State Board (Class 9) — International Date Line (Balbharati textbook, Geography)",
    // The ONLY Geography chapter with genuine four-option MCQs (its Q2).
    subtopics: [
      "The Need for a Date Line",
      "The International Date Line and Its Course",
      "Crossing the IDL and Its Importance",
    ],
  },

  "economics-intro-9": {
    id: "economics-intro-9",
    chapterName: "Introduction to Economics",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Introduction_to_Economics.pdf",
    pdf: GEOG,
    pages: range(73, 75), // printed pp 64-66; Exercise on p75
    note: "Maharashtra State Board (Class 9) — Introduction to Economics (Balbharati textbook, Geography)",
    subtopics: [
      "Meaning and Scope of Economics",
      "Types of Economy",
      "Factors Affecting an Economy and Globalisation",
    ],
  },

  "trade-9": {
    id: "trade-9",
    chapterName: "Trade",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Trade.pdf",
    pdf: GEOG,
    pages: range(76, 83), // printed pp 67-74; Exercise on p83
    note: "Maharashtra State Board (Class 9) — Trade (Balbharati textbook, Geography)",
    subtopics: [
      "Barter System and the Origins of Trade",
      "Types of Trade — Wholesale and Retail",
      "Domestic and International Trade",
      "International Trade Organisations",
      "Balance of Trade and Marketing",
    ],
  },

  "urbanisation-9": {
    id: "urbanisation-9",
    chapterName: "Urbanisation",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Urbanisation.pdf",
    pdf: GEOG,
    pages: range(84, 90), // printed pp 75-81; Exercise spans p89-90
    note: "Maharashtra State Board (Class 9) — Urbanisation (Balbharati textbook, Geography)",
    subtopics: [
      "The Process of Urbanisation",
      "Causes of Urbanisation",
      "Advantages of Urbanisation",
      "Problems of Urbanisation",
    ],
  },

  "transport-communication-9": {
    id: "transport-communication-9",
    chapterName: "Transport and Communication",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Transport_and_Communication.pdf",
    pdf: GEOG,
    pages: range(91, 96), // printed pp 82-87; Exercise on p96
    note: "Maharashtra State Board (Class 9) — Transport and Communication (Balbharati textbook, Geography)",
    subtopics: [
      "Means of Transport",
      "Importance of Transport",
      "Means of Communication",
    ],
  },

  "tourism-9": {
    id: "tourism-9",
    chapterName: "Tourism",
    subjectName: "Geography",
    sourceFile: "StateBoard_09_Geog__Tourism.pdf",
    pdf: GEOG,
    pages: range(97, 105), // printed pp 88-96; Exercise spans p103-104
    note: "Maharashtra State Board (Class 9) — Tourism (Balbharati textbook, Geography)",
    subtopics: [
      "Types of Tourism",
      "Domestic and International Tourism",
      "Importance and Development of Tourism in India",
      "Effects of Tourism",
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
