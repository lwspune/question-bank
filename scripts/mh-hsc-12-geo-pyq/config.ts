// Config for the MAHARASHTRA HSC Class-12 **GEOGRAPHY BOARD-PYQ** ingestion.
//
// THREE PIPELINES NOW WRITE INTO THE SAME `mh-hsc-12` EXAM, and the split is the
// point:
//   scripts/stateboard/        → Balbharati TEXTBOOK exercises + activities,
//                                question_kind='practice'. Geography's 356 rows
//                                landed there on 2026-09-24.
//   scripts/mh-hsc-12-pyq/     → Maths board PYQs, from an LWS chapterwise
//                                COMPILATION (not raw papers).
//   scripts/mh-hsc-12-geo-pyq/ → THIS: Geography board PYQs, from the RAW
//                                board question papers, question_kind='pyq'.
//
// ⚠ IT REUSES `scripts/mh-ssc-10/lib.ts`, NOT `scripts/mh-hsc-12-pyq/lib.ts`,
// and the reason is structural rather than convenience. The Maths lane's core
// (`buildPyqRecords`) takes ONE chapter for a whole file, because its source is
// a chapterwise compilation. A real board paper spans EVERY chapter of the
// syllabus, so each question must carry its OWN chapter and subtopic, validated
// per question. That is exactly `buildPaperRecords` in the Class-10 lane, whose
// docstring already names Geography as its single-subject case.
//
// ⚠ NO ANSWER KEY. A board question paper never ships one, and none of the six
// PDFs carries one. Same regime as the Geography textbook lane beside it: every
// MCQ key is DERIVED, every model answer AUTHORED, `derived_model` stamped, and
// `scripts/stateboard/audit-grounding.ts`'s shared core is the standing check.
//
// ⚠ THE BOARD RE-ASKS ITSELF, NOT THE TEXTBOOK. The prediction that stood
// here until all six papers were committed was WRONG, and the correction is the
// finding. A pre-build Jaccard sweep reported that 18% of the 188 candidate
// question texts matched a Geography TEXTBOOK row at >= 0.75 and two matched at
// 1.00, so this lane was built expecting a stream of board-vs-textbook
// collisions. MEASURED after committing all six: 5 collisions in 348 rows
// (1.4%), and all five are board-vs-BOARD — the same sub-question re-asked at a
// later sitting. ZERO board-vs-textbook. Jaccard >= 0.75 overstates because it
// ignores what `content_hash` does not: the textbook's "Donor region and
// Recipient region." carries a trailing full stop the board's copy lacks, which
// is nothing to a token-set overlap and a different hash to Postgres.
//
// `content_hash` is UNIQUE on (org_id, exam_id, content_hash) and covers stem +
// options + answer, so a textually identical question CANNOT insert twice —
// commitStaged skips it. `report-collisions.ts` names every skip and prints the
// surviving row's question_kind, which is what decides the response:
//
//   survivor kind='pyq' (all 5 so far) — the board repeated itself. The
//     survivor is ALREADY a PYQ, so /browse's PYQ filter is unaffected; only the
//     sitting note needs to record the repeat. What is lost is a RECURRENCE
//     signal, not a question.
//   survivor kind='practice' (none yet) — the TEXTBOOK holds it. THE RULING
//     (product call, 2026-09-24): the survivor STAYS practice and `pyq_note`
//     records the sitting. The cost to state whenever this corpus is counted
//     would be that /browse's PYQ filter does not surface those rows. Nothing
//     has landed in this branch, so that cost is currently ZERO — do not repeat
//     the old "under-reports by the collision rate" line as though it had.
//
// ⚠ FIVE OF THE SIX PAPERS HAVE A CLEAN TEXT LAYER; March 2025 DOES NOT.
// Measured: June-2024 7,415 chars / June-2025 7,382 / June-2026 8,009 /
// March-2024 6,517 / March-2026 6,451, against March-2025's 789 chars and 504
// images. That one is a scan and needs render + vision; the other five are
// text-first. Do not assume a uniform extraction path across the six.
//
// PAPER SHAPE (English medium, Max 80, 3 hours) — identical across all six:
//   Q1 [20] (A) Complete the chain (5) · (B) Choose the correct option (5, MCQ)
//           (C) Answer as per instructions (5: arrange / identify the incorrect /
//               odd-one-out) · (D) Write True or False (5)
//   Q2 [12] Give geographical reasons (any FOUR of 6)
//   Q3  [9] Differentiate between (any THREE of 5)
//   Q4 [11] (A) Map work (any SIX of 8) · (B) Read a graph/pie-chart and answer (5)
//   Q5 [12] Write notes (any THREE of 5)
//   Q6  [8] (A) Read a passage and answer (4) · (B) Draw diagrams (any TWO of 3)
//   Q7  [8] Answer in detail (any ONE of 2)
// INTERNAL CHOICE ("any FOUR of 6") is a paper-delivery concern, not a bank
// concern: ingest EVERY printed sub-question independently. Same rule the
// Class-10 lane states.
//
// ⚠ THESE ARE WHOLE SITTINGS, unlike the Maths compilation beside them, which
// is a chapterwise bank that "cannot back a /mock sitting". Each of these six is
// one complete paper, so this corpus COULD back /mock later. Not built here.
import { join } from "node:path";

