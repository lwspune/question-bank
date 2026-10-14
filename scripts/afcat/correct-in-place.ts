// Correct committed rows in place after an override changes their content
// (stem, option text or key), keeping each row's id so nothing that points at
// it breaks. commit.ts refuses such rows: their content_hash changed, so a
// re-commit would insert a duplicate.
//
//   npx tsx scripts/afcat/correct-in-place.ts <chapterId> --ids=05-26,07-6           # dry run
//   npx tsx scripts/afcat/correct-in-place.ts <chapterId> --ids=05-26,07-6 --apply
//
// Only the listed ids are touched (an explicit list, so a stray override cannot
// rewrite rows wholesale). The new hash is the build's, guarded against another
// row already holding it. Ends by proving every live row of the touched files
// matches the build, so a later commit.ts is a no-op.
import { join } from "node:path";
import { requireChapter, DATA, sourceFileOf } from "./config";
import { buildChapter, readJson } from "./build";
import type { ShufflePlan } from "../worksheets/lib";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { adminClient, afcatExamId } from "./db";

type LiveOption = { id: string; label: string; text: string; is_correct: boolean };

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const idsArg = process.argv.find((a) => a.startsWith("--ids="));
  if (!idsArg) throw new Error("pass --ids=<question ids>");
  const ids = idsArg.slice("--ids=".length).split(",").filter(Boolean);
  const shuffles = readJson<ShufflePlan>(join(DATA, `${chapter.id}.shuffles.json`), {});
  const built = buildChapter(chapter, { shuffles });
  const rowById = new Map<string, { row: ParsedRowPayload; sourceFile: string }>();
  for (const f of built) for (const r of f.rows) rowById.set(r.questionNumber!, { row: r, sourceFile: sourceFileOf(chapter, f.file) });

  const client = adminClient();
  const examId = await afcatExamId(client);
  const touched = new Set<string>();
  let changed = 0;
  for (const id of ids) {
    const want = rowById.get(id);
    if (!want) throw new Error(`${id}: not in the build (excluded, or no such row)`);
    const { data, error } = await client
      .from("questions")
      .select("id, text, content_hash, options(id, label, text, is_correct)")
      .eq("exam_id", examId)
      .eq("source_file", want.sourceFile)
      .eq("question_number", id);
    if (error) throw new Error(`${id}: ${error.message}`);
    if (!data?.length) throw new Error(`${id}: not committed under ${want.sourceFile}`);
    if (data.length > 1) throw new Error(`${id}: ${data.length} live rows`);
    const live = data[0];
    touched.add(want.sourceFile);
    const wantByLabel = new Map(want.row.options.map((o) => [o.label, o]));
    const optionChanges = (live.options as LiveOption[])
      .map((o) => ({ o, w: wantByLabel.get(o.label as "A" | "B" | "C" | "D")! }))
      .filter(({ o, w }) => o.text !== w.text || o.is_correct !== w.isCorrect);
    const stemChanged = live.text !== want.row.text;
    if (!optionChanges.length && !stemChanged && live.content_hash === want.row.contentHash) {
      console.log(`${id}: already matches the build`);
      continue;
    }
    console.log(`${id}: ${stemChanged ? "stem, " : ""}${optionChanges.length} option(s)${optionChanges.map(({ o, w }) => `\n   ${o.label}: ${o.text}${o.is_correct ? " *" : ""}  ->  ${w.text}${w.isCorrect ? " *" : ""}`).join("")}`);
    changed++;
    if (!apply) continue;
    const { data: clash } = await client.from("questions").select("id").eq("exam_id", examId).eq("content_hash", want.row.contentHash).neq("id", live.id).maybeSingle();
    if (clash) throw new Error(`${id}: the new content_hash already belongs to question ${clash.id}`);
    for (const { o, w } of optionChanges) {
      const { error: e } = await client.from("options").update({ text: w.text, is_correct: w.isCorrect }).eq("id", o.id);
      if (e) throw new Error(`${id}: option ${o.label}: ${e.message}`);
    }
    const { error: qe } = await client.from("questions").update({ text: want.row.text, content_hash: want.row.contentHash }).eq("id", live.id);
    if (qe) throw new Error(`${id}: ${qe.message}`);
  }
  console.log(apply ? `corrected ${changed} row(s)` : `[dry run] ${changed} row(s) would change; pass --apply`);
  if (!apply) return;

  let mismatches = 0;
  for (const sourceFile of touched) {
    const { data } = await client.from("questions").select("question_number, content_hash").eq("exam_id", examId).eq("source_file", sourceFile);
    for (const r of data ?? []) {
      const w = rowById.get(r.question_number as string);
      if (!w || w.row.contentHash !== r.content_hash) {
        console.error(`HASH MISMATCH ${r.question_number} (${sourceFile})`);
        mismatches++;
      }
    }
  }
  if (mismatches) {
    console.error(`${mismatches} live row(s) out of step with the build`);
    process.exit(1);
  }
  console.log(`every live row of ${[...touched].join(", ")} matches the build`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
