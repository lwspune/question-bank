/**
 * SSC CGL Tier I: re-cut one chapter's subtopics into TEACHING subtopics for its /notes pass, from a
 * reviewed plan file (the SSC twin of scripts/spi/reshape.ts; read scripts/cds-maths/reshape.ts for
 * why a notes pass re-cuts at all).
 *
 *   npx tsx scripts/ssc-cgl/reshape.ts scripts/ssc-cgl/reshape/<chapter>.ts            # dry run
 *   npx tsx scripts/ssc-cgl/reshape.ts scripts/ssc-cgl/reshape/<chapter>.ts --apply    # write
 *
 * THREE things move together, so a re-commit cannot undo the re-cut: the bank, the committed Tier I
 * transcripts (the source of record), and the catalog, which gains any new teaching name and keeps
 * every old one (Tier II rows still use them; recut.ts). A bank row joins its transcript block by
 * source_file + source_row (the question number). A block skipped at commit as a repeat takes the
 * target of the row it repeats (repeats.json); any other block with no bank row needs an `extra`
 * entry. Any unresolved row or block, any prefix matching nothing, and any count that disagrees with
 * the plan's `expected` is a REFUSAL, checked before anything is written. Tier I only: Tier II is
 * its own exam and is never touched.
 */
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { CATALOG, EXAM_NAME, SHIFTS, TRANSCRIPTS } from "./config";
import { addCatalogSubtopics, formatAuthored, repeatTargets, type Authored, type Repeat } from "./recut";
import { retagSubtopics } from "../spi/lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

export type ReshapePlan = {
  chapter: string;
  /** Teaching order. */
  order: string[];
  /** Target → id prefixes. Every bank row of the chapter must be named. */
  byPrefix: Record<string, string[]>;
  /** "<shift id>#<question number>" → target, for transcript blocks with no bank row and no repeats.json entry. */
  extra?: Record<string, string>;
  /** The reviewed per-target counts (PUBLIC rows). */
  expected: Record<string, number>;
  /** PUBLIC rows in the chapter. */
  total: number;
};

const SUBJECT = "Quantitative Aptitude";
const APPLY = process.argv.includes("--apply");
const AUTHORED_PATH = join(__dirname, "catalog-authored.json");
const CATALOG_PATH = join(__dirname, "catalog.json");

function die(msg: string, detail: string[] = []): never {
  console.log(`\nREFUSING: ${msg}`);
  detail.slice(0, 40).forEach((d) => console.log("  " + d));
  if (detail.length > 40) console.log(`  ... and ${detail.length - 40} more`);
  process.exit(1);
}

async function resolveChapter(db: SupabaseClient, chapter: string): Promise<string> {
  const { data, error } = await db.from("chapters").select("id, subjects!inner(name, exams!inner(name))").eq("name", chapter);
  if (error) throw error;
  const hits = (data ?? []).filter((c: any) => c.subjects?.exams?.name === EXAM_NAME && c.subjects?.name === SUBJECT);
  if (hits.length !== 1) die(`expected exactly 1 ${EXAM_NAME} ${SUBJECT} "${chapter}" chapter, found ${hits.length}`);
  return (hits[0] as any).id;
}

