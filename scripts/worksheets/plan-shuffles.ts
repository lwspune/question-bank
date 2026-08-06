// Generate a deterministic correct-answer rebalance plan for a chapter and
// write it to data/<chapterId>.shuffles.json (committed — the source of record
// commit.ts applies on every ingest).
//
//   npx tsx scripts/worksheets/plan-shuffles.ts <chapterId>          # preview
//   npx tsx scripts/worksheets/plan-shuffles.ts <chapterId> --write
//
// Only rows that pass isShuffleEligible (no positional options, no
// letter-referencing solution) are moved; each move is a single transposition.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA } from "./config";
import { readChapterQuestions } from "./read";
import {
  buildWorksheetRows,
  isShuffleEligible,
  letterDistribution,
  planShuffles,
  type ShuffleRow,
  type WorksheetOverride,
} from "./lib";

const chapter = requireChapter(process.argv[2]);
const write = process.argv.includes("--write");

const overridesPath = join(DATA, `${chapter.id}.overrides.json`);
const overrides: Record<string, WorksheetOverride> = existsSync(overridesPath)
  ? JSON.parse(readFileSync(overridesPath, "utf8"))
  : {};

// Build the POST-override state (no shuffles) — that's what the plan rebalances.
const files = readChapterQuestions(chapter);
const rows: ShuffleRow[] = [];
for (const f of files) {
  const res = buildWorksheetRows(
    { chapterName: chapter.chapterName, subtopicName: f.subtopicName, fileIndex: f.fileIndex },
    f.questions,
    overrides
  );
  for (const r of res.rows) {
    const answer = r.options.find((o) => o.isCorrect)!.label;
    rows.push({
      id: r.questionNumber!,
      answer,
      eligible: isShuffleEligible(r.options.map((o) => o.text), r.solution ?? ""),
    });
  }
}

const before = letterDistribution(rows);
const plan = planShuffles(rows);
const after = { ...letterDistribution(rows.filter((r) => !plan[r.id])) };
for (const [id, to] of Object.entries(plan)) after[to] = (after[to] ?? 0) + 1;

const pct = (d: Record<string, number>) =>
  ["A", "B", "C", "D"].map((l) => `${l} ${d[l]} (${Math.round((100 * d[l]) / rows.length)}%)`).join("  ");
console.log(`${chapter.id}: ${rows.length} rows, ${rows.filter((r) => r.eligible).length} eligible`);
console.log(`before: ${pct(before)}`);
console.log(`after:  ${pct(after)}`);
console.log(`moves:  ${Object.keys(plan).length}`);
for (const [id, to] of Object.entries(plan).sort(([a], [b]) => a.localeCompare(b))) {
  const row = rows.find((r) => r.id === id)!;
  console.log(`  ${id}: ${row.answer} -> ${to}`);
}

if (write) {
  const out = join(DATA, `${chapter.id}.shuffles.json`);
  writeFileSync(out, JSON.stringify(plan, null, 2) + "\n");
  console.log(`wrote ${out}`);
} else {
  console.log("[preview] pass --write to persist the plan.");
}
