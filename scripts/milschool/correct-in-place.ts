/**
 * Correct committed rows in place after their transcription is fixed (stem or
 * option text), keeping each row's id so nothing that points at it breaks.
 * A re-commit cannot do this: the content_hash changed, so it would insert a
 * duplicate.
 *
 *   npx tsx scripts/milschool/correct-in-place.ts aissee-9-2025 --q=23,103          # dry run
 *   npx tsx scripts/milschool/correct-in-place.ts aissee-9-2025 --q=23,103 --apply
 *
 * Fix the BAND file first (the source of record), re-run merge.ts --apply, then
 * this. Only the listed question numbers are touched. The new text and hash come
 * from rows.ts, the same builder commit.ts uses, and the run ends by proving
 * every live row of the paper matches that build, so a later commit is a no-op.
 * Patterned on scripts/afcat/correct-in-place.ts.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { examIdOf, requirePaper } from "./config";
import { buildPaperRows } from "./rows";

type LiveOption = { id: string; label: string; text: string; is_correct: boolean };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const qArg = args.find((a) => a.startsWith("--q="));
  if (!qArg) throw new Error("pass --q=<question numbers>");
  const numbers = qArg.slice(4).split(",").filter(Boolean);

  const { parsed, errs } = buildPaperRows(paper);
  if (errs.length) throw new Error(`the build has errors; fix them first:\n  ${errs.slice(0, 10).join("\n  ")}`);
  const byNumber = new Map(parsed.map((r) => [r.questionNumber!, r]));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const examId = examIdOf(paper);

  let changed = 0;
  for (const n of numbers) {
    const want = byNumber.get(n);
    if (!want) throw new Error(`Q${n}: not in the build`);
    const { data, error } = await client
      .from("questions")
      .select("id, text, content_hash, options(id, label, text, is_correct)")
      .eq("exam_id", examId)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", n);
    if (error) throw new Error(`Q${n}: ${error.message}`);
    if (data?.length !== 1) throw new Error(`Q${n}: ${data?.length ?? 0} live rows (want 1)`);
    const live = data[0];
    const wantByLabel = new Map(want.options.map((o) => [o.label, o]));
    const optionChanges = (live.options as LiveOption[])
      .map((o) => ({ o, w: wantByLabel.get(o.label as "A" | "B" | "C" | "D")! }))
      .filter(({ o, w }) => o.text !== w.text || o.is_correct !== w.isCorrect);
    const stemChanged = live.text !== want.text;
    if (!optionChanges.length && !stemChanged && live.content_hash === want.contentHash) {
      console.log(`Q${n}: already matches the build`);
      continue;
    }
    console.log(
      `Q${n}: ${stemChanged ? `stem\n   ${live.text.slice(0, 100)}\n-> ${want.text.slice(0, 100)}` : ""}` +
        optionChanges.map(({ o, w }) => `\n   ${o.label}: ${o.text}  ->  ${w.text}`).join("")
    );
    changed++;
    if (!apply) continue;
    const { data: clash } = await client
      .from("questions")
      .select("id")
      .eq("exam_id", examId)
      .eq("content_hash", want.contentHash)
      .neq("id", live.id)
      .maybeSingle();
    if (clash) throw new Error(`Q${n}: the new content_hash already belongs to question ${clash.id}`);
    for (const { o, w } of optionChanges) {
      const { error: e } = await client.from("options").update({ text: w.text, is_correct: w.isCorrect }).eq("id", o.id);
      if (e) throw new Error(`Q${n}: option ${o.label}: ${e.message}`);
    }
    const { error: qe } = await client
      .from("questions")
      .update({ text: want.text, content_hash: want.contentHash })
      .eq("id", live.id);
    if (qe) throw new Error(`Q${n}: ${qe.message}`);
  }
  console.log(apply ? `corrected ${changed} row(s)` : `[dry run] ${changed} row(s) would change; pass --apply`);
  if (!apply) return;

  // Every live row of this paper must now match the build.
  const { data: all } = await client
    .from("questions")
    .select("question_number, content_hash")
    .eq("exam_id", examId)
    .eq("source_file", paper.sourceFile);
  const mismatches = (all ?? []).filter((r) => byNumber.get(r.question_number as string)?.contentHash !== r.content_hash);
  if (mismatches.length) {
    console.error(`HASH MISMATCH on Q${mismatches.map((r) => r.question_number).join(", Q")}`);
    process.exit(1);
  }
  console.log(`all ${all?.length} live rows of ${paper.sourceFile} match the build`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
