// Validate and merge the pass-1 agent output (out/<chapter>/derived-NN-P.json)
// into the committed data/<chapter>.derived.json.
//
//   npx tsx scripts/afcat/merge-derived.ts <chapterId>
//
// Each output file is checked against ITS packet (verify-NN-P.json): every id
// present once, nothing invented, subtopic from the chapter list, and a
// published solution that meets the brief's contract. Refuses to write if any
// file fails, naming every problem — fix the agent output, not this check.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT, DATA } from "./config";
import { validatePass1 } from "./lib";
import type { Pass1Verdict } from "./overrides";

const chapter = requireChapter(process.argv[2]);
const dir = join(OUT, chapter.id);

// Merge onto what is already committed, so a chapter can be verified a file at a time.
const dest = join(DATA, `${chapter.id}.derived.json`);
const merged = new Map<string, Pass1Verdict>();
if (existsSync(dest)) for (const v of JSON.parse(readFileSync(dest, "utf8")) as Pass1Verdict[]) merged.set(v.id, v);

let failed = false;
for (const f of readdirSync(dir).filter((f) => /^derived-\d+-\d+\.json$/.test(f)).sort()) {
  const packetPath = join(dir, f.replace("derived-", "verify-"));
  if (!existsSync(packetPath)) throw new Error(`${f}: no matching packet ${packetPath}`);
  const packet = JSON.parse(readFileSync(packetPath, "utf8")) as { questions: { id: string }[] };
  const verdicts = JSON.parse(readFileSync(join(dir, f), "utf8")) as Pass1Verdict[];
  const problems = validatePass1(verdicts as unknown as Record<string, unknown>[], packet.questions.map((q) => q.id), chapter.subtopics);
  if (problems.length) {
    failed = true;
    console.log(`${f}: ${problems.length} problem(s)`);
    for (const p of problems) console.log(`   ${p}`);
    continue;
  }
  for (const v of verdicts) merged.set(v.id, v);
  console.log(`${f}: ${verdicts.length} verdicts OK`);
}
if (failed) {
  console.log("\nNOT WRITTEN. Fix the agent output (or re-run that packet) and merge again.");
  process.exit(1);
}
const all = [...merged.values()].sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
writeFileSync(dest, JSON.stringify(all, null, 2) + "\n");
console.log(`wrote ${dest} (${all.length} verdicts)`);
