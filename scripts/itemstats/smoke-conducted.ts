/**
 * Drive the paper builder's exposure lookup against LIVE data.
 *
 *   npx tsx scripts/itemstats/smoke-conducted.ts
 *
 * `/dashboard/papers/[id]` is auth-gated and `force-dynamic`, so `next build`
 * never executes it and the chip cannot be proven by the gate. This exercises
 * the real query and the real formatter over questions that are actually in
 * papers — the half that can fail against real rows.
 *
 * It does NOT prove the chip lays out. That is owed to a browser.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { summarizeConducted, formatConductedLabel } from "@/lib/papers/conducted";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: org } = await db
    .from("organizations")
    .select("id")
    .eq("name", "LWS Pune")
    .maybeSingle();
  if (!org) throw new Error("org not found");

  const { data: pq } = await db.from("paper_questions").select("question_id").limit(1000);
  const ids = [...new Set((pq ?? []).map((r) => (r as { question_id: string }).question_id))];

  // Chunked exactly as the real lookup is — a `.in()` list rides in the URL.
  const rows: Record<string, unknown>[] = [];
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db
      .from("question_item_stats")
      .select("question_id, source_ref, cohort_label, measured_at")
      .in("question_id", ids.slice(i, i + 200))
      .eq("org_id", (org as { id: string }).id)
      .not("cohort_label", "is", null);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
  }

  const map = summarizeConducted(rows as never);
  console.log(
    `paper questions sampled ${ids.length} | with conducted exposure ${map.size}`
  );

  let shown = 0;
  for (const [, refs] of map) {
    if (shown++ >= 5) break;
    const own = refs[0].cohorts[0];
    console.log(`  neutral : ${formatConductedLabel(refs, { batchName: null })}`);
    console.log(`  own     : ${formatConductedLabel(refs, { batchName: own })}`);
    console.log(`  other   : ${formatConductedLabel(refs, { batchName: "Some Other Batch" })}`);
  }

  // The org filter is the whole security property here: the RLS policy on
  // question_item_stats is deliberately GLOBAL (the statistic pools across every
  // institute), so another institute's batch names are excluded by this query
  // alone. Assert it rather than assume it.
  const { count: all } = await db
    .from("question_item_stats")
    .select("*", { count: "exact", head: true })
    .not("cohort_label", "is", null);
  const { count: mine } = await db
    .from("question_item_stats")
    .select("*", { count: "exact", head: true })
    .not("cohort_label", "is", null)
    .eq("org_id", (org as { id: string }).id);
  console.log(`\ncohort-bearing rows: ${all} total, ${mine} for this org`);
  if (all !== mine) console.log("  (a second institute exists — the org filter is load-bearing)");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
