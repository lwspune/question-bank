// Shared config for the UPSC CAPF (Assistant Commandants) PYQ ingestion lane.
//
// SOURCE: UPSC's own scanned booklets for Paper I, "General Ability and
// Intelligence", downloaded from each year's exam page on upsc.gov.in into
// SOURCE_ROOT (2026-11-13). Paper II (General Studies, Essay and Comprehension)
// is written answers with no key and no model answers, and is out of scope.
//
//   Paper I  125 items / 250 marks / 2 hours / one-third negative
//            (+2 correct, -0.667 wrong)
//
// The booklets are the CSE shape: image scans with NO text layer, Hindi and
// English pages alternating (Hindi first, same item numbers), two columns, and
// the subject chosen per question. So this lane copies the CSE lane's I/O
// scripts and imports its pure core (`../upsc/lib`) rather than copying it.
//
// ANSWER KEYS. Only 2026 has one: UPSC's PROVISIONAL key, released 2026-07-22,
// three days after the exam (`ProvAnsKeyCAPF-26-GenAbilityIntellg-220726.pdf`).
// No official key was found for 2018-2025: none on the exam pages, none in
// search results, and a probe of the 2026 filename stem dated after each
// cycle's final result found nothing (2026-11-13). UPSC's answer-key archive
// renders empty in a browser even for exams whose keys exist, so it cannot
// settle this either way.
//
// So 2026 is the PILOT, and it is measured: two independent blind passes, then
// both are scored against the key (`keycheck.ts`). That measured accuracy is
// what decides whether 2018-2025 ship on dual-blind derivation alone.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as every sibling pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
/** `UPSC CAPF (AC)`, created by seed-exam.ts on 2026-11-13. */
export const EXAM_ID = "38e0fe2a-858e-49fe-aeda-97ed34f64e3c";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\CAPF\\papers";
export const KEY_ROOT = "C:\\Vilas\\LWS_Pune\\CAPF\\keys";

/** Papers whose key is PROVISIONAL (published before the cycle closed). */
export const PROVISIONAL_KEYS = new Set<string>(["2026"]);

/** Page index of Series A inside a key PDF. Every booklet we hold is Series A. */
export const KEY_SERIES_A_PAGE = 0;

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs, blind packets
export const DATA = join(__dirname, "data"); // committed: transcriptions, key reads
export const DERIVED = join(__dirname, "derived"); // committed: the blind passes

/** CAPF has one objective paper; kept as `1` so the shared core's types fit. */
export type PaperNumber = 1;

export const PATTERN: Record<PaperNumber, {
  questions: number;
  marks: number;
  minutes: number;
  marksPerCorrect: number;
  penaltyPerWrong: number;
  qualifying: boolean;
}> = {
  1: { questions: 125, marks: 250, minutes: 120, marksPerCorrect: 2, penaltyPerWrong: 2 / 3, qualifying: false },
};

export type Paper = {
  id: string; // the year; also the data/<id>.* prefix
  paper: PaperNumber;
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup / rollback key)
  pdf: string;
  pyqYear: number;
  pyqNote: string;
  /** 0-based English page indices, explicit per paper. Empty = pre-pass not done. */
  englishPages: number[];
  /** Effective scan resolution, measured. */
  dpi: number;
  /** The key file in KEY_ROOT, when UPSC published one. */
  keyFile?: string;
};

/** Even 0-based indices `from`..`to`: the English pages of a raw bilingual booklet. */
const evens = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i += 2) out.push(i);
  return out;
};

const paper = (year: number, englishPages: number[], dpi: number, keyFile?: string): Paper => ({
  id: String(year),
  paper: 1,
  sourceFile: `CAPF_${year}_PaperI_GAI.pdf`,
  pdf: join(SOURCE_ROOT, `CAPF_${year}_PaperI_GAI.pdf`),
  pyqYear: year,
  pyqNote: `UPSC CAPF (AC) ${year} - Paper I General Ability and Intelligence`,
  englishPages,
  dpi,
  keyFile,
});

