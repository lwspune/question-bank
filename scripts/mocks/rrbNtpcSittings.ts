/**
 * RRB NTPC CBT 1 sittings for the mock builder, both levels: one mock per committed shift.
 * A shift is listed in RRB_NTPC_MOCK_SHIFTS once its commit lands
 * (scripts/rrb-ntpc/commit.ts writes one source file per shift).
 *
 * Every mock is the full 100: a flawed question (two right options, none, or a key we dispute)
 * rides as grace (src/lib/mocks/flawed.json, written by scripts/rrb-ntpc/grace.ts), never
 * shortening the paper.
 *
 * Unit-tested in tests/mock-rrb-ntpc.test.ts.
 */
import { LEVELS, SHIFTS, type Level, type Shift } from "../rrb-ntpc/config";

export type RrbNtpcSitting = { key: string; year: number; sourceFile: string; slug: string; title: string };

const shiftsOf = (level: Level) => Object.keys(SHIFTS).filter((id) => SHIFTS[id].level === level);

/** Graduate: all 24 shifts of 16-27 March 2026 landed 2026-11-13. */
export const RRB_NTPC_MOCK_SHIFTS: readonly string[] = shiftsOf("graduate");
/** Undergraduate: the 32 shifts of 7-9 May and 13-20 June 2026 (built only once all are committed). */
export const RRB_NTPC_UG_MOCK_SHIFTS: readonly string[] = shiftsOf("undergraduate");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function deriveRrbNtpcSittings(shifts: readonly (Shift & { id: string })[]): RrbNtpcSitting[] {
  return [...shifts]
    .sort((a, b) => a.date.localeCompare(b.date) || a.shift - b.shift)
    .map((s) => {
      const [y, m, d] = s.date.split("-").map(Number);
      const label = LEVELS[s.level].label; // "Graduate" / "Undergraduate"
      return {
        key: s.id,
        year: s.pyqYear,
        sourceFile: s.sourceFile,
        slug: `rrb-ntpc-${label.toLowerCase()}-cbt-1-${s.date}-shift-${s.shift}`,
        title: `RRB NTPC ${label} CBT 1 (${d} ${MONTHS[m - 1]} ${y}, Shift ${s.shift})`,
      };
    });
}

export function rrbNtpcSittings(): RrbNtpcSitting[] {
  return deriveRrbNtpcSittings(RRB_NTPC_MOCK_SHIFTS.map((id) => ({ id, ...SHIFTS[id] })));
}

export function rrbNtpcUgSittings(): RrbNtpcSitting[] {
  return deriveRrbNtpcSittings(RRB_NTPC_UG_MOCK_SHIFTS.map((id) => ({ id, ...SHIFTS[id] })));
}
