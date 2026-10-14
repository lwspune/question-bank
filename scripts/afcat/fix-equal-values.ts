// Propose repairs for rows whose options are equal in value, after the key is
// settled (run it once disputes have their overrides).
//
//   npx tsx scripts/afcat/fix-equal-values.ts <chapterId> --files=a,b           # print proposals
//   npx tsx scripts/afcat/fix-equal-values.ts <chapterId> --files=a,b --write   # add them to the overrides
//
// Uses proposeEqualValueRepair (lib.ts): the keyed value stays (moving to its
// simplest form if an unsimplified copy was keyed); other duplicates become
// near misses of the same shape. A row it cannot reshape is printed as MANUAL
// and left alone. Rows already excluded or marked equalValuesIntended are skipped.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA } from "./config";
import { filesArg, loadChapter, qid } from "./read";
import { proposeEqualValueRepair } from "./lib";
import { loadOverrides } from "./build";

const chapter = requireChapter(process.argv[2]);
const write = process.argv.includes("--write");
const overrides = loadOverrides(chapter);
let proposed = 0;
const manual: string[] = [];
for (const { fileIndex, records } of loadChapter(chapter, filesArg())) {
  for (const r of records) {
    const id = qid(fileIndex, r.n);
    const ov = overrides[id];
    if (ov?.exclude || ov?.equalValuesIntended) continue;
    const opts = r.options.map((o, i) => ov?.options?.["ABCD"[i] as "A"] ?? o);
    const key = (ov?.answer ?? r.key ?? "").toUpperCase();
    if (!/^[A-D]$/.test(key)) continue;
    const p = proposeEqualValueRepair(opts, key);
    if (p === null) {
      // null is also "clean": tell the two apart.
      const { equalValueOptions } = require("./lib") as typeof import("./lib");
      if (equalValueOptions(opts).length) manual.push(`${id}: ${opts.join(" | ")} (key ${key})`);
      continue;
    }
    proposed++;
    const changes = Object.entries(p.options).map(([l, t]) => `${l}: ${opts["ABCD".indexOf(l)]} -> ${t}`).join("; ");
    console.log(`${id} (key ${key}${p.answer ? ` -> ${p.answer}` : ""}): ${changes}`);
    if (!write) continue;
    const reason = `Options equal in value; ${p.answer ? `the answer moves to its simplest form (${p.answer}) and ` : ""}each duplicate is replaced with a near miss (fix-equal-values). The keyed value is unchanged.`;
    overrides[id] = {
      ...(ov ?? {}),
      options: { ...(ov?.options ?? {}), ...p.options },
      ...(p.answer ? { answer: p.answer } : {}),
      reason: ov?.reason ? `${ov.reason} ${reason}` : reason,
    };
  }
}
for (const m of manual) console.log(`MANUAL ${m}`);
console.log(`${proposed} proposal(s), ${manual.length} manual`);
if (write && proposed) {
  const path = join(DATA, `${chapter.id}.overrides.json`);
  const onDisk = JSON.parse(readFileSync(path, "utf8").length ? readFileSync(path, "utf8") : "{}");
  writeFileSync(path, JSON.stringify({ ...onDisk, ...overrides }, null, 2) + "\n");
  console.log(`wrote ${path}`);
}
