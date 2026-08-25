/**
 * Throwaway verifier for the 2026-08-25 match-list sweep.
 *
 *   npx tsx scripts/cds/_matchlist-verify.ts
 *
 * PRINTED holds the code table exactly as read off the source booklet at 5-6x,
 * in printed order (a),(b),(c),(d). DERIVED holds the pairing worked out from
 * the List I / List II content alone, never from which code "looks right".
 *
 * The script asserts three things per question:
 *   1. our stored option TEXTS, in label order, equal the printed rows;
 *   2. the derived pairing appears exactly once among the printed rows
 *      (so the intended answer letter is unambiguous);
 *   3. the stored answer either already equals that letter, or the row's
 *      reasoning carries a matching "KEY FIX PENDING: must move X -> Y".
 */
import { readFileSync } from "node:fs";
import { dataPath } from "./config";

type Q = { printed: string[]; derived: string };

// codes written as the four List-I values in A,B,C,D order
const PRINTED: Record<string, Record<number, Q>> = {
  "2026-1": {
    101: { printed: ["3214", "4123", "4213", "3124"], derived: "4123" },
    102: { printed: ["3142", "3412", "2413", "2143"], derived: "2413" },
    103: { printed: ["1423", "1243", "3421", "3241"], derived: "1423" },
    104: { printed: ["3124", "4213", "4123", "3214"], derived: "4213" },
    105: { printed: ["3421", "1243", "3241", "1423"], derived: "3421" },
    106: { printed: ["3142", "2413", "3412", "2143"], derived: "3412" },
    107: { printed: ["1342", "2431", "1432", "2341"], derived: "1342" },
    108: { printed: ["4231", "4321", "1324", "1234"], derived: "4231" },
    109: { printed: ["2413", "2143", "3142", "3412"], derived: "2143" },
    110: { printed: ["4213", "4123", "3214", "3124"], derived: "4123" },
  },
  "2025-1": {
    71: { printed: ["3412", "2143", "2413", "3142"], derived: "2143" },
    72: { printed: ["3124", "3214", "4213", "4123"], derived: "3124" },
    73: { printed: ["3124", "3214", "4213", "4123"], derived: "4213" },
    74: { printed: ["1243", "1423", "3241", "3421"], derived: "3241" },
    75: { printed: ["1423", "1243", "3421", "3241"], derived: "3241" },
    76: { printed: ["1234", "1324", "4231", "4321"], derived: "1324" },
    77: { printed: ["2431", "2341", "1243", "1423"], derived: "2341" },
    78: { printed: ["3241", "3421", "1243", "1423"], derived: "1423" },
    79: { printed: ["3412", "2143", "2413", "3142"], derived: "3412" },
    80: { printed: ["3412", "2143", "2413", "3142"], derived: "3412" },
    101: { printed: ["1342", "2431", "2341", "1432"], derived: "2341" },
    102: { printed: ["1423", "1243", "3421", "3241"], derived: "3241" },
    103: { printed: ["1342", "2431", "2341", "1432"], derived: "2341" },
    104: { printed: ["3412", "3142", "2143", "2413"], derived: "3142" },
    105: { printed: ["2413", "2143", "3412", "3142"], derived: "3142" },
    106: { printed: ["2314", "2134", "4312", "4132"], derived: "4312" },
    107: { printed: ["4312", "2134", "4132", "2314"], derived: "2134" },
    108: { printed: ["3124", "3214", "4213", "4123"], derived: "3124" },
    109: { printed: ["1342", "2341", "2431", "1432"], derived: "2341" },
    110: { printed: ["1243", "3421", "3241", "1423"], derived: "3241" },
  },
  "2024-2": {
    101: { printed: ["3241", "3421", "1423", "1243"], derived: "3241" },
    102: { printed: ["3214", "4213", "4123", "3124"], derived: "4123" },
    103: { printed: ["2134", "4312", "4132", "2314"], derived: "4312" },
    104: { printed: ["1324", "1234", "4231", "4321"], derived: "4321" },
    105: { printed: ["2431", "1432", "1342", "2341"], derived: "2341" },
  },
  "2024-1": {
    101: { printed: ["3142", "3412", "2413", "2143"], derived: "3412" },
    102: { printed: ["3412", "3142", "2413", "2143"], derived: "3412" },
    103: { printed: ["1234", "1324", "4231", "4321"], derived: "4321" },
    104: { printed: ["1342", "2431", "2341", "1432"], derived: "2341" },
    105: { printed: ["2431", "1342", "1432", "2341"], derived: "1342" },
  },
};

const LETTERS = ["A", "B", "C", "D"];
const compact = (t: string) => t.replace(/[^1-4]/g, "");

let checked = 0;
const fail: string[] = [];
const pendingKeyFix: string[] = [];

for (const [paper, qs] of Object.entries(PRINTED)) {
  const rows = JSON.parse(readFileSync(dataPath(paper, "questions"), "utf8")) as {
    number: number;
    answer: string;
    reasoning?: string;
    options: { label: string; text: string }[];
  }[];
  for (const [numStr, q] of Object.entries(qs)) {
    const n = Number(numStr);
    const row = rows.find((r) => r.number === n);
    const tag = `${paper} Q${n}`;
    if (!row) {
      fail.push(`${tag}: row missing`);
      continue;
    }
    checked++;

    // 1. option texts, in label order, must equal the printed rows
    const ours = LETTERS.map((L) => {
      const o = row.options.find((x) => x.label === L);
      return o ? compact(o.text) : "??";
    });
    if (ours.join("|") !== q.printed.join("|")) {
      fail.push(`${tag}: OPTIONS ours=${ours.join(",")} printed=${q.printed.join(",")}`);
      continue;
    }

    // 2. the derived pairing must appear exactly once
    const hits = q.printed.flatMap((p, i) => (p === q.derived ? [LETTERS[i]] : []));
    if (hits.length !== 1) {
      fail.push(`${tag}: derived ${q.derived} appears ${hits.length}x — ambiguous`);
      continue;
    }
    const want = hits[0];

    // 3. key is right, or a matching KEY FIX PENDING clause is recorded
    if (row.answer === want) continue;
    const clause = `KEY FIX PENDING: must move ${row.answer} -> ${want}`;
    if ((row.reasoning ?? "").includes(clause)) {
      pendingKeyFix.push(`${tag}  ${row.answer} -> ${want}`);
    } else {
      fail.push(`${tag}: key ${row.answer} should be ${want}, and no "${clause}" clause is recorded`);
    }
  }
}

console.log(`checked ${checked} match-list questions`);
console.log(`\nKEY CHANGES PENDING (${pendingKeyFix.length}) — add to KEY_FIXES in apply-key-fixes.ts:`);
pendingKeyFix.forEach((p) => console.log(`  ${p}`));
if (fail.length) {
  console.log(`\nFAILURES (${fail.length}):`);
  fail.forEach((f) => console.log(`  ${f}`));
  process.exit(1);
}
console.log("\nAll option sets match the printed codes; every key is right or has a pending-fix clause.");
