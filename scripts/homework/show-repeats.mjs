// Print every repeat group of a review with each member's year and stem, for a
// person to read before the plan is built.
//   node scripts/homework/show-repeats.mjs generated-papers/homework/cbse-12-physics [chars=220]
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const [dir, chars = "220"] = process.argv.slice(2);
const text = new Map();
for (const f of readdirSync(join(dir, "evidence"))) {
  const md = readFileSync(join(dir, "evidence", f), "utf8");
  for (const block of md.split(/^### /m).slice(1)) {
    const [head, ...body] = block.split("\n");
    const [id, year] = head.split(" | ");
    const stem = body.filter((l) => !/^\s+\([A-D]\)/.test(l)).join(" ").replace(/\s+/g, " ").trim();
    text.set(id, { year, stem: stem.slice(0, Number(chars)) });
  }
}
for (const f of readdirSync(join(dir, "out")).filter((x) => x.endsWith(".json")).sort()) {
  if (!existsSync(join(dir, "out", f))) continue;
  const r = JSON.parse(readFileSync(join(dir, "out", f), "utf8"));
  console.log(`\n=== ${r.chapter}`);
  r.repeats.forEach((g, i) => {
    console.log(`R${i} ${g.label}`);
    for (const m of g.members) console.log(`   ${text.get(m.id)?.year}${m.changed ? "*" : " "} ${m.id.slice(0, 8)} ${text.get(m.id)?.stem}`);
  });
}
