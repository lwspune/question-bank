// Shared config for the Homi Bhabha lane: Dr. Homi Bhabha Balvaidnyanik
// Competition (Spardha), Phase I written test, Std VI and Std IX. Set by the
// Greater Bombay Science Teachers' Association (MSTA, msta.in). Two exams in one
// registry family ("Homi Bhabha", split by class), the AISSEE pattern.
//
// THE PAPER. 100 one-mark MCQs, options (A)-(D), 90 minutes, no negative marking
// printed. Std IX: Physics, Chemistry, Biology, then science GK (2024-25 Q91-100).
// Syllabus: Maharashtra State Board science books (Std IX: 60% Std 9, 20% Std 8,
// 10% Std 7, 10% GK; Std VI the same over Std 4-6).
//
// SOURCES (2026-11-19). Every paper is MSTA's OWN print, downloaded from msta.in
// (the no-transcribed-sources rule): some files are no longer linked from its
// pages but still served there, found through the Wayback Machine's list of the
// site's uploads. The originals are kept in SOURCE_ROOT under the names below;
// README.md has each file's msta.in URL. Coaching re-hosts (neevexaminfo 2011-
// 2016) are RETYPED and never used. The booklets print "Copyright reserved";
// the owner chose to ingest them (2026-11-19, "go ahead"), as MSTA posts them
// openly.
//
// KEYS. MSTA's own: the 2021 online exams print "Correct Option(s): X" (or a
// tick) under every question, and 2024-25 has a one-page key for each class
// ("ENGLISH & MARATHI": one key for both booklets). 2010, 2017 and 2018 have
// none: two blind passes + a hand check of every dispute (the RMS/CAPF method).
// 2022-23, 2023-24 and 2025-26 have keys but no booklet anywhere: kept in
// SOURCE_ROOT/keys as *-no-paper.pdf, unused.
//
// MARATHI. Every English booklet has a Marathi twin except Std VI Dec 2021; the
// Marathi is stored as a translation of the English row (MH SSC Class 10 path).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as every sibling pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

/** MSTA's original PDFs, named <paper>-<en|mr>.pdf, keys under keys/. */
export const SOURCE_ROOT = process.env.HOMI_BHABHA_SRC ?? "C:\\Vilas\\LWS_Pune\\Homi_Bhabha\\papers";
/** Every source here is a PDF in SOURCE_ROOT (render.ts reads `pdf`). */
export const PDF_ROOT = SOURCE_ROOT;
/** Figure crops (uploaded to image_url), kept beside the sources. */
export const FIGURE_ROOT = process.env.HOMI_BHABHA_FIGURES ?? "C:\\Vilas\\LWS_Pune\\Homi_Bhabha\\figures";

export const OUT = join(__dirname, "out"); // gitignored: page renders, blind packets
export const DATA = join(__dirname, "data"); // committed: transcriptions, key reads
export const DERIVED = join(__dirname, "derived"); // committed: the blind passes

export type ExamKey = "homi-bhabha-6" | "homi-bhabha-9";

export type ExamDef = {
  /** The `exams.name` row; must match the registry's `examName` exactly. */
  name: string;
  /** Filled in from seed-exams.ts --apply. Empty = not seeded yet. */
  examId: string;
  /** catalog-<key>.json beside this file. */
  catalogFile: string;
};

// examIds created by seed-exams.ts --apply on 2026-11-19, both pass_scope 'free'.
export const EXAMS: Record<ExamKey, ExamDef> = {
  "homi-bhabha-6": { name: "Homi Bhabha Class 6", examId: "f1545dd6-814f-48e6-8ef1-49d9ff714d27", catalogFile: "catalog-homi-bhabha-6.json" },
  "homi-bhabha-9": { name: "Homi Bhabha Class 9", examId: "74d9854a-a4ca-4d1b-a127-1f7d0fc61403", catalogFile: "catalog-homi-bhabha-9.json" },
};

/** The shared core is typed on a paper number; every paper here is one sitting. */
export type PaperNumber = 1;

