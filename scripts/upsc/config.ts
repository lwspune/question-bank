// Shared config for the UPSC CSE (Preliminary) PYQ ingestion pipeline.
//
// SOURCE: scanned UPSC Civil Services (Preliminary) test booklets. TWO papers,
// both objective, both sat on the same day:
//
//   Paper I  "General Studies"  — 100 items / 200 marks / 2 hours / one-third
//                                 negative  (+2.0 correct, -0.667 wrong)
//   Paper II "CSAT"             —  80 items / 200 marks / 2 hours / one-third
//                                 negative  (+2.5 correct, -0.833 wrong)
//
// Paper II is QUALIFYING at 33% (66 of 200); its marks do not count toward the
// Prelims merit list. That is a scoring-surface fact, recorded here so that
// whoever builds a /mock for it reports "qualified / not qualified" rather than
// a rank-relevant score. Paper II's scheme is byte-identical to NDA Mathematics
// (+2.5 / -0.83), which src/lib/mocks/blueprints.ts already models.
//
// 22 booklets on disk: BOTH papers for EVERY year 2016-2026, no gaps.
//
// NO ANSWER KEY EXISTS. Not in the booklets (their tail pages are questions or
// rough work), and not in the source folders — checked exhaustively, both trees.
// So every answer here is DERIVED, by two independent blind passes, and carries
// that provenance in `solution`. This is the scripts/cds-gs situation exactly.
//
//   UPSC does publish official Prelims answer keys on upsc.gov.in once a CSE
//   cycle closes, so keys for the older years are very likely obtainable. That
//   would convert derivation into VERIFICATION and change the quality ceiling
//   of this whole corpus. Worth doing before scaling past the pilot.
//
// TWO SOURCE GENERATIONS, and the difference is load-bearing:
//
//   - `CSE_P1_2016` … `CSE_P1_2025` are prep-house extracts of the genuine UPSC
//     booklet with the HINDI PAGES REMOVED — English only, 18-22 pages. Printed
//     page numbers survive and jump by two (3, 5, 7 …), which is the evidence
//     they are faithful scans of the English versos rather than retyped
//     compilations.
//   - EVERY Paper II file, and `QP_CSP_2026_..._PAPER-I_...`, are RAW UPSC
//     booklets: 40-56 pages, HINDI AND ENGLISH ALTERNATING, plus rough-work
//     pages and a back cover.
//
// THE INTERLEAVE RULE, verified on the 2025 Paper II and the 2026 Paper I:
// Hindi comes FIRST and carries the same item numbers as the English page that
// follows it. So in a raw booklet ENGLISH IS AT EVEN 0-BASED INDICES FROM 2, and
// the printed page label is index+1. Rendering one blind would feed a
// transcription agent ~half Devanagari.
//
// TWO PAPER SHAPES, and they are not the same pipeline problem:
//
//   Paper I is the scripts/cds-gs shape — 100 standalone MCQs with the nine
//   subjects INTERLEAVED page to page (a single page runs Polity, then Economy,
//   then History), so `subject`/`chapter` is a PER-QUESTION decision, hard-
//   validated against CATALOG. There is no block structure to exploit.
//
//   Paper II is the scripts/cds shape — its whole structure is `Directions for
//   the following N items:` blocks over SHARED PASSAGES, and they NEST: one
//   directions block over 4 items can contain TWO passages, each governing 2 of
//   them. So `context` must carry the passage that actually governs THAT item,
//   never the whole block. That mapping is a PRE-PASS, done before transcription.
//
// ONE pipeline serves both, parameterised by `paper`. They share the booklet
// format, the interleave rule, the absent key, the dual-blind derivation and the
// commit path; only context handling differs, and that is a per-question field.
// Forking would mean applying every future fix twice — this repo already has a
// live instance of that drift (see CLAUDE.md, the NCERT Class-11 entry).
import { readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as the sibling CDS / JEE / practice pipelines).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
/** `UPSC CSE (Prelims)`, created by seed-exam.ts on 2026-08-27. */
export const EXAM_ID = "62749b2e-ad55-42c2-9ab5-cfcd55d908bb";

export const P1_ROOT = "C:\\Vilas\\LWS_Pune\\UPSC\\Paper_1\\PYQPs";
export const P2_ROOT = "C:\\Vilas\\LWS_Pune\\UPSC\\Paper-2";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs, blind packets
export const DATA = join(__dirname, "data"); // committed: transcriptions
export const DERIVED = join(__dirname, "derived"); // committed: the two blind passes

export type PaperNumber = 1 | 2;

