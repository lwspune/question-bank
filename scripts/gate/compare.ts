/**
 * GATE lane, step 4: a helper's blind answers against the organising IIT's final key.
 *
 *   npx tsx scripts/gate/compare.ts 2025-cs1
 *
 * Read-only. Prints agreement by question type and every disagreement, for the main
 * session to settle by re-deriving it (the key stands unless the printed paper contradicts
 * it; then a notice + grace). NAT counts as agreeing when the blind value sits inside the
 * key's range (or equals its exact value, to 1e-9).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { KeyEntry, UceedKey } from "../uceed/lib";
import { DATA, ROOT } from "./config";

type Blind = { n: number; type: string; answer: string; confidence?: string; chapter?: string };

const paper = process.argv[2];
if (!paper) throw new Error("usage: compare.ts <year>-cs<set>");
const key: UceedKey = JSON.parse(readFileSync(join(DATA, `${paper}.key.json`), "utf8"));
const blind: { questions: Blind[] } = JSON.parse(readFileSync(join(ROOT, "blind", paper, "derived.json"), "utf8"));
const byN = new Map(blind.questions.map((q) => [q.n, q]));

const letters = (s: string) => [...new Set(s.toUpperCase().match(/[A-D]/g) ?? [])].sort().join(",");
const shown = (k: KeyEntry) =>
  "value" in k ? String(k.value) : "range" in k ? `${k.range[0]} to ${k.range[1]}` : "sets" in k ? k.sets[0].join(",") : "cancelled";

function agrees(k: KeyEntry, b: Blind): boolean {
  if (k.type === "NAT") {
    const v = Number(String(b.answer).replace(/[^0-9.eE+-]/g, ""));
    if (!Number.isFinite(v)) return false;
    if ("range" in k) return v >= k.range[0] - 1e-9 && v <= k.range[1] + 1e-9;
    return "value" in k && Math.abs(v - k.value) < 1e-9;
  }
  if ("sets" in k) return k.sets.some((set) => set.join(",") === letters(b.answer));
  return "value" in k && letters(b.answer) === String(k.value);
}

const tally: Record<string, [number, number]> = {};
const misses: string[] = [];
for (const k of key.answers) {
  const b = byN.get(k.n);
  const t = (tally[k.type] ??= [0, 0]);
  t[1]++;
  if (!b) {
    misses.push(`Q${k.n} ${k.type}: not drafted`);
    continue;
  }
  if (agrees(k, b)) t[0]++;
  else misses.push(`Q${k.n} ${k.type}: blind ${b.answer} (${b.confidence ?? "?"}), key ${shown(k)}  [${b.chapter ?? ""}]`);
}
const total = Object.values(tally).reduce((a, [ok, n]) => [a[0] + ok, a[1] + n], [0, 0]);
console.log(`${paper}: blind agrees with the key on ${total[0]}/${total[1]}  (${Object.entries(tally).map(([t, [ok, n]]) => `${t} ${ok}/${n}`).join(", ")})`);
for (const m of misses) console.log(`  ${m}`);
