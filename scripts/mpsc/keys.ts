/**
 * Parse every paper's key tokens into the Set-A answer key.
 *
 *   npx tsx scripts/mpsc/keys.ts            # report every paper
 *   npx tsx scripts/mpsc/keys.ts --write    # also write data/<id>.key.json
 *
 * Reads data/<id>.keytokens.json (printed lines) (extract.py keys, or hand-transcribed for the
 * image-only 2019-c key). Refuses to write a key that does not cover exactly
 * 1..100 — a shifted or partial key is worse than none.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { BOOKLET_SET_INDEX, PAPERS, QUESTIONS_PER_PAPER, dataPath } from "./config";
import { parseKeyLines, type KeyLetter } from "./lib";

function main() {
  const write = process.argv.includes("--write");
  let bad = 0;
  for (const p of PAPERS) {
    const f = dataPath(p.id, "keytokens");
    if (!existsSync(f)) {
      console.log(`${p.id}: no keytokens file`);
      bad++;
      continue;
    }
    const { lines } = JSON.parse(readFileSync(f, "utf8")) as { lines: string[][] };
    const { rows, errors, ignored } = parseKeyLines(lines);
    const missing: number[] = [];
    for (let q = 1; q <= QUESTIONS_PER_PAPER; q++) if (!rows.has(q)) missing.push(q);
    const extra = [...rows.keys()].filter((q) => q > QUESTIONS_PER_PAPER);
    const key: Record<number, KeyLetter> = {};
    for (const [q, sets] of rows) if (q <= QUESTIONS_PER_PAPER) key[q] = sets[BOOKLET_SET_INDEX];
    const cancelled = Object.entries(key).filter(([, v]) => v === "#").map(([q]) => Number(q));
    const ok = errors.length === 0 && missing.length === 0 && extra.length === 0;
    console.log(
      `${p.id}: ${rows.size} rows · cancelled(set A) [${cancelled.join(",")}]` +
        (ignored.length ? ` · footer ${JSON.stringify(ignored)}` : "") +
        (ok ? " · OK" : ` · errors ${JSON.stringify(errors)} missing [${missing.join(",")}] extra [${extra.join(",")}]`)
    );
    if (!ok) {
      bad++;
      continue;
    }
    if (write) writeFileSync(dataPath(p.id, "key"), JSON.stringify({ paper: p.id, set: "A", key, cancelled }, null, 1));
  }
  if (bad) process.exitCode = 1;
}

main();
