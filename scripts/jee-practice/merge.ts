/**
 * Merge the per-part transcription fragments into one chapter file.
 *
 *   npx tsx scripts/jee-practice/merge.ts <chapterId>
 *
 * Each vision agent writes a fragment data/<chapterId>.<part>.json (a `Fragment`:
 * a LEVEL file carries its questions + that level's KEY block; the W.E file has
 * questions only). This concatenates all fragments (any file matching
 * <chapterId>.*.json except the .merged.json output) into:
 *   data/<chapterId>.merged.json = { questions: JQ[], keyBlocks: {level: block} }
 * Reports duplicate refs + duplicate level-KEY blocks so a fragment isn't
 * double-counted. Read-only w.r.t. the fragments.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Fragment, JQ } from "./lib";
import { requireChapter, DATA, mergedJsonPath } from "./config";

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);

  const prefix = `${ch.id}.`;
  const files = readdirSync(DATA)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".json") && f !== `${ch.id}.merged.json`)
    .sort();

  const questions: JQ[] = [];
  const keyBlocks: Record<string, string> = {};
  const seenRefs = new Set<string>();
  const problems: string[] = [];

  for (const f of files) {
    const frag = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Fragment;
    for (const q of frag.questions ?? []) {
      if (seenRefs.has(q.ref)) problems.push(`duplicate ref "${q.ref}" (in ${f})`);
      seenRefs.add(q.ref);
      questions.push(q);
    }
    const foundKeys: string[] = [];
    for (const [lvl, block] of Object.entries(frag.keyBlocks ?? {})) {
      if (keyBlocks[lvl]) problems.push(`duplicate KEY block for LEVEL ${lvl} (in ${f})`);
      keyBlocks[lvl] = block;
      foundKeys.push(lvl);
    }
    console.log(`  ${f.padEnd(40)} ${(frag.questions ?? []).length} q${foundKeys.length ? `  +KEY ${foundKeys.join(",")}` : ""}`);
  }

  if (problems.length) {
    console.log(`\nPROBLEMS (${problems.length}):`);
    for (const p of problems) console.log(`  ${p}`);
  }

  writeFileSync(mergedJsonPath(id), JSON.stringify({ questions, keyBlocks }, null, 2));
  console.log(`\nmerged ${files.length} fragments → ${questions.length} questions, KEY blocks: [${Object.keys(keyBlocks).join(", ")}]`);
  console.log(`wrote ${mergedJsonPath(id)}`);
}

main();
