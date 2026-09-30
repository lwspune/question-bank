/**
 * MPSC Group B & C combined preliminary papers — the paper registry.
 *
 * SOURCE: one merged scan, `Group B & C Pre Papers 2017 to 2024.pdf` (557 pages,
 * iLovePDF), holding 14 Set-A booklets of the "सामान्य क्षमता चाचणी" (General
 * Ability Test) — 100 questions, 100 marks, 1 hour, −¼ per wrong answer
 * (booklet instruction 7) — each followed by the Commission's FINAL answer key
 * (published after the objection round). Page numbers below are 1-based PDF
 * pages, located by the booklet cover's black banner and read from each key's
 * header.
 *
 * TWO TRAPS IN THE FILE:
 *  - The 2020 Group B key (pp.127-128) sits BEFORE its paper (pp.129-168),
 *    immediately after the 2019 key — so "the key follows the paper" is not a rule.
 *  - The 2019 Group C key (pp.362-363) has NO text layer; it is transcribed by
 *    hand into data/2019-c.keytokens.json rather than extracted.
 *
 * `pyqYear` is MPSC's EXAM-YEAR label, not the sitting date: the "2020" Group B
 * exam sat on 4 Sep 2021 and both "2024" exams in 2025. The sitting date is in
 * `pyqNote`, which is what a student recognises.
 *
 * `sourceFile` is a per-paper label, not the PDF name — all 14 papers share one
 * PDF, and `source_file` is the rollback + mock-sitting key, so it must name ONE
 * paper.
 */
import { join } from "node:path";

export const SOURCE_PDF = "C:/Users/vilas/Downloads/Group B & C Pre Papers 2017 to 2024.pdf";
/**
 * The State Services (Rajyaseva) Prelims scan: 10 GS Paper I booklets, Set A,
 * 2013-2022, compiled by a coaching institute (THE ACHIEVERS MENTORSHIP header on
 * every page — never crop it into a figure). Its hand-drawn answer boxes are NOT
 * the key: each paper's key is the Commission's own FINAL key, a separate PDF
 * (mpscmaterial.com mirrors of the mpsc.gov.in files) in SSP_KEY_DIR.
 */
export const SSP_SOURCE_PDF = "C:/Users/vilas/Downloads/MPSC Rajyaseva PYQ by ACHIEVERS MENTORSHIP.pdf";
export const SSP_KEY_DIR = "C:/Users/vilas/Downloads/mpsc-ssp-final-keys";
/**
 * CSAT Paper II: each year's booklet and final key are their own PDFs from
 * mpscmaterial.com (paper-<year>.pdf, key-<year>.pdf). The file named
 * paper-2017.pdf is really the 2018 booklet (cover: G11, 8 April 2018) and no
 * 2017 booklet was on the listing, so 2017 has a key but no paper.
 */
export const SSP_CSAT_DIR = "C:/Users/vilas/Downloads/mpsc-ssp-csat";

/** The exams this pipeline writes to. Ids are printed by seed.ts --apply. */
export type ExamKey = "gbc" | "ssp";
export const EXAMS: Record<ExamKey, { name: string; id: string | null }> = {
  gbc: { name: "MPSC Group B & C Prelims", id: "583f914f-f323-42ed-ae7c-5e445ed796c3" },
  ssp: { name: "MPSC State Services Prelims", id: "a61ef55d-baf5-4e15-a4c2-2ac599519229" }, // seed.ts ssp --apply, 2026-09-27
};
/** Kept for the Group B & C callers that predate EXAMS. */
export const EXAM_NAME = EXAMS.gbc.name;
export const EXAM_ID = EXAMS.gbc.id!;

/** A paper's exam row id — refuses an exam seed.ts has not created yet. */
export function examIdFor(paper: Paper): string {
  const id = EXAMS[paper.exam].id;
  if (!id) throw new Error(`exam "${EXAMS[paper.exam].name}" has no id yet — run seed.ts --apply and paste it into EXAMS`);
  return id;
}
/** Founding tenant org + the superadmin who owns ingested content (same as every pipeline). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

export type Group = "B" | "C" | "B+C";

export type Paper = {
  id: string;
  exam: ExamKey;
  /** Group B & C only. */
  group?: Group;
  /** The scan holding the booklet. */
  sourcePdf: string;
  /** The key's own PDF, when it is not inside `sourcePdf` (then `keyPages` are its pages). */
  keyPdf?: string;
  pyqYear: number;
  /** Sitting date, ISO. */
  date: string;
  /** Printed booklet code (series + number). */
  code: string;
  /** First and last PDF page of the booklet (cover included). */
  pages: [number, number];
  keyPages: [number, number];
  /** Questions in the booklet; absent means QUESTIONS_PER_PAPER. */
  questions?: number;
  /** The fixed subject -> chapter list merge.ts holds this paper to (absent: none). */
  chapters?: Record<string, readonly string[]>;
  /** Key has no text layer — tokens are hand-transcribed. */
  keyImageOnly?: boolean;
  pyqNote: string;
  sourceFile: string;
};

