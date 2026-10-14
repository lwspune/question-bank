// Push solution-only fixes to rows already committed. commit.ts cannot: the
// solution is not part of content_hash, so a re-commit skips the row as a
// duplicate. This compares each built row's solution with the live row (same
// exam, source_file and question_number) and updates the ones that differ.
//
//   npx tsx scripts/afcat/sync-solutions.ts <chapterId> [--files=a,b]           # dry run
//   npx tsx scripts/afcat/sync-solutions.ts <chapterId> [--files=a,b] --apply
//
// Only the solution column is touched; a row whose content_hash differs from the
// build is refused (that is a content change, which must be corrected in place
// with its hash, not here).
import { join } from "node:path";
import { requireChapter, DATA, sourceFileOf } from "./config";
import { buildChapter, readJson } from "./build";
import { filesArg } from "./read";
import type { ShufflePlan } from "../worksheets/lib";
import { adminClient, afcatExamId } from "./db";

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const shuffles = readJson<ShufflePlan>(join(DATA, `${chapter.id}.shuffles.json`), {});
  const built = buildChapter(chapter, { shuffles, only: filesArg() });
  const client = adminClient();
  const examId = await afcatExamId(client);
  const changes: { id: string; qn: string; from: string; to: string }[] = [];
  for (const f of built) {
    const { data, error } = await client
      .from("questions")
      .select("id, question_number, content_hash, solution")
      .eq("exam_id", examId)
      .eq("source_file", sourceFileOf(chapter, f.file));
    if (error) throw new Error(error.message);
    const live = new Map((data ?? []).map((q) => [q.question_number as string, q]));
    for (const r of f.rows) {
      const q = live.get(r.questionNumber!);
      if (!q) continue;
      if (q.content_hash !== r.contentHash) throw new Error(`${r.questionNumber}: content differs from the build; correct it in place, not here`);
      const to = r.solution ?? null;
      if ((q.solution ?? null) !== to) changes.push({ id: q.id, qn: r.questionNumber!, from: String(q.solution ?? "").slice(0, 80), to: String(to ?? "").slice(0, 80) });
    }
  }
  for (const c of changes) console.log(`${c.qn}\n   live : ${c.from}\n   build: ${c.to}`);
  console.log(`${changes.length} solution(s) differ`);
  if (!apply || !changes.length) return console.log(apply ? "nothing to do" : "[dry run] pass --apply to write.");
  const byId = new Map(built.flatMap((f) => f.rows).map((r) => [r.questionNumber, r.solution ?? null]));
  for (const c of changes) {
    const { error } = await client.from("questions").update({ solution: byId.get(c.qn) }).eq("id", c.id);
    if (error) throw new Error(`${c.qn}: ${error.message}`);
  }
  console.log(`updated ${changes.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
