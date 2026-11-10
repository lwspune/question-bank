/**
 * Read an NTA final-key text file (pdftotext -layout output) and print what it
 * holds: sections, ids per section, dropped and two-answer counts.
 *
 *   npx tsx scripts/ugc-net/key-summary.ts <key.txt> [--shifts]
 *
 * --shifts lists every (date, shift) and the subjects sat in it.
 */
import { readFileSync } from "node:fs";
import { parseNtaKey } from "./lib";

const file = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!file) throw new Error("usage: key-summary.ts <key.txt> [--shifts]");
const keys = parseNtaKey(readFileSync(file, "utf8"));
const kinds: Record<string, number> = {};
for (const k of keys) for (const v of k.answers.values()) kinds[v.kind] = (kinds[v.kind] ?? 0) + 1;
const sizes = keys.map((k) => k.answers.size);
console.log(`${keys.length} sections, ${sizes.reduce((a, b) => a + b, 0)} ids, ${JSON.stringify(kinds)}`);
console.log(`ids per section: min ${Math.min(...sizes)}, max ${Math.max(...sizes)}`);
const odd = keys.filter((k) => k.answers.size !== 150);
if (odd.length) console.log(`sections without 150 ids: ${odd.map((k) => `${k.code} ${k.subject} ${k.date} S${k.shift} (${k.answers.size})`).join("; ")}`);
if (process.argv.includes("--shifts")) {
  const by = new Map<string, string[]>();
  for (const k of keys) {
    const s = `${k.date} S${k.shift}`;
    by.set(s, [...(by.get(s) ?? []), `${k.code}`]);
  }
  for (const [s, codes] of [...by].sort()) console.log(`  ${s}: ${codes.join(", ")}`);
}
