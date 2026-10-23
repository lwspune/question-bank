/**
 * The Thursday cost line for V's weekly review (V_SPEC.md, 2026-10-23): cost per
 * answer over the last 7 full India-time days against the 7 before, flagged
 * above a 20% rise, plus what V's test runs cost in the same week.
 *
 *   npm run v:cost
 *
 * Read-only. Students' answers come from chat_ai_usage_by_day() (summed in the
 * database, migrations 0162 and 0180); test runs from v_eval_runs. Calls made
 * anywhere else are on the Anthropic Console bill, not here. Pure core
 * lib/chat/interactions.ts compareCostWeeks, the same the dashboard shows.
 */
import "../../lib/serverOnly";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { compareCostWeeks, COST_RISE_FLAG, MIN_ANSWERS_TO_COMPARE, type AiUsageDay } from "../../../src/lib/chat/interactions";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const usd = (v: number | null, places = 5) => (v === null ? "none" : `$${v.toFixed(places)}`);

async function main() {
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await admin.rpc("chat_ai_usage_by_day");
  if (error) throw new Error(error.message);
  const rows: AiUsageDay[] = (data ?? []).map((r: Record<string, unknown>) => ({
    day: r.day as string,
    answers: r.answers as number,
    failed: r.failed as number,
    tokensIn: Number(r.tokens_in),
    tokensOut: Number(r.tokens_out),
    cacheReadTokens: Number(r.cache_read_tokens),
    cacheWriteTokens: Number(r.cache_write_tokens),
    cacheWrite1hTokens: Number(r.cache_write_1h_tokens ?? 0),
  }));
  const w = compareCostWeeks(rows, new Date());

  // India-time day boundaries as UTC instants, for the test runs' timestamps.
  const istStart = (day: string) => new Date(`${day}T00:00:00+05:30`).toISOString();
  const { data: runs, error: runErr } = await admin
    .from("v_eval_runs")
    .select("cost_usd, cases")
    .gte("started_at", istStart(w.thisWeek.from))
    .lt("started_at", new Date(new Date(istStart(w.thisWeek.to)).getTime() + 86_400_000).toISOString());
  if (runErr) throw new Error(runErr.message);
  const testCost = (runs ?? []).reduce((s, r) => s + Number(r.cost_usd), 0);

  console.log(`V's cost, ${w.thisWeek.from} to ${w.thisWeek.to} (India time)`);
  console.log(`  Students: ${w.thisWeek.answers} answers, ${usd(w.thisWeek.costUsd, 3)}, ${usd(w.thisWeek.perAnswerUsd)} an answer`);
  console.log(`  Week before: ${w.lastWeek.answers} answers, ${usd(w.lastWeek.costUsd, 3)}, ${usd(w.lastWeek.perAnswerUsd)} an answer`);
  if (w.change !== null) {
    const pct = Math.round(w.change * 100);
    console.log(`  Change per answer: ${pct >= 0 ? "+" : ""}${pct}%${w.flagged ? `  <-- over ${COST_RISE_FLAG * 100}%: look into it` : ""}`);
  } else {
    console.log(`  Change per answer: not compared (a week had fewer than ${MIN_ANSWERS_TO_COMPARE} answers)`);
  }
  console.log(`  Test runs: ${(runs ?? []).length}, ${usd(testCost, 3)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
