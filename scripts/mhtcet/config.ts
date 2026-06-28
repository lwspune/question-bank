// Shared config + per-shift data loader for the MHT-CET PYQ ingestion pipeline.
//
// Source papers are LWS-typed reproductions of the real MHT-CET shifts: each .docx
// is born-digital OMML (pandoc -> LaTeX) holding all three subjects continuously
// numbered (Physics 1-50, Chemistry 51-100, Maths 101-150), with a SEPARATE
// "<paper>_AK.docx" carrying the answer letter + a worked reference solution per Q.
//
// Per-shift curated data (classification + my DERIVED answer + my DERIVED solution)
// lives in scripts/mhtcet/shifts/<shiftId>.json (committed), authored during the
// classify/derive step after extract. Generated artifacts (records JSON + extracted
// media) live under scripts/mhtcet/out/ (gitignored). The AK answer + AK solution
// are captured into the records JSON purely as a cross-check reference — they are
// NOT stored on the question; we author our own (verification = re-derivation).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
export const EXAM_ID = "70e70f9d-c20c-45c6-a346-0c914d65035d"; // MHT-CET
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f"; // admin

export type OptionLabel = "A" | "B" | "C" | "D";
export type Subject = "Physics" | "Chemistry" | "Maths";

/** One curated, derived question (authored in shifts/<shiftId>.json after extract). */
export type ShiftQuestion = {
  chapter: string;
  subtopic: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  answer: OptionLabel; // MY derived answer (the one we store)
  solution: string; // MY derived solution (LaTeX-in-\(\) convention, no raw unicode math)
  akAnswer?: OptionLabel; // the LWS answer-key letter, for the audit trail
  agreesWithAk?: boolean; // false => a reconciled disagreement (see note)
  note?: string; // reconciliation note when agreesWithAk is false, or a flaw note
  stemOverride?: string; // replace the extracted stem (figure-described / extraction fix)
  optionOverrides?: Partial<Record<OptionLabel, string>>; // patch option text
  optionImages?: boolean; // options were figures -> described in text here; skip stem-figure attach
  optionFigures?: boolean; // "which graph/structure" -> attach option images (5 imgs: stem+4; 4 imgs: 4 opts)
  figureRefIndex?: number; // which imageRef to attach as the stem figure (default 0); -1 = attach none
  flawed?: boolean; // genuinely broken printed question -> keep PRIVATE
};

export type ShiftData = {
  sourceFile: string; // questions.source_file + upload_jobs.filename (rollback/dedup key)
  pyqYear: number; // 2025
  pyqMonth: string; // "April"
  pyqNote: string; // provenance disambiguator, e.g. "19 April Shift I"
  questions: Record<string, ShiftQuestion>; // keyed by question number "1".."150"
};

/** The four 2025 April shifts — metadata + source docx paths (QP + separate AK). */
export const SHIFTS: Record<string, { sourceFile: string; pyqYear: number; pyqMonth: string; pyqNote: string; qp: string; ak: string }> = {
  "2025-apr-19-s1": {
    sourceFile: "MHT_CET_2025_Apr_19_S1.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "19 April Shift I",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/19th april shift I.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/19th april shift I_AK.docx",
  },
  "2025-apr-19-s2": {
    sourceFile: "MHT_CET_2025_Apr_19_S2.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "19 April Shift II",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/19th april shift II.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/19th april shift II_AK.docx",
  },
  "2025-apr-20-s1": {
    sourceFile: "MHT_CET_2025_Apr_20_S1.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "20 April Shift I",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/20th April shift I.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/20th April shift I_AK.docx",
  },
  "2025-apr-20-s2": {
    sourceFile: "MHT_CET_2025_Apr_20_S2.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "20 April Shift II",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/20th april shift II.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/20th april shift II_AK.docx",
  },
  "2025-apr-21-s1": {
    sourceFile: "MHT_CET_2025_Apr_21_S1.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "21 April Shift I",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/21st April Shift I.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/21st April Shift I_AK.docx",
  },
  "2025-apr-21-s2": {
    sourceFile: "MHT_CET_2025_Apr_21_S2.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "21 April Shift II",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/21st april shift II.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/21st april shift II_AK.docx",
  },
  "2025-apr-22-s1": {
    sourceFile: "MHT_CET_2025_Apr_22_S1.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "22 April Shift I",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/22nd april Shift I.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/22nd april shift I_AK.docx",
  },
  "2025-apr-22-s2": {
    sourceFile: "MHT_CET_2025_Apr_22_S2.docx", pyqYear: 2025, pyqMonth: "April", pyqNote: "22 April Shift II",
    qp: "C:/tmp/PYQPs/MHT-CET/2025/22nd april shift II.docx", ak: "C:/tmp/PYQPs/MHT-CET/2025/22nd april shift II_AK.docx",
  },
};

const OUT = join(__dirname, "out");
const SHIFTS_DIR = join(__dirname, "shifts");

export const recordsPath = (shiftId: string) => join(OUT, `${shiftId}.records.json`);
export const mediaDir = (shiftId: string) => join(OUT, "media", shiftId);
export const mdPath = (shiftId: string) => join(OUT, `${shiftId}.md`);
export const akMdPath = (shiftId: string) => join(OUT, `${shiftId}_ak.md`);

export function shiftDataPath(shiftId: string): string {
  return join(SHIFTS_DIR, `${shiftId}.json`);
}

export function loadShift(shiftId: string): ShiftData {
  const p = shiftDataPath(shiftId);
  if (!existsSync(p)) {
    throw new Error(`shift data not found: ${p}\n(author it after extract — classify + derive each of the 150 questions)`);
  }
  return JSON.parse(readFileSync(p, "utf8")) as ShiftData;
}

/** Resolve the shiftId argument (argv[N]); throws with usage if missing. */
export function requireShiftId(argv: string[], idx: number, usage: string): string {
  const id = argv[idx];
  if (!id || id.startsWith("--")) throw new Error(`missing <shiftId>. Usage: ${usage}`);
  return id;
}
