// Shared config for the military-school entrance lane: AISSEE (Sainik Schools,
// Class 6 and 9), RMS CET (Rashtriya Military Schools, Class 6 and 9) and RIMC
// (Rashtriya Indian Military College, Class 8). One lane, five exams.
//
// SOURCES (owner, 2026-11-17: "lets use 3p"). No body publishes these papers
// openly: NTA shows the AISSEE booklet and key only behind each candidate's login
// for ~3 days, the RMS site has neither, and RIMC sells its old papers as a
// booklet. So every paper here is a third-party RE-HOST (AglaSem) of the ORIGINAL
// print, checked page by page to be a scan or photo of the printed booklet, never
// a retyped copy (the no-transcribed-sources rule). AglaSem serves each document
// as page JPGs (`cdn.aglasem.com/aglasem-doc/<docId>/<n>.jpg`, page 1 = its own
// cover); `docId` below is that id, so any page can be fetched again.
//
// ANSWER KEYS. AISSEE 2022-2026 have NTA's own FINAL key (on NTA letterhead, one
// page per test-booklet code, options numbered 1-4, "DROP" for a withdrawn item,
// "1,2" where two options were accepted). AISSEE 2020-2021, RMS and RIMC have no
// key: two blind passes + a hand check of every dispute, as the CAPF lane did.
//
// FREE (owner, 2026-11-17): "those papers are free for our users", so every exam
// here is passScope "free" in the registry and `pass_scope = 'free'` on its row.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as every sibling pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

/** Where the downloaded page JPGs live: <root>/<exam folder>/<paper folder>/NN.jpg. */
export const SOURCE_ROOT = process.env.MILSCHOOL_SRC ?? "C:\\Vilas\\LWS_Pune\\Sainik_Schools\\papers";
/** AglaSem's original PDFs (`<docId>/<docId>.pdf`), 2-3x sharper than the viewer JPGs. */
export const PDF_ROOT = join(SOURCE_ROOT, "_pdf");
/** Figure crops (uploaded to image_url), kept beside the sources. */
export const FIGURE_ROOT = process.env.MILSCHOOL_FIGURES ?? "C:\\Vilas\\LWS_Pune\\Sainik_Schools\\figures";

export const OUT = join(__dirname, "out"); // gitignored: column crops, blind packets
export const DATA = join(__dirname, "data"); // committed: transcriptions, key reads
export const DERIVED = join(__dirname, "derived"); // committed: the blind passes

export type ExamKey = "aissee-6" | "aissee-9" | "rms-cet-6" | "rms-cet-9" | "rimc";

export type ExamDef = {
  /** The `exams.name` row; must match the registry's `examName` exactly. */
  name: string;
  /** Filled in from seed-exams.ts --apply. Empty = not seeded yet. */
  examId: string;
  /** catalog-<key>.json beside this file. */
  catalogFile: string;
};

export const EXAMS: Record<ExamKey, ExamDef> = {
  // examIds created by seed-exams.ts --apply on 2026-11-17, every row pass_scope 'free'.
  "aissee-6": { name: "AISSEE Class 6", examId: "e429fa88-bc37-459b-a6fb-bd7511ca2e12", catalogFile: "catalog-aissee-6.json" },
  "aissee-9": { name: "AISSEE Class 9", examId: "b709a178-cf08-4e9d-a1c2-03041ac187a0", catalogFile: "catalog-aissee-9.json" },
  "rms-cet-6": { name: "RMS CET Class 6", examId: "c2ca374a-966d-42c8-b5a9-d53308ae3e74", catalogFile: "catalog-rms-cet-6.json" },
  "rms-cet-9": { name: "RMS CET Class 9", examId: "f39ca028-fe83-476d-adb1-a30a77d3f5b4", catalogFile: "catalog-rms-cet-9.json" },
  rimc: { name: "RIMC", examId: "37ffb745-d817-4b47-b1a2-57ae2a3a0536", catalogFile: "catalog-rimc.json" },
};

/** The shared core is typed on a paper number; every paper here is one sitting. */
export type PaperNumber = 1;

