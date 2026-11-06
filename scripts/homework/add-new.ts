/**
 * Fold a reviewed new paper into a homework plan file (2026-11-06).
 *
 *   npm run homework:add-new -- <plan slug> [--dir=generated-papers/homework/<slug>-new] [--write]
 *
 * Reads what `npm run homework:new` wrote (new-slots.json) and the reviewer's
 * out/<chapter>.json files (scripts/homework/REVIEW_BRIEF_NEW.md), and merges
 * them into scripts/homework/data/<slug>.json with lib/homework/newQuestions:
 * every new question is added (one nobody grouped is asked once), a question in
 * a chapter the plan leaves out is excluded, and each decision joins or makes a
 * group. REFUSES, writing nothing, on any decision that would break the plan.
 * Without --write it only reports. Then: npm run homework:build -- <file>
 * (dry run, then --apply). A rebuild re-ranks the whole plan (owner, 2026-11-06).
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { mergeNewQuestions, type NewDecisions, type NewSlot } from "@/lib/homework/newQuestions";
import { PLAN_DATA_DIR, type PlanFile } from "../lib/homeworkCoverage";

function main() {
  const slug = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!slug) throw new Error("usage: npm run homework:add-new -- <plan slug> [--dir=<dir>] [--write]");
  const dir = process.argv.find((a) => a.startsWith("--dir="))?.slice(6) ?? join("generated-papers", "homework", `${slug}-new`);
  const write = process.argv.includes("--write");
  const file = join(PLAN_DATA_DIR, `${slug}.json`);
  const plan = JSON.parse(readFileSync(file, "utf8")) as PlanFile;
  const slots = JSON.parse(readFileSync(join(dir, "new-slots.json"), "utf8")) as NewSlot[];
  const outDir = join(dir, "out");
  const decisions: NewDecisions = existsSync(outDir)
    ? readdirSync(outDir)
        .filter((f) => f.endsWith(".json"))
        .sort()
        .map((f) => JSON.parse(readFileSync(join(outDir, f), "utf8")))
    : [];

  let merged: PlanFile;
  try {
    merged = mergeNewQuestions(plan, slots, decisions);
  } catch (e) {
    console.error(`REFUSED: ${(e as Error).message}`);
    process.exit(1);
  }

  const added = merged.questions.length - plan.questions.length;
  const excluded = (merged.excludedQuestions?.length ?? 0) - (plan.excludedQuestions?.length ?? 0);
  const grown = merged.groups.slice(0, plan.groups.length).filter((g, i) => g.questionIds.length !== plan.groups[i].questionIds.length).length;
  const made = merged.groups.length - plan.groups.length;
  console.log(`${slug}: +${added} questions (${excluded} excluded as off the plan), ${grown} groups joined, ${made} new groups`);
  const newSittings = merged.sittings.filter((s) => !plan.sittings.includes(s));
  if (newSittings.length) console.log(`  new sittings: ${newSittings.join(", ")}`);
  const year = (s: string) => /\d{4}/.exec(s)?.[0];
  const lastYear = year(merged.sittings.at(-1) ?? "");
  if (lastYear && !merged.summary?.includes(lastYear)) {
    console.log(`  NOTE: the plan summary does not mention ${lastYear}; update "summary" in ${file} by hand.`);
  }
  if (!write) {
    console.log("dry run: nothing written. Add --write to update the plan file.");
    return;
  }
  writeFileSync(file, JSON.stringify(merged, null, 1) + "\n");
  console.log(`wrote ${file}. Next: npm run homework:build -- ${file.replace(/\\/g, "/")} (dry run, then --apply)`);
}

main();
