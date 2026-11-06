// Score a two-agent exam-twin run against a hand-settled run (scripts/cross-exam/README.md,
// "Scaling"). Read-only: files in, numbers out.
//
//   npx tsx scripts/cross-exam/calibrate.ts <pass A dir> <pass B dir> <settled run>
//
// Each pass dir holds out/board-<n>.json drafts (BRIEF.md). Reports, against the settled pairs:
//   * each pass alone: precision and recall of its firm matches;
//   * AGREED = pairs both passes propose as firm matches with the same kind, the set the two-agent
//     method would accept without a person reading it: its precision and recall, and how many of
//     its kinds the person would have changed;
//   * the REVIEW LOAD: every pair outside the agreed set that either pass raised (one pass only,
//     kinds differ, or "unsure" in either), which the main session would read.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { SettledFile } from "@/lib/crossExam/settled";

type Draft = {
  matches: { board: string; target: string; kind: string }[];
  unsure: { board: string; target: string }[];
};

const key = (b: string, t: string) => `${b}>${t}`;
const pct = (n: number, d: number) => (d === 0 ? "-" : `${((100 * n) / d).toFixed(1)}%`);

function readPass(dir: string): { firm: Map<string, string>; unsure: Set<string> } {
  const firm = new Map<string, string>();
  const unsure = new Set<string>();
  for (const f of readdirSync(join(dir, "out")).filter((x) => /^board-\d+\.json$/.test(x))) {
    const d = JSON.parse(readFileSync(join(dir, "out", f), "utf8")) as Draft;
    for (const m of d.matches) firm.set(key(m.board, m.target), m.kind);
    for (const u of d.unsure) unsure.add(key(u.board, u.target));
  }
  return { firm, unsure };
}

function main() {
  const [a, b, run] = process.argv.slice(2);
  if (!a || !b || !run) throw new Error("usage: calibrate.ts <pass A dir> <pass B dir> <settled run>");
  const settled = JSON.parse(readFileSync(join(process.cwd(), "scripts/cross-exam/data", `${run}.json`), "utf8")) as SettledFile;
  const truth = new Map(settled.pairs.map((p) => [key(p.source, p.target), p.kind as string]));
  const A = readPass(a);
  const B = readPass(b);

  console.log(`settled ${run}: ${truth.size} pairs\n`);
  for (const [name, P] of [["A", A], ["B", B]] as const) {
    const hit = [...P.firm.keys()].filter((k) => truth.has(k)).length;
    console.log(`pass ${name}: ${P.firm.size} firm, ${P.unsure.size} unsure · precision ${pct(hit, P.firm.size)} · recall ${pct(hit, truth.size)}`);
  }

  const agreed = [...A.firm].filter(([k, kind]) => B.firm.get(k) === kind);
  const agreedRight = agreed.filter(([k]) => truth.has(k));
  const kindChanged = agreedRight.filter(([k, kind]) => truth.get(k) !== kind);
  const wrong = agreed.filter(([k]) => !truth.has(k));
  console.log(`\nAGREED (both firm, same kind): ${agreed.length}`);
  console.log(`  precision ${pct(agreedRight.length, agreed.length)} (${wrong.length} not in the settled set)`);
  console.log(`  recall    ${pct(agreedRight.length, truth.size)} of the settled pairs`);
  console.log(`  kind the person changed: ${kindChanged.length}`);

  const agreedKeys = new Set(agreed.map(([k]) => k));
  const raised = new Set([...A.firm.keys(), ...B.firm.keys(), ...A.unsure, ...B.unsure]);
  const load = [...raised].filter((k) => !agreedKeys.has(k));
  const loadInTruth = load.filter((k) => truth.has(k)).length;
  const neverRaised = [...truth.keys()].filter((k) => !raised.has(k)).length;
  console.log(`\nREVIEW LOAD (raised, not agreed): ${load.length} pairs, ${loadInTruth} of them in the settled set`);
  console.log(`settled pairs neither pass raised: ${neverRaised} (found only by reading the unmatched exam questions)`);
  console.log(`\nwith review: the method finds ${pct(agreedRight.length + loadInTruth, truth.size)} of the settled pairs; the person reads ${load.length} instead of ${raised.size}`);

  if (wrong.length) console.log(`\nagreed but not settled (sample):\n  ${wrong.slice(0, 10).map(([k, kind]) => `${k} ${kind}`).join("\n  ")}`);
}

main();
