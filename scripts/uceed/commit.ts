/**
 * Commit one UCEED paper's Part A into the bank: PRIVATE, question_kind='pyq'.
 *
 *   npx tsx scripts/uceed/commit.ts 2026            # dry run: plan, checks, hashes; writes nothing
 *   npx tsx scripts/uceed/commit.ts 2026 --apply
 *
 * Reads data/<year>.questions.json + data/<year>.key.json (IIT Bombay's final key) and
 * refuses on any issue planPaper raises (lib.ts). MSQ rows and range-keyed NAT rows are
 * HELD: listed, never written (README "Held rows").
 *
 * MCQ rows go through SSC CGL's parseCommitRows (the Excel validator; the figure's bytes
 * folded into content_hash; "[figure]" options stored as empty text). NAT rows go through
 * numericPayload, hashed the same way. Every figure passes the watermark gate before upload.
 *
 * Re-runnable: an unchanged row is skipped by the upsert, and this script then RE-SYNCS
 * solution + difficulty onto the paper's rows, so a solution fix is a re-run. Refuses once
 * any row of the paper is PUBLIC (a re-commit must not touch a live paper silently).
 * Rollback: delete from questions where source_file = '<sourceFile(year)>'.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { commitStaged } from "../../src/lib/upload/commit";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import { parseCommitRows } from "../ssc-cgl/rows";
import { CREATED_BY, DATA, EXAM_NAME, ORG_ID, PYQ_NOTE, figurePath, sourceFile } from "./config";
import { numericPayload, planPaper, toCommitRow, type PlannedRow, type UceedKey, type UceedPaper } from "./lib";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const year = Number(process.argv[2]);
  if (!year) throw new Error("usage: commit.ts <year> [--apply]");
  const apply = process.argv.includes("--apply");
  const read = <T>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8"));
  const paper = read<UceedPaper>(`${year}.questions.json`);
  const plan = planPaper(paper, read<UceedKey>(`${year}.key.json`));
  const issues = [...plan.issues];

  const fig = (r: PlannedRow) => (r.figure ? figurePath(year, r.n) : null);
  for (const r of plan.rows) {
    const f = fig(r);
    if (!f) continue;
    if (!existsSync(f)) {
      issues.push(`Q${r.n}: figure ${f} not found (run extract.py ${year})`);
      continue;
    }
    const declared = paper.questions.find((q) => q.n === r.n)?.watermark;
    const wm = figureWatermarkIssue(`Q${r.n}`, await checkFigureFile(f), declared);
    if (wm) issues.push(wm);
  }

  const mcq = plan.rows.filter((r) => r.format !== "numeric"); // MCQ and MSQ share the option path
  const { parsed, errs } = parseCommitRows(mcq.map((r) => toCommitRow(r, fig(r))));
  issues.push(...errs);
  const payload: ParsedRowPayload[] = [
    ...parsed,
    ...plan.rows.filter((r) => r.format === "numeric").map((r) => numericPayload(r, fig(r) ? readFileSync(fig(r)!) : null)),
  ].sort((a, b) => a.sourceRow - b.sourceRow);

  const src = sourceFile(year);
  console.log(`UCEED ${year} Part A: ${paper.questions.length} transcribed -> ${payload.length} to commit, ${plan.held.length} held  source_file="${src}"`);
  console.log(`  mcq ${parsed.length} | numeric ${payload.length - parsed.length} | with figure ${plan.rows.filter((r) => r.figure).length}`);
  console.log(`  held: ${plan.held.map((h) => `Q${h.n} (${h.reason}${h.unsettled ? ", unsettled" : ""})`).join(", ") || "none"}`);
  const noticed = plan.rows.filter((r) => r.notice);
  const cancelled = plan.rows.filter((r) => "cancelledNote" in r && r.cancelledNote);
  console.log(`  note + grace in mocks (two answers accepted, or defective as printed): ${noticed.map((r) => `Q${r.n}`).join(", ") || "none"}`);
  console.log(`  cancelled by IIT Bombay (no key, notice): ${cancelled.map((r) => `Q${r.n}`).join(", ") || "none"}`);
  const hashes = new Set(payload.map((p) => p.contentHash));
  if (hashes.size !== payload.length) issues.push("two rows share a content_hash; one would be silently dropped");
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("\nDRY RUN: pass --apply to write.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" missing: run seed.ts ${year} --apply first`);
  const examId = exam.id as string;
  const { count: live } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", src)
    .eq("visibility", "PUBLIC");
  if ((live ?? 0) > 0) throw new Error(`${live} row(s) of ${src} are PUBLIC; refusing to re-commit a live paper`);

  const res = await commitStaged(client, {
    orgId: ORG_ID,
    examId,
    filename: src,
    createdBy: CREATED_BY,
    rows: payload,
    pyqYear: year,
    pyqMonth: null,
    pyqNote: PYQ_NOTE,
    visibility: "PRIVATE",
    questionKind: "pyq",
  });
  console.log(`inserted ${res.inserted} | skipped ${res.skipped} | failed ${res.failed}`);
  for (const e of res.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (res.failed) process.exit(1);

  const ids = await syncRows(client, examId, src, plan.rows, payload, fig);
  recordGrace(year, noticed, ids);
}

/**
 * A question whose key accepts more than one answer is grace in every mock (owner policy
 * 2026-10-29): add it to src/lib/mocks/flawed.json, the one list the mock builders read.
 * Idempotent; commit the file with the paper.
 */
