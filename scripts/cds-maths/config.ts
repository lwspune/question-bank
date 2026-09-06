// Shared config for the CDS Elementary Mathematics PYQ ingestion pipeline.
//
// SOURCE: scanned CDS "Elementary Mathematics" test booklets — 100 items / 100
// marks / 2 hours / one-third negative (read off the 2026-I cover, which is the
// only cover in the corpus). 20 sittings on disk, 2016-II … 2026-I.
//
// ZERO TEXT LAYER, ALL 20 PAPERS — and that is MEASURED, not assumed: 0
// extractable characters across every page of every file, against ~300 DPI page
// images. So transcription is VISION-ONLY with no text-first fallback anywhere.
//
// TWO SOURCE GENERATIONS, the same split as the sibling CDS GK pipeline:
//   - 19 papers (2016-II … 2025-II) are prep-house reprints of the genuine UPSC
//     booklet with the HINDI PAGES REMOVED. Booklet codes and printed page
//     numbers survive, so these are faithful scans, not retyped compilations.
//     PAGE PARITY IS PER-BOOKLET, NOT UNIVERSAL: 2016-II carries English on the
//     EVEN printed pages (2, 4 … 28) and 2019-I on the ODD ones (5, 7 … 33).
//     Both are complete; the parity only matters if you go back to a raw booklet.
//   - `2026-1` is the RAW UPSC booklet: 48 pages, Hindi and English alternating,
//     cover scanned LAST. It needs a page-selection pre-pass before rendering;
//     `englishPages` records the answer once someone has done it. Rendering it
//     blind would feed ~half Devanagari pages to a transcription agent.
//
// NO ANSWER KEY IN ANY BOOKLET. Every paper's last page ends at Q100. BUT — and
// this is what makes this corpus different from CDS GK — TWO papers have an
// external key on disk:
//   - 2020-I: `Solved Paper 2020(I)_maths.docx` (100 entries) + a worked-solutions PDF
//   - 2020-II: `CDS_2020_2_PYQP_ak.docx` (100 entries)
// Those are PREP-HOUSE keys, not published UPSC keys, so they are evidence and
// not ground truth — see README.md "Why 2020-I is the pilot". They are enough to
// SCORE a blind pass, which is the one thing CDS GK could never do.
//
// SETS. Unlike a GK paper, this one carries `Directions:` / "Consider the
// following for the next three (03) items" blocks over shared stimulus — a data
// table, a pie chart, a figure. So a question can carry `context` + `setLabel`,
// which is the `scripts/cds` (English) shape, while subject/chapter stays a
// PER-QUESTION decision hard-validated against catalog.json, which is the
// `scripts/cds-gs` shape. This pipeline is a hybrid of the two, deliberately.
import { readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as the sibling CDS English / GK / JEE pipelines).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "07700c16-a2e3-4101-9f25-4c7956dd4882"; // CDS

/** The one subject this pipeline writes. Seeded by seed-subject.ts. */
export const SUBJECT = "Mathematics";

const SRC = "C:/Vilas/LWS_Pune/AFCAT_CDS/Subject_Content/Maths/CDS_PYQPs/Question_Papers";
export const SOURCE_ROOT = `${SRC}/All_PYQPs`;

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription + derivations

/** Every question in the paper. Asserted at commit — a short paper is a finding. */
export const QUESTIONS_PER_PAPER = 100;

export type Paper = {
  id: string; // slug; also the data/<id>.* prefix
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup / rollback key)
  pdf: string; // absolute path to the booklet PDF
  pyqYear: number;
  pyqMonth: "April" | "September";
  pyqNote: string;
  /**
   * 0-based PDF page indices carrying ENGLISH questions. Omitted where the whole
   * file is English question pages (the 19 reprints). REQUIRED for 2026-1, whose
   * pages alternate Hindi/English.
   */
  englishPages?: number[];
  /** Absolute path to an external answer key, where one exists. Prep-house, not UPSC. */
  answerKey?: string;
};

// Sitting is derived from the source FILENAME's month: April => I, September => II.
// That is this project's established NDA/CDS convention and not a fresh guess, but
// it IS an inference — these reprints drop the cover, so no booklet in the corpus
// except 2026-I states its own sitting. Recorded here so it can be checked rather
// than silently trusted.
const p = (
  id: string,
  file: string,
  pyqYear: number,
  sitting: "I" | "II",
  extra: Partial<Paper> = {}
): Paper => ({
  id,
  sourceFile: file,
  pdf: `${SOURCE_ROOT}/${file}`,
  pyqYear,
  pyqMonth: sitting === "I" ? "April" : "September",
  pyqNote: `CDS (${sitting}) ${pyqYear} — Elementary Mathematics`,
  ...extra,
});

