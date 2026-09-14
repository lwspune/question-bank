// Shared config for the NDA Paper II (GAT) PYQ ingestion pipeline.
//
// SOURCE: scanned UPSC NDA "General Ability Test" booklets. 150 items / 600 marks
// / 2 hours 30 minutes / one-third negative, matching NDA_GAT_PAPER in
// src/lib/mocks/blueprints.ts exactly (+4 / -1.33, 150 min, sections english 50 +
// gk 100), so a committed paper becomes a /mock sitting with no blueprint work.
//
// WHY THIS IS A SEPARATE PIPELINE FROM scripts/nda-pyq. That one is Mathematics
// at MODULE level -- one `SUBJECT`, one `SUBJECT_ID`, a two-level catalog and
// `QUESTIONS_PER_PAPER = 120`. A GAT paper carries NINE subjects and decides
// `subject` per question, which makes the catalog three levels: a TYPE change,
// the same criterion cds-maths used when it forked from cds-gs. lib.ts still
// re-exports seven of the nine shared pure functions verbatim.
//
// ZERO TEXT LAYER in both booklets -- MEASURED, not assumed: 0 extractable
// characters across all 26 pages of Set A and all 45 of Set D. Transcription is
// VISION-ONLY with no text-first fallback anywhere.
//
// NO ANSWER KEY. A UPSC question booklet never prints one. Every answer here is
// DERIVED by a blind pass and says so in `solution`; an external key is
// reconciled LATER by reconcile-key.ts, which never auto-applies it. Rows commit
// PRIVATE and stay there until that reconciliation, because /mock grades real
// students against a FROZEN score and a later key fix would need every prior
// attempt re-graded by hand.
//
// AND THE RECONCILIATION IS NOT THE MATHS ONE. On NDA Mathematics 2026-II all
// three key disagreements resolved AGAINST the key, because a maths answer is
// derivable from the printed page. A GK fact is not -- "which committee
// recommended constitutional recognition for local bodies" has no derivation,
// only recall, where a single blind pass measures ~94% in this repo. So on the
// 100 GK questions the KEY is the stronger source and the default on a
// disagreement is to defer to it unless it is self-refuting. English sits in
// between. See reconcile-key.ts, which prints the section a row belongs to for
// exactly this reason.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { GatCatalog } from "./lib";

// LWS Pune org + admin (same as every sibling ingestion pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "e4e753d1-c84a-45a8-93ad-6f0bf9733c95"; // NDA

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription + derivations

/**
 * Every question in the paper. Asserted at commit -- a short paper is a finding.
 * NOT a soft count: /mock's NDA_GAT_PAPER declares english 50 + gk 100, so a
 * paper one question short does not degrade, it fails to build.
 */
export const QUESTIONS_PER_PAPER = 150;

/**
 * Added to the question number to produce `source_row`.
 *
 * All 18 existing NDA GAT sittings run source_row 2..151 -- the header-row offset
 * from their .xlsx origin, verified against the bank. /mock orders within a
 * section by source_row, so any monotonic sequence would deliver the right
 * paper, but a 19th sitting numbered 1..150 would misalign every cross-sitting
 * query that groups on it.
 */
export const SOURCE_ROW_OFFSET = 1;

/**
 * One ENGLISH page of a booklet, as it must be rendered for a transcription
 * agent.
 *
 * `printed` is the page number in the booklet's own footer, e.g. `( 23 - A )`.
 * It is recorded rather than computed BECAUSE it is the check: every agent is
 * told to read the footer of each page it was given and report it back, and on
 * the sibling Mathematics job that check is what caught a page list that had
 * been derived from a parity holding only at the FRONT of the booklet. A page
 * list is not a formula.
 */
export type PageRef = {
  /** 0-based PDF page index. */
  idx: number;
  /** Which half of a two-page spread, once rotated into reading orientation. */
  half?: "L" | "R";
  /** The page number printed in the booklet's footer. */
  printed: number;
};

export type Booklet = {
  /** Booklet series letter, printed on the cover AND in every page number. */
  series: string;
  pdf: string;
  /** Degrees to rotate before reading. 270 for a booklet photographed sideways. */
  rotate?: number;
  /** True when ONE image holds a SPREAD of two printed pages. */
  spread?: boolean;
  pages: PageRef[];
  /** Printed pages absent from this scan, with what they cost. */
  missing?: { printed: number[]; note: string };
  /**
   * An EARLIER scan of this same booklet that some committed bands were read
   * from, once a better one supersedes it.
   *
   * Recorded rather than deleted because a band file's provenance is a claim
   * about which photograph an agent actually read, and silently repointing `pdf`
   * would make every earlier band report ("printed pages 2, 3, 6, 7") describe a
   * file it never opened.
   */
  priorScan?: { pdf: string; note: string };
};

