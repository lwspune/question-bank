// Compare the pass-1 blind verdicts with the source keys.
//
//   npx tsx scripts/afcat/compare.ts <chapterId>
//
// Prints every disagreement (source key vs derived), every X, every TWIN flag,
// and the extraction flags for each disputed row (e.g. "the key states 16 days
// but its letter points at 19"). Every disagreement is adjudicated by hand;
// past ~5% disagreement, run the pass-2 recheck first (recheck.ts).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA } from "./config";
import { loadChapter, qid } from "./read";
import type { Pass1Verdict } from "./overrides";

const chapter = requireChapter(process.argv[2]);
const verdicts: Pass1Verdict[] = JSON.parse(readFileSync(join(DATA, `${chapter.id}.derived.json`), "utf8"));
const byId = new Map(verdicts.map((v) => [v.id, v]));

let total = 0;
let agree = 0;
const missing: string[] = [];
const lines: string[] = [];
const twins: string[] = [];
for (const { file, fileIndex, records } of loadChapter(chapter)) {
  let fileAgree = 0;
  let fileTotal = 0;
  for (const r of records) {
    const id = qid(fileIndex, r.n);
    const v = byId.get(id);
    if (!v) {
      missing.push(id);
      continue;
    }
    total++;
    fileTotal++;
    if (/\bTWIN:/i.test(v.note ?? "")) twins.push(`${id}  ${v.note}`);
    if (r.key && v.derived === r.key) {
      agree++;
      fileAgree++;
      continue;
    }
    lines.push(
      `${id}  source=${r.key ?? "-"} derived=${v.derived} [${v.confidence}]  value=${v.value}\n` +
        `    ${r.stem.slice(0, 110)}\n` +
        `    A) ${r.options[0]} | B) ${r.options[1]} | C) ${r.options[2]} | D) ${r.options[3]}` +
        (r.keyValue ? `\n    source key says: ${r.keyValue}` : "") +
        (r.flags ? `\n    extraction: ${r.flags.join("; ")}` : "") +
        (v.note ? `\n    agent note: ${v.note}` : "")
    );
  }
  console.log(`${file.key} (group ${file.group}): ${fileTotal} verified, ${fileAgree} agree, ${fileTotal - fileAgree} dispute`);
}

console.log(`\n${total} verified | ${agree} agree | ${total - agree} dispute (${((100 * (total - agree)) / Math.max(total, 1)).toFixed(1)}%) | ${missing.length} unverified`);
if (missing.length) console.log(`unverified: ${missing.join(", ")}`);
if (twins.length) console.log(`\n--- TWIN flags (key may be right; check the option texts) ---\n${twins.join("\n")}`);
if (lines.length) console.log(`\n--- disputes (adjudicate each by hand) ---\n${lines.join("\n")}`);