const paper = (
  id: string,
  group: Group,
  pyqYear: number,
  date: string,
  code: string,
  pages: [number, number],
  keyPages: [number, number],
  label: string,
  extra: Partial<Paper> = {}
): Paper => ({
  id,
  exam: "gbc",
  group,
  sourcePdf: SOURCE_PDF,
  pyqYear,
  date,
  code,
  pages,
  keyPages,
  pyqNote: label,
  sourceFile: `MPSC-${id}-${code}`,
  ...extra,
});

export const PAPERS: Paper[] = [
  paper("2017-b", "B", 2017, "2017-07-16", "NO9", [1, 32], [33, 34], "Group B · 16 Jul 2017"),
  paper("2018-b", "B", 2018, "2018-05-13", "H11", [35, 82], [83, 84], "Group B · 13 May 2018"),
  paper("2019-b", "B", 2019, "2019-03-24", "V12", [85, 124], [125, 126], "Group B · 24 Mar 2019"),
  paper("2020-b", "B", 2020, "2021-09-04", "A14", [129, 168], [127, 128], "Group B · 4 Sep 2021"),
  paper("2021-b", "B", 2021, "2022-02-26", "U14", [169, 208], [209, 210], "Group B · 26 Feb 2022"),
  paper("2022-b", "B", 2022, "2022-10-08", "A16", [211, 250], [251, 252], "Group B · 8 Oct 2022"),
  paper("2017-c", "C", 2017, "2017-05-28", "B09", [253, 288], [289, 290], "Group C (Excise SI) · 28 May 2017"),
  paper("2018-c", "C", 2018, "2018-06-10", "J11", [292, 323], [324, 325], "Group C · 10 Jun 2018"),
  paper("2019-c", "C", 2019, "2019-06-16", "Y12", [326, 361], [362, 363], "Group C · 16 Jun 2019", {
    keyImageOnly: true,
  }),
  paper("2021-c", "C", 2021, "2022-04-03", "Y14", [364, 395], [396, 397], "Group C · 3 Apr 2022"),
  paper("2022-c", "C", 2022, "2022-11-05", "F16", [398, 429], [430, 431], "Group C · 5 Nov 2022"),
  paper("2023-bc", "B+C", 2023, "2023-04-30", "J17", [432, 471], [472, 473], "Group B & C · 30 Apr 2023"),
  paper("2024-b", "B", 2024, "2025-02-02", "H19", [474, 513], [514, 515], "Group B · 2 Feb 2025"),
  paper("2024-c", "C", 2024, "2025-06-01", "R19", [516, 555], [556, 557], "Group C · 1 Jun 2025"),
];

/**
 * The ONLY subject/chapter pairs a State Services Prelims transcription may use
 * (merge.ts refuses anything else). Fixed up front so ten papers transcribed
 * over many sessions land on one taxonomy. Subjects mirror seed.ts SUBJECTS.ssp.
 */
export const SSP_CHAPTERS: Record<string, readonly string[]> = {
  History: [
    "Ancient India", "Medieval India", "Modern India: British Rule", "Socio-Religious Reform Movements",
    "Indian National Movement", "History of Maharashtra", "Post-Independence India", "Art and Culture", "World History",
  ],
  Geography: ["Physical Geography", "Geography of India", "Geography of Maharashtra", "World Geography", "Human and Economic Geography"],
  Polity: [
    "Indian Constitution", "Union and State Government", "Judiciary", "Local Self-Government",
    "Constitutional and Statutory Bodies", "Rights, Laws and Policy",
  ],
  Economics: [
    "Indian Economy", "Economy of Maharashtra", "Planning and Development", "Money, Banking and Finance",
    "Agriculture and Rural Development", "Government Schemes and Programmes", "International Economy",
  ],
  "General Science": ["Physics", "Chemistry", "Biology", "Health and Diseases", "Science and Technology"],
  Environment: ["Ecology and Ecosystems", "Biodiversity and Conservation", "Climate Change and Pollution", "Environmental Laws and Institutions"],
  "Current Affairs": [
    "National Affairs", "International Affairs", "Maharashtra Affairs", "Awards and Honours", "Sports",
    "Science, Technology and Space", "Defence and Security", "Economy in News", "Books and Persons",
  ],
};

/**
 * State Services Prelims, GS Paper I — 100 questions, 200 marks, 2 hours, -1/4 of
 * a question's marks per wrong answer (booklet instruction 7). Page ranges are
 * 1-based pages of SSP_SOURCE_PDF, read from each booklet's cover; the scan is NOT
 * in year order (2017 precedes 2018, 2013 precedes 2014). `pyqYear` is the
 * exam-year label: the "2020" paper sat on 21 Mar 2021 and "2021" on 23 Jan 2022.
 * Dates are the final key's "परीक्षेचा दिनांक".
 */