export type Paper = {
  id: string; // slug; also the data/<id>.* prefix
  sourceFile: string; // questions.source_file (dedup / rollback key)
  pyqYear: number;
  pyqMonth: "Apr" | "Sep"; // the bank's spelling -- NOT "April"/"September"
  pyqNote: string; // "NDA 1" | "NDA 2" -- the bank's spelling
  /** TBC code printed on the cover and in every page footer. */
  tbc?: string;
  /** The series that is INGESTED -- its question order is the bank's order. */
  base: Booklet;
  /**
   * Sibling series of the same paper.
   *
   * A variant is NEVER ingested -- the four series hold the SAME 150 questions in
   * a different ORDER, so `content_hash` would dedup every row against the base
   * and forcing them in would mean 450 duplicate questions. What a variant
   * produces is a committed MAPPING (data/<id>-<S>.map.json): variant question
   * number -> base question number, plus the mapping of its option LABELS. That
   * map is what makes a four-series solution document possible, and it is also
   * an independent second reading of every option -- the fidelity check.
   */
  variants: Booklet[];
  /**
   * Absolute path to an external answer key, once one exists. Prep-house, not
   * UPSC. Read ONLY by reconcile-key.ts, never by commit.ts -- a pipeline that
   * quietly substituted a source key would destroy the blind pass's independence.
   */
  answerKey?: string;
};

/**
 * Set A -- the base. 26 images, 23 of them content.
 *
 * MEASURED page structure, read off the footers, not inferred:
 *   - idx 0 is the cover (series "A" stamped, TFDD-B-AGT), 24 and 25 are
 *     coaching-institute advertisements.
 *   - idx 1..23 are SPREADS of two printed pages, photographed SIDEWAYS.
 *     Rotation is 270, not 90 -- at 90 the text renders upside down.
 *   - After rotation the LEFT half is the even page and the RIGHT half the odd
 *     one, so spread i carries printed pages 2i and 2i+1. Verified at both ends:
 *     idx 1 = (2-A)|(3-A), idx 23 = (46-A)|(47-A).
 *
 * THE BILINGUAL RULE IS NOT A PARITY, and getting this wrong hands an agent
 * Devanagari:
 *   - PART A (English, Q1-50) is printed in ENGLISH ONLY -- it is an English
 *     test, so UPSC prints no Hindi counterpart. Pages 2-7 are six CONSECUTIVE
 *     English pages.
 *   - PART B (General Knowledge, Q51-150) alternates, even = Hindi and
 *     odd = English, pages 8-47.
 * So the English pages are 2,3,4,5,6,7 then every ODD page 9..47 -- 26 in all,
 * against 20 Hindi pages. Anything that assumes one parity across the whole
 * booklet is wrong for the first six pages.
 */
const SET_A: Booklet = {
  series: "A",
  pdf: "C:/Users/vilas/Downloads/NDA-2-2026-GAT-Set-A.pdf",
  rotate: 270,
  spread: true,
  pages: [
    // Part A -- both halves of the first three spreads.
    { idx: 1, half: "L", printed: 2 },
    { idx: 1, half: "R", printed: 3 },
    { idx: 2, half: "L", printed: 4 },
    { idx: 2, half: "R", printed: 5 },
    { idx: 3, half: "L", printed: 6 },
    { idx: 3, half: "R", printed: 7 },
    // Part B -- the odd (English) half only.
    { idx: 4, half: "R", printed: 9 },
    { idx: 5, half: "R", printed: 11 },
    { idx: 6, half: "R", printed: 13 },
    { idx: 7, half: "R", printed: 15 },
    { idx: 8, half: "R", printed: 17 },
    { idx: 9, half: "R", printed: 19 },
    { idx: 10, half: "R", printed: 21 },
    { idx: 11, half: "R", printed: 23 },
    { idx: 12, half: "R", printed: 25 },
    { idx: 13, half: "R", printed: 27 },
    { idx: 14, half: "R", printed: 29 },
    { idx: 15, half: "R", printed: 31 },
    { idx: 16, half: "R", printed: 33 },
    { idx: 17, half: "R", printed: 35 },
    { idx: 18, half: "R", printed: 37 },
    { idx: 19, half: "R", printed: 39 },
    { idx: 20, half: "R", printed: 41 },
    { idx: 21, half: "R", printed: 43 },
    { idx: 22, half: "R", printed: 45 },
    { idx: 23, half: "R", printed: 47 },
  ],
};

/**
 * Set D -- the fidelity check, and the second half of a four-series solution
 * document.
 *
 * 45 images: idx 0 is the cover (series "D"), 43 and 44 are advertisements, and
 * idx 1..42 are ONE printed page each, UPRIGHT -- no rotation, no spread. Its
 * photographs are roughly 1.3x the linear resolution of Set A's and are
 * materially cleaner, which matters twice: it makes this pass cheap, and it
 * makes Set D the place to re-read any Set A region that is defocused near the
 * binding (see FIDELITY_BRIEF.md, which permits that ONLY after a question has
 * been matched on independently legible content).
 *
 * FOUR PRINTED PAGES ARE ABSENT, so the index -> page offset steps THREE times:
 * printed = idx+1 up to idx 2, idx+3 from idx 3, idx+4 at idx 31 alone, and
 * idx+5 from idx 32. Read off the footers page by page, not derived -- the
 * anchors are idx 2 = (3-D), idx 3 = (6-D), idx 30 = (33-D), idx 31 = (35-D),
 * idx 32 = (37-D), idx 42 = (47-D).
 */