async function main() {
  const planPath = process.argv[2];
  if (!planPath || planPath.startsWith("--")) die("usage: reshape.ts <plan-module> [--apply]");
  const plan = (await import(pathToFileURL(resolve(planPath)).href)).default as ReshapePlan;
  const { chapter, order, byPrefix, expected, total } = plan;
  const extra = plan.extra ?? {};
  console.log(`${APPLY ? "=== APPLY ===" : "=== DRY RUN (pass --apply to write) ==="}  ${chapter}\n`);

  for (const t of [...Object.keys(byPrefix), ...Object.keys(expected), ...Object.values(extra)]) {
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
  const chapterId = await resolveChapter(db, chapter);

  // Any visibility: a source subtopic is only safe to drop when NOTHING points at it.
  const { data: rows, error } = await db.from("questions").select("id, visibility, source_file, source_row, subtopics(name)").eq("chapter_id", chapterId);
  if (error) throw error;
  const all = (rows ?? []) as any[];
  const pub = all.filter((r) => r.visibility === "PUBLIC");
  console.log(`chapter rows: ${all.length} (${pub.length} PUBLIC)`);
  if (pub.length !== total) die(`expected ${total} PUBLIC rows, got ${pub.length}`);

  const tier1 = Object.entries(SHIFTS).filter(([id]) => id.startsWith("t1-"));
  const fileToShift = new Map(tier1.map(([id, s]) => [s.sourceFile, id]));
  const problems: string[] = [];
  const counts: Record<string, number> = {};
  const usedPrefix = new Set<string>();
  const moves: { id: string; to: string }[] = [];
  const targetOf = new Map<string, string>();
  const targetsByShift = new Map<string, Map<number, string>>();
  for (const r of all) {
    const hits = [...prefixTo.keys()].filter((p) => (r.id as string).startsWith(p));
    if (hits.length !== 1) { problems.push(`${hits.length ? "AMBIGUOUS" : "UNASSIGNED"} ${r.id} (${r.subtopics?.name}, ${r.visibility})`); continue; }
    const to = prefixTo.get(hits[0])!;
    usedPrefix.add(hits[0]);
    targetOf.set(r.id, to);
    if (r.visibility === "PUBLIC") counts[to] = (counts[to] ?? 0) + 1;
    if (r.subtopics?.name !== to) moves.push({ id: r.id, to });
    const sid = fileToShift.get(r.source_file);
    if (!sid || r.source_row == null) { problems.push(`NO TRANSCRIPT JOIN ${r.id} (${r.source_file} #${r.source_row})`); continue; }
    if (!targetsByShift.has(sid)) targetsByShift.set(sid, new Map());
    targetsByShift.get(sid)!.set(Number(r.source_row), to);
  }
  for (const p of prefixTo.keys()) if (!usedPrefix.has(p)) problems.push(`PREFIX MATCHED NOTHING: ${p}`);
  const repeats: Record<string, Repeat[]> = JSON.parse(readFileSync(join(__dirname, "repeats.json"), "utf8"));
  const fromRepeats = [...repeatTargets(repeats, targetOf)].map(([sid, m]) => [...m].map(([n, to]) => [`${sid}#${n}`, to] as const)).flat();
  for (const [key, to] of [...fromRepeats, ...Object.entries(extra)]) {
    const [sid, n] = key.split("#");
    if (!targetsByShift.has(sid)) targetsByShift.set(sid, new Map());
    const m = targetsByShift.get(sid)!;
    if (m.has(Number(n))) problems.push(`BLOCK ${key} is named twice (a bank row, a repeat or an extra)`);
    m.set(Number(n), to);
  }
  if (problems.length) die(`${problems.length} row(s) could not be resolved`, problems);

  console.log("\nTARGET TEACHING SUBTOPIC".padEnd(60) + " got   exp");
  let drift = 0;
  for (const name of order) {
    const got = counts[name] ?? 0, exp = expected[name];
    if (got !== exp) drift++;
    console.log(name.padEnd(60) + String(got).padStart(4) + String(exp).padStart(6) + (got !== exp ? "  <-- DRIFT" : ""));
  }
  if (drift) die(`${drift} target count(s) disagree with the reviewed plan`);
  console.log(`rows to move: ${moves.length}; repeat blocks resolved via repeats.json: ${fromRepeats.length}`);

  // Resolve every transcript and the catalog BEFORE writing anything.
  const filePlans: { path: string; text: string; changes: number }[] = [];
  const fileProblems: string[] = [];
  for (const [sid] of tier1) {
    const path = join(TRANSCRIPTS, `${sid}.txt`);
    if (!existsSync(path)) continue;
    const r = retagSubtopics(readFileSync(path, "utf8"), chapter, targetsByShift.get(sid) ?? new Map(), order);
    fileProblems.push(...r.problems.map((x) => `${sid} ${x}`));
    if (r.changes) filePlans.push({ path, text: r.text, changes: r.changes });
  }
  if (fileProblems.length) die(`${fileProblems.length} transcript block(s) do not resolve`, fileProblems);
  const authored: Authored = JSON.parse(readFileSync(AUTHORED_PATH, "utf8"));
  const cat = addCatalogSubtopics(CATALOG, authored, SUBJECT, chapter, order);

  // ---------- 1. the bank ----------
  const existing = new Map<string, string>();
  {
    const { data: subs, error: se } = await db.from("subtopics").select("id, name").eq("chapter_id", chapterId);
    if (se) throw se;
    for (const s of (subs ?? []) as any[]) existing.set(s.name, s.id);
  }
  const toCreate = order.filter((n) => !existing.has(n));
  const retired = [...existing.keys()].filter((n) => !order.includes(n));
  console.log(`\n[1/3] bank: create ${toCreate.length} subtopic(s), reparent ${moves.length} row(s), drop ${retired.length} source(s)`);
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

  // ---------- 2. transcripts (resolved and checked above) ----------
  for (const f of filePlans) if (APPLY) writeFileSync(f.path, f.text, "utf8");
  console.log(`\n[2/3] transcripts: ${filePlans.reduce((s, f) => s + f.changes, 0)} block(s) across ${filePlans.length} file(s)${APPLY ? " written" : ""}`);

  // ---------- 3. catalog: new names added, old names kept ----------
  console.log(`\n[3/3] catalog: add ${cat.added.length} name(s)${cat.added.length ? ": " + cat.added.join(" · ") : ""}`);
  if (APPLY && cat.added.length) {
    writeFileSync(AUTHORED_PATH, formatAuthored(cat.authored), "utf8");
    writeFileSync(CATALOG_PATH, JSON.stringify(cat.catalog, null, 2) + "\n", "utf8");
  }
  console.log(APPLY ? "\nDONE. Next: npm run notes:order once the chapter's notes are registered." : "\nDRY RUN COMPLETE. Nothing written.");
}

main().catch((e) => { console.error(e); process.exit(1); });
