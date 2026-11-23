/**
 * Edit live model answers AND every source-of-record copy of them, together.
 *
 *   npx tsx scripts/notes-pipeline/hsc/apply-solution-edits.ts <edits.json>            # dry run
 *   npx tsx scripts/notes-pipeline/hsc/apply-solution-edits.ts <edits.json> --apply
 *   npx tsx scripts/notes-pipeline/hsc/apply-solution-edits.ts --scan "<Exam>" "<Subject>"
 *
 * edits.json = [{ id, why, find, replace }] (full question uuid). `find` must occur EXACTLY ONCE
 * in the live solution; the edit is refused otherwise, never applied to a near miss.
 *
 * WHY ONE TOOL FOR EVERY HSC SOURCE (2026-11-23, board notes). An MH HSC 12 row's answer lives in
 * one of three pipelines (a textbook transcription under scripts/stateboard/data, a chapter
 * compilation under scripts/mh-hsc-12-pyq/data, a whole-paper transcription under
 * scripts/mh-hsc-12-pyq/paper/data), sometimes in two files of one pipeline. Each pipeline's own
 * sync tool matches rows a different way (ref, content_hash, source_file + number) and one of them
 * refuses any row whose stem was repaired later. So the source copy is found by its TEXT: the live
 * solution, JSON-escaped, must appear in the source files, and every copy is replaced. A live
 * answer found in no source file means the source already lags the bank: the edit is REFUSED
 * (fix the drift first; `--scan` lists every such row).
 *
 * The DB write is conditional on the solution still being the text that was read, so a concurrent
 * edit fails loudly. `solution` is outside content_hash, so row ids never move.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

const ROOTS = ["scripts/stateboard/data", "scripts/mh-hsc-12-pyq/data", "scripts/mh-hsc-12-pyq/paper/data"];

type Edit = { id: string; why: string; find: string; replace: string };

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".json") ? [p] : [];
  });
}

/** The ways a string can appear inside a JSON file: JS-style (non-ASCII raw) and ASCII-escaped. */
function encodings(s: string): string[] {
  const js = JSON.stringify(s).slice(1, -1);
  const ascii = js.replace(/[\u007f-￿]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
  return js === ascii ? [js] : [js, ascii];
}

function count(hay: string, needle: string): number {
  let n = 0;
  for (let i = hay.indexOf(needle); i !== -1; i = hay.indexOf(needle, i + needle.length)) n++;
  return n;
}

const files = ROOTS.flatMap(walk);
const cache = new Map<string, string>();
const read = (f: string) => cache.get(f) ?? (cache.set(f, readFileSync(f, "utf8")), cache.get(f)!);

/** Source files holding `text` exactly, with the encoding found in each. */
function locate(text: string): { file: string; enc: number; hits: number }[] {
  const encs = encodings(text);
  const out: { file: string; enc: number; hits: number }[] = [];
  for (const f of files) {
    const raw = read(f);
    encs.forEach((e, enc) => {
      const hits = count(raw, e);
      if (hits) out.push({ file: f, enc, hits });
    });
  }
  return out;
}

async function scan(db: ReturnType<typeof createClient>, exam: string, subject: string) {
  const { data: ex } = await db.from("exams").select("id").eq("name", exam).single();
  const { data: sb } = await db.from("subjects").select("id").eq("exam_id", ex!.id).eq("name", subject).single();
  const rows: { id: string; question_number: string; solution: string | null }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from("questions").select("id, question_number, solution")
      .eq("subject_id", sb!.id).eq("visibility", "PUBLIC").order("id").range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }
  const lag = rows.filter((r) => r.solution && locate(r.solution).length === 0);
  console.log(`${exam} ${subject}: ${rows.length} PUBLIC rows; live answer found in NO source file: ${lag.length}`);
  for (const r of lag) console.log(`  ${r.id}  ${r.question_number}`);
}

