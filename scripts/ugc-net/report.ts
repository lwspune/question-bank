/**
 * The blind solver against NTA's final key, for one shift or all. MAIN SESSION
 * ONLY: it prints NTA's answers. Never hand its output to a solver.
 *
 *   npx tsx scripts/ugc-net/report.ts <shift-id|all> [--rows]
 *
 * Prints agreement per shift, then every row that needs a person: DISAGREE,
 * DROPPED, MULTI, NO_KEY, and any solver flag or non-HIGH confidence.
 * Adjudications go in data/<shift>.adjudication.json (README "When the solver
 * and NTA disagree").
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SHIFTS, blindDir, dataDir, keyPath, shiftById, type CycleId } from "./config";
import { crosscheck, parseNtaKey, type DerivedEntry, type KeySection, type UgcPaper } from "./lib";

const read = <T>(p: string): T | undefined => (existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : undefined);
const keys = new Map<CycleId, KeySection[]>();
const arg = process.argv[2];
if (!arg) throw new Error("usage: report.ts <shift-id|all> [--rows]");

let agree = 0;
let total = 0;
for (const s of arg === "all" ? SHIFTS : [shiftById(arg)]) {
  const paper = read<UgcPaper>(join(dataDir(), `${s.id}.questions.json`));
  const derived =
    read<{ answers: DerivedEntry[] }>(join(dataDir(), `${s.id}.derived.json`)) ??
    read<{ answers: DerivedEntry[] }>(join(blindDir(s.id), "derived.json"));
  if (!paper || !derived) {
    if (arg !== "all") console.log(`${s.id}: ${!paper ? "no transcription" : "no derivation"}`);
    continue;
  }
  if (!keys.has(s.cycle)) keys.set(s.cycle, parseNtaKey(readFileSync(keyPath(s.cycle), "utf8")));
  const res = crosscheck(paper, keys.get(s.cycle)!, derived.answers);
  const decided = res.rows.filter((r) => r.verdict === "AGREE" || r.verdict === "DISAGREE").length;
  agree += res.agree;
  total += decided;
  const adj = read<{ adjudications: { ref: string }[] }>(join(dataDir(), `${s.id}.adjudication.json`))?.adjudications ?? [];
  const settled = new Set(adj.map((a) => a.ref));
  const open = res.rows.filter((r) => r.verdict !== "AGREE" && !settled.has(r.ref));
  console.log(`${s.id}  agree ${res.agree}/${decided}  dropped ${res.rows.filter((r) => r.verdict === "DROPPED").length}  multi ${res.rows.filter((r) => r.verdict === "MULTI").length}  open ${open.length}`);
  if (process.argv.includes("--rows") || arg !== "all") {
    const d = new Map(derived.answers.map((x) => [x.ref, x]));
    for (const r of res.rows) {
      const note = d.get(r.ref)?.flag;
      if (r.verdict === "AGREE" && r.confidence === "HIGH" && !note) continue;
      console.log(`  Q${r.ref.padStart(2)} ${r.verdict.padEnd(9)} solver ${r.derived ?? "-"} key ${r.key ?? "-"} ${r.confidence ?? ""}${settled.has(r.ref) ? " [adjudicated]" : ""}${note ? `  flag: ${note.slice(0, 140)}` : ""}`);
    }
  }
}
if (arg === "all") console.log(`ALL: agree ${agree}/${total} (${total ? ((100 * agree) / total).toFixed(1) : 0}%)`);
