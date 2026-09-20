/**
 * Concatenate a blind pass that was derived in RANGE SLICES into one pass file.
 *
 *   npx tsx scripts/cds-maths/merge-pass-parts.ts 2026-2 passA
 *   npx tsx scripts/cds-maths/merge-pass-parts.ts 2026-2 passA --apply
 *
 * Reads `data/<paper>.<pass>-part<N>.json` for N = 1.. and writes
 * `data/<paper>.<pass>.json`.
 *
 * WHY SLICES AT ALL. A pass is ONE derivation per question; splitting the 100
 * across several agents by question range is parallelisation, not a second
 * opinion, and it leaves the measurement unchanged. `2026-1` was run the same
 * way (see the `_tmp_*-passA-part*.json` files beside this script).
 *
 * WHY THIS IS A SCRIPT AND NOT A `cat`. Three things must be true of the join
 * and none of them is visible by eye in a 2,000-line JSON file:
 *
 *  1. COVERAGE — the parts together cover 1..100 exactly once. A slice boundary
 *     that is off by one silently drops or doubles a question, and a doubled
 *     question means two different derivations of the same row with the later
 *     one winning by file order.
 *  2. NO OVERLAP — the same number must not appear in two parts. `buildRecords`
 *     maps by number, so an overlap is resolved silently rather than reported.
 *  3. SHAPE — every row carries the six fields the downstream tools require,
 *     `answer` is A-D or null, and `confidence` is HIGH/MED/LOW. A missing
 *     `solution` is the one that ships: `buildRecords` falls back to
 *     `reasoning`, which is REVIEWER text, and that is exactly how 419 of 800
 *     published rows of this corpus came to read "RUNNER-UP: option C".
 *
 * It refuses rather than warns on all three, and writes nothing without --apply.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";

type Derivation = {
  number: number;
  answer: string | null;
  value?: string;
  confidence?: string;
  reasoning?: string;
  solution?: string;
};

const REQUIRED: (keyof Derivation)[] = [
  "number",
  "answer",
  "value",
  "confidence",
  "reasoning",
  "solution",
];

function main() {
  const paper = requirePaper(process.argv[2]);
  const pass = process.argv[3] ?? "passA";
  const apply = process.argv.includes("--apply");

  const all: Derivation[] = [];
  const origin = new Map<number, string>();
  const problems: string[] = [];

  for (let n = 1; n <= 20; n++) {
    const path = dataPath(paper.id, `${pass}-part${n}`);
    if (!existsSync(path)) continue;
    const rows = JSON.parse(readFileSync(path, "utf8")) as Derivation[];
    if (!Array.isArray(rows)) {
      problems.push(`part${n}: expected a JSON array, got ${typeof rows}`);
      continue;
    }
    const nums = rows.map((r) => r.number);
    console.log(
      `  part${n}: ${String(rows.length).padStart(3)} row(s)  Q${Math.min(...nums)}-Q${Math.max(...nums)}`
    );

    for (const r of rows) {
      for (const k of REQUIRED) {
        if (r[k] === undefined) problems.push(`Q${r.number}: missing "${k}"`);
      }
      if (r.answer !== null && !/^[A-D]$/.test(String(r.answer ?? "")))
        problems.push(`Q${r.number}: answer "${r.answer}" is not A-D or null`);
      if (!["HIGH", "MED", "LOW"].includes(String(r.confidence ?? "").toUpperCase()))
        problems.push(`Q${r.number}: confidence "${r.confidence}" is not HIGH/MED/LOW`);
      if (!String(r.value ?? "").trim()) problems.push(`Q${r.number}: empty "value"`);
      // A null answer ships nothing, so it is exempt from needing student text.
      if (r.answer !== null && !String(r.solution ?? "").trim())
        problems.push(`Q${r.number}: empty "solution" — buildRecords would ship "reasoning" instead`);

      if (origin.has(r.number)) {
        problems.push(`Q${r.number}: appears in BOTH part${n} and ${origin.get(r.number)}`);
      } else {
        origin.set(r.number, `part${n}`);
        all.push(r);
      }
    }
  }

  if (!all.length) throw new Error(`no ${paper.id}.${pass}-part*.json files found`);

  const missing: number[] = [];
  for (let q = 1; q <= QUESTIONS_PER_PAPER; q++) if (!origin.has(q)) missing.push(q);
  if (missing.length) problems.push(`not derived: Q${missing.join(", Q")}`);

  all.sort((a, b) => a.number - b.number);

  const conf = new Map<string, number>();
  for (const r of all) {
    const c = String(r.confidence ?? "?").toUpperCase();
    conf.set(c, (conf.get(c) ?? 0) + 1);
  }
  const nulls = all.filter((r) => r.answer === null).map((r) => r.number);

  console.log(`\n${paper.id} ${pass}: ${all.length}/${QUESTIONS_PER_PAPER} derivations`);
  console.log(
    `  confidence: ${["HIGH", "MED", "LOW"].map((c) => `${c}=${conf.get(c) ?? 0}`).join("  ")}`
  );
  console.log(`  no-correct-option (null): ${nulls.length ? `Q${nulls.join(", Q")}` : "none"}`);

  if (problems.length) {
    console.log(`\nREFUSING — ${problems.length} problem(s):`);
    for (const p of problems) console.log(`  ${p}`);
    process.exit(1);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.${pass}.json. Nothing written.`);
    return;
  }

  const out = dataPath(paper.id, pass);
  writeFileSync(out, JSON.stringify(all, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${out}`);
}

main();
