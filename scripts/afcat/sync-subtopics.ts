// Push subtopic changes to rows already committed (a /notes re-cut, a merge in
// config.ts, a per-row `subtopic` override). commit.ts cannot: subtopic_id is not
// part of content_hash, so a re-commit skips the row as a duplicate. The twin of
// sync-solutions.ts.
//
//   npx tsx scripts/afcat/sync-subtopics.ts <chapterId>           # dry run
//   npx tsx scripts/afcat/sync-subtopics.ts <chapterId> --apply
//
// A new name first reuses the biggest retired subtopic feeding it, renamed, so its id
// and every /browse link carrying it survive (pickRenames); otherwise it is created.
// A retired subtopic is deleted only once no question of any visibility points at it.
import { join } from "node:path";
import { requireChapter, DATA, sourceFileOf } from "./config";
import { buildChapter, readJson } from "./build";
import type { ShufflePlan } from "../worksheets/lib";
import { adminClient, afcatExamId } from "./db";
import { pickRenames, planSubtopicMoves } from "./lib";

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const shuffles = readJson<ShufflePlan>(join(DATA, `${chapter.id}.shuffles.json`), {});
  const built = buildChapter(chapter, { shuffles });
  const client = adminClient();
  const examId = await afcatExamId(client);

  const builtRows: { questionNumber: string; subtopic: string }[] = [];
  const live: { id: string; questionNumber: string; subtopic: string | null }[] = [];
  const chapterIds = new Set<string>();
  for (const f of built) {
    const { data, error } = await client
      .from("questions")
      .select("id, question_number, chapter_id, subtopics(name)")
      .eq("exam_id", examId)
      .eq("source_file", sourceFileOf(chapter, f.file));
    if (error) throw new Error(error.message);
    for (const q of (data ?? []) as any[]) {
      live.push({ id: q.id, questionNumber: q.question_number, subtopic: q.subtopics?.name ?? null });
      chapterIds.add(q.chapter_id);
    }
    for (const r of f.rows) builtRows.push({ questionNumber: r.questionNumber!, subtopic: r.subtopicName! });
  }
  if (chapterIds.size !== 1) throw new Error(`expected one chapter row, found ${chapterIds.size}`);
  const chapterId = [...chapterIds][0];

  const { moves, missing } = planSubtopicMoves(builtRows, live);
  if (missing.length) throw new Error(`built rows not committed: ${missing.join(", ")}`);
  const { data: subs, error: se } = await client.from("subtopics").select("id, name").eq("chapter_id", chapterId);
  if (se) throw new Error(se.message);
  const idByName = new Map((subs ?? []).map((s) => [s.name as string, s.id as string]));
  const renames = pickRenames(moves, chapter.subtopics, new Set(idByName.keys()));
  const creates = [...new Set(moves.map((m) => m.to))].filter((n) => !idByName.has(n) && !Object.values(renames).includes(n));
  const retired = [...idByName.keys()].filter((n) => !chapter.subtopics.includes(n));

  const tally = new Map<string, number>();
  for (const m of moves) tally.set(`${m.from} -> ${m.to}`, (tally.get(`${m.from} -> ${m.to}`) ?? 0) + 1);
  for (const [k, n] of [...tally].sort()) console.log(`${String(n).padStart(4)}  ${k}`);
  for (const [from, to] of Object.entries(renames)) console.log(`rename: "${from}" -> "${to}"`);
  for (const n of creates) console.log(`create: "${n}"`);
  for (const n of retired) console.log(`retire: "${n}"`);
  console.log(`${moves.length} row(s) move`);
  if (!apply) return console.log("[dry run] pass --apply to write.");

  for (const [from, to] of Object.entries(renames)) {
    const { error } = await client.from("subtopics").update({ name: to }).eq("id", idByName.get(from)!);
    if (error) throw new Error(`rename ${from}: ${error.message}`);
    idByName.set(to, idByName.get(from)!);
    idByName.delete(from);
  }
  for (const n of creates) {
    const { data, error } = await client.from("subtopics").insert({ chapter_id: chapterId, name: n }).select("id").single();
    if (error) throw new Error(`create ${n}: ${error.message}`);
    idByName.set(n, data.id);
  }
  // Group the moves by target and update in chunks: .in() puts the ids in the URL.
  const byTarget = new Map<string, string[]>();
  for (const m of moves) byTarget.set(m.to, [...(byTarget.get(m.to) ?? []), m.id]);
  for (const [to, ids] of byTarget) {
    for (let i = 0; i < ids.length; i += 200) {
      const { error } = await client.from("questions").update({ subtopic_id: idByName.get(to)! }).in("id", ids.slice(i, i + 200));
      if (error) throw new Error(`move to ${to}: ${error.message}`);
    }
  }
  for (const n of retired) {
    const id = idByName.get(n);
    if (!id) continue; // renamed above
    const { count, error } = await client.from("questions").select("id", { count: "exact", head: true }).eq("subtopic_id", id);
    if (error) throw new Error(error.message);
    if (count) {
      console.log(`kept "${n}": ${count} question(s) still point at it`);
      continue;
    }
    const { error: de } = await client.from("subtopics").delete().eq("id", id);
    if (de) throw new Error(`delete ${n}: ${de.message}`);
    console.log(`deleted "${n}"`);
  }
  const after = planSubtopicMoves(builtRows, await reread(client, examId, built.map((f) => sourceFileOf(chapter, f.file))));
  console.log(`moved ${moves.length}; live rows now differing from the build: ${after.moves.length}`);
  if (after.moves.length) process.exit(1);
}

async function reread(client: ReturnType<typeof adminClient>, examId: string, files: string[]) {
  const out: { id: string; questionNumber: string; subtopic: string | null }[] = [];
  for (const sf of files) {
    const { data, error } = await client.from("questions").select("id, question_number, subtopics(name)").eq("exam_id", examId).eq("source_file", sf);
    if (error) throw new Error(error.message);
    for (const q of (data ?? []) as any[]) out.push({ id: q.id, questionNumber: q.question_number, subtopic: q.subtopics?.name ?? null });
  }
  return out;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