function recordGrace(year: number, noticed: PlannedRow[], ids: Map<number, string>) {
  const file = join(process.cwd(), "src", "lib", "mocks", "flawed.json");
  const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
  const known = new Set(list.map((f) => f.id));
  let added = 0;
  for (const r of noticed) {
    const id = ids.get(r.n);
    if (!id || known.has(id)) continue;
    list.push({ id, reason: `UCEED ${year} Q${r.n}: ${r.notice}` });
    added++;
  }
  if (added) writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
  console.log(`grace: ${added} question(s) added to src/lib/mocks/flawed.json`);
}

/** Re-sync solution + difficulty, and upload each missing figure, onto THIS paper's rows. */
async function syncRows(
  client: SupabaseClient<any, any, any>,
  examId: string,
  src: string,
  rows: PlannedRow[],
  payload: ParsedRowPayload[],
  fig: (r: PlannedRow) => string | null,
): Promise<Map<number, string>> {
  const { data, error } = await client
    .from("questions")
    .select("id, question_number, content_hash, image_url")
    .eq("exam_id", examId)
    .eq("source_file", src);
  if (error) throw new Error(`row lookup failed: ${error.message}`);
  const byHash = new Map((data ?? []).map((q) => [q.content_hash as string, q]));
  const ids = new Map<number, string>();
  let synced = 0;
  let uploaded = 0;
  for (const p of payload) {
    const row = rows.find((r) => r.n === p.sourceRow)!;
    const q = byHash.get(p.contentHash);
    if (!q) {
      console.log(`  Q${row.n}: deduped into a row outside this paper; left as it is`);
      continue;
    }
    ids.set(row.n, q.id as string);
    const update: Record<string, string> = { solution: p.solution!, difficulty: p.difficulty };
    const f = fig(row);
    if (f && !q.image_url) {
      update.image_url = await uploadImage(client, ORG_ID, readFileSync(f), f.endsWith(".jpg") ? "image/jpeg" : "image/png");
      uploaded++;
    }
    const { error: uErr } = await client.from("questions").update(update).eq("id", q.id);
    if (uErr) throw new Error(`Q${row.n}: sync failed: ${uErr.message}`);
    synced++;
  }
  console.log(`synced ${synced} row(s); ${uploaded} figure(s) uploaded; ${(data ?? []).length} row(s) under "${src}"`);
  return ids;
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
