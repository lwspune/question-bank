import { describe, it, expect } from "vitest";
import {
  EXAM_PAPERS,
  EXAM_MATRIX,
  EXAM_MATRIX_PAPERS,
} from "@/app/guide/nda-maths/_data/trends";

/**
 * Integrity guard for the hand-transcribed chapter × exam-paper matrix on
 * /guide/nda-maths/trends. The 30 rows × 19 columns are a SQL-derived
 * snapshot typed by hand, so these invariants catch any transcription slip:
 *   - every row's `total` equals the sum of its cells,
 *   - every cell row is aligned to the paper columns,
 *   - every paper column sums to exactly 120 (each NDA Maths paper is 120 q),
 *   - the whole matrix sums to 2,280 (the PUBLIC bank).
 *
 * NDA-2 2026 was written on 2026-09-14 and ingested the same day, so 2026 is
 * a COMPLETE year for the first time and the matrix grew 18 -> 19 columns.
 * 2020 remains the only Apr-only year (NDA-2 2020 was COVID-cancelled).
 */
describe("EXAM_MATRIX — chapter × exam-paper integrity", () => {
  it("has 19 paper columns (Apr=NDA-1, Sep=NDA-2; only 2020 is Apr-only)", () => {
    expect(EXAM_PAPERS).toHaveLength(19);
    // 2020 is now the ONLY year with a single paper (NDA-2 2020 COVID-cancelled).
    const sittingTwoYears = EXAM_PAPERS.filter((p) => p.sitting === "2").map((p) => p.year);
    expect(sittingTwoYears).not.toContain(2020);
    // NDA-2 2026 was held on 2026-09-14 — it MUST now be present.
    expect(sittingTwoYears).toContain(2026);
  });

  it("every row's counts align to the paper columns", () => {
    for (const row of EXAM_MATRIX) {
      expect(row.counts, row.chapter).toHaveLength(EXAM_PAPERS.length);
    }
  });

  it("every row total equals the sum of its cells", () => {
    for (const row of EXAM_MATRIX) {
      const sum = row.counts.reduce((a, b) => a + b, 0);
      expect(sum, row.chapter).toBe(row.total);
    }
  });

  it("every paper column sums to exactly 120 questions", () => {
    EXAM_PAPERS.forEach((paper, col) => {
      const colSum = EXAM_MATRIX.reduce((a, row) => a + row.counts[col], 0);
      expect(colSum, paper.id).toBe(120);
    });
  });

  it("the whole matrix sums to the 2,280-question bank", () => {
    const grand = EXAM_MATRIX.reduce(
      (a, row) => a + row.counts.reduce((x, y) => x + y, 0),
      0
    );
    expect(grand).toBe(2280);
  });
});

/**
 * The NDA table's column LABELS, pinned across the 2026-09-19 generalisation
 * of `ExamPaperMatrix`.
 *
 * That component used to compute its own tooltip from `sitting` — correct
 * while NDA was its only caller, and a mislabelling the moment MHT-CET Maths
 * reused it (45 sittings, up to 17 in one year, none of them an "NDA-1"). The
 * labels moved into each data file and the component's `label`/`title` became
 * REQUIRED, with no default, so no exam can inherit another's vocabulary.
 *
 * Moving them is a change to a SHIPPED page, so what the reader sees is pinned
 * here: the sub-header still reads "1"/"2" and the tooltips still name the
 * April and September sittings. These assertions are the evidence that the
 * refactor is invisible on /guide/nda-maths/trends.
 */
describe("EXAM_MATRIX_PAPERS — NDA column labels are unchanged", () => {
  it("renders one column per paper, in the same order", () => {
    expect(EXAM_MATRIX_PAPERS).toHaveLength(EXAM_PAPERS.length);
    expect(EXAM_MATRIX_PAPERS.map((p) => p.id)).toEqual(
      EXAM_PAPERS.map((p) => p.id)
    );
    expect(EXAM_MATRIX_PAPERS.map((p) => p.year)).toEqual(
      EXAM_PAPERS.map((p) => p.year)
    );
  });

  it("still shows a bare 1 / 2 in the sub-header", () => {
    for (const [i, p] of EXAM_MATRIX_PAPERS.entries()) {
      expect(p.label, p.id).toBe(EXAM_PAPERS[i].sitting);
    }
    expect(new Set(EXAM_MATRIX_PAPERS.map((p) => p.label))).toEqual(
      new Set(["1", "2"])
    );
  });

  it("still names the sitting in the tooltip, exactly as before", () => {
    const titles = new Map(EXAM_MATRIX_PAPERS.map((p) => [p.id, p.title]));
    expect(titles.get("24A")).toBe("NDA-1 (April)");
    expect(titles.get("24S")).toBe("NDA-2 (September)");
    // Every column has one — the component has no fallback to supply it.
    for (const p of EXAM_MATRIX_PAPERS) {
      expect(p.title, p.id).toMatch(/^NDA-[12] \((April|September)\)$/);
    }
  });

  it("marks no NDA column as disputed", () => {
    // `disputed` exists for MHT-CET, where one paper's filename and note
    // disagree. Nothing in the NDA data carries that ambiguity, so no NDA
    // column should pick up the dotted underline.
    for (const p of EXAM_MATRIX_PAPERS) expect(p.disputed).toBeFalsy();
  });
});
