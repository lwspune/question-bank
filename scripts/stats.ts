/**
 * Read-only stats reporter for the CLAUDE.md header lines that drift every
 * session (Live bank size, taxonomy counts, /notes chapters, diagram count).
 * Run it, then verify/paste — instead of hand-maintaining the numbers.
 *
 *   npm run stats
 *
 * Bank counts come from the live DB via head-count queries (count: "exact",
 * head: true — header-based, so NOT subject to the 1000-row cap). /notes
 * chapters come from NOTES_CHAPTERS; diagram count from the visualizations dir.
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

async function pubCount(sb: SupabaseClient, col: string, id: string): Promise<number> {
  const { count } = await sb
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq(col, id)
    .eq("visibility", "PUBLIC");
  return count ?? 0;
}

async function headCount(sb: SupabaseClient, table: string, filter?: [string, string]): Promise<number> {
  let q = sb.from(table).select("*", { count: "exact", head: true });
  if (filter) q = q.eq(filter[0], filter[1]);
  const { count } = await q;
  return count ?? 0;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(2);
  }
  const sb = createClient(url, key);

  const { data: exams } = await sb.from("exams").select("id, name").order("name");
  const { data: subjects } = await sb.from("subjects").select("id, name, exam_id");

  console.log("=== Live bank size (PUBLIC questions) ===");
  let grandTotal = 0;
  for (const e of exams ?? []) {
    const subs = (subjects ?? []).filter((s) => s.exam_id === e.id);
    const counts = await Promise.all(
      subs.map(async (s) => ({ name: s.name, n: await pubCount(sb, "subject_id", s.id) }))
    );
    const active = counts.filter((c) => c.n > 0).sort((a, b) => b.n - a.n);
    const examTotal = active.reduce((a, c) => a + c.n, 0);
    if (examTotal === 0) continue;
    grandTotal += examTotal;
    console.log(
      `  ${e.name}: ${examTotal.toLocaleString("en-IN")}  (` +
        active.map((c) => `${c.name} ${c.n.toLocaleString("en-IN")}`).join(", ") +
        ")"
    );
  }
  console.log(`  TOTAL PUBLIC: ${grandTotal.toLocaleString("en-IN")}`);

  const [chapters, subtopics, allQ] = await Promise.all([
    headCount(sb, "chapters"),
    headCount(sb, "subtopics"),
    headCount(sb, "questions"),
  ]);
  console.log(`\n=== Taxonomy ===`);
  console.log(`  chapters: ${chapters}   subtopics: ${subtopics}   questions (all visibilities): ${allQ.toLocaleString("en-IN")}`);

  console.log(`\n=== /notes ===`);
  const byRoute = new Map<string, number>();
  for (const c of NOTES_CHAPTERS) byRoute.set(c.subjectRoute, (byRoute.get(c.subjectRoute) ?? 0) + 1);
  console.log(`  chapters: ${NOTES_CHAPTERS.length}  (` + [...byRoute].map(([r, n]) => `${r} ${n}`).join(", ") + ")");
  const vizDir = path.join(process.cwd(), "src/app/notes/_components/visualizations");
  const vizCount = fs.readdirSync(vizDir).filter((f) => f.endsWith(".tsx")).length;
  console.log(`  diagrams (visualizations/*.tsx): ${vizCount}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
