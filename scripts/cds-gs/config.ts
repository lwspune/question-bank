// Shared config for the CDS General Knowledge (GS) PYQ ingestion pipeline.
//
// SOURCE: scanned CDS "General Knowledge" test booklets, 120 items / 100 marks /
// 2 hours / one-third negative. 19 sittings on disk, 2016-II … 2026-I (2016-I and
// 2017-I are absent from the source folder, not skipped).
//
// TWO SOURCE GENERATIONS, and the difference is load-bearing:
//   - 18 papers (2016-II … 2025-II) are prep-house reprints of the genuine UPSC
//     booklet with the HINDI PAGES REMOVED — English only, ~18-23 pages. The
//     booklet codes and printed page numbers are intact, so these are faithful
//     scans, not retyped compilations.
//   - `2026-1` is the RAW UPSC booklet: 48 pages, HINDI AND ENGLISH ALTERNATING,
//     plus rough-work pages. It needs a page-selection pre-pass; `englishPages`
//     records the answer once someone has done it. Rendering it blind would feed
//     ~half Devanagari pages to a transcription agent.
//
// NO ANSWER KEY EXISTS. Not in the booklets (their tail pages are questions or
// rough work), not in the source folder, and — unlike the CDS English paper —
// not recoverable from our own NDA bank either: UPSC reuses English items across
// NDA and CDS but does not appear to reuse GK items (probed 2026-08-27, five
// distinctive stems, zero matches). So every answer here is DERIVED, by two
// independent blind passes, and carries that provenance in `solution`.
//
// NO SECTIONS. Unlike the sibling CDS English pipeline — whose whole shape is
// driven by `Directions:` blocks, shared passages and underlines — a GK paper is
// 120 standalone MCQs with subjects INTERLEAVED throughout (a single page can run
// chemistry, then history, then current affairs). There is no block structure to
// exploit, so `subject`/`chapter` is a PER-QUESTION decision, hard-validated
// against CATALOG below. That is the `mh-ssc-10` shape, not the `cds` one.
import { readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as the sibling CDS English / practice / JEE pipelines).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "07700c16-a2e3-4101-9f25-4c7956dd4882"; // CDS

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\AFCAT_CDS\\PYQPs\\03. GS";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: per-band transcription + derivations

/** Every question in the paper. Asserted at commit — a short paper is a finding. */
export const QUESTIONS_PER_PAPER = 120;

export type Paper = {
  id: string; // slug; also the data/<id>.* prefix
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup / rollback key)
  pdf: string; // absolute path to the booklet PDF
  pyqYear: number;
  pyqNote: string;
  /**
   * 0-based PDF page indices carrying ENGLISH questions. Omitted where the whole
   * booklet is English and only the cover is skipped (the 18 reprints). REQUIRED
   * for 2026-1, whose pages alternate Hindi/English — see the header note.
   */
  englishPages?: number[];
};

const p = (
  id: string,
  file: string,
  pyqYear: number,
  sitting: "I" | "II",
  englishPages?: number[]
): Paper => ({
  id,
  sourceFile: file,
  pdf: join(SOURCE_ROOT, file),
  pyqYear,
  pyqNote: `CDS (${sitting}) ${pyqYear} — General Knowledge`,
  ...(englishPages ? { englishPages } : {}),
});

// NOTE the source filenames are inconsistent ("2023 I" vs "2023II" vs "2024I") —
// they are reproduced VERBATIM because `sourceFile` is the dedup + rollback key.
// `CDS GK 2016.pdf` carries no sitting in its name; its cover is stamped
// "CDS Exam(II):2016", so it is the SECOND sitting. Do not "tidy" these.
export const PAPERS: Record<string, Paper> = {
  "2026-1": p("2026-1", "CDS_2026_1.pdf", 2026, "I", []), // [] = pre-pass not done yet
  "2025-2": p("2025-2", "CDS GK 2025II.pdf", 2025, "II"),
  "2025-1": p("2025-1", "CDS GK 2025I.pdf", 2025, "I"),
  "2024-2": p("2024-2", "CDS GK 2024II.pdf", 2024, "II"),
  "2024-1": p("2024-1", "CDS GK 2024I.pdf", 2024, "I"),
  "2023-2": p("2023-2", "CDS GK 2023II.pdf", 2023, "II"),
  "2023-1": p("2023-1", "CDS GK 2023 I.pdf", 2023, "I"),
  "2022-2": p("2022-2", "CDS GK 2022 II.pdf", 2022, "II"),
  "2022-1": p("2022-1", "CDS GK 2022 I.pdf", 2022, "I"),
  "2021-2": p("2021-2", "CDS GK 2021 II.pdf", 2021, "II"),
  "2021-1": p("2021-1", "CDS GK 2021 I.pdf", 2021, "I"),
  "2020-2": p("2020-2", "CDS GK 2020 II.pdf", 2020, "II"),
  "2020-1": p("2020-1", "CDS GK 2020 I.pdf", 2020, "I"),
  "2019-2": p("2019-2", "CDS GK 2019 II.pdf", 2019, "II"),
  "2019-1": p("2019-1", "CDS GK 2019 I.pdf", 2019, "I"),
  "2018-2": p("2018-2", "CDS GK 2018 II.pdf", 2018, "II"),
  "2018-1": p("2018-1", "CDS GK 2018 I.pdf", 2018, "I"),
  "2017-2": p("2017-2", "CDS GK 2017 II.pdf", 2017, "II"),
  "2016-2": p("2016-2", "CDS GK 2016.pdf", 2016, "II"),
};

export function requirePaper(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}

/**
 * subject -> chapter -> subtopic[]. Generated ONCE from the NDA GAT-GK taxonomy
 * by seed-catalog.ts and COMMITTED; from then on this file is the source of
 * truth and is edited BY HAND. `subject` and `chapter` are hard-validated at
 * commit because the DB will not do it for us: `commitStaged` refuses an unknown
 * SUBJECT but AUTO-CREATES an unknown chapter or subtopic, which is exactly how
 * a taxonomy fragments — one agent's "Modern Indian History" silently becomes a
 * second chapter beside "Modern India" and splits the corpus.
 */
export type Catalog = Record<string, Record<string, string[]>>;

let _catalog: Catalog | null = null;
export function catalog(): Catalog {
  if (!_catalog) _catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));
  return _catalog!;
}

export const SUBJECTS = () => Object.keys(catalog());

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);
