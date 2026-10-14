// Flip a committed AFCAT chapter (or some of its files) PUBLIC after review.
//
//   npx tsx scripts/afcat/flip-public.ts <chapterId> [--files=a,b]                 # dry run
//   npx tsx scripts/afcat/flip-public.ts <chapterId> [--files=a,b] --apply [--except=01-4,01-9]
//
// --except keeps the named question ids (questions.question_number) PRIVATE.
import { requireChapter, sourceFileOf } from "./config";
import { filesArg } from "./read";
import { adminClient, afcatExamId } from "./db";

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const only = filesArg();
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg ? exceptArg.slice(9).split(",").map((s) => s.trim()) : [];
  const client = adminClient();
  const examId = await afcatExamId(client);

  for (const file of chapter.files.filter((f) => !only || only.includes(f.key))) {
    const sourceFile = sourceFileOf(chapter, file);
    const { count } = await client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("source_file", sourceFile);
    console.log(`${sourceFile}: ${count} rows; keeping PRIVATE [${except.join(", ") || "none"}]`);
    if (!apply || !count) continue;
    let q = client.from("questions").update({ visibility: "PUBLIC" }, { count: "exact" }).eq("exam_id", examId).eq("source_file", sourceFile);
    if (except.length) q = q.not("question_number", "in", `(${except.map((e) => `"${e}"`).join(",")})`);
    const { error, count: flipped } = await q;
    if (error) throw new Error(error.message);
    console.log(`  flipped ${flipped} PUBLIC`);
  }
  if (!apply) console.log("[dry run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
