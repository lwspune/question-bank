// Validate one chapter's repeat review against its evidence file.
//   node validate.mjs <evidence.md> <out.json>
import { readFileSync } from "node:fs";

const [evidencePath, outPath] = process.argv.slice(2);
const evidence = readFileSync(evidencePath, "utf8");
const header = /^# [^|]+\| (.+?) \| \d+ items/m.exec(evidence);
const yearOf = new Map();
// A sitting: a CBSE year ("2024") or a Maharashtra paper ("Feb 2024").
for (const m of evidence.matchAll(/^### ([0-9a-f-]{36}) \| (\d{4}|[A-Z][a-z]{2} \d{4}) \|/gm)) yearOf.set(m[1], m[2]);

const errors = [];
let out;
try {
  out = JSON.parse(readFileSync(outPath, "utf8"));
} catch (e) {
  console.error(`INVALID JSON: ${e.message}`);
  process.exit(1);
}
if (!header || out.chapter !== header[1]) errors.push(`chapter must be "${header?.[1]}", got "${out.chapter}"`);
if (!Array.isArray(out.repeats) || !Array.isArray(out.types)) errors.push("repeats and types must be arrays");

function check(kind, groups, idOf) {
  const seen = new Map();
  (groups ?? []).forEach((g, i) => {
    const where = `${kind}[${i}] "${g.label}"`;
    if (typeof g.label !== "string" || !g.label.trim()) errors.push(`${where}: label missing`);
    const ids = (g.members ?? []).map(idOf);
    if (ids.length < 2) errors.push(`${where}: needs at least 2 members`);
    const years = new Set();
    for (const id of ids) {
      if (!yearOf.has(id)) errors.push(`${where}: ${id} is not in this chapter's evidence`);
      else years.add(yearOf.get(id));
      if (seen.has(id)) errors.push(`${where}: ${id} is also in ${seen.get(id)}`);
      seen.set(id, where);
    }
    if (new Set(ids).size !== ids.length) errors.push(`${where}: duplicate member`);
    if (years.size < 2) errors.push(`${where}: spans ${years.size} year(s); a group must span at least 2`);
  });
}
check("repeats", out.repeats, (m) => {
  if (typeof m !== "object" || typeof m.id !== "string" || typeof m.changed !== "boolean") {
    errors.push(`repeat member must be {"id": string, "changed": boolean}: ${JSON.stringify(m)}`);
    return String(m?.id);
  }
  return m.id;
});
check("types", out.types, (m) => {
  if (typeof m !== "string") errors.push(`type member must be an id string: ${JSON.stringify(m)}`);
  return String(m);
});

if (errors.length) {
  console.error(`${errors.length} error(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
const yrs = (g, idOf) => new Set(g.members.map(idOf).map((id) => yearOf.get(id))).size;
console.log(
  `OK ${out.chapter}: ${out.repeats.length} repeat groups (largest spans ${Math.max(0, ...out.repeats.map((g) => yrs(g, (m) => m.id)))} years), ${out.types.length} type groups`
);
