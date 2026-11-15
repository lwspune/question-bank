/**
 * npm run world-exams:smoke [-- --target=test]
 *
 * Drives /dashboard/world-exams' own read (fetchWorldExams) and arrangement
 * (lib/worldExams/view) over the stored rows. The page is superadmin-gated and
 * dynamic, so the build never renders it; this proves the data chain, not the
 * layout. Read-only. Exits 1 if a check fails. Prints counts only, never the
 * content (the content stays out of logs as well as out of the repo).
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { fetchWorldExams } from "../../src/lib/worldExams/query";
import { groupByRegion, revenueByCountry, shortlist, verdictCounts } from "../../src/lib/worldExams/view";

const target = process.argv.find((a) => a.startsWith("--target="))?.split("=")[1] ?? "prod";
config({ path: target === "test" ? ".env.test.local" : ".env.local", override: true });
const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  if (!url || !key) throw new Error(`missing Supabase URL or service-role key for ${target}`);
  const { exams, notes } = await fetchWorldExams(createClient(url, key, { auth: { persistSession: false } }));
  const failures: string[] = [];

  const top = shortlist(exams);
  const ranks = top.map((e) => e.shortlistRank);
  if (ranks.some((r, i) => r !== i + 1)) failures.push(`shortlist ranks are not 1..${top.length}: ${ranks.join(",")}`);
  if (top.some((e) => e.verdict !== "shortlist")) failures.push("a ranked row's verdict is not 'shortlist'");
  if (exams.some((e) => e.verdict === "shortlist" && e.shortlistRank === null)) failures.push("a 'shortlist' row has no rank");

  const groups = groupByRegion(exams);
  const grouped = groups.reduce((n, g) => n + g.countries.reduce((m, c) => m + c.exams.length, 0), 0);
  if (grouped !== exams.length) failures.push(`grouping lost rows: ${grouped} of ${exams.length}`);

  const revenue = revenueByCountry(exams);
  for (const t of revenue) {
    if (!(t.low <= t.mid && t.mid <= t.high)) failures.push(`${t.country}: revenue not low <= mid <= high`);
  }

  console.log(`target: ${target}`);
  console.log(`exams ${exams.length}, countries ${new Set(exams.map((e) => e.country)).size}, notes ${notes.length}`);
  console.log(`shortlist ${top.length}; regions ${groups.map((g) => `${g.region} ${g.countries.length}`).join(", ")}`);
  console.log(`verdicts ${JSON.stringify(verdictCounts(exams))}`);
  console.log(`revenue rows for ${revenue.length} countries`);
  if (failures.length) {
    console.error(`FAIL:\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log("OK");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
