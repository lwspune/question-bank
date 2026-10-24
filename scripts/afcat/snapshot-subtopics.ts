// Save one AFCAT chapter's subtopic rows and every question's subtopic_id to a JSON
// file, before sync-subtopics.ts moves them, so a re-cut can be undone exactly.
//
//   npx tsx scripts/afcat/snapshot-subtopics.ts "<DB chapter name>" <out.json>
//
// Read-only. All visibilities, because a PRIVATE row can sit in a subtopic a re-cut drops.
import { writeFileSync } from "node:fs";
import { adminClient, afcatExamId } from "./db";

async function main() {
  const [chapterName, out] = process.argv.slice(2);
  if (!chapterName || !out) throw new Error('usage: snapshot-subtopics.ts "<chapter>" <out.json>');
  const client = adminClient();
  const examId = await afcatExamId(client);
  const { data: rows, error } = await client
    .from("questions")
    .select("id, subtopic_id, chapter_id, chapters!inner(name)")
    .eq("exam_id", examId)
    .eq("chapters.name", chapterName)
    .limit(5000);
  if (error) throw new Error(error.message);
  // PostgREST caps a select at 1000 rows without an error: refuse a snapshot that may be short.
  if ((rows ?? []).length >= 1000) throw new Error("1000+ rows: page this query before trusting the snapshot");
  const chapterIds = [...new Set((rows ?? []).map((r) => r.chapter_id as string))];
  if (chapterIds.length !== 1) throw new Error(`expected one chapter "${chapterName}", found ${chapterIds.length}`);
  const { data: subtopics, error: se } = await client.from("subtopics").select("id, name, order_index").eq("chapter_id", chapterIds[0]);
  if (se) throw new Error(se.message);
  const questions = (rows ?? []).map((r) => ({ id: r.id, subtopic_id: r.subtopic_id }));
  writeFileSync(out, JSON.stringify({ chapter: chapterName, chapterId: chapterIds[0], subtopics, questions }));
  console.log(`snapshot: ${subtopics?.length ?? 0} subtopics, ${questions.length} questions -> ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
