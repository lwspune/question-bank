/**
 * Move NEET rows (PYQ or Pariksha practice) to another subject / chapter / subtopic,
 * in the bank AND in each row's source JSON (scripts/neet/data, scripts/pariksha/data).
 *
 *   npx tsx scripts/neet/retax.ts <moves.json>           # dry run
 *   npx tsx scripts/neet/retax.ts <moves.json> --apply   # write source files + bank
 *   npx tsx scripts/neet/retax.ts <plan.json> [--apply]  # a notes re-cut plan (RecutPlan in retaxLib.ts)
 *
 * moves.json = [{ id, subject, chapter, subtopic, why }], full question UUIDs. The chapter
 * must be in config.ts NEET_CHAPTERS[subject]; a missing chapter or subtopic row is created.
 * Used for chapter re-files AND per-chapter subtopic re-cuts (the /notes pipeline).
 *
 * Guards: every row must be a NEET row whose source entry is found exactly once (a row with
 * no known JSON source, e.g. the GPCC Physics book, is refused unless --allow-no-source);
 * each UPDATE is conditioned on the row's current subject/chapter/subtopic so a concurrent
 * change fails loudly; a revert map (the same shape, pointing back) is written to
 * generated-papers/ before anything changes. Subtopics left with no row are deleted.
 * Pure core: retaxLib.ts (tests/neet-retax.test.ts).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA as NEET_DATA, EXAM_ID, NEET_CHAPTERS, PAPERS } from "./config";
import { DATA as PARIKSHA_DATA, TESTS } from "../pariksha/config";
import { isQuestionFile, patchEntryText, planMoves, planToMoves, sourceKeyFor, type Move, type RecutPlan, type RowNow } from "./retaxLib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const allowNoSource = args.includes("--allow-no-source");
const mapPath = args.find((a) => !a.startsWith("--"));
if (!mapPath) throw new Error("usage: retax.ts <moves.json> [--apply] [--allow-no-source]");

const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

/** A source file's text, and whether it is a list of question entries (figure maps etc. are skipped). */
type Loaded = { raw: string; isQuestions: boolean };
function load(path: string): Loaded {
  const raw = readFileSync(path, "utf8");
  return { raw, isQuestions: isQuestionFile(JSON.parse(raw)) };
}

