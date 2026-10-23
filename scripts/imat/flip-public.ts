/**
 * Flip the ministry's IMAT papers (2023 on) PUBLIC — the deliberate publishing step
 * commit.ts refuses to take (it writes PRIVATE).
 *
 *   npx tsx scripts/imat/flip-public.ts           # dry run: counts and checks only
 *   npx tsx scripts/imat/flip-public.ts --apply   # back up first: npm run db:backup
 *
 * Decided by the owner 2026-10-23 (copyright decision D1, NICHE_SITES_SPEC.md section 7).
 * Scope: IMAT past-paper rows that are NOT publish_blocked, i.e. the MUR papers. The
 * Cambridge years (2011-2022) are publish_blocked and the database refuses to make them
 * PUBLIC anyway (migration 0141). Refuses to flip while any row in scope lacks a
 * subtopic (subtopics.ts --assign --mur) or does not have exactly one correct option.
 * Reversible: set the same rows back to PRIVATE.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam, error: examErr } = await db.from("exams").select("id").eq("name", EXAM_NAME).single();
  if (examErr || !exam) throw new Error(`exam ${EXAM_NAME} not found: ${examErr?.message}`);

  const { data: rows, error } = await db
    .from("questions")
    .select("id, pyq_year, visibility, subtopic_id, options(is_correct)")
    .eq("exam_id", exam.id)
    .eq("question_kind", "pyq")
    .is("publish_blocked", null);
  if (error) throw new Error(error.message);
  const scope = (rows ?? []) as { id: string; pyq_year: number; visibility: string; subtopic_id: string | null; options: { is_correct: boolean }[] }[];

  const byYear = new Map<number, number>();
  for (const r of scope) byYear.set(r.pyq_year, (byYear.get(r.pyq_year) ?? 0) + 1);
  console.log(`in scope: ${scope.length} rows (${[...byYear].sort().map(([y, n]) => `${y}: ${n}`).join(" · ")})`);
  console.log(`PUBLIC ${scope.filter((r) => r.visibility === "PUBLIC").length} · PRIVATE ${scope.filter((r) => r.visibility === "PRIVATE").length}`);

  const noSubtopic = scope.filter((r) => !r.subtopic_id).length;
  const badKey = scope.filter((r) => r.options.length !== 5 || r.options.filter((o) => o.is_correct).length !== 1).length;
  if (noSubtopic || badKey) {
    throw new Error(`refusing: ${noSubtopic} row(s) without a subtopic, ${badKey} without five options and exactly one key`);
  }
  if (!apply) return console.log("[dry run] checks pass; pass --apply to flip.");

  const ids = scope.filter((r) => r.visibility === "PRIVATE").map((r) => r.id);
  for (let i = 0; i < ids.length; i += 200) {
    const { error: upErr } = await db.from("questions").update({ visibility: "PUBLIC" }).in("id", ids.slice(i, i + 200));
    if (upErr) throw new Error(upErr.message);
  }
  const { count } = await db
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", exam.id)
    .eq("question_kind", "pyq")
    .is("publish_blocked", null)
    .eq("visibility", "PRIVATE");
  if (count) throw new Error(`${count} row(s) in scope still PRIVATE`);
  console.log(`flipped ${ids.length}; verified every ministry row is PUBLIC.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