// NOTE the source filenames are plain ("2016 Sep.pdf", "2020.pdf") and are
// reproduced VERBATIM because `sourceFile` is the dedup + rollback key.
//
// `2020.pdf` carries no sitting in its name. It was identified as the FIRST
// sitting by pixel-comparing Q1-Q7 against the two papers in the sibling
// CDS_2020_*_PYQP folders: it matches CDS_2020_1_PYQP.pdf exactly (booklet
// A-PLKI-T-MTK), and CDS_2020_2_PYQP.pdf is a different paper (DZOL-T-LKM).
// That is why 2020-2 below points OUTSIDE All_PYQPs — it is the one sitting the
// All_PYQPs folder is missing, and the corpus is 20 papers, not 19.
export const PAPERS: Record<string, Paper> = {
  // PRE-PASS DONE 2026-09-04. English question pages are the EVEN indices 2..42.
  //
  // The booklet has NO text layer at all — 48 pages, 0 extractable characters —
  // so the split could not be detected by counting Devanagari and had to be read
  // off rendered images. scripts/upsc/classify-pages.py is useless here for that
  // reason: it counts characters, and there are none.
  //
  // Established from a whole-booklet montage plus a full-resolution read of p01
  // and p02: p01 is Q1-Q6 in HINDI and p02 is the SAME Q1-Q6 in ENGLISH, printed
  // page 3, footer `A - KPRS-T-MTE`. So printed page = index + 1, and English
  // printed pages are ODD (3, 5, 7 ... 43) — the identical convention the sibling
  // CDS General Knowledge 2026 booklet follows, and the same one the 19 reprints
  // implement by simply dropping the Hindi pages.
  //
  // The order is HINDI BLOCK then ENGLISH BLOCK of the SAME questions, so reading
  // consecutive pages looks like the numbering jumps backwards. That is not a
  // misprint and not a duplicate — it is the trap here.
  //
  // Indices 43-46 are SPACE FOR ROUGH WORK and 47 is the English cover, scanned
  // LAST. A naive "all even pages" rule would therefore feed two blank pages to a
  // transcriber; the range stops at 42 deliberately.
  //
  // 21 English pages for 100 questions is ~4.8 q/page, and p02 carries 6.
  //
  // Q100 COMPLETES ON p42 — VERIFIED 2026-09-06 by the tail band, two ways: its
  // stem and all four options sit wholly in p42's right column, and the band
  // rendered the un-rendered tail straight from the PDF to confirm 43-46 are
  // SPACE FOR ROUGH WORK and 47 is the English cover. The cover corroborates the
  // paper's shape independently — "contains 100 items", Series A, T.B.C.
  // KPRS-T-MTE, Two Hours, 100 marks, one-third penalty. Every other fact in this
  // comment was re-checked and held.
  //
  // A TRAP IN THE Q71-Q80 DATA-SUFFICIENCY RUN: options (a)(b)(c) are word-for-
  // word identical across all ten, but (d) is NOT. It reads "cannot be answered
  // even by using both" on 71/72/75/76/77 and "can be answered even without using
  // both" on 73/74/78/79/80. Transcribing (d) once and reusing it would put the
  // wrong fourth option on five questions, silently. Those ten reprint the
  // preamble in full each time, so they are standalone questions, not a set.
  "2026-1": p("2026-1", "2026 Apr.pdf", 2026, "I", {
    englishPages: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42],
  }),
  "2025-2": p("2025-2", "2025 Sep.pdf", 2025, "II"),
  "2025-1": p("2025-1", "2025 Apr.pdf", 2025, "I"),
  "2024-2": p("2024-2", "2024 Sep.pdf", 2024, "II"),
  "2024-1": p("2024-1", "2024 Apr.pdf", 2024, "I"),
  "2023-2": p("2023-2", "2023 Sep.pdf", 2023, "II"),
  "2023-1": p("2023-1", "2023 Apr.pdf", 2023, "I"),
  "2022-2": p("2022-2", "2022 Sep.pdf", 2022, "II"),
  "2022-1": p("2022-1", "2022 Apr.pdf", 2022, "I"),
  "2021-2": p("2021-2", "2021 Sep.pdf", 2021, "II"),
  "2021-1": p("2021-1", "2021 Apr.pdf", 2021, "I"),
  "2020-2": {
    ...p("2020-2", "CDS_2020_2_PYQP.pdf", 2020, "II"),
    pdf: `${SRC}/CDS_2020_2_PYQP/CDS_2020_2_PYQP.pdf`,
    answerKey: `${SRC}/CDS_2020_2_PYQP/CDS_2020_2_PYQP_ak.docx`,
  },
  "2020-1": {
    ...p("2020-1", "2020.pdf", 2020, "I"),
    answerKey: `${SRC}/CDS_2020_1_PYQP/Solved Paper 2020(I)_maths.docx`,
  },
  "2019-2": p("2019-2", "2019 Sep.pdf", 2019, "II"),
  "2019-1": p("2019-1", "2019 Apr.pdf", 2019, "I"),
  "2018-2": p("2018-2", "2018 Sep.pdf", 2018, "II"),
  "2018-1": p("2018-1", "2018 Apr.pdf", 2018, "I"),
  "2017-2": p("2017-2", "2017 Sep.pdf", 2017, "II"),
  "2017-1": p("2017-1", "2017 Apr.pdf", 2017, "I"),
  "2016-2": p("2016-2", "2016 Sep.pdf", 2016, "II"),
};

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}

/**
 * chapter -> subtopic[]. TWO levels, not three: this pipeline writes ONE subject,
 * so a subject key would be a constant repeated 26 times and a place for a typo
 * to hide. `SUBJECT` above is the subject.
 *
 * Chapter is hard-validated at commit because the DB will not do it for us:
 * `commitStaged` refuses an unknown SUBJECT but AUTO-CREATES an unknown chapter
 * or subtopic, which is exactly how a taxonomy fragments — one agent's "Time and
 * Work" silently becomes a second chapter beside "Time, Work and Wages" and
 * splits the corpus with no error anywhere.
 *
 * NO EM DASHES anywhere in this catalog, deliberately. The sibling GK catalog
 * uses them and needed a `nearMatch` helper because an agent typing an ASCII
 * hyphen produces a validation failure whose cause is INVISIBLE in a terminal.
 * Removing the character removes the failure class.
 */
export type Catalog = Record<string, string[]>;

let _catalog: Catalog | null = null;
export function catalog(): Catalog {
  if (!_catalog) _catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));
  return _catalog!;
}

export const CHAPTERS = () => Object.keys(catalog());

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);
