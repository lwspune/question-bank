// Shared config for the Maharashtra Scholarship lane: the Maharashtra State
// Council of Examination's (MSCE, Pune) scholarship exams.
//
//   Class 5 "Pre Upper Primary" (PUP) + Class 8 "Pre Secondary" (PSS): Feb 2017
//   to Feb 2026 (Aug 2021 and Jul 2022 were the Covid-delayed sittings).
//   Class 4 "Primary" (PSE) + Class 7 "Upper Primary" (UPS): from Apr 2026, after
//   the GR of 17 Oct 2025 moved the exam back to Class 4/7.
//
// Four exams in one registry family ("MH Scholarship", split by class), the
// AISSEE / Homi Bhabha pattern. FREE (owner, 2026-11-20).
//
// THE PAPER. Two papers per class, each 75 MCQs x 2 marks = 150 marks, 90
// minutes, options printed (1)-(4) and stored A-D. Paper I: first language
// (Q1-25; English for the English medium) + Mathematics (Q26-75). Paper II:
// third language (Q1-25; MARATHI for the English medium, stored as Marathi-only
// rows) + Intelligence Test (Q26-75). Rule 5 on every paper: "Maximum 20%
// questions are having two correct alternatives" -- those are HELD (lib.ts).
// Since 2017-18 a cancelled question's marks are removed (press note).
//
// SOURCES. MSCE's own PDFs, English medium, Set A (sources.tsv has every URL
// under mscepuppss.s3.ap-south-1.amazonaws.com, harvested 2026-11-20 from
// 2026.puppssmsce.in and 2026-2.puppssmsce.in). Saved as SOURCE_ROOT/<id>.pdf,
// keys as KEY_ROOT/<id>.key.pdf. Keys are MSCE's FINAL keys: scanned tables of
// 75 rows x sets A-D; only the Set A column is read (by the main session, after
// the blind pass exists).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as every sibling pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

export const SOURCE_ROOT = process.env.MH_SCHOLARSHIP_SRC ?? "C:\\Vilas\\LWS_Pune\\MH_Scholarship\\papers";
export const KEY_ROOT = process.env.MH_SCHOLARSHIP_KEYS ?? "C:\\Vilas\\LWS_Pune\\MH_Scholarship\\keys";
/** Every source here is a PDF in SOURCE_ROOT (render.ts reads `pdf`). */
export const PDF_ROOT = SOURCE_ROOT;
/** Figure crops (uploaded to image_url), kept beside the sources. */
export const FIGURE_ROOT = process.env.MH_SCHOLARSHIP_FIGURES ?? "C:\\Vilas\\LWS_Pune\\MH_Scholarship\\figures";

export const OUT = join(__dirname, "out"); // gitignored: page renders, blind packets
export const DATA = join(__dirname, "data"); // committed: transcriptions, key reads
export const DERIVED = join(__dirname, "derived"); // committed: the blind pass

export type ExamKey = "mh-scholarship-4" | "mh-scholarship-5" | "mh-scholarship-7" | "mh-scholarship-8";

export type ExamDef = {
  /** The `exams.name` row; must match the registry's `examName` exactly. */
  name: string;
  /** Filled in from seed-exams.ts --apply. Empty = not seeded yet. */
  examId: string;
  /** catalog-<key>.json beside this file. */
  catalogFile: string;
};

// examIds created by seed-exams.ts --apply on 2026-11-20, all pass_scope 'free'.
export const EXAMS: Record<ExamKey, ExamDef> = {
  "mh-scholarship-4": { name: "MH Scholarship Class 4", examId: "2176d214-49e5-45b3-891f-87be37972724", catalogFile: "catalog-mh-scholarship-4.json" },
  "mh-scholarship-5": { name: "MH Scholarship Class 5", examId: "a1d6cc1d-c927-487a-8cf5-8622397ecc3f", catalogFile: "catalog-mh-scholarship-5.json" },
  "mh-scholarship-7": { name: "MH Scholarship Class 7", examId: "8fe4ea1a-ac15-42ea-bc05-a510d509d675", catalogFile: "catalog-mh-scholarship-7.json" },
  "mh-scholarship-8": { name: "MH Scholarship Class 8", examId: "679f7d2b-2505-4a96-8df4-9302b6e7eeca", catalogFile: "catalog-mh-scholarship-8.json" },
};

export type PaperNumber = 1 | 2;

export type Pattern = { questions: number; marks: number; minutes: number };

