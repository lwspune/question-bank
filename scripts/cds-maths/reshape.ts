/**
 * CDS Elementary Mathematics — re-cut one chapter's CLASSIFICATION subtopics into
 * TEACHING subtopics, driven by a reviewed plan file.
 *
 *   npx tsx scripts/cds-maths/reshape.ts scripts/cds-maths/reshape/<chapter>.ts            # dry run
 *   npx tsx scripts/cds-maths/reshape.ts scripts/cds-maths/reshape/<chapter>.ts --apply    # write
 *
 * The generalisation of reshape-number-system.ts (kept as the first instance); read
 * its header for WHY: catalog.json was seeded to CLASSIFY papers, not to sequence
 * teaching, so each chapter's notes pass re-cuts its subtopics after reading every
 * solution. THREE sides move together, because subtopics are soft-validated and
 * auto-created by the pipeline: (1) the bank, (2) catalog.json, (3) the per-paper
 * <paper>.questions.json that commit.ts reads. Band files stay untouched (they are
 * transcription evidence).
 *
 * A row resolves, in order: an explicit id-prefix assignment → a whole-subtopic move
 * → already sitting in a teaching subtopic (idempotent re-run). Anything else, any
 * prefix that matches nothing, and any target count that disagrees with the plan's
 * `expected` is a REFUSAL — nothing is written.
 */
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { PAPERS, dataPath } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

export type ReshapePlan = {
  chapter: string;
  /** Teaching order — also the new catalog.json list for the chapter. */
  order: string[];
  /** Source subtopic → target, moved wholesale. */
  whole: Record<string, string>;
  /** Target → id prefixes, for rows assigned one by one (any source). */
  byPrefix: Record<string, string[]>;
  /** The reviewed per-target counts. */
  expected: Record<string, number>;
  /** PUBLIC rows in the chapter. */
  total: number;
};

const APPLY = process.argv.includes("--apply");
const CATALOG = join(process.cwd(), "scripts/cds-maths/catalog.json");

function die(msg: string, detail: string[] = []): never {
  console.log(`\nREFUSING: ${msg}`);
  detail.slice(0, 40).forEach((d) => console.log("  " + d));
  if (detail.length > 40) console.log(`  ... and ${detail.length - 40} more`);
  process.exit(1);
}

function writePreserving(path: string, raw: string, data: unknown) {
  const crlf = raw.includes("\r\n");
  let out = JSON.stringify(data, null, 2);
  if (/\n$/.test(raw)) out += "\n";
  if (crlf) out = out.replace(/\n/g, "\r\n");
  writeFileSync(path, out, "utf8");
}

async function resolveChapter(db: SupabaseClient, chapter: string): Promise<string> {
  const { data, error } = await db.from("chapters").select("id, name, subjects!inner(name, exams!inner(name))").eq("name", chapter);
  if (error) throw error;
  const hits = (data ?? []).filter((c: any) => c.subjects?.exams?.name === "CDS" && c.subjects?.name === "Mathematics");
  if (hits.length !== 1) die(`expected exactly 1 CDS Mathematics "${chapter}" chapter, found ${hits.length}`);
  return (hits[0] as any).id;
}

