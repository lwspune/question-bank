// Merge the per-file blind verdicts (out/<chapterId>/derived-*.json) into the
// committed data/<chapterId>.derived.json that compare.ts reads.
//
//   npx tsx scripts/worksheets/merge-derived.ts <chapterId>
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT, DATA } from "./config";

const chapter = requireChapter(process.argv[2]);
const dir = join(OUT, chapter.id);

type Verdict = { id: string; derived: string; confidence: string; note?: string };
const all: Verdict[] = [];
const seen = new Set<string>();
for (const f of readdirSync(dir).filter((f) => /^derived-\d+\.json$/.test(f)).sort()) {
  const arr: Verdict[] = JSON.parse(readFileSync(join(dir, f), "utf8"));
  for (const v of arr) {
    if (seen.has(v.id)) throw new Error(`duplicate verdict id ${v.id} (${f})`);
    seen.add(v.id);
    all.push(v);
  }
  console.log(`${f}: ${arr.length} verdicts`);
}
writeFileSync(join(DATA, `${chapter.id}.derived.json`), JSON.stringify(all, null, 2));
console.log(`wrote data/${chapter.id}.derived.json (${all.length} verdicts)`);