// LWS Pune org + admin (same identities as every other ingestion pipeline).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra HSC Class 12 — the SAME exam row as the textbook corpus.
export { EXAM_ID } from "../stateboard/config";

/**
 * The model that DERIVED every MCQ key and AUTHORED every model answer on this
 * lane. Re-exported from the textbook lane deliberately: the two corpora sit on
 * the same exam and the same chapters, so a student comparing a board answer
 * with a textbook answer must not see two different provenance claims.
 *
 * EVERY row here is stamped, with no exceptions — unlike the textbook lane,
 * where the book's own printed worked solutions are left unstamped because they
 * are not ours. A board QUESTION PAPER prints no solutions at all, so there is
 * no such seam to draw and nothing on this lane belongs to anyone else.
 */
export { DERIVED_MODEL } from "../stateboard/config";

export const SOURCE_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Geography\\12th\\Question_Paper";
export const OUT = join(__dirname, "out"); // gitignored: text dumps + rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

const src = (name: string) => join(SOURCE_ROOT, name);

// ── The classification target ────────────────────────────────────────────────
// Chapter is HARD-validated per question (prevents the catch-all drift the CDS
// and NEET lanes paid for); an off-catalog subtopic is a SOFT flag. Both lists
// are the taxonomy the TEXTBOOK ingest already created and populated, read back
// from the live bank on 2026-09-24 — deliberately NOT re-invented here, so a
// board PYQ lands on the same chapter and subtopic as the textbook exercise that
// teaches it and `/browse`'s PYQ/Practice toggle separates them cleanly.
export const GEOGRAPHY_CATALOG = {
  subjectName: "Geography",
  chapters: {
    "Population: Part 1": [
      "Distribution and Density of Population",
      "Patterns of Population Distribution",
      "Physical Factors Affecting Population Distribution",
      "Human Factors Affecting Population Distribution",
      "Components of Population Change",
      "Birth Rate, Death Rate and Growth Rate",
      "Demographic Transition Theory",
    ],
    "Population: Part 2": [
      "Age Structure and Population Pyramids",
      "Demographic Dividend",
      "Sex Composition",
      "Literacy and Education",
      "Occupational Structure",
      "Rural-Urban Composition",
      "Migration: Types and Causes",
      "Impact of Migration on Population Structure",
    ],
    "Human Settlements and Land Use": [
      "Factors Affecting Human Settlements",
      "Types of Settlements",
      "Patterns of Settlements",
      "Types of Urban Settlements and Their Functions",
      "Rural Land Use",
      "Urban Land Use",
      "Rural-Urban Fringe and Suburbs",
    ],
    "Primary Economic Activities": [
      "Nature of Primary Economic Activities",
      "Hunting and Gathering",
      "Lumbering",
      "Fishing",
      "Mining",
      "Animal Husbandry",
      "Agriculture and Its Types",
    ],
    "Secondary Economic Activities": [
      "Nature of Secondary Economic Activities",
      "Physical Factors Affecting Location of Industries",
      "Economic and Other Factors Affecting Location of Industries",
      "Major Industrial Regions of the World",
      "Classification of Industries",
    ],
    "Tertiary Economic Activities": [
      "Nature of Tertiary Economic Activities",
      "Transportation and Communication",
      "Trade and Its Geographical Factors",
      "Tourism",
      "Quaternary and Quinary Activities",
    ],
    "Region and Regional Development": [
      "Concept of a Region",
      "Types of Regions",
      "Indicators of Regional Development",
      "Factors Affecting Regional Development",
      "Regional Imbalance and Its Causes",
      "Strategies to Reduce Regional Imbalance",
    ],
    "Geography: Nature and Scope": [
      "Branches of Geography",
      "Nature of Geography as a Discipline",
      "Scope of Geography and Its Links with Other Subjects",
      "Latest Trends and Careers in Geography",
    ],
  } as Record<string, string[]>,
};

