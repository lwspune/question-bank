// Emit BLIND pass-1 packets: stem + options only. No key, no source solution,
// no extraction flags (a flag like "the key states 16 days" would tell the
// agent what the key is). Stem/option overrides already authored ARE applied,
// so agents solve the text that will ship.
//
//   npx tsx scripts/afcat/dump-verify.ts <chapterId> [--files=key1,key2] [--size=25]
//
// Writes out/<chapter>/verify-<NN>-<part>.json — one per file, split into
// parts of --size questions so a large book chapter becomes several packets.
// GIVE THE AGENT scripts/afcat/AGENT_BRIEF.md (PASS 1).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT, DATA } from "./config";
import { loadChapter, filesArg, qid } from "./read";
import type { AfcatOverride } from "./overrides";

const chapter = requireChapter(process.argv[2]);
const sizeArg = process.argv.find((a) => a.startsWith("--size="));
const size = sizeArg ? Number(sizeArg.slice(7)) : 25;
const dir = join(OUT, chapter.id);
mkdirSync(dir, { recursive: true });

const ovPath = join(DATA, `${chapter.id}.overrides.json`);
const overrides: Record<string, AfcatOverride> = existsSync(ovPath) ? JSON.parse(readFileSync(ovPath, "utf8")) : {};

for (const { file, fileIndex, records } of loadChapter(chapter, filesArg())) {
  const qs = records.flatMap((r) => {
    const id = qid(fileIndex, r.n);
    const ov = overrides[id];
    if (ov?.exclude) return [];
    const opt = (l: "A" | "B" | "C" | "D", i: number) => ov?.options?.[l] ?? r.options[i];
    return [{ id, stem: ov?.stem ?? r.stem, options: { A: opt("A", 0), B: opt("B", 1), C: opt("C", 2), D: opt("D", 3) } }];
  });
  for (let p = 0; p * size < qs.length; p++) {
    const part = qs.slice(p * size, (p + 1) * size);
    const out = join(dir, `verify-${String(fileIndex).padStart(2, "0")}-${p + 1}.json`);
    writeFileSync(out, JSON.stringify({ chapter: chapter.chapterName, subtopics: chapter.subtopics, questions: part }, null, 2));
    console.log(`${out}  (${part.length} q, ${file.key})`);
  }
}
console.log("\nGIVE THE AGENT scripts/afcat/AGENT_BRIEF.md (PASS 1). Packets carry NO key and NO source solution.");
