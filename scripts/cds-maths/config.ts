// Shared config for the CDS Elementary Mathematics PYQ ingestion pipeline.
//
// SOURCE: scanned CDS "Elementary Mathematics" test booklets — 100 items / 100
// marks / 2 hours / one-third negative (read off the 2026-I and 2026-II covers,
// the only covers in the corpus). 21 sittings on disk, 2016-II … 2026-II.
//
// ZERO TEXT LAYER, ALL 21 PAPERS — and that is MEASURED, not assumed: 0
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
//   - `2026-1` (48 pages) and `2026-2` (40 pages) are RAW UPSC booklets: Hindi
//     and English alternating, cover scanned LAST. Each needs a page-selection
//     pre-pass before rendering; `englishPages` records the answer once someone
//     has done it. Rendering one blind would feed ~half Devanagari pages to a
//     transcription agent.
//
// NO ANSWER KEY IN ANY BOOKLET. Every paper's last page ends at Q100. BUT — and
// this is what makes this corpus different from CDS GK — THREE papers have an
// external key on disk, and they are NOT of equal standing:
//   - 2020-I: `Solved Paper 2020(I)_maths.docx` (100 entries) + a worked-solutions PDF
//   - 2020-II: `CDS_2020_2_PYQP_ak.docx` (100 entries)
//     Both are PREP-HOUSE keys, not published UPSC keys, so they are evidence and
//     not ground truth — see README.md "Why 2020-I is the pilot". Measured there
//     at roughly 2 errors per 100.
//   - 2026-II: `ProvAnsKey-ElMath-CDSE-II-26-160926.pdf` — the OFFICIAL UPSC
//     provisional key, published 2026-09-16, four pages (Series A/B/C/D), and the
//     FIRST published key this corpus has ever had. Still not infallible, and
//     still PROVISIONAL (UPSC invites representations and issues a final key
//     later), but the adjudication prior INVERTS against it: on the 2020 pair the
//     key was usually the one at fault, whereas here our own pass should be.
// All three are enough to SCORE a blind pass, which is the one thing CDS GK could
// never do.
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
  /**
   * Absolute path to an external answer key, where one exists. Prep-house for the
   * 2020 pair; the OFFICIAL UPSC provisional key for 2026-2. Read only by
   * parse-key.ts + score.ts, never by commit.ts — see the header.
   */
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
  // PRE-PASS DONE 2026-09-20. English question pages are the EVEN indices 2..34.
  //
  // The SECOND raw UPSC booklet in this corpus, and it resolves to the identical
  // convention as 2026-1 — but that was VERIFIED here, not inherited. 40 pages, 0
  // extractable characters (measured across all 40), booklet `BFVS-T-TME`,
  // Series A, cover reading "C.D.S. Examination (II), 2026".
  //
  // p01 is Q1-Q6 in HINDI and p02 is the SAME Q1-Q6 in ENGLISH, printed page 3.
  // So printed page = index + 1 and English printed pages are ODD (3, 5 ... 35).
  // Checked end to end rather than sampled: p18 is printed (19-A) carrying
  // Q55-Q60, and p34 is printed (35-A) carrying Q98-Q100 — so Q100 COMPLETES ON
  // p34 and the paper is whole at 100.
  //
  // Indices 35-38 are SPACE FOR ROUGH WORK and 39 is the English cover, scanned
  // LAST — the same tail as 2026-1. A naive "all even pages" rule would feed two
  // blank rough-work pages to a transcriber, so the range stops at 34.
  //
  // 17 English pages for 100 questions is ~5.9 q/page, and p02 carries 6.
  //
  // ZERO FIGURES IN THIS PAPER — checked on all 17 English pages, and at full
  // resolution on p30/p32/p34 where the geometry and DI sit. Every geometry item
  // is PROSE-described (Q78 parallelogram, the Q81-Q90 circle/triangle sets) and
  // Q96/Q98/Q99/Q100 carry TABLES, not diagrams. So the snap-crop ->
  // verify-figures -> attach-images stage does not run at all for this paper,
  // and the detached-label trap that hit 14 of 17 figures corpus-wide cannot.
  //
  // THE DATA-SUFFICIENCY RUN MOVED, AND THE 2026-1 TRAP DOES NOT REPRODUCE.
  // On 2026-1 the run was Q71-Q80; here it is Q61-Q65. On 2026-1 option (d) was
  // NOT constant across the run — it read "cannot be answered even by using
  // both" on five items and "can be answered even without using both" on the
  // other five, so transcribing (d) once and reusing it put the wrong fourth
  // option on five questions silently.
  //
  // RE-CHECKED HERE 2026-09-20, each (d) cropped from the source at 6x and read
  // on its own: all five are IDENTICAL, and all five read "can be answered even
  // without using both the Statements". (a)(b)(c) are likewise word-for-word
  // constant. So the trap is a property of the 2026-1 BOOKLET, not of the CDS
  // data-sufficiency format — which means it must be re-checked per paper and
  // can be assumed in neither direction.
  //
  // Two wording differences from 2026-1, transcribed as printed: this booklet
  // sets `Statement I :` with a space where 2026-1 used `Statement-I :`, and
  // closes `...of the above Question and Statements ?` with no "the".
  //
  // The five reprint the preamble in full, so they are standalone questions,
  // not a set — the same reading recorded for 2026-1's Q71-Q80.
  //
  // FOUR SET BLOCKS, all in Q81-Q90: "For the next three (03) items that follow"
  // twice (Q81-83, Q84-86) and "For the next two (02) items that follow" twice
  // (Q87-88, Q89-90).
  "2026-2": {
    ...p("2026-2", "2026 Sep.pdf", 2026, "II", {
      englishPages: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34],
    }),
    // THE FIRST PUBLISHED UPSC KEY IN THIS CORPUS. The 2020 pair are PREP-HOUSE
    // keys measured at roughly 2 errors per 100; this is the official
    // provisional key UPSC released on 2026-09-16, and it reports "No. of
    // Questions Dropped: 0" with all 100 taken for scoring.
    //
    // FOUR PAGES, ONE PER SERIES — A, B, C, D, confirmed by reading each page's
    // OWN header rather than trusting page order. Our booklet is Series A, so
    // page 0 is the only one that applies. This matters more than it looks:
    // Series B's Q1 is D where A's is B and the sequences diverge throughout, so
    // the wrong page yields a 100% wrong key that looks entirely plausible.
    //
    // It is a SCAN (0 extractable characters), so reading it is a vision
    // transcription of 100 table cells and carries its own error rate — hence
    // parse-key.ts reads it TWICE independently and asserts 1..100 exactly once.
    answerKey: `${SRC}/CDS_2026_2_PYQP/ProvAnsKey-ElMath-CDSE-II-26-160926.pdf`,
  },
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

