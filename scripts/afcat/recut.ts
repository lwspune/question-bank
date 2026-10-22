// Apply a /notes re-cut plan to one AFCAT chapter's source of record: the closed
// subtopic list in config.ts, the pass-1 values in data/<chapter>.derived.json and the
// per-row adjudications in data/<chapter>.overrides.json. Then push it to the bank with
// sync-subtopics.ts (commit.ts cannot: subtopic_id is not in content_hash).
//
//   npx tsx scripts/afcat/recut.ts <chapterId> <plan.json>           # dry run
//   npx tsx scripts/afcat/recut.ts <chapterId> <plan.json> --apply
//
// plan.json: { subtopics: [...new list, teaching order], renames: {old: new},
//              moves: {"<question id>": {to, reason}} }  (RecutPlan in lib.ts)
// Refuses, writing nothing, if any row would sit outside the new list, a move names an
// unknown row, or a listed subtopic would be empty.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA } from "./config";
import { applyRecutPlan, rewriteChapterSubtopics, type RecutPlan } from "./lib";

const CONFIG = join("scripts", "afcat", "config.ts");
const json = (v: unknown) => JSON.stringify(v, null, 2) + "\n";

function main() {
  const chapter = requireChapter(process.argv[2]);
  const planPath = process.argv[3];
  if (!planPath) throw new Error("usage: recut.ts <chapterId> <plan.json> [--apply]");
  const apply = process.argv.includes("--apply");
  const plan = JSON.parse(readFileSync(planPath, "utf8")) as RecutPlan;
  const derivedPath = join(DATA, `${chapter.id}.derived.json`);
  const overridesPath = join(DATA, `${chapter.id}.overrides.json`);
  const derived = JSON.parse(readFileSync(derivedPath, "utf8")) as { id: string; subtopic: string }[];
  const overrides = JSON.parse(readFileSync(overridesPath, "utf8")) as Record<string, { reason?: string; subtopic?: string }>;

  const out = applyRecutPlan(plan, { derived, overrides });
  const count = new Map<string, number>();
  for (const r of out.derived) {
    const s = out.overrides[r.id]?.subtopic ?? r.subtopic;
    count.set(s, (count.get(s) ?? 0) + 1);
  }
  for (const s of plan.subtopics) console.log(`${String(count.get(s) ?? 0).padStart(4)}  ${s}`);
  console.log(`${Object.keys(plan.renames).length} rename(s), ${Object.keys(plan.moves).length} move(s)`);
  if (out.problems.length) {
    for (const p of out.problems) console.log(`PROBLEM ${p}`);
    process.exit(1);
  }
  if (!apply) return console.log("[dry run] pass --apply to write config.ts, derived.json and overrides.json.");

  const config = rewriteChapterSubtopics(readFileSync(CONFIG, "utf8"), chapter.id, plan.subtopics, plan.renames);
  writeFileSync(CONFIG, config);
  writeFileSync(derivedPath, json(out.derived));
  writeFileSync(overridesPath, json(out.overrides));
  console.log(`wrote config.ts, ${chapter.id}.derived.json, ${chapter.id}.overrides.json. Next: sync-subtopics.ts ${chapter.id}`);
}

main();
