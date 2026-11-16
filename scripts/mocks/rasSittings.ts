/**
 * RPSC RAS/RTS Prelims sittings for the mock builder: one mock per committed
 * year (scripts/ras/commit.ts writes one source file per year).
 *
 * Every mock is the full 150. An item RPSC DELETED (its final key's `X`,
 * committed as a CANCELLED row with no correct option) is graced here in
 * `prepare`, because a keyless row would otherwise fail the build's "has a
 * correct answer" check. RPSC kept every other item, including the two that
 * carry a notice (2016 Q94, 2013 Q100), so those are scored by the key.
 *
 * Unit-tested in tests/mock-ras.test.ts.
 */
import type { PaperQuestionRow } from "../../src/lib/mocks/reconstruct";
import { PAPERS, withdrawnFor, type Paper } from "../ras/config";

export type RasSitting = {
  key: string;
  year: number;
  sourceFile: string;
  slug: string;
  title: string;
  prepare?: (rows: PaperQuestionRow[]) => PaperQuestionRow[];
};

/** The years committed to the bank: all six keyed sittings, landed 2026-11-16. */
export const RAS_MOCK_YEARS: readonly string[] = Object.keys(PAPERS);

/** The calendar year a paper was sat in, from its printed date ("31 Oct 2015"). */
const heldYear = (p: Paper): number => Number(p.held.match(/\d{4}$/)?.[0] ?? p.pyqYear);

export function deriveRasSittings(
  papers: readonly Paper[],
  deleted: (id: string) => number[] = withdrawnFor
): RasSitting[] {
  return [...papers]
    .sort((a, b) => a.pyqYear - b.pyqYear)
    .map((p) => {
      const grace = new Set(deleted(p.id));
      // The 2013 cycle's paper was re-held in 2015; a cycle sat in its own year
      // or the next (2024, sat Feb 2025) is named by the cycle alone.
      const held = heldYear(p);
      const when = held > p.pyqYear + 1 ? `${p.pyqYear} (held ${held})` : String(p.pyqYear);
      return {
        key: p.id,
        year: p.pyqYear,
        sourceFile: p.sourceFile,
        slug: `rpsc-ras-prelims-${p.pyqYear}`,
        title: `RPSC RAS Prelims ${when}: General Knowledge and General Science`,
        ...(grace.size
          ? {
              prepare: (rows: PaperQuestionRow[]) =>
                rows.map((r) => (grace.has(Number(r.questionNumber)) ? { ...r, grace: true } : r)),
            }
          : {}),
      };
    });
}

export function rasSittings(): RasSitting[] {
  return deriveRasSittings(RAS_MOCK_YEARS.map((id) => PAPERS[id]));
}
