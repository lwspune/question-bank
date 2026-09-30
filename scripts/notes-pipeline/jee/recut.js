// usage: node scripts/notes-pipeline/jee/recut.js <dump.json> <plan.json> <out-spec.json>
// plan: { "<new subtopic>": "id8 id8 ...", "_rest": { "<old subtopic>": "<new subtopic>" } }
// Validates: every row assigned exactly once, no unknown ids; prints per-page counts.
const fs = require("fs");
const [dumpName, planPath, outPath] = process.argv.slice(2);
const d = require(require("path").resolve("generated-papers", dumpName));
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const rest = plan._rest || {};
delete plan._rest;
const sub = Object.fromEntries(d.subtopics.map((s) => [s.id, s.name]));
const byPrefix = new Map(d.questions.map((q) => [q.id.slice(0, 8), q]));
const target = new Map();
for (const [name, list] of Object.entries(plan)) {
  for (const p of list.split(/\s+/).filter(Boolean)) {
    if (!byPrefix.has(p)) throw new Error("unknown id " + p);
    if (target.has(p)) throw new Error(`dup ${p}: ${target.get(p)} and ${name}`);
    target.set(p, name);
  }
}
for (const [p, q] of byPrefix) {
  if (target.has(p)) continue;
  const to = rest[sub[q.subtopic_id]];
  if (!to) throw new Error(`unassigned ${p} (${sub[q.subtopic_id]})`);
  target.set(p, to);
}
const counts = {};
for (const t of target.values()) counts[t] = (counts[t] || 0) + 1;
console.log(counts, "total", target.size, "of", d.questions.length);
const fixes = [...target].filter(([p, t]) => sub[byPrefix.get(p).subtopic_id] !== t).map(([prefix, subtopic]) => ({ prefix, subtopic }));
fs.writeFileSync(outPath, JSON.stringify({ dump: dumpName, fixes }, null, 1));
console.log("moves:", fixes.length);
