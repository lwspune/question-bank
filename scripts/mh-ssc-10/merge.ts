/**
 * Merge the per-block transcription fragments (data/<id>.<block>.json, written
 * by the vision agents) into the single data/<id>.questions.json that commit.ts
 * reads. Blocks don't overlap; refs are unique, so this is an ordered
 * concatenation with a duplicate-ref guard.
 *
 *   npx tsx scripts/mh-ssc-10/merge.ts <paperId> [block1 block2 ...]
 *
 * With explicit block names, merges only those (in the given order); otherwise
 * globs every data/<id>.*.json that isn't the merged output or a solutions file.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, questionsJsonPath, requirePaper } from "./config";
import { answerStyleIssues, type PaperQuestion } from "./lib";

function main() {
  const id = process.argv[2];
  const paper = requirePaper(id);
  const explicit = process.argv.slice(3);

  const outName = `${id}.questions.json`;
  let files: string[];
  if (explicit.length) {
    files = explicit.map((s) => `${id}.${s}.json`);
  } else {
    files = readdirSync(DATA)
      .filter(
        (f) =>
          f.startsWith(`${id}.`) &&
          f.endsWith(".json") &&
          f !== outName &&
          !f.endsWith(".solutions.json") &&
          !f.endsWith("fig.json") && // figure manifests (page+bbox), read by attach-images
          !f.endsWith(".anchors.json") // snapCrop anchors, read by snap-crop
      )
      .sort();
  }

  const all: PaperQuestion[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: PaperQuestion[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    for (const q of frag) {
      if (seen.has(q.ref)) throw new Error(`duplicate ref "${q.ref}" (in ${f})`);
      seen.add(q.ref);
      all.push(q);
    }
    console.log(`  ${f.padEnd(28)} ${frag.length} questions`);
  }

  // The brief's "Model answers" format, enforced for papers authored under it.
  // Refuse rather than write: a merged file is what commit.ts ships.
  if (paper.answerStyle === "board") {
    const issues = all.flatMap(answerStyleIssues);
    if (issues.length) {
      for (const f of issues) console.error(`  ${f.ref}: ${f.reason}${f.quote ? `  [${f.quote}]` : ""}`);
      throw new Error(`${issues.length} model answer(s) break the board-answer format; nothing written`);
    }
  }

  writeFileSync(questionsJsonPath(id), JSON.stringify(all, null, 2), "utf8");
  console.log(`\nmerged ${all.length} questions from ${files.length} fragment(s) → ${outName}`);
}

main();
