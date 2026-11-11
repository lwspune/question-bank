/**
 * Commit one CLAT year as PRIVATE `pyq` rows.
 *
 *   npx tsx scripts/clat/commit.ts <year>            # dry run: every check, nothing written
 *   npx tsx scripts/clat/commit.ts <year> --apply
 *
 * Refuses on ANY issue: the paper's own checks, the key table disagreeing with
 * its notification, a derivation outside the taxonomy, an unread disagreement
 * with the key, a style fault in a solution, two rows sharing a content_hash, or
 * a year already PUBLIC. Run seed.ts --apply first (commitStaged refuses an
 * unknown subject).
 *
 * One source file per year (sourceFile). Every question of a passage shares one
 * set (setLabel = the passage id under this year's upload job), so /browse shows
 * the passage once above its questions. After the insert, solution and
 * difficulty are synced onto THIS year's rows by content_hash, so a solution fix
 * is a re-run. Graced questions (withdrawn, either-answer, or found defective)
 * go in src/lib/mocks/flawed.json. Rollback: delete from questions where
 * source_file = '<sourceFile(year)>'.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { CREATED_BY, EXAM_NAME, KEY_NOTICES, ORG_ID, pyqMonth, pyqNote, pyqYear, sourceFile, yearCfg, type ClatYear } from "./config";
import { loadAdjudications, loadDerived, loadKey, loadPaper } from "./io";
import { assembleYear, derivedIssues, keyNoticeIssues, paperIssues, type AssembledRow } from "./lib";

const DIFF = { Easy: "EASY", Moderate: "MODERATE", Hard: "HARD" } as const;

async function main() {
  const year = Number(process.argv.slice(2).find((a) => !a.startsWith("--"))) as ClatYear;
  if (!year) throw new Error("usage: commit.ts <year> [--apply]");
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const paper = loadPaper(year);
  const key = loadKey(year);
  const derived = loadDerived(year);
  const issues = [...paperIssues(paper, yearCfg(year).sections), ...keyNoticeIssues(key, KEY_NOTICES[year]), ...derivedIssues(paper, derived)];
  const res = assembleYear({ paper, key, derived, adjudications: loadAdjudications(year) });
  issues.push(...res.issues);
  const rows: AssembledRow[] = res.rows;
  const setOf = new Map(paper.rows.map((r) => [r.ref, r.passage]));

  const payload: ParsedRowPayload[] = rows.map((r) => ({
    sourceRow: Number(r.ref),
    questionNumber: r.ref,
    ...(setOf.get(r.ref) ? { setLabel: setOf.get(r.ref)! } : {}),
    subjectName: r.subject,
    chapterName: r.chapter,
    subtopicName: r.subtopic,
    text: r.text,
    ...(r.context ? { context: r.context } : {}),
    difficulty: DIFF[r.difficulty],
    solution: r.solution,
    questionFormat: "mcq",
    options: r.options.map((o) => ({ label: o.label, text: o.text, isCorrect: o.isCorrect })),
    contentHash: contentHash(r.text, r.options.map((o) => o.text), r.answer),
  }));
  const seen = new Map<string, string>();
  for (const p of payload) {
    const prev = seen.get(p.contentHash);
    if (prev) issues.push(`Q${prev} and Q${p.questionNumber} share a content_hash; one would be silently dropped`);
    seen.set(p.contentHash, p.questionNumber!);
  }

  const src = sourceFile(year);
  console.log(`${year}: ${payload.length}/${paper.rows.length} rows  source_file="${src}"  pyq ${pyqMonth(year)} ${pyqYear(year)} "${pyqNote(year)}"`);
  const bySubject = new Map<string, number>();
  for (const r of rows) bySubject.set(r.subject, (bySubject.get(r.subject) ?? 0) + 1);
  console.log(`  by subject: ${[...bySubject].map(([s, n]) => `${s} ${n}`).join(", ")}`);
  console.log(`  grace in mocks: ${rows.filter((r) => r.grace).map((r) => `Q${r.ref}`).join(", ") || "none"}`);
  console.log(`  answers by slot: ${["A", "B", "C", "D"].map((l) => `${l} ${rows.filter((r) => r.answer === l).length}`).join(", ")}`);
  if (rows.length !== paper.rows.length && !issues.length) issues.push(`only ${rows.length} of ${paper.rows.length} rows assembled`);
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.slice(0, 60).join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("\nDRY RUN: pass --apply to write.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" missing: run seed.ts --apply first`);
  const examId = exam.id as string;
  const { count: live } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", examId).eq("source_file", src).eq("visibility", "PUBLIC");
  if ((live ?? 0) > 0) throw new Error(`${live} row(s) of ${src} are PUBLIC; refusing to re-commit a live paper`);

  // One upload job per year, so a passage's questions share a set_id ("<job>:P03").
  const { data: existingJob } = await client.from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", src).limit(1).maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: src, created_by: CREATED_BY, status: "PROCESSING", total_rows: payload.length })
      .select("id").single();
    if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
    jobId = job.id as string;
  }

  const out = await commitStaged(client, {
    orgId: ORG_ID, examId, filename: src, createdBy: CREATED_BY, rows: payload, uploadJobId: jobId,
    pyqYear: pyqYear(year), pyqMonth: pyqMonth(year), pyqNote: pyqNote(year), visibility: "PRIVATE", questionKind: "pyq",
  });
  console.log(`inserted ${out.inserted} | skipped ${out.skipped} | failed ${out.failed}`);
  for (const e of out.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (out.failed) process.exit(1);
  await client.from("upload_jobs").update({ status: "COMPLETED" }).eq("id", jobId);

  const ids = await sync(client, examId, src, rows, payload);
  recordGrace(src, rows, ids);
}

/** Solution, difficulty and the passage (context) onto THIS year's rows, by content_hash: none of the three is in the hash, so a re-commit is how a fix reaches a committed row. */
async function sync(client: SupabaseClient, examId: string, src: string, rows: AssembledRow[], payload: ParsedRowPayload[]): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  const { data, error } = await client.from("questions").select("id, content_hash").eq("exam_id", examId).eq("source_file", src);
  if (error) throw new Error(`row lookup failed: ${error.message}`);
  const byHash = new Map((data ?? []).map((q) => [q.content_hash as string, q.id as string]));
  let synced = 0;
  for (const [i, r] of rows.entries()) {
    const id = byHash.get(payload[i].contentHash);
    if (!id) {
      console.log(`  Q${r.ref}: deduped into a row outside this year; left as it is`);
      continue;
    }
    ids.set(r.ref, id);
    const { error: uErr } = await client.from("questions").update({ solution: payload[i].solution!, difficulty: payload[i].difficulty, context: payload[i].context ?? null }).eq("id", id);
    if (uErr) throw new Error(`Q${r.ref}: sync failed: ${uErr.message}`);
    synced++;
  }
  console.log(`synced ${synced} row(s); ${(data ?? []).length} row(s) under "${src}"`);
  return ids;
}

/** Grace in every mock (owner policy 2026-10-29): src/lib/mocks/flawed.json, the one list the builders read. */
function recordGrace(src: string, rows: AssembledRow[], ids: Map<string, string>) {
  const file = join(process.cwd(), "src", "lib", "mocks", "flawed.json");
  const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
  const known = new Set(list.map((f) => f.id));
  let added = 0;
  for (const r of rows.filter((x) => x.grace)) {
    const qid = ids.get(r.ref);
    if (!qid || known.has(qid)) continue;
    list.push({ id: qid, reason: `${src} Q${r.ref}: ${r.solution.match(/^\*\*Note:\*\* ([^\n]+)/)?.[1]?.slice(0, 120) ?? "defective"} (scripts/clat)` });
    added++;
  }
  if (added) writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
  console.log(`grace: ${added} question(s) added to src/lib/mocks/flawed.json`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
