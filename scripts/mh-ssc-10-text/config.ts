// Config for the MAHARASHTRA STATE BOARD Class-10 (SSC) TEXTBOOK ingestion.
//
// DISTINCT FROM scripts/mh-ssc-10/, and the distinction is the whole point:
//   scripts/mh-ssc-10/       → the board's past-year QUESTION PAPERS: scanned,
//                              vision-only, question_kind='pyq'.
//   scripts/mh-ssc-10-text/  → the Balbharati TEXTBOOK exercises for the same
//                              exam, question_kind='practice'.
// ⚠ EXTRACTION MODE IS PER-BOOK, NOT PER-PIPELINE. The humanities book
// (10th_Hist_SB.pdf) is born-digital with clean prose and is read TEXT-FIRST via
// dump-text.ts. The Maths book (10th_Maths_Part2_SB.pdf) is VISION-ONLY: its text
// layer silently drops every radical, so it reads as clean English while being
// arithmetically wrong. Check the chapter's own note before choosing.
// Both write into the SAME exam and the SAME chapters, so a chapter carries its
// board PYQs and its textbook exercises together and `/browse`'s PYQ/Practice
// toggle separates them. That is why `chapterName` below must match the DB row
// EXACTLY — the textbook prints "Historiography : Development in the West" with a
// space before the colon and the DB has none; using the book's spelling would
// silently auto-create a duplicate chapter and split the corpus in two.
//
// Source: `10th_Hist_SB.pdf` — ONE book carrying History (9 ch) + Political
// Science (5 ch), 112pp, born-digital with a clean prose text layer. Printed page
// N → 0-based PDF index N+9 (the same offset as both Class-9 books).
//
// ⚠ NO ANSWERS SECTION anywhere in the HISTORY/POLSCI book — verified across all
// 112 pages of 10th_Hist_SB.pdf (the Maths book DOES have one; see MATHS2), the
// same regime as the Class-9 History/PolSci book. So the step-6 answer-key
// cross-check CANNOT run: every MCQ key is DERIVED and every model answer
// AUTHORED, both grounded in the chapter's own prose, then blind-re-derived for
// the MCQs and stamped with derived_model/derived_at. Do not "restore" an
// `answersPdf` reference — its absence is a fact about the book, not an oversight.
//
// Subtopics are the TEXTBOOK's own section headings (user's call, 2026-08-02). The
// six PYQ-era subtopics that had drifted from the book were renamed to match it in
// the same pass, so PYQ and practice rows share ONE taxonomy per chapter.
//
// NOTE ON /board: mh-ssc-10 is deliberately NOT registered as a `boardExam` (see
// examContext.ts — "PYQ papers aren't textbook-structured"). Textbook content
// changes that premise, but flipping the flag adds a user-visible nav tab, so it
// is left alone for now. `section_*` IS still assigned on these rows so the data
// is ready the day that call is made; `board:lint` iterates BOARD_EXAMS, so it
// neither checks nor is affected by them today.
import { join } from "node:path";

export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra State Board Class 10 (SSC) — the SAME exam row as the PYQ corpus.
export const EXAM_ID = "a41ef5c6-fa20-4bc1-be8b-ba4263d5afd2";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\State-Board\\02. 10th";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs + text dumps
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

