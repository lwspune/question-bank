/**
 * Flip a committed chapter's board PYQs to PUBLIC.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/flip-public.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/flip-public.ts <chapterId> --apply
 *
 * WITHHELD BY CONSTRUCTION — a row is flipped only when it is answered:
 *   - every row must carry a solution;
 *   - every MCQ must have exactly one option flagged correct.
 * A board paper ships no key, so an unanswered MCQ is a genuine state here and
 * must stay PRIVATE rather than go out with nothing marked right.
 *
 * Scoped to THIS chapter's source_file. The JEE `scan-flip` incident (2026-08-01)
 * published two rows another pass had deliberately withheld, because it matched
 * on a file that carried more than one pass's work; here one source_file is one
 * chapter, and the scope is asserted on every statement.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await client
    .from("questions")
    .select("id,question_number,pyq_year,visibility,solution,question_format,options(is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile);
  if (error) throw new Error(error.message);
  if (!rows?.length) throw new Error(`no rows for source_file ${ch.sourceFile} — commit first`);

  const ok: string[] = [];
  const withheld: string[] = [];
  for (const r of rows) {
    const why: string[] = [];
    if (!r.solution?.trim()) why.push("no solution");
    if (r.question_format === "mcq") {
      const correct = (r.options ?? []).filter((o: { is_correct: boolean }) => o.is_correct).length;
      if (correct !== 1) why.push(`${correct} options marked correct`);
    }
    if (why.length) withheld.push(`${r.question_number} (${r.pyq_year}): ${why.join("; ")}`);
    else ok.push(r.id);
  }

  console.log(`${ch.chapterName}: ${rows.length} rows | ready ${ok.length} | withheld ${withheld.length}`);
  for (const w of withheld) console.log(`  WITHHELD ${w}`);
  const already = rows.filter((r) => r.visibility === "PUBLIC").length;
  console.log(`already PUBLIC: ${already}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to flip. Nothing changed.");
    return;
  }
  if (!ok.length) {
    console.log("nothing to flip.");
    return;
  }

  // Flip by explicit id list, not by a filter — so the statement cannot reach a
  // row this run decided to withhold, even if the filter is later widened.
  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .in("id", ok);
  if (uErr) throw new Error(uErr.message);
  console.log(`flipped ${count} rows to PUBLIC.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
