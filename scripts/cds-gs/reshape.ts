/**
 * CDS General Knowledge — re-cut one chapter's CLASSIFICATION subtopics into
 * TEACHING subtopics, driven by a reviewed plan file.
 *
 *   npx tsx scripts/cds-gs/reshape.ts <plan-module>            # dry run
 *   npx tsx scripts/cds-gs/reshape.ts <plan-module> --apply    # write
 *
 * The GK sibling of scripts/cds-maths/reshape.ts (read its header for WHY). Two
 * differences: the plan names its SUBJECT, because GK holds eight; and
 * catalog.json is subject -> chapter -> subtopics. The data-file side reuses
 * cds-maths/reshapeFiles.ts unchanged — a GK chapter name is unique across all
 * GK subjects, so matching on chapter alone is safe. Moving a row to ANOTHER
 * chapter is refile.ts's job, not this one's.
 *
 * Same three sides move together: the bank, catalog.json, and every
 * <paper>.questions.json. Everything is resolved before anything is written.
 */
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_ID, PAPERS, dataPath } from "./config";
import { planFileEdits } from "../cds-maths/reshapeFiles";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

export type ReshapePlan = {
  subject: string;
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
const CATALOG = join(process.cwd(), "scripts/cds-gs/catalog.json");

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

async function resolveChapter(db: SupabaseClient, subject: string, chapter: string): Promise<string> {
  const { data, error } = await db.from("chapters").select("id, name, subjects!inner(name, exam_id)").eq("name", chapter);
  if (error) throw error;
  const hits = (data ?? []).filter((c: any) => c.subjects?.exam_id === EXAM_ID && c.subjects?.name === subject);
  if (hits.length !== 1) die(`expected exactly 1 CDS ${subject} "${chapter}" chapter, found ${hits.length}`);
  return (hits[0] as any).id;
}

async function main() {
  const planPath = process.argv[2];
  if (!planPath || planPath.startsWith("--")) die("usage: reshape.ts <plan-module> [--apply]");
  const plan = (await import(pathToFileURL(resolve(planPath)).href)).default as ReshapePlan;
  const { subject, chapter, order, whole, byPrefix, expected, total } = plan;
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
  const chapterId = await resolveChapter(db, subject, chapter);

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

  // Resolve the data files BEFORE writing anything: a refusal here used to come after the bank
  // and catalog.json had already been written (see reshapeFiles.ts).
  const filePlans: { path: string; raw: string; list: any[]; changes: { index: number; to: string }[] }[] = [];
  const fileProblems: string[] = [];
  for (const pid of Object.keys(PAPERS)) {
    const path = dataPath(pid, "questions");
    const raw = readFileSync(path, "utf8");
    const list = JSON.parse(raw) as any[];
    const { changes, problems: p } = planFileEdits(list, { pid, chapter, order, whole, byKey });
    fileProblems.push(...p);
    if (changes.length) filePlans.push({ path, raw, list, changes });
  }
  if (fileProblems.length) die(`${fileProblems.length} data row(s) do not join to the bank`, fileProblems);

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
  const cat = JSON.parse(catRaw) as Record<string, Record<string, string[]>>;
  if (!cat[subject]?.[chapter]) die(`catalog.json has no ${subject} / ${chapter}`);
  const same = JSON.stringify(cat[subject][chapter]) === JSON.stringify(order);
  console.log(`
[2/3] catalog.json: ${same ? "already current" : `${cat[subject][chapter].length} -> ${order.length} entries`}`);
  if (APPLY && !same) { cat[subject][chapter] = order; writePreserving(CATALOG, catRaw, cat); }

  // ---------- 3. <paper>.questions.json (resolved and checked above) ----------
    let touched = 0;
  for (const { path, raw, list, changes } of filePlans) {
    for (const { index, to } of changes) list[index].subtopic = to;
    touched += changes.length;
    if (APPLY) writePreserving(path, raw, list);
  }
  console.log(`\n[3/3] questions.json: ${touched} row(s) across ${filePlans.length} file(s)${APPLY ? " written" : ""}`);
  console.log(APPLY ? "\nDONE. Next: npm run notes:order once the chapter's notes are registered." : "\nDRY RUN COMPLETE. Nothing written.");
}

main().catch((e) => { console.error(e); process.exit(1); });
