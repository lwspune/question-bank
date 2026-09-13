// Shared config for the NDA Paper I (Mathematics) PYQ ingestion pipeline.
//
// SOURCE: scanned UPSC NDA "Test Booklet — Mathematics" papers. Read off the
// 2026-2 cover: 120 items / 300 marks / 2 hours 30 minutes / one-third negative.
// That matches NDA_MATHS_PAPER in src/lib/mocks/blueprints.ts exactly
// (+2.5 / -0.83, 150 min), so a committed paper becomes a /mock sitting with no
// blueprint work.
//
// WHY THIS PIPELINE EXISTS AT ALL. The bank already holds 18 NDA Mathematics
// sittings (2017-I .. 2026-I), every one exactly 120 q. All 18 arrived as .xlsx
// through the generic /upload path and NOT ONE .xlsx IS TRACKED IN THIS REPO —
// so none of them is reconstructable, and there was no NDA-PYQ pipeline to
// extend. This is the first NDA sitting with a source of record.
//
// ZERO TEXT LAYER — and that is MEASURED, not assumed: 0 extractable characters
// across all 44 pages of 2026-2, against ~300 DPI scans. Transcription is
// VISION-ONLY with no text-first fallback anywhere.
//
// THE BOOKLET IS BILINGUAL AND RAW. Hindi and English alternate page by page.
// `englishPages` records the measured answer; rendering blind would feed ~half
// Devanagari pages to a transcription agent. See the note on englishPages below
// for how it was established and why the obvious heuristic is not enough.
//
// NO ANSWER KEY, IN ANY FORM. A UPSC question booklet never prints one and the
// official key follows the recruitment cycle by roughly a year. Every answer
// here is DERIVED by a blind pass and says so in `solution`. An external key is
// reconciled LATER by reconcile-key.ts, which never auto-applies it: this repo
// measured prep-house keys at ~2 errors per 100 on the sibling CDS Mathematics
// corpus, so a source key is evidence and not ground truth.
//
// SETS. The paper carries "For the next two (02) items that follow :" blocks
// over shared stimulus, so a question can carry `context` + `setLabel`. That is
// the established NDA shape: 456 of the 2,160 pre-existing NDA Maths PYQs (21%)
// already sit in 198 multi-question sets.
import { readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as every sibling ingestion pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "e4e753d1-c84a-45a8-93ad-6f0bf9733c95"; // NDA

/** The one subject this pipeline writes. It ALREADY EXISTS — never seed it. */
export const SUBJECT = "Mathematics";
export const SUBJECT_ID = "f32ada8a-6554-466d-b654-b1b8e1040ff2";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription + derivations

/**
 * Every question in the paper. Asserted at commit — a short paper is a finding.
 * NOT a soft count: /mock's NDA_MATHS_PAPER declares `count: 120`, so a paper
 * one question short does not degrade, it fails to build.
 */
export const QUESTIONS_PER_PAPER = 120;

/**
 * Added to the question number to produce `source_row`.
 *
 * All 18 existing NDA Mathematics sittings run source_row 2..121 — the header-row
 * offset from their .xlsx origin. /mock orders within a section by source_row so
 * any monotonic sequence would deliver the right paper, but a 19th sitting
 * numbered 1..120 would misalign every cross-sitting query that groups on it.
 */
export const SOURCE_ROW_OFFSET = 1;

export type Paper = {
  id: string; // slug; also the data/<id>.* prefix
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup / rollback key)
  pdf: string; // absolute path to the booklet PDF
  pyqYear: number;
  pyqMonth: "Apr" | "Sep"; // the bank's spelling — NOT "April"/"September"
  pyqNote: string; // "NDA 1" | "NDA 2" — the bank's spelling
  /** Booklet series letter printed on the cover, where a cover was scanned. */
  series?: string;
  /** TBC code printed on the cover and in every page footer. */
  tbc?: string;
  /**
   * 0-based PDF page indices carrying ENGLISH questions. REQUIRED for a raw
   * bilingual booklet. See the 2026-2 entry for how this one was measured.
   */
  englishPages: number[];
  /**
   * Absolute path to an external answer key, once one exists. Prep-house, not
   * UPSC. Read ONLY by reconcile-key.ts, never by commit.ts — a pipeline that
   * quietly substituted a source key would destroy the blind pass's independence.
   */
  answerKey?: string;
};

export const PAPERS: Paper[] = [
  {
    // NDA II 2026. The booklet prints no date — the sitting is taken from the
    // source filename plus this project's Apr = NDA I / Sep = NDA II convention,
    // which every one of the 18 existing sittings follows. Confirmed with the
    // user 2026-09-13. Recorded here so it can be checked rather than trusted.
    id: "2026-2",
    sourceFile: "NDA2_2026_Maths_SetA.pdf",
    pdf: "C:/Users/vilas/Downloads/NDA-2-2026-Maths-Set-A.pdf",
    pyqYear: 2026,
    pyqMonth: "Sep",
    pyqNote: "NDA 2",
    series: "A",
    tbc: "TFDD-A-HTM",
    /**
     * MEASURED, page by page, not inferred: a contact sheet of the top-left of
     * all 21 candidates was read and every one is English. Do not "optimise"
     * this into a computed parity rule.
     *
     * The obvious heuristic — Devanagari's shirorekha yields long horizontal
     * ink runs, so count them — does NOT separate this booklet. Long-run counts
     * are 42..161 on the English pages against 136..390 on the Hindi ones, and
     * those ranges OVERLAP (p08=157 and p40=161 are English; p29=136 and
     * p39=158 are Hindi). Handwriting in the margins and the scan's dark edges
     * are what push an English page up. So parity is the rule and the heuristic
     * is only corroboration — the same trap scripts/upsc/classify-pages.py
     * documents from the other direction.
     *
     * Index 0 is the cover, 43 is a coaching-institute advertisement.
     */
    englishPages: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42],
  },
];

export function requirePaper(id: string | undefined): Paper {
  const p = PAPERS.find((x) => x.id === id);
  if (!p) {
    throw new Error(`unknown paper "${id}" — known: ${PAPERS.map((x) => x.id).join(", ")}`);
  }
  return p;
}

/** data/<id>.<kind>.json — the one place the naming convention lives. */
export function dataPath(id: string, kind: string): string {
  return join(DATA, `${id}.${kind}.json`);
}

/**
 * chapter -> subtopic[]. GENERATED from the LIVE bank by dump-catalog.ts, never
 * hand-authored — it must be exactly what the database holds, because its whole
 * job is to stop commitStaged auto-creating a near-miss.
 */
export type Catalog = Record<string, string[]>;

let _catalog: Catalog | null = null;
export function catalog(): Catalog {
  if (!_catalog) {
    _catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8")) as Catalog;
  }
  return _catalog;
}
