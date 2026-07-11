/**
 * Merge the per-section transcription fragments (data/<id>.<sec>.json, written
 * by the vision agents) into the single data/<id>.questions.json that commit.ts
 * reads. Sections don't overlap; refs are section-prefixed, so this is an
 * ordered concatenation with a duplicate-ref guard.
 *
 *   npx tsx scripts/ncert/merge.ts <chapterId> [sec1 sec2 ...]
 *
 * With explicit section names, merges only those (in the given order);
 * otherwise globs every data/<id>.*.json that isn't the merged output itself.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, questionsJsonPath, requireChapter } from "./config";
import type { SBQuestion } from "./lib";

function main() {
  const id = process.argv[2];
  requireChapter(id);
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
          !f.endsWith(".solutions.json") // solution files are {id,ref,solution}, applied by apply-solutions.ts — not question fragments
      )
      .sort();
  }

  const all: SBQuestion[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: SBQuestion[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    for (const q of frag) {
      if (seen.has(q.ref)) throw new Error(`duplicate ref "${q.ref}" (in ${f})`);
      seen.add(q.ref);
      all.push(q);
    }
    console.log(`  ${f.padEnd(28)} ${frag.length} questions`);
  }

  writeFileSync(questionsJsonPath(id), JSON.stringify(all, null, 2), "utf8");
  console.log(`\nmerged ${all.length} questions from ${files.length} fragment(s) → ${outName}`);
}

main();
