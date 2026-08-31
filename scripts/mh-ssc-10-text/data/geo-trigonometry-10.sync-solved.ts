/**
 * Push the `solution` of the SOLVED rows of geo-trigonometry-10 from the
 * transcription source of truth into the live rows.
 *
 * Needed because commit.ts upserts with ignoreDuplicates, so re-running it will
 * not update an existing row's solution — and a solved example's solution comes
 * from questions.json, not from the apply-solutions path. `content_hash`
 * excludes `solution`, so this cannot orphan or duplicate a row; it is asserted
 * below by comparing the hash before and after.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const EXAM = "a41ef5c6-fa20-4bc1-be8b-ba4263d5afd2";
const SRC = "StateBoard_10_Geometry__Trigonometry.pdf";

async function main() {
  const qs = JSON.parse(
    readFileSync(join(__dirname, "..", "data", "geo-trigonometry-10.questions.json"), "utf8")
  ) as Array<{ ref: string; bucket: string; solution?: string }>;
  const solved = qs.filter((q) => q.bucket === "solved" && q.solution);

  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: before } = await c
    .from("questions").select("question_number, content_hash, solution")
    .eq("exam_id", EXAM).eq("source_file", SRC);
  const hashBefore = new Map((before ?? []).map((r: any) => [r.question_number, r.content_hash]));

  let changed = 0;
  for (const q of solved) {
    const live = (before ?? []).find((r: any) => r.question_number === q.ref);
    if (!live) { console.log(`  (no live row for "${q.ref}" — expected only for the deduped SolvedEx.2)`); continue; }
    if (live.solution === q.solution) continue;
    const { error, count } = await c
      .from("questions").update({ solution: q.solution }, { count: "exact" })
      .eq("exam_id", EXAM).eq("source_file", SRC).eq("question_number", q.ref);
    if (error) throw error;
    changed += count ?? 0;
    console.log(`  updated "${q.ref}"`);
  }

  const { data: after } = await c
    .from("questions").select("question_number, content_hash")
    .eq("exam_id", EXAM).eq("source_file", SRC);
  const moved = (after ?? []).filter((r: any) => hashBefore.get(r.question_number) !== r.content_hash);
  console.log(`solved rows in source: ${solved.length} | solutions updated: ${changed} | content_hash changed on ${moved.length} row(s)`);
  if (moved.length) throw new Error("content_hash moved — that must never happen for a solution-only edit");
}

main().catch((e) => { console.error(e); process.exit(1); });