async function main() {
  const planPath = process.argv[2];
  if (!planPath || planPath.startsWith("--")) die("usage: reshape.ts <plan-module> [--apply]");
  const plan = (await import(pathToFileURL(resolve(planPath)).href)).default as ReshapePlan;
  const { chapter, order, whole, byPrefix, expected, total } = plan;
  console.log(`${APPLY ? "=== APPLY ===" : "=== DRY RUN (pass --apply to write) ==="}  ${chapter}\n`);

  for (const t of [...Object.values(whole), ...Object.keys(byPrefix), ...Object.keys(expected)]) {
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

  const problems: string[] = [];
  const counts: Record<string, number> = {};
  const usedPrefix = new Set<string>();
  const moves: { id: string; from: string; to: string }[] = [];
  const byKey = new Map<string, string>();
  const fileToPaper = new Map<string, string>();
  for (const [pid, p] of Object.entries(PAPERS)) fileToPaper.set(p.sourceFile, pid);

  for (const r of all) {
    const from = r.subtopics?.name as string;
    const hits = [...prefixTo.keys()].filter((p) => (r.id as string).startsWith(p));
    if (hits.length > 1) { problems.push(`AMBIGUOUS ${r.id} matches ${hits.join(", ")}`); continue; }
    let to: string | undefined;
    if (hits.length === 1) { to = prefixTo.get(hits[0]); usedPrefix.add(hits[0]); }
    else if (whole[from]) to = whole[from];
    else if (order.includes(from)) to = from;
    else { problems.push(`UNASSIGNED ${r.id} (${from}, ${r.visibility})`); continue; }
    if (r.visibility === "PUBLIC") counts[to!] = (counts[to!] ?? 0) + 1;
    if (from !== to) moves.push({ id: r.id, from, to: to! });
    const pid = r.source_file ? fileToPaper.get(r.source_file) : undefined;
    if (pid && r.source_row != null) byKey.set(`${pid}#${r.source_row}`, to!);
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
  retired.forEach((n) => console.log(`        - ${n}`));
  if (APPLY) {
    // Create BEFORE reparenting: subtopic_id is ON DELETE SET NULL, so dropping first would orphan rows silently.
    for (const name of toCreate) {
      const { data, error: ie } = await db.from("subtopics").insert({ chapter_id: chapterId, name, order_index: order.indexOf(name) + 1 }).select("id, name").single();
      if (ie) throw ie;
      existing.set((data as any).name, (data as any).id);
    }
    for (const [i, name] of order.entries()) {
      const sid = existing.get(name);
      if (sid) { const { error: oe } = await db.from("subtopics").update({ order_index: i + 1 }).eq("id", sid); if (oe) throw oe; }
    }
    const byTarget = new Map<string, string[]>();
    for (const m of moves) byTarget.set(m.to, [...(byTarget.get(m.to) ?? []), m.id]);
    for (const [target, ids] of byTarget) {
      const sid = existing.get(target)!;
      for (let i = 0; i < ids.length; i += 150) {
        const { error: ue } = await db.from("questions").update({ subtopic_id: sid }).in("id", ids.slice(i, i + 150));
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

  // ---------- 2. catalog.json ----------
  const catRaw = readFileSync(CATALOG, "utf8");
  const cat = JSON.parse(catRaw) as Record<string, string[]>;
  const same = JSON.stringify(cat[chapter] ?? []) === JSON.stringify(order);
  console.log(`\n[2/3] catalog.json: ${same ? "already current" : `${(cat[chapter] ?? []).length} -> ${order.length} entries`}`);
  if (APPLY && !same) { cat[chapter] = order; writePreserving(CATALOG, catRaw, cat); }

  // ---------- 3. <paper>.questions.json ----------
  let files = 0, touched = 0;
  const fileProblems: string[] = [];
  for (const pid of Object.keys(PAPERS)) {
    const path = dataPath(pid, "questions");
    const raw = readFileSync(path, "utf8");
    const list = JSON.parse(raw) as any[];
    let n = 0;
    for (const q of list) {
      if (q?.chapter !== chapter) continue;
      // A data row with no bank row was deliberately left out at commit (e.g. 2021-1 Q49: no
      // option is correct). It still follows a whole-subtopic move so the file stays consistent.
      const to = byKey.get(`${pid}#${Number(q.number)}`) ?? (order.includes(q.subtopic) ? q.subtopic : whole[q.subtopic]);
      if (!to) { fileProblems.push(`NO DB ROW ${pid} Q${q.number} subtopic="${q.subtopic}" and no whole-subtopic move`); continue; }
      if (q.subtopic !== to) { q.subtopic = to; n++; }
    }
    if (!n) continue;
    files++; touched += n;
    if (APPLY) writePreserving(path, raw, list);
  }
  if (fileProblems.length) die(`${fileProblems.length} data row(s) do not join to the bank`, fileProblems);
  console.log(`\n[3/3] questions.json: ${touched} row(s) across ${files} file(s)${APPLY ? " written" : ""}`);
  console.log(APPLY ? "\nDONE. Next: npm run notes:order once the chapter's notes are registered." : "\nDRY RUN COMPLETE. Nothing written.");
}

main().catch((e) => { console.error(e); process.exit(1); });
