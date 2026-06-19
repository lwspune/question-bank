/**
 * Commit an LWS test paper into the system:
 *   1. commit ALL its questions as PRIVATE, question_kind='practice' rows (so the
 *      paper can reference every question), and
 *   2. create the /dashboard/papers paper with all questions in printed Q-order
 *      under a single section — "as if the question paper was created there".
 *
 *   npx tsx scripts/practice-paper/commit-paper.ts <slug>          # dry-run
 *   npx tsx scripts/practice-paper/commit-paper.ts <slug> --apply  # write
 *
 * ALL records are committed (the printed test in full); status only governs the
 * later PUBLIC flip (flip-public.ts promotes status:"new" only). dup + flawed
 * stay PRIVATE forever — they back the faithful paper but never enter the
 * browsable practice bank. Idempotent: questions upsert on (org,exam,content_hash)
 * + re-stamp kind/visibility; the paper is reused if one with the same title
 * already exists in the org, and addQuestion is idempotent on (paper,question).
 *
 * Re-commit hazard: editing a stem/option/answer changes content_hash, so a
 * re-commit INSERTS a new row + orphans the old — delete the source's rows first.
 * Editing only `solution` text is safe.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { findLatexImbalance } from "../practice/lib";
import { createPaper, addQuestion } from "../../src/lib/papers/admin";
import type { SectionTemplate } from "../../src/lib/papers/types";
import {
  ORG_ID, EXAM_ID, CREATED_BY,
  requirePaper, loadRecords, validateRecords, recToParsedRow, statusOf,
} from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function findOrCreatePaper(client: SupabaseClient, spec: ReturnType<typeof requirePaper>, qCount: number): Promise<string> {
  const { data: existing } = await client
    .from("papers").select("id").eq("org_id", ORG_ID).eq("title", spec.title).limit(1).maybeSingle();
  if (existing?.id) return existing.id as string;
  const template: SectionTemplate = [{ key: spec.section.key, label: spec.section.label, targetCount: qCount, assignedTo: [] }];
  return createPaper(client, { orgId: ORG_ID, createdBy: CREATED_BY, title: spec.title, examId: EXAM_ID, template });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const spec = requirePaper(process.argv[2]);
  loadEnv();

  const recs = loadRecords(spec);
  validateRecords(spec, recs);
  const rows = recs.map((r) => recToParsedRow(spec, r));

  const byStatus = (s: string) => recs.filter((r) => statusOf(r) === s).map((r) => r.n);
  console.log(`Paper "${spec.title}" — ${recs.length} questions (${spec.chapterName}).`);
  console.log(`  new   (-> PUBLIC-eligible): ${byStatus("new").length}  [${byStatus("new").join(", ")}]`);
  console.log(`  dup   (stay PRIVATE):       ${byStatus("dup").length}  [${byStatus("dup").join(", ")}]`);
  console.log(`  flawed(stay PRIVATE):       ${byStatus("flawed").length}  [${byStatus("flawed").join(", ")}]`);
  console.log(`  bankAdd: ${spec.bankAdd}`);

  const latexErrors: string[] = [];
  for (const r of rows) {
    const fields: [string, string | undefined][] = [["stem", r.text], ["solution", r.solution], ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string])];
    for (const [name, val] of fields) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) latexErrors.push(`Q${r.sourceRow} ${name}: ${bad}`);
    }
  }
  console.log(latexErrors.length ? `\nLaTeX imbalances (${latexErrors.length}):\n  ${latexErrors.join("\n  ")}` : "\nLaTeX delimiters balanced.");

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    return;
  }
  if (latexErrors.length) throw new Error("refusing to commit with LaTeX imbalances.");
  if (!spec.bankAdd) throw new Error(`bankAdd:false for "${spec.slug}" — this paper is Excel-only. Set bankAdd:true to commit + create the paper.`);

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // 1. Commit all questions as PRIVATE practice.
  const { data: existingJob } = await client
    .from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", spec.sourceFile).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error: jErr } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: spec.sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id").single();
    if (jErr) throw new Error(`upload_jobs insert failed: ${jErr.message}`);
    jobId = job.id;
  }
  const result = await commitStaged(client, {
    orgId: ORG_ID, examId: EXAM_ID, filename: spec.sourceFile, createdBy: CREATED_BY,
    rows, uploadJobId: jobId, pyqYear: null, pyqNote: spec.pyqNote,
  });
  console.log(`\ncommit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PRIVATE", question_kind: "practice" }, { count: "exact" })
    .eq("exam_id", EXAM_ID).eq("source_file", spec.sourceFile);
  if (uErr) throw new Error(`kind/visibility update failed: ${uErr.message}`);
  console.log(`set ${count} rows to PRIVATE + question_kind='practice'.`);

  await client.from("upload_jobs").update({ status: "COMPLETED", total_rows: count ?? 0, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() }).eq("id", jobId);

  // 2. Map question_number -> id, then build the paper in printed Q-order.
  const { data: qrows, error: qErr } = await client
    .from("questions").select("id, question_number").eq("exam_id", EXAM_ID).eq("source_file", spec.sourceFile);
  if (qErr) throw new Error(`fetch ids failed: ${qErr.message}`);
  const idByNum = new Map<string, string>();
  for (const q of (qrows ?? []) as { id: string; question_number: string | null }[]) {
    if (q.question_number) idByNum.set(q.question_number, q.id);
  }

  const paperId = await findOrCreatePaper(client, spec, recs.length);
  console.log(`\npaper: ${paperId} ("${spec.title}")`);

  let added = 0, missing = 0;
  for (const r of recs) {
    const qid = idByNum.get(String(r.n));
    if (!qid) { console.log(`  WARN Q${r.n}: no committed row found`); missing++; continue; }
    await addQuestion(client, paperId, qid, { sectionKey: spec.section.key, addedBy: CREATED_BY });
    added++;
  }
  console.log(`added ${added} questions to the paper${missing ? ` (${missing} missing)` : ""}.`);
  console.log(`\nReview at /dashboard/papers/${paperId}. Then flip the non-dup/non-flawed rows PUBLIC:`);
  console.log(`  npx tsx scripts/practice-paper/flip-public.ts ${spec.slug} --apply`);
}

main().catch((e) => { console.error(e); process.exit(1); });
