/**
 * Merge the five per-subject W03 transcription part-files into the single
 * `data/gat-mock-w03.records.json` that `loadRecords` expects, then DERIVE the
 * `subjects` map (subject -> chapter -> subtopics[]) from the records themselves.
 *
 * Deriving the map instead of hand-writing it means the spec cannot disagree with
 * the data — `validateRecords` checks each record's subtopic against the map, so a
 * hand-written map that missed one subtopic would throw at commit time.
 *
 *   npx tsx scripts/practice-paper/merge-w03.ts
 *
 * Tooling for the manual ingest core, not a committed data artifact.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const PARTS = [
  ["english", 1, 50],
  ["geography", 51, 90],
  ["current_affairs", 91, 100],
  ["biology", 101, 125],
  ["chemistry", 126, 150],
] as const;

const SRC = "C:/tmp/gatw03";
const OUT = join(__dirname, "data", "gat-mock-w03.records.json");

type Rec = {
  n: number; subject: string; chapter: string; subtopic: string;
  difficulty: string; status?: string; stem: string;
  optA: string; optB: string; optC: string; optD: string;
  answer: string; solution: string; reviewNote?: string;
  context?: string; setLabel?: string;
};

const all: Rec[] = [];
let missing = false;

for (const [name, lo, hi] of PARTS) {
  const path = `${SRC}/rec_${name}.json`;
  if (!existsSync(path)) {
    console.error(`MISSING part file: ${path}`);
    missing = true;
    continue;
  }
  const recs: Rec[] = JSON.parse(readFileSync(path, "utf-8"));
  const ns = recs.map((r) => r.n).sort((a, b) => a - b);
  const want = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  const gaps = want.filter((n) => !ns.includes(n));
  const extra = ns.filter((n) => n < lo || n > hi);
  console.log(
    `${name.padEnd(16)} ${recs.length} recs  (${lo}-${hi})` +
      (gaps.length ? `  GAPS: ${gaps.join(",")}` : "") +
      (extra.length ? `  OUT-OF-RANGE: ${extra.join(",")}` : ""),
  );
  if (gaps.length || extra.length) missing = true;
  all.push(...recs);
}

if (missing) {
  console.error("\nrefusing to write — fix the part files first");
  process.exit(1);
}

all.sort((a, b) => a.n - b.n);

// integrity: 150 records, n = 1..150, no duplicates
const ns = all.map((r) => r.n);
if (new Set(ns).size !== ns.length) {
  const dup = ns.filter((n, i) => ns.indexOf(n) !== i);
  throw new Error(`duplicate question numbers: ${[...new Set(dup)].join(",")}`);
}
const gaps = Array.from({ length: 150 }, (_, i) => i + 1).filter((n) => !ns.includes(n));
if (gaps.length) throw new Error(`missing question numbers: ${gaps.join(",")}`);

// unicode-symbol guard — these break the Word/OMML export
const BAD = /[×÷≈→⇌²³°✓✗–—]/;
for (const r of all) {
  for (const [f, v] of Object.entries({ stem: r.stem, solution: r.solution, A: r.optA, B: r.optB, C: r.optC, D: r.optD })) {
    const m = v && v.match(BAD);
    if (m) console.warn(`  WARN Q${r.n} ${f}: unicode "${m[0]}"`);
  }
}

// LaTeX delimiter balance
for (const r of all) {
  for (const [f, v] of Object.entries({ stem: r.stem, solution: r.solution, A: r.optA, B: r.optB, C: r.optC, D: r.optD })) {
    if (!v) continue;
    const open = (v.match(/\\\(/g) ?? []).length;
    const close = (v.match(/\\\)/g) ?? []).length;
    if (open !== close) console.warn(`  WARN Q${r.n} ${f}: ${open} "\\(" vs ${close} "\\)"`);
  }
}

writeFileSync(OUT, JSON.stringify(all, null, 1), "utf-8");
console.log(`\n${all.length} records -> ${OUT}`);

// ---- derive the subjects map ----
const map: Record<string, Record<string, Set<string>>> = {};
for (const r of all) {
  (map[r.subject] ??= {});
  (map[r.subject][r.chapter] ??= new Set());
  map[r.subject][r.chapter].add(r.subtopic);
}

const lines: string[] = ["    subjects: {"];
for (const subj of Object.keys(map).sort()) {
  lines.push(`      ${JSON.stringify(subj)}: {`);
  for (const ch of Object.keys(map[subj]).sort()) {
    const subs = [...map[subj][ch]].sort().map((s) => JSON.stringify(s));
    lines.push(`        ${JSON.stringify(ch)}: [${subs.join(", ")}],`);
  }
  lines.push("      },");
}
lines.push("    },");
writeFileSync(`${SRC}/subjects_map.ts.txt`, lines.join("\n"), "utf-8");
console.log(`subjects map -> ${SRC}/subjects_map.ts.txt`);

// flat triples for DB validation
const triples: string[] = [];
for (const subj of Object.keys(map).sort())
  for (const ch of Object.keys(map[subj]).sort())
    for (const st of [...map[subj][ch]].sort())
      triples.push(`('${subj.replace(/'/g, "''")}','${ch.replace(/'/g, "''")}','${st.replace(/'/g, "''")}')`);
writeFileSync(`${SRC}/triples.sql.txt`, triples.join(",\n"), "utf-8");
console.log(`${triples.length} (subject,chapter,subtopic) triples -> ${SRC}/triples.sql.txt`);

// status + answer summary
const by = (f: (r: Rec) => string) =>
  all.reduce<Record<string, number>>((a, r) => ((a[f(r)] = (a[f(r)] ?? 0) + 1), a), {});
console.log("\nstatus  ", by((r) => r.status ?? "new"));
console.log("answer  ", by((r) => r.answer));
console.log("subject ", by((r) => r.subject));
console.log("reviewNotes:", all.filter((r) => r.reviewNote).length);