export type Paper = {
  id: string; // e.g. "ms8-2026-p1"; also the data/<id>.* prefix
  exam: ExamKey;
  paper: PaperNumber;
  /** questions.source_file + upload_jobs.filename (dedup / rollback key). */
  sourceFile: string;
  /** Unused here (milschool's JPG folders); kept for the copied scripts' type. */
  pagesDir: string;
  /** The English-medium booklet in SOURCE_ROOT. */
  pdf: string;
  /** 1-based PDF pages carrying questions. Empty = pre-pass not done. */
  pages: number[];
  pyqYear: number;
  pyqNote: string;
  pattern: Pattern;
  /** MSCE's final key, KEY_ROOT/<id>.key.pdf, read into data/<id>.key.json AFTER the blind pass. */
  key: { file: string; label: string; final: boolean };
  /** Question numbers deliberately NOT transcribed; coverage expects them absent. */
  held?: { numbers: number[]; why: string };
  /** Never set here (every paper is MCQ); kept for the copied scripts' type. */
  format?: "written";
  /** Never set here; kept for the copied scripts' type. */
  marathi?: { pdf: string; pages: number[] };
  retyped?: string;
};

export const MSCE: Pattern = { questions: 75, marks: 150, minutes: 90 };

const range = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
};

type Sitting = { year: number; date: string; classes: [number, number] };

/** One row per sitting; each sitting has 2 classes x 2 papers. */
const SITTINGS: Sitting[] = [
  { year: 2017, date: "February 2017", classes: [5, 8] },
  { year: 2018, date: "February 2018", classes: [5, 8] },
  { year: 2019, date: "February 2019", classes: [5, 8] },
  { year: 2020, date: "February 2020", classes: [5, 8] },
  { year: 2021, date: "August 2021", classes: [5, 8] },
  { year: 2022, date: "July 2022", classes: [5, 8] },
  { year: 2023, date: "February 2023", classes: [5, 8] },
  { year: 2024, date: "February 2024", classes: [5, 8] },
  { year: 2025, date: "February 2025", classes: [5, 8] },
  { year: 2026, date: "22 February 2026", classes: [5, 8] },
  { year: 2026, date: "26 April 2026", classes: [4, 7] },
];

/**
 * Question pages per paper, set at each paper's page pre-pass (contact sheet).
 * Empty = not done; requirePaper refuses it.
 */
const PAGES: Record<string, number[]> = {
  "ms8-2026-p1": range(2, 15), // p16 is rough work
  "ms8-2026-p2": range(2, 15),
  "ms4-2026-p1": range(2, 15),
  "ms4-2026-p2": range(2, 15),
  "ms7-2026-p1": range(2, 15),
  "ms7-2026-p2": range(2, 15),
};

/**
 * Items deliberately NOT transcribed into the bands (kept in
 * data/<id>.held-items.json for the record); coverage expects them absent.
 */
const HELD: Record<string, Paper["held"]> = {
  "ms7-2026-p2": { numbers: [42], why: "options (1) and (4) are printed identically" },
};

const PAPER_NAME: Record<PaperNumber, string> = { 1: "Paper I", 2: "Paper II" };

export const PAPERS: Record<string, Paper> = Object.fromEntries(
  SITTINGS.flatMap((s) =>
    s.classes.flatMap((cls) =>
      ([1, 2] as PaperNumber[]).map((p): [string, Paper] => {
        const id = `ms${cls}-${s.year}-p${p}`;
        return [
          id,
          {
            id,
            exam: `mh-scholarship-${cls}` as ExamKey,
            paper: p,
            sourceFile: `mh-scholarship/${id}`,
            pagesDir: "",
            pdf: `${id}.pdf`,
            pages: PAGES[id] ?? [],
            pyqYear: s.year,
            pyqNote: `MH Scholarship Class ${cls} ${PAPER_NAME[p]} (${s.date})`,
            pattern: MSCE,
            key: { file: join(KEY_ROOT, `${id}.key.pdf`), label: "MSCE's final answer key", final: true },
            held: HELD[id],
          },
        ];
      }),
    ),
  ),
);

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

/** The subjects a paper may use: Paper I = English + Mathematics, Paper II = Marathi + Intelligence Test. */
export const PAPER_SUBJECTS: Record<PaperNumber, string[]> = {
  1: ["English", "Mathematics"],
  2: ["Marathi", "Intelligence Test"],
};

export const subjectsOf = (exam: ExamKey): string[] => Object.keys(catalogFor(exam));

/** Rows a paper should end with: its pattern's questions minus any held. */
export const expectedCount = (paper: Paper, extraHeld: number[] = []): number =>
  paper.pattern.questions - new Set([...(paper.held?.numbers ?? []), ...extraHeld]).size;

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);

export const questionsJsonPath = (id: string) => dataPath(id, "merged");

/** The `pyq_note` on every row. */
export const pyqNoteFor = (p: Paper) => p.pyqNote;

/** Items the key cancelled: its `X` entries in data/<id>.key.json. */
export function withdrawnFor(id: string): number[] {
  if (!existsSync(dataPath(id, "key"))) return [];
  const key = JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as Record<string, string>;
  return Object.entries(key)
    .filter(([n, v]) => /^\d+$/.test(n) && /^(x|\*|drop|cancel(led)?|रद्द)$/i.test(String(v).trim()))
    .map(([n]) => Number(n))
    .sort((a, b) => a - b);
}
