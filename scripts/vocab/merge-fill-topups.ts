/**
 * Fold each `fill-class-<N>-topup.json` into its rung's `fill-class-<N>.json`.
 *
 *   npx tsx scripts/vocab/merge-fill-topups.ts
 *   npx tsx scripts/vocab/merge-fill-topups.ts --apply
 *
 * ═══ WHY A TOP-UP IS A SEPARATE FILE ═══
 *
 * The first pass's words are already verified. Asking a top-up author to append
 * to that file means asking it to read, keep and rewrite work it did not do,
 * and a truncation there is silent — the count check would simply report a
 * smaller number and read as "the rung was short". A separate file makes the
 * top-up purely additive, and this script does the only destructive part under
 * assertions.
 *
 * ═══ NAMED FILES, NEVER A GLOB ═══
 *
 * `fill-class-9*.json` would also match anything else that lands in that
 * directory. This repo has twice had a sibling glob ingest generated artifacts
 * as content — once nearly committing a diagram spec as a question. Each pair
 * is opened by name.
 *
 * REFUSES the whole merge on any duplicate, rather than dropping the offending
 * word: a rung silently one short is indistinguishable from a rung that was
 * meant to be smaller.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const DATA = join(__dirname, "data");
const APPLY = process.argv.includes("--apply");
const CLASSES = [5, 6, 7, 8, 9, 10, 11, 12];

type Authored = { word: string; [k: string]: unknown };

const problems: string[] = [];
const merges: { cls: number; base: string; topup: string; rows: Authored[]; added: number }[] = [];

// Across ALL rungs, not just within one: a top-up author writing four files at
// once can still repeat a word between them, and that is precisely the failure
// this pass exists to repair.
const claimed = new Map<string, number>();

for (const cls of CLASSES) {
  const base = join(DATA, `fill-class-${cls}.json`);
  const topup = join(DATA, `fill-class-${cls}-topup.json`);
  if (!existsSync(base)) continue;

  const rows: Authored[] = JSON.parse(readFileSync(base, "utf8"));
  for (const r of rows) {
    const w = r.word.toLowerCase();
    const first = claimed.get(w);
    if (first !== undefined) problems.push(`"${w}": in Class ${cls} and Class ${first}`);
    else claimed.set(w, cls);
  }
  if (!existsSync(topup)) continue;

  const extra: Authored[] = JSON.parse(readFileSync(topup, "utf8"));
  for (const r of extra) {
    const w = r.word.toLowerCase();
    const first = claimed.get(w);
    if (first !== undefined) {
      problems.push(`"${w}": top-up for Class ${cls} repeats Class ${first}`);
    } else {
      claimed.set(w, cls);
    }
  }
  merges.push({ cls, base, topup, rows: [...rows, ...extra], added: extra.length });
}

for (const m of merges) {
  const rung = CADET_VOCAB.chapters.find((c) => c.part === "school" && c.schoolClass === m.cls);
  console.log(
    `  Class ${String(m.cls).padStart(2)}  ${String(m.rows.length - m.added).padStart(3)}` +
      ` + ${String(m.added).padStart(3)} = ${String(m.rows.length).padStart(3)} fill words` +
      (rung ? `   (rung target ${rung.expected})` : "")
  );
}

if (problems.length) {
  console.log(`\n${problems.length} DUPLICATE(S) — refusing the whole merge:`);
  for (const p of problems) console.log(`  ! ${p}`);
  process.exitCode = 1;
} else if (!merges.length) {
  console.log("no top-up files present — nothing to merge.");
} else if (!APPLY) {
  console.log("\n[dry-run] pass --apply to merge and remove the top-up files.");
} else {
  for (const m of merges) {
    writeFileSync(m.base, JSON.stringify(m.rows, null, 2) + "\n");
    rmSync(m.topup);
  }
  console.log(`\nmerged ${merges.length} top-up file(s) and removed them.`);
}