export type Paper = {
  id: string; // slug → data/<id>.* + source_file
  pdf: string; // absolute path to the paper PDF
  year: number; // questions.pyq_year
  /** questions.pyq_month — the sitting. "March" | "June".
   *  ⚠ THE MONTH COMES FROM THE FILENAME, NOT FROM THE PAPER. Checked on all
   *  six: the printed header carries the YEAR and a paper code (J-970, J-214,
   *  J-427, J-314) but never a month. So "June" is what the source files are
   *  called, not something the board printed. It was very nearly recorded as
   *  "July" here on the strength of when MH HSC supplementary exams usually
   *  run — which would have been an assumption written down as a fact. If the
   *  real sitting month matters, it has to come from the board, not from us. */
  month: string;
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  note: string; // questions.pyq_note — the SITTING ID only, never a source blurb
  /** True where the PDF is a SCAN with no usable text layer, so transcription is
   *  vision-only. Measured per paper, not assumed: only March 2025 is. */
  scanned?: boolean;
};

export const PAPERS: Record<string, Paper> = {
  "geo-2024-march": {
    id: "geo-2024-march",
    pdf: src("Geog March 2024.pdf"),
    year: 2024,
    month: "March",
    sourceFile: "MH_HSC_12_Geography_2024_March.pdf",
    note: "March 2024",
  },
  "geo-2024-june": {
    id: "geo-2024-june",
    pdf: src("Geog June 2024.pdf"),
    year: 2024,
    month: "June",
    sourceFile: "MH_HSC_12_Geography_2024_June.pdf",
    note: "June 2024",
  },
  "geo-2025-march": {
    id: "geo-2025-march",
    pdf: src("Geog March 2025.pdf"),
    year: 2025,
    month: "March",
    sourceFile: "MH_HSC_12_Geography_2025_March.pdf",
    note: "March 2025",
    scanned: true, // 789 text chars across 8 pages, 504 images — the only scan
  },
  "geo-2025-june": {
    id: "geo-2025-june",
    pdf: src("Geog June 2025.pdf"),
    year: 2025,
    month: "June",
    sourceFile: "MH_HSC_12_Geography_2025_June.pdf",
    note: "June 2025",
  },
  "geo-2026-march": {
    id: "geo-2026-march",
    pdf: src("Geog March 2026.pdf"),
    year: 2026,
    month: "March",
    sourceFile: "MH_HSC_12_Geography_2026_March.pdf",
    note: "March 2026",
  },
  "geo-2026-june": {
    id: "geo-2026-june",
    pdf: src("Geog June 2026.pdf"),
    year: 2026,
    month: "June",
    sourceFile: "MH_HSC_12_Geography_2026_June.pdf",
    note: "June 2026",
  },
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}