const ssp = (pyqYear: number, date: string, code: string, pages: [number, number], label: string): Paper => ({
  id: `ssp-${pyqYear}`,
  exam: "ssp",
  pyqYear,
  date,
  code,
  pages,
  sourcePdf: SSP_SOURCE_PDF,
  keyPdf: `${SSP_KEY_DIR}/${pyqYear}.pdf`,
  keyPages: [1, 2],
  pyqNote: `GS Paper I · ${label}`,
  sourceFile: `MPSC-ssp-${pyqYear}-${code}`,
  chapters: SSP_CHAPTERS,
});

export const SSP_PAPERS: Paper[] = [
  ssp(2022, "2022-08-21", "H15", [1, 40], "21 Aug 2022"),
  ssp(2021, "2022-01-23", "O14", [41, 88], "23 Jan 2022"),
  ssp(2020, "2021-03-21", "Y13", [89, 136], "21 Mar 2021"),
  ssp(2019, "2019-02-17", "T12", [137, 184], "17 Feb 2019"),
  ssp(2017, "2017-04-02", "W08", [185, 232], "2 Apr 2017"),
  ssp(2018, "2018-04-08", "F11", [233, 276], "8 Apr 2018"),
  ssp(2016, "2016-04-10", "N07", [277, 316], "10 Apr 2016"),
  ssp(2015, "2015-04-05", "V05", [317, 364], "5 Apr 2015"),
  ssp(2013, "2013-05-18", "X01", [365, 412], "18 May 2013"),
  ssp(2014, "2014-02-02", "G03", [413, 460], "2 Feb 2014"),
];

/**
 * CSAT Paper II's fixed list. Comprehension chapters group passages by theme
 * (the subtopic is the passage title, so a passage's questions stay together);
 * the aptitude heads follow the syllabus; decision-making questions carry their
 * own marking rule (no penalty), so they are their own subject.
 */
export const SSP_CSAT_CHAPTERS: Record<string, readonly string[]> = {
  Comprehension: [
    "Society and Development", "Environment and Science", "Economy and Governance",
    "History and Culture", "Education and Personality", "Language Comprehension",
  ],
  "Reasoning and Aptitude": ["Logical Reasoning", "Analytical Ability", "General Mental Ability", "Basic Numeracy", "Data Interpretation"],
  "Decision Making": ["Decision Making and Problem Solving", "Interpersonal and Communication Skills"],
};

/**
 * State Services Prelims, CSAT Paper II — 80 questions, 200 marks, 2 hours.
 * Each booklet and key is its own PDF in SSP_CSAT_DIR; `file` is the year in
 * the booklet's file name (see SSP_CSAT_DIR for the 2018 mislabel). The key's
 * page range is its whole file (2015's runs to 3 pages).
 */
const csat = (pyqYear: number, date: string, code: string, pageCount: number, label: string, file = pyqYear): Paper => ({
  id: `ssp-csat-${pyqYear}`,
  exam: "ssp",
  pyqYear,
  date,
  code,
  pages: [1, pageCount],
  sourcePdf: `${SSP_CSAT_DIR}/paper-${file}.pdf`,
  keyPdf: `${SSP_CSAT_DIR}/key-${pyqYear}.pdf`,
  keyPages: [1, pyqYear === 2015 ? 3 : 2],
  questions: 80,
  chapters: SSP_CSAT_CHAPTERS,
  pyqNote: `CSAT Paper II · ${label}`,
  sourceFile: `MPSC-ssp-csat-${pyqYear}-${code}`,
});

export const SSP_CSAT_PAPERS: Paper[] = [
  csat(2022, "2022-08-21", "I15", 64, "21 Aug 2022"),
  csat(2021, "2022-01-23", "P14", 56, "23 Jan 2022"),
  csat(2020, "2021-03-21", "Z13", 64, "21 Mar 2021"),
  csat(2019, "2019-02-17", "U12", 56, "17 Feb 2019"),
  csat(2018, "2018-04-08", "G11", 56, "8 Apr 2018", 2017),
  csat(2016, "2016-04-10", "O07", 56, "10 Apr 2016"),
  csat(2015, "2015-04-05", "W05", 56, "5 Apr 2015"),
  csat(2014, "2014-02-02", "H03", 48, "2 Feb 2014"),
  csat(2013, "2013-05-18", "Y01", 48, "18 May 2013"),
];

/** Every paper this pipeline can load. `PAPERS` stays Group B & C only — the mock builder derives its sittings from it. */
export const ALL_PAPERS: Paper[] = [...PAPERS, ...SSP_PAPERS, ...SSP_CSAT_PAPERS];

/** The booklets on file are all Set A, so the key's first column applies. */
export const BOOKLET_SET_INDEX = 0;
export const QUESTIONS_PER_PAPER = 100;
export const questionCount = (p: Paper): number => p.questions ?? QUESTIONS_PER_PAPER;

export function requirePaper(id: string | undefined): Paper {
  const p = ALL_PAPERS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown paper "${id}" — one of: ${ALL_PAPERS.map((x) => x.id).join(", ")}`);
  return p;
}

export const DATA_DIR = join(process.cwd(), "scripts", "mpsc", "data");
export const dataPath = (id: string, kind: string) => join(DATA_DIR, `${id}.${kind}.json`);
