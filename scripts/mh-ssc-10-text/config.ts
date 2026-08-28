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
// Balbharati Mathematics Part II (Geometry), 180pp. Printed page N → 0-based PDF
// index N+9, the same offset as HIST. Carries an ANSWERS section at idx 173+.
// VISION-ONLY — see the note on "pythagoras-10" below before touching it.
const MATHS2 = join(SOURCE_ROOT, "10th_Maths_Part2_SB.pdf");

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // MUST match the existing DB chapter row exactly
  subjectName: string;
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string;
  pages?: number[]; // 0-based page indices to render
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
