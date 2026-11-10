/**
 * UGC NET Paper 1 sittings for the mock builder: one mock per committed shift.
 * A shift is listed in UGC_NET_MOCK_SHIFTS once its commit lands
 * (scripts/ugc-net/commit.ts writes one source file per shift).
 *
 * Every mock is the full 50: a question NTA dropped or keyed two ways rides as
 * grace (src/lib/mocks/flawed.json), never shortening the paper.
 *
 * Unit-tested in tests/mock-ugc-net.test.ts.
 */
import { CYCLES, SHIFTS, pyqYear, sourceFile, type Shift } from "../ugc-net/config";

export type UgcNetSitting = { key: string; year: number; sourceFile: string; slug: string; title: string };

/** The shifts committed to the bank. Add a shift id here when its commit lands. */
export const UGC_NET_MOCK_SHIFTS: readonly string[] = [
  // June 2024: all 20 shifts committed 2026-11-10 (5 Sep Shift 1 has no hosted paper).
  "2024-08-21-1",
  "2024-08-21-2",
  "2024-08-22-1",
  "2024-08-22-2",
  "2024-08-23-1",
  "2024-08-23-2",
  "2024-08-27-1",
  "2024-08-27-2",
  "2024-08-28-1",
  "2024-08-28-2",
  "2024-08-29-1",
  "2024-08-29-2",
  "2024-08-30-1",
  "2024-08-30-2",
  "2024-09-02-1",
  "2024-09-02-2",
  "2024-09-03-1",
  "2024-09-03-2",
  "2024-09-04-1",
  "2024-09-04-2",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function deriveUgcNetSittings(shifts: readonly Shift[]): UgcNetSitting[] {
  return [...shifts]
    .sort((a, b) => a.date.localeCompare(b.date) || a.shift - b.shift)
    .map((s) => {
      const [y, m, d] = s.date.split("-").map(Number);
      return {
        key: s.id,
        year: pyqYear(s),
        sourceFile: sourceFile(s),
        slug: `ugc-net-paper-1-${s.date}-shift-${s.shift}`,
        title: `UGC NET Paper 1, ${CYCLES[s.cycle].name} (${d} ${MONTHS[m - 1]} ${y}, Shift ${s.shift})`,
      };
    });
}

export function ugcNetSittings(): UgcNetSitting[] {
  return deriveUgcNetSittings(SHIFTS.filter((s) => UGC_NET_MOCK_SHIFTS.includes(s.id)));
}
