/**
 * List every recorded Marathi/English MEANING difference across all papers.
 *
 *   npx tsx scripts/mpsc/print-notes.ts
 *
 * Reads the `printNote` field from the transcription batches — the single
 * source of truth. The parity probe only sees numeric/structural differences;
 * these are the ones found by reading, so this report is how they stay visible.
 */
import { existsSync } from "node:fs";
import { PAPERS, DATA_DIR } from "./config";
import { loadBatches } from "./merge";

let total = 0;
for (const p of PAPERS) {
  if (!existsSync(DATA_DIR)) break;
  const notes = loadBatches(p.id).filter((q) => q.printNote);
  for (const q of notes) console.log(`${p.id} Q${q.n}: ${q.printNote}`);
  total += notes.length;
}
console.log(`\n${total} print difference(s) recorded.`);