/**
 * Questions whose DUPLICATE OPTION TEXT IS THE BOOKLET'S, verified against the
 * printed page, not a transcription slip of ours.
 *
 * Both gates that check option integrity read this ONE map -- `validateRows`
 * at commit and gate 4 at publish. They were briefly going to carry a copy each,
 * which is how two gates drift into disagreeing about which rows are legal.
 *
 * BEING LISTED HERE IS NECESSARY AND NOT SUFFICIENT. Each gate additionally
 * COMPUTES that the correct option is not one of the duplicated ones, and
 * refuses regardless if it is -- a question whose key is duplicated cannot be
 * answered by choosing a letter, and no allowlist may wave that through.
 *
 * Add an entry only after re-reading the printed page at high zoom.
 *
 *   2026-2 Q47 -- "What is the ratio of the greatest value of sin^2 x + 2
 *   (0 <= x <= pi/2) to its least value?" prints (a) 2, (b) 3/2, (c) 2, (d) 1/2.
 *   Greatest 3, least 2, ratio 3/2, so (b) is correct and the (a)/(c) duplicate
 *   is inert. Confirmed at 10x by the transcriber and again at 7x independently.
 */
export const SOURCE_DUPLICATE_OPTIONS: Record<string, number[]> = {
  "2026-2": [47],
};

export const sourceDuplicateOptionsFor = (paperId: string): ReadonlySet<number> =>
  new Set(SOURCE_DUPLICATE_OPTIONS[paperId] ?? []);

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