export type Pattern = { questions: number; marks: number; minutes: number };

export type Paper = {
  id: string; // e.g. "aissee-9-2025"; also the data/<id>.* prefix
  exam: ExamKey;
  paper: PaperNumber;
  /** questions.source_file + upload_jobs.filename (dedup / rollback key). */
  sourceFile: string;
  /** Folder under SOURCE_ROOT holding the page JPGs. */
  pagesDir: string;
  /**
   * The original PDF in PDF_ROOT. When set, pages render from it (the viewer
   * JPGs drop thin strokes). aissee-9-2025 keeps its JPGs: its figure regions
   * were drawn on those renders.
   */
  pdf?: string;
  /** 1-based page numbers carrying questions (JPG n = PDF page n). Empty = pre-pass not done. */
  pages: number[];
  /** AglaSem document id of the booklet. */
  docId: string;
  pyqYear: number;
  pyqNote: string;
  pattern: Pattern;
  /** NTA's key: its folder under SOURCE_ROOT, and the JPG carrying this booklet's code. */
  key?: { dir: string; page: number; code: string; docId: string; final: boolean };
};

const range = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
};

// AISSEE Class 9 (NTA era): Maths 50 x 4 + Intelligence, English, General
// Science, Social Science 25 x 2 = 150 q / 400 marks / 180 min, no negative
// marking (printed on the 2025 booklet's cover).
const AISSEE_9: Pattern = { questions: 150, marks: 400, minutes: 180 };
// AISSEE Class 6 (NTA era): Language 25 x 2, Mathematics 50 x 3, Intelligence
// 25 x 2, General Knowledge 25 x 2 = 125 q / 300 marks / 150 min, no negative
// marking (printed on the 2024 booklet's cover). We take the ENGLISH-medium
// booklet: 2023 and 2025's copies are Hindi-medium (Hindi language section).
const AISSEE_6: Pattern = { questions: 125, marks: 300, minutes: 150 };

