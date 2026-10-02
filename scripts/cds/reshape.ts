/**
 * CDS English — re-cut one chapter's subtopics for /notes, row by row.
 *
 *   npx tsx scripts/cds/reshape.ts <assign.json>           # dry run
 *   npx tsx scripts/cds/reshape.ts <assign.json> --apply   # write
 *
 * assign.json: { "chapter": "Vocabulary", "order": ["Subtopic A", ...],
 *                "assign": { "<8-hex id prefix>": "Subtopic A", ... } }
 *
 * The CDS English sibling of scripts/cds-maths/reshape.ts and scripts/cds-gs/reshape.ts. English
 * subtopics normally come from the SECTION type (config.ts SECTION_CATALOG); since 2026-10-02 a row's
 * own `subtopic` in <paper>.questions.json wins in any section (lib.ts), which is what makes a
 * per-row re-cut durable. Two sides move together: the bank (subtopic_id) and every
 * <paper>.questions.json row (`subtopic`). The chapter never changes here.
 *
 * Refuses, writing nothing, when: a chapter row (any visibility) has no assignment; a prefix matches
 * zero or several rows; a target is not in `order`; a bank row does not join to a data row by
 * source_file + question_number. Idempotent: a re-run with the same file changes nothing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, PAPERS, dataPath } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Assign = { chapter: string; order: string[]; assign: Record<string, string> };
const APPLY = process.argv.includes("--apply");

function die(msg: string, detail: string[] = []): never {
  console.log(`\nREFUSING: ${msg}`);
  detail.slice(0, 40).forEach((d) => console.log("  " + d));
  if (detail.length > 40) console.log(`  ... and ${detail.length - 40} more`);
  process.exit(1);
}

async function main() {
  const path = process.argv[2];
  if (!path || path.startsWith("--")) die("usage: reshape.ts <assign.json> [--apply]");
  const spec: Assign = JSON.parse(readFileSync(path, "utf8"));
  const { chapter, order, assign } = spec;
  console.log(`${APPLY ? "=== APPLY ===" : "=== DRY RUN (pass --apply to write) ==="}  English / ${chapter}\n`);
  for (const t of Object.values(assign)) if (!order.includes(t)) die(`target "${t}" is not in order`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: chs, error: ce } = await db.from("chapters").select("id, subjects!inner(name, exam_id)").eq("name", chapter);
  if (ce) throw ce;
  const hit = (chs ?? []).filter((c: any) => c.subjects?.exam_id === EXAM_ID && c.subjects?.name === "English");
  if (hit.length !== 1) die(`expected 1 CDS English "${chapter}" chapter, found ${hit.length}`);
  const chapterId = (hit[0] as any).id as string;

  const { data: rows, error } = await db.from("questions")
    .select("id, visibility, source_file, question_number, subtopics(name)").eq("chapter_id", chapterId).limit(5000);
  if (error) throw error;
  const all = (rows ?? []) as any[];

  const fileToPaper = new Map(Object.values(PAPERS).map((p) => [p.sourceFile, p.id]));
  const problems: string[] = [];
  const target = new Map<string, string>(); // row id -> subtopic
  const used = new Set<string>();
  for (const r of all) {
    const hits = Object.keys(assign).filter((p) => r.id.startsWith(p));
    if (hits.length > 1) { problems.push(`AMBIGUOUS ${r.id}: ${hits.join(", ")}`); continue; }
    if (hits.length === 0) { problems.push(`UNASSIGNED ${r.id} (${r.subtopics?.name}, ${r.visibility})`); continue; }
    used.add(hits[0]);
    target.set(r.id, assign[hits[0]]);
  }
  for (const p of Object.keys(assign)) if (!used.has(p)) problems.push(`PREFIX MATCHED NOTHING: ${p}`);
  if (problems.length) die(`${problems.length} assignment problem(s)`, problems);

  // Data side, resolved before any write.
  const byPaper = new Map<string, Map<number, string>>();
  for (const r of all) {
    const pid = fileToPaper.get(r.source_file);
    const n = Number(r.question_number);
    if (!pid || !Number.isFinite(n)) { problems.push(`NO DATA JOIN ${r.id} (${r.source_file} Q${r.question_number})`); continue; }
    if (!byPaper.has(pid)) byPaper.set(pid, new Map());
    byPaper.get(pid)!.set(n, target.get(r.id)!);
  }
  const files: { path: string; raw: string; list: any[]; changes: number }[] = [];
  for (const [pid, m] of byPaper) {
    const fp = dataPath(pid, "questions");
    const raw = readFileSync(fp, "utf8");
    const list = JSON.parse(raw) as any[];
    let changes = 0;
    for (const [n, sub] of m) {
      const q = list.find((x) => Number(x.number) === n);
      if (!q) { problems.push(`NO DATA ROW ${pid} Q${n}`); continue; }
      if (q.subtopic !== sub) { q.subtopic = sub; changes++; }
    }
    if (changes) files.push({ path: fp, raw, list, changes });
  }
  if (problems.length) die(`${problems.length} data join problem(s)`, problems);

  const counts: Record<string, number> = {};
  for (const t of target.values()) counts[t] = (counts[t] ?? 0) + 1;
  console.log("TARGET SUBTOPIC".padEnd(64) + "rows");
  for (const name of order) console.log(name.padEnd(64) + String(counts[name] ?? 0).padStart(4));
  const moves = all.filter((r) => r.subtopics?.name !== target.get(r.id));
  console.log(`\nrows to move: ${moves.length}; data files to update: ${files.length} (${files.reduce((a, f) => a + f.changes, 0)} rows)`);

  // ---------- bank ----------
  const existing = new Map<string, string>();
  const { data: subs, error: se } = await db.from("subtopics").select("id, name").eq("chapter_id", chapterId);
  if (se) throw se;
  for (const s of (subs ?? []) as any[]) existing.set(s.name, s.id);
  const toCreate = order.filter((n) => !existing.has(n));
  const retired = [...existing.keys()].filter((n) => !order.includes(n));
  toCreate.forEach((n) => console.log(`  + ${n}`));
  retired.forEach((n) => console.log(`  - ${n}`));
  if (!APPLY) return console.log("\nDRY RUN COMPLETE. Nothing written.");

  for (const name of toCreate) {
    const { data, error: ie } = await db.from("subtopics").insert({ chapter_id: chapterId, name, order_index: order.indexOf(name) + 1 }).select("id, name").single();
    if (ie) throw ie;
    existing.set((data as any).name, (data as any).id);
  }
  const byTarget = new Map<string, string[]>();
  for (const r of moves) byTarget.set(target.get(r.id)!, [...(byTarget.get(target.get(r.id)!) ?? []), r.id]);
  for (const [name, ids] of byTarget) {
    for (let i = 0; i < ids.length; i += 150) {
      const { error: ue } = await db.from("questions").update({ subtopic_id: existing.get(name)! }).in("id", ids.slice(i, i + 150));
      if (ue) throw ue;
    }
  }
  for (const name of retired) {
    const sid = existing.get(name)!;
    const { count, error: ce2 } = await db.from("questions").select("id", { count: "exact", head: true }).eq("subtopic_id", sid);
    if (ce2) throw ce2;
    if ((count ?? 0) > 0) die(`retired subtopic "${name}" still has ${count} row(s) — not dropping`);
    const { error: de } = await db.from("subtopics").delete().eq("id", sid);
    if (de) throw de;
  }
  for (const f of files) {
    let out = JSON.stringify(f.list, null, 1);
    if (/\n$/.test(f.raw)) out += "\n";
    if (f.raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
    writeFileSync(f.path, out, "utf8");
  }
  console.log("\nDONE. Next: register the notes, tag, then npm run notes:order.");
}

main().catch((e) => { console.error(e); process.exit(1); });
