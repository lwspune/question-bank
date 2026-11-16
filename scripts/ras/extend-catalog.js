// Add every subtopic a paper's band files use that catalog.json does not list yet.
//
//   node scripts/ras/extend-catalog.js 2018
//
// Subtopics are SOFT in this lane (merge.ts warns, never fails): a transcriber
// writes its own label when no listed one fits, and that label is how the
// catalog grows. Subject and chapter stay hard-validated, so this only ever
// appends under a subject + chapter that already exist. Run after reading the
// merge's warnings, before merge.ts --apply.
const fs = require("fs");
const path = require("path");

const year = process.argv[2];
if (!year) throw new Error("usage: node scripts/ras/extend-catalog.js <year>");
const lane = __dirname;
const catFile = path.join(lane, "catalog.json");
const cat = JSON.parse(fs.readFileSync(catFile, "utf8"));
const re = new RegExp(`^${year}\\.b\\d+\\.json$`);
let added = 0;
for (const f of fs.readdirSync(path.join(lane, "data")).filter((f) => re.test(f))) {
  for (const q of JSON.parse(fs.readFileSync(path.join(lane, "data", f), "utf8")).questions) {
    const list = cat[q.subject]?.[q.chapter];
    if (!list || !q.subtopic || list.includes(q.subtopic)) continue;
    list.push(q.subtopic);
    added++;
    console.log(`+ ${q.subject} / ${q.chapter} / ${q.subtopic}  (Q${q.number})`);
  }
}
fs.writeFileSync(catFile, JSON.stringify(cat, null, 2) + "\n");
console.log(`${added} subtopic(s) added`);
