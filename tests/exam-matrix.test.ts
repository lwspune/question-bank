import { describe, it, expect } from "vitest";
import {
  EXAM_PAPERS,
  EXAM_MATRIX,
} from "@/app/guide/nda-maths/_data/trends";

/**
 * Integrity guard for the hand-transcribed chapter × exam-paper matrix on
 * /guide/nda-maths/trends. The 30 rows × 18 columns are a SQL-derived
 * snapshot typed by hand, so these invariants catch any transcription slip:
 *   - every row's `total` equals the sum of its cells,
 *   - every cell row is aligned to the paper columns,
 *   - every paper column sums to exactly 120 (each NDA Maths paper is 120 q),
 *   - the whole matrix sums to 2,160 (the PUBLIC bank).
 */
describe("EXAM_MATRIX — chapter × exam-paper integrity", () => {
  it("has 18 paper columns (Apr=NDA-1, Sep=NDA-2; 2020 + 2026 are Apr-only)", () => {
    expect(EXAM_PAPERS).toHaveLength(18);
    // 2020 and 2026 have only an April paper.
    const aprOnly = EXAM_PAPERS.filter((p) => p.sitting === "2").map((p) => p.year);
    expect(aprOnly).not.toContain(2020);
    expect(aprOnly).not.toContain(2026);
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

  it("the whole matrix sums to the 2,160-question bank", () => {
    const grand = EXAM_MATRIX.reduce(
      (a, row) => a + row.counts.reduce((x, y) => x + y, 0),
      0
    );
    expect(grand).toBe(2160);
  });
});
