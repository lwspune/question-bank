/**
 * Commit the IMAT twins into the bank as PRIVATE practice questions.
 *
 *   npx tsx scripts/imat/practice/commit.ts 2022          # dry run for one year
 *   npx tsx scripts/imat/practice/commit.ts all           # dry run for every year
 *   npx tsx scripts/imat/practice/commit.ts all --apply   # write
 *
 * Each twin becomes one row: question_kind 'practice' and visibility PRIVATE,
 * both written AT INSERT (so a twin never counts as a past question or shows
 * publicly, not even for a moment), with its worked solution.
 *
 * Not publish_blocked: the twins are our own and meant to be published once
 * the IMAT site exists. Not carried: the Cambridge source (`twinOf`), which
 * stays in the repo for coverage tracking only (lib.ts buildTwinRow).
 *
 * Refuses to write while check.ts reports any problem. Idempotent: the
 * (org, exam, content_hash) unique index skips a twin already stored.
 * Rollback is by source_file, "imat-twins-<year>.json".
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { commitStaged } from "../../../src/lib/upload/commit";
import { CREATED_BY, EXAM_NAME, ORG_ID } from "../config";
import { CAMBRIDGE_YEARS, checkAllTwins, loadTwinFile } from "./check";
import { buildTwinRow } from "./lib";

export const twinSourceFile = (year: number) => `imat-twins-${year}.json`;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const which = args.find((a) => !a.startsWith("--"));
  const apply = args.includes("--apply");
  const years = which === "all" ? CAMBRIDGE_YEARS : [Number(which)];
  if (!years.every((y) => CAMBRIDGE_YEARS.includes(y))) throw new Error(`give a year 2011-2022 or "all"`);

  const { problems } = checkAllTwins();
  if (problems.length) {
    console.log(`CHECK: ${problems.length} problem(s); run scripts/imat/practice/check.ts`);
    for (const p of problems.slice(0, 20)) console.log(`  - ${p}`);
    throw new Error("refusing to commit with problems");
  }
  console.log("CHECK: ok");

  const plan = years.map((year) => {
    const twins = loadTwinFile(year);
    return { year, sourceFile: twinSourceFile(year), rows: twins.map((t, i) => buildTwinRow(t, i + 1)) };
  });
  for (const p of plan) console.log(`  ${p.sourceFile}: ${p.rows.length} twin(s)`);
  console.log(`total: ${plan.reduce((n, p) => n + p.rows.length, 0)} twin(s)`);
  if (!apply) {
    console.log("\n[dry run] pass --apply to write. Nothing inserted.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" not found`);
  const examId = exam.id as string;

  for (const { sourceFile, rows } of plan) {
    const { data: existingJob } = await client
      .from("upload_jobs")
      .select("id")
      .eq("org_id", ORG_ID)
      .eq("filename", sourceFile)
      .limit(1)
      .maybeSingle();
    let jobId = existingJob?.id as string | undefined;
    if (!jobId) {
      const { data: job, error } = await client
        .from("upload_jobs")
        .insert({ org_id: ORG_ID, filename: sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
        .select("id")
        .single();
      if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
      jobId = job.id;
    }

    const result = await commitStaged(client, {
      orgId: ORG_ID,
      examId,
      filename: sourceFile,
      createdBy: CREATED_BY,
      rows,
      uploadJobId: jobId,
      visibility: "PRIVATE",
      questionKind: "practice",
    });
    console.log(`${sourceFile}: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
    for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

    const count = async (extra: (q: ReturnType<typeof base>) => ReturnType<typeof base>) => (await extra(base())).count ?? 0;
    const base = () =>
      client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("source_file", sourceFile);
    const stored = await count((q) => q);
    const privatePractice = await count((q) => q.eq("visibility", "PRIVATE").eq("question_kind", "practice"));
    await client
      .from("upload_jobs")
      .update({ status: "COMPLETED", total_rows: stored, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
      .eq("id", jobId);
    console.log(`  stored ${stored}, of which ${privatePractice} PRIVATE practice`);
    if (stored !== rows.length) console.log(`  !! expected ${rows.length} rows`);
    if (privatePractice !== stored) console.log(`  !! ${stored - privatePractice} row(s) are not PRIVATE practice`);
  }
}

if (require.main === module)
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