/** Per-paper exam pattern. Asserted at commit — a short paper is a finding. */
export const PATTERN: Record<PaperNumber, {
  questions: number;
  marks: number;
  minutes: number;
  marksPerCorrect: number;
  penaltyPerWrong: number;
  qualifying: boolean;
}> = {
  1: { questions: 100, marks: 200, minutes: 120, marksPerCorrect: 2, penaltyPerWrong: 2 / 3, qualifying: false },
  2: { questions: 80, marks: 200, minutes: 120, marksPerCorrect: 2.5, penaltyPerWrong: 2.5 / 3, qualifying: true },
};

export type Paper = {
  id: string; // slug; also the data/<id>.* prefix
  paper: PaperNumber;
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup / rollback key)
  pdf: string; // absolute path to the booklet PDF
  pyqYear: number;
  pyqNote: string;
  /**
   * 0-based PDF page indices carrying ENGLISH questions, in reading order.
   *
   * REQUIRED and EXPLICIT for every paper — never inferred. An EMPTY array means
   * "the page pre-pass has not been done", and `requirePaper` refuses it. That is
   * deliberate: a silently-wrong page list costs a whole transcription pass, and
   * page counts vary (18-56) even within one generation, so there is no rule
   * safe enough to default to.
   *
   * For a raw bilingual booklet this is the even indices from 2 (see the header).
   * For a Hindi-stripped extract it is every page after the cover, minus any
   * trailing rough-work pages.
   */
  englishPages: number[];
  /** Effective scan resolution, measured. Below ~150 DPI transcription degrades. */
  dpi: number;
};

const p1 = (
  year: number,
  file: string,
  englishPages: number[],
  dpi: number
): Paper => ({
  id: `${year}-p1`,
  paper: 1,
  sourceFile: file,
  pdf: join(P1_ROOT, file),
  pyqYear: year,
  pyqNote: `UPSC CSE (Prelims) ${year} - General Studies Paper I`,
  englishPages,
  dpi,
});

const p2 = (
  year: number,
  file: string,
  englishPages: number[],
  dpi: number
): Paper => ({
  id: `${year}-p2`,
  paper: 2,
  sourceFile: file,
  pdf: join(P2_ROOT, file),
  pyqYear: year,
  pyqNote: `UPSC CSE (Prelims) ${year} - CSAT Paper II`,
  englishPages,
  dpi,
});

/** Even 0-based indices `from`..`to` — the English pages of a raw bilingual booklet. */
const evens = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i += 2) out.push(i);
  return out;
};

/** Consecutive indices `from`..`to` — the content pages of a Hindi-stripped extract. */
const range = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
};