export type Pattern = { questions: number; marks: number; minutes: number };

export type Paper = {
  id: string; // e.g. "hb-9-2024"; also the data/<id>.* prefix
  exam: ExamKey;
  paper: PaperNumber;
  /** questions.source_file + upload_jobs.filename (dedup / rollback key). */
  sourceFile: string;
  /** Unused here (milschool's JPG folders); kept for the copied scripts' type. */
  pagesDir: string;
  /** The English booklet in SOURCE_ROOT. */
  pdf: string;
  /** 1-based PDF pages carrying questions. Empty = pre-pass not done. */
  pages: number[];
  /** The Marathi booklet: file + its question pages (empty = pre-pass not done). */
  marathi?: { pdf: string; pages: number[] };
  pyqYear: number;
  pyqNote: string;
  pattern: Pattern;
  /**
   * MSTA's key. `marked`: printed under each question of the paper itself (2021
   * online exams); otherwise `file`, a one-page key in SOURCE_ROOT/keys. Read
   * into data/<id>.key.json only AFTER both blind passes exist.
   */
  key?: { marked?: true; file?: string; label: string; final: boolean };
  /** Question numbers deliberately NOT transcribed; coverage expects them absent. */
  held?: { numbers: number[]; why: string };
  /** Never set here (every paper is MCQ); kept for the copied scripts' type. */
  format?: "written";
};

const range = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
};

const HB: Pattern = { questions: 100, marks: 100, minutes: 90 };

type Def = {
  id: string;
  exam: ExamKey;
  pdf: string;
  pages: number[];
  marathi?: { pdf: string; pages: number[] };
  year: number;
  date: string;
  key?: Paper["key"];
  held?: Paper["held"];
};

