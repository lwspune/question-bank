/**
 * Commit one GATE CS paper into the bank: PRIVATE, question_kind='pyq'.
 *
 *   npx tsx scripts/gate/commit.ts 2026-cs1            # dry run: plan, checks, hashes; writes nothing
 *   npx tsx scripts/gate/commit.ts 2026-cs1 --apply
 *
 * Reads data/<paper>.questions.json (assemble.ts) + data/<paper>.key.json (the organising
 * institute's FINAL key, checked against the printed key page) and refuses on any issue
 * planGatePaper raises. The UCEED commit path: MCQ and MSQ rows through SSC CGL's
 * parseCommitRows (figure bytes folded into content_hash), NAT rows through numericPayload.
 * Every figure passes the watermark gate before upload.
 *
 * Re-runnable: an unchanged row is skipped by the upsert, then solution + difficulty are
 * re-synced, so a solution fix is a re-run. Refuses once any row of the paper is PUBLIC.
 * Rollback: delete from questions where source_file = '<gateSitting(paper).sourceFile>'.
 *
 * The production settings come from the environment, never a file in this folder: a
 * worktree holds only .env.test.local (2026-11-18 incident).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseRichSegments } from "../../src/components/math/parseLatex";
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { hasMethodNote } from "../../src/lib/questions/methodNotes";
import { uploadImage } from "../../src/lib/storage/images";
import { commitStaged } from "../../src/lib/upload/commit";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import { parseCommitRows } from "../ssc-cgl/rows";
import { numericPayload, toCommitRow, type PlannedRow, type UceedKey, type UceedPaper } from "../uceed/lib";
import { CREATED_BY, DATA, EXAM_NAME, ORG_ID, figurePath } from "./config";
import { gateSitting, planGatePaper } from "./lib";

/** The words that will render italic or bold, outside code: listed for a person to confirm. */
function emphasis(text: string): string[] {
  return parseTableBlocks(text)
    .flatMap((b) => (b.kind === "text" ? [b.text] : b.kind === "table" ? [...b.headers, ...b.rows.flat()] : []))
    .flatMap((t) => parseRichSegments(t))
    .filter((seg) => seg.type === "text" && (seg.bold || seg.italic))
    .map((seg) => `${seg.bold ? "b" : "i"}:${seg.content.trim().slice(0, 30)}`);
}

async function main() {
  const paper = process.argv[2];
  if (!paper) throw new Error("usage: commit.ts <year>-cs<set> [--apply]");
  const apply = process.argv.includes("--apply");
  const sitting = gateSitting(paper);
  const read = <T>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8"));
  const transcription = read<UceedPaper>(`${paper}.questions.json`);
  const plan = planGatePaper(paper, transcription, read<UceedKey>(`${paper}.key.json`));
  const issues = [...plan.issues];

  const fig = (r: PlannedRow) => (r.figure ? figurePath(paper, r.n) : null);
  for (const r of plan.rows) {
    const f = fig(r);
    if (!f) continue;
    if (!existsSync(f)) {
      issues.push(`Q${r.n}: figure ${f} not found (run figures.py ${paper})`);
      continue;
    }
    const declared = transcription.questions.find((q) => q.n === r.n)?.watermark;
    const wm = figureWatermarkIssue(`Q${r.n}`, await checkFigureFile(f), declared);
    if (wm) issues.push(wm);
  }

  const choice = plan.rows.filter((r) => r.format !== "numeric");
  const { parsed, errs } = parseCommitRows(choice.map((r) => toCommitRow(r, fig(r))));
  issues.push(...errs);
  const payload: ParsedRowPayload[] = [
    ...parsed,
    ...plan.rows.filter((r) => r.format === "numeric").map((r) => numericPayload(r, fig(r) ? readFileSync(fig(r)!) : null)),
  ].sort((a, b) => a.sourceRow - b.sourceRow);

  console.log(`${sitting.sourceFile}: ${transcription.questions.length} transcribed -> ${payload.length} to commit`);
  const count = (f: string) => plan.rows.filter((r) => r.format === f).length;
  console.log(`  mcq ${count("mcq")} | msq ${count("msq")} | numeric ${count("numeric")} | with figure ${plan.rows.filter((r) => r.figure).length}`);
  const noticed = plan.rows.filter((r) => r.notice);
  console.log(`  note + grace in mocks: ${noticed.map((r) => `Q${r.n}`).join(", ") || "none"}`);
  const marked = transcription.questions
    .map((q) => ({ n: q.n, words: [q.text, q.solution ?? "", ...q.options.map((o) => o.text)].flatMap(emphasis) }))
    .filter((m) => m.words.length);
  console.log(`  review: renders bold (b) / italic (i): ${marked.map((m) => `Q${m.n} [${m.words.join(" | ")}]`).join("; ") || "none"}`);
  // Migration 0280's CHECK refuses a solution that opens a method note; catch it in the dry run.
  for (const q of transcription.questions) {
    if (hasMethodNote(q.solution)) issues.push(`Q${q.n}: solution holds a method note (0280)`);
  }
  // A literal backslash-n would be refused by commitStaged at --apply; catch it in the dry run.
  for (const q of transcription.questions) {
    for (const [field, v] of [["text", q.text], ["solution", q.solution ?? ""], ...q.options.map((o) => [`option ${o.label}`, o.text])]) {
      if (normalizeNewlines(v) !== v) issues.push(`Q${q.n}: ${field} holds a literal backslash-n`);
      // A control character: a tab, or a backslash escape eaten on the way in (alpha read as BEL + lpha).
      if (/[\u0000-\u0008\u000B-\u001F]/.test(v)) issues.push(`Q${q.n}: ${field} holds a control character`);
    }
  }
  const hashes = new Set(payload.map((p) => p.contentHash));
  if (hashes.size !== payload.length) issues.push("two rows share a content_hash; one would be silently dropped");
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("\nDRY RUN: pass --apply to write.");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) throw new Error("set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment");
  const client = createClient(url, service, { auth: { persistSession: false } });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" missing: run seed.ts ${paper} --apply first`);
  const examId = exam.id as string;
  const { count: live } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", sitting.sourceFile)
    .eq("visibility", "PUBLIC");
  if ((live ?? 0) > 0) throw new Error(`${live} row(s) of ${sitting.sourceFile} are PUBLIC; refusing to re-commit a live paper`);

  const res = await commitStaged(client, {
    orgId: ORG_ID,
    examId,
    filename: sitting.sourceFile,
    createdBy: CREATED_BY,
    rows: payload,
    pyqYear: sitting.year,
    pyqMonth: null,
    pyqNote: sitting.pyqNote,
    visibility: "PRIVATE",
    questionKind: "pyq",
  });
  console.log(`inserted ${res.inserted} | skipped ${res.skipped} | failed ${res.failed}`);
  for (const e of res.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (res.failed) process.exit(1);

  const ids = await syncRows(client, examId, sitting.sourceFile, plan.rows, payload, fig);
  recordGrace(paper, noticed, ids);
}

/** A question with a notice is grace in every mock: src/lib/mocks/flawed.json. Idempotent. */
function recordGrace(paper: string, noticed: PlannedRow[], ids: Map<number, string>) {
  const file = join(process.cwd(), "src", "lib", "mocks", "flawed.json");
  const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
  const known = new Set(list.map((f) => f.id));
  let added = 0;
  for (const r of noticed) {
    const id = ids.get(r.n);
    if (!id || known.has(id)) continue;
    list.push({ id, reason: `GATE CS ${paper} Q${r.n}: ${r.notice}` });
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
    .select("id, content_hash, image_url")
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
