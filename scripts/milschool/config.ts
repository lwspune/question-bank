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
  /** 1-based JPG numbers carrying questions, in order. Empty = pre-pass not done. */
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
  // 33 JPGs: 1 AglaSem cover, 2 booklet cover (code E, EN/VEDTRI/9/24), 3-31
  // Q1-Q150, 32-33 rough work. A clean scan, no serial watermark. Exam
  // 28.01.2024. NTA final key page 1 = code E.
  "aissee-9-2024": {
    id: "aissee-9-2024",
    exam: "aissee-9",
    paper: 1,
    sourceFile: "AISSEE_2024_Class9_CodeE.pdf",
    pagesDir: "aissee\\c9_2024_qp",
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
