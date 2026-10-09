// Possible repeats filed under DIFFERENT chapters in different years: the one
// pair a chapter-by-chapter review cannot see. Prints the closest pairs to read.
//   node scripts/homework/cross-chapter.mjs generated-papers/homework/cbse-12-physics [minScore=0.85]
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const [dir, min = "0.85"] = process.argv.slice(2);
const items = [];
for (const f of readdirSync(join(dir, "evidence"))) {
  const md = readFileSync(join(dir, "evidence", f), "utf8");
  const chapter = /^# [^|]+\| (.+?) \|/m.exec(md)[1];
  for (const block of md.split(/^### /m).slice(1)) {
    const [head, ...body] = block.split("\n");
    const [id, year] = head.split(" | ");
    // Stems only: options (and the Assertion-Reason boilerplate in them) make unrelated items look alike.
    const stem = body.filter((l) => !/^\s+\([A-D]\)/.test(l)).join(" ");
    const text = stem.replace(/\*\*/g, "").replace(/Assertion \(A\)\s*:|Reason \([AR]\)\s*:/g, " ");
    items.push({ id, year, chapter, text: text.replace(/\s+/g, " ").trim() });
  }
}
const norm = (s) => s.toLowerCase().replace(/\\[a-z]+/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
const grams = (s) => {
  const m = new Map();
  const t = ` ${s} `;
  for (let i = 0; i < t.length - 2; i++) m.set(t.slice(i, i + 3), (m.get(t.slice(i, i + 3)) ?? 0) + 1);
  return m;
};
const cos = (a, b) => {
  let d = 0, na = 0, nb = 0;
  for (const [k, v] of a) { na += v * v; const w = b.get(k); if (w) d += v * w; }
  for (const v of b.values()) nb += v * v;
  return d / Math.sqrt(na * nb || 1);
};
for (const it of items) { it.n = norm(it.text); it.g = grams(it.n); }
const pairs = [];
for (let i = 0; i < items.length; i++)
  for (let j = i + 1; j < items.length; j++) {
    const a = items[i], b = items[j];
    if (a.chapter === b.chapter || a.year === b.year) continue;
    if (Math.min(a.n.length, b.n.length) / Math.max(a.n.length, b.n.length) < 0.6) continue;
    const c = cos(a.g, b.g);
    if (c >= Number(min)) pairs.push({ c, a, b });
  }
pairs.sort((x, y) => y.c - x.c);
for (const { c, a, b } of pairs)
  console.log(`${c.toFixed(3)}\n  ${a.id} ${a.year} [${a.chapter}] ${a.text.slice(0, 160)}\n  ${b.id} ${b.year} [${b.chapter}] ${b.text.slice(0, 160)}`);
console.log(`${pairs.length} cross-chapter pairs at or above ${min}`);
