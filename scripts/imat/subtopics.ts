/**
 * IMAT subtopics: create them from the notes registry, and file each original
 * twin under one.
 *
 *   npx tsx scripts/imat/subtopics.ts                        # dry run: report missing subtopics
 *   npx tsx scripts/imat/subtopics.ts --apply                # create them
 *   npx tsx scripts/imat/subtopics.ts --dump=<dir>           # one JSON per chapter: subtopics + twins (assignment input)
 *   npx tsx scripts/imat/subtopics.ts --assign               # check scripts/imat/practice/subtopics.json against the DB
 *   npx tsx scripts/imat/subtopics.ts --assign --apply       # write questions.subtopic_id from it
 *
 * Add `--mur` to --dump / --assign to work on the ministry's papers (2023 on, the
 * rows not publish_blocked) instead of the twins; their file is mur-subtopics.json.
 *
 * Idempotent. The assignment file ({ questionId: subtopicSlug }) is the source
 * of record; a re-run rewrites the same values. Pure core: subtopicsLib.ts.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { EXAM_NAME } from "./config";
import { checkAssignments, subtopicPlan, type PlannedSubtopic, type TwinRef } from "./subtopicsLib";
import { IMAT_NOTES_CHAPTERS } from "../../src/lib/sites/imat/notes/registry";

/** `--mur`: the ministry's papers (2023 on) rather than the twins. */
const MUR = process.argv.includes("--mur");
const ASSIGNMENTS = MUR ? join(__dirname, "mur-subtopics.json") : join(__dirname, "practice", "subtopics.json");
const SET_NAME = MUR ? "IMAT ministry questions" : "IMAT twins";

/** The rows this run files: the twins (practice), or the ministry papers (pyq). Either
 *  way never a publish_blocked row: the twins are ours and the Cambridge papers are out. */
const KIND = MUR ? "pyq" : "practice";

type Twin = TwinRef & { text: string; context: string | null; options: { label: string; text: string }[] };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** chapter key "subject|chapter" -> chapter id, for the IMAT exam. */
async function loadChapters(client: SupabaseClient): Promise<Map<string, string>> {
  const { data, error } = await client
    .from("chapters")
    .select("id, name, subjects!inner(name, exams!inner(name))")
    .eq("subjects.exams.name", EXAM_NAME);
  if (error) throw new Error(`chapter read failed: ${error.message}`);
  const out = new Map<string, string>();
  for (const c of (data ?? []) as unknown as { id: string; name: string; subjects: { name: string } }[]) {
    out.set(`${c.subjects.name}|${c.name}`, c.id);
  }
  return out;
}

/** subtopic key "chapterId|name" -> subtopic id. */
async function loadSubtopics(client: SupabaseClient, chapterIds: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let i = 0; i < chapterIds.length; i += 100) {
    const { data, error } = await client
      .from("subtopics")
      .select("id, name, chapter_id")
      .in("chapter_id", chapterIds.slice(i, i + 100));
    if (error) throw new Error(`subtopic read failed: ${error.message}`);
    for (const s of data ?? []) out.set(`${s.chapter_id}|${s.name}`, s.id);
  }
  return out;
}

async function loadTwins(client: SupabaseClient): Promise<Twin[]> {
  const out: Twin[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("questions")
      .select("id, text, context, subjects(name), chapters(name), exams!inner(name), options(label, text)")
      .eq("exams.name", EXAM_NAME)
      .eq("question_kind", KIND)
      .is("publish_blocked", null)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(`twin read failed: ${error.message}`);
    for (const q of (data ?? []) as unknown as {
      id: string;
      text: string;
      context: string | null;
      subjects: { name: string };
      chapters: { name: string };
      options: { label: string; text: string }[];
    }[]) {
      out.push({
        id: q.id,
        subject: q.subjects.name,
        chapter: q.chapters.name,
        text: q.text,
        context: q.context,
        options: [...q.options].sort((a, b) => a.label.localeCompare(b.label)),
      });
    }
    if ((data ?? []).length < 1000) return out;
  }
}

