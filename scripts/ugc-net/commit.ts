/**
 * Commit one UGC NET Paper 1 shift as PRIVATE `pyq` rows, with figures.
 *
 *   npx tsx scripts/ugc-net/commit.ts <shift-id>            # dry run: every check, nothing written
 *   npx tsx scripts/ugc-net/commit.ts <shift-id> --apply
 *
 * Refuses on ANY issue assemblePaper raises (an unread disagreement, an id in no
 * key, a two-answer question kept on neither accepted option), on a missing crop
 * or a flagged watermark, and on a shift already PUBLIC. Run seed.ts first:
 * commitStaged refuses an unknown subject.
 *
 * One source file per shift (sourceFile), numbered 1-50 as printed. After the
 * insert, solution, difficulty and figures are synced onto THIS shift's rows by
 * content_hash, so a solution fix is a re-run. Graced questions (NTA dropped
 * them, NTA accepted two options, or a person found them defective) go in
 * src/lib/mocks/flawed.json. Rollback: delete from questions where
 * source_file = '<sourceFile(shift)>'.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import { assemblePaper, paperIssues, parseNtaKey, type Adjudication, type AssembledRow, type DerivedEntry, type UgcPaper } from "./lib";
import {
  CREATED_BY, EXAM_NAME, ORG_ID, SUBJECT,
  blindDir, dataDir, figureDir, keyPath, pyqMonth, pyqNote, pyqYear, shiftById, sourceFile,
} from "./config";

const DIFF = { Easy: "EASY", Moderate: "MODERATE", Hard: "HARD" } as const;
const read = <T>(p: string): T | undefined => (existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : undefined);
const figureFile = (ref: string) => `q${ref.padStart(2, "0")}.png`;

async function main() {
  const id = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!id) throw new Error("usage: commit.ts <shift-id> [--apply]");
  const shift = shiftById(id);
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const issues: string[] = [];
  const paper = read<UgcPaper>(join(dataDir(), `${id}.questions.json`));
  if (!paper) throw new Error(`${id}: no transcription`);
  issues.push(...paperIssues(paper));
  const derived =
    read<{ answers: DerivedEntry[] }>(join(dataDir(), `${id}.derived.json`)) ??
    read<{ answers: DerivedEntry[] }>(join(blindDir(id), "derived.json"));
  if (!derived) throw new Error(`${id}: no derivation`);
  const adj = read<{ adjudications: Adjudication[] }>(join(dataDir(), `${id}.adjudication.json`));
  const keys = parseNtaKey(readFileSync(keyPath(shift.cycle), "utf8")).filter((k) => k.date === shift.date && k.shift === shift.shift);
  const res = assemblePaper({ paper, keys, derived: derived.answers, adjudications: adj?.adjudications });
  issues.push(...res.issues);
  const rows: AssembledRow[] = res.rows;

  for (const r of rows) {
    if (!r.figure) continue;
    const path = join(figureDir(id), figureFile(r.ref));
    if (!existsSync(path)) {
      issues.push(`${id} Q${r.ref}: figure not cropped (python -P scripts/ugc-net/crop.py ${id})`);
      continue;
    }
    const wm = figureWatermarkIssue(`${id} Q${r.ref}`, await checkFigureFile(path), r.figure.watermark);
    if (wm) issues.push(wm);
  }

  const payload: ParsedRowPayload[] = rows.map((r) => ({
    sourceRow: Number(r.ref),
    questionNumber: r.ref,
    subjectName: SUBJECT,
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
  if (new Set(payload.map((p) => p.contentHash)).size !== payload.length) {
    issues.push("two rows share a content_hash; one would be silently dropped");
  }

  const src = sourceFile(shift);
  console.log(`${id}: ${payload.length} rows  source_file="${src}"  pyq ${pyqMonth(shift)} ${pyqYear(shift)} "${pyqNote(shift)}"`);
  console.log(`  figures: ${rows.filter((r) => r.figure).map((r) => `Q${r.ref}`).join(", ") || "none"}`);
  console.log(`  grace in mocks: ${rows.filter((r) => r.grace).map((r) => `Q${r.ref}`).join(", ") || "none"}`);
  console.log(`  answers by slot: ${["A", "B", "C", "D"].map((l) => `${l} ${rows.filter((r) => r.answer === l).length}`).join(", ")}`);
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
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

  const out = await commitStaged(client, {
    orgId: ORG_ID, examId, filename: src, createdBy: CREATED_BY, rows: payload,
    pyqYear: pyqYear(shift), pyqMonth: pyqMonth(shift), pyqNote: pyqNote(shift), visibility: "PRIVATE", questionKind: "pyq",
  });
  console.log(`inserted ${out.inserted} | skipped ${out.skipped} | failed ${out.failed}`);
  for (const e of out.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (out.failed) process.exit(1);

  const ids = await sync(client, examId, src, id, rows, payload);
  recordGrace(id, src, rows, ids);
}

/** Solution, difficulty and figure onto THIS shift's rows, by content_hash. */
async function sync(
  client: SupabaseClient, examId: string, src: string, id: string, rows: AssembledRow[], payload: ParsedRowPayload[]
): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  const { data, error } = await client
    .from("questions").select("id, content_hash, image_url").eq("exam_id", examId).eq("source_file", src);
  if (error) throw new Error(`row lookup failed: ${error.message}`);
  const byHash = new Map((data ?? []).map((q) => [q.content_hash as string, q]));
  let synced = 0;
  let uploaded = 0;
  for (const [i, r] of rows.entries()) {
    const q = byHash.get(payload[i].contentHash);
    if (!q) {
      console.log(`  Q${r.ref}: deduped into a row outside this shift; left as it is`);
      continue;
    }
    ids.set(r.ref, q.id as string);
    const update: Record<string, string> = { solution: payload[i].solution!, difficulty: payload[i].difficulty };
    if (r.figure && !q.image_url) {
      update.image_url = await uploadImage(client, ORG_ID, readFileSync(join(figureDir(id), figureFile(r.ref))), "image/png");
      uploaded++;
    }
    const { error: uErr } = await client.from("questions").update(update).eq("id", q.id);
    if (uErr) throw new Error(`Q${r.ref}: sync failed: ${uErr.message}`);
    synced++;
  }
  console.log(`synced ${synced} row(s); ${uploaded} picture(s) uploaded; ${(data ?? []).length} row(s) under "${src}"`);
  return ids;
}

/** Grace in every mock (owner policy 2026-10-29): src/lib/mocks/flawed.json, the one list the builders read. */
function recordGrace(id: string, src: string, rows: AssembledRow[], ids: Map<string, string>) {
  const file = join(process.cwd(), "src", "lib", "mocks", "flawed.json");
  const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
  const known = new Set(list.map((f) => f.id));
  let added = 0;
  for (const r of rows.filter((x) => x.grace)) {
    const qid = ids.get(r.ref);
    if (!qid || known.has(qid)) continue;
    list.push({ id: qid, reason: `${src} Q${r.ref}: ${r.solution.match(/^\*\*Note:\*\* ([^\n]+)/)?.[1]?.slice(0, 120) ?? "defective"} (scripts/ugc-net)` });
    added++;
  }
  if (added) writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
  console.log(`grace: ${added} question(s) added to src/lib/mocks/flawed.json`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
