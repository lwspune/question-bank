// Turn agents' "this scene does not fit" answers into noFit verdicts.
//
//   node scripts/visuals/tools/collect-nofit.js <out.json> <scene>:<agent-output.json> [...]
//
// Each input is a fit-check output (rows with fit: "no") or a draft output
// (rows with skip: true), named with the scene it was checked against, e.g.
//   coordGeometry:work/cet-circle/fit-1.json space3d:work/s3/draft-2.json
// A question is left out when a committed batch in scripts/visuals/data already
// decides it, when it is held on NEEDS_OWNER.md (a key or stem problem: it must
// stay visible as undecided), or when the draft skipped it as "solution wrong"
// (fix the solution and draft again). Write <out.json> into scripts/visuals/data/
// as decided-<date>.json and run visuals:run on it like any batch.
// A fit-check row's `situation` (one camelCase word, e.g. findK) is kept on its
// verdict, so the noFit pile can later be sorted by what a new scene unlocks;
// anything else in that field is dropped (SITUATION in lib/visuals/batch.ts).
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..");
const [outFile, ...inputs] = process.argv.slice(2);
if (!outFile || !inputs.length) {
  console.error("usage: node collect-nofit.js <out.json> <scene>:<agent-output.json> [...]");
  process.exit(1);
}
const decided = new Set();
for (const f of fs.readdirSync(path.join(dir, "data"))) {
  // The output file itself is not a prior decision: re-running onto it would drop its verdicts.
  if (!f.endsWith(".json") || path.resolve(dir, "data", f) === path.resolve(outFile)) continue;
  const b = JSON.parse(fs.readFileSync(path.join(dir, "data", f), "utf8"));
  for (const v of b.visuals || []) decided.add(v.id);
  for (const d of b.decided || []) decided.add(d.id);
}
const held = new Set(
  (fs.readFileSync(path.join(dir, "NEEDS_OWNER.md"), "utf8").match(/`([0-9a-f]{8})`/g) || []).map((x) => x.slice(1, 9)),
);
const out = new Map();
let skippedHeld = 0;
for (const input of inputs) {
  const i = input.indexOf(":");
  const scene = input.slice(0, i);
  const file = input.slice(i + 1);
  for (const x of JSON.parse(fs.readFileSync(file, "utf8"))) {
    const why = x.fit === "no" ? x.note : x.skip && !/solution wrong/i.test(x.reason || "") ? x.reason : null;
    if (why === null || decided.has(x.id) || out.has(x.id)) continue;
    if (held.has(x.id.slice(0, 8))) {
      skippedHeld++;
      continue;
    }
    const entry = { id: x.id, verdict: "noFit", reason: `${scene}: ${String(why || "no fit").slice(0, 110)}` };
    if (typeof x.situation === "string" && /^[a-z][a-zA-Z]{1,23}$/.test(x.situation)) entry.situation = x.situation;
    out.set(x.id, entry);
  }
}
const body = { "//": "Questions checked against a scene that did not fit (noFit: no scene fits yet).", visuals: [], decided: [...out.values()] };
fs.writeFileSync(outFile, JSON.stringify(body, null, 1) + "\n");
console.log(`noFit ${out.size}, held left out ${skippedHeld}`);