export const PAPERS: Record<string, Paper> = {
  // 33 JPGs: 1 AglaSem cover, 2 booklet cover (code H, APR-9-25), 3 its back,
  // 4-31 Q1-Q150, 32 rough work, 33 blank. Exam 05.04.2025. NTA final key page 4
  // = code H (checked: Q3, Q4, Q5 solved by hand match it).
  "aissee-9-2025": {
    id: "aissee-9-2025",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2025_Class9_CodeH.pdf",
    pagesDir: "aissee\\c9_2025_qp",
    pages: range(4, 31),
    docId: "48646d90-859b-11f1-9aae-0aa932765c8b",
    pyqYear: 2025,
    pyqNote: "AISSEE 2025 Class 9 (5 April 2025, booklet code H)",
    pattern: AISSEE_9,
    key: { dir: "aissee\\c9_2025_key", page: 4, code: "H", docId: "3bddf58c-859b-11f1-84d4-0aa932765c8b", final: true },
  },
  // 31 PDF pages: 1 AglaSem cover, 2-29 Q1-Q150 (booklet "Set X", PA0926/X; no
  // booklet cover in the scan), 30-31 a COACHING institute's answer table (not
  // NTA's: never used). Options carry someone's grey highlighting: ignored.
  // Exam 18.01.2026. NTA final key: digital PDF, page 2 = BOOK X, read from its
  // text layer (two cells accept two options: Q85 1,4 and Q117 1,2).
  "aissee-9-2026": {
    id: "aissee-9-2026",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2026_Class9_SetX.pdf",
    pagesDir: "aissee\\c9_2026_qp",
    pdf: "aissee_c9_2026_qp.pdf",
    pages: range(2, 29),
    docId: "4c4e225c-859b-11f1-906c-0aa932765c8b",
    pyqYear: 2026,
    pyqNote: "AISSEE 2026 Class 9 (18 January 2026, booklet Set X)",
    pattern: AISSEE_9,
    key: { dir: "_pdf\\aissee_c9_2026_key.pdf", page: 2, code: "X", docId: "3def1a0e-859b-11f1-8c57-0aa932765c8b", final: true },
  },
  // A DIGITAL PDF with a text layer (NTA's own typeset file), 28 pages: 1 cover
  // instructions, 2-26 Q1-Q150, 27-28 rough work. Booklet D (AMAR/ENG). The 2022
  // SECTION ORDER differs from later years: Maths 1-50, English 51-75, General
  // Science 76-100, Social Science 101-125, Intelligence 126-150. Exam
  // 09.01.2022. NTA final key page 2 = Book Code D; its legend (F = 3,4 and
  // J = 2,3,4) is stored as NTA's meaning (Q112 2,3,4; Q116 3,4).
  "aissee-9-2022": {
    id: "aissee-9-2022",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2022_Class9_CodeD.pdf",
    pagesDir: "aissee\\c9_2022_qp",
    pdf: "aissee_c9_2022_qp.pdf",
    pages: range(2, 26),
    docId: "b62d1b9e-a68c-11ec-9c99-0a5e36bc6706",
    pyqYear: 2022,
    pyqNote: "AISSEE 2022 Class 9 (9 January 2022, booklet D)",
    pattern: AISSEE_9,
    key: { dir: "_pdf\\aissee_c9_2022_key.pdf", page: 2, code: "D", docId: "8e51f9ea-d518-11f1-8d5f-0aa932765c8b", final: true },
  },
  // NTA's own typeset PDF (RAMA/ENG+HIN), 36 pages, SINGLE column. Booklet D.
  // Pages 2-5 are the English Language section (Q1-25); from Mathematics on,
  // each item is printed twice on facing pages, Hindi on the EVEN page and
  // English on the ODD page, so only odd pages 7-33 are used. The 2022 SECTION
  // ORDER differs: Language 1-25, Maths 26-75, General Knowledge 76-100,
  // Intelligence 101-125. Exam 09.01.2022. Key page 10 = Book D, English.
  "aissee-6-2022": {
    id: "aissee-6-2022",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2022_Class6_BookD.pdf",
    pagesDir: "aissee\\c6_2022_qp",
    pdf: "aissee_c6_2022_qp.pdf",
    pages: [2, 3, 4, 5, ...range(7, 33).filter((n) => n % 2 === 1)],
    docId: "b62aa53a-a68c-11ec-9136-0a5e36bc6706",
    pyqYear: 2022,
    pyqNote: "AISSEE 2022 Class 6 (9 January 2022, booklet D, English)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2022_key.pdf", page: 10, code: "D", docId: "70888410-d518-11f1-8f07-0aa932765c8b", final: true },
  },
  // 33 PDF pages: 1 AglaSem cover, 2 booklet cover (code A, EN/HOLAB/6/24,
  // English medium), 3-31 Q1-Q125, 32 rough work, 33 instructions. Language
  // section English in both columns; from Mathematics on, English LEFT and
  // Hindi RIGHT. Exam 28.01.2024. NTA final key (digital) page 10 = code A.
  "aissee-6-2024": {
    id: "aissee-6-2024",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2024_Class6_CodeA.pdf",
    pagesDir: "aissee\\c6_2024_qp",
    pdf: "aissee_c6_2024_qp.pdf",
    pages: range(3, 31),
    docId: "357aacf0-cb9b-11ef-adce-0a5e36bc6706",
    pyqYear: 2024,
    pyqNote: "AISSEE 2024 Class 6 (28 January 2024, booklet A, English)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2024_key.pdf", page: 10, code: "A", docId: "7bdcb06c-cb9b-11ef-afa7-0a5e36bc6706", final: true },
  },
  // 29 PDF pages: 1 AglaSem cover, 2-29 Q1-Q125 (booklet Q, PA0626/Q, English
  // medium). From the Maths section on, each page prints English in the LEFT
  // column and the same item in Hindi on the right: transcribe English only.
  // A reader circled options in pen: ignored. Exam 18.01.2026. NTA final key
  // (digital) page 10 = BOOK Q (English).
  "aissee-6-2026": {
    id: "aissee-6-2026",
    exam: "aissee-6",
    paper: 1,
    sourceFile: "AISSEE_2026_Class6_BookQ.pdf",
    pagesDir: "aissee\\c6_2026_qp",
    pdf: "aissee_c6_2026_qp.pdf",
    pages: range(2, 29),
    docId: "4a1d7014-859b-11f1-a65e-0aa932765c8b",
    pyqYear: 2026,
    pyqNote: "AISSEE 2026 Class 6 (18 January 2026, booklet Q, English)",
    pattern: AISSEE_6,
    key: { dir: "_pdf\\aissee_c6_2026_key.pdf", page: 10, code: "Q", docId: "3d233a38-859b-11f1-9978-0aa932765c8b", final: true },
  },
  // 33 JPGs: 1 AglaSem cover, 2 booklet cover (code E, EN/VEDTRI/9/24), 3-31
  // Q1-Q150, 32-33 rough work. A clean scan, no serial watermark. Exam
  // 28.01.2024. NTA final key page 1 = code E.
  "aissee-9-2024": {
    id: "aissee-9-2024",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2024_Class9_CodeE.pdf",
    pagesDir: "aissee\\c9_2024_qp",
    pdf: "aissee_c9_2024_qp.pdf",
    pages: range(3, 31),
    docId: "7a055e60-cb9b-11ef-afa1-0a5e36bc6706",
    pyqYear: 2024,
    pyqNote: "AISSEE 2024 Class 9 (28 January 2024, booklet code E)",
    pattern: AISSEE_9,
    key: { dir: "aissee\\c9_2024_key", page: 1, code: "E", docId: "7bdcc9c6-cb9b-11ef-8ca5-0a5e36bc6706", final: true },
  },
};

