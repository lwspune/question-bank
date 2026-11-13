/**
 * RRB NTPC Graduate CBT 1 sittings for the mock builder: one mock per committed shift.
 * A shift is listed in RRB_NTPC_MOCK_SHIFTS once its commit lands
 * (scripts/rrb-ntpc/commit.ts writes one source file per shift).
 *
 * Every mock is the full 100: a flawed question (two right options, none, or a key we dispute)
 * rides as grace (src/lib/mocks/flawed.json, written by scripts/rrb-ntpc/grace.ts), never
 * shortening the paper.
 *
 * Unit-tested in tests/mock-rrb-ntpc.test.ts.
 */
import { SHIFTS, type Shift } from "../rrb-ntpc/config";

export type RrbNtpcSitting = { key: string; year: number; sourceFile: string; slug: string; title: string };

/** The shifts committed to the bank. All 24 of 16-27 March 2026 landed 2026-11-13. */
export const RRB_NTPC_MOCK_SHIFTS: readonly string[] = Object.keys(SHIFTS);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function deriveRrbNtpcSittings(shifts: readonly (Shift & { id: string })[]): RrbNtpcSitting[] {
  return [...shifts]
    .sort((a, b) => a.date.localeCompare(b.date) || a.shift - b.shift)
    .map((s) => {
      const [y, m, d] = s.date.split("-").map(Number);
      return {
        key: s.id,
        year: s.pyqYear,
        sourceFile: s.sourceFile,
        slug: `rrb-ntpc-graduate-cbt-1-${s.date}-shift-${s.shift}`,
        title: `RRB NTPC Graduate CBT 1 (${d} ${MONTHS[m - 1]} ${y}, Shift ${s.shift})`,
      };
    });
}

export function rrbNtpcSittings(): RrbNtpcSitting[] {
  return deriveRrbNtpcSittings(RRB_NTPC_MOCK_SHIFTS.map((id) => ({ id, ...SHIFTS[id] })));
}