const SET_D: Booklet = {
  series: "D",
  pdf: "C:/Users/vilas/Downloads/NDA-NAII-2026-GAT-SET-D-Question-Paper.pdf",
  // ONE printed page per image, landscape, ENGLISH ONLY -- a curated scan of
  // exactly the 26 English pages and nothing else, so `printed` is simply the
  // English page list in order and no Hindi verso is ever rendered.
  pages: [
    // Part A -- six consecutive English pages.
    { idx: 0, printed: 2 },
    { idx: 1, printed: 3 },
    { idx: 2, printed: 4 },
    { idx: 3, printed: 5 },
    { idx: 4, printed: 6 },
    { idx: 5, printed: 7 },
    // Part B -- the odd (English) pages.
    { idx: 6, printed: 9 },
    { idx: 7, printed: 11 },
    { idx: 8, printed: 13 },
    { idx: 9, printed: 15 },
    { idx: 10, printed: 17 },
    { idx: 11, printed: 19 },
    { idx: 12, printed: 21 },
    { idx: 13, printed: 23 },
    { idx: 14, printed: 25 },
    { idx: 15, printed: 27 },
    { idx: 16, printed: 29 },
    { idx: 17, printed: 31 },
    { idx: 18, printed: 33 },
    { idx: 19, printed: 35 },
    { idx: 20, printed: 37 },
    { idx: 21, printed: 39 },
    { idx: 22, printed: 41 },
    { idx: 23, printed: 43 },
    { idx: 24, printed: 45 },
    { idx: 25, printed: 47 },
  ],
  priorScan: {
    pdf: "C:/Users/vilas/Downloads/NDA 2 2026 GAT Set D.pdf",
    note:
      "Bands d1-d6 were transcribed from an EARLIER, INCOMPLETE scan of this same " +
      "series -- 45 portrait images, one printed page each, missing printed 4, 5, 34 " +
      "and 36. Only 4 and 5 cost content (34 and 36 are Hindi versos of pages that " +
      "were present), and they cost exactly Series D's Q21-36: 16 questions with no " +
      "source at all, because Part A is English-only and has no Hindi facing page to " +
      "recover from. That gap was the one thing the fidelity pass could not close, " +
      "and it was pinned from the numbering jump (printed 3 ends at Q20, printed 6 " +
      "opens at Q37) and corroborated by the Directions blocks either side. " +
      "THE SCAN ABOVE SUPERSEDES IT and carries all 26 English pages including 4 " +
      "and 5, so band d7 closes the gap. d1-d6 are NOT re-transcribed: they already " +
      "matched Set A 134/134 with zero option permutations, so re-reading them would " +
      "buy nothing. Recorded here so their provenance stays honest -- those bands " +
      "read a different photograph from the one `pdf` now names.",
  },
};

export const PAPERS: Paper[] = [
  {
    // NDA II 2026. The booklet prints no date -- the sitting is taken from the
    // source filename plus this project's Apr = NDA I / Sep = NDA II convention,
    // which every one of the 18 existing GAT sittings follows.
    id: "2026-2",
    sourceFile: "NDA2_2026_GAT_SetA.pdf",
    pyqYear: 2026,
    pyqMonth: "Sep",
    pyqNote: "NDA 2",
    tbc: "TFDD-B-AGT",
    base: SET_A,
    // Series B and C are not in hand. When they arrive, add a Booklet here and
    // run render-variant + match-variant; nothing else changes.
    variants: [SET_D],
  },
];

export function requirePaper(id: string | undefined): Paper {
  const p = PAPERS.find((x) => x.id === id);
  if (!p) {
    throw new Error(`unknown paper "${id}" -- known: ${PAPERS.map((x) => x.id).join(", ")}`);
  }
  return p;
}

export function requireVariant(paper: Paper, series: string): Booklet {
  const v = paper.variants.find((x) => x.series === series.toUpperCase());
  if (!v) {
    throw new Error(
      `unknown variant "${series}" for ${paper.id} -- known: ${paper.variants.map((x) => x.series).join(", ") || "(none)"}`
    );
  }
  return v;
}

/** data/<id>.<kind>.json -- the one place the naming convention lives. */
export function dataPath(id: string, kind: string): string {
  return join(DATA, `${id}.${kind}.json`);
}

/** out/<id>[-SERIES]/ -- rendered page images. */
export function outDir(id: string, series?: string): string {
  return join(OUT, series && series !== "A" ? `${id}-${series}` : id);
}

/**
 * subject -> chapter -> subtopic[]. GENERATED from the LIVE bank by
 * dump-catalog.ts, never hand-authored -- its whole job is to be exactly what
 * the database holds, because that is what stops commitStaged auto-creating a
 * near-miss.
 *
 * Aliased from lib.ts rather than restated, so the shape the validator checks
 * and the shape the loader promises cannot drift apart.
 */
export type Catalog = GatCatalog;

let _catalog: Catalog | null = null;
export function catalog(): Catalog {
  if (!_catalog) {
    _catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8")) as Catalog;
  }
  return _catalog;
}