// Source files are saved under a uniform name; UPSC's own filename is kept in
// SOURCE_URLS for provenance. `englishPages: []` = page pre-pass not done.
export const PAPERS: Record<string, Paper> = {
  // 56 pages: Hindi cover i0, Hindi/English alternating from i1, English at even
  // indices 2-50 carrying Q1-Q125 (checked: i2 opens at Q1, i50 ends at Q125),
  // rough work i51-i54, English cover i55. 300 DPI.
  "2026": paper(2026, evens(2, 50), 300, "ProvAnsKeyCAPF-26-GenAbilityIntellg-220726.pdf"),
  // Page maps below MEASURED with scripts/upsc/classify-pages.py's script
  // detector (2026-11-14), which reproduced 2026's hand-checked map exactly.
  // No key exists for these years: dual-blind + crosstab, hand check of every
  // dispute and every LOW/MED item.
  "2025": paper(2025, evens(2, 50), 300), // 56pp, like 2026
  "2024": paper(2024, evens(2, 50), 400), // 56pp
  "2023": paper(2023, evens(2, 38), 300), // 44pp: only 19 English pages
  "2022": paper(2022, evens(2, 42), 300), // 48pp
  "2021": paper(2021, evens(2, 42), 200), // 48pp
  // 48pp; i43-i46 classify as Hindi (rough-work pages with Hindi headings).
  "2020": paper(2020, evens(2, 42), 300),
  // 48pp; i37 and i41 classify as English but are ODD, breaking the
  // alternation: the CSE lane's known false positive (a Hindi page of mostly
  // numerals). The English run is the clean even sequence.
  "2019": paper(2019, evens(2, 42), 200),
  // 48pp; a strip scan (three images per page) at ~103 DPI, readable at 200.
  "2018": paper(2018, evens(2, 42), 103),
};

/** Where each booklet came from (upsc.gov.in/sites/default/files/<name>). */
export const SOURCE_URLS: Record<string, string> = {
  "2026": "QP-CAPF-Exam-2026-GENERAL-ABILITY-AND-INTELLIGENCE-200726.pdf",
  "2025": "QP-CAPF-25-GENERAL-ABILITY-INTELLIGENCE-040825.pdf",
  "2024": "QP_CAPF_2024_GEN-ABILITY-AND-INTELLI_05082024.pdf",
  "2023": "QP_CAPF_2023_GAI_07082023.pdf",
  "2022": "QP-CAPF-22-GAI-080822.pdf",
  "2021": "GENERAL ABILITY AND INTELLIGENCE_0.pdf",
  "2020": "QP-CAPF-20-Gen_Ability_Intelligence.pdf",
  "2019": "QP-CAPF-19-GEA.pdf",
  "2018": "CAPF-2018-GENERAL-ABILITY.pdf",
};

export function paperById(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}

export function requirePaper(id: string | undefined): Paper {
  const p = paperById(id);
  if (p.englishPages.length === 0) {
    throw new Error(
      `paper "${id}" has no englishPages: the page pre-pass has not been done.\n` +
        `Fill in config.ts first (raw bilingual booklets: even 0-based indices from 2).`
    );
  }
  return p;
}

export const pattern = (p: Paper) => PATTERN[p.paper];

/** subject -> chapter -> subtopic[]. Edited BY HAND; the merge gate validates against it. */
export type Catalog = Record<string, Record<string, string[]>>;

let _catalog: Catalog | null = null;
export function catalog(): Catalog {
  if (!_catalog) _catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));
  return _catalog!;
}

export const SUBJECTS = () => Object.keys(catalog());

/** Every catalog subject is legal on CAPF's one paper. */
export const subjectsFor = (_paper?: PaperNumber): string[] => SUBJECTS();

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);

export const keyPath = (id: string) => {
  const p = paperById(id);
  if (!p.keyFile) throw new Error(`paper "${id}" has no answer key`);
  return join(KEY_ROOT, p.keyFile);
};

/** The `pyq_note` on every row; a provisional key says so on the row itself. */
export function pyqNoteFor(p: Paper): string {
  if (!PROVISIONAL_KEYS.has(p.id)) return p.pyqNote;
  return (
    `${p.pyqNote}. Answer verified against UPSC's PROVISIONAL answer key ` +
    `(released 2026-07-22), not a final key. Supersede when the final key is published.`
  );
}

/** Items UPSC dropped from a paper: its key's `X` entries. */
export function withdrawnFor(id: string): number[] {
  if (!existsSync(dataPath(id, "key"))) return [];
  const key = JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as Record<string, string>;
  return Object.entries(key)
    .filter(([n, v]) => /^\d+$/.test(n) && String(v).toUpperCase() === "X")
    .map(([n]) => Number(n))
    .sort((a, b) => a - b);
}
