/**
 * Cross-check hand `resolutions` against the BLIND derivations.
 *
 * A `resolutions` entry is settled by a human and `adjudicate.ts` therefore
 * stops asking questions about it — RULED short-circuits the verdict, so a
 * blind derivation that DISAGREES with a hand ruling is never surfaced. That is
 * the right default (the ruling is the more considered judgement), but it means
 * the one place the blind pass could catch a reviewer's own error is silent.
 *
 * This reports that overlap explicitly. It is triage, not a gate: a mismatch is
 * a question for a human, and a hold with a blind answer is usually correct
 * (the hold exists because the question is defective, not because nobody could
 * produce a letter for it).
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { PAPERS, DATA } from "./config";
import type { BlindAnswer } from "./adjudicate";

const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(PAPERS);
let agree = 0;
let mismatch = 0;
let heldWithBlind = 0;
let noBlind = 0;

for (const id of ids) {
  const paper = PAPERS[id];
  if (!paper?.resolutions) continue;

  const blind = new Map<number, BlindAnswer>();
  for (const f of readdirSync(DATA).filter((f) => f.startsWith(`${id}.blind.`) && f.endsWith(".json"))) {
    for (const b of JSON.parse(readFileSync(join(DATA, f), "utf8")) as BlindAnswer[]) blind.set(b.number, b);
  }
  if (!blind.size) continue;

  const rows: string[] = [];
  for (const [numStr, res] of Object.entries(paper.resolutions)) {
    const n = Number(numStr);
    const b = blind.get(n);
    if (!b) {
      noBlind++;
      continue;
    }
    if ("hold" in res) {
      if (b.answer) {
        heldWithBlind++;
        rows.push(`  Q${n} HELD but blind derived ${b.answer} (${b.confidence}) — ${b.working.slice(0, 110)}`);
      }
      continue;
    }
    if (b.answer === res.answer) {
      agree++;
    } else {
      mismatch++;
      rows.push(
        `  Q${n} MISMATCH ruled=${res.answer} blind=${b.answer ?? "null"} (${b.confidence})\n` +
          `        blind working: ${b.working.slice(0, 160)}\n` +
          `        ruling reason: ${res.reason.slice(0, 160)}`,
      );
    }
  }
  if (rows.length) console.log(`\n=== ${id} ===\n${rows.join("\n")}`);
}

console.log(
  `\nhand rulings vs blind: ${agree} agree, ${mismatch} MISMATCH, ` +
    `${heldWithBlind} held-but-derivable, ${noBlind} not yet covered by a blind packet`,
);
