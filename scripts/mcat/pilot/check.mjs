// MCAT pilot checks: structure, answer-letter spread, length tells, passage
// arithmetic, chapter coverage. Writes blind.json and nopassage.json.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(dir, "questions.json"), "utf8"));
const qs = data.questions;
const L = ["A", "B", "C", "D"];
const errors = [];
const warns = [];

// structure
const ids = new Set();
for (const q of qs) {
  if (ids.has(q.id)) errors.push(`${q.id}: duplicate id`);
  ids.add(q.id);
  if (q.options.length !== 4) errors.push(`${q.id}: ${q.options.length} options`);
  if (!L.includes(q.answer)) errors.push(`${q.id}: bad answer ${q.answer}`);
  if (new Set(q.options.map((o) => o.toLowerCase())).size !== 4) errors.push(`${q.id}: duplicate options`);
  if (!data.meta.chapters[q.chapter]) errors.push(`${q.id}: unknown chapter ${q.chapter}`);
  if (q.set && !data.passages[q.set]) errors.push(`${q.id}: unknown set ${q.set}`);
  if (!q.provenance) errors.push(`${q.id}: no provenance`);
  for (const f of ["text", "solution", ...q.options]) {
    const s = q[f] ?? f;
    if (/[—–]/.test(s)) errors.push(`${q.id}: em/en dash`);
  }
}

// answer-letter spread
const spread = Object.fromEntries(L.map((l) => [l, qs.filter((q) => q.answer === l).length]));

// length tells: key strictly longest, or strictly shortest
let longest = 0, shortest = 0;
for (const q of qs) {
  const lens = q.options.map((o) => o.length);
  const k = L.indexOf(q.answer);
  const max = Math.max(...lens), min = Math.min(...lens);
  const ratio = max / min;
  if (lens[k] === max && lens.filter((x) => x === max).length === 1 && ratio > 1.15) {
    longest++;
    warns.push(`${q.id}: key is the longest option (${lens.join("/")})`);
  }
  if (lens[k] === min && lens.filter((x) => x === min).length === 1 && ratio > 1.15) shortest++;
}

// passage arithmetic
const p1 = (18 * 84 + 12 * 69) / 30;
if (p1 !== 78) errors.push(`P1: nap subgroups average ${p1}, table says 78`);
const p2gap = 31 - 11;
if (!(7 < p2gap)) errors.push("P2: within-quartile gap must be smaller than the Q1-Q4 gap");
const stress = (55 + 73) / 2;
if (stress !== 64) errors.push(`P1: stress subgroups average ${stress}, table says 64`);
const q1car = 0.52 * 38 + 0.48 * 24;
if (Math.round(q1car) !== 31) errors.push(`P2: Q1 car split averages ${q1car}, table says 31`);
for (const [pid, needles] of Object.entries({ P1: ["| Stress | 30 | 64 |", "86%", "73%"], P2: ["| 48 |", "38% of respondents"] }))
  for (const n of needles) if (!data.passages[pid].text.includes(n)) errors.push(`${pid}: passage lacks "${n}"`);

// LEAK 1: a numeric key that other options' numbers produce (product of two
// percentages, or a sum/difference), the round-2 0.38 x 0.52 leak.
const num = (o) => { const m = o.match(/^\D*?(\d+(?:\.\d+)?)\s*(%|g)?\.?$/); return m ? Number(m[1]) : null; };
for (const q of qs) {
  const vals = q.options.map(num);
  if (vals.some((v) => v === null)) continue;
  const k = L.indexOf(q.answer);
  const others = vals.filter((_, i) => i !== k);
  for (let i = 0; i < others.length; i++) for (let j = i + 1; j < others.length; j++) {
    const a = others[i], b = others[j];
    for (const [how, v] of [["product", (a * b) / 100], ["sum", a + b], ["difference", Math.abs(a - b)]])
      if (Math.abs(v - vals[k]) <= 0.6) errors.push(`${q.id}: key ${vals[k]} = ${how} of options ${a} and ${b}`);
  }
}

// LEAK 2: a sibling question in the same set shares a 5-word run with this key.
const words = (s) => s.toLowerCase().replace(/[^a-z0-9% ]/g, " ").split(/\s+/).filter(Boolean);
const grams = (s) => { const w = words(s); const g = new Set(); for (let i = 0; i + 5 <= w.length; i++) g.add(w.slice(i, i + 5).join(" ")); return g; };
for (const q of qs.filter((x) => x.set)) {
  const keyGrams = grams(q.options[L.indexOf(q.answer)]);
  for (const s of qs.filter((x) => x.set === q.set && x.id !== q.id)) {
    const hit = [...grams([s.text, ...s.options].join(" | "))].find((g) => keyGrams.has(g));
    if (hit) warns.push(`${q.id}: key shares "${hit}" with sibling ${s.id}`);
  }
}

// LEAK 3: the key is the only option without an absolute word (the cautious tell).
const ABS = /\b(every|all|always|never|any|whole|entire|only|none|nothing|no one|directly)\b/i;
for (const q of qs) {
  const k = L.indexOf(q.answer);
  const absDistractors = q.options.filter((o, i) => i !== k && ABS.test(o)).length;
  if (!ABS.test(q.options[k]) && absDistractors >= 2) warns.push(`${q.id}: key is the cautious option (${absDistractors} absolute distractors)`);
}

// coverage
const covered = new Set(qs.map((q) => q.chapter));
const missing = Object.keys(data.meta.chapters).filter((c) => !covered.has(c));

console.log(`questions ${qs.length} | passages ${Object.keys(data.passages).length} | stand-alone ${qs.filter((q) => !q.set).length}`);
console.log(`answer spread ${JSON.stringify(spread)}`);
console.log(`key longest ${longest}/${qs.length} | key shortest ${shortest}/${qs.length} (chance about 5 each)`);
console.log(`chapters covered ${covered.size}/12${missing.length ? " missing " + missing.join(",") : ""}`);
for (const w of warns) console.log("WARN " + w);
for (const e of errors) console.log("ERROR " + e);
console.log(errors.length ? `FAIL ${errors.length} errors` : "PASS 0 errors");

// Blind files for the checkers (no answer, solution, provenance or difficulty),
// written only when asked: `node check.mjs --blind-dir=<folder outside the repo>`.
const blindArg = process.argv.find((a) => a.startsWith("--blind-dir="));
const strip = (q, withPassage) => ({
  id: q.id,
  passage: withPassage && q.set ? data.passages[q.set].text : undefined,
  text: q.text,
  options: Object.fromEntries(q.options.map((o, i) => [L[i], o])),
});
if (blindArg) {
  const out = blindArg.slice("--blind-dir=".length);
  writeFileSync(join(out, "blind.json"), JSON.stringify(qs.map((q) => strip(q, true)), null, 2));
  writeFileSync(join(out, "nopassage.json"), JSON.stringify(qs.filter((q) => q.set).map((q) => strip(q, false)), null, 2));
}
