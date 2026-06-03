// Shared config + per-paper data loader for the JEE Mains ingestion pipeline.
//
// Per-paper curated data lives in scripts/jee/papers/<paperId>.json (committed),
// authored during the classification step after extract. Generated artifacts
// (records JSON + extracted media) live under scripts/jee/out/ (gitignored).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
export const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679"; // JEE Mains
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f"; // admin

export type OptionLabel = "A" | "B" | "C" | "D";

export type PaperData = {
  sourceFile: string; // questions.source_file + upload_jobs.filename (rollback/dedup key)
  pyqYear: number;
  pyqNote: string; // provenance disambiguator (year is carried separately)
  classification: Record<string, { chapter: string; subtopic: string }>;
  optionOverrides?: Record<string, Partial<Record<OptionLabel, string>>>;
  solutionFixes?: Record<string, [string, string][]>;
  authoredSolutions?: Record<string, string>;
};

const OUT = join(__dirname, "out");
const PAPERS = join(__dirname, "papers");

export const recordsPath = (paperId: string) => join(OUT, `${paperId}.records.json`);
export const mediaDir = (paperId: string) => join(OUT, "media", paperId);
export const mdPath = (paperId: string) => join(OUT, `${paperId}.md`);
export const solnMdPath = (paperId: string) => join(OUT, `${paperId}_soln.md`);

export function paperDataPath(paperId: string): string {
  return join(PAPERS, `${paperId}.json`);
}

export function loadPaper(paperId: string): PaperData {
  const p = paperDataPath(paperId);
  if (!existsSync(p)) {
    throw new Error(`paper data not found: ${p}\n(author it after extract — see papers/2021-p1.json for the shape)`);
  }
  return JSON.parse(readFileSync(p, "utf8")) as PaperData;
}

/** Resolve the paperId argument (argv[N]); throws with usage if missing. */
export function requirePaperId(argv: string[], idx: number, usage: string): string {
  const id = argv[idx];
  if (!id || id.startsWith("--")) throw new Error(`missing <paperId>. Usage: ${usage}`);
  return id;
}