const HIST = join(SOURCE_ROOT, "10th_Hist_SB.pdf"); // History + Political Science
// Balbharati Geography Std X, 82pp. Printed page N → 0-based PDF index N+10 —
// note this is a DIFFERENT offset from HIST's N+9, so do not carry it across.
// Like HIST it ships NO answers section; born-digital, so text-first.
// Structurally it is the odd book of the three: it teaches India and Brazil
// COMPARATIVELY throughout, its exercises lean on maps and figures far more
// heavily than the humanities book, and — as in the Class-9 Geography book —
// several "choose the correct option" blocks print fewer than four choices.
// NEVER invent a fourth option to reach four; ingest such an item as subjective
// with the printed choices inside the stem (see HUMANITIES_BRIEF.md).
const GEOG = join(SOURCE_ROOT, "10th_Geog_SB.pdf");
// Balbharati Science and Technology Std X, in TWO volumes. Printed page N -> 0-based
// PDF index N+9, the same offset as HIST (NOT Geography's N+10).
//   Part 1 (156pp) = the DB subject "Science and Technology I"  - physics + chemistry
//   Part 2 (132pp) = the DB subject "Science and Technology II" - biology + environment
// Neither volume has an answers section, so the same no-key regime applies as to the
// humanities book: keys derived, answers authored from the chapter, grounding audited.
//
// EXTRACTION IS VISION FOR ANYTHING CARRYING NOTATION - measured, not assumed. The prose
// text layer is clean, but across the first 40 pages of EACH volume there are ZERO
// occurrences of the arrow, the degree sign, any subscript digit and any superscript
// digit, in a science book full of all four. What that costs is specific and severe:
//   - exponents are FLATTENED, so r^2 extracts as "r2", 10^-11 as "10 -11" and,
//     worst, 1.83 x 10^9 as "1.83 x 109"
//   - fractions serialise out of order across lines: the universal law of gravitation
//     arrives as "m1m2 / d2 / F =  G"
//   - the SymbolMT substitution of the Maths book is here too: proportional-to becomes
//     the letter "a" ("F a m1m2/d2") and therefore becomes a backslash ("\Weight")
// Chemical formulae are the one safe case - H2O and Na2S lose only their subscript
// FORMATTING, not their meaning. Read every exercise page as an image; the text dump is
// for prose grounding only, and any formula taken from it must be checked on the page.
const SCI1 = join(SOURCE_ROOT, "10th_Sci_Part1_SB.pdf");
const SCI2 = join(SOURCE_ROOT, "10th_Sci_Part2_SB.pdf");
// Balbharati Mathematics Part II (Geometry), 180pp. Printed page N → 0-based PDF
// index N+9, the same offset as HIST. Carries an ANSWERS section at idx 173+.
// VISION-ONLY — see the note on "pythagoras-10" below before touching it.
// Balbharati Mathematics Part I (Algebra), 188pp. Printed page N -> 0-based PDF
// index N+9, the same offset as MATHS2. Chapter openers were located by scanning
// for the chapter title set at >15pt (this book sets it at 25-28pt) and each range
// cross-checked against a Practice-set/Problem-set heading scan of every page:
//   idx  10 Linear Equations   39 Quadratic Equations   64 Arithmetic Progression
//   idx  90 Financial Planning  122 Probability  138 Statistics   ANSWERS 178-186
// VISION-ONLY, like every maths volume here.
const MATHS1 = join(SOURCE_ROOT, "10th_Maths_Part1_SB.pdf");
const MATHS2 = join(SOURCE_ROOT, "10th_Maths_Part2_SB.pdf");

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // MUST match the existing DB chapter row exactly
  subjectName: string;
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string;
  pages?: number[]; // 0-based page indices to render
  /**
   * PDF index MINUS printed page number, used ONLY to label dump-text.ts output.
   * HIST and MATHS2 are 9 (the default); GEOG is 10. Getting it wrong mislabels
   * every page heading in out/<id>.text.md by one, which is how a later reader
   * ends up hunting a question on the wrong page.
   */
  printedOffset?: number;
  answersPdf?: string; // never set for this book — see the header note
  answerPages?: number[];
  note: string; // questions.pyq_note
  subtopics: string[]; // the textbook's own section headings
};

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const CHAPTERS: Record<string, Chapter> = {
  // ── PILOT — History Ch.1. Exercise on PDF p15 (printed p6):
  //    Q1(A) two MCQ (four printed options each — unlike the Class-9 Geography
  //    book, this one uses proper four-option MCQs) · Q1(B) wrong-pair ·
  //    Q2 two short notes · Q3 two explain-with-reason · Q4 a concept chart
  //    (figure) · Q5 four answer-in-detail. Project block excluded as always.
  //    Sections 1.1-1.4 are the subtopics; three already exist on this chapter
  //    from the PYQ ingest, so only "Tradition of Historiography" is new.
  "historiography-west-10": {
    id: "historiography-west-10",
    chapterName: "Historiography: Development in the West", // DB spelling — no space before the colon
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Historiography_Development_in_the_West.pdf",
    pdf: HIST,
    pages: range(10, 15), // printed pp 1-6; Exercise on p15
    note: "Maharashtra State Board (Class 10) — Historiography: Development in the West (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Tradition of Historiography",
      "Modern Historiography",
      "Development of Scientific Perspective in Europe and Historiography",
      "Notable Scholars",
    ],
  },

  // Every subtopic list below is the CHAPTER'S OWN section headings. Where a name
  // already exists on the chapter from the PYQ ingest it is reused verbatim (the
  // six that had drifted were renamed to the book in the same pass), so PYQ and
  // practice rows share one axis. Names marked NEW are added by these rows.

  "historiography-indian-10": {
    id: "historiography-indian-10",
    chapterName: "Historiography: Indian Tradition",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Historiography_Indian_Tradition.pdf",
    pdf: HIST,
    pages: range(16, 23), // printed pp 7-14; Exercise on p22
    note: "Maharashtra State Board (Class 10) — Historiography: Indian Tradition (Balbharati textbook, History and Political Science)",
    // The book gives this chapter only TWO numbered sections. §2.2 carries the
    // colonial / Orientalist / nationalist / Marxist / subaltern strands as
    // sub-parts rather than as sections of their own — kept as the book has it.
    subtopics: [
      "Tradition of Indian Historiography",
      "Indian Historiography: Various Ideological Frameworks",
    ],
  },

  "applied-history-10": {
    id: "applied-history-10",
    chapterName: "Applied History",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Applied_History.pdf",
    pdf: HIST,
    pages: range(24, 30), // printed pp 15-21; Exercise on p30
    note: "Maharashtra State Board (Class 10) — Applied History (Balbharati textbook, History and Political Science)",
    // The four existing subtopics were ALREADY the book's 3.1-3.4 verbatim — this
    // chapter needed no rename at all. Only 3.5 is new.
    subtopics: [
      "What is Applied History",
      "Applied History and Research in Various Fields",
      "Applied History and Our Present",
      "Management of Cultural and Natural Heritage",
      "Affiliated Professional Fields", // NEW — §3.5
    ],
  },

  "working-of-constitution-10": {
    id: "working-of-constitution-10",
    chapterName: "Working of the Constitution",
    subjectName: "Political Science",
    sourceFile: "StateBoard_10_PolSci__Working_of_the_Constitution.pdf",
    pdf: HIST,
    pages: range(78, 83), // printed pp 69-74; Exercise on p83
    note: "Maharashtra State Board (Class 10) — Working of the Constitution (Balbharati textbook, History and Political Science)",
    // Political Science sections are UNNUMBERED, so these are the book's bold
    // headings in printed order.
    subtopics: [
      "Democracy and Political Maturity",
      "Right to Vote",
      "Decentralisation of Democracy", // NEW
      "Right to Information", // NEW
      "Social Justice and Equality",
      "Role of Judiciary",
    ],
  },

  "electoral-process-10": {
    id: "electoral-process-10",
    chapterName: "The Electoral Process",
    subjectName: "Political Science",
    sourceFile: "StateBoard_10_PolSci__The_Electoral_Process.pdf",
    pdf: HIST,
    pages: range(84, 90), // printed pp 75-81; Exercise spans p89-90
    note: "Maharashtra State Board (Class 10) — The Electoral Process (Balbharati textbook, History and Political Science)",
    // NOTE: the chapter also still carries a legacy PYQ-era subtopic "Conduct of
    // Elections" (8 pyq rows). It matches NO section of this book — those
    // questions belong across Functions of Election Commission / Code of Conduct /
    // Types of Elections, which is per-question reclassification rather than a
    // rename, so it was deliberately left alone. It is absent from this list
    // because no textbook row should be filed under it.
    subtopics: [
      "Election Commission",
      "Functions of Election Commission", // NEW
      "Restructuring of the Constituency", // NEW
      "Code of Conduct", // NEW
      "Challenges in Free and Fair Elections", // NEW
      "Electoral Reforms",
      "Types of Elections", // NEW
    ],
  },

  // ══ THE REMAINING NINE HUMANITIES CHAPTERS (History 4-9, PolSci 3-5) ══
  //
  // Page ranges were read off the book, not inferred: every chapter opener and
  // every "Exercise" heading was located by scanning all 112 pages, because the
  // chapters are NOT uniform in length (Ch.5 is 7pp, Ch.7 is 6pp) and the
  // Political Science half restarts its own numbering at 1.
  //
  // ⚠ SUBTOPIC POLICY HERE DIFFERS FROM THE 2026-08-02 PILOT, DELIBERATELY.
  // That pass RENAMED six drifted PYQ-era subtopics to the book's headings.
  // These nine chapters carry drift too, but renaming a subtopic re-files
  // SHIPPED board-PYQ rows, so the names below REUSE the existing DB strings
  // verbatim and only ADD the book sections that have no subtopic at all. The
  // drift is real and is recorded per chapter as `// drift:` so the rename can
  // be made later as one reviewed pass rather than smuggled in with an ingest.

  "indian-arts-10": {
    id: "indian-arts-10",
    chapterName: "History of Indian Arts",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__History_of_Indian_Arts.pdf",
    pdf: HIST,
    pages: range(31, 40), // printed pp 22-31; Exercise on idx 40
    note: "Maharashtra State Board (Class 10) — History of Indian Arts (Balbharati textbook, History and Political Science)",
    // Book sections 4.1-4.4. Only 4.1 is new; the other three already exist.
    subtopics: [
      "What is Art", // NEW — §4.1
      "Indian Traditions of Visual Arts",
      "Indian Traditions of Performing Arts",
      "Art, Applied Art and Professional Opportunities",
    ],
  },

  "mass-media-10": {
    id: "mass-media-10",
    chapterName: "Mass Media and History",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Mass_Media_and_History.pdf",
    pdf: HIST,
    pages: range(41, 47), // printed pp 32-38; Exercise on idx 46, Projects idx 47
    note: "Maharashtra State Board (Class 10) — Mass Media and History (Balbharati textbook, History and Political Science)",
    // Book sections 5.1-5.5. §5.4 prints in full as "Critical understanding of
    // the information received through Mass Media"; the existing DB subtopic is
    // the shortened "Critical Understanding of Mass Media" and is reused.
    // drift: "Newspapers, Radio and Television" is NOT a book section — it is
    // the three sub-parts of §5.2 History of Mass Media, promoted by the PYQ
    // ingest. Kept because 11 shipped PYQ rows sit on it.
    subtopics: [
      "Introduction to Mass Media", // NEW — §5.1
      "History of Mass Media",
      "Newspapers, Radio and Television",
      "Why do we need Mass Media", // NEW — §5.3
      "Critical Understanding of Mass Media",
      "Mass Media and Professional Opportunities", // NEW — §5.5
    ],
  },

  "entertainment-10": {
    id: "entertainment-10",
    chapterName: "Entertainment and History",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Entertainment_and_History.pdf",
    pdf: HIST,
    pages: range(48, 54), // printed pp 39-45; Exercise on idx 54
    note: "Maharashtra State Board (Class 10) — Entertainment and History (Balbharati textbook, History and Political Science)",
    // drift: the book's §6.2 is "Folk Theatre"; the DB carries "Folk Theatre and
    // Puppetry" (6 shipped PYQ rows). Reused rather than renamed.
    subtopics: [
      "Why do we need Entertainment",
      "Folk Theatre and Puppetry",
      "Marathi Theatre",
      "Indian Film Industry",
      "Entertainment and Professional Opportunities", // NEW — §6.5
    ],
  },

  "sports-history-10": {
    id: "sports-history-10",
    chapterName: "Sports and History",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Sports_and_History.pdf",
    pdf: HIST,
    pages: range(55, 60), // printed pp 46-51; Exercise on idx 60
    note: "Maharashtra State Board (Class 10) — Sports and History (Balbharati textbook, History and Political Science)",
    // This chapter has SEVEN book sections (7.1-7.7), the most of any here.
    // drift: the DB's "Importance and Types of Sports" fuses §7.1 Importance of
    // Sports with §7.2 Types of sports (7 shipped PYQ rows). Reused as one.
    subtopics: [
      "Importance and Types of Sports",
      "Globalisation of Sports",
      "Game Materials and Toys",
      "Toys and History", // NEW — §7.5
      "Literature and Movies on Sport", // NEW — §7.6
      "Sports and Professional Opportunities", // NEW — §7.7
    ],
  },

  "tourism-history-10": {
    id: "tourism-history-10",
    chapterName: "Tourism and History",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Tourism_and_History.pdf",
    pdf: HIST,
    pages: range(61, 67), // printed pp 52-58; Exercise on idx 67
    note: "Maharashtra State Board (Class 10) — Tourism and History (Balbharati textbook, History and Political Science)",
    // The only chapter here whose five DB subtopics already cover all five book
    // sections 1:1. §8.5 prints as "Professional Opportunities in the Tourism
    // and Hospitality Industry"; the DB's "Tourism and Professional
    // Opportunities" is reused for it. Nothing new.
    subtopics: [
      "Tourism in the Past",
      "Types of Tourism",
      "Development of Tourism",
      "Conservation and Preservation of Historical Places",
      "Tourism and Professional Opportunities",
    ],
  },

  "heritage-management-10": {
    id: "heritage-management-10",
    chapterName: "Heritage Management",
    subjectName: "History",
    sourceFile: "StateBoard_10_History__Heritage_Management.pdf",
    pdf: HIST,
    pages: range(68, 75), // printed pp 59-66; Exercise on idx 75
    note: "Maharashtra State Board (Class 10) — Heritage Management (Balbharati textbook, History and Political Science)",
    // drift: the book's §9.2 is "Some Famous Museums"; the DB carries the
    // shorter "Museums" (4 shipped PYQ rows). Reused.
    subtopics: [
      "Sources of History, their Conservation and Preservation",
      "Museums",
      "Libraries and Archives",
      "Encyclopaedias", // NEW — §9.4
    ],
  },

  // ── POLITICAL SCIENCE 3-5. Sections here are UNNUMBERED (the same as the two
  //    shipped PolSci chapters), so there is no printed contents list to check
  //    against — the subtopics are the existing DB names, each of which already
  //    corresponds to a bold heading in the chapter.
  "political-parties-10": {
    id: "political-parties-10",
    chapterName: "Political Parties",
    subjectName: "Political Science",
    sourceFile: "StateBoard_10_PolSci__Political_Parties.pdf",
    pdf: HIST,
    pages: range(91, 99), // printed pp 82-90; Exercise on idx 99
    note: "Maharashtra State Board (Class 10) — Political Parties (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Characteristics and Functions of Political Parties",
      "Party Systems",
      "National and Regional Parties",
    ],
  },

  "social-political-movements-10": {
    id: "social-political-movements-10",
    chapterName: "Social and Political Movements",
    subjectName: "Political Science",
    sourceFile: "StateBoard_10_PolSci__Social_and_Political_Movements.pdf",
    pdf: HIST,
    pages: range(100, 105), // printed pp 91-96; Exercise on idx 105
    note: "Maharashtra State Board (Class 10) — Social and Political Movements (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Why Movements Arise",
      "Types of Movements",
      "Tribal Movements in the Pre-independence Period",
      "Farmers' Movement and the Green Revolution",
    ],
  },

  "challenges-democracy-10": {
    id: "challenges-democracy-10",
    chapterName: "Challenges faced by Indian Democracy",
    subjectName: "Political Science",
    sourceFile: "StateBoard_10_PolSci__Challenges_faced_by_Indian_Democracy.pdf",
    pdf: HIST,
    pages: range(106, 108), // printed pp 97-99; Exercise on idx 108
    note: "Maharashtra State Board (Class 10) — Challenges faced by Indian Democracy (Balbharati textbook, History and Political Science)",
    // The four existing subtopics leave the chapter's terrorism / Naxalism block
    // with no home at all — the book runs it as its own inline heading ("Left
    // extremists - Naxalism :") between the global-challenges opening and the
    // corruption block — so one subtopic is added for it.
    subtopics: [
      "Deepening of Democracy",
      "Casteism, Communalism and Regionalism",
      "Terrorism and Left Extremism", // NEW
      "Corruption and Criminalisation of Politics",
      "Challenges before Democracy at the Global Level",
    ],
  },

  // ══ GEOGRAPHY — all nine chapters of 10th_Geog_SB.pdf ══
  //
  // Ranges come from the book's own contents page (idx 10) cross-checked against
  // an Exercise-heading scan of all 82 pages. THREE chapters' exercises spill onto
  // the next page (3, 8) or are followed by a further body box (5), so those
  // ranges deliberately run one page past the Exercise heading.
  //
  // Subtopics are the existing DB names — all nine chapters already carry a full
  // set from the board-PYQ ingest and they map cleanly onto the book's own
  // headings, so unlike the History chapters nothing new is added here.
  // drift worth recording: Location and Extent carries BOTH "Historical
  // Background" and "Historical Background of Brazil" (1 shipped PYQ row each),
  // which are one concept under two names. Reused rather than merged, because
  // merging re-files shipped rows.

  "geog-field-visit-10": {
    id: "geog-field-visit-10",
    chapterName: "Field Visit",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Field_Visit.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(11, 18), // printed pp 1-8; Exercise on idx 18
    note: "Maharashtra State Board (Class 10) — Field Visit (Balbharati textbook, Geography)",
    subtopics: [
      "Purpose and Planning of a Field Visit",
      "Questionnaire and Report Writing",
    ],
  },

  "geog-location-extent-10": {
    id: "geog-location-extent-10",
    chapterName: "Location and Extent",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Location_and_Extent.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(19, 23), // printed pp 9-13; Exercise on idx 23
    note: "Maharashtra State Board (Class 10) — Location and Extent (Balbharati textbook, Geography)",
    subtopics: [
      "Latitudinal and Longitudinal Extent",
      "Neighbouring Countries and Boundaries",
      "Area, Shape and Standard Time",
      "States and Administrative Divisions of Brazil",
      "Coastal States of Brazil",
      "Historical Background",
      "Historical Background of Brazil",
      "India and Brazil — A Comparative Overview",
    ],
  },

  "geog-physiography-10": {
    id: "geog-physiography-10",
    chapterName: "Physiography and Drainage",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Physiography_and_Drainage.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(24, 34), // printed pp 14-24; Exercise SPANS idx 33-34
    note: "Maharashtra State Board (Class 10) — Physiography and Drainage (Balbharati textbook, Geography)",
    subtopics: [
      "Physiographic Divisions",
      "Mountains, Plateaus and Plains",
      "Coastal Plains and Islands",
      "River Systems and Drainage Basins",
    ],
  },

  "geog-climate-10": {
    id: "geog-climate-10",
    chapterName: "Climate",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Climate.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(35, 41), // printed pp 25-31; Exercise on idx 41
    note: "Maharashtra State Board (Class 10) — Climate (Balbharati textbook, Geography)",
    subtopics: [
      "Factors Affecting Climate",
      "Temperature and Rainfall Distribution",
      "Winds and Monsoon",
      "Climatic Regions",
    ],
  },

  "geog-vegetation-wildlife-10": {
    id: "geog-vegetation-wildlife-10",
    chapterName: "Natural Vegetation and Wildlife",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Natural_Vegetation_and_Wildlife.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(42, 47), // printed pp 32-37; Exercise on idx 46, a body box follows on idx 47
    note: "Maharashtra State Board (Class 10) — Natural Vegetation and Wildlife (Balbharati textbook, Geography)",
    subtopics: [
      "Types of Natural Vegetation",
      "Wildlife and Biodiversity",
      "Conservation of Vegetation and Wildlife",
    ],
  },

  "geog-population-10": {
    id: "geog-population-10",
    chapterName: "Population",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Population.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(48, 55), // printed pp 38-45; Exercise on idx 55
    note: "Maharashtra State Board (Class 10) — Population (Balbharati textbook, Geography)",
    subtopics: [
      "Distribution and Density of Population",
      "Population Growth and Composition",
      "Sex Ratio, Literacy and Life Expectancy",
      "Migration and Urbanisation",
    ],
  },

  "geog-settlements-10": {
    id: "geog-settlements-10",
    chapterName: "Human Settlements",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Human_Settlements.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(56, 61), // printed pp 46-51; Exercise on idx 61
    note: "Maharashtra State Board (Class 10) — Human Settlements (Balbharati textbook, Geography)",
    subtopics: [
      "Factors Affecting Settlement",
      "Settlement Patterns",
      "Rural and Urban Settlements",
    ],
  },

  "geog-economy-10": {
    id: "geog-economy-10",
    chapterName: "Economy and Occupations",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Economy_and_Occupations.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(62, 70), // printed pp 52-60; Exercise SPANS idx 69-70
    note: "Maharashtra State Board (Class 10) — Economy and Occupations (Balbharati textbook, Geography)",
    subtopics: [
      "Primary, Secondary and Tertiary Activities",
      "Agriculture and Allied Occupations",
      "Minerals, Industries and Manufacturing",
      "Types of Economy and National Income",
    ],
  },

  "geog-tourism-transport-10": {
    id: "geog-tourism-transport-10",
    chapterName: "Tourism, Transport and Communication",
    subjectName: "Geography",
    sourceFile: "StateBoard_10_Geography__Tourism_Transport_and_Communication.pdf",
    pdf: GEOG,
    printedOffset: 10, // GEOG: printed page N -> idx N+10, unlike HIST's N+9
    pages: range(71, 78), // printed pp 61-68; Exercise on idx 78
    note: "Maharashtra State Board (Class 10) — Tourism, Transport and Communication (Balbharati textbook, Geography)",
    subtopics: [
      "Types of Tourism",
      "Tourism and the Economy",
      "Land, Water and Air Transport",
    ],
  },

  // ══ SCIENCE AND TECHNOLOGY — all twenty chapters of the two volumes ══
  //
  // Page ranges: each volume's contents page gives the printed start page of every
  // chapter, and an Exercise-heading scan of all 156 + 132 pages confirms where each
  // chapter ends. SEVEN chapters' exercises spill onto the following page, so those
  // ranges deliberately run one page past the Exercise heading — they are noted
  // individually below.
  //
  // Subtopics are the LIVE DB names, fetched rather than retyped, so a textbook row
  // files onto the same axis as the board PYQs already on that chapter. As with the
  // History chapters, drifted near-duplicates are REUSED rather than renamed, because
  // a rename re-files shipped PYQ rows: Heat carries both "Humidity" and "Humidity and
  // Relative Humidity", both "Anomalous Behaviour of Water" and "Anomalous Expansion
  // of Water"; Refraction carries both "Refractive Index" and "Absolute Refractive
  // Index"; and several others are similar. That is a reviewed rename pass of its own.
  //
  // NOTE the subject split is per VOLUME and is not negotiable: Carbon Compounds,
  // Metallurgy and Chemical Reactions and Equations exist as chapter rows under BOTH
  // Science I and Science II (a leftover of the old syllabus, where Paper II carried a
  // chemistry half). The textbook chapters belong to Part 1, so they take Science I.
  //
  // THERE IS A PARTIAL PRINTED ANSWER KEY, and it is worth knowing exactly how partial.
  // Unlike the humanities books - which print nothing anywhere - these two print a bold
  // answer under SOME numerical exercise items. Measured across all twenty chapter dumps:
  // TWENTY-FOUR items across SIX chapters - Gravitation 7, Lenses 4, Effects of Electric
  // Current 4, Heat 4, Space Missions 3, Refraction of Light 2. The other fourteen
  // chapters print none. So the end-of-book cross-check gate that governs the Maths books
  // still cannot run here; twenty-four is a spot-check on twenty-four rows, not a key.
  // Where one exists it IS consulted, the answer is derived FIRST, and the agreement is
  // stated in the stored solution - a derivation that reproduces the printed value is
  // stronger evidence than one that does not.
  //
  // THE COUNT ABOVE IS A CORRECTION, and how the first one was wrong is the useful part.
  // It read NINE across TWO chapters, from a scan for `Ans[:.]`. Being case-SENSITIVE was
  // right and is still right - a case-insensitive scan is worthless here because "organs."
  // matches - but the pattern was rigid in two ways the book is not: this text prints
  // `Ans :` with a SPACE before the colon in four of the six chapters, and spells it
  // `Answer :` in Heat. The scan that holds is `\bAns(wer)?[[:space:]]*[:.]`. Two
  // ingestion agents found the undercount independently, from different chapters, before
  // this was corrected - and each of their own re-counts was itself short (19 and 24 by
  // patterns that missed, respectively, the `Answer` spelling and a trailing period),
  // which is the whole lesson: a census of a typeset feature is only as good as the
  // variants you thought to allow for, and the cost of getting it wrong lands on the
  // chapters you then tell "there is nothing to check against".

  "sci-gravitation-10": {
    id: "sci-gravitation-10",
    chapterName: "Gravitation",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Gravitation.pdf",
    pdf: SCI1,
    pages: range(10, 24), // printed pp 1-15; Exercise on idx 23
    note: "Maharashtra State Board (Class 10) \u2014 Gravitation (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Kepler's Laws of Planetary Motion",
      "Newton's Law of Gravitation",
      "Free Fall and Acceleration due to Gravity",
      "Mass and Weight",
      "Equations of Motion under Gravity",
      "Escape Velocity and Satellites",
    ],
  },

  "sci-periodic-10": {
    id: "sci-periodic-10",
    chapterName: "Periodic Classification of Elements",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Periodic_Classification_of_Elements.pdf",
    pdf: SCI1,
    pages: range(25, 38), // printed pp 16-29; Exercise on idx 37
    note: "Maharashtra State Board (Class 10) \u2014 Periodic Classification of Elements (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Early Attempts and Mendeleev's Periodic Table",
      "Mendeleev's Periodic Law",
      "Mendeleev's Periodic Table",
      "Modern Periodic Table",
      "Electronic Configuration and Position in Periodic Table",
      "Groups of the Modern Periodic Table",
      "Groups and Valency",
      "Periodic Trends",
      "Periodic Trends - Atomic Radius",
    ],
  },

  "sci-chem-reactions-10": {
    id: "sci-chem-reactions-10",
    chapterName: "Chemical Reactions and Equations",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Chemical_Reactions_and_Equations.pdf",
    pdf: SCI1,
    pages: range(39, 55), // printed pp 30-46; Exercise on idx 54, spills to 55
    note: "Maharashtra State Board (Class 10) \u2014 Chemical Reactions and Equations (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Physical and Chemical Changes",
      "Balancing Chemical Equations",
      "Types of Chemical Reactions",
      "Displacement Reaction",
      "Oxidation, Reduction and Corrosion",
      "Rate of Chemical Reaction",
    ],
  },

  "sci-electric-current-10": {
    id: "sci-electric-current-10",
    chapterName: "Effects of Electric Current",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Effects_of_Electric_Current.pdf",
    pdf: SCI1,
    pages: range(56, 70), // printed pp 47-61; Exercise on idx 69, spills to 70
    note: "Maharashtra State Board (Class 10) \u2014 Effects of Electric Current (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Potential Difference",
      "Series and Parallel Combination of Resistors",
      "Heating Effect of Electric Current",
      "Electric Power",
      "Magnetic Effect of Electric Current",
      "Fleming's Left Hand Rule",
      "Fleming's Right Hand Rule",
      "Electric Motor",
      "Electric Motor and Generator",
      "Alternating Current",
      "Domestic Electric Circuit and Fuse",
      "Domestic Electric Circuits and Safety",
      "Electrical Measuring Instruments",
      "Electroplating",
    ],
  },

  "sci-heat-10": {
    id: "sci-heat-10",
    chapterName: "Heat",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Heat.pdf",
    pdf: SCI1,
    pages: range(71, 81), // printed pp 62-72; Exercise on idx 80
    note: "Maharashtra State Board (Class 10) \u2014 Heat (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Concept of Heat and Temperature",
      "Concept of Heat and its Units",
      "Specific Heat Capacity",
      "Specific Heat - Heat Energy Calculation",
      "Principle of Heat Exchange",
      "Latent Heat and Change of State",
      "Anomalous Behaviour of Water",
      "Anomalous Expansion of Water",
      "Humidity",
      "Humidity and Relative Humidity",
    ],
  },

  "sci-refraction-10": {
    id: "sci-refraction-10",
    chapterName: "Refraction of Light",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Refraction_of_Light.pdf",
    pdf: SCI1,
    pages: range(82, 88), // printed pp 73-79; Exercise on idx 88
    note: "Maharashtra State Board (Class 10) \u2014 Refraction of Light (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Refraction and Refractive Index",
      "Laws of Refraction",
      "Refractive Index",
      "Absolute Refractive Index",
      "Total Internal Reflection",
      "Applications of Refraction",
      "Atmospheric Refraction - Twinkling of Stars",
      "Dispersion of Light",
      "Dispersion of Light and Spectrum",
      "Wavelength and Spectrum of Light",
      "Wavelength of Visible Light",
    ],
  },

  "sci-lenses-10": {
    id: "sci-lenses-10",
    chapterName: "Lenses",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Lenses.pdf",
    pdf: SCI1,
    pages: range(89, 101), // printed pp 80-92; Exercise on idx 101
    note: "Maharashtra State Board (Class 10) \u2014 Lenses (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Types of Lenses and Terminology",
      "Image Formation by Lenses",
      "Image Formation by a Convex Lens",
      "Lens Formula and Magnification",
      "Power of a Lens",
      "Human Eye - Structure and Image Formation",
      "Human Eye - Near Point",
      "Human Eye and Defects of Vision",
      "Simple Microscope",
    ],
  },

  "sci-metallurgy-10": {
    id: "sci-metallurgy-10",
    chapterName: "Metallurgy",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Metallurgy.pdf",
    pdf: SCI1,
    pages: range(102, 118), // printed pp 93-109; Exercise on idx 117, spills to 118
    note: "Maharashtra State Board (Class 10) \u2014 Metallurgy (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Properties of Metals and Non-Metals",
      "Reactivity Series of Metals",
      "Reactivity Series and Ionic Compounds",
      "Basic Terms in Metallurgy",
      "Concentration of Ore - Gravity Separation",
      "Extraction of Metals",
      "Ores of Aluminium",
      "Corrosion and Rusting of Iron",
      "Corrosion and Alloys",
      "Alloys and Alloying",
      "Electroplating",
    ],
  },

  "sci-carbon-compounds-10": {
    id: "sci-carbon-compounds-10",
    chapterName: "Carbon Compounds",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Carbon_Compounds.pdf",
    pdf: SCI1,
    pages: range(119, 143), // printed pp 110-134; Exercise on idx 142, spills to 143
    note: "Maharashtra State Board (Class 10) \u2014 Carbon Compounds (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Covalent Bonding in Carbon",
      "Electron Dot Structures",
      "Hydrocarbons",
      "Saturated and Unsaturated Hydrocarbons",
      "Alkanes - Structural and Molecular Formulae",
      "Hydrocarbons and Functional Groups",
      "Homologous Series",
      "IUPAC Nomenclature",
      "Nomenclature and Isomerism",
      "Important Organic Compounds",
      "Fuels and Hydrocarbons",
      "Rancidity",
    ],
  },

  "sci-space-missions-10": {
    id: "sci-space-missions-10",
    chapterName: "Space Missions",
    subjectName: "Science and Technology I",
    sourceFile: "StateBoard_10_ScienceI__Space_Missions.pdf",
    pdf: SCI1,
    pages: range(144, 155), // printed pp 135-146; Exercise on idx 153
    note: "Maharashtra State Board (Class 10) \u2014 Space Missions (Balbharati textbook, Science and Technology Part I)",
    subtopics: [
      "Astronomical Objects",
      "Satellites and Orbits",
      "Artificial Satellites",
      "Artificial Satellites and Their Types",
      "Launch Vehicles",
      "Satellites and Launch Vehicles",
      "Rocket Propulsion",
      "Space Missions of India",
      "Importance of Space Missions",
      "Space Debris and its Management",
    ],
  },

  "sci-heredity-10": {
    id: "sci-heredity-10",
    chapterName: "Heredity and Evolution",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Heredity_and_Evolution.pdf",
    pdf: SCI2,
    pages: range(10, 19), // printed pp 1-10; Exercise on idx 19
    note: "Maharashtra State Board (Class 10) \u2014 Heredity and Evolution (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Heredity and Variation",
      "Mendel's Laws of Inheritance",
      "Evolution and its Theories",
      "Speciation and Evidences of Evolution",
    ],
  },

  "sci-life-processes-1-10": {
    id: "sci-life-processes-1-10",
    chapterName: "Life Processes in Living Organisms Part 1",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Life_Processes_in_Living_Organisms_Part_1.pdf",
    pdf: SCI2,
    pages: range(20, 30), // printed pp 11-21; Exercise on idx 30
    note: "Maharashtra State Board (Class 10) \u2014 Life Processes in Living Organisms Part 1 (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Cell Division — Mitosis and Meiosis",
      "Nutrition in Living Organisms",
      "Cellular Respiration",
      "Osmosis and Diffusion",
      "Osmosis, Diffusion and Absorption",
      "Transpiration and Water Transport in Plants",
      "Transport of Materials and Blood",
      "Excretory System",
      "Excretory System in Human Beings",
      "Glands and their Secretions",
    ],
  },

  "sci-life-processes-2-10": {
    id: "sci-life-processes-2-10",
    chapterName: "Life Processes in Living Organisms Part 2",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Life_Processes_in_Living_Organisms_Part_2.pdf",
    pdf: SCI2,
    pages: range(31, 44), // printed pp 22-35; Exercise on idx 43, spills to 44
    note: "Maharashtra State Board (Class 10) \u2014 Life Processes in Living Organisms Part 2 (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Types of Reproduction",
      "Human Reproductive System",
      "Reproductive Health",
    ],
  },

  "sci-environment-10": {
    id: "sci-environment-10",
    chapterName: "Environmental Management",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Environmental_Management.pdf",
    pdf: SCI2,
    pages: range(45, 55), // printed pp 36-46; Exercise on idx 55
    note: "Maharashtra State Board (Class 10) \u2014 Environmental Management (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Ecosystem and Ecological Balance",
      "Environmental Conservation",
      "Biodiversity and Conservation",
      "Control of Noise Pollution",
      "Blue Revolution",
    ],
  },

  "sci-green-energy-10": {
    id: "sci-green-energy-10",
    chapterName: "Towards Green Energy",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Towards_Green_Energy.pdf",
    pdf: SCI2,
    pages: range(56, 69), // printed pp 47-60; Exercise on idx 68, spills to 69
    note: "Maharashtra State Board (Class 10) \u2014 Towards Green Energy (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Energy Sources",
      "Renewable and Non-Renewable Energy",
      "Green Energy Technologies",
    ],
  },

  "sci-animal-classification-10": {
    id: "sci-animal-classification-10",
    chapterName: "Animal Classification",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Animal_Classification.pdf",
    pdf: SCI2,
    pages: range(70, 85), // printed pp 61-76; Exercise on idx 84, spills to 85
    note: "Maharashtra State Board (Class 10) \u2014 Animal Classification (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Basis of Classification",
      "Non-Chordates",
      "Chordates",
    ],
  },

  "sci-microbiology-10": {
    id: "sci-microbiology-10",
    chapterName: "Introduction to Microbiology",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Introduction_to_Microbiology.pdf",
    pdf: SCI2,
    pages: range(86, 96), // printed pp 77-87; Exercise on idx 95, spills to 96
    note: "Maharashtra State Board (Class 10) \u2014 Introduction to Microbiology (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Useful Microorganisms",
      "Industrial and Applied Microbiology",
    ],
  },

  "sci-cell-biotech-10": {
    id: "sci-cell-biotech-10",
    chapterName: "Cell Biology and Biotechnology",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Cell_Biology_and_Biotechnology.pdf",
    pdf: SCI2,
    pages: range(97, 109), // printed pp 88-100; Exercise on idx 108
    note: "Maharashtra State Board (Class 10) \u2014 Cell Biology and Biotechnology (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Levels of Body Organization",
      "Proteins and their Sources",
      "Genetic Engineering",
      "Biotechnology and its Applications",
    ],
  },

  "sci-social-health-10": {
    id: "sci-social-health-10",
    chapterName: "Social Health",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Social_Health.pdf",
    pdf: SCI2,
    pages: range(110, 117), // printed pp 101-108; Exercise on idx 117
    note: "Maharashtra State Board (Class 10) \u2014 Social Health (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Health and Disease",
      "Social Health and Issues",
      "Addiction and Stress Management",
    ],
  },

  "sci-disaster-10": {
    id: "sci-disaster-10",
    chapterName: "Disaster Management",
    subjectName: "Science and Technology II",
    sourceFile: "StateBoard_10_ScienceII__Disaster_Management.pdf",
    pdf: SCI2,
    pages: range(118, 129), // printed pp 109-120; Exercise on idx 128, spills to 129
    note: "Maharashtra State Board (Class 10) \u2014 Disaster Management (Balbharati textbook, Science and Technology Part II)",
    subtopics: [
      "Types of Disasters",
      "Disaster Management and Mitigation",
      "First Aid",
    ],
  },

  // ── GEOMETRY Ch.2 — the first MATHS chapter in this pipeline, and it breaks
  //    two of the assumptions the humanities chapters above were built on.
  //
  // (1) TRANSCRIPTION IS VISION-ONLY. Do NOT reach for dump-text.ts. The text
  //     layer reads cleanly and is ARITHMETICALLY LOSSY — measured, not assumed:
  //     p32 teaches "each perpendicular side is 1/√2 times the hypotenuse" and
  //     the text layer returns "1\n2", which decodes to 1/2, a false statement;
  //     "ZY = 3√2" extracts as "3 2". There are ZERO U+221A characters in the
  //     whole chapter's text layer while the chapter uses surds throughout
  //     (1/√2, 3√2, 6√3, 2√10, 4√13, 10√2) — the radicals are drawn as vector
  //     art, so they are not merely mis-encoded, they are ABSENT. Stacked
  //     fractions collapse the same way ("1\n3 BC", "QR\n2").
  //     Separately, every geometry operator sits in the SymbolMT font and
  //     extracts as the wrong Latin letter (△→"D", ∠→"Ð", ∴→"\", ⊥→"^", ≅→"@",
  //     ×→"´", ∼→"~"). That half IS mechanically invertible — get_text("dict")
  //     preserves the font per span, so "D"-in-SymbolMT is unambiguously △ even
  //     beside a vertex named D — but inverting it does NOT make text-first
  //     viable, because the dropped radicals are unrecoverable at any price.
  //     Recorded so a later session doesn't re-derive the SymbolMT insight and
  //     conclude the text layer can be used. It cannot.
  //
  // (2) THIS BOOK HAS AN ANSWERS SECTION (printed pp.164-165 = idx 173-174),
  //     unlike 10th_Hist_SB.pdf. So the step-6 answer-key cross-check GATE runs
  //     here — the first chapter in this pipeline where it can. Note the answer
  //     pages carry the SAME radical-dropping defect ("PS = 6 3" is 6√3), so
  //     they are read by vision too. Coverage is systematic: every numeric
  //     question has a printed key; the 8 "prove that" questions have none
  //     (2.1 Q9; 2.2 Q3,Q5; PS2 Q8,Q9,Q11,Q13,Q16) and carry authored proofs.
  //
  // Blocks → section_kind: three Solved-Example runs (idx 45-47, 49, 50-51) →
  // solved_example · Practice set 2.1 + 2.2 → exercise · Problem set 2 →
  // miscellaneous. Only 8 of ~65 rows are MCQs (Problem set 2 Q1(1)-(8)).
  // The book's own "«" marks a challenging question (8 of them) — kept as a note.
  // The chapter-end "ICT Tools" box (make a slide show on Pythagoras' life) is
  // NOT ingested: open-ended, no determinate answer.
  //
  // Subtopics are the book's own headings, realigned 2026-08-11 (see
  // data/_rollback.pythagoras-10.subtopic-backup.json). "Application of
  // Pythagoras Theorem" is SINGULAR and narrow on purpose: the book's p40
  // section of that name teaches ONLY the obtuse/acute extensions
  // (AB² = BC² + AC² ∓ 2BC×DC). It is not a catch-all, and it starts with 0
  // board PYQs because no past paper has ever sampled it.
  // ══ MATHEMATICS — Algebra (Part I) and Geometry (Part II) ══
  //
  // These twelve differ from every other chapter in this pipeline in TWO ways.
  //
  // 1. THE ANSWER-KEY CROSS-CHECK IS A REAL GATE HERE. Both volumes carry an
  //    ANSWERS section, so `answersPdf`/`answerPages` are set and every authored
  //    answer must be diffed against the printed key - the control the Science and
  //    humanities books simply cannot offer. Report the split as AGREE /
  //    OUR-ANSWER-WRONG / BOOK-KEY-WRONG, and say how many rows were actually
  //    diffed: a proof question with no key entry is not a gap.
  //    Known exception: Geometry Ch.4 Geometric Constructions has NO printed
  //    answers at all (the key jumps from Problem set 3 to Problem set 4), because
  //    a ruler-and-compass construction has no numeric answer.
  //
  // 2. THE BLOCK STRUCTURE IS MULTI-PART, not a single end-of-chapter Exercise:
  //    interleaved Solved Examples, numbered Practice sets and a closing Problem
  //    set, all three in scope (the shipped `pythagoras-10` is the precedent).
  //    Each chapter therefore needs its own outline; those live in
  //    data/<id>.sections.json rather than sections.ts so that parallel per-chapter
  //    work cannot collide on one shared module.
  //
  // Chapter 2 of Part II is absent on purpose - it is the shipped `pythagoras-10`.

  "alg-linear-equations-10": {
    id: "alg-linear-equations-10",
    chapterName: "Linear Equations in Two Variables", // DB spelling
    subjectName: "Algebra",
    sourceFile: "StateBoard_10_Algebra__Linear_Equations_in_Two_Variables.pdf",
    pdf: MATHS1,
    pages: range(10, 38), // printed pp 1-29; Practice sets 1.1-1.5 + Problem set 1
    answersPdf: MATHS1,
    answerPages: [178, 179], // printed pp 169, 170
    note: "Maharashtra State Board (Class 10) \u2014 Linear Equations in Two Variables (Balbharati textbook, Mathematics Part I / Algebra)",
    subtopics: [
      "Consistency of Simultaneous Equations",
      "Determinant Method (Cramer's Rule)",
      "Equations Reducible to Linear Form",
      "Graph of Linear Equations",
      "Methods of Solving Linear Equations",
      "Word Problems and Applications",
    ],
  },

  "alg-quadratic-equations-10": {
    id: "alg-quadratic-equations-10",
    chapterName: "Quadratic Equations", // DB spelling
    subjectName: "Algebra",
    sourceFile: "StateBoard_10_Algebra__Quadratic_Equations.pdf",
    pdf: MATHS1,
    pages: range(39, 63), // printed pp 30-54; Practice sets 2.1-2.6 + Problem set 2
    answersPdf: MATHS1,
    answerPages: [179, 180, 181], // printed pp 170, 171, 172
    note: "Maharashtra State Board (Class 10) \u2014 Quadratic Equations (Balbharati textbook, Mathematics Part I / Algebra)",
    subtopics: [
      "Nature of Roots (Discriminant)",
      "Relation between Roots and Coefficients",
      "Roots of a Quadratic Equation",
      "Solving by Factorisation",
      "Solving by Formula and Completing the Square",
      "Standard Form of a Quadratic Equation",
      "Word Problems and Applications",
    ],
  },

  "alg-arithmetic-progression-10": {
    id: "alg-arithmetic-progression-10",
    chapterName: "Arithmetic Progression", // DB spelling
    subjectName: "Algebra",
    sourceFile: "StateBoard_10_Algebra__Arithmetic_Progression.pdf",
    pdf: MATHS1,
    pages: range(64, 89), // printed pp 55-80; Practice sets 3.1-3.4 + Problem set 3
    answersPdf: MATHS1,
    answerPages: [181, 182], // printed pp 172, 173
    note: "Maharashtra State Board (Class 10) \u2014 Arithmetic Progression (Balbharati textbook, Mathematics Part I / Algebra)",
    subtopics: [
      "Common Difference of an A.P.",
      "Concept of Arithmetic Progression",
      "nth Term of an A.P.",
      "Sum of n Terms of an A.P.",
      "Word Problems and Applications",
    ],
  },

  "alg-financial-planning-10": {
    id: "alg-financial-planning-10",
    chapterName: "Financial Planning", // DB spelling
    subjectName: "Algebra",
    sourceFile: "StateBoard_10_Algebra__Financial_Planning.pdf",
    pdf: MATHS1,
    pages: range(90, 121), // printed pp 81-112; Practice sets 4.1-4.4 + Problem set 4
    answersPdf: MATHS1,
    answerPages: [182, 183, 184], // printed pp 173, 174, 175
    note: "Maharashtra State Board (Class 10) \u2014 Financial Planning (Balbharati textbook, Mathematics Part I / Algebra)",
    subtopics: [
      "Goods and Services Tax (GST)",
      "Income Tax — Assessment Year",
      "Income, Expenditure and Savings",
      "Shares — Face Value, Market Value, Brokerage",
    ],
  },

  "alg-probability-10": {
    id: "alg-probability-10",
    chapterName: "Probability", // DB spelling
    subjectName: "Algebra",
    sourceFile: "StateBoard_10_Algebra__Probability.pdf",
    pdf: MATHS1,
    pages: range(122, 137), // printed pp 113-128; Practice sets 5.1-5.4 + Problem set 5
    answersPdf: MATHS1,
    answerPages: [183, 184, 185], // printed pp 174, 175, 176
    note: "Maharashtra State Board (Class 10) \u2014 Probability (Balbharati textbook, Mathematics Part I / Algebra)",
    subtopics: [
      "Probability of an Event",
      "Sample Space and Events",
    ],
  },

  "alg-statistics-10": {
    id: "alg-statistics-10",
    chapterName: "Statistics", // DB spelling
    subjectName: "Algebra",
    sourceFile: "StateBoard_10_Algebra__Statistics.pdf",
    pdf: MATHS1,
    pages: range(138, 177), // printed pp 129-168; Practice sets 6.1-6.6 + Problem set 6
    answersPdf: MATHS1,
    answerPages: [185, 186], // printed pp 176, 177
    note: "Maharashtra State Board (Class 10) \u2014 Statistics (Balbharati textbook, Mathematics Part I / Algebra)",
    subtopics: [
      "Mean, Median and Mode of Grouped Data",
      "Median of Ungrouped Data",
      "Pictorial Representation of Statistical Data",
    ],
  },

  "geo-similarity-10": {
    id: "geo-similarity-10",
    chapterName: "Similarity", // DB spelling
    subjectName: "Geometry",
    sourceFile: "StateBoard_10_Geometry__Similarity.pdf",
    pdf: MATHS2,
    pages: range(10, 38), // printed pp 1-29; Practice sets 1.1-1.4 + Problem set 1
    answersPdf: MATHS2,
    answerPages: [173, 174], // printed pp 164, 165
    note: "Maharashtra State Board (Class 10) \u2014 Similarity (Balbharati textbook, Mathematics Part II / Geometry)",
    subtopics: [
      "Basic Proportionality Theorem",
      "Property of an Angle Bisector of a Triangle",
      "Property of Angle Bisector of a Triangle",
      "Ratio of Areas of Two Triangles",
      "Tests of Similarity of Triangles",
      "Theorem of Areas of Similar Triangles",
    ],
  },

  "geo-circle-10": {
    id: "geo-circle-10",
    chapterName: "Circle", // DB spelling
    subjectName: "Geometry",
    sourceFile: "StateBoard_10_Geometry__Circle.pdf",
    pdf: MATHS2,
    pages: range(56, 99), // printed pp 47-90; Practice sets 3.1-3.5 + Problem set 3
    answersPdf: MATHS2,
    answerPages: [174, 175], // printed pp 165, 166
    note: "Maharashtra State Board (Class 10) \u2014 Circle (Balbharati textbook, Mathematics Part II / Geometry)",
    subtopics: [
      "Arcs of a Circle",
      "Cyclic Quadrilateral",
      "Inscribed Angle and Intercepted Arc",
      "Measure of an Arc and Central Angle",
      "Tangent and Secant to a Circle",
      "Tangent Segment Theorem",
      "Theorems on Chords and Tangents",
      "Touching Circles",
    ],
  },

  "geo-constructions-10": {
    id: "geo-constructions-10",
    chapterName: "Geometric Constructions", // DB spelling
    subjectName: "Geometry",
    sourceFile: "StateBoard_10_Geometry__Geometric_Constructions.pdf",
    pdf: MATHS2,
    pages: range(100, 108), // printed pp 91-99; Practice sets 4.1-4.2 + Problem set 4
    answersPdf: MATHS2,
    answerPages: [175], // printed pp 166
    note: "Maharashtra State Board (Class 10) \u2014 Geometric Constructions (Balbharati textbook, Mathematics Part II / Geometry)",
    subtopics: [
      "Construction of a Similar Triangle",
      "Construction of a Tangent to a Circle",
      "Construction of an Angle Bisector",
      "Construction of Angle Bisector",
      "Construction of Circumcircle",
      "Construction of Incircle and Circumcircle",
      "Division of a Line Segment",
    ],
  },

  "geo-coordinate-10": {
    id: "geo-coordinate-10",
    chapterName: "Co-ordinate Geometry", // DB spelling
    subjectName: "Geometry",
    sourceFile: "StateBoard_10_Geometry__Co_ordinate_Geometry.pdf",
    pdf: MATHS2,
    pages: range(109, 132), // printed pp 100-123; Practice sets 5.1-5.3 + Problem set 5
    answersPdf: MATHS2,
    answerPages: [175, 176], // printed pp 166, 167
    note: "Maharashtra State Board (Class 10) \u2014 Co-ordinate Geometry (Balbharati textbook, Mathematics Part II / Geometry)",
    subtopics: [
      "Coordinates and Quadrants",
      "Coordinates and the Cartesian Plane",
      "Distance Formula",
      "Equation of a Line",
      "Section Formula",
      "Slope of a Line",
    ],
  },

  "geo-trigonometry-10": {
    id: "geo-trigonometry-10",
    chapterName: "Trigonometry", // DB spelling
    subjectName: "Geometry",
    sourceFile: "StateBoard_10_Geometry__Trigonometry.pdf",
    pdf: MATHS2,
    pages: range(133, 148), // printed pp 124-139; Practice sets 6.1-6.2 + Problem set 6
    answersPdf: MATHS2,
    answerPages: [176, 177], // printed pp 167, 168
    note: "Maharashtra State Board (Class 10) \u2014 Trigonometry (Balbharati textbook, Mathematics Part II / Geometry)",
    subtopics: [
      "Angle in Standard Position",
      "Heights and Distances",
      "Trigonometric Ratios and Identities",
    ],
  },

  "geo-mensuration-10": {
    id: "geo-mensuration-10",
    chapterName: "Mensuration", // DB spelling
    subjectName: "Geometry",
    sourceFile: "StateBoard_10_Geometry__Mensuration.pdf",
    pdf: MATHS2,
    pages: range(149, 172), // printed pp 140-163; Practice sets 7.1-7.4 + Problem set 7
    answersPdf: MATHS2,
    answerPages: [177], // printed pp 168
    note: "Maharashtra State Board (Class 10) \u2014 Mensuration (Balbharati textbook, Mathematics Part II / Geometry)",
    subtopics: [
      "Area of Combined Figures",
      "Area of Sector and Segment of a Circle",
      "Areas of Combined Figures",
      "Circumference of a Circle",
      "Combination of Solids and Frustum",
      "Euler's Formula",
      "Surface Area and Volume of Solids",
    ],
  },

  "pythagoras-10": {
    id: "pythagoras-10",
    chapterName: "Pythagoras Theorem", // DB spelling — matches the book's own title
    subjectName: "Geometry",
    sourceFile: "StateBoard_10_Geometry__Pythagoras_Theorem.pdf",
    pdf: MATHS2,
    pages: range(39, 55), // printed pp 30-46
    answersPdf: MATHS2,
    answerPages: [173, 174], // printed pp 164-165; ch.2 block only
    note: "Maharashtra State Board (Class 10) — Pythagoras Theorem (Balbharati textbook, Mathematics Part II / Geometry)",
    subtopics: [
      "Pythagorean Triplet",
      "Property of 30-60-90 and 45-45-90 Triangles",
      "Similarity and Right Angled Triangles",
      "Theorem of Geometric Mean",
      "Pythagoras Theorem and its Converse",
      "Application of Pythagoras Theorem",
      "Apollonius Theorem",
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
