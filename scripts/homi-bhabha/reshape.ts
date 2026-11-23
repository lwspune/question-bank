/**
 * Homi Bhabha: re-cut one chapter's subtopics into TEACHING subtopics for its /notes pass, from a
 * reviewed plan file (the Homi Bhabha twin of scripts/spi/reshape.ts; read scripts/cds-maths/reshape.ts
 * for why a notes pass re-cuts at all).
 *
 *   npx tsx <lane>/reshape.ts <lane>/notes/plans/<slug>.ts            # dry run
 *   npx tsx <lane>/reshape.ts <lane>/notes/plans/<slug>.ts --apply    # write
 *
 * Run from the main checkout (its .env.local). THREE things move together: the bank, and the
 * lane's band files + merged file (the source of record), so a re-merge or re-commit cannot undo
 * the re-cut. A bank row joins its band item by source_file (the paper) + question_number. Any
 * unresolved row, any prefix matching nothing, and any count that disagrees with the plan's
 * `expected` is a REFUSAL, checked before anything is written.
 */
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAMS, PAPERS, dataPath } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

export type ReshapePlan = {
  /** The exam key in config EXAMS (default homi-bhabha-9). */
  exam?: string;
  subject: string;
  chapter: string;
  /** Teaching order. */
  order: string[];
  /** Target -> id prefixes. Every bank row of the chapter must be named. */
  byPrefix: Record<string, string[]>;
  /** The reviewed per-target counts (PUBLIC rows). */
  expected: Record<string, number>;
  /** PUBLIC rows in the chapter. */
  total: number;
};

const APPLY = process.argv.includes("--apply");

function die(msg: string, detail: string[] = []): never {
  console.log(`\nREFUSING: ${msg}`);
  detail.slice(0, 40).forEach((d) => console.log("  " + d));
  if (detail.length > 40) console.log(`  ... and ${detail.length - 40} more`);
  process.exit(1);
}

async function resolveChapter(db: SupabaseClient, examName: string, subject: string, chapter: string): Promise<string> {
  const { data, error } = await db.from("chapters").select("id, subjects!inner(name, exams!inner(name))").eq("name", chapter);
  if (error) throw error;
  const hits = (data ?? []).filter((c: any) => c.subjects?.exams?.name === examName && c.subjects?.name === subject);
  if (hits.length !== 1) die(`expected exactly 1 ${examName} ${subject} "${chapter}" chapter, found ${hits.length}`);
  return (hits[0] as any).id;
}

type BandFile = { path: string; doc: { questions: { number: number; subtopic?: string; chapter?: string }[] } };