async function main() {
  const args = process.argv.slice(2);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  if (args[0] === "--scan") return scan(db, args[1], args[2]);

  const apply = args.includes("--apply");
  // Rows whose live answer was written to the bank directly and has NO source copy (e.g. MCQ
  // answers from a solutions backfill). Named one by one, so nothing else slips past the check.
  const noSource = new Set((args.find((a) => a.startsWith("--allow-no-source="))?.split("=")[1] ?? "").split(",").filter(Boolean));
  const specPath = args.find((a) => !a.startsWith("--"));
  if (!specPath) throw new Error("usage: apply-solution-edits.ts <edits.json> [--apply] | --scan <Exam> <Subject>");
  const edits: Edit[] = JSON.parse(readFileSync(specPath, "utf8"));

  // Several edits may target one row: apply them in order to a working copy.
  const live = new Map<string, string>();
  const original = new Map<string, string>();
  const problems: string[] = [];
  for (const e of edits) {
    if (!e.why?.trim()) problems.push(`${e.id}: every edit needs a "why"`);
    if (e.find === e.replace) problems.push(`${e.id}: find === replace`);
    if (!live.has(e.id)) {
      const { data, error } = await db.from("questions").select("solution").eq("id", e.id).single();
      if (error || !data?.solution) { problems.push(`${e.id}: no live solution`); continue; }
      live.set(e.id, data.solution); original.set(e.id, data.solution);
    }
    const cur = live.get(e.id)!;
    const n = count(cur, e.find);
    if (n !== 1) { problems.push(`${e.id}: find occurs ${n} times (must be 1): ${JSON.stringify(e.find.slice(0, 60))}`); continue; }
    live.set(e.id, cur.replace(e.find, () => e.replace));
  }

  // Where each row's source copy is. A textbook row's answer is often stored in pieces (the
  // `[Textbook ...]` note in an errata file, the working in a fragment) and joined at commit, so
  // the full live text exists in no single file. Then each EDIT is located instead: its `find`
  // passage must appear exactly once in each file that holds it, in at most 3 files.
  type Where = { file: string; enc: number; hits: number };
  const plan: { id: string; before: string; after: string; where: Where[]; pieces: { find: string; replace: string; where: Where[] }[] }[] = [];
  for (const [id, after] of live) {
    const before = original.get(id)!;
    if (before === after) continue;
    const where = locate(before);
    const pieces: { find: string; replace: string; where: Where[] }[] = [];
    if (!where.length && noSource.has(id.slice(0, 8))) {
      plan.push({ id, before, after, where, pieces });
      continue;
    }
    if (!where.length) {
      for (const e of edits.filter((x) => x.id === id)) {
        const w = locate(e.find);
        if (!w.length) problems.push(`${id}: neither the answer nor the passage ${JSON.stringify(e.find.slice(0, 50))} is in any source file`);
        else if (w.length > 3 || w.some((x) => x.hits !== 1)) problems.push(`${id}: passage ${JSON.stringify(e.find.slice(0, 50))} is not unique in the sources (${w.length} files); make it longer`);
        else pieces.push({ find: e.find, replace: e.replace, where: w });
      }
    }
    plan.push({ id, before, after, where, pieces });
  }

  const short = (f: string) => f.replace(/\\/g, "/").split("/").slice(-1)[0];
  for (const p of plan) {
    const src = p.where.length ? p.where.map((w) => `${short(w.file)}×${w.hits}`).join(", ") : `by passage: ${[...new Set(p.pieces.flatMap((x) => x.where.map((w) => short(w.file))))].join(", ") || "NONE"}`;
    console.log(`${p.id.slice(0, 8)}  ${p.before.length} -> ${p.after.length} chars  sources: ${src}`);
  }
  if (problems.length) {
    console.log(`\nREFUSING (${problems.length}):`);
    for (const p of problems) console.log(`  ${p}`);
    process.exit(1);
  }
  if (!apply) {
    console.log(`\n[dry-run] ${plan.length} row(s); pass --apply to write.`);
    return;
  }
  for (const p of plan) {
    // Live row first, conditional on the text read: a concurrent edit stops here, before any file changes.
    const { data, error } = await db.from("questions").update({ solution: p.after })
      .eq("id", p.id).eq("solution", p.before).select("id");
    if (error) throw new Error(`${p.id}: ${error.message}`);
    if (!data?.length) throw new Error(`${p.id}: live solution changed under us; nothing written for this row`);
    for (const w of p.where) {
      const raw = read(w.file);
      const next = raw.split(encodings(p.before)[w.enc]).join(encodings(p.after)[w.enc]);
      cache.set(w.file, next);
      writeFileSync(w.file, next);
    }
    for (const piece of p.pieces) {
      for (const w of piece.where) {
        const raw = read(w.file);
        const next = raw.split(encodings(piece.find)[w.enc]).join(encodings(piece.replace)[w.enc]);
        cache.set(w.file, next);
        writeFileSync(w.file, next);
      }
    }
  }
  console.log(`\napplied ${plan.length} row(s): live rows and every source copy.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