export function paperById(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}

export function requirePaper(id: string | undefined): Paper {
  const p = paperById(id);
  if (p.pages.length === 0) throw new Error(`paper "${id}" has no pages: do the page pre-pass in config.ts first.`);
  return p;
}

export const pattern = (p: Paper) => p.pattern;

export function examOf(p: Paper): ExamDef & { key: ExamKey } {
  return { ...EXAMS[p.exam], key: p.exam };
}

/** The exam id, refusing an unseeded exam (it would write rows with no exam). */
export function examIdOf(p: Paper): string {
  const id = EXAMS[p.exam].examId;
  if (!id) throw new Error(`${EXAMS[p.exam].name} has no examId: run seed-exams.ts --apply and paste it into config.ts`);
  return id;
}

/** subject -> chapter -> subtopic[]. Edited BY HAND; the merge gate validates against it. */
export type Catalog = Record<string, Record<string, string[]>>;

const _catalogs = new Map<ExamKey, Catalog>();
export function catalogFor(exam: ExamKey): Catalog {
  if (!_catalogs.has(exam)) {
    _catalogs.set(exam, JSON.parse(readFileSync(join(__dirname, EXAMS[exam].catalogFile), "utf8")));
  }
  return _catalogs.get(exam)!;
}

export const subjectsOf = (exam: ExamKey): string[] => Object.keys(catalogFor(exam));

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);

export const pagePath = (p: Paper, n: number) => join(SOURCE_ROOT, p.pagesDir, `${String(n).padStart(2, "0")}.jpg`);

export function keyImagePath(p: Paper): string {
  if (!p.key) throw new Error(`paper "${p.id}" has no answer key`);
  return join(SOURCE_ROOT, p.key.dir, `${String(p.key.page).padStart(2, "0")}.jpg`);
}

/** The `pyq_note` on every row. */
export const pyqNoteFor = (p: Paper) => p.pyqNote;

/** Items the key dropped: its `X` entries in data/<id>.key.json. */
export function withdrawnFor(id: string): number[] {
  if (!existsSync(dataPath(id, "key"))) return [];
  const key = JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as Record<string, string>;
  return Object.entries(key)
    .filter(([n, v]) => /^\d+$/.test(n) && String(v).toUpperCase() === "X")
    .map(([n]) => Number(n))
    .sort((a, b) => a - b);
}
