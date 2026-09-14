import { describe, it, expect } from "vitest";
import {
  EXAM_PAPERS,
  EXAM_MATRIX,
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