async function main() {
  const planPath = process.argv[2];
  if (!planPath || planPath.startsWith("--")) die("usage: reshape.ts <plan-module> [--apply]");
  const plan = (await import(pathToFileURL(resolve(planPath)).href)).default as ReshapePlan;
  const { subject, chapter, order, byPrefix, expected, total } = plan;
  const examKey = (plan.exam ?? "homi-bhabha-9") as keyof typeof EXAMS;
  const exam = EXAMS[examKey];
  if (!exam) die(`unknown exam ${examKey}`);
  console.log(`${APPLY ? "=== APPLY ===" : "=== DRY RUN (pass --apply to write) ==="}  ${exam.name} / ${subject} / ${chapter}\n`);

  for (const t of [...Object.keys(byPrefix), ...Object.keys(expected)]) {
    if (!order.includes(t)) die(`target "${t}" is not in the plan's order`);
  }
  const prefixTo = new Map<string, string>();
  for (const [target, ps] of Object.entries(byPrefix)) {
    for (const p of ps) {
      if (prefixTo.has(p)) die(`prefix ${p} assigned twice`);
      prefixTo.set(p, target);
    }
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const chapterId = await resolveChapter(db, exam.name, subject, chapter);

  // Any visibility: a source subtopic is only safe to drop when NOTHING points at it.
  const { data: rows, error } = await db.from("questions").select("id, visibility, source_file, question_number, subtopics(name)").eq("chapter_id", chapterId);
  if (error) throw error;
  const all = (rows ?? []) as any[];
  const pub = all.filter((r) => r.visibility === "PUBLIC");
  console.log(`chapter rows: ${all.length} (${pub.length} PUBLIC)`);
  if (pub.length !== total) die(`expected ${total} PUBLIC rows, got ${pub.length}`);

  const papers = Object.values(PAPERS).filter((p) => p.exam === examKey);
  const fileToPaper = new Map(papers.map((p) => [p.sourceFile, p.id]));
  const problems: string[] = [];
  const counts: Record<string, number> = {};
  const usedPrefix = new Set<string>();
  const moves: { id: string; to: string }[] = [];
  const targetsByPaper = new Map<string, Map<number, string>>();
  for (const r of all) {
    const hits = [...prefixTo.keys()].filter((p) => (r.id as string).startsWith(p));
    if (hits.length !== 1) { problems.push(`${hits.length ? "AMBIGUOUS" : "UNASSIGNED"} ${r.id} (${r.subtopics?.name}, ${r.visibility})`); continue; }
    const to = prefixTo.get(hits[0])!;
    usedPrefix.add(hits[0]);
    if (r.visibility === "PUBLIC") counts[to] = (counts[to] ?? 0) + 1;
    if (r.subtopics?.name !== to) moves.push({ id: r.id, to });
    const pid = fileToPaper.get(r.source_file);
    const n = Number(String(r.question_number).replace(/^Q/i, ""));
    if (!pid || !Number.isInteger(n)) { problems.push(`NO BAND JOIN ${r.id} (${r.source_file} #${r.question_number})`); continue; }
    if (!targetsByPaper.has(pid)) targetsByPaper.set(pid, new Map());
    targetsByPaper.get(pid)!.set(n, to);
  }
  for (const p of prefixTo.keys()) if (!usedPrefix.has(p)) problems.push(`PREFIX MATCHED NOTHING: ${p}`);
  if (problems.length) die(`${problems.length} row(s) could not be resolved`, problems);

  console.log("\nTARGET TEACHING SUBTOPIC".padEnd(60) + " got   exp");
  let drift = 0;
  for (const name of order) {
    const got = counts[name] ?? 0, exp = expected[name];
    if (got !== exp) drift++;
    console.log(name.padEnd(60) + String(got).padStart(4) + String(exp).padStart(6) + (got !== exp ? "  <-- DRIFT" : ""));
  }
  if (drift) die(`${drift} target count(s) disagree with the reviewed plan`);
  console.log(`rows to move: ${moves.length}`);

  // Resolve every band item BEFORE writing anything: each bank row's item must be found exactly
  // once across the paper's band files, and in its merged file, under this chapter.
  const fileWrites: { path: string; text: string }[] = [];
  const fileProblems: string[] = [];
  let bandChanges = 0;
  for (const [pid, targets] of targetsByPaper) {
    const bands: BandFile[] = [];
    for (let b = 1; b <= 9; b++) {
      const path = dataPath(pid, `b${b}`);
      if (existsSync(path)) bands.push({ path, doc: JSON.parse(readFileSync(path, "utf8")) });
    }
    const mergedPath = dataPath(pid, "merged");
    const merged: BandFile = { path: mergedPath, doc: JSON.parse(readFileSync(mergedPath, "utf8")) };
    const touched = new Set<BandFile>();
    for (const [n, to] of targets) {
      const inBands = bands.flatMap((f) => f.doc.questions.filter((q) => q.number === n).map((q) => ({ f, q })));
      const inMerged = merged.doc.questions.filter((q) => q.number === n);
      if (inBands.length < 1 || inMerged.length !== 1) { fileProblems.push(`${pid} Q${n}: ${inBands.length} band item(s), ${inMerged.length} merged`); continue; }
      for (const { f, q } of [...inBands, { f: merged, q: inMerged[0] }]) {
        if (q.chapter !== chapter) { fileProblems.push(`${pid} Q${n}: file says chapter "${q.chapter}"`); continue; }
        if (q.subtopic !== to) { q.subtopic = to; touched.add(f); if (f !== merged) bandChanges++; }
      }
    }
    for (const f of touched) fileWrites.push({ path: f.path, text: JSON.stringify(f.doc, null, 2) + "\n" });
  }
  if (fileProblems.length) die(`${fileProblems.length} band item(s) do not resolve`, fileProblems);

  // ---------- 1. the bank ----------
  const existing = new Map<string, string>();
  {
    const { data: subs, error: se } = await db.from("subtopics").select("id, name").eq("chapter_id", chapterId);
    if (se) throw se;
    for (const s of (subs ?? []) as any[]) existing.set(s.name, s.id);
  }
  const toCreate = order.filter((n) => !existing.has(n));
  const retired = [...existing.keys()].filter((n) => !order.includes(n));
  console.log(`\n[1/2] bank: create ${toCreate.length} subtopic(s), reparent ${moves.length} row(s), drop ${retired.length} source(s)`);
  toCreate.forEach((n) => console.log(`        + ${n}`));
  if (APPLY) {
    // Create BEFORE reparenting: subtopic_id is ON DELETE SET NULL, so dropping first would orphan rows silently.
    for (const name of toCreate) {
      const { data, error: ie } = await db.from("subtopics").insert({ chapter_id: chapterId, name, order_index: order.indexOf(name) + 1 }).select("id, name").single();
      if (ie) throw ie;
      existing.set((data as any).name, (data as any).id);
    }
    for (const [i, name] of order.entries()) {
      const { error: oe } = await db.from("subtopics").update({ order_index: i + 1 }).eq("id", existing.get(name)!);
      if (oe) throw oe;
    }
    const byTarget = new Map<string, string[]>();
    for (const m of moves) byTarget.set(m.to, [...(byTarget.get(m.to) ?? []), m.id]);
    for (const [target, ids] of byTarget) {
      for (let i = 0; i < ids.length; i += 150) {
        const { error: ue } = await db.from("questions").update({ subtopic_id: existing.get(target)! }).in("id", ids.slice(i, i + 150));
        if (ue) throw ue;
      }
    }
    for (const name of retired) {
      const sid = existing.get(name)!;
      const { count, error: ce } = await db.from("questions").select("id", { count: "exact", head: true }).eq("subtopic_id", sid);
      if (ce) throw ce;
      if ((count ?? 0) > 0) die(`source subtopic "${name}" still has ${count} question(s) -- not dropping`);
      const { error: de } = await db.from("subtopics").delete().eq("id", sid);
      if (de) throw de;
    }
    console.log("        done");
  }

  // ---------- 2. band + merged files (resolved and checked above) ----------
  for (const f of fileWrites) if (APPLY) writeFileSync(f.path, f.text, "utf8");
  console.log(`\n[2/2] band files: ${bandChanges} item(s) re-cut; ${fileWrites.length} file(s) incl. merged${APPLY ? " written" : ""}`);
  console.log(APPLY ? "\nDONE." : "\nDRY RUN COMPLETE. Nothing written.");
}

main().catch((e) => { console.error(e); process.exit(1); });