// NOTE the source filenames are wildly inconsistent between years — UPSC's own
// downloads, prep-house reprints, and three files that carry no year at all
// ("GENERAL STUDIES PAPER II.pdf" is 2022, "GENERAL_STUDIES_PAPER-II.pdf" is
// 2016, "csp-p2.pdf" is 2019 — each identified from its cover stamp). They are
// reproduced VERBATIM because `sourceFile` is the dedup + rollback key. Do not
// tidy these.
//
// `englishPages: []` = the page pre-pass has not been done for that paper yet.
export const PAPERS: Record<string, Paper> = {
  // --- pilot pair: CSE 2025, both papers, both ~300 DPI -------------------
  // P1 2025: 22 pages, Hindi already stripped. i0 is the cover; i1-i21 are the
  // 21 English content pages (printed 3, 5 … 43) carrying items 1-100.
  "2025-p1": p1(2025, "CSE_P1_2025.pdf", range(1, 21), 300),
  // P2 2025: 48 pages, raw bilingual. English at even indices 2-42 (printed 3-A
  // … 43-A) carrying items 1-80. i44/i46 are rough work, i47 the back cover.
  "2025-p2": p2(2025, "QP-CSP-25-GENERAL-STUDIES-PAPER-II-26052025.pdf", evens(2, 42), 300),

  // --- Paper I, remaining years (pre-pass not done) -----------------------
  "2026-p1": p1(2026, "QP_CSP_2026_GENERAL_STUDIES_PAPER-I_25052026.pdf", [], 301), // raw bilingual, 56pp
  "2024-p1": p1(2024, "CSE_P1_2024.pdf", [], 299),
  "2023-p1": p1(2023, "CSE_P1_2023.pdf", [], 152), // the ONLY booklet of the 22 with an OCR text layer
  "2022-p1": p1(2022, "CSE_P1_2022.pdf", [], 149),
  "2021-p1": p1(2021, "CSE_P1_2021.pdf", [], 298),
  "2020-p1": p1(2020, "CSE_P1_2020.pdf", [], 200),
  "2019-p1": p1(2019, "CSE_P1_2019.pdf", [], 198),
  "2018-p1": p1(2018, "CSE_P1_2018.pdf", [], 150), // strip-scanned
  "2017-p1": p1(2017, "CSE_P1_2017.pdf", [], 150), // strip-scanned
  "2016-p1": p1(2016, "CSE_P1_2016.pdf", [], 150), // strip-scanned

  // --- Paper II, remaining years (pre-pass not done) ----------------------
  // All raw bilingual booklets.
  "2026-p2": p2(2026, "QP_CSP_2026_GENERAL_STUDIES_PAPER-II_25052026.pdf", [], 300),
  "2024-p2": p2(2024, "QP-CSP-24-GENERAL-STUDIES-PAPER-II-180624.pdf", [], 299),
  "2023-p2": p2(2023, "QP_CS_Pre_Exam_2023_GENERAL_STUDIES_PAPER_II_280523.pdf", [], 300),
  "2022-p2": p2(2022, "GENERAL STUDIES PAPER II.pdf", [], 150),
  "2021-p2": p2(2021, "QP-CSP-21-GeneralStudiesPaper-II-121021.pdf", [], 301),
  "2020-p2": p2(2020, "CSP_2020_GS_Paper-2.pdf", [], 200),
  "2019-p2": p2(2019, "csp-p2.pdf", [], 200),
  "2018-p2": p2(2018, "QP-CSP-18-GS-II-C.pdf", [], 150), // strip-scanned
  "2017-p2": p2(2017, "CSP-17-GS_PAPER-II-C.pdf", [], 150), // strip-scanned
  // AT RISK: ~72 DPI, 40 pages of 594x90 strips. Dense two-column text at that
  // resolution may simply not be transcribable. Measure before promising it.
  "2016-p2": p2(2016, "GENERAL_STUDIES_PAPER-II.pdf", [], 72),
};

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  const paper = PAPERS[id];
  if (paper.englishPages.length === 0) {
    throw new Error(
      `paper "${id}" has no englishPages — the page pre-pass has not been done.\n` +
        `Rendering it blind would feed Hindi pages to a transcription agent. Fill in\n` +
        `config.ts first (raw bilingual booklets: even 0-based indices from 2).`
    );
  }
  return paper;
}

export const pattern = (paper: Paper) => PATTERN[paper.paper];

/**
 * subject -> chapter -> subtopic[]. Generated ONCE by seed-catalog.py from the
 * LWS syllabus .docx files (six Paper-1 subjects) merged with catalog-authored.json
 * (three more Paper-1 subjects + all five CSAT subjects), and COMMITTED. From
 * then on THIS FILE is the source of truth and is edited BY HAND.
 *
 * `subject` and `chapter` are hard-validated at merge because the DB will not do
 * it for us: `commitStaged` refuses an unknown SUBJECT but AUTO-CREATES an
 * unknown chapter or subtopic, which is exactly how a taxonomy fragments — one
 * agent's "Modern Indian History" silently becomes a second chapter beside
 * "Modern India and the Freedom Struggle" and splits the corpus in two.
 *
 * Chapters and subtopics are deliberately NOT pre-created in the DB. They come
 * into existence only when a question lands in them, so the taxonomy never fills
 * with empty chapters that a /browse filter would offer and then return nothing for.
 */
export type Catalog = Record<string, Record<string, string[]>>;

let _catalog: Catalog | null = null;
export function catalog(): Catalog {
  if (!_catalog) _catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));
  return _catalog!;
}

export const SUBJECTS = () => Object.keys(catalog());

/**
 * Which subjects a given paper may use. Paper I and Paper II share one exam and
 * one catalog but test disjoint things: a CSAT item is never "Polity", and a GS
 * item is never "Basic Numeracy". Validating per-paper turns a mis-scoped
 * classification into a merge-time error rather than a silently misfiled question.
 */
export const P2_SUBJECTS = [
  "Comprehension",
  "Logical Reasoning and Analytical Ability",
  "General Mental Ability",
  "Basic Numeracy",
  "Data Interpretation and Data Sufficiency",
] as const;

export function subjectsFor(paper: PaperNumber): string[] {
  const all = SUBJECTS();
  const p2 = new Set<string>(P2_SUBJECTS);
  return paper === 2 ? all.filter((s) => p2.has(s)) : all.filter((s) => !p2.has(s));
}

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);
