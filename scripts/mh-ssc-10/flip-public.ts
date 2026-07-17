/**
 * Flip the ANSWERED subset of a committed MH-SSC-10 board paper to PUBLIC.
 *
 *   npx tsx scripts/mh-ssc-10/flip-public.ts <paperId>          # dry-run (counts)
 *   npx tsx scripts/mh-ssc-10/flip-public.ts <paperId> --apply  # write
 *
 * Ship rule (the "derive + REVIEW-flag → publish" decision): a row is PUBLIC iff
 * it carries an answer.
 *   - MCQ  → has a correct option set (a derived key).
 *   - subjective → solution IS NOT NULL (an authored model answer).
 * A row with neither stays PRIVATE. Every published answer is REVIEW-flagged in
 * the data JSON, awaiting a human spot-check.
 *
 * Figures must be attached + verified before flipping a figure-bearing paper
 * (Geometry) PUBLIC — the shared snapCrop verify-gate. Pass --except=<refs> to
 * hold specific question_numbers PRIVATE (e.g. an unresolved figure).
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()).filter(Boolean) : [];
  const paper = requirePaper(id);
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Answered rows: subjective with a solution, OR mcq with a correct option.
  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, question_format, solution, options(is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(`read failed: ${error.message}`);

  const answered = (rows ?? []).filter((r) => {
    if (except.includes(r.question_number ?? "")) return false;
    if (r.question_format === "subjective") return r.solution != null && r.solution !== "";
    return (r.options ?? []).some((o: { is_correct: boolean }) => o.is_correct);
  });
  const total = rows?.length ?? 0;
  console.log(`${paper.subjectName} ${paper.year} (${id}): ${answered.length}/${total} rows answered → PUBLIC candidates.`);
  if (except.length) console.log(`  holding PRIVATE (--except): ${except.join(", ")}`);

  if (!apply) {
    console.log("[dry-run] pass --apply to flip these to PUBLIC.");
    return;
  }
  if (answered.length === 0) {
    console.log("nothing to flip.");
    return;
  }

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .in("id", answered.map((r) => r.id));
  if (uErr) throw new Error(`flip failed: ${uErr.message}`);
  console.log(`flipped ${count} rows to PUBLIC.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