function dump(dir: string, plan: PlannedSubtopic[], twins: Twin[]) {
  mkdirSync(dir, { recursive: true });
  const byChapter = new Map<string, Twin[]>();
  for (const t of twins) byChapter.set(`${t.subject}|${t.chapter}`, [...(byChapter.get(`${t.subject}|${t.chapter}`) ?? []), t]);
  for (const c of IMAT_NOTES_CHAPTERS) {
    const key = `${c.subjectName}|${c.chapter.chapterName}`;
    const subtopics = plan
      .filter((p) => `${p.subject}|${p.chapter}` === key)
      .map((p) => {
        const note = c.notes[p.slug];
        return { slug: p.slug, name: p.name, title: note.title, covers: note.concepts.map((k) => k.name) };
      });
    const file = join(dir, `${c.subjectRoute}--${c.chapterSlug}.json`);
    writeFileSync(file, JSON.stringify({ subject: c.subjectName, chapter: c.chapter.chapterName, subtopics, twins: byChapter.get(key) ?? [] }, null, 2));
  }
  console.log(`wrote ${IMAT_NOTES_CHAPTERS.length} chapter files to ${dir}`);
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const assign = process.argv.includes("--assign");
  const dumpDir = process.argv.find((a) => a.startsWith("--dump="))?.slice("--dump=".length);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const plan = subtopicPlan(IMAT_NOTES_CHAPTERS);
  const chapters = await loadChapters(client);
  const unknown = [...new Set(plan.map((p) => `${p.subject}|${p.chapter}`))].filter((k) => !chapters.has(k));
  if (unknown.length) throw new Error(`notes chapters with no DB chapter: ${unknown.join(", ")}`);

  if (dumpDir) {
    dump(dumpDir, plan, await loadTwins(client));
    return;
  }

  const subtopics = await loadSubtopics(client, [...chapters.values()]);
  const idOf = (p: PlannedSubtopic) => subtopics.get(`${chapters.get(`${p.subject}|${p.chapter}`)}|${p.name}`);

  if (!assign) {
    const missing = plan.filter((p) => !idOf(p));
    console.log(`subtopics planned: ${plan.length}, missing in DB: ${missing.length}`);
    if (!missing.length || !apply) {
      if (missing.length) console.log("[dry run] pass --apply to create them.");
      return;
    }
    const rows = missing.map((p) => ({ chapter_id: chapters.get(`${p.subject}|${p.chapter}`)!, name: p.name, order_index: p.orderIndex }));
    const { error } = await client.from("subtopics").insert(rows);
    if (error) throw new Error(`subtopic insert failed: ${error.message}`);
    const after = await loadSubtopics(client, [...chapters.values()]);
    const still = plan.filter((p) => !after.get(`${chapters.get(`${p.subject}|${p.chapter}`)}|${p.name}`));
    if (still.length) throw new Error(`still missing after insert: ${still.map((p) => p.name).join(", ")}`);
    console.log(`created ${rows.length}; verified all ${plan.length} exist.`);
    return;
  }

  const assignments = JSON.parse(readFileSync(ASSIGNMENTS, "utf8")) as Record<string, string>;
  const twins = await loadTwins(client);
  const problems = checkAssignments(plan, twins, assignments);
  if (problems.length) {
    console.log(problems.slice(0, 30).join("\n"));
    throw new Error(`${problems.length} problem(s) in ${ASSIGNMENTS}`);
  }
  const bySubtopic = new Map<string, string[]>();
  for (const t of twins) {
    const p = plan.find((x) => x.slug === assignments[t.id])!;
    const sid = idOf(p);
    if (!sid) throw new Error(`subtopic "${p.name}" is not in the DB yet; run --apply without --assign first`);
    bySubtopic.set(sid, [...(bySubtopic.get(sid) ?? []), t.id]);
  }
  console.log(`assignments sound: ${twins.length} ${SET_NAME} across ${bySubtopic.size} subtopics.`);
  if (!apply) {
    console.log("[dry run] pass --apply to write them.");
    return;
  }
  for (const [sid, ids] of bySubtopic) {
    for (let i = 0; i < ids.length; i += 200) {
      const { error } = await client.from("questions").update({ subtopic_id: sid }).in("id", ids.slice(i, i + 200));
      if (error) throw new Error(`update failed: ${error.message}`);
    }
  }
  const { count } = await client
    .from("questions")
    .select("id, exams!inner(name)", { count: "exact", head: true })
    .eq("exams.name", EXAM_NAME)
    .eq("question_kind", KIND)
    .is("publish_blocked", null)
    .is("subtopic_id", null);
  if (count) throw new Error(`${count} ${SET_NAME} still have no subtopic`);
  console.log(`wrote ${twins.length}; verified none of the ${SET_NAME} is without a subtopic.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
