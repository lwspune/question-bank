// Count the noFit pile by scene and situation: which new scene or ask would
// unlock the most questions.
//
//   node scripts/visuals/tools/nofit-situations.js [scene]
//
// Reads every committed batch in scripts/visuals/data. A situation is the fit
// checker's one-word reason (findK, rootExpr, ...), stored on noFit verdicts
// from 2026-10-29; verdicts recorded before then have none and count as
// "(none recorded)". A question that has since been animated is not counted.
const fs = require("fs");
const path = require("path");
const dataDir = path.join(__dirname, "..", "data");
const only = process.argv[2];
const animated = new Set();
const noFit = new Map();
for (const f of fs.readdirSync(dataDir).filter((n) => n.endsWith(".json")).sort()) {
  const b = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));
  for (const v of b.visuals || []) animated.add(v.id);
  for (const d of b.decided || []) if (d.verdict === "noFit") noFit.set(d.id, d);
}
const tally = new Map();
for (const [id, d] of noFit) {
  if (animated.has(id)) continue;
  const scene = d.reason.split(":")[0];
  if (only && scene !== only) continue;
  const key = `${scene}\t${d.situation || "(none recorded)"}`;
  tally.set(key, (tally.get(key) || 0) + 1);
}
const rows = [...tally].sort((a, b) => b[1] - a[1]);
for (const [key, n] of rows) console.log(`${String(n).padStart(5)}  ${key.replace("\t", "  ")}`);
console.log(`${String(rows.reduce((t, r) => t + r[1], 0)).padStart(5)}  total`);
