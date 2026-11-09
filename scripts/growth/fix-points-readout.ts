/**
 * `npm run fix-points:readout`: the Fix Points experiment's numbers (growth
 * registry id "fix-points", migration 0245).
 *
 * Two windows of the same length, measured by ONE instrument
 * (`fix_points_readout`, the award's own rule): the 30 days before launch and
 * the days since launch (up to 30). Prints graded fixes per active student in
 * each, the rise, and passes sold with points, against the registry's rule.
 *
 * Read-only, service role.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { EXPERIMENTS, FIX_POINTS_FIXES_LIFT_PCT, FIX_POINTS_SALES_KEEP } from "@/lib/growth/registry";

const DAY = 24 * 60 * 60 * 1000;

type Row = {
  active_students: number;
  fixers: number;
  fixes: number;
  points_students: number;
  sales: number;
  sales_with_points: number;
};

async function window(since: Date, until: Date): Promise<Row> {
  const { data, error } = await createSupabaseAdminClient().rpc("fix_points_readout", {
    p_since: since.toISOString(),
    p_until: until.toISOString(),
  });
  if (error) throw new Error(`fix_points_readout: ${error.message}`);
  const r = (data as Row[])[0];
  return Object.fromEntries(Object.entries(r).map(([k, v]) => [k, Number(v)])) as Row;
}

const perStudent = (r: Row) => (r.active_students > 0 ? r.fixes / r.active_students : 0);

async function main() {
  const exp = EXPERIMENTS.find((e) => e.id === "fix-points");
  if (!exp) throw new Error("experiment fix-points missing from the registry");
  const live = new Date(`${exp.liveSince}T00:00:00+05:30`);
  const days = Math.min(exp.windowDays ?? 30, Math.max(1, Math.floor((Date.now() - live.getTime()) / DAY)));
  const after = await window(live, new Date(live.getTime() + days * DAY));
  const before = await window(new Date(live.getTime() - days * DAY), live);

  const lift = perStudent(before) > 0 ? ((perStudent(after) - perStudent(before)) / perStudent(before)) * 100 : 0;
  const line = (label: string, r: Row) =>
    `${label.padEnd(8)} ${String(r.active_students).padStart(6)} active · ${String(r.fixers).padStart(4)} fixers · ` +
    `${String(r.fixes).padStart(5)} fixes · ${perStudent(r).toFixed(2)} per active · ${r.sales} sales (${r.sales_with_points} with points)`;

  console.log(`Fix Points readout: ${days} days either side of ${exp.liveSince}`);
  console.log(line("before", before));
  console.log(line("after", after));
  console.log(`students who earned points since launch: ${after.points_students}`);
  console.log(`fixes per active student: ${lift >= 0 ? "+" : ""}${lift.toFixed(0)}% (keep needs +${FIX_POINTS_FIXES_LIFT_PCT}%)`);
  console.log(`passes sold with points: ${after.sales_with_points} (keep needs ${FIX_POINTS_SALES_KEEP})`);
  const keep = lift >= FIX_POINTS_FIXES_LIFT_PCT && after.sales_with_points >= FIX_POINTS_SALES_KEEP;
  console.log(days < (exp.windowDays ?? 30) ? `(window not complete: ${days} of ${exp.windowDays ?? 30} days)` : keep ? "VERDICT: keep" : "VERDICT: switch off");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
