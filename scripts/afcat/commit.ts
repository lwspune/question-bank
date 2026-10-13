// Commit one AFCAT chapter — PRIVATE, question_kind='practice' — through the
// shared commitStaged pipeline (dedup on content_hash, taxonomy auto-create),
// one upload_jobs row and one source_file per FILE so a file rolls back alone.
//
//   npx tsx scripts/afcat/commit.ts <chapterId> [--files=a,b]           # dry run
//   npx tsx scripts/afcat/commit.ts <chapterId> [--files=a,b] --apply
//
// Refuses to build while any dispute is unadjudicated (see build.ts), and to
// write with unbalanced LaTeX delimiters. Prints the per-file subtopic split,
// the correct-letter balance and every flag.
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { findLatexImbalance } from "../practice/lib";
import { letterDistribution, type ShufflePlan } from "../worksheets/lib";
import { requireChapter, ORG_ID, CREATED_BY, DATA, sourceFileOf } from "./config";
import { buildChapter, readJson } from "./build";
import { filesArg } from "./read";
import { adminClient, afcatExamId } from "./db";

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const shuffles = readJson<ShufflePlan>(join(DATA, `${chapter.id}.shuffles.json`), {});
  const built = buildChapter(chapter, { shuffles, only: filesArg() });

  const all = built.flatMap((f) => f.rows);
  const dist = letterDistribution(all.map((r) => ({ id: r.questionNumber!, answer: r.options.find((o) => o.isCorrect)!.label, eligible: true })));
  console.log(`${chapter.chapterName}: ${all.length} rows, ${Object.keys(shuffles).length} rebalance shuffles`);
  console.log(`correct-letter balance: ${["A", "B", "C", "D"].map((l) => `${l} ${dist[l]} (${Math.round((100 * dist[l]) / all.length)}%)`).join("  ")}`);

  const latexErrors: string[] = [];
  for (const f of built) {
    const bySub = new Map<string, number>();
    for (const r of f.rows) bySub.set(r.subtopicName!, (bySub.get(r.subtopicName!) ?? 0) + 1);
    console.log(`\n${f.file.key} -> ${sourceFileOf(chapter, f.file)}: ${f.rows.length} rows, ${f.excluded.length} excluded`);
    for (const [k, n] of bySub) console.log(`  ${k.padEnd(40)} ${n}`);
    for (const fl of f.flags) console.log(`  FLAG ${fl.id}: ${fl.reason}`);
    for (const r of f.rows) {
      for (const [name, val] of [["stem", r.text], ["solution", r.solution], ...r.options.map((o) => [`opt ${o.label}`, o.text])] as [string, string | undefined][]) {
        const bad = val ? findLatexImbalance(val) : null;
        if (bad) latexErrors.push(`${r.questionNumber} ${name}: ${bad}`);
      }
    }
  }
  if (latexErrors.length) {
    console.log(`\nLaTeX imbalances:\n  ${latexErrors.join("\n  ")}`);
    throw new Error("refusing: fix LaTeX via overrides first");
  }
  console.log("\nLaTeX delimiters balanced.");
  if (!apply) return console.log("[dry run] pass --apply to write.");

  const client = adminClient();
  const examId = await afcatExamId(client);
  for (const f of built) {
    const sourceFile = sourceFileOf(chapter, f.file);
    const { data: existing } = await client.from("upload_jobs").select("id").eq("org_id", ORG_ID).eq("filename", sourceFile).limit(1).maybeSingle();
    let jobId = existing?.id as string | undefined;
    if (!jobId) {
      const { data: job, error } = await client
        .from("upload_jobs")
        .insert({ org_id: ORG_ID, filename: sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: f.rows.length })
        .select("id")
        .single();
      if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
      jobId = job.id;
    }
    const res = await commitStaged(client, {
      orgId: ORG_ID,
      examId,
      filename: sourceFile,
      createdBy: CREATED_BY,
      rows: f.rows,
      uploadJobId: jobId!,
      pyqYear: null,
      pyqNote: f.file.note,
      // Written AT INSERT, so a row is never public or counted as a past question.
      visibility: "PRIVATE",
      questionKind: "practice",
    });
    console.log(`\n${sourceFile}: inserted=${res.inserted} skipped=${res.skipped} failed=${res.failed}`);
    for (const e of res.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);

    const { error: cErr, count } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", examId)
      .eq("source_file", sourceFile);
    if (cErr) throw new Error(`count failed: ${cErr.message}`);
    await client
      .from("upload_jobs")
      .update({ status: "COMPLETED", total_rows: count ?? 0, inserted: res.inserted, skipped: res.skipped, finished_at: new Date().toISOString() })
      .eq("id", jobId!);
    console.log(`  ${count} rows under ${sourceFile}, linked to job ${jobId}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
