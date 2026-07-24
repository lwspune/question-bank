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
  // `subject` is optional — only needed for NON-STANDARD compilations where the
  // Physics 1-30 / Chemistry 31-60 / Maths 61-90 position blocks don't hold (e.g.
  // the "Paper 11-16" topic compilations, which group subjects at different
  // boundaries). When set, it overrides the position-derived subject at commit.
  classification: Record<string, { subject?: string; chapter: string; subtopic: string }>;
  optionOverrides?: Record<string, Partial<Record<OptionLabel, string>>>;
  stemOverrides?: Record<string, string>; // supply/replace stem text (e.g. a match-list rendered as an image)
  answerOverrides?: Record<string, OptionLabel>; // correct the answer when the soln doc mis-keyed it (duplicate/missing number)
  numericOverrides?: Record<string, number>; // supply/correct the answer for a Section-B NAT (numeric) question
  solutionFixes?: Record<string, [string, string][]>;
  authoredSolutions?: Record<string, string>;
  // Question numbers to EXCLUDE from commit entirely (e.g. a blind-solver flagged
  // the stem/options corrupted). Filtered before the classification requirement,
  // so a committable "ok" row can be dropped without a "no classification" throw.
  skip?: number[];
};

/**
 * Whether a record should be committed: clean MCQs always, plus any question the
 * per-paper data explicitly resolves via a stem/answer override (lets us recover
 * needs_review / no_answer_key rows instead of silently dropping them).
 */
export function isCommittable(status: string, questionNumber: number, paper: PaperData): boolean {
  if (status === "ok" || status === "image_options") return true;
  const k = String(questionNumber);
  // A Section-B NAT row is committable once it has a parsed answer (status
  // 'numeric') or one supplied via a numericOverride.
  if (status === "numeric") return true;
  // NB: check for presence with `!== undefined`, not truthiness — a legitimate
  // NAT answer of 0 (or an empty-string override) must not read as "no override".
  return (
    paper.stemOverrides?.[k] !== undefined ||
    paper.answerOverrides?.[k] !== undefined ||
    paper.numericOverrides?.[k] !== undefined
  );
}

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
