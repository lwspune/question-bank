/**
 * UPSC CAPF (AC) Paper I sittings for the mock builder: one mock per committed
 * year (scripts/capf/commit.ts writes one source file per year).
 *
 * Every mock is the full 125. Two kinds of grace:
 *  - an item UPSC DROPPED (its key's `X`, loaded keyless by commit.ts) is graced
 *    here in `prepare`, because a keyless row would otherwise fail the build's
 *    "has a correct answer" check before flawed.json is applied;
 *  - an item defective as printed (it keeps one key) rides as grace through
 *    src/lib/mocks/flawed.json, applied by mockTestRow.
 *
 * Unit-tested in tests/mock-capf.test.ts.
 */
import type { PaperQuestionRow } from "../../src/lib/mocks/reconstruct";
import { PAPERS, withdrawnFor, type Paper } from "../capf/config";

export type CapfSitting = {
  key: string;
  year: number;
  sourceFile: string;
  slug: string;
  title: string;
  prepare?: (rows: PaperQuestionRow[]) => PaperQuestionRow[];
};

/** The years committed to the bank: all nine, 2018-2026, landed 2026-11-14. */
export const CAPF_MOCK_YEARS: readonly string[] = Object.keys(PAPERS);

export function deriveCapfSittings(
  papers: readonly Paper[],
  dropped: (id: string) => number[] = withdrawnFor
): CapfSitting[] {
  return [...papers]
    .sort((a, b) => a.pyqYear - b.pyqYear)
    .map((p) => {
      const grace = new Set(dropped(p.id));
      return {
        key: p.id,
        year: p.pyqYear,
        sourceFile: p.sourceFile,
        slug: `capf-ac-paper-1-${p.pyqYear}`,
        title: `UPSC CAPF (AC) ${p.pyqYear} Paper I: General Ability and Intelligence`,
        ...(grace.size
          ? {
              prepare: (rows: PaperQuestionRow[]) =>
                rows.map((r) => (grace.has(Number(r.questionNumber)) ? { ...r, grace: true } : r)),
            }
          : {}),
      };
    });
}

export function capfSittings(): CapfSitting[] {
  return deriveCapfSittings(CAPF_MOCK_YEARS.map((id) => PAPERS[id]));
}
