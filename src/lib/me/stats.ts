/**
 * The /me progress row: answered, % right, fixed (2026-11-05).
 *
 * It used to count mocks sat, notes topics mastered and saved questions. On
 * 2026-11-05, 446 of the 745 students who opened /me in 30 days saw three
 * zeros there and 739 saw 0 topics mastered, while the bank and /board took
 * ~31,000 answers that month. These three numbers come from the pulse
 * (/api/me/pulse `totals`), which counts every surface, so practice shows.
 *
 * No row before the first answer and none when the read failed: a zero there
 * reads as "you did nothing", and a failed read is not a zero.
 *
 * Pure. Spec: tests/me-stats.test.ts.
 */
import type { PulseTotals } from "@/lib/pulse/cache";
import { drillHref } from "@/lib/drill/from";

export type ProgressTile = {
  key: "answered" | "right" | "fixed";
  value: string;
  label: string;
  href?: string;
  note?: string;
};

const n = (v: number) => v.toLocaleString("en-IN");

export function progressTiles(
  totals: PulseTotals | null | undefined,
  /** Mistakes due in the drill; null while unknown. */
  due: number | null
): ProgressTile[] | null {
  if (!totals || totals.answered <= 0) return null;
  const pct = Math.round((100 * totals.right) / totals.answered);
  return [
    { key: "answered", value: n(totals.answered), label: "answered" },
    { key: "right", value: `${pct}%`, label: "right" },
    {
      key: "fixed",
      value: n(totals.fixed),
      label: "fixed",
      href: drillHref("me_tile"),
      note: due != null && due > 0 ? `${n(due)} to fix` : undefined,
    },
  ];
}
