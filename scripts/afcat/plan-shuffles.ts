// Plan the correct-answer rebalance for a chapter (the Worksheets mechanism:
// single transpositions on eligible rows, committed so every ingest applies
// the same plan). Run AFTER adjudication and BEFORE committing a new file.
//
// A file whose rows are already in the database is FROZEN: content_hash
// includes the answer letter, so moving a committed row would make the next
// commit insert it again as a duplicate. Frozen rows keep their entries and
// count towards the balance; only new files are rebalanced.
//
//   npx tsx scripts/afcat/plan-shuffles.ts <chapterId>          # preview
//   npx tsx scripts/afcat/plan-shuffles.ts <chapterId> --write  # data/<chapter>.shuffles.json
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { isShuffleEligible, letterDistribution, type ShufflePlan } from "../worksheets/lib";
import { requireChapter, DATA, sourceFileOf, fileIndexOf } from "./config";
import { buildChapter, readJson } from "./build";
import { planChapterShuffles } from "./lib";
import { adminClient, afcatExamId } from "./db";

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const planPath = join(DATA, `${chapter.id}.shuffles.json`);
  const existing = readJson<ShufflePlan>(planPath, {});

  const client = adminClient();
  const examId = await afcatExamId(client);
  const frozenFiles = new Set<number>();
  for (const f of chapter.files) {
    const { count, error } = await client
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", examId)
      .eq("source_file", sourceFileOf(chapter, f));
    if (error) throw new Error(`committed-file check failed: ${error.message}`);
    if ((count ?? 0) > 0) frozenFiles.add(fileIndexOf(chapter, f));
  }
  const isFrozen = (id: string) => frozenFiles.has(Number(id.split("-")[0]));
  const frozenPlan: ShufflePlan = Object.fromEntries(Object.entries(existing).filter(([id]) => isFrozen(id)));

  const rows = buildChapter(chapter, { shuffles: frozenPlan }).flatMap((f) =>
    f.rows.map((r) => ({
      id: r.questionNumber!,
      answer: r.options.find((o) => o.isCorrect)!.label,
      eligible: isShuffleEligible(r.options.map((o) => o.text), r.solution ?? ""),
      frozen: isFrozen(r.questionNumber!),
    }))
  );

  const plan = planChapterShuffles(rows, existing);
  const after = letterDistribution(rows.map((r) => (!r.frozen && plan[r.id] ? { ...r, answer: plan[r.id] } : r)));
  const pct = (d: Record<string, number>) =>
    ["A", "B", "C", "D"].map((l) => `${l} ${d[l]} (${Math.round((100 * d[l]) / rows.length)}%)`).join("  ");
  console.log(`${chapter.id}: ${rows.length} rows (${rows.filter((r) => r.frozen).length} frozen: already committed), ${rows.filter((r) => r.eligible && !r.frozen).length} movable`);
  console.log(`before: ${pct(letterDistribution(rows))}`);
  console.log(`after:  ${pct(after)}`);
  console.log(`moves:  ${Object.keys(plan).filter((id) => !isFrozen(id)).length} new (+${Object.keys(frozenPlan).length} kept)`);

  if (process.argv.includes("--write")) {
    writeFileSync(planPath, JSON.stringify(plan, null, 2) + "\n");
    console.log(`wrote ${planPath}`);
  } else console.log("[preview] pass --write to persist the plan.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
