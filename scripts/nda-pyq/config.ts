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

/**
 * A SIBLING BOOKLET SERIES of a paper already in the bank.
 *
 * UPSC issues one paper as four series (A/B/C/D) that hold the SAME 120
 * questions in a different ORDER. A variant is therefore NEVER ingested —
 * `content_hash` would dedup every row against the series already committed, and
 * forcing them in would mean 360 duplicate questions. What a variant produces is
 * a MAPPING: variant question number -> base question number, plus the mapping
 * of its option LABELS, from which that series' answer key falls out.
 */
export type Variant = {
  /** Booklet series letter printed on the cover. */
  series: string;
  pdf: string;
  /** 0-based PDF page indices carrying ENGLISH questions. */
  englishPages: number[];
  /**
   * Page rotation in degrees to apply before rendering. Set C was photographed
   * sideways; without this an agent is handed 90-degree text.
   */
  rotate?: number;
  /**
   * True when ONE image holds a SPREAD of two printed pages rather than one.
   * The English half is then cropped out — see render-variant.ts.
   */
  spread?: boolean;
  /** Which half of a rotated spread carries the English page. */
  spreadHalf?: "first" | "second";
  /**
   * Pages to render even though they are DEVANAGARI, because the English page
   * carrying those questions is missing from the source. Their options are
   * mathematical and language-neutral, which is all the matching pass needs.
   * Rendered alongside englishPages; the agent is told which they are.
   */
  hindiFallbackPages?: number[];
};

/**
 * Variants of `2026-2`. All three are PHOTOGRAPHS of the booklet rather than
 * flatbed scans — warped, angled, and carrying a diagonal red
 * `www.centuriondefenceacademy.com` watermark. Zero text layer in all three
 * (Set B's is a converter's "Image to PDF" stamp, not content).
 */
export const VARIANTS: Record<string, Variant[]> = {
  "2026-2": [
    {
      /**
       * 43 images, ONE printed page each, footer TFDD-A-HTM/37B.
       *
       * PRINTED PAGE 10 IS ABSENT FROM THE PDF — the photographer skipped it.
       * So the offset is index+1 through index 8 and index+2 from index 9 on,
       * which moves English off even indices and onto ODD ones partway through:
       * 2, 4, 6, 8 (printed 3, 5, 7, 9) then 9, 11, 13 … 41 (printed 11 … 43).
       *
       * THIS LIST WAS ORIGINALLY WRONG and the way it was wrong is worth
       * keeping. It was set to [2,4,…,42] after spot-checking indices 1-4 — the
       * START of the sequence, where the naive parity happens to hold. Every
       * rendered page from index 10 on was therefore Devanagari. Three
       * transcription agents caught it independently by reading the footers they
       * were told to verify, and index 8/9/10 were then confirmed by eye: p9
       * English, p11 English, p12 Hindi, with no p10 anywhere.
       *
       * A parity that holds at the front of a booklet is not a parity. Sweep
       * every footer — which is what was done for Series C, where it found
       * duplicates, and carelessly not done here.
       */
      series: "B",
      pdf: "C:/Users/vilas/Downloads/NDA-2-2026-Maths-Set-B.pdf",
      englishPages: [2, 4, 6, 8, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41],
    },
    {
      /**
       * 25 images, each a SPREAD of two printed pages, photographed SIDEWAYS.
       * Rotation is 270, not 90 — at 90 the text renders upside down.
       * Footer TFDD-A-HTM/37C. Hindi is the LEFT half, English the RIGHT.
       *
       * THE INDEX LIST IS NOT A FORMULA, and that is the point. The printed page
       * numbers were read off every footer, and the sequence is irregular:
       * index 7 is a DUPLICATE of index 6 (both pages 12|13) and index 16
       * repeats page 30. Deriving the list arithmetically would hand an agent
       * two duplicate spreads and silently skip a real page. The 21 indices
       * below are the unique content spreads, covering printed pages 2-43 and
       * therefore all 21 English pages (3, 5, ... 43).
       */
      series: "C",
      pdf: "C:/Users/vilas/Downloads/NDA-2-2026-Maths-Set-C.pdf",
      englishPages: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23],
      rotate: 270,
      spread: true,
      spreadHalf: "second",
    },
    {
      /**
       * 43 images, ONE printed page each, footer TFDD-A-HTM/37D.
       *
       * PRINTED PAGE 39 IS ABSENT FROM THE PDF, and unlike Series B's missing
       * page this one COSTS CONTENT: page 39 is the ENGLISH page carrying
       * Q101-Q107. The offset is index+1 through index 37, then index 38 = p40,
       * 39 = p41, 40 = p42, 41 = p43, 42 = advertisement.
       *
       * So only 20 of the 21 English pages exist here. Q101-Q107 are recovered
       * from the HINDI facing page (printed 38 = index 37, listed in
       * `hindiFallbackPages`): the four options of those seven questions are
       * mathematical and language-neutral, which is all the matcher needs, and
       * their order was confirmed against Series A by eye before being relied
       * on. Verified by rendering indices 37/38/39: p38 Hindi, p40 Hindi,
       * p41 English, no p39 anywhere.
       */
      series: "D",
      pdf: "C:/Users/vilas/Downloads/NDA-2-2026-Maths-Set-D.pdf",
      englishPages: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 39, 41],
      hindiFallbackPages: [37],
    },
  ],
};

export function requireVariant(paperId: string, series: string): Variant {
  const v = (VARIANTS[paperId] ?? []).find((x) => x.series === series.toUpperCase());
  if (!v) {
    throw new Error(
      `unknown variant "${series}" for ${paperId} — known: ${(VARIANTS[paperId] ?? []).map((x) => x.series).join(", ")}`
    );
  }
  return v;
}

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