async function main() {
  // Either a move list, or a notes re-cut plan (pages of id prefixes) plus its chapter dump.
  const input = JSON.parse(readFileSync(mapPath!, "utf8"));
  let moves: Move[];
  if (Array.isArray(input)) moves = input;
  else {
    const plan = input as RecutPlan;
    if (!plan.dump) throw new Error("a re-cut plan needs \"dump\": the _cdsk_<code>.json it was written from");
    const dump = JSON.parse(readFileSync(join("generated-papers", plan.dump), "utf8"));
    const r = planToMoves(plan, dump.questions);
    if (r.errors.length) {
      for (const e of r.errors.slice(0, 30)) console.log(`  PLAN ERROR ${e}`);
      console.log(`refusing: ${r.errors.length} plan errors`);
      process.exit(1);
    }
    moves = r.moves;
  }

  // Current state of every listed row, names resolved.
  const rows: (RowNow & { subjectId: string; chapterId: string; subtopicId: string })[] = [];
  for (const ids of chunk([...new Set(moves.map((m) => m.id))], 150)) {
    const { data, error } = await db
      .from("questions")
      .select("id, source_file, question_number, subject_id, chapter_id, subtopic_id, exam_id, subject:subjects(name), chapter:chapters(name), subtopic:subtopics(name)")
      .in("id", ids);
    if (error) throw error;
    for (const q of data as any[]) {
      if (q.exam_id !== EXAM_ID) continue; // planMoves reports it as not found
      rows.push({
        id: q.id,
        sourceFile: q.source_file,
        number: String(q.question_number),
        subject: q.subject?.name ?? "",
        chapter: q.chapter?.name ?? "",
        subtopic: q.subtopic?.name ?? "",
        subjectId: q.subject_id,
        chapterId: q.chapter_id,
        subtopicId: q.subtopic_id,
      });
    }
  }

  const { errors, changes, unchanged } = planMoves(moves, rows, NEET_CHAPTERS);

  // Source entries, patched as text in memory. Rows the bank already has right are synced too, so a
  // source file always converges on the plan even after an interrupted run.
  const neetPapers = Object.fromEntries(Object.values(PAPERS).map((p) => [p.id, p.sourceFile]));
  const parikshaTests = Object.fromEntries(Object.values(TESTS).map((t) => [t.id, t.sourceFile]));
  const files = new Map<string, Loaded>(); // full path -> loaded
  const dirty = new Set<string>();
  const byRow = new Map(rows.map((r) => [r.id, r]));
  const byMove = new Map(moves.map((m) => [m.id, m]));
  const targets = [
    ...changes.map((c) => ({ id: c.id, sourceFile: c.sourceFile, number: c.number, to: c.to })),
    ...unchanged.map((id) => {
      const r = byRow.get(id)!;
      const m = byMove.get(id)!;
      return { id, sourceFile: r.sourceFile, number: r.number, to: { subject: m.subject, chapter: m.chapter, subtopic: m.subtopic.trim() } };
    }),
  ];
  for (const t of targets) {
    const key = sourceKeyFor(t.sourceFile, neetPapers, parikshaTests);
    if (!key) {
      if (!allowNoSource) errors.push(`${t.id}: no JSON source known for ${t.sourceFile} (pass --allow-no-source to move the bank row only)`);
      continue;
    }
    const dir = key.lane === "neet" ? NEET_DATA : PARIKSHA_DATA;
    const names = readdirSync(dir).filter((f) => f.startsWith(key.prefix) && f.endsWith(".json"));
    const patched = new Map<string, string>();
    let matched = 0;
    for (const n of names) {
      const p = join(dir, n);
      if (!files.has(p)) files.set(p, load(p));
      const f = files.get(p)!;
      if (!f.isQuestions) continue;
      const r = patchEntryText(f.raw, t.number, t.to);
      matched += r.matched;
      if (r.matched) patched.set(p, r.text);
    }
    if (matched !== 1) {
      errors.push(`${t.id}: ${matched} source entries numbered ${t.number} under ${key.prefix}* (need exactly 1)`);
      continue;
    }
    for (const [p, text] of patched) {
      if (text !== files.get(p)!.raw) {
        files.get(p)!.raw = text;
        dirty.add(p);
      }
    }
  }

  // Report.
  console.log(`moves ${moves.length} · changes ${changes.length} · already there ${unchanged.length} · errors ${errors.length}`);
  const summary = new Map<string, number>();
  for (const c of changes) {
    const k = `${c.from.subject} / ${c.from.chapter}  ->  ${c.to.subject} / ${c.to.chapter}`;
    summary.set(k, (summary.get(k) ?? 0) + 1);
  }
  for (const [k, n] of summary) console.log(`  ${String(n).padStart(4)}  ${k}`);
  const newSubs = new Set(changes.map((c) => `${c.to.subject} / ${c.to.chapter} / ${c.to.subtopic}`));
  console.log(`  target subtopics: ${newSubs.size}; source files touched: ${dirty.size}`);
  for (const e of errors.slice(0, 30)) console.log(`  ERROR ${e}`);
  if (errors.length) {
    console.log("refusing: fix the errors above");
    process.exit(1);
  }
  if (!apply) {
    console.log("dry run: nothing written (add --apply)");
    return;
  }

  // Revert map first.
  const out = join(process.cwd(), "generated-papers");
  if (!existsSync(out)) mkdirSync(out);
  const revertPath = join(out, `neet-retax-revert-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(revertPath, JSON.stringify(changes.map((c) => ({ id: c.id, ...c.from, why: `revert: ${c.why}` })), null, 2));
  console.log(`revert map: ${revertPath}`);

  // Source files.
  for (const p of dirty) writeFileSync(p, files.get(p)!.raw);

  // Bank. Resolve or create subject / chapter / subtopic ids.
  const subjectIds = new Map<string, string>();
  const { data: subs, error: se } = await db.from("subjects").select("id, name").eq("exam_id", EXAM_ID);
  if (se) throw se;
  for (const s of subs!) subjectIds.set(s.name, s.id);
  const chapterIds = new Map<string, string>();
  const subtopicIds = new Map<string, string>();
  async function chapterId(subject: string, chapter: string): Promise<string> {
    const k = `${subject}\u0000${chapter}`;
    if (chapterIds.has(k)) return chapterIds.get(k)!;
    const sid = subjectIds.get(subject);
    if (!sid) throw new Error(`no NEET subject "${subject}"`);
    let { data } = await db.from("chapters").select("id").eq("subject_id", sid).eq("name", chapter).maybeSingle();
    if (!data) {
      const ins = await db.from("chapters").insert({ subject_id: sid, name: chapter }).select("id").single();
      if (ins.error) throw ins.error;
      data = ins.data;
      console.log(`  created chapter ${subject} / ${chapter}`);
    }
    chapterIds.set(k, data!.id);
    return data!.id;
  }
  async function subtopicId(cid: string, name: string): Promise<string> {
    const k = `${cid}\u0000${name}`;
    if (subtopicIds.has(k)) return subtopicIds.get(k)!;
    let { data } = await db.from("subtopics").select("id").eq("chapter_id", cid).eq("name", name).maybeSingle();
    if (!data) {
      const ins = await db.from("subtopics").insert({ chapter_id: cid, name }).select("id").single();
      if (ins.error) throw ins.error;
      data = ins.data;
    }
    subtopicIds.set(k, data!.id);
    return data!.id;
  }

  const byId = new Map(rows.map((r) => [r.id, r]));
  const vacated = new Set<string>();
  for (const c of changes) {
    const r = byId.get(c.id)!;
    const cid = await chapterId(c.to.subject, c.to.chapter);
    const tid = await subtopicId(cid, c.to.subtopic);
    const { data, error } = await db
      .from("questions")
      .update({ subject_id: subjectIds.get(c.to.subject)!, chapter_id: cid, subtopic_id: tid })
      .eq("id", c.id)
      .eq("subject_id", r.subjectId)
      .eq("chapter_id", r.chapterId)
      .eq("subtopic_id", r.subtopicId)
      .select("id");
    if (error) throw error;
    if (data!.length !== 1) throw new Error(`${c.id}: expected to update 1 row, updated ${data!.length} (changed since read?)`);
    if (r.subtopicId !== tid) vacated.add(r.subtopicId);
  }

  // Delete subtopics nothing points at any more (any visibility or kind).
  let deleted = 0;
  for (const sid of vacated) {
    const { count, error } = await db.from("questions").select("id", { count: "exact", head: true }).eq("subtopic_id", sid);
    if (error) throw error;
    if (count === 0) {
      const del = await db.from("subtopics").delete().eq("id", sid);
      if (del.error) throw del.error;
      deleted++;
    }
  }
  console.log(`applied: ${changes.length} rows moved, ${dirty.size} source files rewritten, ${deleted} emptied subtopics deleted`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