// Page ranges from each booklet's contact sheet (cover = page 1). The 2017-18
// files bundle two booklets: Std IX = 2017 (p1-15) then 2018 (p16-30), Std VI =
// 2018 (p1-15) then 2017 (p16-30). Marathi pages are filled at that paper's
// Marathi pre-pass.
const DEFS: Def[] = [
  // ---- Std IX
  { id: "hb-9-2010", exam: "homi-bhabha-9", pdf: "ix-2010-en.pdf", pages: range(2, 11), marathi: { pdf: "ix-2010-mr.pdf", pages: [] }, year: 2010, date: "4 September 2010" },
  { id: "hb-9-2017", exam: "homi-bhabha-9", pdf: "ix-2017-2018-en.pdf", pages: range(2, 15), marathi: { pdf: "ix-2017-2018-mr.pdf", pages: [] }, year: 2017, date: "16 September 2017" },
  { id: "hb-9-2018", exam: "homi-bhabha-9", pdf: "ix-2017-2018-en.pdf", pages: range(17, 30), marathi: { pdf: "ix-2017-2018-mr.pdf", pages: [] }, year: 2018, date: "6 October 2018" },
  {
    id: "hb-9-2021-jan", exam: "homi-bhabha-9", pdf: "ix-2021-jan-en.pdf", pages: range(1, 26), marathi: { pdf: "ix-2021-jan-mr.pdf", pages: [] },
    year: 2021, date: "24 January 2021, online", key: { marked: true, label: "MSTA's updated answer key (ticked in the paper)", final: true },
    // MSTA's print-out pastes some stems as images wider than the page, so long
    // lines lose their right edge. Kept where the meaning survives (marked
    // "…", with a notice); Q18 loses half of both statements and cannot be
    // answered as printed.
    held: { numbers: [18], why: "MSTA's print cuts off half of both statements" },
  },
  {
    id: "hb-9-2021-nov", exam: "homi-bhabha-9", pdf: "ix-2021-nov-en.pdf", pages: range(1, 26), marathi: { pdf: "ix-2021-nov-mr.pdf", pages: [] },
    year: 2021, date: "21 November 2021, online", key: { marked: true, label: "MSTA's answer key (printed in the paper)", final: true },
  },
  {
    id: "hb-9-2021-dec", exam: "homi-bhabha-9", pdf: "ix-2021-dec-en.pdf", pages: range(1, 25), marathi: { pdf: "ix-2021-dec-mr.pdf", pages: [] },
    year: 2021, date: "19 December 2021, online", key: { marked: true, label: "MSTA's revised answer key (printed in the paper)", final: true },
  },
  {
    id: "hb-9-2024", exam: "homi-bhabha-9", pdf: "ix-2024-en.pdf", pages: range(2, 15), marathi: { pdf: "ix-2024-mr.pdf", pages: [] },
    year: 2024, date: "30 November 2024", key: { file: "keys/ix-2024-key.pdf", label: "MSTA's updated answer key", final: true },
  },
  // ---- Std VI
  { id: "hb-6-2010", exam: "homi-bhabha-6", pdf: "vi-2010-en.pdf", pages: range(2, 10), marathi: { pdf: "vi-2010-mr.pdf", pages: [] }, year: 2010, date: "4 September 2010" },
  { id: "hb-6-2017", exam: "homi-bhabha-6", pdf: "vi-2018-2017-en.pdf", pages: range(17, 30), marathi: { pdf: "vi-2018-2017-mr.pdf", pages: [] }, year: 2017, date: "16 September 2017" },
  { id: "hb-6-2018", exam: "homi-bhabha-6", pdf: "vi-2018-2017-en.pdf", pages: range(2, 15), marathi: { pdf: "vi-2018-2017-mr.pdf", pages: [] }, year: 2018, date: "6 October 2018" },
  {
    id: "hb-6-2021-nov", exam: "homi-bhabha-6", pdf: "vi-2021-nov-en.pdf", pages: range(1, 25), marathi: { pdf: "vi-2021-nov-mr.pdf", pages: [] },
    year: 2021, date: "28 November 2021, online", key: { marked: true, label: "MSTA's answer key (printed in the paper)", final: true },
  },
  {
    // No Marathi copy of this sitting on msta.in.
    id: "hb-6-2021-dec", exam: "homi-bhabha-6", pdf: "vi-2021-dec-en.pdf", pages: range(1, 26),
    year: 2021, date: "16 December 2021, online", key: { marked: true, label: "MSTA's revised answer key (printed in the paper)", final: true },
  },
  {
    id: "hb-6-2024", exam: "homi-bhabha-6", pdf: "vi-2024-en.pdf", pages: range(2, 15), marathi: { pdf: "vi-2024-mr.pdf", pages: [] },
    year: 2024, date: "30 November 2024", key: { file: "keys/vi-2024-key.pdf", label: "MSTA's answer key", final: true },
  },
];

const STD: Record<ExamKey, string> = { "homi-bhabha-6": "Std VI", "homi-bhabha-9": "Std IX" };

export const PAPERS: Record<string, Paper> = Object.fromEntries(
  DEFS.map((d): [string, Paper] => [
    d.id,
    {
      id: d.id,
      exam: d.exam,
      paper: 1,
      sourceFile: `homi-bhabha/${d.id}`,
      pagesDir: "",
      pdf: d.pdf,
      pages: d.pages,
      marathi: d.marathi,
      pyqYear: d.year,
      pyqNote: `Homi Bhabha ${STD[d.exam]} (${d.date})`,
      pattern: HB,
      key: d.key,
      held: d.held,
    },
  ]),
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

export const subjectsOf = (exam: ExamKey): string[] => Object.keys(catalogFor(exam));

/** Rows a paper should end with: its pattern's questions minus any held. */
export const expectedCount = (paper: Paper): number => paper.pattern.questions - (paper.held?.numbers.length ?? 0);

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);

/** The English transcription the Marathi path checks against. */
export const questionsJsonPath = (id: string) => dataPath(id, "merged");
export const marathiJsonPath = (id: string) => dataPath(id, "mr");
export const marathiSolutionsPath = (id: string) => dataPath(id, "mr-sol");

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
