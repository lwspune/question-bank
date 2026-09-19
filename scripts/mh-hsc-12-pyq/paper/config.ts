/**
 * The six MH HSC Class-12 Maths BOARD PAPERS added 2026-09-19, and what each one
 * is for.
 *
 * ⚠ THE FILENAME IS NOT THE SITTING. Two of the six are misnamed, both calling a
 * February sitting "March". Every `year`/`month` below is read off the PRINTED
 * COVER (`YYYY <roman month> DD` in the header box, or a `DATE : DD/MM/YYYY`
 * line on the J-276 layout) and cross-checked against the subject code. This is
 * the same trap `scripts/mh-ssc-10/README.md` carries a standing warning for.
 *
 * ⚠ THESE SUPERSEDE the `RAW_PAPERS` note in ../config.ts, which records the
 * 2024 + 2025 papers as "scanned, need render + vision". The copies added on
 * 2026-09-19 are born-digital typeset reproductions with real text layers — the
 * text layer is still LOSSY for math (every symbol is a glyph-image) but it is
 * ground truth for prose, numbering and reading order.
 */
import { join } from "node:path";

export { ORG_ID, CREATED_BY, EXAM_ID, SOURCE_ROOT } from "../config";
import { SOURCE_ROOT } from "../config";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs + text dumps
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

export const SUBJECT_NAME = "Mathematics";

export type BankStatus =
  /** No rows for this sitting exist. Straight ingest. */
  | "new"
  /** The compilation already supplied rows for this sitting. Ingest is a
   *  RECONCILIATION against shipped content — gated, see ./README.md. */
  | "reconcile";

export type Paper = {
  id: string; // slug → data/<id>.*.json
  pdf: string; // absolute path to the source PDF
  year: number; // from the PRINTED COVER, never the filename
  month: string; // from the PRINTED COVER, never the filename
  paperCode: string; // printed subject code — the independent check on year+month
  sourceFile: string; // questions.source_file — the dedup + rollback key
  note: string; // questions.pyq_note
  bankStatus: BankStatus;
  /** Rows this sitting already has in the bank, measured 2026-09-19. A
   *  reconciliation that does not end at 44 has found something. */
  bankRows?: number;
  /** Refs the compilation never captured, measured by question-number census.
   *  These are straight net-new adds even on a `reconcile` paper. */
  knownMissingRefs?: string[];
  /** Refs whose stem prints a FIGURE (all are Mathematical Logic switching
   *  circuits — the only figure genre in this corpus). A ref listed here and
   *  not cropped is a defect; "Construct the switching circuit …" questions
   *  are NOT listed, because there the student draws it. */
  figureRefs: string[];
  /** Refs the exam-scoped `content_hash` ABSORBED into a row that already
   *  existed, so this sitting has no row of its own for them.
   *
   *  Recorded rather than tolerated. `flip-public.ts` checks the bank's row
   *  count against the printed 44, and a shortfall is normally a real loss —
   *  rows that failed to commit, or a transcription that was never 44. Listing
   *  the absorbed refs here makes the expected count `44 - absorbed`, so the
   *  check still bites on every OTHER cause. A blanket override would not.
   *
   *  Each entry names what absorbed it, because "absorbed" alone does not say
   *  whether the board repeated an earlier sitting or set a textbook exercise. */
  absorbedRefs?: { ref: string; into: string }[];
};

const paper = (
  id: string,
  file: string,
  year: number,
  month: string,
  paperCode: string,
  bankStatus: BankStatus,
  figureRefs: string[],
  extra: Partial<Paper> = {},
): Paper => ({
  id,
  pdf: join(SOURCE_ROOT, file),
  year,
  month,
  paperCode,
  sourceFile: `MH_HSC_12_Maths_PYQ__${year}_${month}.pdf`,
  note: `Maharashtra HSC Class 12 Board PYQ — Mathematics & Statistics (Arts & Science), ${month} ${year} (paper code ${paperCode})`,
  bankStatus,
  figureRefs,
  ...extra,
});

export const PAPERS: Record<string, Paper> = Object.fromEntries(
  [
    // ── New sittings ────────────────────────────────────────────────────────
    // Filename says "March 2026"; cover says 2026 II 21 = 21 February 2026.
    paper("feb-2026", "March 2026 paper.pdf", 2026, "February", "J-165", "new", []),
    // J-276 uses the newer layout with a literal `DATE : 24/06/2026` line.
    paper("jun-2026", "June 2026 paper.pdf", 2026, "June", "J-276", "new", []),
    // The July supplementary sittings were never ingested at all — the
    // compilation only ever covered the main (Feb/March) paper of each year.
    // Q.27 carries the corpus's largest figure (114.5pt, the only 3-branch
    // circuit) and a hand-enumerated grep for figure phrasings MISSED it: the
    // stem says "the following circuit", and the pattern listed "switching
    // circuit"/"given circuit" but never bare "circuit". fig_bounds.py found it.
    paper("jul-2024", "Maths July 2024 paper.pdf", 2024, "July", "J-174", "new", ["Q. 27"], {
      // The board set a Balbharati TEXTBOOK exercise verbatim as an exam
      // question, so the exam-scoped content_hash folded it into the practice
      // row that was already there. This sitting therefore holds 43 of its 44.
      absorbedRefs: [
        { ref: "Q. 12", into: "Definite Integration · practice · Ex 4.2 I (8) (StateBoard_12_Maths__Definite_Integration.pdf)" },
      ],
    }),
    paper("jul-2025", "Maths July 2025 paper.pdf", 2025, "July", "J-384", "new", ["Q. 27"]),

    // ── Reconciliation sittings ─────────────────────────────────────────────
    // The compilation's 2024 rows ARE this paper: its Q.1(vi)/(vii)/(viii) and
    // Q.2(iv) stems match this cover's items verbatim. 42 of 44 captured.
    paper("mar-2024", "Maths March 2024 paper new.pdf", 2024, "March", "J-862", "reconcile", ["Q. 15"], {
      bankRows: 42,
      knownMissingRefs: ["Q. 2. (iii)", "Q. 23"],
    }),
    // Filename says "March 2025"; cover says 2025 II 22 = 22 February 2025.
    // All 44 refs already present — nothing missing, so the whole value here is
    // verification against the printed page plus the month backfill.
    paper("feb-2025", "Maths March 2025 paper new.pdf", 2025, "February", "J-312", "reconcile", ["Q. 15"], {
      bankRows: 44,
      knownMissingRefs: [],
    }),
  ].map((p) => [p.id, p]),
);

export function requirePaper(id: string): Paper {
  const p = PAPERS[id];
  if (!p) throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  return p;
}

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);
export const pagesDir = (id: string) => join(OUT, id);
