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
void PART2; // referenced by later (Geometry) chapters as they are added
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
