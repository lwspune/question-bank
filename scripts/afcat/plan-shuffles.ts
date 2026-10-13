// Plan the correct-answer rebalance for a chapter (the Worksheets mechanism:
// single transpositions on eligible rows, committed so every ingest applies
// the same plan). Run AFTER adjudication and BEFORE the first commit.
//
//   npx tsx scripts/afcat/plan-shuffles.ts <chapterId>          # preview
//   npx tsx scripts/afcat/plan-shuffles.ts <chapterId> --write  # data/<chapter>.shuffles.json
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { isShuffleEligible, letterDistribution, planShuffles, type ShuffleRow } from "../worksheets/lib";
import { requireChapter, DATA } from "./config";
import { buildChapter } from "./build";

const chapter = requireChapter(process.argv[2]);
const rows: ShuffleRow[] = buildChapter(chapter).flatMap((f) =>
  f.rows.map((r) => ({
    id: r.questionNumber!,
    answer: r.options.find((o) => o.isCorrect)!.label,
    eligible: isShuffleEligible(r.options.map((o) => o.text), r.solution ?? ""),
  }))
);

const plan = planShuffles(rows);
const after = letterDistribution(rows.filter((r) => !plan[r.id]));
for (const to of Object.values(plan)) after[to]++;
const pct = (d: Record<string, number>) =>
  ["A", "B", "C", "D"].map((l) => `${l} ${d[l]} (${Math.round((100 * d[l]) / rows.length)}%)`).join("  ");
console.log(`${chapter.id}: ${rows.length} rows, ${rows.filter((r) => r.eligible).length} eligible`);
console.log(`before: ${pct(letterDistribution(rows))}`);
console.log(`after:  ${pct(after)}`);
console.log(`moves:  ${Object.keys(plan).length}`);

if (process.argv.includes("--write")) {
  const out = join(DATA, `${chapter.id}.shuffles.json`);
  writeFileSync(out, JSON.stringify(plan, null, 2) + "\n");
  console.log(`wrote ${out}`);
} else console.log("[preview] pass --write to persist the plan.");
